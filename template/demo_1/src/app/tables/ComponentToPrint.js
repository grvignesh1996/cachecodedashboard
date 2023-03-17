import React, { Fragment } from "react";
import "./ComponentToPrint.scss";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="print_cntr">
      <h4>CacheCode</h4>
      <h4>
        <b>Name: </b>
        {props.printData.customerName}
      </h4>
      <h4>
        <b>Mobile: </b>
        {props.printData.mobileNo}
      </h4>

      <h6>Tax Invoice/Bill of Supply</h6>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>MRP</th>
            <th>QTY</th>
            <th>Amt</th>
          </tr>
        </thead>
        <tbody>
          {props.printData.cafeOrderItemDetailEntityList.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.itemName}</td>
                <td>{item.totalAmount / item.quantity}</td>
                <td>{item.quantity}</td>
                <td>{item.totalAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      <h4>
        <b>Total: </b>
        {props.printData.total}
      </h4>
    </div>
  );
});
