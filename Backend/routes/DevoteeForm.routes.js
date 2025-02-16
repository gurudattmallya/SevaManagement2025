// DevoteeForm.routes.js
import express from "express";
import { DevoteeFormModel } from "../models/DevoteeForm.model.js";

const router = express.Router();

router.get("/pincode/:pincode", async (req, res) => {
    try {
        console.log('Fetching details for pincode:', req.params.pincode);
        const pincodeDetails = await DevoteeFormModel.getPincodeDetails(req.params.pincode);
        if (!pincodeDetails) {
            return res.status(404).json({ message: "Pincode not found" });
        }
        
        // Fetch areas for the dropdown
        const areas = await DevoteeFormModel.getAreasByPincode(req.params.pincode);
        
        res.json({
            ...pincodeDetails,
            areas: areas.map(row => row.area)
        });
    } catch (error) {
        console.error('Route error:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;