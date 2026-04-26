import ContactMessage from '../models/ContactMessage.js';

// POST /api/contact  – save a new contact message
export const createContactMessage = async (req, res) => {
    try {
        const msg = new ContactMessage(req.body);
        const saved = await msg.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET /api/contact  – fetch all contact messages (admin)
export const getContactMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
