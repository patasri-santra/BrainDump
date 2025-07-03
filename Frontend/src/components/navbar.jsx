import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    if (setIsAuthenticated) setIsAuthenticated(false); // update auth state
    navigate('/');
  };

  return (
    <nav id="navbar">
      <div className="logo">🧠 BrainDump</div>
      <div className="nav-links">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/add">Add Note</NavLink>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;