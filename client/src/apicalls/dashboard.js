// Import the pre-configured axios instance (assumed to be in the same directory)
import { axiosInstance } from ".";

// Function to retrieve all blood group inventory data from the backend API
export const GetAllBloodBroupsInInventory = () => {
  // Make a GET request to the "/api/dashboard/blood-groups-data" endpoint
  return axiosInstance("get", "/api/dashboard/blood-groups-data");
};
