import { Loader as LucideLoader } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <LucideLoader className="animate-spin" size={15} />
    </div>
  );
};

export default Loader;
