import { createSlice } from "@reduxjs/toolkit";

// Define a slice for managing user data in the Redux store
const usersSlice = createSlice({
  name: "users", // Name of the slice
  initialState: {
    currentUser: null, // Initial state for current user (null: no user logged in)
  },
  reducers: {
    SetCurrentUser(state, action) {
      // Reducer function for setting the current user
      state.currentUser = action.payload; // Update state with user data from action payload
    },
  },
});

// Export the action creator for setting the current user
export const { SetCurrentUser } = usersSlice.actions;

// Export the reducer function for this slice
export default usersSlice.reducer;
