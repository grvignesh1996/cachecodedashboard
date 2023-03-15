import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

function BasicTable() {
  const [data, setData] = useState();
  const getAllData = () => {
    axios.get(`http://localhost:8080/bms/getAllBill`, {}).then((res) => {
      setData(res.data);
      console.log(res);
    });
  };

  const showItems = (index) => {
    let list = [...data];
    console.log("showItems" in list[index]);
    if ("showItems" in list[index]) {
      list[index].showItems = !list[index].showItems;
    } else {
      list[index].showItems = true;
    }
    setData(list);
  };
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> CUSTOMER INVOICES </h3>
      </div>

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">INVOICES</h4>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Mobile No</th>
                      <th>Bill Created</th>
                      <th>Total</th>
                      <th>Vehicle No</th>
                      <th>Next Service Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length &&
                      data?.map((res, index) => {
                        return (
                          <Fragment key={index + "_bills"}>
                            <tr>
                              <td>{res.mobileNo}</td>
                              <td>{res.createdTimeStamp}</td>
                              <td>{res.total}</td>
                              <td>{res.vehicleNo}</td>
                              <td>{res.nextDate}</td>

                              <td style={{ cursor: "pointer", fontSize: "18px" }} onClick={() => showItems(index)}>
                                {res.showItems ? <i class="icofont-line-block-up"></i> : <i class="icofont-line-block-down"></i>}{" "}
                              </td>
                            </tr>
                            {res.showItems && (
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
                                      {res?.itemsEntityList?.map((item) => {
                                        return (
                                          <tr>
                                            <td>{item.itemsNo}</td>
                                            <td>{item.itemName}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.eachItemAmount}</td>
                                            <td>{item.totalAmount}</td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicTable;
