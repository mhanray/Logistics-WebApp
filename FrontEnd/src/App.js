import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Button, ButtonGroup, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { InventoryTable } from "./components/InventoryTable";
import { ItemForm } from "./components/InventoryForm";
import { ShipmentTable } from "./components/ShipmentTable";
import { ShipmentForm } from "./components/ShipmentForm";
import { api } from "./services/api";

export default function App() {
  const [inventory, setInventory] = useState([]);
  const [item, setItem] = useState({
    name: "",
    department: "",
    price: "",
    stock: "",
    description: "",
  });
  const [shipments, setShipments] = useState([]);
  const [shipmentContents, setShipmentContents] = useState([
    { name: "", quantity: "" },
  ]);
  const [shipmentName, setShipmentName] = useState("");
  const [shipmentDestination, setShipmentDestination] = useState("");

  useEffect(() => {
    async function fetchData() {
      await Promise.all([getInventory(), getShipments()]);
    }
    fetchData();
  }, []);

  function resetItem() {
    setItem({
      name: "",
      department: "",
      price: "",
      stock: "",
      description: "",
    });
  }

  function resetShipment() {
    setShipmentName("");
    setShipmentDestination("");
    setShipmentContents([{ name: "", quantity: "" }]);
  }

  const addItem = async () => {
    if (item.name === "") {
      alert("Item name cannot be empty.");
      return;
    }
    try {
      const responseJson = await api.addItem(item);

      console.log(responseJson);
      getInventory();
      resetItem();
    } catch (error) {
      console.log(error);
    }
  };

  const getInventory = async () => {
    const responseJson = await api.getInventory();
    setInventory(responseJson);
  };

  const updateItem = async () => {
    if (item.name === "") {
      alert("Item name cannot be empty.");
      return;
    }

    const updatedItem = {
      name: item.name,
      fields: Object.assign(
        {},
        {
          department: item.department === "" ? null : item.department,
          price: item.price === "" ? null : Number(item.price),
          stock: item.stock === "" ? null : Number(item.stock),
          description: item.description === "" ? null : item.description,
        }
      ),
    };
    for (var field in updatedItem.fields) {
      if (updatedItem.fields[field] === null) {
        delete updatedItem.fields[field];
      }
    }
    try {
      const responseJson = await api.updateItem(updatedItem);

      console.log(responseJson);
      getInventory();
      resetItem();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async () => {
    if (item.name === "") {
      alert("Item name cannot be empty.");
      return;
    }
    try {
      const responseJson = await api.deleteItem(item.name);

      console.log(responseJson);
      getInventory();
      resetItem();
    } catch (error) {
      console.log(error);
    }
  };

  const createShipment = async () => {
    try {
      const updatedContents = [];

      shipmentContents.forEach((shipmentItem) => {
        const updatedItem = {
          name: shipmentItem.name,
          quantity: Number(shipmentItem.quantity),
        };

        if (updatedItem.quantity < 1) {
          alert("Shipment contents have to be more than zero.");
          throw new Error("Shipment contents have to be more than zero.");
        }
        updatedContents.push();
      });

      const shipment = {
        name: shipmentName,
        destination: shipmentDestination,
        contents: updatedContents,
      };

      const responseJson = await api.createShipment(shipment);

      console.log(responseJson);
      getShipments();
      resetShipment();
      getInventory();
    } catch (error) {
      console.log(error);
    }
  };

  const getShipments = async () => {
    const responseJson = await api.getShipments();
    setShipments(responseJson);
  };

  const handleItemFormChange = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value });
  };

  const handleShipmentFormChange = (e, i) => {
    const { name, value } = e.target;
    const currentContents = [...shipmentContents];
    currentContents[i][name] = value;
    setShipmentContents(currentContents);
  };

  function addItemtoShipmentForm() {
    setShipmentContents([...shipmentContents, { name: "", quantity: 0 }]);
  }

  const removeItemFromShipmentForm = (i) => {
    let shipment = [...shipmentContents];
    if (shipment.length <= 1) {
      alert("Can't remove the last item in a shipment.");
      return;
    }
    shipment.splice(i, 1);
    setShipmentContents(shipment);
  };

  return (
    <Container className="App">
      <h1> Logical Logistics </h1>
      <h2> Manage Inventory</h2>
      <Button variant="outline-primary" onClick={getInventory} className="mb-3">
        Update Inventory
      </Button>
      <InventoryTable inventory={inventory} />

      <h3>Modify Items</h3>
      <Container as={Col} md={6} className="justify-content-md-center">
        <ItemForm item={item} handleItemFormChange={handleItemFormChange} />
      </Container>
      <ButtonGroup className="mb-3">
        <Button variant="outline-success" onClick={addItem}>
          {" "}
          Add Item
        </Button>
        <Button variant="outline-primary" onClick={updateItem}>
          {" "}
          Update Item{" "}
        </Button>
        <Button variant="outline-danger" onClick={deleteItem}>
          {" "}
          Delete Item{" "}
        </Button>
      </ButtonGroup>

      <h2>Manage Shipments</h2>
      <Button variant="outline-primary" onClick={getShipments} className="mb-3">
        Update Shipments
      </Button>

      <ShipmentTable shipments={shipments} />

      <h3>Modify Shipments</h3>
      <Container as={Col} md={8} className="justify-content-md-center">
        <ShipmentForm
          shipmentName={shipmentName}
          shipmentDestination={shipmentDestination}
          shipmentContents={shipmentContents}
          setShipmentName={setShipmentName}
          setShipmentDestination={setShipmentDestination}
          handleShipmentFormChange={handleShipmentFormChange}
          removeItemFromShipmentForm={removeItemFromShipmentForm}
        />
      </Container>
      <ButtonGroup>
        <Button
          variant="outline-primary"
          onClick={() => addItemtoShipmentForm()}
        >
          Add Item
        </Button>
        <Button variant="outline-success" onClick={() => createShipment()}>
          Create Shipment
        </Button>
      </ButtonGroup>
    </Container>
  );
}
