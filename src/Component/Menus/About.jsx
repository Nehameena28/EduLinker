// import React from 'react'
import './About.css'
import Footer from './Footer';

const About = () => {
  return (
    <div className='hero' >
      {/* <div className="heading">
        <h1>About Us</h1>
      </div> */}
      <div className="container" >
        <div className="hero-content">
          <b><h2>Welcome to EduLinker</h2></b>
          <p> EduLinker is an online platform designed to connect sellers and buyers of educational materials.Whether you're a seller looking to share your study notes or a student looking to buy quality resources,EduLinker provides an easy and secure marketplace for both.</p>
        </div>
        <div className="hero-img mt-5">
        <img
            src="public/img/about.avif"
            alt="about-img"
          />
        </div>
      </div>
      <div className="info flex ">
  <div className=" div1 mt-12 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white shadow-lg rounded-lg p-8 ml-5">
            <h2 className="text-2xl font-bold text-custom-blue">Sellers</h2>
            <p className="mt-4 text-gray-600">
              Share your study material and earn money. As a seller, you can upload PDFs, create listings, and set your own prices. EduLinker provides a user-friendly interface to manage your content and sales efficiently.
            </p>
          </div>
          <div className="div2 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-custom-blue">Buyers</h2>
            <p className="mt-4 text-gray-600">
              Find and buy study materials that suit your needs. Browse through a wide selection of high-quality PDFs uploaded by sellers. Once you find the right material, make secure payments and instantly download your purchase.
            </p>
          </div>
          <div className="div3 bg-white shadow-lg rounded-lg p-8 mr-5">
            <h2 className="text-2xl font-bold text-custom-blue ">Why Choose EduLinker?</h2>
            <p className="mt-4 text-gray-600">
              Our platform is designed with simplicity and security in mind. We prioritize your privacy and offer secure payment gateways. EduLinker also offers a rating and review system to ensure high-quality content for buyers and fair practices for sellers.
            </p>
          </div>
</div>
     </div>

     <div className="mt-16">
          <h2 className="text-3xl font-semibold text-custom-blue text-center">
            Join EduLinker Today!
          </h2>
          <p className="mt-4 text-lg  p-5 text-gray-500 text-center">
            Whether you're a seller or a buyer, EduLinker is the perfect place to share and discover study materials. Start browsing or uploading today and be a part of our growing community!
          </p>
        </div>
        <Footer/>
     </div>
  )
}

export default About;

