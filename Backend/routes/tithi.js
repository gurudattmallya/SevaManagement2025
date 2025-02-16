import express from "express";
import { Tithi } from "../models/tithi.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tithiList = await Tithi.getAllTithi();
        res.json(tithiList);
    } catch (error) {
        res.status(500).json({ error: "Error fetching tithi list" });
    }
});

export default router;
