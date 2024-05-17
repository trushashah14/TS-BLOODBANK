import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { getLoggedInUserName } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser, SetLoading } from "../redux/slices";  // Updated for brevity

function ProtectedPage({ children }) {
  // Access state from Redux store
  const { currentUser } = useSelector((state) => state.users);

  // Navigation and dispatch functions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetches current user data from the backend
  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true)); // Set loading state to true
      const response = await GetCurrentUser();
      dispatch(SetLoading(false)); // Set loading state to false
      if (response.success) {
        message.success(response.message);
        dispatch(SetCurrentUser(response.data)); // Update currentUser in Redux
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  // Check for token and fetch user data on component mount
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login"); // Redirect to login if no token
    }
  }, []);

  // Render content only if currentUser exists (i.e., user is authenticated)
  return (
    currentUser && (
      <div>
        {/* Header with user information and logout button */}
        <div className="flex justify-between items-center bg-primary text-white px-5 py-3 mx-5 rounded-b">
          {/* ... (existing code for header) */}
        </div>

        {/* Protected content area for authenticated users */}
        <div className="px-5 py-5">{children}</div>
      </div>
    )
  );
}

export default ProtectedPage;
