const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'lebanese_bakery'
};

async function clearDemoData() {
  console.log('======================================================');
  console.log('🧹 Lebanese Dream Bakery - Clear Demo Data');
  console.log(`Connecting to MySQL database '${dbConfig.database}' at ${dbConfig.host}:${dbConfig.port}...`);
  console.log('======================================================\n');

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL database.');

    // Disable foreign key checks to safely truncate
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');

    console.log('Clearing demo data...');
    await connection.query('TRUNCATE TABLE `order_items`;');
    console.log('  - Truncated `order_items`');

    await connection.query('TRUNCATE TABLE `orders`;');
    console.log('  - Truncated `orders`');

    await connection.query('TRUNCATE TABLE `products`;');
    console.log('  - Truncated `products`');

    await connection.query('TRUNCATE TABLE `inquiries`;');
    console.log('  - Truncated `inquiries`');

    // Re-enable foreign key checks
    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log('\n📊 Current table record counts:');
    const [tables] = await connection.query('SHOW TABLES;');
    if (tables && tables.length > 0) {
      const tableKey = Object.keys(tables[0])[0];
      for (const t of tables) {
        const tableName = t[tableKey];
        const [countResult] = await connection.query(`SELECT COUNT(*) as count FROM \`${tableName}\``);
        console.log(`  - Table '${tableName}': ${countResult[0].count} records`);
      }
    }

    console.log('\n✨ All demo orders, products, order items, and inquiries have been cleared!');
    console.log('Your backend is now 100% clean and ready for real data.\n');
  } catch (err) {
    console.error('\n❌ Error clearing demo data:', err.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

clearDemoData();
