import express from 'express';
import { CSeva } from '../models/cseva.model.js';

const router = express.Router();

// Common middleware to extract entity_code and user_id
router.use((req, res, next) => {
    const entityCode = req.headers['entity-code'];
    const userId = req.headers['user-id'];
    
    if (!entityCode || !userId) {
        return res.status(400).json({
            error: 'Missing required headers: entity-code and user-id'
        });
    }
    
    req.entityCode = entityCode;
    req.userId = userId;
    next();
});

// Get all sevas (master or special based on query param)
router.get('/', async (req, res) => {
    try {
        const isSpecial = req.query.type === 'special';
        const sevas = await CSeva.getAllSevas(req.entityCode, isSpecial);
        res.json(sevas);
    } catch (error) {
        console.error('Error fetching sevas:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add a new seva
router.post('/', async (req, res) => {
    try {
        const isSpecial = req.query.type === 'special';
        const result = await CSeva.addSeva({
            ...req.body,
            isSpecial,
            entityCode: req.entityCode,
            userId: req.userId
        });
        res.status(201).json({ success: true, result });
    } catch (error) {
        console.error('Error adding seva:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Update a seva
router.put('/:id', async (req, res) => {
    try {
        const result = await CSeva.updateSeva(
            req.entityCode,
            req.params.id,
            {
                ...req.body,
                userId: req.userId
            }
        );
        res.json({ success: true, result });
    } catch (error) {
        console.error('Error updating seva:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Toggle seva status
router.patch('/:id/toggle-status', async (req, res) => {
    try {
        const result = await CSeva.toggleStatus(
            req.entityCode,
            req.params.id,
            req.userId
        );
        res.json({ success: true, result });
    } catch (error) {
        console.error('Error toggling seva status:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;