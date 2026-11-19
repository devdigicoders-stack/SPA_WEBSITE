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
  address: string;
  phone: string;
  whatsappNumber: string;
  whatsappMsg: string;
  lat: number;
  lng: number;
}

export default function TreatmentDetailClient({
  treatment,
}: {
  treatment: TreatmentItem;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<"branches" | "actions">("branches");
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>("west-bay");
  const [bookingContext, setBookingContext] = useState<{ icon: string; text: string } | null>({
    icon: "fa-sparkles",
    text: `Treatment: ${treatment.title}`,
  });
  const [branchDistances, setBranchDistances] = useState<Record<string, string>>({});
  const [closestBranchSlug, setClosestBranchSlug] = useState<string | null>(null);

  const branches: BranchItem[] = [
    {
      id: 1,
      slug: "west-bay",
      name: "West Bay Diplomatic Suite",
      address: "Tower 1, Diplomatic District, West Bay, Doha, Qatar",
      phone: "+97433344048",
      whatsappNumber: "97433344048",
      whatsappMsg: `Hello Just Relax Spa West Bay! I would like to book ${treatment.title}.`,
      lat: 25.3216,
      lng: 51.5312,
    },
    {
      id: 2,
      slug: "jouri-hotel",
      name: "Jouri, a Murwab Hotel",
      address: "Al Muthaf St, Street 137, Building 31, Zone 18, Old Salata, Doha",
      phone: "+97470024322",
      whatsappNumber: "97470024322",
      whatsappMsg: `Hello Just Relax Spa at Jouri Murwab Hotel! I would like to book ${treatment.title}.`,
      lat: 25.2892,
      lng: 51.5434,
    },
  ];

  const currentBranch = branches.find((b) => b.slug === selectedBranchSlug) || branches[0];

  const relatedTreatments = TREATMENTS_DATA.filter((t) =>
    treatment.relatedSlugs.includes(t.slug)
  ).slice(0, 3);

  const openBookingModal = (customContext?: { icon: string; text: string }) => {
    if (customContext) setBookingContext(customContext);
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

  const handleSelectBranch = (branchSlug: string) => {
    setSelectedBranchSlug(branchSlug);
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
        {/* HERO */}
        <section className="treatment-hero">
          <div className="treatment-hero-content">
            <p className="kicker">Just Relax Spa Ritual</p>
            <h1>Best {treatment.title} in Doha</h1>
            <p>{treatment.description}</p>
            <button
              className="button"
              type="button"
              data-book
              data-service={treatment.serviceId}
              onClick={() => openBookingModal()}
            >
              Book This Treatment
            </button>
          </div>
          <div className="treatment-hero-image">
            <img
              src={treatment.image}
              width="800"
              height="600"
              alt={`${treatment.title} at Just Relax Spa in Doha, Qatar`}
            />
          </div>
        </section>

        {/* ABOUT */}
        <section className="prose-section">
          <h2>About this treatment</h2>
          <div className="prose-columns">
            {treatment.about.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* DETAIL BAND */}
        <section className="detail-band" aria-label="Key treatment facts">
          <div className="detail-cell">
            <small>Duration</small>
            <span>{treatment.duration}</span>
          </div>
          <div className="detail-cell">
            <small>Booking</small>
            <span>{treatment.bookingNote}</span>
          </div>
          <div className="detail-cell">
            <small>Locations</small>
            <span>{treatment.locationsNote}</span>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="prose-section benefits">
          <h2>Why choose this treatment?</h2>
          <div className="prose-columns">
            {treatment.benefits.map((b, i) => (
              <p key={i}>{b}</p>
            ))}
          </div>
        </section>

        {/* TECHNIQUE & EXPERIENCE */}
        <section className="treatment-insights section">
          <p className="kicker">Technique and experience</p>
          <h2>How the treatment is delivered</h2>
          <div className="prose-columns">
            {treatment.technique.map((tech, i) => (
              <p key={i}>{tech}</p>
            ))}
          </div>
        </section>

        {/* WHAT TO EXPECT / JOURNEY */}
        <section className="treatment-journey section">
          <p className="kicker">What to expect</p>
          <h2>A clear journey helps you prepare and get more from your session</h2>
          <div className="journey-steps">
            {treatment.journey.map((step) => (
              <div key={step.num} className="journey-step">
                <span className="step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PREPARATION */}
        <section className="prose-section preparation">
          <h2>Before your appointment</h2>
          <div className="prose-columns">
            {treatment.preparation.map((prep, i) => (
              <p key={i}>{prep}</p>
            ))}
          </div>
        </section>

        {/* RELATED TREATMENTS */}
        {relatedTreatments.length > 0 && (
          <section className="related-section section">
            <h2>You may also enjoy</h2>
            <div className="related-grid">
              {relatedTreatments.map((rel) => (
                <article key={rel.id} className="treatment-card">
                  <img
                    src={rel.image}
                    width="700"
                    height="520"
                    loading="lazy"
                    decoding="async"
                    alt={`${rel.title} at Just Relax Spa in Doha, Qatar`}
                  />
                  <div>
                    <h3>{rel.title}</h3>
                    <p>{rel.description}</p>
                    <div className="card-actions">
                      <button
                        type="button"
                        data-book
                        data-service={rel.serviceId}
                        onClick={() =>
                          openBookingModal({
                            icon: "fa-sparkles",
                            text: `Selected Ritual: ${rel.title}`,
                          })
                        }
                      >
                        Book Now
                      </button>
                      <Link href={`/treatments/${rel.slug}`}>More Details</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section className="final-cta">
          <h2>Book {treatment.title} today</h2>
          <p>Choose your nearest branch, then continue by WhatsApp or phone.</p>
          <button
            className="button"
            type="button"
            data-book
            onClick={() => openBookingModal()}
          >
            Start Booking
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

