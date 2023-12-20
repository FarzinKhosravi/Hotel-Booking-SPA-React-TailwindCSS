import { Toaster } from "react-hot-toast";
import Routes from "./routes/Routes";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 font-Rasa">
      <Routes />
      <Toaster />
    </div>
  );
}

export default App;
