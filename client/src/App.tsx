import Router from "./routes";
import { Toaster } from "sonner";
const App = () => {
  return (
    <div>
      <Toaster richColors closeButton position="top-right" />
      <Router />
    </div>
  );
};

export default App;
