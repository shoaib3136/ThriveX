import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import startupRoutes from './routes/startupRoutes.js';
import investorRoutes from './routes/investorRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import pitchRoutes from './routes/pitchRoutes.js';
import businessPlanRoutes from './routes/businessPlanRoutes.js';
import { protect } from './middleware/authMiddleware.js';
import cors from 'cors';
import investmentRoutes from './routes/investment.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/startups', protect, startupRoutes);
app.use('/api/investors', protect, investorRoutes);
app.use('/api/matches', protect, matchRoutes);
app.use('/api/pitch-evaluation', protect, pitchRoutes);
app.use('/api/business-plans', protect, businessPlanRoutes);
app.use('/api/investment',protect, investmentRoutes);
const PORT = process.env.PORT || 3000;

export default app;