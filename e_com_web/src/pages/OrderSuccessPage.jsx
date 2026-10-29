import React from "react";
import { useShop } from "../context/ShopContext";
import CheckoutStepper from "../components/CheckoutStepper";
import { formatPrice } from "../utils/helpers";
import {
  FiCheckCircle,
  FiShoppingBag,
  FiPrinter,
  FiMapPin,
  FiTruck,
  FiCalendar,
  FiPackage,
  FiCreditCard,
  FiArrowRight,
  FiPhone,
} from "react-icons/fi";

const OrderSuccessPage = () => {
  const { currentOrder, setCurrentView, setSelectedCategory } = useShop();

  if (!currentOrder) {
    return (
      <div className="container order-empty-state">
        <h2>No recent order found</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedCategory("All");
            setCurrentView("products");
          }}
        >
          Explore Store
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(currentOrder.orderDate).toLocaleDateString(
    "en-IN",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="order-success-container container">
      <CheckoutStepper currentStep="success" />

      {/* Main Success Hero Card */}
      <div className="order-success-hero-card">
        <div className="success-icon-badge">
          <FiCheckCircle className="big-check-icon" />
        </div>
        <span className="success-eyebrow">ORDER CONFIRMED & SECURED</span>
        <h1 className="success-title">
          Thank you, {currentOrder.deliveryAddress.fullName || "valued customer"}!
        </h1>
        <p className="success-subtitle">
          Your order has been received and is being prepared for dispatch. We’ve sent
          order confirmation details to{" "}
          <strong>{currentOrder.deliveryAddress.email || "your registered contact"}</strong>.
        </p>

        <div className="order-key-metadata">
          <div className="meta-block">
            <span className="meta-label">Order Number</span>
            <span className="meta-val highlight">{currentOrder.orderId}</span>
          </div>
          <div className="meta-block">
            <span className="meta-label">Date & Time</span>
            <span className="meta-val">{formattedDate}</span>
          </div>
          <div className="meta-block">
            <span className="meta-label">Payment Status</span>
            <span className="meta-val badge-paid">{currentOrder.payment.status}</span>
          </div>
          <div className="meta-block">
            <span className="meta-label">Estimated Delivery</span>
            <span className="meta-val">{currentOrder.estDeliveryDate}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="success-actions-row">
          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedCategory("All");
              setCurrentView("products");
            }}
          >
            <FiShoppingBag /> Continue Shopping
          </button>
          <button className="btn btn-outline" onClick={handlePrint}>
            <FiPrinter /> Print Receipt
          </button>
        </div>
      </div>

      {/* Delivery Tracking Timeline */}
      <div className="tracking-timeline-card">
        <h3 className="card-section-title">
          <FiTruck className="section-icon" /> Order & Delivery Status
        </h3>
        <div className="timeline-steps-grid">
          <div className="timeline-step completed">
            <div className="timeline-circle">
              <FiCheckCircle />
            </div>
            <div className="timeline-info">
              <strong>Order Placed</strong>
              <small>{formattedDate}</small>
            </div>
          </div>

          <div className="timeline-step completed">
            <div className="timeline-circle">
              <FiCheckCircle />
            </div>
            <div className="timeline-info">
              <strong>Payment Authenticated</strong>
              <small>{currentOrder.payment.method}</small>
            </div>
          </div>

          <div className="timeline-step active">
            <div className="timeline-circle">
              <FiPackage />
            </div>
            <div className="timeline-info">
              <strong>Preparing for Dispatch</strong>
              <small>Expected dispatch today</small>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-circle">
              <FiTruck />
            </div>
            <div className="timeline-info">
              <strong>Out for Delivery</strong>
              <small>By courier partner</small>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-circle">
              <FiCheckCircle />
            </div>
            <div className="timeline-info">
              <strong>Delivered</strong>
              <small>{currentOrder.estDeliveryDate}</small>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Summary: Items & Delivery Information */}
      <div className="order-details-grid">
        {/* Items List */}
        <div className="details-col-items">
          <div className="details-card">
            <h3 className="card-section-title">
              <FiPackage className="section-icon" /> Items in this Order ({currentOrder.items.length})
            </h3>
            <div className="order-items-table">
              {currentOrder.items.map((item) => (
                <div key={item.id} className="order-receipt-item-row">
                  <img src={item.image} alt={item.name} className="receipt-thumb" />
                  <div className="receipt-item-text">
                    <span className="receipt-item-cat">{item.category}</span>
                    <h4 className="receipt-item-name">{item.name}</h4>
                    <span className="receipt-item-qty">
                      Qty: {item.qty} × {formatPrice(item.price)}
                    </span>
                  </div>
                  <div className="receipt-item-total">
                    {formatPrice(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>

            <div className="receipt-price-summary">
              <div className="price-line">
                <span>Subtotal</span>
                <span>{formatPrice(currentOrder.subtotal)}</span>
              </div>
              {currentOrder.discountAmount > 0 && (
                <div className="price-line discount-line">
                  <span>Coupon Discount ({currentOrder.couponCode})</span>
                  <span className="green">-{formatPrice(currentOrder.discountAmount)}</span>
                </div>
              )}
              <div className="price-line">
                <span>Shipping Fee</span>
                <span>
                  {currentOrder.shippingFee === 0 ? "FREE" : formatPrice(currentOrder.shippingFee)}
                </span>
              </div>
              <div className="price-divider"></div>
              <div className="price-line grand-total-line">
                <span>Total Paid</span>
                <span className="total-amount">{formatPrice(currentOrder.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Address and Payment Method */}
        <div className="details-col-info">
          {/* Destination */}
          <div className="details-card">
            <h3 className="card-section-title">
              <FiMapPin className="section-icon" /> Shipping Address
            </h3>
            <div className="receipt-address-body">
              <strong>{currentOrder.deliveryAddress.fullName}</strong>
              <p>{currentOrder.deliveryAddress.address}</p>
              <p>
                {currentOrder.deliveryAddress.city},{" "}
                {currentOrder.deliveryAddress.state} -{" "}
                {currentOrder.deliveryAddress.pincode}
              </p>
              <p className="phone-line">
                <FiPhone /> +91 {currentOrder.deliveryAddress.phone}
              </p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="details-card">
            <h3 className="card-section-title">
              <FiCreditCard className="section-icon" /> Payment Summary
            </h3>
            <div className="receipt-payment-body">
              <div className="meta-row">
                <span className="meta-label">Payment Mode:</span>
                <strong>{currentOrder.payment.method}</strong>
              </div>
              <div className="meta-row">
                <span className="meta-label">Transaction Ref:</span>
                <code>{currentOrder.payment.reference}</code>
              </div>
              {currentOrder.payment.reference?.startsWith("pay_") && (
                <div className="meta-row rzp-verified-row">
                  <span className="meta-label">Gateway:</span>
                  <span className="rzp-verified-pill">
                    <FiCheckCircle /> Razorpay Test Payment Verified
                  </span>
                </div>
              )}
              <div className="meta-row">
                <span className="meta-label">Status:</span>
                <span className="tag-status-success">{currentOrder.payment.status}</span>
              </div>
            </div>
          </div>

          {/* Customer Help Box */}
          <div className="details-card help-contact-card">
            <h3 className="card-section-title">
              <FiPhone className="section-icon" /> Need Assistance?
            </h3>
            <p className="help-text">
              Have questions regarding delivery timing or order modifications? Our customer team is available 24/7.
            </p>
            <div className="help-actions">
              <span className="help-pill">Email: support@shopkart.in</span>
              <span className="help-pill">Toll-Free: 1800-123-SHOP</span>
            </div>
          </div>
        </div>
      </div>

      {/* What Happens Next Guide & Referral Program */}
      <div className="success-next-steps-grid">
        <div className="next-steps-card">
          <h3 className="next-steps-title">What Happens Next?</h3>
          <div className="next-steps-steps">
            <div className="step-item">
              <span className="step-num">1</span>
              <div>
                <strong>SMS & Email Confirmation</strong>
                <p>Order receipt and tracking link sent to {currentOrder.deliveryAddress.email || "your email"}.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-num">2</span>
              <div>
                <strong>Quality Inspection & Packing</strong>
                <p>Every item is verified by our inspection team and packaged with tamper-evident seals.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-num">3</span>
              <div>
                <strong>Doorstep Delivery & OTP</strong>
                <p>Courier rider will arrive with an OTP verification for safe contactless handover.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="referral-promo-card">
          <span className="referral-eyebrow">EXCLUSIVE PERK</span>
          <h3 className="referral-title">Give ₹150, Get ₹150</h3>
          <p className="referral-desc">
            Invite your friends to ShopKart. They get ₹150 off their first order, and you earn ₹150 credits when they purchase.
          </p>
          <div className="referral-code-wrap">
            <span className="referral-code">SHOPKART150</span>
            <span className="referral-copy-tag">Share with Friends</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
