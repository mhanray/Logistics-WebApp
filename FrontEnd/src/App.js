import React, { useState, useEffect } from "react";
import './App.css';
import { Row, Container, Button, Table, Form, ButtonGroup, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [inventory, setInventory] = useState([])
  const [item, setItem] = useState({
    name: "",
    department: "",
    price: "",
    stock: "",
    description: ""
  });
  const [shipments, setShipments] = useState([])
  const [shipmentContents, setShipmentContents] = useState([{ name: "", quantity: "" }])
  const [shipmentName, setShipmentName] = useState("")
  const [shipmentDestination, setShipmentDestination] = useState("")

  useEffect(() => {
    async function fetchData() {
      await getInventory();
      await getShipments();
    }
    fetchData();
  }, []);

  const resetItem = () => {
    setItem({
      name: "",
      department: "",
      price: "",
      stock: "",
      description: ""
    });
  }

  const resetShipment = () => {
    setShipmentName("")
    setShipmentDestination("")
    setShipmentContents([{ name: "", quantity: "" }])
  }

  const addItem = async () => {
    if (item.name === "") {
      alert("Item name cannot be empty.")
      return;
    }
    fetch("http://localhost:8080/inventory", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => {
        if (!response.ok) {
          response.text().then(text => {
            alert(`Error adding item to inventory.\n${text}`)
          });
        }
        return response.text()
      })
      .then((responseJson) => {
        console.log(responseJson);
        getInventory();
        resetItem();
      });
  };

  const getInventory = async () => {
    fetch("http://localhost:8080/inventory")
      .then((response) => {
        if (!response.ok) {
          response.text().then(text => {
            alert(`Error getting inventory.\n${text}`)
            return;
          })
        }
        return response.json()
      })
      .then((responseJson) => setInventory(responseJson));
  };

  const updateItem = async () => {
    if (item.name === "") {
      alert("Item name cannot be empty.");
      return;
    }

    const updatedItem = {
      name: item.name,
      fields: Object.assign({}, {
        department: item.department === "" ? null : item.department,
        price: item.price === "" ? null : Number(item.price),
        stock: item.stock === "" ? null : Number(item.stock),
        description: item.description === "" ? null : item.description
      })
    }
    for (var field in updatedItem.fields) {
      if (updatedItem.fields[field] === null) {
        delete updatedItem.fields[field]
      }
    }


    fetch("http://localhost:8080/inventory", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })
      .then((response) => {
        if (!response.ok) {
          response.text().then(text => {
            alert(`Error updating item in inventory.\n${text}`)
            return;
          });
        }
        return response.json()
      })
      .then((responseJson) => {
        console.log(responseJson);
        getInventory();
        resetItem();
      });
  }

  const deleteItem = async () => {
    if (item.name === "") {
      alert("Item name cannot be empty.")
      return;
    }

    fetch(`http://localhost:8080/inventory/?name=${item.name}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          response.text().then(text => {
            alert(`Error deleting item in inventory.\n${text}`)
          });
        }
        return response.json()
      })
      .then((responseJson) => {
        console.log(responseJson);
        getInventory();
        resetItem();
      });
  }

  const createShipment = () => {
    const updatedContents = shipmentContents.map((item) => {
      return {
        name: item.name,
        quantity: Number(item.quantity)
      }
    });

    const shipment = {
      name: shipmentName,
      destination: shipmentDestination,
      contents: updatedContents
    };

    fetch("http://localhost:8080/shipments", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shipment)
    })
      .then((response) => {
        if (!response.ok) {
          response.text().then(text => {
            alert(`Error creating shipment.\n${text}`)
            return;
          });
        }
        return response.json()
      })
      .then((responseJson) => {
        console.log(responseJson);
        getShipments();
        resetShipment();
        getInventory();
      })
  };

  const getShipments = async () => {
    fetch("http://localhost:8080/shipments")
      .then((response) => {
        if (!response.ok) {
          response.text().then(text => {
            alert(`Error getting shipments.\n${text}`)
            return;
          })
        }
        return response.json()
      })
      .then((responseJson) => setShipments(responseJson));
  }

  const handleItemFormChange = (e) => {
    const { name, value } = e.target;
    // if (name === 'price' && !/^[0-9]+(\.[0-9]+)?$/.test(value) && value !== '.') {
    //   values[name] = +value;
    //   setProduct(values);
    // }
    setItem({ ...item, [name]: value });
  };

  const handleShipmentFormChange = (e, i) => {
    const { name, value } = e.target;
    const currentContents = [...shipmentContents];
    currentContents[i][name] = value;
    setShipmentContents(currentContents);
  };

  const addItemtoShipmentForm = () => {
    setShipmentContents([...shipmentContents, { name: "", quantity: 0 }]);
  };

  const removeItemfromShipmentForm = (i) => {
    let shipment = [...shipmentContents];
    shipment.splice(i, 1);
    setShipmentContents(shipment);
  };

  const inventoryRows = inventory.map((item) => {
    return (
      <tr key={item.name}>
        <td>{item.name}</td>
        <td>{item.department}</td>
        <td>{item.stock}</td>
        <td>{item.price}</td>
        <td>{item.description}</td>
      </tr>
    )
  });

  const shipmentRows = shipments.map((shipment) => {
    let contentsString = shipment.contents.map((item) => {
      return ` ${item.quantity} ${item.name};`
    })
    return (
      <tr key={shipment.name}>
        <td>{shipment.name}</td>
        <td>{shipment.destination}</td>
        <td>{shipment.price}</td>
        <td>{contentsString.join('')}</td>
      </tr>
    )
  });

  const shipmentContentsForm = shipmentContents.map((item, i) => {
    return (
      <Form.Group as={Row} key={i} className="mb-3">
        <Col sm={2}>
          <Form.Label>Item Name</Form.Label >
        </Col>
        <Col >
          <Form.Control
            name="name"
            value={item.name}
            onChange={e => handleShipmentFormChange(e, i)}
          />
        </Col>
        <Col sm={2}>
          <Form.Label>Quantity</Form.Label >
        </Col>
        <Col  >
          <Form.Control
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={e => handleShipmentFormChange(e, i)}
          />
        </Col>

        {
          i ?
            <Col sm={1}>
              <Button className="mb-3" onClick={() => removeItemfromShipmentForm(i)}>Remove</Button>
            </Col>
            : null
        }

      </Form.Group>

    )
  });

  return (
    <div className="App">
      <h1> Logical Logistics </h1>
      <h2> Manage Inventory</h2>
      <Button variant="outline-primary" onClick={getInventory} className="mb-3">
        Update Inventory
      </Button>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {inventoryRows}
        </tbody>
      </Table>
      <h3>Modify Items</h3>
      <Container as={Col} md={6} className="justify-content-md-center">
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Col sm={2}>
              <Form.Label >Name</Form.Label>
            </Col>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="name"
                value={item.name}
                onChange={e => handleItemFormChange(e)}
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
                onChange={e => handleItemFormChange(e)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={2}>
              <Form.Label >Price</Form.Label>
            </Col>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="price"
                value={item.price}
                onChange={e => handleItemFormChange(e)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={2}>
              <Form.Label >Stock</Form.Label>
            </Col>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="stock"
                value={item.stock}
                onChange={e => handleItemFormChange(e)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={2}>
              <Form.Label >Description</Form.Label>
            </Col>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="description"
                value={item.description}
                onChange={e => handleItemFormChange(e)}
              />
            </Col>
          </Form.Group>
        </Form>
      </Container>
      <ButtonGroup className="mb-3">
        <Button variant="outline-success" onClick={addItem}> Add Item</Button>
        <Button variant="outline-primary" onClick={updateItem}> Update Item </Button>
        <Button variant="outline-danger" onClick={deleteItem}> Delete Item </Button>
      </ButtonGroup>

      <h2>Manage Shipments</h2>
      <Button variant="outline-primary" onClick={getShipments} className="mb-3">
        Update Shipments
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Destination</th>
            <th>Total Price</th>
            <th>Contents</th>
          </tr>
        </thead>
        <tbody>
          {shipmentRows}
        </tbody>
      </Table>
      <h3>Modify Shipments</h3>
      <Container as={Col} md={8} className="justify-content-md-center">
        <Form >
          <Row className="mb-3">
            <Form.Group as={Col} sm={6} className="mb-3">
              <Form.Label>Shipment Name</Form.Label>
              <Form.Control
                type="text"
                value={shipmentName}
                onChange={e => setShipmentName(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} sm={6} className="mb-3">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                value={shipmentDestination}
                onChange={e => setShipmentDestination(e.target.value)}
              />
            </Form.Group>
          </Row>
          {shipmentContentsForm}
        </Form>

      </Container>
      <ButtonGroup >
        <Button variant="outline-primary" onClick={() => addItemtoShipmentForm()}>Add Item</Button>
        <Button variant="outline-success" onClick={() => createShipment()}>Create Shipment</Button>
      </ButtonGroup>
    </div>
  )
};
