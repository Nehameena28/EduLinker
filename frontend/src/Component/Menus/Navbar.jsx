import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation

const Navbar = () => {
    const [isHidden, setIsHidden] = useState(true); // Initially hidden
    const location = useLocation(); // Get current route

    const handlemenu = () => {
        setIsHidden(!isHidden); // Toggle hidden state
    };

    // Hide Navbar on Signup page
    if (location.pathname === "/Signup") {
        return null;
    }

    return (
        <>
            <div>
                <header>
                    <nav1 className="flex justify-end items-center h-5 text-center text-white font-semibold  bg-gray-900">
                        {/* <Link className={`underline text-sm pr-10 ${location.pathname === "/seller" ? "font-bold" : ""}`} to="/seller">forSeller</Link> */}
                        {/* <Link className={`underline text-sm pr-10 ${location.pathname === "/Buyer" ? "font-bold" : ""}`} to="/Buyer">forBuyer</Link> */}
                    </nav1>

                    <div className="flex justify-between items-center h-20 text-white font-semibold text-center bg-cyan-700">
                        <a className="md:visible text-center mr-auto" href="#">
                            <img className="h-32 object-cover mb-10" src="/icon.png" alt="Logo" />
                        </a>

                        <div className="hidden md:flex justify-end items-center text-center gap-10 space-x-8">
                            <Link className={`${location.pathname === "/Home" ? "underline font-bold" : ""}`} to="/Home">Home</Link>
                            <Link className={`${location.pathname === "/About" ? "underline font-bold" : ""}`} to="/About">About</Link>
                            <Link className={`${location.pathname === "/Contact" ? "underline font-bold" : ""}`} to="/Contact">Contact</Link>

                            <Link to="/Signup">
                                <button 
                                    className="px-6 py-3 mr-12 border border-white text-white font-semibold rounded-lg shadow-md  transition active:scale-90">
                                    Sign up
                                </button>
                            </Link>
                        </div>

                        <button className="pr-5 sm:visible md:hidden lg:hidden xl:hidden 2xl:hidden" onClick={handlemenu}>
                            <i className="ri-menu-3-line"></i>
                        </button>
                    </div>

                    <div className={isHidden ? "hidden" : "block"}>
                        <div className="fixed bg-cyan-700 inset-0">
                            <div className="flex justify-between">
                                <a className="flex justify-between items-center text-center mr-auto" href="#">
                                    <img className="h-32 object-cover mb-10" src="/icon.png" alt="Logo" />
                                </a>
                                <button className="pr-10 text-white" onClick={handlemenu}>
                                    <i className="ri-close-large-line"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};

export default Navbar;
