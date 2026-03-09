const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white border shadow-sm ${className}`}
      style={{
        borderRadius: "16px",
        borderColor: "#e9ecef",
        padding: "20px",
        transition: "0.2s",
      }}
    >
      {children}
    </div>
  );
};

export default Card;