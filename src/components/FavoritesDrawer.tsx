"use client";

import React from "react";
import { X, Heart, Eye, Trash2, ArrowRight } from "lucide-react";
import { Property, Currency } from "@/types/property";
import { formatCurrency } from "@/data/properties";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteProperties: Property[];
  currency: Currency;
  onSelectProperty: (property: Property) => void;
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
}

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favoriteProperties,
  currency,
  onSelectProperty,
  onRemoveFavorite,
  onClearAll,
}: FavoritesDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h3 className="font-bold text-base">Saved Properties</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                {favoriteProperties.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {favoriteProperties.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800">No saved properties yet</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the heart icon on any property listing to save it here for quick review or comparison.
                </p>
              </div>
            ) : (
              favoriteProperties.map((property) => {
                const isRental = property.status === "for-rent";
                const price =
                  currency === "CAD" ? property.priceCad : property.priceUsd;
                const formattedPrice = formatCurrency(price, currency, isRental);

                return (
                  <div
                    key={property.id}
                    className="flex gap-3 p-3 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all bg-white hover:shadow-md"
                  >
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-24 h-24 rounded-xl object-cover shrink-0 cursor-pointer"
                      onClick={() => {
                        onClose();
                        onSelectProperty(property);
                      }}
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {property.type}
                          </span>
                          <button
                            onClick={() => onRemoveFavorite(property.id)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4
                          onClick={() => {
                            onClose();
                            onSelectProperty(property);
                          }}
                          className="font-bold text-xs text-slate-900 truncate mt-1 cursor-pointer hover:text-emerald-700"
                        >
                          {property.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          {property.location.city}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="font-extrabold text-xs text-slate-900">
                          {formattedPrice}
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectProperty(property);
                          }}
                          className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5"
                        >
                          View <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {favoriteProperties.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={onClearAll}
                className="text-xs font-semibold text-rose-600 hover:underline"
              >
                Clear all favorites
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800"
              >
                Close Drawer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
