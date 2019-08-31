import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

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

export default routes;
