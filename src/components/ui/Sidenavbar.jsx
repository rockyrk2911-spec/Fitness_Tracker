import {
  ActivityIcon,
  HomeIcon,
  PersonStandingIcon,
  UserIcon,
  UtensilsIcon,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { NavLink } from "react-router-dom";

const Sidenavbar = () => {
  const navItems = [
    { path: "/", label: "Home", icon: HomeIcon },
    { path: "/food", label: "Food", icon: UtensilsIcon },
    { path: "/activity", label: "Activity", icon: ActivityIcon },
    { path: "/profile", label: "Profile", icon: UserIcon },
  ];

  return (
    <nav
      className="d-none d-lg-flex flex-column"
      style={{
        width: "260px",
        background: "#fff",
        borderRight: "1px solid #e9ecef",
        padding: "24px",
        minHeight: "100vh",
        transition: "0.2s",
      }}
    >
      <div className="d-flex align-items-center gap-3 mb-4">
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "#10b981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PersonStandingIcon size={28} color="white" />
        </div>

        <h1 className="fw-bold m-0" style={{ fontSize: "24px" }}>
          FitTrack
        </h1>
      </div>

      <div className="d-flex flex-column gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="text-decoration-none"
          >
            {({ isActive }) => (
              <div
                className="d-flex align-items-center gap-3"
                style={{
                  padding: "10px 16px",
                  borderLeft: "3px solid",
                  borderColor: isActive ? "#10b981" : "transparent",
                  background: isActive ? "#ecfdf5" : "transparent",
                  color: isActive ? "#059669" : "#6c757d",
                  fontWeight: isActive ? "500" : "normal",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              >
                <item.icon size={20} />
                <span style={{ fontSize: "16px" }}>{item.label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </div>

      
    </nav>
  );
};

export default Sidenavbar;