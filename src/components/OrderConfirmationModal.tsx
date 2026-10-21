import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';
import { CheckCircle2, Printer, ShoppingBag, MapPin, Phone, Clock, FileText } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onViewOrders: () => void;
  onContinueShopping: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onViewOrders,
  onContinueShopping,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const steps = order
    ? [
        { title: 'Order Placed', desc: 'Received & Logged', active: true },
        { title: 'Confirmed', desc: 'Stock Reserved', active: true },
        { title: 'Processing', desc: 'Packing at Hub', active: order.orderStatus === 'Processing' || order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered' },
        { title: 'Shipped', desc: 'Out for Delivery', active: order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered' },
        { title: 'Delivered', desc: 'At Your Doorstep', active: order.orderStatus === 'Delivered' },
      ]
    : [];

  return (
    <AnimatePresence>
      {order && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Ribbon */}
            <div className="bg-emerald-700 text-white p-6 text-center space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.1 }}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2"
              >
                <CheckCircle2 className="w-7 h-7 text-emerald-100" />
              </motion.div>
              <h2 className="text-xl sm:text-2xl font-black">Thank You! Order Confirmed</h2>
              <p className="text-xs sm:text-sm text-emerald-100">
                Your fresh grocery items have been reserved and routed to our fulfillment center.
              </p>
              <div className="inline-block mt-2 bg-emerald-800/80 px-4 py-1.5 rounded-lg border border-emerald-600 font-mono text-xs font-bold tracking-wider">
                Order Reference: {order.orderNumber}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Status Timeline */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Fulfillment Timeline
                </h3>
                <div className="grid grid-cols-5 gap-1 text-center">
                  {steps.map((step, idx) => (
                    <div key={step.title} className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-colors ${
                          step.active
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <span className={`text-[11px] font-semibold ${step.active ? 'text-emerald-900' : 'text-slate-400'}`}>
                        {step.title}
                      </span>
                      <span className="text-[10px] text-slate-400 hidden sm:block">{step.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery & Customer Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <div className="space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Delivery Location</span>
                  </div>
                  <p className="font-medium text-slate-800">{order.customerName}</p>
                  <p>{order.deliveryAddress}, {order.city}</p>
                  <p className="text-slate-500 flex items-center gap-1 pt-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {order.customerPhone}
                  </p>
                </div>

                <div className="space-y-1.5 sm:border-l sm:border-slate-200 sm:pl-4">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Payment & Timing</span>
                  </div>
                  <p>
                    <span className="text-slate-500">Method:</span>{' '}
                    <strong className="text-slate-900">{order.paymentMethod}</strong>
                  </p>
                  <p>
                    <span className="text-slate-500">Payment Status:</span>{' '}
                    <strong className={order.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-amber-700'}>
                      {order.paymentStatus}
                    </strong>
                  </p>
                  <p className="text-slate-500">
                    Estimated Delivery: <strong className="text-emerald-800">Today within 2 Hours</strong>
                  </p>
                </div>
              </div>

              {/* Itemized Order Receipt */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Itemized Receipt</span>
                  </h4>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Invoice</span>
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Item</th>
                        <th className="py-2.5 px-3 text-center">Qty</th>
                        <th className="py-2.5 px-3 text-right">Price</th>
                        <th className="py-2.5 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {order.items.map((item, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-2 px-3 font-medium text-slate-900">
                            {item.productName}{' '}
                            <span className="text-slate-400 font-normal">({item.unit})</span>
                          </td>
                          <td className="py-2 px-3 text-center font-mono tabular-nums">{item.quantity}</td>
                          <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-600">
                            PKR {item.price.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-right font-mono tabular-nums font-bold text-slate-800">
                            PKR {item.total.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="bg-slate-50 p-3 border-t border-slate-200 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-mono tabular-nums font-semibold">PKR {order.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery Charges</span>
                      <span className="font-mono tabular-nums font-semibold">
                        {order.deliveryFee === 0 ? 'FREE' : `PKR ${order.deliveryFee}`}
                      </span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Discount</span>
                        <span className="font-mono tabular-nums font-semibold">- PKR {order.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1.5 border-t border-slate-200">
                      <span>Grand Total (PKR)</span>
                      <span className="text-emerald-800 font-mono tabular-nums">
                        PKR {order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    onViewOrders();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-emerald-600 text-emerald-700 font-bold text-xs hover:bg-emerald-50 transition-colors cursor-pointer text-center"
                >
                  View in My Orders
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    onContinueShopping();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Continue Grocery Shopping</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
