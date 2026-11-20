const express = require('express');
const router = express.Router();
const inquiriesController = require('../controllers/inquiries.controller');
const { requireAdmin } = require('../middleware/auth.middleware');

router.post('/', inquiriesController.createInquiry);
router.get('/', requireAdmin, inquiriesController.getInquiries);
router.patch('/:id/status', requireAdmin, inquiriesController.updateInquiryStatus);

module.exports = router;
