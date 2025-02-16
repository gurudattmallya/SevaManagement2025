import express from 'express';
import { ReceiptPayment } from '../models/receiptPayment.model.js';

const router = express.Router();

router.post('/receipt-payment', async (req, res) => {
    try {
        const { receiptPayment, receiptPaymentDtls } = req.body;
        
        console.log('Receipt Payment Data:', receiptPayment);
        console.log('Receipt Details:', receiptPaymentDtls);

        const result = await ReceiptPayment.createReceiptPayment(
            receiptPayment,
            receiptPaymentDtls
        );

        res.status(201).json(result);
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            stack: error.stack,
            sqlMessage: error.sqlMessage
        });
        
        res.status(500).json({ 
            message: error.message,
            sqlError: error.sqlMessage,
            code: error.code 
        });
    }
});

// Add this new route
router.get('/receipt-payment/next-number', async (req, res) => {
    try {
        const { entityCode } = req.query;
        if (!entityCode) {
            return res.status(400).json({ error: 'Entity code is required' });
        }
        
        const nextNumber = await ReceiptPayment.getNextReceiptNumberForDisplay(entityCode);
        res.json(nextNumber);
    } catch (error) {
        console.error('Error getting next receipt number:', error);
        res.status(500).json({ message: 'Failed to get next receipt number' });
    }
});

export default router;
