import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from '../types';
import { X, Lock, Mail } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  allUsers: User[];
  onRegisterUser: (user: Omit<User, 'id' | 'createdAt'>) => User;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  allUsers,
  onRegisterUser,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lahore');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const user = allUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      setError('No registered account found with this email. Try Demo Customer below or Register.');
      return;
    }

    onLoginSuccess(user);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !password.trim() || !phone.trim() || !address.trim()) {
      setError('All fields are required for grocery delivery registration.');
      return;
    }

    const existing = allUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      setError('An account with this email address already exists. Please login instead.');
      return;
    }

    const newUser = onRegisterUser({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city,
      role: 'customer',
    });

    onLoginSuccess(newUser);
    onClose();
  };

  const fillDemoCustomer = () => {
    const cust = allUsers.find((u) => u.role === 'customer');
    if (cust) {
      onLoginSuccess(cust);
      onClose();
    }
  };

  const fillDemoAdmin = () => {
    const admin = allUsers.find((u) => u.role === 'admin');
    if (admin) {
      onLoginSuccess(admin);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {mode === 'login' ? 'Sign In to Alfaisal Store' : 'Create Customer Account'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {mode === 'login' ? 'Access your orders and expedited checkout' : 'Enjoy fresh home delivery across Pakistan'}
                </p>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="p-6 space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium"
                >
                  {error}
                </motion.div>
              )}

              {/* Quick Demo Credentials Strip */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 space-y-2">
                <span className="text-[11px] font-bold text-emerald-900 block">Instant 1-Click Demo Login:</span>
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={fillDemoCustomer}
                    className="px-2.5 py-1.5 bg-white hover:bg-emerald-100/60 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 shadow-2xs text-center cursor-pointer transition-colors"
                  >
                    Demo Customer
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={fillDemoAdmin}
                    className="px-2.5 py-1.5 bg-white hover:bg-emerald-100/60 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 shadow-2xs text-center cursor-pointer transition-colors"
                  >
                    Store Admin
                  </motion.button>
                </div>
              </div>

              {mode === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="customer@alfaisal.pk"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Sign In to Account
                  </motion.button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0300-1234567"
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600"
                      >
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Multan">Multan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Address *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House/Street, Block"
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Create Account & Sign In
                  </motion.button>
                </form>
              )}

              {/* Toggle between Login and Register */}
              <div className="text-center pt-2 border-t border-slate-100">
                {mode === 'login' ? (
                  <p className="text-xs text-slate-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      Register here
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-slate-600">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
