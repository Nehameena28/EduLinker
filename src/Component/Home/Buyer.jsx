import React from "react";
// import NavbarSB from "../Home/NavbarSB"
import Footer from "../Menus/Footer";
const Buyer = () => {
    return (
        <>
            {/* <NavbarSB></NavbarSB> */}
            <div className="relative w-full h-screen mt-1">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover sm:bg-cover h-screen md:bg-cover lg:bg-cover bg-center "
                    style={{
                        backgroundImage: "url('buyer-bg.jpg')",
                        opacity: 0.8,
                    }}
                ></div>


                <div className="relative flex flex-col items-start justify-center h-full pl-6 md:pl-20 text-white">
                <span className="rounded  text-neutral-800 ">
                    <h1 className="text-xl  sm:text-4xl md:text-3xl lg:text-5xl font-bold mb-6 md:mb-8 opacity-100 text-cayn-500 ">
                    Find buy learn
                    <br/> 
                   All  in one place !
                    </h1>
                    </span>
                    <button
                        className="px-6 py-3 bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition duration-300 active:scale-90"
                    >
                        EXPLORE MORE
                    </button>
                </div>

                {/* <div className="pt-24 bg-sky-200 rounded "> */}
                {/* <p className="flex  justify-center items-center font-bold text-3xl">Real  choices,  real  value,  real  people.</p> */}
                <div className="flex justify-evenly items-center bg-sky-200 rounded p-24">
                
                 <div className=" h-auto  w-auto rounded bg-white font-serif text-xl text-center p-24 leading-relaxed ">
                   Buy high-quality study notes from top students and educators, all in one place. Access affordable, well-organized resources to enhance your learning experience
                 <div className="h-32 w-32 mt-24 rounded">
                 
                  <video width="200" height="200" autoPlay loop >
                  <source src="/laptop.gif" type="video/mp4" />
                  </video>

                   </div>
                   </div>

                
                   {/* <div className=" rounded-full bg-white font-serif text-xl text-center p-24 ml-96 leading-relaxed ">
                   Never stop exploring and asking questions! The more you explore, the more you will discover. Learning is a journey, not a destination. Keep seeking knowledge and challenging yourself to grow.
                   </div> */}
                  
                {/* </div> */}
                </div>
                <Footer></Footer>
            </div>
           
        </>
    );
};

export default Buyer;



