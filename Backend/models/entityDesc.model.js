import { getConnection } from "../utils/db.js";

export class EntityDesc {
    static async getEntityDesc(entityCode) {
        const conn = await getConnection();
        const result = await conn.query(
            `SELECT ENTITYNUM_DESCN 
             FROM entitynum 
             WHERE ENTITY_CODE = ?`,
            [entityCode]
        );
        return result;
    }
}
