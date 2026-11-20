const { query, inMemoryStore, getPool } = require('../config/db');

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
        (p.flavor && p.flavor.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
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
    const id = parseInt(req.params.id, 10);
    const rows = await query('SELECT * FROM products WHERE id = ? LIMIT 1', [id]);
    const product = (rows && rows[0]) || inMemoryStore.products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.json({ success: true, product });
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      category_slug,
      price,
      original_price,
      flavor,
      servings,
      lead_time,
      weight,
      image_url,
      description,
      is_bestseller
    } = req.body;

    if (!title || !price || !category_slug) {
      return res.status(400).json({
        success: false,
        message: 'Product title, price, and category are required.'
      });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProduct = {
      title,
      slug,
      category_slug,
      price: parseFloat(price),
      original_price: original_price ? parseFloat(original_price) : null,
      currency: 'AED',
      flavor: flavor || 'French Vanilla & Dark Chocolate',
      servings: servings || '12-15 servings',
      lead_time: lead_time || '24 hours notice',
      weight: weight || '2.0 kg',
      image_url: image_url || '/categorycake imges/Wedding Cake.png',
      description: description || '',
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
            title, slug, category_slug, price, original_price, currency,
            flavor, servings, lead_time, weight, image_url, description,
            is_bestseller, is_active
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newProduct.title,
            newProduct.slug,
            newProduct.category_slug,
            newProduct.price,
            newProduct.original_price,
            newProduct.currency,
            newProduct.flavor,
            newProduct.servings,
            newProduct.lead_time,
            newProduct.weight,
            newProduct.image_url,
            newProduct.description,
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
      category_slug,
      price,
      flavor,
      servings,
      image_url,
      description,
      is_active,
      is_bestseller
    } = req.body;

    const pool = getPool();
    if (pool) {
      try {
        await pool.query(
          `UPDATE products SET 
            title = COALESCE(?, title),
            category_slug = COALESCE(?, category_slug),
            price = COALESCE(?, price),
            flavor = COALESCE(?, flavor),
            servings = COALESCE(?, servings),
            image_url = COALESCE(?, image_url),
            description = COALESCE(?, description),
            is_active = COALESCE(?, is_active),
            is_bestseller = COALESCE(?, is_bestseller)
           WHERE id = ?`,
          [title, category_slug, price, flavor, servings, image_url, description, is_active, is_bestseller, id]
        );
      } catch (e) {
        console.warn('MySQL product update fallback:', e.message);
      }
    }

    const memProd = inMemoryStore.products.find(p => p.id === id);
    if (memProd) {
      if (title !== undefined) memProd.title = title;
      if (category_slug !== undefined) memProd.category_slug = category_slug;
      if (price !== undefined) memProd.price = parseFloat(price);
      if (flavor !== undefined) memProd.flavor = flavor;
      if (servings !== undefined) memProd.servings = servings;
      if (image_url !== undefined) memProd.image_url = image_url;
      if (description !== undefined) memProd.description = description;
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
