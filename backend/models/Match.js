import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  startupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
  investorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Investor', required: true },
  matchScore: { type: Number, required: true },
});

export default mongoose.model('Match', matchSchema);