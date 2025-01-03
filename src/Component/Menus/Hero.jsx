import React from 'react';

const Hero = () => {
  return (
    <>
      <b><h1 className="text-5xl text-center mt-10 ">Features </h1></b>

      <div
        id="RemoveScrlbr"
        className="grid grid-cols-1 sm:grid-cols-2   md:grid-cols-2 lg:grid-cols-4     p-10   gap-2 w-full"
      >
        {/* First Div */}
        <div className="flex flex-col items-center p-4 rounded-xl hover:scale-105 transition-all duration-300 ease-in-out">
          <img
            src="Home-Img/div1.jpeg"
            alt="img1"
            className="mb-4 h-64 w-72 transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <p className="text-lg font-semibold text-black hover:text-blue-500">Save your time & find notes</p>
        </div>

        {/* Second Div */}
        <div className="flex flex-col items-center p-4 rounded-xl  hover:scale-105 transition-all duration-300 ease-in-out">
          <img
            src="Home-Img/div2.jpg"
            alt="img2"
            className="mb-4 h-64 w-72 transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <p className="text-lg font-semibold text-black hover:text-blue-500">The Best Hand Written Notes Are Here!</p>
        </div>

        {/* Third Div */}
        <div className="flex flex-col items-center p-4 rounded-xl  hover:scale-105 transition-all duration-300 ease-in-out">
          <img
            src="Home-Img/div3.webp"
            alt="img3"
            className="mb-4 h-64 w-72 transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <p className="text-lg font-semibold text-black hover:text-blue-500">We Provide the Facilities to Upload Your Notes</p>
        </div>

        {/* Fourth Div */}
        <div className="flex flex-col items-center p-4 rounded-xl hover:scale-105 transition-all duration-300 ease-in-out">
          <img
            src="Home-Img/div43.webp"
            alt="img4"
            className="mb-4 h-64 w-72 transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <p className="text-lg font-semibold mb-0 text-black hover:text-blue-500">The Best Platform for Both Buyer and Seller</p>
        </div>
      </div>
    </>
  );
};

export default Hero;
