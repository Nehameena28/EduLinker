
import axios from "axios"; 
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handlemenu = () => {
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location.pathname]);

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   navigate("/Home");
  // };

   const handleLogout = async () => {
    try {
      // ✅ Clear cookie from server
      await axios.get("http://localhost:7000/api/logout", {
        withCredentials: true,
      });

      // ✅ Clear local storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);

      // ✅ Redirect to Home
      navigate("/Home");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };




  // Hide navbar on login/signup pages
  if (location.pathname === "/Signup" || location.pathname === "/Login") {
    return null;
  }

  return (
    <header>
      <nav className="flex justify-end items-center h-5 text-white font-semibold bg-gray-900"></nav>

      <div className="flex justify-between items-center h-20 text-white font-semibold bg-cyan-700">
        {/* Logo */}
        <a className="text-center mr-auto" href="#">
          <img className="h-32 object-cover mb-10" src="/icon.png" alt="Logo" />
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex justify-end items-center p-8 space-x-16">
          <Link className={`${location.pathname === "/Home" ? "underline font-bold" : ""}`} to="/Home">Home</Link>
          <Link className={`${location.pathname === "/About" ? "underline font-bold" : ""}`} to="/About">About</Link>
          <Link className={`${location.pathname === "/Contact" ? "underline font-bold" : ""}`} to="/Contact">Contact</Link>

          {!user ? (
            // Show login/signup
            <div className="flex space-x-4">
              <Link to="/Signup">
                <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg shadow-md transition active:scale-90">
                  Sign up
                </button>
              </Link>
              <Link to="/Login">
                <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg shadow-md transition active:scale-90">
                  Log in
                </button>
              </Link>
            </div>
          ) : (
            // Show dashboard, profile, logout
            <div className="flex space-x-4 items-center">
              {user.role === "Seller" && (
                <Link to="/SellerProfile" className="hover:underline">Seller Dashboard</Link>
              )}
              {user.role === "Buyer" && (
                <Link to="/BuyerProfile" className="hover:underline">Buyer Dashboard</Link>
              )}
              {/* <div title={user.name}>
                <img
                  src="/user-icon.png"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </div> */}
               <div className="w-10 h-10 mr-8 rounded-full bg-cyan-700 text-white flex items-center justify-center text-lg font-bold  border shadow-md">
    {user?.name?.charAt(0).toUpperCase()}
  </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 border border-white text-white rounded-lg transition hover:bg-white hover:text-cyan-700"
              >
                Log out   
              </button>
            </div>     
          )}
        </div>
        

        {/* Mobile menu toggle */}
        <button className="pr-5 md:hidden" onClick={handlemenu}>
          <i className="ri-menu-3-line"></i>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div className={isHidden ? "hidden" : "block"}>
        <div className="fixed bg-cyan-700 inset-0">
          <div className="flex justify-between">
            <a className="mr-auto" href="#">
              <img className="h-32 object-cover mb-10" src="/icon.png" alt="Logo" />
            </a>
            <button className="pr-10 text-white" onClick={handlemenu}>
              <i className="ri-close-large-line"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

        