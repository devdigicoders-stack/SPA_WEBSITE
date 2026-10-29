document.addEventListener("DOMContentLoaded", () => {
  const host = document.querySelector("#order-confirmation");
  let order;
  try {
    order = JSON.parse(localStorage.getItem(ORDER_KEY) || "null");
  } catch {}
  if (!order) {
    host.innerHTML = `<div class="confirmation-card"><div class="success-icon">🛍️</div><h1>No recent order found</h1><p class="muted">Place an order first to see its confirmation here.</p><a class="btn btn-primary" href="products.html">Browse products</a></div>`;
    return;
  }
  const c = order.customer;
  host.innerHTML = `<article class="confirmation-card"><div class="success-icon">✓</div><span class="eyebrow">ORDER CONFIRMED</span><h1>Thank you, ${escapeHTML(c.name.split(" ")[0])}!</h1><p class="muted">Your demo order has been placed. We've saved the order details in this browser.</p><div class="order-meta"><span>Order ID <strong>${escapeHTML(order.orderId)}</strong></span><span>Payment <strong>${escapeHTML(order.payment)}</strong></span><span>Total <strong>${money(order.total)}</strong></span></div><div class="confirmation-section"><h2>Items ordered</h2>${order.items.map((p) => `<div class="summary-product"><div class="summary-product-art" style="background:${p.color}"><span>${p.emoji}</span></div><div class="summary-product-info"><strong>${escapeHTML(p.name)}</strong><small>Quantity: ${p.qty}</small></div><span class="summary-product-price">${money(p.price * p.qty)}</span></div>`).join("")}<div class="summary-row"><span>Subtotal</span><strong>${money(order.subtotal)}</strong></div><div class="summary-row"><span>Delivery</span><strong>${order.shipping === 0 ? "FREE" : money(order.shipping)}</strong></div><div class="summary-row summary-total"><span>Order total</span><strong>${money(order.total)}</strong></div></div><div class="confirmation-section"><h2>Delivery address</h2><div class="address-box"><strong>${escapeHTML(c.name)}</strong><br>${escapeHTML(c.address)}<br>${escapeHTML(c.city)}, ${escapeHTML(c.state)} — ${escapeHTML(c.pincode)}<br>Mobile: ${escapeHTML(c.phone)}${c.email ? `<br>Email: ${escapeHTML(c.email)}` : ""}</div></div><p class="summary-note">This is a frontend demo. No real order was sent to a store and no payment was processed.</p><div class="confirmation-actions"><a class="btn btn-primary" href="products.html">Continue shopping →</a><button class="btn btn-outline" id="print-order" type="button">Print confirmation</button></div></article>`;
  document
    .querySelector("#print-order")
    ?.addEventListener("click", () => window.print());
});
