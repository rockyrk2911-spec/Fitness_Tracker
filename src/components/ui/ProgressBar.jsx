export default function ProgressBar({ value, max = 100, className = "" }) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  const isOverLimit = value > max;

  return (
    <div className={className} style={{ marginBottom: "8px" }}>
      <div
        className="progress"
        style={{
          height: "12px",
          backgroundColor: "#f1f5f9",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${percentage}%`,
            backgroundColor: isOverLimit ? "#ef4444" : "#10b981",
            transition: "width 0.5s ease-out",
          }}
        />
      </div>
    </div>
  );
}