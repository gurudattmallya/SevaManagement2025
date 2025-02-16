
//routes\subSevas.js
import express from "express";
import {
  getAllSubSevas,
  getSubSevaById,
  createSubSeva,
  updateSubSeva,
  getAvailableParentSevas,
  getDeities,
} from "../models/subSeva.model.js";

const router = express.Router();
const sevaTypeLabels = {
  'SS': 'SASHWATH SEVA',
  'N': 'NITYANIDHI SEVA',
  'O': 'OTHERS'
};
// Get all sub sevas
router.get("/", async (req, res) => {
  try {
    const entityCode = req.headers["entity-code"];
    const subSevas = await getAllSubSevas(entityCode);

    const transformedSevas = subSevas.map((seva) => ({
      ...seva,
      is_enabled: seva.SEVA_ACTIVE === "Y",
      seva_type: seva.SEVA_SHASHWATH,
      seva_type_label: sevaTypeLabels[seva.SEVA_SHASHWATH] || 'Others'
    }));

    res.json(transformedSevas);
  } catch (error) {
    console.error("Error fetching Sub Sevas:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




router.get("/:sevaCode", async (req, res) => {
  try {
    const entityCode = req.headers["entity-code"];
    console.log('Fetching seva code:', req.params.sevaCode);
    console.log('Entity code:', entityCode);

    const subSeva = await getSubSevaById(req.params.sevaCode, entityCode);
    console.log('Fetched sub seva:', subSeva);

    if (!subSeva) {
      return res.status(404).json({ message: "Sub Seva not found" });
    }

    // Transform the data
    const transformedSeva = {
      SEVA_CODE: subSeva.SEVA_CODE,
      PARENT_SEVA_TYPE: subSeva.PARENT_SEVA_TYPE,
      PARENT_SEVA_ID: subSeva.PARENT_SEVA_ID,
      PARENT_SEVA_NAME: subSeva.PARENT_SEVA_NAME,
      DEITY_ID: subSeva.DEITY_ID,
      SEVA_DESC: subSeva.SEVA_DESC,
      SEVA_AMOUNT: subSeva.SEVA_AMOUNT,
      SEVA_ACTIVE: subSeva.SEVA_ACTIVE,
      deity_name: subSeva.deity_name,
      is_enabled: subSeva.SEVA_ACTIVE === "Y",
      seva_type: subSeva.PARENT_SEVA_TYPE?.toLowerCase() || "master"
    };

    res.json(transformedSeva);
  } catch (error) {
    console.error("Error fetching Sub Seva:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Get available parent sevas
router.get("/parent-sevas/list", async (req, res) => {
  try {
    const parentSevas = await getAvailableParentSevas(req.headers["entity-code"]);
    res.json(parentSevas);
  } catch (error) {
    console.error("Error fetching parent sevas:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get deities based on seva type
// router.get("/deities/:sevaType", async (req, res) => {
//   try {
//     const deities = await getDeities(req.params.sevaType);
//     res.json(deities);
//   } catch (error) {
//     console.error("Error fetching deities:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
// Get deities based on seva type
router.get("/deities/:sevaType", async (req, res) => {
  try {
    const entityCode = req.headers["entity-code"];
    const sevaType = req.params.sevaType;

    console.log('Fetching deities:', { entityCode, sevaType });

    const deities = await getDeities(entityCode, sevaType);
    
    return res.json({
      success: true,
      data: deities || [],
      message: "Deities fetched successfully"
    });

  } catch (error) {
    console.error("Error fetching deities:", error);
    return res.status(500).json({
      success: false,
      data: [],
      message: error.message || "Internal Server Error"
    });
  }
});


// Create new sub seva
// router.post("/", async (req, res) => {
//   try {
//     const { parent_seva_id, deity_id } = req.body;
//     if (!parent_seva_id || !deity_id) {
//       return res.status(400).json({ message: "Parent Seva and Deity are required" });
//     }

//     const id = await createSubSeva(req.body);
//     res.status(201).json({ id, message: "Sub Seva created successfully" });
//   } catch (error) {
//     console.error("Error creating Sub Seva:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const entityCode = req.headers["entity-code"];
    const userId = req.headers["user-id"];

    const { parent_seva_id, deity_id, name, price, is_enabled, seva_type } = req.body;

    if (!parent_seva_id || !deity_id || !name || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await createSubSeva(req.body, entityCode, userId);
    res.status(201).json({ 
      success: true,
      data: result,
      message: "Sub Seva created successfully" 
    });

  } catch (error) {
    console.error("Error creating Sub Seva:", error);
    res.status(500).json({ 
      success: false,
      message: error.message || "Internal Server Error" 
    });
  }
});


// Update sub seva
// router.put("/:id", async (req, res) => {
//   try {
//     const { parent_seva_id, deity_id } = req.body;
//     if (!parent_seva_id || !deity_id) {
//       return res.status(400).json({ message: "Parent Seva and Deity are required" });
//     }

//     await updateSubSeva(req.params.id, req.body);
//     res.json({ message: "Sub Seva updated successfully" });
//   } catch (error) {
//     console.error("Error updating Sub Seva:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.put("/:sevaCode", async (req, res) => {
  try {
    const entityCode = req.headers["entity-code"];
    const userId = req.headers["user-id"];
    const sevaCode = req.params.sevaCode;
    
    const result = await updateSubSeva(sevaCode, req.body, entityCode, userId);
    
    res.json({
      success: true,
      message: "Sub seva updated successfully",
      data: result
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update sub seva" });
  }
});


router.get("/parent-sevas/list", async (req, res) => {
  try {
    console.log(req.headers ,"ABCD")
    const entityCode = req.headers["Entity-Code"];
    console.log(entityCode ,"------------------------------")
    
    // Validate entity code
    if (!entityCode) {
      console.error('Missing entity code in request headers');
      return res.status(400).json({
        success: false,
        data: [],
        message: "Entity code is required in headers"
      });
    }

    console.log('Processing request for entity code:', entityCode);
    
    const parentSevas = await getAvailableParentSevas(entityCode);
    
    console.log('Retrieved parent sevas:', parentSevas);

    return res.json({
      success: true,
      data: parentSevas || [],
      message: "Parent sevas fetched successfully"
    });

  } catch (error) {
    console.error("Error in parent-sevas/list endpoint:", error);
    return res.status(500).json({
      success: false,
      data: [],
      message: error.message || "Internal Server Error"
    });
  }
});
export default router;

