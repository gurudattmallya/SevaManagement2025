import { getConnection } from "../utils/db.js";

export class Users {
    static async getUsers(entityCode) {
        const conn = await getConnection();
        const query = `
            SELECT u.*, r.role_name 
            FROM users u
            LEFT JOIN roles r ON u.ENTITY_CODE = r.entity_id AND u.ROLE_ID = r.role_id
            WHERE u.ENTITY_CODE = ? AND u.USER_ACTIVE = 'Y'
            ORDER BY u.USER_ID`;
        const result = await conn.query(query, [entityCode]);
        return result;
    }

    static async addUser({ entityId, userId, userName, password, roleId, crBy }) {
        const conn = await getConnection();
        const query = `
            INSERT INTO users (
                ENTITY_CODE, 
                USER_ID, 
                USER_NAME,
                PASSWORD,
                NE_PASSWORD,
                USER_REG_DATE,
                USER_TYPE,
                ROLE_ID,
                USER_ACTIVE,
                CR_BY,
                CR_ON
            ) 
            VALUES (?, ?, ?, ?, ?, NOW(), 'U', ?, 'Y', ?, NOW())`;
        
        await conn.query(query, [
            entityId, 
            userId, 
            userName,
            password,
            password,
            roleId,
            crBy
        ]);
        return { success: true };
    }

    static async updateUser(entityCode, userId, { userName, roleId, password, moBy }) {
        const conn = await getConnection();
        let query = `
            UPDATE users 
            SET ROLE_ID = ?, 
                USER_NAME = ?,
                MO_BY = ?, 
                MO_ON = NOW()`;
        
        const params = [roleId, userName, moBy];
        
        if (password) {
            query += `, PASSWORD = ?, NE_PASSWORD = ?`;
            params.push(password, password);
        }
        
        query += ` WHERE ENTITY_CODE = ? AND USER_ID = ?`;
        params.push(entityCode, userId);
        
        await conn.query(query, params);
        return { success: true };
    }

    static async deleteUser(entityCode, userId) {
        const conn = await getConnection();
        const query = `
            UPDATE users 
            SET USER_ACTIVE = 'N',
                MO_BY = ?,
                MO_ON = NOW()
            WHERE ENTITY_CODE = ? AND USER_ID = ?`;
        await conn.query(query, [userId, entityCode, userId]);
        return { success: true };
    }
}
