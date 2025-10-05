import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar><Home /></Navbar>} />
          <Route path='/login' element={<Navbar><Login /></Navbar>} />
          <Route path='/signup' element={<Navbar><Signup /></Navbar>} />
          <Route path='/dashboard' element={<Navbar><Dashboard /></Navbar>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
