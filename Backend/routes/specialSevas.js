// // routes/specialSevas.js
// import express from "express";
// import { SpecialSevas } from "../models/specialSevas.models.js";

// const router = express.Router();

// // Get all special sevas
// router.get("/", async (req, res) => {
//     try {
//         const specialSevas = await SpecialSevas.getAllSpecialSevas();
//         res.json(specialSevas);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error fetching special sevas.");
//     }
// });

// // Add a new special seva
// router.post("/", async (req, res) => {
//     try {
//         const { name, description, startDate, validity, isEnabled } = req.body;
//         const {entity_code} = req.query;
//         const result = await SpecialSevas.addSpecialSeva({ 
//             name, 
//             description, 
//             startDate, 
//             validity, 
//             isEnabled 
//         });
//         res.json({ success: true, result });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error adding special seva.");
//     }
// });

// // Update a special seva
// router.put("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, description, startDate, validity, isEnabled } = req.body;
//         const result = await SpecialSevas.updateSpecialSeva(id, { 
//             name, 
//             description, 
//             startDate, 
//             validity, 
//             isEnabled 
//         });
//         res.json({ success: true, result });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error updating special seva.");
//     }
// });

// // Toggle special seva status
// router.patch("/:id/toggle-status", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await SpecialSevas.toggleStatus(id);
//         res.json({ success: true, result });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error toggling special seva status.");
//     }
// });

// export default router;

// routes/specialSevas.js

import express from "express";
import { SpecialSevas } from "../models/specialSevas.models.js";

const router = express.Router();

// Middleware to validate required parameters
const validateAuth = (req, res, next) => {
  const entityCode = req.headers['entity-code'];
  const userId = req.headers['user-id'];

  if (!entityCode || !userId) {
    return res.status(401).json({
      success: false,
      message: "Missing required authorization parameters"
    });
  }
  
  req.entityCode = entityCode;
  req.userId = userId;
  next();
};

router.use(validateAuth);

// Get all special sevas
router.get("/", async (req, res) => {
  try {
    const specialSevas = await SpecialSevas.getAllSpecialSevas(req.entityCode);
    res.json(specialSevas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching special sevas.");
  }
});

// Add a new special seva
router.post("/", async (req, res) => {
  try {
    const { name, description, startDate, validity, isEnabled } = req.body;
    
    const result = await SpecialSevas.addSpecialSeva({
      name,
      description,
      startDate,
      validity,
      isEnabled,
      entityCode: req.entityCode,
      userId: req.userId
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding special seva.");
  }
});

// Update a special seva
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, startDate, validity, isEnabled } = req.body;
    
    const result = await SpecialSevas.updateSpecialSeva(id, {
      name,
      description,
      startDate,
      validity,
      isEnabled,
      entityCode: req.entityCode,
      userId: req.userId
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating special seva.");
  }
});

// Toggle special seva status
router.patch("/:id/toggle-status", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SpecialSevas.toggleStatus(id, req.entityCode, req.userId);
    res.json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error toggling special seva status.");
  }
});

export default router;
