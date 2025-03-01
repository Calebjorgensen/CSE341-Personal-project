const express = require('express');
const router = express.Router();
const { validateComponent, validateId } = require('../middlewares/validatepcComponents');

// Import the pcComponentController
const pcComponentController = require('../controllers/pcComponent');

// Route to get all PC components
router.get('/', pcComponentController.getAllComponents);
// Route to get a single PC component by ID
router.get('/:id', validateId, pcComponentController.getComponentById);
// Route to add a new PC component
router.post('/', validateComponent, pcComponentController.addComponent);
// Route to update an existing PC component
router.put('/:id', validateId, validateComponent, pcComponentController.updateComponent);
// Route to delete a PC component
router.delete('/:id', validateId, pcComponentController.deleteComponent);

module.exports = router;