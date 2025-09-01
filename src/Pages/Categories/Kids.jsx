import { useEffect, useState } from "react";
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
import { useSelector , useDispatch } from "react-redux";
import { fetchSubcategoryById } from "../../Redux/slices/subcategorySlice";
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

const appliedFiltersData = [
  "Girl",
  "Clothing Set",
  "Shorts",
  "Trousers",
  "2Y - 4Y",
];
const colorsData = [
  "#3B82F6",
  "#EAB308",
  "#F3F4F6",
  "#6B7280",
  "#22C55E",
  "#1F2937",
  "#FBBF24",
  "#EC4899",
  "#EF4444",
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
    <p
      className={`mt-2 text-sm font-semibold ${
        isSelected ? "bg-opacity-35" : "text-gray-700"
      }`}
    >
      {name}
    </p>
  </div>
);

const FilterSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center"
      >
        <h3 className="font-semibold text-[#D94676]">{title}</h3>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

const Checkbox = ({ label }) => (
  <div className="flex items-center mb-2">
    <input
      type="checkbox"
      id={label}
      className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
    />
    <label htmlFor={label} className="ml-3 text-sm text-gray-600">
      {label}
    </label>
  </div>
);

const AgeCheckbox = ({ label }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={label}
      className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
    />
    <label htmlFor={label} className="ml-2 text-sm text-gray-600">
      {label}
    </label>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="group">
    <div className="relative w-full overflow-hidden">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-auto aspect-[3/4] object-cover rounded-md"
      />
      <div className="absolute top-2 right-2 p-1.5 bg-white bg-opacity-70 rounded-full cursor-pointer">
        <FiHeart className="text-gray-600" />
      </div>
      {product.rating && (
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-white bg-opacity-80 rounded-sm text-xs font-semibold flex items-center gap-1">
          {product.rating} <span className="text-pink-500">|</span>{" "}
          {product.reviews}
        </div>
      )}
    </div>
    <div className="mt-2 text-sm">
      <p className="font-bold text-gray-800">{product.brand}</p>
      <p className="text-gray-500 truncate">{product.name}</p>
      <div className="flex items-center gap-2 mt-1">
        <p className="font-bold text-gray-800">₹{product.price.toFixed(2)}</p>
        {product.originalPrice && (
          <p className="text-gray-400 line-through">
            ₹{product.originalPrice.toFixed(2)}
          </p>
        )}
        {product.discount && (
          <p className="text-orange-400 font-semibold">
            (off {product.discount}%)
          </p>
        )}
      </div>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function ProductListingPage() {
  // [NEW] State to track the selected category. 'Girl' is selected by default.
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
  const dispatch = useDispatch();
  const selectedCategoryId = localStorage.getItem("selectedCategoryId");
  useEffect(()=>{
    dispatch(fetchSubcategoryById(selectedCategoryId));
  },[dispatch])
  const subcategory  =  useSelector((state) => state?.subcategory
  ?.subcategoryData?.data);
  console.log("sub",subcategory);
  return (
    <div className="bg-[#FCFCFC] font-sans">
      <div
        className="w-full bg-center bg-cover"
        style={{
          backgroundImage: `url(${ShoppingBag})`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-11">
          {/* [CHANGED] The mapping now passes selection state and click handler to each pill */}
          <div className="flex gap-8 overflow-x-auto pb-4 -mx-4 px-4 lg:px-[10rem] hide-scrollbar pt-0 lg:pt-0 md:pt-16">
            {subcategory?.map((cat) => (
              <CategoryPill
                key={cat.name}
                img = {cat?.image[0]}
                {...cat}
                isSelected={selectedCategory === cat.name}
                onClick={setSelectedCategory}
              />
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Filters Sidebar (No changes here) */}
          <aside className="w-full lg:w-1/4 lg:pr-8">
            <div className="sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">FILTERS</h2>
                <button className="text-sm text-pink-500 hover:underline">
                  Clear all
                </button>
              </div>
              <div className="max-h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar pr-2">
                <FilterSection title="Gender" defaultOpen>
                  <Checkbox label="Girl" />
                </FilterSection>

                <FilterSection title="Categories" defaultOpen>
                  <Checkbox label="Frocks and gown" />
                  <Checkbox label="Night suit" />
                  <Checkbox label="Casual wear" />
                  <button className="text-sm text-blue-500 hover:underline mt-2">
                    View More
                  </button>
                </FilterSection>

                <FilterSection title="Age" defaultOpen>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {[
                      "0M - 3M",
                      "6M - 9M",
                      "9M - 12M",
                      "12M - 18M",
                      "18M - 24M",
                      "2Y - 4Y",
                      "4Y - 6Y",
                      "6Y - 8Y",
                      "8Y - 10Y",
                      "10Y - 12Y",
                      "12Y - 14Y+",
                      "Newborn",
                    ].map((age) => (
                      <AgeCheckbox key={age} label={age} />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Pricing">
                  <div className="mt-2">
                    <input
                      type="range"
                      min="100"
                      max="5000"
                      defaultValue="4000"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹100</span>
                      <span>₹5,000+</span>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Color">
                  <div className="flex flex-wrap gap-3 mt-2">
                    {colorsData.map((color) => (
                      <button
                        key={color}
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </div>
          </aside>

          {/* Products Section (No changes here) */}
          {/* Products Section */}
          <section className="w-full lg:w-3/4">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {appliedFiltersData.map((filter) => (
                <span
                  key={filter}
                  className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-700"
                >
                  {filter}
                  <button className="ml-2 text-gray-500 hover:text-gray-800">
                    <IoClose size={16} />
                  </button>
                </span>
              ))}
              <span className="flex items-center bg-white border border-gray-300 rounded-full p-1 text-sm text-gray-700">
                <div className="w-5 h-5 bg-gray-800 rounded-full"></div>
                <button className="mx-2 text-gray-500 hover:text-gray-800">
                  <IoClose size={16} />
                </button>
              </span>
            </div>

            {/* Mobile → Horizontal scroll | Desktop → Grid */}
            <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 sm:overflow-visible overflow-x-auto flex sm:flex-none flex-nowrap gap-4 pb-9">
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
                    <span className="text-gray-500 text-xs">
                      {item.discount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
