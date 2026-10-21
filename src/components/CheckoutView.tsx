import React, { useState } from 'react';
import { CartItem, User, PaymentMethod, Order } from '../types';
import { ArrowLeft, ShieldCheck, Truck, CreditCard, Banknote, Smartphone, CheckCircle2, AlertCircle } from 'lucide-react';

interface CheckoutViewProps {
  cartItems: CartItem[];
  currentUser: User | null;
  discount: number;
  discountCode: string;
  onBackToShop: () => void;
  onOrderSuccess: (order: Order) => void;
  createOrderHandler: (orderData: {
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
  }) => { success: boolean; order?: Order; error?: string };
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  currentUser,
  discount,
  discountCode,
  onBackToShop,
  onOrderSuccess,
  createOrderHandler,
}) => {
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || 'Lahore',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery');
  const [onlineWalletNumber, setOnlineWalletNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 2000 || subtotal === 0 ? 0 : 150;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const cities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Gujranwala',
    'Sialkot',
    'Hyderabad',
    'Quetta',
  ];

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address is required for receipt';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Valid phone number required (e.g. 0300-1234567)';
    }
    if (!formData.address.trim() || formData.address.length < 8) {
      errs.address = 'Detailed street and house address is required';
    }
    if (!formData.city) errs.city = 'Please select a delivery city';

    // Validate online payment credentials if selected
    if (paymentMethod === 'JazzCash' || paymentMethod === 'EasyPaisa') {
      if (!onlineWalletNumber.trim() || onlineWalletNumber.length < 11) {
        errs.wallet = `Valid 11-digit ${paymentMethod} mobile account number is required`;
      }
    } else if (paymentMethod === 'Debit/Credit Card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 15) {
        errs.card = 'Valid 16-digit card number required';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (cartItems.length === 0) {
      setGeneralError('Your cart is empty. Please add products before checking out.');
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const orderItems = cartItems.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      unit: item.product.unit,
      image: item.product.image,
      total: item.product.price * item.quantity,
    }));

    const paymentStatus: 'Paid' | 'Pending Cash on Delivery' =
      paymentMethod === 'Cash on Delivery' ? 'Pending Cash on Delivery' : 'Paid';

    const result = createOrderHandler({
      customerName: formData.name.trim(),
      customerEmail: formData.email.trim(),
      customerPhone: formData.phone.trim(),
      deliveryAddress: formData.address.trim(),
      city: formData.city,
      deliveryNotes: formData.notes.trim(),
      items: orderItems,
      subtotal,
      deliveryFee,
      discount,
      total: grandTotal,
      paymentMethod,
      paymentStatus,
      orderStatus: 'Pending',
    });

    setIsSubmitting(false);

    if (result.success && result.order) {
      onOrderSuccess(result.order);
    } else {
      setGeneralError(result.error || 'Failed to place order. Please review stock or details.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back button */}
      <button
        onClick={onBackToShop}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Store Catalog</span>
      </button>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Secure Grocery Checkout
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Provide your delivery destination and select payment method for guaranteed doorstep delivery.
        </p>
      </div>

      {generalError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Delivery & Payment Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Contact & Delivery Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Truck className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base font-bold text-slate-900">1. Delivery Address & Contact</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ayesha Khan"
                  className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                    errors.name ? 'border-rose-400' : 'border-slate-200 focus:border-emerald-600'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number (Mobile) *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0300-1234567"
                  className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                    errors.phone ? 'border-rose-400' : 'border-slate-200 focus:border-emerald-600'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="customer@example.com"
                  className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                    errors.email ? 'border-rose-400' : 'border-slate-200 focus:border-emerald-600'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery City *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Complete Street & House Address *
              </label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="House / Flat No., Street, Sector/Block, Landmark (e.g. House 42-B, Sector G-11/2)"
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                  errors.address ? 'border-rose-400' : 'border-slate-200 focus:border-emerald-600'
                }`}
              />
              {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Special Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Ring the bell twice, leave with guard if not answering"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Section 2: Payment Options */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <CreditCard className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base font-bold text-slate-900">2. Select Payment Method</h2>
            </div>

            <div className="space-y-3">
              {/* Option 1: Cash on Delivery */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={() => setPaymentMethod('Cash on Delivery')}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-emerald-700" />
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded-sm">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Pay with physical cash to our certified delivery courier when your order arrives.
                  </p>
                </div>
              </label>

              {/* Option 2: JazzCash */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'JazzCash'
                    ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'JazzCash'}
                  onChange={() => setPaymentMethod('JazzCash')}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-red-600" />
                    JazzCash Mobile Wallet
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    Instant checkout via your registered JazzCash mobile account with zero extra fees.
                  </p>
                </div>
              </label>

              {/* Option 3: EasyPaisa */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'EasyPaisa'
                    ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'EasyPaisa'}
                  onChange={() => setPaymentMethod('EasyPaisa')}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    EasyPaisa Account
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct mobile wallet PIN authorization for quick payment processing.
                  </p>
                </div>
              </label>

              {/* Option 4: Debit/Credit Card */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'Debit/Credit Card'
                    ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Debit/Credit Card'}
                  onChange={() => setPaymentMethod('Debit/Credit Card')}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-slate-700" />
                    Visa / Mastercard / UnionPay / PayPak
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    Secure 256-bit encrypted online card gateway.
                  </p>
                </div>
              </label>
            </div>

            {/* Interactive Simulator for Online Payment Method */}
            {(paymentMethod === 'JazzCash' || paymentMethod === 'EasyPaisa') && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-800">
                  Enter your {paymentMethod} Mobile Number:
                </label>
                <input
                  type="tel"
                  placeholder="03001234567"
                  value={onlineWalletNumber}
                  onChange={(e) => setOnlineWalletNumber(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
                />
                {errors.wallet && <p className="text-[11px] text-rose-600">{errors.wallet}</p>}
                <p className="text-[11px] text-slate-500">
                  You will receive an in-app prompt on your mobile to confirm payment of PKR {grandTotal.toLocaleString()}.
                </p>
              </div>
            )}

            {paymentMethod === 'Debit/Credit Card' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="4000 1234 5678 9010"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600 font-mono"
                  />
                  {errors.card && <p className="text-[11px] text-rose-600 mt-1">{errors.card}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      placeholder="08/28"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">CVV</label>
                    <input
                      type="password"
                      placeholder="123"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-slate-500 font-normal">{cartItems.length} unique products</span>
            </h3>

            {/* Itemized Mini List */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="w-5 h-5 rounded bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0">
                      {quantity}x
                    </span>
                    <span className="font-medium text-slate-800 truncate">{product.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900 tabular-nums shrink-0">
                    PKR {(product.price * quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Doorstep Delivery</span>
                <span className="font-semibold tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `PKR ${deliveryFee}`
                  )}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Savings {discountCode ? `(${discountCode})` : ''}</span>
                  <span className="tabular-nums">- PKR {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
                <span>Total Bill (PKR)</span>
                <span className="text-emerald-800 tabular-nums">PKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Place Order (PKR {grandTotal.toLocaleString()})</span>
                </>
              )}
            </button>

            {/* Security Assurance */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Verified Grocery Fulfillment by Alfaisal</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
