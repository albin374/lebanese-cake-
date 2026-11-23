const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');
const { requireAdmin } = require('../middleware/auth.middleware');

// Public route to submit new order from store checkout/builder
router.post('/', ordersController.createOrder);

// Stripe Checkout Integration
router.post('/create-checkout-session', ordersController.createStripeCheckoutSession);
router.post('/stripe-session', ordersController.createStripeCheckoutSession);
router.post('/verify-session', ordersController.verifyStripeSession);
router.post('/webhook', ordersController.handleStripeWebhook);
router.post('/stripe-charge', ordersController.processStripeDirectPayment);

// Customer-facing public order tracking
router.get('/track', ordersController.trackCustomerOrders);
router.post('/track', ordersController.trackCustomerOrders);

// Admin-protected routes
router.get('/', requireAdmin, ordersController.getOrders);
router.get('/:id', requireAdmin, ordersController.getOrderById);
router.patch('/:id/status', requireAdmin, ordersController.updateOrderStatus);
router.delete('/:id', requireAdmin, ordersController.deleteOrder);

module.exports = router;
