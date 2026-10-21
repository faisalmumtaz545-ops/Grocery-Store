import { Category, Product, Order, User, CartItem, OrderStatus } from './types';

// Category Definitions matching all 8 prompt categories
export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-fruits-veg',
    name: 'Fruits and Vegetables',
    slug: 'fruits-vegetables',
    description: 'Crisp organic vegetables and seasonal sweet orchard fruits directly from Punjab farms.',
    image: '/src/assets/images/cat_fruits_vegetables_1792608012996.jpg',
    iconName: 'Apple',
    itemCount: 8,
  },
  {
    id: 'cat-dairy-eggs',
    name: 'Milk, Eggs and Dairy',
    slug: 'milk-eggs-dairy',
    description: 'Pure buffalo & cow milk, farm-fresh brown eggs, desi makhan, and fresh yogurt.',
    image: '/src/assets/images/cat_dairy_eggs_1792608013010.jpg',
    iconName: 'Milk',
    itemCount: 6,
  },
  {
    id: 'cat-bakery',
    name: 'Bakery Items',
    slug: 'bakery-items',
    description: 'Daily fresh oven-baked breads, flaky croissants, tea rusks, and wholesome buns.',
    image: '/src/assets/images/cat_bakery_fresh_1792608013672.jpg',
    iconName: 'Wheat',
    itemCount: 5,
  },
  {
    id: 'cat-rice-pulses',
    name: 'Rice, Flour and Pulses',
    slug: 'rice-flour-pulses',
    description: 'Aged Super Kernel Basmati rice, premium chakki whole wheat atta, and clean sorted daals.',
    image: '/src/assets/images/cat_pantry_staples_1792608014097.jpg',
    iconName: 'Package',
    itemCount: 7,
  },
  {
    id: 'cat-snacks',
    name: 'Snacks and Biscuits',
    slug: 'snacks-biscuits',
    description: 'Crunchy potato crisps, traditional bakery cookies, roasted nuts, and tea-time biscuits.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80',
    iconName: 'Cookie',
    itemCount: 5,
  },
  {
    id: 'cat-beverages',
    name: 'Beverages and Juices',
    slug: 'beverages-juices',
    description: 'Pure cold-pressed juices, premium Danedar black tea, mineral water, and refreshing syrups.',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=600&q=80',
    iconName: 'Coffee',
    itemCount: 6,
  },
  {
    id: 'cat-spices-oil',
    name: 'Cooking Oil and Spices',
    slug: 'cooking-oil-spices',
    description: 'Triple refined canola oil, pure mustard oil, ground red chilli, haldi, and whole spices.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    iconName: 'Flame',
    itemCount: 6,
  },
  {
    id: 'cat-cleaning',
    name: 'Household Cleaning Products',
    slug: 'household-cleaning',
    description: 'Antibacterial floor cleaners, dishwashing bars & liquids, laundry detergent, and sanitizers.',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    iconName: 'Sparkles',
    itemCount: 5,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Fruits & Vegetables
  {
    id: 'prod-101',
    name: 'Organic Farm Fresh Red Apples',
    categoryId: 'cat-fruits-veg',
    categoryName: 'Fruits and Vegetables',
    price: 280,
    originalPrice: 320,
    unit: '1 kg',
    stock: 45,
    isAvailable: true,
    image: '/src/assets/images/cat_fruits_vegetables_1792608012996.jpg',
    description: 'Crisp, naturally sweet Kashmiri and Swat orchard apples picked at peak ripeness.',
    badge: 'Seasonal Pick',
    rating: 4.8,
    reviewCount: 38,
    origin: 'Swat Valley, Pakistan',
  },
  {
    id: 'prod-102',
    name: 'Farm Fresh Sindhri Sweet Mangoes',
    categoryId: 'cat-fruits-veg',
    categoryName: 'Fruits and Vegetables',
    price: 360,
    originalPrice: 400,
    unit: '1 kg',
    stock: 60,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    description: 'Aromatic, golden Sindhri mangoes packed with rich honey-like sweetness.',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 72,
    origin: 'Mirpurkhas, Sindh',
  },
  {
    id: 'prod-103',
    name: 'Crisp Green Bell Peppers (Capsicum)',
    categoryId: 'cat-fruits-veg',
    categoryName: 'Fruits and Vegetables',
    price: 190,
    unit: '1 kg',
    stock: 32,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    description: 'Fresh crunchy green capsicum harvested daily from local Punjab tunnel farms.',
    rating: 4.6,
    reviewCount: 19,
    origin: 'Sheikhupura Farms',
  },
  {
    id: 'prod-104',
    name: 'Vine-Ripened Red Tomatoes',
    categoryId: 'cat-fruits-veg',
    categoryName: 'Fruits and Vegetables',
    price: 140,
    originalPrice: 170,
    unit: '1 kg',
    stock: 50,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    description: 'Firm, juicy red tomatoes ideal for traditional curries, salads, and gravies.',
    rating: 4.7,
    reviewCount: 44,
    origin: 'Pattoki, Punjab',
  },
  {
    id: 'prod-105',
    name: 'Fresh Desi Palak (Spinach)',
    categoryId: 'cat-fruits-veg',
    categoryName: 'Fruits and Vegetables',
    price: 90,
    unit: '1 kg (2 Bunches)',
    stock: 28,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    description: 'Tender dark green spinach leaves rich in iron and dietary fiber, thoroughly washed.',
    rating: 4.5,
    reviewCount: 26,
    origin: 'Kasur Organic Farms',
  },
  {
    id: 'prod-106',
    name: 'Red Onions (Desi Pyaaz)',
    categoryId: 'cat-fruits-veg',
    categoryName: 'Fruits and Vegetables',
    price: 150,
    unit: '2 kg Pack',
    stock: 75,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    description: 'Premium graded red onions with sharp aroma and tight papery skins.',
    rating: 4.8,
    reviewCount: 61,
    origin: 'Sindh Agriculture Fields',
  },

  // 2. Milk, Eggs & Dairy
  {
    id: 'prod-201',
    name: 'Pure Buffalo Farm Fresh Milk',
    categoryId: 'cat-dairy-eggs',
    categoryName: 'Milk, Eggs and Dairy',
    price: 240,
    unit: '1 Litre Glass Bottle',
    stock: 40,
    isAvailable: true,
    image: '/src/assets/images/cat_dairy_eggs_1792608013010.jpg',
    description: '100% pure, unadulterated high-fat buffalo milk straight from hygienic Sahiwal dairy farms.',
    badge: '100% Pure',
    rating: 4.9,
    reviewCount: 110,
    origin: 'Sahiwal Dairy Estate',
  },
  {
    id: 'prod-202',
    name: 'Organic Desi Brown Eggs',
    categoryId: 'cat-dairy-eggs',
    categoryName: 'Milk, Eggs and Dairy',
    price: 380,
    originalPrice: 420,
    unit: 'Pack of 12 Eggs',
    stock: 35,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
    description: 'Free-range, grain-fed hen brown eggs with vibrant golden-orange yolks.',
    badge: 'Free Range',
    rating: 4.9,
    reviewCount: 88,
    origin: 'Chakwal Poultry Farm',
  },
  {
    id: 'prod-203',
    name: 'Artisan Desi Makhan (Pure Butter)',
    categoryId: 'cat-dairy-eggs',
    categoryName: 'Milk, Eggs and Dairy',
    price: 640,
    unit: '500g Tub',
    stock: 22,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80',
    description: 'Naturally churned white cultured butter with traditional rustic taste and rich aroma.',
    rating: 4.7,
    reviewCount: 31,
    origin: 'Multan Dairy Co.',
  },
  {
    id: 'prod-204',
    name: 'Fresh Probiotic Plain Yogurt (Dahi)',
    categoryId: 'cat-dairy-eggs',
    categoryName: 'Milk, Eggs and Dairy',
    price: 220,
    unit: '1 kg Earthen Clay Matka',
    stock: 30,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=600&q=80',
    description: 'Thick, creamy set yogurt made with live cultures in traditional porous earthen pots.',
    rating: 4.8,
    reviewCount: 54,
    origin: 'Lahore Model Farm',
  },

  // 3. Bakery Items
  {
    id: 'prod-301',
    name: 'Artisanal Sourdough Country Loaf',
    categoryId: 'cat-bakery',
    categoryName: 'Bakery Items',
    price: 320,
    unit: '650g Loaf',
    stock: 18,
    isAvailable: true,
    image: '/src/assets/images/cat_bakery_fresh_1792608013672.jpg',
    description: 'Slow-fermented artisan sourdough with crackling crust and tender airy crumb.',
    badge: 'Baker Specialty',
    rating: 4.8,
    reviewCount: 41,
    origin: 'Alfaisal In-Store Bakery',
  },
  {
    id: 'prod-302',
    name: 'Fresh Whole Wheat Sandwich Bread',
    categoryId: 'cat-bakery',
    categoryName: 'Bakery Items',
    price: 180,
    unit: 'Large Family Loaf (800g)',
    stock: 50,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    description: '100% stone-ground whole wheat bread without chemical preservatives or artificial softeners.',
    rating: 4.6,
    reviewCount: 35,
    origin: 'Alfaisal In-Store Bakery',
  },
  {
    id: 'prod-303',
    name: 'Flaky Golden Butter Croissants',
    categoryId: 'cat-bakery',
    categoryName: 'Bakery Items',
    price: 440,
    originalPrice: 480,
    unit: 'Pack of 4 Croissants',
    stock: 15,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    description: 'Laminated with pure cream butter, baked daily at 6:00 AM for unmatched crispness.',
    badge: 'Fresh Daily',
    rating: 4.9,
    reviewCount: 63,
    origin: 'Alfaisal In-Store Bakery',
  },
  {
    id: 'prod-304',
    name: 'Soft Milk Burger Buns with Sesame',
    categoryId: 'cat-bakery',
    categoryName: 'Bakery Items',
    price: 160,
    unit: 'Pack of 6 Buns',
    stock: 40,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    description: 'Golden fluffy buns topped with roasted white sesame seeds.',
    rating: 4.5,
    reviewCount: 22,
    origin: 'Alfaisal In-Store Bakery',
  },

  // 4. Rice, Flour and Pulses
  {
    id: 'prod-401',
    name: 'Super Kernel Basmati Rice (Aged 2 Years)',
    categoryId: 'cat-rice-pulses',
    categoryName: 'Rice, Flour and Pulses',
    price: 1950,
    originalPrice: 2200,
    unit: '5 kg Eco Fabric Bag',
    stock: 35,
    isAvailable: true,
    image: '/src/assets/images/cat_pantry_staples_1792608014097.jpg',
    description: 'Extra-long grain aromatic Basmati grown in Gujranwala belt. Elongates twice its size when cooked.',
    badge: 'Premium Grade',
    rating: 4.9,
    reviewCount: 94,
    origin: 'Gujranwala Basin',
  },
  {
    id: 'prod-402',
    name: 'Stone-Ground Chakki Atta (Whole Wheat)',
    categoryId: 'cat-rice-pulses',
    categoryName: 'Rice, Flour and Pulses',
    price: 1480,
    unit: '10 kg Pack',
    stock: 45,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    description: 'Pure traditional slow-milled chakki flour with natural bran and germ intact for soft rotis.',
    rating: 4.8,
    reviewCount: 80,
    origin: 'Punjab Grain Reserve',
  },
  {
    id: 'prod-403',
    name: 'Polished Daal Chana (Bengal Gram)',
    categoryId: 'cat-rice-pulses',
    categoryName: 'Rice, Flour and Pulses',
    price: 290,
    unit: '1 kg Seal Pack',
    stock: 40,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    description: 'Double machine-cleaned yellow split gram lentils, rich in protein and earthy flavor.',
    rating: 4.7,
    reviewCount: 41,
    origin: 'Thal Desert Farms',
  },
  {
    id: 'prod-404',
    name: 'Red Lentils Daal Masoor',
    categoryId: 'cat-rice-pulses',
    categoryName: 'Rice, Flour and Pulses',
    price: 330,
    unit: '1 kg Seal Pack',
    stock: 30,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80',
    description: 'Quick-cooking red lentils, naturally dried and carefully sorted without stones or dust.',
    rating: 4.6,
    reviewCount: 29,
    origin: 'Kot Addu',
  },

  // 5. Snacks and Biscuits
  {
    id: 'prod-501',
    name: 'Hand-Cut Kettle Cooked Chilli Chips',
    categoryId: 'cat-snacks',
    categoryName: 'Snacks and Biscuits',
    price: 170,
    unit: '150g Pouch',
    stock: 55,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    description: 'Thick crunch potato crisps dusted with smoked red pepper and Himalayan rock salt.',
    badge: 'Crunchiest',
    rating: 4.7,
    reviewCount: 52,
    origin: 'Lahore, Pakistan',
  },
  {
    id: 'prod-502',
    name: 'Pistachio Almond Nan-Khatai Cookies',
    categoryId: 'cat-snacks',
    categoryName: 'Snacks and Biscuits',
    price: 420,
    originalPrice: 480,
    unit: '400g Tin Box',
    stock: 25,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    description: 'Traditional crumbly desi ghee biscuits infused with cardamom, roasted almonds, and pistachios.',
    badge: 'Lahori Heritage',
    rating: 4.9,
    reviewCount: 89,
    origin: 'Walled City Lahore Recipe',
  },
  {
    id: 'prod-503',
    name: 'Oven Roasted Salted Cashews & Almonds',
    categoryId: 'cat-snacks',
    categoryName: 'Snacks and Biscuits',
    price: 890,
    unit: '250g Jar',
    stock: 20,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1536591375315-1b8e4e9efd42?auto=format&fit=crop&w=600&q=80',
    description: 'Lightly roasted Gilgit almonds and whole cashews with a touch of sea salt.',
    rating: 4.8,
    reviewCount: 37,
    origin: 'Gilgit-Baltistan',
  },

  // 6. Beverages and Juices
  {
    id: 'prod-601',
    name: 'Cold-Pressed Pomegranate Juice',
    categoryId: 'cat-beverages',
    categoryName: 'Beverages and Juices',
    price: 450,
    originalPrice: 500,
    unit: '1 Litre Chilled Bottle',
    stock: 25,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
    description: '100% raw ruby pomegranate juice without added sugar, water, or artificial coloring.',
    badge: 'No Added Sugar',
    rating: 4.8,
    reviewCount: 46,
    origin: 'Kandahar Sourced',
  },
  {
    id: 'prod-602',
    name: 'Danedar Premium Black Tea Leaves',
    categoryId: 'cat-beverages',
    categoryName: 'Beverages and Juices',
    price: 790,
    unit: '450g Seal Tin',
    stock: 45,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    description: 'Aromatic granular blend of Kenyan and Assam tea leaves for a rich, golden Karak chai.',
    badge: 'Karak Chai',
    rating: 4.9,
    reviewCount: 130,
    origin: 'Highland Blends',
  },
  {
    id: 'prod-603',
    name: 'Natural Spring Mineral Water',
    categoryId: 'cat-beverages',
    categoryName: 'Beverages and Juices',
    price: 320,
    unit: 'Pack of 6 (1.5L Bottles)',
    stock: 60,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
    description: 'Naturally filtered spring water bottled with balanced mineral electrolytes.',
    rating: 4.7,
    reviewCount: 50,
    origin: 'Himalayan Foothills',
  },

  // 7. Cooking Oil and Spices
  {
    id: 'prod-701',
    name: 'Pure Triple Refined Canola Cooking Oil',
    categoryId: 'cat-spices-oil',
    categoryName: 'Cooking Oil and Spices',
    price: 2650,
    originalPrice: 2850,
    unit: '5 Litre Easy-Pour Jerry Can',
    stock: 25,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    description: 'Naturally cholesterol-free, enriched with Vitamins A & D, low absorb formula for healthy meals.',
    badge: 'Heart Healthy',
    rating: 4.9,
    reviewCount: 78,
    origin: 'Port Qasim Refined',
  },
  {
    id: 'prod-702',
    name: 'Natural Pink Himalayan Rock Salt',
    categoryId: 'cat-spices-oil',
    categoryName: 'Cooking Oil and Spices',
    price: 180,
    unit: '1 kg Standup Pouch',
    stock: 80,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    description: 'Unrefined, mineral-packed coarse pink salt mined directly from ancient Khewra mines.',
    badge: '100% Mineral',
    rating: 4.9,
    reviewCount: 65,
    origin: 'Khewra Salt Range',
  },
  {
    id: 'prod-703',
    name: 'Whole Cumin Seeds (Sabut Zeera)',
    categoryId: 'cat-spices-oil',
    categoryName: 'Cooking Oil and Spices',
    price: 340,
    unit: '200g Jar',
    stock: 35,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    description: 'Sun-dried intense cumin seeds with fragrant essential oils, cleaned and stone-free.',
    rating: 4.8,
    reviewCount: 38,
    origin: 'Balochistan Agriculture',
  },

  // 8. Household Cleaning Products
  {
    id: 'prod-801',
    name: 'Concentrated Citrus Dishwashing Gel',
    categoryId: 'cat-cleaning',
    categoryName: 'Household Cleaning Products',
    price: 380,
    originalPrice: 420,
    unit: '1 Litre Pump Bottle',
    stock: 40,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    description: 'Active lemon grease-cutting enzyme formula leaves stainless steel and glassware sparkling clean.',
    badge: 'Grease Buster',
    rating: 4.7,
    reviewCount: 49,
    origin: 'Alfaisal Essentials',
  },
  {
    id: 'prod-802',
    name: 'Antibacterial Surface & Floor Cleaner',
    categoryId: 'cat-cleaning',
    categoryName: 'Household Cleaning Products',
    price: 490,
    unit: '1.5 Litre Floral Scent',
    stock: 35,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80',
    description: 'Kills 99.9% of bacteria and germs, streak-free shine for tiles, marble, and wooden flooring.',
    rating: 4.8,
    reviewCount: 42,
    origin: 'Alfaisal Essentials',
  },
  {
    id: 'prod-803',
    name: 'Advanced Laundry Liquid Detergent',
    categoryId: 'cat-cleaning',
    categoryName: 'Household Cleaning Products',
    price: 890,
    originalPrice: 980,
    unit: '2 Litre Bottle',
    stock: 28,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?auto=format&fit=crop&w=600&q=80',
    description: 'Color-protecting optical brighteners with delicate fresh blossom aroma for both top & front load.',
    rating: 4.8,
    reviewCount: 57,
    origin: 'Alfaisal Essentials',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'AF-2026-8941',
    customerId: 'user-cust-1',
    customerName: 'Ayesha Khan',
    customerEmail: 'ayesha.khan@example.com',
    customerPhone: '0300-4567891',
    deliveryAddress: 'House 42-B, Sector G-11/2',
    city: 'Islamabad',
    deliveryNotes: 'Please ring the doorbell twice',
    items: [
      {
        productId: 'prod-101',
        productName: 'Organic Farm Fresh Red Apples',
        price: 280,
        quantity: 2,
        unit: '1 kg',
        image: '/src/assets/images/cat_fruits_vegetables_1792608012996.jpg',
        total: 560,
      },
      {
        productId: 'prod-201',
        productName: 'Pure Buffalo Farm Fresh Milk',
        price: 240,
        quantity: 3,
        unit: '1 Litre Glass Bottle',
        image: '/src/assets/images/cat_dairy_eggs_1792608013010.jpg',
        total: 720,
      },
      {
        productId: 'prod-401',
        productName: 'Super Kernel Basmati Rice (Aged 2 Years)',
        price: 1950,
        quantity: 1,
        unit: '5 kg Eco Fabric Bag',
        image: '/src/assets/images/cat_pantry_staples_1792608014097.jpg',
        total: 1950,
      },
    ],
    subtotal: 3230,
    deliveryFee: 0,
    discount: 0,
    total: 3230,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending Cash on Delivery',
    orderStatus: 'Processing',
    createdAt: '2026-10-20T14:32:00Z',
    updatedAt: '2026-10-20T15:10:00Z',
  },
  {
    id: 'ord-1002',
    orderNumber: 'AF-2026-8942',
    customerId: 'user-cust-2',
    customerName: 'Tariq Mehmood',
    customerEmail: 'tariq.m@example.com',
    customerPhone: '0321-9876543',
    deliveryAddress: 'Flat 304, Gulberg Heights, Main Boulevard',
    city: 'Lahore',
    deliveryNotes: 'Leave with building reception',
    items: [
      {
        productId: 'prod-301',
        productName: 'Artisanal Sourdough Country Loaf',
        price: 320,
        quantity: 1,
        unit: '650g Loaf',
        image: '/src/assets/images/cat_bakery_fresh_1792608013672.jpg',
        total: 320,
      },
      {
        productId: 'prod-701',
        productName: 'Pure Triple Refined Canola Cooking Oil',
        price: 2650,
        quantity: 1,
        unit: '5 Litre Easy-Pour Jerry Can',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
        total: 2650,
      },
    ],
    subtotal: 2970,
    deliveryFee: 0,
    discount: 297,
    total: 2673,
    paymentMethod: 'JazzCash',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    createdAt: '2026-10-21T09:15:00Z',
    updatedAt: '2026-10-21T10:45:00Z',
  },
  {
    id: 'ord-1003',
    orderNumber: 'AF-2026-8943',
    customerId: 'user-cust-3',
    customerName: 'Zainab Bilal',
    customerEmail: 'zainab.b@example.com',
    customerPhone: '0333-1122334',
    deliveryAddress: 'B-18 DHA Phase 5',
    city: 'Karachi',
    deliveryNotes: 'Call before arriving',
    items: [
      {
        productId: 'prod-801',
        productName: 'Concentrated Citrus Dishwashing Gel',
        price: 380,
        quantity: 2,
        unit: '1 Litre Pump Bottle',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
        total: 760,
      },
    ],
    subtotal: 760,
    deliveryFee: 150,
    discount: 0,
    total: 910,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending Cash on Delivery',
    orderStatus: 'Delivered',
    createdAt: '2026-10-19T11:20:00Z',
    updatedAt: '2026-10-19T16:00:00Z',
  },
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin-1',
    name: 'Muhammad Faisal (Store Owner & Manager)',
    email: 'muhammadfaisal@gmail.com',
    phone: '0344-7443291',
    address: 'Alfaisal Main Hub, Ferozepur Road',
    city: 'Lahore',
    role: 'admin',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'user-cust-1',
    name: 'Ayesha Khan',
    email: 'customer@alfaisal.pk',
    phone: '0300-4567891',
    address: 'House 42-B, Sector G-11/2',
    city: 'Islamabad',
    role: 'customer',
    createdAt: '2026-02-15T00:00:00Z',
  },
];

// LocalStorage Persistence Keys
const PRODUCTS_KEY = 'alfaisal_grocery_products_v3';
const CATEGORIES_KEY = 'alfaisal_grocery_categories_v3';
const ORDERS_KEY = 'alfaisal_grocery_orders_v3';
const USERS_KEY = 'alfaisal_grocery_users_v3';
const CART_KEY = 'alfaisal_grocery_cart_v3';
const CURRENT_USER_KEY = 'alfaisal_grocery_active_user_v3';

export class GroceryDataStore {
  // Products
  static getProducts(): Product[] {
    try {
      const stored = localStorage.getItem(PRODUCTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    this.saveProducts(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  }

  static saveProducts(products: Product[]): void {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }

  static getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  }

  static addProduct(product: Omit<Product, 'id'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
    };
    products.unshift(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  static updateProduct(updated: Product): void {
    const products = this.getProducts().map((p) => (p.id === updated.id ? updated : p));
    this.saveProducts(products);
  }

  static deleteProduct(id: string): void {
    const products = this.getProducts().filter((p) => p.id !== id);
    this.saveProducts(products);
  }

  // Categories
  static getCategories(): Category[] {
    try {
      const stored = localStorage.getItem(CATEGORIES_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    this.saveCategories(INITIAL_CATEGORIES);
    return INITIAL_CATEGORIES;
  }

  static saveCategories(categories: Category[]): void {
    try {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    } catch {
      // ignore
    }
  }

  // Cart
  static getCart(): CartItem[] {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  }

  static saveCart(cart: CartItem[]): void {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }

  // Orders
  static getOrders(): Order[] {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    this.saveOrders(INITIAL_ORDERS);
    return INITIAL_ORDERS;
  }

  static saveOrders(orders: Order[]): void {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }

  static createOrder(
    orderInput: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>
  ): { success: boolean; order?: Order; error?: string } {
    const products = this.getProducts();

    // Verify stock availability and decrement
    for (const item of orderInput.items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return { success: false, error: `Product "${item.productName}" is no longer in stock.` };
      }
      if (product.stock < item.quantity) {
        return {
          success: false,
          error: `Insufficient stock for "${product.name}". Only ${product.stock} ${product.unit} remaining.`,
        };
      }
    }

    // Atomically decrement stock
    const updatedProducts = products.map((p) => {
      const orderedItem = orderInput.items.find((i) => i.productId === p.id);
      if (orderedItem) {
        const newStock = Math.max(0, p.stock - orderedItem.quantity);
        return {
          ...p,
          stock: newStock,
          isAvailable: newStock > 0,
        };
      }
      return p;
    });
    this.saveProducts(updatedProducts);

    // Create unique Order ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderInput,
      id: `ord-${Date.now()}`,
      orderNumber: `AF-2026-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const orders = this.getOrders();
    orders.unshift(newOrder);
    this.saveOrders(orders);

    // Clear cart upon successful order
    this.saveCart([]);

    return { success: true, order: newOrder };
  }

  static updateOrderStatus(orderId: string, newStatus: OrderStatus): void {
    const orders = this.getOrders().map((o) =>
      o.id === orderId
        ? {
            ...o,
            orderStatus: newStatus,
            updatedAt: new Date().toISOString(),
          }
        : o
    );
    this.saveOrders(orders);
  }

  // Users & Auth
  static getUsers(): User[] {
    try {
      const stored = localStorage.getItem(USERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    this.saveUsers(INITIAL_USERS);
    return INITIAL_USERS;
  }

  static saveUsers(users: User[]): void {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch {
      // ignore
    }
  }

  static getActiveUser(): User | null {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return null;
  }

  static setActiveUser(user: User | null): void {
    try {
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch {
      // ignore
    }
  }

  // Reset to seed data
  static resetToDefaults(): void {
    this.saveProducts(INITIAL_PRODUCTS);
    this.saveCategories(INITIAL_CATEGORIES);
    this.saveOrders(INITIAL_ORDERS);
    this.saveUsers(INITIAL_USERS);
    this.saveCart([]);
  }
}
