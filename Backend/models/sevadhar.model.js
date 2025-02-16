import { getConnection } from "../utils/db.js";

export class Sevadhar {
    

    static async getAllSevadhar(entityCode, searchTerm = null) {
        const conn = await getConnection();
        let query = `
            SELECT 
                ENTITY_CODE,
                CUST_CODE,
                CUST_NAME,
                CUST_GENDER,
                CUST_MOBILE_NUM1,
                CUST_EMAIL_ID1,
                CUST_RES_ADDRESS1,
                CUST_RES_CITY,
                CUST_RES_STATE,
                CUST_RES_COUNTRY
            FROM sevadhar 
            WHERE ENTITY_CODE = ?
            ${searchTerm ? 'AND (LOWER(CUST_NAME) LIKE LOWER(?) OR CUST_MOBILE_NUM1 LIKE ? OR LOWER(CUST_EMAIL_ID1) LIKE LOWER(?) OR LOWER(CUST_RES_CITY) LIKE LOWER(?))' : ''}
            ORDER BY CUST_NAME
        `;
        
        const searchPattern = searchTerm ? `%${searchTerm}%` : null;
        const params = [
            entityCode,
            ...(searchTerm ? [searchPattern, searchPattern, searchPattern, searchPattern] : [])
        ];
        
        const result = await conn.query(query, params);
        return result;
    }
    
    static async getSevadharById(entityCode, custCode) {
        const conn = await getConnection();
        const result = await conn.query(
            `SELECT * FROM sevadhar WHERE ENTITY_CODE = ? AND CUST_CODE = ?`,
            [entityCode, custCode]
        );
        return result[0];
    }

    static async createSevadhar(sevadharData) {
        const conn = await getConnection();
        try {
            const [maxResult] = await conn.query(
                `SELECT COALESCE(MAX(CUST_CODE), 0) + 1 as nextCode 
                 FROM sevadhar WHERE ENTITY_CODE = ?`,
                [sevadharData.ENTITY_CODE]
            );
            
            const custCode = Number(maxResult.nextCode);
            
            const result = await conn.query(
                `INSERT INTO sevadhar (
                    CUST_CODE, ENTITY_CODE, CUST_NAME, CUST_GENDER,
                    CUST_MOBILE_NUM1, CUST_EMAIL_ID1, CUST_RES_ADDRESS1,
                    CUST_RES_CITY, CR_BY, CR_ON 
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    custCode,
                    sevadharData.ENTITY_CODE,
                    sevadharData.CUST_NAME,
                    sevadharData.CUST_GENDER,
                    sevadharData.CUST_MOBILE_NUM1,
                    sevadharData.CUST_EMAIL_ID1,
                    sevadharData.CUST_RES_ADDRESS1,
                    sevadharData.CUST_RES_CITY,
                    sevadharData.CR_BY,
                    new Date(sevadharData.CR_ON)
                ]
            );
    
            return JSON.parse(JSON.stringify(
                { ...result, CUST_CODE: custCode },
                (key, value) => typeof value === 'bigint' ? value.toString() : value
            ));
        } catch (error) {
            console.log('Database error:', error);
            throw error;
        }
    }

    static async updateSevadhar(entityCode, custCode, updateData) {
        const conn = await getConnection();
        try {
            const result = await conn.query(
                `UPDATE sevadhar 
                 SET CUST_NAME = ?,
                     CUST_GENDER = ?,
                     CUST_MOBILE_NUM1 = ?,
                     CUST_EMAIL_ID1 = ?,
                     CUST_RES_ADDRESS1 = ?,
                     CUST_RES_CITY = ?,
                     MO_BY = ?,
                     MO_ON = NOW()
                 WHERE ENTITY_CODE = ? AND CUST_CODE = ?`,
                [
                    updateData.CUST_NAME,
                    updateData.CUST_GENDER,
                    updateData.CUST_MOBILE_NUM1,
                    updateData.CUST_EMAIL_ID1,
                    updateData.CUST_RES_ADDRESS1,
                    updateData.CUST_RES_CITY,
                    updateData.MO_BY,
                    entityCode,
                    custCode
                ]
            );
    
            return JSON.parse(JSON.stringify(result, (key, value) => 
                typeof value === 'bigint' ? value.toString() : value
            ));
        } catch (error) {
            console.log('Update error:', error);
            throw error;
        }
    }
}
