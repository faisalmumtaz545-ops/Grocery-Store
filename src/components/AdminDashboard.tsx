import React, { useState } from 'react';
import { Product, Order, User, Category, OrderStatus } from '../types';
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Database,
  Search,
  X,
  FileCode,
  Download,
  Copy,
  Check,
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  categories: Category[];
  orders: Order[];
  users: User[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onResetData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  categories,
  orders,
  users,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onResetData,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'analytics' | 'customers' | 'database'>('orders');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [searchProductQuery, setSearchProductQuery] = useState('');

  // Add/Edit Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    categoryId: categories[0]?.id || 'cat-fruits-veg',
    price: 150,
    originalPrice: 0,
    unit: '1 kg',
    stock: 25,
    isAvailable: true,
    image: '',
    description: '',
    origin: 'Punjab Farms',
    badge: '',
  });

  const [copiedSql, setCopiedSql] = useState(false);

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.orderStatus !== 'Cancelled' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed').length;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    if (orderFilter === 'all') return true;
    return order.orderStatus.toLowerCase() === orderFilter.toLowerCase();
  });

  // Filtered products for inventory management
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchProductQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchProductQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      categoryId: categories[0]?.id || 'cat-fruits-veg',
      price: 200,
      originalPrice: 0,
      unit: '1 kg',
      stock: 30,
      isAvailable: true,
      image: '/src/assets/images/cat_fruits_vegetables_1792608012996.jpg',
      description: 'Fresh farm-sourced grocery item delivered at peak quality.',
      origin: 'Lahore Model Farm',
      badge: 'Fresh Stock',
    });
    setIsProductModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      categoryId: p.categoryId,
      price: p.price,
      originalPrice: p.originalPrice || 0,
      unit: p.unit,
      stock: p.stock,
      isAvailable: p.isAvailable,
      image: p.image,
      description: p.description,
      origin: p.origin || '',
      badge: p.badge || '',
    });
    setIsProductModalOpen(true);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c.id === productForm.categoryId);
    const categoryName = cat ? cat.name : 'Groceries';

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        ...productForm,
        categoryName,
        price: Number(productForm.price),
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
        stock: Number(productForm.stock),
      });
    } else {
      onAddProduct({
        ...productForm,
        categoryName,
        price: Number(productForm.price),
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
        stock: Number(productForm.stock),
        rating: 4.8,
        reviewCount: 1,
      });
    }
    setIsProductModalOpen(false);
  };

  const sampleSqlSnippet = `-- Alfaisal Grocery Store MySQL DDL Schema
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY,
    category_id VARCHAR(36) NOT NULL,
    name VARCHAR(150) NOT NULL,
    price_pkr DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sampleSqlSnippet);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <span>Store Operations</span>
            <span aria-hidden="true">·</span>
            <span>Live Inventory & Orders</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Store Owner Admin Panel
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
          <button
            onClick={onResetData}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl border border-slate-200 transition-colors cursor-pointer"
            title="Reload default sample grocery products and test orders"
          >
            Reset Demo Data
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Total Store Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-emerald-900 tabular-nums">
            PKR {totalRevenue.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">From verified customer orders</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Customer Orders</span>
            <ShoppingCart className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
            {totalOrdersCount}
          </p>
          <span className="text-[11px] text-amber-700 font-medium mt-1 block">
            {pendingOrdersCount} orders pending fulfillment
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Catalog Products</span>
            <Package className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
            {products.length}
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">Across {categories.length} departments</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Low Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-rose-700 tabular-nums">
            {lowStockCount}
          </p>
          <span className="text-[11px] text-rose-600 mt-1 block">Items need replenishment</span>
        </div>
      </div>

      {/* Admin Tab Controls */}
      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pb-px">
        {[
          { id: 'orders', label: 'Orders & Fulfillment', count: orders.length },
          { id: 'inventory', label: 'Inventory & Products', count: products.length },
          { id: 'customers', label: 'Registered Customers', count: users.length },
          { id: 'analytics', label: 'Sales Reports' },
          { id: 'database', label: 'MySQL Schema & Java Code' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-600">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Order Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-slate-500 mr-2">Filter Status:</span>
              {['all', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderFilter(status)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                    orderFilter === status
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status === 'all' ? 'All Orders' : status}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500">
              Showing {filteredOrders.length} order{filteredOrders.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Order Ref</th>
                    <th className="py-3 px-4">Customer & City</th>
                    <th className="py-3 px-4">Items Summary</th>
                    <th className="py-3 px-4 text-right">Bill (PKR)</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4 text-center">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {order.orderNumber}
                        <span className="block text-[10px] font-sans font-normal text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{order.customerName}</div>
                        <div className="text-slate-500 text-[11px]">{order.city} · {order.customerPhone}</div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="truncate text-slate-700">
                          {order.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                        </p>
                        <span className="text-[10px] text-slate-400">{order.items.length} product(s)</span>
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-800 tabular-nums">
                        PKR {order.total.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-800 block">{order.paymentMethod}</span>
                        <span
                          className={`text-[10px] font-semibold ${
                            order.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-amber-700'
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                            order.orderStatus === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.orderStatus === 'Shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : order.orderStatus === 'Processing'
                              ? 'bg-amber-100 text-amber-800'
                              : order.orderStatus === 'Confirmed'
                              ? 'bg-teal-100 text-teal-800'
                              : order.orderStatus === 'Cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-hidden focus:border-emerald-600"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INVENTORY & PRODUCTS */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter by product name or category..."
                value={searchProductQuery}
                onChange={(e) => setSearchProductQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600"
              />
            </div>
            <span className="text-xs text-slate-500">
              Showing {filteredProducts.length} of {products.length} products
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-right">Price (PKR)</th>
                    <th className="py-3 px-4">Unit</th>
                    <th className="py-3 px-4 text-center">Stock Level</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => {
                    const isLow = p.stock <= 5;
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <div>
                              <span className="font-bold text-slate-900 block truncate max-w-xs">{p.name}</span>
                              <span className="text-[10px] text-slate-400">{p.origin || 'Pakistan'}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-medium text-slate-600">{p.categoryName}</td>

                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-800 tabular-nums">
                          PKR {p.price.toLocaleString()}
                        </td>

                        <td className="py-3 px-4 text-slate-600 font-mono">{p.unit}</td>

                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-block font-mono font-bold px-2 py-0.5 rounded-md tabular-nums ${
                              p.stock === 0
                                ? 'bg-rose-100 text-rose-800'
                                : isLow
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-50 text-emerald-800'
                            }`}
                          >
                            {p.stock}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`text-[11px] font-semibold ${
                              p.isAvailable && p.stock > 0 ? 'text-emerald-700' : 'text-rose-600'
                            }`}
                          >
                            {p.isAvailable && p.stock > 0 ? 'Available' : 'Unavailable'}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditModal(p)}
                              className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-md cursor-pointer"
                              title="Edit price & stock"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                  onDeleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMERS */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Registered Customer Accounts</h3>
            <span className="text-xs text-slate-500">{users.length} total accounts</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">{u.name}</td>
                    <td className="py-3 px-4 text-slate-600">{u.email}</td>
                    <td className="py-3 px-4 text-slate-600 font-mono">{u.phone}</td>
                    <td className="py-3 px-4 text-slate-700">{u.city}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          u.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-emerald-50 text-emerald-800'
                        }`}
                      >
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: ANALYTICS & SALES REPORT */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Sales Breakdown by Category</h3>
            <div className="space-y-3">
              {categories.map((cat) => {
                const catProducts = products.filter((p) => p.categoryId === cat.id);
                const count = catProducts.length;
                return (
                  <div key={cat.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700">{cat.name}</span>
                      <span className="text-slate-500 font-mono tabular-nums">{count} products</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full"
                        style={{ width: `${Math.min(100, (count / 8) * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Payment Channel Performance</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-800 block">Cash on Delivery (COD)</span>
                  <span className="text-slate-500 text-[11px]">Primary payment option</span>
                </div>
                <span className="font-bold text-emerald-800 font-mono">
                  {orders.filter((o) => o.paymentMethod === 'Cash on Delivery').length} Orders
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-800 block">JazzCash & EasyPaisa</span>
                  <span className="text-slate-500 text-[11px]">Mobile wallets</span>
                </div>
                <span className="font-bold text-emerald-800 font-mono">
                  {orders.filter((o) => o.paymentMethod === 'JazzCash' || o.paymentMethod === 'EasyPaisa').length} Orders
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-800 block">Debit / Credit Cards</span>
                  <span className="text-slate-500 text-[11px]">Visa & Mastercard gateway</span>
                </div>
                <span className="font-bold text-emerald-800 font-mono">
                  {orders.filter((o) => o.paymentMethod === 'Debit/Credit Card').length} Orders
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DATABASE SCHEMA & SPRING BOOT CODE EXPORT */}
      {activeTab === 'database' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <Database className="w-4 h-4" />
                <span>MySQL 8.0 & Spring Boot Java Architecture</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Included schema tables: `users`, `categories`, `products`, `orders`, `order_items`, `payments`.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySql}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied!' : 'Copy SQL Script'}</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-96">
            <pre>{sampleSqlSnippet}</pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-emerald-600" />
                MySQL Database Schema
              </h4>
              <p className="text-slate-500 mb-2">
                Stored in project directory: <code className="text-slate-800">/database/Alfaisal_Grocery_Database.sql</code>
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Automatic stock reduction trigger on checkout</li>
                <li>Foreign keys with referential integrity</li>
                <li>Decimal price storage in Pakistani Rupees</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-emerald-600" />
                Spring Boot Backend
              </h4>
              <p className="text-slate-500 mb-2">
                Stored in project directory: <code className="text-slate-800">/backend/src/main/</code>
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Spring Data JPA repository models</li>
                <li>REST controllers for Products & Orders</li>
                <li>Pre-configured for local MySQL port 3306</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {editingProduct ? 'Edit Grocery Product' : 'Add New Grocery Product'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Swat Red Sweet Apples"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit Specification *</label>
                  <input
                    type="text"
                    required
                    value={productForm.unit}
                    onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                    placeholder="e.g. 1 kg, 5 Litres, Pack of 12"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price in PKR *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Original Price (PKR)</label>
                  <input
                    type="number"
                    min={0}
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    placeholder="Optional"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="/src/assets/images/... or https://..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Origin / Farm Source</label>
                  <input
                    type="text"
                    value={productForm.origin}
                    onChange={(e) => setProductForm({ ...productForm, origin: e.target.value })}
                    placeholder="e.g. Swat Valley, Sahiwal Dairy"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Highlight Badge</label>
                  <input
                    type="text"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    placeholder="e.g. Farm Fresh, Best Seller"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Description *</label>
                <textarea
                  rows={2}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
