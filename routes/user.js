import { getAllUsers, create, getUser } from '../controllers/user.js';
import express from 'express';
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', create);
router.get('/:id', getUser);

export default router;
