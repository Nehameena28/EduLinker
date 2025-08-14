import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:7000/api/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      setUser(null);
      navigate("/Home");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (location.pathname === "/Signup" || location.pathname === "/Login") {
    return null;
  }

  return (
    <header className="w-full bg-cyan-700 text-white font-semibold shadow">
      <nav className="flex justify-end items-center h-5 text-white font-semibold bg-gray-900"></nav>
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-4 md:px-8">
        {/* Logo */}
        <button onClick={() => navigate("/Home")}>
          <img className="h-32 object-cover mb-10" src="/icon.png" alt="Logo" />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {/* <Link to="/Home" className={`${location.pathname === "/Home" ? "underline font-bold" : ""}`}>Home</Link>
          <Link to="/About" className={`${location.pathname === "/About" ? "underline font-bold" : ""}`}>About</Link>
          <Link to="/Contact" className={`${location.pathname === "/Contact" ? "underline font-bold" : ""}`}>Contact</Link> */}
          {!user && (
            <>
              <Link
                to="/Home"
                className={`${
                  location.pathname === "/Home" ? "underline font-bold" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/About"
                className={`${
                  location.pathname === "/About" ? "underline font-bold" : ""
                }`}
              >
                About
              </Link>
              <Link
                to="/Contact"
                className={`${
                  location.pathname === "/Contact" ? "underline font-bold" : ""
                }`}
              >
                Contact
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/Signup">
                <button className="px-5 py-2 border border-white rounded-lg transition active:scale-90">
                  Sign up
                </button>
              </Link>
              <Link to="/Login">
                <button className="px-5 py-2 border border-white rounded-lg transition active:scale-90">
                  Log in
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center justify-end w-full space-x-12">
              {/* Profile Icon (clickable) */}
              <button
                onClick={() => {
                  if (user.role === "seller") navigate("/seller/dashboard");
                  else if (user.role === "buyer") navigate("/buyer/dashboard");
                  else navigate("/Home");
                }}
                className="w-10 h-10 rounded-full bg-white text-cyan-700 flex items-center justify-center font-bold shadow"
                title="Go to Dashboard"
              >
                {user?.name?.charAt(0).toUpperCase()}
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-5 py-2 border border-white rounded-lg transition hover:bg-white hover:text-cyan-700"
              >
                Log out
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          <i className="ri-menu-3-line text-2xl"></i>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-cyan-800 w-full px-6 pb-4">
          <div className="flex flex-col space-y-4">
            {/* <Link to="/Home" onClick={toggleMenu}>Home</Link>
            <Link to="/About" onClick={toggleMenu}>About</Link>
            <Link to="/Contact" onClick={toggleMenu}>Contact</Link> */}

            {!user && (
              <>
                <Link to="/Home" onClick={toggleMenu}>
                  Home
                </Link>
                <Link to="/About" onClick={toggleMenu}>
                  About
                </Link>
                <Link to="/Contact" onClick={toggleMenu}>
                  Contact
                </Link>
              </>
            )}

            {!user ? (
              <>
                <Link to="/Signup" onClick={toggleMenu}>
                  <button className="w-full py-2 border border-white rounded-lg">
                    Sign up
                  </button>
                </Link>
                <Link to="/Login" onClick={toggleMenu}>
                  <button className="w-full py-2 border border-white rounded-lg">
                    Log in
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    toggleMenu();
                    if (user.role === "seller") navigate("/seller/dashboard");
                    else if (user.role === "buyer")
                      navigate("/buyer/dashboard");
                    else navigate("/Home");
                  }}
                  className="w-full py-2 bg-white text-cyan-700 font-bold rounded-lg"
                >
                  {user.name}'s Dashboard
                </button>

                <button
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                  className="w-full py-2 border border-white rounded-lg"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
