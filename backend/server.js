const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initDatabase, getDatabaseStatus } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/auth.routes');
const ordersRoutes = require('./routes/orders.routes');
const productsRoutes = require('./routes/products.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const inquiriesRoutes = require('./routes/inquiries.routes');
const categoriesRoutes = require('./routes/categories.routes');

app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/categories', categoriesRoutes);

// Health & Database status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Lebanese Dream Bakery Backend API',
    database: getDatabaseStatus()
  });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Lebanese Dream Bakery API',
    documentation: {
      health: 'GET /api/health',
      auth: 'POST /api/auth/login',
      dashboard: 'GET /api/dashboard/stats',
      orders: 'GET, POST /api/orders',
      products: 'GET, POST /api/products',
      categories: 'GET, POST /api/categories',
      inquiries: 'GET, POST /api/inquiries'
    }
  });
});

// Start Server
async function startServer() {
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Lebanese Dream Bakery Backend Server running on port ${PORT}`);
    console.log(`🌐 Base URL: http://localhost:${PORT}`);
    console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`======================================================\n`);
  });
}

startServer();
