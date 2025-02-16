

// import express from "express";
// import multer from "multer";
// import { getConnection } from "../utils/db.js";
// import { S3Client } from "@aws-sdk/client-s3";
// import { Upload } from "@aws-sdk/lib-storage";
// import { DeleteObjectCommand } from "@aws-sdk/client-s3";

// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }
// });

// router.get("/home-image/:entityCode", async (req, res) => {
//   try {
//     const { entityCode } = req.params;
//     const db = await getConnection();

//     // First check if entity exists
//     const entityExists = await db.query(
//       "SELECT * FROM entitynum WHERE ENTITY_CODE = ?",
//       [entityCode]
//     );

//     if (!entityExists.length) {
//       return res.status(404).json({
//         success: false,
//         message: "Entity not found"
//       });
//     }

//     const rows = await db.query(
//       "SELECT image_key FROM entitynum WHERE ENTITY_CODE = ? ORDER BY uploaded_at DESC LIMIT 1",
//       [entityCode]
//     );

//     if (rows && rows.length > 0) {
//       return res.json({
//         success: true,
//         data: {
//           Key: rows[0].image_key,
          
//         }
//       });
//     }

//     return res.status(404).json({
//       success: false,
//       message: "No image found"
//     });

//   } catch (error) {
//     console.error('Error fetching home image:', error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch image",
//       error: error.message
//     });
//   }
// });

// // Delete home image
// router.delete("/home-image/:entityCode", async (req, res) => {
//   try {
//     const { entityCode } = req.params;
//     const db = await getConnection();
    
//     // Get S3 config and image key
//     const [s3Config] = await db.query(
//       "SELECT s3_region, s3_access_key_id, s3_secret_access_key, s3_bucket_name FROM entitynum WHERE ENTITY_CODE = ?",
//       [entityCode]
//     );

//     const [currentImage] = await db.query(
//       "SELECT image_key FROM entitynum WHERE ENTITY_CODE = ? ORDER BY uploaded_at DESC LIMIT 1",
//       [entityCode]
//     );

//     if (currentImage) {
//       // Delete from S3
//       const s3Client = new S3Client({
//         region: s3Config.s3_region,
//         credentials: {
//           accessKeyId: s3Config.s3_access_key_id,
//           secretAccessKey: s3Config.s3_secret_access_key
//         }
//       });

//       await s3Client.send(new DeleteObjectCommand({
//         Bucket: s3Config.s3_bucket_name,
//         Key: currentImage.image_key
//       }));

//       // Delete from database
//       await db.query(
//         "DELETE FROM entitynum WHERE ENTITY_CODE = ? AND image_key = ?",
//         [entityCode, currentImage.image_key]
//       );
//     }

//     res.json({
//       success: true,
//       message: "Image deleted successfully"
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete image"
//     });
//   }
// });

// router.post("/upload-home-image", upload.single("image"), async (req, res) => {
//   try {
//     const entityCode = req.body.ENTITY_CODE;
//     const db = await getConnection();

//     const rows = await db.query(
//       "SELECT s3_region, s3_access_key_id, s3_secret_access_key, s3_bucket_name FROM entitynum WHERE ENTITY_CODE = ?",
//       [entityCode]
//     );

//     if (!rows || rows.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Entity not found" });
//     }

//     const s3Config = rows[0];
//     const s3Client = new S3Client({
//       region: s3Config.s3_region,
//       credentials: {
//         accessKeyId: s3Config.s3_access_key_id,
//         secretAccessKey: s3Config.s3_secret_access_key
//       }
//     });

//     const timestamp = new Date().getTime();
//     const fileName = `${entityCode}/home-images/${timestamp}-${req.file.originalname}`;

//     const uploadParams = new Upload({
//       client: s3Client,
//       params: {
//         Bucket: s3Config.s3_bucket_name,
//         Key: fileName,
//         Body: req.file.buffer,
//         ContentType: req.file.mimetype
//       }
//     });

//     const result = await uploadParams.done();

//     res.json({
//       success: true,
//       message: "Image uploaded successfully",
//       data: result
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to upload image"
//     });
//   }
// });


// export default router;


import express from "express";
import multer from "multer";
import { getConnection } from "../utils/db.js";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});


router.get("/home-image/:entityCode", async (req, res) => {
  try {
    const { entityCode } = req.params;
    const db = await getConnection();

    const rows = await db.query(
      "SELECT image_key, s3_cloudfront_url FROM entitynum WHERE ENTITY_CODE = ?",
      [entityCode]
    );

    if (rows && rows.length > 0 && rows[0].image_key) {
      return res.json({
        success: true,
        data: {
          Key: rows[0].image_key,
          cloudfrontUrl: rows[0].s3_cloudfront_url
        }
      });
    }

    return res.status(404).json({
      success: false,
      message: "No image found"
    });
  } catch (error) {
    console.error("Error fetching home image:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch image"
    });
  }
});


router.post("/upload-home-image", upload.single("image"), async (req, res) => {
  try {
    const entityCode = req.body.ENTITY_CODE;
    const db = await getConnection();

    // First get the existing image_key to delete old image if exists
    const [currentImage] = await db.query(
      "SELECT image_key FROM entitynum WHERE ENTITY_CODE = ?",
      [entityCode]
    );

    const rows = await db.query(
      "SELECT s3_region, s3_access_key_id, s3_secret_access_key, s3_bucket_name FROM entitynum WHERE ENTITY_CODE = ?",
      [entityCode]
    );

    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Entity not found" });
    }

    const s3Config = rows[0];
    const s3Client = new S3Client({
      region: s3Config.s3_region,
      credentials: {
        accessKeyId: s3Config.s3_access_key_id,
        secretAccessKey: s3Config.s3_secret_access_key
      }
    });

    // Delete existing image if present
    if (currentImage?.image_key) {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: s3Config.s3_bucket_name,
          Key: currentImage.image_key
        })
      );
    }

    const timestamp = new Date().getTime();
    const fileName = `${entityCode}/home-images/${timestamp}-${req.file.originalname}`;

    const uploadParams = new Upload({
      client: s3Client,
      params: {
        Bucket: s3Config.s3_bucket_name,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      }
    });

    const result = await uploadParams.done();

    // Update the image_key in database
    await db.query(
      "UPDATE entitynum SET image_key = ?WHERE ENTITY_CODE = ?",
      [result.Key, entityCode]
    );

    res.json({
      success: true,
      message: "Image uploaded successfully",
      data: result
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload image"
    });
  }
});

export default router;
