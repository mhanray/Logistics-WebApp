import { arrayUnion, collection, CollectionReference, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDoc, getDocs, increment, runTransaction, setDoc, updateDoc } from "firebase/firestore";
import { database } from "../firebase/firestore";
import { ItemModel } from "./inventory/inventoryController";


const INVENTORY_COLLECTION = "inventory"
const SHIPMENTS_COLLECTION = "shipments"

class DataAccess {
    database: Firestore;
    inventory: CollectionReference;
    shipments: CollectionReference;

    constructor(
        database: Firestore,
        rootInventoryName: string,
        rootShipmentName: string
    ) {
        this.database = database;
        this.inventory = collection(database, rootInventoryName);
        this.shipments = collection(database, rootShipmentName)
    }

    async verifyExists(documentRef: DocumentReference): Promise<boolean> {
        const document = await getDoc(documentRef);
        return document.exists();
    }

    async postItem(item: ItemModel): Promise<DocumentData> {
        const itemRef = await doc(this.inventory, item.name);
        const itemExists = await this.verifyExists(itemRef);
        if (!itemExists) {
            await setDoc(itemRef, {
                department: item.department,
                price: item.price,
                stock: item.stock,
                description: item.description
            });
            return await (await getDoc(itemRef)).data;
        } else {
            throw new Error(`${item.name} already exists in the inventory.`)
        }
    }

    async getInventory(): Promise<DocumentData[]> {
        const inventoryDocs = await getDocs(this.inventory);
        return inventoryDocs.docs.map(item => Object.assign({ name: item.id }, item.data()));
    }

    async patchItem(name: string, item): Promise<DocumentData> {
        const itemRef = await doc(this.inventory, name);
        const itemExists = await this.verifyExists(itemRef);
        if (itemExists) {
            await updateDoc(itemRef, item)
            const updatedItem = await getDoc(itemRef);
            return updatedItem.data();
        } else {
            throw new Error(`${name} does not exist in the inventory.`)
        }
    }

    async deleteItem(name: string): Promise<DocumentData> {
        const itemRef = await doc(this.inventory, name);
        const itemExists = await this.verifyExists(itemRef);
        if (itemExists) {
            const item = await getDoc(itemRef);
            await deleteDoc(itemRef)
            return item.data();
        } else {
            throw new Error(`${name} does not exist in your inventory.`)
        }
    }

    async createShipment(shipmentName: string, shipmentDestination: string, contents: { name: string, quantity: number }[]): Promise<DocumentData> {
        const shipmentRef = await doc(this.shipments, shipmentName);
        const shipmentExists = await this.verifyExists(shipmentRef);
        if (!shipmentExists) {
            await runTransaction(database, async (transaction) => {
                transaction.set(shipmentRef, {
                    name: shipmentName,
                    destination: shipmentDestination,
                    contents: []
                });

                let totalPrice = 0;

                for (const item of contents) {
                    const itemRef = await doc(this.inventory, item.name)
                    const itemExists = await this.verifyExists(itemRef)
                    if (itemExists) {
                        const itemDoc = await getDoc(itemRef)
                        const inventoryItem = itemDoc.data()
                        if (inventoryItem.stock >= item.quantity) {
                            await transaction.update(itemRef, {
                                "stock": inventoryItem.stock - item.quantity
                            });
                            await transaction.update(shipmentRef, {
                                contents: arrayUnion(item)
                            });
                            totalPrice += (inventoryItem.price * item.quantity);
                        } else {
                            throw new Error(`${item.name} does not have enough stock.`);
                        }
                    } else {
                        throw new Error(`${item.name} does not exist in your inventory.`);
                    }
                }
                transaction.update(shipmentRef, {
                    price: totalPrice.toFixed(2)
                });
            });
            const newShipment = await getDoc(shipmentRef);
            return newShipment.data();
        } else {
            throw new Error(`${shipmentName} already exists.`)
        }
    }

    async getShipments(): Promise<DocumentData> {
        const shipmentDocs = await getDocs(this.shipments);
        return shipmentDocs.docs.map(item => Object.assign({ name: item.id }, item.data()));
    }

    async deleteShipment(name: string): Promise<DocumentData> {
        const shipmentRef = await doc(this.shipments, name);
        const shipmentExists = await this.verifyExists(shipmentRef);
        if (shipmentExists) {
            const shipment = await getDoc(shipmentRef);
            await deleteDoc(shipmentRef)
            return shipment.data();
        } else {
            throw new Error(`${name} does not exist in your shipments.`)
        }
    }
}

export const dataAccess = new DataAccess(
    database,
    INVENTORY_COLLECTION,
    SHIPMENTS_COLLECTION
);
