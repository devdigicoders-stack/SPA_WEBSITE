"use client";

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0d0d0c",
        color: "#ffffff",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <p
          style={{
            fontSize: "13px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c6a15b",
            fontWeight: 700,
            marginBottom: "12px",
          }}
        >
          404 · Page Not Found
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#f5f3ef",
            marginBottom: "16px",
          }}
        >
          Sanctuary Not Found
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#dedbd4",
            lineHeight: 1.6,
            marginBottom: "32px",
          }}
        >
          The page you are looking for has been relocated or is currently unavailable. Return to our sanctuary homepage or explore our signature Moroccan rituals.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            className="button"
            style={{
              padding: "12px 24px",
              borderRadius: "999px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Return to Homepage
          </Link>
          <Link
            href="/treatments"
            className="button button-ghost"
            style={{
              padding: "12px 24px",
              borderRadius: "999px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Explore Treatments
          </Link>
        </div>
      </div>
    </main>
  );
}
