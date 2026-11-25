"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilter from "@/components/PropertyFilter";
import PropertyDetailModal from "@/components/PropertyDetailModal";
import ContactModal from "@/components/ContactModal";
import MortgageCalculatorModal from "@/components/MortgageCalculatorModal";
import MainFeaturedBanner from "@/components/MainFeaturedBanner";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";
import { Property, Currency, FilterState } from "@/types/property";
import { SearchX } from "lucide-react";

export default function HomePage() {
  const [currency, setCurrency] = useState<Currency>("CAD");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [contactTargetProperty, setContactTargetProperty] = useState<Property | null>(null);
  const [calculatorPrice, setCalculatorPrice] = useState<number>(1450000);

  const initialFilters: FilterState = {
    searchQuery: "",
    status: "all",
    type: "all",
    city: "all",
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: "any",
    sortBy: "featured",
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const handleOpenContact = (property?: Property) => {
    setContactTargetProperty(property || null);
    setIsContactModalOpen(true);
  };

  const handleCalculateMortgage = (price: number) => {
    setCalculatorPrice(price);
    setIsCalculatorModalOpen(true);
  };

  const scrollToProperties = () => {
    const el = document.getElementById("properties");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filtered & Sorted Properties (All currently active on REALTOR.ca)
  const filteredProperties = useMemo(() => {
    return properties
      .filter((prop) => {
        // Search query
        if (filters.searchQuery.trim() !== "") {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = prop.title.toLowerCase().includes(q);
          const matchMls = prop.mlsNumber.toLowerCase().includes(q);
          const matchCity = prop.location.city.toLowerCase().includes(q);
          const matchAddress = prop.location.address.toLowerCase().includes(q);
          const matchTagline = prop.tagline.toLowerCase().includes(q);
          const matchAmenities = prop.amenities.some((a) =>
            a.toLowerCase().includes(q)
          );
          if (!matchTitle && !matchMls && !matchCity && !matchAddress && !matchTagline && !matchAmenities) {
            return false;
          }
        }

        // Status
        if (filters.status !== "all" && prop.status !== filters.status) {
          return false;
        }

        // Type
        if (filters.type !== "all" && prop.type !== filters.type) {
          return false;
        }

        // City
        if (filters.city !== "all") {
          const cityQuery = filters.city.toLowerCase();
          const propCity = `${prop.location.city} ${prop.location.address} ${prop.location.neighborhood}`.toLowerCase();
          if (!propCity.includes(cityQuery)) {
            return false;
          }
        }

        // Bedrooms
        if (filters.bedrooms !== "any" && prop.specs.bedrooms < filters.bedrooms) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Cemar's own listing is always pinned first
        if (a.isCemarListing && !b.isCemarListing) return -1;
        if (!a.isCemarListing && b.isCemarListing) return 1;

        if (filters.sortBy === "featured") {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.priceCad - a.priceCad;
        }
        if (filters.sortBy === "price-asc") {
          return a.priceCad - b.priceCad;
        }
        if (filters.sortBy === "price-desc") {
          return b.priceCad - a.priceCad;
        }
        if (filters.sortBy === "area-desc") {
          return b.specs.areaSqft - a.specs.areaSqft;
        }
        if (filters.sortBy === "newest") {
          return a.daysOnMarket - b.daysOnMarket;
        }
        return 0;
      });
  }, [filters]);

  const mainFeaturedProperty = useMemo(() => {
    return properties.find((p) => p.isCemarListing) || properties[0];
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 selection:bg-emerald-600 selection:text-white">
      {/* Floating Navigation Bar */}
      <Navbar
        currency={currency}
        onCurrencyToggle={() =>
          setCurrency((prev) => (prev === "CAD" ? "USD" : "CAD"))
        }
        onOpenContact={() => handleOpenContact()}
        onOpenCalculator={() => setIsCalculatorModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section: Clean solid gradient background (no image) + Cemar Watin spotlight */}
        <Hero
          filters={filters}
          onUpdateFilters={updateFilters}
          onSearchSubmit={scrollToProperties}
          onOpenContact={() => handleOpenContact()}
          onOpenCalculator={() => setIsCalculatorModalOpen(true)}
        />

        {/* Real Estate Sales & Trust Stats */}
        <StatsSection />

        {/* Cemar Watin's Own Active Listing Main Feature Showcase */}
        {mainFeaturedProperty && (
          <MainFeaturedBanner
            property={mainFeaturedProperty}
            currency={currency}
            onSelectProperty={setSelectedProperty}
            onContactProperty={handleOpenContact}
          />
        )}

        {/* Main Property Listings Grid with Advanced Filters & Community Chips */}
        <section id="properties" className="py-16 bg-slate-100/80 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Active on REALTOR.ca / TRREB MLS®
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Currently Active GTA Properties
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Browse verified residential homes, condominiums, and luxury properties in Toronto, North York, Mississauga, Oakville, and Markham.
              </p>
            </div>

            {/* Filter Bar Component with Category & Community Location Chips */}
            <PropertyFilter
              filters={filters}
              onUpdateFilters={updateFilters}
              onResetFilters={resetFilters}
              totalResults={filteredProperties.length}
            />

            {/* Property Cards Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    currency={currency}
                    onSelectProperty={setSelectedProperty}
                    onContactProperty={handleOpenContact}
                  />
                ))}
              </div>
            ) : (
              /* Empty Search State */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  No properties matched your criteria
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Try adjusting your search keywords, selecting &quot;All Properties&quot;, or clearing bedroom filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenContact={() => handleOpenContact()} />

      {/* Property Details Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        currency={currency}
        onClose={() => setSelectedProperty(null)}
        onContactProperty={handleOpenContact}
        onCalculateMortgage={handleCalculateMortgage}
      />

      {/* Direct Contact Me Modal (Dispatches to cemarwatin@gmail.com) */}
      <ContactModal
        property={contactTargetProperty}
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false);
          setContactTargetProperty(null);
        }}
      />

      {/* Interactive Canadian Mortgage Calculator Modal */}
      <MortgageCalculatorModal
        isOpen={isCalculatorModalOpen}
        onClose={() => setIsCalculatorModalOpen(false)}
        initialPrice={calculatorPrice}
        onOpenContact={() => handleOpenContact()}
      />
    </div>
  );
}
