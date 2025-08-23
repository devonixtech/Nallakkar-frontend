import React from "react";
import { FiHome, FiUser, FiGrid, FiShoppingCart } from "react-icons/fi";
import banner1 from "../../assets/Group 328.png";
import blackgirl from "../../assets/fashionale.png";
import couple from "../../assets/couple.png";
import mainImage from "../../assets/sunglasses.png"; // Image with three children

// Helper component for the navigation icons
const NavIcon = ({ icon }) => (
  <button className="text-white text-2xl p-2 hover:bg-gray-700 rounded-full">
    {icon}
  </button>
);

// Main component for the fashion layout
const FashionMobile = () => {
  return (
    <div className="bg-white font-sans">
      {/* Sticky Header */}
      {/* <header className="sticky top-0 z-50 bg-gray-800 shadow-md">
        <nav className="container mx-auto flex items-center justify-between p-2">
          <div className="flex items-center space-x-2">
            <NavIcon icon={<FiHome />} />
            <NavIcon icon={<FiUser />} />
            <NavIcon icon={<FiGrid />} />
          </div>
          <div>
            <NavIcon icon={<FiShoppingCart />} />
          </div>
        </nav>
      </header> */}

      {/* Main Content */}
      <main>
        {/* Section 1: New Fashion */}
        <section
          className="relative h-[60vh] md:h-[80vh] bg-cover bg-center text-white flex items-center"
          style={{
            backgroundImage: `url(${banner1})`,
          }} // Replace with your image
        >
          <div className="absolute inset-0"></div>
          {/* <div className="relative z-10 p-8 md:p-12">
            <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider">
              New
            </h2>
            <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider">
              Fashion
            </h2>
            <div className="mt-4">
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                SS'25
              </span>
            </div>
          </div> */}
        </section>

        {/* Section 2: Women Trendy */}
        <section
          className="relative h-[60vh] md:h-[80vh] bg-cover bg-center bg-black text-white flex items-center justify-center"
          style={{
            backgroundImage: `url(${blackgirl})`,
          }} // Replace with your image
        >
          <div className="absolute inset-0"></div>
          <div className="relative z-10 text-center p-8">
            <h3 className="text-4xl md:text-6xl font-bold">Women</h3>
            <h3 className="text-4xl md:text-6xl font-bold">Trendy</h3>
            <button className="mt-6 bg-white text-black font-semibold px-8 py-3 hover:bg-gray-200 transition-colors duration-300">
              SHOP NOW
            </button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 transform -rotate-90 origin-center">
            <p className="text-white uppercase tracking-[0.2em] text-sm whitespace-nowrap">
              fashion choices
            </p>
          </div>
        </section>

        {/* Section 3: Find your style */}
        <section
          className="relative h-[60vh] md:h-[80vh] bg-cover bg-center text-white flex items-end justify-end"
          style={{
            backgroundImage: `url(${couple})`,
          }} // Replace with your image
        >
          <div className="absolute inset-0 bg-black opacity-25"></div>
          <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col space-y-2">
            <span className="w-2 h-2 border-2 border-white rounded-full"></span>
            <span className="w-2 h-2 border-2 border-white rounded-full"></span>
            <span className="w-2 h-2 border-2 border-white rounded-full"></span>
          </div>
          <div className="relative z-10 p-8 md:p-12 text-right">
            <h3 className="text-4xl md:text-6xl font-bold leading-tight">
              Find your <br /> style
            </h3>
            <button className="mt-6 bg-white text-black font-semibold px-8 py-3 hover:bg-gray-200 transition-colors duration-300">
              SHOP NOW
            </button>
          </div>
        </section>

        {/* Section 4: Kids Fashion */}
        <section
          className="relative h-[60vh] md:h-[80vh] bg-cover bg-center text-white flex items-end"
          style={{
            backgroundImage: `url(${mainImage})`,
          }} // Replace with your image
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 p-8 md:p-12">
            <h3
              className="text-pink-500 text-3xl md:text-4xl text-rose"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Playful 
            </h3>
            <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider">
              Fashion
            </h2>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FashionMobile;
