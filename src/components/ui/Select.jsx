import React from "react";
import { ChevronDownIcon } from "lucide-react";

export default function Select({
  label,
  value,
  onChange,
  options = [],
  className = "",
  required = false,
  placeholder = "Select an option",
}) {
  return (
    <div className={className} style={{ marginBottom: "8px" }}>
      {label && (
        <label
          className="form-label"
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#334155",
            display: "block",
            marginBottom: "6px",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>
          )}
        </label>
      )}

      <div style={{ position: "relative" }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="form-select"
          style={{
            padding: "12px 16px",
            borderRadius: "12px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            color: "#1e293b",
            cursor: "pointer",
            appearance: "none",
            transition: "0.2s",
          }}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDownIcon
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "20px",
            height: "20px",
            color: "#94a3b8",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}