import React from "react";
import { MapPin, ArrowUpRight, Compass } from "lucide-react";
import { neighborhoodGuides } from "@/data/properties";

interface NeighborhoodsSectionProps {
  onSelectCityFilter: (city: string) => void;
}

export default function NeighborhoodsSection({
  onSelectCityFilter,
}: NeighborhoodsSectionProps) {
  return (
    <section id="neighborhoods" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>Greater Toronto Area Communities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Premier GTA Neighborhoods
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              From the vibrant energy of Downtown Toronto and Yorkville to family sanctuaries in North York, Mississauga, and Oakville.
            </p>
          </div>
        </div>

        {/* Neighborhood Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {neighborhoodGuides.map((guide, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCityFilter(guide.city.split(",")[0])}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 aspect-[4/5] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Image */}
              <img
                src={guide.image}
                alt={guide.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-black/60 backdrop-blur-md text-emerald-300 border border-white/10">
                  {guide.propertyCount}
                </span>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {guide.city}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                  {guide.name}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                  {guide.tagline}
                </p>

                {/* Lifestyle Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
                  {guide.lifestyle.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
