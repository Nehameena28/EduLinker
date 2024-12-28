import React from "react";
import NavbarSB from "../Home/NavbarSB";
import Footer from "../Menus/Footer";
const Seller = () => {
    return (
        <>
            {/* <NavbarSB></NavbarSB> */}
            <div className="relative w-full h-screen mt-1">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover sm:bg-cover h-screen md:bg-cover lg:bg-cover bg-center "
                    style={{
                        backgroundImage: "url('sellerbg.jpg')",
                        opacity: 0.8,
                    }}
                ></div>


                <div className="relative flex flex-col items-start justify-center h-full pl-4  md:pl-20 text-white">
                <span className="rounded  text-neutral-800 ">
                    <h1 className="text-2xl  sm:text-4xl md:text-3xl lg:text-5xl font-bold mb-6 md:mb-8 opacity-100 leading-tight text-cayn-500">Welcome Sellers !</h1>
                </span>
                    <button
                        className="px-6 py-3 bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition duration-300 active:scale-90"
                    >
                        EXPLORE MORE
                    </button>
                </div>
            <Footer></Footer>
            </div>
        </>
    );
};

export default Seller;
