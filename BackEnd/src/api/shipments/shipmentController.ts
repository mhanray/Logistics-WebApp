import { dataAccess } from "../DataAccess";

export async function postShipment(shipment: ShipmentModel) {
    return await dataAccess.createShipment(shipment.name, shipment.destination, shipment.contents);
}

export async function getShipments() {
    return await dataAccess.getShipments();
}

export async function deleteShipment(name: string) {
    return await dataAccess.deleteShipment(name);
}

export interface ShipmentModel {
    name: string;
    destination: string;
    contents: {
        name: string;
        quantity: number
    }[]
}
