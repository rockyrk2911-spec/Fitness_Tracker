import React from "react";

export default function Tooltip({ content, children }) {
  return (
    <div className="position-relative d-inline-flex align-items-center tooltip-wrapper">
      {children}

      <div className="custom-tooltip">
        {content}
      </div>

      <style>
        {`
        .tooltip-wrapper:hover .custom-tooltip {
          display: block;
        }

        .custom-tooltip {
          position: absolute;
          bottom: 100%;
          margin-bottom: 8px;
          width: 192px;
          padding: 6px;
          background-color: #1e293b;
          color: white;
          font-size: 12px;
          border-radius: 6px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          z-index: 50;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          pointer-events: none;
          display: none;
        }
        `}
      </style>
    </div>
  );
}