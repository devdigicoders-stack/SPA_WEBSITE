import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { formatPrice } from "../utils/helpers";
import {
  FiPackage,
  FiClock,
  FiMapPin,
  FiCreditCard,
  FiArrowRight,
  FiCheckCircle,
  FiShoppingBag,
  FiTruck,
  FiDownload,
  FiAward,
  FiHelpCircle,
  FiRotateCcw,
  FiX,
  FiCheck,
} from "react-icons/fi";

const OrdersHistoryPage = () => {
  const { ordersHistory, setCurrentView, setSelectedCategory, addToCart, showToast } = useShop();
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);

  if (ordersHistory.length === 0) {
    return (
      <div className="orders-history-empty container">
        <div className="empty-cart-card">
          <div className="empty-cart-icon-box">
            <FiPackage className="empty-cart-svg" />
          </div>
          <h2>No Past Orders Yet</h2>
          <p>
            When you complete your orders, they will show up here with live
            tracking, downloadable invoices, and 1-click reordering.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedCategory("All");
              setCurrentView("products");
            }}
          >
            Start Shopping <FiArrowRight />
          </button>
        </div>
      </div>
    );
  }

  // Account stats calculations
  const totalSpent = ordersHistory.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalItemsOrdered = ordersHistory.reduce(
    (sum, o) => sum + (o.items ? o.items.reduce((iSum, i) => iSum + i.qty, 0) : 0),
    0
  );

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addToCart(item.id, item.qty);
    });
    showToast(`Items from Order #${order.orderId} added to your cart!`, "success");
    setCurrentView("cart");
  };

  const handleDownloadInvoice = (orderId) => {
    showToast(`Downloading Tax Invoice for Order #${orderId}...`, "info");
    window.print();
  };

  return (
    <div className="orders-history-container container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <span className="eyebrow">ACCOUNT HISTORY</span>
          <h1 className="page-title">My Orders & Purchases</h1>
          <p className="page-subtitle">
            Track and view previous purchases placed with ShopKart.
          </p>
        </div>
        <button
          className="btn btn-outline"
          onClick={() => {
            setSelectedCategory("All");
            setCurrentView("products");
          }}
        >
          <FiShoppingBag /> Browse Store
        </button>
      </div>

      {/* Account Membership & Loyalty Bar */}
      <div className="account-membership-card">
        <div className="member-tier-col">
          <div className="tier-badge-icon">
            <FiAward className="tier-icon" />
          </div>
          <div>
            <span className="tier-label">MEMBERSHIP STATUS</span>
            <h3 className="tier-name">ShopKart Gold VIP</h3>
          </div>
        </div>

        <div className="member-stats-grid">
          <div className="m-stat">
            <span className="m-val">{ordersHistory.length}</span>
            <span className="m-sub">Total Orders</span>
          </div>
          <div className="m-stat">
            <span className="m-val">{totalItemsOrdered}</span>
            <span className="m-sub">Products Bought</span>
          </div>
          <div className="m-stat">
            <span className="m-val">{formatPrice(totalSpent)}</span>
            <span className="m-sub">Lifetime Spend</span>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-list-wrap">
        {ordersHistory.map((order) => {
          const dateStr = new Date(order.orderDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <div key={order.orderId} className="order-history-card">
              <div className="order-history-header">
                <div className="order-main-meta">
                  <span className="order-id-tag">Order #{order.orderId}</span>
                  <span className="order-date-tag">
                    <FiClock /> {dateStr}
                  </span>
                </div>
                <div className="order-status-pill">
                  <FiCheckCircle className="green" /> {order.payment.status}
                </div>
              </div>

              {/* Visual Order Progress Bar */}
              <div className="order-progress-strip">
                <div className="progress-step-mini done">
                  <span className="p-dot"></span>
                  <span className="p-text">Confirmed</span>
                </div>
                <div className="progress-line-mini done"></div>
                <div className="progress-step-mini done">
                  <span className="p-dot"></span>
                  <span className="p-text">Packed</span>
                </div>
                <div className="progress-line-mini active"></div>
                <div className="progress-step-mini active">
                  <span className="p-dot"></span>
                  <span className="p-text">In Transit</span>
                </div>
                <div className="progress-line-mini"></div>
                <div className="progress-step-mini">
                  <span className="p-dot"></span>
                  <span className="p-text">Delivered</span>
                </div>
              </div>

              {/* Items row */}
              <div className="order-items-scroll">
                {order.items.map((item) => (
                  <div key={item.id} className="history-item-chip">
                    <img src={item.image} alt={item.name} className="chip-img" />
                    <div className="chip-info">
                      <span className="chip-name">{item.name}</span>
                      <span className="chip-meta">
                        Qty: {item.qty} • {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom details & Actions */}
              <div className="order-history-footer">
                <div className="order-destination">
                  <FiMapPin className="dest-icon" />
                  <span>
                    Delivering to: {order.deliveryAddress.fullName},{" "}
                    {order.deliveryAddress.city}
                  </span>
                </div>

                <div className="order-actions-bar">
                  <button
                    className="order-action-btn"
                    onClick={() => setActiveTrackingOrder(order)}
                  >
                    <FiTruck /> Track Order
                  </button>
                  <button
                    className="order-action-btn"
                    onClick={() => handleDownloadInvoice(order.orderId)}
                  >
                    <FiDownload /> Invoice
                  </button>
                  <button
                    className="order-action-btn primary-action"
                    onClick={() => handleReorder(order)}
                  >
                    <FiRotateCcw /> Buy Again
                  </button>
                  <div className="order-total-price">
                    <span>Total:</span>
                    <strong>{formatPrice(order.totalAmount)}</strong>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Live Tracking Modal */}
      {activeTrackingOrder && (
        <div className="modal-backdrop" onClick={() => setActiveTrackingOrder(null)}>
          <div
            className="tracking-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="tracking-modal-header">
              <div>
                <h3>Live Delivery Tracking</h3>
                <span className="modal-sub">Order #{activeTrackingOrder.orderId} • BlueDart Express</span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setActiveTrackingOrder(null)}
              >
                <FiX />
              </button>
            </div>

            <div className="tracking-timeline-modal">
              <div className="track-step-node completed">
                <FiCheckCircle className="node-icon" />
                <div className="node-body">
                  <strong>Order Verified & Accepted</strong>
                  <small>Payment verified via {activeTrackingOrder.payment.method}</small>
                </div>
              </div>

              <div className="track-step-node completed">
                <FiCheckCircle className="node-icon" />
                <div className="node-body">
                  <strong>Quality Passed & Packed</strong>
                  <small>Dispatched from Central Warehouse (Hub-4)</small>
                </div>
              </div>

              <div className="track-step-node current">
                <FiTruck className="node-icon" />
                <div className="node-body">
                  <strong>In Transit to Destination Facility</strong>
                  <small>En route to {activeTrackingOrder.deliveryAddress.city}</small>
                </div>
              </div>

              <div className="track-step-node">
                <FiClock className="node-icon" />
                <div className="node-body">
                  <strong>Out for Delivery</strong>
                  <small>Expected delivery by {activeTrackingOrder.estDeliveryDate}</small>
                </div>
              </div>
            </div>

            <div className="tracking-modal-footer">
              <button
                className="btn btn-primary btn-block"
                onClick={() => setActiveTrackingOrder(null)}
              >
                Close Tracking Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Support Strip */}
      <div className="history-support-strip">
        <FiHelpCircle className="support-icon" />
        <div>
          <strong>Need help with any of your previous orders?</strong>
          <p>Our resolution team guarantees replacement or refunds within 24 hours.</p>
        </div>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => showToast("Support team notified! Expect a call within 10 minutes.", "success")}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default OrdersHistoryPage;
