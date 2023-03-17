import React from "react";
import "./Warning.scss";

export const Warning = ({ message }) => {
  return (
    <div className="warning_parent_cntr">
      <div className="warning_cntr">
        <div className="warning_icon">
          <img src={require("../../assets/images/icons/warning.png")} alt="check" />
        </div>

        <p>{message}</p>
      </div>
    </div>
  );
};
