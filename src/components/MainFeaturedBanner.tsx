"use client";

import React from "react";
import {
  Sparkles,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Car,
  ExternalLink,
  MessageSquare,
  Eye,
  CheckCircle,
  Building,
} from "lucide-react";
import { Property, Currency } from "@/types/property";
import { formatCurrency } from "@/data/properties";

interface MainFeaturedBannerProps {
  property: Property;
  currency: Currency;
  onSelectProperty: (property: Property) => void;
  onContactProperty: (property: Property) => void;
}

export default function MainFeaturedBanner({
  property,
  currency,
  onSelectProperty,
  onContactProperty,
}: MainFeaturedBannerProps) {
  const isRental = property.status === "for-rent";
  const price = currency === "CAD" ? property.priceCad : property.priceUsd;
  const formattedPrice = formatCurrency(price, currency, isRental);

  return (
    <section className="py-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 text-white relative overflow-hidden">
      {/* Luxury Ambient Glow */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Banner Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Cemar Watin&apos;s Exclusive Active Listing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2">
              Featured MLS® Representation
            </h2>
          </div>

          {property.realtorCaUrl && (
            <a
              href={property.realtorCaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto hover:shadow-red-600/30"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Official Listing on REALTOR.ca®</span>
            </a>
          )}
        </div>

        {/* Main Showcase Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-emerald-500/30 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Image Showcase (Left Column) */}
          <div className="lg:col-span-7 relative group cursor-pointer overflow-hidden min-h-[320px] lg:min-h-[460px]" onClick={() => onSelectProperty(property)}>
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

            {/* Badges on top of image */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              <span className="px-3 py-1.5 text-xs font-extrabold rounded-xl uppercase tracking-wider bg-emerald-600 text-white shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Active MLS®
              </span>
              <span className="px-3 py-1.5 text-xs font-bold rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/20">
                {property.mlsNumber}
              </span>
              <span className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-black/60 backdrop-blur-md text-emerald-300 border border-white/20">
                Newtonbrook West
              </span>
            </div>

            {/* Thumbnail Preview bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 z-10">
              {property.images.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className="w-14 h-11 rounded-lg overflow-hidden border border-white/40 shadow-sm opacity-90 hover:opacity-100 transition-opacity"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              <span className="ml-auto text-xs text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg font-medium">
                Click for 4+ Photos
              </span>
            </div>
          </div>

          {/* Details & Action Panel (Right Column) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Address & Neighborhood */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>222 Finch Ave W, Suite 412, North York (Toronto)</span>
              </div>

              {/* Title */}
              <h3
                onClick={() => onSelectProperty(property)}
                className="text-2xl sm:text-3xl font-black text-white hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {property.title}
              </h3>

              {/* Tagline */}
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {property.tagline}
              </p>

              {/* Price Tag */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Asking Price
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                    {formattedPrice}
                  </span>
                </div>
                <div className="text-right text-xs text-slate-300">
                  <span className="font-semibold block">{property.specs.ownershipType}</span>
                  <span className="text-slate-400">Maint: ${property.specs.maintenanceFeesMonthly}/mo</span>
                </div>
              </div>

              {/* 4-Column Key Specs */}
              <div className="grid grid-cols-4 gap-2 my-5 py-3 border-y border-slate-800 text-slate-300">
                <div className="text-center">
                  <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                    <BedDouble className="w-3.5 h-3.5 text-emerald-400" />
                    Bed
                  </span>
                  <span className="font-black text-base text-white mt-0.5 block">
                    {property.specs.bedrooms}
                  </span>
                </div>
                <div className="text-center border-l border-slate-800">
                  <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                    <Bath className="w-3.5 h-3.5 text-emerald-400" />
                    Bath
                  </span>
                  <span className="font-black text-base text-white mt-0.5 block">
                    {property.specs.bathrooms}
                  </span>
                </div>
                <div className="text-center border-l border-slate-800">
                  <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                    Area
                  </span>
                  <span className="font-black text-base text-white mt-0.5 block">
                    {property.specs.areaSqft} <span className="text-[10px] font-normal text-slate-400">sqft</span>
                  </span>
                </div>
                <div className="text-center border-l border-slate-800">
                  <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                    <Car className="w-3.5 h-3.5 text-emerald-400" />
                    Parking
                  </span>
                  <span className="font-black text-base text-white mt-0.5 block">
                    1 + Locker
                  </span>
                </div>
              </div>

              {/* Quick Selling Points */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High ceilings, open-concept with modern quartz island kitchen</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Large south-facing private balcony with sunlit city views</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>TTC bus stop right at front doors direct to Finch Subway Station</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => onContactProperty(property)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-500 hover:to-teal-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-900/40 transition-all transform active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-200" />
                <span>Contact Cemar About 222 Finch</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onSelectProperty(property)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-300" />
                  <span>Full Details</span>
                </button>

                {property.realtorCaUrl && (
                  <a
                    href={property.realtorCaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>REALTOR.ca®</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
