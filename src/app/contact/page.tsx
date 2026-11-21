"use client";

import SiteFooter from '@/components/SiteFooter';

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import WhatsAppModal from "@/components/WhatsAppModal";

interface BranchContactData {
  licenseNo?: string;
  id: number;
  slug: string;
  tabNum: string;
  name: string;
  rating: string;
  ratingUrl: string;
  openBadge: string;
  address: string;
  hours: string;
  instagram: string;
  instagramHandle: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappMsg: string;
  mapIframe: string;
  mapDirectionsUrl: string;
  lat: number;
  lng: number;
  photos: string[];
}

const CONTACT_BRANCHES: BranchContactData[] = [
  {
    id: 1,
    slug: "jouri-hotel",
    tabNum: "01",
    name: "Jouri, a Murwab Hotel",
    
    rating: "★ 4.96",
    ratingUrl: "https://maps.app.goo.gl/JbsB9BgUa1nxUPYeA?g_st=ac",
    openBadge: "Open now (Till 1:00 AM)",
    address: "Al Muthaf Street, Street 137, Building 31, Zone 18, Old Salata, Doha, Qatar",
    hours: "Daily 10:00 AM – 1:00 AM",
    instagram: "https://www.instagram.com/justrelaxspa.qa",
    instagramHandle: "@justrelaxspa.qa",
    phone: "+97470024322",
    phoneDisplay: "+974 7002 4322",
    whatsappNumber: "97470024322",
    whatsappMsg: "Hello Just Relax Spa Jouri Hotel! I would like to book a treatment.",
    mapIframe:
      "https://maps.google.com/maps?q=Jouri+a+Murwab+Hotel+Doha&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapDirectionsUrl: "https://maps.app.goo.gl/JbsB9BgUa1nxUPYeA?g_st=ac",
    lat: 25.2892,
    lng: 51.5434,
    photos: [
      "/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg",
      "/assets/just-relax/branches/jouri-hotel/jouri-hotel-moroccan-bath.jpg",
      "/assets/just-relax/branches/jouri-hotel/jouri-hotel-relaxation.jpg",
      "/assets/just-relax/branches/jouri-hotel/jouri-hotel-massage-suite.jpg",
      "/assets/just-relax/branches/jouri-hotel/jouri-hotel-amenities.jpg",
      "/assets/just-relax/branches/jouri-hotel/jouri-hotel-jacuzzi.jpg",
    ],
  },
  {
    id: 2,
    slug: "retaj-salwa",
    tabNum: "02",
    name: "Retaj Salwa Resort & Spa",
    
    rating: "★ 4.95",
    ratingUrl: "https://maps.app.goo.gl/2y2YLqXKL9fuEeXg9?g_st=ac",
    openBadge: "Open now (Till 12:00 AM)",
    address: "Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar",
    hours: "Daily 10:00 AM – 12:00 AM",
    instagram: "https://www.instagram.com/justrelaxspa.qa",
    instagramHandle: "@justrelaxspa.qa",
    phone: "+97433344048",
    phoneDisplay: "+974 3334 4048",
    whatsappNumber: "97433344048",
    whatsappMsg: "Hello Just Relax Spa Retaj Salwa! I would like to book a private suite appointment.",
    mapIframe:
      "https://maps.google.com/maps?q=Retaj+Salwa+Resort+%26+Spa+Doha&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapDirectionsUrl: "https://maps.app.goo.gl/2y2YLqXKL9fuEeXg9?g_st=ac",
    lat: 25.1686,
    lng: 51.3158,
    photos: [
      "/assets/just-relax/branches/retaj-salwa/retaj-salwa-hero.jpg",
      "/assets/just-relax/branches/retaj-salwa/retaj-salwa-moroccan-bath.jpg",
      "/assets/just-relax/branches/retaj-salwa/retaj-salwa-relaxation.jpg",
      "/assets/just-relax/branches/retaj-salwa/retaj-salwa-massage-suite.jpg",
      "/assets/just-relax/branches/retaj-salwa/retaj-salwa-amenities.jpg",
      "/assets/just-relax/branches/retaj-salwa/retaj-salwa-jacuzzi.jpg",
    ],
  },

];

export default function ContactPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [activeBranchSlug, setActiveBranchSlug] = useState<string>("jouri-hotel");
  const [bookingStep, setBookingStep] = useState<"branches" | "actions">("branches");
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>("jouri-hotel");
  const [bookingContext, setBookingContext] = useState<{ icon: string; text: string } | null>(null);
  const [branchDistances, setBranchDistances] = useState<Record<string, string>>({});
  const [closestBranchSlug, setClosestBranchSlug] = useState<string | null>(null);

  // Quick inquiry state
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formBranch, setFormBranch] = useState("Jouri, a Murwab Hotel");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;

    setFormSubmitting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      await fetch(`${baseUrl}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          branch: formBranch,
          guestName: formName,
          guestPhone: formPhone,
          notes: formMessage,
          source: "Contact Page Form",
          status: "Pending",
        }),
      });
      setFormSubmitted(true);
      setFormName("");
      setFormPhone("");
      setFormMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setFormSubmitting(false);
    }
  };

  const activeBranch =
    CONTACT_BRANCHES.find((b) => b.slug === activeBranchSlug) || CONTACT_BRANCHES[0];
  const currentBranch =
    CONTACT_BRANCHES.find((b) => b.slug === selectedBranchSlug) || CONTACT_BRANCHES[0];

  const openBookingModal = (branchSlug?: string, context?: { icon: string; text: string }) => {
    if (branchSlug) {
      setSelectedBranchSlug(branchSlug);
      setBookingStep("actions");
    } else {
      setBookingStep("branches");
    }
    setBookingContext(context || null);
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
          <Link href="/therapists">Therapists</Link>
          <Link href="/contact" className="active is-active">Contact</Link>
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
        <section className="hero page-hero contact-hero">
          <img
            src="/assets/just-relax/branches/jouri-hotel/jouri-hotel-amenities.jpg"
            alt="Contact Just Relax Spa Doha Concierge"
            className="hero-bg-img"
            width="1920"
            height="1080"
          />
          <div className="hero-scrim"></div>

          <div className="hero-content">
            <p className="kicker">Direct 24/7 Concierge &amp; Reservations</p>
            <h1>Connect Directly With Our Doha Sanctuaries</h1>
            <p>
              Direct concierge access for private VIP suites, Moroccan hammam bookings, and directions across Jouri Murwab Hotel and Retaj Salwa Resort &amp; Spa.
            </p>
            <div className="hero-actions">
              <a className="button" href="https://wa.me/97470024322" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp" style={{ marginInlineEnd: 8 }}></i>Chat on WhatsApp
              </a>
              <a className="button button-ghost" href="tel:+97470024322">
                <i className="fa-solid fa-phone" style={{ marginInlineEnd: 8 }}></i>Call Concierge
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT EXPERIENCE */}
        <section className="contact-experience" data-contact-experience>
          <div className="contact-experience-header">
            <span className="contact-experience-kicker">
              <i className="fa-solid fa-location-dot" style={{ marginInlineEnd: 6 }} />
              Doha Spa Locations
            </span>
            <h2 className="contact-experience-title">Select Your Sanctuary</h2>
            <p className="contact-experience-subtitle">
              Switch between our Doha destinations to view private suite photo galleries, operational hours, and direct navigation.
            </p>
          </div>

          {/* CENTERED LUXURY BRANCH CARDS (01 & 02) */}
          <nav className="contact-branch-nav" aria-label="Choose a branch">
            {CONTACT_BRANCHES.map((b) => {
              const isSelected = activeBranchSlug === b.slug;
              const locationArea = b.slug === "jouri-hotel" ? "Old Salata, Doha" : "Abu Nakhlah, Salwa Road";
              return (
                <button
                  key={b.slug}
                  type="button"
                  data-contact-button={b.slug}
                  className={`branch-select-card ${isSelected ? "active" : ""}`}
                  onClick={() => setActiveBranchSlug(b.slug)}
                  aria-pressed={isSelected}
                >
                  <div className="card-top-row">
                    <span className="branch-card-num">{b.tabNum}</span>
                    <span className="branch-card-badge">
                      <span className="branch-card-dot" />
                      {b.openBadge}
                    </span>
                  </div>
                  <h3 className="branch-card-title">{b.name}</h3>
                  <div className="branch-card-meta">
                    <span className="branch-card-rating">
                      <i className="fa-solid fa-star" style={{ color: "var(--gold)", marginInlineEnd: 4 }} />
                      {b.rating.replace("★ ", "")}
                    </span>
                    <span className="branch-card-divider">•</span>
                    <span className="branch-card-loc">
                      <i className="fa-solid fa-location-dot" style={{ marginInlineEnd: 4 }} />
                      {locationArea}
                    </span>
                  </div>
                  <div className="branch-card-footer">
                    <span className="branch-card-hours">
                      <i className="fa-regular fa-clock" style={{ marginInlineEnd: 6 }} />
                      {b.hours}
                    </span>
                    <span className="branch-card-indicator">
                      {isSelected ? (
                        <>
                          <i className="fa-solid fa-circle-check" /> Active Sanctuary
                        </>
                      ) : (
                        <>
                          Select Branch <i className="fa-solid fa-arrow-right" style={{ marginInlineStart: 4 }} />
                        </>
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* ACTIVE BRANCH PANEL */}
          <div className="contact-panel-stage">
            <article className="contact-panel" data-contact-panel={activeBranch.slug}>
              <div className="contact-panel-media">
                {activeBranch.photos.map((photo, i) => (
                  <img
                    key={i}
                    src={photo}
                    width="900"
                    height="680"
                    loading="lazy"
                    decoding="async"
                    alt={`${activeBranch.name} spa treatment rooms in Doha, Qatar`}
                  />
                ))}
              </div>
              <div className="contact-panel-copy">
                <span className="rating-row">
                  <a
                    className="rating"
                    href={activeBranch.ratingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {activeBranch.rating}
                  </a>
                  <span className="open-badge is-open" data-open-badge>
                    {activeBranch.openBadge}
                  </span>
                  {branchDistances[activeBranch.slug] && (
                    <span className="contact-dist-badge">
                      <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                      {branchDistances[activeBranch.slug]}
                    </span>
                  )}
                </span>
                <h2>{activeBranch.name}</h2>
                <p>{activeBranch.address}</p>
                <p className="contact-hours">
                  <i className="fa-regular fa-clock" aria-hidden="true"></i>
                  {activeBranch.hours}
                </p>
                <a
                  className="contact-ig"
                  href={activeBranch.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                  Follow this branch on Instagram
                </a>
                <a className="contact-phone" href={`tel:${activeBranch.phone}`}>
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                  {activeBranch.phoneDisplay}
                </a>

                <div className="contact-action-grid">
                  <button
                    className="button"
                    type="button"
                    data-book
                    data-preselect-branch={activeBranch.slug}
                    onClick={() => openBookingModal(activeBranch.slug)}
                  >
                    Booking Options
                  </button>
                  <a
                    className="button button-ghost"
                    href={activeBranch.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Directions
                  </a>
                </div>

                <div className="contact-help">
                  <h3>When contacting us</h3>
                  <p>
                    Mention your preferred treatment, day, time, and number of guests. The team will
                    help confirm duration, availability, and suitable facilities.
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* FULL SCREEN / FULL WIDTH MAP SHOWCASE */}
          <section className="contact-map-showcase" aria-label="Interactive Location Map">
            <div className="contact-map-card">
              <div className="contact-map-header">
                <div className="contact-map-title">
                  <span className="contact-map-kicker">
                    <i className="fa-solid fa-map-location-dot" style={{ marginInlineEnd: 6 }} />
                    Live Google Map &amp; Navigation
                  </span>
                  <h3>{activeBranch.name}</h3>
                  <p>{activeBranch.address}</p>
                </div>
                <div className="contact-map-actions">
                  <a
                    className="button button-gold-direct"
                    href={activeBranch.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-solid fa-diamond-turn-right" style={{ marginInlineEnd: 8 }} />
                    Open Google Maps Directions
                  </a>
                </div>
              </div>

              <div className="contact-map-frame-wrapper">
                <iframe
                  src={activeBranch.mapIframe}
                  title={`${activeBranch.name} live map Doha Qatar`}
                  className="contact-map-iframe"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>
        </section>

        {/* GUIDANCE SECTION */}
        <section className="contact-guidance section">
          <div className="section-heading">
            <h2>Get a faster answer</h2>
            <p>Choose the channel that best matches what you need.</p>
          </div>
          <div className="journey-grid">
            <article>
              <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
              <h3>WhatsApp for booking</h3>
              <p>Best for sharing treatment and time preferences and receiving written confirmation.</p>
            </article>
            <article>
              <i className="fa-solid fa-phone" aria-hidden="true"></i>
              <h3>Call for an immediate answer</h3>
              <p>Best for checking a near-term appointment or a specific facility quickly.</p>
            </article>
            <article>
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              <h3>Directions for arrival</h3>
              <p>Open the correct branch in Google Maps before starting your journey.</p>
            </article>
          </div>
        </section>

        {/* ONLINE ENQUIRY FORM */}
        <section className="section" style={{ background: "var(--surface-alt, #F7F1E7)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", background: "#FCFBF8", padding: "2.5rem", borderRadius: "1.5rem", border: "1px solid #e8dfd1", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", color: "#a67c32" }}>
                Send Direct Message
              </span>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.75rem", color: "#221910", marginTop: "0.25rem" }}>
                Send Us An Inquiry
              </h2>
              <p style={{ fontSize: "0.875rem", color: "#7c7267" }}>
                Our guest coordinators reply promptly via WhatsApp or call to assist your visit.
              </p>
            </div>

            {formSubmitted ? (
              <div style={{ padding: "2rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "1rem", textAlign: "center" }}>
                <p style={{ color: "#059669", fontWeight: "700", fontSize: "1.1rem" }}>
                  Thank you! Your inquiry has been delivered directly to our front desk team.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  style={{ marginTop: "1rem", padding: "0.5rem 1.25rem", background: "#a67c32", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600" }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "600", color: "#554d42", marginBottom: "0.25rem" }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sheikh Al-Thani"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid #e8dfd1", background: "#fff", fontSize: "0.875rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "600", color: "#554d42", marginBottom: "0.25rem" }}>
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+974 5500 0000"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid #e8dfd1", background: "#fff", fontSize: "0.875rem" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "600", color: "#554d42", marginBottom: "0.25rem" }}>
                    Select Preferred Branch
                  </label>
                  <select
                    value={formBranch}
                    onChange={(e) => setFormBranch(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid #e8dfd1", background: "#fff", fontSize: "0.875rem" }}
                  >
                    <option value="Jouri, a Murwab Hotel">Jouri Hotel (Old Salata, Doha)</option>
                    <option value="Retaj Salwa Resort & Spa">Retaj Salwa Resort &amp; Spa (Salwa Road)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "600", color: "#554d42", marginBottom: "0.25rem" }}>
                    Message / Special Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what treatment, date, or amenities you would like to arrange..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid #e8dfd1", background: "#fff", fontSize: "0.875rem", resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  style={{
                    padding: "0.9rem 1.5rem",
                    background: "linear-gradient(135deg, #a67c32, #d4b370)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "0.75rem",
                    fontSize: "0.9rem",
                    fontWeight: "700",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(166, 124, 50, 0.3)",
                    marginTop: "0.5rem"
                  }}
                >
                  {formSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* 3. SITE FOOTER */}
      <SiteFooter />

      {/* 4. FLOATING QUICK CTAS */}
      

      {/* 5. INTERACTIVE 2-STEP BOOKING MODAL */}
      

      
    </>
  );
}
