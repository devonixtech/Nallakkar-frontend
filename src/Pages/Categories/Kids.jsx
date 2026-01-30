// import { useEffect, useState } from "react";
// import { FiChevronDown, FiChevronUp, FiHeart } from "react-icons/fi";
// import { IoClose } from "react-icons/io5";
// import { Heart } from "lucide-react";
// import ShoppingBag from "../../assets/shopping-bags.png";

// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchSubcategoryBycategoryId } from "../../Redux/slices/subcategorySlice";

// import { fetchAllProducts } from "../../Redux/slices/productSlice";
// import { toggleWishlist } from "../../Redux/slices/wishlistSlice";
// import { fetchWishlistByUserId } from "../../Redux/slices/wishlistSlice";
// import ProductRating from "../../Components/Custom/ProductRating";

// const CategoryPill = ({ name, img, isSelected, onClick }) => (
//   <div
//     className="text-center flex-shrink-0 cursor-pointer"
//     onClick={() => onClick(name)}
//   >
//     <div className="relative w-40 h-24 mx-auto rounded-full overflow-hidden">
//       <img src={img} alt={name} className="w-full h-full object-cover" />
//       {/* This overlay only appears if the category is selected */}
//       {isSelected && (
//         <div className="absolute inset-0 bg-pink bg-opacity-50 flex items-center justify-center">
//           <span className="text-darkpink font-bold text-lg">{name}</span>
//         </div>
//       )}
//     </div>
//     <p
//       className={`mt-2 text-sm font-semibold ${isSelected ? "bg-opacity-35" : "text-gray-700"
//         }`}
//     >
//       {name}
//     </p>
//   </div>
// );

// const FilterSection = ({ title, children, defaultOpen = false }) => {
//   const [isOpen, setIsOpen] = useState(defaultOpen);
//   return (
//     <div className="border-b py-4">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full flex justify-between items-center"
//       >
//         <h3 className="font-semibold text-[#D94676]">{title}</h3>
//         {isOpen ? <FiChevronUp /> : <FiChevronDown />}
//       </button>
//       {isOpen && <div className="mt-4">{children}</div>}
//     </div>
//   );
// };

// const Checkbox = ({ label, checked, onChange }) => (
//   <div className="flex items-center mb-2">
//     <input
//       type="checkbox"
//       id={label}
//       checked={checked}
//       onChange={onChange}
//       className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
//     />
//     <label htmlFor={label} className="ml-3 text-sm text-gray-600">
//       {label}
//     </label>
//   </div>
// );

// export default function ProductListingPage() {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(
//     localStorage.getItem("selectedCategoryId")
//   );
//   const [activeCard, setActiveCard] = useState(null);
//   const [selectedFilters, setSelectedFilters] = useState({});
//   const [appliedFilters, setAppliedFilters] = useState({});
//   const [showFilters, setShowFilters] = useState(false);
//   const [showSort, setShowSort] = useState(false);
//   const wishlist = useSelector((state) => state.wishlist.items || []);

//   const dispatch = useDispatch();

//   const sortOptions = [
//     "Price: Low to High",
//     "Price: High to Low",
//     "Newest",
//     "Popularity",
//   ];

//   const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setSelectedCategoryId(localStorage.getItem("selectedCategoryId"));
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);
//   useEffect(() => {
//     dispatch(fetchSubcategoryBycategoryId(selectedCategoryId));
//     dispatch(fetchAllProducts({ categoryId: selectedCategoryId }));
//   }, [dispatch, selectedCategoryId]);

//   const subcategory = useSelector(
//     (state) => state?.subcategory?.subcategoryData?.data
//   );
//   const products = useSelector((state) => state?.products?.products);

//   useEffect(() => {
//     dispatch(fetchAllProducts());
//   }, [dispatch]);
//   useEffect(() => {
//     if (subcategory?.length > 0) {
//       // Always reset to first subcategory of this category when category changes
//       const first = subcategory[0];
//       setSelectedCategory(first.name);
//       setSelectedFilters(first.filters || {});

//       if (first.id) {
//         dispatch(fetchAllProducts({ subCategoryId: first.id }));
//       }
//     }
//   }, [subcategory, selectedCategoryId]);
//   const handleFilterChange = (filterName, value) => {
//     setAppliedFilters((prev) => {
//       const currentValues = prev[filterName] || [];
//       if (currentValues.includes(value)) {
//         // remove value
//         return {
//           ...prev,
//           [filterName]: currentValues.filter((v) => v !== value),
//         };
//       } else {
//         // add value
//         return {
//           ...prev,
//           [filterName]: [...currentValues, value],
//         };
//       }
//     });
//   };
//   // Not dynamic -- for
//   const userString = localStorage.getItem("user") || "{}";

//   // Parse it into an object
//   const user = JSON.parse(userString);
//   // Access the id
//   const userId = user.id;

//   const handleWishlist = async (productId) => {
//     const isFavourite = !wishlist?.some((w) => w.productId === productId);
//     await dispatch(toggleWishlist({ productId, userId, isFavourite })).unwrap();
//     dispatch(fetchWishlistByUserId(userId));
//   };

//   const [maxPrice, setMaxPrice] = useState(4000);

//   const filteredProducts = products
//     ?.filter((product) => Number(product.status) === 1)
//     .filter((product) => product.subCategoryName === selectedCategory)
//     .filter((product) => product.final_price <= maxPrice)
//     .filter((product) => {
//       if (!appliedFilters || Object.keys(appliedFilters).length === 0)
//         return true;

//       return Object.entries(appliedFilters).every(
//         ([filterName, selectedValues]) => {
//           if (!selectedValues || selectedValues.length === 0) return true;

//           const productValues =
//             product.variants?.[filterName.toLowerCase()] || [];
//           return selectedValues.some((value) =>
//             productValues
//               .map((v) => v.toLowerCase().trim())
//               .includes(value.toLowerCase().trim())
//           );
//         }
//       );
//     });

//   let displayedProducts = [...filteredProducts];

//   if (selectedSort === "Price: Low to High") {
//     displayedProducts.sort((a, b) => a.final_price - b.final_price);
//   } else if (selectedSort === "Price: High to Low") {
//     displayedProducts.sort((a, b) => b.final_price - a.final_price);
//   } else if (selectedSort === "Newest") {
//     displayedProducts.sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//     );
//   } else if (selectedSort === "Popularity") {
//     displayedProducts.sort((a, b) => b.rating - a.rating);
//   }

//   return (
//     <div className="bg-[#FCFCFC] font-sans">
//       <div
//         className="w-full bg-center bg-cover"
//         style={{
//           backgroundImage: `url(${ShoppingBag})`,
//         }}
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-11">
//           {/* [CHANGED] The mapping now passes selection state and click handler to each pill */}
//           <div className="flex gap-8 overflow-x-auto pb-4 -mx-4 px-4 lg:px-[10rem] hide-scrollbar pt-0 lg:pt-0 md:pt-16">
//             {subcategory?.map((cat) => (
//               <CategoryPill
//                 key={cat?.id}
//                 img={cat?.image[0]}
//                 name={cat?.name}
//                 isSelected={selectedCategory === cat?.name}
//                 onClick={() => {
//                   setSelectedCategory(cat.name);
//                   setSelectedFilters(cat.filters || {});
//                   if (cat.id) {
//                     dispatch(fetchAllProducts({ subCategoryId: cat.id }));
//                   }
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       <main className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row gap-8 py-8">
//           {/* Filters Sidebar (No changes here) -- -DESKTOP VERSION */}
//           <aside className="w-full lg:w-1/4 lg:pr-8 hidden lg:block">
//             <div className="sticky top-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-bold text-gray-800">FILTERS</h2>
//                 <button
//                   className="text-sm text-pink-500 hover:underline"
//                   onClick={() => setAppliedFilters({})}
//                 >
//                   Clear all
//                 </button>
//               </div>
//               <div className="max-h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar pr-2">
//                 {/* Dynamic Filters */}
//                 {Object.entries(selectedFilters).map(
//                   ([filterName, filterValues]) => (
//                     <FilterSection
//                       key={filterName}
//                       title={filterName}
//                       defaultOpen={false}
//                     >
//                       <div className="grid grid-cols-2 gap-x-4 gap-y-2">
//                         {filterValues.map((value) => (
//                           <Checkbox
//                             key={value}
//                             label={value}
//                             checked={
//                               appliedFilters[filterName]?.includes(value) ||
//                               false
//                             }
//                             onChange={() =>
//                               handleFilterChange(filterName, value)
//                             }
//                           />
//                         ))}
//                       </div>
//                     </FilterSection>
//                   )
//                 )}

//                 {/* =====================================================
//       FILTER PRICE RANGE WORKING 
// =========================================================*/}
//                 <FilterSection title="Pricing">
//                   <div className="mt-2">
//                     <input
//                       type="range"
//                       min="100"
//                       max="5000"
//                       value={maxPrice}
//                       onChange={(e) => setMaxPrice(Number(e.target.value))}
//                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
//                     />
//                     <div className="flex justify-between text-xs text-gray-500 mt-1">
//                       <span>₹100</span>
//                       <span>₹{maxPrice}+</span>
//                     </div>
//                   </div>
//                 </FilterSection>

//                 {/* <FilterSection title="Color">
//                   <div className="flex flex-wrap gap-3 mt-2">
//                     {colorsData.map((color) => (
//                       <button
//                         key={color}
//                         className="w-6 h-6 rounded-full border border-gray-300"
//                         style={{ backgroundColor: color }}
//                       ></button>
//                     ))}
//                   </div>
//                 </FilterSection> */}
//               </div>
//             </div>
//           </aside>
//           <div>
//             {/* Sticky Filter/Sort Bar (Mobile) */}
//             <div className="lg:hidden sticky top-0 z-20 bg-white py-2 border-y flex justify-between px-2 mb-4">
//               <button
//                 onClick={() => setShowFilters(true)}
//                 className="px-4 py-2 border rounded text-sm font-medium"
//               >
//                 Filters
//               </button>
//               <button
//                 onClick={() => setShowSort(true)}
//                 className="px-4 py-2 border rounded text-sm font-medium"
//               >
//                 Sort
//               </button>
//             </div>

//             {/* Mobile Filters Drawer */}
//             {showFilters && (
//               <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
//                 <div className="w-3/4 bg-white h-full p-4 overflow-y-auto">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="font-semibold text-lg">Filters</h3>
//                     <button onClick={() => setShowFilters(false)}>✖</button>
//                   </div>

//                   <div className="space-y-6">
//                     {Object.entries(selectedFilters).map(
//                       ([filterName, options]) => (
//                         <div key={filterName}>
//                           <h4 className="font-medium mb-2">{filterName}</h4>
//                           <div className="space-y-2">
//                             {options.map((opt) => (
//                               <label
//                                 key={opt}
//                                 className="flex items-center gap-2 text-sm"
//                               >
//                                 <input
//                                   type="checkbox"
//                                   checked={
//                                     appliedFilters[filterName]?.includes(opt) ||
//                                     false
//                                   }
//                                   onChange={() =>
//                                     handleFilterChange(filterName, opt)
//                                   }
//                                 />
//                                 {opt}
//                               </label>
//                             ))}
//                           </div>
//                         </div>
//                       )
//                     )}

//                     {/* Price Filter */}
//                     <div>
//                       <h4 className="font-medium mb-2">Pricing</h4>
//                       <input
//                         type="range"
//                         min="100"
//                         max="5000"
//                         value={maxPrice}
//                         onChange={(e) => setMaxPrice(Number(e.target.value))}
//                         className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
//                       />
//                       <div className="flex justify-between text-xs text-gray-500 mt-1">
//                         <span>₹100</span>
//                         <span>₹{maxPrice}+</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Mobile Sort Modal */}
//             {showSort && (
//               <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end z-50">
//                 <div className="w-full bg-white rounded-t-2xl p-4">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="font-semibold">Sort By</h3>
//                     <button onClick={() => setShowSort(false)}>✖</button>
//                   </div>
//                   <div className="space-y-3">
//                     {sortOptions.map((option) => (
//                       <label
//                         key={option}
//                         className="flex items-center gap-2 cursor-pointer"
//                         onClick={() => {
//                           setSelectedSort(option);
//                           setShowSort(false);
//                         }}
//                       >
//                         <input
//                           type="radio"
//                           name="sort"
//                           checked={selectedSort === option}
//                           readOnly
//                         />
//                         {option}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Products Section (No changes here) */}
//           {/* Products Section */}
//           <section className="w-full lg:w-3/4">
//             <div className="flex flex-wrap items-center gap-2 mb-6">
//               {Object.entries(appliedFilters).map(([filterName, values]) =>
//                 values.map((val) => (
//                   <span
//                     key={`${filterName}-${val}`}
//                     className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-700"
//                   >
//                     {val}
//                     <button
//                       onClick={() => handleFilterChange(filterName, val)}
//                       className="ml-2 text-gray-500 hover:text-gray-800"
//                     >
//                       <IoClose size={16} />
//                     </button>
//                   </span>
//                 ))
//               )}
//             </div>

//             {/* Mobile → Horizontal scroll | Desktop → Grid */}
//             <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 sm:overflow-visible overflow-x-auto flex sm:flex-none flex-nowrap gap-4 pb-9">
//               {displayedProducts?.map((item, index) => (
//                 <div
//                   key={index}
//                   className={`group text-center min-w-[160px] sm:min-w-[200px] md:min-w-0 bg-white transition-all duration-300 transform ${activeCard === index
//                     ? "shadow-xl scale-[1.02]"
//                     : "hover:shadow-lg hover:-translate-y-1"
//                     }`}
//                   onMouseDown={() => setActiveCard(index)}
//                   onMouseUp={() => setActiveCard(null)}
//                   onMouseLeave={() => setActiveCard(null)}
//                 >
//                   <div className="relative overflow-hidden rounded-t-lg">
//                     <Link to={`/product/${item.id}`}>
//                       {" "}
//                       <img
//                         src={item.image[0]}
//                         alt={item.title}
//                         className={`w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover transition-transform duration-300 ${activeCard === index
//                           ? "scale-105"
//                           : "group-hover:scale-105"
//                           }`}
//                       />
//                     </Link>

//                     {/* Hover Add to Cart Button with Icon */}
//                     {/* <Link to={`/product/${item.id}`}>
//                       {" "}
//                       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                         <Link
//                           to={"/cart"}
//                           className="flex items-center gap-2 bg-white px-4 py-2 text-sm font-medium rounded shadow hover:bg-darkpink hover:text-white transition"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth={2}
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13l-1.5-6M9 21a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"
//                             />
//                           </svg>
//                           ADD TO CART
//                         </Link>
//                       </div>
//                     </Link> */}

//                     {/* Rating */}
//                     <div className="absolute bottom-2 left-2 px-2 py-1 bg-white bg-opacity-80 rounded-sm">
//                       <ProductRating
//                         rating={item?.rating} // Reverted to rating based on backend code
//                         reviewCount={item?.reviewCount}
//                         size="xs"
//                       />
//                     </div>

//                     {/* Heart Icon */}
//                     <button
//                       onClick={() => handleWishlist(item.id)}
//                       className="absolute top-2 right-2 p-1 transition hover:scale-110"
//                     >
//                       <Heart
//                         className={`w-5 h-5 transition-colors ${wishlist.some(
//                           (w) => w.productId == (item.id || item.productId)
//                         )
//                           ? "fill-rose text-rose"
//                           : "text-white"
//                           }`}
//                         strokeWidth={2}
//                       />
//                     </button>
//                   </div>

//                   <p className="text-xs sm:text-sm text-gray-500 mt-1 text-left px-2">
//                     Nallakkar
//                   </p>

//                   <p className="text-sm md:text-base font-medium text-gray-800 mt-1 text-left px-2 line-clamp-2">
//                     {item?.name}
//                   </p>

//                   <div className="flex justify-between items-center gap-2 mt-1 px-2 pb-2">
//                     <span className="text-darkpink font-semibold text-sm">
//                       {item.final_price}
//                     </span>
//                     <span className="text-gray-500 text-xs">
//                       (off {item.discount}%)
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }



























import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp, FiHeart } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Heart } from "lucide-react";
import ShoppingBag from "../../assets/shopping-bags.png";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubcategoryBycategoryId } from "../../Redux/slices/subcategorySlice";

import { fetchAllProducts } from "../../Redux/slices/productSlice";
import { toggleWishlist } from "../../Redux/slices/wishlistSlice";
import { fetchWishlistByUserId } from "../../Redux/slices/wishlistSlice";
import ProductRating from "../../Components/Custom/ProductRating";

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
      className={`mt-2 text-sm font-semibold ${isSelected ? "bg-opacity-35" : "text-gray-700"
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

const Checkbox = ({ label, checked, onChange }) => (
  <div className="flex items-center mb-2">
    <input
      type="checkbox"
      id={label}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
    />
    <label htmlFor={label} className="ml-3 text-sm text-gray-600">
      {label}
    </label>
  </div>
);

export default function ProductListingPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    localStorage.getItem("selectedCategoryId")
  );
  const [activeCard, setActiveCard] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const wishlist = useSelector((state) => state.wishlist.items || []);
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
    "Popularity",
  ];

  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  useEffect(() => {
    const handleStorageChange = () => {
      setSelectedCategoryId(localStorage.getItem("selectedCategoryId"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  useEffect(() => {
    dispatch(fetchSubcategoryBycategoryId(selectedCategoryId));
    dispatch(fetchAllProducts({ categoryId: selectedCategoryId }));
  }, [dispatch, selectedCategoryId]);

  const subcategory = useSelector(
    (state) => state?.subcategory?.subcategoryData?.data
  );
  const products = useSelector((state) => state?.products?.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  useEffect(() => {
    if (subcategory?.length > 0) {
      // Always reset to first subcategory of this category when category changes
      const first = subcategory[0];
      setSelectedCategory(first.name);
      setSelectedFilters(first.filters || {});

      if (first.id) {
        dispatch(fetchAllProducts({ subCategoryId: first.id }));
      }
    }
  }, [subcategory, selectedCategoryId]);
  const handleFilterChange = (filterName, value) => {
    setAppliedFilters((prev) => {
      const currentValues = prev[filterName] || [];
      if (currentValues.includes(value)) {
        // remove value
        return {
          ...prev,
          [filterName]: currentValues.filter((v) => v !== value),
        };
      } else {
        // add value
        return {
          ...prev,
          [filterName]: [...currentValues, value],
        };
      }
    });
  };
  // Not dynamic -- for
  const userString = localStorage.getItem("user") || "{}";

  // Parse it into an object
  const user = JSON.parse(userString);
  // Access the id
  const userId = user.id;

  const handleWishlist = async (productId) => {
    const isFavourite = !wishlist?.some((w) => w.productId === productId);
    await dispatch(toggleWishlist({ productId, userId, isFavourite })).unwrap();
    dispatch(fetchWishlistByUserId(userId));
  };

  const [maxPrice, setMaxPrice] = useState(4000);

  const filteredProducts = products
    ?.filter((product) => Number(product.status) === 1)
    .filter((product) => product.subCategoryName === selectedCategory)
    .filter((product) => product.final_price <= maxPrice)
    .filter((product) => {
      if (!appliedFilters || Object.keys(appliedFilters).length === 0)
        return true;

      return Object.entries(appliedFilters).every(
        ([filterName, selectedValues]) => {
          if (!selectedValues || selectedValues.length === 0) return true;

          const productValues =
            product.variants?.[filterName.toLowerCase()] || [];
          return selectedValues.some((value) =>
            productValues
              .map((v) => v.toLowerCase().trim())
              .includes(value.toLowerCase().trim())
          );
        }
      );
    });

  let displayedProducts = [...filteredProducts];

  if (selectedSort === "Price: Low to High") {
    displayedProducts.sort((a, b) => a.final_price - b.final_price);
  } else if (selectedSort === "Price: High to Low") {
    displayedProducts.sort((a, b) => b.final_price - a.final_price);
  } else if (selectedSort === "Newest") {
    displayedProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (selectedSort === "Popularity") {
    displayedProducts.sort((a, b) => b.rating - a.rating);
  }


  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = displayedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
                key={cat?.id}
                img={cat?.image[0]}
                name={cat?.name}
                isSelected={selectedCategory === cat?.name}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setSelectedFilters(cat.filters || {});
                  if (cat.id) {
                    dispatch(fetchAllProducts({ subCategoryId: cat.id }));
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Filters Sidebar (No changes here) -- -DESKTOP VERSION */}
          <aside className="w-full lg:w-1/4 lg:pr-8 hidden lg:block">
            <div className="sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">FILTERS</h2>
                <button
                  className="text-sm text-pink-500 hover:underline"
                  onClick={() => setAppliedFilters({})}
                >
                  Clear all
                </button>
              </div>
              <div className="max-h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar pr-2">
                {/* Dynamic Filters */}
                {Object.entries(selectedFilters).map(
                  ([filterName, filterValues]) => (
                    <FilterSection
                      key={filterName}
                      title={filterName}
                      defaultOpen={false}
                    >
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {filterValues.map((value) => (
                          <Checkbox
                            key={value}
                            label={value}
                            checked={
                              appliedFilters[filterName]?.includes(value) ||
                              false
                            }
                            onChange={() =>
                              handleFilterChange(filterName, value)
                            }
                          />
                        ))}
                      </div>
                    </FilterSection>
                  )
                )}

                {/* =====================================================
      FILTER PRICE RANGE WORKING 
=========================================================*/}
                <FilterSection title="Pricing">
                  <div className="mt-2">
                    <input
                      type="range"
                      min="100"
                      max="5000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹100</span>
                      <span>₹{maxPrice}+</span>
                    </div>
                  </div>
                </FilterSection>

                {/* <FilterSection title="Color">
                  <div className="flex flex-wrap gap-3 mt-2">
                    {colorsData.map((color) => (
                      <button
                        key={color}
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </FilterSection> */}
              </div>
            </div>
          </aside>
          <div>
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

            {/* Mobile Filters Drawer */}
            {showFilters && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
                <div className="w-3/4 bg-white h-full p-4 overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Filters</h3>
                    <button onClick={() => setShowFilters(false)}>✖</button>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(selectedFilters).map(
                      ([filterName, options]) => (
                        <div key={filterName}>
                          <h4 className="font-medium mb-2">{filterName}</h4>
                          <div className="space-y-2">
                            {options.map((opt) => (
                              <label
                                key={opt}
                                className="flex items-center gap-2 text-sm"
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    appliedFilters[filterName]?.includes(opt) ||
                                    false
                                  }
                                  onChange={() =>
                                    handleFilterChange(filterName, opt)
                                  }
                                />
                                {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                      )
                    )}

                    {/* Price Filter */}
                    <div>
                      <h4 className="font-medium mb-2">Pricing</h4>
                      <input
                        type="range"
                        min="100"
                        max="5000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>₹100</span>
                        <span>₹{maxPrice}+</span>
                      </div>
                    </div>
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

          {/* Products Section (No changes here) */}
          {/* Products Section */}
          <section className="w-full lg:w-3/4">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {Object.entries(appliedFilters).map(([filterName, values]) =>
                values.map((val) => (
                  <span
                    key={`${filterName}-${val}`}
                    className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-700"
                  >
                    {val}
                    <button
                      onClick={() => handleFilterChange(filterName, val)}
                      className="ml-2 text-gray-500 hover:text-gray-800"
                    >
                      <IoClose size={16} />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Mobile → Horizontal scroll | Desktop → Grid */}
            {/* Mobile → 2 column grid | Desktop → same grid */}
            <div
              className="grid grid-cols-2 gap-x-4 gap-y-6 
             sm:grid-cols-2 
             md:grid-cols-3 
             xl:grid-cols-4 
             pb-9"
            >
              {currentProducts.map((item, index) => (
                <div
                  key={item.id}
                  className={`group text-center bg-white transition-all duration-300 transform ${activeCard === index
                      ? "shadow-xl scale-[1.02]"
                      : "hover:shadow-lg hover:-translate-y-1"
                    }`}
                  onMouseDown={() => setActiveCard(index)}
                  onMouseUp={() => setActiveCard(null)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                    <Link to={`/product/${item.id}`}>
                  <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className={`w-full h-[180px] sm:h-[250px] md:h-[300px] object-cover transition-transform duration-300 ${activeCard === index
                            ? "scale-105"
                            : "group-hover:scale-105"
                          }`}
                      />
                   

                    {/* Rating */}
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/80 rounded-sm">
                      <ProductRating
                        rating={item?.rating}
                        reviewCount={item?.reviewCount}
                        size="xs"
                      />
                    </div>

                    {/* Wishlist */}
                    <button
                      onClick={() => handleWishlist(item.id)}
                      className="absolute top-2 right-2 p-1 transition hover:scale-110"
                    >
                      <Heart
                        className={`w-5 h-5 ${wishlist.some((w) => w.productId === item.id)
                            ? "fill-rose text-rose"
                            : "text-white"
                          }`}
                      />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1 text-left px-2">
                    Nallakkar
                  </p>

                  <p className="text-sm md:text-base font-medium text-gray-800 mt-1 text-left px-2 line-clamp-2">
                    {item.name}
                  </p>

                  <div className="flex justify-between items-center gap-2 mt-1 px-2 pb-2">
                    <span className="text-darkpink font-semibold text-sm">
                      {item.final_price}
                    </span>
                    <span className="text-gray-500 text-xs">
                      (off {item.discount}%)
                    </span>
                  </div>
                   </Link>
                </div>
              ))}
            </div>


          </section>

        </div>
      <div className="w-full lg:w-3/4 lg:ml-auto">
  <div className="flex justify-center items-center gap-2 mt-5 pb-20">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
      className="w-8 h-8 rounded-full bg-pinkLight text-white disabled:opacity-50"
    >
      &lt;
    </button>

    {[...Array(totalPages || 1)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`w-8 h-8 rounded-full text-white ${
          currentPage === i + 1 ? "bg-darkpink" : "bg-pinkLight"
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => p + 1)}
      className="w-8 h-8 rounded-full bg-pinkLight text-white disabled:opacity-50"
    >
      &gt;
    </button>
  </div>
</div>

      </main>
    </div>
  );
}

