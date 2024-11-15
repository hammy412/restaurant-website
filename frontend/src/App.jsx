import React from "react"
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import StaffLogin from './pages/StaffLogin'
import './css/styles.css'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/inventory' element={<Inventory />} />
      <Route path="/staff-login" element={<StaffLogin />}/>
    </Routes>
  )
}