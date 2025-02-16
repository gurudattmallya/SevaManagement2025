

//routes/deities.js
import express from "express";
import { Deities } from "../models/deity.models.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { entityCode } = req.query;
        if (!entityCode) {
            return res.status(400).json({ error: "Entity code is required" });
        }
        const deities = await Deities.getAllDeities(entityCode);
        res.json(deities);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching deities.");
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, is_enabled, special_occasions, entityCode, cr_by, cr_on } = req.body;
        const result = await Deities.addDeity({ 
            name, 
            isEnabled: is_enabled, 
            specialOccasions: special_occasions,
            entityCode,
            cr_by,
            cr_on
        });
        res.json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding deity.");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, is_enabled, special_occasions, entityCode, mo_by, mo_on } = req.body;
        const result = await Deities.updateDeity(id, { 
            name, 
            isEnabled: is_enabled, 
            specialOccasions: special_occasions,
            entityCode,
            mo_by,
            mo_on
        });
        res.json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating deity.");
    }
});

export default router;