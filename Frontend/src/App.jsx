import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import HomePage from './pages/home.page';
import AddNote from './pages/addNote.page';
import LoginSignup from './pages/LoginSignup';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
 

  return (
    <>
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}

      <div className="p-6">
        <Routes>
          {/* Login or signup */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/home" /> : <LoginSignup setIsAuthenticated={setIsAuthenticated} />
            }
          />

          {/* Home (protected) */}
          <Route
            path="/home"
            element={
              isAuthenticated ? <HomePage /> : <Navigate to="/" />
            }
          />

          {/* Add Note (protected) */}
          <Route
            path="/add"
            element={
              isAuthenticated ? <AddNote /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>

      {isAuthenticated && <Footer />}
    </>
  );
}

export default App;
