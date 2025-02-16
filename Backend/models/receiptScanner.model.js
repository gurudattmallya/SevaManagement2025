

import { getConnection } from "../utils/db.js";

// export class ReceiptScanner {
//   static async verifyAndUpdateReceipt(entityCode, finYear, receiptNumber) {
//     const conn = await getConnection();
//     console.log('Executing query with:', { entityCode, finYear, receiptNumber });
  
//     const [rows] = await conn.query(`
//       SELECT 
//         ENTITY_CODE,
//         FIN_YEAR,
//         REC_NUM,
//         SL_NO,
//         CUST_NAME,
//         REC_AMT,
//         DELIVERY_STATUS,
//         STATUS,
//         MO_ON
//       FROM receipt_payment 
//       WHERE ENTITY_CODE = ? 
//       AND FIN_YEAR = ? 
//       AND REC_NUM = ?
//       LIMIT 1
//     `, [entityCode, finYear, receiptNumber]);
  
//     console.log('Query result:', rows[0]);
  
//     if (!rows || rows.length === 0) {
//       throw {
//         message: 'Receipt not found',
//         details: { entityCode, finYear, receiptNumber }
//       };
//     }
  
//     const receipt = rows[0];

//     // Check DELIVERY_STATUS only if receipt exists
//     if (receipt && receipt.DELIVERY_STATUS === 'D') {
//       throw {
//         message: 'Prasad already collected',
//         details: { 
//           entityCode, 
//           finYear, 
//           receiptNumber,
//           collectedOn: receipt.MO_ON 
//         }
//       };
//     }
    
//     await conn.query(`
//       UPDATE receipt_payment 
//       SET 
//         DELIVERY_STATUS = 'D',
//         MO_BY = 'SCANNER',
//         MO_ON = NOW()
//       WHERE ENTITY_CODE = ? 
//       AND FIN_YEAR = ? 
//       AND REC_NUM = ?
//     `, [entityCode, finYear, receiptNumber]);
  
//     return receipt;
//   }
// }
export class ReceiptScanner {
  static async verifyAndUpdateReceipt(entityCode, finYear, receiptNumber) {
    const conn = await getConnection();
    
    const [rows] = await conn.query(`
      SELECT 
        ENTITY_CODE,
        FIN_YEAR,
        REC_NUM,
        SL_NO,
        CUST_NAME,
        REC_AMT,
        DELIVERY_STATUS,
        STATUS,
        MO_ON
      FROM receipt_payment
      WHERE ENTITY_CODE = ?
      AND FIN_YEAR = ?
      AND REC_NUM = ?
      AND SL_NO = 1
    `, [entityCode, finYear, receiptNumber]);

    const receipt = rows;

    if (!receipt) {
      throw {
        message: 'Receipt details not found',
        details: { entityCode, finYear, receiptNumber }
      };
    }

    if (receipt.DELIVERY_STATUS === 'D') {
      const deliveryDate = receipt.MO_ON ? new Date(receipt.MO_ON).toLocaleString() : 'Unknown';
      throw {
        message: `Prasad already delivered on ${deliveryDate}`,
        details: { entityCode, finYear, receiptNumber, deliveryDate }
      };
    }

    await conn.query(`
      UPDATE receipt_payment
      SET
        DELIVERY_STATUS = 'D',
        MO_BY = 'SCANNER',
        MO_ON = NOW()
      WHERE ENTITY_CODE = ?
      AND FIN_YEAR = ?
      AND REC_NUM = ?
      AND SL_NO = 1
    `, [entityCode, finYear, receiptNumber]);

    return {
      ...receipt,
      DELIVERY_STATUS: 'D',
      MO_ON: new Date()
    };
  }
}

