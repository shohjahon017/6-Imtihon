import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Details from "./pages/Details";
import HeaderLayout from "./Layout/HeaderLayout";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      if (!location.pathname.includes("register")) {
        navigate("/login");
      }
    }
  }, [navigate]);

  function ProtectedRoute({ isAthenticated, children }) {
    if (!isAthenticated) {
      navigate("/login");
    }
    return children;
  }

  return (
    <div className="container mx-auto">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAthenticated={!!token}>
              <HeaderLayout>
                <Home />
              </HeaderLayout>
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/books/:id"
          element={
            <ProtectedRoute isAthenticated={!!token}>
              <HeaderLayout>
                {" "}
                <Details></Details>
              </HeaderLayout>{" "}
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
