import React, { useEffect, useState } from "react";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import SettingsPanel from "./shared/SettingsPanel";
import Footer from "./shared/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [isFullPageLayout, setIsFullPageLayout] = useState(false);
  const fullPageLayoutRoutes = ["login", "register-1", "lockscreen", "error-404", "error-500", "landing-page"];

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("cacheCode_UserData"));
    let currPath = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];

    // for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
    //   if (!userData && currPath === fullPageLayoutRoutes[i]) {
    //     setIsFullPageLayout(true);
    //     break;
    //   } else {
    //     setIsFullPageLayout(false);
    //     navigate("/login");
    //   }
    // }
  }, []);

  return (
    <div className="container-scroller">
      {/* {!isFullPageLayout && <Navbar />} */}
      <div className={isFullPageLayout ? "container-fluid full-page-wrapper page-body-wrapper" : "container-fluid page-body-wrapper"}>
        {/* {!isFullPageLayout && <Sidebar />} */}
        <div className="main-panel">
          <div className="content-wrapper">
            <AppRoutes />
            {/* {!isFullPageLayout && <SettingsPanel />} */}
          </div>
          {/* {!isFullPageLayout && <Footer />} */}
        </div>
      </div>
    </div>
  );
};

export default App;
