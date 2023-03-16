import React, { Fragment, useEffect, useState } from "react";
import { getAllItems } from "../services/apiServices";
import "./AddItem.scss";

const AddItem = ({ data, setData, LINE_ITEM, setItemExist }) => {
  const tableHeaders = ["Item", "Quantity", "Price", "Total", ""];
  const [allItems, setAllItems] = useState();

  const handleAdd = (e, index) => {
    e.preventDefault();

    let isEmpty = false;

    for (var key in data[index]) {
      if (data[index][key] === "") {
        isEmpty = true;
        break;
      }
    }

    console.log(data[index]);

    if (!isEmpty && data[index].itemName !== "default") {
      let temp = [...data];
      temp.push(LINE_ITEM);
      setData(temp);
      setItemExist(true);
    }
  };

  const handleData = (event, listItemIndex, keyIndex) => {
    event.preventDefault();

    let temp = [...data];

    if (keyIndex === "itemName" && event.target.value !== "default") {
      const itemSelected = allItems.filter((ele) => ele.id === +event.target.value);
      console.log(itemSelected[0]);

      temp[listItemIndex]["id"] = itemSelected[0].id;
      temp[listItemIndex][keyIndex] = itemSelected[0].itemName;
      temp[listItemIndex]["quantity"] = "";
      temp[listItemIndex]["amount"] = itemSelected[0].amount;
      temp[listItemIndex]["totalAmount"] = "";
      temp[listItemIndex]["gst"] = itemSelected[0].gst === null || itemSelected[0].gst === "" ? 0 : itemSelected[0].gst;
    } else if (event.target.value === "default") {
      temp[listItemIndex] = {
        id: "",
        itemName: event.target.value,
        quantity: "",
        amount: "",
        totalAmount: "",
        gst: "",
      };
    } else if (event.target.value !== "default") {
      temp[listItemIndex][keyIndex] = +event.target.value;
      // check if quantity and price are available
      temp.filter((item) => item.amount > 0 && item.quantity > 0).forEach((item) => (item.totalAmount = item.amount * item.quantity));
    }

    // update the state
    setData(() => temp);
    // navigate('/dashboard')
  };

  const getItemsList = async () => {
    try {
      const response = await getAllItems();
      console.log(response);
      setAllItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemsList();
  }, []);

  return (
    <Fragment>
      <h4 className="card-title">ITEM DETAILS</h4>
      <hr style={{ marginTop: "0" }} />

      <table className="addItem_table">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => {
              return <th key={header + index}>{header}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item + index}>
                {Object.keys(item).map((key, keyIndex) => {
                  return (
                    <>
                      {key !== "totalAmount" && key !== "itemName" && key !== "gst" && key !== "id" ? (
                        <td style={{ marginRight: "2rem !important" }} key={key + keyIndex}>
                          <input className="form-control" type={key === "itemName" ? "text" : "number"} value={item[key]} name={key} onChange={(e) => handleData(e, index, key)} />
                        </td>
                      ) : key === "itemName" ? (
                        <td style={{ marginRight: "2rem !important" }} key={key + keyIndex}>
                          <select className="form-control" onChange={(e) => handleData(e, index, key)}>
                            <option value="default">Select the Item</option>
                            {allItems &&
                              allItems.length > 0 &&
                              allItems.map((ele) => {
                                return <option value={ele.id}>{ele.itemName}</option>;
                              })}
                          </select>
                        </td>
                      ) : key !== "gst" && key !== "id" ? (
                        <td key={key + keyIndex}>
                          <p>{item[key]}</p>
                        </td>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}

                <td>
                  <button className="btn add-btn mr-2" onClick={(e) => handleAdd(e, index)}>
                    Add Item
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default AddItem;
