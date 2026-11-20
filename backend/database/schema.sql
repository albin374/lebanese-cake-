-- =======================================================
-- Lebanese Dream Bakery - Database Schema for MySQL / XAMPP
-- Database Name: lebanese_bakery
-- Host: localhost | Port: 3306 | User: root | Password: (empty by default)
-- =======================================================

CREATE DATABASE IF NOT EXISTS `lebanese_bakery` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `lebanese_bakery`;

-- -------------------------------------------------------
-- 1. Table: admins
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(60) NOT NULL,
  `email` VARCHAR(120) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(120) DEFAULT 'Executive Chef / Admin',
  `role` ENUM('superadmin', 'manager', 'baker') DEFAULT 'superadmin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- 2. Table: categories
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT,
  `image_url` VARCHAR(255),
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- 3. Table: products
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(200) NOT NULL UNIQUE,
  `category_slug` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `original_price` DECIMAL(10, 2) DEFAULT NULL,
  `currency` VARCHAR(10) DEFAULT 'AED',
  `flavor` VARCHAR(150),
  `servings` VARCHAR(80),
  `lead_time` VARCHAR(80) DEFAULT '24 hours notice',
  `weight` VARCHAR(50),
  `image_url` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `is_bestseller` BOOLEAN DEFAULT FALSE,
  `is_active` BOOLEAN DEFAULT TRUE,
  `stock_quantity` INT DEFAULT 50,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- 4. Table: orders
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(50) NOT NULL UNIQUE,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_email` VARCHAR(150),
  `customer_phone` VARCHAR(50) NOT NULL,
  `delivery_date` DATE,
  `delivery_time_slot` VARCHAR(50),
  `delivery_address` TEXT NOT NULL,
  `delivery_city` VARCHAR(80) DEFAULT 'Dubai',
  `cake_type` VARCHAR(100) DEFAULT 'Standard Catalog Cake',
  `cake_details` JSON,
  `order_notes` TEXT,
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `currency` VARCHAR(10) DEFAULT 'AED',
  `status` ENUM('pending', 'in_production', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
  `payment_status` ENUM('pending', 'paid', 'cash_on_delivery') DEFAULT 'cash_on_delivery',
  `payment_method` VARCHAR(50) DEFAULT 'Cash On Delivery',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- 5. Table: order_items
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT DEFAULT NULL,
  `product_title` VARCHAR(200) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(10, 2) NOT NULL,
  `subtotal` DECIMAL(10, 2) NOT NULL,
  `selected_flavor` VARCHAR(150),
  `custom_notes` TEXT,
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- 6. Table: inquiries (Consultations & Custom Requests)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `event_type` VARCHAR(100) DEFAULT 'Wedding / Celebration',
  `event_date` DATE,
  `guest_count` INT DEFAULT 50,
  `budget_range` VARCHAR(100),
  `message` TEXT NOT NULL,
  `status` ENUM('unread', 'in_contact', 'booked', 'archived') DEFAULT 'unread',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- INITIAL BASE DATA (ADMIN & CATEGORIES ONLY)
-- (No demo products, demo orders, or demo inquiries)
-- -------------------------------------------------------

-- Default Admin Account: admin@lebanesedream.com / admin123
INSERT INTO `admins` (`id`, `username`, `email`, `password_hash`, `full_name`, `role`)
VALUES (
  1,
  'admin',
  'admin@lebanesedream.com',
  '$2a$10$wU0uC4f5vW71X4q/6C8Dxe42s78lW80gZ5M1c1uC8wBqWqDkmxZ9e',
  'Administrator',
  'superadmin'
) ON DUPLICATE KEY UPDATE `email` = VALUES(`email`);

-- Official Bakery Categories (20 Categories with Frontend Banner Images)
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `sort_order`) VALUES
(1, 'Wedding Cakes', 'wedding', 'Luxury tiered celebration masterpieces', '/Elegant Ivory Wedding Cake Banner.png', 1),
(2, 'Corporate Cakes', 'corporate-cakes', 'Executive event cakes & branded desserts', '/Corporate Skyline Cake with Laptop topper.png', 2),
(3, 'Cookies', 'cookies', 'Freshly baked artisanal cookies & macarons', '/Golden Chocolate Chip Cookie Stack.png', 3),
(4, 'Cake Pops', 'cake-pops', 'Delightful handheld dessert bites for parties', '/Colorful Cake Pops in a Ribbon Jar.png', 4),
(5, 'Cupcakes', 'cupcakes', 'Gourmet artisanal cupcakes with French buttercream', '/Colorful Cupcakes on a Wooden Table.png', 5),
(6, 'Cakes for Kids', 'cakes-for-kids', 'Rainbow, fantasy and storybook cakes', '/Rainbow Bear Birthday Cake.png', 6),
(7, 'Cakes for Ladies', 'cakes-for-ladies', 'Pink floral, pearls & haute couture cakes', '/Elegant Pink Floral Pearl Cake.png', 7),
(8, 'Cakes for Guys', 'cakes-for-guys', 'Luxury cars, chronographs & bold themes', '/Black SUV Cake on a Wooden Tabletop.png', 8),
(9, 'Graduation Cakes', 'graduation-cakes', 'Celebrate academic milestones and commencement ceremonies', '/Elegant Graduation Cake with Diploma and Books.png', 9),
(10, 'Cars, Ships, Yachts & Planes Cakes', 'cars-ships-planes-cakes', 'Custom 3D sculpted luxury vehicles, ships, yachts & aviation cakes', '/Luxury Transportation Cake Showcase.png', 10),
(11, 'Sporting Cakes', 'sporting-cakes', 'Football, basketball, golf, tennis & championship celebration cakes', '/Sports Cake Trio Banner.png', 11),
(12, 'Couture Cakes', 'couture-cakes', 'Haute couture, fashion-forward & luxury designer cakes', '/Couture Cakes in Gold and Pink.png', 12),
(13, '3D Cakes', '3d-cakes', 'Spectacular sculpted 3-dimensional cake centerpieces', '/Spiderman, Unicorn and Race Car Cakes.png', 13),
(14, 'Food & Drink Illusion Cakes', 'food-drink-illusion-cakes', 'Hyper-realistic trompe-l\'œil culinary and beverage illusion cakes', '/Realistic Fast-Food Illusion Cakes.png', 14),
(15, 'Doughnuts Cakes', 'doughnuts-cakes', 'Custom artisanal stacked doughnut cakes and dessert towers', '/Glossy Donut Cake Trio.png', 15),
(16, 'Photo on Cake', 'photo-on-cake', 'High-definition edible printed memories and personalized photo cakes', '/Celebration Cakes with Edible Photos.png', 16),
(17, 'Pet & Animals Cakes', 'pet-animals-cakes', 'Cute puppies, kittens, safari & wildlife celebration cakes', '/Adorable Animal-Themed Fondant Cake Collection.png', 17),
(18, 'Superhero Cakes', 'superhero-cakes', 'Action-packed Marvel, DC & comic book hero sculpted cakes', '/Superhero Fondant Cake Trio.png', 18),
(19, 'Labubu Cakes', 'labubu-cakes', 'Trendy Labubu monster & whimsical vinyl toy designer cakes', '/Whimsical Labubu Cake Collection.png', 19),
(20, 'Cake Baking & Decorating Cakes', 'cake-baking-decorating', 'Baking enthusiast, confectionery master & sugarcraft themed cakes', '/Pink Rosette Berry Cake Workshop.png', 20)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `slug` = VALUES(`slug`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);
