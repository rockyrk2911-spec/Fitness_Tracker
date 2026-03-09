import { Activity, Home, User, Utensils } from "lucide-react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/food", label: "Food", icon: Utensils },
    { path: "/activity", label: "Activity", icon: Activity },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav
      className="d-lg-none"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#ffffff",
        borderTop: "1px solid #e9ecef",
        padding: "0 16px",
        paddingBottom: "env(safe-area-inset-bottom)",
        zIndex: 1000,
      }}
    >
      <div
        className="d-flex justify-content-around align-items-center mx-auto"
        style={{
          maxWidth: "500px",
          height: "64px",
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="text-decoration-none"
          >
            {({ isActive }) => (
              <div
                className="d-flex flex-column align-items-center"
                style={{
                  gap: "6px",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  transition: "0.2s",
                  color: isActive ? "#059669" : "#9ca3af",
                }}
              >
                <item.icon size={22} />
                <span style={{ fontSize: "12px", fontWeight: 500 }}>
                  {item.label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;