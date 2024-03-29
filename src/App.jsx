import { Toaster } from "react-hot-toast";
import Routes from "./routes/Routes";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 font-Rasa dark:bg-slate-900">
      <Routes />
      <Toaster />
    </div>
  );
}

export default App;
