// import express from 'express';
// import { Sevadhar } from '../models/sevadhar.model.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//     try {
//         const { entityCode, searchTerm } = req.query;
//         if (!entityCode) {
//             return res.status(400).json({ error: "Entity code is required" });
//         }
//         const sevadhars = await Sevadhar.getAllSevadhar(entityCode, searchTerm);
//         res.json(sevadhars);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error fetching sevadhars" });
//     }
// });

// router.get('/:entityCode/:custCode', async (req, res) => {
//     try {
//         const { entityCode, custCode } = req.params;
//         const sevadhar = await Sevadhar.getSevadharById(entityCode, custCode);
//         if (!sevadhar) {
//             return res.status(404).json({ error: "Sevadhar not found" });
//         }
//         res.json(sevadhar);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error fetching sevadhar" });
//     }
// });

// router.post('/', async (req, res) => {
//     try {
//         const result = await Sevadhar.createSevadhar(req.body);
//         res.status(201).json(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error creating sevadhar" });
//     }
// });

// router.put('/:entityCode/:custCode', async (req, res) => {
//     try {
//         const { entityCode, custCode } = req.params;
//         const result = await Sevadhar.updateSevadhar(entityCode, custCode, req.body);
//         res.json(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error updating sevadhar" });
//     }
// });

// export default router;

import express from 'express';
import { Sevadhar } from '../models/sevadhar.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { entityCode, searchTerm } = req.query;
        console.log('Backend received:', { entityCode, searchTerm }); // Add this
        if (!entityCode) {
            return res.status(400).json({ error: "Entity code is required" });
        }
        const sevadhars = await Sevadhar.getAllSevadhar(entityCode, searchTerm);
        console.log('Query result:', sevadhars); // Add this
        res.json(sevadhars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching sevadhars" });
    }
});

router.get('/:entityCode/:custCode', async (req, res) => {
    try {
        const { entityCode, custCode } = req.params;
        const sevadhar = await Sevadhar.getSevadharById(entityCode, custCode);
        if (!sevadhar) {
            return res.status(404).json({ error: "Sevadhar not found" });
        }
        res.json(sevadhar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching sevadhar" });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await Sevadhar.createSevadhar(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating sevadhar" });
    }
});

router.put('/:entityCode/:custCode', async (req, res) => {
    try {
        const { entityCode, custCode } = req.params;
        const result = await Sevadhar.updateSevadhar(entityCode, custCode, req.body);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating sevadhar" });
    }
});

export default router;
