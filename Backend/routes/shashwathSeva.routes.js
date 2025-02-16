import express from 'express';
import { ShashwathSeva } from '../models/shashwathSeva.models.js';

const router = express.Router();

router.post('/:entityCode/book', async (req, res) => {
    try {
        const { entityCode } = req.params;
        const bookingData = req.body;
        
        const result = await ShashwathSeva.createShashwathSeva(entityCode, bookingData);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error in shashwath seva booking:', error);
        res.status(500).json({ 
            message: 'Failed to process shashwath seva booking',
            error: error.message 
        });
    }
});

router.get('/:entityCode/customer/:custCode', async (req, res) => {
    try {
        const { entityCode, custCode } = req.params;
        const sevas = await ShashwathSeva.getShashwathSevasByCustomer(entityCode, custCode);
        res.json(sevas);
    } catch (error) {
        res.status(500).json({ 
            message: 'Failed to fetch shashwath sevas',
            error: error.message 
        });
    }
});

export default router;
