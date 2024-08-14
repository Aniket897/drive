import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { Document } from "../types";
import axios from "../axios";
import Loader from "../components/Loader";

const View = () => {
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const { userData } = useSelector((state: RootState) => state.auth);
  const { docId } = useParams();

  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/document/${docId}`);
      console.log(response);
      setDocument(response.data.document);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (document?.owner.email === userData?.email) {
    window.open(document.url, "_blank");
    return <Navigate to={"/"} />;
  }

  if (document?.isPublic) {
    window.open(document.url, "_self");
    return <Navigate to={"/"} />;
  }
};

export default View;
