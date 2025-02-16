import { getConnection } from "../utils/db.js";

export class SpecialSevas {
  static async getAllSpecialSevas(entityCode) {
    const connection = await getConnection();
    try {
      const rows = await connection.execute(
        'SELECT id, name, description,SEVA_SASHWATH FROM SpecialSevas WHERE entity_code = ? AND is_enabled = TRUE ',
        [entityCode]
      );
      return rows;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }
}