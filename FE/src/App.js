import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/auth/forgotpassword" element={<ForgotPasswordForm />} />
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 