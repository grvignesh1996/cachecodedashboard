import React, { Component } from "react";

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
            <img src="https://cachecodeimage.s3.ap-south-1.amazonaws.com/Image+1.png" alt="cachecode logo" />
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
