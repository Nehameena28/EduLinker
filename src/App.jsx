import { BrowserRouter } from "react-router-dom";
import {Routes , Route} from "react-router-dom"
import Home from "./Component/Menus/Home";
import About from "./Component/Menus/About"
import Contact from "./Component/Menus/Contact"
import Navbar from "./Component/Menus/Navbar"
import NavbarSB from "./Component/Home/NavbarSB";
import Buyer from "./Component/Home/Buyer";
import Seller from "./Component/Home/Seller";
import Login from "./Component/Enter/Login"
import Signup from "./Component/Enter/Signup"
import Upload from "./Component/SellerDashboard/Upload"
import Sell from "./Component/SellerDashboard/Sell"
import History from "./Component/SellerDashboard/History"
import Payment from "./Component/SellerDashboard/Sellerpayment"
import SellerProfile from "./Component/SellerDashboard/SellerProfile"
import BuyerProfile  from "./Component/BuyerDashboard/BuyerProfile";
import Sellerpayment from "./Component/SellerDashboard/Sellerpayment";

function App() {


  
  return (
    <>
      {/* <SellerProfile/> */}
      <BuyerProfile/> 
      {/* //<Navbar></Navbar> */}
      <Routes>
      {/* <Route path="/" element={<Home />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Buyer" element={<Buyer />}></Route>
        <Route path="/Seller" element={<Seller />}></Route> */}
        <Route path="/Upload" element={<Upload/>}></Route>
        <Route path="/sell" element={<Sell />}></Route>
        <Route path="/history" element={<History />}></Route>
        <Route path="/Sellerpayment" element={<Sellerpayment />}></Route>
      </Routes>
    </>
  )
}


export default App