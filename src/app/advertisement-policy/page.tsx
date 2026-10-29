"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdvertisementPolicyPage() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
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
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="header-actions">
          <Link className="button button-small" href="/contact">
            Book Now
          </Link>
        </div>
      </header>

      <main id="main" className="pt-28 pb-20">
        <article className="legal-page">
          <p className="kicker">Just Relax Spa Doha</p>
          <h1>Advertisement Policy</h1>
          <p className="legal-intro">
            This policy explains how Just Relax Spa presents promotions, service claims, pricing, reviews,
            and advertising communications across digital channels in Doha, Qatar.
          </p>
          <p className="updated">Last updated: 14 October 2026</p>

          <section>
            <h2>Promotional accuracy</h2>
            <p>
              Advertisements are prepared in good faith using information available when published. A
              promotion may be limited by branch, date, appointment capacity, service, therapist,
              eligibility, or stated terms.
            </p>
          </section>

          <section>
            <h2>Prices and inclusions</h2>
            <p>
              Displayed prices (in Qatari Riyals - QAR) and treatment descriptions should be confirmed with the selected branch.
              Missing prices are not represented as free services. Taxes, add-ons, duration, and included
              products may vary by offer.
            </p>
          </section>

          <section>
            <h2>Images and media</h2>
            <p>
              Service and branch photographs illustrate the relevant treatment or Just Relax Spa facilities. Room
              setup, products, and available amenities may differ by branch and appointment.
            </p>
          </section>

          <section>
            <h2>Reviews</h2>
            <p>
              Reviews are displayed from genuine guest feedback. Review text and guest names reflect authentic experiences
              at our West Bay and The Pearl-Qatar locations.
            </p>
          </section>

          <section>
            <h2>Marketing Descriptions</h2>
            <p>
              Phrases such as Best Moroccan Bath in Doha are marketing and search descriptions of the offered
              experience, reflecting our dedication to authentic rituals, master artisans, and luxury hospitality.
            </p>
          </section>

          <section>
            <h2>Tracking and attribution</h2>
            <p>
              Digital communication links (such as WhatsApp clicks and calls) help our concierge assist you smoothly.
              Precise location data is never stored on our servers.
            </p>
          </section>

          <section>
            <h2>Corrections</h2>
            <p>
              Just Relax Spa may update offers, adjust promotional periods, or update availability. Confirm
              material booking details directly with our reception concierge before arrival.
            </p>
          </section>
        </article>
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="footer-columns">
          <div className="footer-brand">
            <img
              src="/assets/images/logo.png"
              width="180"
              height="40"
              alt="Just Relax Spa"
              loading="lazy"
              decoding="async"
            />
            <p>
              Just Relax Spa is an exclusive men's wellness sanctuary in Doha, Qatar, delivering authentic Moroccan baths,
              Turkish hammams, and therapeutic massages across two premier destinations.
            </p>
            <p className="footer-license">
              Licensed by Ministry of Commerce and Industry (MOCI Qatar) · CR No. 184920
            </p>
          </div>
          <div>
            <p className="footer-heading">Doha Branches</p>
            <ul>
              <li>
                <Link href="/our-branches/west-bay">West Bay Diplomatic Suite</Link>
              </li>
              <li>
                <Link href="/our-branches/the-pearl">The Pearl-Qatar Suite</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-heading">Company</p>
            <ul>
              <li>
                <Link href="/about-laguna">About Us</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">Terms of Service</Link>
              </li>
              <li>
                <Link href="/advertisement-policy">Advertisement Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Just Relax Spa. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
