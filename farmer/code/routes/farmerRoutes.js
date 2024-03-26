import express from 'express';
import * as farmersController from '../controller/farmersController.js';

const router = express.Router();

// Route to get all farmers.
router.get('/api/farmers/', farmersController.getAllFarmerData);

router.post('/api/farmers/', farmersController.createFarmer);
router.delete('/api/farmers/:id', farmersController.deleteFarmer);
router.put('/api/farmers/:id', farmersController.updateFarmer);
router.get('/api/farmers/:id', farmersController.getFarmerById);
router.get('/api/farmer/:id/products', farmersController.getAllFarmerProducts);
router.get('/api/farmers/:id/products/:id', farmersController.getProductById);
router.post('/api/farmers/:id/products', farmersController.createProduct);
router.put('/api/farmers/:id/products/:id', farmersController.updateFarmerProduct);
router.delete('/api/farmers/:id/products/:id', farmersController.deleteFarmerProduct);

export default router;