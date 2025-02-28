import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  fundingGoal: {
    type: Number,
    required: true
  },
  amountRaised: {
    type: Number,
    default: 0
  },
  equity: {
    type: Number,
    required: true
  },
  minimumInvestment: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'funded', 'closed'],
    default: 'draft'
  },
  pitchDeck: String,
  team: [{
    name: String,
    role: String,
    bio: String
  }],
  financials: {
    revenueLastYear: Number,
    projectedRevenue: Number,
    expenses: Number
  },
  risks: [String],
  updates: [{
    title: String,
    content: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;