import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  industry: { type: String, required: true },
  fundingNeeds: { type: Number, required: true },
  pitchDeck: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Startup', startupSchema);
