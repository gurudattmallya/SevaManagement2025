
//specialSevas.model.js
import { getConnection } from "../utils/db.js";

export class SpecialSevas {
  static async getAllSpecialSevas(entityCode) {
    const conn = await getConnection();
    const result = await conn.query(`
      SELECT 
        id,
        name,
        description,
        start_date as startDate,
        validity,
        is_enabled as isEnabled,
        entity_code as entityCode,
        cr_by as createdBy,
        cr_on as createdOn,
        mo_by as modifiedBy,
        mo_on as modifiedOn
      FROM SpecialSevas
      WHERE entity_code = ?
    `, [entityCode]);

    return result.map(seva => ({
      ...seva,
      is_enabled: seva.is_enabled,
      startDate: seva.startDate,
      validity: seva.validity
    }));
  }

  static async getNextId(entityCode) {
    const conn = await getConnection();
    const [maxIdResult] = await conn.query(
      "SELECT COALESCE(MAX(id), 0) + 1 as nextId FROM SpecialSevas WHERE entity_code = ?",
      [entityCode]
    );
    return maxIdResult.nextId;
  }

  static async addSpecialSeva({ name, description, startDate, validity, isEnabled, entityCode, userId }) {
    const conn = await getConnection();
    const now = new Date();
    
    // Get the next ID for this entity_code
    const nextId = await this.getNextId(entityCode);
    
    const result = await conn.query(
      `INSERT INTO SpecialSevas (
        id, name, description, start_date, validity, is_enabled, 
        entity_code, cr_by, cr_on,SEVA_SASHWATH
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,'S')`,
      [nextId, name, description, startDate, validity, isEnabled, entityCode, userId, now]
    );

    return JSON.parse(JSON.stringify(result, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
  }

  static async updateSpecialSeva(id, { name, description, startDate, validity, isEnabled, entityCode, userId }) {
    const conn = await getConnection();
    const now = new Date();

    const result = await conn.query(
      `UPDATE SpecialSevas 
       SET name = ?, description = ?, start_date = ?, validity = ?, 
           is_enabled = ?, entity_code = ?, mo_by = ?, mo_on = ?
       WHERE id = ? AND entity_code = ?`,
      [name, description, startDate, validity, isEnabled, entityCode, userId, now, id, entityCode]
    );

    return JSON.parse(JSON.stringify(result, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
  }

  static async getSpecialSevaById(id, entityCode) {
    const conn = await getConnection();
    const result = await conn.query(
      "SELECT * FROM SpecialSevas WHERE id = ? AND entity_code = ?", 
      [id, entityCode]
    );
    return result[0];
  }

  static async toggleStatus(id, entityCode, userId) {
    const conn = await getConnection();
    const now = new Date();

    const result = await conn.query(
      `UPDATE SpecialSevas 
       SET is_enabled = NOT is_enabled, mo_by = ?, mo_on = ?
       WHERE id = ? AND entity_code = ?`,
      [userId, now, id, entityCode]
    );

    return JSON.parse(JSON.stringify(result, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
  }

  static async deleteSpecialSeva(id, entityCode) {
    const conn = await getConnection();
    const result = await conn.query(
      "DELETE FROM SpecialSevas WHERE id = ? AND entity_code = ?",
      [id, entityCode]
    );
    return result.affectedRows > 0;
  }

  static async searchSpecialSevas(entityCode, searchTerm) {
    const conn = await getConnection();
    const result = await conn.query(`
      SELECT 
        id,
        name,
        description,
        start_date as startDate,
        validity,
        is_enabled as isEnabled,
        entity_code as entityCode,
        cr_by as createdBy,
        cr_on as createdOn,
        mo_by as modifiedBy,
        mo_on as modifiedOn
      FROM SpecialSevas
      WHERE entity_code = ? 
      AND (name LIKE ? OR description LIKE ?)
    `, [entityCode, `%${searchTerm}%`, `%${searchTerm}%`]);

    return result.map(seva => ({
      ...seva,
      is_enabled: seva.is_enabled,
      startDate: seva.startDate,
      validity: seva.validity
    }));
  }
}

