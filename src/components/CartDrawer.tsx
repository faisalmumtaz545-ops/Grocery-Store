import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (appliedDiscount: number, discountCode: string) => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 2000 || subtotal === 0 ? 0 : 150;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);
  const freeDeliveryThreshold = 2000;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'ALFAISAL10') {
      setDiscountPercent(10);
      setPromoMessage({ text: '10% Ramadan/Welcome discount applied!', isError: false });
    } else if (cleanCode === 'FREESHIP') {
      setDiscountPercent(5);
      setPromoMessage({ text: 'Special 5% discount code applied!', isError: false });
    } else {
      setPromoMessage({ text: 'Invalid voucher code. Try "ALFAISAL10"', isError: true });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Slide-In Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-700" />
                <h2 className="text-base font-bold text-slate-900">Your Grocery Cart</h2>
                <span className="text-xs text-slate-500 font-medium">({cartItems.length} items)</span>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.15 }}
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Free Delivery Progress Bar */}
            {cartItems.length > 0 && (
              <div className="bg-emerald-50 px-5 py-2.5 border-b border-emerald-100 text-xs">
                {amountNeededForFreeDelivery === 0 ? (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1.5 text-emerald-800 font-semibold"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>You unlocked FREE Delivery on this order!</span>
                  </motion.div>
                ) : (
                  <div>
                    <p className="text-emerald-900">
                      Add <strong className="text-emerald-700">PKR {amountNeededForFreeDelivery.toLocaleString()}</strong> more for{' '}
                      <strong>FREE Delivery</strong>
                    </p>
                    <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <motion.div
                        className="bg-emerald-600 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <ShoppingBag className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Your cart is currently empty</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs">
                      Fill your basket with fresh fruits, dairy, whole wheat flour, and household staples.
                    </p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      onClose();
                      onContinueShopping();
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Browse Grocery Aisles
                  </motion.button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cartItems.map(({ product, quantity }) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, x: -30, height: 0, transition: { duration: 0.2 } }}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/90 bg-white hover:border-emerald-200 transition-colors overflow-hidden"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{product.name}</h4>
                        <p className="text-[11px] text-slate-500">
                          PKR {product.price.toLocaleString()} / {product.unit}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          {/* Stepper */}
                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer active:scale-90 transition-transform"
                              title="Reduce quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-slate-800 tabular-nums">
                              {quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                              disabled={quantity >= product.stock}
                              className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-30 cursor-pointer active:scale-90 transition-transform"
                              title="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Total for this line */}
                          <span className="text-xs font-extrabold text-emerald-800 tabular-nums">
                            PKR {(product.price * quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Drawer Footer with Calculations */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-slate-50/70 space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Coupon (e.g. ALFAISAL10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg uppercase font-mono placeholder:normal-case placeholder:font-sans focus:outline-hidden focus:border-emerald-600"
                      />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </motion.button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-700 font-medium'}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </form>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-slate-800 tabular-nums">PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="font-semibold tabular-nums">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-700 font-bold">FREE</span>
                      ) : (
                        `PKR ${deliveryFee}`
                      )}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount ({discountPercent}%)</span>
                      <span className="tabular-nums">- PKR {discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Grand Total</span>
                    <span className="text-emerald-800 tabular-nums">PKR {totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Action Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    onProceedToCheckout(discountAmount, discountPercent > 0 ? promoCode.trim().toUpperCase() : '');
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
