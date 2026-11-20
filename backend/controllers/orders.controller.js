const { query, inMemoryStore, getPool } = require('../config/db');

exports.getOrders = async (req, res) => {
  try {
    const { status, search } = req.query;

    const rows = await query('SELECT * FROM orders ORDER BY created_at DESC');
    let ordersList = rows || inMemoryStore.orders;

    // Filter by status if provided
    if (status && status !== 'all') {
      ordersList = ordersList.filter(o => o.status === status);
    }

    // Filter by search query if provided
    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      ordersList = ordersList.filter(o => 
        (o.order_number && o.order_number.toLowerCase().includes(q)) ||
        (o.customer_name && o.customer_name.toLowerCase().includes(q)) ||
        (o.customer_phone && o.customer_phone.toLowerCase().includes(q)) ||
        (o.cake_type && o.cake_type.toLowerCase().includes(q))
      );
    }

    // Parse cake_details if stringified
    const formatted = ordersList.map(order => {
      let details = order.cake_details;
      if (typeof details === 'string') {
        try {
          details = JSON.parse(details);
        } catch (e) {}
      }
      return {
        ...order,
        cake_details: details
      };
    });

    return res.json({
      success: true,
      count: formatted.length,
      orders: formatted
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const rows = await query('SELECT * FROM orders WHERE id = ? LIMIT 1', [id]);
    let order = (rows && rows[0]) || inMemoryStore.orders.find(o => o.id === id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Get order items if MySQL
    let items = [];
    const itemRows = await query('SELECT * FROM order_items WHERE order_id = ?', [id]);
    if (itemRows) {
      items = itemRows;
    }

    let details = order.cake_details;
    if (typeof details === 'string') {
      try {
        details = JSON.parse(details);
      } catch (e) {}
    }

    return res.json({
      success: true,
      order: {
        ...order,
        cake_details: details,
        items
      }
    });
  } catch (err) {
    console.error('Error fetching order by ID:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch order details' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      delivery_date,
      delivery_time_slot,
      delivery_address,
      delivery_city,
      cake_type,
      cake_details,
      order_notes,
      total_amount,
      payment_method
    } = req.body;

    if (!customer_name || !customer_phone || !total_amount) {
      return res.status(400).json({
        success: false,
        message: 'Customer name, phone number, and total amount are required.'
      });
    }

    const orderNumber = `LDB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      order_number: orderNumber,
      customer_name,
      customer_email: customer_email || '',
      customer_phone,
      delivery_date: delivery_date || new Date().toISOString().split('T')[0],
      delivery_time_slot: delivery_time_slot || '2:00 PM - 5:00 PM',
      delivery_address: delivery_address || 'Dubai, UAE',
      delivery_city: delivery_city || 'Dubai',
      cake_type: cake_type || 'Bespoke Celebration Cake',
      cake_details: cake_details || {},
      order_notes: order_notes || '',
      total_amount: parseFloat(total_amount),
      currency: 'AED',
      status: 'pending',
      payment_status: payment_method === 'online' ? 'paid' : 'cash_on_delivery',
      payment_method: payment_method || 'Cash On Delivery',
      created_at: new Date().toISOString()
    };

    // Try MySQL insertion
    let insertId = Date.now();
    const pool = getPool();
    if (pool) {
      try {
        const [result] = await pool.query(
          `INSERT INTO orders (
            order_number, customer_name, customer_email, customer_phone,
            delivery_date, delivery_time_slot, delivery_address, delivery_city,
            cake_type, cake_details, order_notes, total_amount, currency,
            status, payment_status, payment_method
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newOrder.order_number,
            newOrder.customer_name,
            newOrder.customer_email,
            newOrder.customer_phone,
            newOrder.delivery_date,
            newOrder.delivery_time_slot,
            newOrder.delivery_address,
            newOrder.delivery_city,
            newOrder.cake_type,
            JSON.stringify(newOrder.cake_details),
            newOrder.order_notes,
            newOrder.total_amount,
            newOrder.currency,
            newOrder.status,
            newOrder.payment_status,
            newOrder.payment_method
          ]
        );
        insertId = result.insertId;
      } catch (dbErr) {
        console.warn('MySQL insert failed, saving to in-memory fallback:', dbErr.message);
      }
    }

    // Always maintain in-memory store consistency
    newOrder.id = insertId;
    inMemoryStore.orders.unshift(newOrder);

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: newOrder
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status, payment_status } = req.body;

    const validStatuses = ['pending', 'in_production', 'ready', 'delivered', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    // Update MySQL
    if (status) {
      await query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    }
    if (payment_status) {
      await query('UPDATE orders SET payment_status = ? WHERE id = ?', [payment_status, id]);
    }

    // Update in-memory store
    const memOrder = inMemoryStore.orders.find(o => o.id === id);
    if (memOrder) {
      if (status) memOrder.status = status;
      if (payment_status) memOrder.payment_status = payment_status;
    }

    return res.json({
      success: true,
      message: `Order #${id} status updated to ${status || payment_status}`,
      updatedOrder: memOrder || { id, status, payment_status }
    });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    await query('DELETE FROM orders WHERE id = ?', [id]);
    inMemoryStore.orders = inMemoryStore.orders.filter(o => o.id !== id);

    return res.json({
      success: true,
      message: `Order #${id} has been deleted successfully.`
    });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ success: false, message: 'Failed to delete order' });
  }
};
