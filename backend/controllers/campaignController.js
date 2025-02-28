import asyncHandler from 'express-async-handler';
import Campaign from '../models/campaignModel.js';

// @desc    Create a new campaign
// @route   POST /api/campaigns
// @access  Private
export const createCampaign = asyncHandler(async (req, res) => {
  const campaign = new Campaign({
    creator: req.user._id,
    ...req.body
  });

  const createdCampaign = await campaign.save();
  res.status(201).json(createdCampaign);
});

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
export const getCampaigns = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const industry = req.query.industry || '';
  const status = req.query.status || 'active';

  const industryFilter = industry ? { industry } : {};
  const statusFilter = { status };

  const count = await Campaign.countDocuments({ ...industryFilter, ...statusFilter });
  const campaigns = await Campaign.find({ ...industryFilter, ...statusFilter })
    .populate('creator', 'name email')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    campaigns,
    page,
    pages: Math.ceil(count / pageSize)
  });
});

// @desc    Get campaign by ID
// @route   GET /api/campaigns/:id
// @access  Public
export const getCampaignById = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id)
    .populate('creator', 'name email');

  if (campaign) {
    res.json(campaign);
  } else {
    res.status(404);
    throw new Error('Campaign not found');
  }
});

// @desc    Update campaign
// @route   PUT /api/campaigns/:id
// @access  Private
export const updateCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (campaign) {
    if (campaign.creator.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this campaign');
    }

    Object.assign(campaign, req.body);
    const updatedCampaign = await campaign.save();
    res.json(updatedCampaign);
  } else {
    res.status(404);
    throw new Error('Campaign not found');
  }
});

// @desc    Add campaign update
// @route   POST /api/campaigns/:id/updates
// @access  Private
export const addCampaignUpdate = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const campaign = await Campaign.findById(req.params.id);

  if (campaign) {
    if (campaign.creator.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this campaign');
    }

    campaign.updates.push({ title, content });
    await campaign.save();
    res.status(201).json(campaign);
  } else {
    res.status(404);
    throw new Error('Campaign not found');
  }
});