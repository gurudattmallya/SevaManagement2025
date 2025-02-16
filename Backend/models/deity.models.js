

//models/deity.models.js
import { getConnection } from "../utils/db.js";

// Helper function to serialize results and handle BigInt
const serializeResult = (data) => {
    return JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
};

export class Deities {
    static async getAllDeities(entityCode) {
        const conn = await getConnection();
        const result = await conn.query(
            "SELECT id, name, is_enabled, special_occasions, cr_by, cr_on, mo_by, mo_on FROM Deities WHERE entity_code = ?",
            [entityCode]
        );
        
        return serializeResult(result);
    }

    static async addDeity({ name, isEnabled, specialOccasions, entityCode, cr_by, cr_on }) {
        const conn = await getConnection();
        
        // Get the next ID for this entity_code
        const [maxIdResult] = await conn.query(
            "SELECT COALESCE(MAX(id), 0) + 1 as nextId FROM Deities WHERE entity_code = ?",
            [entityCode]
        );
        const nextId = serializeResult(maxIdResult).nextId;

        const result = await conn.query(
            `INSERT INTO Deities (entity_code, id, name, is_enabled, special_occasions, cr_by, cr_on) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [entityCode, nextId, name, isEnabled, specialOccasions, cr_by, cr_on]
        );
        
        const serializedResult = serializeResult(result);
        return { ...serializedResult, id: nextId };
    }

    static async updateDeity(id, { name, isEnabled, specialOccasions, entityCode, mo_by, mo_on }) {
        const conn = await getConnection();
        const result = await conn.query(
            `UPDATE Deities 
             SET name = ?, 
                 is_enabled = ?, 
                 special_occasions = ?,
                 mo_by = ?,
                 mo_on = ?
             WHERE id = ? AND entity_code = ?`,
            [name, isEnabled, specialOccasions, mo_by, mo_on, id, entityCode]
        );
        
        return serializeResult(result);
    }

    static async getDeityById(id, entityCode) {
        const conn = await getConnection();
        const [result] = await conn.query(
            "SELECT * FROM Deities WHERE id = ? AND entity_code = ?",
            [id, entityCode]
        );
        return serializeResult(result);
    }
}
