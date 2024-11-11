import React from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import the AuthProvider
import { MoodProvider } from './context/MoodContext'; // Import the MoodProvider
import MoodEntryForm from './components/MoodEntryForm/MoodEntryForm';
import MoodHistory from './components/MoodHistory/MoodHistory';
import MoodChart from './components/MoodChart/MoodChart';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
// import Account from './components/Auth/Account';
import MoodRecommendations from './components/MoodRecommendations/MoodRecommendations'; // Import the MoodRecommendations component
import './App.css'; // Optional: Import a CSS file for styling

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children
};

const App = () => {
  return (
    <AuthProvider>
      <MoodProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path='/MoodEntry'
              element={
                <ProtectedRoute>
                  <MoodEntryForm />
                </ProtectedRoute>
              }
            />
            <Route
              path='/MoodHistory'
              element={
                <ProtectedRoute>
                  <MoodHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path='/MoodChart'
              element={
                <ProtectedRoute>
                  <MoodChart />
                </ProtectedRoute>
              }
            />
            <Route
              path='/mood-recommendations'
              element={
                <ProtectedRoute>
                  <MoodRecommendations />
                </ProtectedRoute>
              }
            />
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            {/* <Route path='/account' element={<Account />} /> */}
          </Routes>
        </BrowserRouter>
      </MoodProvider>
    </AuthProvider>
  );
};

export default App;


