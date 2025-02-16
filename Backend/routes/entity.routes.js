import express from 'express';
import { getEntityDetails } from '../models/entity.model.js';

const router = express.Router();

router.get('/:entityCode', async (req, res) => {
  try {
    const { entityCode } = req.params;
    const entityDetails = await getEntityDetails(entityCode);
    res.json(entityDetails);
  } catch (error) {
    console.error('Error fetching entity details:', error);
    res.status(500).json({ error: 'Failed to fetch entity details' });
  }
});

export default router;
