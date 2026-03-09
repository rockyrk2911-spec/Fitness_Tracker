import { Outlet } from "react-router-dom";
import Sidenavbar from "../components/ui/Sidenavbar";
import BottomNav from "../components/ui/BottomNav";

const Layout = () => {
  return (
    <div className="d-flex">
      <Sidenavbar />

      <div className="flex-grow-1 overflow-auto vh-100">
        <Outlet />
      </div>

      <BottomNav />
    </div>
  );
};

export default Layout;