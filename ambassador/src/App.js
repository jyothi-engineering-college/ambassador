// App.js

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "../src/config/firebase"; // Update the import path

import LoginComponent from "./components/LoginComponent";
import ProtectedPage from "./components/ProtectedPage";
import Register from "./components/Register"; // Add this line


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/protected" /> : <LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/protected" element={user ? <ProtectedPage /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
