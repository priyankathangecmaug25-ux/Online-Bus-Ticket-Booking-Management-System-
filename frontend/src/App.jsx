import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import ProtectedRoute from "./components/ProtectedRoute";
import AddBus from "./pages/AddBus";
import EditBus from "./pages/EditBus";
export default function App(){
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/addbus" element={<AddBus/>} />
       <Route path="/editbus/:id" element={<EditBus />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/mybookings" element={<ProtectedRoute><MyBookings/></ProtectedRoute>} />
        {/* fallback */}
        <Route path="*" element={<Home/>} />
      </Routes>
    </>
  );
}
