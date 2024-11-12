import React from "react"
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import './css/styles.css'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/inventory' element={<Inventory />} />
    </Routes>
  )
}