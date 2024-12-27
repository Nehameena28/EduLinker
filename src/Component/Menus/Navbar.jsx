import { useState } from "react";
import {Link} from "react-router-dom"


const Navbar = () => {


    const [isHidden, setIsHidden] = useState(true); // Initially hidden

    const handlemenu = () => {
        setIsHidden(!isHidden); // Toggle hidden state
    };





    return (
        <>
            <div>

                <header>
                    <nav1 class="nav1" className="flex justify-end items-center h-5 text-center text-white font-semibold  bg-gray-900">


                        <a className=' underline text-sm pr-10' href="seller">forSeller</a>
                        <a className='underline text-sm pr-10' href="Buyer.jsx">forBuyer</a>

                    </nav1>


                    <div class="nav2" className="flex justify-between items-center text-center  h-20 text-white font-semibold text-center bg-cyan-700 ">

                            <a class="img" className="  md:visible  text-center  mr-auto" href="#"><img className=" h-32 object-cover mb-10 " src="/icon.png" alt="Logo" /></a>
                 

                        <div className="  hidden md:flex  flex  justify-end items-center  text-center gap-10 space-x-8">
                            <Link to="/Home">Home</Link>
                            <Link to="/About">About</Link>
                            <Link to="/Contact">Contact</Link>
                            {/* <a class="menus" href="#Help" >Help</a> */}
                            {/* <button  className="font-bold pr-5 font-extrabold"><i class="ri-sun-line"></i></button> */}
                            <Link  to="/Login"><button className="hover:underline">Log in</button></Link>
                            <Link  to="/Signup"><button className="px-6 py-3  mr-10   bg-amber-700 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 transition duration-300 active:scale-90">Sign up</button></Link>
                        </div>





                        <button className=" pr-5 sm:visible   md:hidden  lg:hidden  xl:hidden  2xl:hidden" onClick={handlemenu}><i class="ri-menu-3-line"></i></button>
                    </div>

                    <div className={isHidden ? "hidden" : "block"}>
                        <div className="fixed bg-cyan-700 inset-0  ">
                            <div className="flex justify-between">
                                <a className="flex justify-between items-center text-center  mr-auto" href="#"><img className=" h-32 object-cover mb-10 " src="/icon.png" alt="Logo" />
                                </a>
                                <button className=" pr-10 text-white " onClick={handlemenu}><i class="ri-close-large-line"></i></button>
                            </div>
                        </div>
                    </div>



                </header>
               
            </div>

        </>
    )
}

export default Navbar;