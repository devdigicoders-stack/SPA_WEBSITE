const CART_KEY = "shopkart_cart_v1";
const ORDER_KEY = "shopkart_last_order_v1";
const ORDER_HISTORY_KEY = "shopkart_orders_v1";

function getCart() {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}
function money(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
function productById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}
function cartDetails() {
  return getCart()
    .map((item) => {
      const product = productById(item.id);
      return product
        ? { ...product, qty: Math.max(1, Number(item.qty) || 1) }
        : null;
    })
    .filter(Boolean);
}
function cartSubtotal() {
  return cartDetails().reduce((sum, p) => sum + p.price * p.qty, 0);
}
function shippingCost(subtotal) {
  return subtotal === 0 || subtotal >= 999 ? 0 : 49;
}
function escapeHTML(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function productCard(p) {
  return `<article class="product-card"><a href="products.html" class="product-image" aria-label="Browse ${escapeHTML(p.name)}" style="background:${p.color}"><span class="product-badge">${escapeHTML(p.badge)}</span><span class="product-emoji" aria-hidden="true">${p.emoji}</span></a><div class="product-info"><span class="product-category">${escapeHTML(p.category)}</span><h3 class="product-name" title="${escapeHTML(p.name)}">${escapeHTML(p.name)}</h3><div class="product-rating">★ ${p.rating} <span class="muted">(${p.reviews})</span></div><div class="product-bottom"><div><span class="product-price">${money(p.price)}</span><span class="old-price">${money(p.oldPrice)}</span></div><button class="add-btn" type="button" data-add="${p.id}" aria-label="Add ${escapeHTML(p.name)} to cart" title="Add to cart">+</button></div></div></article>`;
}
function addToCart(id) {
  const cart = getCart();
  const found = cart.find((item) => item.id === Number(id));
  if (found) found.qty += 1;
  else cart.push({ id: Number(id), qty: 1 });
  saveCart(cart);
  showToast("Added to your cart");
}
function changeQty(id, delta) {
  const cart = getCart();
  const found = cart.find((item) => item.id === Number(id));
  if (found) {
    found.qty += delta;
    if (found.qty <= 0)
      return saveCart(cart.filter((item) => item.id !== Number(id)));
    saveCart(cart);
  }
}
function removeFromCart(id) {
  saveCart(getCart().filter((item) => item.id !== Number(id)));
}
function updateCartCount() {
  const el = document.querySelector("#cart-count");
  if (el) el.textContent = cartCount();
}
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#17241e",
      color: "#fff",
      padding: "12px 18px",
      borderRadius: "10px",
      zIndex: "99",
      boxShadow: "0 8px 25px #0002",
      fontSize: ".9rem",
    });
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.display = "block";
  clearTimeout(window.__shopToastTimer);
  window.__shopToastTimer = setTimeout(
    () => (toast.style.display = "none"),
    1900,
  );
}
function renderHeader() {
  const host = document.querySelector("#site-header");
  if (!host) return;
  const page = location.pathname.split("/").pop() || "index.html";
  host.className = "site-header";
  host.innerHTML = `<div class="container nav-wrap"><a class="brand" href="index.html"><span class="brand-mark">S</span>ShopKart</a><nav class="nav-links" aria-label="Main navigation"><a class="${page === "index.html" ? "active" : ""}" href="index.html">Home</a><a class="${page === "products.html" ? "active" : ""}" href="products.html">Shop all</a><a href="products.html?category=Fashion">Fashion</a><a href="products.html?category=Home">Home & living</a></nav><div class="nav-actions"><a class="nav-search" href="products.html" aria-label="Search products">⌕</a><a class="cart-link" href="cart.html"><span class="cart-icon">🛒<span id="cart-count" class="cart-count">0</span></span><span>Cart</span></a></div></div>`;
  updateCartCount();
}
function renderFooter() {
  const host = document.querySelector("#site-footer");
  if (!host) return;
  host.className = "site-footer";
  host.innerHTML = `<div class="container"><div class="footer-main"><div class="footer-brand"><a class="brand" href="index.html"><span class="brand-mark">S</span>ShopKart</a><p>Good finds for everyday life. A demo storefront built with HTML, CSS and JavaScript.</p></div><div class="footer-links"><a href="index.html">Home</a><a href="products.html">Products</a><a href="cart.html">Cart</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ShopKart. Demo project.</span><span>Made for learning · No real payments</span></div></div>`;
}
function renderCategories() {
  const host = document.querySelector("#category-grid");
  if (!host) return;
  host.innerHTML = CATEGORIES.slice(0, 4)
    .map(
      (c) =>
        `<a class="category-card" href="products.html?category=${encodeURIComponent(c.name)}"><span class="category-emoji">${c.emoji}</span><strong>${escapeHTML(c.name)}</strong><span>${escapeHTML(c.description)} →</span></a>`,
    )
    .join("");
}
function renderFeatured() {
  const host = document.querySelector("#featured-products");
  if (host) host.innerHTML = PRODUCTS.slice(0, 4).map(productCard).join("");
}
document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) {
    addToCart(button.dataset.add);
    button.textContent = "✓";
    setTimeout(() => {
      if (button.isConnected) button.textContent = "+";
    }, 700);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderCategories();
  renderFeatured();
  updateCartCount();
});
