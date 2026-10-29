"use client";

import React from "react";
import { MessageSquare, Phone, Navigation, Calendar } from "lucide-react";
import { SPA_INFO } from "@/data/spaData";
import { useBooking } from "@/context/BookingContext";

export default function FloatingCTAs() {
  const { openBooking } = useBooking();

  return (
    <aside
      className="fixed bottom-20 right-5 z-40 flex flex-col items-end gap-2.5"
      aria-label="Quick booking and concierge options"
    >
      {/* Quick Booking Button */}
      <button
        onClick={() => openBooking()}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#c6a15b] to-[#a8823b] text-[#11100e] font-semibold text-xs md:text-sm shadow-xl hover:shadow-goldGlow hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <Calendar className="w-4 h-4 text-[#11100e]" />
        <span className="font-bold">Book Visit</span>
      </button>

      {/* WhatsApp Quick Action */}
      <a
        href={`https://wa.me/${SPA_INFO.whatsapp.replace(/\D/g, "")}?text=Hello%20Just%20Relax%20Spa,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20treatment%20in%20Doha.`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1b9a59] hover:bg-[#18884e] text-white font-medium text-xs shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span className="hidden sm:inline font-semibold">WhatsApp</span>
      </a>

      {/* Direct Call Button */}
      <a
        href={`tel:${SPA_INFO.phone.replace(/\D/g, "")}`}
        className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1e1c17] hover:bg-[#28251e] border border-[#c6a15b]/40 text-[#f2eee5] hover:text-[#c6a15b] font-medium text-xs shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
        title="Call Spa Reception"
      >
        <Phone className="w-4 h-4 text-[#c6a15b]" />
        <span className="hidden sm:inline font-semibold">Call Now</span>
      </a>

      {/* Google Maps Directions */}
      <a
        href="https://maps.google.com/?q=West+Bay+Doha+Qatar"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-3 py-2 rounded-full bg-[#161410] hover:bg-[#201d16] border border-[#2c2923] text-[#dedbd4] hover:text-white font-medium text-xs shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
        title="Get Directions in Doha"
      >
        <Navigation className="w-3.5 h-3.5 text-[#aaa49a] group-hover:text-[#c6a15b]" />
        <span className="hidden md:inline">Directions</span>
      </a>
    </aside>
  );
}

