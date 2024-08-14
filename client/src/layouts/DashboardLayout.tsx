import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

const DashboardLayout = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
