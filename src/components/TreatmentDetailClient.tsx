"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { TREATMENTS_DATA, TreatmentItem } from "@/data/treatmentsData";

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
      phone: "+97444928888",
      whatsappNumber: "97455883421",
      whatsappMsg: `Hello Just Relax Spa West Bay! I would like to book ${treatment.title}.`,
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
      whatsappMsg: `Hello Just Relax Spa The Pearl! I would like to book ${treatment.title}.`,
      lat: 25.3678,
      lng: 51.5517,
    },
  ];

  const currentBranch = branches.find((b) => b.slug === selectedBranchSlug) || branches[0];

  const relatedTreatments = TREATMENTS_DATA.filter((t) =>
    treatment.relatedSlugs.includes(t.slug)
  ).slice(0, 3);

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
          <Link href="/treatments" className="is-active">Treatments</Link>
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

