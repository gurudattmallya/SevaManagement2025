
// //routes/masterSevas.js
// import express from 'express';
// import {
//   getAllMasterSevas,
//   addMasterSeva,
//   updateMasterSeva,
//   toggleMasterSevaStatus,
// } from '../models/masterSeva.model.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const masterSevas = await getAllMasterSevas();
//     res.json(masterSevas);
//   } catch (error) {
//     console.error('Error fetching Master Sevas:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     await addMasterSeva(req.body);
//     res.status(201).send('Master Seva added successfully');
//   } catch (error) {
//     console.error('Error adding Master Seva:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     await updateMasterSeva(req.params.id, req.body);
//     res.send('Master Seva updated successfully');
//   } catch (error) {
//     console.error('Error updating Master Seva:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// router.patch('/:id/toggle', async (req, res) => {
//   try {
//     await toggleMasterSevaStatus(req.params.id);
//     res.send('Master Seva status updated successfully');
//   } catch (error) {
//     console.error('Error toggling Master Seva status:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// export default router;

// Backend: routes/masterSevas.js
import express from 'express';
import {
  getAllMasterSevas,
  addMasterSeva,
  updateMasterSeva,
  toggleMasterSevaStatus,
} from '../models/masterSeva.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { entityCode } = req.query;
    if (!entityCode) {
      return res.status(400).json({ error: 'Entity code is required' });
    }
    const masterSevas = await getAllMasterSevas(entityCode);
    res.json(masterSevas);
  } catch (error) {
    console.error('Error fetching Master Sevas:', error);
    res.status(500).send('Internal Server Error');
  }
});

// router.post('/', async (req, res) => {
//   try {
//     const { entityCode, userId } = req.body;
//     if (!entityCode || !userId) {
//       return res.status(400).json({ error: 'Entity code and user ID are required' });
//     }
//     await addMasterSeva(req.body);
//     res.status(201).send('Master Seva added successfully');
//   } catch (error) {
//     console.error('Error adding Master Seva:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

router.post('/', async (req, res) => {
  try {
    const { entityCode, userId, sevaType } = req.body;
    if (!entityCode || !userId || !sevaType) {
      return res.status(400).json({ error: 'Entity code, user ID and seva type are required' });
    }
    await addMasterSeva(req.body);
    res.status(201).send('Master Seva added successfully');
  } catch (error) {
    console.error('Error adding Master Seva:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { entityCode, userId } = req.body;
    if (!entityCode || !userId) {
      return res.status(400).json({ error: 'Entity code and user ID are required' });
    }
    await updateMasterSeva(req.params.id, req.body);
    res.send('Master Seva updated successfully');
  } catch (error) {
    console.error('Error updating Master Seva:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.patch('/:id/toggle', async (req, res) => {
  try {
    const { entityCode, userId } = req.body;
    if (!entityCode || !userId) {
      return res.status(400).json({ error: 'Entity code and user ID are required' });
    }
    await toggleMasterSevaStatus(req.params.id, entityCode, userId);
    res.send('Master Seva status updated successfully');
  } catch (error) {
    console.error('Error toggling Master Seva status:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
