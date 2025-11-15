import { useState } from 'react'
import './App.css'
import OcrTest from './Components/ocrComponent'
import WarrantyList from './Components/warrantyList'
import NavBar from './navBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import LoginPage from './Components/loginPage'
import RegisterPage from './Components/registerPage'
import ProtectedRoute from './Components/protectedRoutes'
import HomePage from './Components/Homepage'

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scan" element={<ProtectedRoute><OcrTest /></ProtectedRoute>} />
        <Route path="/warranties" element={<ProtectedRoute><WarrantyList /></ProtectedRoute>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
