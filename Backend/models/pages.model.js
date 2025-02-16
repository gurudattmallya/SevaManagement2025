import { getConnection } from "../utils/db.js";

export class Pages {
    static async getAllPages() {
        const conn = await getConnection();
        const query = `
            SELECT 
                page_id,
                page_name,
                name,
                description,
                access_for_all
            FROM pages 
            ORDER BY name`;
        const result = await conn.query(query);
        return result;
    }
}

