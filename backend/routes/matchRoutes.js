import express from 'express';
import { generateMatches, getMatches } from '../controllers/matchController.js';
const router = express.Router();

router.post('/', generateMatches);
router.get('/', getMatches);

export default router;