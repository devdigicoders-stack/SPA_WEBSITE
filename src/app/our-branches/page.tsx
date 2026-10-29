"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

interface BranchItem {
  id: number;
  slug: string;
  name: string;
  rating: string;
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
      hours: "Daily 10:00 AM – 3:00 AM",
      phone: "+974 4004 1000",
      whatsappNumber: "97455883421",
      whatsappMsg:
        "Hello Just Relax Spa Jouri Hotel! I would like to book a treatment.",
      instagram: "https://www.instagram.com/justrelaxspa.qa",
      instagramHandle: "@justrelaxspa.qa",
      mapIframe:
        "https://maps.google.com/maps?q=Jouri+a+Murwab+Hotel+Doha&t=&z=15&ie=UTF8&iwloc=&output=embed",
      mapLink: "https://maps.google.com/?q=Jouri+a+Murwab+Hotel+Doha",
      lat: 25.2892,
      lng: 51.5434,
      landmarks: [
        { name: "National Museum of Qatar & Metro", mins: 2 },
        { name: "Doha Corniche Promenade", mins: 3 },
        { name: "Souq Waqif & Gold Souq", mins: 5 },
        { name: "Hamad International Airport", mins: 10 },
      ],
      gallery: [
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
      name: "West Bay Diplomatic Suite",
      rating: "4.95",
      description:
        "Positioned in the prestigious diplomatic and financial quarter of Doha, West Bay provides gentlemen and executives an elite, confidential wellness haven. Private soundproof VIP suites, authentic Moroccan Beldi bath chambers, and late-night appointments.",
      address: "Tower 1, Diplomatic District, West Bay, Doha, Qatar",
      hours: "Daily 10:00 AM – 3:00 AM",
      phone: "+974 4492 8888",
      whatsappNumber: "97455883421",
      whatsappMsg:
        "Hello Just Relax Spa West Bay! I would like to book a private suite appointment.",
      instagram: "https://www.instagram.com/justrelaxspa.qa",
      instagramHandle: "@justrelaxspa.qa",
      mapIframe:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14424.484218318285!2d51.523098544555664!3d25.322830800000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c531d0411a75%3A0x6b093f48651c6b12!2sWest%20Bay%2C%20Doha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa",
      mapLink: "https://maps.google.com/?q=West+Bay+Doha+Qatar",
      lat: 25.3216,
      lng: 51.5312,
      landmarks: [
        { name: "Doha Corniche Promenade", mins: 3 },
        { name: "DECC Metro Station", mins: 4 },
        { name: "City Center Doha", mins: 5 },
        { name: "Souq Waqif", mins: 10 },
      ],
      gallery: [
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
      name: "The Pearl-Qatar & Lusail Marina Suite",
      rating: "4.94",
      description:
        "Located directly on the Porto Arabia marina promenade at The Pearl-Qatar, minutes from Lusail Marina. Houses our heated marble Turkish Hammam, underwater hydrotherapy, and royal Moroccan bathing chambers in absolute discretion.",
      address: "Porto Arabia Boardwalk, Tower 12, The Pearl-Qatar, Doha",
      hours: "Daily 10:00 AM – 3:00 AM",
      phone: "+974 4495 7777",
      whatsappNumber: "97455887799",
      whatsappMsg:
        "Hello Just Relax Spa The Pearl! I would like to book an appointment.",
      instagram: "https://www.instagram.com/justrelaxspa.qa",
      instagramHandle: "@justrelaxspa.qa",
      mapIframe:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14421.325983796856!2d51.5435948!3d25.3670669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c47bfa6fa589%3A0xbcebcefc7f369f69!2sThe%20Pearl-Qatar%2C%20Doha!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa",
      mapLink: "https://maps.google.com/?q=The+Pearl+Qatar+Doha",
      lat: 25.3678,
      lng: 51.5517,
      landmarks: [
        { name: "Porto Arabia Boardwalk", mins: 1 },
        { name: "Medina Centrale", mins: 4 },
        { name: "Lusail Marina Promenade", mins: 7 },
        { name: "Katara Cultural Village", mins: 8 },
      ],
      gallery: [
        "/assets/just-relax/branches/the-pearl/the-pearl-hero.jpg",
        "/assets/just-relax/branches/the-pearl/the-pearl-turkish-hammam.jpg",
        "/assets/just-relax/branches/the-pearl/the-pearl-hydrotherapy.jpg",
        "/assets/just-relax/branches/the-pearl/the-pearl-couples-suite.jpg",
        "/assets/just-relax/branches/the-pearl/the-pearl-steam-room.jpg",
        "/assets/just-relax/branches/the-pearl/the-pearl-lounge.jpg",
      ],
    },
  ];

  const openModal = (preferredAction?: string, preselectBranch?: string) => {
    if (preselectBranch) {
      setSelectedBranchSlug(preselectBranch);
      setBookingStep("actions");
    } else {
      setBookingStep("branches");
    }

    if (preferredAction === "whatsapp") {
      setBookingContext({
        icon: "fa-brands fa-whatsapp",
        text: "Continue via WhatsApp — choose your branch",
      });
    } else if (preferredAction === "call") {
      setBookingContext({
        icon: "fa-solid fa-phone",
        text: "Continue via Call — choose your branch",
      });
    } else if (preferredAction === "directions") {
      setBookingContext({
        icon: "fa-solid fa-location-arrow",
        text: "Continue via Directions — choose your branch",
      });
    } else {
      setBookingContext(null);
    }

    if (dialogRef.current) {
      dialogRef.current.showModal();
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

  const handleLocateClosest = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const distances: Record<string, string> = {};
        let closest = "west-bay";
        let minD = Infinity;

        branches.forEach((b) => {
          const d = Math.hypot(latitude - b.lat, longitude - b.lng) * 111;
          distances[b.slug] = `${d.toFixed(1)} km away`;
          if (d < minD) {
            minD = d;
            closest = b.slug;
          }
        });

        setBranchDistances(distances);
        setClosestBranchSlug(closest);

        // Scroll to the closest branch
        const el = document.getElementById(`branch-${closest}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      },
      (err) => {
        console.warn("Geolocation permission error:", err);
      }
    );
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
          <Link href="/?lang=en">Home</Link>
          <Link href="/about-laguna?lang=en">About</Link>
          <Link href="/our-branches?lang=en">Our Branches</Link>
          <Link href="/treatments?lang=en">Treatments</Link>
          <Link href="/treatment-finder?lang=en">Find Your Ritual</Link>
          <Link href="/therapists?lang=en">Therapists</Link>
          <Link href="/contact?lang=en">Contact</Link>
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
        {/* BRANCHES HERO */}
        <section className="branches-hero">
          <div className="branches-hero-inner">
            <div className="branches-hero-copy">
              <p className="kicker">Two Doha destinations</p>
              <h1>A sanctuary of distinction at every branch</h1>
              <p>
                Compare locations, distance, facilities, and real interior
                photography across West Bay and The Pearl-Qatar, then choose the destination that fits your day.
              </p>
              <button
                className="button"
                type="button"
                onClick={handleLocateClosest}
              >
                Show Closest First
              </button>
            </div>

            <div
              className="branches-hero-tiles"
              role="list"
              aria-label="Just Relax Spa branches"
            >
              <a
                className="branch-hero-tile"
                role="listitem"
                href="#branch-west-bay"
              >
                <img
                  src="/assets/just-relax/branches/west-bay/west-bay-hero.jpg"
                  width="640"
                  height="420"
                  loading="lazy"
                  decoding="async"
                  alt="West Bay Diplomatic Suite men's spa in Doha"
                />
                <span className="tile-label">
                  <strong>West Bay Diplomatic Suite</strong>
                  <em>
                    <i className="fa-solid fa-star" aria-hidden="true"></i> 4.95
                  </em>
                </span>
              </a>

              <a
                className="branch-hero-tile"
                role="listitem"
                href="#branch-the-pearl"
              >
                <img
                  src="/assets/just-relax/branches/the-pearl/the-pearl-hero.jpg"
                  width="640"
                  height="420"
                  loading="lazy"
                  decoding="async"
                  alt="The Pearl-Qatar & Lusail Marina Suite men's spa in Doha"
                />
                <span className="tile-label">
                  <strong>The Pearl & Lusail Marina</strong>
                  <em>
                    <i className="fa-solid fa-star" aria-hidden="true"></i> 4.94
                  </em>
                </span>
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
                <div>
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
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/?lang=en">
              <img
                src="/assets/images/logo.png"
                width="140"
                height="50"
                alt="Just Relax Spa"
              />
              <span>JUST RELAX SPA</span>
            </Link>
            <p>
              Two premier Doha destinations for men's therapeutic massage, authentic Moroccan baths, and royal Turkish hammam designed for absolute wellness.
            </p>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/justrelaxspa.qa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Just Relax Spa Instagram"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>@justrelaxspa.qa
              </a>
              <a
                href="https://wa.me/97455883421"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="West Bay WhatsApp Concierge"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>West Bay: +974 5588 3421
              </a>
              <a
                href="https://wa.me/97455887799"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The Pearl WhatsApp Concierge"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>The Pearl: +974 5588 7799
              </a>
            </div>
            <button className="button" type="button" onClick={() => openModal()}>
              Book Your Visit
            </button>
          </div>

          <div className="footer-column">
            <h2>Explore</h2>
            <Link href="/about-laguna?lang=en">About</Link>
            <Link href="/our-branches?lang=en">Our Branches</Link>
            <Link href="/treatments?lang=en">Treatments</Link>
            <Link href="/treatment-finder?lang=en">Find Your Ritual</Link>
            <Link href="/therapists?lang=en">Therapists</Link>
            <Link href="/contact?lang=en">Contact</Link>
          </div>

          <div className="footer-column">
            <h2>Doha Branches</h2>
            <Link href="/our-branches/west-bay?lang=en">
              West Bay Diplomatic Suite
            </Link>
            <Link href="/our-branches/the-pearl?lang=en">
              The Pearl &amp; Lusail Suite
            </Link>
          </div>

          <div className="footer-column">
            <h2>Policies</h2>
            <Link href="/terms-and-conditions?lang=en">Terms &amp; Conditions</Link>
            <Link href="/privacy-policy?lang=en">Privacy Policy</Link>
            <Link href="/advertisement-policy?lang=en">
              Advertisement Policy
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <small>© 2026 Just Relax Spa. All rights reserved.</small>
            <small className="footer-legal-name">
              JUST RELAX SPA - MEN&apos;S MASSAGE &amp; HAMMAM CENTER | CR No. 184920 / MOCI Qatar
            </small>
          </div>
        </div>
      </footer>

      {/* FLOATING CTAs */}
      <aside className="floating-ctas" aria-label="Quick booking options">
        <button
          type="button"
          className="floating-cta floating-whatsapp"
          onClick={() => openModal("whatsapp")}
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
          <b>WhatsApp</b>
        </button>
        <button
          type="button"
          className="floating-cta floating-call"
          onClick={() => openModal("call")}
        >
          <i className="fa-solid fa-phone" aria-hidden="true"></i>
          <b>Call</b>
        </button>
        <button
          type="button"
          className="floating-cta floating-directions"
          onClick={() => openModal("directions")}
        >
          <i className="fa-solid fa-location-arrow" aria-hidden="true"></i>
          <b>Directions</b>
        </button>
      </aside>

      {/* BOOKING DIALOG */}
      <dialog
        ref={dialogRef}
        className="booking"
        data-booking
        aria-labelledby="booking-title"
      >
        <form method="dialog" className="booking-close-form">
          <button
            aria-label="Close"
            className="icon-button"
            onClick={closeModal}
            type="button"
          >
            ×
          </button>
        </form>

        <div className="booking-progress">
          <span className={bookingStep === "branches" ? "active" : ""}></span>
          <span className={bookingStep === "actions" ? "active" : ""}></span>
        </div>

        {/* STEP 1: BRANCHES */}
        {bookingStep === "branches" && (
          <section data-booking-step="branches">
            <p className="kicker">Choose your location</p>
            <h2 id="booking-title">Which branch works for you?</h2>
            <p>
              Tap a branch to continue straight away, or let us recommend the
              closest one.
            </p>

            {bookingContext && (
              <p className="booking-context">
                <i className={bookingContext.icon} aria-hidden="true"></i>
                <span>{bookingContext.text}</span>
              </p>
            )}

            <button
              className="location-button"
              type="button"
              onClick={handleLocateClosest}
            >
              <i
                className="fa-solid fa-location-crosshairs"
                aria-hidden="true"
              ></i>
              Find closest branch
            </button>

            <div className="booking-branches">
              {branches.map((b) => (
                <button
                  key={b.slug}
                  type="button"
                  className="booking-branch"
                  onClick={() => handleSelectBranch(b.slug)}
                >
                  <img
                    src={b.gallery[0]}
                    width="88"
                    height="88"
                    loading="lazy"
                    decoding="async"
                    alt={b.name}
                  />
                  <span className="booking-branch-body">
                    <strong>{b.name}</strong>
                    <span className="booking-branch-meta">
                      <i className="fa-solid fa-star" aria-hidden="true"></i>
                      {b.rating}
                      <em className="booking-branch-open is-open">Open now</em>
                    </span>
                    <span className="booking-branch-address">{b.address}</span>
                    {branchDistances[b.slug] && (
                      <em>{branchDistances[b.slug]}</em>
                    )}
                  </span>
                  <i
                    className="fa-solid fa-chevron-right booking-branch-chevron"
                    aria-hidden="true"
                  ></i>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* STEP 2: ACTIONS */}
        {bookingStep === "actions" && (
          <section data-booking-step="actions">
            <button
              type="button"
              className="back-button"
              onClick={() => setBookingStep("branches")}
            >
              Back
            </button>
            <p className="kicker">Choose an action</p>
            <h2>{currentBranch.name}</h2>
            <div className="action-grid">
              <a
                href={`https://wa.me/${
                  currentBranch.whatsappNumber
                }?text=${encodeURIComponent(currentBranch.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                <span>WhatsApp</span>
              </a>
              <a href={`tel:${currentBranch.phone}`}>
                <i className="fa-solid fa-phone" aria-hidden="true"></i>
                <span>Call</span>
              </a>
              <a
                href={currentBranch.mapLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa-solid fa-location-arrow"
                  aria-hidden="true"
                ></i>
                <span>Directions</span>
              </a>
            </div>
          </section>
        )}
      </dialog>
    </>
  );
}

