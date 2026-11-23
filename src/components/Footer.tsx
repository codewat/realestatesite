"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Check,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/cemar-watin.webp"
                alt="Cemar Watin, REALTOR®"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/50"
              />
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  Cemar Watin, <span className="text-emerald-400">REALTOR®</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  HomeLife / Miracle Realty Ltd., Brokerage*
                </span>
              </div>
            </div>

            <div className="bg-white/95 p-2 rounded-xl inline-block">
              <img
                src="/homelife-logo.png"
                alt="HomeLife Miracle Realty Ltd., Brokerage*"
                className="h-7 object-contain"
              />
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Dedicated real estate advisory across the Greater Toronto Area. Member of the Toronto Regional Real Estate Board (TRREB), Ontario Real Estate Association (OREA), and the Canadian Real Estate Association (CREA).
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Higher Standards™ • Licensed REALTOR® Representation</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              GTA MLS® Listings
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#properties" className="hover:text-emerald-400 transition-colors">
                  Downtown Toronto Condos
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-emerald-400 transition-colors">
                  North York Detached Homes
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-emerald-400 transition-colors">
                  Mississauga Waterfront Townhomes
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-emerald-400 transition-colors">
                  Oakville Luxury Estates
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-emerald-400 transition-colors">
                  Executive GTA Leases
                </a>
              </li>
            </ul>
          </div>

          {/* Brokerage & Direct Contact Button */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Get in Touch
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Send your inquiry directly to Cemar Watin. Fast response guaranteed.
            </p>
            <button
              onClick={onOpenContact}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Me</span>
            </button>
            <p className="text-[11px] text-slate-500">
              HomeLife / Miracle Realty Ltd., Brokerage*
              <br />Greater Toronto Area, Ontario, Canada
            </p>
          </div>

          {/* VIP Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              GTA Market Reports
            </h4>
            <p className="text-xs text-slate-400">
              Get direct alerts for new TRREB MLS® listings, price changes, and quarterly market updates.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Thank you! You are subscribed to GTA alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Cemar Watin, REALTOR® | HomeLife / Miracle Realty Ltd., Brokerage*. *Independently Owned and Operated. Not intended to solicit properties already listed for sale.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300">REALTOR.ca® Terms of Use</a>
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">REALTOR® Code of Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
