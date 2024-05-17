// Import the Axios library for making HTTP requests
import axios from "axios";

// Function to create a pre-configured Axios instance with authorization header
export const axiosInstance = async (method, endpoint, payload = null) => {
  try {
    // Prepare the request configuration object
    const config = {
      method, // HTTP method (e.g., "get", "post", "put", "delete")
      url: endpoint, // API endpoint URL (relative to the base URL)
    };

    // If payload is provided, include it in the request body
    if (payload) {
      config.data = payload;
    }

    // Retrieve the authentication token from local storage 
    const token = localStorage.getItem("token");

    // If a token exists, add it as an Authorization header
    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`,
      };
    }

    // Make the API request using Axios
    const response = await axios(config);

    // Return the data extracted from the successful response
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error in axiosInstance:", error); // Log the error for debugging
    return error; // You can choose to return the error object or throw a custom error here
  }
};
