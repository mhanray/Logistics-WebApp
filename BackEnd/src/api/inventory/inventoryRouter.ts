import express from "express";
import { getInventory, addItem, deleteItem, updateItem, ItemModel, UpdateItemModel } from "./inventoryController";
export const inventoryRouter = express.Router();

// POST new item to inventory
inventoryRouter.post("/", async (req,res) => {
    try {
        const itemInfo: ItemModel = req.body;
        const ret = await addItem(itemInfo);
        res.status(200).json(ret);
    } catch (error) {
        res.status(500).send(`Error processing request: ${error}`);
    }
});

// GET all items in inventory
inventoryRouter.get("/", async (req,res) => {
    try {
        const inventoryData = await getInventory()
        res.status(200).json(inventoryData);
    } catch (error) {
        res.status(500).send(`Error processing request: ${error}`)
    }
});

// PATCH provided fields for item
inventoryRouter.patch("/", async (req,res) => {
    try {
        const itemInfo: UpdateItemModel = req.body;
        const ret = await updateItem(itemInfo);
        res.status(200).json(ret)
    } catch (error) {
        res.status(500).send(`Error processing request: ${error}`)
    }
});

// DELETE item
inventoryRouter.delete("/", async (req, res) => {
    try {
        let name = req.query.name as string;
        const ret = await deleteItem(name);
        res.status(200).json(ret);
    } catch (error) {
        res.status(500).send(`Error processing request: ${error}`)
    }
});


