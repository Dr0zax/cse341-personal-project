import { getAllUsers, create, getUser, updateUser, deleteUser } from '../controllers/user.js';

import express from 'express';
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', create);
router.get('/:username', getUser);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);

export default router;
