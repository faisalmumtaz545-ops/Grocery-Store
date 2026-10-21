# Alfaisal Grocery Store 🛒

A complete, modern, professional, and fully functional online grocery store web application built for **Alfaisal Grocery Store**. Designed with a fresh green and white brand aesthetic, full support for Pakistani Rupees (PKR), 8 rich grocery product categories, real-time cart and inventory stock reduction, secure order checkout, customer account history, and an administrative store management dashboard.

---

## 🌟 Key Features

### 1. Storefront & Catalog
- **Green & White Fresh Aesthetic**: Clean typography with Plus Jakarta Sans and Tailwind CSS.
- **8 Core Grocery Categories**:
  - Fruits and Vegetables
  - Milk, Eggs and Dairy
  - Bakery Items
  - Rice, Flour and Pulses
  - Snacks and Biscuits
  - Beverages and Juices
  - Cooking Oil and Spices
  - Household Cleaning Products
- **Pakistani Rupees (PKR) Currency**: Realistic pricing and units (`1 kg`, `1 Litre bottle`, `12 Eggs`, `5 kg bag`).
- **Live Search & Filter**: Search by keyword, filter by category, sort by price (Low to High, High to Low, Popular, A-Z), in-stock filtering.

### 2. Shopping Cart & Inventory
- Persistent cart (retains items across browser refreshes).
- Real-time stock status indicator (`In Stock`, `Low Stock: X left`, `Out of Stock`).
- Automatic price calculation (Subtotal, PKR 150 delivery fee or Free above PKR 2,000, voucher discounts).

### 3. Checkout & Ordering Workflow
- Real-time stock deduction: inventory drops automatically upon confirmed order placement!
- Customer details form with Pakistani phone validation (`03xx-xxxxxxx`) and major Pakistani cities (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, etc.).
- Payment options:
  - **Cash on Delivery (COD)**
  - **Online Payment** (JazzCash, EasyPaisa, Debit/Credit Card) with interactive simulator.
- Generates a unique order tracking ID (e.g. `AF-2026-8941`) and printable receipt invoice.

### 4. Customer Accounts & Order History
- Login and registration for customers.
- Quick 1-click test credentials provided.
- "My Orders" tab with status tracking timeline: `Pending` ➔ `Confirmed` ➔ `Processing` ➔ `Shipped` ➔ `Delivered`.

### 5. Admin Dashboard
- **Orders Management**: View all customer orders, filter by status, update order statuses, inspect line items and customer contact numbers.
- **Product Management (CRUD)**: Add new products with image upload/URL, edit pricing in PKR, change stock quantities, and remove obsolete items.
- **Sales Analytics**: Revenue metrics in PKR, total orders counter, out-of-stock alerts.
- **Database Schema Viewer**: Direct in-app preview and download of MySQL DDL & DML scripts.

---

## 📁 Project Architecture & Files

```
├── /database
│   └── Alfaisal_Grocery_Database.sql   # Complete MySQL schema (tables, foreign keys, triggers, seed data)
├── /backend
│   ├── src/main/java/com/alfaisal/grocery/
│   │   └── AlfaisalGroceryApplication.java # Spring Boot 3 Application entry point
│   └── src/main/resources/
│       └── application.properties       # Spring Boot & MySQL configuration
├── /src
│   ├── assets/images/                  # High-resolution generated photography
│   ├── components/                     # Modular React UI components
│   │   ├── Navbar.tsx                  # 3-Zone navigation with cart count & admin switch
│   │   ├── HeroSection.tsx             # Promotional campaign banner & quick search
│   │   ├── ProductCard.tsx             # Anti-slop product card with PKR pricing & stepper
│   │   ├── CartDrawer.tsx              # Slide-over shopping cart with promo codes
│   │   ├── CheckoutView.tsx            # Order placement, city picker & payment options
│   │   ├── OrderConfirmationModal.tsx  # Printable invoice & tracking timeline
│   │   ├── AdminDashboard.tsx          # Inventory CRUD, status updates & analytics
│   │   ├── CustomerProfileView.tsx     # Order history & saved addresses
│   │   ├── AuthModal.tsx               # Customer & Admin login/register
│   │   ├── AboutView.tsx               # Store story & quality promise
│   │   └── ContactView.tsx             # Branches, phone hotline & contact form
│   ├── dataStore.ts                    # Persistent reactive data store & stock reduction
│   ├── types.ts                        # TypeScript data contracts
│   ├── App.tsx                         # Main state machine & routing
│   └── main.tsx                        # Application mount
└── README.md                           # Setup and architecture documentation
```

---

## 🚀 Running the Project Locally

### Prerequisites
- **Node.js**: v18 or newer
- **Java JDK**: 17 or 21 (for Spring Boot backend)
- **MySQL**: 8.0 or newer

### 1. Database Setup (MySQL)
1. Open MySQL Workbench, phpMyAdmin, or your terminal:
   ```bash
   mysql -u root -p
   ```
2. Execute the included SQL file:
   ```sql
   source database/Alfaisal_Grocery_Database.sql;
   ```
   This creates `alfaisal_grocery_db`, all 6 tables (`users`, `categories`, `products`, `orders`, `order_items`, `payments`), sample products, and triggers.

### 2. Frontend Development Server (Live in AI Studio)
In this AI Studio environment, the frontend is already built, bundled with Vite, and runs directly on port 3000:
```bash
npm run dev
```

### 3. Demo Login Credentials
- **Store Administrator**:
  - Name: Muhammad Faisal (Store Owner & Manager)
  - Email: `muhammadfaisal@gmail.com`
  - Phone: `0344-7443291`
  - Password: `admin123`
- **Customer Account**:
  - Email: `customer@alfaisal.pk`
  - Password: `password123`
*(Or click the 1-click quick fill buttons on the Login modal)*
