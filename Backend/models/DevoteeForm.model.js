// DevoteeForm.model.js
import { getConnection } from "../utils/db.js";

const serializeResult = (data) => {
    if (!data) return null;
    return JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
};

export class DevoteeFormModel {
    static async getPincodeDetails(pincode) {
        const connection = await getConnection();
        try {
            const rows = await connection.execute(
                'SELECT * FROM act_global.pincode_master WHERE pincode = ?',
                [pincode]
            );
            if (!rows || rows.length === 0) {
                return null;
            }
            return serializeResult(rows[0]);
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Failed to fetch pincode details');
        }
    }

    static async getAreasByPincode(pincode) {
        const connection = await getConnection();
        try {
            const rows = await connection.execute(
                'SELECT DISTINCT area FROM act_global.pincode_master WHERE pincode = ?',
                [pincode]
            );
            return serializeResult(rows);
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Failed to fetch areas');
        }
    }
}