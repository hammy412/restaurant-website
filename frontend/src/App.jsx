import React from "react"
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login';
import CreateAccount from './pages/CreateAccount';
import Inventory from './pages/Inventory'
import StaffLogin from './pages/StaffLogin'
import StaffDashboard from './pages/StaffDashboard'
import ProtectedRoute from "./components/ProtectedRoute";
import './css/styles.css'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route 
      path="/inventory" 
      element={
        <ProtectedRoute>
          <Inventory />
        </ProtectedRoute>
      }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/staff-login" element={<StaffLogin />} />
      <Route 
      path="/staff-dashboard" 
      element={
        <ProtectedRoute>
          <StaffDashboard />
        </ProtectedRoute>
      }
      />
    </Routes>
  )
}