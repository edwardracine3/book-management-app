import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';
import BookForm from './pages/BookForm.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { BookProvider } from './context/BookContext.tsx';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/book/new" element={<PrivateRoute><BookForm /></PrivateRoute>} />
            <Route path="/book/edit/:id" element={<PrivateRoute><BookForm /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
};

export default App;
