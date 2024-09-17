import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Signup from './Signup';
import './app.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" component={Login} />
          {/* Comment out or remove routes for components that don't exist yet */}
          {/*
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;