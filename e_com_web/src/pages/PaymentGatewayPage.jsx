import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import CheckoutStepper from "../components/CheckoutStepper";
import { formatPrice } from "../utils/helpers";
import {
  FiCreditCard,
  FiSmartphone,
  FiGlobe,
  FiDollarSign,
  FiLock,
  FiShield,
  FiCheckCircle,
  FiArrowLeft,
  FiMapPin,
  FiAlertCircle,
  FiRefreshCw,
  FiCheck,
  FiZap,
  FiKey,
  FiX,
  FiClock,
  FiMaximize2,
} from "react-icons/fi";

// Official Razorpay Logo SVG
const RazorpayLogo = ({ className = "rzp-logo" }) => (
  <svg viewBox="0 0 120 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.2 0L0 28H8.5L16.8 11.2L20.8 17.5L25.2 8.7L14.2 0Z"
      fill="#0C2340"
    />
    <path
      d="M21.2 0L12.5 17.5L16.8 24.5L30 0H21.2Z"
      fill="#0284c7"
    />
    <text x="36" y="20" fontFamily="'Space Grotesk', sans-serif" fontSize="16" fontWeight="800" fill="#0C2340">
      Razorpay
    </text>
  </svg>
);

// High-fidelity Razorpay QR Code SVG with embedded Razorpay emblem
const RazorpayQRSVG = ({ amount = "₹4,798" }) => (
  <div className="rzp-qr-wrapper">
    <svg viewBox="0 0 140 140" className="rzp-dynamic-qr-svg" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="140" height="140" fill="#ffffff" rx="12" />
      
      {/* Top Left Marker */}
      <rect x="12" y="12" width="34" height="34" fill="#0c2340" rx="6" />
      <rect x="18" y="18" width="22" height="22" fill="#ffffff" rx="3" />
      <rect x="23" y="23" width="12" height="12" fill="#0284c7" rx="2" />

      {/* Top Right Marker */}
      <rect x="94" y="12" width="34" height="34" fill="#0c2340" rx="6" />
      <rect x="100" y="18" width="22" height="22" fill="#ffffff" rx="3" />
      <rect x="105" y="23" width="12" height="12" fill="#0284c7" rx="2" />

      {/* Bottom Left Marker */}
      <rect x="12" y="94" width="34" height="34" fill="#0c2340" rx="6" />
      <rect x="18" y="100" width="22" height="22" fill="#ffffff" rx="3" />
      <rect x="23" y="105" width="12" height="12" fill="#0284c7" rx="2" />

      {/* Timing Patterns */}
      <rect x="52" y="18" width="8" height="8" fill="#0c2340" rx="1" />
      <rect x="66" y="18" width="8" height="8" fill="#0c2340" rx="1" />
      <rect x="80" y="18" width="8" height="8" fill="#0c2340" rx="1" />

      <rect x="52" y="32" width="8" height="8" fill="#0284c7" rx="1" />
      <rect x="66" y="32" width="22" height="8" fill="#0c2340" rx="1" />

      {/* Left and Bottom Data Modules */}
      <rect x="18" y="52" width="8" height="8" fill="#0c2340" rx="1" />
      <rect x="32" y="52" width="8" height="8" fill="#0284c7" rx="1" />
      <rect x="18" y="66" width="22" height="8" fill="#0c2340" rx="1" />
      <rect x="18" y="80" width="8" height="8" fill="#0c2340" rx="1" />
      <rect x="32" y="80" width="8" height="8" fill="#0284c7" rx="1" />

      {/* Right Data Modules */}
      <rect x="94" y="52" width="16" height="8" fill="#0c2340" rx="1" />
      <rect x="116" y="52" width="12" height="8" fill="#0284c7" rx="1" />
      <rect x="94" y="66" width="8" height="8" fill="#0284c7" rx="1" />
      <rect x="108" y="66" width="20" height="8" fill="#0c2340" rx="1" />
      <rect x="94" y="80" width="16" height="8" fill="#0c2340" rx="1" />
      <rect x="116" y="80" width="12" height="8" fill="#0c2340" rx="1" />

      {/* Bottom Data Modules */}
      <rect x="52" y="94" width="8" height="16" fill="#0c2340" rx="1" />
      <rect x="66" y="94" width="22" height="8" fill="#0284c7" rx="1" />
      <rect x="66" y="108" width="12" height="20" fill="#0c2340" rx="1" />
      <rect x="84" y="108" width="8" height="20" fill="#0284c7" rx="1" />
      <rect x="98" y="98" width="30" height="8" fill="#0c2340" rx="1" />
      <rect x="98" y="112" width="14" height="16" fill="#0284c7" rx="1" />
      <rect x="118" y="112" width="10" height="16" fill="#0c2340" rx="1" />

      {/* Center Shield with Razorpay 'R' Logo */}
      <rect x="46" y="46" width="48" height="48" fill="#ffffff" rx="10" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
      <rect x="50" y="50" width="40" height="40" fill="#0c2340" rx="8" />
      <path d="M60 56 L69 70 L64 77 L57 77 L63 68 L56 56 Z" fill="#ffffff" />
      <path d="M67 56 L80 77 L73 77 L62 60 L67 56 Z" fill="#0284c7" />
    </svg>
  </div>
);

const RAZORPAY_TEST_CARD = {
  number: "4111 2222 3333 4444",
  expiry: "12/28",
  cvv: "123",
  otp: "123456",
};

const PaymentGatewayPage = () => {
  const {
    cartItems,
    cartSubtotal,
    shippingFee,
    discountAmount,
    appliedCoupon,
    finalTotal,
    deliveryAddress,
    placeOrder,
    setCurrentView,
    showToast,
  } = useShop();

  // Selected tab: 'razorpay' | 'qr' | 'card' | 'upi' | 'netbanking' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState("");

  // Simulated Razorpay Modal & Simulator States
  const [showRzpModal, setShowRzpModal] = useState(false);
  const [rzpModalTab, setRzpModalTab] = useState("qr"); // 'qr' | 'card' | 'upi' | 'netbanking'
  const [rzpStep, setRzpStep] = useState("checkout"); // 'checkout' | 'otp_simulator'
  const [simulatedOtp, setSimulatedOtp] = useState("123456");

  // Dynamic QR Code Countdown Timer (5 minutes)
  const [qrTimer, setQrTimer] = useState(299);
  useEffect(() => {
    const timer = setInterval(() => {
      setQrTimer((prev) => (prev > 0 ? prev - 1 : 299));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // UPI State
  const [upiId, setUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState(false);
  const [upiError, setUpiError] = useState("");

  // Card State
  const [cardData, setCardData] = useState({
    number: "",
    name: deliveryAddress.fullName || "Sachin Chaurasiya",
    expiry: "",
    cvv: "",
  });
  const [cardErrors, setCardErrors] = useState({});

  // Netbanking State
  const [selectedBank, setSelectedBank] = useState("HDFC");

  // COD Captcha State
  const [captchaCode, setCaptchaCode] = useState(() =>
    Math.floor(1000 + Math.random() * 9000).toString()
  );
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  // Quick fill Razorpay Test Card
  const handleFillTestCard = () => {
    setCardData({
      number: RAZORPAY_TEST_CARD.number,
      name: deliveryAddress.fullName || "Sachin Chaurasiya",
      expiry: RAZORPAY_TEST_CARD.expiry,
      cvv: RAZORPAY_TEST_CARD.cvv,
    });
    setCardErrors({});
    showToast("Filled official Razorpay Test Card details!", "info");
  };

  // Format 16-digit card number with spaces
  const handleCardNumberChange = (e) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    let formatted = raw.replace(/(\d{4})/g, "$1 ").trim();
    setCardData((prev) => ({ ...prev, number: formatted }));
    if (cardErrors.number) setCardErrors((prev) => ({ ...prev, number: null }));
  };

  // Format Expiry MM/YY
  const handleExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 2) {
      raw = raw.slice(0, 2) + "/" + raw.slice(2);
    }
    setCardData((prev) => ({ ...prev, expiry: raw }));
    if (cardErrors.expiry) setCardErrors((prev) => ({ ...prev, expiry: null }));
  };

  // Handle CVV
  const handleCvvChange = (e) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCardData((prev) => ({ ...prev, cvv: raw }));
    if (cardErrors.cvv) setCardErrors((prev) => ({ ...prev, cvv: null }));
  };

  const handleVerifyUpi = () => {
    if (!upiId.includes("@") || upiId.length < 5) {
      setUpiError("Please enter a valid UPI ID (e.g. sachin@okaxis)");
      setUpiVerified(false);
      return;
    }
    setUpiError("");
    setUpiVerified(true);
    showToast("UPI ID verified with Razorpay PSP!", "success");
  };

  const refreshCaptcha = () => {
    setCaptchaCode(Math.floor(1000 + Math.random() * 9000).toString());
    setCaptchaInput("");
    setCaptchaError("");
  };

  // Generate authentic Razorpay Payment ID format: pay_xxxxxxxxxxxxxx
  const generateRazorpayPaymentId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "pay_";
    for (let i = 0; i < 14; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  // Launch official interactive Razorpay Checkout Modal
  const launchRazorpayModal = (initialTab = "qr") => {
    setRzpModalTab(initialTab);
    setRzpStep("checkout");
    setShowRzpModal(true);
  };

  // Complete Razorpay Payment with authentic transaction reference
  const completeRazorpayPayment = (subMethod = "Card") => {
    const paymentId = generateRazorpayPaymentId();
    setIsProcessing(true);
    setProcessingStatus(`Razorpay Gateway: Authorizing ${subMethod} in Test Mode...`);

    setTimeout(() => {
      setShowRzpModal(false);
      setIsProcessing(false);
      placeOrder({
        method: `Razorpay (${subMethod} - Test Mode)`,
        status: "Paid",
        reference: paymentId,
      });
      showToast(`Razorpay Payment Approved! ID: ${paymentId}`, "success");
    }, 1200);
  };

  // Handle standard on-page actions
  const handleExecutePayment = (e) => {
    e.preventDefault();

    if (paymentMethod === "razorpay") {
      launchRazorpayModal("qr");
      return;
    }

    if (paymentMethod === "qr") {
      completeRazorpayPayment("Razorpay Dynamic QR");
      return;
    }

    if (paymentMethod === "upi") {
      if (!upiId && !upiVerified) {
        setUpiError("Please enter and verify your UPI ID or choose QR Code");
        return;
      }
      completeRazorpayPayment(`Razorpay UPI (${upiId})`);
      return;
    }

    if (paymentMethod === "card") {
      const errs = {};
      const cleanNum = cardData.number.replace(/\s/g, "");
      if (cleanNum.length < 16) {
        errs.number = "Enter valid 16-digit card number (or click 'Autofill Test Card')";
      }
      if (!cardData.name.trim()) {
        errs.name = "Enter cardholder name";
      }
      if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
        errs.expiry = "Enter valid MM/YY";
      }
      if (cardData.cvv.length < 3) {
        errs.cvv = "Enter 3-digit CVV";
      }
      if (Object.keys(errs).length > 0) {
        setCardErrors(errs);
        showToast("Please fill in card details", "error");
        return;
      }

      // Open Razorpay OTP Simulator
      setRzpStep("otp_simulator");
      setShowRzpModal(true);
      return;
    }

    if (paymentMethod === "netbanking") {
      completeRazorpayPayment(`Razorpay Netbanking (${selectedBank} Bank)`);
      return;
    }

    if (paymentMethod === "cod") {
      if (captchaInput.trim() !== captchaCode) {
        setCaptchaError("Captcha code does not match. Please re-enter.");
        return;
      }
      setIsProcessing(true);
      setProcessingStatus("Confirming Cash on Delivery order...");
      setTimeout(() => {
        setIsProcessing(false);
        placeOrder({
          method: "Cash on Delivery (COD)",
          status: "Pending on Delivery",
          reference: "COD_" + Math.random().toString(36).substring(2, 9).toUpperCase(),
        });
        showToast("Order placed via Cash on Delivery!", "success");
      }, 1400);
    }
  };

  if (cartItems.length === 0) {
    setCurrentView("cart");
    return null;
  }

  return (
    <div className="payment-page-container container">
      <CheckoutStepper currentStep="payment" />

      {/* Header */}
      <div className="page-header">
        <div>
          <span className="eyebrow">STEP 3 OF 3 • SECURE GATEWAY</span>
          <h1 className="page-title">Razorpay Payment Gateway</h1>
          <p className="page-subtitle">
            All payment options are powered by <strong>Razorpay (Test Sandbox Mode)</strong>.
          </p>
        </div>
        <button
          className="text-link-btn"
          onClick={() => setCurrentView("delivery")}
        >
          <FiArrowLeft /> Back to Address
        </button>
      </div>

      {/* Razorpay Master Test Mode Banner */}
      <div className="razorpay-top-banner">
        <div className="rzp-banner-left">
          <RazorpayLogo className="rzp-brand-logo" />
          <span className="rzp-test-mode-badge">⚡ TEST MODE ACTIVE</span>
          <span className="rzp-banner-text">
            Official Razorpay Sandbox Gateway. Safe & simulated test transactions with real Razorpay flow.
          </span>
        </div>

        <button
          type="button"
          className="btn btn-outline btn-sm rzp-popup-trigger-btn"
          onClick={() => launchRazorpayModal("qr")}
        >
          <FiMaximize2 /> Open Razorpay Popup View
        </button>
      </div>

      <div className="checkout-layout-grid">
        {/* Left Column: Razorpay Payment Tabs */}
        <div className="payment-main-col">
          <div className="payment-gateway-card">
            {/* Tabs Header */}
            <div className="payment-tabs-header">
              <button
                type="button"
                className={`payment-tab-btn ${paymentMethod === "razorpay" ? "active" : ""}`}
                onClick={() => setPaymentMethod("razorpay")}
              >
                <FiZap className="tab-icon" />
                <span>Razorpay All-in-One</span>
                <span className="tab-pill-rec">Fastest</span>
              </button>

              <button
                type="button"
                className={`payment-tab-btn ${paymentMethod === "qr" ? "active" : ""}`}
                onClick={() => setPaymentMethod("qr")}
              >
                <FiSmartphone className="tab-icon" />
                <span>Razorpay QR Code</span>
              </button>

              <button
                type="button"
                className={`payment-tab-btn ${paymentMethod === "card" ? "active" : ""}`}
                onClick={() => setPaymentMethod("card")}
              >
                <FiCreditCard className="tab-icon" />
                <span>Razorpay Cards</span>
              </button>

              <button
                type="button"
                className={`payment-tab-btn ${paymentMethod === "upi" ? "active" : ""}`}
                onClick={() => setPaymentMethod("upi")}
              >
                <FiSmartphone className="tab-icon" />
                <span>Razorpay UPI Apps</span>
              </button>

              <button
                type="button"
                className={`payment-tab-btn ${paymentMethod === "netbanking" ? "active" : ""}`}
                onClick={() => setPaymentMethod("netbanking")}
              >
                <FiGlobe className="tab-icon" />
                <span>Net Banking</span>
              </button>

              <button
                type="button"
                className={`payment-tab-btn ${paymentMethod === "cod" ? "active" : ""}`}
                onClick={() => setPaymentMethod("cod")}
              >
                <FiDollarSign className="tab-icon" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* TAB 1: RAZORPAY ALL-IN-ONE (EXPRESS) */}
            {paymentMethod === "razorpay" && (
              <div className="payment-tab-body">
                <div className="razorpay-hero-box">
                  <div className="rzp-hero-top">
                    <div>
                      <span className="rzp-eyebrow">OFFICIAL PAYMENT GATEWAY</span>
                      <h3 className="tab-title">Razorpay Standard Checkout</h3>
                      <p className="tab-desc">
                        Select any payment method below or launch the full Razorpay interactive test checkout window.
                      </p>
                    </div>
                    <div className="rzp-sandbox-pill">
                      <FiShield /> 100% Risk-Free Test Pay
                    </div>
                  </div>

                  <div className="rzp-features-chips">
                    <span className="rzp-f-chip" onClick={() => setPaymentMethod("qr")}>
                      📱 Razorpay QR Code (Instant Scan)
                    </span>
                    <span className="rzp-f-chip" onClick={() => setPaymentMethod("card")}>
                      💳 Test Cards (4111 2222 3333 4444)
                    </span>
                    <span className="rzp-f-chip" onClick={() => setPaymentMethod("upi")}>
                      ⚡ GPay / PhonePe / Paytm UPI
                    </span>
                    <span className="rzp-f-chip" onClick={() => setPaymentMethod("netbanking")}>
                      🏦 50+ Netbanking Banks
                    </span>
                  </div>

                  <div className="rzp-cta-box">
                    <button
                      type="button"
                      className="btn btn-primary btn-block rzp-launch-btn"
                      onClick={() => launchRazorpayModal("qr")}
                    >
                      <RazorpayLogo className="btn-rzp-logo" />
                      <span>Launch Razorpay Test Checkout ({formatPrice(finalTotal)})</span>
                    </button>
                    <p className="rzp-cta-hint">
                      Clicking above immediately opens the official Razorpay Test Checkout interface.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: RAZORPAY DYNAMIC QR CODE */}
            {paymentMethod === "qr" && (
              <div className="payment-tab-body">
                <div className="tab-heading-row">
                  <div>
                    <h3 className="tab-title">Razorpay Dynamic QR Code (Test Mode)</h3>
                    <p className="tab-desc">
                      Scan this QR code with any UPI app (GPay, PhonePe, Paytm, BHIM) to test instant checkout.
                    </p>
                  </div>
                  <span className="instant-badge">Zero Convenience Fee</span>
                </div>

                <div className="rzp-qr-full-display">
                  <div className="rzp-qr-card-box">
                    <div className="rzp-qr-brand-strip">
                      <RazorpayLogo className="rzp-qr-brand-logo" />
                      <span className="rzp-qr-tag">UPI AUTOPAY / INTENT</span>
                    </div>

                    <RazorpayQRSVG amount={formatPrice(finalTotal)} />

                    <div className="rzp-qr-meta">
                      <span className="rzp-qr-amount-text">
                        Amount: <strong>{formatPrice(finalTotal)}</strong>
                      </span>
                      <div className="rzp-qr-timer">
                        <FiClock /> QR expires in <strong>{formatTimer(qrTimer)}</strong>
                      </div>
                      <small className="rzp-qr-subtext">
                        Scan with Google Pay, PhonePe, Paytm, or any UPI Camera
                      </small>
                    </div>

                    {/* Primary Instant Simulator Button */}
                    <button
                      type="button"
                      className="btn btn-primary btn-block rzp-sim-qr-btn"
                      onClick={() => completeRazorpayPayment("Razorpay Dynamic QR")}
                    >
                      <FiZap /> Simulate Instant QR Payment Success ({formatPrice(finalTotal)})
                    </button>
                  </div>

                  <div className="rzp-qr-steps-guide">
                    <h4>How Razorpay QR Works:</h4>
                    <ol className="rzp-steps-list">
                      <li>
                        <strong>1. Open any UPI App</strong>
                        <span>Open Google Pay, PhonePe, Paytm, or your banking app.</span>
                      </li>
                      <li>
                        <strong>2. Scan the Razorpay QR</strong>
                        <span>Scan the dynamic QR code on screen.</span>
                      </li>
                      <li>
                        <strong>3. Instant Confirmation</strong>
                        <span>Click the test approval button above to simulate payment approval instantly!</span>
                      </li>
                    </ol>

                    <div className="rzp-trust-pill">
                      <FiLock /> 256-Bit SSL Encrypted Razorpay Gateway
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: RAZORPAY TEST CARDS */}
            {paymentMethod === "card" && (
              <div className="payment-tab-body">
                <div className="tab-heading-row">
                  <div>
                    <h3 className="tab-title">Razorpay Card Gateway</h3>
                    <p className="tab-desc">
                      Visa, MasterCard, RuPay, Maestro. Secured via Razorpay PCI-DSS Level 1.
                    </p>
                  </div>

                  {/* 1-Click Autofill Test Card Button */}
                  <button
                    type="button"
                    className="autofill-test-card-btn"
                    onClick={handleFillTestCard}
                  >
                    <FiZap /> Autofill Razorpay Test Card
                  </button>
                </div>

                <div className="card-form-grid">
                  {/* Card Number */}
                  <div className="form-group full-width">
                    <label className="field-label">Card Number</label>
                    <div className="card-input-wrap">
                      <FiCreditCard className="field-icon-left" />
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={cardData.number}
                        onChange={handleCardNumberChange}
                        className={`form-input with-icon ${cardErrors.number ? "input-error" : ""}`}
                      />
                    </div>
                    {cardErrors.number && (
                      <span className="error-text">
                        <FiAlertCircle /> {cardErrors.number}
                      </span>
                    )}
                  </div>

                  {/* Name on Card */}
                  <div className="form-group full-width">
                    <label className="field-label">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sachin Chaurasiya"
                      value={cardData.name}
                      onChange={(e) => {
                        setCardData((p) => ({ ...p, name: e.target.value }));
                        if (cardErrors.name) setCardErrors((p) => ({ ...p, name: null }));
                      }}
                      className={`form-input ${cardErrors.name ? "input-error" : ""}`}
                    />
                    {cardErrors.name && (
                      <span className="error-text">
                        <FiAlertCircle /> {cardErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Expiry */}
                  <div className="form-group">
                    <label className="field-label">Expiry Date (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="12/28"
                      value={cardData.expiry}
                      onChange={handleExpiryChange}
                      className={`form-input ${cardErrors.expiry ? "input-error" : ""}`}
                    />
                    {cardErrors.expiry && (
                      <span className="error-text">
                        <FiAlertCircle /> {cardErrors.expiry}
                      </span>
                    )}
                  </div>

                  {/* CVV */}
                  <div className="form-group">
                    <label className="field-label">CVV / CVC</label>
                    <input
                      type="password"
                      placeholder="123"
                      maxLength="4"
                      value={cardData.cvv}
                      onChange={handleCvvChange}
                      className={`form-input ${cardErrors.cvv ? "input-error" : ""}`}
                    />
                    {cardErrors.cvv && (
                      <span className="error-text">
                        <FiAlertCircle /> {cardErrors.cvv}
                      </span>
                    )}
                  </div>
                </div>

                <div className="card-test-credentials-note">
                  <FiKey className="note-key-icon" />
                  <div>
                    <strong>Razorpay Sandbox Test Credentials:</strong>
                    <span> Card: <code>4111 2222 3333 4444</code> • Expiry: <code>12/28</code> • CVV: <code>123</code> • OTP: <code>123456</code></span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block pay-now-btn"
                  onClick={handleExecutePayment}
                >
                  <FiLock /> Pay {formatPrice(finalTotal)} via Razorpay (Proceed to OTP)
                </button>
              </div>
            )}

            {/* TAB 4: RAZORPAY UPI APPS */}
            {paymentMethod === "upi" && (
              <div className="payment-tab-body">
                <div className="tab-heading-row">
                  <div>
                    <h3 className="tab-title">Razorpay UPI Intent & Apps</h3>
                    <p className="tab-desc">
                      Pay directly using Google Pay, PhonePe, Paytm, or your UPI VPA ID.
                    </p>
                  </div>
                  <span className="instant-badge">Zero Convenience Fee</span>
                </div>

                <div className="rzp-upi-apps-full">
                  <div className="rzp-app-tiles-grid">
                    <button
                      type="button"
                      className="rzp-app-tile"
                      onClick={() => completeRazorpayPayment("Google Pay UPI")}
                    >
                      <div className="app-tile-icon gpay">GPay</div>
                      <strong>Google Pay</strong>
                      <span className="app-tile-action">1-Click Test Pay ➔</span>
                    </button>

                    <button
                      type="button"
                      className="rzp-app-tile"
                      onClick={() => completeRazorpayPayment("PhonePe UPI")}
                    >
                      <div className="app-tile-icon phonepe">Pe</div>
                      <strong>PhonePe</strong>
                      <span className="app-tile-action">1-Click Test Pay ➔</span>
                    </button>

                    <button
                      type="button"
                      className="rzp-app-tile"
                      onClick={() => completeRazorpayPayment("Paytm UPI")}
                    >
                      <div className="app-tile-icon paytm">Paytm</div>
                      <strong>Paytm UPI</strong>
                      <span className="app-tile-action">1-Click Test Pay ➔</span>
                    </button>

                    <button
                      type="button"
                      className="rzp-app-tile"
                      onClick={() => completeRazorpayPayment("BHIM UPI")}
                    >
                      <div className="app-tile-icon bhim">BHIM</div>
                      <strong>BHIM / CRED</strong>
                      <span className="app-tile-action">1-Click Test Pay ➔</span>
                    </button>
                  </div>

                  <div className="upi-vpa-manual-section">
                    <h4 className="vpa-title">Or Enter Virtual Payment Address (VPA)</h4>
                    <div className="upi-input-group">
                      <input
                        type="text"
                        placeholder="sachin@okaxis or 6386251571@paytm"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          setUpiVerified(false);
                          setUpiError("");
                        }}
                        className={`form-input ${upiError ? "input-error" : ""}`}
                      />
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={handleVerifyUpi}
                      >
                        Verify VPA
                      </button>
                    </div>
                    {upiError && (
                      <span className="error-text">
                        <FiAlertCircle /> {upiError}
                      </span>
                    )}
                    {upiVerified && (
                      <span className="success-text">
                        <FiCheckCircle /> VPA Verified with Razorpay PSP
                      </span>
                    )}

                    <button
                      type="button"
                      className="btn btn-primary btn-block pay-now-btn"
                      onClick={handleExecutePayment}
                    >
                      <FiLock /> Pay {formatPrice(finalTotal)} via Razorpay UPI
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: NET BANKING */}
            {paymentMethod === "netbanking" && (
              <div className="payment-tab-body">
                <div className="tab-heading-row">
                  <div>
                    <h3 className="tab-title">Razorpay Net Banking</h3>
                    <p className="tab-desc">
                      Direct corporate & retail banking authorization across 50+ Indian banks.
                    </p>
                  </div>
                  <span className="instant-badge">50+ Banks Supported</span>
                </div>

                <div className="banks-grid">
                  {["HDFC", "SBI", "ICICI", "AXIS", "KOTAK", "PNB"].map((bank) => (
                    <div
                      key={bank}
                      className={`bank-card ${selectedBank === bank ? "selected" : ""}`}
                      onClick={() => setSelectedBank(bank)}
                    >
                      <div className="bank-radio">
                        {selectedBank === bank && <div className="bank-dot"></div>}
                      </div>
                      <strong>{bank} Bank</strong>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block pay-now-btn"
                  onClick={handleExecutePayment}
                >
                  <FiLock /> Authorize {formatPrice(finalTotal)} via Razorpay ({selectedBank} Bank)
                </button>
              </div>
            )}

            {/* TAB 6: CASH ON DELIVERY */}
            {paymentMethod === "cod" && (
              <div className="payment-tab-body">
                <div className="tab-heading-row">
                  <div>
                    <h3 className="tab-title">Cash on Delivery (COD)</h3>
                    <p className="tab-desc">
                      Pay with cash or UPI QR at your doorstep upon parcel arrival.
                    </p>
                  </div>
                </div>

                <div className="cod-captcha-box">
                  <div className="captcha-row">
                    <div className="captcha-display-box">
                      <span className="captcha-code">{captchaCode}</span>
                    </div>
                    <button
                      type="button"
                      className="refresh-captcha-btn"
                      onClick={refreshCaptcha}
                      title="Generate new code"
                    >
                      <FiRefreshCw />
                    </button>
                    <input
                      type="text"
                      maxLength="4"
                      placeholder="Enter 4-digit code"
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value);
                        setCaptchaError("");
                      }}
                      className={`form-input captcha-input ${captchaError ? "input-error" : ""}`}
                    />
                  </div>
                  {captchaError && (
                    <span className="error-text">
                      <FiAlertCircle /> {captchaError}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block pay-now-btn"
                  onClick={handleExecutePayment}
                >
                  Confirm Cash on Delivery Order
                </button>
              </div>
            )}

            {/* Security Badges Footer */}
            <div className="payment-security-footer">
              <RazorpayLogo className="rzp-small-logo" />
              <div className="security-badges-list">
                <span className="badge-item">
                  <FiLock /> 256-Bit SSL Encrypted
                </span>
                <span className="badge-item">
                  <FiCheckCircle /> PCI-DSS Level 1 Compliant
                </span>
                <span className="badge-item">
                  <FiShield /> RBI Authorized Gateway
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order & Address Summary Recap */}
        <div className="payment-summary-col">
          {/* Delivery Address Review */}
          <div className="summary-card address-recap-card">
            <div className="card-head-between">
              <h3 className="summary-title">
                <FiMapPin className="icon-green" /> Deliver To
              </h3>
              <button
                type="button"
                className="edit-link-btn"
                onClick={() => setCurrentView("delivery")}
              >
                Change
              </button>
            </div>
            <div className="address-details-body">
              <strong>{deliveryAddress.fullName || "Customer"}</strong>
              <p>{deliveryAddress.address || "Street Address"}</p>
              <p>
                {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
              </p>
              <p className="phone-num">Mobile: +91 {deliveryAddress.phone}</p>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="summary-card">
            <h3 className="summary-title">Payment Breakdown</h3>
            <div className="price-lines">
              <div className="price-line">
                <span>Items Subtotal ({cartItems.length} items)</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="price-line discount-line">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="green">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="price-line">
                <span>Delivery Speed ({deliveryAddress.speed === "express" ? "Express" : "Standard"})</span>
                <span>{shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}</span>
              </div>
              <div className="price-divider"></div>
              <div className="price-line grand-total-line">
                <span>Total Payable</span>
                <span className="total-amount">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Exclusive Bank Offers & Cashback */}
            <div className="bank-offers-box">
              <div className="bank-offer-header">
                <FiCheckCircle className="offer-icon" />
                <strong>Razorpay Offers Active</strong>
              </div>
              <ul className="bank-offers-list">
                <li>• <strong>UPI Offer:</strong> 100% verified zero convenience fee on GPay/PhonePe</li>
                <li>• <strong>Card Offer:</strong> Extra 5% instant cashback with ICICI & HDFC Cards</li>
                <li>• <strong>No-Cost EMI:</strong> Available on 3 & 6 months tenures above ₹3,000</li>
              </ul>
            </div>

            {/* Payment Help Support */}
            <div className="payment-help-box">
              <FiShield className="help-icon" />
              <div>
                <strong>Need Payment Assistance?</strong>
                <p>24/7 Razorpay payment concierge: +91 9800 123 456</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RAZORPAY TEST SIMULATOR MODAL (POPUP VIEW) */}
      {showRzpModal && (
        <div className="rzp-modal-backdrop" onClick={() => setShowRzpModal(false)}>
          <div className="rzp-modal-window" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="rzp-modal-header">
              <div className="rzp-modal-brand">
                <div className="rzp-merchant-avatar">SK</div>
                <div>
                  <h3 className="rzp-merchant-title">ShopKart</h3>
                  <span className="rzp-order-sub">Curated Living • {cartItems.length} items</span>
                </div>
              </div>

              <div className="rzp-modal-header-right">
                <div className="rzp-modal-amount">
                  <small>AMOUNT TO PAY</small>
                  <strong>{formatPrice(finalTotal)}</strong>
                </div>
                <button className="rzp-close-btn" onClick={() => setShowRzpModal(false)}>
                  <FiX />
                </button>
              </div>
            </div>

            {/* Razorpay Test Mode Ribbon */}
            <div className="rzp-test-mode-ribbon">
              <span>⚠️ RAZORPAY TEST MODE • SANDBOX ENVIRONMENT</span>
            </div>

            {/* Modal Body - Step 1: Checkout Form */}
            {rzpStep === "checkout" && (
              <div className="rzp-modal-body">
                <div className="rzp-sub-nav">
                  <button
                    className={`rzp-sub-btn ${rzpModalTab === "qr" ? "active" : ""}`}
                    onClick={() => setRzpModalTab("qr")}
                  >
                    <FiSmartphone /> QR Code
                  </button>
                  <button
                    className={`rzp-sub-btn ${rzpModalTab === "card" ? "active" : ""}`}
                    onClick={() => setRzpModalTab("card")}
                  >
                    <FiCreditCard /> Cards
                  </button>
                  <button
                    className={`rzp-sub-btn ${rzpModalTab === "upi" ? "active" : ""}`}
                    onClick={() => setRzpModalTab("upi")}
                  >
                    <FiSmartphone /> UPI Apps
                  </button>
                  <button
                    className={`rzp-sub-btn ${rzpModalTab === "netbanking" ? "active" : ""}`}
                    onClick={() => setRzpModalTab("netbanking")}
                  >
                    <FiGlobe /> Netbanking
                  </button>
                </div>

                {/* Sub Tab: QR Code */}
                {rzpModalTab === "qr" && (
                  <div className="rzp-tab-content rzp-modal-qr-pane">
                    <RazorpayQRSVG amount={formatPrice(finalTotal)} />
                    <span className="rzp-modal-qr-timer">
                      <FiClock /> Expires in {formatTimer(qrTimer)}
                    </span>
                    <button
                      className="btn btn-primary btn-block rzp-submit-pay-btn"
                      onClick={() => completeRazorpayPayment("Razorpay Dynamic QR")}
                    >
                      <FiZap /> Simulate Instant QR Payment Approval
                    </button>
                  </div>
                )}

                {/* Sub Tab: Card */}
                {rzpModalTab === "card" && (
                  <div className="rzp-tab-content">
                    <div className="rzp-autofill-banner">
                      <span>Click to autofill Razorpay Test Card:</span>
                      <button
                        type="button"
                        className="rzp-pill-btn"
                        onClick={handleFillTestCard}
                      >
                        <FiZap /> Fill Test Card
                      </button>
                    </div>

                    <div className="rzp-card-fields">
                      <div className="form-group full-width">
                        <label className="field-label">Card Number</label>
                        <input
                          type="text"
                          value={cardData.number || "4111 2222 3333 4444"}
                          onChange={handleCardNumberChange}
                          className="form-input"
                          placeholder="4111 2222 3333 4444"
                        />
                      </div>

                      <div className="rzp-fields-row">
                        <div className="form-group">
                          <label className="field-label">Expiry</label>
                          <input
                            type="text"
                            value={cardData.expiry || "12/28"}
                            onChange={handleExpiryChange}
                            className="form-input"
                            placeholder="12/28"
                          />
                        </div>
                        <div className="form-group">
                          <label className="field-label">CVV</label>
                          <input
                            type="password"
                            value={cardData.cvv || "123"}
                            onChange={handleCvvChange}
                            className="form-input"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary btn-block rzp-submit-pay-btn"
                      onClick={() => setRzpStep("otp_simulator")}
                    >
                      <FiLock /> Proceed to Razorpay OTP Simulator ({formatPrice(finalTotal)})
                    </button>
                  </div>
                )}

                {/* Sub Tab: UPI Apps */}
                {rzpModalTab === "upi" && (
                  <div className="rzp-tab-content">
                    <p className="rzp-upi-info">
                      Click below to simulate approval from any UPI app (GPay / PhonePe / Paytm):
                    </p>
                    <div className="rzp-quick-upi-list">
                      <button
                        className="rzp-upi-option-card"
                        onClick={() => completeRazorpayPayment("Google Pay UPI")}
                      >
                        <strong>Google Pay</strong>
                        <span className="approve-link">Simulate Success ➔</span>
                      </button>
                      <button
                        className="rzp-upi-option-card"
                        onClick={() => completeRazorpayPayment("PhonePe UPI")}
                      >
                        <strong>PhonePe</strong>
                        <span className="approve-link">Simulate Success ➔</span>
                      </button>
                      <button
                        className="rzp-upi-option-card"
                        onClick={() => completeRazorpayPayment("Paytm UPI")}
                      >
                        <strong>Paytm UPI</strong>
                        <span className="approve-link">Simulate Success ➔</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Sub Tab: Netbanking */}
                {rzpModalTab === "netbanking" && (
                  <div className="rzp-tab-content">
                    <p className="rzp-upi-info">Choose your bank to simulate authorization:</p>
                    <div className="rzp-quick-upi-list">
                      {["HDFC Bank", "State Bank of India", "ICICI Bank", "Axis Bank"].map((b) => (
                        <button
                          key={b}
                          className="rzp-upi-option-card"
                          onClick={() => completeRazorpayPayment(`Netbanking: ${b}`)}
                        >
                          <strong>{b}</strong>
                          <span className="approve-link">Authorize ➔</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Modal Body - Step 2: Razorpay Bank OTP Simulator */}
            {rzpStep === "otp_simulator" && (
              <div className="rzp-otp-simulator-body">
                <div className="simulator-header">
                  <div className="sim-bank-badge">
                    <FiShield /> Razorpay Bank Simulator (Test Mode)
                  </div>
                  <h4>Simulated 3D Secure OTP</h4>
                  <p>
                    Razorpay authentication code sent to mobile <strong>+91 {deliveryAddress.phone || "9876543210"}</strong>.
                  </p>
                </div>

                <div className="sim-otp-box">
                  <label className="field-label">One Time Password (OTP)</label>
                  <input
                    type="text"
                    value={simulatedOtp}
                    onChange={(e) => setSimulatedOtp(e.target.value)}
                    className="form-input sim-otp-input"
                    maxLength="6"
                  />
                  <small className="otp-hint">Default test OTP is prefilled: 123456</small>
                </div>

                <div className="simulator-actions-grid">
                  <button
                    className="btn btn-primary sim-success-btn"
                    onClick={() => completeRazorpayPayment("Razorpay Card (3DS Verified)")}
                  >
                    <FiCheck /> Approve Payment (Success)
                  </button>
                  <button
                    className="btn btn-outline sim-fail-btn"
                    onClick={() => {
                      showToast("Payment declined by test simulator", "error");
                      setShowRzpModal(false);
                    }}
                  >
                    <FiX /> Decline Payment (Test Failure)
                  </button>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="rzp-modal-footer">
              <RazorpayLogo className="rzp-footer-logo" />
              <span className="rzp-footer-tag">Secured with 256-bit encryption</span>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Processing Overlay */}
      {isProcessing && (
        <div className="processing-overlay">
          <div className="processing-card">
            <div className="gateway-spinner"></div>
            <RazorpayLogo className="overlay-rzp-logo" />
            <h3 className="proc-title">Processing Secure Payment</h3>
            <p className="proc-status">{processingStatus}</p>
            <div className="proc-lock-note">
              <FiLock /> Please do not refresh or close this browser window.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGatewayPage;
