// import { BrowserRouter } from "react-router-dom";
// import { Routes, Route } from "react-router-dom"
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// import { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// import Home from "./Component/Menus/Home";
// import About from "./Component/Menus/About"
// import Contact from "./Component/Menus/Contact"
// import Navbar from "./Component/Menus/Navbar"
// import Signup from "./Component/Enter/Signup"
// import Login from "./Component/Enter/Login"
// import SellerProfile from "./Component/SellerDashboard/SellerProfile"
// import BuyerProfile from "./Component/BuyerDashboard/BuyerProfile";
// import S_Upload from "./Component/SellerDashboard/S_Upload";
// import Sidebar from "./Component/SellerDashboard/Sidebar";
// import S_Sell from "./Component/SellerDashboard/S_Sell";
// import S_History from "./Component/SellerDashboard/S_History";
// import S_payment from "./Component/SellerDashboard/S_payment";

// function App() {
//   useEffect(() => {
//   AOS.init({ duration: 1000 });
// }, []);
//   return (
//     <>
//       <Navbar></Navbar>
//       <Routes>
//         <Route path="/" element={<Home />}></Route>
//         <Route path="/Home" element={<Home />}></Route>
//         <Route path="/About" element={<About />}></Route>
//         <Route path="/Contact" element={<Contact />}></Route>

//         <Route path="/Signup" element={<Signup />}></Route>
//         <Route path="/Login" element={<Login />}></Route>

//         <Route path="/seller" element={<Sidebar />} />
//         <Route path="/buyer" element={<BuyerProfile />} />

     

//          <Route path="/dashboard" element={<SellerProfile/>} />
//         <Route path="/S_upload" element={<S_Upload />} />
//        <Route path="/S_Sell" element={<S_Sell />} />
//         <Route path="/S_History" element={<S_History />} />
//         <Route path="/S_payment" element={<S_payment />} />
//       </Routes>
//     </>
//   )
// }


// export default App









// App.jsx
import { Routes, Route } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

import Home from "./Component/Menus/Home";
import About from "./Component/Menus/About";
import Contact from "./Component/Menus/Contact";
import Navbar from "./Component/Menus/Navbar";
import Signup from "./Component/Enter/Signup";
import Login from "./Component/Enter/Login";

import SellerLayout from "./Component/SellerDashboard/SellerLayout";
import SellerProfile from "./Component/SellerDashboard/SellerProfile";
import S_Upload from "./Component/SellerDashboard/S_Upload";
import S_Sell from "./Component/SellerDashboard/S_Sell";
import S_History from "./Component/SellerDashboard/S_History";
import S_Payment from "./Component/SellerDashboard/S_Payment";

function App() {
 
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />

        {/* Seller Dashboard with sidebar layout */}
        <Route path="/seller" element={<SellerLayout />}>
          <Route path="dashboard" element={<SellerProfile />} />
          <Route path="S_upload" element={<S_Upload />} />
          <Route path="S_Sell" element={<S_Sell />} />
          <Route path="S_History" element={<S_History />} />
          <Route path="S_payment" element={<S_Payment />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
