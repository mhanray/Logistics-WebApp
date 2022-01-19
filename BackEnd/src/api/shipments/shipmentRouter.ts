import express from "express";
import { ShipmentModel, getShipments, postShipment, deleteShipment } from "./shipmentController";
export const shipmentRouter = express.Router();

// POST new shipment
shipmentRouter.post("/", async (req, res) => {
    try {
        const shipment: ShipmentModel = req.body
        const ret = await postShipment(shipment)
        res.status(200).json(ret);
    } catch (error) {
        res.status(500).send(`Error processing request: ${error}`)
    }
});

// GET all shipments
shipmentRouter.get("/", async (req, res) => {
    try {
        const ret = await getShipments();
        res.status(200).json(ret);
    } catch (error) {
        res.status(500).send(`Error processing request: ${error}`)
    }
});

// Delete a shipment
shipmentRouter.delete("/", async (req, res) => {
    try {
        var name = req.query.name as string;
        const ret = await deleteShipment(name);
        res.status(200).json(ret);
    } catch (error) {
        res.status(500).send(`Error processing request: ${error}`)
    }
});



