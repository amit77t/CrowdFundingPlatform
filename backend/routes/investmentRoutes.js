import express from 'express';
import {
  createInvestment,
  getUserInvestments,
  getInvestmentById
} from '../controllers/investmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createInvestment)
  .get(protect, getUserInvestments);

router.route('/:id')
  .get(protect, getInvestmentById);

export default router;