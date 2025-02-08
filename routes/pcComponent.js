const express = require('express');
const router = express.Router();

// Import the pcComponentController
const pcComponentController = require('../controllers/pcComponent');

// Route to get all PC components
router.get('/', pcComponentController.getAllComponents);

// Route to get a single PC component by ID
router.get('/:id', pcComponentController.getComponentById);

// Route to add a new PC component
router.post('/', pcComponentController.addComponent);

// Route to update an existing PC component
router.put('/:id', pcComponentController.updateComponent);

// Route to delete a PC component
router.delete('/:id', pcComponentController.deleteComponent);

module.exports = router;