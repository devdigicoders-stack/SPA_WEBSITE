// Currency Formatter for Indian Rupee
export const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

export const calculateShipping = (subtotal) => {
  if (subtotal === 0) return 0;
  return subtotal >= 999 ? 0 : 49;
};

export const FREE_SHIPPING_THRESHOLD = 999;

export const COUPONS = {
  SAVE10: { code: "SAVE10", discountPercent: 10, minSpend: 499, description: "10% OFF on orders above ₹499" },
  FESTIVE20: { code: "FESTIVE20", discountPercent: 20, minSpend: 1999, description: "20% OFF on orders above ₹1,999" },
  FIRSTBUY: { code: "FIRSTBUY", flatDiscount: 150, minSpend: 799, description: "Flat ₹150 OFF on orders above ₹799" },
};
