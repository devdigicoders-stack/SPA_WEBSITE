"use client";

import SiteFooter from '@/components/SiteFooter';

import React, { useRef, useState } from "react";
import Link from "next/link";
import WhatsAppModal from "@/components/WhatsAppModal";

interface BranchItem {
  id: number;
  slug: string;
  name: string;
  rating: string;
  licenseNo?: string;
  description: string;
  address: string;
  hours: string;
  phone: string;
  whatsappNumber: string;
  whatsappMsg: string;
  instagram: string;
  instagramHandle: string;
  mapIframe: string;
  mapLink: string;
  lat: number;
  lng: number;
  landmarks: { name: string; mins: number }[];
  gallery: string[];
}

export default function OurBranchesPage() {
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
      slug: "jouri-hotel",
      name: "Jouri, a Murwab Hotel",
      rating: "4.96",
      
      description:
        "Flagship 4-star hotel sanctuary situated inside Jouri, a Murwab Hotel on Al Muthaf Street in Old Salata, Doha. Features authentic Moroccan baths, heated hammam, private soundproof treatment rooms, indoor heated pool and jacuzzi.",
      address: "Al Muthaf Street, Street 137, Building 31, Zone 18, Old Salata, Doha, Qatar",
      hours: "Daily 10:00 AM – 1:00 AM",
      phone: "+974 7002 4322",
      whatsappNumber: "97470024322",
      whatsappMsg:
        "Hello Just Relax Spa Jouri Hotel! I would like to book a treatment.",
      instagram: "https://www.instagram.com/justrelaxspa.qa",
      instagramHandle: "@justrelaxspa.qa",
      mapIframe:
        "https://maps.google.com/maps?q=Jouri+a+Murwab+Hotel+Doha&t=&z=15&ie=UTF8&iwloc=&output=embed",
      mapLink: "https://maps.app.goo.gl/JbsB9BgUa1nxUPYeA?g_st=ac",
      lat: 25.2892,
      lng: 51.5434,
      landmarks: [
        { name: "National Museum of Qatar & Metro", mins: 2 },
        { name: "Doha Corniche Promenade", mins: 3 },
        { name: "Souq Waqif & Gold Souq", mins: 5 },
        { name: "Hamad International Airport", mins: 10 },
      ],
      gallery: [
        "/assets/just-relax/branches/retaj-salwa/retaj-salwa-hero.jpg",
        "/assets/just-relax/branches/retaj-salwa/retaj-salwa-moroccan-bath.jpg",
        "/assets/just-relax/branches/retaj-salwa/retaj-salwa-relaxation.jpg",
        "/assets/just-relax/branches/retaj-salwa/retaj-salwa-massage-suite.jpg",
        "/assets/just-relax/branches/retaj-salwa/retaj-salwa-amenities.jpg",
        "/assets/just-relax/branches/retaj-salwa/retaj-salwa-jacuzzi.jpg",
      ],
    },
    {
      id: 2,
      slug: "retaj-salwa",
      name: "Retaj Salwa Resort & Spa",
      rating: "4.95",
      
      description:
        "Nestled within the 5-star Retaj Salwa Resort & Spa on Salwa Road, Abu Nakhlah, this peaceful sanctuary provides gentlemen and executives an elite wellness retreat. Private soundproof VIP suites, authentic Moroccan Beldi bath chambers, hydrotherapy, and late-night appointments.",
      address: "Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar",
      hours: "Daily 10:00 AM – 12:00 AM",
      phone: "+974 3334 4048",
      whatsappNumber: "97433344048",
      whatsappMsg:
        "Hello Just Relax Spa Retaj Salwa! I would like to book a private suite appointment.",
      instagram: "https://www.instagram.com/justrelaxspa.qa",
      instagramHandle: "@justrelaxspa.qa",
      mapIframe:
        "https://maps.google.com/maps?q=Retaj+Salwa+Resort+%26+Spa+Doha&t=&z=15&ie=UTF8&iwloc=&output=embed",
      mapLink: "https://maps.app.goo.gl/2y2YLqXKL9fuEeXg9?g_st=ac",
      lat: 25.1686,
      lng: 51.3158,
      landmarks: [
        { name: "Salwa Road (Exit 29 / 31)", mins: 1 },
        { name: "Abu Nakhlah Oasis", mins: 3 },
        { name: "Villaggio Mall & Aspire Zone", mins: 15 },
        { name: "Hamad International Airport", mins: 25 },
      ],
      gallery: [
        "/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg",
        "/assets/just-relax/branches/jouri-hotel/jouri-hotel-massage-suite.jpg",
        "/assets/just-relax/branches/jouri-hotel/jouri-hotel-moroccan-bath.jpg",
        "/assets/just-relax/branches/jouri-hotel/jouri-hotel-jacuzzi.jpg",
        "/assets/just-relax/branches/jouri-hotel/jouri-hotel-relaxation.jpg",
        "/assets/just-relax/branches/jouri-hotel/jouri-hotel-amenities.jpg",
      ],
    },

  ];

  const openModal = (preferredAction?: string, preselectBranch?: string) => {
    if (typeof window !== "undefined" && (window as any).__openJustRelaxBooking) {
      (window as any).__openJustRelaxBooking(preferredAction, preselectBranch);
      return;
    }
  };

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleSelectBranch = (slug: string) => {
    setSelectedBranchSlug(slug);
    setBookingStep("actions");
  };


  const currentBranch =
    branches.find((b) => b.slug === selectedBranchSlug) || branches[0];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* HEADER */}
      <header className="site-header" data-header>
        <Link className="brand" href="/?lang=en">
          <img
            src="/assets/images/logo.png"
            width="96"
            height="42"
            alt="Just Relax Spa"
          />
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
          <Link href="/our-branches" className="active is-active">Our Branches</Link>
          <Link href="/treatments">Treatments</Link>
          <Link href="/treatment-finder">Find Your Ritual</Link>
          <Link href="/therapists">Therapists</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="header-actions">
          <button
            className="button button-small"
            type="button"
            onClick={() => openModal()}
          >
            Book Now
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main id="main">
        {/* FULL BLEED BRANCHES HERO */}
        <section className="hero page-hero branches-hero">
          <img
            src="/assets/just-relax/branches/retaj-salwa/retaj-salwa-hero.jpg"
            alt="Just Relax Spa Premier Doha Branches"
            className="hero-bg-img"
            width="1920"
            height="1080"
          />
          <div className="hero-scrim"></div>

          <div className="hero-content">
            <p className="kicker">Two Premier Doha Destinations</p>
            <h1>A Sanctuary of Distinction at Every Branch</h1>
            <p>
              Compare locations, private VIP suites, authentic heated marble hammams, and real interior facilities across Jouri Murwab Hotel and Retaj Salwa Resort &amp; Spa.
            </p>
            <div className="hero-actions">
              <a className="button" href="#branch-jouri-hotel">
                Explore Jouri Hotel
              </a>
              <a className="button button-ghost" href="#branch-retaj-salwa">
                Explore Retaj Salwa
              </a>
            </div>
          </div>
        </section>

        {/* BRANCH DIRECTORY */}
        <section className="branch-directory" data-branch-list>
          {branches.map((b) => (
            <article
              key={b.slug}
              id={`branch-${b.slug}`}
              className={`branch-destination ${
                closestBranchSlug === b.slug ? "closest-branch" : ""
              }`}
              data-branch-card
              data-branch-slug={b.slug}
            >
              <header className="branch-destination-header">
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                  <a
                    className="rating"
                    href={b.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ★ {b.rating}
                  </a>
                  <span className="open-badge is-open">Open now</span>
                  
                  {closestBranchSlug === b.slug && (
                    <span className="closest-label">Closest to you</span>
                  )}
                </div>
                <h2>
                  <Link href={`/our-branches/${b.slug}?lang=en`}>{b.name}</Link>
                </h2>
                <p>{b.description}</p>
                {branchDistances[b.slug] && (
                  <strong>{branchDistances[b.slug]}</strong>
                )}
              </header>

              {/* CONTINUOUS PHOTO GALLERY */}
              <div
                className="continuous-gallery"
                aria-label={`${b.name} interior gallery`}
              >
                <div className="continuous-gallery-track">
                  {b.gallery.map((imgSrc, idx) => (
                    <img
                      key={idx}
                      src={imgSrc}
                      width="720"
                      height="520"
                      loading="lazy"
                      decoding="async"
                      alt={`${b.name} massage & spa interior in Doha, Qatar`}
                    />
                  ))}
                </div>
              </div>

              {/* INFORMATION GRID */}
              <div className="branch-information-grid">
                <section>
                  <span>Municipal License</span>
                  <p className="info-line">
                    <i className="fa-solid fa-award" aria-hidden="true" style={{ color: "#a67c32" }}></i>
                    
                  </p>
                </section>
                <section>
                  <span>Location</span>
                  <p>{b.address}</p>
                </section>
                <section>
                  <span>Working hours</span>
                  <p className="info-line">
                    <i
                      className="fa-regular fa-clock"
                      aria-hidden="true"
                    ></i>
                    {b.hours}
                  </p>
                </section>
                <section>
                  <span>Booking and enquiries</span>
                  <a href={`tel:${b.phone}`}>{b.phone}</a>
                </section>
                <section>
                  <span>Follow us</span>
                  <p className="info-line">
                    <a
                      className="ig-chip"
                      href={b.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className="fa-brands fa-instagram"
                        aria-hidden="true"
                      ></i>
                      {b.instagramHandle}
                    </a>
                  </p>
                </section>
                <section>
                  <span>Treatments</span>
                  <p>
                    Massage, Moroccan and Turkish baths, and wellness treatments
                    subject to availability.
                  </p>
                </section>
              </div>

              {/* NEARBY LANDMARKS */}
              <div className="branch-nearby">
                <span className="branch-nearby-label">
                  <i
                    className="fa-solid fa-car-side"
                    aria-hidden="true"
                  ></i>
                  Minutes from
                </span>
                {b.landmarks.map((lm, idx) => (
                  <span key={idx} className="nearby-chip">
                    {lm.name} · {lm.mins} min
                  </span>
                ))}
              </div>

              {/* ACTION ROW */}
              <div className="branch-action-row">
                <a
                  className="branch-direct-action"
                  href={`tel:${b.phone}`}
                >
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                  <span>Call</span>
                </a>
                <a
                  className="branch-direct-action whatsapp"
                  href={`https://wa.me/${b.whatsappNumber}?text=${encodeURIComponent(
                    b.whatsappMsg
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fa-brands fa-whatsapp"
                    aria-hidden="true"
                  ></i>
                  <span>WhatsApp</span>
                </a>
                <a
                  className="branch-direct-action"
                  href={b.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fa-solid fa-location-dot"
                    aria-hidden="true"
                  ></i>
                  <span>Directions</span>
                </a>
              </div>

              {/* EMBEDDED GOOGLE MAP ACCORDION */}
              <details className="branch-map-disclosure">
                <summary>View Branch Map</summary>
                <iframe
                  src={b.mapIframe}
                  title={`${b.name} Google Map`}
                  width="600"
                  height="450"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                ></iframe>
              </details>
            </article>
          ))}
        </section>

        {/* FINAL CTA */}
        <section className="final-cta">
          <div>
            <h2>Not sure which branch to choose?</h2>
            <p>
              Use your location and we will recommend the closest destination,
              then choose how you want to connect.
            </p>
            <button className="button" type="button" onClick={() => openModal()}>
              Find My Branch
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <SiteFooter />

      {/* FLOATING CTAs */}
      

      {/* BOOKING DIALOG */}
      

      
    </>
  );
}

