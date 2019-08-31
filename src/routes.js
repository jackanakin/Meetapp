import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

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

export default routes;