import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="relative">
      <SearchIcon size={20}  className="text-gray-400 absolute top-3 left-3" />
      <input
        className="bg-[#E9EEF6] p-3 w-[400px] rounded-full pl-10"
        type="text"
        placeholder="Search in Drive"
      />
    </div>
  );
};

export default Search;
