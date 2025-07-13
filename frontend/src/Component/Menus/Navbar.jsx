
// import axios from "axios"; 
// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [isHidden, setIsHidden] = useState(true);
//   const [user, setUser] = useState(null);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const handlemenu = () => {
//     setIsHidden(!isHidden);
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, [location.pathname]);

//   // const handleLogout = () => {
//   //   localStorage.removeItem("user");
//   //   localStorage.removeItem("token");
//   //   setUser(null);
//   //   navigate("/Home");
//   // };

//    const handleLogout = async () => {
//     try {
//       // ✅ Clear cookie from server
//       await axios.get("http://localhost:7000/api/logout", {
//         withCredentials: true,
//       });

//       // ✅ Clear local storage
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       setUser(null);

//       // ✅ Redirect to Home
//       navigate("/Home");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };




//   // Hide navbar on login/signup pages
//   if (location.pathname === "/Signup" || location.pathname === "/Login") {
//     return null;
//   }

//   return (
//     <header>
//       <nav className="flex justify-end items-center h-5 text-white font-semibold bg-gray-900"></nav>

//       <div className="flex justify-between items-center h-20 text-white font-semibold bg-cyan-700">
//         {/* Logo */}
//         <a className="text-center mr-auto" href="#">
//           <img className="h-32 object-cover mb-10" src="/icon.png" alt="Logo" />
//         </a>

//         {/* Desktop menu */}
//         <div className="hidden md:flex justify-end items-center p-8 space-x-16">
//           <Link className={`${location.pathname === "/Home" ? "underline font-bold" : ""}`} to="/Home">Home</Link>
//           <Link className={`${location.pathname === "/About" ? "underline font-bold" : ""}`} to="/About">About</Link>
//           <Link className={`${location.pathname === "/Contact" ? "underline font-bold" : ""}`} to="/Contact">Contact</Link>

//           {!user ? (
//             // Show login/signup
//             <div className="flex space-x-4">
//               <Link to="/Signup">
//                 <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg shadow-md transition active:scale-90">
//                   Sign up
//                 </button>
//               </Link>
//               <Link to="/Login">
//                 <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg shadow-md transition active:scale-90">
//                   Log in
//                 </button>
//               </Link>
//             </div>
//           ) : (
//             // Show dashboard, profile, logout
//             <div className="flex space-x-4 items-center">
//               {user.role === "seller" && (
//                 <Link to="/seller/dashboard" className="hover:underline">K</Link>
//               )}
//               {user.role === "buyer" && (
//                 <Link to="/buyer/dashboard" className="hover:underline">Buyer Dashboard</Link>
//               )}
              
//                <div className="w-10 h-10 mr-8 rounded-full bg-cyan-700 text-white flex items-center justify-center text-lg font-bold  border shadow-md">
//     {user?.name?.charAt(0).toUpperCase()}
//   </div>
//               <button
//                 onClick={handleLogout}
//                 className="px-6 py-2 border border-white text-white rounded-lg transition hover:bg-white hover:text-cyan-700"
//               >
//                 Log out   
//               </button>
//             </div>     
//           )}
//         </div>
        

//         {/* Mobile menu toggle */}
//         <button className="pr-5 md:hidden" onClick={handlemenu}>
//           <i className="ri-menu-3-line"></i>
//         </button>
//       </div>

//       {/* Mobile menu panel */}
//       <div className={isHidden ? "hidden" : "block"}>
//         <div className="fixed bg-cyan-700 inset-0">
//           <div className="flex justify-between">
//             <a className="mr-auto" href="#">
//               <img className="h-32 object-cover mb-10" src="/icon.png" alt="Logo" />
//             </a>
//             <button className="pr-10 text-white" onClick={handlemenu}>
//               <i className="ri-close-large-line"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

        


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
        <button>
          <img className="h-32 object-cover mb-10" src="/icon.png" alt="Logo" />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/Home" className={`${location.pathname === "/Home" ? "underline font-bold" : ""}`}>Home</Link>
          <Link to="/About" className={`${location.pathname === "/About" ? "underline font-bold" : ""}`}>About</Link>
          <Link to="/Contact" className={`${location.pathname === "/Contact" ? "underline font-bold" : ""}`}>Contact</Link>

          {!user ? (
            <>
              <Link to="/Signup">
                <button className="px-5 py-2 border border-white rounded-lg transition active:scale-90">Sign up</button>
              </Link>
              <Link to="/Login">
                <button className="px-5 py-2 border border-white rounded-lg transition active:scale-90">Log in</button>
              </Link>
            </>
          ) : (
            <div className="flex space-x-8 items-center">
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
            <Link to="/Home" onClick={toggleMenu}>Home</Link>
            <Link to="/About" onClick={toggleMenu}>About</Link>
            <Link to="/Contact" onClick={toggleMenu}>Contact</Link>

            {!user ? (
              <>
                <Link to="/Signup" onClick={toggleMenu}>
                  <button className="w-full py-2 border border-white rounded-lg">Sign up</button>
                </Link>
                <Link to="/Login" onClick={toggleMenu}>
                  <button className="w-full py-2 border border-white rounded-lg">Log in</button>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    toggleMenu();
                    if (user.role === "seller") navigate("/seller/dashboard");
                    else if (user.role === "buyer") navigate("/buyer/dashboard");
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
