import express from 'express';
import { createInvestor, getInvestors } from '../controllers/investorController.js';
const router = express.Router();

router.post('/', createInvestor);
router.get('/', getInvestors);

export default router;