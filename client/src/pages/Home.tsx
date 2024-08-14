import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { getDocuments } from "../store/slices/documentSlice";
import Loader from "../components/Loader";
import Documents from "../components/document/Documents";
import Search from "../components/dashboard/Search";

const Home = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const documents = useSelector((state: RootState) => state.document.documents);

  console.log(documents);

  useEffect(() => {
    setLoading(true);
    dispatch(getDocuments()).finally(() => {
      setLoading(false);
    });
  }, [token]);

  return (
    <div>
      <div className="p-4">
        <h1 className="font-extrabold text-xl">👋 Welcome</h1>
      </div>
      <div className="flex md:hidden items-center justify-center">
        <Search />
      </div>
      <div>{loading && <Loader />}</div>
      <Documents documents={documents} />
    </div>
  );
};

export default Home;
