-- =================================================================
-- Alfaisal Grocery Store - Complete Database Schema (MySQL 8.0+)
-- Author: Faisal Mumtaz (Alfaisal Grocery Store)
-- Description: DDL & DML for Users, Categories, Products, Orders, Order Items, and Payments.
-- =================================================================

DROP DATABASE IF EXISTS alfaisal_grocery_db;
CREATE DATABASE alfaisal_grocery_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE alfaisal_grocery_db;

-- 1. Users Table (Customers and Administrators)
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    role ENUM('CUSTOMER', 'ADMIN') DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Categories Table
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(255),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Products Table
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY,
    category_id VARCHAR(36) NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price_pkr DECIMAL(10, 2) NOT NULL,
    original_price_pkr DECIMAL(10, 2) NULL,
    unit VARCHAR(50) NOT NULL, -- e.g. '1 kg', '1 Litre', '12 Eggs'
    stock_quantity INT NOT NULL DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    image_url VARCHAR(255) NOT NULL,
    origin VARCHAR(100),
    badge VARCHAR(50),
    rating DECIMAL(2, 1) DEFAULT 5.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- 4. Orders Table
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    order_number VARCHAR(30) NOT NULL UNIQUE,
    user_id VARCHAR(36) NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(120) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    delivery_address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    delivery_notes TEXT,
    subtotal_pkr DECIMAL(10, 2) NOT NULL,
    delivery_fee_pkr DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    discount_pkr DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_amount_pkr DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('Cash on Delivery', 'JazzCash', 'EasyPaisa', 'Debit/Credit Card') NOT NULL,
    payment_status ENUM('PAID', 'PENDING_COD') NOT NULL,
    order_status ENUM('Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 5. Order Items Table
CREATE TABLE order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    unit_price_pkr DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(50) NOT NULL,
    total_price_pkr DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- 6. Payments Audit Table
CREATE TABLE payments (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_reference VARCHAR(100),
    amount_pkr DECIMAL(10, 2) NOT NULL,
    status ENUM('SUCCESSFUL', 'PENDING', 'FAILED') DEFAULT 'PENDING',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- =================================================================
-- SAMPLE SEED DATA
-- =================================================================

-- Seed Users
INSERT INTO users (id, full_name, email, password_hash, phone, address, city, role) VALUES
('user-admin-1', 'Muhammad Faisal', 'muhammadfaisal@gmail.com', '$2a$12$e8Yx/9Uv6eM4YxK0eG7/..oW...', '0344-7443291', 'Main Ferozepur Road Hub', 'Lahore', 'ADMIN'),
('user-cust-1', 'Ayesha Khan', 'customer@alfaisal.pk', '$2a$12$v9Xz/8Tv5dL3XxJ9dF6/..nW...', '0300-4567891', 'House 42-B, Sector G-11/2', 'Islamabad', 'CUSTOMER');

-- Seed Categories
INSERT INTO categories (id, name, slug, description, image_url, display_order) VALUES
('cat-fruits-veg', 'Fruits and Vegetables', 'fruits-vegetables', 'Crisp organic vegetables and seasonal sweet orchard fruits directly from Punjab farms.', '/src/assets/images/cat_fruits_vegetables_1792608012996.jpg', 1),
('cat-dairy-eggs', 'Milk, Eggs and Dairy', 'milk-eggs-dairy', 'Pure buffalo & cow milk, farm-fresh brown eggs, desi makhan, and fresh yogurt.', '/src/assets/images/cat_dairy_eggs_1792608013010.jpg', 2),
('cat-bakery', 'Bakery Items', 'bakery-items', 'Daily fresh oven-baked breads, flaky croissants, tea rusks, and wholesome buns.', '/src/assets/images/cat_bakery_fresh_1792608013672.jpg', 3),
('cat-rice-pulses', 'Rice, Flour and Pulses', 'rice-flour-pulses', 'Aged Super Kernel Basmati rice, premium chakki whole wheat atta, and clean sorted daals.', '/src/assets/images/cat_pantry_staples_1792608014097.jpg', 4),
('cat-snacks', 'Snacks and Biscuits', 'snacks-biscuits', 'Crunchy potato crisps, traditional bakery cookies, roasted nuts, and tea-time biscuits.', 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e', 5),
('cat-beverages', 'Beverages and Juices', 'beverages-juices', 'Pure cold-pressed juices, premium Danedar black tea, mineral water, and refreshing syrups.', 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8', 6),
('cat-spices-oil', 'Cooking Oil and Spices', 'cooking-oil-spices', 'Triple refined canola oil, pure mustard oil, ground red chilli, haldi, and whole spices.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d', 7),
('cat-cleaning', 'Household Cleaning Products', 'household-cleaning', 'Antibacterial floor cleaners, dishwashing bars & liquids, laundry detergent, and sanitizers.', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f', 8);

-- Seed Products
INSERT INTO products (id, category_id, name, description, price_pkr, original_price_pkr, unit, stock_quantity, is_available, image_url, origin, badge, rating) VALUES
('prod-101', 'cat-fruits-veg', 'Organic Farm Fresh Red Apples', 'Crisp, naturally sweet Kashmiri and Swat orchard apples picked at peak ripeness.', 280.00, 320.00, '1 kg', 45, TRUE, '/src/assets/images/cat_fruits_vegetables_1792608012996.jpg', 'Swat Valley', 'Seasonal Pick', 4.8),
('prod-102', 'cat-fruits-veg', 'Farm Fresh Sindhri Sweet Mangoes', 'Aromatic, golden Sindhri mangoes packed with rich honey-like sweetness.', 360.00, 400.00, '1 kg', 60, TRUE, 'https://images.unsplash.com/photo-1553279768-865429fa0078', 'Mirpurkhas, Sindh', 'Best Seller', 4.9),
('prod-201', 'cat-dairy-eggs', 'Pure Buffalo Farm Fresh Milk', '100% pure, unadulterated high-fat buffalo milk straight from hygienic Sahiwal dairy farms.', 240.00, NULL, '1 Litre Glass Bottle', 40, TRUE, '/src/assets/images/cat_dairy_eggs_1792608013010.jpg', 'Sahiwal Dairy', '100% Pure', 4.9),
('prod-202', 'cat-dairy-eggs', 'Organic Desi Brown Eggs', 'Free-range, grain-fed hen brown eggs with vibrant golden-orange yolks.', 380.00, 420.00, 'Pack of 12 Eggs', 35, TRUE, 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f', 'Chakwal Poultry', 'Free Range', 4.9),
('prod-301', 'cat-bakery', 'Artisanal Sourdough Country Loaf', 'Slow-fermented artisan sourdough with crackling crust and tender airy crumb.', 320.00, NULL, '650g Loaf', 18, TRUE, '/src/assets/images/cat_bakery_fresh_1792608013672.jpg', 'Alfaisal Bakery', 'Baker Specialty', 4.8),
('prod-401', 'cat-rice-pulses', 'Super Kernel Basmati Rice (Aged 2 Years)', 'Extra-long grain aromatic Basmati grown in Gujranwala belt. Elongates twice its size.', 1950.00, 2200.00, '5 kg Eco Bag', 35, TRUE, '/src/assets/images/cat_pantry_staples_1792608014097.jpg', 'Gujranwala Basin', 'Premium Grade', 4.9),
('prod-402', 'cat-rice-pulses', 'Stone-Ground Chakki Atta (Whole Wheat)', 'Pure traditional slow-milled chakki flour with natural bran and germ intact.', 1480.00, NULL, '10 kg Pack', 45, TRUE, 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b', 'Punjab Grain Reserve', NULL, 4.8),
('prod-701', 'cat-spices-oil', 'Pure Triple Refined Canola Cooking Oil', 'Naturally cholesterol-free, enriched with Vitamins A & D, low absorb formula.', 2650.00, 2850.00, '5 Litre Jerry Can', 25, TRUE, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5', 'Port Qasim Refined', 'Heart Healthy', 4.9),
('prod-801', 'cat-cleaning', 'Concentrated Citrus Dishwashing Gel', 'Active lemon grease-cutting enzyme formula leaves glassware sparkling clean.', 380.00, 420.00, '1 Litre Pump Bottle', 40, TRUE, 'https://images.unsplash.com/photo-1583947215259-38e31be8751f', 'Alfaisal Essentials', 'Grease Buster', 4.7);

-- Trigger: Reduce stock quantity automatically on order item creation
DELIMITER //
CREATE TRIGGER trg_after_order_item_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products
    SET stock_quantity = GREATEST(0, stock_quantity - NEW.quantity),
        is_available = CASE WHEN stock_quantity - NEW.quantity > 0 THEN TRUE ELSE FALSE END
    WHERE id = NEW.product_id;
END;
//
DELIMITER ;
