"use client";

import React, { useEffect } from "react";

export interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  customMessage?: string;
}

export const BRANCH_WHATSAPP_DATA = [
  {
    id: "jouri-hotel",
    slug: "jouri-hotel",
    name: "Jouri, a Murwab Hotel",
    branchSub: "Old Salata / Doha Corniche",
    licenseNo: "316057",
    address: "Al Muthaf Street, Street 137, Building 31, Zone 18, Old Salata, Doha",
    whatsappDisplay: "+974 5588 3421",
    whatsappNumber: "97455883421",
    defaultMsg: "Hello Just Relax Spa Jouri Hotel! I would like to book a treatment.",
  },
  {
    id: "retaj-salwa",
    slug: "retaj-salwa",
    name: "Retaj Salwa Resort & Spa",
    branchSub: "Salwa Road / Abu Nakhlah",
    licenseNo: "288593",
    address: "Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar",
    whatsappDisplay: "+974 5588 3421",
    whatsappNumber: "97455883421",
    defaultMsg: "Hello Just Relax Spa Retaj Salwa! I would like to book a private suite appointment.",
  },
];

export default function WhatsAppModal({
  isOpen,
  onClose,
  customMessage,
}: WhatsAppModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="wa-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-modal-title"
    >
      <div className="wa-modal-card">
        <button
          type="button"
          className="wa-modal-close"
          onClick={onClose}
          aria-label="Close WhatsApp Dialog"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>

        <span className="wa-modal-badge">
          <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
          Official WhatsApp Concierge
        </span>

        <h2 id="wa-modal-title" className="wa-modal-title">
          Connect on WhatsApp
        </h2>
        <p className="wa-modal-sub">
          Choose your branch below to chat directly with our reception concierge.
        </p>

        <div className="wa-modal-branches">
          {BRANCH_WHATSAPP_DATA.map((b) => {
            const text = customMessage || b.defaultMsg;
            const waUrl = `https://wa.me/${b.whatsappNumber}?text=${encodeURIComponent(text)}`;
            return (
              <a
                key={b.id}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-modal-branch-link"
                onClick={() => onClose()}
              >
                <div className="wa-modal-branch-top">
                  <div>
                    <span className="wa-modal-branch-name">{b.name}</span>
                    <span className="wa-modal-branch-subtag">{b.branchSub}</span>
                  </div>
                  <span className="wa-modal-branch-pin">
                    <i className="fa-solid fa-award" style={{ marginRight: 4 }} aria-hidden="true"></i>
                    L.n : {b.licenseNo}
                  </span>
                </div>
                <span className="wa-modal-branch-address">{b.address}</span>

                <div className="wa-modal-branch-bottom">
                  <span className="wa-modal-number">
                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                    {b.whatsappDisplay}
                  </span>
                  <span className="wa-modal-cta-btn">
                    Chat on WhatsApp
                    <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
