import newoffer from "../../assets/newoffer.png";
import banner from "../../assets/portrat.png";

const Banner = () => (
  <div
    className="w-full h-[300px] md:h-[400px] relative flex items-center"
    style={{
      backgroundImage: `url(${banner})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Overlay (optional for better text contrast on mobile) */}
    <div className="absolute inset-0 bg-black/10 md:bg-transparent"></div>

    {/* Content */}
    <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:items-center justify-between px-4 md:px-12 h-full">
      {/* Left Side */}
      <div className="flex flex-col justify-center h-full max-w-lg text-center md:text-left md:pl-[4rem]">
        <img
          src={newoffer}
          alt="New Offers"
          className="h-20 w-auto mb-2 md:h-32 mx-auto md:mx-0"
        />
        <p className="text-[#5e4b39] text-sm md:text-base mt-2 mb-5 max-w-sm mx-auto md:mx-0">
          Shop more, save more. Get fast, free delivery right to your door.
        </p>
        <button className="bg-primary px-5 py-2 md:px-6 font-bold text-white w-32 md:w-36 shadow hover:bg-rose transition mx-auto md:mx-0 text-nowrap">
          SHOP NOW
        </button>
      </div>

      {/* Right Side Spacer for desktop */}
      <div className="hidden md:block w-[40%]"></div>
    </div>
  </div>
);

export default Banner;
