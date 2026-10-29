"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
          <h1>Privacy Policy</h1>
          <p className="legal-intro">
            This policy explains how Just Relax Spa handles information when you browse this website,
            choose a branch, request directions, or contact our Doha concierge via WhatsApp or phone call.
          </p>
          <p className="updated">Last updated: 14 October 2026</p>

          <section>
            <h2>Information processed</h2>
            <p>
              The website may process language preference, selected service, selected Doha branch, CTA source,
              conversion event identifiers, and approximate interaction data. We do not store sensitive personal
              data on this static website.
            </p>
          </section>

          <section>
            <h2>Location permission</h2>
            <p>
              If you choose Find Closest Branch, your browser supplies coordinates to calculate distance to our West Bay
              or The Pearl branches locally in your browser. Precise coordinates are never sent to our servers or stored.
              You may also select a branch manually.
            </p>
          </section>

          <section>
            <h2>Cookies and sessions</h2>
            <p>
              Essential session cookies support the booking journey and navigation. We respect your digital privacy
              and keep technical data strictly minimal.
            </p>
          </section>

          <section>
            <h2>Direct communication privacy</h2>
            <p>
              When you tap WhatsApp or Call, you communicate directly with our certified Doha concierge team. Your
              contact details are used exclusively to confirm appointment availability, discuss ritual preferences,
              and facilitate your arrival. We never sell or distribute your private contact information.
            </p>
          </section>

          <section>
            <h2>WhatsApp, calls and maps</h2>
            <p>
              Choosing an action takes you to WhatsApp, your device dialer, or Google Maps. Those third-party platforms
              operate under their own respective privacy policies.
            </p>
          </section>

          <section>
            <h2>Data minimization &amp; security</h2>
            <p>
              We adhere strictly to regulatory standards under Qatar laws. We do not store credit card details on this website,
              and all on-site transactions are completed securely at our spa front desks.
            </p>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              You can grant or deny browser location permissions at any time, or contact our concierge directly to update
              any reservation preferences.
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
