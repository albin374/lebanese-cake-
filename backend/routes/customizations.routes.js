const express = require('express');
const router = express.Router();
const customizationsController = require('../controllers/customizations.controller');

// Public route to submit/save customization from interactive 3D builder
router.post('/', customizationsController.createCustomization);

// Admin / Public get all customizations
router.get('/', customizationsController.getCustomizations);

// Get single customization
router.get('/:id', customizationsController.getCustomizationById);

// Update status (Admin)
router.patch('/:id/status', customizationsController.updateCustomizationStatus);

// Delete customization (Admin)
router.delete('/:id', customizationsController.deleteCustomization);

module.exports = router;
