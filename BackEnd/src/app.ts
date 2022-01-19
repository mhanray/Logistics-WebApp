import express from "express"
import { inventoryRouter } from "./api/inventory/inventoryRouter";
import { shipmentRouter } from "./api/shipments/shipmentRouter";
import cors from "cors"
const port = 8080;
export const app = express();

app.use(express.json());
app.use(cors())

app.listen(port, () => {
    console.log(`listening on PORT ${port}`)
})

app.use("/inventory", inventoryRouter);
app.use("/shipments", shipmentRouter)

app.get("/", (req, res) => res.status(200).send("hello world!"));