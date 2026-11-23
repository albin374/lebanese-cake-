const { query, inMemoryStore, getPool } = require('../config/db');

// Helper to safely parse JSON
function safeJsonParse(val, fallback = []) {
  if (!val) return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch (_) {
    return fallback;
  }
}

// 1. Get All Customizations (Admin or Public tracking with filters)
exports.getCustomizations = async (req, res) => {
  try {
    const { status, search } = req.query;
    let sql = 'SELECT * FROM customizations ORDER BY created_at DESC';
    let params = [];

    const rows = await query(sql, params);
    let items = (rows && rows.length > 0) ? rows : inMemoryStore.customizations;

    // Normalize JSON fields
    let normalized = items.map(item => ({
      ...item,
      toppings: safeJsonParse(item.toppings, []),
      birthday_toppers: safeJsonParse(item.birthday_toppers, []),
      total_price: Number(item.total_price) || 0
    }));

    // Apply optional status filter
    if (status && status !== 'all') {
      normalized = normalized.filter(c => c.status === status);
    }

    // Apply optional search filter
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      normalized = normalized.filter(c => 
        (c.customization_code && c.customization_code.toLowerCase().includes(q)) ||
        (c.occasion && c.occasion.toLowerCase().includes(q)) ||
        (c.theme_design && c.theme_design.toLowerCase().includes(q)) ||
        (c.sponge_flavor && c.sponge_flavor.toLowerCase().includes(q)) ||
        (c.filling_flavor && c.filling_flavor.toLowerCase().includes(q)) ||
        (c.cake_message && c.cake_message.toLowerCase().includes(q)) ||
        (c.customer_name && c.customer_name.toLowerCase().includes(q)) ||
        (c.customer_phone && c.customer_phone.toLowerCase().includes(q))
      );
    }

    return res.json({
      success: true,
      count: normalized.length,
      customizations: normalized
    });
  } catch (err) {
    console.error('Error fetching customizations:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch cake customizations' });
  }
};

// 2. Get Single Customization by ID or Code
exports.getCustomizationById = async (req, res) => {
  try {
    const param = req.params.id;
    const isNum = !isNaN(Number(param));

    let item = null;
    if (isNum) {
      const rows = await query('SELECT * FROM customizations WHERE id = ? LIMIT 1', [Number(param)]);
      if (rows && rows.length > 0) item = rows[0];
    } else {
      const rows = await query('SELECT * FROM customizations WHERE customization_code = ? LIMIT 1', [param]);
      if (rows && rows.length > 0) item = rows[0];
    }

    if (!item) {
      item = inMemoryStore.customizations.find(c => 
        String(c.id) === String(param) || c.customization_code === param
      );
    }

    if (!item) {
      return res.status(404).json({ success: false, message: 'Customization not found' });
    }

    return res.json({
      success: true,
      customization: {
        ...item,
        toppings: safeJsonParse(item.toppings, []),
        birthday_toppers: safeJsonParse(item.birthday_toppers, []),
        total_price: Number(item.total_price) || 0
      }
    });
  } catch (err) {
    console.error('Error fetching customization detail:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch customization' });
  }
};

// 3. Create / Save Customization from Interactive Builder
exports.createCustomization = async (req, res) => {
  try {
    const {
      customization_code,
      occasion,
      theme_design,
      shape,
      tiers,
      size,
      servings,
      sponge_flavor,
      filling_flavor,
      toppings,
      birthday_toppers,
      cake_message,
      preview_image,
      total_price,
      customer_name,
      customer_phone,
      customer_email,
      delivery_date,
      delivery_time_slot,
      delivery_address,
      notes
    } = req.body;

    const code = customization_code || `CUST-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const price = Math.max(0, Number(total_price) || 0);

    const newCustomization = {
      customization_code: code,
      occasion: occasion || 'Bespoke Celebration Cake',
      theme_design: theme_design || null,
      shape: shape || 'Round',
      tiers: tiers || '1 Layer',
      size: size || 'Medium - 2kg',
      servings: servings || '12-16 Servings',
      sponge_flavor: sponge_flavor || 'Vanilla Bean',
      filling_flavor: filling_flavor || 'Signature Bakery Filling',
      toppings: Array.isArray(toppings) ? toppings : safeJsonParse(toppings, []),
      birthday_toppers: Array.isArray(birthday_toppers) ? birthday_toppers : safeJsonParse(birthday_toppers, []),
      cake_message: cake_message || '',
      preview_image: preview_image || '',
      total_price: price,
      customer_name: customer_name || 'Bespoke Guest',
      customer_phone: customer_phone || '',
      customer_email: customer_email || '',
      delivery_date: delivery_date || null,
      delivery_time_slot: delivery_time_slot || null,
      delivery_address: delivery_address || '',
      status: 'new',
      notes: notes || '',
      created_at: new Date().toISOString()
    };

    let insertId = Date.now();
    const pool = getPool();
    if (pool) {
      try {
        const [result] = await pool.query(
          `INSERT INTO customizations (
            customization_code, occasion, theme_design, shape, tiers, size, servings,
            sponge_flavor, filling_flavor, toppings, birthday_toppers, cake_message,
            preview_image, total_price, customer_name, customer_phone, customer_email,
            delivery_date, delivery_time_slot, delivery_address, status, notes
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newCustomization.customization_code,
            newCustomization.occasion,
            newCustomization.theme_design,
            newCustomization.shape,
            newCustomization.tiers,
            newCustomization.size,
            newCustomization.servings,
            newCustomization.sponge_flavor,
            newCustomization.filling_flavor,
            JSON.stringify(newCustomization.toppings),
            JSON.stringify(newCustomization.birthday_toppers),
            newCustomization.cake_message,
            newCustomization.preview_image,
            newCustomization.total_price,
            newCustomization.customer_name,
            newCustomization.customer_phone,
            newCustomization.customer_email,
            newCustomization.delivery_date,
            newCustomization.delivery_time_slot,
            newCustomization.delivery_address,
            newCustomization.status,
            newCustomization.notes
          ]
        );
        insertId = result.insertId;
      } catch (e) {
        console.warn('MySQL customization insert fallback:', e.message);
      }
    }

    newCustomization.id = insertId;
    inMemoryStore.customizations.unshift(newCustomization);

    return res.status(201).json({
      success: true,
      message: 'Custom cake design saved successfully!',
      customization: newCustomization
    });
  } catch (err) {
    console.error('Error creating customization:', err);
    res.status(500).json({ success: false, message: 'Failed to save customization details' });
  }
};

// 4. Update Status (Admin)
exports.updateCustomizationStatus = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status, notes } = req.body;

    const validStatuses = ['new', 'reviewed', 'in_kitchen', 'completed', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updates = [];
    const params = [];

    if (status) {
      updates.push('status = ?');
      params.push(status);
    }
    if (notes !== undefined) {
      updates.push('notes = ?');
      params.push(notes);
    }

    if (updates.length > 0) {
      params.push(id);
      await query(`UPDATE customizations SET ${updates.join(', ')} WHERE id = ?`, params);
    }

    const memItem = inMemoryStore.customizations.find(c => c.id === id);
    if (memItem) {
      if (status) memItem.status = status;
      if (notes !== undefined) memItem.notes = notes;
    }

    return res.json({
      success: true,
      message: `Customization status updated successfully`,
      customization: memItem || { id, status, notes }
    });
  } catch (err) {
    console.error('Error updating customization status:', err);
    res.status(500).json({ success: false, message: 'Failed to update customization status' });
  }
};

// 5. Delete Customization (Admin)
exports.deleteCustomization = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    await query('DELETE FROM customizations WHERE id = ?', [id]);
    const idx = inMemoryStore.customizations.findIndex(c => c.id === id);
    if (idx > -1) {
      inMemoryStore.customizations.splice(idx, 1);
    }

    return res.json({
      success: true,
      message: 'Customization record deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting customization:', err);
    res.status(500).json({ success: false, message: 'Failed to delete customization' });
  }
};
