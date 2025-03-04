// models/Investment.js
import mongoose from "mongoose";

const InvestmentSchema = new mongoose.Schema({
  investorName: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  startupId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Investment', InvestmentSchema);