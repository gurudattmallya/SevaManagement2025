// import { getConnection } from "../utils/db.js";

// const serializeData = (data) => {
//     return JSON.parse(JSON.stringify(data, (key, value) =>
//         typeof value === 'bigint' ? value.toString() : value
//     ));
// };

// export class ReceiptPayment {
//     static getCurrentFinancialYear() {
//         const today = new Date();
//         const month = today.getMonth() + 1;
//         const year = today.getFullYear();
//         return month <= 3 ? year - 1 : year;
//     }

//     static async getNextReceiptNumber(entityCode, finYear) {
//         const conn = await getConnection();
//         const [result] = await conn.query(
//             `SELECT COALESCE(MAX(REC_NUM), 0) + 1 as nextNum 
//              FROM receipt_payment 
//              WHERE ENTITY_CODE = ? AND FIN_YEAR = ?`,
//             [entityCode, finYear]
//         );
//         return serializeData(result.nextNum);
//     }
//       static async createReceiptPayment(receiptData, receiptDetails) {
//           const conn = await getConnection();
        
//           try {
//               await conn.query('START TRANSACTION');

//               const finYear = this.getCurrentFinancialYear();
//               const recNum = await this.getNextReceiptNumber(receiptData.ENTITY_CODE, finYear);
            
//               const [custCodeResult] = await conn.query(
//                   `SELECT COALESCE(MAX(CUST_CODE), 0) + 1 as nextCustCode FROM receipt_payment`
//               );
//               const custCode = custCodeResult.nextCustCode;
//               const currentDate = new Date();

//               // Convert the ISO datetime string to MySQL datetime format
//               const formatDateTime = (dateString) => {
//                   if (!dateString) return null;
//                   const date = new Date(dateString);
//                   return date.toISOString().slice(0, 19).replace('T', ' ');
//               };

//               const mainReceipt = [
//                   receiptData.ENTITY_CODE,
//                   finYear,
//                   receiptData.PAYMENT_TYPE,
//                   recNum,
//                   1,
//                   custCode,
//                   receiptData.CUST_NAME,
//                   formatDateTime(receiptData.TRANS_DATE),    // Format TRANS_DATE
//                   formatDateTime(receiptData.VALUE_DATE),    // Format VALUE_DATE
//                   receiptData.REC_AMT,
//                   receiptData.CLEARING_TYPE,
//                   receiptData.CLEARING_REF_NUM,
//                   formatDateTime(receiptData.CLEARING_DATE), // Format CLEARING_DATE
//                   'N',
//                   'P',
//                   receiptData.CR_BY,
//                   formatDateTime(currentDate),               // Format CR_ON
//                   formatDateTime(currentDate),               // Format FA_TRAN_DATE
//                   1
//               ];

//               await conn.query(
//                   `INSERT INTO receipt_payment (
//                       ENTITY_CODE, FIN_YEAR, PAYMENT_TYPE, REC_NUM, SL_NO,
//                       CUST_CODE, CUST_NAME, TRANS_DATE, VALUE_DATE, REC_AMT,
//                       CLEARING_TYPE, CLEARING_REF_NUM, CLEARING_DATE,
//                       YEAR_END_ENTRY, STATUS, CR_BY, CR_ON, FA_TRAN_DATE,
//                       FA_TRAN_BATCH_NUMBER
//                   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//                   mainReceipt
//               );

//               // Insert receipt details
//               for (let i = 0; i < receiptDetails.length; i++) {
//                   const detail = receiptDetails[i];
//                   await conn.query(
//                       `INSERT INTO receipt_payment_dtls (
//                           ENTITY_CODE, FIN_YEAR, PAYMENT_TYPE, REC_NUM, DTL_SL,
//                           SEVA_CODE, SEVA_AMT, SEVA_QTY, TOT_SEVA_AMT,
//                           MAASA, PAKSHA, THITHI, SEVA_DATE, SS_DD, SS_MM
//                       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//                       [
//                           receiptData.ENTITY_CODE,
//                           finYear,
//                           receiptData.PAYMENT_TYPE,
//                           recNum,
//                           i + 1, // DTL_SL
//                           detail.SEVA_CODE,
//                           detail.SEVA_AMT,
//                           detail.SEVA_QTY,
//                           detail.TOT_SEVA_AMT,
//                           detail.MAASA,
//                           detail.PAKSHA,
//                           detail.THITHI,
//                           formatDateTime(detail.SEVA_DATE),
//                           detail.SS_DD,
//                           detail.SS_MM
//                       ]
//                   );
//               }

//               await conn.query('COMMIT');
            
//               return serializeData({ 
//                   REC_NUM: recNum,
//                   FIN_YEAR: finYear,
//                   ENTITY_CODE: receiptData.ENTITY_CODE,
//                   CUST_CODE: custCode
//               });
//           } catch (error) {
//               await conn.query('ROLLBACK');
//               throw error;
//           }
//       }
//     }


import { getConnection } from "../utils/db.js";

const serializeData = (data) => {
    return JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
};

export class ReceiptPayment {

    // Add this new method to the ReceiptPayment class
static async getNextReceiptNumberForDisplay(entityCode) {
    const finYear = this.getCurrentFinancialYear();
    const conn = await getConnection();
    const [result] = await conn.query(
        `SELECT COALESCE(MAX(REC_NUM), 0) + 1 as nextNum 
         FROM receipt_payment 
         WHERE ENTITY_CODE = ? AND FIN_YEAR = ?`,
        [entityCode, finYear]
    );
    
    return {
        nextNum: serializeData(result.nextNum),
        finYear: finYear,
        entityCode: entityCode
    };
}

    static getCurrentFinancialYear() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        return month <= 3 ? year - 1 : year;
    }

    static async getNextReceiptNumber(entityCode, finYear) {
        const conn = await getConnection();
        const [result] = await conn.query(
            `SELECT COALESCE(MAX(REC_NUM), 0) + 1 as nextNum 
             FROM receipt_payment 
             WHERE ENTITY_CODE = ? AND FIN_YEAR = ? AND PAYMENT_TYPE = 'C'`,
            [entityCode, finYear]
        );
        return serializeData(result.nextNum);
    }

    static async createReceiptPayment(receiptData, receiptDetails) {
        const conn = await getConnection();
        
        try {
            await conn.query('START TRANSACTION');

            const finYear = this.getCurrentFinancialYear();
            
            // Get next receipt number with validation
            const [existingReceipt] = await conn.query(
                `SELECT MAX(REC_NUM) as maxNum 
                 FROM receipt_payment 
                 WHERE ENTITY_CODE = ? AND FIN_YEAR = ? AND PAYMENT_TYPE = ?`,
                [receiptData.ENTITY_CODE, finYear, receiptData.PAYMENT_TYPE]
            );
            
            const recNum = (existingReceipt.maxNum || 0) + 1;
            
            // Get next customer code
            const [custCodeResult] = await conn.query(
                `SELECT COALESCE(MAX(CUST_CODE), 0) + 1 as nextCustCode FROM receipt_payment`
            );
            const custCode = custCodeResult.nextCustCode;
            const currentDate = new Date();

            const formatDateTime = (dateString) => {
                if (!dateString) return null;
                const date = new Date(dateString);
                return date.toISOString().slice(0, 19).replace('T', ' ');
            };

            // Insert main receipt with validated receipt number
            const mainReceipt = [
                receiptData.ENTITY_CODE,
                finYear,
                receiptData.PAYMENT_TYPE,
                recNum,
                1, // SL_NO
                custCode,
                receiptData.CUST_NAME,
                formatDateTime(receiptData.TRANS_DATE),
                formatDateTime(receiptData.VALUE_DATE),
                receiptData.REC_AMT,
                receiptData.CLEARING_TYPE,
                receiptData.CLEARING_REF_NUM,
                formatDateTime(receiptData.CLEARING_DATE),
                'N', // YEAR_END_ENTRY
                'P', // STATUS
                receiptData.CR_BY,
                formatDateTime(currentDate),
                formatDateTime(currentDate),
                1 // FA_TRAN_BATCH_NUMBER
            ];

            await conn.query(
                `INSERT INTO receipt_payment (
                    ENTITY_CODE, FIN_YEAR, PAYMENT_TYPE, REC_NUM, SL_NO,
                    CUST_CODE, CUST_NAME, TRANS_DATE, VALUE_DATE, REC_AMT,
                    CLEARING_TYPE, CLEARING_REF_NUM, CLEARING_DATE,
                    YEAR_END_ENTRY, STATUS, CR_BY, CR_ON, FA_TRAN_DATE,
                    FA_TRAN_BATCH_NUMBER
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                mainReceipt
            );

            // Insert receipt details with the same receipt number
            for (let i = 0; i < receiptDetails.length; i++) {
                const detail = receiptDetails[i];
                await conn.query(
                    `INSERT INTO receipt_payment_dtls (
                        ENTITY_CODE, FIN_YEAR, PAYMENT_TYPE, REC_NUM, DTL_SL,
                        SEVA_CODE, SEVA_AMT, SEVA_QTY, TOT_SEVA_AMT,
                        MAASA, PAKSHA, THITHI, SEVA_DATE, SS_DD, SS_MM
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        receiptData.ENTITY_CODE,
                        finYear,
                        receiptData.PAYMENT_TYPE,
                        recNum,
                        i + 1,
                        detail.SEVA_CODE,
                        detail.SEVA_AMT,
                        detail.SEVA_QTY,
                        detail.TOT_SEVA_AMT,
                        detail.MAASA,
                        detail.PAKSHA,
                        detail.THITHI,
                        formatDateTime(detail.SEVA_DATE),
                        detail.SS_DD,
                        detail.SS_MM
                    ]
                );
            }

            await conn.query('COMMIT');
            
            return serializeData({ 
                REC_NUM: recNum,
                FIN_YEAR: finYear,
                ENTITY_CODE: receiptData.ENTITY_CODE,
                CUST_CODE: custCode
            });
        } catch (error) {
            await conn.query('ROLLBACK');
            throw error;
        }
    }
}

