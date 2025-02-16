import express from "express";
import { SevaModel } from "../models/seva.model.js";

const router = express.Router();

router.get("/:type", async (req, res) => {
    try {
        const { entity_code } = req.query;
        const isSpecial = req.params.type === 'special';
        const sevas = await SevaModel.getAllSevas(entity_code, isSpecial);
        res.json(sevas);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error fetching ${req.params.type} sevas.`);
    }
});

router.post("/:type", async (req, res) => {
    try {
        const { name, description, startDate, validity, isEnabled } = req.body;
        const { entity_code } = req.query;
        const isSpecial = req.params.type === 'special';
        
        const result = await SevaModel.addSeva({
            name,
            description,
            startDate: isSpecial ? startDate : null,
            validity: isSpecial ? validity : null,
            isEnabled,
            isSpecial,
            entityCode: entity_code
        });
        
        res.json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error adding ${req.params.type} seva.`);
    }
});

export default router;