

import { getConnection } from "../utils/db.js";
// // export const NityanidhiSeva = {
// //     async getNityanidhiSevas(entityCode, startDate = null, endDate = null) {
// //         const conn = await getConnection();
// //         let query = `
// //             SELECT 
// //                 ns.ENTITY_CODE,
// //                 ns.NS_CUST_CODE,
// //                 ns.NS_CODE,
// //                 ns.NS_SEVA_DATE,
// //                 nsd.NSD_SEVA_CODE,
// //                 nsd.NSD_SEVA_AMT,
// //                 nsd.NSD_TOT_SEVA_AMT,
// //                 nsd.NSD_CLEARING_DATE,
// //                 nsd.NSD_RECPT_NUM,
// //                 s.CUST_NAME,
// //                 s.CUST_MOBILE_NUM1,
// //                 s.CUST_EMAIL_ID1,
// //                 sm.SEVA_DESC as SEVA_NAME,
// //                 d.name as DEITY_NAME
// //             FROM nithyanidhi_seva ns
// //             JOIN nithyanidhi_seva_dtl nsd 
// //                 ON ns.ENTITY_CODE = nsd.ENTITY_CODE 
// //                 AND ns.NS_CUST_CODE = nsd.NSD_CUST_CODE 
// //                 AND ns.NS_CODE = nsd.NSD_CODE
// //             JOIN sevadhar s 
// //                 ON ns.ENTITY_CODE = s.ENTITY_CODE 
// //                 AND ns.NS_CUST_CODE = s.CUST_CODE
// //             JOIN sevamast sm 
// //                 ON nsd.ENTITY_CODE = sm.ENTITY_CODE 
// //                 AND nsd.NSD_SEVA_CODE = sm.SEVA_CODE
// //             JOIN deities d
// //                 ON sm.DEITY_ID = d.id
// //             WHERE ns.ENTITY_CODE = ?
// //             ${startDate && endDate ? 'AND ns.NS_SEVA_DATE BETWEEN ? AND ?' : ''}
// //             ORDER BY ns.NS_SEVA_DATE DESC
// //         `;
        
// //         const params = startDate && endDate ? [entityCode, startDate, endDate] : [entityCode];
// //         const result = await conn.query(query, params);
// //         return result;
// //     }
// // };


// export const NityanidhiSeva = {
//     getNityanidhiSevas: async function(entityCode, startDate = null, endDate = null) {
//         const conn = await getConnection();
//         let query = `
//             SELECT 
//                 ns.ENTITY_CODE,
//                 ns.NS_CUST_CODE,
//                 ns.NS_CODE,
//                 ns.NS_SEVA_DATE,
//                 GROUP_CONCAT(sm.SEVA_DESC SEPARATOR ' / ') as SEVA_NAME,
//                 s.CUST_NAME,
//                 s.CUST_MOBILE_NUM1,
//                 s.CUST_EMAIL_ID1,
//                 GROUP_CONCAT(d.name SEPARATOR ' / ') as DEITY_NAME,
//                 SUM(nsd.NSD_TOT_SEVA_AMT) as TOTAL_AMOUNT,
//                 GROUP_CONCAT(nsd.NSD_CLEARING_DATE) as CLEARING_DATES
//             FROM nithyanidhi_seva ns
//             JOIN nithyanidhi_seva_dtl nsd 
//                 ON ns.ENTITY_CODE = nsd.ENTITY_CODE 
//                 AND ns.NS_CUST_CODE = nsd.NSD_CUST_CODE 
//                 AND ns.NS_CODE = nsd.NSD_CODE
//             JOIN sevadhar s 
//                 ON ns.ENTITY_CODE = s.ENTITY_CODE 
//                 AND ns.NS_CUST_CODE = s.CUST_CODE
//             JOIN sevamast sm 
//                 ON nsd.ENTITY_CODE = sm.ENTITY_CODE 
//                 AND nsd.NSD_SEVA_CODE = sm.SEVA_CODE
//             JOIN deities d
//                 ON sm.DEITY_ID = d.id
//             WHERE ns.ENTITY_CODE = ?
//             ${startDate && endDate ? 'AND ns.NS_SEVA_DATE BETWEEN ? AND ?' : ''}
//             GROUP BY s.CUST_MOBILE_NUM1, ns.NS_SEVA_DATE
//             ORDER BY ns.NS_SEVA_DATE DESC
//         `;
        
//         const params = startDate && endDate ? [entityCode, startDate, endDate] : [entityCode];
//         const result = await conn.query(query, params);
//         return result;
//     }
// };

export const NityanidhiSeva = {
    getNityanidhiSevas: async function(entityCode, startDate = null, endDate = null, searchTerm = null) {
        const conn = await getConnection();
        let query = `
            SELECT 
                ns.ENTITY_CODE,
                ns.NS_CUST_CODE,
                ns.NS_CODE,
                ns.NS_SEVA_DATE,
                GROUP_CONCAT(sm.SEVA_DESC SEPARATOR ' / ') as SEVA_NAME,
                s.CUST_NAME,
                s.CUST_MOBILE_NUM1,
                s.CUST_EMAIL_ID1,
                GROUP_CONCAT(d.name SEPARATOR ' / ') as DEITY_NAME,
                SUM(nsd.NSD_TOT_SEVA_AMT) as TOTAL_AMOUNT,
                GROUP_CONCAT(nsd.NSD_CLEARING_DATE) as CLEARING_DATES
            FROM nithyanidhi_seva ns
            JOIN nithyanidhi_seva_dtl nsd 
                ON ns.ENTITY_CODE = nsd.ENTITY_CODE 
                AND ns.NS_CUST_CODE = nsd.NSD_CUST_CODE 
                AND ns.NS_CODE = nsd.NSD_CODE
            JOIN sevadhar s 
                ON ns.ENTITY_CODE = s.ENTITY_CODE 
                AND ns.NS_CUST_CODE = s.CUST_CODE
            JOIN sevamast sm 
                ON nsd.ENTITY_CODE = sm.ENTITY_CODE 
                AND nsd.NSD_SEVA_CODE = sm.SEVA_CODE
            JOIN deities d
                ON sm.DEITY_ID = d.id
            WHERE ns.ENTITY_CODE = ?
            ${startDate && endDate ? 'AND ns.NS_SEVA_DATE BETWEEN ? AND ?' : ''}
            ${searchTerm ? 'AND (s.CUST_NAME LIKE ? OR s.CUST_MOBILE_NUM1 LIKE ? OR sm.SEVA_DESC LIKE ? OR d.name LIKE ?)' : ''}
            GROUP BY s.CUST_MOBILE_NUM1, ns.NS_SEVA_DATE
            ORDER BY ns.NS_SEVA_DATE DESC
        `;
        
        const searchPattern = searchTerm ? `%${searchTerm}%` : null;
        const params = [
            entityCode,
            ...(startDate && endDate ? [startDate, endDate] : []),
            ...(searchTerm ? [searchPattern, searchPattern, searchPattern, searchPattern] : [])
        ];
        
        const result = await conn.query(query, params);
        return result;
    }
};
