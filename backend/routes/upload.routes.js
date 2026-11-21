const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { requireAdmin } = require('../middleware/auth.middleware');

router.post('/', requireAdmin, async (req, res) => {
  try {
    const { image, filename } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided' });
    }

    // Match data:image/png;base64,...
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
      filename: uniqueFilename
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ success: false, message: 'Failed to process image upload' });
  }
});

module.exports = router;
