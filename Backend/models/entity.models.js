// models/entity.models.js
import { getConnection } from "../utils/db.js";

export class Entity {
    // static async validateEntity(shortDesc) {
    //     const conn = await getConnection();
    //     const result = await conn.query(
    //         `SELECT ENTITY_CODE, ENTITYNUM_SHORT_DESCN, ENTITYNUM_DESCN 
    //          FROM entitynum 
    //          WHERE ENTITYNUM_SHORT_DESCN = ?`,
    //         [shortDesc]
    //     );
    //     return result;
    // }

    static async validateEntity(shortDesc) {
        const conn = await getConnection();
        console.log('Executing query for:', shortDesc);
        const result = await conn.query(
            `SELECT ENTITY_CODE, ENTITYNUM_SHORT_DESCN, ENTITYNUM_DESCN 
             FROM entitynum 
             WHERE ENTITYNUM_SHORT_DESCN = ?`,
            [shortDesc]
        );
        console.log('Query result:', result);
        return result;
    }
    
}
