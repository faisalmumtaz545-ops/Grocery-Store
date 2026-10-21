import React from 'react';
import { motion } from 'motion/react';
import { Category } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryStripProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryStrip: React.FC<CategoryStripProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Department Aisles
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
              Shop by Grocery Category
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className={`text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
              selectedCategoryId === 'all' ? 'text-emerald-800' : 'text-slate-500 hover:text-emerald-700'
            }`}
          >
            <span>View All Aisles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 8-Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, idx) => {
            const isSelected = selectedCategoryId === category.id;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectCategory(category.id)}
                className={`group text-left p-4 rounded-xl border transition-colors cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-600'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-xs'
                }`}
              >
                <div className="w-full h-32 rounded-lg overflow-hidden bg-slate-200 mb-3 relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-medium">
                    <span>{category.itemCount} items in aisle</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
