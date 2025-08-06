import { Helmet } from "react-helmet-async";
import modelImg from "../assets/banner1.png";
import NallakkarSVG from "../assets/NALLAKKAR.png";
import categories from "../assets/categories.png";
import TopSellingProducts from "./HomeFolder/TopSellingProducts";
import FashionLayout from "./HomeFolder/FashionLayout";
import Banner from "./HomeFolder/Banner";
import AboutNallakkar from "./HomeFolder/AboutNallakkar";
import Features from "./HomeFolder/Features";
import Testimonial from "./HomeFolder/Testimonial";
import ContactCard from "./HomeFolder/ContactCard";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home - Nallakkar</title>
      </Helmet>

   <section className="h-[530px] relative bg-white overflow-hidden shadow-[0px_3px_6px_rgba(0,0,0,0.16)] border-b-2 py-14">
  <img
    src={NallakkarSVG}
    alt="NALLAKKAR"
    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
  />

  {/* Main Content */}
  <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between px-[5rem] py-20 gap-10">
    {/* Text Section */}
    <div className="w-full md:w-1/2 font-[Montserrat]">
      <h2 className="font-bold text-[25px]">
        Your Next Look Starts Here —
        <span className="text-[#EC3557] font-bold">NALLAKKAR</span>
      </h2>
      <p className=" text-gray-700 font-semibold leading-tight mt-44 text-[20px]">
        Step into the world of NALLAKKAR – where tradition meets modern
        elegance. From timeless weaves to bold essentials, discover your
        next signature look.
      </p>
      <button className="mt-6 px-6 py-3 bg-[#1a214c] text-white font-semibold text-sm hover:bg-[#EC3557] transition">
        SHOP NOW
      </button>
    </div>
  </div>

  {/* Image Section - Positioned Absolutely */}
  <div className="absolute right-0 top-0 h-full w-auto flex justify-center items-center z-10">
    <img src={modelImg} alt="Model" className="h-full object-contain pt-3" />
  </div>
</section>

<section className="font-[Montserrat] mt-12 py-8 mb-6">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center">
      <h2 className="text-3xl md:text-[30px] font-semibold text-gray-900">
        Best For Your Categories
      </h2>
      <p className="text-lg md:text-[20px] font-normal text-gray-600 mb-8">
        Your Favorite Categories, Only the Best Inside
      </p>
    </div>

    <div className="flex justify-center flex-wrap gap-x-8 gap-y-8 mt-6">
      {[
        { name: "Kids", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkZ4XJYKHxRm9m3EaE_GLBqkhOrCw4vMqYBQ&s" },
        { name: "Women", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Sqn9Ln7sYlEAsJlB4r0j410-FWogLYpmNw&s" },
        { name: "Toys", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw2Gf4yZxDyYVXms8B_cy-bjUd9zcKUNEIRQ&s" },
        {
          name: "Accessories",
          img: "https://media.istockphoto.com/id/531786318/photo/top-view-of-female-fashion-accessories.jpg?s=612x612&w=0&k=20&c=kA9wOhgfDQiz7RO6GoEztqlPNGaTxZyFwf14991aMM0=",
        },
        { name: "Home Decor", img: "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2022-06/modern-living-room-interior-with-sofa-green-plants-lamp-table-dark-wall-background_0.jpg" },
      ].map((cat) => (
        <div key={cat.name} className="flex flex-col items-center cursor-pointer">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white transition-all duration-300 ease-in-out">
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm md:text-base mt-2 font-medium text-gray-800 transition-colors duration-300 ease-in-out">
            {cat.name}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Banner Grid */}
      <FashionLayout></FashionLayout>

      {/* Top Selling Products */}
      <TopSellingProducts></TopSellingProducts>

      {/* Banner */}
      <Banner></Banner>

      {/* AboutNallakkar */}
      <AboutNallakkar></AboutNallakkar>

      {/* features */}
      <Features></Features>

      {/* Testimonial */}
      <Testimonial></Testimonial>

      {/* ContactCard */}
      <ContactCard></ContactCard>
    </>
  );
}
