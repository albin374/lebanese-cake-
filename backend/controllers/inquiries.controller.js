const { query, inMemoryStore, getPool } = require('../config/db');

exports.getInquiries = async (req, res) => {
  try {
    const rows = await query('SELECT * FROM inquiries ORDER BY created_at DESC');
    const inquiries = rows || inMemoryStore.inquiries;

    return res.json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch inquiries' });
  }
};

exports.createInquiry = async (req, res) => {
  try {
    const { customer_name, email, phone, event_type, event_date, guest_count, message } = req.body;

    if (!customer_name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone number, and consultation message are required.'
      });
    }

    const newInquiry = {
      customer_name,
      email: email || '',
      phone,
      event_type: event_type || 'Wedding / Celebration',
      event_date: event_date || null,
      guest_count: parseInt(guest_count || 50, 10),
      message,
      status: 'unread',
      created_at: new Date().toISOString()
    };

    let insertId = Date.now();
    const pool = getPool();
    if (pool) {
      try {
        const [result] = await pool.query(
          `INSERT INTO inquiries (customer_name, email, phone, event_type, event_date, guest_count, message, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newInquiry.customer_name,
            newInquiry.email,
            newInquiry.phone,
            newInquiry.event_type,
            newInquiry.event_date,
            newInquiry.guest_count,
            newInquiry.message,
            newInquiry.status
          ]
        );
        insertId = result.insertId;
      } catch (e) {
        console.warn('MySQL inquiry insert fallback:', e.message);
      }
    }

    newInquiry.id = insertId;
    inMemoryStore.inquiries.unshift(newInquiry);

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully! Our concierge team will contact you shortly.',
      inquiry: newInquiry
    });
  } catch (err) {
    console.error('Error creating inquiry:', err);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry' });
  }
};

exports.updateInquiryStatus = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    await query('UPDATE inquiries SET status = ? WHERE id = ?', [status, id]);
    const memInq = inMemoryStore.inquiries.find(i => i.id === id);
    if (memInq) memInq.status = status;

    return res.json({
      success: true,
      message: `Inquiry status updated to ${status}`,
      inquiry: memInq || { id, status }
    });
  } catch (err) {
    console.error('Error updating inquiry status:', err);
    res.status(500).json({ success: false, message: 'Failed to update inquiry status' });
  }
};
