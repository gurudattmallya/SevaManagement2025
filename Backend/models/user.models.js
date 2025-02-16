
import { getConnection } from "../utils/db.js";

export class Users {
  static async validateUser(userId, hashedPassword) {
    const conn = await getConnection();
    const query = 'SELECT * FROM users WHERE USER_ID = ? AND password = ?';
    const [user] = await conn.query(query, [userId, hashedPassword]);
    // if(user){const _page_query = `
    //           select 
    //             P.page_name as url, 
    //             PA.access_to_add, 
    //             PA.access_to_update
    //           from 
    //             page_access PA 
    //           join pages P on P.page_id = PA.page_id 
    //           where 
    //             PA.entity_id = ? and PA.role_id = ? and PA.access_to_add=1
            
    //          `
    if (user) {
      const _page_query = `
    SELECT 
        P.page_name as url,
        PA.access_to_add,
        PA.access_to_update,
        PA.access_to_delete
    FROM 
        page_access PA
    JOIN 
        pages P ON P.page_id = PA.page_id
    WHERE 
        PA.entity_id = ? 
        AND PA.role_id = ?
        AND (
            PA.access_to_add = 1 
            OR PA.access_to_update = 1 
            OR PA.access_to_delete = 1
        )
`;

      const pageAccess = await conn.query(_page_query, [
        user.ENTITY_CODE,
        user.ROLE_ID
      ]);
      console.log(pageAccess, user.ENTITY_CODE, user.ROLE_ID);
      return {
        user: user,
        pageAccess: pageAccess
      };
    }return;
   
  }

  static async getDetails() {
    const conn = await getConnection();
    const res = await conn.query('SELECT * FROM users');
    return res;
  }
}













