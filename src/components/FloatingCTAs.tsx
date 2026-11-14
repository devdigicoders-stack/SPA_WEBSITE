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
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#a67c32] to-[#8c6522] text-white font-semibold text-xs md:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <Calendar className="w-4 h-4 text-amber-200" />
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
        className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-[#faf7f0] border border-[#dfd6c4] text-[#221910] hover:text-[#a67c32] font-medium text-xs shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
        title="Call Spa Reception"
      >
        <Phone className="w-4 h-4 text-[#a67c32]" />
        <span className="hidden sm:inline font-semibold">Call Now</span>
      </a>

      {/* Google Maps Directions */}
      <a
        href="https://maps.app.goo.gl/JbsB9BgUa1nxUPYeA?g_st=ac"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-3 py-2 rounded-full bg-white hover:bg-[#faf7f0] border border-[#dfd6c4] text-[#554d42] hover:text-[#221910] font-medium text-xs shadow-sm hover:scale-105 active:scale-95 transition-all duration-200"
        title="Get Directions in Doha"
      >
        <Navigation className="w-3.5 h-3.5 text-[#a67c32]" />
        <span className="hidden md:inline">Directions</span>
      </a>
    </aside>
  );
}
