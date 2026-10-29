import React from "react";
import { useShop } from "../context/ShopContext";
import { FiShoppingCart, FiMapPin, FiCreditCard, FiCheckCircle } from "react-icons/fi";

const CheckoutStepper = ({ currentStep }) => {
  const { setCurrentView } = useShop();

  const steps = [
    { id: "cart", label: "Cart", icon: FiShoppingCart, stepNum: 1 },
    { id: "delivery", label: "Delivery Address", icon: FiMapPin, stepNum: 2 },
    { id: "payment", label: "Payment Gateway", icon: FiCreditCard, stepNum: 3 },
    { id: "success", label: "Confirmation", icon: FiCheckCircle, stepNum: 4 },
  ];

  const getStepStatus = (stepId, index) => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);
    if (index < currentIndex) return "completed";
    if (index === currentIndex) return "active";
    return "pending";
  };

  return (
    <div className="checkout-stepper-wrap">
      <div className="checkout-stepper">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id, index);
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              <div
                className={`stepper-node ${status}`}
                onClick={() => {
                  // Only allow clicking back to completed steps
                  if (status === "completed") {
                    setCurrentView(step.id);
                  }
                }}
              >
                <div className="stepper-circle">
                  {status === "completed" ? (
                    <FiCheckCircle className="step-svg" />
                  ) : (
                    <Icon className="step-svg" />
                  )}
                </div>
                <div className="stepper-label-group">
                  <span className="step-number">Step 0{step.stepNum}</span>
                  <span className="step-name">{step.label}</span>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`stepper-line ${
                    index < steps.findIndex((s) => s.id === currentStep)
                      ? "filled"
                      : ""
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutStepper;
