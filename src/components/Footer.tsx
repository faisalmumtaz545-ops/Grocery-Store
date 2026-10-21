import React from 'react';
import { Leaf, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onSelectCategory: (catId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Leaf className="w-4 h-4 text-emerald-100" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Alfaisal <span className="text-emerald-500 font-semibold">Grocery</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Pakistan's trusted daily grocery destination. We deliver 100% pure dairy, farm-fresh Swat apples, organic Sindh vegetables, chakki flours, and household essentials straight to your home in 2 hours.
            </p>
            <div className="pt-2 flex items-center gap-3 text-slate-300">
              <span className="text-[11px] font-semibold text-emerald-400">Accepted Payments:</span>
              <span className="text-[11px]">Cash on Delivery · JazzCash · EasyPaisa · Cards</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">Explore Store</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Aisles & Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  About Us & Farm Sourcing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Customer Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors cursor-pointer">
                  Store Owner Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Grocery Aisles */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">Popular Aisles</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectCategory('cat-fruits-veg')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Fruits & Vegetables
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cat-dairy-eggs')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Milk, Eggs & Dairy
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cat-bakery')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Fresh Oven Bakery
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cat-rice-pulses')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Basmati Rice & Atta
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cat-spices-oil')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Cooking Oil & Spices
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">Contact & Hours</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono text-slate-300">0344-7443291</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-300">muhammadfaisal@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Gulberg III, Lahore, Pakistan</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Open Daily: 8:00 AM – 11:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} Alfaisal Grocery Store. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Prices listed in Pakistani Rupees (PKR)</span>
            <span aria-hidden="true">·</span>
            <span>Halal Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
