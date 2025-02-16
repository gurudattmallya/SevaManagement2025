//routes\deities1.js
import express from "express";
import { Deities1 } from "../models/deity1.models.js";
import { Seva1 } from "../models/seva1.models.js";

const router = express.Router();

// router.get("/:entityCode", async (req, res) => {
//     try {
//       const { entityCode } = req.params;
//       if (!entityCode) {
//         return res.status(400).json({ error: 'Entity code is required' });
//       }
//       const deities = await Deities1.getAllDeities(entityCode);
//       res.json(deities);
//     } catch (error) {
//       console.error('Route error:', error);
//       res.status(500).json({ 
//         error: 'Failed to fetch deities',
//         details: error.message 
//       });
//     }
//   });

router.get("/:entityCode", async (req, res) => {
    try {
      const { entityCode } = req.params;
      const { sevaType, sevaId } = req.query;
      
      const deities = await Deities1.getAllDeities(entityCode, sevaType, sevaId);
      res.json(deities);
    } catch (error) {
      console.error('Route error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch deities',
        details: error.message 
      });
    }
  });
  
  router.get("/:entityCode/:deityId/sevas", async (req, res) => {
    try {
      const { entityCode, deityId } = req.params;
      const { sevaType, sevaId } = req.query;
      if (!entityCode || !deityId) {
        return res.status(400).json({ error: 'Entity code and deity ID are required' });
      }
      const sevas = await Seva1.getSevasByDeityId(entityCode, deityId,sevaType, sevaId);
      res.json(sevas);
    } catch (error) {
      console.error('Route error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch sevas',
        details: error.message 
      });
    }
  });
  

export default router;
