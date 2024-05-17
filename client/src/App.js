import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import ProtectedPage from "./components/ProtectedPage";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";

function App() {
  // Access loading state from Redux store
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div>
      {/* Conditionally render Spinner component while loading */}
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          {/* Protected routes for authenticated users */}
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home /> {/* Render Home page inside ProtectedPage */}
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile /> {/* Render Profile page inside ProtectedPage */}
              </ProtectedPage>
            }
          />

          {/* Public routes accessible to all users */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/register" element={<Register />} /> {/* Register page */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
