const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all PC components
const getAllComponents = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('pcComponents').find();
    const components = await result.toArray();
    res.status(200).json(components);  // Send the fetched components as JSON response
  } catch (error) {
    console.error('Error fetching components:', error);
    res.status(500).json({ error: 'Error fetching components' });  // Handle errors with a response
  }
};


// Get a single PC component by ID
const getComponentById = async (req, res, next) => {
  const componentId = req.params.id;

  // Validate if componentId is a valid ObjectId
  if (!ObjectId.isValid(componentId)) {
      return res.status(400).json({ error: 'Invalid component ID format' });
  }

  try {
      const result = await mongodb.getDb().collection('pcComponents').findOne({ _id: new ObjectId(componentId) });

      if (!result) {
          return res.status(404).json({ error: 'Component not found' });
      }

      res.status(200).json(result);
  } catch (error) {
      console.error('Error fetching component:', error);
      res.status(500).json({ error: 'Error fetching component' });
  }
};



// Add a new PC component
const addComponent = async (req, res) => {
    const component = {
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      model: req.body.model,
      memory: req.body.memory,
      coreClock: req.body.coreClock,
      interface: req.body.interface,
      releaseDate: req.body.releaseDate
    };
  
    const response = await mongodb.getDb().collection('pcComponents').insertOne(component);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ error: 'Error adding component' });
    }
  };
  
  // Update an existing PC component
  const updateComponent = async (req, res) => {
    const componentId = new ObjectId(req.params.id);
    const updatedComponent = {
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      model: req.body.model,
      memory: req.body.memory,
      coreClock: req.body.coreClock,
      interface: req.body.interface,
      releaseDate: req.body.releaseDate
    };
  
    const response = await mongodb.getDb().collection('pcComponents').replaceOne({ _id: componentId }, updatedComponent);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Error updating component' });
    }
  };
  
  // Delete a PC component
  const deleteComponent = async (req, res) => {
    const componentId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('pcComponents').deleteOne({ _id: componentId });
  
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Error deleting component' });
    }
  };
  
  module.exports = {
    getAllComponents,
    getComponentById,
    addComponent,
    updateComponent,
    deleteComponent
  };