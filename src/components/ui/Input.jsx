import React from "react";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  required = false,
  min,
  max,
}) {
  return (
    <div className={`mb-2 ${className}`}>
      {label && (
        <label
          className="form-label"
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#334155",
            marginBottom: "6px",
            display: "block",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>
          )}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(
            type === "number"
              ? parseFloat(e.target.value)
              : e.target.value
          )
        }
        placeholder={placeholder}
        min={min}
        max={max}
        className="form-control"
        style={{
          padding: "12px 16px",
          borderRadius: "12px",
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          color: "#1e293b",
          transition: "0.2s",
        }}
      />
    </div>
  );
}