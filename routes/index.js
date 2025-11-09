import YAML from 'yamljs';

import express from 'express';
const router = express.Router();

import swaggerUi from 'swagger-ui-express';
const swaggerDoc = YAML.load("./swagger.yaml")

import { authMiddleware, requiresAuth } from '../middleware/auth.js';

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/authorized', (req, res) => {
  res.send('Secured Resource');
})

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

router.use('/api-docs', swaggerUi.serve);
router.use(
    '/api-docs',
    swaggerUi.setup(swaggerDoc)
);

import taskRoute from './task.js';
router.use('/tasks', taskRoute);

export default router;
