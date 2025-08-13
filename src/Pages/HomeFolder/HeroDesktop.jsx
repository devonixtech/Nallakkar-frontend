import React from "react";
import modelImg from "../../assets/banner1.png";
import NallakkarSVG from "../../assets/NALLAKKAR.png";

const HeroDesktop = () => {
  return (
    <div>
      <section className="h-auto md:h-[530px] relative bg-white overflow-hidden shadow-[0px_3px_6px_rgba(0,0,0,0.16)] border-b-2 py-10 md:py-14">
        {/* Background SVG */}
        <img
          src={NallakkarSVG}
          alt="NALLAKKAR"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0 md:scale-100 scale-90"
        />

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-center justify-between px-6 md:px-[2rem] py-6 md:py-[3rem] gap-6 md:gap-10">
          {/* Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="font-bold text-[22px] md:text-[27px]">
              Your Next Look Starts Here —{" "}
              <span className="text-rose font-bold">NALLAKKAR</span>
            </h2>
            <p className="text-[#17171A] font-semibold leading-tight mt-6 md:mt-[13rem] text-[18px] md:text-[21px]">
              Step into the world of NALLAKKAR – where tradition meets modern
              elegance. From timeless weaves to bold essentials, discover your
              next signature look.
            </p>
            <button className="mt-6 px-6 py-3 bg-[#1a214c] text-white font-semibold text-sm hover:bg-[#EC3557] transition">
              SHOP NOW
            </button>
          </div>
        </div>

        {/* Image Section - Hidden on Small Devices */}
        <div className="hidden md:flex absolute right-0 top-0 h-full w-auto justify-center items-center z-10">
          <img
            src={modelImg}
            alt="Model"
            className="h-full object-contain pt-3"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroDesktop;
