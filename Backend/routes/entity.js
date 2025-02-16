// routes/entity.js
import express from "express";
import { Entity } from "../models/entity.models.js";

const router = express.Router();


router.get("/validate", async (req, res) => {
    const { shortDesc } = req.query;
    console.log('Received request for:', shortDesc);
    
    const result = await Entity.validateEntity(shortDesc);
    if (result && result.length > 0) {
        res.json(result[0]);
    } else {
        res.status(404).json({ message: "Entity not found" });
    }
});



export default router;