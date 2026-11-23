"use client";

import React from "react";
import Link from "next/link";

export default function SiteFooter() {
  return (
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
            Just Relax Spa is an elite men&apos;s wellness sanctuary in Doha, Qatar, delivering authentic Moroccan baths, Turkish hammams, and therapeutic recovery massages across Jouri Murwab Hotel and Retaj Salwa Resort & Spa.
          </p>
          <p className="footer-license">
            Licensed by Ministry of Commerce &amp; Industry (MOCI Qatar)
          </p>
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/justrelaxspa.qa?jplx=eDl2dXIwYTNwZHN5&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="social-circle social-instagram"
            >
              <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              <span>Instagram</span>
            </a>
            <a
              href="https://www.tiktok.com/@just.relax.salon?_r=1&_t=ZS-9BajOv52RwS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              title="TikTok"
              className="social-circle social-tiktok"
            >
              <i className="fa-brands fa-tiktok" aria-hidden="true"></i>
              <span>TikTok</span>
            </a>
            <a
              href="https://snapchat.com/t/DsRlTs5F"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Snapchat"
              title="Snapchat"
              className="social-circle social-snapchat"
            >
              <i className="fa-brands fa-snapchat" aria-hidden="true"></i>
              <span>Snapchat</span>
            </a>
            <a
              href="https://www.facebook.com/share/1Co14mrWto/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="social-circle social-facebook"
            >
              <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
              <span>Facebook</span>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h2>Doha Branches</h2>
          <Link href="/our-branches/jouri-hotel">Jouri, a Murwab Hotel (Old Salata)</Link>
          <Link href="/our-branches/retaj-salwa">Retaj Salwa Resort &amp; Spa (Salwa Rd)</Link>
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
        <div className="footer-legal-wrap">
          <small>© 2026 Just Relax Spa Doha. All rights reserved.</small>
          <small className="footer-legal-name">JUST RELAX SPA - MEN&apos;S SANCTUARY | MOCI Qatar</small>
          <small style={{ marginTop: "4px" }}>
            Designed &amp; Developed by{" "}
            <a
              href="https://www.worknestconnect.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#a67c32", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Worknest Connect
            </a>
          </small>
          <Link href="/contact" className="footer-city-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "6px", color: "#c6a15b" }}>
            <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
            <span>Doha, State of Qatar</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
