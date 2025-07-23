
  // App.jsx
  import { Routes, Route } from "react-router-dom";
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import { useEffect } from "react";
  import { useLocation } from "react-router-dom";



  import Home from "./Component/Menus/Home";
  import About from "./Component/Menus/About";
  import Contact from "./Component/Menus/Contact";
  import Navbar from "./Component/Menus/Navbar";
  import Signup from "./Component/Enter/Signup";
  import Login from "./Component/Enter/Login";
  import Footer from "./Component/Menus/Footer";
 

  import SellerLayout from "./Component/SellerDashboard/SellerLayout";
  import SellerProfile from "./Component/SellerDashboard/SellerProfile";
  import S_Upload from "./Component/SellerDashboard/S_Upload";
  import S_Sell from "./Component/SellerDashboard/S_Sell";
  import S_History from "./Component/SellerDashboard/S_History";
  import S_Payment from "./Component/SellerDashboard/S_Payment";
  

  import BuyerLayout from "./Component/BuyerDashboard/BuyerLayout";
  import BuyerProfile from "./Component/BuyerDashboard/BuyerProfile";
  import B_Purchased from "./Component/BuyerDashboard/B_Purchased";
  import B_Saved from "./Component/BuyerDashboard/B_Saved";
  // import B_Downloaded from "./Component/BuyerDashboard/B_Downloaded";
  import B_Payment from "./Component/BuyerDashboard/B_Payment";
 
import SellsPage from "./Component/BuyerDashboard/Sellspage";


  function App() {
  
    useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);

    const location = useLocation();


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
          <Route path="/Sellspage" element={<SellsPage />} />
         


          {/* Seller Dashboard with sidebar layout */}
          <Route path="/seller" element={<SellerLayout />}>
            <Route path="dashboard" element={<SellerProfile />} />
            <Route path="S_upload" element={<S_Upload />} />
            <Route path="S_Sell" element={<S_Sell />} />
            <Route path="S_History" element={<S_History />} />
            <Route path="S_payment" element={<S_Payment />} />
          </Route>


             {/* Buyer Dashboard with sidebar layout */}
            <Route path="/buyer" element={<BuyerLayout />}>
            <Route path="dashboard" element={<BuyerProfile />} />
            <Route path="B_Purchased" element={<B_Purchased />} />
            <Route path="B_Saved" element={<B_Saved />} />
            {/* <Route path="B_Downloaded" element={<B_Downloaded />} /> */}
            <Route path="B_payment" element={<B_Payment />} />
          </Route>
          
        

        </Routes>

  {location.pathname !== "/Login" && location.pathname !== "/Signup" && <Footer />}


        
      </>
    );
  }

  export default App;
