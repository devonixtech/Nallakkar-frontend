import React, { useState , useEffect} from "react";
import { Heart } from "lucide-react";
import man from "../../assets/man.png";
import shoes from "../../assets/mens.png";
import jacket from "../../assets/women-white.png";
import women from "../../assets/dancing-team-studio.png";
import doll from "../../assets/3d-children.png";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../../Redux/slices/productSlice";
import { useSelector , useDispatch } from "react-redux";
const products = [
  {
    title: "Men Regular Fit Self Design Light Shirt",
    price: "₹ 529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    image: man,
  },
  {
    title: "Men Regular Fit Self Design Light Shirt",
    price: "₹ 529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    image: shoes,
  },
  {
    title: "Men Regular Fit Self Design Light Shirt",
    price: "₹ 529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    image: jacket,
  },
  {
    title: "Men Regular Fit Self Design Light Shirt",
    price: "₹ 529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    image: women,
  },
  {
    title: "Men Regular Fit Self Design Light Shirt",
    price: "₹ 529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    image: doll,
  },
];

const tabs = ["Featured", "Latest", "Best Sellers"];

export default function TopSellingProducts() {
  const [wishlist, setWishlist] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  const products = useSelector((state) => state?.products?.products);
  const toggleWishlist = (index) => {
    setWishlist((prev) =>
      prev.includes(index)
        ? prev.filter((id) => id !== index)
        : [...prev, index]
    );
  };
  
  return (
    <section className="px-4 md:px-6 py-11 font-montserrat">
      <h2 className="text-center text-[22px] md:text-[30px] font-semibold mb-6">
        Top Selling Products
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-3 md:gap-4 mb-8">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`px-3 md:px-4 py-1 text-sm md:text-[18px] font-semibold ${
              tab === "Featured"
                ? "bg-rose text-white"
                : "text-black hover:text-rose"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-10 px-2 md:px-12 scrollbar-hide">
        {products?.map((item, index) => (
          <div
            key={index}
            className={`group text-center min-w-[160px] sm:min-w-[200px] md:min-w-0 bg-white transition-all duration-300 transform ${
              activeCard === index
                ? "shadow-xl scale-[1.02]"
                : "hover:shadow-lg hover:-translate-y-1"
            }`}
            onMouseDown={() => setActiveCard(index)}
            onMouseUp={() => setActiveCard(null)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <Link to={`/product/${item.id}`}>
                {" "}
                <img
                  src={item?.image[0]}
                  alt={item?.name}
                  className={`w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover transition-transform duration-300 ${
                    activeCard === index ? "scale-105" : "group-hover:scale-105"
                  }`}
                />
              </Link>

              {/* Hover Add to Cart Button with Icon */}
              <Link to={`/product/${item.id}`}>
                {" "}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    to={"/cart"}
                    className="flex items-center gap-2 bg-white px-4 py-2 text-sm font-medium rounded shadow hover:bg-darkpink hover:text-white transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13l-1.5-6M9 21a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                    ADD TO CART
                  </Link>
                </div>
              </Link>

              {/* Rating */}
              <div className="absolute bottom-2 left-2 bg-white text-xs px-2 py-1 rounded shadow text-gray-700 flex items-center gap-1">
                <span>{item.rating}</span>  <span>{item.reviews}</span>
              </div>

              {/* Heart Icon */}
              <button
                onClick={() => toggleWishlist(index)}
                className="absolute top-2 right-2 p-1 transition hover:scale-110"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    wishlist.includes(index)
                      ? "fill-rose text-rose"
                      : "text-white"
                  }`}
                  strokeWidth={2}
                />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-1 text-left px-2">
              Nallakkar
            </p>

            <p className="text-sm md:text-base font-medium text-gray-800 mt-1 text-left px-2 line-clamp-2">
              {item.title}
            </p>

            <div className="flex justify-between items-center gap-2 mt-1 px-2 pb-2">
              <span className="text-darkpink font-semibold text-sm">
                {item.price}
              </span>
              <span className="text-gray-500 text-xs"> ( {item.discount}% )</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (hidden on mobile) */}
      <div className="hidden md:flex justify-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-pinkLight hover:bg-pink text-sm text-white">
          &lt;
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-darkpink text-white text-sm">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-pinkLight hover:bg-pink text-sm text-white">
          &gt;
        </button>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
