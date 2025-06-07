
import React from 'react';

const Hero = () => {
  return (
    <>
    
      {/* <h1 className="text-5xl text-center mt-10 font-bold">Features</h1> */}
<div className="text-center mb-12">
  <h2 className="text-4xl font-pacifico  mt-8 text-custom-brown">Features</h2>
  <div className="w-24 h-1 bg-custom-brown mx-auto mt-2 rounded-full"></div>
</div>

      <div
        id="RemoveScrlbr"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 p-20 gap-4 w-full bg-[#f8f9fa] py-16 px-4"
      >
        {/* Card 1 */}
        <div className="flex flex-col  items-center p-4 rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl bg-white p-6 rounded-2xl shadow-md text-center">
          <img
            src="Home-Img/save.jpg"
            alt="img1"
            className="mb-4 h-64 w-72 transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <p className="font-semibold text-black">Save Notes</p>
          {/* <p className="text-black text-center">Keep your handwritten notes safe and organized in one place — access them anytime, from any device.</p> */}
        </div>

        {/* Card 2 */}
        <div className="flex flex-col  bg-gray-300 items-center p-4 rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl bg-white p-6 rounded-2xl shadow-md text-center">
          <img
            src="Home-Img/div2.jpg"
            alt="img2"
            className="mb-4 h-64 w-72 transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <p className="font-semibold text-black">Best Notes Available</p>
          <p className="text-black text-center">Get access to high-quality handwritten notes prepared by top-performing students.</p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col  bg-gray-300 items-center p-4 rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl bg-white p-6 rounded-2xl shadow-md text-center">
          <img
            src="Home-Img/div3.webp"
            alt="img3"
            className="mb-4 h-64 w-72 transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <p className="font-semibold text-black">Upload Your Notes</p>
          <p className="text-black text-center">Share your handwritten notes with others and help fellow learners while earning rewards.</p>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col  bg-gray-300 items-center p-4 rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl bg-white p-6 rounded-2xl shadow-md text-center">
          <img
            src="Home-Img/div43.webp"
            alt="img4"
            className="mb-4 h-64 w-72 transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <p className="font-semibold text-black">Buyer & Seller Platform</p>
          <p className="text-black text-center">A seamless platform where students can both upload and purchase notes with ease.</p>
        </div>
      </div>
    </>
  );
};

export default Hero;
