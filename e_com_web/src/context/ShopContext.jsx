import React, { createContext, useContext, useState, useEffect } from "react";
import { calculateShipping, COUPONS } from "../utils/helpers";

const ShopContext = createContext();

const CART_KEY = "shopkart_cart_v1";
const ADDRESS_KEY = "shopkart_address_v1";
const ORDERS_KEY = "shopkart_orders_v1";
const LAST_ORDER_KEY = "shopkart_last_order_v1";

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Navigation State
  const [currentView, setCurrentView] = useState("home"); // 'home' | 'products' | 'cart' | 'delivery' | 'payment' | 'success'
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [productDetailModal, setProductDetailModal] = useState(null);

  // Toast System
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });

  const showToast = (message, type = "info") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  // Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Delivery Address State
  const [deliveryAddress, setDeliveryAddress] = useState(() => {
    try {
      const saved = localStorage.getItem(ADDRESS_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            fullName: "",
            phone: "",
            email: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            addressType: "Home",
            speed: "standard", // standard or express
          };
    } catch {
      return {
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        addressType: "Home",
        speed: "standard",
      };
    }
  });

  // Coupon State
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Orders State
  const [currentOrder, setCurrentOrder] = useState(() => {
    try {
      const saved = localStorage.getItem(LAST_ORDER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [ordersHistory, setOrdersHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Fetch Data from public/data/
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          fetch("/data/products.json"),
          fetch("/data/categories.json"),
        ]);

        if (!prodRes.ok || !catRes.ok) {
          throw new Error("Failed to load store data");
        }

        const prodData = await prodRes.json();
        const catData = await catRes.json();

        setProducts(prodData);
        setCategories(catData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Unable to load product catalogue. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Sync Delivery Address to LocalStorage
  useEffect(() => {
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(deliveryAddress));
  }, [deliveryAddress]);

  // Sync Orders
  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(ordersHistory));
  }, [ordersHistory]);

  // Cart Operations
  const addToCart = (productId, qty = 1) => {
    const prod = products.find((p) => p.id === Number(productId));
    if (!prod) return;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === Number(productId));
      if (existing) {
        return prevCart.map((item) =>
          item.id === Number(productId) ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        return [...prevCart, { id: Number(productId), qty }];
      }
    });

    showToast(`Added "${prod.name}" to cart!`, "success");
  };

  const updateCartQty = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === Number(productId)) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    const prod = products.find((p) => p.id === Number(productId));
    setCart((prevCart) => prevCart.filter((item) => item.id !== Number(productId)));
    if (prod) {
      showToast(`Removed "${prod.name}" from cart`, "info");
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Detailed Cart Items
  const cartItems = cart
    .map((item) => {
      const prod = products.find((p) => p.id === item.id);
      return prod ? { ...prod, qty: item.qty } : null;
    })
    .filter(Boolean);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const baseShippingFee = calculateShipping(cartSubtotal);
  const expressExtra = deliveryAddress.speed === "express" ? 99 : 0;
  const shippingFee = cartSubtotal > 0 ? baseShippingFee + expressExtra : 0;

  // Coupon calculations
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount) {
      discountAmount = Math.min(appliedCoupon.flatDiscount, cartSubtotal);
    }
  }

  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const applyCouponCode = (code) => {
    const formattedCode = (code || "").trim().toUpperCase();
    const coupon = COUPONS[formattedCode];
    if (!coupon) {
      return { success: false, message: "Invalid coupon code." };
    }
    if (cartSubtotal < coupon.minSpend) {
      return {
        success: false,
        message: `Min order spend of ₹${coupon.minSpend} required for this coupon.`,
      };
    }
    setAppliedCoupon(coupon);
    showToast(`Coupon ${coupon.code} applied successfully!`, "success");
    return { success: true, message: `Applied! ${coupon.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed", "info");
  };

  // Place Order Method
  const placeOrder = (paymentInfo) => {
    const orderId = "SK-" + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toISOString();
    const estDeliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const newOrder = {
      orderId,
      orderDate,
      estDeliveryDate,
      items: cartItems,
      subtotal: cartSubtotal,
      shippingFee,
      discountAmount,
      couponCode: appliedCoupon?.code || null,
      totalAmount: finalTotal,
      deliveryAddress: { ...deliveryAddress },
      payment: {
        method: paymentInfo.method,
        status: paymentInfo.status || "Paid",
        reference: paymentInfo.reference || "TXN_" + Math.random().toString(36).substring(2, 9).toUpperCase(),
        timestamp: new Date().toLocaleTimeString("en-IN"),
      },
    };

    setCurrentOrder(newOrder);
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(newOrder));
    setOrdersHistory((prev) => [newOrder, ...prev]);

    clearCart();
    setCurrentView("success");
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        cart,
        cartItems,
        cartCount,
        cartSubtotal,
        shippingFee,
        discountAmount,
        appliedCoupon,
        finalTotal,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        productDetailModal,
        setProductDetailModal,
        deliveryAddress,
        setDeliveryAddress,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        applyCouponCode,
        removeCoupon,
        placeOrder,
        currentOrder,
        ordersHistory,
        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
