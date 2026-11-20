const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const { requireAdmin } = require('../middleware/auth.middleware');

// Public routes for website display
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);

// Admin-protected routes
router.post('/', requireAdmin, productsController.createProduct);
router.put('/:id', requireAdmin, productsController.updateProduct);
router.delete('/:id', requireAdmin, productsController.deleteProduct);

module.exports = router;
