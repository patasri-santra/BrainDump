import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/home.page';
import AddNote from './pages/addNote.page';
import Footer from './components/footer';
import LoginSignup from './pages/LoginSignup';

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  return (
    <>
      {/* Show Navbar only when user is logged in */}
      {isAuthenticated && <Navbar />}

      <div className="p-6">
        <Routes>
          {/* Public route */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/home" /> : <LoginSignup />
            }
          />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              isAuthenticated ? <HomePage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/add"
            element={
              isAuthenticated ? <AddNote /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>

      {/* Show Footer only when user is logged in */}
      {isAuthenticated && <Footer />}
    </>
  );
}

export default App;
