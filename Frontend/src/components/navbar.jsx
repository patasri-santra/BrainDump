import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
  <nav id="navbar">
  <div className="logo">🧠 BrainDump</div>
  <div className="nav-links">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/add">Add Note</NavLink>
  </div>
</nav>

  );
};

export default Navbar;
