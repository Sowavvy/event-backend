import express from 'express';
import * as driverController from '../controllers/drivers.js';

const router = express.Router();

router.get('/', driverController.getAllDrivers);

router.get('/:id', driverController.getDriverById);

router.get('/:id/orders', driverController.getDriverOrders);

router.get('/:id/orders/:order_id', driverController.getDriverOrderById);

router.post('/:id/orders/:order_id/accept', driverController.acceptOrder);

router.post('/:id/orders/:order_id/decline', driverController.declineOrder);

router.post('/:id/orders/:order_id/complete', driverController.completeOrder);

router.post('/:id/orders/:order_id/cancel', driverController.cancelOrder);

router.post('/:id/orders/:order_id/delete', driverController.deleteOrder);

export default router;