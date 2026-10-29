document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#delivery-form"),
    layout = document.querySelector("#delivery-layout"),
    empty = document.querySelector("#delivery-empty"),
    summary = document.querySelector("#checkout-summary"),
    error = document.querySelector("#form-error");
  function render() {
    const items = cartDetails();
    if (!items.length) {
      layout.classList.add("hidden");
      empty.classList.remove("hidden");
      return;
    }
    empty.classList.add("hidden");
    layout.classList.remove("hidden");
    const subtotal = cartSubtotal(),
      shipping = shippingCost(subtotal);
    summary.innerHTML = `<h2>Order summary</h2>${items.map((p) => `<div class="summary-product"><div class="summary-product-art" style="background:${p.color}"><span>${p.emoji}</span></div><div class="summary-product-info"><strong>${escapeHTML(p.name)}</strong><small>Qty: ${p.qty} · ${money(p.price)} each</small></div><span class="summary-product-price">${money(p.price * p.qty)}</span></div>`).join("")}<div class="summary-row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="summary-row"><span>Delivery</span><strong>${shipping === 0 ? "FREE" : money(shipping)}</strong></div><div class="summary-row summary-total"><span>Total</span><strong>${money(subtotal + shipping)}</strong></div><p class="summary-note">Delivery usually takes 3–7 business days (demo estimate).</p>`;
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    error.textContent = "";
    if (!form.reportValidity()) {
      error.textContent = "Please check the required fields and try again.";
      return;
    }
    const items = cartDetails();
    if (!items.length) {
      render();
      return;
    }
    const fd = new FormData(form);
    const subtotal = cartSubtotal(),
      shipping = shippingCost(subtotal);
    const order = {
      orderId: "SK" + Date.now().toString().slice(-9),
      createdAt: new Date().toISOString(),
      customer: {
        name: fd.get("name").trim(),
        phone: fd.get("phone").trim(),
        email: fd.get("email").trim(),
        address: fd.get("address").trim(),
        city: fd.get("city").trim(),
        state: fd.get("state").trim(),
        pincode: fd.get("pincode").trim(),
      },
      payment: fd.get("payment"),
      items: items.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        qty: p.qty,
        emoji: p.emoji,
        color: p.color,
      })),
      subtotal,
      shipping,
      total: subtotal + shipping,
    };
    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      const history = JSON.parse(
        localStorage.getItem(ORDER_HISTORY_KEY) || "[]",
      );
      history.push(order);
      localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(history));
      saveCart([]);
      location.href = "success.html";
    } catch (err) {
      error.textContent =
        "Could not save the demo order. Check your browser storage settings.";
    }
  });
  render();
});
