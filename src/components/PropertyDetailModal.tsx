"use client";

import React, { useState } from "react";
import {
  X,
  BedDouble,
  Bath,
  Maximize2,
  Car,
  MapPin,
  Check,
  ShieldCheck,
  Sparkles,
  Calculator,
  Share2,
  MessageSquare,
  Clock,
  Building,
} from "lucide-react";
import { Property, Currency } from "@/types/property";
import { formatCurrency } from "@/data/properties";

interface PropertyDetailModalProps {
  property: Property | null;
  currency: Currency;
  onClose: () => void;
  onContactProperty: (property: Property) => void;
  onCalculateMortgage: (price: number) => void;
}

export default function PropertyDetailModal({
  property,
  currency,
  onClose,
  onContactProperty,
  onCalculateMortgage,
}: PropertyDetailModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!property) return null;

  const isRental = property.status === "for-rent";
  const price = currency === "CAD" ? property.priceCad : property.priceUsd;
  const formattedPrice = formatCurrency(price, currency, isRental);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto border border-slate-200">
        {/* Sticky Header with Title and Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-3 min-w-0">
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg uppercase tracking-wider bg-emerald-600 text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Active MLS®
            </span>
            <span className="text-xs font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200">
              {property.mlsNumber}
            </span>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider text-white ${
                isRental ? "bg-indigo-600" : "bg-slate-900"
              }`}
            >
              {isRental ? "For Lease" : "For Sale"}
            </span>
            <span className="text-xs font-semibold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
              {property.specs.ownershipType}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate hidden md:block">
              {property.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Share property"
            >
              <Share2 className="w-5 h-5" />
            </button>
            {copiedLink && (
              <span className="text-xs text-emerald-600 font-semibold animate-fade-in">
                Link copied!
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={property.images[selectedImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="bg-slate-950/85 backdrop-blur-md px-4 py-2.5 rounded-xl text-white">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                    {formattedPrice}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-300 mt-0.5">
                    <span>{property.specs.buildingType}</span>
                    <span>•</span>
                    <span>{property.specs.ownershipType}</span>
                    {property.specs.maintenanceFeesMonthly && (
                      <>
                        <span>•</span>
                        <span>Maint. Fee: ${property.specs.maintenanceFeesMonthly}/mo</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Currently Active on REALTOR.ca ({property.daysOnMarket}d)</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImageIndex === idx
                        ? "border-emerald-600 scale-105 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title and Address Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>
                {property.location.address}
                {property.location.unitNumber ? `, ${property.location.unitNumber}` : ""},{" "}
                {property.location.city}, {property.location.province} {property.location.postalCode}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {property.title}
            </h1>
            <p className="text-base text-slate-600 font-medium">
              {property.tagline}
            </p>
          </div>

          {/* REALTOR.ca Canadian Property Summary Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-800">
                <BedDouble className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Bedrooms</p>
                <p className="text-lg font-bold text-slate-900">
                  {property.specs.bedrooms} {property.specs.bedroomsPlus ? `+ ${property.specs.bedroomsPlus}` : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-800">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Bathrooms</p>
                <p className="text-lg font-bold text-slate-900">
                  {property.specs.bathrooms} Baths
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-800">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Square Footage</p>
                <p className="text-lg font-bold text-slate-900">
                  {property.specs.areaSqft.toLocaleString()} sqft
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-800">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Parking Total</p>
                <p className="text-lg font-bold text-slate-900">
                  {property.specs.parkingSpaces} Spaces
                </p>
              </div>
            </div>
          </div>

          {/* REALTOR.ca Detailed Building & Financial Specs */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              REALTOR.ca Property Summary &amp; Building Details
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">MLS® Number:</span>
                <span className="font-bold text-slate-900">{property.mlsNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Status:</span>
                <span className="font-bold text-emerald-700">Currently Active</span>
              </div>
              <div>
                <span className="text-slate-500 block">Building Type:</span>
                <span className="font-bold text-slate-900">{property.specs.buildingType}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Title / Ownership:</span>
                <span className="font-bold text-slate-900">{property.specs.ownershipType}</span>
              </div>
              {property.specs.propertyTaxesAnnual && (
                <div>
                  <span className="text-slate-500 block">Annual Property Taxes:</span>
                  <span className="font-bold text-slate-900">
                    ${property.specs.propertyTaxesAnnual.toLocaleString()} / yr
                  </span>
                </div>
              )}
              {property.specs.maintenanceFeesMonthly && (
                <div>
                  <span className="text-slate-500 block">Maintenance / Strata Fees:</span>
                  <span className="font-bold text-slate-900">
                    ${property.specs.maintenanceFeesMonthly.toLocaleString()} / mo
                  </span>
                </div>
              )}
              {property.specs.heatingType && (
                <div>
                  <span className="text-slate-500 block">Heating:</span>
                  <span className="font-bold text-slate-900">{property.specs.heatingType}</span>
                </div>
              )}
              {property.specs.coolingType && (
                <div>
                  <span className="text-slate-500 block">Cooling:</span>
                  <span className="font-bold text-slate-900">{property.specs.coolingType}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description & Key Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Public Remarks
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {property.description}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Property Highlights
                </h3>
                <ul className="space-y-2.5">
                  {property.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Interior &amp; Community Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="truncate">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Landmarks */}
              {property.nearby && property.nearby.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Neighborhood Transit &amp; Amenities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {property.nearby.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                      >
                        <span className="font-semibold text-slate-800">
                          {point.name}
                        </span>
                        <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                          {point.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Sidebar: Realtor Contact Card */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl space-y-5">
                <div className="flex items-center gap-3.5">
                  <img
                    src="/cemar-watin.webp"
                    alt="Cemar Watin, REALTOR®"
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-400"
                  />
                  <div>
                    <h4 className="font-bold text-base text-white">
                      Cemar Watin
                    </h4>
                    <p className="text-xs text-emerald-400 font-medium">
                      REALTOR®
                    </p>
                    <p className="text-[10px] text-slate-400">
                      HomeLife / Miracle Realty Ltd., Brokerage*
                    </p>
                  </div>
                </div>

                <div className="bg-white/95 p-2 rounded-xl flex items-center justify-center">
                  <img
                    src="/homelife-logo.png"
                    alt="HomeLife Miracle Realty"
                    className="h-7 object-contain"
                  />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Interested in this active listing? Send a direct message to Cemar Watin to request status certificate documents, schedule a walk-through, or submit an offer.
                </p>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onContactProperty(property);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Contact Me About This Listing</span>
                  </button>

                  {!isRental && (
                    <button
                      onClick={() => {
                        onClose();
                        onCalculateMortgage(property.priceCad);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                    >
                      <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Estimate Canadian Mortgage</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 text-center font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Direct Routing to cemarwatin@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
