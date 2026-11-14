"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, Phone, MessageSquare, ShieldCheck } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { SPA_INFO } from "@/data/spaData";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Branches", href: "/branches" },
    { label: "Treatments", href: "/treatments" },
    { label: "Find Your Ritual", href: "/treatment-finder" },
    { label: "Therapists", href: "/therapists" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-3 left-3 right-3 md:left-6 md:right-6 lg:left-10 lg:right-10 z-50 transition-all duration-300 rounded-full border ${
          isScrolled
            ? "bg-[#FCFBF8]/95 border-[#e8dfd1] shadow-xl backdrop-blur-xl py-2 px-4 md:px-6"
            : "bg-[#FCFBF8]/90 border-[#e8dfd1] shadow-sm backdrop-blur-md py-2.5 px-4 md:px-7"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo - Crisp Natural Rendering */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/assets/images/logo.png"
              alt="Just Relax Spa Doha"
              className="h-10 md:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 text-[13.5px] font-medium text-[#42392e]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 py-1 relative ${
                    isActive
                      ? "text-[#a67c32] font-semibold"
                      : "hover:text-[#a67c32]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#a67c32] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Book Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openBooking()}
              className="inline-flex items-center gap-2 py-2 px-4 md:px-5 rounded-full bg-[#a67c32] hover:bg-[#8c6522] text-white text-xs md:text-sm font-semibold whitespace-nowrap shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Book Now</span>
            </button>

            {/* Mobile Menu Button - Crisp Dark Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#221910] hover:text-[#a67c32] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FCFBF8]/98 backdrop-blur-2xl xl:hidden pt-24 px-6 pb-8 overflow-y-auto animate-in fade-in duration-200 border-b border-[#e8dfd1]">
          <div className="flex flex-col gap-5 max-w-md mx-auto">
            <div className="border-b border-[#e8dfd1] pb-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#a67c32]">Navigation</p>
              <h3 className="text-xl font-serif text-[#221910] mt-1 font-semibold">
                Luxury Gentlemen Sanctuary
              </h3>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-medium py-2.5 px-3.5 rounded-xl transition-all ${
                      isActive
                        ? "bg-[#a67c32]/12 text-[#a67c32] font-semibold border-l-4 border-[#a67c32]"
                        : "text-[#3c342a] hover:bg-[#F7F1E7] hover:text-[#221910]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#e8dfd1] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#a67c32] hover:bg-[#8c6522] text-white font-semibold text-sm shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Book Your Ritual Now</span>
              </button>

              <div className="grid grid-cols-2 gap-3 mt-1">
                <a
                  href={`https://wa.me/${SPA_INFO.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#F7F1E7] border border-[#e8dfd1] text-[#221910] hover:text-[#1b9a59] text-xs font-semibold"
                >
                  <MessageSquare className="w-4 h-4 text-[#1b9a59]" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${SPA_INFO.phone.replace(/\D/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#F7F1E7] border border-[#e8dfd1] text-[#221910] hover:text-[#a67c32] text-xs font-semibold"
                >
                  <Phone className="w-4 h-4 text-[#a67c32]" />
                  <span>Call Spa</span>
                </a>
              </div>

              <div className="text-center text-xs text-[#695f53] mt-3 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#a67c32]" />
                <span>Licensed Gents Spa in Doha • Open Daily until 3:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
