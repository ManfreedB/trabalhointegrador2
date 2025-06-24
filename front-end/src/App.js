import React from 'react';
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route index element={<Signin />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Home/*' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
