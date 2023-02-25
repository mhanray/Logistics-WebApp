import { dataAccess } from "../DataAccess";

export async function addItem(item: ItemModel) {
    return await dataAccess.postItem(item);
}

export async function getInventory() {
    return await dataAccess.getInventory();
}

export async function updateItem(itemInfo: UpdateItemModel) {
    return await dataAccess.patchItem(itemInfo.name, itemInfo.fields);
}

export async function deleteItem(name: string) {
    return await dataAccess.deleteItem(name);
}

// Model for Request body
export interface ItemModel {
    name: string;
    department: string;
    price: number;
    stock: number;
    description: string;
}

// Model for stored item properties
export interface UpdateItemModel {
    name: string;
    fields: {
        department?: string;
        price?: number;
        stock?: number;
        description?: string
    }
}
