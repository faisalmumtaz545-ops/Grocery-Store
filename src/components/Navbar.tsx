import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, User as UserIcon, Shield, Search, Menu, X, Leaf, LogOut } from 'lucide-react';
import { User, CartItem } from '../types';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  cartItems,
  onOpenCart,
  currentUser,
  onOpenAuth,
  onLogout,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'categories', label: 'Categories' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-emerald-900 text-emerald-50 text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        <span>Free Express Delivery across Lahore, Karachi & Islamabad on orders above PKR 2,000 · Fresh Farm Promise</span>
      </div>

      {/* Main Top Bar adhering to Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-18">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0 focus:outline-hidden"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-700 transition-colors"
            >
              <Leaf className="w-5 h-5 text-emerald-100" />
            </motion.div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-emerald-950 flex items-center gap-1">
                Alfaisal <span className="text-emerald-600 font-semibold text-lg">Grocery</span>
              </div>
              <p className="text-[10px] text-emerald-700 font-medium tracking-wider uppercase">Pure & Fresh Everyday</p>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`whitespace-nowrap cursor-pointer transition-colors pb-1 relative ${
                  currentTab === link.id
                    ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                    : 'hover:text-emerald-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Inline Quick Search on larger screens */}
            <div className="hidden lg:flex items-center relative w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search fruits, atta, milk..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentTab !== 'products') onNavigate('products');
                }}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
              />
            </div>

            {/* Mobile Search Button toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="lg:hidden p-2 text-slate-600 hover:text-emerald-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Admin Portal Quick Switch */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                currentTab === 'admin'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
              title="Open Store Owner Admin Panel"
            >
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Admin Panel</span>
            </motion.button>

            {/* Customer Account / Login */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('account')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg cursor-pointer transition-colors ${
                    currentTab === 'account'
                      ? 'bg-slate-200 text-slate-900'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  title="My Account"
                >
                  <UserIcon className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline max-w-[90px] truncate">{currentUser.name}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-emerald-800 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Sign In</span>
              </motion.button>
            )}

            {/* Shopping Cart Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-colors cursor-pointer"
              title="Open Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                <AnimatePresence>
                  {totalCartCount > 0 && (
                    <motion.span
                      key={totalCartCount}
                      initial={{ scale: 0.4, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute -top-2 -right-2 bg-amber-400 text-emerald-950 font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs"
                    >
                      {totalCartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="hidden md:inline tabular-nums">
                {totalCartCount > 0 ? `PKR ${cartSubtotal.toLocaleString()}` : 'Cart'}
              </span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-emerald-800 rounded-lg focus:outline-hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Drawer */}
        <AnimatePresence>
          {showSearchInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden pb-3 pt-1 overflow-hidden"
            >
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search fresh groceries, pulses, dairy..."
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    if (currentTab !== 'products') onNavigate('products');
                  }}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600 text-slate-800 placeholder-slate-400"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Dropdown Nav Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden py-3 border-t border-slate-100 space-y-1 overflow-hidden"
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                    currentTab === link.id
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate('admin');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 rounded-md"
              >
                Admin Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
