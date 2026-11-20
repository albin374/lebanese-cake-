const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true
};

function parseSqlStatements(sqlContent) {
  let clean = sqlContent.replace(/\/\*[\s\S]*?\*\//g, '');
  clean = clean.replace(/--.*$/gm, '');
  return clean
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0);
}

async function runInit() {
  console.log('======================================================');
  console.log('🧁 Lebanese Dream Bakery - Database Initializer');
  console.log(`Connecting to MySQL at ${dbConfig.host}:${dbConfig.port} (user: ${dbConfig.user})...`);
  console.log('======================================================\n');

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL server successfully.');

    const dbName = process.env.DB_NAME || 'lebanese_bakery';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`✅ Database '${dbName}' verified/created.`);

    await connection.query(`USE \`${dbName}\`;`);

    const schemaPath = path.join(__dirname, 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`schema.sql not found at ${schemaPath}`);
    }

    const sqlContent = fs.readFileSync(schemaPath, 'utf8');
    const statements = parseSqlStatements(sqlContent);

    console.log(`Executing ${statements.length} schema statements & seed records...`);

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      try {
        await connection.query(stmt);
      } catch (err) {
        if (!err.message.includes('already exists') && !err.message.includes('Duplicate entry')) {
          console.warn(`  [Warning on stmt ${i + 1}]: ${err.message}`);
        }
      }
    }

    console.log('\n📊 Verifying created tables in database:');
    const [tables] = await connection.query('SHOW TABLES;');
    if (tables && tables.length > 0) {
      const tableKey = Object.keys(tables[0])[0];
      for (const t of tables) {
        const tableName = t[tableKey];
        const [countResult] = await connection.query(`SELECT COUNT(*) as count FROM \`${tableName}\``);
        console.log(`  - Table '${tableName}': ${countResult[0].count} records`);
      }
    }

    console.log('\n🎉 Database initialization completed successfully!');
    console.log(`All tables and seed data are ready for the Lebanese Dream Bakery Admin Dashboard.\n`);
  } catch (err) {
    console.error('\n❌ Initialization Error:', err.message);
    console.error('\nPlease verify that:');
    console.error('1. XAMPP Control Panel has MySQL started (green indicator).');
    console.error('2. MySQL port is 3306 (or set in backend/.env).');
    console.error('3. User is "root" with no password.\n');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runInit();
