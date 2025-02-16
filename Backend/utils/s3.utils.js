import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getConnection } from './db.js';

const getS3Config = async (entityId) => {
  const conn = await getConnection();
  const [entity] = await conn.query(
    'SELECT s3_region, s3_access_key_id, s3_secret_access_key, s3_bucket_name FROM entitynum WHERE ENTITY_CODE = ?',
    [entityId]
  );

  return {
    region: entity.s3_region,
    credentials: {
      accessKeyId: entity.s3_access_key_id,
      secretAccessKey: entity.s3_secret_access_key
    },
    bucketName: entity.s3_bucket_name
  };
};

export const uploadFilesToAWSS3 = async (entityId, file, folder) => {
  const config = await getS3Config(entityId);
  const s3Client = new S3Client({
    region: config.region,
    credentials: config.credentials
  });

  const key = `${folder}/${Date.now()}-${file.originalname}`;
  const command = new PutObjectCommand({
    Bucket: config.bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype
  });

  await s3Client.send(command);

  return {
    Location: `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${key}`,
    Key: key,
    Bucket: config.bucketName
  };
};

export const deleteFilesFromAWSS3 = async (entityId, key) => {
  const config = await getS3Config(entityId);
  const s3Client = new S3Client({
    region: config.region,
    credentials: config.credentials
  });

  const command = new DeleteObjectCommand({
    Bucket: config.bucketName,
    Key: key
  });

  return await s3Client.send(command);
};
