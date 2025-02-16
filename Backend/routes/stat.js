import express from "express";
import { Statistics } from "../models/stat.model.js";

const router = express.Router();

router.get("/overview", async (req, res) => {
    try {
        const { entityCode } = req.query;
        if (!entityCode) {
            return res.status(400).json({ error: "Entity code is required" });
        }
        const stats = await Statistics.getSevaStatistics(entityCode);
        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching statistics.");
    }
});

router.get("/trends", async (req, res) => {
    try {
        const { entityCode } = req.query;
        if (!entityCode) {
            return res.status(400).json({ error: "Entity code is required" });
        }
        const trends = await Statistics.getMonthlyTrends(entityCode);
        res.json(trends);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching trends.");
    }
});

export default router;
