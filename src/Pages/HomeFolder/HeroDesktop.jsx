import  { useEffect, useRef } from "react";
import gsap from "gsap";
import modelImg from "../../assets/banner.png";
import NallakkarSVG from "../../assets/NALLAKKAR.png";
import { Link } from "react-router-dom";

const HeroDesktop = () => {
  const bgRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Background zoom-in from small to normal (slower)
    tl.fromTo(
      bgRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.5 }, // was 1.2
      0
    );

    // Model image slide in from right (slower)
    tl.fromTo(
      imgRef.current,
      { x: "100%", opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5 }, // was 1
      0.4 // little more delay so bg is clearly visible first
    );
  }, []);

  return (
    <>
      <section className="h-auto lg:h-[550px] md:h-[490px] relative bg-white overflow-hidden shadow-[0px_3px_6px_rgba(0,0,0,0.16)] border-b-2 py-10 lg:py-14 md:py-6">
        {/* Background SVG */}
        <img
          ref={bgRef}
          src={NallakkarSVG}
          alt="NALLAKKAR"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0 md:scale-100 scale-90"
        />

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-[2rem] py-6 md:py-[3rem] gap-6 md:gap-10">
          {/* Text Section - Static */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="font-bold text-[22px] lg:text-[27px] md:text-[20px]">
              Your Next Look Starts Here —{" "}
              <span className="text-rose font-bold">NALLAKKAR</span>
            </h2>
            <p className="text-[#17171A] font-semibold leading-tight mt-8 lg:mt-[14rem] md:mt-[12rem] text-[18px] lg:text-[21px] md:text-[18px]">
              Step into the world of NALLAKKAR – where tradition meets modern
              elegance. From timeless weaves to bold essentials, discover your
              next signature look.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-block px-7 py-3 bg-[#1a214c] text-white font-semibold text-sm hover:bg-[#EC3557] transition rounded"
            >
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div
          ref={imgRef}
          className="hidden md:flex absolute right-0 top-0 h-full w-auto justify-center items-center z-10"
        >
          <img
            src={modelImg}
            alt="Model"
            className="
      h-full object-contain pt-3
      md:max-w-[550px]     
      lg:max-w-none        
    "
          />
        </div>
      </section>
    </>
  );
};

export default HeroDesktop;
