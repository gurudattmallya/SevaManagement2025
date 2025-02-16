import express from "express";
import { EntityDesc } from "../models/entityDesc.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { entityCode } = req.query;
        const entity = await EntityDesc.getEntityDesc(entityCode);
        res.json(entity);
    } catch (error) {
        res.status(500).json({ error: "Error fetching entity description" });
    }
});

export default router;
