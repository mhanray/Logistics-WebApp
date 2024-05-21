class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetchRequest(route, method, data = null, error = "") {
    return fetch(`${this.baseURL}${route}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    }).then(async (response) => {
      if (!response.ok) {
        const errorMsg = await response.text();

        alert(`${error}\n${errorMsg}`);
        throw new Error(errorMsg);
      }
      return response.json();
    });
  }

  async getInventory() {
    return this.fetchRequest(
      "inventory",
      "GET",
      null,
      "Error getting inventory."
    );
  }

  async addItem(item) {
    return this.fetchRequest(
      "inventory",
      "POST",
      item,
      "Error adding item to inventory."
    );
  }

  async updateItem(item) {
    return this.fetchRequest(
      "inventory",
      "PATCH",
      item,
      "Error updating item in inventory."
    );
  }

  async deleteItem(name) {
    return this.fetchRequest(
      `inventory/?name=${name}`,
      "DELETE",
      null,
      "Error deleting item in inventory."
    );
  }

  async getShipments() {
    return this.fetchRequest(
      "shipments",
      "GET",
      null,
      "Error getting shipments."
    );
  }

  async createShipment(shipment) {
    return this.fetchRequest(
      "shipments",
      "POST",
      shipment,
      "Error creating shipment."
    );
  }
}

export const api = new API("http://localhost:8080/");
