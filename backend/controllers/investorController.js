import Investor from '../models/Investor.js';
import mongoose from 'mongoose';

// @desc    Create/update investor profile
// @route   POST /api/investors
export const createInvestor = async (req, res) => {
  try {
    const { investmentCapacity, riskLevel, industryPreferences, userId,name } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const investor = await Investor.create({
      userId,
      investmentCapacity,
      riskLevel,
      industryPreferences,
      name
    });

    res.status(201).json(investor);
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};


// @desc    Get all investors
// @route   GET /api/investors
export const getInvestors = async (req, res) => {
  try {
    const investors = await Investor.find();
    res.json(investors);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};