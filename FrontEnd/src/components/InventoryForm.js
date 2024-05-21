import React from "react";
import { Form, Col, Row } from "react-bootstrap";
export const ItemForm = ({ item, handleItemFormChange }) => {
  return (
    <Form>
      <Form.Group as={Row} className="mb-3">
        <Col sm={2}>
          <Form.Label>Name</Form.Label>
        </Col>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="name"
            value={item.name}
            onChange={(e) => handleItemFormChange(e)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm={2}>
          <Form.Label sm={2}>Department</Form.Label>
        </Col>

        <Col sm={10}>
          <Form.Control
            type="text"
            name="department"
            value={item.department}
            onChange={(e) => handleItemFormChange(e)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm={2}>
          <Form.Label>Price</Form.Label>
        </Col>
        <Col sm={10}>
          <Form.Control
            type="number"
            name="price"
            value={item.price}
            onChange={(e) => handleItemFormChange(e)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm={2}>
          <Form.Label>Stock</Form.Label>
        </Col>
        <Col sm={10}>
          <Form.Control
            type="number"
            name="stock"
            value={item.stock}
            onChange={(e) => handleItemFormChange(e)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm={2}>
          <Form.Label>Description</Form.Label>
        </Col>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="description"
            value={item.description}
            onChange={(e) => handleItemFormChange(e)}
          />
        </Col>
      </Form.Group>
    </Form>
  );
};
