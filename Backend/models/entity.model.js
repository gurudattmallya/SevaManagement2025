import { getConnection } from "../utils/db.js";

export const getEntityDetails = async (entityCode) => {
  const conn = await getConnection();
  const [entity] = await conn.query(
    `SELECT 
      ENTITYNUM_DESCN as name,
      OFF_ADDRESS1 as address1,
      OFF_ADDRESS2 as address2, 
      OFF_ADDRESS3 as address3,
      PIN_CODE as pinCode,
      CONTACT_NUM as phone,
      EMAIL_ID as email
    FROM entitynum 
    WHERE ENTITY_CODE = ?`,
    [entityCode]
  );
  return entity;
};
