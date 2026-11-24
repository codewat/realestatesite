"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  Globe,
  MessageSquare,
  Home,
  MapPin,
  Calculator,
  User,
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
    { label: "Active Listings", href: "#properties", icon: Home },
    { label: "GTA Communities", href: "#neighborhoods", icon: MapPin },
    { label: "Mortgage Calculator", href: "#calculator", icon: Calculator },
    { label: "About Cemar", href: "#about-realtor", icon: User },
  ];

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 w-full px-3 sm:px-6 pointer-events-none transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 pointer-events-auto">
        {/* Left: Brand Floating Button Card with Shadow */}
        <a
          href="#"
          className="flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.35),0_4px_10px_-2px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_36px_-4px_rgba(0,0,0,0.45)] transition-all transform hover:-translate-y-0.5 group shrink-0"
        >
          <div className="relative">
            <img
              src="/cemar-watin.webp"
              alt="Cemar Watin, REALTOR®"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-emerald-600/40 shadow-sm group-hover:scale-105 transition-transform"
            />
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-600"
              title="Active REALTOR® in Toronto"
            />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
              Cemar Watin, <span className="text-emerald-700">REALTOR®</span>
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <img
                src="/homelife-logo.png"
                alt="HomeLife Higher Standards"
                className="h-3.5 sm:h-4.5 object-contain"
              />
            </div>
          </div>
        </a>

        {/* Center: Floating Navigation Buttons Dock with Shadow */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.35),0_4px_10px_-2px_rgba(0,0,0,0.2)]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-800 rounded-full bg-slate-50/90 hover:bg-white border border-slate-200/70 hover:border-emerald-600/30 shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Icon className="w-3.5 h-3.5 text-emerald-700" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Floating Currency & Contact Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Currency Toggle Floating Button */}
          <button
            onClick={onCurrencyToggle}
            title="Toggle Currency (CAD / USD)"
            className="flex items-center gap-1 px-3 sm:px-3.5 py-2 text-xs font-bold rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.35),0_4px_10px_-2px_rgba(0,0,0,0.2)] hover:shadow-lg text-slate-700 hover:text-emerald-700 transition-all transform hover:-translate-y-0.5"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">{currency}</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-extrabold">
              $
            </span>
          </button>

          {/* Contact Me Floating Button with Vibrant Emerald Shadow */}
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white hover:from-emerald-500 hover:to-teal-700 text-xs sm:text-sm font-extrabold shadow-[0_12px_30px_-4px_rgba(5,150,105,0.6)] hover:shadow-[0_16px_36px_-3px_rgba(5,150,105,0.7)] transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200" />
            <span>Contact Me</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.35)] text-slate-700 hover:text-slate-900 transition-all"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Floating Island) */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto max-w-sm mx-auto mt-2 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 p-4 space-y-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] animate-fade-in">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-sm font-bold text-slate-700 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 shadow-sm transition-all"
                >
                  <Icon className="w-4 h-4 text-emerald-700" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-700/30 hover:bg-emerald-800 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Cemar Watin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
