import { BrowserRouter } from "react-router-dom";
import {Routes , Route} from "react-router-dom"
import Home from "./Component/Menus/Home";
import About from "./Component/Menus/About"
import Contact from "./Component/Menus/Contact"
import Navbar from "./Component/Menus/Navbar"
// import NavbarSB from "./Component/Home/NavbarSB";
// import Buyer from "./Component/Home/Buyer";
// import Seller from "./Component/Home/Seller";
import Signup from "./Component/Enter/Signup"
// import SellerProfile from "./Component/SellerDashboard/SellerProfile"
// import S_Upload from "./Component/SellerDashboard/S_Upload"
// import S_Sell from "./Component/SellerDashboard/S_Sell"
// import S_History from "./Component/SellerDashboard/S_History"
// import S_Payment from "./Component/SellerDashboard/S_payment"
// import BuyerProfile  from "./Component/BuyerDashboard/BuyerProfile";
// import B_Shop from "./Component/BuyerDashboard/B_Shop"
// import B_Payment from "./Component/BuyerDashboard/B_Payment"
// import B_History from "./Component/BuyerDashboard/B_History"
// import B_Purchased from "./Component/BuyerDashboard/B_Purchased"


function App() {    


  
  return (
    <>
      <Navbar></Navbar>
      {/* <SellerProfile/> */}
      {/* /<BuyerProfile/>  */}
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/About" element={<About/>}></Route>
        <Route path="/Contact" element={<Contact/>}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
        {/* <Route path="/Buyer" element={<Buyer />}></Route>
        <Route path="/Seller" element={<Seller />}></Route>
        <Route path="/S_Upload" element={<S_Upload/>}></Route>
        <Route path="/S_Sell" element={<S_Sell />}></Route>
        <Route path="/S_History" element={<S_History />}></Route>
        <Route path="/S_payment" element={<S_Payment />}></Route>
        <Route path="/B_Shop" element={<B_Shop/>}></Route>
        <Route path="/B_Purchased" element={<B_Purchased/>}></Route>
        <Route path="/B_History" element={<B_History/>}></Route>
        <Route path="/B_Payment" element={<B_Payment/>}></Route> */}
      </Routes>
    </>
  )
}


export default App