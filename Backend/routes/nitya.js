
// import express from "express";
// import { NityanidhiSeva } from "../models/nitya.model.js";

// const router = express.Router();

// router.get("/", async (req, res) => {
//     try {
//         const { entityCode, startDate, endDate } = req.query;
//         if (!entityCode) {
//             return res.status(400).json({ error: "Entity code is required" });
//         }
//         const sevas = await NityanidhiSeva.getNityanidhiSevas(entityCode, startDate, endDate);
//         res.json(sevas);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error fetching Nityanidhi sevas.");
//     }
// });

// export default router;


import express from "express";
import { NityanidhiSeva } from "../models/nitya.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { entityCode, startDate, endDate, searchTerm } = req.query;
        if (!entityCode) {
            return res.status(400).json({ error: "Entity code is required" });
        }
        const sevas = await NityanidhiSeva.getNityanidhiSevas(entityCode, startDate, endDate, searchTerm);
        res.json(sevas);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching Nityanidhi sevas.");
    }
});

export default router;
