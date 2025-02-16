//routes/sevas.js
import express from "express";
import { MasterSevas } from "../models/masterSeva.models.js";
import { SpecialSevas } from "../models/specialSeva.models.js";

const router = express.Router();

router.get("/master-sevas/:entityCode", async (req, res) => {
  try {
    const { entityCode } = req.params;
    const masterSevas = await MasterSevas.getAllMasterSevas(entityCode);
    res.json(masterSevas);
  } catch (error) {
    console.error("Error fetching master sevas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/special-sevas/:entityCode", async (req, res) => {
  try {
    const { entityCode } = req.params;
    const specialSevas = await SpecialSevas.getAllSpecialSevas(entityCode);
    res.json(specialSevas);
  } catch (error) {
    console.error("Error fetching special sevas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/:entityCode/:deityId/sevas", async (req, res) => {
    try {
      const { entityCode, deityId } = req.params;
      const { sevaType, sevaId } = req.query;
  
      if (!entityCode || !deityId) {
        return res.status(400).json({ error: 'Entity code and deity ID are required' });
      }
  
      const sevas = await Seva1.getSevasByDeityId(entityCode, deityId, sevaType, sevaId);
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
