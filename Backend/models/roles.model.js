import { getConnection } from "../utils/db.js";
const serializeResult = (data) => {
    return JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
};

export class Roles {
    static async getRoles(entityId) {
        const conn = await getConnection();
        const query = `
            SELECT 
                r.role_id,
                r.entity_id,
                r.role_name,
                r.is_admin,
                r.is_staff,
                r.is_active,
                pa.page_id,
                pa.access_to_add,
                pa.access_to_update,
                pa.access_to_delete
            FROM roles r
            LEFT JOIN page_access pa ON r.entity_id = pa.entity_id 
                AND r.role_id = pa.role_id
            WHERE r.entity_id = ? AND r.is_active = true
        `;
        const result = await conn.query(query, [entityId]);
        return serializeResult(Roles.formatRolePermissions(result));
    }

    
    static formatRolePermissions(rows) {
        const roleMap = new Map();
        
        rows.forEach(row => {
            if (!roleMap.has(row.role_id)) {
                roleMap.set(row.role_id, {
                    roleId: row.role_id,
                    entityId: row.entity_id,
                    roleName: row.role_name,
                    isAdmin: row.is_admin === 1,
                    isStaff: row.is_staff === 1,
                    isActive: row.is_active === 1,
                    permissions: {}
                });
            }
            
            if (row.page_id) {
                roleMap.get(row.role_id).permissions[row.page_id] = {
                    access_to_add: row.access_to_add === 1,
                    access_to_update: row.access_to_update === 1,
                    access_to_delete: row.access_to_delete === 1
                };
            }
        });

        return Array.from(roleMap.values());
    }
    static async addRole({ entityId, roleName, permissions, crBy }) {
        const conn = await getConnection();
        const [maxIdResult] = await conn.query(
            "SELECT COALESCE(MAX(role_id), 0) + 1 as nextId FROM roles WHERE entity_id = ?",
            [entityId]
        );
        const roleId = maxIdResult.nextId;

        const result = await conn.query(
            `INSERT INTO roles (entity_id, role_id, role_name, is_staff, cr_by, cr_on) 
             VALUES (?, ?, ?, true, ?, NOW())`,
            [entityId, roleId, roleName, crBy]
        );

        await this.updateRolePermissions(entityId, roleId, permissions, crBy);
        return serializeResult({ roleId });
    }
    static async updateRole(entityId, roleId, { roleName, permissions, moBy }) {
        const conn = await getConnection();
        
        // Update the role details
        await conn.query(
            `UPDATE roles 
             SET role_name = ?, 
                 mo_by = ?, 
                 mo_on = NOW()
             WHERE entity_id = ? AND role_id = ?`,
            [roleName, moBy, entityId, roleId]
        );
    
        // Update permissions
        await this.updateRolePermissions(entityId, roleId, permissions, moBy);
    
        return { success: true };
    }
    
    static async updateRolePermissions(entityId, roleId, permissions, userId) {
        const conn = await getConnection();
        await conn.query(
            "DELETE FROM page_access WHERE entity_id = ? AND role_id = ?",
            [entityId, roleId]
        );
    
        const values = Object.entries(permissions).map(([pageId, perms]) => [
            entityId,
            roleId,
            parseInt(pageId),
            perms.access_to_add ? 1 : 0,
            perms.access_to_update ? 1 : 0,
            perms.access_to_delete ? 1 : 0,
            userId,
            new Date()
        ]);
    
        if (values.length) {
            const query = `
                INSERT INTO page_access 
                (entity_id, role_id, page_id, access_to_add, access_to_update, access_to_delete, cr_by, cr_on)
                VALUES ${values.map(() => '(?, ?, ?, ?, ?, ?, ?, ?)').join(',')}
            `;
            await conn.query(query, values.flat());
        }
    }
}
