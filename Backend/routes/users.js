// // Backend: routes/users.js
// import express from 'express';
// import { Users } from '../models/user.models.js';
// import jwt from 'jsonwebtoken'; // Make sure to install: npm install jsonwebtoken

// const router = express.Router();
// const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

// router.post('/login', async (req, res) => {
//   try {
//     const { userId, password } = req.body;
//     const user = await Users.validateUser(userId, password);

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user.USER_ID, entityCode: user.ENTITY_CODE, created:user.CR_BY},
//       JWT_SECRET,
//       { expiresIn: '24h' }
//     );

//     res.json({
//       token,
//       entityCode: user.ENTITY_CODE,
//       userId: user.USER_ID,
//       created:user.CR_BY,
//       message: 'Login successful'
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// router.get('/', async (req, res) => {
//   const data = await Users.getDetails();
//   res.send(data);
// });

// export default router;




// Backend: routes/users.js
import express from 'express';
import { Users } from '../models/user.models.js';
import jwt from 'jsonwebtoken'; // Make sure to install: npm install jsonwebtoken

const router = express.Router();
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

router.post("/login", async (req, res) => {
    try {
        const { userId, password } = req.body;
        const data = await Users.validateUser(userId, password);

        if (!data.user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const {user , pageAccess} =data

        const token = jwt.sign(
            { 
                userId: user.USER_ID, 
                entityCode: user.ENTITY_CODE, 
                roleId: user.ROLE_ID 
            },
            'your-secret-key',
            { expiresIn: '24h' }
        );


        res.json({
            token,
            entityCode: user.ENTITY_CODE,
            userId: user.USER_ID,
            roleId: user.ROLE_ID,
            created: user.CR_BY,
            user: user,
            message: 'Login successful',
            pageAccess : pageAccess,
            USER_NAME:user.USER_NAME
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add this new route
router.get("/permissions/:entityCode/:roleId", async (req, res) => {
  try {
      const { entityCode, roleId } = req.params;
      const permissions = await Users.getUserPermissions(entityCode, roleId);
      res.json(permissions);
  } catch (error) {
      console.error('Error fetching permissions:', error);
      res.status(500).json({ message: 'Error fetching permissions' });
  }
});



router.get('/', async (req, res) => {
  const data = await Users.getDetails();
  res.send(data);
});

export default router;

