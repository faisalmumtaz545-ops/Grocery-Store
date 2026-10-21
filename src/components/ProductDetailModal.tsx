import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { X, Plus, Minus, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  cartQuantity?: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  cartQuantity = 0,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product ? product.stock <= 0 || !product.isAvailable : false;

  const handleAdd = () => {
    if (!product || isOutOfStock) return;
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image */}
              <div className="bg-slate-100 relative min-h-[300px] md:min-h-[420px] overflow-hidden">
                <motion.img
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-emerald-800 text-white text-xs font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-xs">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Product Information */}
              <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div>
                  {/* Category & Origin */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span>{product.categoryName}</span>
                    {product.origin && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{product.origin}</span>
                      </>
                    )}
                  </div>

                  <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1 leading-snug">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="ml-1 text-xs font-bold text-slate-800">{product.rating}</span>
                    </div>
                    <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
                  </div>

                  {/* Price Banner */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black text-emerald-800 tabular-nums">
                        PKR {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-slate-400 line-through tabular-nums">
                          PKR {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                      Unit: {product.unit}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Stock availability */}
                  <div className="mt-4 text-xs">
                    {isOutOfStock ? (
                      <span className="text-rose-600 font-bold">Currently Out of Stock</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-700 font-semibold">
                          In Stock ({product.stock} {product.unit} available)
                        </span>
                        {cartQuantity > 0 && (
                          <span className="text-slate-500 font-medium">
                            · You have {cartQuantity} in your cart
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Bottom Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    {!isOutOfStock && (
                      <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          disabled={quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-200 disabled:opacity-40 cursor-pointer active:scale-95 transition-transform"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-slate-900 tabular-nums">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                          disabled={quantity >= product.stock}
                          className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-200 disabled:opacity-40 cursor-pointer active:scale-95 transition-transform"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAdd}
                      disabled={isOutOfStock}
                      className={`flex-1 h-11 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isOutOfStock
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                          : added
                          ? 'bg-emerald-800 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                      }`}
                    >
                      {isOutOfStock ? (
                        <span>Sold Out</span>
                      ) : added ? (
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          <span>Added to Shopping Cart!</span>
                        </motion.div>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart (PKR {(product.price * quantity).toLocaleString()})</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-500 text-center">
                    <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                      <span>100% Halal Verified</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50">
                      <Truck className="w-4 h-4 text-emerald-600 mb-1" />
                      <span>2-Hour Delivery</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50">
                      <RefreshCw className="w-4 h-4 text-emerald-600 mb-1" />
                      <span>Doorstep Return</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
