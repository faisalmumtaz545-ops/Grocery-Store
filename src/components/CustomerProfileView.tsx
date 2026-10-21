import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Order } from '../types';
import { Package, Clock, MapPin, Phone, Mail, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

interface CustomerProfileViewProps {
  user: User;
  orders: Order[];
  onReorder: (order: Order) => void;
  onExplore: () => void;
}

export const CustomerProfileView: React.FC<CustomerProfileViewProps> = ({
  user,
  orders,
  onReorder,
  onExplore,
}) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const customerOrders = orders.filter(
    (o) => o.customerId === user.id || o.customerEmail.toLowerCase() === user.email.toLowerCase()
  );

  const getStatusBadge = (status: Order['orderStatus']) => {
    switch (status) {
      case 'Delivered':
        return 'text-emerald-700 bg-emerald-50 border border-emerald-200';
      case 'Shipped':
        return 'text-blue-700 bg-blue-50 border border-blue-200';
      case 'Processing':
        return 'text-amber-700 bg-amber-50 border border-amber-200';
      case 'Confirmed':
        return 'text-teal-700 bg-teal-50 border border-teal-200';
      case 'Cancelled':
        return 'text-rose-700 bg-rose-50 border border-rose-200';
      default:
        return 'text-slate-700 bg-slate-50 border border-slate-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">{user.name}</h2>
                <span className="text-xs text-emerald-700 font-medium">Verified Customer</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <span>{user.address}, {user.city}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-lg font-bold text-slate-900 tabular-nums">
                  {customerOrders.length}
                </span>
                <span className="block text-[11px] text-slate-500">Orders Placed</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-lg font-bold text-emerald-800 tabular-nums">
                  PKR {customerOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
                </span>
                <span className="block text-[11px] text-slate-500">Total Spent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Your Order History</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Track status, review past purchases, or quickly re-order pantry staples.
              </p>
            </div>
          </div>

          {customerOrders.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center space-y-4">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">No orders placed yet</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Once you order fresh groceries, your tracking details and receipts will appear here.
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={onExplore}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Start Grocery Shopping
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              {customerOrders.map((order) => {
                const isExpanded = expandedOrderId === order.id;

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                  >
                    {/* Order summary bar */}
                    <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-extrabold text-slate-900">
                            {order.orderNumber}
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${getStatusBadge(
                              order.orderStatus
                            )}`}
                          >
                            {order.orderStatus}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          <span>·</span>
                          <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                          <span>·</span>
                          <span>{order.paymentMethod}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs text-slate-400 block">Total</span>
                          <span className="text-sm font-extrabold text-emerald-800 tabular-nums">
                            PKR {order.total.toLocaleString()}
                          </span>
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.94 }}
                          onClick={() => onReorder(order)}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 flex items-center gap-1 transition-colors cursor-pointer"
                          title="Re-order all items"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Re-order</span>
                        </motion.button>

                        <button
                          onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
                          title="View order details"
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Animated Expanded details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3 overflow-hidden"
                        >
                          <h4 className="text-xs font-bold text-slate-700">Purchased Items:</h4>
                          <div className="divide-y divide-slate-100 bg-white rounded-xl border border-slate-200 overflow-hidden">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="p-3 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-5 h-5 rounded bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                                    {item.quantity}x
                                  </span>
                                  <span className="font-medium text-slate-800">
                                    {item.productName}{' '}
                                    <span className="text-slate-400">({item.unit})</span>
                                  </span>
                                </div>
                                <span className="font-mono tabular-nums font-semibold text-slate-800">
                                  PKR {item.total.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between text-xs text-slate-500 pt-1">
                            <span>Delivered to: {order.deliveryAddress}, {order.city}</span>
                            <span className="font-semibold text-slate-700">Status: {order.paymentStatus}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
