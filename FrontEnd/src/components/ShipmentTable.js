import React from "react";
import { Table } from "react-bootstrap";

export const ShipmentTable = ({ shipments }) => {
  const shipmentRows = shipments.map((shipment) => {
    let contentsString = shipment.contents.map((item) => {
      return ` ${item.quantity} ${item.name};`;
    });
    return (
      <tr key={shipment.name}>
        <td>{shipment.name}</td>
        <td>{shipment.destination}</td>
        <td>{`$${shipment.price}`}</td>
        <td>{contentsString.join("")}</td>
      </tr>
    );
  });
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Destination</th>
          <th>Total Price</th>
          <th>Contents</th>
        </tr>
      </thead>
      <tbody>{shipmentRows}</tbody>
    </Table>
  );
};
