import express from 'express';
import { evaluatePitch } from '../controllers/pitchController.js';
const router = express.Router();

router.post('/', evaluatePitch);

export default router;