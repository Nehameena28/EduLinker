

const Navbar = () => {


    

    function handlemenu() {
        alert("Hello, this is a message!");
    }



return (
    <>
        <div>

            <header>
                <nav1  class="nav1"  className="flex justify-end items-center h-10 text-center text-white font-semibold  bg-gray-900">

                    <a className=' underline text-sm pr-10' href="seller">forSeller</a>
                    <a className='underline text-sm pr-10' href="Buyer.jsx">forBuyer</a>

                </nav1>

                <nav  >

                    <div  class="nav2" className="flex justify-start items-center text-center  h-20 text-white font-semibold text-center bg-cyan-700 ">

                        <a  class="img"    className="  md:visible  flex justify-evenly items-center text-center  mr-auto" href="#"><img className=" h-32 object-cover mb-10 " src="/icon.png" alt="Logo" /></a>

                            <div class="menudiv" className="  hidden md:flex  flex  justify-end items-center  text-center ml-auto  mr-auto gap-32 space-x-8">
                                <a class="menus" href="#About">About</a>
                                <a  class="menus"  href="#Home" >Home</a>
                                <a class="menus" href="#Contact" >Contact</a>
                                <a class="menus" href="#Help" >Help</a>
                                <button  className=""><i class="ri-sun-line"></i></button>
                            </div>

                        



                        <button className=" pr-5 sm:visible   md:hidden  lg:hidden  xl:hidden  2xl:hidden" onClick={handlemenu}><i class="ri-menu-3-line"></i></button>
                    </div>


                    <div className="fixed bg-cyan-700 inset-0 p-10 hidden">
                        <div className="flex justify-between">
                            <a className="flex justify-between items-center text-center  mr-auto" href="#"><img className=" h-32 object-cover mb-10 " src="/icon.png" alt="Logo" />
                            </a>
                            <button className=" pr-5 color" onClick={handlemenu}><i class="ri-menu-3-line"></i></button>
                        </div>
                    </div>


                </nav>

            </header>

        </div>

    </>
)
}

export default Navbar;