import { getConnection } from "../utils/db.js";

export class Deities1 {
  static async getAllDeities(entityCode, sevaType, sevaId) {
    const connection = await getConnection();
    try {
      let query = 'SELECT * FROM deities WHERE entity_code = ? AND is_enabled = 1';
      let params = [entityCode];
  
      if (sevaType && sevaId) {
        if (sevaType === 'master') {
          query = `
            SELECT DISTINCT d.* 
            FROM deities d
            INNER JOIN sevamast s ON d.id = s.deity_id
            WHERE d.entity_code = ? 
            AND s.parent_seva_type = 'master'
            AND s.parent_seva_id = ?
            AND d.is_enabled = 1
          
          `;
          params.push(sevaId);
        } else if (sevaType === 'special') {
          query = `
            SELECT DISTINCT d.* 
            FROM deities d
            INNER JOIN sevamast s ON d.id = s.deity_id
            WHERE d.entity_code = ? 
            AND s.parent_seva_type = 'special'
            AND s.parent_seva_id = ?
            AND d.is_enabled = 1
           
          `;
          params.push(sevaId);
        }
      }
  
      const rows = await connection.query(query, params);
      return rows;
    } catch (error) {
      console.error('Error fetching deities:', error);
      throw error;
    }
  }
  
}
