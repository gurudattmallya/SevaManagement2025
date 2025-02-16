// import { getConnection } from "../utils/db.js";

// class Maasa {
//     static async getAllMaasa() {
//         const conn = await getConnection();
//         const result = await conn.query(`
//             SELECT RASHI_CODE, RASHI_DESC 
//             FROM maasa 
//             ORDER BY RASHI_SL
//         `);
//         return result;
//     }
// }
// export default Maasa;
import { getConnection } from "../utils/db.js";

class Maasa {
    static async getAllMaasa() {
        const conn = await getConnection();
        const result = await conn.query(`
            SELECT RASHI_CODE, RASHI_DESC 
            FROM maasa 
            ORDER BY RASHI_SL
        `);
        return result;
    }
}

export { Maasa };
