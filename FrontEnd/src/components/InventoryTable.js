import React from "react";
import { Table } from "react-bootstrap";

export const InventoryTable = ({ inventory }) => {
  const inventoryRows = inventory.map((item) => {
    return (
      <tr key={item.name}>
        <td>{item.name}</td>
        <td>{item.department}</td>
        <td>{item.stock}</td>
        <td>{`$${item.price}`}</td>
        <td>{item.description}</td>
      </tr>
    );
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>{inventoryRows}</tbody>
    </Table>
  );
};
