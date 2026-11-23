"use client";

import React, { useState } from "react";
import {
  X,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2,
  ExternalLink,
} from "lucide-react";
import { Property } from "@/types/property";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
}

export default function ContactModal({
  isOpen,
  onClose,
  property,
}: ContactModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("Buying a Property");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Trigger mailto dispatch to cemarwatin@gmail.com
    const subject = encodeURIComponent(
      property
        ? `[Inquiry via Website] ${property.mlsNumber} - ${property.title}`
        : `[Website Inquiry] ${inquiryType} - from ${fullName}`
    );
    const body = encodeURIComponent(
      `Hello Cemar,\n\nI am contacting you regarding: ${
        property ? `${property.title} (${property.mlsNumber})` : inquiryType
      }\n\nClient Details:\n- Name: ${fullName}\n- Email: ${email}\n- Phone: ${phone}\n- Inquiry Type: ${inquiryType}\n\nMessage:\n${message}\n\nSent from your website.`
    );

    // Open mail client safely
    window.open(`mailto:cemarwatin@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src="/cemar-watin.webp"
              alt="Cemar Watin, REALTOR®"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
            />
            <div>
              <h3 className="font-bold text-base leading-tight flex items-center gap-1.5">
                Contact Cemar Watin
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                  REALTOR®
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                HomeLife / Miracle Realty Ltd., Brokerage*
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-slate-900">
                Message Dispatched!
              </h4>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Thank you, <strong className="text-slate-900">{fullName}</strong>. Your inquiry has been routed directly to Cemar Watin at{" "}
                <strong className="text-emerald-700">cemarwatin@gmail.com</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left text-slate-600 space-y-1.5">
              <p>
                <strong>Recipient:</strong> Cemar Watin, REALTOR®
              </p>
              <p>
                <strong>Routing:</strong> Direct priority inbox notification
              </p>
              <p>
                <strong>Your Contact:</strong> {email} {phone ? `| ${phone}` : ""}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Done &amp; Return to Listings
              </button>
            </div>
          </div>
        ) : (
          /* Contact Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {property && (
              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-xs flex items-center gap-3">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-800">
                      {property.mlsNumber}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 truncate">{property.location.city}</span>
                  </div>
                  <p className="font-bold text-slate-900 truncate">
                    {property.title}
                  </p>
                </div>
              </div>
            )}

            {/* Inquiry Type Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                How can Cemar help you?
              </label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value="Buying a Property in the GTA">I want to Buy a Property in the GTA</option>
                <option value="Selling My Home / Free Home Evaluation">I want to Sell My Home / Free Home Valuation</option>
                <option value="Interested in this MLS Listing">Interested in this MLS® Listing</option>
                <option value="Condo & Pre-Construction Investments">Condo &amp; Pre-Construction Investments</option>
                <option value="Leasing / Executive Rental">Leasing / Rental Inquiry</option>
                <option value="General Real Estate Advisory">General Real Estate Advisory</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Phone / Mobile (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="(416) / (647) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Your Message *
              </label>
              <textarea
                required
                rows={3}
                placeholder={
                  property
                    ? `I would like more information or to request a private viewing for ${property.title}...`
                    : "Tell Cemar what you are looking for (neighbourhoods, price budget, timeline)..."
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all duration-200"
            >
              <Send className="w-4 h-4" />
              <span>Send Message to Cemar Watin</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct delivery to cemarwatin@gmail.com • Strict privacy observed</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
