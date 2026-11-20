const { query, inMemoryStore } = require('../config/db');

// GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    let categories = await query('SELECT * FROM categories ORDER BY sort_order ASC, id ASC');
    if (!categories || categories.length === 0) {
      categories = inMemoryStore.categories;
    }

    return res.json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (err) {
    console.error('Error fetching categories:', err);
    return res.json({
      success: true,
      count: inMemoryStore.categories.length,
      categories: inMemoryStore.categories
    });
  }
};

// GET /api/categories/:id
exports.getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    let category = null;

    if (!isNaN(id)) {
      const rows = await query('SELECT * FROM categories WHERE id = ? LIMIT 1', [parseInt(id, 10)]);
      category = (rows && rows[0]) || inMemoryStore.categories.find(c => c.id === parseInt(id, 10));
    } else {
      const rows = await query('SELECT * FROM categories WHERE slug = ? LIMIT 1', [id]);
      category = (rows && rows[0]) || inMemoryStore.categories.find(c => c.slug === id);
    }

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    return res.json({ success: true, category });
  } catch (err) {
    console.error('Error fetching category by ID:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch category' });
  }
};

// POST /api/categories (Admin Protected)
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, description, image_url, sort_order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const cleanName = name.trim();
    const cleanSlug = (slug && slug.trim())
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      : cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const cleanDesc = description ? description.trim() : '';
    const cleanImage = (image_url && image_url.trim()) ? image_url.trim() : '/Elegant Ivory Wedding Cake Banner.png';
    const cleanOrder = parseInt(sort_order, 10) || 50;

    // Check if slug already exists in MySQL
    let isDuplicate = false;
    try {
      const existing = await query('SELECT id FROM categories WHERE slug = ? LIMIT 1', [cleanSlug]);
      if (existing && existing.length > 0) {
        isDuplicate = true;
      }
    } catch (checkErr) {
      console.warn('MySQL slug check notice:', checkErr.message);
    }

    if (!isDuplicate && inMemoryStore.categories.some(c => c.slug === cleanSlug)) {
      isDuplicate = true;
    }

    if (isDuplicate) {
      return res.status(400).json({
        success: false,
        message: `Category with slug "${cleanSlug}" already exists. Please use a unique name or slug.`
      });
    }

    let insertId = Date.now();
    try {
      const result = await query(
        'INSERT INTO categories (name, slug, description, image_url, sort_order) VALUES (?, ?, ?, ?, ?)',
        [cleanName, cleanSlug, cleanDesc, cleanImage, cleanOrder]
      );
      if (result && result.insertId) {
        insertId = result.insertId;
      }
    } catch (dbErr) {
      console.warn('MySQL insert category fallback:', dbErr.message);
    }

    const newCategory = {
      id: insertId,
      name: cleanName,
      slug: cleanSlug,
      description: cleanDesc,
      image_url: cleanImage,
      sort_order: cleanOrder
    };

    // Update inMemoryStore as well
    if (!inMemoryStore.categories.some(c => c.slug === cleanSlug)) {
      inMemoryStore.categories.push(newCategory);
    }

    return res.status(201).json({
      success: true,
      message: 'Category added successfully',
      category: newCategory
    });
  } catch (err) {
    console.error('Error creating category:', err);
    return res.status(500).json({ success: false, message: 'Failed to create category' });
  }
};

// DELETE /api/categories/:id (Admin Protected)
exports.deleteCategory = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    try {
      await query('DELETE FROM categories WHERE id = ?', [id]);
    } catch (dbErr) {
      console.warn('MySQL delete category fallback:', dbErr.message);
    }

    inMemoryStore.categories = inMemoryStore.categories.filter(c => c.id !== id);

    return res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting category:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
};
