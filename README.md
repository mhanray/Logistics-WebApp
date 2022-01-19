# Logistics-WebApp
Web app to manage inventory and shipments. Users can interact with their inventory by adding, editing, or deleting items. Shipments can be created from items in their inventory, stock permitting. 

## Prerequisities
This project uses node.js, and requires npm. Please ensure both are available before proceeding. [Installation instructions can be found here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Inventory and shipment data is stored in a Firestore database, so an Internet connection will be required to handle API calls. No authentication is required. 

## Getting started
Download the project reposity, and navigate to the root directory. This repo contains both the frontend and backend of the app, and both will need to be initialized. Open terminal instances in both the FrontEnd and BackEnd directories, then for both: 
- Install dependencies by running ```npm install```
- Start the server by running ```npm start```
You should see outputs in both terminals indicating that the servers are running. A page should have automatically opened in your browser, if not, navigate to (http://localhost:3000/)[http://localhost:3000/]. Your page should automatically populate with shipments and existing items in the inventory. If these are empty, verify that the backend server is running, then try refreshing the page. 

When finished, simply close the tab and terminal instances. 

## Usage
The page is split into two sections, one for managing inventory and another for managing shipments. Inventory and shipment information is shown in their respective tables.
### Manage Inventory
Items have a name, department, price, stock, and description associated with them. Items can be added to, updated in, or deleted from the inventory using the 'Modify Items' form. Note that items must have a unique name. 
- Adding an item requires all form contents be filled out.
- Updating an item only requires a name, any other non-blank fields will be updated. 
- Deleting an item only requires a name, other fields will not be used.
Each action should automatically update the inventory. Users can manually update the inventory with the 'Update Inventory' button above the table.

### Manage Shipments
Shipments consist of a name, destination, and a list of contents. Shipments can be created using the 'Modify Shipments' form. Shipments must have a unique name. All items in a shipment must have a name matching an item in the inventory, along with sufficient stock to fulfill the order. A shipment will not be created if any of its items cannot be found in the inventory or have insufficient stock. Succesfully created shipments will adjust and update the inventory accordingly. 


## Authors
Ray Han

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
