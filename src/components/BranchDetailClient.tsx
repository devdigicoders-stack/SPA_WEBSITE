"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { DetailedBranchItem } from "@/data/branchesDetailedData";
import { THERAPISTS_DATA } from "@/data/therapistsData";
import { TREATMENTS_DATA } from "@/data/treatmentsData";

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

export default function BranchDetailClient({
  branch,
}: {
  branch: DetailedBranchItem;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<"branches" | "actions">("actions");
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>(branch.slug);
  const [bookingContext, setBookingContext] = useState<{ icon: string; text: string } | null>({
    icon: "fa-location-dot",
    text: `Branch: ${branch.name}`,
  });
  const [branchDistances, setBranchDistances] = useState<Record<string, string>>({});
  const [closestBranchSlug, setClosestBranchSlug] = useState<string | null>(null);

  const branches: BranchItem[] = [
    {
      id: 1,
      slug: "west-bay",
      name: "West Bay Diplomatic Suite",
      address: "Tower 1, Diplomatic District, West Bay, Doha, Qatar",
      phone: "+97444928888",
      whatsappNumber: "97455883421",
      whatsappMsg: "Hello Just Relax Spa West Bay! I would like to book a private suite appointment.",
      lat: 25.3216,
      lng: 51.5312,
    },
    {
      id: 2,
      slug: "the-pearl",
      name: "The Pearl-Qatar & Lusail Marina Suite",
      address: "Porto Arabia Boardwalk, Tower 12, The Pearl-Qatar, Doha",
      phone: "+97444957777",
      whatsappNumber: "97455887799",
      whatsappMsg: "Hello Just Relax Spa The Pearl! I would like to book an appointment.",
      lat: 25.3678,
      lng: 51.5517,
    },
  ];

  const currentBranch = branches.find((b) => b.slug === selectedBranchSlug) || branches[0];
  const branchTeam =
    THERAPISTS_DATA.find((t) => t.branchSlug === branch.slug)?.therapists || [];
  const topServices = TREATMENTS_DATA.slice(0, 6);

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
          branches.forEach((b) => {
            dists[b.slug] = calcDist(userLat, userLng, b.lat, b.lng);
          });

          let minSlug = branches[0].slug;
          let minDist = dists[branches[0].slug];
          for (const b of branches) {
            if (dists[b.slug] < minDist) {
              minDist = dists[b.slug];
              minSlug = b.slug;
            }
          }

          const distStrings: Record<string, string> = {};
          branches.forEach((b) => {
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

  const openBookingModal = (context?: { icon: string; text: string }) => {
    setBookingContext(context || { icon: "fa-location-dot", text: `Branch: ${branch.name}` });
    setSelectedBranchSlug(branch.slug);
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
          <Link href="/our-branches" className="is-active">Our Branches</Link>
          <Link href="/treatments">Treatments</Link>
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
        <section className="branch-detail-hero">
          <div className="branch-detail-hero-grid">
            <div className="branch-hero-copy">
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/our-branches">Our Branches</Link>
                <span>/</span>
                <b>{branch.name}</b>
              </nav>
              <p className="kicker">Just Relax Spa — Doha Sanctuary</p>
              <h1>{branch.h1}</h1>
              <div className="branch-hero-meta">
                <span className="rating">{branch.rating}</span>
                <span className="open-badge is-open" data-open-badge>
                  Open now
                </span>
                <span className="branch-hero-hours">
                  <i className="fa-regular fa-clock" aria-hidden="true"></i>
                  {branch.hours}
                </span>
              </div>
              <p className="branch-hero-address">
                <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                {branch.address}
              </p>
              <div className="hero-actions">
                <button
                  className="button"
                  type="button"
                  data-book
                  onClick={() => openBookingModal()}
                >
                  Book this branch
                </button>
                <a
                  className="button button-ghost"
                  href={`https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Laguna Spa, I would like directions or details for ${branch.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                  WhatsApp Concierge
                </a>
              </div>
            </div>
            <figure className="branch-hero-media">
              <img
                src={branch.heroImg}
                width="1600"
                height="900"
                alt={`Luxury massage & spa at ${branch.name}, Doha, Qatar`}
              />
            </figure>
          </div>
        </section>

        {/* GLANCE SECTION */}
        <section className="branch-glance section">
          <div className="detail-band branch-info-band">
            <article>
              <i className="fa-regular fa-clock" aria-hidden="true"></i>
              <div>
                <span>Working hours</span>
                <strong>{branch.hours}</strong>
              </div>
            </article>
            <article>
              <i className="fa-solid fa-phone" aria-hidden="true"></i>
              <div>
                <span>Phone</span>
                <strong dir="ltr">{branch.phone}</strong>
              </div>
            </article>
            <article>
              <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              <div>
                <span>Instagram</span>
                <strong>
                  <a
                    className="ig-chip"
                    href={`https://www.instagram.com/${branch.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {branch.instagram}
                  </a>
                </strong>
              </div>
            </article>
            <article>
              <i className="fa-solid fa-star" aria-hidden="true"></i>
              <div>
                <span>Rating</span>
                <strong>{branch.rating.split(' ')[0]} / 5</strong>
              </div>
            </article>
          </div>
          <div className="branch-amenities">
            {branch.amenities.map((am, i) => (
              <span key={i} className="amenity-chip">
                <i className={am.icon} aria-hidden="true"></i>
                <span dangerouslySetInnerHTML={{ __html: am.label }}></span>
              </span>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section className="section branch-gallery-section">
          <div className="section-heading">
            <p className="kicker">Inside the branch</p>
            <h2>Luxury hotel treatment rooms</h2>
          </div>
          <div className="continuous-gallery" tabIndex={0} aria-label={`${branch.name} photo tour`}>
            {branch.photos.map((photo, i) => (
              <div key={i} className="gallery-slide">
                <img
                  src={photo}
                  width="900"
                  height="680"
                  loading="lazy"
                  decoding="async"
                  alt={`${branch.name} interior photo ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* BRANCH TEAM */}
        {branchTeam.length > 0 && (
          <section className="section branch-team-section">
            <div className="section-heading">
              <p className="kicker">Branch team</p>
              <h2>Therapists at {branch.name}</h2>
              <p>Certified multilingual therapists — pick your favourite and book with her directly.</p>
            </div>
            <div className="therapist-grid">
              {branchTeam.map((t) => (
                <article key={t.id} className="therapist-card">
                  <div className="therapist-photo">
                    <img
                      src={t.image}
                      width="608"
                      height="1088"
                      loading="lazy"
                      decoding="async"
                      alt={`${t.name} — spa therapist in ${branch.name}`}
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
                      onClick={() =>
                        openBookingModal({
                          icon: "fa-user-check",
                          text: `Preferred Therapist: ${t.name}`,
                        })
                      }
                    >
                      Book with {t.name}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* SERVICES */}
        <section className="section branch-services-section">
          <div className="section-heading">
            <p className="kicker">Treatments available</p>
            <h2>Treatment menu in {branch.name}</h2>
            <p>Pick your treatment and request it when booking this branch.</p>
          </div>
          <div className="treatment-grid">
            {topServices.map((t) => (
              <article key={t.id} className="treatment-card">
                <img
                  src={t.image}
                  width="700"
                  height="520"
                  loading="lazy"
                  decoding="async"
                  alt={`${t.title} at ${branch.name}`}
                />
                <div>
                  <h2>{t.title}</h2>
                  <p>{t.description}</p>
                  <div className="card-actions">
                    <button
                      type="button"
                      data-book
                      onClick={() =>
                        openBookingModal({
                          icon: "fa-sparkles",
                          text: `Treatment: ${t.title} at ${branch.name}`,
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
          </div>
        </section>

        {/* REVIEWS */}
        {branch.reviews.length > 0 && (
          <section className="section branch-reviews-section">
            <div className="section-heading">
              <p className="kicker">Guest reviews</p>
              <h2>What our guests say</h2>
            </div>
            <div className="branch-review-grid">
              {branch.reviews.map((rev, i) => (
                <article key={i} className="branch-review-card">
                  <span className="branch-review-stars">{rev.stars}</span>
                  <p>{rev.text}</p>
                  <b>{rev.author}</b>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* AREA COPY */}
        {branch.areaCopy.length > 0 && (
          <section className="prose-section branch-area-copy">
            <h2>Why guests choose Laguna Global in {branch.name}</h2>
            <div className="prose-columns">
              {branch.areaCopy.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )}

        {/* GETTING HERE */}
        <section className="section branch-getting-here">
          <div className="getting-here-grid">
            <div className="getting-here-copy">
              <p className="kicker">Getting here</p>
              <h2>Find us in {branch.name}</h2>
              <p className="getting-here-address">
                <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                {branch.address}
              </p>
              {branch.landmarks.length > 0 && (
                <div className="getting-here-landmarks">
                  <span className="branch-nearby-label">
                    <i className="fa-solid fa-location-arrow" aria-hidden="true"></i>Minutes from
                  </span>
                  <div className="getting-here-chips">
                    {branch.landmarks.map((lm, i) => (
                      <span key={i} className="nearby-chip">
                        {lm}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <a
                className="button button-ghost"
                href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-diamond-turn-right" aria-hidden="true"></i>Open in Google Maps
              </a>
            </div>
            {branch.mapIframe && (
              <iframe
                src={branch.mapIframe}
                title={`${branch.name} map`}
                width="800"
                height="480"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            )}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta">
          <h2>Book your session in {branch.name}</h2>
          <p>WhatsApp or call — choose what suits you and we will confirm instantly.</p>
          <button
            className="button"
            type="button"
            data-book
            onClick={() => openBookingModal()}
          >
            Start booking
          </button>
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
                <Link href="/about">About Just Relax Spa</Link>
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
                {branches.map((b) => (
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

