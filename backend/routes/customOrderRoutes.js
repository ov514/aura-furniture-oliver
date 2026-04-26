import express from 'express';
import { createCustomOrder, getCustomOrders } from '../controllers/customOrderController.js';

const router = express.Router();

router.post('/', createCustomOrder);
router.get('/', getCustomOrders);

export default router;
