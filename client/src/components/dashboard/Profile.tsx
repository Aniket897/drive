import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Profile = () => {
  const { avatar } = useSelector((state: RootState) => state.auth.userData);
  return (
    <div>
      <div className="w-[50px] h-[50px] cursor-pointer overflow-hidden border hover:shadow-md rounded-full bg-white">
        <img src={avatar} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Profile;
