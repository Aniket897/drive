import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

const AuthLayout = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 text-center bg-[#283B41] px-7">
        <h1 className="font-extrabold text-4xl text-white">
          The first step towards securing your ideas is trusting in the tools
          that protect them. Welcome to your safe space for all things important
        </h1>
      </div>
      <div className="flex justify-center items-center flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
