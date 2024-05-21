import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

export const ShipmentForm = ({
  shipmentName,
  shipmentDestination,
  shipmentContents,
  setShipmentName,
  setShipmentDestination,
  handleShipmentFormChange,
  removeItemFromShipmentForm,
}) => {
  const shipmentContentsForm = shipmentContents.map((item, i) => {
    return (
      <Form.Group as={Row} key={i} className="mb-3">
        <Col sm={2}>
          <Form.Label>Item Name</Form.Label>
        </Col>
        <Col>
          <Form.Control
            name="name"
            value={item.name}
            onChange={(e) => handleShipmentFormChange(e, i)}
          />
        </Col>
        <Col sm={2}>
          <Form.Label>Quantity</Form.Label>
        </Col>
        <Col>
          <Form.Control
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={(e) => handleShipmentFormChange(e, i)}
          />
        </Col>

        <Col sm={1}>
          <Button
            className="mb-3"
            variant="outline-danger"
            onClick={() => removeItemFromShipmentForm(i)}
          >
            Remove
          </Button>
        </Col>
      </Form.Group>
    );
  });

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} sm={6} className="mb-3">
          <Form.Label>Shipment Name</Form.Label>
          <Form.Control
            type="text"
            value={shipmentName}
            onChange={(e) => setShipmentName(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} sm={6} className="mb-3">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            type="text"
            value={shipmentDestination}
            onChange={(e) => setShipmentDestination(e.target.value)}
          />
        </Form.Group>
      </Row>
      {shipmentContentsForm}
    </Form>
  );
};
