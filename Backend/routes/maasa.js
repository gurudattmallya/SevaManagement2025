import express from "express";
import { Maasa } from "../models/maasa.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const maasaList = await Maasa.getAllMaasa();
        res.json(maasaList);
    } catch (error) {
        res.status(500).json({ error: "Error fetching maasa list" });
    }
});

export default router;
