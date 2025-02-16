
import { getConnection } from "../utils/db.js";

export const ShashwathSeva = {
    async getShashwathSevas(entityCode, filters = {}) {
        const conn = await getConnection();
        let query = `
            SELECT 
                ss.ENTITY_CODE,
                ss.SS_CUST_CODE,
                ss.SS_CODE,
                ssd.SSD_DD,
                ssd.SSD_MM,
                ss.SS_MAASA,
                ss.SS_THITHI,
                ssd.SSD_PAKSHA,
                m.RASHI_DESC as MAASA_NAME,
                t.TITHI_DESC as TITHI_NAME,
                ssd.SSD_SEVA_CODE,
                ssd.SSD_SEVA_AMT,
                ssd.SSD_TOT_SEVA_AMT,
                ss.SS_IN_MEMORY,
                ssd.SSD_CLEARING_DATE,
                ssd.SSD_RECPT_NUM,
                s.CUST_NAME,
                s.CUST_MOBILE_NUM1,
                s.CUST_EMAIL_ID1,
                sm.SEVA_DESC as SEVA_NAME,
                d.name as DEITY_NAME
            FROM shashwath_seva ss
            JOIN shashwath_seva_dtl ssd 
                ON ss.ENTITY_CODE = ssd.ENTITY_CODE 
                AND ss.SS_CUST_CODE = ssd.SSD_CUST_CODE 
                AND ss.SS_CODE = ssd.SSD_CODE
            JOIN sevadhar s 
                ON ss.ENTITY_CODE = s.ENTITY_CODE 
                AND ss.SS_CUST_CODE = s.CUST_CODE
            JOIN sevamast sm 
                ON ssd.ENTITY_CODE = sm.ENTITY_CODE 
                AND ssd.SSD_SEVA_CODE = sm.SEVA_CODE
            JOIN deities d
                ON sm.DEITY_ID = d.id
            LEFT JOIN maasa m
                ON ss.SS_MAASA = m.RASHI_CODE
            LEFT JOIN tithi t
                ON ss.SS_THITHI = t.TITHI_CODE
            WHERE ss.ENTITY_CODE = ?
        `;
        
        const params = [entityCode];

        // Handle Gregorian calendar filters
        if (filters.dd && filters.mm) {
            query += ` AND ssd.SSD_DD = ? AND ssd.SSD_MM = ?`;
            params.push(filters.dd, filters.mm);
        }

        // Handle Panchanga calendar filters
        if (filters.maasa) {
            query += ` AND ss.SS_MAASA = ?`;
            params.push(filters.maasa);
        }
        if (filters.paksha) {
            query += ` AND ssd.SSD_PAKSHA = ?`;
            params.push(filters.paksha);
        }
        if (filters.tithi) {
            query += ` AND ss.SS_THITHI = ?`;
            params.push(filters.tithi);
        }
        
        query += ` ORDER BY ssd.SSD_MM, ssd.SSD_DD DESC`;
        
        const result = await conn.query(query, params);
        return result;
    }
};

