import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from "moment";

export const CustomerDetails = ({ postBill, handleFormData, postBillBody }) => {
  // const [startDate, setStartDate] = useState(new Date());

  // const handleChange = (date) => {
  //   let momentDate = new Date(date);
  //   let day, month, year;
  //   day = momentDate.getDate();
  //   month = momentDate.getMonth() + 1;
  //   year = momentDate.getFullYear();
  //   momentDate = day + "/" + month + "/" + year;
  //   let epoch = moment(momentDate, "DD/MM/YYYY").valueOf();
  //   setStartDate(date);
  //   postBillBody.billDate = epoch;
  // };
  return (
    <Fragment>
      <h4 className="card-title">CUSTOMER DETAILS</h4>
      <hr style={{ marginTop: "0" }} />

      <Form.Group>
        <label htmlFor="exampleInputName1">Customer Name</label>
        <Form.Control type="text" className="form-control" id="exampleInputName1" placeholder="Customer Name" name="customerName" value={postBill.customerName} onChange={handleFormData} />
      </Form.Group>
      <br />
      <Form.Group>
        <label htmlFor="exampleInputEmail3">Email address</label>
        <Form.Control type="email" className="form-control" id="exampleInputEmail3" placeholder="Email" value={postBill.email} name="email" onChange={handleFormData} />
      </Form.Group>
      <br />
      {/* <Form.Group>
        <label htmlFor="exampleInputEmail3">Address</label>
        <Form.Control type="text" className="form-control" id="exampleInputEmail3" placeholder="Address" name="address" value={postBill.address} onChange={handleFormData} />
      </Form.Group> */}
      {/* <Form.Group>
        <label htmlFor="exampleInputEmail3">vehicleNo</label>
        <Form.Control type="text" className="form-control" id="exampleInputEmail3" placeholder="vehicleNo" name="vehicleNo" value={postBill.vehicleNo} onChange={handleFormData} />
      </Form.Group> */}
      <Form.Group>
        <label htmlFor="exampleInputPassword4">Mobile No</label>
        <Form.Control type="number" className="form-control" id="exampleInputPassword4" placeholder="number" value={postBill.mobileNo} name="mobileNo" onChange={handleFormData} />
      </Form.Group>
      {/* <Form.Group>
        <label htmlFor="exampleInputName1">Shop No</label>
        <Form.Control type="number" className="form-control" id="exampleInputName1" placeholder="Shop No" name="shopNumber" value={postBill.shopNumber} onChange={handleFormData} />
      </Form.Group> */}
      {/* <Form.Group>
        <label htmlFor="exampleInputPassword4">Date</label>
        <div></div>
        <DatePicker className="form-control w-100" selected={startDate} onChange={handleChange} dateFormat="dd/MM/yyyy" />
      </Form.Group> */}
    </Fragment>
  );
};
