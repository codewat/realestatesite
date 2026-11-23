import React from "react";
import { Star, Quote, CheckCircle } from "lucide-react";
import { clientTestimonials } from "@/data/properties";

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="py-20 bg-slate-100/60 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            <Star className="w-4 h-4 fill-current text-amber-500" />
            <span>Client Experiences &amp; Trust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Endorsed by Discerning Homeowners
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Hear from prominent business owners, overseas executives, and families who acquired their sanctuary through our agency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clientTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-100">
                <img
                  src={item.avatar}
                  alt={item.client}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    {item.client}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                  </h4>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
