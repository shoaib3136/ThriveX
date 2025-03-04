import mongoose from 'mongoose';

const businessPlanSchema = new mongoose.Schema({
  startupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
  planContent: { type: String, required: true },
  formattedContent: {
    type: String
  },
});

export default mongoose.model('BusinessPlan', businessPlanSchema);