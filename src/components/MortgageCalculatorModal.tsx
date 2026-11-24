"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calculator,
  ShieldCheck,
} from "lucide-react";
import { calculateMortgage } from "@/data/properties";

interface MortgageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrice?: number;
  onOpenContact: () => void;
}

export default function MortgageCalculatorModal({
  isOpen,
  onClose,
  initialPrice = 1250000,
  onOpenContact,
}: MortgageCalculatorModalProps) {
  const [propertyPrice, setPropertyPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(4.89);
  const [loanTermYears, setLoanTermYears] = useState(25);

  useEffect(() => {
    if (initialPrice && initialPrice > 0) {
      setPropertyPrice(initialPrice);
    }
  }, [initialPrice]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const calc = calculateMortgage(
    propertyPrice,
    downPaymentPercent,
    interestRate,
    loanTermYears
  );

  const estPropertyTaxAndIns = Math.round((propertyPrice * 0.0075) / 12);
  const totalMonthlyOutlay = calc.monthlyPayment + estPropertyTaxAndIns;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Canadian Mortgage Calculator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Toronto &amp; GTA Payment Planner
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Estimate monthly payments based on Canadian chartered bank rates (RBC, TD, Scotiabank, BMO, CIBC).
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close calculator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6">
          {/* Purchase Price */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Purchase Price (CAD)
              </label>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-400">
                ${propertyPrice.toLocaleString()} CAD
              </span>
            </div>
            <input
              type="range"
              min="400000"
              max="5000000"
              step="25000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>$400K (Condo)</span>
              <span>$1.5M (Townhome / Semi)</span>
              <span>$5.0M+ (Luxury Detached)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Down Payment */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="text-sm font-bold text-white">
                  ${calc.downPayment.toLocaleString()} CAD
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Interest Rate (5-Yr Fixed)
                </label>
                <span className="text-sm font-bold text-emerald-400">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="2.5"
                max="8.0"
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          {/* Amortization Term */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Amortization Period
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[25, 30].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setLoanTermYears(term)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    loanTermYears === term
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {term} Years (Standard Canadian)
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Payment Summary Box */}
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">
                  Estimated Principal &amp; Interest
                </p>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  ${Math.round(calc.monthlyPayment).toLocaleString()}
                  <span className="text-xs font-normal text-slate-400"> /mo</span>
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs text-slate-400 font-semibold uppercase">
                  Total Est. Monthly Outlay
                </p>
                <p className="text-xl sm:text-2xl font-black text-emerald-400">
                  ${totalMonthlyOutlay.toLocaleString()}
                  <span className="text-xs font-normal text-emerald-300/70"> /mo</span>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/70 grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div>
                <span className="text-slate-400">Mortgage Loan:</span>{" "}
                <strong className="text-white">${calc.principal.toLocaleString()} CAD</strong>
              </div>
              <div>
                <span className="text-slate-400">Taxes &amp; Insurance:</span>{" "}
                <strong className="text-white">~${estPropertyTaxAndIns.toLocaleString()}/mo</strong>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all transform active:scale-95 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Connect with Cemar Watin &amp; Preferred Canadian Lenders</span>
          </button>

          <p className="text-[10px] text-slate-500 text-center">
            *Estimates for illustration only. Rates and qualifying criteria subject to lender approval (O.A.C.).
          </p>
        </div>
      </div>
    </div>
  );
}
