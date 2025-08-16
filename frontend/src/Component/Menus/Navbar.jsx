import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNotification, setShowNotification] = useState({ show: false, message: "", type: "" });

  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = () => setShowProfileDropdown(!showProfileDropdown);

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

  const showNotificationMessage = (message, type) => {
    setShowNotification({ show: true, message, type });
    setTimeout(() => {
      setShowNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:7000/api/user/${user.id}`, {
        withCredentials: true,
      });
      
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      setUser(null);
      setShowDeleteModal(false);
      showNotificationMessage("Account deleted successfully", "success");
      setTimeout(() => navigate("/Home"), 1500);
    } catch (error) {
      console.error("Account deletion failed:", error);
      setShowDeleteModal(false);
      showNotificationMessage("Failed to delete account", "error");
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
              {/* Profile Icon with Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="w-10 h-10 rounded-full bg-white text-cyan-700 flex items-center justify-center font-bold shadow"
                  title="Profile Options"
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </button>
                
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate("/profile");
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-t-lg"
                    >
                      See your profile
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setShowDeleteModal(true);
                      }}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-b-lg"
                    >
                      Delete your account
                    </button>
                  </div>
                )}
              </div>

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
                    setShowDeleteModal(true);
                  }}
                  className="w-full py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition mb-2"
                >
                  Delete Account
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Account</h3>
              <p className="text-gray-600">Are you sure you want to delete your account? This action cannot be undone.</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {showNotification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          showNotification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {showNotification.message}
        </div>
      )}
    </header>
  );
};

export default Navbar;
