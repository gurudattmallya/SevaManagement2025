import { getConnection } from "../utils/db.js";

export class Reports {
    static async getCombinedReport(entityCode, startDate, endDate, sevaType) {
        const conn = await getConnection();
        let query = '';
        let params = [];

        if (sevaType === 'all' || !sevaType) {
            query = `
                (SELECT 
                    'Shashwath' as seva_type,
                    ss.ENTITY_CODE,
                    ss.SS_CUST_CODE as CUST_CODE,
                    ss.SS_CODE as SEVA_CODE,
                    CONCAT(ss.SS_DD, '/', ss.SS_MM) as SEVA_DATE,
                    ssd.SSD_SEVA_CODE,
                    ssd.SSD_TOT_SEVA_AMT,
                    ssd.SSD_CLEARING_DATE,
                    s.CUST_NAME,
                    s.CUST_MOBILE_NUM1,
                    sm.SEVA_DESC as SEVA_NAME,
                    d.name as DEITY_NAME
                FROM shashwath_seva ss
                JOIN shashwath_seva_dtl ssd ON ss.ENTITY_CODE = ssd.ENTITY_CODE 
                    AND ss.SS_CUST_CODE = ssd.SSD_CUST_CODE 
                    AND ss.SS_CODE = ssd.SSD_CODE
                JOIN sevadhar s ON ss.ENTITY_CODE = s.ENTITY_CODE 
                    AND ss.SS_CUST_CODE = s.CUST_CODE
                JOIN sevamast sm ON ssd.ENTITY_CODE = sm.ENTITY_CODE 
                    AND ssd.SSD_SEVA_CODE = sm.SEVA_CODE
                JOIN deities d ON sm.DEITY_ID = d.id
                WHERE ss.ENTITY_CODE = ?)

                UNION ALL

                (SELECT 
                    'Nityanidhi' as seva_type,
                    ns.ENTITY_CODE,
                    ns.NS_CUST_CODE as CUST_CODE,
                    ns.NS_CODE as SEVA_CODE,
                    ns.NS_SEVA_DATE as SEVA_DATE,
                    nsd.NSD_SEVA_CODE,
                    nsd.NSD_TOT_SEVA_AMT,
                    nsd.NSD_CLEARING_DATE,
                    s.CUST_NAME,
                    s.CUST_MOBILE_NUM1,
                    sm.SEVA_DESC as SEVA_NAME,
                    d.name as DEITY_NAME
                FROM nithyanidhi_seva ns
                JOIN nithyanidhi_seva_dtl nsd ON ns.ENTITY_CODE = nsd.ENTITY_CODE 
                    AND ns.NS_CUST_CODE = nsd.NSD_CUST_CODE 
                    AND ns.NS_CODE = nsd.NSD_CODE
                JOIN sevadhar s ON ns.ENTITY_CODE = s.ENTITY_CODE 
                    AND ns.NS_CUST_CODE = s.CUST_CODE
                JOIN sevamast sm ON nsd.ENTITY_CODE = sm.ENTITY_CODE 
                    AND nsd.NSD_SEVA_CODE = sm.SEVA_CODE
                JOIN deities d ON sm.DEITY_ID = d.id
                WHERE ns.ENTITY_CODE = ?
                ${startDate && endDate ? 'AND ns.NS_SEVA_DATE BETWEEN ? AND ?' : ''})

                UNION ALL

                (SELECT 
                    'Other' as seva_type,
                    os.ENTITY_CODE,
                    os.NSD_CUST_CODE as CUST_CODE,
                    os.NSD_CODE as SEVA_CODE,
                    os.NSD_SEVA_DATE as SEVA_DATE,
                    os.NSD_SEVA_CODE,
                    os.NSD_TOT_SEVA_AMT,
                    os.NSD_CLEARING_DATE,
                    s.CUST_NAME,
                    s.CUST_MOBILE_NUM1,
                    sm.SEVA_DESC as SEVA_NAME,
                    d.name as DEITY_NAME
                FROM other_seva_dtl os
                JOIN sevadhar s ON os.ENTITY_CODE = s.ENTITY_CODE 
                    AND os.NSD_CUST_CODE = s.CUST_CODE
                JOIN sevamast sm ON os.ENTITY_CODE = sm.ENTITY_CODE 
                    AND os.NSD_SEVA_CODE = sm.SEVA_CODE
                JOIN deities d ON sm.DEITY_ID = d.id
                WHERE os.ENTITY_CODE = ?
                ${startDate && endDate ? 'AND os.NSD_SEVA_DATE BETWEEN ? AND ?' : ''})

                ORDER BY SEVA_DATE DESC
            `;
            
            params = startDate && endDate ? 
                [entityCode, entityCode, startDate, endDate, entityCode, startDate, endDate] : 
                [entityCode, entityCode, entityCode];
        }
        //  else {
        //     // Handle specific seva type queries
        //     const sevaQueries = {
        //         shashwath: `SELECT 'Shashwath' as seva_type, /* ... shashwath specific fields ... */`,
        //         nityanidhi: `SELECT 'Nityanidhi' as seva_type, /* ... nityanidhi specific fields ... */`,
        //         other: `SELECT 'Other' as seva_type, /* ... other seva specific fields ... */`
        //     };
            
        //     query = sevaQueries[sevaType.toLowerCase()];
        //     params = startDate && endDate ? [entityCode, startDate, endDate] : [entityCode];
        // }
     else {
        if (sevaType.toLowerCase() === 'nityanidhi') {
            query = `
                SELECT 
                    'Nityanidhi' as seva_type,
                    ns.ENTITY_CODE,
                    ns.NS_CUST_CODE as CUST_CODE,
                    ns.NS_CODE as SEVA_CODE,
                    ns.NS_SEVA_DATE as SEVA_DATE,
                    nsd.NSD_SEVA_CODE,
                    nsd.NSD_TOT_SEVA_AMT,
                    nsd.NSD_CLEARING_DATE,
                    s.CUST_NAME,
                    s.CUST_MOBILE_NUM1,
                    sm.SEVA_DESC as SEVA_NAME,
                    d.name as DEITY_NAME
                FROM nithyanidhi_seva ns
                JOIN nithyanidhi_seva_dtl nsd ON ns.ENTITY_CODE = nsd.ENTITY_CODE 
                    AND ns.NS_CUST_CODE = nsd.NSD_CUST_CODE 
                    AND ns.NS_CODE = nsd.NSD_CODE
                JOIN sevadhar s ON ns.ENTITY_CODE = s.ENTITY_CODE 
                    AND ns.NS_CUST_CODE = s.CUST_CODE
                JOIN sevamast sm ON nsd.ENTITY_CODE = sm.ENTITY_CODE 
                    AND nsd.NSD_SEVA_CODE = sm.SEVA_CODE
                JOIN deities d ON sm.DEITY_ID = d.id
                WHERE ns.ENTITY_CODE = ?
                ${startDate && endDate ? 'AND ns.NS_SEVA_DATE BETWEEN ? AND ?' : ''}
                ORDER BY SEVA_DATE DESC`;
        } else if (sevaType.toLowerCase() === 'shashwath') {
            query = `
                SELECT 
                    'Shashwath' as seva_type,
                    ss.ENTITY_CODE,
                    ss.SS_CUST_CODE as CUST_CODE,
                    ss.SS_CODE as SEVA_CODE,
                    CONCAT(ss.SS_DD, '/', ss.SS_MM) as SEVA_DATE,
                    ssd.SSD_SEVA_CODE,
                    ssd.SSD_TOT_SEVA_AMT,
                    ssd.SSD_CLEARING_DATE,
                    s.CUST_NAME,
                    s.CUST_MOBILE_NUM1,
                    sm.SEVA_DESC as SEVA_NAME,
                    d.name as DEITY_NAME
                FROM shashwath_seva ss
                JOIN shashwath_seva_dtl ssd ON ss.ENTITY_CODE = ssd.ENTITY_CODE 
                    AND ss.SS_CUST_CODE = ssd.SSD_CUST_CODE 
                    AND ss.SS_CODE = ssd.SSD_CODE
                JOIN sevadhar s ON ss.ENTITY_CODE = s.ENTITY_CODE 
                    AND ss.SS_CUST_CODE = s.CUST_CODE
                JOIN sevamast sm ON ssd.ENTITY_CODE = sm.ENTITY_CODE 
                    AND ssd.SSD_SEVA_CODE = sm.SEVA_CODE
                JOIN deities d ON sm.DEITY_ID = d.id
                WHERE ss.ENTITY_CODE = ?
                ORDER BY SEVA_DATE DESC`;
        } else if (sevaType.toLowerCase() === 'other') {
            query = `
                SELECT 
                    'Other' as seva_type,
                    os.ENTITY_CODE,
                    os.NSD_CUST_CODE as CUST_CODE,
                    os.NSD_CODE as SEVA_CODE,
                    os.NSD_SEVA_DATE as SEVA_DATE,
                    os.NSD_SEVA_CODE,
                    os.NSD_TOT_SEVA_AMT,
                    os.NSD_CLEARING_DATE,
                    s.CUST_NAME,
                    s.CUST_MOBILE_NUM1,
                    sm.SEVA_DESC as SEVA_NAME,
                    d.name as DEITY_NAME
                FROM other_seva_dtl os
                JOIN sevadhar s ON os.ENTITY_CODE = s.ENTITY_CODE 
                    AND os.NSD_CUST_CODE = s.CUST_CODE
                JOIN sevamast sm ON os.ENTITY_CODE = sm.ENTITY_CODE 
                    AND os.NSD_SEVA_CODE = sm.SEVA_CODE
                JOIN deities d ON sm.DEITY_ID = d.id
                WHERE os.ENTITY_CODE = ?
                ${startDate && endDate ? 'AND os.NSD_SEVA_DATE BETWEEN ? AND ?' : ''}
                ORDER BY SEVA_DATE DESC`;
        }
        params = startDate && endDate ? [entityCode, startDate, endDate] : [entityCode];
    }
    

        const result = await conn.query(query, params);
        return result;
    }
}
