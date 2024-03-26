import express from 'express';
import * as eventController from '../controller/eventController.js';

const router = express.Router();

// Route to get all event.
router.get('/api/events/', eventController.getAllEventData);
router.post('/api/events/', eventController.createEvent);
router.get('/api/event_registration/', eventController.getAllRegistrationData);
router.delete('/api/events/:id', eventController.deleteEvent);
router.post('/api/event_registration/', eventController.joinEvent);
router.delete('/api/event_registration/:id', eventController.leaveEvent);
  
export default router;