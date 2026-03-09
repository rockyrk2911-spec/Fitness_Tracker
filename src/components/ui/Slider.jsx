import React from "react";
import { Info } from "lucide-react";
import Tooltip from "./Tooltip";

const Slider = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className = "",
  unit = "",
  infoText
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-100 ${className}`}>
      {label && (
        <div className="d-flex justify-content-between align-items-center mb-2">
          
          <div className="d-flex align-items-center gap-2">
            <label
              className="form-label mb-0"
              style={{ fontSize: "14px", fontWeight: 500, color: "#334155" }}
            >
              {label}
            </label>

            {infoText && (
              <Tooltip content={infoText}>
                <Info
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#94a3b8",
                    cursor: "help",
                    transition: "0.2s"
                  }}
                />
              </Tooltip>
            )}
          </div>

          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#059669"
            }}
          >
            {value} {unit}
          </span>
        </div>
      )}

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "8px",
          background: "#e2e8f0",
          borderRadius: "999px",
          cursor: "pointer"
        }}
      >
        {/* Track Fill */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            background: "#10b981",
            borderRadius: "999px",
            width: `${percentage}%`
          }}
        />

        {/* Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            zIndex: 10
          }}
        />

        {/* Thumb */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "16px",
            height: "16px",
            background: "#ffffff",
            border: "2px solid #10b981",
            borderRadius: "50%",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            pointerEvents: "none",
            transition: "0.075s ease-out",
            left: `calc(${percentage}% - 8px)`
          }}
        />
      </div>
    </div>
  );
};

export default Slider;