import { getConnection } from "../utils/db.js";

export const Statistics = {
    async getSevaStatistics(entityCode) {
        const conn = await getConnection();
        
        const query = `
            SELECT 
                'Nityanidhi' as seva_type,
                CAST(COUNT(DISTINCT ns.NS_CODE) AS SIGNED) as total_sevas,
                CAST(SUM(nsd.NSD_TOT_SEVA_AMT) AS DECIMAL(18,2)) as total_amount,
                CAST(COUNT(DISTINCT ns.NS_CUST_CODE) AS SIGNED) as unique_devotees
            FROM nithyanidhi_seva ns
            JOIN nithyanidhi_seva_dtl nsd ON ns.NS_CODE = nsd.NSD_CODE
            WHERE ns.ENTITY_CODE = ?
            
            UNION ALL
            
            SELECT 
                'Sashwath' as seva_type,
                CAST(COUNT(DISTINCT ss.SS_CODE) AS SIGNED) as total_sevas,
                CAST(SUM(ssd.SSD_TOT_SEVA_AMT) AS DECIMAL(18,2)) as total_amount,
                CAST(COUNT(DISTINCT ss.SS_CUST_CODE) AS SIGNED) as unique_devotees
            FROM shashwath_seva ss
            JOIN shashwath_seva_dtl ssd ON ss.SS_CODE = ssd.SSD_CODE
            WHERE ss.ENTITY_CODE = ?
            
            UNION ALL
            
            SELECT 
                'Other' as seva_type,
                CAST(COUNT(DISTINCT os.NS_CODE) AS SIGNED) as total_sevas,
                CAST(SUM(osd.NSD_TOT_SEVA_AMT) AS DECIMAL(18,2)) as total_amount,
                CAST(COUNT(DISTINCT os.NS_CUST_CODE) AS SIGNED) as unique_devotees
            FROM other_seva os
            JOIN other_seva_dtl osd ON os.NS_CODE = osd.NSD_CODE
            WHERE os.ENTITY_CODE = ?
        `;
        
        const result = await conn.query(query, [entityCode, entityCode, entityCode]);
        return result.map(row => ({
            seva_type: row.seva_type,
            total_sevas: Number(row.total_sevas),
            total_amount: Number(row.total_amount),
            unique_devotees: Number(row.unique_devotees)
        }));
    },

    async getMonthlyTrends(entityCode) {
        const conn = await getConnection();
        const query = `
            SELECT 
                DATE_FORMAT(ns.NS_SEVA_DATE, '%Y-%m') as month,
                CAST(COUNT(*) AS SIGNED) as total_bookings,
                CAST(SUM(nsd.NSD_TOT_SEVA_AMT) AS DECIMAL(18,2)) as total_revenue
            FROM nithyanidhi_seva ns
            JOIN nithyanidhi_seva_dtl nsd ON ns.NS_CODE = nsd.NSD_CODE
            WHERE ns.ENTITY_CODE = ?
            GROUP BY DATE_FORMAT(ns.NS_SEVA_DATE, '%Y-%m')
            ORDER BY month DESC
            LIMIT 12
        `;
        const result = await conn.query(query, [entityCode]);
        return result.map(row => ({
            month: row.month,
            total_bookings: Number(row.total_bookings),
            total_revenue: Number(row.total_revenue)
        }));
    }
};
