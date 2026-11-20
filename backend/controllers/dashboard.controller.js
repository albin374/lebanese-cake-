const { query, inMemoryStore, getDatabaseStatus } = require('../config/db');

exports.getStats = async (req, res) => {
  try {
    const ordersRows = await query('SELECT * FROM orders ORDER BY created_at DESC');
    const orders = ordersRows || inMemoryStore.orders;

    const productsRows = await query('SELECT * FROM products');
    const products = productsRows || inMemoryStore.products;

    const inquiriesRows = await query('SELECT * FROM inquiries');
    const inquiries = inquiriesRows || inMemoryStore.inquiries;

    // Calculate revenue (delivered or paid)
    const totalRevenue = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0);

    const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'in_production').length;
    const completedOrders = orders.filter(o => o.status === 'delivered').length;
    const readyOrders = orders.filter(o => o.status === 'ready').length;

    // Status breakdown
    const statusCounts = {
      pending: orders.filter(o => o.status === 'pending').length,
      in_production: orders.filter(o => o.status === 'in_production').length,
      ready: orders.filter(o => o.status === 'ready').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    };

    // Category distribution
    const categorySales = {};
    orders.forEach(o => {
      const type = o.cake_type || 'Custom Cake';
      categorySales[type] = (categorySales[type] || 0) + 1;
    });

    const recentOrders = orders.slice(0, 5).map(o => {
      let details = o.cake_details;
      if (typeof details === 'string') {
        try { details = JSON.parse(details); } catch (e) {}
      }
      return {
        ...o,
        cake_details: details
      };
    });

    return res.json({
      success: true,
      stats: {
        totalRevenue: Math.round(totalRevenue),
        currency: 'AED',
        totalOrders: orders.length,
        pendingOrders,
        readyOrders,
        completedOrders,
        totalProducts: products.length,
        unreadInquiries: inquiries.filter(i => i.status === 'unread').length,
        statusCounts,
        categorySales,
        recentOrders
      },
      dbStatus: getDatabaseStatus()
    });
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({ success: false, message: 'Failed to calculate dashboard statistics' });
  }
};
