import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AddItem from "./AddItem";
import { CustomerDetails } from "./CustomerDetails";
import "./BasicElements.scss";
import { addItems } from "../services/apiServices";

const BasicElements = () => {
  const postBillBody = {
    // address: "bangalore",
    // createdTimeStamp: 12,
    email: "hello@123.com",
    cafeItemRequests: [],
    mobileNo: null,
    // billDate: null,
    total: 0,
    // vehicleNo: "tn23",
    customerName: "",
    shopNumber: 1,
  };
  const [postBill, setPostBill] = useState(postBillBody);
  const LINE_ITEM = {
    id: "",
    itemName: "",
    quantity: "",
    amount: "",
    totalAmount: "",
    gst: "",
  };
  const [data, setData] = useState([LINE_ITEM]);
  const [currPage, setCurrPage] = useState(1);
  const [itemExist, setItemExist] = useState(false);
  // const history = useHistory();

  const handleNav = () => {
    if (currPage === 1) {
      setCurrPage(2);
    } else {
      setCurrPage(1);
    }
  };

  const postCreateBill = async (e) => {
    e.preventDefault();
    let itemsList = [...postBill.cafeItemRequests];

    data.forEach((item, _) => {
      let isEmpty = false;
      for (var key in item) {
        if (item[key] === "") {
          isEmpty = true;
          break;
        }
      }

      if (!isEmpty) {
        itemsList.push(item);
      }
    });

    let totalAmount = 0;
    for (let i = 0; i < itemsList.length; i++) {
      console.log(itemsList[i]);
      totalAmount += +itemsList[i].totalAmount;
    }

    let cafeCartRequest = { ...postBill };
    cafeCartRequest.cafeItemRequests = itemsList;
    cafeCartRequest.total = totalAmount;

    setPostBill(cafeCartRequest);
    try {
      const response = await addItems(cafeCartRequest);
      // axios.post("http://localhost:8080/bms/createBill", cafeCartRequest);
      console.log(response);
      setData([LINE_ITEM]);
      // history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormData = (e) => {
    // let temp = {...postBill}
    // temp[e.target.name] = e.target.value
    if (e.target.name === "mobileNo") {
      if (e.target.value.length <= 10) setPostBill({ ...postBill, [e.target.name]: +e.target.value });
    } else if (e.target.name === "shopNumber") {
      setPostBill({ ...postBill, [e.target.name]: +e.target.value });
    } else {
      setPostBill({ ...postBill, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    // console.log(data);
  }, [data]);
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> CREATE INVOICE </h3>
      </div>

      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="forms-sample">
              {currPage === 1 ? (
                <CustomerDetails postBill={postBill} handleFormData={handleFormData} postBillBody={postBillBody} />
              ) : (
                <AddItem data={data} setData={setData} LINE_ITEM={LINE_ITEM} setItemExist={setItemExist} />
              )}
              <br></br>

              <button className="btn btn-nav mr-2" onClick={handleNav}>
                {currPage === 1 ? "Next" : "Previous"}
              </button>

              {currPage === 2 && (
                <button className="btn btn-submit mr-2" disabled={!itemExist} onClick={postCreateBill}>
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicElements;
