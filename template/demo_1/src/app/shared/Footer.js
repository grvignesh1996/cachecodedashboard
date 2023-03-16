import React, { Component } from "react";
import CacheCodeLogo from "../../assets/images/CacheCode_Logo.png";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between align-items-center py-2">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
            Copyright ©{" "}
            <a href="https://www.cachecode.in/" target="_blank" rel="noopener noreferrer">
              cachecode.in{" "}
            </a>
            2023
          </span>
          <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
            <img src={CacheCodeLogo} alt="cachecode logo" />
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
