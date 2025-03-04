import express from 'express';
import { generateBusinessPlan } from '../controllers/businessPlanController.js';
const router = express.Router();

router.post('/', generateBusinessPlan);

export default router;