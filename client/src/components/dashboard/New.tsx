import { Plus } from "lucide-react";

const New = () => {
  return (
    <div>
      <button className="flex items-center gap-2 shadow-lg border p-2 px-5 rounded-2xl bg-white border-gray-200">
        <Plus size={20} />
        <h1>Upload</h1>
      </button>
    </div>
  );
};

export default New;
