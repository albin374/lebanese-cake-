const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
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
        console.warn('⚠️ Falling back to local disk storage on Render...');
      }
    }

    // 2. Fallback to local server disk storage (e.g. for offline local development)
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer;
    let ext = '.png';

    if (matches && matches.length === 3) {
      const mime = matches[1];
      if (mime.includes('jpeg') || mime.includes('jpg')) ext = '.jpg';
      else if (mime.includes('webp')) ext = '.webp';
      else if (mime.includes('gif')) ext = '.gif';
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(image, 'base64');
    }

    const safeBaseName = (filename ? path.parse(filename).name : 'cake')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '_')
      .slice(0, 30);
    const uniqueFilename = `${safeBaseName}-${Date.now()}-${Math.floor(Math.random() * 1000)}${ext}`;
    const uploadDir = path.join(__dirname, '..', 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const targetPath = path.join(uploadDir, uniqueFilename);
    fs.writeFileSync(targetPath, buffer);

    const publicUrl = `/uploads/${uniqueFilename}`;
    return res.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      storage: 'local'
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ success: false, message: 'Failed to process image upload' });
  }
});

module.exports = router;
