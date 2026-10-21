import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Plus, Minus, ShoppingBag, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
  cartQuantity?: number;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  cartQuantity = 0,
  index = 0,
}) => {
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);

  const isOutOfStock = product.stock <= 0 || !product.isAvailable;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    onAddToCart(product, selectedQty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const incrementQty = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedQty < product.stock) {
      setSelectedQty((prev) => prev + 1);
    }
  };

  const decrementQty = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedQty > 1) {
      setSelectedQty((prev) => prev - 1);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Subtle quick view trigger */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 text-slate-700 hover:text-emerald-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs cursor-pointer"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4" />
        </motion.button>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 bg-emerald-700/90 text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm">
            {product.badge}
          </div>
        )}
      </div>

      {/* Product Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line without pill enclosures */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <span>{product.categoryName}</span>
            {product.origin && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate">{product.origin}</span>
              </>
            )}
          </div>

          <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-1 line-clamp-2 leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {product.description}
          </p>
        </div>

        {/* Pricing, Availability and Action Bar */}
        <div className="pt-3 border-t border-slate-100 mt-3 space-y-2.5">
          {/* Price & Unit */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-emerald-800 tabular-nums">
                PKR {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">{product.unit}</span>
          </div>

          {/* Stock Indicator */}
          <div className="flex items-center justify-between text-[11px]">
            {isOutOfStock ? (
              <span className="text-rose-600 font-semibold">Out of Stock</span>
            ) : isLowStock ? (
              <span className="text-amber-700 font-medium">Only {product.stock} left in stock</span>
            ) : (
              <span className="text-emerald-700 font-medium">In Stock ({product.stock} available)</span>
            )}

            {cartQuantity > 0 && (
              <span className="text-emerald-800 font-semibold">
                {cartQuantity} in cart
              </span>
            )}
          </div>

          {/* Quantity Stepper & Add to Cart button */}
          <div className="flex items-center gap-2">
            {!isOutOfStock && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden shrink-0"
              >
                <button
                  onClick={decrementQty}
                  disabled={selectedQty <= 1}
                  className="w-7 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-30 cursor-pointer transition-colors active:scale-95"
                  title="Decrease"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-7 text-center text-xs font-bold text-slate-800 tabular-nums">
                  {selectedQty}
                </span>
                <button
                  onClick={incrementQty}
                  disabled={selectedQty >= product.stock}
                  className="w-7 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-30 cursor-pointer transition-colors active:scale-95"
                  title="Increase"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleAdd}
              disabled={isOutOfStock}
              className={`flex-1 h-8 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                isOutOfStock
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : justAdded
                  ? 'bg-emerald-800 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
              }`}
            >
              {isOutOfStock ? (
                <span>Unavailable</span>
              ) : justAdded ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </motion.div>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
