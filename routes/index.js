import YAML from 'yamljs';

import express from 'express';
const router = express.Router();

import swaggerUi from 'swagger-ui-express';
const swaggerDoc = YAML.load("./swagger.yaml")

router.use('/api-docs', swaggerUi.serve);
router.use(
    '/api-docs',
    swaggerUi.setup(swaggerDoc)
);

import userRoute from './user.js';
router.use('/users', userRoute);

import taskRoute from './task.js';
router.use('/tasks', taskRoute);

export default router;
