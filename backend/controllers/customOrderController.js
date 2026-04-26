import CustomOrder from '../models/CustomOrder.js';

// POST /api/custom-orders  – save a new custom order
export const createCustomOrder = async (req, res) => {
    try {
        const order = new CustomOrder(req.body);
        const saved = await order.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET /api/custom-orders  – fetch all custom orders (admin)
export const getCustomOrders = async (req, res) => {
    try {
        const orders = await CustomOrder.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
