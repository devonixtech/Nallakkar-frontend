// import { useState, useEffect } from "react";
// import { FiMapPin, FiSearch } from "react-icons/fi";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import modelImg from "../../assets/banner.png";
// import NallakkarSVG from "../../assets/NALLAKKAR.png";
// import { getBanners } from "../../Redux/slices/bannerSlice";


// // Redux slices
// import { fetchAllCategories } from "../../Redux/slices/categorySlice";
// import { fetchAllSubcategories } from "../../Redux/slices/subcategorySlice";
// import Header from "../../Components/layout/MainNavbar";
// import { fetchAllProducts } from "../../Redux/slices/productSlice";

// const HeroMobile = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSearchDropdown, setShowSearchDropdown] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Fetch data
//   useEffect(() => {
//     dispatch(fetchAllCategories());
//     dispatch(fetchAllSubcategories());
//     dispatch(fetchAllProducts());
//     dispatch(getBanners());

//   }, [dispatch]);


//   const { banners, loading } = useSelector((state) => state.banners);
//   const categories = useSelector((state) => (state?.ctegory?.categories || []).filter(cat => cat.status === 1));
//   const subcategories = useSelector(
//     (state) => (state?.subcategory?.subcategories || []).filter(sub => sub.status === 1)
//   );
//   const products = useSelector((state) => state?.product?.products || []);

//   // Filtering
//   const filteredCategories =
//     searchQuery.trim() === ""
//       ? []
//       : categories.filter((cat) =>
//         cat.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//   const filteredSubcategories =
//     searchQuery.trim() === ""
//       ? []
//       : subcategories.filter((sub) =>
//         sub.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//   const filteredProducts =
//     searchQuery.trim() === ""
//       ? []
//       : products.filter((prod) =>
//         prod.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//   const hasResults =
//     filteredCategories.length > 0 ||
//     filteredSubcategories.length > 0 ||
//     filteredProducts.length > 0;

//   // Handle click
//   const handleResultClick = (item, type) => {
//     setSearchQuery("");
//     setShowSearchDropdown(false);

//     if (type === "category") {
//       localStorage.setItem("selectedCategoryId", item.id);
//       navigate(`/category/${item.name.toLowerCase()}`);
//     } else if (type === "subcategory") {
//       const parentCategory = categories.find(
//         (cat) => cat.id === item.category_id || cat.id === item.categoryId
//       );
//       if (parentCategory) {
//         localStorage.setItem("selectedCategoryId", parentCategory.id);
//         navigate(`/category/${parentCategory.name.toLowerCase()}`);
//       } else {
//         navigate("/");
//       }
//     } else if (type === "product") {
//       navigate(`/product/${item.id}`);
//     }
//   };

//   return (
//     <div className="bg-white font-sans max-w-full mx-auto border relative">
//       {/* <Header/> */}
//       <main>
//         {/* Location Bar */}
//         <div className="p-4">
//           {/* <div className="flex items-center text-gray-800 text-xs mb-3">
//             <FiMapPin className="text-black mr-2" size={16} />
//             <span>Lingenahlli., Madhugiri,Tumakuru, Karnataka-572132.</span>
//           </div> */}

//           {/* Search Bar */}
//           <div className="relative mb-4">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiSearch className="text-gray-400" />
//             </div>

//             <input
//               type="text"
//               placeholder="Search for more products"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setShowSearchDropdown(e.target.value.length > 0);
//               }}
//               className="w-full pl-10 pr-3 py-2 border rounded-full shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//             />

//             {/* Dropdown */}
//             {showSearchDropdown && (
//               <div className="absolute top-[2.8rem] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-2xl max-h-[300px] overflow-y-auto z-50">
//                 {hasResults ? (
//                   <ul className="py-2 text-sm text-primary">
//                     {filteredCategories.length > 0 && (
//                       <>
//                         <li className="px-4 py-1 text-xs font-bold text-gray-500">
//                           Categories
//                         </li>
//                         {filteredCategories.map((cat) => (
//                           <li
//                             key={cat.id}
//                             onClick={() => handleResultClick(cat, "category")}
//                             className="px-4 py-2 hover:bg-rose-50 cursor-pointer"
//                           >
//                             {cat.name}
//                           </li>
//                         ))}
//                       </>
//                     )}

//                     {filteredSubcategories.length > 0 && (
//                       <>
//                         <li className="px-4 py-1 text-xs font-bold text-gray-500">
//                           Subcategories
//                         </li>
//                         {filteredSubcategories.map((sub) => (
//                           <li
//                             key={sub.id}
//                             onClick={() => handleResultClick(sub, "subcategory")}
//                             className="px-4 py-2 hover:bg-rose-50 cursor-pointer"
//                           >
//                             {sub.name}
//                           </li>
//                         ))}
//                       </>
//                     )}

//                     {filteredProducts.length > 0 && (
//                       <>
//                         <li className="px-4 py-1 text-xs font-bold text-gray-500">
//                           Products
//                         </li>
//                         {filteredProducts.map((prod) => (
//                           <li
//                             key={prod.id}
//                             onClick={() => handleResultClick(prod, "product")}
//                             className="px-4 py-2 hover:bg-rose-50 cursor-pointer"
//                           >
//                             {prod.title}
//                           </li>
//                         ))}
//                       </>
//                     )}
//                   </ul>
//                 ) : (
//                   <div className="p-4 text-sm text-gray-500">
//                     No items found.
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Hero Section */}
//         <div className="relative bg-gray-50 py-4 px-2 rounded-lg overflow-hidden h-[200px]">
//           <img
//             src={NallakkarSVG}
//             alt="NALLAKKAR"
//             className="absolute inset-0 w-full -mt-[20px] h-full object-contain pointer-events-none z-0 md:scale-100 scale-105"
//           />

//           <div className="relative z-10 flex flex-col h-full">
//             <div className="flex items-center mb-2">
//               <h2 className="font-bold text-[13px]">
//                 Your Next Look Starts Here —{" "}
//                 <span className="text-rose font-bold">NALLAKKAR</span>
//               </h2>
//             </div>

//             <p className="text-[#17171A] font-semibold leading-tight mt-[66px] text-[10px]">
//               {banners && banners.length > 0 ? banners[13].name : ""}
//             </p>

//             <Link
//               to={"/category/kids"}
//               className="bg-primary text-white text-[9px] font-bold py-1 px-3 w-max hover:bg-rose mt-2 transition-colors"
//             >
//               SHOP NOW
//             </Link>
//           </div>

//           <div className="absolute right-[-20px] bottom-0 w-[150px] h-[150px] z-10">
//             <img
//               src={banners && banners.length > 0 ? banners[13].images : ""}
//               alt="Model showcasing Nallakkar fashion"
//               className="w-full h-full object-contain"
//             />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HeroMobile;


















import { useState, useEffect } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import modelImg from "../../assets/banner.png";
import NallakkarSVG from "../../assets/NALLAKKAR.png";
import { getBanners } from "../../Redux/slices/bannerSlice";


// Redux slices
import { fetchAllCategories } from "../../Redux/slices/categorySlice";
import { fetchAllSubcategories } from "../../Redux/slices/subcategorySlice";
import Header from "../../Components/layout/MainNavbar";
import { fetchAllProducts } from "../../Redux/slices/productSlice";

const HeroMobile = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch data
  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllSubcategories());
    dispatch(fetchAllProducts());
    dispatch(getBanners());

  }, [dispatch]);


  const { banners, loading } = useSelector((state) => state.banners);
  const categories = useSelector((state) => (state?.ctegory?.categories || []).filter(cat => cat.status === 1));
  const subcategories = useSelector(
    (state) => (state?.subcategory?.subcategories || []).filter(sub => sub.status === 1)
  );
  const products = useSelector((state) => state?.product?.products || []);

  // Filtering
  const filteredCategories =
    searchQuery.trim() === ""
      ? []
      : categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const filteredSubcategories =
    searchQuery.trim() === ""
      ? []
      : subcategories.filter((sub) =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const filteredProducts =
    searchQuery.trim() === ""
      ? []
      : products.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const hasResults =
    filteredCategories.length > 0 ||
    filteredSubcategories.length > 0 ||
    filteredProducts.length > 0;

  // Handle click
  const handleResultClick = (item, type) => {
    setSearchQuery("");
    setShowSearchDropdown(false);

    if (type === "category") {
      localStorage.setItem("selectedCategoryId", item.id);
      navigate(`/category/${item.name.toLowerCase()}`);
    } else if (type === "subcategory") {
      const parentCategory = categories.find(
        (cat) => cat.id === item.category_id || cat.id === item.categoryId
      );
      if (parentCategory) {
        localStorage.setItem("selectedCategoryId", parentCategory.id);
        navigate(`/category/${parentCategory.name.toLowerCase()}`);
      } else {
        navigate("/");
      }
    } else if (type === "product") {
      navigate(`/product/${item.id}`);
    }
  };

  return (
    <div className="bg-white font-sans max-w-full mx-auto border relative">
      {/* <Header/> */}
      <main>
        {/* Location Bar */}
        <div className="p-4">
          {/* <div className="flex items-center text-gray-800 text-xs mb-3">
            <FiMapPin className="text-black mr-2" size={16} />
            <span>Lingenahlli., Madhugiri,Tumakuru, Karnataka-572132.</span>
          </div> */}

          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>

            <input
              type="text"
              placeholder="Search for more products"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(e.target.value.length > 0);
              }}
              className="w-full pl-10 pr-3 py-2 border rounded-full shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />

            {/* Dropdown */}
            {showSearchDropdown && (
              <div className="absolute top-[2.8rem] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-2xl max-h-[300px] overflow-y-auto z-50">
                {hasResults ? (
                  <ul className="py-2 text-sm text-primary">
                    {filteredCategories.length > 0 && (
                      <>
                        <li className="px-4 py-1 text-xs font-bold text-gray-500">
                          Categories
                        </li>
                        {filteredCategories.map((cat) => (
                          <li
                            key={cat.id}
                            onClick={() => handleResultClick(cat, "category")}
                            className="px-4 py-2 hover:bg-rose-50 cursor-pointer"
                          >
                            {cat.name}
                          </li>
                        ))}
                      </>
                    )}

                    {filteredSubcategories.length > 0 && (
                      <>
                        <li className="px-4 py-1 text-xs font-bold text-gray-500">
                          Subcategories
                        </li>
                        {filteredSubcategories.map((sub) => (
                          <li
                            key={sub.id}
                            onClick={() => handleResultClick(sub, "subcategory")}
                            className="px-4 py-2 hover:bg-rose-50 cursor-pointer"
                          >
                            {sub.name}
                          </li>
                        ))}
                      </>
                    )}

                    {filteredProducts.length > 0 && (
                      <>
                        <li className="px-4 py-1 text-xs font-bold text-gray-500">
                          Products
                        </li>
                        {filteredProducts.map((prod) => (
                          <li
                            key={prod.id}
                            onClick={() => handleResultClick(prod, "product")}
                            className="px-4 py-2 hover:bg-rose-50 cursor-pointer"
                          >
                            {prod.title}
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                ) : (
                  <div className="p-4 text-sm text-gray-500">
                    No items found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-white py-8 px-6 pt-0 overflow-hidden flex flex-col items-center text-center">

          {/* Watermark text */}
          {/* <span
            className="absolute inset-0 flex items-center justify-center text-[56px] font-extrabold text-gray-100 select-none pointer-events-none tracking-widest z-0"
            style={{ letterSpacing: "0.15em" }}
          >
            NALLAKKAR
          </span> */}

          <img
            src={NallakkarSVG}
            alt="NALLAKKAR"
            className="absolute inset-0 w-full -mt-[20px] h-full object-contain pointer-events-none z-0 md:scale-100 scale-105"
          />

          {/* Title */}
          <div className="relative z-10 mb-4">
            <h2 className="font-bold text-[17px] text-gray-900 leading-snug">
              Your Next Look Starts Here
            </h2>
            <p className="font-extrabold text-[17px] text-red-600 tracking-wide mt-0.5">
              NALLAKKAR
            </p>
          </div>

          {/* Product Image */}
          <div className="relative z-10 w-[200px] h-[200px] mb-6">
            <img
              src={banners && banners.length > 0 ? banners[13]?.images : ""}
              alt="Nallakkar signature jewellery"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>

          {/* Description */}
          <p className="relative z-10 text-gray-800 text-[13px] leading-relaxed max-w-[280px] mb-6">
            {banners && banners.length > 0
              ? banners[13]?.name
              : "Step into the world of NALLAKKAR – where tradition meets modern elegance. From timeless weaves to bold essentials, discover your next signature look."}
          </p>

          {/* CTA Button */}
          <Link
            to={"/category/kids"}
            className="relative z-10 bg-[#1a1f3c] text-white text-[11px] font-bold py-3 px-10 tracking-[0.2em] hover:bg-[#2a2f5c] transition-colors"
          >
            SHOP NOW
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HeroMobile;
