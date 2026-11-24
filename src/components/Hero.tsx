"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Home,
  BedDouble,
  ShieldCheck,
  Award,
  Sparkles,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { FilterState, PropertyType, ListingStatus } from "@/types/property";

interface HeroProps {
  filters: FilterState;
  onUpdateFilters: (updates: Partial<FilterState>) => void;
  onSearchSubmit: () => void;
  onOpenContact: () => void;
}

export default function Hero({
  filters,
  onUpdateFilters,
  onSearchSubmit,
  onOpenContact,
}: HeroProps) {
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);

  const handleStatusChange = (status: ListingStatus) => {
    onUpdateFilters({ status });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFilters({ searchQuery: localSearch });
    onSearchSubmit();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-20 sm:pt-24 lg:pt-28 pb-16 lg:pb-24 border-b border-slate-800">
      {/* Subtle luxury ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Realtor Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Text Column */}
          <div className="lg:col-span-8 text-center lg:text-left space-y-5">
            {/* Brokerage & Realtor Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>HomeLife / Miracle Realty Ltd., Brokerage*</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Higher Standards™ • Toronto &amp; GTA</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Your Trusted Toronto &amp; GTA Real Estate Partner:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Cemar Watin, REALTOR®
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl leading-relaxed">
              Guiding buyers, sellers, and investors with integrity and high professional standards across Toronto, Mississauga, Oakville, North York, Markham, and the GTA.
            </p>

            {/* Direct Contact Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onOpenContact}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all transform active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Me</span>
              </button>
              <a
                href="#calculator"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
              >
                <span>Canadian Mortgage Calculator</span>
              </a>
            </div>
          </div>

          {/* Right Realtor Spotlight Card (NO phone or email displayed) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/80 shadow-2xl space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-800 border-2 border-emerald-500/30">
                <img
                  src="/cemar-watin.webp"
                  alt="Cemar Watin, REALTOR®"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-xl text-amber-300 text-xs font-bold flex items-center gap-1 shadow-md">
                  <span>★★★★★</span>
                  <span className="text-[10px] text-white">5.0 GTA</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-white">
                    Cemar Watin
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    REALTOR®
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 font-medium">
                  HomeLife / Miracle Realty Ltd., Brokerage*
                </p>

                {/* Brokerage Logo inside card */}
                <div className="mt-3 p-2 rounded-xl bg-white/95 flex items-center justify-center">
                  <img
                    src="/homelife-logo.png"
                    alt="HomeLife Miracle Realty Ltd., Brokerage*"
                    className="h-8 object-contain"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/80">
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send a Message to Cemar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Search Card */}
        <div className="w-full bg-white rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-800 border border-slate-100">
          {/* Status Tabs (Buy / Rent / All) */}
          <div className="flex items-center justify-start gap-2 mb-5 border-b border-slate-200 pb-3">
            <button
              type="button"
              onClick={() => handleStatusChange("for-sale")}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                filters.status === "for-sale"
                  ? "bg-emerald-700 text-white shadow"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              For Sale
            </button>
            <button
              type="button"
              onClick={() => handleStatusChange("for-rent")}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                filters.status === "for-rent"
                  ? "bg-emerald-700 text-white shadow"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              For Lease / Rent
            </button>
            <button
              type="button"
              onClick={() => onUpdateFilters({ status: "all" })}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filters.status === "all"
                  ? "bg-slate-900 text-white shadow"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              All Listings
            </button>
          </div>

          {/* Search Inputs Grid */}
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            {/* Location Filter */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                GTA Location
              </label>
              <select
                value={filters.city}
                onChange={(e) => onUpdateFilters({ city: e.target.value })}
                className="w-full bg-slate-100 hover:bg-slate-200/80 focus:bg-white text-slate-800 text-sm font-semibold rounded-xl px-3 py-2.5 outline-none border border-transparent focus:border-emerald-600 transition-all cursor-pointer"
              >
                <option value="all">All GTA (Greater Toronto Area)</option>
                <option value="Toronto">Downtown Toronto (Yorkville / Waterfront)</option>
                <option value="North York">North York (Willowdale / Bayview)</option>
                <option value="Mississauga">Mississauga (Port Credit / Square One)</option>
                <option value="Oakville">Oakville (Eastlake / Lakeshore)</option>
                <option value="Markham">Markham (Unionville)</option>
              </select>
            </div>

            {/* Property Type Filter */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-emerald-700" />
                Property Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  onUpdateFilters({
                    type: e.target.value as "all" | PropertyType,
                  })
                }
                className="w-full bg-slate-100 hover:bg-slate-200/80 focus:bg-white text-slate-800 text-sm font-semibold rounded-xl px-3 py-2.5 outline-none border border-transparent focus:border-emerald-600 transition-all cursor-pointer"
              >
                <option value="all">All Property Types</option>
                <option value="detached">Detached Home</option>
                <option value="condo">Condominium Suite</option>
                <option value="penthouse">Luxury Penthouse</option>
                <option value="townhouse">Executive Townhouse</option>
                <option value="semi-detached">Semi-Detached</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-emerald-700" />
                Bedrooms
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) =>
                  onUpdateFilters({
                    bedrooms:
                      e.target.value === "any"
                        ? "any"
                        : parseInt(e.target.value, 10),
                  })
                }
                className="w-full bg-slate-100 hover:bg-slate-200/80 focus:bg-white text-slate-800 text-sm font-semibold rounded-xl px-3 py-2.5 outline-none border border-transparent focus:border-emerald-600 transition-all cursor-pointer"
              >
                <option value="any">Any Bedrooms</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>

            {/* Submit Action */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-800/20 transition-all duration-200 transform active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Search REALTOR.ca Listings</span>
              </button>
            </div>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-300 text-xs sm:text-sm font-medium">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Toronto Regional Real Estate Board (TRREB) MLS®</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>HomeLife Higher Standards™ Representation</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>RECO Registered &amp; Insured REALTOR®</span>
          </div>
        </div>
      </div>
    </section>
  );
}
