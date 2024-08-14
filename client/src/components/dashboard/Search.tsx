import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Document } from "../../types";
import axios from "../../axios";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";

const Search = () => {
  const [result, setResult] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (name) {
      fetchDocuments();
    }
  }, [name]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/document/search/${name}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(response);
      setResult(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderName = (name: string) => {
    let formatedName = "";
    formatedName = name.slice(0, 40);
    if (name.length > 40) {
      formatedName += "...";
    }
    return formatedName;
  };

  return (
    <div className="relative">
      <SearchIcon size={20} className="text-gray-400 absolute top-3 left-3" />
      <input
        className="bg-[#E9EEF6] p-3 w-[400px] rounded-full pl-10"
        type="text"
        placeholder="Search in Drive"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {name && (
        <div className="min-h-[100px] w-[400px] bg-white absolute border border-black rounded-lg p-4">
          <div>{loading && <Loader />}</div>
          {!loading && result.length > 0 && (
            <div className="space-y-3">
              {result.map((doc) => {
                return (
                  <div key={doc._id} className="text-xs">
                    <Link to={`/view/${doc._id}`}>{renderName(doc.name)}</Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
