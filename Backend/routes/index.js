//index.js
import express from 'express';
const router = express.Router();

/* GET home page. */
router.get(
  '/', 
  function (req, res, next) { 
    res.send('This is a index route')
  },
);

// router.get('/deekshith', function (req, res, next) {
//   res.send('deekshith');
// });

export default router;
