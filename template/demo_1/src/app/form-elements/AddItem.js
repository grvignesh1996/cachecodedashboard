import React, { Fragment } from "react";
import "./AddItem.scss";

const AddItem = ({ data, setData, LINE_ITEM, setItemExist }) => {
  const tableHeaders = ["Item", "Quantity", "Price", "Total", ""];

  const handleAdd = (e, index) => {
    e.preventDefault();

    let isEmpty = false;

    for (var key in data[index]) {
      if (data[index][key] === "") {
        isEmpty = true;
        break;
      }
    }

    if (!isEmpty) {
      let temp = [...data];
      temp.push(LINE_ITEM);
      setData(temp);
      setItemExist(true);
    }
  };

  const handleData = (event, listItemIndex, keyIndex) => {
    let temp = [...data];
    temp[listItemIndex][keyIndex] = event.target.value;
    // check if quantity and price are available
    temp.filter((item) => item.eachItemAmount > 0 && item.quantity > 0).forEach((item) => (item.totalAmount = item.eachItemAmount * item.quantity));
    //
    // update the state
    setData(() => temp);
    // navigate('/dashboard')
  };

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
                      {key !== "totalAmount" ? (
                        <td style={{ marginRight: "2rem !important" }} key={key + keyIndex}>
                          <input className="form-control" type={key === "itemName" ? "text" : "number"} value={item[key]} name={key} onChange={(e) => handleData(e, index, key)} />
                        </td>
                      ) : (
                        <td key={key + keyIndex}>
                          <p>{item[key]}</p>
                        </td>
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
