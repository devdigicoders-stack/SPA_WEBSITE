"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
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
        "gun-massage": 2,
      },
    },
    back: {
      name: "Back",
      services: {
        "deep-tissue": 3,
        "sports-massage": 2,
        "gun-massage": 2,
        "swedish-massage": 2,
        "hot-stone": 2,
      },
    },
    arms: {
      name: "Arms & hands",
      services: {
        "sports-massage": 2,
        "deep-tissue": 2,
        "gun-massage": 2,
        "swedish-massage": 1,
      },
    },
    legs: {
      name: "Legs & feet",
      services: {
        "sports-massage": 3,
        "deep-tissue": 2,
        "jacuzzi-salts": 2,
        "gun-massage": 1,
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
        "gun-massage": 2,
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
        "full-body-waxing": 2,
        "full-body-shaving": 2,
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
        "gun-massage": 2,
        "therapist-massage": 1,
      },
    },
  },
};

interface BranchItem {
  id: number;
  slug: string;
  name: string;
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
      slug: "west-bay",
      name: "West Bay Diplomatic Suite",
      address: "Tower 1, Diplomatic District, West Bay, Doha, Qatar",
      phone: "+97444928888",
      whatsappNumber: "97455883421",
      whatsappMsg: "Hello Just Relax Spa West Bay! I would like to book a ritual found via Treatment Finder.",
      lat: 25.3216,
      lng: 51.5312,
    },
    {
      id: 2,
      slug: "the-pearl",
      name: "The Pearl-Qatar & Lusail Marina Suite",
      address: "Porto Arabia Boardwalk, Tower 12, The Pearl-Qatar, Doha",
      phone: "+97444957777",
      whatsappNumber: "97455887799",
      whatsappMsg: "Hello Just Relax Spa The Pearl! I would like to book a ritual found via Treatment Finder.",
      lat: 25.3678,
      lng: 51.5517,
    },
  ];

  const currentBranch = branches.find((b) => b.slug === selectedBranchSlug) || branches[0];

  // Geolocation computation
  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;

          const toRad = (v: number) => (v * Math.PI) / 180;
          const calcDist = (lat1: number, lon1: number, lat2: number, lon2: number) => {
            const R = 6371;
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
          };

          const dists: Record<string, number> = {};
          branches.forEach((b) => {
            dists[b.slug] = calcDist(userLat, userLng, b.lat, b.lng);
          });

          let minSlug = branches[0].slug;
          let minDist = dists[branches[0].slug];
          for (const b of branches) {
            if (dists[b.slug] < minDist) {
              minDist = dists[b.slug];
              minSlug = b.slug;
            }
          }

          const distStrings: Record<string, string> = {};
          branches.forEach((b) => {
            const d = dists[b.slug];
            distStrings[b.slug] = d < 1 ? `${Math.round(d * 1000)} m away` : `${d.toFixed(1)} km away`;
          });

          setBranchDistances(distStrings);
          setClosestBranchSlug(minSlug);
        },
        () => {},
        { timeout: 8000 }
      );
    }
  }, []);

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
          <Link href="/about-laguna">About</Link>
          <Link href="/our-branches">Our Branches</Link>
          <Link href="/treatments">Treatments</Link>
          <Link href="/treatment-finder" className="is-active">Find Your Ritual</Link>
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
        <section className="inner-hero finder-hero">
          <p className="kicker">Tell us how you feel</p>
          <h1>Find Your Ritual</h1>
          <p>
            Tap where you feel tension on the body map, choose your goal and pressure — and we&apos;ll
            recommend the right treatment from our menu.
          </p>
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
      <footer className="site-footer" role="contentinfo">
        <div className="footer-columns">
          <div className="footer-brand">
            <img
              src="/assets/images/logo.png"
              width="180"
              height="45"
              alt="Just Relax Spa Doha"
              loading="lazy"
              decoding="async"
            />
            <p>
              Just Relax Spa is Doha&apos;s premier men&apos;s wellness sanctuary, delivering authentic Moroccan baths,
              Turkish hammams, and therapeutic deep tissue recovery across two distinguished Doha locations.
            </p>
            <p className="footer-license">
              Registered in Qatar · Ministry of Commerce and Industry (MOCI) · CR No. 184920
            </p>
          </div>
          <div>
            <p className="footer-heading">Branches</p>
            <ul>
              <li>
                <Link href="/our-branches/west-bay">West Bay Diplomatic Suite</Link>
              </li>
              <li>
                <Link href="/our-branches/the-pearl">The Pearl &amp; Lusail Suite</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-heading">Rituals</p>
            <ul>
              <li>
                <Link href="/treatments/royal-moroccan">Royal Moroccan Bath</Link>
              </li>
              <li>
                <Link href="/treatments/turkish-bath">Turkish Bath</Link>
              </li>
              <li>
                <Link href="/treatments/deep-tissue">Deep Tissue Massage</Link>
              </li>
              <li>
                <Link href="/treatments/swedish-massage">Swedish Massage</Link>
              </li>
              <li>
                <Link href="/treatment-finder">Find Your Ritual</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-heading">Company</p>
            <ul>
              <li>
                <Link href="/about-laguna">About Just Relax Spa</Link>
              </li>
              <li>
                <Link href="/therapists">Our Therapists</Link>
              </li>
              <li>
                <Link href="/contact">Contact &amp; Locations</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Just Relax Spa - Men&apos;s Sanctuary. All rights reserved.</p>
        </div>
      </footer>

      {/* 4. FLOATING QUICK CTAS */}
      <aside className="floating-ctas" aria-label="Quick contact actions">
        <a
          href="https://wa.me/97455883421"
          className="floating-cta floating-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
          <b>WhatsApp</b>
        </a>
        <a href="tel:+97444928888" className="floating-cta floating-call" aria-label="Call Just Relax Spa">
          <i className="fa-solid fa-phone" aria-hidden="true"></i>
          <b>Call</b>
        </a>
        <button
          type="button"
          className="floating-cta floating-book"
          data-book
          onClick={() => openBookingModal()}
          aria-label="Open booking dialog"
        >
          <i className="fa-regular fa-calendar-check" aria-hidden="true"></i>
          <b>Book</b>
        </button>
      </aside>

      {/* 5. INTERACTIVE 2-STEP BOOKING MODAL */}
      <dialog
        ref={dialogRef}
        className="booking-dialog"
        data-booking
        aria-labelledby="booking-title"
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
              <h2 id="booking-title" className="booking-title">
                Choose a Branch
              </h2>
              <p className="booking-sub">Select the Just Relax Spa branch closest to you to proceed with booking</p>
              <div className="booking-branches-list">
                {branches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={`booking-branch-card ${
                      closestBranchSlug === b.slug ? "is-closest" : ""
                    }`}
                    onClick={() => handleSelectBranch(b.slug)}
                  >
                    <span className="booking-branch-name">{b.name}</span>
                    <span className="booking-branch-address">{b.address}</span>
                    {branchDistances[b.slug] && (
                      <span className="booking-branch-dist">
                        <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                        {branchDistances[b.slug]}
                        {closestBranchSlug === b.slug && " · Closest to you"}
                      </span>
                    )}
                  </button>
                ))}
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
                  href={`https://wa.me/${currentBranch.whatsappNumber}?text=${encodeURIComponent(
                    bookingContext ? `${currentBranch.whatsappMsg} (${bookingContext.text})` : currentBranch.whatsappMsg
                  )}`}
                  className="booking-action-btn booking-action-wa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                  <span>Book via WhatsApp</span>
                  <small>Fastest response · Instant confirmation</small>
                </a>
                <a
                  href={`tel:${currentBranch.phone}`}
                  className="booking-action-btn booking-action-call"
                >
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                  <span>Call Reception</span>
                  <small>{currentBranch.phone}</small>
                </a>
                <a
                  href={`https://maps.google.com/?q=${currentBranch.lat},${currentBranch.lng}`}
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
    </>
  );
}
