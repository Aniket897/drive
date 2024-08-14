import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

const DashboardLayout = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to={"/auth"} />;
  }

  return <div>DashboardLayout</div>;
};

export default DashboardLayout;
