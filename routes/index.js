import express from 'express';
const router = express.Router();

import { readFileSync } from 'fs';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
const swaggerDocument = JSON.parse(readFileSync('./swagger.json'));

// Serve the raw swagger.json at a stable same-origin path so Swagger UI
// fetches the spec from this server rather than obeying any hard-coded
// external servers declared in the spec (which can cause NetworkError/CORS).
router.get('/swagger.json', (req, res) => {
	res.json(swaggerDocument);
});

router.use('/api-docs', swaggerUi.serve);
// Configure swagger-ui to fetch the spec from our local /swagger.json URL.
router.use(
	'/api-docs',
	swaggerUi.setup(null, {
		swaggerOptions: {
			url: '/swagger.json'
		}
	})
);

import userRoute from './user.js';
router.use('/users', userRoute);

export default router;
