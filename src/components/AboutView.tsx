import React from 'react';
import { ShieldCheck, Truck, Leaf, HeartHandshake, Award } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Editorial Header */}
      <div className="max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
          Our Heritage & Mission
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-1">
          About Alfaisal Grocery Store
        </h1>
        <p className="text-base text-slate-600 mt-4 leading-relaxed">
          Established to bridge the gap between hardworking rural farmers and urban Pakistani households,
          Alfaisal Grocery Store delivers guaranteed fresh vegetables, organic orchard fruits, unadulterated dairy,
          and daily essentials with supreme care.
        </p>
      </div>

      {/* Story & Image Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4 text-sm text-slate-600 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">
            From Punjab & Sindh Farms Directly to Your Kitchen
          </h2>
          <p>
            Traditional grocery supply chains involve 4 to 6 middlemen, causing leafy greens and seasonal fruits to lose freshness and nutrients while prices inflate. At Alfaisal, we partner directly with certified organic growers in Swat, Pattoki, Sahiwal, and Mirpurkhas.
          </p>
          <p>
            Every morning at 4:30 AM, our procurement team inspects fresh harvests, tests dairy for purity and zero adulteration, and prepares temperature-controlled deliveries for our distribution centers across Lahore, Islamabad, and Karachi.
          </p>
          <p>
            Whether it is stone-ground Chakki Atta, aged Super Kernel Basmati rice, or unpasteurized farm-churned white butter, our products represent genuine Pakistani culinary pride.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src="/src/assets/images/cat_fruits_vegetables_1792608012996.jpg"
              alt="Fresh vegetables and fruits at Alfaisal Grocery"
              referrerPolicy="no-referrer"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="pt-6 border-t border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-6">Our 4 Guiding Principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">100% Farm Transparency</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every vegetable and fruit crate is tagged with its farm source and harvest date.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Pure Food Testing</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Zero water dilution in milk, no artificial wax on apples, and pesticide-tested produce.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">2-Hour Express Delivery</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Insulated temperature-safe vans deliver chilled dairy and frozen goods without spoiling.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Doorstep Inspection</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Inspect your groceries with the rider. If you dislike any item, return it instantly on the spot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
