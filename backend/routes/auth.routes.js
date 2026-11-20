const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { requireAdmin } = require('../middleware/auth.middleware');

router.post('/login', authController.login);
router.get('/me', requireAdmin, authController.getMe);

module.exports = router;
