"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import WhatsAppModal from "./WhatsAppModal";

interface BranchData {
  name: string;
  call_number: string;
  whatsapp_number: string;
  whatsapp_msg: string;
  address: string;
  map_link: string;
  lat: number;
  lng: number;
}

export const GLOBAL_BRANCHES: Record<string, BranchData> = {
  "jouri-hotel": {
    name: "Jouri, a Murwab Hotel",
    call_number: "+97470024322",
    whatsapp_number: "97470024322",
    whatsapp_msg: "Hello Just Relax Spa at Jouri Murwab Hotel! I would like to book a treatment.",
    address: "Al Muthaf Street, Street 137, Building 31, Zone 18, Old Salata, Doha",
    map_link: "https://maps.app.goo.gl/JbsB9BgUa1nxUPYeA?g_st=ac",
    lat: 25.2892,
    lng: 51.5434,
  },
  "retaj-salwa": {
    name: "Retaj Salwa Resort & Spa",
    call_number: "+97433344048",
    whatsapp_number: "97433344048",
    whatsapp_msg: "Hello Just Relax Spa Retaj Salwa! I would like to book a private suite appointment.",
    address: "Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar",
    map_link: "https://maps.app.goo.gl/2y2YLqXKL9fuEeXg9?g_st=ac",
    lat: 25.1686,
    lng: 51.3158,
  },
  "west-bay": {
    name: "Retaj Salwa Resort & Spa",
    call_number: "+97433344048",
    whatsapp_number: "97433344048",
    whatsapp_msg: "Hello Just Relax Spa Retaj Salwa! I would like to book a private suite appointment.",
    address: "Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar",
    map_link: "https://maps.app.goo.gl/2y2YLqXKL9fuEeXg9?g_st=ac",
    lat: 25.1686,
    lng: 51.3158,
  },
};

interface GlobalModalsContextType {
  openBookingModal: (preferredAction?: string, preselectBranch?: string) => void;
  openWhatsAppModal: (customMessage?: string) => void;
}

const GlobalModalsContext = createContext<GlobalModalsContextType | null>(null);

export function GlobalModalsProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [bookingStep, setBookingStep] = useState<"branches" | "actions">("branches");
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>("jouri-hotel");
  const [bookingContext, setBookingContext] = useState<{ icon: string; text: string } | null>(null);
  const [branchDistances, setBranchDistances] = useState<Record<string, string>>({});
  const [closestBranchSlug, setClosestBranchSlug] = useState<string | null>(null);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [whatsAppCustomMsg, setWhatsAppCustomMsg] = useState<string | undefined>(undefined);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const computeDistances = (userLat: number, userLng: number) => {
    let closestSlug: string | null = null;
    let minDistance = Infinity;
    const distMap: Record<string, string> = {};

    ["jouri-hotel", "retaj-salwa"].forEach((slug) => {
      const b = GLOBAL_BRANCHES[slug];
      if (b) {
        const d = calculateDistance(userLat, userLng, b.lat, b.lng);
        distMap[slug] = `${d.toFixed(1)} km away`;
        if (d < minDistance) {
          minDistance = d;
          closestSlug = slug;
        }
      }
    });

    setBranchDistances(distMap);
    if (closestSlug) {
      setClosestBranchSlug(closestSlug);
    }
  };

  const openBookingModal = (preferredAction?: string, preselectBranch?: string) => {
    if (preselectBranch && GLOBAL_BRANCHES[preselectBranch]) {
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

  const closeBookingModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const openWhatsAppModal = (customMessage?: string) => {
    setWhatsAppCustomMsg(customMessage);
    setWhatsAppModalOpen(true);
  };

  const handleSelectBranch = (slug: string) => {
    setSelectedBranchSlug(slug);
    setBookingStep("actions");
  };

  // Expose global functions on window for existing inline button clicks across all pages
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__openJustRelaxBooking = openBookingModal;
      (window as any).__openJustRelaxWhatsApp = openWhatsAppModal;
    }
  }, []);

  const currentBranch = GLOBAL_BRANCHES[selectedBranchSlug] || GLOBAL_BRANCHES["jouri-hotel"];

  return (
    <GlobalModalsContext.Provider value={{ openBookingModal, openWhatsAppModal }}>
      {children}

      {/* GLOBAL FLOATING CTAS - COMMON ON ALL PAGES */}
      <aside className="floating-ctas" aria-label="Quick contact actions">
        <button
          type="button"
          className="floating-cta floating-whatsapp"
          onClick={() => openWhatsAppModal()}
          aria-label="Chat on WhatsApp"
          title="WhatsApp"
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
        </button>
        <a
          href="tel:+97470024322"
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
          onClick={() => openBookingModal()}
          aria-label="Book an appointment"
          title="Book Appointment"
        >
          <i className="fa-regular fa-calendar-check" aria-hidden="true"></i>
          <b>Book</b>
        </button>
      </aside>

      {/* GLOBAL 2-STEP BOOKING MODAL (IDENTICAL TO HOME PAGE) */}
      <dialog
        ref={dialogRef}
        className="booking-dialog"
        data-booking
        aria-labelledby="global-booking-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeBookingModal();
        }}
      >
        <div className="booking-dialog-inner">
          <button
            type="button"
            className="booking-close"
            aria-label="Close dialog"
            onClick={closeBookingModal}
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
              <h2 id="global-booking-title" className="booking-title">
                Choose a Doha Branch
              </h2>
              <p className="booking-sub">Select your preferred sanctuary in Doha</p>
              <div className="booking-branches-list">
                {["jouri-hotel", "retaj-salwa"].map((slug) => {
                  const b = GLOBAL_BRANCHES[slug];
                  return (
                    <button
                      key={slug}
                      type="button"
                      className={`booking-branch-card ${closestBranchSlug === slug ? "is-closest" : ""}`}
                      onClick={() => handleSelectBranch(slug)}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: "8px" }}>
                        <span className="booking-branch-name">{b.name}</span>
                      </div>
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

      {/* GLOBAL WHATSAPP MODAL */}
      <WhatsAppModal
        isOpen={whatsAppModalOpen}
        onClose={() => setWhatsAppModalOpen(false)}
        customMessage={whatsAppCustomMsg}
      />
    </GlobalModalsContext.Provider>
  );
}

export function useGlobalModals() {
  const context = useContext(GlobalModalsContext);
  if (!context) {
    throw new Error("useGlobalModals must be used within GlobalModalsProvider");
  }
  return context;
}
