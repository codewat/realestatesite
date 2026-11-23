"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Video,
  Eye,
  Sparkles,
} from "lucide-react";
import { Property } from "@/types/property";

interface ScheduleTourModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleTourModal({
  property,
  isOpen,
  onClose,
}: ScheduleTourModalProps) {
  const [tourType, setTourType] = useState<"in-person" | "video">("in-person");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const timeSlots = ["10:00 AM", "1:30 PM", "3:30 PM", "5:00 PM (Sunset)"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-base">Schedule a Private Tour</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">
              Viewing Request Confirmed!
            </h4>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you, <strong className="text-slate-900">{fullName}</strong>.
              Your {tourType === "in-person" ? "private viewing" : "live video tour"}{" "}
              for{" "}
              <strong className="text-amber-800">
                {property ? property.title : "our luxury properties"}
              </strong>{" "}
              is scheduled for <strong>{selectedDate || "tomorrow"}</strong> at{" "}
              <strong>{selectedTime}</strong>.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1">
              <p>
                <strong>Assigned Broker:</strong>{" "}
                {property ? property.agent.name : "Senior Property Advisor"}
              </p>
              <p>
                <strong>Confirmation dispatched to:</strong> {email} &amp; SMS to{" "}
                {phone}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-amber-600 transition-colors"
            >
              Done &amp; Return to Listings
            </button>
          </div>
        ) : (
          /* Tour Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {property && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">
                    {property.title}
                  </p>
                  <p className="text-slate-500 truncate">
                    {property.location.city} • {property.specs.bedrooms} Beds
                  </p>
                </div>
              </div>
            )}

            {/* Tour Format (In-Person vs Virtual) */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                Tour Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTourType("in-person")}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    tourType === "in-person"
                      ? "border-amber-500 bg-amber-50 text-amber-900 shadow-sm"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Eye className="w-4 h-4 text-amber-600" />
                  In-Person Viewing
                </button>
                <button
                  type="button"
                  onClick={() => setTourType("video")}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    tourType === "video"
                      ? "border-amber-500 bg-amber-50 text-amber-900 shadow-sm"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Video className="w-4 h-4 text-amber-600" />
                  Virtual Video Call
                </button>
              </div>
            </div>

            {/* Date and Time Selector */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Preferred Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Atty. Juan Dela Cruz"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Phone / Mobile
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+63 9XX XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Special Notes or Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Need airport pickup, chauffeur, structural audit review..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-md transition-all duration-200"
            >
              Confirm Tour Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
