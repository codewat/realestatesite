"use client";

import React from "react";
import {
  BedDouble,
  Bath,
  Maximize2,
  Car,
  MapPin,
  Eye,
  MessageSquare,
  Sparkles,
  Clock,
  Building,
} from "lucide-react";
import { Property, Currency } from "@/types/property";
import { formatCurrency } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
  currency: Currency;
  onSelectProperty: (property: Property) => void;
  onContactProperty: (property: Property) => void;
}

export default function PropertyCard({
  property,
  currency,
  onSelectProperty,
  onContactProperty,
}: PropertyCardProps) {
  const isRental = property.status === "for-rent";
  const price = currency === "CAD" ? property.priceCad : property.priceUsd;
  const formattedPrice = formatCurrency(price, currency, isRental);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image Container with Badges */}
      <div
        className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer"
        onClick={() => onSelectProperty(property)}
      >
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient shadow for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {/* Active Status Badge */}
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg uppercase tracking-wider bg-emerald-600 text-white shadow-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Active MLS®
          </span>

          <span className="px-2 py-1 text-[10px] font-bold rounded-lg bg-black/60 backdrop-blur-md text-slate-100 shadow-sm border border-white/20">
            {property.mlsNumber}
          </span>

          <span
            className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider text-white shadow-sm ${
              isRental ? "bg-indigo-600" : "bg-slate-900"
            }`}
          >
            {isRental ? "For Lease" : "For Sale"}
          </span>
        </div>

        {/* Top Right: Days on Market */}
        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center gap-1 text-[11px] font-semibold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-slate-200 border border-white/10">
            <Clock className="w-3 h-3 text-emerald-400" />
            <span>{property.daysOnMarket}d on REALTOR.ca</span>
          </span>
        </div>

        {/* Bottom Image Overlay: Price & Ownership */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-md text-emerald-300">
              {formattedPrice}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-200">
              <span className="font-semibold">{property.specs.ownershipType}</span>
              {property.specs.maintenanceFeesMonthly && (
                <>
                  <span>•</span>
                  <span>Fee: ${property.specs.maintenanceFeesMonthly}/mo</span>
                </>
              )}
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-[10px] font-semibold uppercase text-slate-300">
            {property.type}
          </span>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Address */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 mb-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-700" />
            <span className="truncate">
              {property.location.address}
              {property.location.unitNumber ? `, ${property.location.unitNumber}` : ""},{" "}
              {property.location.city}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectProperty(property)}
            className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer"
          >
            {property.title}
          </h3>

          {/* Building Type Tag */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span>{property.specs.buildingType}</span>
            <span>•</span>
            <span>{property.location.neighborhood}</span>
          </div>

          {/* Key Specs Pills (REALTOR.ca format) */}
          <div className="grid grid-cols-4 gap-2 my-4 py-3 border-y border-slate-100 text-slate-700">
            <div className="flex flex-col items-center text-center">
              <span className="text-slate-500 text-xs flex items-center gap-1 font-medium">
                <BedDouble className="w-3.5 h-3.5 text-emerald-700" />
                Beds
              </span>
              <span className="font-bold text-sm text-slate-900">
                {property.specs.bedrooms}
                {property.specs.bedroomsPlus ? `+${property.specs.bedroomsPlus}` : ""}
              </span>
            </div>
            <div className="flex flex-col items-center text-center border-l border-slate-100">
              <span className="text-slate-500 text-xs flex items-center gap-1 font-medium">
                <Bath className="w-3.5 h-3.5 text-emerald-700" />
                Baths
              </span>
              <span className="font-bold text-sm text-slate-900">
                {property.specs.bathrooms}
              </span>
            </div>
            <div className="flex flex-col items-center text-center border-l border-slate-100">
              <span className="text-slate-500 text-xs flex items-center gap-1 font-medium">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-700" />
                Area
              </span>
              <span className="font-bold text-sm text-slate-900">
                {property.specs.areaSqft}{" "}
                <span className="text-[10px] text-slate-500 font-normal">sqft</span>
              </span>
            </div>
            <div className="flex flex-col items-center text-center border-l border-slate-100">
              <span className="text-slate-500 text-xs flex items-center gap-1 font-medium">
                <Car className="w-3.5 h-3.5 text-emerald-700" />
                Parking
              </span>
              <span className="font-bold text-sm text-slate-900">
                {property.specs.parkingSpaces}
              </span>
            </div>
          </div>
        </div>

        {/* Footer: Realtor info + Actions */}
        <div className="pt-2 flex items-center justify-between gap-2">
          {/* Agent Badge */}
          <div className="flex items-center gap-2 min-w-0">
            <img
              src="/cemar-watin.webp"
              alt="Cemar Watin, REALTOR®"
              className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">
                Cemar Watin
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                REALTOR® • HomeLife
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onContactProperty(property)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
              title="Contact Cemar about this listing"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Me</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectProperty(property)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
