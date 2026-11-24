"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilter from "@/components/PropertyFilter";
import PropertyDetailModal from "@/components/PropertyDetailModal";
import ContactModal from "@/components/ContactModal";
import MortgageCalculator from "@/components/MortgageCalculator";
import NeighborhoodsSection from "@/components/NeighborhoodsSection";
import AgentsSection from "@/components/AgentsSection";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";
import { Property, Currency, FilterState } from "@/types/property";
import { Sparkles, ArrowRight, SearchX } from "lucide-react";

export default function HomePage() {
  const [currency, setCurrency] = useState<Currency>("CAD");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
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
    const element = document.getElementById("calculator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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

  const featuredProperties = useMemo(() => {
    return properties.filter((p) => p.featured);
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
      />

      <main className="flex-1">
        {/* Hero Section: Clean solid gradient background (no image) + Cemar Watin spotlight */}
        <Hero
          filters={filters}
          onUpdateFilters={updateFilters}
          onSearchSubmit={scrollToProperties}
          onOpenContact={() => handleOpenContact()}
        />

        {/* Real Estate Sales & Trust Stats */}
        <StatsSection />

        {/* Featured Showcase Highlight Section */}
        <section id="featured" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Active Toronto &amp; GTA MLS® Listings</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Featured Active Properties
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
                Explore currently active residential and condominium properties in Toronto and the GTA on REALTOR.ca.
              </p>
            </div>
            <button
              onClick={scrollToProperties}
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-900 transition-colors"
            >
              <span>View all active properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 3).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                currency={currency}
                onSelectProperty={setSelectedProperty}
                onContactProperty={handleOpenContact}
              />
            ))}
          </div>
        </div>
      </section>

        {/* Main Property Listings Grid with Advanced Filters */}
        <section id="properties" className="py-16 bg-slate-100/70 border-t border-slate-200">
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
                Filtered by location (Toronto, North York, Mississauga, Oakville, Markham), property type, and bedrooms.
              </p>
            </div>

            {/* Filter Bar Component */}
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

        {/* Neighborhood Guides */}
        <NeighborhoodsSection
          onSelectCityFilter={(city) => {
            updateFilters({ city });
            scrollToProperties();
          }}
        />

        {/* Interactive Canadian Mortgage Calculator */}
        <MortgageCalculator initialPrice={calculatorPrice} />

        {/* About Cemar Watin, REALTOR® */}
        <AgentsSection onOpenContact={() => handleOpenContact()} />
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
    </div>
  );
}
