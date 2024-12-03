import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import "./assets/styles/emoji-picker-styles.scss";

function App() {
  return (
    <div className="w-screen h-screen bg-myBlack text-white">
      <BrowserRouter>
        <ToastContainer />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
