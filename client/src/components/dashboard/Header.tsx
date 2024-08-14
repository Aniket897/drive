import Search from "./Search";
import Profile from "./Profile";

const Header = () => {
  return (
    <div className="bg-[#F8FAFD] p-5 flex items-center gap-6">
      <Search />
      <div className="flex-1 flex justify-end">
        <Profile />
      </div>
    </div>
  );
};

export default Header;
