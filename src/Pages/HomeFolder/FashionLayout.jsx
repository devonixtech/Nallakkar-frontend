import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getBanners } from "../../Redux/slices/bannerSlice";
import { useDispatch, useSelector } from "react-redux";


export default function FashionLayout() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const { banners, loading } = useSelector((state) => state.banners);

  return (
    <div className="flex flex-wrap overflow-x-hidden">
      {/* Left main block (desktop unchanged) */}
      <div
        className="w-full md:w-1/2 relative flex items-center justify-center p-3 md:p-8"
        style={{ height: "553px" }}
      >
        <img
          src={banners && banners.length > 0 ? banners[1].images : ""}
          alt="Main Fashion"
          className="absolute right-0 bottom-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
        />
        {/* Mobile overlay title */}
        <div className="absolute inset-x-0 bottom-3 md:hidden px-4">
          <div className="bg-white/80 backdrop-blur-sm text-gray-900 inline-block px-3 py-1 rounded">
            {/* New Fashion */}
          </div>
        </div>
      </div>

      {/* Right blocks grid (desktop unchanged) */}
      <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-4 pl-0 md:pl-4">
        {/* Middle two cards: side-by-side on mobile and desktop */}
        <div className="flex flex-row gap-3 md:gap-1 mt-3 md:mt-0">
          {/* Women Trendy */}
          <div className="bg-black relative w-1/2 md:flex-1 overflow-hidden shadow">
            <img
              src={banners && banners.length > 0 ? banners[2].images : ""}
              alt="Women Trendy"
              className="object-cover w-full h-44 sm:h-56 md:h-72 opacity-100"
            />
            {/* Text Content */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">

              {/* <h2 className="text-white font-normal text-sm sm:text-xl">
                Women <br />
                <span className="text-white text-xl sm:text-3xl font-semibold">
                  Trendy
                </span>
              </h2> */}
              <Link
                to={"/category/kids"}
                className="py-1.5 px-4 bg-white text-black text-xs sm:text-sm md:text-base font-semibold tracking-wide"
              >
                SHOP NOW
              </Link>

            </div>
            {/* Vertical Side Text */}
            {/* <div className="absolute top-1/2 right-1 md:right-0 -translate-y-1/2 text-[10px] sm:text-xs md:text-sm text-gray-300 rotate-90 tracking-widest">
              fashion choices
            </div> */}
          </div>

          {/* Find your Style */}
          <div className="bg-gray-800 relative w-1/2 md:flex-1 overflow-hidden shadow">
            <img
              src={banners && banners.length > 0 ? banners[3].images : ""}
              alt="Find your Style"
              className="object-cover w-full h-44 sm:h-56 md:h-72 opacity-100"
            />

            {/* Text + Button */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">

              {/* <h2 className="text-white font-bold text-lg sm:text-2xl md:text-2xl leading-tight">
                Find your <br />
                <span className="text-white">style</span>
              </h2> */}
              <Link
                to={"/category/kids"}
                className="py-1.5 px-4 bg-white text-black text-xs sm:text-sm md:text-base font-semibold tracking-wide"
              >
                SHOP NOW
              </Link>

            </div>
          </div>
        </div>

        {/* Bottom banner section: unchanged same as desktop (same height/width) */}
        <div className="md:flex gap-3 md:gap-4 items-stretch">
          <Link
            to={"/category/kids"}
            className="w-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${banners && banners.length > 0 ? banners[4].images : ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "248px",
            }}
          >
          </Link>
        </div>
      </div>
    </div>
  );
}
