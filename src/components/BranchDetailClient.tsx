"use client";

import SiteFooter from '@/components/SiteFooter';

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { DetailedBranchItem } from "@/data/branchesDetailedData";
import { THERAPISTS_DATA } from "@/data/therapistsData";
import { TREATMENTS_DATA } from "@/data/treatmentsData";
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

export default function BranchDetailClient({
  branch,
}: {
  branch: DetailedBranchItem;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
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
      phone: "+97433344048",
      whatsappNumber: "97433344048",
      whatsappMsg: "Hello Just Relax Spa West Bay! I would like to book a private suite appointment.",
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
      whatsappMsg: "Hello Just Relax Spa at Jouri Murwab Hotel! I would like to book an appointment.",
      lat: 25.2892,
      lng: 51.5434,
    },
  ];

  const currentBranch = branches.find((b) => b.slug === selectedBranchSlug) || branches[0];
  const branchTeam =
    THERAPISTS_DATA.find((t) => t.branchSlug === branch.slug)?.therapists || [];
  const topServices = TREATMENTS_DATA.slice(0, 6);

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
          <Link href="/our-branches" className="active is-active">Our Branches</Link>
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
                    `Hello Just Relax Spa, I would like directions or details for ${branch.name}.`
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
              <i className="fa-solid fa-share-nodes" aria-hidden="true"></i>
              <div>
                <span>Social Pages</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                  <a
                    href="https://www.instagram.com/justrelaxspa.qa?jplx=eDl2dXIwYTNwZHN5&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    aria-label="Instagram"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                      color: "#fff",
                      fontSize: "13px"
                    }}
                  >
                    <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://www.tiktok.com/@just.relax.salon?_r=1&_t=ZS-9BajOv52RwS"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="TikTok"
                    aria-label="TikTok"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#000000",
                      color: "#fff",
                      fontSize: "12px"
                    }}
                  >
                    <i className="fa-brands fa-tiktok" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://snapchat.com/t/DsRlTs5F"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Snapchat"
                    aria-label="Snapchat"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#FFFC00",
                      color: "#000",
                      fontSize: "13px"
                    }}
                  >
                    <i className="fa-brands fa-snapchat" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/share/1Co14mrWto/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    aria-label="Facebook"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#1877F2",
                      color: "#fff",
                      fontSize: "13px"
                    }}
                  >
                    <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                  </a>
                </div>
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
      <SiteFooter />

      {/* 4. FLOATING QUICK CTAS */}
      

      {/* 5. INTERACTIVE 2-STEP BOOKING MODAL */}
      

      
    </>
  );
}

