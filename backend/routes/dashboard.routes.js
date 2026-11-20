const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { requireAdmin } = require('../middleware/auth.middleware');

router.get('/stats', requireAdmin, dashboardController.getStats);

module.exports = router;
