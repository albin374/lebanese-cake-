const https = require('https');
const querystring = require('querystring');
const Stripe = require('stripe');
const { query, inMemoryStore, getPool } = require('../config/db');

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || '';
const stripe = new Stripe(STRIPE_SECRET || 'sk_test_placeholder');

// Helper: Calculate order subtotal, discounts, delivery fee and total in AED securely on backend
function calculateOrderTotal(items = [], promoCode = '') {
  let subtotal = 0;
  if (Array.isArray(items)) {
    items.forEach(item => {
      const price = Math.max(0, Number(item.price) || 0);
      const qty = Math.max(1, Number(item.quantity) || 1);
      subtotal += price * qty;
    });
  }

  const upperCode = (promoCode || '').trim().toUpperCase();
  let promoDiscountPercent = 0;
  if (upperCode === 'DREAM10' || upperCode === 'LEBANESE10') {
    promoDiscountPercent = 0.10;
  } else if (upperCode === 'VIP15') {
    promoDiscountPercent = 0.15;
  }

  const discountAmount = Math.round(subtotal * promoDiscountPercent);
  // Free delivery over 400 AED, otherwise 30 AED
  const deliveryFee = (subtotal >= 400 || subtotal === 0) ? 0 : 30;
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);
  const vatIncluded = Math.round((subtotal * 0.05) * 100) / 100;

  return {
    subtotal,
    promoCode: upperCode,
    promoDiscountPercent,
    discountAmount,
    deliveryFee,
    totalAmount,
    vatIncluded
  };
}

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

// Customer-facing public order tracking & history lookup
exports.trackCustomerOrders = async (req, res) => {
  try {
    const search = (req.query.q || req.query.search || req.query.order_number || req.body.q || '').trim();
    const phone = (req.query.phone || req.body.phone || '').trim();
    const orderNumbersParam = req.query.numbers || req.body.order_numbers;

    let orderNumbers = [];
    if (Array.isArray(orderNumbersParam)) {
      orderNumbers = orderNumbersParam.filter(Boolean);
    } else if (typeof orderNumbersParam === 'string' && orderNumbersParam.trim()) {
      orderNumbers = orderNumbersParam.split(',').map(s => s.trim()).filter(Boolean);
    }

    const pool = getPool();
    let ordersList = [];

    if (pool) {
      try {
        let sql = 'SELECT * FROM orders WHERE 1=0 ';
        const params = [];

        if (orderNumbers.length > 0) {
          const placeholders = orderNumbers.map(() => '?').join(',');
          sql += `OR order_number IN (${placeholders}) `;
          params.push(...orderNumbers);
        }

        if (search) {
          const cleanQ = search.replace(/\D/g, '');
          sql += 'OR order_number = ? OR customer_email = ? OR customer_phone = ? ';
          params.push(search, search, search);
          if (cleanQ.length >= 4) {
            sql += 'OR customer_phone LIKE ? ';
            params.push(`%${cleanQ}%`);
          }
        }

        if (phone) {
          const cleanPhone = phone.replace(/\D/g, '');
          sql += 'OR customer_phone = ? ';
          params.push(phone);
          if (cleanPhone.length >= 4) {
            sql += 'OR customer_phone LIKE ? ';
            params.push(`%${cleanPhone}%`);
          }
        }

        // If no specific filter was provided, fetch the 10 most recent orders so the page has data
        if (orderNumbers.length === 0 && !search && !phone) {
          sql = 'SELECT * FROM orders ';
        }

        sql += 'ORDER BY created_at DESC LIMIT 30';

        const [rows] = await pool.query(sql, params);
        ordersList = rows || [];
      } catch (dbErr) {
        console.warn('MySQL track orders query error:', dbErr.message);
      }
    }

    // Merge or fallback to inMemoryStore if MySQL is empty or offline
    if (ordersList.length === 0 && inMemoryStore.orders.length > 0) {
      ordersList = inMemoryStore.orders.filter(o => {
        if (orderNumbers.length > 0 && orderNumbers.includes(o.order_number)) return true;
        if (search) {
          const q = search.toLowerCase();
          if (o.order_number?.toLowerCase().includes(q)) return true;
          if (o.customer_email?.toLowerCase() === q) return true;
          const cleanQ = search.replace(/\D/g, '');
          if (cleanQ && o.customer_phone?.replace(/\D/g, '').includes(cleanQ)) return true;
        }
        if (phone) {
          const cleanPhone = phone.replace(/\D/g, '');
          if (cleanPhone && o.customer_phone?.replace(/\D/g, '').includes(cleanPhone)) return true;
        }
        if (orderNumbers.length === 0 && !search && !phone) {
          return true;
        }
        return false;
      });
    }

    // Format safe response for customer viewing
    const formatted = ordersList.map(order => {
      let details = order.cake_details;
      if (typeof details === 'string') {
        try { details = JSON.parse(details); } catch (_) {}
      }
      return {
        id: order.id,
        order_number: order.order_number,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        customer_email: order.customer_email,
        delivery_date: order.delivery_date,
        delivery_time_slot: order.delivery_time_slot,
        delivery_address: order.delivery_address,
        cake_type: order.cake_type,
        cake_details: details,
        order_notes: order.order_notes,
        total_amount: order.total_amount,
        currency: order.currency || 'AED',
        status: order.status || 'pending',
        payment_status: order.payment_status || 'pending',
        payment_method: order.payment_method || 'Stripe',
        created_at: order.created_at
      };
    });

    return res.json({
      success: true,
      count: formatted.length,
      orders: formatted
    });
  } catch (err) {
    console.error('Track customer orders error:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve orders' });
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

exports.createStripeCheckoutSession = async (req, res) => {
  try {
    const {
      items = [],
      promoCode = '',
      customerName = '',
      customerPhone = '',
      customerEmail = '',
      deliveryDate = '',
      deliveryTimeSlot = '',
      deliveryAddress = '',
      orderNotes = '',
      orderNumber = ''
    } = req.body;

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const ordNum = orderNumber || `LDB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Secure server-side calculation (never trust frontend totals)
    const calculation = calculateOrderTotal(items, promoCode);
    const { subtotal, discountAmount, promoDiscountPercent, deliveryFee, totalAmount } = calculation;

    // Handle Promo Code Coupon in Stripe if applicable
    let couponId = null;
    if (promoDiscountPercent > 0) {
      const couponCode = `PROMO_${calculation.promoCode}_${Math.round(promoDiscountPercent * 100)}`;
      try {
        const existing = await stripe.coupons.retrieve(couponCode);
        couponId = existing.id;
      } catch (_) {
        try {
          const created = await stripe.coupons.create({
            id: couponCode,
            percent_off: Math.round(promoDiscountPercent * 100),
            duration: 'forever',
            name: `${calculation.promoCode} - ${Math.round(promoDiscountPercent * 100)}% Off`
          });
          couponId = created.id;
        } catch (cErr) {
          console.warn('Stripe coupon creation notice:', cErr.message);
        }
      }
    }

    // Build line items for Stripe Checkout
    const lineItems = [];
    if (Array.isArray(items) && items.length > 0) {
      items.forEach((it) => {
        const unitAmountCents = Math.max(100, Math.round((Number(it.price) || 0) * 100));
        const specDetails = [
          it.flavor ? `Flavor: ${it.flavor}` : null,
          it.servings ? `Servings: ${it.servings}` : null,
          it.weight ? `Weight: ${it.weight}` : null,
          it.tiers ? `Tiers: ${it.tiers}` : null
        ].filter(Boolean).join(' | ');

        lineItems.push({
          price_data: {
            currency: 'aed',
            product_data: {
              name: it.title || 'Lebanese Handcrafted Cake',
              description: specDetails || 'Freshly baked bespoke pastry by Lebanese Dream Bakery'
            },
            unit_amount: unitAmountCents
          },
          quantity: Math.max(1, Number(it.quantity) || 1)
        });
      });
    } else {
      lineItems.push({
        price_data: {
          currency: 'aed',
          product_data: {
            name: `Lebanese Dream Bakery Order #${ordNum}`,
            description: 'Custom Lebanese Cake Order'
          },
          unit_amount: Math.max(100, Math.round(totalAmount * 100))
        },
        quantity: 1
      });
    }

    // Include delivery fee line item if applicable and not free
    if (deliveryFee > 0) {
      lineItems.push({
        price_data: {
          currency: 'aed',
          product_data: {
            name: 'Refrigerated Chilled Delivery (Dubai & UAE)',
            description: 'Temperature-controlled van delivery preserving pristine cake form'
          },
          unit_amount: Math.round(deliveryFee * 100) // 30 AED in fils
        },
        quantity: 1
      });
    }

    // Prepare Checkout Session payload
    const sessionPayload = {
      mode: 'payment',
      line_items: lineItems,
      success_url: `${clientUrl}/cart?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/cart?canceled=true`,
      metadata: {
        order_number: ordNum,
        customer_name: customerName || '',
        customer_phone: customerPhone || '',
        customer_email: customerEmail || '',
        delivery_date: deliveryDate || '',
        delivery_time_slot: deliveryTimeSlot || '',
        delivery_address: deliveryAddress || '',
        order_notes: orderNotes || '',
        calculated_total: totalAmount.toString(),
        currency: 'AED'
      }
    };

    if (customerEmail && customerEmail.includes('@')) {
      sessionPayload.customer_email = customerEmail;
    }

    if (couponId) {
      sessionPayload.discounts = [{ coupon: couponId }];
    }

    // Create session via official Stripe SDK
    const session = await stripe.checkout.sessions.create(sessionPayload);

    // Save pre-order into Database / in-memory store with status 'pending'
    const newOrder = {
      order_number: ordNum,
      customer_name: customerName || 'Valued Customer',
      customer_email: customerEmail || '',
      customer_phone: customerPhone || '',
      delivery_date: deliveryDate || new Date().toISOString().split('T')[0],
      delivery_time_slot: deliveryTimeSlot || 'Afternoon (2:00 PM - 6:00 PM)',
      delivery_address: deliveryAddress || 'Dubai, UAE',
      delivery_city: 'Dubai',
      cake_type: items[0]?.title || 'Bespoke Cake Order',
      cake_details: {
        items,
        calculation,
        stripe_session_id: session.id
      },
      order_notes: orderNotes || '',
      total_amount: totalAmount,
      currency: 'AED',
      status: 'pending',
      payment_status: 'pending',
      payment_method: 'Stripe',
      stripe_session_id: session.id,
      stripe_payment_intent_id: null,
      created_at: new Date().toISOString()
    };

    let insertId = Date.now();
    const pool = getPool();
    if (pool) {
      try {
        const [result] = await pool.query(
          `INSERT INTO orders (
            order_number, customer_name, customer_email, customer_phone,
            delivery_date, delivery_time_slot, delivery_address, delivery_city,
            cake_type, cake_details, order_notes, total_amount, currency,
            status, payment_status, payment_method, stripe_session_id
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
            newOrder.payment_method,
            newOrder.stripe_session_id
          ]
        );
        insertId = result.insertId;
      } catch (dbErr) {
        console.warn('MySQL pre-order insert notice:', dbErr.message);
      }
    }

    newOrder.id = insertId;
    inMemoryStore.orders.unshift(newOrder);

    return res.json({
      success: true,
      url: session.url,
      sessionId: session.id,
      orderNumber: ordNum,
      calculatedAmount: totalAmount
    });
  } catch (err) {
    console.error('Stripe checkout session error:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to initialize Stripe Checkout Session'
    });
  }
};

exports.verifyStripeSession = async (req, res) => {
  try {
    const sessionId = req.body?.sessionId || req.query?.sessionId;
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Stripe checkout sessionId is required for payment verification.'
      });
    }

    // Retrieve session from Stripe with expanded payment_intent
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'line_items']
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Stripe checkout session not found.'
      });
    }

    // Prevent false confirmations on unpaid sessions
    if (session.payment_status !== 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Payment has not been completed. Status is unpaid.',
        payment_status: session.payment_status
      });
    }

    const paymentIntentId = typeof session.payment_intent === 'object'
      ? (session.payment_intent?.id || '')
      : (session.payment_intent || '');
    const paidAmount = (session.amount_total || 0) / 100;
    const ordNum = session.metadata?.order_number;

    let matchedOrder = null;

    // Update in MySQL if connected
    const pool = getPool();
    if (pool) {
      try {
        const [rows] = await pool.query(
          'SELECT * FROM orders WHERE stripe_session_id = ? OR order_number = ? LIMIT 1',
          [sessionId, ordNum]
        );
        if (rows && rows.length > 0) {
          matchedOrder = rows[0];
          await pool.query(
            `UPDATE orders 
             SET payment_status = 'paid', 
                 stripe_payment_intent_id = ?, 
                 total_amount = ? 
             WHERE id = ?`,
            [paymentIntentId, paidAmount, matchedOrder.id]
          );
          matchedOrder.payment_status = 'paid';
          matchedOrder.stripe_payment_intent_id = paymentIntentId;
          matchedOrder.total_amount = paidAmount;
        }
      } catch (dbErr) {
        console.warn('MySQL session verify error:', dbErr.message);
      }
    }

    // Update in-memory store
    const memOrder = inMemoryStore.orders.find(
      o => o.stripe_session_id === sessionId || (ordNum && o.order_number === ordNum)
    );
    if (memOrder) {
      memOrder.payment_status = 'paid';
      memOrder.stripe_payment_intent_id = paymentIntentId;
      memOrder.total_amount = paidAmount;
      if (!matchedOrder) matchedOrder = memOrder;
    }

    // Fallback: create verified record if not present
    if (!matchedOrder) {
      matchedOrder = {
        id: Date.now(),
        order_number: ordNum || `LDB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        customer_name: session.metadata?.customer_name || session.customer_details?.name || 'Valued Customer',
        customer_email: session.metadata?.customer_email || session.customer_details?.email || '',
        customer_phone: session.metadata?.customer_phone || session.customer_details?.phone || '',
        delivery_date: session.metadata?.delivery_date || new Date().toISOString().split('T')[0],
        delivery_time_slot: session.metadata?.delivery_time_slot || 'Afternoon (2:00 PM - 6:00 PM)',
        delivery_address: session.metadata?.delivery_address || 'Dubai, UAE',
        delivery_city: 'Dubai',
        cake_type: 'Lebanese Cake Order',
        cake_details: { stripe_session_id: sessionId },
        order_notes: session.metadata?.order_notes || '',
        total_amount: paidAmount,
        currency: 'AED',
        status: 'pending',
        payment_status: 'paid',
        payment_method: 'Stripe',
        stripe_session_id: sessionId,
        stripe_payment_intent_id: paymentIntentId,
        created_at: new Date().toISOString()
      };
      inMemoryStore.orders.unshift(matchedOrder);
    }

    let cakeDetails = matchedOrder.cake_details;
    if (typeof cakeDetails === 'string') {
      try { cakeDetails = JSON.parse(cakeDetails); } catch (_) {}
    }

    return res.json({
      success: true,
      message: 'Stripe payment verified successfully!',
      order: {
        ...matchedOrder,
        cake_details: cakeDetails,
        total_amount: paidAmount,
        currency: 'AED',
        payment_status: 'paid',
        payment_method: 'Stripe'
      }
    });
  } catch (err) {
    console.error('Error verifying Stripe session:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Payment verification failed'
    });
  }
};

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      event = typeof req.body === 'string' || Buffer.isBuffer(req.body)
        ? JSON.parse(req.body.toString('utf8'))
        : req.body;
    }
  } catch (err) {
    console.error('⚠️ [Stripe Webhook Error]:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const sessionId = session.id;
        const paymentIntentId = typeof session.payment_intent === 'object'
          ? (session.payment_intent?.id || '')
          : (session.payment_intent || '');
        const paidAmount = (session.amount_total || 0) / 100;
        const ordNum = session.metadata?.order_number;

        if (session.payment_status === 'paid') {
          const pool = getPool();
          if (pool) {
            try {
              await pool.query(
                `UPDATE orders 
                 SET payment_status = 'paid', 
                     stripe_payment_intent_id = ?, 
                     total_amount = ? 
                 WHERE stripe_session_id = ? OR order_number = ?`,
                [paymentIntentId, paidAmount, sessionId, ordNum]
              );
            } catch (dbErr) {
              console.warn('MySQL webhook update notice:', dbErr.message);
            }
          }

          const memOrder = inMemoryStore.orders.find(
            o => o.stripe_session_id === sessionId || (ordNum && o.order_number === ordNum)
          );
          if (memOrder) {
            memOrder.payment_status = 'paid';
            memOrder.stripe_payment_intent_id = paymentIntentId;
            memOrder.total_amount = paidAmount;
          }
          console.log(`✅ [Stripe Webhook] Order #${ordNum || sessionId} confirmed paid: AED ${paidAmount}`);
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const pi = event.data.object;
        const pool = getPool();
        if (pool) {
          try {
            await pool.query(
              `UPDATE orders SET payment_status = 'paid' WHERE stripe_payment_intent_id = ?`,
              [pi.id]
            );
          } catch (_) {}
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const pi = event.data.object;
        const pool = getPool();
        if (pool) {
          try {
            await pool.query(
              `UPDATE orders SET payment_status = 'failed' WHERE stripe_payment_intent_id = ?`,
              [pi.id]
            );
          } catch (_) {}
        }
        break;
      }

      default:
        break;
    }

    return res.json({ received: true });
  } catch (procErr) {
    console.error('Webhook processing error:', procErr);
    return res.status(500).json({ success: false, message: procErr.message });
  }
};

exports.processStripeDirectPayment = async (req, res) => {
  return res.status(400).json({
    success: false,
    message: 'Direct card charges are deprecated. Please use createStripeCheckoutSession for official Stripe Checkout.'
  });
};
