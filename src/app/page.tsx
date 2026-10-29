"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { SPA_INFO, BRANCHES, REVIEWS, OFFICIAL_PRICE_LIST } from "@/data/spaData";

export default function HomePage() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<"branches" | "actions">("branches");
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>("west-bay");
  const [bookingContext, setBookingContext] = useState<{ icon: string; text: string } | null>(null);
  const [branchDistances, setBranchDistances] = useState<Record<string, string>>({});
  const [closestBranchSlug, setClosestBranchSlug] = useState<string | null>(null);
  const [offerTimerText, setOfferTimerText] = useState("Offer runs daily 11:00 AM – 5:00 PM");

  const branchData: Record<
    string,
    {
      name: string;
      call_number: string;
      whatsapp_number: string;
      whatsapp_msg: string;
      address: string;
      map_link: string;
      lat: number;
      lng: number;
      opens: string;
      closes: string;
      rating: string;
    }
  > = {
    "jouri-hotel": {
      name: "Jouri, a Murwab Hotel",
      call_number: "+97440041000",
      whatsapp_number: "97455883421",
      whatsapp_msg: "Hello Just Relax Spa at Jouri Murwab Hotel! I would like to book a treatment.",
      address: "Al Muthaf Street, Street 137, Building 31, Zone 18, Old Salata, Doha",
      map_link: "https://maps.google.com/?q=Jouri+a+Murwab+Hotel+Doha",
      lat: 25.2892,
      lng: 51.5434,
      opens: "10:00",
      closes: "03:00",
      rating: "4.96",
    },
    "west-bay": {
      name: "West Bay Diplomatic Suite",
      call_number: "+97444928888",
      whatsapp_number: "97455883421",
      whatsapp_msg: "Hello Just Relax Spa West Bay! I would like to book a private suite appointment.",
      address: "Tower 1, Diplomatic District, West Bay, Doha, Qatar",
      map_link: "https://maps.google.com/?q=West+Bay+Doha+Qatar",
      lat: 25.3216,
      lng: 51.5312,
      opens: "10:00",
      closes: "03:00",
      rating: "4.95",
    },
    "the-pearl": {
      name: "The Pearl-Qatar & Lusail Marina Suite",
      call_number: "+97444957777",
      whatsapp_number: "97455887799",
      whatsapp_msg: "Hello Just Relax Spa The Pearl! I would like to book an appointment.",
      address: "Porto Arabia Boardwalk, Tower 12, The Pearl-Qatar, Doha",
      map_link: "https://maps.google.com/?q=The+Pearl+Qatar+Doha",
      lat: 25.3671,
      lng: 51.5386,
      opens: "10:00",
      closes: "03:00",
      rating: "4.94",
    },
    // Aliases for legacy compatibility
    "sh-zayed": {
      name: "West Bay Diplomatic Suite",
      call_number: "+97444928888",
      whatsapp_number: "97455883421",
      whatsapp_msg: "Hello Just Relax Spa West Bay! I would like to book an appointment.",
      address: "Tower 1, Diplomatic District, West Bay, Doha, Qatar",
      map_link: "https://maps.google.com/?q=West+Bay+Doha+Qatar",
      lat: 25.3216,
      lng: 51.5312,
      opens: "10:00",
      closes: "03:00",
      rating: "4.95",
    },
    "business-bay": {
      name: "The Pearl-Qatar & Lusail Marina Suite",
      call_number: "+97444957777",
      whatsapp_number: "97455887799",
      whatsapp_msg: "Hello Just Relax Spa The Pearl! I would like to book an appointment.",
      address: "Porto Arabia Boardwalk, Tower 12, The Pearl-Qatar, Doha",
      map_link: "https://maps.google.com/?q=The+Pearl+Qatar+Doha",
      lat: 25.3671,
      lng: 51.5386,
      opens: "10:00",
      closes: "03:00",
      rating: "4.94",
    },
  };

  // Timer logic for Golden Hours Offer (11:00 AM - 5:00 PM)
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMin = now.getMinutes();
      if (currentHour >= 11 && currentHour < 17) {
        const remainingMinutes = (17 - currentHour) * 60 - currentMin;
        const h = Math.floor(remainingMinutes / 60);
        const m = remainingMinutes % 60;
        setOfferTimerText(`Privilege offer is live — ends in ${h}h ${m}m`);
      } else {
        setOfferTimerText("Privilege offer runs daily 11:00 AM – 5:00 PM");
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (preferredAction?: string, preselectBranch?: string) => {
    if (preselectBranch && branchData[preselectBranch]) {
      setSelectedBranchSlug(preselectBranch);
      setBookingStep("actions");
    } else {
      setBookingStep("branches");
    }

    if (preferredAction === "whatsapp") {
      setBookingContext({ icon: "fa-brands fa-whatsapp", text: "Continue via WhatsApp — choose your branch" });
    } else if (preferredAction === "call") {
      setBookingContext({ icon: "fa-solid fa-phone", text: "Call concierge — choose your branch" });
    } else if (preferredAction === "directions") {
      setBookingContext({ icon: "fa-solid fa-location-arrow", text: "Get directions — choose your branch" });
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
    if (typeof window === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const distances: Record<string, string> = {};
        let closestSlug = "west-bay";
        let minD = Infinity;

        ["west-bay", "the-pearl"].forEach((slug) => {
          const data = branchData[slug];
          const d = Math.hypot(latitude - data.lat, longitude - data.lng) * 111;
          distances[slug] = `${d.toFixed(1)} km away`;
          if (d < minD) {
            minD = d;
            closestSlug = slug;
          }
        });

        setBranchDistances(distances);
        setClosestBranchSlug(closestSlug);
        setSelectedBranchSlug(closestSlug);
      },
      (err) => {
        console.warn("Geolocation permission denied:", err);
      }
    );
  };

  const currentBranch = branchData[selectedBranchSlug] || branchData["west-bay"];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* HEADER */}
      <header className="site-header" data-header>
        <Link className="brand" href="/" aria-label="Just Relax Spa Home">
          <img src="/assets/images/logo.png" width="220" height="42" alt="Just Relax Spa Doha" />
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
          <Link href="/" className="active">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/our-branches">Our Branches</Link>
          <Link href="/treatments">Treatments</Link>
          <Link href="/treatment-finder">Find Your Ritual</Link>
          <Link href="/therapists">Therapists</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="header-actions">
          <button className="button button-small" type="button" onClick={() => openModal()}>
            Book Now
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main id="main">
        {/* HERO SECTION */}
        <section className="hero">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/video/hero-poster.jpg"
            width="1920"
            height="1080"
          >
            <source src="/assets/video/hero-video.mp4" type="video/mp4" />
            <source src="/assets/video/spa-hero-massage.mp4" type="video/mp4" />
          </video>
          <div className="hero-scrim"></div>

          <div className="hero-content">
            <p className="kicker">Ultra-Luxury Men&apos;s Sanctuary &amp; Hammam</p>
            <h1>Authentic Moroccan Baths &amp; Therapeutic Massage in Doha</h1>
            <p>
              Private VIP suites across West Bay and The Pearl-Qatar. Certified master therapists, heated marble hammam, and bespoke executive wellness.
            </p>
            <div className="hero-actions">
              <button className="button" type="button" onClick={() => openModal()}>
                Book Your Visit
              </button>
              <Link className="button button-ghost" href="/treatments">
                Explore Treatments
              </Link>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <div className="trust-strip" aria-label="Why Just Relax Spa">
          <span className="trust-badge">
            <i className="fa-solid fa-award" aria-hidden="true"></i>Licensed by MOCI Qatar
          </span>
          <span className="trust-badge">
            <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>Commercial Reg. No. 184920
          </span>
          <span className="trust-badge">
            <i className="fa-solid fa-door-closed" aria-hidden="true"></i>100% Private Soundproof Suites
          </span>
          <span className="trust-badge">
            <i className="fa-regular fa-moon" aria-hidden="true"></i>Open Daily Until 3:00 AM
          </span>
          <span className="trust-badge">
            <i className="fa-solid fa-location-dot" aria-hidden="true"></i>Two Premier Doha Destinations
          </span>
        </div>

        {/* WHY JUST RELAX BENTO */}
        <section className="section why">
          <div className="why-hero-grid">
            <div className="why-image-wrapper">
              <img
                src="/assets/just-relax/branches/the-pearl/the-pearl-turkish-hammam.jpg"
                alt="Just Relax Spa Heated Marble Turkish Hammam & VIP Gentlemen Suite in Doha"
                className="why-main-image"
                width="640"
                height="480"
                loading="lazy"
              />
              <div className="why-image-badge">
                <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
                <span>Private VIP Soundproof Suites</span>
              </div>
              <div className="why-image-rating">
                <i className="fa-solid fa-star" aria-hidden="true"></i>
                <strong>4.95</strong>
                <span>(1,150+ Doha Reviews)</span>
              </div>
            </div>

            <div className="section-heading why-heading-content">
              <p className="kicker">Why Just Relax Spa</p>
              <h2>Considered in Every Detail for Gentlemen</h2>
              <p>
                An elite men&apos;s sanctuary inside Doha&apos;s most prestigious business and waterfront districts — completely private suites, certified hammam masters, and hours tailored for late-night tranquility.
              </p>
              <div className="why-pillars">
                <div className="why-pillar">
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                  <span>100% Dedicated to Men&apos;s Wellness &amp; Athletic Recovery</span>
                </div>
                <div className="why-pillar">
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                  <span>Licensed by Ministry of Commerce &amp; Industry (CR No. 184920)</span>
                </div>
                <div className="why-pillar">
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                  <span>Open Daily 10:00 AM – 3:00 AM with Valet Parking</span>
                </div>
              </div>
            </div>
          </div>
          <div className="why-bento">
            <article className="why-card why-lead">
              <i className="fa-solid fa-award" aria-hidden="true"></i>
              <h3>Licensed &amp; Verified in Qatar</h3>
              <p>
                Just Relax Spa operates as a legally registered gentlemen&apos;s wellness sanctuary in Doha under Commercial Registration (CR) No. 184920, fully licensed by Qatar&apos;s Ministry of Commerce and Industry.
              </p>
              <img
                className="why-cert-logo"
                src="/assets/images/footer-certificate-logo.png"
                width="140"
                height="80"
                loading="lazy"
                decoding="async"
                alt="Qatar Commercial Certification"
              />
              <Link href="/about" className="why-link">
                View Credentials<i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </article>

            <article className="why-card">
              <i className="fa-solid fa-building" aria-hidden="true"></i>
              <h3>Prestigious Doha Locations</h3>
              <p>
                Located in West Bay Diplomatic District and The Pearl-Qatar Porto Arabia Marina, offering convenient access with complimentary valet parking.
              </p>
            </article>

            <article className="why-card">
              <i className="fa-solid fa-moon" aria-hidden="true"></i>
              <h3>Late Night Sanctuary</h3>
              <p>
                Welcoming gentlemen daily until 3:00 AM — the ideal sanctuary for post-executive decompression, travel fatigue, or late evening recovery.
              </p>
            </article>

            <article className="why-card">
              <i className="fa-solid fa-door-closed" aria-hidden="true"></i>
              <h3>Complete Discretion &amp; Privacy</h3>
              <p>
                Private soundproof treatment rooms in every branch, en-suite marble showers, and direct WhatsApp booking with immediate concierge confirmation.
              </p>
            </article>

            <article className="why-card">
              <i className="fa-solid fa-spa" aria-hidden="true"></i>
              <h3>17 Curated Men&apos;s Rituals</h3>
              <p>
                From Royal Moroccan Beldi and Ottoman Turkish marble baths to deep tissue, hot stone, and athletic recovery — calibrated precisely for gentlemen.
              </p>
            </article>

            <div className="why-stats">
              <article>
                <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                <div>
                  <strong>2</strong>
                  <span>Doha Branches</span>
                </div>
              </article>
              <article>
                <i className="fa-solid fa-spa" aria-hidden="true"></i>
                <div>
                  <strong>17</strong>
                  <span>Curated Rituals</span>
                </div>
              </article>
              <article>
                <i className="fa-solid fa-star" aria-hidden="true"></i>
                <div>
                  <strong>4.95</strong>
                  <span>Google Rating</span>
                </div>
              </article>
              <article>
                <i className="fa-brands fa-google" aria-hidden="true"></i>
                <div>
                  <strong>1,150+</strong>
                  <span>Verified Reviews</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* OUR BRANCHES */}
        <section className="section">
          <div className="section-heading">
            <p className="kicker">Sanctuary Locations</p>
            <h2>Three Premier Doha Sanctuaries</h2>
            <p>Flagship 4-star hotel wellness at Jouri Murwab Hotel, plus private executive suites in West Bay and The Pearl-Qatar.</p>
          </div>
          <div className="branch-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            {/* Jouri Hotel Branch (Flagship) */}
            <article className="branch-card">
              <img
                src="/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                alt="Jouri a Murwab Hotel — Just Relax Spa Doha"
              />
              <div>
                <span className="rating-row">
                  <a
                    className="rating"
                    href="https://maps.google.com/?q=Jouri+a+Murwab+Hotel+Doha"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ★ 4.96 (2.2K)
                  </a>
                  <span className="open-badge is-open" data-opens="10:00" data-closes="03:00">
                    Open now
                  </span>
                </span>
                <h3>Jouri, a Murwab Hotel</h3>
                <p>Al Muthaf St, Street 137, Zone 18, Old Salata / Corniche, Doha</p>
                <p className="branch-card-hours">
                  <i className="fa-regular fa-clock" aria-hidden="true"></i>Daily 10:00 AM – 3:00 AM · Tel: +974 4004 1000
                </p>
                <button
                  className="button button-small"
                  type="button"
                  onClick={() => openModal(undefined, "jouri-hotel")}
                >
                  Book This Branch
                </button>
              </div>
            </article>

            {/* West Bay Branch */}
            <article className="branch-card">
              <img
                src="/assets/just-relax/branches/west-bay/west-bay-hero.jpg"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                alt="West Bay Diplomatic Suite — Just Relax Spa Doha"
              />
              <div>
                <span className="rating-row">
                  <a
                    className="rating"
                    href="https://maps.google.com/?q=West+Bay+Doha+Qatar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ★ 4.95
                  </a>
                  <span className="open-badge is-open" data-opens="10:00" data-closes="03:00">
                    Open now
                  </span>
                </span>
                <h3>West Bay Diplomatic Suite</h3>
                <p>Tower 1, Diplomatic District, West Bay, Doha, Qatar</p>
                <p className="branch-card-hours">
                  <i className="fa-regular fa-clock" aria-hidden="true"></i>Daily 10:00 AM – 3:00 AM
                </p>
                <button
                  className="button button-small"
                  type="button"
                  onClick={() => openModal(undefined, "west-bay")}
                >
                  Book This Branch
                </button>
              </div>
            </article>

            {/* The Pearl Branch */}
            <article className="branch-card">
              <img
                src="/assets/just-relax/branches/the-pearl/the-pearl-hero.jpg"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                alt="The Pearl-Qatar & Lusail Marina Suite — Just Relax Spa Doha"
              />
              <div>
                <span className="rating-row">
                  <a
                    className="rating"
                    href="https://maps.google.com/?q=The+Pearl+Qatar+Doha"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ★ 4.94
                  </a>
                  <span className="open-badge is-open" data-opens="10:00" data-closes="03:00">
                    Open now
                  </span>
                </span>
                <h3>The Pearl &amp; Lusail Marina Suite</h3>
                <p>Porto Arabia Boardwalk, Tower 12, The Pearl-Qatar, Doha</p>
                <p className="branch-card-hours">
                  <i className="fa-regular fa-clock" aria-hidden="true"></i>Daily 10:00 AM – 3:00 AM
                </p>
                <button
                  className="button button-small"
                  type="button"
                  onClick={() => openModal(undefined, "the-pearl")}
                >
                  Book This Branch
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* OFFICIAL PRICE LIST SECTION */}
        <section className="price-list-section" id="price-list">
          <div className="section-heading text-center" style={{ margin: "0 auto 36px auto", textAlign: "center" }}>
            <p className="kicker">Official Spa Menu</p>
            <h2>قائمة الأسعار · Official Price List</h2>
            <p style={{ margin: "0 auto" }}>
              Standard rates licensed by Ministry of Commerce &amp; Industry (MOCI Qatar). All rituals conducted in 100% private VIP suites.
            </p>
          </div>

          <div className="price-list-container">
            <div className="price-list-sheet">
              <div className="price-list-sheet-header">
                <img src="/assets/images/logo.png" alt="Just Relax Spa" className="price-sheet-logo" width="180" height="40" />
                <h3>Just Relax Spa · جيست ريلاكس سبا</h3>
                <span className="price-sheet-badge">OFFICIAL PRICE LIST · قائمة الأسعار</span>
              </div>

              <div className="price-list-grid">
                {OFFICIAL_PRICE_LIST.map((item) => (
                  <div key={item.id} className="price-item-card">
                    <div className="price-item-info">
                      <div className="price-item-titles">
                        <h4>{item.nameEn}</h4>
                        <span className="price-arabic" dir="rtl">{item.nameAr}</span>
                      </div>
                      {item.duration && <small className="price-duration">{item.duration}</small>}
                    </div>
                    <div className="price-item-cost">
                      <span className="price-amount">{item.priceQAR}</span>
                      <span className="price-currency">QAR · ريال</span>
                    </div>
                    <button
                      type="button"
                      className="button button-small price-book-btn"
                      onClick={() => openModal("whatsapp")}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>

              <div className="price-list-sheet-footer">
                <span><i className="fa-solid fa-award"></i> Licensed MOCI CR No. 184920</span>
                <span><i className="fa-solid fa-hotel"></i> Available at Jouri Murwab Hotel, West Bay &amp; The Pearl</span>
                <span><i className="fa-brands fa-whatsapp"></i> Instant WhatsApp VIP Confirmation</span>
              </div>
            </div>
          </div>
        </section>

        {/* OUR TREATMENTS */}
        <section className="section services-section">
          <div className="section-heading">
            <h2>Curated Spa &amp; Hammam Menu</h2>
            <p>Traditional Moroccan rituals, Turkish baths, and targeted muscular recovery.</p>
          </div>
          <div className="service-track">
            {/* Royal Moroccan Bath */}
            <article className="service-card">
              <img
                src="/assets/just-relax/treatments/royal-moroccan.jpg"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                alt="Royal Moroccan Bath in Doha"
              />
              <div>
                <h3>Royal Moroccan Bath</h3>
                <p>A luxurious traditional cleansing treatment using premium organic black soap, exfoliating glove, and aromatic herbs.</p>
                <div className="card-actions">
                  <button type="button" onClick={() => openModal()}>
                    Book Now
                  </button>
                  <Link href="/treatments/royal-moroccan">Details</Link>
                </div>
              </div>
            </article>

            {/* Moroccan Bath with Herbs */}
            <article className="service-card">
              <img
                src="/assets/just-relax/treatments/moroccan-herbs.jpg"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                alt="Moroccan Bath with Herbs in Doha"
              />
              <div>
                <h3>Moroccan Bath with Herbs</h3>
                <p>Purify your body and mind with a gentle steam bath infused with a secret blend of calming natural Moroccan herbs.</p>
                <div className="card-actions">
                  <button type="button" onClick={() => openModal()}>
                    Book Now
                  </button>
                  <Link href="/treatments/moroccan-herbs">Details</Link>
                </div>
              </div>
            </article>

            {/* Turkish Bath */}
            <article className="service-card">
              <img
                src="/assets/just-relax/treatments/turkish-bath.jpg"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                alt="Turkish Bath in Doha"
              />
              <div>
                <h3>Turkish Bath</h3>
                <p>Indulge in a classic soap-foam massage on a warm marble bed, followed by gentle exfoliation and warm water rinse.</p>
                <div className="card-actions">
                  <button type="button" onClick={() => openModal()}>
                    Book Now
                  </button>
                  <Link href="/treatments/turkish-bath">Details</Link>
                </div>
              </div>
            </article>

            {/* Swedish Massage */}
            <article className="service-card">
              <img
                src="/assets/just-relax/treatments/swedish-massage.jpg"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                alt="Swedish Massage in Doha"
              />
              <div>
                <h3>Swedish Massage</h3>
                <p>Relaxing full-body massage using long, gliding strokes to ease tension, improve circulation, and enhance flexibility.</p>
                <div className="card-actions">
                  <button type="button" onClick={() => openModal()}>
                    Book Now
                  </button>
                  <Link href="/treatments/swedish-massage">Details</Link>
                </div>
              </div>
            </article>

            {/* Deep Tissue Massage */}
            <article className="service-card">
              <img
                src="/assets/just-relax/treatments/deep-tissue.jpg"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                alt="Deep Tissue Massage in Doha"
              />
              <div>
                <h3>Deep Tissue Massage</h3>
                <p>Targeted therapeutic pressure designed to release chronic muscle tension and promote deep muscular recovery.</p>
                <div className="card-actions">
                  <button type="button" onClick={() => openModal()}>
                    Book Now
                  </button>
                  <Link href="/treatments/deep-tissue">Details</Link>
                </div>
              </div>
            </article>

            {/* Hot Stone Massage */}
            <article className="service-card">
              <img
                src="/assets/just-relax/treatments/hot-stone.jpg"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                alt="Hot Stone Massage in Doha"
              />
              <div>
                <h3>Hot Stone Massage</h3>
                <p>Heated volcanic basalt stones are placed on key energy points to melt away stress and induce a state of pure bliss.</p>
                <div className="card-actions">
                  <button type="button" onClick={() => openModal()}>
                    Book Now
                  </button>
                  <Link href="/treatments/hot-stone">Details</Link>
                </div>
              </div>
            </article>

            {/* Jacuzzi with Organic Salts */}
            <article className="service-card">
              <img
                src="/assets/just-relax/treatments/jacuzzi-salts.jpg"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                alt="Jacuzzi with Organic Salts in Doha"
              />
              <div>
                <h3>Jacuzzi with Organic Salts</h3>
                <p>Soak in our hydrotherapy hot tub enriched with therapeutic mineral salts to detoxify and soothe tired muscles.</p>
                <div className="card-actions">
                  <button type="button" onClick={() => openModal()}>
                    Book Now
                  </button>
                  <Link href="/treatments/jacuzzi-salts">Details</Link>
                </div>
              </div>
            </article>

            {/* Underwater Soapy Massage */}
            <article className="service-card">
              <img
                src="/assets/just-relax/treatments/underwater-soapy.jpg"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                alt="Underwater Soapy Massage in Doha"
              />
              <div>
                <h3>Underwater Soapy Massage</h3>
                <p>A unique sensory hydro-massage combining warm water currents with exfoliating aromatic soap suds.</p>
                <div className="card-actions">
                  <button type="button" onClick={() => openModal()}>
                    Book Now
                  </button>
                  <Link href="/treatments/underwater-soapy">Details</Link>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* PROSE SECTION */}
        <section className="prose-section home-detail">
          <div className="sanctuary-showcase">
            <div className="sanctuary-image-card">
              <img
                src="/assets/just-relax/branches/west-bay/west-bay-moroccan-bath.jpg"
                alt="Just Relax Spa Royal Moroccan Bath and Private VIP Suite in West Bay Doha"
                className="sanctuary-image"
                width="640"
                height="480"
                loading="lazy"
              />
              <div className="sanctuary-badge-top">
                <i className="fa-solid fa-gem" aria-hidden="true"></i>
                <span>West Bay &amp; The Pearl-Qatar</span>
              </div>
              <div className="sanctuary-badge-bottom">
                <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
                <span>100% Private Men&apos;s Suites</span>
              </div>
            </div>

            <div className="sanctuary-content">
              <p className="kicker">Doha Gentlemen&apos;s Sanctuary</p>
              <h2>Men&apos;s Wellness Sanctuary Across Two Key Doha Destinations</h2>
              <p>
                Just Relax Spa is a premier licensed men&apos;s sanctuary in Doha with branches in the West Bay Diplomatic District and Porto Arabia Boardwalk at The Pearl-Qatar — each featuring soundproof private treatment rooms. Searching for a private men&apos;s massage in Doha? Guests can book directly via WhatsApp or phone with immediate VIP confirmation.
              </p>
              <p>
                Our treatments include authentic Royal Moroccan Baths, heated marble Turkish Hammams, Swedish, deep tissue and sports recovery massage, hot volcanic stones, virgin Argan oil therapies, and hydrotherapy. Every ritual is conducted in 100% privacy with single-use sterile amenities.
              </p>
              <div className="sanctuary-actions">
                <button className="button button-small" type="button" onClick={() => openModal()}>
                  Book VIP Suite
                </button>
                <Link className="button button-small button-ghost" href="/our-branches">
                  Explore Branches
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* GUEST REVIEWS */}
        <section className="reviews section">
          <div className="section-heading">
            <h2>Guest Reviews</h2>
            <Link className="reviews-google" href="/our-branches">
              <i className="fa-brands fa-google" aria-hidden="true"></i>4.95 · 1,150+ Verified Reviews
            </Link>
          </div>
          <div className="review-window">
            <div className="review-track">
              {REVIEWS.map((rev) => (
                <article key={rev.id} className="review-card">
                  <span>{"★".repeat(rev.rating)}</span>
                  <blockquote>{rev.text}</blockquote>
                  <strong>{rev.author}</strong>
                  <small>{rev.location}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 25% OFF OFFER BAND */}
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
              <p className="offer-timer is-live" data-offer-timer>
                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                {offerTimerText}
              </p>
            </div>
            <div className="offer-ticket-action">
              <button
                className="button"
                type="button"
                data-book
                data-offer="golden-hours"
                onClick={() => openModal()}
              >
                Book Now — Save 25%
              </button>
              <small className="offer-fine">Subject to availability · Mention the offer when booking</small>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/">
              <img
                src="/assets/images/logo.png"
                width="220"
                height="48"
                alt="Just Relax Spa Doha"
              />
            </Link>
            <p>
              Just Relax Spa is an elite men&apos;s wellness sanctuary in Doha, Qatar, delivering authentic Moroccan baths, Turkish hammams, and therapeutic recovery massages across West Bay and The Pearl.
            </p>
            <p className="footer-license">
              Licensed by Ministry of Commerce &amp; Industry (MOCI Qatar) · CR No. 184920
            </p>
            <div className="footer-socials">
              <a
                href="https://wa.me/97455883421"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="West Bay Branch WhatsApp"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>West Bay
              </a>
              <a
                href="https://wa.me/97455887799"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The Pearl Branch WhatsApp"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>The Pearl
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h2>Doha Branches</h2>
            <Link href="/our-branches/jouri-hotel">Jouri, a Murwab Hotel (Old Salata)</Link>
            <Link href="/our-branches/west-bay">West Bay Diplomatic Suite</Link>
            <Link href="/our-branches/the-pearl">The Pearl-Qatar &amp; Lusail</Link>
          </div>

          <div className="footer-column">
            <h2>Rituals</h2>
            <Link href="/treatments/royal-moroccan">Royal Moroccan Bath</Link>
            <Link href="/treatments/turkish-bath">Turkish Bath</Link>
            <Link href="/treatments/deep-tissue">Deep Tissue Massage</Link>
            <Link href="/treatments/swedish-massage">Swedish Massage</Link>
            <Link href="/treatment-finder">Find Your Ritual</Link>
          </div>

          <div className="footer-column">
            <h2>Company</h2>
            <Link href="/about">About Us</Link>
            <Link href="/therapists">Our Therapists</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Concierge &amp; Locations</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms of Service</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <small>© 2026 Just Relax Spa Doha. All rights reserved.</small>
            <small className="footer-legal-name">JUST RELAX SPA - MEN&apos;S SANCTUARY | MOCI Qatar CR No. 184920</small>
          </div>
          <Link href="/contact">Doha, State of Qatar</Link>
        </div>
      </footer>

      {/* FLOATING CTAS */}
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
          onClick={() => openModal()}
          aria-label="Open booking dialog"
        >
          <i className="fa-regular fa-calendar-check" aria-hidden="true"></i>
          <b>Book</b>
        </button>
      </aside>

      {/* 2-STEP BOOKING MODAL */}
      <dialog
        ref={dialogRef}
        className="booking-dialog"
        data-booking
        aria-labelledby="booking-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeModal();
        }}
      >
        <div className="booking-dialog-inner">
          <button
            type="button"
            className="booking-close"
            aria-label="Close dialog"
            onClick={closeModal}
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
                Choose a Doha Branch
              </h2>
              <p className="booking-sub">Select your preferred sanctuary in Doha</p>
              <div className="booking-branches-list">
                {["jouri-hotel", "west-bay", "the-pearl"].map((slug) => {
                  const b = branchData[slug];
                  return (
                    <button
                      key={slug}
                      type="button"
                      className={`booking-branch-card ${closestBranchSlug === slug ? "is-closest" : ""}`}
                      onClick={() => handleSelectBranch(slug)}
                    >
                      <span className="booking-branch-name">{b.name}</span>
                      <span className="booking-branch-address">{b.address}</span>
                      {branchDistances[slug] && (
                        <span className="booking-branch-dist">
                          <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                          {branchDistances[slug]}
                          {closestBranchSlug === slug && " · Closest to you"}
                        </span>
                      )}
                    </button>
                  );
                })}
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
                  href={`https://wa.me/${currentBranch.whatsapp_number}?text=${encodeURIComponent(
                    bookingContext ? `${currentBranch.whatsapp_msg} (${bookingContext.text})` : currentBranch.whatsapp_msg
                  )}`}
                  className="booking-action-btn booking-action-wa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                  <span>Book via WhatsApp</span>
                  <small>Instant concierge confirmation</small>
                </a>
                <a
                  href={`tel:${currentBranch.call_number}`}
                  className="booking-action-btn booking-action-call"
                >
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                  <span>Call Reception</span>
                  <small>{currentBranch.call_number}</small>
                </a>
                <a
                  href={currentBranch.map_link}
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
