import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['entrepreneur', 'investor'], required: true },
  industryPreferences: { type: [String], default: [] },
  riskLevel: { type: String, default: 'medium' },
  fundingNeeds: { type: Number, default: 0 },
});

export default mongoose.model('User', userSchema);