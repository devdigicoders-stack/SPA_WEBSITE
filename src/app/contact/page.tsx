"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

interface BranchContactData {
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
    ratingUrl: "https://maps.google.com/?q=Jouri+a+Murwab+Hotel+Doha",
    openBadge: "Open now (Till 3:00 AM)",
    address: "Al Muthaf Street, Street 137, Building 31, Zone 18, Old Salata, Doha, Qatar",
    hours: "Daily 10:00 AM – 3:00 AM",
    instagram: "https://www.instagram.com/justrelaxspa.qa",
    instagramHandle: "@justrelaxspa.qa",
    phone: "+97440041000",
    phoneDisplay: "+974 4004 1000",
    whatsappNumber: "97455883421",
    whatsappMsg: "Hello Just Relax Spa Jouri Hotel! I would like to book a treatment.",
    mapIframe:
      "https://maps.google.com/maps?q=Jouri+a+Murwab+Hotel+Doha&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapDirectionsUrl: "https://maps.google.com/?q=Jouri+a+Murwab+Hotel+Doha",
    lat: 25.2892,
    lng: 51.5434,
    photos: [
      "/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-moroccan-bath.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-turkish-hammam.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-massage-suite.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-lounge.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-jacuzzi.jpg",
    ],
  },
  {
    id: 2,
    slug: "west-bay",
    tabNum: "02",
    name: "West Bay Diplomatic Suite",
    rating: "★ 4.95",
    ratingUrl: "https://maps.google.com/?q=West+Bay+Doha+Qatar",
    openBadge: "Open now (Till 3:00 AM)",
    address: "Tower 1, Diplomatic District, West Bay, Doha, Qatar",
    hours: "Daily 10:00 AM – 3:00 AM",
    instagram: "https://www.instagram.com/justrelaxspa.qa",
    instagramHandle: "@justrelaxspa.qa",
    phone: "+97444928888",
    phoneDisplay: "+974 4492 8888",
    whatsappNumber: "97455883421",
    whatsappMsg: "Hello Just Relax Spa West Bay! I would like to book a private suite appointment.",
    mapIframe:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14424.484218318285!2d51.523098544555664!3d25.322830800000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c531d0411a75%3A0x6b093f48651c6b12!2sWest%20Bay%2C%20Doha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa",
    mapDirectionsUrl: "https://maps.google.com/?q=West+Bay+Doha+Qatar",
    lat: 25.3216,
    lng: 51.5312,
    photos: [
      "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-massage-suite.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-moroccan-bath.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-jacuzzi.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-relaxation.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-amenities.jpg",
    ],
  },
  {
    id: 3,
    slug: "the-pearl",
    tabNum: "03",
    name: "The Pearl-Qatar & Lusail Marina Suite",
    rating: "★ 4.94",
    ratingUrl: "https://maps.google.com/?q=The+Pearl+Qatar+Doha",
    openBadge: "Open now (Till 3:00 AM)",
    address: "Porto Arabia Boardwalk, Tower 12, The Pearl-Qatar, Doha",
    hours: "Daily 10:00 AM – 3:00 AM",
    instagram: "https://www.instagram.com/justrelaxspa.qa",
    instagramHandle: "@justrelaxspa.qa",
    phone: "+97444957777",
    phoneDisplay: "+974 4495 7777",
    whatsappNumber: "97455887799",
    whatsappMsg: "Hello Just Relax Spa The Pearl! I would like to book an appointment.",
    mapIframe:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14421.325983796856!2d51.5435948!3d25.3670669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c47bfa6fa589%3A0xbcebcefc7f369f69!2sThe%20Pearl-Qatar%2C%20Doha!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa",
    mapDirectionsUrl: "https://maps.google.com/?q=The+Pearl+Qatar+Doha",
    lat: 25.3678,
    lng: 51.5517,
    photos: [
      "/assets/just-relax/branches/the-pearl/the-pearl-hero.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-turkish-hammam.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-hydrotherapy.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-couples-suite.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-steam-room.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-lounge.jpg",
    ],
  },
];

export default function ContactPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [activeBranchSlug, setActiveBranchSlug] = useState<string>("west-bay");
  const [bookingStep, setBookingStep] = useState<"branches" | "actions">("branches");
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>("west-bay");
  const [bookingContext, setBookingContext] = useState<{ icon: string; text: string } | null>(null);
  const [branchDistances, setBranchDistances] = useState<Record<string, string>>({});
  const [closestBranchSlug, setClosestBranchSlug] = useState<string | null>(null);

  const activeBranch =
    CONTACT_BRANCHES.find((b) => b.slug === activeBranchSlug) || CONTACT_BRANCHES[0];
  const currentBranch =
    CONTACT_BRANCHES.find((b) => b.slug === selectedBranchSlug) || CONTACT_BRANCHES[0];

  // Geolocation computation
  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;

          const toRad = (v: number) => (v * Math.PI) / 180;
          const calcDist = (lat1: number, lon1: number, lat2: number, lon2: number) => {
            const R = 6371;
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
          };

          const dists: Record<string, number> = {};
          CONTACT_BRANCHES.forEach((b) => {
            dists[b.slug] = calcDist(userLat, userLng, b.lat, b.lng);
          });

          let minSlug = CONTACT_BRANCHES[0].slug;
          let minDist = dists[CONTACT_BRANCHES[0].slug];
          for (const b of CONTACT_BRANCHES) {
            if (dists[b.slug] < minDist) {
              minDist = dists[b.slug];
              minSlug = b.slug;
            }
          }

          const distStrings: Record<string, string> = {};
          CONTACT_BRANCHES.forEach((b) => {
            const d = dists[b.slug];
            distStrings[b.slug] = d < 1 ? `${Math.round(d * 1000)} m away` : `${d.toFixed(1)} km away`;
          });

          setBranchDistances(distStrings);
          setClosestBranchSlug(minSlug);
        },
        () => {},
        { timeout: 8000 }
      );
    }
  }, []);

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
          <Link href="/about-laguna">About</Link>
          <Link href="/our-branches">Our Branches</Link>
          <Link href="/treatments">Treatments</Link>
          <Link href="/treatment-finder">Find Your Ritual</Link>
          <Link href="/therapists">Therapists</Link>
          <Link href="/contact" className="is-active">Contact</Link>
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
        <section className="inner-hero contact-hero">
          <p className="kicker">Contact a branch directly</p>
          <h1>Choose a branch, then choose how to connect</h1>
          <p>
            Move through our four branches, review interiors, location, and details, without completing
            a contact form.
          </p>
        </section>

        {/* CONTACT EXPERIENCE */}
        <section className="contact-experience" data-contact-experience>
          {/* BRANCH NAV TABS */}
          <nav className="contact-branch-nav" aria-label="Choose a branch">
            {CONTACT_BRANCHES.map((b) => (
              <button
                key={b.slug}
                type="button"
                data-contact-button={b.slug}
                className={activeBranchSlug === b.slug ? "active" : ""}
                onClick={() => setActiveBranchSlug(b.slug)}
              >
                <span>{b.tabNum}</span>
                {b.name}
              </button>
            ))}
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

                <iframe
                  src={activeBranch.mapIframe}
                  title={`${activeBranch.name} map`}
                  width="600"
                  height="450"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                ></iframe>
              </div>
            </article>
          </div>
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
      </main>

      {/* 3. SITE FOOTER */}
      <footer className="site-footer" role="contentinfo">
        <div className="footer-columns">
          <div className="footer-brand">
            <img
              src="/assets/images/logo.png"
              width="180"
              height="45"
              alt="Just Relax Spa Doha"
              loading="lazy"
              decoding="async"
            />
            <p>
              Just Relax Spa is Doha&apos;s premier men&apos;s wellness sanctuary, delivering authentic Moroccan baths,
              Turkish hammams, and therapeutic deep tissue recovery across two distinguished Doha locations.
            </p>
            <p className="footer-license">
              Registered in Qatar · Ministry of Commerce and Industry (MOCI) · CR No. 184920
            </p>
          </div>
          <div>
            <p className="footer-heading">Branches</p>
            <ul>
              <li>
                <Link href="/our-branches/west-bay">West Bay Diplomatic Suite</Link>
              </li>
              <li>
                <Link href="/our-branches/the-pearl">The Pearl &amp; Lusail Suite</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-heading">Rituals</p>
            <ul>
              <li>
                <Link href="/treatments/royal-moroccan">Royal Moroccan Bath</Link>
              </li>
              <li>
                <Link href="/treatments/turkish-bath">Turkish Bath</Link>
              </li>
              <li>
                <Link href="/treatments/deep-tissue">Deep Tissue Massage</Link>
              </li>
              <li>
                <Link href="/treatments/swedish-massage">Swedish Massage</Link>
              </li>
              <li>
                <Link href="/treatment-finder">Find Your Ritual</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-heading">Company</p>
            <ul>
              <li>
                <Link href="/about-laguna">About Just Relax Spa</Link>
              </li>
              <li>
                <Link href="/therapists">Our Therapists</Link>
              </li>
              <li>
                <Link href="/contact">Contact &amp; Locations</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Just Relax Spa - Men&apos;s Sanctuary. All rights reserved.</p>
        </div>
      </footer>

      {/* 4. FLOATING QUICK CTAS */}
      <aside className="floating-ctas" aria-label="Quick contact actions">
        <a
          href="https://wa.me/97455883421"
          className="floating-cta floating-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
          <b>WhatsApp</b>
        </a>
        <a href="tel:+97444928888" className="floating-cta floating-call" aria-label="Call Just Relax Spa">
          <i className="fa-solid fa-phone" aria-hidden="true"></i>
          <b>Call</b>
        </a>
        <button
          type="button"
          className="floating-cta floating-book"
          data-book
          onClick={() => openBookingModal()}
          aria-label="Open booking dialog"
        >
          <i className="fa-regular fa-calendar-check" aria-hidden="true"></i>
          <b>Book</b>
        </button>
      </aside>

      {/* 5. INTERACTIVE 2-STEP BOOKING MODAL */}
      <dialog
        ref={dialogRef}
        className="booking-dialog"
        data-booking
        aria-labelledby="booking-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeBookingModal();
        }}
      >
        <div className="booking-dialog-inner">
          <button
            type="button"
            className="booking-close"
            aria-label="Close dialog"
            onClick={closeBookingModal}
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>

          {bookingContext && (
            <div className="booking-context-banner">
              <i className={`fa-solid ${bookingContext.icon || "fa-sparkles"}`} aria-hidden="true"></i>
              <span>{bookingContext.text}</span>
            </div>
          )}

          {bookingStep === "branches" ? (
            <div className="booking-step booking-step-branches is-active">
              <h2 id="booking-title" className="booking-title">
                Choose a Branch
              </h2>
              <p className="booking-sub">Select the Just Relax Spa branch closest to you to proceed with booking</p>
              <div className="booking-branches-list">
                {CONTACT_BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={`booking-branch-card ${
                      closestBranchSlug === b.slug ? "is-closest" : ""
                    }`}
                    onClick={() => handleSelectBranch(b.slug)}
                  >
                    <span className="booking-branch-name">{b.name}</span>
                    <span className="booking-branch-address">{b.address}</span>
                    {branchDistances[b.slug] && (
                      <span className="booking-branch-dist">
                        <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                        {branchDistances[b.slug]}
                        {closestBranchSlug === b.slug && " · Closest to you"}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="booking-step booking-step-actions is-active">
              <button
                type="button"
                className="booking-back"
                onClick={() => setBookingStep("branches")}
              >
                <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                Change Branch
              </button>
              <h2 className="booking-title">{currentBranch.name}</h2>
              <p className="booking-sub">{currentBranch.address}</p>
              <div className="booking-actions-grid">
                <a
                  href={`https://wa.me/${currentBranch.whatsappNumber}?text=${encodeURIComponent(
                    bookingContext ? `${currentBranch.whatsappMsg} (${bookingContext.text})` : currentBranch.whatsappMsg
                  )}`}
                  className="booking-action-btn booking-action-wa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                  <span>Book via WhatsApp</span>
                  <small>Fastest response · Instant confirmation</small>
                </a>
                <a
                  href={`tel:${currentBranch.phone}`}
                  className="booking-action-btn booking-action-call"
                >
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                  <span>Call Reception</span>
                  <small>{currentBranch.phone}</small>
                </a>
                <a
                  href={`https://maps.google.com/?q=${currentBranch.lat},${currentBranch.lng}`}
                  className="booking-action-btn booking-action-map"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-location-arrow" aria-hidden="true"></i>
                  <span>Directions in Google Maps</span>
                  <small>Open navigation to branch</small>
                </a>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
