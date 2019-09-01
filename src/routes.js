import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';
import MeetupController from './app/controllers/MeetupController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();
const upload = multer(multerConfig);

/**
 * Public routes only
 */
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/**
 * Authentication middleware
 */
routes.use(authMiddleware);

/**
 * From now on, only authenticated users routes
 */
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);
routes.get('/meetups', MeetupController.index);

routes.post('/meetups/:id/subscriptions', SubscriptionController.store);

export default routes;
