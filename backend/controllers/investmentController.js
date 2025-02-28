import asyncHandler from 'express-async-handler';
import Investment from '../models/investmentModel.js';
import Campaign from '../models/campaignModel.js';
import User from '../models/userModel.js';

// @desc    Create a new investment
// @route   POST /api/investments
// @access  Private
export const createInvestment = asyncHandler(async (req, res) => {
  const { campaignId, amount } = req.body;

  const campaign = await Campaign.findById(campaignId);
  if (!campaign) {
    res.status(404);
    throw new Error('Campaign not found');
  }

  if (amount < campaign.minimumInvestment) {
    res.status(400);
    throw new Error(`Minimum investment amount is $${campaign.minimumInvestment}`);
  }

  const equityPercentage = (amount / campaign.fundingGoal) * campaign.equity;

  const investment = new Investment({
    investor: req.user._id,
    campaign: campaignId,
    amount,
    equityPercentage,
    status: 'pending'
  });

  const createdInvestment = await investment.save();

  // Update campaign amount raised
  campaign.amountRaised += amount;
  if (campaign.amountRaised >= campaign.fundingGoal) {
    campaign.status = 'funded';
  }
  await campaign.save();

  // Update user's total invested amount
  const user = await User.findById(req.user._id);
  user.investorProfile.totalInvested += amount;
  await user.save();

  res.status(201).json(createdInvestment);
});

// @desc    Get user investments
// @route   GET /api/investments
// @access  Private
export const getUserInvestments = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Investment.countDocuments({ investor: req.user._id });
  const investments = await Investment.find({ investor: req.user._id })
    .populate('campaign', 'title fundingGoal status')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    investments,
    page,
    pages: Math.ceil(count / pageSize)
  });
});

// @desc    Get investment by ID
// @route   GET /api/investments/:id
// @access  Private
export const getInvestmentById = asyncHandler(async (req, res) => {
  const investment = await Investment.findById(req.params.id)
    .populate('campaign', 'title description fundingGoal status')
    .populate('investor', 'name email');

  if (investment) {
    if (investment.investor._id.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to view this investment');
    }
    res.json(investment);
  } else {
    res.status(404);
    throw new Error('Investment not found');
  }
});