import express from "express";
import { Sevadhar } from "../models/sevadhar.model.js";

const router = express.Router();

// Update the GET route to filter by entityCode
router.get("/", async (req, res) => {
    try {
        const { entityCode } = req.query;
        const sevadharList = await Sevadhar.getAllSevadhar(entityCode);
        res.json(sevadharList);
    } catch (error) {
        res.status(500).json({ error: "Error fetching sevadhar list" });
    }
});

// Get sevadhar by ID
router.get("/:entityCode/:custCode", async (req, res) => {
    try {
        const { entityCode, custCode } = req.params;
        const sevadhar = await Sevadhar.getSevadharById(entityCode, custCode);
        if (!sevadhar) {
            return res.status(404).json({ error: "Sevadhar not found" });
        }
        res.json(sevadhar);
    } catch (error) {
        res.status(500).json({ error: "Error fetching sevadhar" });
    }
});

// Create new sevadhar
// router.post("/", async (req, res) => {
//     try {
//         const newSevadhar = {
//             ...req.body,
//             CR_ON: new Date(),
//             CR_BY: req.body.CR_BY || 'SYSTEM'
//         };
//         const result = await Sevadhar.createSevadhar(newSevadhar);
//         res.status(201).json(result);
//     } catch (error) {
//         res.status(500).json({ error: "Error creating sevadhar" });
//     }
// });

router.post("/", async (req, res) => {
    try {
        const result = await Sevadhar.createSevadhar(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.log('Route error:', error);
        res.status(500).json({ 
            error: "Error creating sevadhar",
            details: error.message 
        });
    }
});


// Update sevadhar
router.put("/:entityCode/:custCode", async (req, res) => {
    try {
        const { entityCode, custCode } = req.params;
        const updateData = {
            ...req.body,
            MO_ON: new Date(),
            MO_BY: req.body.MO_BY || 'SYSTEM'
        };
        const result = await Sevadhar.updateSevadhar(entityCode, custCode, updateData);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Error updating sevadhar" });
    }
});

// Delete sevadhar
router.delete("/:entityCode/:custCode", async (req, res) => {
    try {
        const { entityCode, custCode } = req.params;
        const result = await Sevadhar.deleteSevadhar(entityCode, custCode);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Error deleting sevadhar" });
    }
});

export default router;
