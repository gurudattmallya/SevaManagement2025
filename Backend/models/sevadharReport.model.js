// import { getConnection } from "../utils/db.js";

// // class SevadharReport {
// //     static async getSevadharReport(entityCode, sevadharId, sevaType, startDate, endDate) {
// //         const conn = await getConnection();
// //         let query;
        
// //         if (sevaType === 'Shashwath') {
// //             query = `
// //                 SELECT s.*, sm.SEVA_DESC, d.name as DEITY_NAME,
// //                        s.SSD_TOT_SEVA_AMT as TOTAL_AMOUNT,
// //                        s.SSD_CLEARING_DATE as CLEARING_DATE
// //                 FROM shashwath_seva_dtl s
// //                 JOIN sevamast sm ON s.SSD_SEVA_CODE = sm.SEVA_CODE 
// //                     AND s.ENTITY_CODE = sm.ENTITY_CODE
// //                 LEFT JOIN Deities d ON sm.DEITY_ID = d.id
// //                 WHERE s.ENTITY_CODE = ? 
// //                 AND s.SSD_CUST_CODE = ?
// //                 AND DATE(s.SSD_RECPT_DATE) BETWEEN ? AND ?
// //             `;
// //         } else if (sevaType === 'Nityanidhi') {
// //             query = `
// //                 SELECT n.*, sm.SEVA_DESC, d.name as DEITY_NAME,
// //                        n.NSD_TOT_SEVA_AMT as TOTAL_AMOUNT,
// //                        n.NSD_CLEARING_DATE as CLEARING_DATE
// //                 FROM nithyanidhi_seva_dtl n
// //                 JOIN sevamast sm ON n.NSD_SEVA_CODE = sm.SEVA_CODE 
// //                     AND n.ENTITY_CODE = sm.ENTITY_CODE
// //                 LEFT JOIN Deities d ON sm.DEITY_ID = d.id
// //                 WHERE n.ENTITY_CODE = ? 
// //                 AND n.NSD_CUST_CODE = ?
// //                 AND DATE(n.NSD_RECPT_DATE) BETWEEN ? AND ?
// //             `;
// //         } else {
// //             query = `
// //                 SELECT o.*, sm.SEVA_DESC, d.name as DEITY_NAME,
// //                        o.NSD_TOT_SEVA_AMT as TOTAL_AMOUNT,
// //                        o.NSD_CLEARING_DATE as CLEARING_DATE
// //                 FROM other_seva_dtl o
// //                 JOIN sevamast sm ON o.NSD_SEVA_CODE = sm.SEVA_CODE 
// //                     AND o.ENTITY_CODE = sm.ENTITY_CODE
// //                 LEFT JOIN Deities d ON sm.DEITY_ID = d.id
// //                 WHERE o.ENTITY_CODE = ? 
// //                 AND o.NSD_CUST_CODE = ?
// //                 AND DATE(o.NSD_RECPT_DATE) BETWEEN ? AND ?
// //             `;
// //         }
        
// //         try {
// //             const result = await conn.query(query, [
// //                 entityCode, 
// //                 parseInt(sevadharId), 
// //                 startDate, 
// //                 endDate
// //             ]);
// //             return result;
// //         } catch (error) {
// //             console.error('Database query error:', error);
// //             throw error;
// //         }
// //     }
// // }

// // export { SevadharReport };

// class SevadharReport {
//   static async getSevadharReport(
//     entityCode,
//     sevadharId,
//     sevaType,
//     startDate,
//     endDate
//   ) {
//     const conn = await getConnection();
//     let query;

//     if (sevaType === "Shashwath") {
//       query = `
//                 SELECT s.*, sm.SEVA_DESC, d.name as DEITY_NAME,
//                        s.SSD_TOT_SEVA_AMT as TOTAL_AMOUNT,
//                        s.SSD_CLEARING_DATE as CLEARING_DATE
//                 FROM shashwath_seva_dtl s
//                 JOIN sevamast sm ON s.SSD_SEVA_CODE = sm.SEVA_CODE 
//                     AND s.ENTITY_CODE = sm.ENTITY_CODE
//                 LEFT JOIN Deities d ON sm.DEITY_ID = d.id
//                 WHERE s.ENTITY_CODE = ? 
//                 AND s.SSD_CUST_CODE = ?
//                 AND DATE(s.SSD_RECPT_DATE) BETWEEN ? AND ?
//             `;
//     } else if (sevaType === "Nityanidhi") {
//       query = `
//                 SELECT n.*, sm.SEVA_DESC, d.name as DEITY_NAME,
//                        n.NSD_TOT_SEVA_AMT as TOTAL_AMOUNT,
//                        n.NSD_CLEARING_DATE as CLEARING_DATE
//                 FROM nithyanidhi_seva_dtl n
//                 JOIN sevamast sm ON n.NSD_SEVA_CODE = sm.SEVA_CODE 
//                     AND n.ENTITY_CODE = sm.ENTITY_CODE
//                 LEFT JOIN Deities d ON sm.DEITY_ID = d.id
//                 WHERE n.ENTITY_CODE = ? 
//                 AND n.NSD_CUST_CODE = ?
//                 AND DATE(n.NSD_RECPT_DATE) BETWEEN ? AND ?
//             `;
//     } else {
//       query = `
//                 SELECT o.*, sm.SEVA_DESC, d.name as DEITY_NAME,
//                        o.NSD_TOT_SEVA_AMT as TOTAL_AMOUNT,
//                        o.NSD_CLEARING_DATE as CLEARING_DATE
//                 FROM other_seva_dtl o
//                 JOIN sevamast sm ON o.NSD_SEVA_CODE = sm.SEVA_CODE 
//                     AND o.ENTITY_CODE = sm.ENTITY_CODE
//                 LEFT JOIN Deities d ON sm.DEITY_ID = d.id
//                 WHERE o.ENTITY_CODE = ? 
//                 AND o.NSD_CUST_CODE = ?
//                 AND DATE(o.NSD_RECPT_DATE) BETWEEN ? AND ?
//             `;
//     }

//     try {
//       const [result] = await conn.query(query, [
//         entityCode,
//         parseInt(sevadharId),
//         startDate,
//         endDate
//       ]);
//       return result;
//     } catch (error) {
//       console.error("Database query error:", error);
//       throw error;
//     }
//   }
// }

// export { SevadharReport };

import { getConnection } from "../utils/db.js";

class SevadharReport {
  static async getSevadharReport(
    entityCode,
    sevadharId,
    sevaType,
    startDate,
    endDate
  ) {
    const conn = await getConnection();
    let query;

    if (sevaType === "Shashwath") {
      query = `
                SELECT 
                    s.SSD_CODE,
                    s.SSD_SEVA_CODE,
                    s.SSD_TOT_SEVA_AMT as TOTAL_AMOUNT,
                    s.SSD_CLEARING_DATE as CLEARING_DATE,
                    s.SSD_RECPT_DATE,
                    s.SSD_MAASA,
                    s.SSD_PAKSHA,
                    s.SSD_THITHI,
                    s.SSD_DD,
                    s.SSD_MM,
                    sm.SEVA_DESC,
                    d.name as DEITY_NAME
                FROM shashwath_seva_dtl s
                JOIN sevamast sm ON s.SSD_SEVA_CODE = sm.SEVA_CODE 
                    AND s.ENTITY_CODE = sm.ENTITY_CODE
                LEFT JOIN Deities d ON sm.DEITY_ID = d.id
                WHERE s.ENTITY_CODE = ? 
                AND s.SSD_CUST_CODE = ?
                AND DATE(s.SSD_RECPT_DATE) BETWEEN ? AND ?
                ORDER BY s.SSD_RECPT_DATE DESC
            `;
    } else if (sevaType === "Nityanidhi") {
      // For Nityanidhi seva type
      query = `
    SELECT 
        n.NSD_CODE,
        n.NSD_SEVA_CODE,
        n.NSD_TOT_SEVA_AMT as TOTAL_AMOUNT,
        n.NSD_CLEARING_DATE as CLEARING_DATE,
        n.NSD_SEVA_DATE,
        sm.SEVA_DESC,
        d.name as DEITY_NAME
    FROM nithyanidhi_seva_dtl n
    JOIN sevamast sm ON n.NSD_SEVA_CODE = sm.SEVA_CODE 
        AND n.ENTITY_CODE = sm.ENTITY_CODE
    LEFT JOIN Deities d ON sm.DEITY_ID = d.id
    WHERE n.ENTITY_CODE = ? 
    AND n.NSD_CUST_CODE = ?
    AND DATE(n.NSD_SEVA_DATE) BETWEEN ? AND ?
    ORDER BY n.NSD_SEVA_DATE DESC
`;
    } else {
      query = `
                SELECT 
                    o.NSD_CODE,
                    o.NSD_SEVA_CODE,
                    o.NSD_TOT_SEVA_AMT as TOTAL_AMOUNT,
                    o.NSD_CLEARING_DATE as CLEARING_DATE,
                    o.NSD_SEVA_DATE,
                    o.NSD_RECPT_DATE,
                    sm.SEVA_DESC,
                    d.name as DEITY_NAME
                FROM other_seva_dtl o
                JOIN sevamast sm ON o.NSD_SEVA_CODE = sm.SEVA_CODE 
                    AND o.ENTITY_CODE = sm.ENTITY_CODE
                LEFT JOIN Deities d ON sm.DEITY_ID = d.id
                WHERE o.ENTITY_CODE = ? 
                AND o.NSD_CUST_CODE = ?
                AND DATE(o.NSD_SEVA_DATE) BETWEEN ? AND ?
                ORDER BY o.NSD_RECPT_DATE DESC
            `;
    }

    try {
      const rows = await conn.execute(query, [
        entityCode,
        parseInt(sevadharId),
        startDate,
        endDate
      ]);
      return rows;
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    } finally {
     
    }
  }
}

export { SevadharReport };

