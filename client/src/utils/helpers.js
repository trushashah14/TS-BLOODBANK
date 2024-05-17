import moment from "moment"; // Import moment.js for date formatting

// Function to get the logged-in user's name based on their type
export const getLoggedInUserName = (user) => {
  if (user.userType === "donar") {
    // Donar: return their name
    return user.name;
  } else if (user.userType === "hospital") {
    // Hospital: return their hospital name
    return user.hospitalName;
  } else if (user.userType === "organization") {
    // Organization: return their organization name
    return user.organizationName;
  } else {
    // Handle unexpected user type (optional)
    return ""; // Or throw an error
  }
};

// Function to get a basic set of validation rules for Ant Design form inputs
export const getAntdInputValidation = () => {
  return [
    {
      required: true, // Field is required
      message: "Required", // Error message if empty
    },
  ];
};

// Function to format a date using moment.js
export const getDateFormat = (date) => {
  // Use moment to format the date in the desired format
  return moment(date).format("DD MMM YYYY hh:mm A"); // Day, Month abbreviation, Year, hour (12-hour format), minutes, AM/PM
};
