import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        background: "#f9fafb",
      }}
    >
      <Loader2Icon
        className="spinner-border"
        style={{
          width: "32px",
          height: "32px",
          color: "#22c55e",
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  );
};

export default Loading;