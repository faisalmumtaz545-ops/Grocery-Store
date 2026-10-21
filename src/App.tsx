import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Category,
  Product,
  CartItem,
  User,
  Order,
  OrderStatus,
  PaymentMethod,
} from './types';
import { GroceryDataStore } from './dataStore';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryStrip } from './components/CategoryStrip';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CustomerProfileView } from './components/CustomerProfileView';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { Search, ArrowUpDown, X, ArrowRight, ShoppingBag, Check } from 'lucide-react';

export default function App() {
  // Global Data States
  const [products, setProducts] = useState<Product[]>(() => GroceryDataStore.getProducts());
  const [categories, setCategories] = useState<Category[]>(() => GroceryDataStore.getCategories());
  const [orders, setOrders] = useState<Order[]>(() => GroceryDataStore.getOrders());
  const [users, setUsers] = useState<User[]>(() => GroceryDataStore.getUsers());
  const [currentUser, setCurrentUser] = useState<User | null>(() => GroceryDataStore.getActiveUser());
  const [cart, setCart] = useState<CartItem[]>(() => GroceryDataStore.getCart());

  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Search & Filter States for Shop/Products
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Toast Notification for Add to Cart
  const [cartToast, setCartToast] = useState<{
    visible: boolean;
    productName: string;
    quantity: number;
    image: string;
  } | null>(null);

  // Checkout discount data passed from Cart drawer
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);
  const [checkoutDiscountCode, setCheckoutDiscountCode] = useState<string>('');

  // Sync cart to storage
  useEffect(() => {
    GroceryDataStore.saveCart(cart);
  }, [cart]);

  // Sync active user to storage
  useEffect(() => {
    GroceryDataStore.setActiveUser(currentUser);
  }, [currentUser]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(product.stock, quantity) }];
    });

    // Trigger visual toast
    setCartToast({
      visible: true,
      productName: product.name,
      quantity,
      image: product.image,
    });
    setTimeout(() => {
      setCartToast((prev) => (prev ? { ...prev, visible: false } : null));
    }, 2800);
  };

  const handleUpdateCartQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    const product = products.find((p) => p.id === productId);
    const maxStock = product ? product.stock : 99;

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(maxStock, newQty) }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Checkout transitions
  const handleProceedToCheckout = (discountAmount: number, code: string) => {
    setCheckoutDiscount(discountAmount);
    setCheckoutDiscountCode(code);
    setCurrentTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Order Placement
  const handleCreateOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: string;
    city: string;
    deliveryNotes: string;
    items: {
      productId: string;
      productName: string;
      price: number;
      quantity: number;
      unit: string;
      image: string;
      total: number;
    }[];
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
    paymentMethod: PaymentMethod;
    paymentStatus: 'Paid' | 'Pending Cash on Delivery';
    orderStatus: 'Pending';
  }) => {
    const result = GroceryDataStore.createOrder({
      ...orderData,
      customerId: currentUser?.id,
    });

    if (result.success && result.order) {
      setProducts(GroceryDataStore.getProducts());
      setOrders(GroceryDataStore.getOrders());
      setCart([]);
      return result;
    }

    return result;
  };

  const handleOrderSuccess = (order: Order) => {
    setConfirmedOrder(order);
    setCurrentTab('home');
  };

  // Re-order past order items
  const handleReorder = (pastOrder: Order) => {
    pastOrder.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      if (prod && prod.stock > 0) {
        handleAddToCart(prod, item.quantity);
      }
    });
    setIsCartOpen(true);
  };

  // Admin handlers
  const handleAddProduct = (newProd: Omit<Product, 'id'>) => {
    GroceryDataStore.addProduct(newProd);
    setProducts(GroceryDataStore.getProducts());
  };

  const handleUpdateProduct = (updated: Product) => {
    GroceryDataStore.updateProduct(updated);
    setProducts(GroceryDataStore.getProducts());
  };

  const handleDeleteProduct = (id: string) => {
    GroceryDataStore.deleteProduct(id);
    setProducts(GroceryDataStore.getProducts());
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    GroceryDataStore.updateOrderStatus(orderId, newStatus);
    setOrders(GroceryDataStore.getOrders());
  };

  const handleResetData = () => {
    GroceryDataStore.resetToDefaults();
    setProducts(GroceryDataStore.getProducts());
    setCategories(GroceryDataStore.getCategories());
    setOrders(GroceryDataStore.getOrders());
    setUsers(GroceryDataStore.getUsers());
    setCart([]);
  };

  // Auth handlers
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleRegisterUser = (newUser: Omit<User, 'id' | 'createdAt'>): User => {
    const user: User = {
      ...newUser,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updatedUsers = [...users, user];
    GroceryDataStore.saveUsers(updatedUsers);
    setUsers(updatedUsers);
    return user;
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          (p.origin && p.origin.toLowerCase().includes(query))
      );
    }

    if (selectedCategoryId !== 'all') {
      result = result.filter((p) => p.categoryId === selectedCategoryId);
    }

    if (onlyInStock) {
      result = result.filter((p) => p.isAvailable && p.stock > 0);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, searchQuery, selectedCategoryId, onlyInStock, sortBy]);

  const featuredItems = useMemo(() => {
    return products.slice(0, 8);
  }, [products]);

  return (
    <div className="min-h-screen bg-[#fafbf9] text-slate-800 flex flex-col font-sans">
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartItems={cart}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* Added to Cart Floating Toast */}
      <AnimatePresence>
        {cartToast && cartToast.visible && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed top-24 right-4 sm:right-8 z-50 bg-slate-900 text-white p-3 sm:p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 max-w-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800 overflow-hidden shrink-0 border border-slate-700">
              <img
                src={cartToast.image}
                alt={cartToast.productName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>Added to Basket</span>
              </div>
              <p className="text-xs text-slate-200 font-medium truncate mt-0.5">
                {cartToast.quantity}x {cartToast.productName}
              </p>
            </div>
            <button
              onClick={() => {
                setCartToast(null);
                setIsCartOpen(true);
              }}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
            >
              View Cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main View Router with Animated Switch */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {/* VIEW: HOME */}
          {currentTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Hero Section */}
              <HeroSection
                onExplore={() => {
                  setCurrentTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                searchQuery={searchQuery}
                onSearchChange={(q) => setSearchQuery(q)}
                onSelectCategory={(catId) => {
                  setSelectedCategoryId(catId);
                  setCurrentTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 8 Grocery Categories Strip */}
              <CategoryStrip
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={(catId) => {
                  setSelectedCategoryId(catId);
                  setCurrentTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* Featured Fresh Weekly Specials */}
              <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                      Curated Selections
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
                      Featured Fresh Groceries & Staples
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Direct from certified growers and producers across Pakistan. Prices in Pakistani Rupees (PKR).
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategoryId('all');
                      setCurrentTab('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                  >
                    <span>Explore Complete Catalog ({products.length} items)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredItems.map((product, idx) => {
                    const inCartItem = cart.find((i) => i.product.id === product.id);
                    return (
                      <ProductCard
                        key={product.id}
                        index={idx}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onQuickView={(p) => setSelectedProduct(p)}
                        cartQuantity={inCartItem?.quantity || 0}
                      />
                    );
                  })}
                </div>
              </section>

              {/* Quality Commitment Story Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-emerald-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden"
                >
                  <div className="max-w-2xl space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      The Alfaisal Quality Promise
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
                      Uncompromised Quality, Pure Food & Transparent Pricing
                    </h2>
                    <p className="text-sm text-emerald-100 leading-relaxed">
                      We believe everyday Pakistani families deserve farm-pure milk with zero adulteration, seasonal fruits without chemical ripening, and stone-ground wheat flour milled fresh weekly.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          setCurrentTab('products');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-3 bg-white text-emerald-950 font-bold text-xs rounded-xl hover:bg-emerald-50 transition-colors cursor-pointer"
                      >
                        Shop All Groceries Now
                      </motion.button>
                      <button
                        onClick={() => {
                          setCurrentTab('about');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-3 bg-emerald-800 text-white font-semibold text-xs rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer"
                      >
                        Read Our Farm Story
                      </button>
                    </div>
                  </div>
                </motion.div>
              </section>
            </motion.div>
          )}

          {/* VIEW: PRODUCTS / CATALOG */}
          {currentTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6"
            >
              {/* Header & Breadcrumb */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Grocery Catalog
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Browse fresh fruits, dairy, bakery items, lentils, oils and cleaning products in Pakistani Rupees.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {(selectedCategoryId !== 'all' || searchQuery || onlyInStock) && (
                    <button
                      onClick={() => {
                        setSelectedCategoryId('all');
                        setSearchQuery('');
                        setOnlyInStock(false);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Clear Filters</span>
                    </button>
                  )}
                  <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                    {filteredProducts.length} Products Found
                  </span>
                </div>
              </div>

              {/* Interactive Filter & Sort Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Search in Catalog */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search by product name, category, or origin..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Sort & In-Stock Controls */}
                  <div className="flex items-center gap-3">
                    {/* In-Stock Toggle */}
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={onlyInStock}
                        onChange={(e) => setOnlyInStock(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>In-Stock Only</span>
                    </label>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-hidden focus:border-emerald-600 cursor-pointer"
                      >
                        <option value="featured">Featured / Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="name">Product Alphabetical</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Horizontal Category Segmented Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedCategoryId('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                      selectedCategoryId === 'all'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    All Aisle Categories ({products.length})
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategoryId(c.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                        selectedCategoryId === c.id
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Cards Grid with Layout Animations */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                    <Search className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">No matching products found</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                      We could not find anything matching "{searchQuery}". Try searching for staples like "atta", "milk", "oil", or clear your filter.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategoryId('all');
                      setOnlyInStock(false);
                    }}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Reset Catalog Filters
                  </button>
                </div>
              ) : (
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product, idx) => {
                    const inCartItem = cart.find((i) => i.product.id === product.id);
                    return (
                      <ProductCard
                        key={product.id}
                        index={idx}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onQuickView={(p) => setSelectedProduct(p)}
                        cartQuantity={inCartItem?.quantity || 0}
                      />
                    );
                  })}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* VIEW: CATEGORIES */}
          {currentTab === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
            >
              <div className="max-w-2xl">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  All Grocery Categories & Aisles
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Explore our organized store sections. Select any department to view available inventory.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat, idx) => {
                  const count = products.filter((p) => p.categoryId === cat.id).length;

                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
                    >
                      <div className="h-44 bg-slate-100 overflow-hidden relative">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover hover:scale-106 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-4 text-white">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                            {count} Products in Aisle
                          </span>
                          <h3 className="text-base font-bold">{cat.name}</h3>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {cat.description}
                        </p>

                        <button
                          onClick={() => {
                            setSelectedCategoryId(cat.id);
                            setCurrentTab('products');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full py-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white text-xs font-bold rounded-xl border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Browse Aisle</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* VIEW: CHECKOUT */}
          {currentTab === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <CheckoutView
                cartItems={cart}
                currentUser={currentUser}
                discount={checkoutDiscount}
                discountCode={checkoutDiscountCode}
                onBackToShop={() => {
                  setCurrentTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOrderSuccess={handleOrderSuccess}
                createOrderHandler={handleCreateOrder}
              />
            </motion.div>
          )}

          {/* VIEW: CUSTOMER ACCOUNT / ORDERS */}
          {currentTab === 'account' && (
            <motion.div
              key="account"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {currentUser ? (
                <CustomerProfileView
                  user={currentUser}
                  orders={orders}
                  onReorder={handleReorder}
                  onExplore={() => {
                    setCurrentTab('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ) : (
                <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
                  <h2 className="text-lg font-bold text-slate-900">Sign In to View Your Account</h2>
                  <p className="text-xs text-slate-500">
                    Log in to check live order statuses, tracking updates, and past invoices.
                  </p>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Sign In or Register
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* VIEW: ADMIN DASHBOARD */}
          {currentTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AdminDashboard
                products={products}
                categories={categories}
                orders={orders}
                users={users}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onResetData={handleResetData}
              />
            </motion.div>
          )}

          {/* VIEW: ABOUT */}
          {currentTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AboutView />
            </motion.div>
          )}

          {/* VIEW: CONTACT */}
          {currentTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ContactView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Global Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(catId) => {
          setSelectedCategoryId(catId);
          setCurrentTab('products');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 4. Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        onContinueShopping={() => {
          setCurrentTab('products');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 5. Product Quick View / Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        cartQuantity={
          selectedProduct
            ? cart.find((i) => i.product.id === selectedProduct.id)?.quantity || 0
            : 0
        }
      />

      {/* 6. Order Confirmation Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onViewOrders={() => {
          setConfirmedOrder(null);
          setCurrentTab('account');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onContinueShopping={() => {
          setConfirmedOrder(null);
          setCurrentTab('products');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 7. Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        allUsers={users}
        onRegisterUser={handleRegisterUser}
      />
    </div>
  );
}
