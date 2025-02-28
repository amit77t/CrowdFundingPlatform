import express from 'express';
import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  addCampaignUpdate
} from '../controllers/campaignController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCampaign)
  .get(getCampaigns);

router.route('/:id')
  .get(getCampaignById)
  .put(protect, updateCampaign);

router.route('/:id/updates')
  .post(protect, addCampaignUpdate);

export default router;