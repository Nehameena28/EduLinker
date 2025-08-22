import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero"
import './home.css'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
    {/* <Navbar></Navbar> */}
    <div className="relative w-full min-h-screen mt-0">
 
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover sm:bg-cover min-h-screen md:bg-cover lg:bg-cover bg-center "
        style={{
          backgroundImage: "url('/Home-Img/myImage.jpg')",
          opacity: 0.7,
        }}
      ></div>
      
      <div className="relative flex flex-col items-start justify-center pl-6 md:pl-20 text-black min-h-screen">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 opacity-100 leading-loose text-left max-w-4xl pb-4">
          Unlock the Knowledge<br />
          you need with<br />
          our wide selection of<br />
          study materials.
        </h1>

        <Link to="/Sellspage"><button
          className="px-6 py-3 bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition duration-300 active:scale-90"
        >
          EXPLORE MORE
        </button>
        </Link>
      </div>
    </div>
     <Hero></Hero>
     
    </>
  );
};

export default Home;
