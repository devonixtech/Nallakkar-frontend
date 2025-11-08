import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../../Redux/slices/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchWishlistByUserId, toggleWishlist } from "../../Redux/slices/wishlistSlice";
import { fetchCartByUserId } from "../../Redux/slices/cartSlice";
// const products = [
//   {
//     title: "Men Regular Fit Self Design Light Shirt",
//     price: "₹ 529.00",
//     discount: "(off 35%)",
//     rating: "4.2",
//     reviews: "1.2K",
//     image: man,
//   },
//   {
//     title: "Men Regular Fit Self Design Light Shirt",
//     price: "₹ 529.00",
//     discount: "(off 35%)",
//     rating: "4.2",
//     reviews: "1.2K",
//     image: shoes,
//   },
//   {
//     title: "Men Regular Fit Self Design Light Shirt",
//     price: "₹ 529.00",
//     discount: "(off 35%)",
//     rating: "4.2",
//     reviews: "1.2K",
//     image: jacket,
//   },
//   {
//     title: "Men Regular Fit Self Design Light Shirt",
//     price: "₹ 529.00",
//     discount: "(off 35%)",
//     rating: "4.2",
//     reviews: "1.2K",
//     image: women,
//   },
//   {
//     title: "Men Regular Fit Self Design Light Shirt",
//     price: "₹ 529.00",
//     discount: "(off 35%)",
//     rating: "4.2",
//     reviews: "1.2K",
//     image: doll,
//   },
// ];

const tabs = ["Featured", "Latest", "Best Sellers"];

export default function TopSellingProducts() {
  const [activeCard, setActiveCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Latest"); // default is Latest
  const productsPerPage = 10;
  const dispatch = useDispatch();
const userString = localStorage.getItem("user");

// Parse it into an object
const user = JSON.parse(userString);
// Access the id
const userId = user?.id;
console.log(userId);  

  const products = useSelector((state) => state?.products?.products);
  const wishlist = useSelector((state) => state.wishlist.items || []);
  const cart = useSelector((state) => state.cart.items || []);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistByUserId(userId));
    }
  }, [dispatch, userId]);

      useEffect(() => {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      const userId = user?.id;
    
      if (userId) {
        dispatch(fetchCartByUserId(userId))
          .unwrap()
          .then((res) => console.log("Fetched cart:", res))
          .catch((err) => console.error("Fetch error:", err));
      }
    }, [dispatch]);

  const handleWishlist = async (productId) => {
    const isFavourite = !wishlist?.some((w) => w.productId === productId);
    await dispatch(toggleWishlist({ productId, userId, isFavourite })).unwrap();
    dispatch(fetchWishlistByUserId(userId));
  };

  // --- Filter products based on active tab ---
  const filteredProducts =
    activeTab === "Featured"
      ? products?.filter((p) => p.featuredStatus === "1")
      : products;

  // --- Pagination ---
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil((filteredProducts?.length || 0) / productsPerPage) || 1;


  return (
    <section className="px-4 md:px-6 py-11 font-montserrat">
      <h2 className="text-center text-[22px] md:text-[30px] font-semibold mb-6">
        Top Selling Products
      </h2>

      {/* Tabs */}
    <div className="flex justify-center gap-3 md:gap-4 mb-8">
  {tabs.map((tab, idx) => {
    const isClickable = tab === "Featured" || tab === "Latest"; // Featured & Latest clickable
    return (
      <button
        key={idx}
        onClick={() => {
          if (isClickable) setActiveTab(tab);
        }}
        className={`px-3 md:px-4 py-1 text-sm md:text-[18px] font-semibold ${
          activeTab === tab
            ? "bg-rose text-white"
            : "text-black hover:text-rose"
        } ${!isClickable ? "cursor-default hover:text-black" : ""}`}
      >
        {tab}
      </button>
    );
  })}
</div>


      {/* Products */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-10 px-2 md:px-12 scrollbar-hide">
        {currentProducts?.map((item, index) => {
                    const isInCart = cart?.some((c) => c.productId === item.id);

                    return (
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
                <img
                  src={item?.image[0]}
                  alt={item?.name}
                  className={`w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover transition-transform duration-300 ${
                    activeCard === index ? "scale-105" : "group-hover:scale-105"
                  }`}
                />
              </Link>

              {/* Hover Add to Cart Button */}
              <Link to={`/product/${item.id}`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 {isInCart ? (
                   
                
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
                   GO TO CART
                  </Link>
                   ):(
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
                   )}
                </div>
              </Link>

              {/* Rating */}
              <div className="absolute bottom-2 left-2 bg-white text-xs px-2 py-1 rounded shadow text-gray-700 flex items-center gap-1">
                <span>{item?.rating}</span> . <span>{item?.reviewCount}</span>
              </div>

              {/* Heart Icon */}
              <button
                onClick={() => handleWishlist(item.id)}
                className="absolute top-2 right-2 p-1 transition hover:scale-110"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    wishlist.some((w) => w.productId == (item.id || item.productId))
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
              {item?.name}
            </p>

            <div className="flex justify-between items-center gap-2 mt-1 px-2 pb-2">
              <span className="text-darkpink font-semibold text-sm">
                {item.final_price}
              </span>
              <span className="text-gray-500 text-xs"> ( {item.discount}% )</span>
            </div>
          </div>
                  
          
                 );
        })}

      </div>

      {/* Pagination */}
      <div className="hidden md:flex justify-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-pinkLight hover:bg-pink text-sm text-white disabled:opacity-50"
        >
          &lt;
        </button>

        {[...Array(totalPages)]?.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
              currentPage === idx + 1
                ? "bg-darkpink text-white"
                : "bg-pinkLight hover:bg-pink text-white"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-pinkLight hover:bg-pink text-sm text-white disabled:opacity-50"
        >
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
