"use client";

import React, { useState, useEffect } from "react";
import {
  Calculator,
  ShieldCheck,
} from "lucide-react";
import { calculateMortgage } from "@/data/properties";

interface MortgageCalculatorProps {
  initialPrice?: number;
}

export default function MortgageCalculator({
  initialPrice = 1250000,
}: MortgageCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(4.89);
  const [loanTermYears, setLoanTermYears] = useState(25);

  useEffect(() => {
    if (initialPrice && initialPrice > 0) {
      setPropertyPrice(initialPrice);
    }
  }, [initialPrice]);

  const calc = calculateMortgage(
    propertyPrice,
    downPaymentPercent,
    interestRate,
    loanTermYears
  );

  const estPropertyTaxAndIns = Math.round((propertyPrice * 0.0075) / 12);
  const totalMonthlyOutlay = calc.monthlyPayment + estPropertyTaxAndIns;

  return (
    <section id="calculator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Background Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Canadian Mortgage &amp; Payment Planner
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Toronto &amp; GTA Mortgage Calculator
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Estimate your monthly payments based on Canadian chartered bank rates (RBC, TD, Scotiabank, BMO, CIBC). Features standard 25 and 30-year amortization periods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-xl space-y-6">
            {/* Property Price */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Purchase Price (CAD)
                </label>
                <span className="text-xl font-extrabold text-emerald-400">
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

            {/* Down Payment */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="text-lg font-bold text-white">
                  ${calc.downPayment.toLocaleString()} CAD
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex gap-2 mt-2">
                {[5, 10, 15, 20, 25, 30].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPaymentPercent(pct)}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                      downPaymentPercent === pct
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
              {downPaymentPercent < 20 && (
                <p className="text-[11px] text-amber-300 mt-1.5">
                  *Down payments under 20% in Canada require CMHC mortgage loan insurance.
                </p>
              )}
            </div>

            {/* Amortization and Interest Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Amortization Period
                </label>
                <select
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(Number(e.target.value))}
                  className="w-full bg-slate-700 text-white font-bold text-sm rounded-xl px-4 py-2.5 outline-none border border-slate-600 focus:border-emerald-500 cursor-pointer"
                >
                  <option value={25}>25 Years (Standard Canadian)</option>
                  <option value={30}>30 Years (Uninsured)</option>
                  <option value={20}>20 Years</option>
                  <option value={15}>15 Years</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Mortgage Rate
                  </label>
                  <span className="text-sm font-bold text-emerald-400">
                    {interestRate.toFixed(2)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="3.5"
                  max="8.0"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                Estimated Monthly Payment
              </p>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                ${calc.monthlyPayment.toLocaleString()}
                <span className="text-sm font-semibold text-slate-400"> CAD/mo</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Principal &amp; Interest over a {loanTermYears}-year amortization
              </p>
            </div>

            {/* Visual Breakdown Progress Bar */}
            <div className="space-y-2 pt-2 border-t border-slate-700">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Loan Breakdown:</span>
                <span className="text-slate-400">Principal vs Interest</span>
              </div>
              <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden flex">
                <div
                  style={{
                    width: `${Math.round(
                      (calc.principal / calc.totalPayment) * 100
                    )}%`,
                  }}
                  className="bg-emerald-500"
                  title="Principal"
                />
                <div
                  style={{
                    width: `${Math.round(
                      (calc.totalInterest / calc.totalPayment) * 100
                    )}%`,
                  }}
                  className="bg-slate-500"
                  title="Interest"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Mortgage Loan: ${calc.principal.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                  <span>Interest: ${calc.totalInterest.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Detailed Figures Table */}
            <div className="space-y-2.5 pt-2 border-t border-slate-700 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Down Payment ({downPaymentPercent}%):</span>
                <span className="font-bold text-white">
                  ${calc.downPayment.toLocaleString()} CAD
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Mortgage Amount:</span>
                <span className="font-bold text-white">
                  ${calc.principal.toLocaleString()} CAD
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Est. Property Taxes &amp; Insurance:</span>
                <span className="font-bold text-slate-300">
                  ~${estPropertyTaxAndIns.toLocaleString()}/mo
                </span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold pt-2 border-t border-slate-700/60">
                <span>Total Est. Monthly Outlay:</span>
                <span className="text-sm">
                  ${totalMonthlyOutlay.toLocaleString()} CAD/mo
                </span>
              </div>
            </div>

            {/* CTA Pre-approval */}
            <div className="pt-2">
              <a
                href="#about-realtor"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all duration-200"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Connect with Cemar Watin &amp; Preferred Lenders</span>
              </a>
              <p className="text-[10px] text-slate-500 text-center mt-2">
                *Estimates for illustration only. Rates and qualifying criteria subject to lender approval (O.A.C.).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
