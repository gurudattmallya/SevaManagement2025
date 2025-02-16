import { getConnection } from "../utils/db.js";

// export const OtherSeva = {
//     async getOtherSevas(entityCode) {
//         const conn = await getConnection();
//         const query = `
//             SELECT 
//                 os.ENTITY_CODE,
//                 os.NS_CUST_CODE,
//                 os.NS_CODE,
//                 os.NS_SEVA_DATE,
//                 osd.NSD_SEVA_CODE,
//                 osd.NSD_SEVA_AMT,
//                 osd.NSD_TOT_SEVA_AMT,
//                 osd.NSD_CLEARING_DATE,
//                 osd.NSD_RECPT_NUM,
//                 s.CUST_NAME,
//                 s.CUST_MOBILE_NUM1,
//                 s.CUST_EMAIL_ID1,
//                 s.CUST_RES_ADDRESS1,
//                 s.CUST_RES_ADDRESS2,
//                 s.CUST_RES_ADDRESS3,
//                 s.CUST_RES_CITY,
//                 s.CUST_RES_STATE,
//                 s.CUST_RES_COUNTRY,
//                 s.CUST_RES_PIN_NUM,
//                 s.CUST_PHONE_NUM1,
//                 s.CUST_WHATSAPP_NUM,
//                 sm.SEVA_DESC as SEVA_NAME,
//                 d.name as DEITY_NAME
//             FROM other_seva os
//             JOIN other_seva_dtl osd 
//                 ON os.ENTITY_CODE = osd.ENTITY_CODE 
//                 AND os.NS_CUST_CODE = osd.NSD_CUST_CODE 
//                 AND os.NS_CODE = osd.NSD_CODE
//             JOIN sevadhar s 
//                 ON os.ENTITY_CODE = s.ENTITY_CODE 
//                 AND os.NS_CUST_CODE = s.CUST_CODE
//             JOIN sevamast sm 
//                 ON osd.ENTITY_CODE = sm.ENTITY_CODE 
//                 AND osd.NSD_SEVA_CODE = sm.SEVA_CODE
//             JOIN deities d
//                 ON sm.DEITY_ID = d.id
//                 AND os.ENTITY_CODE = d.entity_code
//             WHERE os.ENTITY_CODE = ?
//             ORDER BY os.NS_SEVA_DATE DESC
//         `;
//         const result = await conn.query(query, [entityCode]);
//         return result;
//     }
// };


// export const OtherSeva = {
//     async getOtherSevas(entityCode, startDate = null, endDate = null) {
//         const conn = await getConnection();
//         let query = `
//             SELECT 
//                 os.ENTITY_CODE,
//                 os.NSD_CUST_CODE,
//                 os.NSD_CODE,
//                 os.NSD_SEVA_DATE,
//                 os.NSD_SEVA_CODE,
//                 os.NSD_SEVA_AMT,
//                 os.NSD_TOT_SEVA_AMT,
//                 os.NSD_CLEARING_DATE,
//                 os.NSD_RECPT_NUM,
//                 s.CUST_NAME,
//                 s.CUST_MOBILE_NUM1,
//                 sm.SEVA_DESC as SEVA_NAME,
//                 d.name as DEITY_NAME
//             FROM other_seva_dtl os
//             JOIN sevadhar s 
//                 ON os.ENTITY_CODE = s.ENTITY_CODE 
//                 AND os.NSD_CUST_CODE = s.CUST_CODE
//             JOIN sevamast sm 
//                 ON os.ENTITY_CODE = sm.ENTITY_CODE 
//                 AND os.NSD_SEVA_CODE = sm.SEVA_CODE
//             JOIN deities d
//                 ON sm.DEITY_ID = d.id
//             WHERE os.ENTITY_CODE = ?
//             ${startDate && endDate ? 'AND os.NSD_SEVA_DATE BETWEEN ? AND ?' : ''}
//             ORDER BY os.NSD_SEVA_DATE DESC
//         `;
        
//         const params = startDate && endDate ? [entityCode, startDate, endDate] : [entityCode];
//         const result = await conn.query(query, params);
//         return result;
//     }
// };


// export const OtherSeva = {
//     async getOtherSevas(entityCode, startDate = null, endDate = null) {
//         const conn = await getConnection();
//         let query = `
//             SELECT 
//                 os.ENTITY_CODE,
//                 os.NSD_CUST_CODE,
//                 os.NSD_CODE,
//                 os.NSD_SEVA_DATE,
//                 GROUP_CONCAT(sm.SEVA_DESC SEPARATOR ' / ') as SEVA_NAME,
//                 s.CUST_NAME,
//                 s.CUST_MOBILE_NUM1,
//                 s.CUST_EMAIL_ID1,
//                 GROUP_CONCAT(d.name SEPARATOR ' / ') as DEITY_NAME,
//                 SUM(os.NSD_TOT_SEVA_AMT) as TOTAL_AMOUNT,
//                 GROUP_CONCAT(os.NSD_CLEARING_DATE) as CLEARING_DATES
//             FROM other_seva_dtl os
//             JOIN sevadhar s 
//                 ON os.ENTITY_CODE = s.ENTITY_CODE 
//                 AND os.NSD_CUST_CODE = s.CUST_CODE
//             JOIN sevamast sm 
//                 ON os.ENTITY_CODE = sm.ENTITY_CODE 
//                 AND os.NSD_SEVA_CODE = sm.SEVA_CODE
//             JOIN deities d
//                 ON sm.DEITY_ID = d.id
//             WHERE os.ENTITY_CODE = ?
//             ${startDate && endDate ? 'AND os.NSD_SEVA_DATE BETWEEN ? AND ?' : ''}
//             GROUP BY s.CUST_MOBILE_NUM1, os.NSD_SEVA_DATE
//             ORDER BY os.NSD_SEVA_DATE DESC
//         `;
        
//         const params = startDate && endDate ? [entityCode, startDate, endDate] : [entityCode];
//         const result = await conn.query(query, params);
//         return result;
//     }
// };

export const OtherSeva = {
    async getOtherSevas(entityCode, startDate = null, endDate = null, searchTerm = null) {
        const conn = await getConnection();
        let query = `
            SELECT 
                os.ENTITY_CODE,
                os.NSD_CUST_CODE,
                os.NSD_CODE,
                os.NSD_SEVA_DATE,
                GROUP_CONCAT(sm.SEVA_DESC SEPARATOR ' / ') as SEVA_NAME,
                s.CUST_NAME,
                s.CUST_MOBILE_NUM1,
                s.CUST_EMAIL_ID1,
                GROUP_CONCAT(d.name SEPARATOR ' / ') as DEITY_NAME,
                SUM(os.NSD_TOT_SEVA_AMT) as TOTAL_AMOUNT,
                GROUP_CONCAT(os.NSD_CLEARING_DATE) as CLEARING_DATES
            FROM other_seva_dtl os
            JOIN sevadhar s 
                ON os.ENTITY_CODE = s.ENTITY_CODE 
                AND os.NSD_CUST_CODE = s.CUST_CODE
            JOIN sevamast sm 
                ON os.ENTITY_CODE = sm.ENTITY_CODE 
                AND os.NSD_SEVA_CODE = sm.SEVA_CODE
            JOIN deities d
                ON sm.DEITY_ID = d.id
            WHERE os.ENTITY_CODE = ?
            ${startDate && endDate ? 'AND os.NSD_SEVA_DATE BETWEEN ? AND ?' : ''}
            ${searchTerm ? 'AND (s.CUST_NAME LIKE ? OR s.CUST_MOBILE_NUM1 LIKE ? OR sm.SEVA_DESC LIKE ? OR d.name LIKE ?)' : ''}
            GROUP BY s.CUST_MOBILE_NUM1, os.NSD_SEVA_DATE
            ORDER BY os.NSD_SEVA_DATE DESC
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
