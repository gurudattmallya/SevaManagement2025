

// import express from "express";
// import { ShashwathSeva } from "../models/shash.model.js";

// const router = express.Router();

// router.get("/", async (req, res) => {
//     try {
//         const { entityCode, month } = req.query;
//         if (!entityCode) {
//             return res.status(400).json({ error: "Entity code is required" });
//         }
//         const sevas = await ShashwathSeva.getShashwathSevas(entityCode, month);
//         res.json(sevas);
//     } catch (error) {
//         console.error("Error in shash route:", error);
//         res.status(500).json({ error: "Error fetching Shashwath sevas" });
//     }
// });

// export default router;


import express from "express";
import { ShashwathSeva } from "../models/shash.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { entityCode, dd, mm, maasa, paksha, tithi } = req.query;
        if (!entityCode) {
            return res.status(400).json({ error: "Entity code is required" });
        }

        const filters = {
            dd: dd || null,
            mm: mm || null,
            maasa: maasa || null,
            paksha: paksha || null,
            tithi: tithi || null
        };

        const sevas = await ShashwathSeva.getShashwathSevas(entityCode, filters);
        res.json(sevas);
    } catch (error) {
        console.error("Error in shash route:", error);
        res.status(500).json({ error: "Error fetching Shashwath sevas" });
    }
});

export default router;

