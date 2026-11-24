const { query, inMemoryStore, getPool } = require('../config/db');

// Helper to generate URL-friendly slug
const generateSlug = (text) => {
  if (!text) return `cake-${Date.now()}`;
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

exports.getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;

    const rows = await query('SELECT * FROM products ORDER BY created_at DESC');
    let productList = rows || inMemoryStore.products;

    if (category && category !== 'all') {
      productList = productList.filter(p => p.category_slug === category);
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      productList = productList.filter(p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.title_ar && p.title_ar.toLowerCase().includes(q)) ||
        (p.flavor && p.flavor.toLowerCase().includes(q)) ||
        (p.flavor_ar && p.flavor_ar.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.description_ar && p.description_ar.toLowerCase().includes(q))
      );
    }

    return res.json({
      success: true,
      count: productList.length,
      products: productList
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const identifier = req.params.id;
    if (!identifier) {
      return res.status(400).json({ success: false, message: 'Product identifier is required' });
    }

    const numId = parseInt(identifier, 10);
    const isNumeric = !isNaN(numId) && String(numId) === String(identifier);
    const cleanSlug = identifier.toLowerCase().trim();

    let product = null;
    const pool = getPool();

    // 1. Try finding by numeric ID if identifier is numeric
    if (isNumeric) {
      if (pool) {
        try {
          const rows = await query('SELECT * FROM products WHERE id = ? LIMIT 1', [numId]);
          if (rows && rows.length > 0) product = rows[0];
        } catch (_) {}
      }
      if (!product) {
        product = inMemoryStore.products.find(p => p.id === numId);
      }
    }

    // 2. Try finding by slug or slugified title
    if (!product) {
      if (pool) {
        try {
          const rows = await query('SELECT * FROM products WHERE slug = ? OR title = ? LIMIT 1', [cleanSlug, identifier]);
          if (rows && rows.length > 0) product = rows[0];
        } catch (_) {}
      }
      if (!product) {
        product = inMemoryStore.products.find(p => 
          (p.slug && p.slug.toLowerCase().trim() === cleanSlug) ||
          (p.title && generateSlug(p.title) === cleanSlug) ||
          (p.title && p.title.toLowerCase().trim() === cleanSlug)
        );
      }
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.json({ success: true, product });
  } catch (err) {
    console.error('Error fetching product by ID/slug:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      title_ar,
      category_slug,
      price,
      original_price,
      flavor,
      flavor_ar,
      servings,
      servings_ar,
      lead_time,
      weight,
      tiers,
      image_url,
      secondary_image_url,
      description,
      description_ar,
      is_bestseller
    } = req.body;

    if (!title || !price || !category_slug) {
      return res.status(400).json({
        success: false,
        message: 'Product title, price, and category are required.'
      });
    }

    let slug = generateSlug(title);

    const newProduct = {
      title: title.trim(),
      title_ar: title_ar ? title_ar.trim() : null,
      slug,
      category_slug: category_slug.trim(),
      price: parseFloat(price),
      original_price: original_price ? parseFloat(original_price) : null,
      currency: 'AED',
      flavor: flavor || '',
      flavor_ar: flavor_ar || null,
      servings: servings || '',
      servings_ar: servings_ar || null,
      lead_time: lead_time || null,
      weight: weight || '',
      tiers: tiers || '',
      image_url: image_url || '/Lebanese Dream Bakery Cake Display.png',
      secondary_image_url: secondary_image_url || null,
      description: description || '',
      description_ar: description_ar || null,
      is_bestseller: is_bestseller ? 1 : 0,
      is_active: 1,
      created_at: new Date().toISOString()
    };

    let insertId = Date.now();
    const pool = getPool();
    if (pool) {
      try {
        const [result] = await pool.query(
          `INSERT INTO products (
            title, title_ar, slug, category_slug, price, original_price, currency,
            flavor, flavor_ar, servings, servings_ar, lead_time, weight, tiers, image_url, secondary_image_url, description, description_ar,
            is_bestseller, is_active
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newProduct.title,
            newProduct.title_ar,
            newProduct.slug,
            newProduct.category_slug,
            newProduct.price,
            newProduct.original_price,
            newProduct.currency,
            newProduct.flavor,
            newProduct.flavor_ar,
            newProduct.servings,
            newProduct.servings_ar,
            newProduct.lead_time,
            newProduct.weight,
            newProduct.tiers,
            newProduct.image_url,
            newProduct.secondary_image_url,
            newProduct.description,
            newProduct.description_ar,
            newProduct.is_bestseller,
            newProduct.is_active
          ]
        );
        insertId = result.insertId;
      } catch (dbErr) {
        console.warn('MySQL product insert fallback:', dbErr.message);
      }
    }

    newProduct.id = insertId;
    inMemoryStore.products.unshift(newProduct);

    return res.status(201).json({
      success: true,
      message: 'Product added successfully!',
      product: newProduct
    });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const {
      title,
      title_ar,
      category_slug,
      price,
      flavor,
      flavor_ar,
      servings,
      servings_ar,
      weight,
      tiers,
      image_url,
      secondary_image_url,
      description,
      description_ar,
      is_active,
      is_bestseller
    } = req.body;

    const newSlug = title ? generateSlug(title) : undefined;

    const pool = getPool();
    if (pool) {
      try {
        await pool.query(
          `UPDATE products SET 
            title = COALESCE(?, title),
            title_ar = COALESCE(?, title_ar),
            slug = COALESCE(?, slug),
            category_slug = COALESCE(?, category_slug),
            price = COALESCE(?, price),
            flavor = COALESCE(?, flavor),
            flavor_ar = COALESCE(?, flavor_ar),
            servings = COALESCE(?, servings),
            servings_ar = COALESCE(?, servings_ar),
            weight = COALESCE(?, weight),
            tiers = COALESCE(?, tiers),
            image_url = COALESCE(?, image_url),
            secondary_image_url = COALESCE(?, secondary_image_url),
            description = COALESCE(?, description),
            description_ar = COALESCE(?, description_ar),
            is_active = COALESCE(?, is_active),
            is_bestseller = COALESCE(?, is_bestseller)
           WHERE id = ?`,
          [
            title,
            title_ar,
            newSlug,
            category_slug,
            price,
            flavor,
            flavor_ar,
            servings,
            servings_ar,
            weight,
            tiers,
            image_url,
            secondary_image_url,
            description,
            description_ar,
            is_active,
            is_bestseller,
            id
          ]
        );
      } catch (e) {
        console.warn('MySQL product update fallback:', e.message);
      }
    }

    const memProd = inMemoryStore.products.find(p => p.id === id);
    if (memProd) {
      if (title !== undefined) memProd.title = title;
      if (title_ar !== undefined) memProd.title_ar = title_ar;
      if (newSlug !== undefined) memProd.slug = newSlug;
      if (category_slug !== undefined) memProd.category_slug = category_slug;
      if (price !== undefined) memProd.price = parseFloat(price);
      if (flavor !== undefined) memProd.flavor = flavor;
      if (flavor_ar !== undefined) memProd.flavor_ar = flavor_ar;
      if (servings !== undefined) memProd.servings = servings;
      if (servings_ar !== undefined) memProd.servings_ar = servings_ar;
      if (weight !== undefined) memProd.weight = weight;
      if (tiers !== undefined) memProd.tiers = tiers;
      if (image_url !== undefined) memProd.image_url = image_url;
      if (secondary_image_url !== undefined) memProd.secondary_image_url = secondary_image_url;
      if (description !== undefined) memProd.description = description;
      if (description_ar !== undefined) memProd.description_ar = description_ar;
      if (is_active !== undefined) memProd.is_active = is_active;
      if (is_bestseller !== undefined) memProd.is_bestseller = is_bestseller;
    }

    return res.json({
      success: true,
      message: 'Product updated successfully',
      product: memProd || { id, title, price }
    });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    await query('DELETE FROM products WHERE id = ?', [id]);
    inMemoryStore.products = inMemoryStore.products.filter(p => p.id !== id);

    return res.json({
      success: true,
      message: `Product #${id} removed successfully`
    });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};
