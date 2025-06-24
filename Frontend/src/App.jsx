import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/home.page';
import AddNote from './pages/addNote.page';
import Footer from './components/footer';

function App() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddNote />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
