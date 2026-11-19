"use client";

import SiteFooter from '@/components/SiteFooter';

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import WhatsAppModal from "@/components/WhatsAppModal";
import { TREATMENTS_DATA } from "@/data/treatmentsData";

interface ZoneData {
  name: string;
  services: Record<string, number>;
}

interface GoalData {
  name: string;
  services: Record<string, number>;
}

interface PressureData {
  name: string;
  services: Record<string, number>;
}

const FINDER_DATA: {
  zones: Record<string, ZoneData>;
  goals: Record<string, GoalData>;
  pressure: Record<string, PressureData>;
} = {
  zones: {
    neck: {
      name: "Neck & head",
      services: {
        "deep-tissue": 3,
        "hot-stone": 3,
        "swedish-massage": 2,
        "therapist-massage": 2,
        "massage-natural-oils": 1,
      },
    },
    shoulders: {
      name: "Shoulders",
      services: {
        "deep-tissue": 3,
        "hot-stone": 2,
        "sports-massage": 2,
        "swedish-massage": 2,
      },
    },
    back: {
      name: "Back",
      services: {
        "deep-tissue": 3,
        "sports-massage": 2,
        "swedish-massage": 2,
        "hot-stone": 2,
      },
    },
    arms: {
      name: "Arms & hands",
      services: {
        "sports-massage": 2,
        "deep-tissue": 2,
        "swedish-massage": 1,
      },
    },
    legs: {
      name: "Legs & feet",
      services: {
        "sports-massage": 3,
        "deep-tissue": 2,
        "jacuzzi-salts": 2,
      },
    },
    skin: {
      name: "Skin / full body",
      services: {
        "royal-moroccan": 3,
        "turkish-bath": 3,
        "moroccan-herbs": 3,
        "underwater-soapy": 2,
        "jacuzzi-salts": 1,
      },
    },
  },
  goals: {
    relax: {
      name: "Relax & unwind",
      services: {
        "swedish-massage": 3,
        "lomi-lomi-massage": 3,
        "hot-stone": 2,
        "argan-oil-massage": 2,
        "massage-natural-oils": 2,
        "jacuzzi-salts": 2,
        "underwater-soapy": 2,
        "massage-organic-cream": 1,
      },
    },
    recovery: {
      name: "Muscle pain & recovery",
      services: {
        "deep-tissue": 3,
        "sports-massage": 3,
        "hot-stone": 1,
      },
    },
    cleanse: {
      name: "Skin care & cleansing",
      services: {
        "royal-moroccan": 3,
        "turkish-bath": 3,
        "moroccan-herbs": 2,
        "underwater-soapy": 2,
        "jacuzzi-salts": 1,
      },
    },
    grooming: {
      name: "Grooming",
      services: {
        "royal-moroccan": 1,
      },
    },
  },
  pressure: {
    gentle: {
      name: "Gentle",
      services: {
        "lomi-lomi-massage": 2,
        "argan-oil-massage": 2,
        "massage-organic-cream": 2,
        "swedish-massage": 1,
        "massage-natural-oils": 1,
        "jacuzzi-salts": 1,
        "underwater-soapy": 1,
        "royal-moroccan": 1,
        "turkish-bath": 1,
      },
    },
    medium: {
      name: "Medium",
      services: {
        "swedish-massage": 2,
        "hot-stone": 1,
        "argan-oil-massage": 1,
        "therapist-massage": 1,
        "massage-natural-oils": 1,
      },
    },
    deep: {
      name: "Deep & firm",
      services: {
        "deep-tissue": 3,
        "sports-massage": 2,
        "therapist-massage": 1,
      },
    },
  },
};

interface BranchItem {
  id: number;
  slug: string;
  name: string;
  licenseNo?: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  whatsappMsg: string;
  lat: number;
  lng: number;
}

export default function TreatmentFinderPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [selectedPressure, setSelectedPressure] = useState<string>("");

  const [bookingStep, setBookingStep] = useState<"branches" | "actions">("branches");
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>("west-bay");
  const [bookingContext, setBookingContext] = useState<{ icon: string; text: string } | null>(null);
  const [branchDistances, setBranchDistances] = useState<Record<string, string>>({});
  const [closestBranchSlug, setClosestBranchSlug] = useState<string | null>(null);

  const branches: BranchItem[] = [
    {
      id: 1,
      slug: "retaj-salwa",
      name: "Retaj Salwa Resort & Spa",
      
      address: "Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar",
      phone: "+97433344048",
      whatsappNumber: "97433344048",
      whatsappMsg: "Hello Just Relax Spa Retaj Salwa! I would like to book a treatment.",
      lat: 25.1686,
      lng: 51.3158,
    },
    {
      id: 2,
      slug: "jouri-hotel",
      name: "Jouri, a Murwab Hotel",
      
      address: "Al Muthaf St, Street 137, Building 31, Zone 18, Old Salata, Doha",
      phone: "+97470024322",
      whatsappNumber: "97470024322",
      whatsappMsg: "Hello Just Relax Spa at Jouri Murwab Hotel! I would like to book a ritual found via Treatment Finder.",
      lat: 25.2892,
      lng: 51.5434,
    },
  ];

  const currentBranch = branches.find((b) => b.slug === selectedBranchSlug) || branches[0];

  const openBookingModal = (context?: { icon: string; text: string }) => {
    setBookingContext(context || null);
    setBookingStep("branches");
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeBookingModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleSelectBranch = (slug: string) => {
    setSelectedBranchSlug(slug);
    setBookingStep("actions");
  };

  const toggleZone = (zone: string) => {
    setSelectedZones((prev) =>
      prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
    );
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoal((prev) => (prev === goal ? "" : goal));
  };

  const togglePressure = (pressure: string) => {
    setSelectedPressure((prev) => (prev === pressure ? "" : pressure));
  };

  // Compute recommendation
  const hasSelection = selectedZones.length > 0 || !!selectedGoal || !!selectedPressure;

  let primaryTreatment: (typeof TREATMENTS_DATA)[0] | null = null;
  let altTreatment: (typeof TREATMENTS_DATA)[0] | null = null;
  let reasons: string[] = [];

  if (hasSelection) {
    const scores: Record<string, number> = {};
    const addScores = (serviceMap: Record<string, number>) => {
      Object.entries(serviceMap).forEach(([id, weight]) => {
        scores[id] = (scores[id] || 0) + weight;
      });
    };

    selectedZones.forEach((z) => {
      if (FINDER_DATA.zones[z]) addScores(FINDER_DATA.zones[z].services);
    });

    if (selectedGoal && FINDER_DATA.goals[selectedGoal]) {
      addScores(FINDER_DATA.goals[selectedGoal].services);
    }

    if (selectedPressure && FINDER_DATA.pressure[selectedPressure]) {
      addScores(FINDER_DATA.pressure[selectedPressure].services);
    }

    const ranked = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => id);

    if (ranked.length > 0) {
      primaryTreatment = TREATMENTS_DATA.find((t) => t.slug === ranked[0]) || null;
      if (ranked.length > 1) {
        altTreatment = TREATMENTS_DATA.find((t) => t.slug === ranked[1]) || null;
      }
    }

    reasons = [
      ...selectedZones.map((z) => FINDER_DATA.zones[z]?.name.toLowerCase()).filter(Boolean),
      ...(selectedGoal ? [FINDER_DATA.goals[selectedGoal]?.name.toLowerCase()] : []),
      ...(selectedPressure ? [`${FINDER_DATA.pressure[selectedPressure]?.name.toLowerCase()} pressure`] : []),
    ];
  }

  const selectedZoneNames = selectedZones
    .map((z) => FINDER_DATA.zones[z]?.name)
    .filter(Boolean);

  return (
    <>
      {/* 1. SITE HEADER */}
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
          <Link href="/about">About</Link>
          <Link href="/our-branches">Our Branches</Link>
          <Link href="/treatments">Treatments</Link>
          <Link href="/treatment-finder" className="active is-active">Find Your Ritual</Link>
          <Link href="/therapists">Therapists</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="header-actions">
          <button className="button button-small" type="button" onClick={() => openBookingModal()}>
            Book Now
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT */}
      <main id="main">
        {/* INNER HERO */}
        <section className="hero page-hero finder-hero">
          <img
            src="/assets/just-relax/branches/retaj-salwa/retaj-salwa-massage-suite.jpg"
            alt="Find Your Bespoke Spa Ritual in Doha"
            className="hero-bg-img"
            width="1920"
            height="1080"
          />
          <div className="hero-scrim"></div>

          <div className="hero-content">
            <p className="kicker">Interactive Ritual Recommendation</p>
            <h1>Find Your Bespoke Ritual</h1>
            <p>
              Tap where you feel tension on our interactive body map, select your pressure preference, and discover your tailored recovery treatment.
            </p>
            <div className="hero-actions">
              <a className="button" href="#finder-stage">
                Start Ritual Finder
              </a>
              <Link className="button button-ghost" href="/treatments">
                Browse Full Menu
              </Link>
            </div>
          </div>
        </section>

        {/* FINDER SECTION */}
        <section className="finder section" data-finder>
          <div className="finder-grid">
            {/* STEP 01: BODY MAP & TENSION */}
            <div className="finder-stage">
              <p className="finder-step-label">
                <span>01</span>Where do you feel tension?
              </p>
              <div className="finder-body">
                <div className="finder-figure" role="group" aria-label="Body map">
                  <img
                    src="/assets/images/human-body.svg"
                    width="126"
                    height="370"
                    alt="Body map — select tension areas"
                  />
                  {/* Orbs */}
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("neck") ? "active" : ""}`}
                    data-zone="neck"
                    style={{ top: "8%", left: "50%" }}
                    aria-label="Neck & head"
                    onClick={() => toggleZone("neck")}
                  ></button>
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("neck") ? "active" : ""}`}
                    data-zone="neck"
                    style={{ top: "16%", left: "50%" }}
                    aria-hidden="true"
                    tabIndex={-1}
                    onClick={() => toggleZone("neck")}
                  ></button>
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("shoulders") ? "active" : ""}`}
                    data-zone="shoulders"
                    style={{ top: "26%", left: "16%" }}
                    aria-label="Shoulders"
                    onClick={() => toggleZone("shoulders")}
                  ></button>
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("shoulders") ? "active" : ""}`}
                    data-zone="shoulders"
                    style={{ top: "26%", left: "84%" }}
                    aria-hidden="true"
                    tabIndex={-1}
                    onClick={() => toggleZone("shoulders")}
                  ></button>
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("back") ? "active" : ""}`}
                    data-zone="back"
                    style={{ top: "40%", left: "50%" }}
                    aria-label="Back"
                    onClick={() => toggleZone("back")}
                  ></button>
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("back") ? "active" : ""}`}
                    data-zone="back"
                    style={{ top: "54%", left: "50%" }}
                    aria-hidden="true"
                    tabIndex={-1}
                    onClick={() => toggleZone("back")}
                  ></button>
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("arms") ? "active" : ""}`}
                    data-zone="arms"
                    style={{ top: "46%", left: "4%" }}
                    aria-label="Arms & hands"
                    onClick={() => toggleZone("arms")}
                  ></button>
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("arms") ? "active" : ""}`}
                    data-zone="arms"
                    style={{ top: "46%", left: "96%" }}
                    aria-hidden="true"
                    tabIndex={-1}
                    onClick={() => toggleZone("arms")}
                  ></button>
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("arms") ? "active" : ""}`}
                    data-zone="arms"
                    style={{ top: "58%", left: "3%" }}
                    aria-hidden="true"
                    tabIndex={-1}
                    onClick={() => toggleZone("arms")}
                  ></button>
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("arms") ? "active" : ""}`}
                    data-zone="arms"
                    style={{ top: "58%", left: "97%" }}
                    aria-hidden="true"
                    tabIndex={-1}
                    onClick={() => toggleZone("arms")}
                  ></button>
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("legs") ? "active" : ""}`}
                    data-zone="legs"
                    style={{ top: "70%", left: "36%" }}
                    aria-label="Legs & feet"
                    onClick={() => toggleZone("legs")}
                  ></button>
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("legs") ? "active" : ""}`}
                    data-zone="legs"
                    style={{ top: "70%", left: "64%" }}
                    aria-hidden="true"
                    tabIndex={-1}
                    onClick={() => toggleZone("legs")}
                  ></button>
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("legs") ? "active" : ""}`}
                    data-zone="legs"
                    style={{ top: "93%", left: "38%" }}
                    aria-hidden="true"
                    tabIndex={-1}
                    onClick={() => toggleZone("legs")}
                  ></button>
                  <button
                    type="button"
                    className={`finder-orb ${selectedZones.includes("legs") ? "active" : ""}`}
                    data-zone="legs"
                    style={{ top: "93%", left: "62%" }}
                    aria-hidden="true"
                    tabIndex={-1}
                    onClick={() => toggleZone("legs")}
                  ></button>

                  {/* Body Map Floating Tags */}
                  <button
                    type="button"
                    className={`finder-tag tag-e ${selectedZones.includes("neck") ? "active" : ""}`}
                    data-zone="neck"
                    style={{ top: "12%", left: "50%" }}
                    onClick={() => toggleZone("neck")}
                  >
                    Neck & head
                  </button>
                  <button
                    type="button"
                    className={`finder-tag tag-w ${selectedZones.includes("shoulders") ? "active" : ""}`}
                    data-zone="shoulders"
                    style={{ top: "26%", left: "16%" }}
                    onClick={() => toggleZone("shoulders")}
                  >
                    Shoulders
                  </button>
                  <button
                    type="button"
                    className={`finder-tag tag-e ${selectedZones.includes("back") ? "active" : ""}`}
                    data-zone="back"
                    style={{ top: "40%", left: "50%" }}
                    onClick={() => toggleZone("back")}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className={`finder-tag tag-e ${selectedZones.includes("arms") ? "active" : ""}`}
                    data-zone="arms"
                    style={{ top: "52%", left: "96%" }}
                    onClick={() => toggleZone("arms")}
                  >
                    Arms & hands
                  </button>
                  <button
                    type="button"
                    className={`finder-tag tag-w ${selectedZones.includes("legs") ? "active" : ""}`}
                    data-zone="legs"
                    style={{ top: "70%", left: "36%" }}
                    onClick={() => toggleZone("legs")}
                  >
                    Legs & feet
                  </button>
                </div>

                {/* Full Body / Skin Chip */}
                <button
                  type="button"
                  className={`finder-skin-chip ${selectedZones.includes("skin") ? "active" : ""}`}
                  data-zone="skin"
                  onClick={() => toggleZone("skin")}
                >
                  <i className="fa-solid fa-spa" aria-hidden="true"></i>
                  Skin / full body
                </button>
              </div>

              {selectedZoneNames.length > 0 && (
                <p className="finder-selection" data-finder-selection>
                  {selectedZoneNames.join(" + ")}
                </p>
              )}
              <p className="finder-hint">You can select multiple areas</p>
            </div>

            {/* STEP 02 & 03: GOAL & PRESSURE + RESULTS */}
            <div className="finder-steps">
              {/* STEP 02: GOAL */}
              <div className="finder-step">
                <p className="finder-step-label">
                  <span>02</span>What&apos;s your goal today?
                </p>
                <div className="finder-pills" role="group">
                  <button
                    type="button"
                    className={`finder-pill ${selectedGoal === "relax" ? "active" : ""}`}
                    data-goal="relax"
                    onClick={() => toggleGoal("relax")}
                  >
                    Relax &amp; unwind
                  </button>
                  <button
                    type="button"
                    className={`finder-pill ${selectedGoal === "recovery" ? "active" : ""}`}
                    data-goal="recovery"
                    onClick={() => toggleGoal("recovery")}
                  >
                    Muscle pain &amp; recovery
                  </button>
                  <button
                    type="button"
                    className={`finder-pill ${selectedGoal === "cleanse" ? "active" : ""}`}
                    data-goal="cleanse"
                    onClick={() => toggleGoal("cleanse")}
                  >
                    Skin care &amp; cleansing
                  </button>
                  <button
                    type="button"
                    className={`finder-pill ${selectedGoal === "grooming" ? "active" : ""}`}
                    data-goal="grooming"
                    onClick={() => toggleGoal("grooming")}
                  >
                    Grooming
                  </button>
                </div>
              </div>

              {/* STEP 03: PRESSURE */}
              <div className="finder-step">
                <p className="finder-step-label">
                  <span>03</span>Preferred pressure level?
                </p>
                <div className="finder-pills" role="group">
                  <button
                    type="button"
                    className={`finder-pill ${selectedPressure === "gentle" ? "active" : ""}`}
                    data-pressure="gentle"
                    onClick={() => togglePressure("gentle")}
                  >
                    Gentle
                  </button>
                  <button
                    type="button"
                    className={`finder-pill ${selectedPressure === "medium" ? "active" : ""}`}
                    data-pressure="medium"
                    onClick={() => togglePressure("medium")}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    className={`finder-pill ${selectedPressure === "deep" ? "active" : ""}`}
                    data-pressure="deep"
                    onClick={() => togglePressure("deep")}
                  >
                    Deep &amp; firm
                  </button>
                </div>
              </div>

              {/* RESULTS CARD */}
              {hasSelection && primaryTreatment ? (
                <div className="finder-result" data-finder-result>
                  <p className="finder-result-label" data-result-label>
                    Our recommendation
                  </p>
                  <article className="finder-result-card">
                    <img
                      data-result-image
                      src={primaryTreatment.image}
                      width="320"
                      height="240"
                      loading="lazy"
                      decoding="async"
                      alt={primaryTreatment.title}
                    />
                    <div className="finder-result-copy">
                      <h2 data-result-name>{primaryTreatment.title}</h2>
                      <p data-result-desc>{primaryTreatment.description}</p>
                      {primaryTreatment.duration && (
                        <span className="finder-result-duration" data-result-duration>
                          {primaryTreatment.duration}
                        </span>
                      )}
                      <p className="finder-result-why">
                        <span data-result-based>Based on</span>:{" "}
                        <b data-result-reason>{reasons.join(" · ")}</b>
                      </p>
                      <div className="card-actions">
                        <button
                          type="button"
                          className="button"
                          data-book
                          data-result-book
                          onClick={() =>
                            openBookingModal({
                              icon: "fa-sparkles",
                              text: `Recommendation: ${primaryTreatment?.title}`,
                            })
                          }
                        >
                          Book Now
                        </button>
                        <Link href={`/treatments/${primaryTreatment.slug}`} data-result-link>
                          Details
                        </Link>
                      </div>
                    </div>
                  </article>

                  {/* ALTERNATIVE RECOMMENDATION */}
                  {altTreatment && (
                    <div className="finder-alt" data-finder-alt>
                      <span>Also a great fit:</span>
                      <button
                        type="button"
                        className="finder-alt-btn"
                        data-alt-book
                        onClick={() =>
                          openBookingModal({
                            icon: "fa-sparkles",
                            text: `Alternative: ${altTreatment?.title}`,
                          })
                        }
                      >
                        {altTreatment.title}
                      </button>
                      <Link href={`/treatments/${altTreatment.slug}`} data-alt-link>
                        Details
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <p className="finder-empty" data-finder-empty>
                  Tap tension areas on the body or pick a goal to get your recommendation.
                </p>
              )}
            </div>
          </div>

          {/* FINDER FOOTER */}
          <div className="finder-foot">
            <p className="finder-disclaimer">
              This recommendation is general wellness guidance, not medical advice or a diagnosis.
              Always tell your therapist about any health condition or injury.
            </p>
            <Link className="finder-skip" href="/treatments">
              Skip and browse all treatments ›
            </Link>
          </div>
        </section>
      </main>

      {/* 3. SITE FOOTER */}
      <SiteFooter />

      {/* 4. FLOATING QUICK CTAS */}
      

      {/* 5. INTERACTIVE 2-STEP BOOKING MODAL */}
      

      
    </>
  );
}
