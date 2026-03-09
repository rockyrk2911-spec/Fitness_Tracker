import React from "react";

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}) {
  const baseStyles =
    "d-flex align-items-center justify-content-center gap-2 fw-medium";

  const baseInline = {
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    transition: "0.2s",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  };

  const variants = {
    primary: {
      background: "#10b981",
      color: "white",
    },
    secondary: {
      background: "#f1f5f9",
      color: "#334155",
    },
    danger: {
      background: "#fef2f2",
      color: "#dc2626",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${className}`}
      style={{
        ...baseInline,
        ...variants[variant],
      }}
      onMouseOver={(e) => {
        if (variant === "primary") e.target.style.background = "#059669";
        if (variant === "secondary") e.target.style.background = "#e2e8f0";
        if (variant === "danger") e.target.style.background = "#fee2e2";
      }}
      onMouseOut={(e) => {
        if (variant === "primary") e.target.style.background = "#10b981";
        if (variant === "secondary") e.target.style.background = "#f1f5f9";
        if (variant === "danger") e.target.style.background = "#fef2f2";
      }}
    >
      {children}
    </button>
  );
}