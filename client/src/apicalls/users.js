// Import the pre-configured axios instance (assumed to be in the same directory)
import { axiosInstance } from ".";

// Function to log in a user using a POST request with payload
export const LoginUser = async (payload) => {
  // Perform a POST request to the "/api/users/login" endpoint, sending the payload object
  const response = await axiosInstance("post", "/api/users/login", payload);
  // Return the response object
  return response;
};

// Function to register a new user using a POST request with payload
export const RegisterUser = async (payload) => {
  // Perform a POST request to the "/api/users/register" endpoint, sending the payload object
  const response = await axiosInstance("post", "/api/users/register", payload);
  // Return the response object
  return response;
};

// Function to retrieve the currently logged-in user using a GET request
export const GetCurrentUser = async () => {
  // Perform a GET request to the "/api/users/get-current-user" endpoint
  const response = await axiosInstance("get", "/api/users/get-current-user");
  // Return the response object
  return response;
};

// Function to retrieve all donors associated with an organization
export const GetAllDonarsOfAnOrganization = async () => {
  // Perform a GET request to the `/api/users/get-all-donars` endpoint
  const response = await axiosInstance("get", `/api/users/get-all-donars`);
  // Return the response object, containing a list of donor data
  return response;
};

// Function to retrieve all hospitals associated with an organization
export const GetAllHospitalsOfAnOrganization = async () => {
  // Perform a GET request to the `/api/users/get-all-hospitals` endpoint
  const response = await axiosInstance("get", `/api/users/get-all-hospitals`);
  // Return the response object,  containing a list of hospital data
  return response;
};

// Function to retrieve all organizations a donor can donate to
export const GetAllOrganizationsOfADonar = async () => {
  // Perform a GET request to the `/api/users/get-all-organizations-of-a-donar` endpoint (clarify if specific donor ID is required)
  const response = await axiosInstance(
    "get",
    `/api/users/get-all-organizations-of-a-donar`
  );
  // Return the response object,  containing a list of organization data
  return response;
};

// Function to retrieve all organizations a hospital can request blood from
export const GetAllOrganizationsOfAHospital = async () => {
  // Perform a GET request to the `/api/users/get-all-organizations-of-a-hospital` endpoint (clarify if specific hospital ID is required)
  const response = await axiosInstance(
    "get",
    `/api/users/get-all-organizations-of-a-hospital`
  );
  // Return the response object,  containing a list of organization data
  return response;
};
