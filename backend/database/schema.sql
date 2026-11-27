-- =======================================================
-- Lebanese Dream Bakery - Database Schema for MySQL / Cloud DB
-- Host: localhost | Cloud TiDB | MySQL
-- =======================================================

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
  `title_ar` VARCHAR(255) DEFAULT NULL,
  `slug` VARCHAR(200) NOT NULL UNIQUE,
  `category_slug` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `original_price` DECIMAL(10, 2) DEFAULT NULL,
  `currency` VARCHAR(10) DEFAULT 'AED',
  `flavor` VARCHAR(150),
  `flavor_ar` VARCHAR(255) DEFAULT NULL,
  `servings` VARCHAR(80),
  `servings_ar` VARCHAR(100) DEFAULT NULL,
  `lead_time` VARCHAR(80) DEFAULT '24 hours notice',
  `weight` VARCHAR(50),
  `tiers` VARCHAR(50) DEFAULT NULL,
  `image_url` MEDIUMTEXT NOT NULL,
  `secondary_image_url` MEDIUMTEXT DEFAULT NULL,
  `description` TEXT,
  `description_ar` TEXT DEFAULT NULL,
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
  `stripe_session_id` VARCHAR(255) DEFAULT NULL,
  `stripe_payment_intent_id` VARCHAR(255) DEFAULT NULL,
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
-- 7. Table: customizations (Bespoke 3D Customizer Submissions)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customizations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `customization_code` VARCHAR(50) NOT NULL UNIQUE,
  `occasion` VARCHAR(100) NOT NULL,
  `theme_design` VARCHAR(150) DEFAULT NULL,
  `shape` VARCHAR(50) DEFAULT 'Round',
  `tiers` VARCHAR(50) DEFAULT '1 Layer',
  `size` VARCHAR(100) DEFAULT 'Medium - 2kg',
  `servings` VARCHAR(80) DEFAULT '12-16 Servings',
  `sponge_flavor` VARCHAR(150) NOT NULL,
  `filling_flavor` VARCHAR(150) NOT NULL,
  `toppings` JSON DEFAULT NULL,
  `birthday_toppers` JSON DEFAULT NULL,
  `cake_message` TEXT DEFAULT NULL,
  `preview_image` TEXT DEFAULT NULL,
  `total_price` DECIMAL(10, 2) NOT NULL,
  `customer_name` VARCHAR(150) DEFAULT NULL,
  `customer_phone` VARCHAR(50) DEFAULT NULL,
  `customer_email` VARCHAR(150) DEFAULT NULL,
  `delivery_date` DATE DEFAULT NULL,
  `delivery_time_slot` VARCHAR(50) DEFAULT NULL,
  `delivery_address` TEXT DEFAULT NULL,
  `status` ENUM('new', 'reviewed', 'in_kitchen', 'completed', 'cancelled') DEFAULT 'new',
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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

-- Official Bakery Categories (Categories & Subcategories with Frontend Banner Images)
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `sort_order`) VALUES
(1, 'Wedding Cakes', 'wedding', 'Luxury tiered celebration masterpieces', '/Elegant Ivory Wedding Cake Banner.png', 1),
(2, 'Classic Wedding Cakes', 'classic-wedding-cakes', 'Timeless tiered white and ivory wedding cakes with royal icing and delicate sugar flora.', '/Elegant Ivory Wedding Cake Banner.png', 1),
(3, 'Novelty Wedding Cakes', 'novelty-wedding-cakes', 'Creative, whimsical, and personalized bespoke wedding cake designs.', '/Tuxedo Wedding Cake with Embracing Couple.png', 1),
(4, 'Bride To Be Cakes', 'bride-to-be-cakes', 'Chic bridal shower and bachelorette party cakes with pink florals and champagne accents.', '/Elegant Bride-to-Be Cake Display.png', 1),
(5, 'Engagement Celebration Cakes', 'engagement-cakes', 'Romantic engagement cakes adorned with edible gold rings and floral wreaths.', '/Elegant Gold Ring Engagement Cake.png', 1),
(6, 'Grooms Cakes', 'grooms-cakes', 'Tailored tuxedo, hobby, and masculine celebration cakes for the groom.', '/Tuxedo Groom Cake with Top Hat.png', 1),
(7, 'Corporate Cakes', 'corporate-cakes', 'Executive event cakes & branded desserts', '/Corporate Skyline Cake with Laptop topper.png', 2),
(8, 'Corporate Cookies', 'corporate-cookies', 'Lebanese cookies with precision edible logo prints for PR and brand activations.', '/Corporate Cookie Collection on Gold-Rimmed Plate.png', 2),
(9, 'Cupcakes with logo', 'cupcakes-with-logo', 'Gourmet French buttercream cupcakes crowned with customized corporate logos.', '/Business Cupcake Icon Plate.png', 2),
(10, 'Cookies', 'cookies', 'Freshly baked Lebanese cookies & macarons', '/Golden Chocolate Chip Cookie Stack.png', 3),
(11, 'Cake Pops', 'cake-pops', 'Delightful handheld dessert bites for parties', '/Colorful Cake Pops in a Ribbon Jar.png', 4),
(12, 'Cupcakes', 'cupcakes', 'Gourmet Lebanese cupcakes with French buttercream', '/Colorful Cupcakes on a Wooden Table.png', 5),
(13, 'Cakes for Kids', 'cakes-for-kids', 'Rainbow, fantasy and storybook cakes', '/Rainbow Bear Birthday Cake.png', 6),
(14, 'Cakes for Ladies', 'cakes-for-ladies', 'Pink floral, pearls & haute couture cakes', '/Elegant Pink Floral Pearl Cake.png', 7),
(15, 'Cakes for Guys', 'cakes-for-guys', 'Luxury cars, chronographs & bold themes', '/Black SUV Cake on a Wooden Tabletop.png', 8),
(16, 'Graduation Cakes', 'graduation-cakes', 'Celebrate academic milestones and commencement ceremonies', '/Elegant Graduation Cake with Diploma and Books.png', 9),
(17, 'Cars, Ships, Yachts and Planes Cakes', 'cars-ships-planes-cakes', 'Custom 3D sculpted luxury vehicles, ships, yachts & aviation cakes', '/Luxury Transportation Cake Showcase.png', 10),
(18, 'Sporting Cakes', 'sporting-cakes', 'Football, basketball, golf, tennis & championship celebration cakes', '/Sports Cake Trio Banner.png', 11),
(19, 'Couture Cakes', 'couture-cakes', 'Haute couture, fashion-forward & luxury designer cakes', '/Couture Cakes in Gold and Pink.png', 12),
(20, '3D Cakes', '3d-cakes', 'Spectacular sculpted 3-dimensional cake centerpieces', '/Spiderman, Unicorn and Race Car Cakes.png', 13),
(21, 'Food and Drink Illusion Cakes', 'food-drink-illusion-cakes', 'Hyper-realistic trompe-l\'œil culinary and beverage illusion cakes', '/Realistic Fast-Food Illusion Cakes.png', 14),
(22, 'Doughnuts Cakes', 'doughnuts-cakes', 'Custom Lebanese stacked doughnut cakes and dessert towers', '/Glossy Donut Cake Trio.png', 15),
(23, 'Photo on Cake', 'photo-on-cake', 'High-definition edible printed memories and personalized photo cakes', '/Celebration Cakes with Edible Photos.png', 16),
(24, 'Pet and Animals Cakes', 'pet-animals-cakes', 'Cute puppies, kittens, safari & wildlife celebration cakes', '/Adorable Animal-Themed Fondant Cake Collection.png', 17),
(25, 'Superhero Cakes', 'superhero-cakes', 'Action-packed Marvel, DC & comic book hero sculpted cakes', '/Superhero Fondant Cake Trio.png', 18),
(26, 'Labubu Cakes', 'labubu-cakes', 'Trendy Labubu monster & whimsical vinyl toy designer cakes', '/Whimsical Labubu Cake Collection.png', 19),
(27, 'Cake Baking and Decorating Cakes', 'cake-baking-decorating', 'Baking enthusiast, confectionery master & sugarcraft themed cakes', '/Pink Rosette Berry Cake Workshop.png', 20)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `slug` = VALUES(`slug`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);
