import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";

const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [showHeader, setShowHeader] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);

  // useEffect(() => {
  //   let userData = JSON.parse(localStorage.getItem("cacheCode_UserData"));

  //   if (!userData) {
  //     console.log("here");
  //     navigate("/login");
  //   }
  // }, [navigate]);
  let location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();

    setShowHeader(false);
    localStorage.removeItem("cacheCode_UserData");
    navigate("/login");
  };

  useEffect(() => {
    let route = location.pathname.split("/")[1];
    let route2 = location.pathname.split("/")[2];
    let user = JSON.parse(localStorage.getItem("cacheCode_UserData"));
    setUserData(user);
    if (user === null || route === "login") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location]);
  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row" style={{ display: showHeader ? "block" : "none !important" }}>
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo" to="/">
          <img src={require("../../assets/images/logo.svg")} alt="logo" />
        </Link>
        <Link className="navbar-brand brand-logo-mini" to="/">
          <img src={require("../../assets/images/logo-mini.svg")} alt="logo" />
        </Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={() => document.body.classList.toggle("sidebar-icon-only")}>
          <span className="mdi mdi-menu"></span>
        </button>

        <ul className="nav-menu">
          <li onClick={() => setOpenMenu(!openMenu)}>
            <Link to={"/create-invoice"}>Create Invoice</Link>
          </li>

          <li onClick={() => setOpenMenu(!openMenu)}>
            <Link to={"/invoices"}>Invoices</Link>
          </li>
        </ul>

        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile">
            <Dropdown>
              <Dropdown.Toggle className="nav-link">
                <div className="nav-profile-img">
                  <img src={require("../../assets/images/faces/user-dummy-pic.png")} alt="user" />
                  <span className="availability-status online"></span>
                </div>
                <div className="nav-profile-text">
                  <p className="mb-1 text-black">
                    <Trans>{userData?.ownerName}</Trans>
                  </p>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown">
                <Dropdown.Item href="!#" onClick={handleLogout}>
                  <i className="mdi mdi-logout mr-2 text-primary"></i>
                  <Trans>Signout</Trans>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
