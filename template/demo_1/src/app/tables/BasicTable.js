import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { getAllBillsByPage } from "../services/apiServices";
import { useNavigate } from "react-router-dom";
import "./Invoices.scss";
import { Warning } from "../shared/Warning";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";

const BasicTable = () => {
  const componentRef = useRef();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [pageNo, setPageNo] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState();
  // const getAllData = () => {
  //   axios.get(`http://localhost:8080/bms/getAllBill`, {}).then((res) => {
  //     setData(res.data);
  //     console.log(res);
  //   });
  // };

  // const showItems = (index) => {
  //   let list = [...data];

  //   if ("showItems" in list[index]) {
  //     list[index].showItems = !list[index].showItems;
  //   } else {
  //     list[index].showItems = true;
  //   }
  //   setData(list);
  // };

  const printBill = useReactToPrint({
    content: () => componentRef.current,
  });

  const navigateInvoice = (type) => {
    if (type === "next") {
      setPageNo(pageNo + 1);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const getAllInvoice = async () => {
    const params = {
      shopNumber: JSON.parse(localStorage.getItem("cacheCode_UserData")).id,
      pageNo: pageNo,
    };
    try {
      const response = await getAllBillsByPage(params);

      if (!response?.data?.cafeOrderResponses) {
        setPageNo(0);
        setShowWarning(true);
        setWarningMsg("No more invoices.");
      } else {
        setData(response?.data?.cafeOrderResponses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("cacheCode_UserData"));
    setUserData(user);

    if (user === null) {
      navigate("/login");
    } else {
      getAllInvoice();
    }
  }, [pageNo]);

  useEffect(() => {
    if (showWarning) {
      setTimeout(() => {
        setShowWarning(false);
        setWarningMsg();
      }, [3000]);
    }
  }, [showWarning]);
  return (
    <div style={{ marginTop: "12vh" }}>
      <div className="page-header">
        <h3 className="page-title"> CUSTOMER INVOICES </h3>
      </div>

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">INVOICES</h4>
              <div className="table-responsive invoice-tbl-cntr">
                <table className="table table-striped invoice-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Mobile No</th>
                      <th>Email-Id</th>
                      <th>Bill Date</th>
                      <th>Total Items</th>
                      <th>Total</th>
                      <th>Print</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 &&
                      data?.map((res, index) => {
                        return (
                          <Fragment key={index + "_invoices"}>
                            <div style={{ display: "none" }}>
                              <ComponentToPrint ref={componentRef} printData={res} />
                            </div>
                            <tr>
                              <td>{res.customerName}</td>
                              <td>{res.mobileNo}</td>
                              <td>{res.email}</td>
                              <td>{new Date(res.createdTimeStamp).getDate() + "/" + new Date(res.createdTimeStamp).getMonth() + "/" + new Date(res.createdTimeStamp).getFullYear()}</td>
                              <td>{res.cafeOrderItemDetailEntityList.length}</td>
                              <td>{res.total}</td>

                              {/* <td style={{ cursor: "pointer", fontSize: "18px" }} onClick={() => showItems(index)}>
                                {res.showItems ? <i class="icofont-line-block-up"></i> : <i class="icofont-line-block-down"></i>}{" "}
                              </td> */}
                              <td onClick={printBill} className="print-btn">
                                <button>Print</button>
                              </td>
                            </tr>
                            {/* {res.showItems && (
                              <tr>
                                <td colSpan={6}>
                                  <table style={{ width: "100%" }}>
                                    <thead>
                                      <tr>
                                        <th>S.No</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total Price</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {res?.cafeItemRequests?.map((item) => {
                                        return (
                                          <tr>
                                            <td>{item.itemsNo}</td>
                                            <td>{item.itemName}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.totalAmount}</td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            )} */}
                          </Fragment>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              <div className="invoices-nav">
                <button disabled={pageNo === 0} onClick={() => navigateInvoice("prev")}>
                  Previous
                </button>
                <button disabled={data?.length === 0 || data?.length === null} onClick={() => navigateInvoice("next")}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showWarning && <Warning message={warningMsg} />}
    </div>
  );
};

export default BasicTable;
