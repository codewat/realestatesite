"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  Globe,
  MessageSquare,
} from "lucide-react";
import { Currency } from "@/types/property";

interface NavbarProps {
  currency: Currency;
  onCurrencyToggle: () => void;
  onOpenContact: () => void;
}

export default function Navbar({
  currency,
  onCurrencyToggle,
  onOpenContact,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Active Listings", href: "#properties" },
    { label: "GTA Communities", href: "#neighborhoods" },
    { label: "Mortgage Calculator", href: "#calculator" },
    { label: "About Cemar", href: "#about-realtor" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Top Branding: Cemar Watin, REALTOR® + HomeLife Brokerage */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative">
              <img
                src="/cemar-watin.webp"
                alt="Cemar Watin, REALTOR®"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-emerald-600/40 shadow group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-600" title="Active REALTOR® in Toronto" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Cemar Watin, <span className="text-emerald-700">REALTOR®</span>
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <img
                  src="/homelife-logo.png"
                  alt="HomeLife Higher Standards"
                  className="h-5 sm:h-6 object-contain"
                />
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Currency Switcher (CAD / USD) */}
            <button
              onClick={onCurrencyToggle}
              title="Toggle Currency (CAD / USD)"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{currency}</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                $
              </span>
            </button>

            {/* Contact Me CTA Button */}
            <button
              onClick={onOpenContact}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 text-sm font-bold shadow-sm hover:shadow transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Me</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onCurrencyToggle}
              className="px-2 py-1 text-xs font-semibold rounded border border-slate-200 bg-slate-100 text-slate-700"
            >
              {currency} ($)
            </button>
            <button
              onClick={onOpenContact}
              className="p-2 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold"
            >
              Contact
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800"
            >
              <MessageSquare className="w-4 h-4" />
              Contact Cemar Watin
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
