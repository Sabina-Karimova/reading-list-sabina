// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';
import BookList from './components/BookList';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);

  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
