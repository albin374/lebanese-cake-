# Lebanese Dream Bakery - Backend API & SQL Database

This is the Node.js Express backend powering **Lebanese Dream Bakery** and the **Admin Dashboard**, configured to use **MySQL via XAMPP**.

---

## 🚀 Quick Start with XAMPP

### 1. Start MySQL in XAMPP
1. Open the **XAMPP Control Panel**.
2. Click **Start** on the **MySQL** module (default port is `3306`).
3. *(Optional)* Click **Admin** next to MySQL to open phpMyAdmin (`http://localhost/phpmyadmin`).

### 2. Configure Environment (`.env`)
The backend is already configured with standard XAMPP defaults in `.env`:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=lebanese_bakery
JWT_SECRET=lebanese_dream_luxury_secret_key_2026
```

### 3. Run the Backend Server
From the project root:
```bash
cd backend
npm install
npm run init-db      # Creates database tables and registers the 8 categories
npm run clear-demo   # Clears any demo orders, products, and inquiries from MySQL
npm start
```
* The backend will automatically connect to MySQL and create the database `lebanese_bakery` and all required tables with seed data.
* If XAMPP MySQL is not running yet, the backend automatically runs in **resilient in-memory mode** so you can test the Admin Dashboard immediately.

---

## 🗄️ Database Tables (`database/schema.sql`)

* **`admins`**: Administrator accounts (default: `admin@lebanesedream.com` / `admin123`).
* **`categories`**: Cake and dessert categories.
* **`products`**: Catalog items (prices in AED, flavors, servings, image paths).
* **`orders`**: Customer cake orders with custom specifications JSON, statuses, and delivery times.
* **`order_items`**: Individual items in an order.
* **`inquiries`**: Consultation requests for weddings, events, and tastings.

---

## 🔐 Default Admin Credentials

* **Email**: `admin@lebanesedream.com`
* **Password**: `admin123`
* **Admin Dashboard URL**: `http://localhost:5173/#admin`

---

## 📡 Key API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Check backend & MySQL connection status | No |
| `POST` | `/api/auth/login` | Admin login & JWT generation | No |
| `GET` | `/api/dashboard/stats`| Live sales, pending orders & metrics | Yes (Bearer Token) |
| `GET` | `/api/orders` | Fetch orders (filter by status/search) | Yes (Bearer Token) |
| `POST` | `/api/orders` | Create a new cake order | No (Public checkout) |
| `PATCH` | `/api/orders/:id/status`| Update status (pending, in_production, etc.) | Yes (Bearer Token) |
| `GET` | `/api/products` | Fetch catalog products | No |
| `POST` | `/api/products` | Add a new cake to catalog | Yes (Bearer Token) |
| `PUT` | `/api/products/:id` | Edit cake details or price | Yes (Bearer Token) |
| `DELETE` | `/api/products/:id` | Remove cake | Yes (Bearer Token) |
| `GET` | `/api/inquiries` | Fetch catering/consultation requests | Yes (Bearer Token) |
