import { create, getAllTasks, getTask, updateTask, deleteTask } from '../controllers/task.js';

import express from 'express';
const router = express.Router();

router.get('/', getAllTasks);
router.post('/', create);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
