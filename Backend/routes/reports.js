import express from "express";
import { Reports } from "../models/reports.model.js";

const router = express.Router();

router.get("/combined", async (req, res) => {
    try {
        const { entityCode, startDate, endDate, sevaType } = req.query;
        if (!entityCode) {
            return res.status(400).json({ error: "Entity code is required" });
        }
        const reports = await Reports.getCombinedReport(entityCode, startDate, endDate, sevaType);
        res.json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating report.");
    }
});

export default router;
