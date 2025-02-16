import express from "express";
import { Pages } from "../models/pages.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const pages = await Pages.getAllPages();
        res.json(pages);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching pages.");
    }
});

export default router;