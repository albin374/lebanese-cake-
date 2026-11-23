const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool = null;
let isConnected = false;
let connectionError = null;

// In-Memory Fallback Store (Used if XAMPP MySQL is temporarily offline)
const inMemoryStore = {
  admins: [
    {
      id: 1,
      username: 'admin',
      email: 'admin@lebanesedream.com',
      password_hash: '$2a$10$wU0uC4f5vW71X4q/6C8Dxe42s78lW80gZ5M1c1uC8wBqWqDkmxZ9e', // "admin123"
      full_name: 'Administrator',
      role: 'superadmin'
    }
  ],
  categories: [
    { id: 1, name: 'Wedding Cakes', slug: 'wedding', description: 'Luxury tiered celebration masterpieces', image_url: '/Elegant Ivory Wedding Cake Banner.png' },
    { id: 2, name: 'Classic Wedding Cakes', slug: 'classic-wedding-cakes', description: 'Timeless tiered white and ivory wedding cakes with royal icing and delicate sugar flora.', image_url: '/Elegant Ivory Wedding Cake Banner.png' },
    { id: 3, name: 'Novelty Wedding Cakes', slug: 'novelty-wedding-cakes', description: 'Creative, whimsical, and personalized bespoke wedding cake designs.', image_url: '/Tuxedo Wedding Cake with Embracing Couple.png' },
    { id: 4, name: 'Bride To Be Cakes', slug: 'bride-to-be-cakes', description: 'Chic bridal shower and bachelorette party cakes with pink florals and champagne accents.', image_url: '/Elegant Bride-to-Be Cake Display.png' },
    { id: 5, name: 'Engagement Celebration Cakes', slug: 'engagement-cakes', description: 'Romantic engagement cakes adorned with edible gold rings and floral wreaths.', image_url: '/Elegant Gold Ring Engagement Cake.png' },
    { id: 6, name: 'Grooms Cakes', slug: 'grooms-cakes', description: 'Tailored tuxedo, hobby, and masculine celebration cakes for the groom.', image_url: '/Tuxedo Groom Cake with Top Hat.png' },
    { id: 7, name: 'Corporate Cakes', slug: 'corporate-cakes', description: 'Executive event cakes & branded desserts', image_url: '/Corporate Skyline Cake with Laptop topper.png' },
    { id: 8, name: 'Corporate Cookies', slug: 'corporate-cookies', description: 'Lebanese cookies with precision edible logo prints for PR and brand activations.', image_url: '/Corporate Cookie Collection on Gold-Rimmed Plate.png' },
    { id: 9, name: 'Cupcakes with logo', slug: 'cupcakes-with-logo', description: 'Gourmet French buttercream cupcakes crowned with customized corporate logos.', image_url: '/Business Cupcake Icon Plate.png' },
    { id: 10, name: 'Cookies', slug: 'cookies', description: 'Freshly baked Lebanese cookies & macarons', image_url: '/Golden Chocolate Chip Cookie Stack.png' },
    { id: 11, name: 'Cake Pops', slug: 'cake-pops', description: 'Delightful handheld dessert bites for parties', image_url: '/Colorful Cake Pops in a Ribbon Jar.png' },
    { id: 12, name: 'Cupcakes', slug: 'cupcakes', description: 'Gourmet Lebanese cupcakes with French buttercream', image_url: '/Colorful Cupcakes on a Wooden Table.png' },
    { id: 13, name: 'Cakes for Kids', slug: 'cakes-for-kids', description: 'Rainbow, fantasy and storybook cakes', image_url: '/Rainbow Bear Birthday Cake.png' },
    { id: 14, name: 'Cakes for Ladies', slug: 'cakes-for-ladies', description: 'Pink floral, pearls & haute couture cakes', image_url: '/Elegant Pink Floral Pearl Cake.png' },
    { id: 15, name: 'Cakes for Guys', slug: 'cakes-for-guys', description: 'Luxury cars, chronographs & bold themes', image_url: '/Black SUV Cake on a Wooden Tabletop.png' },
    { id: 16, name: 'Graduation Cakes', slug: 'graduation-cakes', description: 'Celebrate academic milestones and commencement ceremonies', image_url: '/Elegant Graduation Cake with Diploma and Books.png' },
    { id: 17, name: 'Cars, Ships, Yachts and Planes Cakes', slug: 'cars-ships-planes-cakes', description: 'Custom 3D sculpted luxury vehicles, ships, yachts & aviation cakes', image_url: '/Luxury Transportation Cake Showcase.png' },
    { id: 18, name: 'Sporting Cakes', slug: 'sporting-cakes', description: 'Football, basketball, golf, tennis & championship celebration cakes', image_url: '/Sports Cake Trio Banner.png' },
    { id: 19, name: 'Couture Cakes', slug: 'couture-cakes', description: 'Haute couture, fashion-forward & luxury designer cakes', image_url: '/Couture Cakes in Gold and Pink.png' },
    { id: 20, name: '3D Cakes', slug: '3d-cakes', description: 'Spectacular sculpted 3-dimensional cake centerpieces', image_url: '/Spiderman, Unicorn and Race Car Cakes.png' },
    { id: 21, name: 'Food and Drink Illusion Cakes', slug: 'food-drink-illusion-cakes', description: 'Hyper-realistic trompe-l\'œil culinary and beverage illusion cakes', image_url: '/Realistic Fast-Food Illusion Cakes.png' },
    { id: 22, name: 'Doughnuts Cakes', slug: 'doughnuts-cakes', description: 'Custom Lebanese stacked doughnut cakes and dessert towers', image_url: '/Glossy Donut Cake Trio.png' },
    { id: 23, name: 'Photo on Cake', slug: 'photo-on-cake', description: 'High-definition edible printed memories and personalized photo cakes', image_url: '/Celebration Cakes with Edible Photos.png' },
    { id: 24, name: 'Pet and Animals Cakes', slug: 'pet-animals-cakes', description: 'Cute puppies, kittens, safari & wildlife celebration cakes', image_url: '/Adorable Animal-Themed Fondant Cake Collection.png' },
    { id: 25, name: 'Superhero Cakes', slug: 'superhero-cakes', description: 'Action-packed Marvel, DC & comic book hero sculpted cakes', image_url: '/Superhero Fondant Cake Trio.png' },
    { id: 26, name: 'Labubu Cakes', slug: 'labubu-cakes', description: 'Trendy Labubu monster & whimsical vinyl toy designer cakes', image_url: '/Whimsical Labubu Cake Collection.png' },
    { id: 27, name: 'Cake Baking and Decorating Cakes', slug: 'cake-baking-decorating', description: 'Baking enthusiast, confectionery master & sugarcraft themed cakes', image_url: '/Pink Rosette Berry Cake Workshop.png' }
  ],
  products: [],
  orders: [],
  inquiries: [],
  customizations: []
};

function parseSqlStatements(sqlContent) {
  // Strip multi-line comments
  let clean = sqlContent.replace(/\/\*[\s\S]*?\*\//g, '');
  // Strip single-line comments (-- ...)
  clean = clean.replace(/--.*$/gm, '');
  // Split on semicolon and filter non-empty
  return clean
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0);
}

async function initDatabase() {
  try {
    // Attempt connecting to MySQL server directly
    const rawConnection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      multipleStatements: true
    });

    console.log(`🔌 [Database] Successfully connected to MySQL at ${dbConfig.host}:${dbConfig.port}`);
    
    // Ensure database exists
    const dbName = process.env.DB_NAME || 'lebanese_bakery';
    await rawConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await rawConnection.end();

    // Create pool with specific database
    if (!pool) {
      pool = mysql.createPool({
        ...dbConfig,
        database: dbName
      });
    }

    // Execute schema tables and seed data if not exist
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sqlContent = fs.readFileSync(schemaPath, 'utf8');
      const queries = parseSqlStatements(sqlContent);

      const conn = await pool.getConnection();
      try {
        for (const query of queries) {
          if (query) {
            try {
              await conn.query(query);
            } catch (qErr) {
              // Ignore benign already exists or duplicate key warnings
              if (!qErr.message.includes('already exists') && !qErr.message.includes('Duplicate entry')) {
                console.warn(`[Database Notice] ${qErr.message}`);
              }
            }
          }
        }

        // Automatic column migrations for products Arabic translation fields and cake specifications
        const columnMigrations = [
          { col: 'title_ar', sql: 'ALTER TABLE `products` ADD COLUMN `title_ar` VARCHAR(255) NULL AFTER `title`' },
          { col: 'flavor_ar', sql: 'ALTER TABLE `products` ADD COLUMN `flavor_ar` VARCHAR(255) NULL AFTER `flavor`' },
          { col: 'servings_ar', sql: 'ALTER TABLE `products` ADD COLUMN `servings_ar` VARCHAR(100) NULL AFTER `servings`' },
          { col: 'description_ar', sql: 'ALTER TABLE `products` ADD COLUMN `description_ar` TEXT NULL AFTER `description`' },
          { col: 'weight', sql: 'ALTER TABLE `products` ADD COLUMN `weight` VARCHAR(50) NULL AFTER `servings_ar`' },
          { col: 'tiers', sql: 'ALTER TABLE `products` ADD COLUMN `tiers` VARCHAR(50) NULL AFTER `weight`' },
          { col: 'stripe_session_id', sql: 'ALTER TABLE `orders` ADD COLUMN `stripe_session_id` VARCHAR(255) NULL AFTER `payment_method`' },
          { col: 'stripe_payment_intent_id', sql: 'ALTER TABLE `orders` ADD COLUMN `stripe_payment_intent_id` VARCHAR(255) NULL AFTER `stripe_session_id`' }
        ];

        for (const mig of columnMigrations) {
          try {
            await conn.query(mig.sql);
            console.log(`[Database Migration] Added column ${mig.col} to products`);
          } catch (migErr) {
            // Error 1060: Duplicate column name (column already exists)
            if (!migErr.message.includes('Duplicate column')) {
              // Ignore other non-critical migration notices
            }
          }
        }

        console.log(`✅ [Database] Schema and tables initialized in MySQL database '${dbName}' (${queries.length} statements verified)`);
      } finally {
        conn.release();
      }
    }

    isConnected = true;
    connectionError = null;
    return true;
  } catch (err) {
    isConnected = false;
    connectionError = err.message;
    console.warn('\n======================================================');
    console.warn('⚠️  [XAMPP MySQL Notice]');
    console.warn(`Could not connect to MySQL at ${dbConfig.host}:${dbConfig.port} (${err.message}).`);
    console.warn('👉 To connect to MySQL:');
    console.warn('   1. Open the XAMPP Control Panel.');
    console.warn('   2. Click "Start" next to MySQL.');
    console.warn('   3. Database is configured for: user "root", no password, port 3306.');
    console.warn('⚡ [Fallback] Running in in-memory mode so APIs and Admin Dashboard work immediately!');
    console.warn('======================================================\n');
    return false;
  }
}

// Helper to query with automatic table auto-creation and fallback
async function query(sql, params = []) {
  if (isConnected && pool) {
    try {
      const [rows] = await pool.query(sql, params);
      return rows;
    } catch (err) {
      // Auto-heal: If table does not exist, initialize database tables and retry query once
      if (err.code === 'ER_NO_SUCH_TABLE' && !query._isRetrying) {
        query._isRetrying = true;
        console.log(`🔄 [Database] Missing table detected (${err.message}). Auto-creating schema tables now...`);
        try {
          await initDatabase();
          const [retryRows] = await pool.query(sql, params);
          query._isRetrying = false;
          return retryRows;
        } catch (retryErr) {
          query._isRetrying = false;
          console.error('MySQL query error after auto-schema init:', retryErr.message);
        }
      } else {
        console.error('MySQL query error, using fallback:', err.message);
      }
    }
  }
  return null;
}

function getDatabaseStatus() {
  return {
    connected: isConnected,
    type: isConnected ? 'mysql' : 'in_memory_fallback',
    host: dbConfig.host,
    port: dbConfig.port,
    database: process.env.DB_NAME || 'lebanese_bakery',
    user: dbConfig.user,
    error: connectionError
  };
}

module.exports = {
  initDatabase,
  query,
  getPool: () => pool,
  getDatabaseStatus,
  inMemoryStore
};
