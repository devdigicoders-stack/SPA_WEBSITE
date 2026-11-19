"use client";

import SiteFooter from '@/components/SiteFooter';

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import WhatsAppModal from "@/components/WhatsAppModal";
import { THERAPISTS_DATA, BranchTeam, TherapistItem } from "@/data/therapistsData";

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

export default function TherapistsPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<"branches" | "actions">("branches");
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>("west-bay");
  const [bookingContext, setBookingContext] = useState<{ icon: string; text: string } | null>(null);
  const [branchDistances, setBranchDistances] = useState<Record<string, string>>({});
  const [closestBranchSlug, setClosestBranchSlug] = useState<string | null>(null);

  const branches: BranchItem[] = [
    {
      id: 1,
      slug: "retaj-salwa",
      name: "Retaj Salwa Resort & Spa",
      
      address: "Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar",
      phone: "+97433344048",
      whatsappNumber: "97433344048",
      whatsappMsg: "Hello Just Relax Spa Retaj Salwa! I would like to book a treatment.",
      lat: 25.1686,
      lng: 51.3158,
    },
    {
      id: 2,
      slug: "jouri-hotel",
      name: "Jouri, a Murwab Hotel",
      
      address: "Al Muthaf St, Street 137, Building 31, Zone 18, Old Salata, Doha",
      phone: "+97470024322",
      whatsappNumber: "97470024322",
      whatsappMsg: "Hello Just Relax Spa at Jouri Murwab Hotel! I would like to book a session with a therapist.",
      lat: 25.2892,
      lng: 51.5434,
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

  const openBookingForTherapist = (branchSlug: string, therapistName: string) => {
    setSelectedBranchSlug(branchSlug);
    setBookingContext({
      icon: "fa-user-check",
      text: `Preferred Therapist: ${therapistName}`,
    });
    setBookingStep("actions");
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
          <Link href="/treatments">Treatments</Link>
          <Link href="/treatment-finder">Find Your Ritual</Link>
          <Link href="/therapists" className="active is-active">Therapists</Link>
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
        <section className="hero page-hero therapists-hero">
          <img
            src="/assets/just-relax/branches/jouri-hotel/jouri-hotel-relaxation.jpg"
            alt="Certified Master Therapists and Moroccan Bath Masters"
            className="hero-bg-img"
            width="1920"
            height="1080"
          />
          <div className="hero-scrim"></div>

          <div className="hero-content">
            <p className="kicker">Certified Master Artisans</p>
            <h1>Meet Our Doha Therapists &amp; Hammam Masters</h1>
            <p>
              Certified, multilingual master practitioners from Morocco, Turkey, and Southeast Asia delivering bespoke deep tissue therapy and authentic royal hammam rituals.
            </p>
            <div className="hero-actions">
              <button className="button" type="button" onClick={() => openBookingModal()}>
                Reserve with Master
              </button>
              <Link className="button button-ghost" href="/treatments">
                View Treatments
              </Link>
            </div>
          </div>
        </section>

        {/* BRANCH TEAMS */}
        {THERAPISTS_DATA.filter(
          (branch) => branch.branchSlug === "west-bay" || branch.branchSlug === "jouri-hotel"
        ).map((branch) => (
          <section
            key={branch.branchSlug}
            className="therapist-branch section"
            id={`team-${branch.branchSlug}`}
          >
            <div className="section-head">
              <p className="kicker">Branch team</p>
              <h2>{branch.branchName}</h2>
              <Link className="section-link" href={`/our-branches#${branch.branchSlug}`}>
                Branch page ›
              </Link>
            </div>
            <div className="therapist-grid">
              {branch.therapists.map((t) => (
                <article key={t.id} className="therapist-card">
                  <div className="therapist-photo">
                    <img
                      src={t.image}
                      width="608"
                      height="1088"
                      loading="lazy"
                      decoding="async"
                      alt={`${t.name} — spa therapist in Doha, ${branch.branchName}`}
                    />
                    <span className="therapist-flag">{t.nationality}</span>
                  </div>
                  <div className="therapist-info">
                    <h3>{t.name}</h3>
                    <p className="therapist-langs">
                      <i className="fa-solid fa-language" aria-hidden="true"></i>
                      {t.languages}
                    </p>
                    <button
                      type="button"
                      className="therapist-book"
                      onClick={() => openBookingForTherapist(branch.branchSlug, t.name)}
                    >
                      Book with {t.name}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* FINAL CTA */}
        <section className="final-cta">
          <h2>A session made for you</h2>
          <p>Choose your therapist or let the team suggest the best fit — then pick your nearest branch.</p>
          <button
            className="button"
            type="button"
            data-book
            onClick={() => openBookingModal()}
          >
            Book Your Visit
          </button>
        </section>
      </main>

      {/* 3. SITE FOOTER */}
      <SiteFooter />

      {/* 4. FLOATING QUICK CTAS */}
      

      {/* 5. INTERACTIVE 2-STEP BOOKING MODAL */}
      

      
    </>
  );
}
