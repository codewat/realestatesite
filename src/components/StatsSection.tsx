import React from "react";
import { TrendingUp, Award, Building, Users } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      value: "$120M+",
      label: "GTA Sales Volume",
      description: "Successfully represented buyers & sellers across the Greater Toronto Area",
    },
    {
      icon: Building,
      value: "250+",
      label: "Homes Transacted",
      description: "Detached homes, townhomes, and luxury Toronto condominiums",
    },
    {
      icon: Users,
      value: "99.4%",
      label: "Client Satisfaction",
      description: "Trusted referrals from repeat clients and families across Ontario",
    },
    {
      icon: Award,
      value: "Higher Standards",
      label: "HomeLife / Miracle Realty",
      description: "Top-producing full-service Canadian real estate brokerage",
    },
  ];

  return (
    <section className="bg-slate-900 border-y border-slate-800 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-emerald-400 mt-1">
                  {stat.label}
                </span>
                <p className="text-xs text-slate-400 mt-1 max-w-[200px] hidden sm:block">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
