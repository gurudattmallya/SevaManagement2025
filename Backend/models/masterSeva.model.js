// //masterSeva.model.js

import { getConnection } from "../utils/db.js";
const serializeResult = (data) => {
  return JSON.parse(JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
  ));
};

// export const getAllMasterSevas = async (entityCode) => {
//   const conn = await getConnection();
//   const rows = await conn.query(
//     'SELECT *, SEVA_SASHWATH as seva_type FROM MasterSevas WHERE entity_code = ? ORDER BY id',
//     [entityCode]
//   );
//   return serializeResult(rows);
// };

export const getAllMasterSevas = async (entityCode) => {
  const conn = await getConnection();
  const rows = await conn.query(
    'SELECT id, name, description, is_enabled, cr_by, cr_on, mo_by, mo_on, SEVA_SASHWATH as seva_type, duration FROM MasterSevas WHERE entity_code = ? ORDER BY id',
    [entityCode]
  );
  return serializeResult(rows);
};






export const getSubSevaById = async (sevaCode, entityCode) => {
  const db = await getConnection();
  const query = `
    SELECT 
      s.*,
      d.name as deity_name
    FROM sevamast s
    LEFT JOIN Deities d ON s.DEITY_ID = d.id 
      AND d.entity_code = s.ENTITY_CODE
    WHERE s.SEVA_CODE = ? 
      AND s.ENTITY_CODE = ? 
      AND s.IS_SUB_SEVA = true
  `;

  const [rows] = await db.query(query, [sevaCode, entityCode]);
  console.log('Fetched seva data:', rows[0]); // Add logging
  return rows[0] || null;
};


// export const addMasterSeva = async ({ name, description, isEnabled, entityCode, userId, sevaType }) => {
//   const conn = await getConnection();
//   const [maxIdResult] = await conn.query(
//     "SELECT COALESCE(MAX(id), 0) + 1 as nextId FROM MasterSevas WHERE entity_code = ?",
//     [entityCode]
//   );
    
//   const nextId = serializeResult(maxIdResult).nextId;
//   await conn.query(
//     `INSERT INTO MasterSevas (
//       entity_code, id, name, description, is_enabled,
//       cr_by, cr_on, mo_by, mo_on, SEVA_SASHWATH
//     ) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, NOW(), ?)`,
//     [entityCode, nextId, name, description, isEnabled, userId, userId, sevaType]
//   );
// };

// export const addMasterSeva = async ({ name, description, isEnabled, entityCode, userId, sevaType, duration }) => {
//   const conn = await getConnection();
//   const [maxIdResult] = await conn.query(
//     "SELECT COALESCE(MAX(id), 0) + 1 as nextId FROM MasterSevas WHERE entity_code = ?",
//     [entityCode]
//   );
    
//   const nextId = serializeResult(maxIdResult).nextId;
//   await conn.query(
//     `INSERT INTO MasterSevas (
//       entity_code, id, name, description, is_enabled,
//       cr_by, cr_on, mo_by, mo_on, SEVA_SASHWATH, duration
//     ) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, NOW(), ?, ?)`,
//     [entityCode, nextId, name, description, isEnabled, userId, userId, sevaType, sevaType === 'SS' ? duration : null]
//   );
// };

export const addMasterSeva = async ({ name, description, isEnabled, entityCode, userId, sevaType, duration }) => {
  const conn = await getConnection();
  const [maxIdResult] = await conn.query(
    "SELECT COALESCE(MAX(id), 0) + 1 as nextId FROM MasterSevas WHERE entity_code = ?",
    [entityCode]
  );
    
  const nextId = serializeResult(maxIdResult).nextId;
  
  // Log the duration value
  console.log('Duration value:', duration);
  
  const result = await conn.query(
    `INSERT INTO MasterSevas (
      entity_code, id, name, description, is_enabled,
      cr_by, cr_on, mo_by, mo_on, SEVA_SASHWATH, duration
    ) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, NOW(), ?, ?)`,
    [entityCode, nextId, name, description, isEnabled, userId, userId, sevaType, duration]
  );
  
  return result;
};



// export const updateMasterSeva = async (id, { name, description, isEnabled, entityCode, userId, sevaType }) => {
//   const conn = await getConnection();
//   await conn.query(
//     `UPDATE MasterSevas 
//      SET name = ?, 
//          description = ?, 
//          is_enabled = ?,
//          mo_by = ?,
//          mo_on = NOW(),
//          SEVA_SASHWATH = ?
//      WHERE id = ? AND entity_code = ?`,
//     [name, description, isEnabled, userId, sevaType, id, entityCode]
//   );
// };

export const updateMasterSeva = async (id, { name, description, isEnabled, entityCode, userId, sevaType, duration }) => {
  const conn = await getConnection();
  await conn.query(
    `UPDATE MasterSevas 
     SET name = ?, 
         description = ?, 
         is_enabled = ?,
         mo_by = ?,
         mo_on = NOW(),
         SEVA_SASHWATH = ?,
         duration = ?
     WHERE id = ? AND entity_code = ?`,
    [name, description, isEnabled, userId, sevaType, sevaType === 'SS' ? duration : null, id, entityCode]
  );
};



export const toggleMasterSevaStatus = async (id, entityCode, userId) => {
  const conn = await getConnection();

    await conn.query(
      `UPDATE MasterSevas 
       SET is_enabled = NOT is_enabled,
           mo_by = ?,
           mo_on = NOW()
       WHERE id = ? AND entity_code = ?`,
      [userId, id, entityCode]
    );
 
};





