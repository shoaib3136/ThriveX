import express from 'express';
import { createStartup, getStartups, getStartupById } from '../controllers/startupController.js';
const router = express.Router();

router.post('/', createStartup);
router.get('/', getStartups);
router.get('/:id', getStartupById);

export default router;