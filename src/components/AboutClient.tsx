"use client";

import SiteFooter from '@/components/SiteFooter';

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import WhatsAppModal from "@/components/WhatsAppModal";

export default function AboutClient() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
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
      call_number: "+97470024322",
      whatsapp_number: "97470024322",
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
      call_number: "+97433344048",
      whatsapp_number: "97433344048",
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
      call_number: "+97433344048",
      whatsapp_number: "97433344048",
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
          <Link href="/about" className="active is-active">About</Link>
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

          {/* <button
            type="button"
            onClick={toggleAboutSound}
            className="hero-sound-toggle"
            aria-label={isAudioMuted ? "Unmute Video Sound" : "Mute Video Sound"}
          >
            <i className={`fa-solid ${isAudioMuted ? "fa-volume-xmark" : "fa-volume-high"}`} aria-hidden="true"></i>
            <span>{isAudioMuted ? "Sound Off (Tap to Play)" : "Sound Playing"}</span>
          </button> */}

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
            <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>Commercial Registration
          </span>
          <span className="trust-badge">
            <i className="fa-solid fa-door-closed" aria-hidden="true"></i>100% Private Soundproof Suites
          </span>
          <span className="trust-badge">
            <i className="fa-regular fa-moon" aria-hidden="true"></i>Open Daily Until Late Night
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
                  <strong>Commercial Registration</strong>
                </div>
              </div>
              <dl className="license-fields">
                <div>
                  <dt>Commercial Registration (Retaj Salwa)</dt>
                  <dd style={{ color: "#a67c32", fontWeight: 700, fontSize: "17px" }}>CR No. 178212</dd>
                </div>
                <div>
                  <dt>Commercial Registration (Jouri Hotel)</dt>
                  <dd style={{ color: "#a67c32", fontWeight: 700, fontSize: "17px" }}>CR No. 178212/1</dd>
                </div>
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
            <p>Both Doha branches are open daily from 10:00 AM until late night (12:00 AM / 1:00 AM), accommodating busy executive schedules and late-night unwinding.</p>
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
      <SiteFooter />

      {/* FLOATING CTAs */}
      

      {/* BOOKING DIALOG */}
      

      
    </>
  );
}

