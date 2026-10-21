import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Query',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setContactData({ name: '', email: '', phone: '', subject: 'Order Query', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
          Customer Service & Support
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-1">
          Contact Alfaisal Grocery Store
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          We are here to assist with fresh produce questions, bulk orders, rider tracking, or feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info & Branches */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900">Direct Contact Hotlines</h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Phone Order Hotline</span>
                  <p className="text-emerald-800 font-mono font-bold mt-0.5">0344-7443291</p>
                  <p className="text-slate-400 text-[11px]">Direct store dispatch line</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">WhatsApp Customer Care</span>
                  <p className="text-emerald-700 font-mono font-semibold mt-0.5">+92 344 7443291</p>
                  <p className="text-slate-400 text-[11px]">Immediate response for live orders</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Email Inquiries</span>
                  <p className="text-slate-700 font-mono text-xs mt-0.5">muhammadfaisal@gmail.com</p>
                  <p className="text-slate-400 text-[11px]">Store owner & management</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Operating Hours</span>
                  <p className="text-slate-600 mt-0.5">Monday – Sunday: 8:00 AM to 11:00 PM</p>
                  <p className="text-slate-400 text-[11px]">Deliveries depart every 30 minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fulfillment Hubs */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Our Main Distribution Hubs</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900 block">Lahore Central Hub:</strong>
                <span>Plot 18-B, Ferozepur Road Industrial Area, Gulberg III, Lahore</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900 block">Islamabad Hub:</strong>
                <span>Service Road South, Sector I-9/3, Industrial Area, Islamabad</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900 block">Karachi Hub:</strong>
                <span>Block 2, Clifton Near Bilawal Roundabout, Karachi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Send us a Message</h2>
              <p className="text-xs text-slate-500 mt-1">
                Have a special grocery request or questions about seasonal farm produce?
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-sm font-bold text-emerald-900">Message Received!</h3>
                <p className="text-xs text-emerald-800">
                  Thank you for reaching out to Alfaisal Grocery Store. Our customer support manager will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      placeholder="e.g. Faisal Mumtaz"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                    <select
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
                    >
                      <option value="Order Query">Order Status Query</option>
                      <option value="Product Sourcing">Fresh Produce Inquiry</option>
                      <option value="Bulk Order">Bulk / Commercial Order</option>
                      <option value="Feedback">General Store Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="How can we assist you with your grocery needs?"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
