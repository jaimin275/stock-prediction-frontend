import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import SideNavBar from "./components/SideNavBar";
import Router from "./Router"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <div className="root-body">
          <div className="relative min-h-screen sm:flex text-lg">
            <SideNavBar />
            <div className="conten flex-1">
              <Router />
            </div>
          </div>
          <ToastContainer />
        </div>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
