import { getConnection } from "../utils/db.js";

export class Panchanga {
   
    static async getPanchangaDetails(date) {
        const conn = await getConnection();
        const [year, month, day] = date.split('-');
        
        const result = await conn.query(`
            SELECT 
                AAYANA,
                PAKSHA,
                THITHI as TITHI,
                MAASA,
                NAKSHATRA,
                CAL_DAY as DAY,
                CAL_DATE
            FROM panchanga 
            WHERE PANCHANGA_TYPE = 'G'
            AND CAL_YEAR = ?
            AND CAL_MONTH = ?
            AND CAL_DD = ?
        `, [parseInt(year), parseInt(month), parseInt(day)]);
    
        return result[0];
    }
    
    

    static async getSsPanchangaDetails(year, month, day) {
        const conn = await getConnection();
        
        let result = await conn.query(`
            SELECT 
                AAYANA,
                PAKSHA,
                THITHI as TITHI,
                MAASA,
                NAKSHATRA,
                CAL_DAY as DAY,
                CAL_DATE
            FROM panchanga 
            WHERE PANCHANGA_TYPE = 'G'
            AND CAL_MONTH = ?
            AND CAL_DD = ?
            AND CAL_YEAR = ?
            LIMIT 1
        `, [parseInt(month), parseInt(day), parseInt(year)]);
    
        if (!result.length) {
            result = await conn.query(`
                SELECT 
                    AAYANA,
                    PAKSHA,
                    THITHI as TITHI,
                    MAASA,
                    NAKSHATRA,
                    CAL_DAY as DAY,
                    CAL_DATE
                FROM panchanga 
                WHERE PANCHANGA_TYPE = 'G'
                AND CAL_MONTH = ?
                AND CAL_DD = ?
                AND CAL_YEAR = ?
                LIMIT 1
            `, [parseInt(month), parseInt(day), parseInt(year) + 1]);
        }
    
        return result[0];
    }
    
    static async getRitualPanchangaDetails(maasa, paksha, tithi) {
        const conn = await getConnection();
        const currentYear = new Date().getFullYear();
        
        // Try current year first
        let result = await conn.query(`
            SELECT 
                CAL_DAY,
                CAL_DATE,
                CAL_YEAR,
                MAASA,
                PAKSHA,
                THITHI,
                NAKSHATRA,
                AAYANA
            FROM panchanga 
            WHERE PANCHANGA_TYPE = 'G'
            AND MAASA = (SELECT RASHI_DESC FROM maasa WHERE RASHI_CODE = ?)
            AND PAKSHA = ?
            AND THITHI = (SELECT TITHI_DESC FROM tithi WHERE TITHI_CODE = ?)
            AND CAL_YEAR = ?
            ORDER BY CAL_DATE ASC
            LIMIT 1
        `, [maasa, paksha, tithi, currentYear]);

        // If no result found for current year, try next year
        if (!result.length) {
            result = await conn.query(`
                SELECT 
                    CAL_DAY,
                    CAL_DATE,
                    CAL_YEAR,
                    MAASA,
                    PAKSHA,
                    THITHI,
                    NAKSHATRA,
                    AAYANA
                FROM panchanga 
                WHERE PANCHANGA_TYPE = 'G'
                AND MAASA = (SELECT RASHI_DESC FROM maasa WHERE RASHI_CODE = ?)
                AND PAKSHA = ?
                AND THITHI = (SELECT TITHI_DESC FROM tithi WHERE TITHI_CODE = ?)
                AND CAL_YEAR = ?
                ORDER BY CAL_DATE ASC
                LIMIT 1
            `, [maasa, paksha, tithi, currentYear + 1]);
        }

        return result[0];
    }    
}
