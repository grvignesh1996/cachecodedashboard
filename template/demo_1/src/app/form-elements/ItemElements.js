import React, { useState } from "react";
const ItemElements = ({ setShowAddItem }) => {
  const LINE_ITEM = {
    item: "",
    quantity: "",
    price: "",
    total: "",
  };
  const tableHeaders = ["Item", "Quantity", "Price", "Total"];

  const [data, setData] = useState([() => LINE_ITEM]);

  const handleAdd = (e) => {
    console.log('handleAdd')
    // setData((prevData) => {
    //   [...prevData, ...LINE_ITEM];
    // });
  };


  const handleData = (event, listItemIndex, keyIndex ) => {
    let temp = {...data}
    temp[listItemIndex][keyIndex] = event.target.value
    // update the state
    setData(() => temp)
  };
  return (
    <div>
      <h3>Add Item</h3>
      <button
        onClick={handleAdd}
      >
        x
      </button>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr>
                {Object.keys(item).map((key, keyIndex) => {
                  return <td key={keyIndex}>
                    <input
                        type={key === 'item' ? 'text' : 'number'}
                        value = {item[key]}
                        name = {key}
                        onChange = {(e) => handleData(e, index , key)}
                    />
                  </td>;
                })}
                <td></td>
              </tr>
            );
          })}

          <tr>
            <td>
              <button onClick={handleAdd}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ItemElements;
