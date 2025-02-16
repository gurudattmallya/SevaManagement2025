import { getConnection } from "../utils/db.js";

export class CSeva {
    static async getAllSevas(entityCode, isSpecial = false) {
        const conn = await getConnection();
        const result = await conn.query(`
            SELECT 
                id,
                name,
                description,
                start_date as startDate,
                validity,
                is_enabled as isEnabled,
                is_special as isSpecial
            FROM CSeva 
            WHERE entity_code = ? AND is_special = ?
            ORDER BY id DESC
        `, [entityCode, isSpecial]);

        return result.map(seva => ({
            ...seva,
            isEnabled: seva.isEnabled === 1 || seva.isEnabled === true,
            isSpecial: seva.isSpecial === 1 || seva.isSpecial === true
        }));
    }

    static async addSeva({ name, description, startDate, validity, isEnabled, isSpecial, entityCode, userId }) {
        const conn = await getConnection();
        
        // Get the next available ID for this entity_code
        const [maxIdResult] = await conn.query(
            "SELECT COALESCE(MAX(id), 0) as maxId FROM CSeva WHERE entity_code = ?",
            [entityCode]
        );
        const nextId = maxIdResult.maxId + 1;

        const result = await conn.query(
            `INSERT INTO CSeva (
                entity_code, id, name, description, start_date, validity,
                is_special, is_enabled, cr_by, cr_on
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [
                entityCode, nextId, name, description, startDate || null, 
                validity || null, isSpecial, isEnabled, userId
            ]
        );

        return JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));
    }

    static async updateSeva(entityCode, id, { name, description, startDate, validity, isEnabled, userId }) {
        const conn = await getConnection();
        const result = await conn.query(
            `UPDATE CSeva SET 
                name = ?, 
                description = ?, 
                start_date = ?, 
                validity = ?, 
                is_enabled = ?,
                mo_by = ?,
                mo_on = NOW()
            WHERE entity_code = ? AND id = ?`,
            [name, description, startDate || null, validity || null, isEnabled, userId, entityCode, id]
        );

        return JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));
    }

    static async getSevaById(entityCode, id) {
        const conn = await getConnection();
        const [result] = await conn.query(
            "SELECT * FROM CSeva WHERE entity_code = ? AND id = ?",
            [entityCode, id]
        );
        return result;
    }

    static async toggleStatus(entityCode, id, userId) {
        const conn = await getConnection();
        const result = await conn.query(
            `UPDATE CSeva SET 
                is_enabled = NOT is_enabled,
                mo_by = ?,
                mo_on = NOW()
            WHERE entity_code = ? AND id = ?`,
            [userId, entityCode, id]
        );

        return JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));
    }
}