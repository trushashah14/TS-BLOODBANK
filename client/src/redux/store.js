import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import loadersReducer from "./loadersSlice";

// Configure the Redux store
const store = configureStore({
  reducer: {
    users: usersReducer, // Add the users slice reducer to the store
    loaders: loadersReducer, // Add the loaders slice reducer to the store
  },
});

// Export the store for use in the application
export default store;