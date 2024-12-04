import React from "react"
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login';
import CreateAccount from './pages/CreateAccount';
import Inventory from './pages/Inventory'
import StaffLogin from './pages/StaffLogin'
import StaffDashboard from './pages/StaffDashboard'
import Reservation from './pages/Reservation'
import ReservationsDashboard from './pages/ReservationsDashboard'
import StaffProtectedRoute from "./components/staffProtectedRoute";
import CustomerProtectedRoute from "./components/customerProtectedRoute";
import './css/styles.css'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route 
      path="/inventory" 
      element={
        <StaffProtectedRoute>
          <Inventory />
        </StaffProtectedRoute>
      }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/staff-login" element={<StaffLogin />} />
      <Route 
      path="/reservations" 
      element={
        <CustomerProtectedRoute>
          <Reservation />
        </CustomerProtectedRoute>
      }
      />


      <Route 
      path="/reservations-dashboard" 
      element={
        <StaffProtectedRoute>
          <ReservationsDashboard />
        </StaffProtectedRoute>
      }
      />

      <Route 
      path="/staff-dashboard" 
      element={
        <StaffProtectedRoute>
          <StaffDashboard />
        </StaffProtectedRoute>
      }
      />

    </Routes>
  )
}