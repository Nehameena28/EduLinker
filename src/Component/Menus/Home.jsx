import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero"
import Footer from "./Footer"

const Home = () => {
  return (
    <>
    <div className="relative w-full h-screen mt-1">
 
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover sm:bg-cover h-screen md:bg-cover lg:bg-cover bg-center "
        style={{
          backgroundImage: "url('/Home-Img/myImage.jpg')",
          opacity: 0.8,
        }}
      ></div>

      
      <div className="relative flex flex-col items-start justify-center h-full pl-6 md:pl-20 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-bold mb-6 md:mb-8 opacity-100 leading-tight">
          Unlock the Knowledge
          <br />
          you need with
          <br />
          our wide selection of
          <br />
          study materials.
        </h1>
        <button
          className="px-6 py-3 bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition duration-300 active:scale-90"
        >
          EXPLORE MORE
        </button>
      </div>
    </div>
     <Hero></Hero>
     <Footer></Footer>
    </>
  );
};

export default Home;
