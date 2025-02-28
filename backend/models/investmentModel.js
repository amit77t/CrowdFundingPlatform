import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  equityPercentage: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  transactionDetails: {
    transactionId: String,
    paymentMethod: String,
    paymentStatus: String
  }
}, {
  timestamps: true
});

const Investment = mongoose.model('Investment', investmentSchema);
export default Investment;