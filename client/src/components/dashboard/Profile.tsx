import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LogOut } from "lucide-react";
import { logout } from "../../store/slices/authSlice";
import { toast } from "sonner";

const Profile = () => {
  const { username } = useSelector((state: RootState) => state.auth.userData);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("logged out successfully");
  };
  return (
    <div className="flex items-center gap-3">
      <p>👋 {username}</p>
      <button onClick={() => handleLogout()}>
        <LogOut size={15} />
      </button>
    </div>
  );
};

export default Profile;
