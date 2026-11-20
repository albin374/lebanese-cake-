const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');
const { requireAdmin } = require('../middleware/auth.middleware');

// Public route to fetch all categories
router.get('/', categoriesController.getCategories);
router.get('/:id', categoriesController.getCategoryById);

// Admin-protected routes
router.post('/', requireAdmin, categoriesController.createCategory);
router.delete('/:id', requireAdmin, categoriesController.deleteCategory);

module.exports = router;
