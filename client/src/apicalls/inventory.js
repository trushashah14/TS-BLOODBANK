// Import the pre-configured axios instance 
import { axiosInstance } from ".";

// Function to add new inventory items to the backend 
export const AddInventory = (data) => {
  // Perform a POST request to the "/api/inventory/add" endpoint, sending the data object in the request body
  return axiosInstance("post", "/api/inventory/add", data);
};

// Function to retrieve all inventory items from the backend 
export const GetInventory = () => {
  // Perform a GET request to the "/api/inventory/get" endpoint
  return axiosInstance("get", "/api/inventory/get");
};

// Function to retrieve inventory items with filters and limit 
export const GetInventoryWithFilters = (filters, limit) => {
  // Prepare an object containing the filters and limit information
  const payload = { filters, limit };

  // Perform a POST request to the "/api/inventory/filter" endpoint with the payload object containing filters and limit
  return axiosInstance("post", "/api/inventory/filter", payload);
};
