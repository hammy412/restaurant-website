import React from "react"
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login';
import CreateAccount from './pages/CreateAccount';
import Inventory from './pages/Inventory'
import StaffLogin from './pages/StaffLogin'
import './css/styles.css'
import Reservations from "./pages/Reservation";
import ReservationsDashboard from "./pages/ReservationsDashboard";

export default function App() {
  return (
    
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/inventory' element={<Inventory />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/reservations/dashboard" element={<ReservationsDashboard />} />

    </Routes>
  )
}