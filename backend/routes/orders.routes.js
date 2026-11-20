const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');
const { requireAdmin } = require('../middleware/auth.middleware');

// Public route to submit new order from store checkout/builder
router.post('/', ordersController.createOrder);

// Admin-protected routes
router.get('/', requireAdmin, ordersController.getOrders);
router.get('/:id', requireAdmin, ordersController.getOrderById);
router.patch('/:id/status', requireAdmin, ordersController.updateOrderStatus);
router.delete('/:id', requireAdmin, ordersController.deleteOrder);

module.exports = router;
