import React, { useState, useMemo } from "react";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import {
  FiSearch,
  FiSliders,
  FiX,
  FiArrowUp,
  FiArrowDown,
  FiStar,
  FiPackage,
  FiRotateCcw,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCheckCircle,
  FiInfo,
  FiTag,
  FiAward,
} from "react-icons/fi";

// Category specific rich metadata
const CATEGORY_META = {
  All: {
    title: "The Complete Catalogue",
    subtitle: "Explore thoughtfully designed items across tech, living, fashion, and daily carry.",
    highlights: ["Verified Authentic", "Zero Risk 7-Day Returns", "Pan-India Fast Dispatch", "Best Price Promise"],
    guideTitle: "How ShopKart Curates Items",
    guideDesc: "Every product in our collection is handpicked and undergoes rigorous real-world durability and ergonomic testing before making it to our store."
  },
  Electronics: {
    title: "Tech & Audio Essentials",
    subtitle: "Smart gadgets, high-definition acoustics, and wearables engineered for daily focus and productivity.",
    highlights: ["Active Noise Cancellation", "1-Year Official Warranty", "Bluetooth 5.3 Ready", "High-End Battery Life"],
    guideTitle: "Audio & Smart Device Buying Guide",
    guideDesc: "Look for devices with ANC for open workspaces. All our headphones come with memory foam padding and quick-charge support for long listening sessions."
  },
  Fashion: {
    title: "Contemporary Fashion & Footwear",
    subtitle: "Relaxed silhouettes, heavyweight combed cotton, and ergonomic active footwear for timeless everyday wear.",
    highlights: ["100% Ringspun Cotton", "Cloud Cushioning Soles", "Pre-Shrunk Bio-Washed", "Breathable Materials"],
    guideTitle: "Fabric & Footwear Care Tips",
    guideDesc: "Machine wash tees inside-out with cold water to preserve fiber softness. Air-dry running shoes away from direct sunlight to maintain foam bounce."
  },
  "Home & Living": {
    title: "Artisan Home & Living",
    subtitle: "Minimal ceramic stoneware, soothing desk lamps, and vacuum insulated flasks to elevate your personal spaces.",
    highlights: ["Hand-Glazed Stoneware", "Food-Grade 304 Steel", "Microwave & Dishwasher Safe", "Minimalist Aesthetics"],
    guideTitle: "Artisan Stoneware & Thermal Care",
    guideDesc: "Our stoneware mugs are kiln-fired at 1200°C for chip resistance. Insulated steel flasks keep drinks hot for 12 hours or cold for 24 hours without sweating."
  },
  Accessories: {
    title: "Everyday Carry & Accessories",
    subtitle: "Weatherproof urban commuter backpacks, organic canvas totes, and UV400 polarized shades built to travel.",
    highlights: ["Water-Resistant Canvas", "Padded Laptop Sleeves", "100% UV400 Protection", "Reinforced Seams"],
    guideTitle: "Selecting Your Everyday Carry",
    guideDesc: "Choose daypacks with dedicated padded sleeves to protect tech up to 15.6 inches. Polarized aviators offer maximum glare reduction during sunny commutes."
  },
  "Beauty & Wellness": {
    title: "Clean Skincare & Wellness",
    subtitle: "Refreshing botanical formulas, dermatologically tested serums, and gentle hydration rituals.",
    highlights: ["Cruelty-Free & Vegan", "Niacinamide & Hyaluronic Acid", "Non-Comedogenic", "Clean Formulations"],
    guideTitle: "Daily Skincare Ritual",
    guideDesc: "Layer hydrating essence right after cleansing, followed by lightweight peptide cream to lock in deep moisture without clogging pores."
  }
};

const ProductsPage = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    loading,
    error,
  } = useShop();

  const [sortBy, setSortBy] = useState("featured"); // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [priceFilter, setPriceFilter] = useState("all"); // 'all' | 'under1000' | '1000to2000' | 'above2000'
  const [minRating, setMinRating] = useState(0);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.features && p.features.some((f) => f.toLowerCase().includes(q)))
      );
    }

    // In-stock filter
    if (onlyInStock) {
      result = result.filter((p) => p.inStock);
    }

    // Price range filter
    if (priceFilter === "under1000") {
      result = result.filter((p) => p.price < 1000);
    } else if (priceFilter === "1000to2000") {
      result = result.filter((p) => p.price >= 1000 && p.price <= 2000);
    } else if (priceFilter === "above2000") {
      result = result.filter((p) => p.price > 2000);
    }

    // Minimum rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured: keep default order
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, onlyInStock, priceFilter, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("featured");
    setOnlyInStock(false);
    setPriceFilter("all");
    setMinRating(0);
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    searchQuery.trim() !== "" ||
    onlyInStock ||
    priceFilter !== "all" ||
    minRating > 0;

  const currentCategoryMeta =
    CATEGORY_META[selectedCategory] || CATEGORY_META["All"];

  return (
    <div className="products-page-container container">
      {/* Dynamic Category Hero Banner */}
      <div className="category-hero-banner">
        <div className="cat-hero-content">
          <div className="cat-hero-eyebrow">
            <FiAward className="sparkle-icon" />
            <span>CURATED COLLECTION</span>
          </div>
          <h1 className="cat-hero-title">{currentCategoryMeta.title}</h1>
          <p className="cat-hero-subtitle">{currentCategoryMeta.subtitle}</p>

          <div className="cat-hero-highlights">
            {currentCategoryMeta.highlights.map((tag, i) => (
              <span key={i} className="cat-highlight-pill">
                <FiCheckCircle className="pill-check" /> {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="cat-hero-stat-card">
          <span className="stat-big-num">{filteredProducts.length}</span>
          <span className="stat-label">
            {filteredProducts.length === 1 ? "Product Found" : "Products Found"}
          </span>
          {hasActiveFilters && (
            <button className="reset-filter-link" onClick={handleResetFilters}>
              <FiRotateCcw /> Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="catalog-toolbar">
        {/* Search input */}
        <div className="toolbar-search-box">
          <FiSearch className="toolbar-search-icon" />
          <input
            type="search"
            placeholder="Search headphones, ceramics, backpacks, cotton..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="toolbar-search-input"
          />
          {searchQuery && (
            <button
              className="toolbar-clear-btn"
              onClick={() => setSearchQuery("")}
            >
              <FiX />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="toolbar-sort-wrap">
          <label htmlFor="sort-select" className="sort-label">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="toolbar-select"
          >
            <option value="featured">Featured / Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Category Pills Navigation Bar */}
      <div className="category-pills-bar">
        <button
          className={`category-pill ${selectedCategory === "All" ? "active" : ""}`}
          onClick={() => setSelectedCategory("All")}
        >
          All Items ({products.length})
        </button>
        {categories
          .filter((c) => c.id !== "all")
          .map((c) => {
            const count = products.filter((p) => p.category === c.name).length;
            return (
              <button
                key={c.id}
                className={`category-pill ${selectedCategory === c.name ? "active" : ""}`}
                onClick={() => setSelectedCategory(c.name)}
              >
                {c.name} ({count})
              </button>
            );
          })}
      </div>

      {/* Secondary Fast Filter Chips (Price, Rating, In-Stock) */}
      <div className="secondary-filter-chips-row">
        <div className="filter-group-label">
          <FiSliders className="sliders-icon" /> Filter by:
        </div>

        <div className="price-chips-group">
          <button
            className={`filter-chip ${priceFilter === "all" ? "active" : ""}`}
            onClick={() => setPriceFilter("all")}
          >
            All Prices
          </button>
          <button
            className={`filter-chip ${priceFilter === "under1000" ? "active" : ""}`}
            onClick={() => setPriceFilter("under1000")}
          >
            Under ₹1,000
          </button>
          <button
            className={`filter-chip ${priceFilter === "1000to2000" ? "active" : ""}`}
            onClick={() => setPriceFilter("1000to2000")}
          >
            ₹1,000 – ₹2,000
          </button>
          <button
            className={`filter-chip ${priceFilter === "above2000" ? "active" : ""}`}
            onClick={() => setPriceFilter("above2000")}
          >
            Above ₹2,000
          </button>
        </div>

        <div className="rating-chip-group">
          <button
            className={`filter-chip ${minRating === 4.5 ? "active" : ""}`}
            onClick={() => setMinRating(minRating === 4.5 ? 0 : 4.5)}
          >
            <FiStar className="star-sm filled" /> 4.5+ Rating
          </button>

          <button
            className={`filter-chip ${onlyInStock ? "active" : ""}`}
            onClick={() => setOnlyInStock(!onlyInStock)}
          >
            <FiCheckCircle className="check-sm" /> In Stock Only
          </button>
        </div>
      </div>

      {/* Product Content Area */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading curated catalogue...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-catalog-state">
          <div className="empty-icon-wrap">
            <FiSearch className="empty-svg" />
          </div>
          <h3>No matching products found</h3>
          <p>
            We couldn't find any items matching your active filters
            {searchQuery ? ` for "${searchQuery}"` : ""}. Try adjusting or clearing your filters.
          </p>
          <button className="btn btn-primary" onClick={handleResetFilters}>
            <FiRotateCcw /> Reset All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Curated Category Buying Guide Card */}
          <div className="category-guide-card">
            <div className="guide-icon-box">
              <FiInfo className="guide-icon" />
            </div>
            <div className="guide-content">
              <h3 className="guide-title">{currentCategoryMeta.guideTitle}</h3>
              <p className="guide-desc">{currentCategoryMeta.guideDesc}</p>
            </div>
            <div className="guide-badge-col">
              <span className="guide-badge">
                <FiShield /> Certified Authentic
              </span>
            </div>
          </div>

          {/* Delivery & Buyer Guarantee Strip */}
          <div className="catalog-guarantee-strip">
            <div className="guarantee-col">
              <FiTruck className="g-icon" />
              <div>
                <strong>Express Delivery</strong>
                <small>Free on orders above ₹999</small>
              </div>
            </div>
            <div className="guarantee-col">
              <FiRefreshCw className="g-icon" />
              <div>
                <strong>7-Day Doorstep Returns</strong>
                <small>No questions asked pickup</small>
              </div>
            </div>
            <div className="guarantee-col">
              <FiShield className="g-icon" />
              <div>
                <strong>Secure Payments</strong>
                <small>UPI, Cards & Cash on Delivery</small>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
