export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  iconName: string;
  itemCount: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  price: number; // in PKR
  originalPrice?: number; // for discounts
  unit: string; // e.g., "1 kg", "1 Litre", "12 Pieces", "500g"
  stock: number;
  isAvailable: boolean;
  image: string;
  description: string;
  badge?: string; // e.g. "Farm Fresh", "Organic", "Best Seller"
  rating: number;
  reviewCount: number;
  origin?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  total: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'Cash on Delivery' | 'JazzCash' | 'EasyPaisa' | 'Debit/Credit Card';

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  deliveryNotes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending Cash on Delivery';
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
