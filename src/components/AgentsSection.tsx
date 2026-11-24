import React from "react";
import { Star, MessageSquare, CheckCircle, ShieldCheck } from "lucide-react";

interface AgentsSectionProps {
  onOpenContact: () => void;
}

export default function AgentsSection({ onOpenContact }: AgentsSectionProps) {
  return (
    <section id="about-realtor" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Photo Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border-4 border-emerald-500/40 shadow-2xl bg-slate-800">
                <img
                  src="/cemar-watin.webp"
                  alt="Cemar Watin, REALTOR®"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Cemar Watin</p>
                    <p className="text-[11px] text-emerald-400 font-semibold">REALTOR®</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Top-Rated REALTOR®</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio & Details Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Licensed Canadian REALTOR®</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Meet Cemar Watin, <span className="text-emerald-400">REALTOR®</span>
                </h2>
                <div className="flex items-center gap-3 pt-1">
                  <div className="bg-white/95 px-3 py-1.5 rounded-xl flex items-center">
                    <img
                      src="/homelife-logo.png"
                      alt="HomeLife / Miracle Realty Ltd., Brokerage*"
                      className="h-7 object-contain"
                    />
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                As an active REALTOR® representing <strong>HomeLife / Miracle Realty Ltd., Brokerage*</strong> in Toronto and the Greater Toronto Area, Cemar Watin is committed to the highest standard of service. Specializing in residential resale, pre-construction developments, luxury condominiums, and commercial investment acquisitions.
              </p>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Toronto Regional Real Estate Board (TRREB) MLS® Access</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Complimentary Comparative Market Evaluation</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Skilled Offer Drafting &amp; Negotiations</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>End-to-End Closing &amp; Inspection Guidance</span>
                </div>
              </div>

              {/* Contact Button */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-300 space-y-1">
                  <p className="font-semibold text-white">Have questions about buying or selling?</p>
                  <p className="text-slate-400">Click below to send a direct message. Messages are delivered to Cemar's inbox immediately.</p>
                </div>

                <button
                  type="button"
                  onClick={onOpenContact}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 transition-all text-center flex items-center justify-center gap-2 shrink-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Me</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
