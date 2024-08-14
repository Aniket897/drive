import { Plus } from "lucide-react";
import React, { useState } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { uploadDocuments } from "../../store/slices/documentSlice";
import Loader from "../Loader";

const New = () => {
  const [loading, setLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const uplaodFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();
    Array.from(e.target.files).forEach((file) =>
      formData.append("documents", file)
    );
    setLoading(true);
    dispatch(uploadDocuments(formData)).finally(() => {
      setLoading(false);
    });
  };
  return (
    <div>
      <label
        htmlFor="file"
        className="flex items-center gap-2 shadow-lg border p-2 px-5 rounded-2xl bg-white border-gray-200 cursor-pointer"
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <Plus size={20} />
            <h1>Upload</h1>
          </>
        )}
      </label>
      <input
        onChange={uplaodFiles}
        id="file"
        type="file"
        hidden
        multiple
        disabled={loading}
        accept=".png, .pdf, .jpg, .jpeg"
      />
    </div>
  );
};

export default New;
