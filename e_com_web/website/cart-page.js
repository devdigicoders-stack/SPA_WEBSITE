document.addEventListener("DOMContentLoaded", () => {
  const host = document.querySelector("#cart-content");
  function render() {
    const items = cartDetails();
    if (!items.length) {
      host.innerHTML = `<div class="empty-state empty-cart"><div>🛒</div><h2>Your cart is waiting</h2><p>You haven't added anything yet. Explore the shop and find your next favourite.</p><a class="btn btn-primary" href="products.html">Start shopping →</a></div>`;
      return;
    }
    const subtotal = cartSubtotal(),
      shipping = shippingCost(subtotal),
      total = subtotal + shipping;
    host.innerHTML = `<div class="cart-items">${items.map((p) => `<article class="cart-item"><div class="cart-item-image" style="background:${p.color}"><span>${p.emoji}</span></div><div><span class="product-category">${escapeHTML(p.category)}</span><h3>${escapeHTML(p.name)}</h3><p class="muted">${money(p.price)} each</p><div class="qty-control"><button type="button" data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${p.qty}</span><button type="button" data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div></div><div class="cart-item-price">${money(p.price * p.qty)}<br><button class="remove-btn" type="button" data-remove="${p.id}">Remove</button></div></article>`).join("")}</div><aside class="panel summary-panel"><h2>Order summary</h2><div class="summary-row"><span>Subtotal (${items.reduce((s, p) => s + p.qty, 0)} items)</span><strong>${money(subtotal)}</strong></div><div class="summary-row"><span>Delivery</span><strong>${shipping === 0 ? "FREE" : money(shipping)}</strong></div>${subtotal > 0 && subtotal < 999 ? `<p class="summary-note">Add ${money(999 - subtotal)} more for free delivery.</p>` : ""}<div class="summary-row summary-total"><span>Total</span><strong>${money(total)}</strong></div><a class="btn btn-primary btn-block" href="delivery.html">Continue to delivery →</a><p class="summary-note">🔒 Demo checkout. No payment is collected.</p></aside>`;
  }
  host.addEventListener("click", (e) => {
    const qty = e.target.closest("[data-qty]");
    const remove = e.target.closest("[data-remove]");
    if (qty) {
      changeQty(qty.dataset.qty, Number(qty.dataset.delta));
      render();
    }
    if (remove) {
      removeFromCart(remove.dataset.remove);
      render();
    }
  });
  render();
});
