import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiHeart } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Heart } from "lucide-react";
import ShoppingBag from "../../assets/shopping-bags.png";
import man from "../../assets/man.png";
import shoes from "../../assets/mens.png";
import jacket from "../../assets/women-white.png";
import women from "../../assets/dancing-team-studio.png";
import doll from "../../assets/3d-children.png";
import girls from "../../assets/girls.png";
import boy from "../../assets/boys.png";
import infant from "../../assets/infant.png";
import toy from "../../assets/access.png";
import access from "../../assets/toy.png";
import { Link } from "react-router-dom";

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

const categories = [
  {
    name: "Girl",
    img: girls,
  },
  {
    name: "Boy",
    img: boy,
  },
  {
    name: "Infant",
    img: infant,
  },
  {
    name: "Toys",
    img: toy,
  },
  {
    name: "Accessories",
    img: access,
  },
];

const filterGroups = [
  {
    title: "Category",
    options: ["Casual Wear", "Night Suit", "Frocks", "Formal Wear", "Shoes"],
  },
  {
    title: "Brand",
    options: ["Nike", "Adidas", "Puma", "HRX", "Levis"],
  },
  {
    title: "Price",
    options: ["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "Above ₹2000"],
  },
  {
    title: "Discount",
    options: ["10% or more", "20% or more", "30% or more", "50% or more"],
  },
];

const sortOptions = [
  "Price: Low to High",
  "Price: High to Low",
  "Newest First",
  "Best Sellers",
];

const CategoryPill = ({ name, img, isSelected, onClick }) => (
  <div
    className="text-center flex-shrink-0 cursor-pointer"
    onClick={() => onClick(name)}
  >
    <div className="relative w-40 h-24 mx-auto rounded-full overflow-hidden">
      <img src={img} alt={name} className="w-full h-full object-cover" />
      {/* This overlay only appears if the category is selected */}
      {isSelected && (
        <div className="absolute inset-0 bg-pink bg-opacity-50 flex items-center justify-center">
          <span className="text-darkpink font-bold text-lg">{name}</span>
        </div>
      )}
    </div>
    {/* The text color below the oval also changes on selection */}
    <p
      className={`mt-2 text-sm font-semibold ${
        isSelected ? "bg-opacity-35" : "text-gray-700"
      }`}
    >
      {name}
    </p>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="bg-white p-3 rounded-lg shadow hover:shadow-md transition cursor-pointer">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-40 object-cover rounded"
    />
    <h3 className="text-sm font-medium mt-2 line-clamp-2">{product.name}</h3>
    <p className="text-red-600 font-semibold">₹{product.price}</p>
  </div>
);

const ProductListing = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Girl");
  const [wishlist, setWishlist] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  const toggleWishlist = (index) => {
    setWishlist((prev) =>
      prev.includes(index)
        ? prev.filter((id) => id !== index)
        : [...prev, index]
    );
  };

  return (
    <div>
      <div
        className="w-full bg-center bg-cover"
        style={{
          backgroundImage: `url(${ShoppingBag})`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-11">
          {/* [CHANGED] The mapping now passes selection state and click handler to each pill */}
          <div className="flex gap-8 overflow-x-auto pb-4 -mx-4 px-4 lg:px-[10rem] hide-scrollbar pt-0 lg:pt-0 md:pt-16">
            {categories.map((cat) => (
              <CategoryPill
                key={cat.name}
                {...cat}
                isSelected={selectedCategory === cat.name}
                onClick={setSelectedCategory}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Filter/Sort Bar (Mobile) */}
      <div className="lg:hidden sticky top-0 z-20 bg-white py-2 border-y flex justify-between px-2 mb-4">
        <button
          onClick={() => setShowFilters(true)}
          className="px-4 py-2 border rounded text-sm font-medium"
        >
          Filters
        </button>
        <button
          onClick={() => setShowSort(true)}
          className="px-4 py-2 border rounded text-sm font-medium"
        >
          Sort
        </button>
      </div>

      <div className="flex">
        {/* Sidebar Filters (Desktop only) */}
        <aside className="hidden lg:block w-1/4 pr-6">
          <div className="bg-white rounded-lg p-4 shadow space-y-6">
            <h3 className="font-semibold text-lg">Filters</h3>
            {filterGroups.map((group) => (
              <div key={group.title}>
                <h4 className="font-medium mb-2">{group.title}</h4>
                <div className="space-y-2">
                  {group.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input type="checkbox" /> {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 sm:overflow-visible overflow-x-auto flex sm:flex-none flex-nowrap gap-4 pb-20">
          {products.map((item, index) => (
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
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover transition-transform duration-300 ${
                      activeCard === index
                        ? "scale-105"
                        : "group-hover:scale-105"
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
                  <span>{item.rating}</span> • <span>{item.reviews}</span>
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
                <span className="text-gray-500 text-xs">{item.discount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
          <div className="w-3/4 bg-white h-full p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)}>✖</button>
            </div>
            <div className="space-y-6">
              {filterGroups.map((group) => (
                <div key={group.title}>
                  <h4 className="font-medium mb-2">{group.title}</h4>
                  <div className="space-y-2">
                    {group.options.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input type="checkbox" /> {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sort Modal */}
      {showSort && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end z-50">
          <div className="w-full bg-white rounded-t-2xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Sort By</h3>
              <button onClick={() => setShowSort(false)}>✖</button>
            </div>
            <div className="space-y-3">
              {sortOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setSelectedSort(option);
                    setShowSort(false);
                  }}
                >
                  <input
                    type="radio"
                    name="sort"
                    checked={selectedSort === option}
                    readOnly
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
