import { Helmet } from "react-helmet-async";
import FashionLayout from "../HomeFolder/FashionLayout";
import Banner from "../HomeFolder/Banner";
import ContactCard from "../HomeFolder/ContactCard";
import women from "../../assets/women.png";
import kids from "../../assets/kids.png";
import accessories from "../../assets/accerios.png";
import homedecor from "../../assets/homeDecor.png";
import toys from "../../assets/toys.png";
import { Link } from "react-router-dom";
import TopSellingProducts from "../HomeFolder/TopSellingProducts";
import PromoGrid from "./PromoGrid";
import HeroDesktop from "../HomeFolder/HeroDesktop";
import HeroMobile from "../HomeFolder/HeroMobile";
import FashionMobile from "../HomeFolder/FashionMobile";
import { useSelector , useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllCategories } from "../../Redux/slices/categorySlice";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../../Redux/slices/productSlice";
export default function MainHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    useEffect(()=>{
      dispatch(fetchAllCategories());
      dispatch(fetchAllProducts())
    },[dispatch])
    const categories  = useSelector((state) => state?.ctegory?.categories);
    const products = useSelector((state) => state?.products?.products);
  console.log(products)
  return (
    <>
      <Helmet>
        <title>MainHome - Nallakkar</title>
      </Helmet>

      <div className="hidden md:block">
        <HeroDesktop />
      </div>
      <div className="block md:hidden">
        <HeroMobile />
      </div>
      <section className="mt-8 py-8 mb-6">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-[30px] font-semibold text-black">
              Best For Your Categories
            </h2>
            <p className="text-base sm:text-lg md:text-[20px] font-normal text-black mb-8">
              Your Favorite Categories, Only the Best Inside
            </p>
          </div>

          {/* Categories */}
          <div
            className="
        flex 
        md:flex-wrap md:justify-center
        gap-x-6 sm:gap-x-8 gap-y-6 sm:gap-y-8 mt-6
        overflow-x-auto md:overflow-x-visible
        no-scrollbar
        px-1
      "
          >
            {
            // [
            //   { name: "Kids", img: kids, link: "/category/kids" },
            //   { name: "Women", img: women, link: "/category/women" },
            //   { name: "Toys", img: toys, link: "/category/toys" },
            //   {
            //     name: "Accessories",
            //     img: accessories,
            //     link: "/category/accessories",
            //   },
            //   {
            //     name: "Home Decor",
            //     img: homedecor,
            //     link: "/category/home-decor",
            //   },
            // ]
            categories?.map((cat) => (
              <Link
                to={"/category/kids"}
                key={cat.name}
                className="flex flex-col items-center cursor-pointer group flex-shrink-0"
                onClick={() => {localStorage.setItem("selectedCategoryId", cat?.id)
                  navigate("category/kids")}
                }

              >
                {/* Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:border-gray-300">
                  <img
                    src={cat.image[0]}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>
                {/* Text */}
                <span className="text-sm sm:text-[16px] md:text-[18px] mt-2 font-semibold text-black group-hover:text-pink-500 transition-colors duration-300 ease-in-out">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="hidden md:block">
        <FashionLayout></FashionLayout>
      </div>
      <div className="block md:hidden">
        <FashionMobile></FashionMobile>
      </div>

      {/* Top Selling Products */}
      <TopSellingProducts></TopSellingProducts>

      {/* Banner */}
      <Banner></Banner>

      <PromoGrid></PromoGrid>

      {/* ContactCard */}
      <div className="mb-11">
        {" "}
        <ContactCard></ContactCard>
      </div>
    </>
  );
}
