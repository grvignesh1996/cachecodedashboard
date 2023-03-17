import React, { useRef } from "react";
import { ComponentToPrint } from "../tables/ComponentToPrint";
import "./Success.scss";
import { useReactToPrint } from "react-to-print";

export const Success = ({ printData, closeSuccess }) => {
  const componentRef = useRef();

  const printBill = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="success_parent_cntr">
      <div className="success_cntr">
        <div className="success_icon">
          <img src={require("../../assets/images/icons/check.png")} alt="check" />
        </div>

        <p>{printData.status}hello bill</p>

        <div className="btn-cntr">
          <button className="close-btn" onClick={closeSuccess}>
            Close
          </button>
          <button className="print-btn" onClick={printBill}>
            Print Bill
          </button>
        </div>
      </div>

      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} printData={printData} />
      </div>
    </div>
  );
};
