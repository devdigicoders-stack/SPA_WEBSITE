"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail, Clock, Instagram, MessageSquare, ShieldCheck, ChevronRight } from "lucide-react";
import { BRANCHES, SPA_INFO } from "@/data/spaData";
import { useBooking } from "@/context/BookingContext";

export default function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer className="bg-[#0a0908] border-t border-[#232019] text-[#aaa49a] pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#c6a15b]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#232019]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c6a15b] to-[#7d602a] flex items-center justify-center p-[2px] shadow-lg">
                <div className="w-full h-full bg-[#0d0d0c] rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#c6a15b]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-[0.2em] text-[#c6a15b] uppercase font-serif">
                  JUST RELAX SPA
                </span>
                <span className="text-[10px] tracking-widest text-[#aaa49a] uppercase">
                  DOHA • MENS LUXURY WELLNESS
                </span>
              </div>
            </Link>

            <p className="text-[#dedbd4] text-sm leading-relaxed max-w-sm">
              Doha&apos;s sanctuary for gentlemen seeking authentic Moroccan baths, Turkish marble foam hammam, and therapeutic deep tissue recovery in 100% private VIP suites.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`https://wa.me/${SPA_INFO.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b1915] border border-[#2c2923] hover:border-[#c6a15b] text-xs text-[#dedbd4] hover:text-[#c6a15b] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Concierge</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b1915] border border-[#2c2923] hover:border-[#c6a15b] text-xs text-[#dedbd4] hover:text-[#c6a15b] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>@justrelaxspa.doha</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openBooking()}
                className="btn-gold !py-2.5 !px-6 text-xs md:text-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Your Visit Today</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#c6a15b] font-bold">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#c6a15b] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#c6a15b]" />
                  <span>About Just Relax</span>
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-[#c6a15b] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#c6a15b]" />
                  <span>Our 2 Doha Branches</span>
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="hover:text-[#c6a15b] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#c6a15b]" />
                  <span>Treatments Menu</span>
                </Link>
              </li>
              <li>
                <Link href="/treatment-finder" className="hover:text-[#c6a15b] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#c6a15b]" />
                  <span>Find Your Ritual</span>
                </Link>
              </li>
              <li>
                <Link href="/therapists" className="hover:text-[#c6a15b] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#c6a15b]" />
                  <span>Certified Therapists</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#c6a15b] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#c6a15b]" />
                  <span>Videos & Photos</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#c6a15b] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#c6a15b]" />
                  <span>Contact & Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Doha Branches */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#c6a15b] font-bold">
              Doha Branches
            </h3>
            <div className="space-y-4 text-xs">
              {BRANCHES.map((branch) => (
                <div key={branch.id} className="p-3 rounded-xl bg-[#14120e] border border-[#232019] space-y-1.5">
                  <strong className="text-[#f2eee5] block text-sm font-semibold">
                    {branch.shortName}
                  </strong>
                  <p className="text-[#aaa49a]">{branch.address}</p>
                  <p className="text-[#c6a15b] flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{branch.hours}</span>
                  </p>
                  <div className="pt-1 flex items-center gap-2">
                    <a
                      href={`tel:${branch.phone.replace(/\D/g, "")}`}
                      className="text-[#dedbd4] hover:text-[#c6a15b] font-mono text-[11px]"
                    >
                      {branch.phone}
                    </a>
                    <span className="text-zinc-600">•</span>
                    <button
                      onClick={() => openBooking({ branchId: branch.id })}
                      className="text-[#c6a15b] underline text-[11px]"
                    >
                      Reserve Suite
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Hours & Standards */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#c6a15b] font-bold">
              Concierge & Hours
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2 text-[#dedbd4]">
                <Clock className="w-4 h-4 text-[#c6a15b] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Daily 10:00 AM – 3:00 AM</strong>
                  <span>Open late night for executive and post-flight recovery</span>
                </div>
              </li>
              <li className="flex items-start gap-2 text-[#dedbd4]">
                <ShieldCheck className="w-4 h-4 text-[#c6a15b] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">100% Private Suites</strong>
                  <span>Complete discretion, private rain shower & locker</span>
                </div>
              </li>
              <li className="flex items-start gap-2 text-[#dedbd4]">
                <Phone className="w-4 h-4 text-[#c6a15b] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-zinc-400">Direct Hotline</span>
                  <a href={`tel:${SPA_INFO.phone.replace(/\D/g, "")}`} className="text-white hover:text-[#c6a15b] font-mono">
                    {SPA_INFO.phone}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7d776d]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>© 2026 Just Relax Spa Doha. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Commercial Registration: {SPA_INFO.commercialLicense}</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#dedbd4] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#dedbd4] transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <span className="text-[#c6a15b] font-serif">سبا جست ريلاكس - الدوحة</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

