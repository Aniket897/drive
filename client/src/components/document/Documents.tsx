import { CheckCheck, Copy, Earth, Lock, Star } from "lucide-react";
import { Document } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useState } from "react";
import { toogleStatus } from "../../store/slices/documentSlice";
import Loader from "../Loader";
import { Link } from "react-router-dom";

const columns = ["Name", "Privancy", "Size (KB)", "Type"];

const PrivancyToogleButton = ({ doc }: { doc: Document }) => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleStatusChange = (id: string, status: boolean) => {
    setLoading(true);
    dispatch(toogleStatus(id, status)).finally(() => {
      setLoading(false);
    });
  };
  return (
    <button
      disabled={loading}
      onClick={() => {
        handleStatusChange(doc._id, !doc.isPublic);
      }}
      className="bg-blue-500 text-white p-2 rounded-md text-xs min-w-[70px]"
    >
      {loading && <Loader />}
      {!loading && <>{doc.isPublic ? "make private" : "make public"}</>}
    </button>
  );
};

const CopyUrlButton = ({ id }: { id: string }) => {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    setCopied(true);
    navigator.clipboard.writeText(`${window.location.origin}/view/${id}`);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <button
      onClick={copyUrl}
      className="bg-blue-500 text-white p-2 rounded-md text-xs ml-4"
    >
      {copied && <CheckCheck size={15} />}
      {!copied && <Copy size={15} />}
    </button>
  );
};

const StarButton = () => {
  return (
    <td>
      <button>
        <Star size={15} />
      </button>
    </td>
  );
};

const Documents = ({ documents }: { documents: Document[] }) => {
  const renderName = (name: string) => {
    let formatedName = "";
    formatedName = name.slice(0, 50);
    if (name.length > 50) {
      formatedName += "...";
    }
    return formatedName;
  };

  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full table-auto border-collapse  text-xs">
        <thead>
          <tr>
            <th></th>
            {columns.map((item, index) => {
              return (
                <th className="px-4 py-4 border-b text-left" key={index}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.url}>
              <StarButton />
              <td className="cell">
                <Link to={`/view/${doc._id}`}>{renderName(doc.name)}</Link>
              </td>
              <td className="cell">
                {doc.isPublic ? <Earth size={15} /> : <Lock size={15} />}
              </td>
              <td className="cell">{(doc.size / 1024).toFixed(2)}</td>
              <td className="cell">{doc.type}</td>
              <td className="cell flex items-center gap-2">
                <PrivancyToogleButton doc={doc} />
                <CopyUrlButton id={doc._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Documents;
