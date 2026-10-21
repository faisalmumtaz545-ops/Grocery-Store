import React from 'react';
import { motion } from 'motion/react';
import { Search, Truck, ShieldCheck, Clock, Award, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCategory: (catId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  searchQuery,
  onSearchChange,
  onSelectCategory,
}) => {
  const quickSearchTags = [
    { label: 'Farm Milk', query: 'milk' },
    { label: 'Basmati Rice', query: 'rice' },
    { label: 'Sindhri Mangoes', query: 'mango' },
    { label: 'Canola Oil', query: 'oil' },
    { label: 'Fresh Apples', query: 'apple' },
  ];

  return (
    <div className="relative bg-emerald-950 text-white overflow-hidden">
      {/* Background Decorative subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.18),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Editorial Headline & Value Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              <span>Authentic Pakistani Harvest</span>
              <span aria-hidden="true">·</span>
              <span>Direct From Local Farms</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              Fresh, Pure Groceries for Your Family at Fair Market Prices
            </h1>

            <p className="text-base text-emerald-100/90 leading-relaxed max-w-xl">
              Experience hand-graded Swat apples, pure Sahiwal buffalo milk, aged Super Kernel Basmati,
              and daily essentials delivered straight to your doorstep with guaranteed freshness.
            </p>

            {/* Interactive Search Bar in Hero */}
            <div className="bg-white p-2 rounded-2xl shadow-xl flex items-center gap-2 max-w-xl">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5" />
                <input
                  type="text"
                  placeholder="What grocery item do you need today?"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onExplore();
                  }}
                  className="w-full pl-11 pr-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={onExplore}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Quick Filter Tag Links */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-200">
              <span className="text-emerald-400 font-medium">Trending:</span>
              {quickSearchTags.map((tag) => (
                <button
                  key={tag.label}
                  onClick={() => {
                    onSearchChange(tag.query);
                    onExplore();
                  }}
                  className="px-2.5 py-1 rounded-md bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 border border-emerald-800/80 transition-colors cursor-pointer"
                >
                  {tag.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                <span>Explore Complete Store</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <button
                onClick={() => onSelectCategory('cat-fruits-veg')}
                className="text-xs text-emerald-200 hover:text-white underline underline-offset-4 cursor-pointer font-medium"
              >
                Browse Seasonal Harvest &rarr;
              </button>
            </div>
          </motion.div>

          {/* Right Column: High-Fidelity Hero Image with gentle float */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex items-center"
          >
            <div className="relative w-full h-80 sm:h-96 lg:h-full min-h-[340px] rounded-2xl overflow-hidden shadow-2xl border border-emerald-800/50 bg-emerald-900 group">
              <img
                src="/src/assets/images/hero_grocery_fresh_1792608011504.jpg"
                alt="Fresh farm produce, crisp greens and pure dairy at Alfaisal Grocery Store"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent pointer-events-none" />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl text-slate-800 shadow-lg flex items-center justify-between"
              >
                <div>
                  <p className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">Morning Harvest</p>
                  <p className="text-sm font-bold text-slate-900">100% Organically Sourced</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Express Delivery</span>
                  <span className="text-xs font-bold text-emerald-700">Within 120 Mins</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4-Column Proof & Service Strip */}
      <div className="border-t border-emerald-900/60 bg-emerald-950/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-emerald-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-800/80 flex items-center justify-center text-emerald-300 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">100% Halal & Hygienic</h4>
                <p className="text-[11px] text-emerald-300">Certified origin & quality checked</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-800/80 flex items-center justify-center text-emerald-300 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Free Home Delivery</h4>
                <p className="text-[11px] text-emerald-300">On all orders above PKR 2,000</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-800/80 flex items-center justify-center text-emerald-300 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">2-Hour Express Delivery</h4>
                <p className="text-[11px] text-emerald-300">Lahore, Karachi & Islamabad</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-800/80 flex items-center justify-center text-emerald-300 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Cash on Delivery (COD)</h4>
                <p className="text-[11px] text-emerald-300">Or Pay with JazzCash / Card</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
