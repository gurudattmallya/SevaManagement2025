import express from "express";
import { Panchanga } from "../models/panchanga.model.js";

const router = express.Router();

router.get("/:date", async (req, res) => {
    try {
        const { date } = req.params;
        const panchangaDetails = await Panchanga.getPanchangaDetails(date);
        res.json(panchangaDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching panchanga details" });
    }
});
router.get("/ss/:year/:month/:day", async (req, res) => {
    try {
        const { year, month, day } = req.params;
        const panchangaDetails = await Panchanga.getSsPanchangaDetails(year, month, day);
        res.json(panchangaDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching SS panchanga details" });
    }
});

export default router;



// router.get("/ritual/:year/:maasa/:paksha/:tithi", async (req, res) => {
//     try {
//         const { year, maasa, paksha, tithi } = req.params;
//         const panchangaDetails = await Panchanga.getRitualPanchangaDetails(year, maasa, paksha, tithi);
//         if (!panchangaDetails) {
//             return res.status(404).json({ message: "No data found" });
//         }
//         res.json(panchangaDetails);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching ritual panchanga details" });
//     }
// });

router.get('/ritual/:year/:maasa/:paksha/:tithi', async (req, res) => {
    try {
      const { maasa, paksha, tithi } = req.params;
      const result = await Panchanga.getRitualPanchangaDetails(maasa, paksha, tithi);
      if (!result) {
        return res.status(404).json({ message: 'No panchanga data found' });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching panchanga data' });
    }
  });
  