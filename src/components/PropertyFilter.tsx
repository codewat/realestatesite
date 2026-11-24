"use client";

import React from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  Check,
  MapPin,
} from "lucide-react";
import { FilterState, PropertyType } from "@/types/property";

interface PropertyFilterProps {
  filters: FilterState;
  onUpdateFilters: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export default function PropertyFilter({
  filters,
  onUpdateFilters,
  onResetFilters,
  totalResults,
}: PropertyFilterProps) {
  const categoryPills: { label: string; type: "all" | PropertyType }[] = [
    { label: "All Properties", type: "all" },
    { label: "Detached Homes", type: "detached" },
    { label: "Condominium Suites", type: "condo" },
    { label: "Penthouses", type: "penthouse" },
    { label: "Townhouses", type: "townhouse" },
    { label: "Semi-Detached", type: "semi-detached" },
  ];

  const cityPills = [
    { label: "All GTA", value: "all" },
    { label: "Toronto", value: "Toronto" },
    { label: "North York", value: "North York" },
    { label: "Mississauga", value: "Mississauga" },
    { label: "Oakville", value: "Oakville" },
    { label: "Markham", value: "Markham" },
  ];

  const hasActiveFilters =
    filters.searchQuery !== "" ||
    filters.type !== "all" ||
    filters.status !== "all" ||
    filters.city !== "all" ||
    filters.bedrooms !== "any" ||
    filters.sortBy !== "featured";

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm mb-8">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-slate-100">
        {categoryPills.map((pill) => {
          const isActive = filters.type === pill.type;
          return (
            <button
              key={pill.label}
              onClick={() =>
                onUpdateFilters({
                  type: pill.type,
                })
              }
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* City / Location Quick Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none border-b border-slate-100 text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
          <MapPin className="w-3 h-3 text-emerald-600" />
          Location:
        </span>
        {cityPills.map((city) => {
          const isActive = filters.city === city.value;
          return (
            <button
              key={city.label}
              type="button"
              onClick={() => onUpdateFilters({ city: city.value })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
              }`}
            >
              {city.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Controls Bar */}
      <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by neighborhood, street (e.g. Yorkville, Willowdale, Port Credit)..."
            value={filters.searchQuery}
            onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onUpdateFilters({ searchQuery: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort and Count */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
            <span>Sort by:</span>
          </div>

          <select
            value={filters.sortBy}
            onChange={(e) =>
              onUpdateFilters({
                sortBy: e.target.value as FilterState["sortBy"],
              })
            }
            className="bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 outline-none border border-slate-200 cursor-pointer focus:border-emerald-600 transition-all"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="area-desc">Largest Square Footage</option>
            <option value="newest">Recently Listed</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-900 font-bold">{totalResults}</strong> GTA property {totalResults === 1 ? "listing" : "listings"}
        </span>
        <span className="hidden sm:inline-block text-emerald-700 font-semibold flex items-center gap-1">
          <Check className="w-3.5 h-3.5" /> TRREB MLS® Verified Data
        </span>
      </div>
    </div>
  );
}
