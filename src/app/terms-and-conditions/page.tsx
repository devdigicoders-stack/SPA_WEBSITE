"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function TermsAndConditionsPage() {
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
          <h1>Terms &amp; Conditions</h1>
          <p className="legal-intro">
            These terms govern website use, spa enquiries, bookings, promotions, and visits to Just Relax
            Spa branches in Doha, Qatar. By using this website or confirming an appointment, you agree to the
            terms below.
          </p>
          <p className="updated">Last updated: 14 October 2026</p>

          <section>
            <h2>Bookings and confirmation</h2>
            <p>
              A booking is confirmed when our reception team acknowledges your requested date, time,
              ritual, and suite. Website availability is indicative and secured via direct WhatsApp or phone confirmation.
            </p>
          </section>

          <section>
            <h2>Arrival and late attendance</h2>
            <p>
              Guests should arrive 10 to 15 minutes before the scheduled appointment to change comfortably and enjoy complimentary Moroccan tea. Late arrival may shorten ritual time to prevent delaying subsequent guests.
            </p>
          </section>

          <section>
            <h2>Health and suitability</h2>
            <p>
              Please inform your therapist of previous sports injuries, skin sensitivities, or health conditions. Our therapists will adapt pressure and technique for your comfort and safety.
            </p>
          </section>

          <section>
            <h2>Prices and payment</h2>
            <p>
              All prices are in Qatari Riyals (QAR). Payment is processed at the branch reception using cash, Visa, Mastercard, Apple Pay, or QPay.
            </p>
          </section>

          <section>
            <h2>Cancellation and rescheduling</h2>
            <p>
              Please notify our concierge at least 2 hours prior if you need to reschedule or cancel your visit so we may accommodate other guests.
            </p>
          </section>

          <section>
            <h2>Guest conduct and privacy</h2>
            <p>
              Just Relax Spa is an exclusive, private men's sanctuary. Respectful conduct toward therapists and fellow guests is strictly maintained at all times.
            </p>
          </section>

          <section>
            <h2>Valuables and personal belongings</h2>
            <p>
              Private lockers are provided in all VIP suites. Guests are advised to keep personal valuables securely locked.
            </p>
          </section>

          <section>
            <h2>Regulatory compliance</h2>
            <p>
              All spa operations, wellness rituals, and hygiene standards operate under the oversight of the Ministry of Commerce and Industry (MOCI Qatar). Treatments are wellness experiences designed for rest, recovery, and revitalization.
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
