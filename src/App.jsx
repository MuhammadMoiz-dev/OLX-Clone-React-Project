import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CardHome from './Components/CardHome'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Signup from './Components/Signup'

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar><CardHome /></Navbar>} />
          <Route path='/login' element={<Navbar><Login /></Navbar>} />
          <Route path='/signup' element={<Navbar><Signup /></Navbar>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
