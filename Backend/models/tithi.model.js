import { getConnection } from "../utils/db.js";

class Tithi {
    static async getAllTithi() {
        const conn = await getConnection();
        const result = await conn.query(`
            SELECT TITHI_CODE, TITHI_DESC 
            FROM tithi 
            ORDER BY TITHI_SL
        `);
        return result;
    }
}

export { Tithi };
