
//seva1.models.js
import { getConnection } from "../utils/db.js";

export class Seva1 {

static async getSevasByDeityId(entityCode, deityId, sevaType, sevaId) {
    const connection = await getConnection();
    try {
      let query = `
        SELECT * FROM sevamast 
        WHERE entity_code = ? 
        AND deity_id = ? 
        AND seva_active = 'Y'
      `;


      let params = [entityCode, deityId];
  
      console.log(sevaType , sevaId);
      if (sevaType && sevaId) {
        
        if (sevaType === 'master') {
          query += ' AND parent_seva_type = "master" AND parent_seva_id = ?';
          params.push(sevaId);
        } else if (sevaType === 'special') {
          query += ' AND parent_seva_type = "special" AND parent_seva_id = ?';
          params.push(sevaId);
        }
      }
      console.log(query);
      
      const rows = await connection.execute(query, params);
      return rows;
    } catch (error) {
      console.error('Error fetching sevas:', error);
      throw error;
    }
  }
}
