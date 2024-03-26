import express from 'express';
import * as usersController from '../controller/usersController.js';

const router = express.Router();

router.get('/users', usersController.getAlluserData)
router.delete('/users/:id', usersController.deleteUser)
router.put('/users/:id', usersController.updateUser)
router.get('/users/:id', usersController.getUserId)


export default router