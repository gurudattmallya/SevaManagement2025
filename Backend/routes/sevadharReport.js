// import express from "express";
// import { SevadharReport } from "../models/sevadharReport.model.js";

// const router = express.Router();

// // router.get("/", async (req, res) => {
// //     try {
// //         const { entityCode, sevadharId, sevaType, startDate, endDate } = req.query;
        
// //         if (!entityCode || !sevadharId || !sevaType || !startDate || !endDate) {
// //             return res.status(400).json({ 
// //                 error: "Missing required parameters" 
// //             });
// //         }

// //         const reportData = await SevadharReport.getSevadharReport(
// //             entityCode, 
// //             sevadharId, 
// //             sevaType, 
// //             startDate, 
// //             endDate
// //         );
        
// //         res.json(reportData);
// //     } catch (error) {
// //         console.error('Route error:', error);
// //         res.status(500).json({ 
// //             error: "Error fetching sevadhar report",
// //             details: error.message 
// //         });
// //     }
// // });

// router.get("/", async (req, res) => {
//   try {
//     const { entityCode, sevadharId, sevaType, startDate, endDate } = req.query;
//     console.log("Received request with params:", {
//       entityCode,
//       sevadharId,
//       sevaType,
//       startDate,
//       endDate
//     });

//     const reportData = await SevadharReport.getSevadharReport(
//       entityCode,
//       sevadharId,
//       sevaType,
//       startDate,
//       endDate
//     );

//     console.log("Sending response:", reportData);
//     res.json(reportData || []);
//   } catch (error) {
//     console.error("Route error:", error);
//     res.status(500).json({
//       error: "Error fetching sevadhar report",
//       details: error.message
//     });
//   }
// });

// export default router;


import express from "express";
import { SevadharReport } from "../models/sevadharReport.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { entityCode, sevadharId, sevaType, startDate, endDate } = req.query;
    console.log("Received request with params:", {
      entityCode,
      sevadharId,
      sevaType,
      startDate,
      endDate
    });

    const reportData = await SevadharReport.getSevadharReport(
      entityCode,
      sevadharId,
      sevaType,
      startDate,
      endDate
    );

    console.log("Sending response:", reportData);
    res.json(reportData || []);
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).json({
      error: "Error fetching sevadhar report",
      details: error.message
    });
  }
});

export default router;
