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
  const [currentPage, setCurrentPage] = useState(1); // ✅ page state
  const productsPerPage = 10; // ✅ har page me 10 products

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const products = useSelector((state) => state?.products?.products);

  // ✅ Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products?.length / productsPerPage);

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

      {/* Products (sirf current page ke products dikhayenge) */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-10 px-2 md:px-12 scrollbar-hide">
        {currentProducts?.map((item, index) => (
          <div key={index} className="group text-center min-w-[160px] sm:min-w-[200px] md:min-w-0 bg-white transition-all duration-300 transform">
            {/* product card content same as before */}
            <div className="relative overflow-hidden rounded-t-lg">
              <Link to={`/product/${item.id}`}>
                <img
                  src={item?.image[0]}
                  alt={item?.name}
                  className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
                />
              </Link>
            </div>
            <p className="text-sm font-medium mt-2">{item?.name}</p>
            <p className="text-darkpink font-semibold">{item?.price}</p>
          </div>
        ))}
      </div>

      {/* ✅ Pagination */}
      <div className="hidden md:flex justify-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-pinkLight hover:bg-pink text-sm text-white disabled:opacity-50"
        >
          &lt;
        </button>

        {[...Array(totalPages)].map((_, idx) => (
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
    </section>
  );
}

