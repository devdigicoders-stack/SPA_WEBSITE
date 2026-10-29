"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, Phone, MessageSquare, Compass, ShieldCheck } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { SPA_INFO } from "@/data/spaData";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");
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
            ? "bg-[#0d0d0c]/90 border-[#c6a15b]/30 shadow-2xl backdrop-blur-xl py-2 px-4 md:px-6"
            : "bg-[#0d0d0c]/75 border-white/10 backdrop-blur-md py-3 px-4 md:px-7"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/assets/images/logo.png"
              alt="Just Relax Spa Doha"
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 text-[13.5px] font-medium text-[#dedbd4]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 py-1 relative ${
                    isActive
                      ? "text-[#c6a15b] font-semibold"
                      : "hover:text-[#c6a15b]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c6a15b] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Book Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openBooking()}
              className="btn-gold !py-2 !px-5 text-xs md:text-sm whitespace-nowrap shadow-md hover:shadow-goldGlow"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#dedbd4] hover:text-[#c6a15b] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0d0d0c]/95 backdrop-blur-2xl xl:hidden pt-28 px-6 pb-8 overflow-y-auto animate-in fade-in duration-200">
          <div className="flex flex-col gap-6 max-w-md mx-auto">
            <div className="border-b border-[#2c2923] pb-4">
              <p className="kicker">Navigation</p>
              <h3 className="text-xl font-serif text-[#f2eee5] mt-1">
                Luxury Gentlemen Sanctuary
              </h3>
            </div>

            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg py-2 px-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-[#c6a15b]/15 text-[#c6a15b] font-semibold border-l-4 border-[#c6a15b]"
                        : "text-[#dedbd4] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#2c2923] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                className="btn-gold w-full justify-center !py-3.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Your Ritual Now</span>
              </button>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <a
                  href={`https://wa.me/${SPA_INFO.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full justify-center text-xs !py-3"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${SPA_INFO.phone.replace(/\D/g, "")}`}
                  className="btn-ghost w-full justify-center text-xs !py-3"
                >
                  <Phone className="w-4 h-4 text-[#c6a15b]" />
                  <span>Call Spa</span>
                </a>
              </div>

              <div className="text-center text-xs text-[#aaa49a] mt-4 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c6a15b]" />
                <span>Licensed Gents Spa in Doha • Open Daily until 3:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

