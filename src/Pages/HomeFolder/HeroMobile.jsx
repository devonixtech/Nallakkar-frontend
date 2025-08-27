import { FiMapPin, FiSearch, FiCamera } from "react-icons/fi";
import modelImg from "../../assets/banner.png";
import NallakkarSVG from "../../assets/NALLAKKAR.png";
import { Link } from "react-router-dom";

const HeroMobile = () => {
  return (
    <div className="bg-white font-sans max-w-full mx-auto border">
      <main>
        <div className="p-4">
          {" "}
          {/* Location Bar */}
          <div className="flex items-center text-gray-800 text-xs mb-3">
            <FiMapPin className="text-black mr-2" size={16} />
            <span>Lingenahlli., Madhugiri,Tumakuru, Karnataka-572132.</span>
          </div>
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for more products"
              className="w-full pl-10 pr-10 py-2 border rounded-full shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <FiCamera className="text-gray-900" />
            </div> */}
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gray-50 py-4 px-2 rounded-lg overflow-hidden h-[200px]">
          <img
            src={NallakkarSVG}
            alt="NALLAKKAR"
            className="absolute inset-0 w-full -mt-[20px] h-full object-contain pointer-events-none z-0 md:scale-100 scale-105"
          />
          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center mb-2">
              <h2 className="font-bold text-[13px]">
                Your Next Look Starts Here —{" "}
                <span className="text-rose font-bold">NALLAKKAR</span>
              </h2>
            </div>

            <p className="text-[#17171A] font-semibold leading-tight mt-[66px] text-[10px]">
              Step into the world of NALLAKKAR – where <br /> tradition meets
              modern elegance. From timeless <br /> weaves to bold essentials,
              discover your next <br /> signature look.
            </p>

            <Link
              to="/login"
              className="bg-primary text-white text-[9px] font-bold py-1 px-3 w-max hover:bg-rose mt-2 transition-colors"
            >
              SHOP NOW
            </Link>
          </div>

          {/* Model Image */}
          <div className="absolute right-[-90px] bottom-0 w-[340px] h-[211px] z-10">
            <img
              src={modelImg} // Replace with your actual model image
              alt="Model showcasing Nallakkar fashion"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroMobile;
