import React from "react";
import { useShop } from "../context/ShopContext";
import { FiCheckCircle, FiInfo, FiAlertCircle } from "react-icons/fi";

const Toast = () => {
  const { toast } = useShop();

  if (!toast.visible) return null;

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <FiCheckCircle className="toast-icon success" />;
      case "error":
        return <FiAlertCircle className="toast-icon error" />;
      default:
        return <FiInfo className="toast-icon info" />;
    }
  };

  return (
    <div className={`toast-notification toast-${toast.type}`}>
      {getIcon()}
      <span className="toast-text">{toast.message}</span>
    </div>
  );
};

export default Toast;
