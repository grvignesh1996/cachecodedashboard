import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { useHistory } from "react-router-dom";


const BasicElements = () => {
  const postBillBody = {
    address: "bangalore",
    createdTimeStamp: 12,
    email: "hello@123.com",
    itemsEntityList: [
    ],
    mobileNo: 799,
    nextDate: 9847,
    total: 20,
    vehicleNo: "tn23",
    name: 'viggi boy'
  }

  const [startDate, setStartDate] = useState(new Date());
  const [postBill, setPostBill] = useState(postBillBody)
  const LINE_ITEM = {
    itemName: "",
    quantity: "",
    eachItemAmount: "",
    totalAmount: "",
  };
  const tableHeaders = ["Item", "Quantity", "Price", "Total"];
  const [data, setData] = useState([LINE_ITEM]);
  const handleAdd = (e) => {
    e.preventDefault();
    let temp = [...data];
    temp.push(LINE_ITEM);
    setData(temp);
  };

  const history = useHistory()


  

  const handleData = (event, listItemIndex, keyIndex) => {
    let temp = [...data];
    temp[listItemIndex][keyIndex] = event.target.value;
    // check if quantity and price are available
   temp.filter(item => item.eachItemAmount > 0 && item.quantity > 0).forEach((item) => item.totalAmount = item.eachItemAmount * item.quantity)
    // 
    // update the state
    setData(() => temp);
    // navigate('/dashboard')
  };
  
  
  const postCreateBill = (e)=>{
    e.preventDefault()
    let itemsList = [...postBill.itemsEntityList]
    data.forEach((item, _) => {
      itemsList.push(item)
    })
    let temp =  {...postBill}
    temp.itemsEntityList = itemsList
    console.log(temp)
    setPostBill(temp)
    axios.post("http://localhost:8080/bms/createBill", temp)
    setData([LINE_ITEM])
    history.push('/')
  }

  const handleFormData = (e) => { 
    // let temp = {...postBill}
    // temp[e.target.name] = e.target.value
    setPostBill({...postBill, [e.target.name] : e.target.value})
  }


  const handleChange = (date) => {
    let momentDate = new Date(date)
    let day, month, year;
    day = momentDate.getDate()
    month = momentDate.getMonth() + 1
    year = momentDate.getFullYear()
    momentDate = day + '/' + month + '/' + year;
    console.log(momentDate)
    let epoch = moment(momentDate, "DD/MM/YYYY").valueOf()
    console.log(epoch)
    // console.log(date)
    setStartDate(date);
    postBillBody.nextDate = epoch;
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Create Invoice </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Forms
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Form elements
            </li>
          </ol>
        </nav>
      </div>
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Create Bill</h4>
            <p className="card-description"> Basic form elements </p>
            <form className="forms-sample">
              <Form.Group>
                <label htmlFor="exampleInputName1">Customer Name</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="name"
                  name='name'
                  value={postBill.name}
                  onChange = {handleFormData}
                />
              </Form.Group>
              <Form.Group>
                <label htmlFor="exampleInputEmail3">Email address</label>
                <Form.Control
                  type="email"
                  className="form-control"
                  id="exampleInputEmail3"
                  placeholder="Email"
                  value={postBill.email}
                  name='email'
                  onChange = {handleFormData}
                />
              </Form.Group>
              <Form.Group>
                <label htmlFor="exampleInputEmail3">Address</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="exampleInputEmail3"
                  placeholder="Address"
                  name='address'
                  value={postBill.address}
                  onChange = {handleFormData}
                />
              </Form.Group>
              <Form.Group>
                <label htmlFor="exampleInputEmail3">vehicleNo</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="exampleInputEmail3"
                  placeholder="vehicleNo"
                  name='vehicleNo'
                  value={postBill.vehicleNo}
                  onChange = {handleFormData}
                />
              </Form.Group>
              <Form.Group>
                <label htmlFor="exampleInputPassword4">Mobile No</label>
                <Form.Control
                  type="number"
                  className="form-control"
                  id="exampleInputPassword4"
                  placeholder="number"
                  value={postBill.mobileNo}
                  name = 'mobileNo'
                  onChange = {handleFormData}
                />
              </Form.Group>
              <Form.Group>
                <label htmlFor="exampleInputPassword4">Next Service Date</label>
                <div></div>
                <DatePicker
                  className="form-control w-100"
                  selected={startDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <br></br>
              <div>
                <button className="btn btn-gradient-primary mr-2" onClick={handleAdd}>Add Item</button>
              </div>
              <table>
                <thead>
                  <tr>
                    {tableHeaders.map((header, index) => {
                      return <th  key={index}>{header}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr>
                        {Object.keys(item).map((key, keyIndex) => {
                          return (
                            <>
                            {key !== 'totalAmount' ? (
                            <td style={{marginRight:"2rem !important"}} key={keyIndex}>
                              <input
                              className="form-control"
                                type={key === "itemName" ? "text" : "number"}
                                value={item[key]}
                                name={key}
                              
                                onChange={(e) => handleData(e, index, key)}
                              />
                            </td>
                            ) : (
                              <td>
                                <p>{item[key]}</p>
                              </td>
                            )}
                            </>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <br></br>
              <button  className="btn btn-gradient-primary mr-2" onClick={postCreateBill}>
                Submit
              </button>
              <button className="btn btn-light">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default BasicElements;
