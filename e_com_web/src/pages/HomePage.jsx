import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import { formatPrice } from "../utils/helpers";
import {
  FiArrowRight,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiHeadphones,
  FiShoppingBag,
  FiHome,
  FiWatch,
  FiFeather,
  FiGrid,
  FiStar,
  FiTag,
  FiCheckCircle,
  FiAward,
  FiClock,
  FiCopy,
  FiCheck,
  FiZap,
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
  FiHeart,
  FiSmile,
  FiPhoneCall,
  FiPackage,
} from "react-icons/fi";

const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case "FiHeadphones":
      return <FiHeadphones className="cat-icon" />;
    case "FiShoppingBag":
      return <FiShoppingBag className="cat-icon" />;
    case "FiHome":
      return <FiHome className="cat-icon" />;
    case "FiWatch":
      return <FiWatch className="cat-icon" />;
    case "FiFeather":
      return <FiFeather className="cat-icon" />;
    default:
      return <FiGrid className="cat-icon" />;
  }
};

const FAQS = [
  {
    q: "How can I apply the 10% discount coupon code?",
    a: "Simply copy the coupon code SAVE10 and enter it into the 'Have a coupon code?' field on your Cart page or during Checkout. You will immediately see 10% deducted from your items total (orders above ₹499)."
  },
  {
    q: "What is your delivery timeframe and shipping cost?",
    a: "We offer Free Express Nationwide Shipping on all orders above ₹999. For orders below ₹999, standard shipping is just ₹49. Most metro deliveries arrive in 2-3 business days, while standard regional shipping takes 3-5 days."
  },
  {
    q: "What is your return & replacement policy?",
    a: "We provide a 7-day hassle-free return and replacement guarantee from the date of doorstep delivery. If you receive a damaged, defective, or incorrect product, we arrange a free doorstep pickup and issue an instant replacement or refund."
  },
  {
    q: "What payment methods do you support?",
    a: "We accept all major payment modes including UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards (Visa, Mastercard, RuPay), Netbanking across 50+ Indian banks, and Cash on Delivery (COD) for your peace of mind."
  },
  {
    q: "Are the electronics and home goods covered by warranty?",
    a: "Yes! All electronic devices, audio gear, and lifestyle appliances come with a minimum 1-year brand warranty. The invoice included in your delivery box and your account serves as proof of warranty."
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rohit Malhotra",
    city: "Bengaluru, Karnataka",
    rating: 5,
    product: "Everyday Wireless Headphones",
    comment: "The noise cancellation at this price point blew me away! Battery easily lasts 4-5 days of work calls and music. Delivery arrived in 48 hours flat.",
    initials: "RM"
  },
  {
    id: 2,
    name: "Ananya Deshmukh",
    city: "Mumbai, Maharashtra",
    rating: 5,
    product: "Minimalist Ceramic Artisan Mug",
    comment: "Stunning ceramic finish and comfortable ergonomic hold. It has completely upgraded my morning coffee routine. Packaging was super secure!",
    initials: "AD"
  },
  {
    id: 3,
    name: "Vikram Chatterjee",
    city: "Kolkata, West Bengal",
    rating: 5,
    product: "Classic Urban Commuter Backpack",
    comment: "Water-resistant canvas survived heavy monsoon showers without a drop reaching my laptop. Sleek aesthetic and lots of smart compartments.",
    initials: "VC"
  }
];

const HomePage = () => {
  const {
    products,
    categories,
    setCurrentView,
    setSelectedCategory,
    addToCart,
    setProductDetailModal,
    showToast,
  } = useShop();

  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  // Simulated countdown timer for flash deals
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCoupon = (code = "SAVE10") => {
    navigator.clipboard?.writeText(code);
    setCopiedCoupon(true);
    showToast(`Coupon code "${code}" copied to clipboard!`, "success");
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const featuredProducts = products.slice(0, 4);
  const heroProduct = products[0]; // Everyday Wireless Headphones

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName === "All Categories" ? "All" : catName);
    setCurrentView("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-text-content">
            <div className="hero-pill-badge">
              <span className="pill-dot"></span>
              <span>THE EVERYDAY UPGRADE • SUMMER 2026</span>
            </div>

            <h1 className="hero-title">
              Good finds.<br />
              <span className="hero-gradient-text">Better prices.</span>
            </h1>

            <p className="hero-description">
              Discover curated tech, handcrafted daily essentials, and modern
              lifestyle staples designed to make everyday living feel effortless.
            </p>

            <div className="hero-cta-group">
              <button
                className="btn btn-primary hero-btn"
                onClick={() => {
                  setSelectedCategory("All");
                  setCurrentView("products");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Shop All Products <FiArrowRight className="btn-arrow" />
              </button>

              <button
                className="btn btn-outline"
                onClick={() => {
                  setSelectedCategory("Electronics");
                  setCurrentView("products");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Explore Tech
              </button>
            </div>

            {/* Trust Badges */}
            <div className="hero-trust-bar">
              <div className="trust-item">
                <FiCheckCircle className="trust-check" />
                <span>Verified Quality</span>
              </div>
              <div className="trust-item">
                <FiCheckCircle className="trust-check" />
                <span>Easy Doorstep Delivery</span>
              </div>
              <div className="trust-item">
                <FiCheckCircle className="trust-check" />
                <span>Zero Risk Return</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Spotlight Card */}
          <div className="hero-visual-card">
            <div className="hero-glow-backdrop"></div>
            {heroProduct && (
              <div className="hero-spotlight-box">
                <div className="spotlight-badge">
                  <FiTag /> FEATURED PICK
                </div>

                <div
                  className="spotlight-image-wrap"
                  onClick={() => setProductDetailModal(heroProduct)}
                >
                  <img
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    className="spotlight-image"
                  />
                </div>

                <div className="spotlight-info">
                  <div className="spotlight-meta">
                    <span className="spotlight-category">{heroProduct.category}</span>
                    <div className="spotlight-rating">
                      <FiStar className="star-icon filled" />
                      <span>{heroProduct.rating}</span>
                    </div>
                  </div>

                  <h3 className="spotlight-title">{heroProduct.name}</h3>

                  <div className="spotlight-price-row">
                    <div>
                      <span className="spotlight-price">
                        {formatPrice(heroProduct.price)}
                      </span>
                      <span className="spotlight-old-price">
                        {formatPrice(heroProduct.oldPrice)}
                      </span>
                    </div>
                    <button
                      className="btn btn-accent btn-sm"
                      onClick={() => addToCart(heroProduct.id, 1)}
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>

                {/* Floating promo badge */}
                <div className="floating-card float-top-right">
                  <FiTruck className="float-icon" />
                  <div>
                    <strong>Free Delivery</strong>
                    <small>On orders over ₹999</small>
                  </div>
                </div>

                <div className="floating-card float-bottom-left">
                  <FiShield className="float-icon green" />
                  <div>
                    <strong>Verified Deal</strong>
                    <small>Save 28% today</small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Flash Deals & Coupon Ticker Strip */}
      <section className="flash-deal-strip">
        <div className="container flash-deal-wrap">
          <div className="flash-deal-left">
            <div className="flash-badge-pulse">
              <FiZap className="flash-zap" /> FLASH DEAL
            </div>
            <div className="flash-text">
              <strong>Save flat 10% on your entire haul today!</strong>
              <span>Limited quantity daily deals curated for conscious shoppers.</span>
            </div>
          </div>

          <div className="flash-deal-right">
            <div className="flash-timer-box">
              <FiClock className="timer-icon" />
              <span>Ends in:</span>
              <div className="timer-digits">
                <span className="digit">{String(timeLeft.hours).padStart(2, "0")}h</span>:
                <span className="digit">{String(timeLeft.minutes).padStart(2, "0")}m</span>:
                <span className="digit">{String(timeLeft.seconds).padStart(2, "0")}s</span>
              </div>
            </div>

            <button
              className="copy-coupon-btn"
              onClick={() => handleCopyCoupon("SAVE10")}
              title="Click to copy code"
            >
              {copiedCoupon ? <FiCheck className="copied-icon" /> : <FiCopy />}
              <span>{copiedCoupon ? "Copied!" : "SAVE10"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Category Explorer Section */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">BROWSE YOUR WAY</span>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">
                Explore handpicked products tailored for tech enthusiasts, modern homes, and everyday styles.
              </p>
            </div>
            <button
              className="text-link-btn"
              onClick={() => {
                setSelectedCategory("All");
                setCurrentView("products");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              View all categories <FiArrowRight />
            </button>
          </div>

          <div className="categories-grid">
            {categories
              .filter((c) => c.id !== "all")
              .map((cat) => (
                <div
                  key={cat.id}
                  className="category-card"
                  onClick={() => handleCategoryClick(cat.name)}
                >
                  <div className="cat-icon-wrap">{getCategoryIcon(cat.icon)}</div>
                  <h3 className="cat-card-title">{cat.name}</h3>
                  <p className="cat-card-desc">{cat.description}</p>
                  <span className="cat-explore-link">
                    Explore collection <FiArrowRight />
                  </span>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Editorial Lookbook / Dual Showcase Banners */}
      <section className="container section lookbook-section">
        <div className="lookbook-grid">
          <div className="lookbook-card lookbook-tech">
            <div className="lookbook-content">
              <span className="lookbook-tag">ACOUSTICS & TECH</span>
              <h3 className="lookbook-title">Work from Anywhere with Pro Audio</h3>
              <p className="lookbook-desc">
                High-fidelity sound, active noise cancellation, and ergonomic accessories designed for seamless workflow.
              </p>
              <button
                className="btn btn-light btn-sm"
                onClick={() => {
                  setSelectedCategory("Electronics");
                  setCurrentView("products");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Shop Tech Collection <FiArrowRight />
              </button>
            </div>
          </div>

          <div className="lookbook-card lookbook-home">
            <div className="lookbook-content">
              <span className="lookbook-tag">SANCTUARY & LIVING</span>
              <h3 className="lookbook-title">Artisan Ceramics & Warm Spaces</h3>
              <p className="lookbook-desc">
                Minimal stoneware, ambient lighting, and insulated essentials to make coming home your favourite part of the day.
              </p>
              <button
                className="btn btn-light btn-sm"
                onClick={() => {
                  setSelectedCategory("Home & Living");
                  setCurrentView("products");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Shop Home & Living <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="section featured-products-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">HANDPICKED FOR YOU</span>
              <h2 className="section-title">Popular Right Now</h2>
              <p className="section-subtitle">
                A few customer favourites crafted for everyday durability and sleek design.
              </p>
            </div>
            <button
              className="text-link-btn"
              onClick={() => {
                setSelectedCategory("All");
                setCurrentView("products");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Explore all {products.length} products <FiArrowRight />
            </button>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ShopKart Section */}
      <section className="section why-us-section">
        <div className="container">
          <div className="section-header center-header">
            <span className="eyebrow">THE SHOPKART PROMISE</span>
            <h2 className="section-title">Built with Customer First Philosophy</h2>
            <p className="section-subtitle">
              Every detail is engineered to give you a smooth, delightful shopping experience from browsing to delivery.
            </p>
          </div>

          <div className="why-us-grid">
            <div className="why-us-card">
              <div className="why-icon-box">
                <FiTruck className="why-icon" />
              </div>
              <h3 className="why-card-title">Free Express Shipping</h3>
              <p className="why-card-desc">
                Enjoy zero shipping fees on orders over ₹999. Real-time SMS and WhatsApp tracking from dispatch to doorstep.
              </p>
              <span className="why-card-badge">Pan-India Fast Dispatch</span>
            </div>

            <div className="why-us-card">
              <div className="why-icon-box">
                <FiShield className="why-icon" />
              </div>
              <h3 className="why-card-title">100% Quality Inspected</h3>
              <p className="why-card-desc">
                We partner only with certified manufacturers. Every unit passes an individual 5-point physical quality inspection.
              </p>
              <span className="why-card-badge">Certified Authentic</span>
            </div>

            <div className="why-us-card">
              <div className="why-icon-box">
                <FiRefreshCw className="why-icon" />
              </div>
              <h3 className="why-card-title">7-Day Easy Returns</h3>
              <p className="why-card-desc">
                Not completely satisfied? Initiate a return in 1-click. Free doorstep courier pickup with instant replacement or refund.
              </p>
              <span className="why-card-badge">Zero Hassle Pickup</span>
            </div>

            <div className="why-us-card">
              <div className="why-icon-box">
                <FiPhoneCall className="why-icon" />
              </div>
              <h3 className="why-card-title">24/7 Human Concierge</h3>
              <p className="why-card-desc">
                No frustrating robot loops. Reach friendly human product specialists on WhatsApp, email, or telephone anytime.
              </p>
              <span className="why-card-badge">Quick 5-Min Response</span>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials & Social Proof */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">COMMUNITY REVIEWS</span>
              <h2 className="section-title">Loved by Shoppers Across India</h2>
              <p className="section-subtitle">
                Over 12,000+ satisfied customers trust ShopKart for everyday essentials.
              </p>
            </div>
            <div className="rating-summary-pill">
              <FiStar className="star-icon filled" />
              <strong>4.8 / 5.0</strong>
              <span>(Over 1,200 Verified Reviews)</span>
            </div>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <FiStar key={i} className="star-icon filled" />
                  ))}
                </div>
                <p className="testimonial-quote">"{t.comment}"</p>
                <div className="testimonial-product-tag">
                  <FiPackage /> {t.product}
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.initials}</div>
                  <div className="author-details">
                    <h4 className="author-name">{t.name}</h4>
                    <span className="author-city">{t.city}</span>
                    <span className="verified-badge">
                      <FiCheckCircle /> Verified Buyer
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="container promo-banner-section">
        <div className="promo-banner-card">
          <div className="promo-banner-content">
            <span className="promo-badge">
              <FiAward /> SPECIAL LAUNCH PROMOTION
            </span>
            <h2 className="promo-heading">Upgrade your routine without stretching your budget.</h2>
            <p className="promo-text">
              Use code <strong className="promo-code-pill">SAVE10</strong> during checkout to unlock an instant 10% discount on all orders above ₹499.
            </p>
            <div className="promo-actions">
              <button
                className="btn btn-light"
                onClick={() => {
                  setSelectedCategory("All");
                  setCurrentView("products");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Start Shopping Now <FiArrowRight />
              </button>
              <button
                className="btn btn-outline-white"
                onClick={() => handleCopyCoupon("SAVE10")}
              >
                <FiCopy /> {copiedCoupon ? "Copied!" : "Copy Code SAVE10"}
              </button>
            </div>
          </div>
          <div className="promo-decoration-box">
            <div className="promo-stat-card">
              <span className="stat-number">4.8 / 5</span>
              <div className="stat-stars">
                <FiStar className="star-icon filled" />
                <FiStar className="star-icon filled" />
                <FiStar className="star-icon filled" />
                <FiStar className="star-icon filled" />
                <FiStar className="star-icon filled" />
              </div>
              <span className="stat-label">From 1,200+ Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-header center-header">
            <span className="eyebrow">COMMON QUERIES</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know about shopping, delivery, warranty, and returns.
            </p>
          </div>

          <div className="faq-accordion-wrap">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`faq-item ${isOpen ? "open" : ""}`}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <button className="faq-question-btn" type="button">
                    <span className="faq-q-text">{faq.q}</span>
                    <span className="faq-icon-arrow">
                      {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
