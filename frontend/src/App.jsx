import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Home from "./Component/Menus/Home";
import About from "./Component/Menus/About"
import Contact from "./Component/Menus/Contact"
import Navbar from "./Component/Menus/Navbar"
import Signup from "./Component/Enter/Signup"
import Login from "./Component/Enter/Login"
import SellerProfile from "./Component/SellerDashboard/SellerProfile"
import BuyerProfile from "./Component/BuyerDashboard/BuyerProfile";



function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>

        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Login" element={<Login />}></Route>

        <Route path="/seller" element={<SellerProfile />} />
        <Route path="/buyer" element={<BuyerProfile />} />

      </Routes>
    </>
  )
}


export default App