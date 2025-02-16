// import express from 'express';
// import { ReceiptScanner } from '../models/receiptScanner.model.js';

// const router = express.Router();

// router.post('/verify-receipt', async (req, res) => {
//   const { entityCode, finYear, receiptNumber } = req.body;
//   console.log('Received scan request:', { entityCode, finYear, receiptNumber });

//   try {
//     const queryResult = await ReceiptScanner.verifyAndUpdateReceipt(
//       entityCode.toString(), 
//       parseInt(finYear),
//       parseInt(receiptNumber)
//     );

//     // Send the successful response with the query result
//     res.json({
//       success: true,
//       receipt: queryResult,  // Send the entire query result directly
//       message: `Receipt ${entityCode}/${finYear}/${receiptNumber} verified successfully`
//     });

//   } catch (error) {
//     console.log('Verification error:', error);
//     res.status(404).json({
//       success: false,
//       message: 'Receipt verification failed',
//       details: error.message
//     });
//   }
// });




// export default router;

import express from 'express';
import { ReceiptScanner } from '../models/receiptScanner.model.js';

const router = express.Router();

router.post('/verify-receipt', async (req, res) => {
  const { entityCode, finYear, receiptNumber } = req.body;
  
  console.log('Processing receipt verification:', {
    entityCode,
    finYear,
    receiptNumber,
    requestBody: req.body
  });

  try {
    // Validate input
    if (!entityCode || !finYear || !receiptNumber) {
      throw new Error('Missing required parameters');
    }

    const receipt = await ReceiptScanner.verifyAndUpdateReceipt(
      entityCode.toString(),
      parseInt(finYear),
      parseInt(receiptNumber)
    );

    console.log('Verification successful:', receipt);

    res.json({
      success: true,
      receipt,
      message: `Receipt ${entityCode}/${finYear}/${receiptNumber} processed successfully`
    });

  } catch (error) {
    console.error('Verification failed:', {
      error: error.message,
      stack: error.stack,
      details: error.details
    });

    const statusCode = error.message.includes('not found') ? 404 : 400;

    res.status(statusCode).json({
      success: false,
      message: error.message,
      details: error.details || {}
    });
  }
});

export default router;