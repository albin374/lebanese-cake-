const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { requireAdmin } = require('../middleware/auth.middleware');

// Optional Cloudinary Configuration (Permanent CDN storage for production e.g. on Render)
const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_URL || (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  )
);

if (isCloudinaryConfigured) {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config();
  } else {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
  }
}

router.post('/', requireAdmin, async (req, res) => {
  try {
    const { image, filename } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided' });
    }

    // 1. If Cloudinary credentials are provided, store permanently in Cloudinary CDN
    if (isCloudinaryConfigured) {
      try {
        const uploadResult = await cloudinary.uploader.upload(image, {
          folder: 'lebanese_bakery/products',
          resource_type: 'image'
        });

        console.log('✅ Image successfully uploaded to Cloudinary:', uploadResult.secure_url);

        return res.json({
          success: true,
          url: uploadResult.secure_url,
          filename: uploadResult.public_id,
          storage: 'cloudinary'
        });
      } catch (cloudErr) {
        console.error('❌ Cloudinary upload error:', cloudErr.message, '(HTTP ' + (cloudErr.http_code || 500) + ')');
        console.warn('⚠️ Falling back to database-stored data URI...');
      }
    }

    // 2. Fallback to base64 data URI stored directly in the database (persists across ephemeral deploys)
    const dataUri = image.startsWith('data:') ? image : `data:image/jpeg;base64,${image}`;
    return res.json({
      success: true,
      url: dataUri,
      filename: filename || 'cake-image',
      storage: 'database'
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ success: false, message: 'Failed to process image upload' });
  }
});

module.exports = router;
