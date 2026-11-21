"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail, Clock, Instagram, MessageSquare, ShieldCheck, ChevronRight } from "lucide-react";
import { BRANCHES, SPA_INFO } from "@/data/spaData";
import { useBooking } from "@/context/BookingContext";

export default function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer className="bg-[#F7F1E7] border-t border-[#e8dfd1] text-[#554d42] pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#a67c32]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#e8dfd1]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <img
                src="/assets/images/logo.png"
                alt="Just Relax Spa Doha"
                className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            <p className="text-[#453c30] text-sm leading-relaxed max-w-sm">
              Doha&apos;s premier sanctuary for gentlemen seeking authentic Moroccan baths, Turkish marble foam hammam, and therapeutic deep tissue recovery in 100% private VIP suites.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="https://www.instagram.com/justrelaxspa.qa?jplx=eDl2dXIwYTNwZHN5&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-sm hover:scale-110 transition-transform"
              >
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a
                href="https://www.tiktok.com/@just.relax.salon?_r=1&_t=ZS-9BajOv52RwS"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                aria-label="TikTok"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-black shadow-sm hover:scale-110 transition-transform"
              >
                <i className="fa-brands fa-tiktok text-sm"></i>
              </a>
              <a
                href="https://snapchat.com/t/DsRlTs5F"
                target="_blank"
                rel="noopener noreferrer"
                title="Snapchat"
                aria-label="Snapchat"
                className="w-8 h-8 rounded-full flex items-center justify-center text-black bg-[#FFFC00] shadow-sm hover:scale-110 transition-transform"
              >
                <i className="fa-brands fa-snapchat text-sm"></i>
              </a>
              <a
                href="https://www.facebook.com/share/1Co14mrWto/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#1877F2] shadow-sm hover:scale-110 transition-transform"
              >
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openBooking()}
                className="inline-flex items-center gap-2 py-2.5 px-6 rounded-full bg-[#a67c32] hover:bg-[#8c6522] text-white font-semibold text-xs md:text-sm shadow-md transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Book Your Visit Today</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#a67c32] font-bold">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#a67c32] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#a67c32]" />
                  <span>About Just Relax</span>
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-[#a67c32] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#a67c32]" />
                  <span>Our 2 Doha Branches</span>
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="hover:text-[#a67c32] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#a67c32]" />
                  <span>Treatments Menu</span>
                </Link>
              </li>
              <li>
                <Link href="/treatment-finder" className="hover:text-[#a67c32] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#a67c32]" />
                  <span>Find Your Ritual</span>
                </Link>
              </li>
              <li>
                <Link href="/therapists" className="hover:text-[#a67c32] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#a67c32]" />
                  <span>Certified Therapists</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#a67c32] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#a67c32]" />
                  <span>Videos & Photos</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#a67c32] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#a67c32]" />
                  <span>Contact & Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Doha Branches */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#a67c32] font-bold">
              Doha Branches
            </h3>
            <div className="space-y-3.5 text-xs">
              {BRANCHES.map((branch) => (
                <div key={branch.id} className="p-3 rounded-xl bg-[#FCFBF8] border border-[#e8dfd1] shadow-sm space-y-1.5">
                  <strong className="text-[#221910] block text-sm font-semibold">
                    {branch.shortName}
                  </strong>
                  <p className="text-[#695f53]">{branch.address}</p>
                  <p className="text-[#a67c32] flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{branch.hours}</span>
                  </p>
                  <div className="pt-1 flex items-center gap-2">
                    <a
                      href={`tel:${branch.phone.replace(/\D/g, "")}`}
                      className="text-[#383025] hover:text-[#a67c32] font-mono text-[11px]"
                    >
                      {branch.phone}
                    </a>
                    <span className="text-zinc-400">•</span>
                    <button
                      onClick={() => openBooking({ branchId: branch.id })}
                      className="text-[#a67c32] underline text-[11px] font-semibold"
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
            <h3 className="text-xs uppercase tracking-widest text-[#a67c32] font-bold">
              Concierge & Hours
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2 text-[#453c30]">
                <Clock className="w-4 h-4 text-[#a67c32] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#221910]">Daily 10:00 AM – 3:00 AM</strong>
                  <span className="text-[#695f53]">Open late night for executive and post-flight recovery</span>
                </div>
              </li>
              <li className="flex items-start gap-2 text-[#453c30]">
                <ShieldCheck className="w-4 h-4 text-[#a67c32] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#221910]">100% Private Suites</strong>
                  <span className="text-[#695f53]">Complete discretion, private rain shower & locker</span>
                </div>
              </li>
              <li className="flex items-start gap-2 text-[#453c30]">
                <Phone className="w-4 h-4 text-[#a67c32] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#7c7162]">Direct Hotline</span>
                  <a href={`tel:${SPA_INFO.phone.replace(/\D/g, "")}`} className="text-[#221910] hover:text-[#a67c32] font-mono font-semibold">
                    {SPA_INFO.phone}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7c7162]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>© 2026 Just Relax Spa Doha. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Commercial Registration: {SPA_INFO.commercialLicense}</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#221910] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#221910] transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <span className="text-[#a67c32] font-serif font-semibold">سبا جست ريلاكس - الدوحة</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
