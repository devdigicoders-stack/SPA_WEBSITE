"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function AboutClient() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<"branches" | "actions">("branches");
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>("west-bay");
  const [bookingContext, setBookingContext] = useState<{ icon: string; text: string } | null>(null);
  const [branchDistances, setBranchDistances] = useState<Record<string, string>>({});
  const aboutVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  useEffect(() => {
    const video = aboutVideoRef.current;
    if (!video) return;

    video.volume = 0.85;
    video.muted = false;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsAudioMuted(false);
        })
        .catch(() => {
          // Autoplay with sound restricted prior to user gesture
          video.muted = true;
          setIsAudioMuted(true);
          video.play().catch(() => {});
        });
    }

    const unmuteOnUserAction = () => {
      if (aboutVideoRef.current) {
        aboutVideoRef.current.muted = false;
        aboutVideoRef.current.volume = 0.85;
        setIsAudioMuted(false);
        aboutVideoRef.current.play().catch(() => {});
      }
      window.removeEventListener("click", unmuteOnUserAction);
      window.removeEventListener("touchstart", unmuteOnUserAction);
      window.removeEventListener("scroll", unmuteOnUserAction);
      window.removeEventListener("keydown", unmuteOnUserAction);
    };

    window.addEventListener("click", unmuteOnUserAction);
    window.addEventListener("touchstart", unmuteOnUserAction);
    window.addEventListener("scroll", unmuteOnUserAction, { passive: true });
    window.addEventListener("keydown", unmuteOnUserAction);

    // Pause when page unmounts or tab is hidden
    const handleVisibility = () => {
      if (document.hidden && aboutVideoRef.current) {
        aboutVideoRef.current.pause();
      } else if (!document.hidden && aboutVideoRef.current) {
        aboutVideoRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("click", unmuteOnUserAction);
      window.removeEventListener("touchstart", unmuteOnUserAction);
      window.removeEventListener("scroll", unmuteOnUserAction);
      window.removeEventListener("keydown", unmuteOnUserAction);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (video) {
        video.pause();
        video.muted = true;
      }
    };
  }, []);

  const toggleAboutSound = () => {
    const video = aboutVideoRef.current;
    if (!video) return;
    if (video.muted) {
      video.muted = false;
      video.volume = 0.85;
      setIsAudioMuted(false);
      video.play().catch(() => {});
    } else {
      video.muted = true;
      setIsAudioMuted(true);
    }
  };

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
      image: string;
    }
  > = {
    "jouri-hotel": {
      name: "Jouri, a Murwab Hotel",
      call_number: "+97440041000",
      whatsapp_number: "97455883421",
      whatsapp_msg: "Hello Just Relax Spa Jouri Hotel! I would like to book an appointment.",
      address: "Al Muthaf Street, Old Salata / Corniche, Doha, Qatar",
      map_link: "https://maps.app.goo.gl/JbsB9BgUa1nxUPYeA?g_st=ac",
      lat: 25.2892,
      lng: 51.5434,
      opens: "10:00",
      closes: "03:00",
      rating: "4.96",
      image: "/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg",
    },
    "retaj-salwa": {
      name: "Retaj Salwa Resort & Spa",
      call_number: "+97444298888",
      whatsapp_number: "97455883421",
      whatsapp_msg: "Hello Just Relax Spa Retaj Salwa! I would like to book an appointment.",
      address: "Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar",
      map_link: "https://maps.app.goo.gl/2y2YLqXKL9fuEeXg9?g_st=ac",
      lat: 25.1686,
      lng: 51.3158,
      opens: "10:00",
      closes: "03:00",
      rating: "4.95",
      image: "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
    },
    "west-bay": {
      name: "Retaj Salwa Resort & Spa",
      call_number: "+97444298888",
      whatsapp_number: "97455883421",
      whatsapp_msg: "Hello Just Relax Spa Retaj Salwa! I would like to book an appointment.",
      address: "Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar",
      map_link: "https://maps.app.goo.gl/2y2YLqXKL9fuEeXg9?g_st=ac",
      lat: 25.1686,
      lng: 51.3158,
      opens: "10:00",
      closes: "03:00",
      rating: "4.95",
      image: "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
    },
  };

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
      setBookingContext({ icon: "fa-solid fa-phone", text: "Continue via Call — choose your branch" });
    } else if (preferredAction === "directions") {
      setBookingContext({ icon: "fa-solid fa-location-arrow", text: "Continue via Directions — choose your branch" });
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


  const currentBranch = branchData[selectedBranchSlug] || branchData["west-bay"];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* HEADER */}
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
          <Link href="/about">About Us</Link>
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
        {/* ABOUT FULL HERO SECTION */}
        <section className="hero about-hero">
          <video
            ref={aboutVideoRef}
            autoPlay
            loop
            playsInline
            preload="auto"
            poster="/assets/video/hero-poster.jpg"
            width="1920"
            height="1080"
          >
            <source src="/assets/video/about-hero-vid.mp4" type="video/mp4" />
          </video>
          <div className="hero-scrim"></div>

          <button
            type="button"
            onClick={toggleAboutSound}
            className="hero-sound-toggle"
            aria-label={isAudioMuted ? "Unmute Video Sound" : "Mute Video Sound"}
          >
            <i className={`fa-solid ${isAudioMuted ? "fa-volume-xmark" : "fa-volume-high"}`} aria-hidden="true"></i>
            <span>{isAudioMuted ? "Sound Off (Tap to Play)" : "Sound Playing"}</span>
          </button>

          <div className="hero-content">
            <p className="kicker">Our Story · Doha Sanctuary</p>
            <h1>Thoughtful Wellness, Rooted in Doha</h1>
            <p>
              Just Relax Spa brings centuries-old Moroccan bath rituals, Turkish hammam traditions, and modern sports massage expertise together across premier Doha destinations.
            </p>
            <div className="hero-actions">
              <button className="button" type="button" onClick={() => openModal()}>
                Book Your Ritual
              </button>
              <Link className="button button-ghost" href="/our-branches">
                Explore Branches
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

        {/* PROSE SECTION */}
        <section className="prose-section">
          <h2>More than a spa appointment</h2>
          <div className="prose-columns">
            <p>
              We believe wellness begins with feeling completely at ease from the moment you step through our doors. Every visit to Just Relax Spa is shaped around privacy, serene acoustic calm, and genuine attention to what you need. Our master therapists take time to understand your preferred pressure, areas of muscle tension, and the revitalizing outcome you desire before treatment begins.
            </p>
            <p>
              Our ritual menu includes authentic Moroccan baths with eucalyptus black soap and Kessa exfoliation, Turkish marble hammam cleanses, targeted deep tissue and Swedish sports therapy, warm hot-stone treatments, and hydrotherapy jacuzzi suites crafted for deep restorative calm.
            </p>
          </div>
        </section>

        {/* LICENSE SECTION */}
        <section className="license-section section">
          <div className="license-heading">
            <p className="kicker">Licensed in Qatar</p>
            <h2>Verified Sanctuary with Ministry Approval</h2>
            <p>
              Just Relax Spa operates as a fully licensed entity authorized by the Ministry of Commerce and Industry (MOCI Qatar). Our licensing reflects an unwavering dedication to world-class hygiene standards, certified master practitioners, and premium hospitality in the State of Qatar.
            </p>
            <p>
              The licensed activity encompasses Men's Massage &amp; Traditional Moroccan Hammam Center. All suites, jacuzzi facilities, and treatment rooms operate under strict municipal health guidelines with 100% private soundproof suites.
            </p>
          </div>
          <div className="license-showcase">
            <article className="license-card">
              <div className="license-card-head">
                <span className="license-seal">
                  <i className="fa-solid fa-award" aria-hidden="true"></i>
                </span>
                <div>
                  <span className="license-eyebrow">Commercial Registration</span>
                  <strong>CR No. 184920</strong>
                </div>
              </div>
              <dl className="license-fields">
                <div>
                  <dt>Licensed business name</dt>
                  <dd>JUST RELAX SPA - MEN'S WELLNESS &amp; MASSAGE CENTER L.L.C</dd>
                </div>
                <div>
                  <dt>Arabic trade name</dt>
                  <dd dir="rtl" lang="ar">
                    مركز جست ريلاكس للمساج والاسترخاء الرجالي ذ.م.م
                  </dd>
                </div>
                <div>
                  <dt>Licensed activity</dt>
                  <dd>Men's Massage &amp; Traditional Moroccan Hammam Center</dd>
                </div>
                <div>
                  <dt>Licensing authority</dt>
                  <dd>Ministry of Commerce and Industry (MOCI Qatar)</dd>
                </div>
              </dl>
              <p className="license-card-foot">
                <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
                Registered and regulated in Doha, State of Qatar
              </p>
            </article>

            <div className="license-qr">
              <img
                src="/assets/just-relax/branches/west-bay/west-bay-moroccan-bath.jpg"
                width="200"
                height="200"
                loading="lazy"
                decoding="async"
                alt="Just Relax Spa VIP luxury private hammam suite"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <span className="license-qr-copy">
                <strong>Certified Excellence</strong>
                <small>100% certified Moroccan &amp; Turkish master therapists</small>
              </span>
              <span className="license-qr-cta">
                <i className="fa-solid fa-certificate" aria-hidden="true"></i>
                MOCI Approved
              </span>
            </div>
          </div>
        </section>

        {/* VALUES GRID */}
        <section className="values-grid section">
          <article>
            <h3>Master Hammam Artisans</h3>
            <p>Moroccan bath masters and certified sports physiotherapists with specialized expertise in deep muscular release.</p>
          </article>
          <article>
            <h3>Complete Discretion &amp; Privacy</h3>
            <p>Dedicated soundproof VIP suites, private rainfall showers, and personal dressing rooms ensuring absolute serenity.</p>
          </article>
          <article>
            <h3>Two Doha Destinations</h3>
            <p>Conveniently situated at Jouri Murwab Hotel (Old Salata) and Retaj Salwa Resort & Spa (Salwa Road).</p>
          </article>
        </section>

        {/* FAQ SECTION */}
        <section className="section faq">
          <div className="section-heading">
            <h2>Frequently Asked Questions</h2>
          </div>
          <details>
            <summary>How do I book an appointment?</summary>
            <p>Tap Book Now, select your preferred Doha branch (Jouri Murwab Hotel or Retaj Salwa Resort), then message us directly on WhatsApp or Call our concierge.</p>
          </details>
          <details>
            <summary>Which branch is closest to me?</summary>
            <p>Use the "Find closest branch" button in our booking dialog to see distance in real time. We are located at Jouri Murwab Hotel and Retaj Salwa Resort & Spa.</p>
          </details>
          <details>
            <summary>When should I arrive?</summary>
            <p>We recommend arriving 10 to 15 minutes before your scheduled appointment so you can enjoy welcoming Moroccan mint tea and change unhurriedly.</p>
          </details>
          <details>
            <summary>Do you cater exclusively to gentlemen?</summary>
            <p>Yes. Just Relax Spa is an exclusive men's wellness sanctuary designed specifically for gentlemen's relaxation, grooming, and athletic recovery.</p>
          </details>
          <details>
            <summary>What should I bring with me?</summary>
            <p>Everything you need is provided complimentary — including plush cotton bathrobes, sanitized spa footwear, fresh towels, disposable spa briefs, and premium organic grooming amenities.</p>
          </details>
          <details>
            <summary>What payment methods do you accept?</summary>
            <p>We accept Visa, Mastercard, QPay, Apple Pay, and cash in Qatari Riyals (QAR) at both reception desks.</p>
          </details>
          <details>
            <summary>Is there a daily Golden Hours offer?</summary>
            <p>Yes — enjoy our Golden Hours Privilege with 25% off all rituals every day between 11:00 AM and 5:00 PM at both Jouri Murwab Hotel and Retaj Salwa Resort branches.</p>
          </details>
          <details>
            <summary>What are your opening hours?</summary>
            <p>Both Doha branches are open daily from 10:00 AM until 3:00 AM midnight, accommodating busy executive schedules and late-night unwinding.</p>
          </details>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta">
          <div>
            <h2>Find your nearest Just Relax Spa</h2>
            <p>Choose your Doha sanctuary and begin a ritual tailored entirely to your renewal.</p>
            <button className="button" type="button" onClick={() => openModal()}>
              Book Now
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/">
              <img src="/assets/images/logo.png" width="110" height="48" alt="Just Relax Spa" />
              <span>JUST RELAX SPA</span>
            </Link>
            <p>Two premier Doha destinations for authentic Moroccan baths, restorative sports massage, and executive relaxation designed around you.</p>
            <div className="footer-socials">
              <a
                href="https://wa.me/97455883421"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="West Bay Branch WhatsApp"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>West Bay
              </a>

            </div>
            <button className="button" type="button" onClick={() => openModal()}>
              Book Your Visit
            </button>
          </div>

          <div className="footer-column">
            <h2>Explore</h2>
            <Link href="/about">About Us</Link>
            <Link href="/our-branches">Our Branches</Link>
            <Link href="/treatments">Treatments</Link>
            <Link href="/treatment-finder">Find Your Ritual</Link>
            <Link href="/therapists">Therapists</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <h2>Doha Branches</h2>
            <Link href="/our-branches#branch-retaj-salwa">Retaj Salwa Resort &amp; Spa</Link>
            <Link href="/our-branches#branch-jouri-hotel">Jouri, a Murwab Hotel</Link>
          </div>

          <div className="footer-column">
            <h2>Policies</h2>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/advertisement-policy">Advertisement Policy</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <small>© 2026 Just Relax Spa. All rights reserved.</small>
            <small className="footer-legal-name">JUST RELAX SPA - MEN'S WELLNESS L.L.C | MOCI Qatar CR No. 184920</small>
          </div>
          <Link href="/contact">Doha, Qatar</Link>
        </div>
      </footer>

      {/* FLOATING CTAs */}
      <aside className="floating-ctas" aria-label="Quick contact actions">
        <a
          href="https://wa.me/97455883421"
          className="floating-cta floating-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="WhatsApp"
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
        </a>
        <a
          href="tel:+97440041000"
          className="floating-cta floating-call"
          aria-label="Call Just Relax Spa"
          title="Call"
        >
          <i className="fa-solid fa-phone" aria-hidden="true"></i>
        </a>
        <button
          type="button"
          className="floating-cta floating-book"
          data-book
          onClick={() => openModal()}
          aria-label="Book an appointment"
          title="Book Appointment"
        >
          <i className="fa-regular fa-calendar-check" aria-hidden="true"></i>
          <b>Book</b>
        </button>
      </aside>

      {/* BOOKING DIALOG */}
      <dialog ref={dialogRef} className="booking" data-booking aria-labelledby="booking-title">
        <form method="dialog" className="booking-close-form">
          <button aria-label="Close" className="icon-button" onClick={closeModal} type="button">
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
            <p>Tap a Doha branch to continue straight away, or let us recommend the closest one.</p>

            {bookingContext && (
              <p className="booking-context">
                <i className={bookingContext.icon} aria-hidden="true"></i>
                <span>{bookingContext.text}</span>
              </p>
            )}

            

            <div className="booking-branches">
              {/* Jouri Hotel */}
              <button
                type="button"
                className="booking-branch"
                onClick={() => handleSelectBranch("jouri-hotel")}
              >
                <img
                  src="/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg"
                  width="88"
                  height="88"
                  loading="lazy"
                  decoding="async"
                  alt="Jouri, a Murwab Hotel"
                />
                <span className="booking-branch-body">
                  <strong>Jouri, a Murwab Hotel</strong>
                  <span className="booking-branch-meta">
                    <i className="fa-solid fa-star" aria-hidden="true"></i>4.96
                    <em className="booking-branch-open is-open">Open now</em>
                  </span>
                  <span className="booking-branch-address">
                    Al Muthaf St, Old Salata / Corniche, Doha
                  </span>
                  {branchDistances["jouri-hotel"] && <em>{branchDistances["jouri-hotel"]}</em>}
                </span>
                <i className="fa-solid fa-chevron-right booking-branch-chevron" aria-hidden="true"></i>
              </button>

              {/* West Bay */}
              <button
                type="button"
                className="booking-branch"
                onClick={() => handleSelectBranch("west-bay")}
              >
                <img
                  src="/assets/just-relax/branches/west-bay/west-bay-hero.jpg"
                  width="88"
                  height="88"
                  loading="lazy"
                  decoding="async"
                  alt="West Bay Diplomatic Suite"
                />
                <span className="booking-branch-body">
                  <strong>Retaj Salwa Resort &amp; Spa</strong>
                  <span className="booking-branch-meta">
                    <i className="fa-solid fa-star" aria-hidden="true"></i>4.9
                    <em className="booking-branch-open is-open">Open now</em>
                  </span>
                  <span className="booking-branch-address">
                    Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha
                  </span>
                  {branchDistances["west-bay"] && <em>{branchDistances["west-bay"]}</em>}
                </span>
                <i className="fa-solid fa-chevron-right booking-branch-chevron" aria-hidden="true"></i>
              </button>

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
                href={`https://wa.me/${currentBranch.whatsapp_number}?text=${encodeURIComponent(currentBranch.whatsapp_msg)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                <span>WhatsApp</span>
              </a>
              <a href={`tel:${currentBranch.call_number}`}>
                <i className="fa-solid fa-phone" aria-hidden="true"></i>
                <span>Call</span>
              </a>
              <a
                href={currentBranch.map_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-location-arrow" aria-hidden="true"></i>
                <span>Directions</span>
              </a>
            </div>
          </section>
        )}
      </dialog>
    </>
  );
}

