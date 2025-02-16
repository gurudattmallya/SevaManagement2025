
// // //subSeva.model.js
// // import { getConnection } from "../utils/db.js";

// // // Helper function to handle BigInt serialization
// // const serializeData = (data) => {
// //   return JSON.parse(JSON.stringify(data, (key, value) =>
// //     typeof value === 'bigint' ? value.toString() : value
// //   ));
// // };

// // export const getNextId = async (entityCode) => {
// //   const db = await getConnection();
// //   const query = `
// //     SELECT COALESCE(MAX(CAST(SUBSTRING(SEVA_CODE, 2) AS UNSIGNED)), 0) + 1 AS nextId
// //     FROM sevamast 
// //     WHERE ENTITY_CODE = ? AND IS_SUB_SEVA = true
// //   `;
// //   const result = await db.query(query, [entityCode]);
// //   return serializeData(result[0].nextId);
// // };

// // export const generateSevaCode = (id, sevaType) => {
// //   const prefix = sevaType === 'special' ? 'S' : 'R';
// //   return `${prefix}${id.toString().padStart(4, '0')}`;
// // };

// // export const getAllSubSevas = async (entityCode) => {
// //   const db = await getConnection();
// //   const query = `
// //     SELECT 
// //       s.ENTITY_CODE,
// //       s.SEVA_CODE,
// //       s.SEVA_DESC,
// //       s.SEVA_AMOUNT,
// //       s.SEVA_ACTIVE,
// //       s.PARENT_SEVA_TYPE,
// //       s.PARENT_SEVA_ID,
// //       s.PARENT_SEVA_NAME,
// //       s.DEITY_ID,
// //       d.name as deity_name
// //     FROM sevamast s
// //     LEFT JOIN Deities d ON s.DEITY_ID = d.id
// //       AND d.entity_code = s.ENTITY_CODE
// //     WHERE s.ENTITY_CODE = ? AND s.IS_SUB_SEVA = true
// //     ORDER BY s.SEVA_CODE DESC
// //   `;

// //   const rows = await db.query(query, [entityCode]);
// //   return serializeData(rows || []);
// // };


// // export const getSubSevaById = async (sevaCode, entityCode) => {
// //   const db = await getConnection();
// //   const query = `
// //     SELECT 
// //       s.*,
// //       CASE 
// //         WHEN s.PARENT_SEVA_TYPE = 'master' THEN m.name
// //         WHEN s.PARENT_SEVA_TYPE = 'special' THEN sp.name
// //       END as parent_seva_name,
// //       d.name as deity_name
// //     FROM sevamast s
// //     LEFT JOIN MasterSevas m ON s.PARENT_SEVA_ID = CAST(SUBSTRING(m.id, 2) AS UNSIGNED) 
// //       AND s.PARENT_SEVA_TYPE = 'master' 
// //       AND m.entity_code = s.ENTITY_CODE
// //     LEFT JOIN SpecialSevas sp ON s.PARENT_SEVA_ID = CAST(SUBSTRING(sp.id, 2) AS UNSIGNED) 
// //       AND s.PARENT_SEVA_TYPE = 'special' 
// //       AND sp.entity_code = s.ENTITY_CODE
// //     LEFT JOIN Deities d ON s.DEITY_ID = d.id AND d.entity_code = s.ENTITY_CODE
// //     WHERE s.SEVA_CODE = ? AND s.ENTITY_CODE = ? AND s.IS_SUB_SEVA = true
// //   `;
  
// //   const [rows] = await db.query(query, [sevaCode, entityCode]);
// //   return serializeData(rows[0] || null);
// // };



// // export const getAvailableParentSevas = async (entityCode) => {
// //   try {
// //     const db = await getConnection();
    
// //     // Validate entity code
// //     if (!entityCode) {
// //       console.error('Entity Code is missing in getAvailableParentSevas');
// //       throw new Error('Entity Code is required');
// //     }

// //     // Query to get master sevas
// //     const masterSevasQuery = `
// //       SELECT 
// //         CONCAT('M', id) as id,
// //         name,
// //         description,
// //         'master' as seva_type,
// //         'Master Seva' as type
// //       FROM MasterSevas
// //       WHERE entity_code = ?
// //       AND is_enabled = 1
// //       ORDER BY name
// //     `;

// //     const specialSevasQuery = `
// //       SELECT 
// //         CONCAT('S', id) as id,
// //         name,
// //         description,
// //         'special' as seva_type,
// //         'Special Seva' as type
// //       FROM SpecialSevas
// //       WHERE entity_code = ?
// //       AND is_enabled = 1
// //       ORDER BY name
// //     `;
// //     // AND CURDATE() BETWEEN start_date AND validity

// //     // Execute both queries
// //     const masterSevasResult = await db.query(masterSevasQuery, [entityCode]);
// //     const specialSevasResult = await db.query(specialSevasQuery, [entityCode]);
// //     console.log(masterSevasResult, "1212121212121");
// //     console.log(specialSevasResult, "1212121212121");

// //     // Combine results
// //     const combinedResults = [...masterSevasResult, ...specialSevasResult];

// //     return combinedResults;
// //   } catch (error) {
// //     console.error('Error in getAvailableParentSevas:', error);
// //     throw error;
// //   }
// // };
// // export const getDeities = async (entityCode, sevaType) => {
// //   const db = await getConnection();
// //   let query = `
// //     SELECT 
// //       id,
// //       name,
// //       is_enabled
// //     FROM Deities
// //     WHERE entity_code = ?
// //     AND is_enabled = true
// //   `;

// //   if (sevaType == 'special') {
// //     query = `
// //       SELECT 
// //         id,
// //         name,
// //         is_enabled
// //       FROM Deities
// //       WHERE entity_code = ?
// //       AND is_enabled = true
// //       AND (special_occasions = 1)
// //     `;
// //   }

// //   const rows = await db.query(query, [entityCode]);
// //   return serializeData(rows || []);
// // };



// // export const createSubSeva = async (data, entityCode, userId) => {
// //   const db = await getConnection();
// //   const nextId = await getNextId(entityCode);
// //   const sevaCode = generateSevaCode(nextId, data.seva_type);

// //   const parentSeva = await getParentSevaName(data.parent_seva_id, entityCode);
// //   const actualParentId = data.parent_seva_id.substring(1);
// //   const sevaType = data.parent_seva_id.startsWith('M') ? 'master' : 'special';

// //   // Convert boolean to Y/N string
// //   const isEnabled = data.is_enabled === true ? 'Y' : 'N';

// //   const query = `
// //     INSERT INTO sevamast (
// //       ENTITY_CODE,
// //       SEVA_CODE,
// //       SEVA_DESC,
// //       SEVA_AMOUNT,
// //       SEVA_ACTIVE,
// //       IS_SUB_SEVA,
// //       PARENT_SEVA_TYPE,
// //       PARENT_SEVA_ID,
// //       PARENT_SEVA_NAME,
// //       DEITY_ID,
// //       CR_BY,
// //       CR_ON
// //     ) VALUES (?, ?, ?, ?, ?, true, ?, ?, ?, ?, ?, NOW())
// //   `;

// //   const result = await db.query(query, [
// //     entityCode,
// //     sevaCode,
// //     data.name,
// //     data.price,
// //     isEnabled,  // Use the explicitly converted Y/N value
// //     sevaType,
// //     actualParentId,
// //     parentSeva.name,
// //     data.deity_id,
// //     userId
// //   ]);

// //   return serializeData({ sevaCode, ...result });
// // };


// // const getParentSevaName = async (parentSevaId, entityCode) => {
// //   const db = await getConnection();
// //   const sevaType = parentSevaId.startsWith('M') ? 'master' : 'special';
// //   const actualId = parentSevaId.substring(1);
  
// //   const table = sevaType === 'master' ? 'MasterSevas' : 'SpecialSevas';
// //   const query = `SELECT name FROM ${table} WHERE id = ? AND entity_code = ?`;
  
// //   const [result] = await db.query(query, [actualId, entityCode]);
// //   return result;
// // };



// // export const updateSubSeva = async (sevaCode, data, entityCode, userId) => {
// //   const db = await getConnection();
  
// //   // Get parent seva details
// //   const parentSeva = await getParentSevaName(data.parent_seva_id, entityCode);
// //   const actualParentId = data.parent_seva_id.substring(1);
// //   const sevaType = data.parent_seva_id.startsWith('M') ? 'master' : 'special';

// //   const query = `
// //     UPDATE sevamast 
// //     SET 
// //       SEVA_DESC = ?,
// //       SEVA_AMOUNT = ?,
// //       SEVA_ACTIVE = ?,
// //       PARENT_SEVA_TYPE = ?,
// //       PARENT_SEVA_ID = ?,
// //       PARENT_SEVA_NAME = ?,
// //       DEITY_ID = ?,
// //       MO_BY = ?,
// //       MO_ON = NOW()
// //     WHERE SEVA_CODE = ? AND ENTITY_CODE = ?
// //   `;

// //   const values = [
// //     data.name,
// //     data.price,
// //     data.is_enabled ? 'Y' : 'N',
// //     sevaType,
// //     actualParentId,
// //     parentSeva.name,
// //     data.deity_id,
// //     userId,
// //     sevaCode,
// //     entityCode
// //   ];

// //   const result = await db.query(query, values);
  
// //   // Fetch and return updated data
// //   const updatedSeva = await getSubSevaById(sevaCode, entityCode);
// //   return updatedSeva;
// // };


// subSeva.model.js

import { getConnection } from "../utils/db.js";

// Helper function to handle BigInt serialization
const serializeData = (data) => {
  return JSON.parse(JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));
};
  export const getNextId = async (entityCode, sevaType) => {
    const db = await getConnection();
    let query;
  
    if (sevaType === 'S') {
      query = `
        SELECT COALESCE(MAX(CAST(SUBSTRING(SEVA_CODE, 2) AS UNSIGNED)), 0) + 1 AS nextId
        FROM sevamast
        WHERE ENTITY_CODE = ? 
        AND IS_SUB_SEVA = true 
        AND SEVA_CODE LIKE 'S%'
        AND ENTITY_CODE = ?
      `;
      const result = await db.query(query, [entityCode, entityCode]);
      return serializeData(result[0].nextId);
    }
  
    // For master sevas (SS, N, O)
    query = `
      SELECT COALESCE(MAX(CAST(SUBSTRING(SEVA_CODE, 3) AS UNSIGNED)), 0) + 1 AS nextId
      FROM sevamast
      WHERE ENTITY_CODE = ? 
      AND IS_SUB_SEVA = true 
      AND SEVA_SHASHWATH = ?
    `;
    const result = await db.query(query, [entityCode, sevaType]);
    return serializeData(result[0].nextId);
  };


export const generateSevaCode = async (id, sevaType) => {
  // For special sevas, keep the existing logic
  if (sevaType === 'special') {
    return `S${id.toString().padStart(4, '0')}`;
  }
  
  // For master sevas, use the SEVA_SASHWATH value (SS, N, or O)
  return `${sevaType}${id.toString().padStart(3, '0')}`;
};

// Add function to get parent seva details including SEVA_SASHWATH
const getParentSevaDetails = async (parentSevaId, entityCode) => {
  const db = await getConnection();
  const sevaType = parentSevaId.startsWith('M') ? 'master' : 'special';
  const actualId = parentSevaId.substring(1);
  
  if (sevaType === 'master') {
    const query = `
      SELECT name, SEVA_SASHWATH 
      FROM MasterSevas 
      WHERE id = ? AND entity_code = ?
    `;
    const [result] = await db.query(query, [actualId, entityCode]);
    return { 
      ...result, 
      sevaType: 'master'
    };
  } else {
    const query = `
      SELECT name, SEVA_SASHWATH 
      FROM SpecialSevas 
      WHERE id = ? AND entity_code = ?
    `;
    const [result] = await db.query(query, [actualId, entityCode]);
    return { 
      ...result, 
      sevaType: 'special'
    };
  }
};
export const getSubSevaById = async (sevaCode, entityCode) => {
  const db = await getConnection();
  const query = `
    SELECT 
      s.*,
      CASE 
        WHEN s.PARENT_SEVA_TYPE = 'master' THEN m.name
        WHEN s.PARENT_SEVA_TYPE = 'special' THEN sp.name
      END as parent_seva_name,
      d.name as deity_name
    FROM sevamast s
    LEFT JOIN MasterSevas m ON s.PARENT_SEVA_ID = CAST(SUBSTRING(m.id, 2) AS UNSIGNED) 
      AND s.PARENT_SEVA_TYPE = 'master' 
      AND m.entity_code = s.ENTITY_CODE
    LEFT JOIN SpecialSevas sp ON s.PARENT_SEVA_ID = CAST(SUBSTRING(sp.id, 2) AS UNSIGNED) 
      AND s.PARENT_SEVA_TYPE = 'special' 
      AND sp.entity_code = s.ENTITY_CODE
    LEFT JOIN Deities d ON s.DEITY_ID = d.id AND d.entity_code = s.ENTITY_CODE
    WHERE s.SEVA_CODE = ? AND s.ENTITY_CODE = ? AND s.IS_SUB_SEVA = true
  `;
  
  const [rows] = await db.query(query, [sevaCode, entityCode]);
  return serializeData(rows[0] || null);
};
export const getDeities = async (entityCode, sevaType) => {
  const db = await getConnection();
  let query = `
    SELECT 
      id,
      name,
      is_enabled
    FROM Deities
    WHERE entity_code = ?
    AND is_enabled = true
  `;

  if (sevaType == 'special') {
    query = `
      SELECT 
        id,
        name,
        is_enabled
      FROM Deities
      WHERE entity_code = ?
      AND is_enabled = true
      AND (special_occasions = 1)
    `;
  }

  const rows = await db.query(query, [entityCode]);
  return serializeData(rows || []);
};


export const getAvailableParentSevas = async (entityCode) => {
  try {
    const db = await getConnection();
    
    // Validate entity code
    if (!entityCode) {
      console.error('Entity Code is missing in getAvailableParentSevas');
      throw new Error('Entity Code is required');
    }

    // Query to get master sevas
    const masterSevasQuery = `
      SELECT 
        CONCAT('M', id) as id,
        name,
        description,
        'master' as seva_type,
        'Master Seva' as type
      FROM MasterSevas
      WHERE entity_code = ?
      AND is_enabled = 1
      ORDER BY name
    `;

    const specialSevasQuery = `
      SELECT 
        CONCAT('S', id) as id,
        name,
        description,
        'special' as seva_type,
        'Special Seva' as type
      FROM SpecialSevas
      WHERE entity_code = ?
      AND is_enabled = 1
      ORDER BY name
    `;
    // AND CURDATE() BETWEEN start_date AND validity

    // Execute both queries
    const masterSevasResult = await db.query(masterSevasQuery, [entityCode]);
    const specialSevasResult = await db.query(specialSevasQuery, [entityCode]);
    console.log(masterSevasResult, "1212121212121");
    console.log(specialSevasResult, "1212121212121");

    // Combine results
    const combinedResults = [...masterSevasResult, ...specialSevasResult];

    return combinedResults;
  } catch (error) {
    console.error('Error in getAvailableParentSevas:', error);
    throw error;
  }
};
export const getAllSubSevas = async (entityCode) => {
    const db = await getConnection();
    const query = `
      SELECT 
        s.ENTITY_CODE,
        s.SEVA_CODE,
        s.SEVA_DESC,
        s.SEVA_AMOUNT,
        s.SEVA_ACTIVE,
        s.PARENT_SEVA_TYPE,
        s.PARENT_SEVA_ID,
        s.PARENT_SEVA_NAME,
        s.DEITY_ID,
        d.name as deity_name
      FROM sevamast s
      LEFT JOIN Deities d ON s.DEITY_ID = d.id
        AND d.entity_code = s.ENTITY_CODE
      WHERE s.ENTITY_CODE = ? AND s.IS_SUB_SEVA = true
      ORDER BY s.SEVA_CODE DESC
    `;
  
    const rows = await db.query(query, [entityCode]);
    return serializeData(rows || []);
  };

export const createSubSeva = async (data, entityCode, userId) => {
  const db = await getConnection();
  
  const parentSeva = await getParentSevaDetails(data.parent_seva_id, entityCode);
  const actualParentId = data.parent_seva_id.substring(1);
  const sevaType = parentSeva.sevaType;
  
  // Use SEVA_SASHWATH directly from parentSeva for both master and special sevas
  const sevaShashwath = parentSeva.SEVA_SASHWATH;
  const nextId = await getNextId(entityCode, sevaShashwath);
  const sevaCode = await generateSevaCode(nextId, sevaType === 'master' ? sevaShashwath : 'special');

  const query = `
    INSERT INTO sevamast (
      ENTITY_CODE,
      SEVA_CODE,
      SEVA_DESC,
      SEVA_AMOUNT,
      SEVA_ACTIVE,
      IS_SUB_SEVA,
      PARENT_SEVA_TYPE,
      PARENT_SEVA_ID,
      PARENT_SEVA_NAME,
      DEITY_ID,
      SEVA_SHASHWATH,
      CR_BY,
      CR_ON
    ) VALUES (?, ?, ?, ?, ?, true, ?, ?, ?, ?, ?, ?, NOW())
  `;

  const result = await db.query(query, [
    entityCode,
    sevaCode,
    data.name,
    data.price,
    data.is_enabled ? 'Y' : 'N',
    sevaType,
    actualParentId,
    parentSeva.name,
    data.deity_id,
    sevaShashwath,
    userId
  ]);

  return serializeData({ sevaCode, ...result });
};
export const updateSubSeva = async (sevaCode, data, entityCode, userId) => {
  const db = await getConnection();
  
  // Get parent seva details including SEVA_SASHWATH
  const parentSeva = await getParentSevaDetails(data.parent_seva_id, entityCode);
  const actualParentId = data.parent_seva_id.substring(1);
  const sevaType = parentSeva.sevaType;
  
  const query = `
    UPDATE sevamast
    SET
      SEVA_DESC = ?,
      SEVA_AMOUNT = ?,
      SEVA_ACTIVE = ?,
      PARENT_SEVA_TYPE = ?,
      PARENT_SEVA_ID = ?,
      PARENT_SEVA_NAME = ?,
      DEITY_ID = ?,
      SEVA_SHASHWATH = ?,
      MO_BY = ?,
      MO_ON = NOW()
    WHERE SEVA_CODE = ? AND ENTITY_CODE = ?
  `;

  const values = [
    data.name,
    data.price,
    data.is_enabled ? 'Y' : 'N',
    sevaType,
    actualParentId,
    parentSeva.name,
    data.deity_id,
    sevaType === 'master' ? parentSeva.SEVA_SASHWATH : null,
    userId,
    sevaCode,
    entityCode
  ];

  const result = await db.query(query, values);
  const updatedSeva = await getSubSevaById(sevaCode, entityCode);
  return updatedSeva;
};

