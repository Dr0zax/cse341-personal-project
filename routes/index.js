import express from 'express';
const router = express.Router();

import { readFileSync } from 'fs';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = JSON.parse(readFileSync('./swagger.json'));

router.use('/api-docs', swaggerUi.serve);
router.use('/api-docs', swaggerUi.setup(swaggerDocument));

import userRoute from './user.js';
router.use('/users', userRoute);

export default router;
