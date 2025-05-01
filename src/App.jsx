import React from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contactus';
import Login from './pages/Login';

// Components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// This component handles the actual routing
function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === '/login';

  return (
    <>
      {!hideLayout && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

// Router wrapper
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
