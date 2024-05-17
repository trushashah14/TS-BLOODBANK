import { createSlice } from "@reduxjs/toolkit";

// Define a slice for managing loading state in the Redux store
const loadersSlice = createSlice({
  name: "loaders", // Name of the slice
  initialState: {
    loading: false, // Initial state for loading (false: not loading)
  },
  reducers: {
    SetLoading(state, action) {
      // Reducer function for setting the loading state
      state.loading = action.payload; // Update state based on action payload
    },
  },
});

// Export the action creator for setting loading state
export const { SetLoading } = loadersSlice.actions;

// Export the reducer function for this slice
export default loadersSlice.reducer;
