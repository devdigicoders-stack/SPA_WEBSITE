"use client";

import SiteFooter from '@/components/SiteFooter';

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { TREATMENTS_DATA, TreatmentItem } from "@/data/treatmentsData";
import WhatsAppModal from "@/components/WhatsAppModal";

interface BranchItem {
  id: number;
  slug: string;
  name: string;
  licenseNo?: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  whatsappMsg: string;
  lat: number;
  lng: number;
}

export default function TreatmentsPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<"branches" | "actions">("branches");
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>("west-bay");
  const [bookingContext, setBookingContext] = useState<{ icon: string; text: string } | null>(null);
  const [branchDistances, setBranchDistances] = useState<Record<string, string>>({});
  const [closestBranchSlug, setClosestBranchSlug] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 27 });

  const branches: BranchItem[] = [
    {
      id: 1,
      slug: "jouri-hotel",
      name: "Jouri, a Murwab Hotel",
      
      address: "Al Muthaf Street, Old Salata / Corniche, Doha",
      phone: "+97470024322",
      whatsappNumber: "97470024322",
      whatsappMsg: "Hello Just Relax Spa Jouri Hotel! I would like to book a treatment.",
      lat: 25.2892,
      lng: 51.5434,
    },
    {
      id: 2,
      slug: "retaj-salwa",
      name: "Retaj Salwa Resort & Spa",
      
      address: "Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar",
      phone: "+97433344048",
      whatsappNumber: "97433344048",
      whatsappMsg: "Hello Just Relax Spa Retaj Salwa! I would like to book a treatment.",
      lat: 25.1686,
      lng: 51.3158,
    },

  ];

  const currentBranch = branches.find((b) => b.slug === selectedBranchSlug) || branches[0];

  const openBookingModal = (context?: { icon: string; text: string }) => {
    setBookingContext(context || null);
    setBookingStep("branches");
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeBookingModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleSelectBranch = (slug: string) => {
    setSelectedBranchSlug(slug);
    setBookingStep("actions");
  };

  return (
    <>
      {/* 1. SITE HEADER */}
      <header className="site-header" data-header>
        <Link className="brand" href="/">
          <img src="/assets/images/logo.png" width="96" height="42" alt="Just Relax Spa" />
          <span>JUST RELAX SPA</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={navOpen}
          aria-controls="main-nav"
          data-menu-toggle
          onClick={() => setNavOpen(!navOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
          <b>Menu</b>
        </button>

        <nav
          id="main-nav"
          className={`main-nav ${navOpen ? "open" : ""}`}
          aria-label="Main navigation"
          data-nav
        >
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/our-branches">Our Branches</Link>
          <Link href="/treatments" className="active is-active">Treatments</Link>
          <Link href="/treatment-finder">Find Your Ritual</Link>
          <Link href="/therapists">Therapists</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="header-actions">
          <button className="button button-small" type="button" onClick={() => openBookingModal()}>
            Book Now
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT */}
      <main id="main">
        {/* INNER HERO */}
        <section className="hero page-hero treatments-hero">
          <img
            src="/assets/just-relax/branches/retaj-salwa/retaj-salwa-moroccan-bath.jpg"
            alt="Authentic Moroccan Baths and Spa Treatments in Doha"
            className="hero-bg-img"
            width="1920"
            height="1080"
          />
          <div className="hero-scrim"></div>

          <div className="hero-content">
            <p className="kicker">Men's Rituals &amp; Therapeutic Recovery</p>
            <h1>Spa and Massage Treatments in Doha</h1>
            <p>
              Authentic Moroccan hammam rituals, targeted deep tissue therapy, jacuzzi hydrotherapy, and custom rituals crafted for gentlemen's executive recovery.
            </p>
            <div className="hero-actions">
              <button
                className="button"
                type="button"
                onClick={() =>
                  openBookingModal({
                    icon: "fa-tag",
                    text: "Applying 25% OFF Golden Hours (Daily 11 AM - 5 PM)",
                  })
                }
              >
                Book a Treatment
              </button>
              <Link className="button button-ghost" href="/treatment-finder">
                Find Your Ritual
              </Link>
            </div>
          </div>
        </section>

        {/* OFFER BAND */}
        <section className="offer-band" aria-label="Golden hours offer">
          <div className="offer-ticket">
            <div className="offer-ticket-stub">
              <span className="offer-figure" aria-hidden="true">
                25%<small>OFF</small>
              </span>
            </div>
            <div className="offer-ticket-body">
              <p className="kicker">Golden Hours Privilege</p>
              <h2 className="offer-title">25% off every ritual treatment</h2>
              <p className="offer-sub">All rituals · Both Doha branches · Daily 11:00 AM – 5:00 PM</p>
              <p
                className="offer-timer is-live"
                data-offer-timer
                data-opens="11:00"
                data-closes="17:00"
              >
                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                Privilege offer is live — ends in {timeLeft.hours}h {timeLeft.minutes}m
              </p>
            </div>
            <div className="offer-ticket-action">
              <button
                className="button"
                type="button"
                data-book
                data-offer="golden-hours"
                onClick={() =>
                  openBookingModal({
                    icon: "fa-tag",
                    text: "Applying 25% OFF Golden Hours (Daily 12 PM - 6 PM)",
                  })
                }
              >
                Book Now — Save 25%
              </button>
              <small className="offer-fine">Subject to availability · mention the offer when booking</small>
            </div>
          </div>
        </section>

        {/* PROSE SECTION */}
        <section className="prose-section">
          <h2>Choose a treatment around the result you want</h2>
          <div className="prose-columns">
            <p>
              For general relaxation, begin with Swedish massage or natural oils. For accumulated tension or
              post-activity recovery, explore deep tissue, sports massage, or percussion therapy.
            </p>
            <p>
              For skin renewal and a traditional steam ritual, choose a Moroccan or Turkish bath. Organic-salt
              Jacuzzi and underwater foam massage combine warm water with deep relaxation. Always tell your
              therapist about relevant health conditions or injuries.
            </p>
          </div>
        </section>

        {/* TREATMENT GRID SECTION */}
        <section className="treatment-grid section">
          {TREATMENTS_DATA.map((t) => (
            <article key={t.id} className="treatment-card">
              <img
                src={t.image}
                width="700"
                height="520"
                loading="lazy"
                decoding="async"
                alt={`${t.title} at Just Relax Spa in Doha, Qatar`}
              />
              <div>
                <h2>{t.title}</h2>
                <p>{t.description}</p>
                {t.duration && <span>{t.duration}</span>}
                <div className="card-actions">
                  <button
                    type="button"
                    data-book
                    data-service={t.serviceId}
                    onClick={() =>
                      openBookingModal({
                        icon: "fa-sparkles",
                        text: `Selected Ritual: ${t.title}`,
                      })
                    }
                  >
                    Book Now
                  </button>
                  <Link href={`/treatments/${t.slug}`}>More Details</Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* 3. SITE FOOTER */}
      <SiteFooter />

      {/* 4. FLOATING QUICK CTAS */}
      

      {/* 5. INTERACTIVE 2-STEP BOOKING MODAL */}
      

      
    </>
  );
}
