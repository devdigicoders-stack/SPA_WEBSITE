"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Play,
  X,
  Eye,
  Video as VideoIcon,
  Camera,
} from "lucide-react";
import { GALLERY_ITEMS } from "@/data/spaData";

export default function GalleryPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<"branches" | "actions">("branches");
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>("west-bay");
  const [bookingContext, setBookingContext] = useState<{ icon: string; text: string } | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedMedia, setSelectedMedia] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  const branchData: Record<
    string,
    {
      name: string;
      call_number: string;
      whatsapp_number: string;
      whatsapp_msg: string;
      address: string;
      map_link: string;
      image: string;
    }
  > = {
    "west-bay": {
      name: "West Bay Diplomatic Suite",
      call_number: "+97444928888",
      whatsapp_number: "97455883421",
      whatsapp_msg: "Hello Just Relax Spa West Bay! I would like to book a suite appointment.",
      address: "Tower 1, Diplomatic District, West Bay, Doha, Qatar",
      map_link: "https://maps.google.com/?q=West+Bay+Diplomatic+Area+Doha+Qatar",
      image: "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
    },
    "the-pearl": {
      name: "The Pearl-Qatar & Lusail Marina Suite",
      call_number: "+97444957777",
      whatsapp_number: "97455887799",
      whatsapp_msg: "Hello Just Relax Spa The Pearl! I would like to book a suite appointment.",
      address: "Porto Arabia Boardwalk, Tower 12, The Pearl-Qatar, Doha",
      map_link: "https://maps.google.com/?q=The+Pearl+Qatar+Porto+Arabia+Doha",
      image: "/assets/just-relax/branches/the-pearl/the-pearl-hero.jpg",
    },
  };

  const openModal = (contextText?: string) => {
    if (contextText) {
      setBookingContext({ icon: "fa-solid fa-sparkles", text: contextText });
    } else {
      setBookingContext(null);
    }
    setBookingStep("branches");
    if (dialogRef.current) {
      dialogRef.current.showModal();
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

  const categories = [
    { id: "all", label: "All Media" },
    { id: "suites", label: "Private VIP Suites" },
    { id: "hammam", label: "Moroccan & Turkish Baths" },
    { id: "treatments", label: "Treatments in Action" },
    { id: "ambiance", label: "Lounge & Refreshments" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const videoItems = GALLERY_ITEMS.filter((i) => i.type === "video");
  const currentBranch = branchData[selectedBranchSlug] || branchData["west-bay"];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* 1. HEADER */}
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
          <Link href="/gallery" className="is-active">
            Gallery
          </Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="header-actions">
          <button className="button button-small" type="button" onClick={() => openModal()}>
            Book Now
          </button>
        </div>
      </header>

      {/* 2. MAIN GALLERY CONTENT */}
      <main id="main" className="pt-28 pb-20 space-y-16">
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            <p className="kicker">Visual Showcase</p>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Videos &amp; Photo Gallery
            </h1>
            <p className="text-base sm:text-lg text-[#aaa49a] leading-relaxed">
              Step inside Just Relax Spa across our West Bay Diplomatic and The Pearl-Qatar locations. Explore our private VIP treatment rooms, authentic heated hammams, and therapeutic facilities.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2.5 mt-8 border-b border-[#2c2923] pb-4 overflow-x-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#c6a15b] text-black shadow-lg"
                      : "bg-[#181612] text-[#dedbd4] hover:text-white border border-[#2c2923]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* FEATURED VIDEOS SECTION */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="space-y-4 mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c6a15b]">
              <VideoIcon className="w-4 h-4" />
              <span>Cinematic Video Tours</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Watch the Just Relax Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoItems.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedMedia(video)}
                className="luxury-card overflow-hidden group cursor-pointer border-[#2c2923] hover:border-[#c6a15b]/60"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#c6a15b]/90 group-hover:bg-[#c6a15b] text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#ecd095] border border-white/10">
                      HD Video
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#c6a15b] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-[#aaa49a] line-clamp-2">
                    {video.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-[#c6a15b] font-semibold pt-1">
                    <span>Watch Video</span>
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PHOTO GALLERY GRID */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="space-y-4 mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c6a15b]">
              <Camera className="w-4 h-4" />
              <span>High-Resolution Photography</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Architecture, Suites &amp; Atmosphere
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className="relative h-72 rounded-2xl overflow-hidden border border-[#2c2923] group cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c6a15b] block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-serif font-bold text-white line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#aaa49a] line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LIGHTBOX MODAL */}
        {selectedMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative max-w-4xl w-full bg-[#14120e] border border-[#c6a15b]/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-4 sm:p-5 border-b border-[#2c2923] flex items-center justify-between bg-[#191712]">
                <h3 className="text-lg font-serif font-bold text-white">
                  {selectedMedia.title}
                </h3>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="w-8 h-8 rounded-full bg-[#221f19] text-[#aaa49a] hover:text-white flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] max-h-[550px] overflow-hidden">
                {selectedMedia.type === "video" && selectedMedia.videoUrl ? (
                  <video
                    controls
                    autoPlay
                    className="w-full h-full max-h-[500px] object-contain"
                  >
                    <source src={selectedMedia.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="relative w-full h-[500px]">
                    <Image
                      src={selectedMedia.src}
                      alt={selectedMedia.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="p-5 border-t border-[#2c2923] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#14120e]">
                <p className="text-xs sm:text-sm text-[#dedbd4]">
                  {selectedMedia.description}
                </p>

                <button
                  onClick={() => {
                    const title = selectedMedia.title;
                    setSelectedMedia(null);
                    openModal(`Reserved Suite from Gallery: ${title}`);
                  }}
                  className="btn-gold !py-2.5 !px-6 text-xs whitespace-nowrap self-end sm:self-auto font-bold cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reserve This Suite</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. FOOTER */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/">
              <img src="/assets/images/logo.png" width="110" height="48" alt="Just Relax Spa" />
              <span>JUST RELAX SPA</span>
            </Link>
            <p>Two premier Doha destinations for authentic Moroccan baths, restorative sports massage, and executive relaxation designed around you.</p>
            <div className="footer-socials">
              <a
                href="https://wa.me/97455883421"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="West Bay Branch WhatsApp"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>West Bay
              </a>
              <a
                href="https://wa.me/97455887799"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The Pearl Branch WhatsApp"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>The Pearl
              </a>
            </div>
            <button className="button" type="button" onClick={() => openModal()}>
              Book Your Visit
            </button>
          </div>

          <div className="footer-column">
            <h2>Explore</h2>
            <Link href="/about-laguna">About Us</Link>
            <Link href="/our-branches">Our Branches</Link>
            <Link href="/treatments">Treatments</Link>
            <Link href="/treatment-finder">Find Your Ritual</Link>
            <Link href="/therapists">Therapists</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <h2>Doha Branches</h2>
            <Link href="/our-branches#branch-west-bay">West Bay Diplomatic Suite</Link>
            <Link href="/our-branches#branch-the-pearl">The Pearl &amp; Lusail Suite</Link>
          </div>

          <div className="footer-column">
            <h2>Policies</h2>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/advertisement-policy">Advertisement Policy</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <small>© 2026 Just Relax Spa. All rights reserved.</small>
            <small className="footer-legal-name">JUST RELAX SPA - MEN'S WELLNESS L.L.C | MOCI Qatar CR No. 184920</small>
          </div>
          <Link href="/contact">Doha, Qatar</Link>
        </div>
      </footer>

      {/* 4. BOOKING DIALOG */}
      <dialog ref={dialogRef} className="booking" data-booking aria-labelledby="booking-title">
        <form method="dialog" className="booking-close-form">
          <button aria-label="Close" className="icon-button" onClick={closeModal} type="button">
            ×
          </button>
        </form>

        <div className="booking-progress">
          <span className={bookingStep === "branches" ? "active" : ""}></span>
          <span className={bookingStep === "actions" ? "active" : ""}></span>
        </div>

        {/* STEP 1: BRANCHES */}
        {bookingStep === "branches" && (
          <section data-booking-step="branches">
            <p className="kicker">Choose your location</p>
            <h2 id="booking-title">Which branch works for you?</h2>
            <p>Tap a Doha branch to continue straight away.</p>

            {bookingContext && (
              <p className="booking-context">
                <i className={bookingContext.icon} aria-hidden="true"></i>
                <span>{bookingContext.text}</span>
              </p>
            )}

            <div className="booking-branches">
              <button
                type="button"
                className="booking-branch"
                onClick={() => handleSelectBranch("west-bay")}
              >
                <img
                  src="/assets/just-relax/branches/west-bay/west-bay-hero.jpg"
                  width="88"
                  height="88"
                  loading="lazy"
                  alt="West Bay Diplomatic Suite"
                />
                <span className="booking-branch-body">
                  <strong>West Bay Diplomatic Suite</strong>
                  <span className="booking-branch-meta">
                    <i className="fa-solid fa-star" aria-hidden="true"></i>4.9
                    <em className="booking-branch-open is-open">Open now</em>
                  </span>
                  <span className="booking-branch-address">
                    Tower 1, Diplomatic District, West Bay, Doha
                  </span>
                </span>
                <i className="fa-solid fa-chevron-right booking-branch-chevron" aria-hidden="true"></i>
              </button>

              <button
                type="button"
                className="booking-branch"
                onClick={() => handleSelectBranch("the-pearl")}
              >
                <img
                  src="/assets/just-relax/branches/the-pearl/the-pearl-hero.jpg"
                  width="88"
                  height="88"
                  loading="lazy"
                  alt="The Pearl-Qatar & Lusail Marina Suite"
                />
                <span className="booking-branch-body">
                  <strong>The Pearl &amp; Lusail Suite</strong>
                  <span className="booking-branch-meta">
                    <i className="fa-solid fa-star" aria-hidden="true"></i>4.9
                    <em className="booking-branch-open is-open">Open now</em>
                  </span>
                  <span className="booking-branch-address">
                    Porto Arabia Boardwalk, Tower 12, The Pearl-Qatar
                  </span>
                </span>
                <i className="fa-solid fa-chevron-right booking-branch-chevron" aria-hidden="true"></i>
              </button>
            </div>
          </section>
        )}

        {/* STEP 2: ACTIONS */}
        {bookingStep === "actions" && (
          <section data-booking-step="actions">
            <button
              type="button"
              className="back-button"
              onClick={() => setBookingStep("branches")}
            >
              Back
            </button>
            <p className="kicker">Choose an action</p>
            <h2>{currentBranch.name}</h2>
            <div className="action-grid">
              <a
                href={`https://wa.me/${currentBranch.whatsapp_number}?text=${encodeURIComponent(currentBranch.whatsapp_msg)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                <span>WhatsApp</span>
              </a>
              <a href={`tel:${currentBranch.call_number}`}>
                <i className="fa-solid fa-phone" aria-hidden="true"></i>
                <span>Call</span>
              </a>
              <a
                href={currentBranch.map_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-location-arrow" aria-hidden="true"></i>
                <span>Directions</span>
              </a>
            </div>
          </section>
        )}
      </dialog>
    </>
  );
}
