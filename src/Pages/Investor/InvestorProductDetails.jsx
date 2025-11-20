// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function ProductDetails({ productId }) {
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [productStatus, setProductStatus] = useState("active");
//   const [selectedSize, setSelectedSize] = useState("M");

//   // Mock product data based on ID
//   const getProductData = (id) => {
//     const products = {
//       "1": {
//         id: 1,
//         name: "Wireless Bluetooth Headphones",
//         category: "Electronics",
//         subcategory: "Audio Devices",
//         price: 299.99,
//         comparePrice: 399.99,
//         stock: 45,
//         status: "active",
//         sku: "WBH-2024-001",
//         rating: 4.8,
//         reviewCount: 256,
//         description:
//           "Premium wireless Bluetooth headphones with active noise cancellation, 30-hour battery life, and studio-quality sound. Perfect for music lovers, professionals, and gamers who demand the best audio experience.",
//         specifications: [
//           { label: "Battery Life", value: "30 hours" },
//           { label: "Connectivity", value: "Bluetooth 5.0" },
//           { label: "Weight", value: "250g" },
//           { label: "Charging", value: "USB-C Fast Charge" },
//           { label: "Noise Cancellation", value: "Active ANC" },
//         ],
//         images: [
//           "https://readdy.ai/api/search-image?query=premium%20wireless%20bluetooth%20headphones%20black%20sleek%20design%20studio%20lighting%20white%20background%20product%20photography%20high%20quality%20detailed%20view&width=600&height=600&seq=prod1main&orientation=squarish",
//           "https://readdy.ai/api/search-image?query=wireless%20bluetooth%20headphones%20side%20profile%20view%20black%20premium%20design%20white%20background%20product%20photography%20studio%20lighting&width=600&height=600&seq=prod1side&orientation=squarish",
//           "https://readdy.ai/api/search-image?query=bluetooth%20headphones%20charging%20case%20accessories%20white%20background%20product%20photography%20studio%20lighting%20premium%20design&width=600&height=600&seq=prod1acc&orientation=squarish",
//           "https://readdy.ai/api/search-image?query=wireless%20headphones%20controls%20buttons%20detail%20close%20up%20white%20background%20product%20photography%20studio%20lighting&width=600&height=600&seq=prod1detail&orientation=squarish",
//         ],
//         sizes: ["S", "M", "L", "XL"],
//         colors: ["Black", "White", "Gray"],
//         deliveryOptions: [
//           { type: "Standard", time: "5-7 business days", price: 9.99 },
//           { type: "Express", time: "2-3 business days", price: 19.99 },
//           { type: "Overnight", time: "1 business day", price: 39.99 },
//         ],
//         offers: [
//           "10% off on orders over $200",
//           "Free shipping on orders over $150",
//           "30-day money back guarantee",
//         ],
//       },
//     };

//     // Return product if found, otherwise fallback to first product
//     return products[id] ?? products["1"];
//   };

//   const product = getProductData(productId);

//   const toggleStatus = () => {
//     setProductStatus(productStatus === "active" ? "inactive" : "active");
//   };

//   const getStatusColor = (status) => {
//     return status === "active"
//       ? "bg-green-100 text-green-800"
//       : "bg-red-100 text-red-800";
//   };

//   const reviews = [
//     {
//       id: 1,
//       user: "Sarah Johnson",
//       rating: 5,
//       date: "2024-01-15",
//       comment:
//         "Exceptional sound quality and comfort. The noise cancellation works perfectly for my daily commute.",
//       verified: true,
//     },
//     {
//       id: 2,
//       user: "Mike Chen",
//       rating: 5,
//       date: "2024-01-10",
//       comment:
//         "Battery life is amazing! I can use them for days without charging. Great build quality.",
//       verified: true,
//     },
//     {
//       id: 3,
//       user: "Emma Davis",
//       rating: 4,
//       date: "2024-01-08",
//       comment:
//         "Very comfortable for long listening sessions. Sound is crystal clear with great bass.",
//       verified: true,
//     },
//   ];

//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <i
//         key={i}
//         className={`ri-star-${
//           i < Math.floor(rating) ? "fill" : "line"
//         } text-yellow-400`}
//       ></i>
//     ));
//   };

//   return (
//     <>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-900">
//               Product Details
//             </h2>
//             <p className="text-gray-600">View and manage product information</p>
//           </div>
//           <div className="flex items-center space-x-3">
//             {/* <Link
//               to={`/admin/products/edit/${productId}`}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap cursor-pointer"
//             >
//               <i className="ri-edit-line mr-2"></i>
//               Edit Product
//             </Link> */}
//             <Link
//               to="/admin/products"
//               className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center whitespace-nowrap cursor-pointer"
//             >
//               <i className="ri-arrow-left-line mr-2"></i>
//               Back to Products
//             </Link>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Product Images
//               </h3>

//               <div className="space-y-4">
//                 <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
//                   <img
//                     src={product.images[activeImageIndex]}
//                     alt={product.name}
//                     className="w-full h-full object-cover object-top"
//                   />
//                 </div>

//                 <div className="grid grid-cols-4 gap-2">
//                   {product.images.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setActiveImageIndex(index)}
//                       className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${
//                         activeImageIndex === index
//                           ? "border-blue-500"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                     >
//                       <img
//                         src={image}
//                         alt={`${product.name} ${index + 1}`}
//                         className="w-full h-full object-cover object-top"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Description & Specifications
//               </h3>

//               <div className="space-y-4">
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2">
//                     Product Description
//                   </h4>
//                   <p className="text-gray-600 leading-relaxed">
//                     {product.description}
//                   </p>
//                 </div>

//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">
//                     Specifications
//                   </h4>
//                   <div className="space-y-2">
//                     {product.specifications.map((spec, index) => (
//                       <div
//                         key={index}
//                         className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
//                       >
//                         <span className="text-gray-600">{spec.label}</span>
//                         <span className="font-medium text-gray-900">
//                           {spec.value}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Product Information
//               </h3>

//               <div className="space-y-4">
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">
//                     {product.name}
//                   </h1>
//                   <p className="text-gray-600 mt-1">SKU: {product.sku}</p>
//                 </div>

//                 <div className="flex items-center space-x-4">
//                   <span className="text-gray-600">Category:</span>
//                   <span className="font-medium text-gray-900">
//                     {product.category}
//                   </span>
//                   <span className="text-gray-400">&gt;</span>
//                   <span className="font-medium text-gray-900">
//                     {product.subcategory}
//                   </span>
//                 </div>

//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-baseline space-x-2">
//                     <span className="text-3xl font-bold text-gray-900">
//                       ${product.price}
//                     </span>
//                     <span className="text-lg text-gray-500 line-through">
//                       ${product.comparePrice}
//                     </span>
//                   </div>
//                   <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
//                     {Math.round(
//                       ((product.comparePrice - product.price) /
//                         product.comparePrice) *
//                         100
//                     )}
//                     % OFF
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div>
//                     <span className="text-gray-600">Stock: </span>
//                     <span className="font-medium text-gray-900">
//                       {product.stock} units
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <span className="text-gray-600">Status:</span>
//                     <button
//                       onClick={toggleStatus}
//                       className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${getStatusColor(
//                         productStatus
//                       )}`}
//                     >
//                       {productStatus === "active" ? "Active" : "Inactive"}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <div className="flex items-center">
//                     {renderStars(product.rating)}
//                   </div>
//                   <span className="font-medium text-gray-900">
//                     {product.rating}
//                   </span>
//                   <span className="text-gray-500">
//                     ({product.reviewCount} reviews)
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Available Sizes
//               </h3>

//               <div className="grid grid-cols-5 gap-2">
//                 {product.sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`py-2 px-3 border rounded-lg text-sm font-medium cursor-pointer transition-colors ${
//                       selectedSize === size
//                         ? "border-blue-500 bg-blue-50 text-blue-700"
//                         : "border-gray-300 text-gray-700 hover:border-gray-400"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Delivery Options
//               </h3>

//               <div className="space-y-3">
//                 {product.deliveryOptions.map((option, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center p-3 border border-gray-200 rounded-lg"
//                   >
//                     <div>
//                       <h4 className="font-medium text-gray-900">
//                         {option.type} Delivery
//                       </h4>
//                       <p className="text-sm text-gray-600">{option.time}</p>
//                     </div>
//                     <span className="font-medium text-gray-900">
//                       ${option.price}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Special Offers
//               </h3>

//               <div className="space-y-2">
//                 {product.offers.map((offer, index) => (
//                   <div key={index} className="flex items-center space-x-2">
//                     <i className="ri-checkbox-circle-fill text-green-500 w-4 h-4 flex items-center justify-center"></i>
//                     <span className="text-gray-700">{offer}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Customer Reviews
//           </h3>

//           <div className="space-y-4">
//             <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
//               <div className="flex items-center space-x-2">
//                 <div className="flex items-center">
//                   {renderStars(product.rating)}
//                 </div>
//                 <span className="text-2xl font-bold text-gray-900">
//                   {product.rating}
//                 </span>
//               </div>
//               <div className="text-gray-600">
//                 <span className="font-medium">{product.reviewCount}</span> total
//                 reviews
//               </div>
//             </div>

//             <div className="space-y-4">
//               {reviews.map((review) => (
//                 <div
//                   key={review.id}
//                   className="border-b border-gray-200 pb-4 last:border-b-0"
//                 >
//                   <div className="flex items-start justify-between mb-2">
//                     <div>
//                       <div className="flex items-center space-x-2">
//                         <h4 className="font-medium text-gray-900">
//                           {review.user}
//                         </h4>
//                         {review.verified && (
//                           <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
//                             Verified Purchase
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex items-center space-x-2 mt-1">
//                         <div className="flex items-center">
//                           {renderStars(review.rating)}
//                         </div>
//                         <span className="text-sm text-gray-500">
//                           {review.date}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-gray-700">{review.comment}</p>
//                 </div>
//               ))}
//             </div>

//             <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
//               Load More Reviews
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }






import { useState, useEffect, useRef } from "react";
import { FiHeart, FiShare2, FiStar, FiChevronLeft } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import img1 from "../../assets/details1.png";
import img2 from "../../assets/details2.png";
import img3 from "../../assets/details3.png";
import img4 from "../../assets/details4.png";

import { Heart } from "lucide-react";
import discountIcon from "../../assets/Layer_2.png";
import packageIcon from "../../assets/box.png";
import daysIcon from "../../assets/time.png";
import arrivalIcon from "../../assets/delivery-truck.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsByProduct } from "../../Redux/slices/reviewSlice";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../Redux/slices/productSlice";
import {
  fetchSimilarProducts,
  addRecentlyViewed,
  fetchRecentlyViewed,
} from "../../Redux/slices/filteredProductSlice";
import { addToCart } from "../../Redux/slices/cartSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  fetchWishlistByUserId,
  toggleWishlist,
} from "../../Redux/slices/wishlistSlice";

import { useNavigate } from "react-router-dom";
import { setBuyNowItem } from "../../Redux/slices/buyNowSlice";
import ShareButton from "../../Components/Custom/ShareButton";
import { fetchCartByUserId } from "../../Redux/slices/cartSlice";
import { checkPincodeServiceability } from "../../Redux/slices/ordersSlice";

const productData = {
  id: 1,
  category: "Girl Fashion",
  name: "Girl Jacket Jacket",
  price: 1500.0,
  images: [img1, img3, img4, img2],
  sizes: ["S", "M", "L", "XL", "XXL"],
  details: {
    name: "Girls casual wear denim jacket, blue denim jacket",
    fabric: "Denim",
    sleeveLength: "Long Sleeves",
    pattern: "Solid",
    netQuantity: "1",
    type: "Girls casual wear denim jacket",
    sizesInfo: [
      "0-1 Years (Bust Size: 10 in, Length Size: 14 in, Waist Size: 11 in, Hip Size: 12 in)",
      "1-2 Years (Bust Size: 11 in, Length Size: 15 in, Waist Size: 12 in, Hip Size: 13 in)",
    ],
    country: "India",
  },
  rating: 4.5,
  reviewsCount: 50,
  ratingBreakdown: [52, 28, 10, 5, 5], // Percentages for 5, 4, 3, 2, 1 stars
};

const ProductCard = ({ product }) => (
  <div className="group flex-shrink-0 w-48 md:w-56">
    <div className="relative w-full overflow-hidden">
      <img
        src={product?.image}
        alt={product?.title}
        className="w-full h-auto aspect-[3/4] object-cover rounded-md"
      />
      <div className="absolute top-2 right-2 p-1.5 bg-white bg-opacity-70 rounded-full cursor-pointer">
        <FiHeart className="text-gray-600" />
      </div>
      {product?.rating && (
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-white bg-opacity-80 rounded-sm text-xs font-semibold flex items-center gap-1">
          {product?.rating} <span className="text-pink-500">|</span>{" "}
          {product?.reviews}
        </div>
      )}
    </div>
    <div className="mt-2 text-sm">
      <p className="font-bold text-gray-800"> Nallakkar</p>
      <p className="text-gray-500 truncate">{product?.title}</p>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-darkpink font-semibold text-sm">₹{product?.final_price}</p>
      </div>
    </div>
  </div>
);

const ProductCarousel = ({ title, products }) => (
  <div className="py-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
    <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </div>
);

export default function InvestorProductDetails() {
  const [selectedImage, setSelectedImage] = useState(productData.images[0]);
  // const [selectedSize, setSelectedSize] = useState("M");
  // const [wishlist, setWishlist] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState(null);
  const [checking, setChecking] = useState(false);
  // ProductDetailsPage function ke andar
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const mainImageRef = useRef(null); // Main image container ko reference karne ke liye
  const wishlist = useSelector((state) => state.wishlist.items || []);
  const navigate = useNavigate();

  // Mouse ko image par move karne par position calculate karta hai
  const handleMouseMove = (e) => {
    if (!mainImageRef.current) return;

    // Get the bounding rectangle of the image container
    const rect = mainImageRef.current.getBoundingClientRect();

    // Mouse position relative to the element (0 to width/height)
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage position (0 to 100)
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setZoomPosition({ x: xPercent, y: yPercent });
  };

  // Zoom state ko on/off karta hai
  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  const dispatch = useDispatch();
  const productId = useParams();
  const userString = localStorage.getItem("user");

  // Parse it into an object
  const user = JSON.parse(userString);
  // Access the id
  const userId = user?.id;

  useEffect(() => {
    dispatch(fetchReviewsByProduct(2));
    dispatch(fetchProductById(productId?.id));
    dispatch(fetchSimilarProducts(productId?.id));
    dispatch(addRecentlyViewed({ userId, productId: productId?.id }));
    dispatch(fetchRecentlyViewed(userId));
  }, [dispatch, productId?.id]);
  const reviews = useSelector((state) => state)?.reviews?.productReviews;

  const product = useSelector((state) => state)?.products?.productData?.data;
  const similarProducts = useSelector(
    (state) => state?.filteredProducts?.similarProducts
  );
  const recentlyViewed = useSelector(
    (state) => state?.filteredProducts?.recentlyViewed
  );

  // ---------------- SOME USEFFECTS

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistByUserId(userId));
    }
  }, [dispatch, userId]);

  // HERE ADDING THE FUNCTIONALITY OF ADDING THE PRODUCT TO WISHLIST
  const handleWishlist = async (productId) => {
    const isFavourite = !wishlist?.some((w) => w.productId === productId);
    await dispatch(toggleWishlist({ productId, userId, isFavourite })).unwrap();
    dispatch(fetchWishlistByUserId(userId));
  };

  const cart = useSelector((state) => state.cart.items || []);


  const handleAddToCart = () => {
    if (!userId) {
      alert("Please login to add items to cart");
      return;
    }


    // ProductDetailsPage function ke andar


    // Ensure all variant selections are made
    const requiredVariants = product?.variants
      ? Object.keys(product.variants)
      : [];
    const missingVariants = requiredVariants.filter((v) => !selectedVariant[v]);
    if (missingVariants.length > 0) {
      alert(`Please select: ${missingVariants.join(", ")}`);
      return;
    }

    // If already in cart → navigate directly
    if (Array.isArray(cart) && cart.some((c) => c?.productId === product?.id)) {
      navigate("/cart");
      return;
    }

    const payload = {
      userId,
      productId: product?.id,
      variant: selectedVariant,
      quantity: 1, // You can later add quantity selector
    };

    dispatch(addToCart(payload))
      .unwrap()
      .then((res) => {
        alert("Product added to cart!");
        // Fetch updated cart so UI updates without refresh
        dispatch(fetchCartByUserId(userId));
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add to cart");
      });
  };

  const handleCheckPincode = async () => {
    if (!pincode) {
      alert("Please enter a valid pincode");
      return;
    }

    try {
      setChecking(true);
      const response = await dispatch(checkPincodeServiceability(pincode)).unwrap();

      if (response?.success) {
        setPincodeResult({
          available: true,
          message: `✅ Delivery available to ${pincode}`,
        });
      } else {
        setPincodeResult({
          available: false,
          message: `❌ Delivery not available to ${pincode}`,
        });
      }
    } catch (error) {
      console.error(error);
      setPincodeResult({
        available: false,
        message: "Error checking pincode serviceability.",
      });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartByUserId(userId))
        .unwrap()
        // .then((res) => console.log("Fetched cart:", res))
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [dispatch, userId]);

  const isInCart = Array.isArray(cart) && cart.some((c) => c?.productId === product?.id);


  const handleBuyNow = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!product) {
      alert("Product not loaded yet. Please wait.");
      return;
    }

    // ✅ Check if the product actually has variants
    const hasVariants =
      product?.variants &&
      Object.keys(product.variants).length > 0 &&
      Array.isArray(product.variants.size) &&
      product.variants.size.length > 0;

    // ✅ If product has variants but user hasn't selected one → alert
    if (hasVariants && !selectedVariant) {
      alert("Please select a size before proceeding.");
      return;
    }

    // ✅ Build the payload
    const payload = {
      product,
      variant: selectedVariant || "Default", // fallback if no variant system
      quantity: 1,
    };

    // inside handleBuyNow before navigate
    localStorage.setItem("buyNowItem", JSON.stringify(payload));


    // ✅ Dispatch and navigate
    dispatch(setBuyNowItem(payload));
    navigate("/buyNow");
  };


  // Custom Arrows
  const NextArrow = ({ onClick }) => (
    <button
      className="w-10 h-10 flex items-center justify-center rounded-full  text-black absolute -bottom-14 right-[45%] z-10 shadow-md"
      style={{ backgroundColor: "#1a214c", color: "white" }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      className="w-10  h-10 flex items-center justify-center rounded-full  text-black absolute -bottom-14 left-[48%] z-10 shadow-md"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );

  // Slider Settings
  const sliderSettings = {
    dots: false, // dots hata diye
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  useEffect(() => {
    if (product?.image?.length > 0) {
      setSelectedImage(product?.image[0]);
    }
  }, [product]);

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


  const getRatingBreakdown = (stats) => {
    const total = Number(stats?.totalReviews) || 1;

    return [
      { stars: 5, count: Number(stats?.fiveStar) },
      { stars: 4, count: Number(stats?.fourStar) },
      { stars: 3, count: Number(stats?.threeStar) },
      { stars: 2, count: Number(stats?.twoStar) },
      { stars: 1, count: Number(stats?.oneStar) },
    ].map((item) => ({
      ...item,
      percent: (item.count / total) * 100,
    }));
  };
  const RatingBreakdown = ({ stats }) => {
    const ratingBreakdown = getRatingBreakdown(stats);

    return (
      <div className="mt-4 space-y-1">
        {ratingBreakdown?.map((item) => (
          <div
            key={item?.stars}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <span>{item?.stars}</span>
            <FaStar className="text-yellow-400" />
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-yellow-400 h-1.5 rounded-full"
                style={{ width: `${item?.percent}%` }}
              ></div>
            </div>
            <span className="ml-2 text-xs">{item?.count}</span>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="bg-white font-sans mb-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="pt-8 flex justify-between items-center">
          <button className="flex items-center gap-2">
            <FiChevronLeft size={20} />
           
            <span onClick={() => navigate(-1)}>Home</span>/ Product details

          </button>
          {/* <button className="flex items-center gap-2">
            <FiShare2 size={20} />
            <span className="hidden sm:block">Share</span>
          </button> */}

          <ShareButton product={product} />
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-x-[2rem] mt-8 **relative**">
          <div className="**relative**">
            <div>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnail Section */}
                <div className="order-2 md:order-1 flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
                  {product?.image?.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-28 md:w-28 md:h-40 rounded-lg overflow-hidden border-2 flex-shrink-0 ${selectedImage === img
                        ? "border-gray-800"
                        : "border-transparent"
                        }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image Section */}


                <div className="order-1 md:order-2 flex-1 relative">
                  <div
                    ref={mainImageRef}
                    className="w-full h-[400px] md:h-[680px] rounded-lg  relative overflow-hidden cursor-crosshair" // Added overflow-hidden for safety & cursor-crosshair
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                  >
                    {/* Main image jisko hum zoom kar rahe hain */}
                    <img
                      src={selectedImage}
                      alt={product?.name || "Product image"}
                      className="w-full h-full object-cover" // Image fill karega container ko
                    />


                  </div>
                </div>

                {/* HERE IS THE MAIN CHANGE: Position changed to absolute and left adjusted */}
                {isZoomed && (
                  <div
                    className="hidden lg:block w-[100%] max-w-[500px] h-[500px] border-2 border-gray-300 rounded-lg shadow-xl absolute left-[52%] top-30 "
                    style={{
                      backgroundImage: `url(${selectedImage})`,
                      backgroundSize: '250%',
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }}
                  />
                )}

              </div>
            </div>

            {/* Ratings & Reviews (image ke neeche) */}
            <section className="my-16 hidden lg:block">
              <div className="border rounded-lg p-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    Product Ratings & Reviews
                  </h2>
                  <div className="flex items-center gap-4">
                    <p className="text-5xl font-bold">
                      {reviews?.stats?.avgRating}/5
                    </p>
                    <div>
                      <p className="text-gray-600">
                        {reviews?.stats?.totalReviews} New Reviews
                      </p>
                    </div>
                  </div>
                  {/* <div className="mt-4 space-y-1">
                    {productData.ratingBreakdown.map((percent, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span>{5 - index}</span>{" "}
                        <FaStar className="text-yellow-400" />
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-yellow-400 h-1.5 rounded-full"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div> */}
                  <RatingBreakdown stats={reviews?.stats} />
                </div>

                <div className="mt-8 pt-6 border-t">
                  <div className="max-h-72 overflow-y-auto custom-scrollbar pr-4 space-y-8">
                    {reviews?.reviews?.map((review) => (
                      <div key={review?.id}>
                        <div className="flex items-center gap-3">
                          <img
                            src="https://i.pravatar.cc/50"
                            alt="Reviewer"
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <p className="font-bold">{review?.userName}</p>
                            <div className="flex text-yellow-400">
                              {[...Array(review?.rating)]?.map((_, i) => (
                                <FaStar key={i} />
                              ))}
                              {[...Array(5 - review?.rating)]?.map((_, i) => (
                                <FiStar key={i} className="text-gray-300" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-4 text-sm italic">
                          {review?.review}
                        </p>
                        {review?.images?.length > 0 && (
                          <div className="flex gap-3 mt-4">
                            {review?.images?.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt={`Review image ${i + 1}`}
                                className="w-20 h-20 rounded-md object-cover"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Product Information */}
          <div className="flex flex-col gap-y-6 lg:mt-0 lg:pl-[2rem] lg:border-l-2">
            <div>

              <h1 className="text-3xl -mb-2 font-extrabold text-gray-900">
                {product?.name}
              </h1>
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-900">
                ₹{product?.final_price}
              </p>
              <p className="text-sm font-medium mt-4">
                Order in 12h 30m to get next day delivery
              </p>
              <p className="text-sm font-medium mt-4 text-primary">
                {product?.productCode}
              </p>
            </div>
            {/* Variants Section */}
            <div>
              {product?.variants &&
                Object?.keys(product?.variants)?.map((variantKey) => (
                  <div key={variantKey} className="mb-4">
                    <p className="text-sm font-bold mb-3">{`Select ${variantKey}`}</p>
                    <div className="flex flex-wrap gap-3">
                      {product.variants[variantKey].map((option) => (
                        <button
                          key={option}
                          onClick={() =>
                            setSelectedVariant((prev) => ({
                              ...prev,
                              [variantKey]: option,
                            }))
                          }
                          className={`px-4 py-2 rounded-[3px] font-bold text-sm transition-colors
                ${selectedVariant[variantKey] === option
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-primary border border-gray-300 hover:bg-gray-200"
                            }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

           
            <div>
              <p className="font-bold text-[20px] mb-2">Delivery Options</p>
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Pincode"
                  className="flex-grow p-2 outline-none"
                />
                <button
                  onClick={handleCheckPincode}
                  disabled={checking}
                  className={`px-4 font-bold transition ${checking ? "bg-gray-300 text-gray-600" : "text-rose bg-gray-50 hover:bg-gray-100"
                    }`}
                >
                  {checking ? "Checking..." : "Check"}
                </button>
              </div>

              {/* Show result below */}
              {pincodeResult && (
                <p
                  className={`text-sm mt-2 ${pincodeResult.available ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {pincodeResult.message}
                </p>
              )}

              <p className="text-xs text-gray-500 mt-2">
                Please enter pincode to check delivery time & Pay on Delivery
                Availability
              </p>
            </div>

            <div className="-mt-3 font-medium space-y-1">
              <p>{product?.description}</p>
              {/* <p>
                 <span>100% Original Products</span>
              </p>
              <p>Pay on delivery might be available</p>
              <p>Easy 7 days returns and exchanges</p> */}
            </div>

            {/* <div>
              <h3 className="font-bold text-[20px] mb-2">Available offers</h3>
              <p className="text-sm">
                <span className="text-gray-500 font-bold">Bank Offer</span> 100%
                Cashback upto 500Rs on Axis Bank SuperMoney Rupay CC UPI
                transactions on super.money UPI{" "}
                <span className="text-[#114bbe]">T&C</span>
              </p>
              <p className="text-sm mt-3">
                <span className="text-gray-500 font-bold">Bank Offer</span> 100%
                Cashback upto 500Rs on Axis Bank SuperMoney Rupay CC UPI
                transactions on super.money UPI{" "}
                <span className="text-[#114bbe]">T&C</span>
              </p>
            </div> */}

            {/* Product Details - Updated Structure */}
            <div className=" text-sm">
              <div className="max-w-md bg-white rounded-xl shadow p-4 border">
                <h2 className="text-lg font-bold mb-3">Shipping</h2>

                <div className="grid grid-cols-2 gap-y-4">
                  {/* Discount */}
                  <div className="flex items-center gap-2">
                    <img
                      src={discountIcon}
                      alt="Discount"
                      className="w-6 h-6"
                    />
                    <div>
                      <p className="text-sm text-gray-500">Discount</p>
                      <p className="text-sm font-semibold">Dis 30%</p>
                    </div>
                  </div>

                  {/* Package */}
                  <div className="flex items-center gap-2">
                    <img src={packageIcon} alt="Package" className="w-6 h-6" />
                    <div>
                      <p className="text-sm text-gray-500">Package</p>
                      <p className="text-sm font-semibold">Regular Package</p>
                    </div>
                  </div>

                  {/* Delivery Days */}
                  <div className="flex items-center gap-2">
                    <img
                      src={daysIcon}
                      alt="Working Days"
                      className="w-6 h-6"
                    />
                    <div>
                      <p className="text-sm text-gray-500">Discount</p>
                      <p className="text-sm font-semibold">3-4 Working days</p>
                    </div>
                  </div>

                  {/* Estimated Arrival */}
                  <div className="flex items-center gap-2">
                    <img src={arrivalIcon} alt="Arrival" className="w-6 h-6" />
                    <div>
                      <p className="text-sm text-gray-500">Estimated Arrival</p>
                      <p className="text-sm font-semibold">23-06-2025</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 text-[15px] font-bold text-gray-600 space-y-2">
                <p>{product?.description2}</p>
                {/* <p>
                  <span>Name:</span> {productData.details.name}
                </p>
                <p>
                  <span>Fabric:</span> {productData.details.fabric}
                </p>
                <p>
                  <span>Sleeve Length:</span> {productData.details.sleeveLength}
                </p>
                <p>
                  <span>Pattern:</span> {productData.details.pattern}
                </p>
                <p>
                  <span>Net Quantity (N):</span>{" "}
                  {productData.details.netQuantity}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Type:</span>{" "}
                  {productData.details.type}
                </p>
                <div className="mt-2">
                  <p>Sizes:</p>
                  {productData.details.sizesInfo.map((info, i) => (
                    <p key={i}>{info}</p>
                  ))}
                </div>
                <p className="mt-2">
                  <span>Country of Origin:</span> {productData.details.country}
                </p>
                <button className=" underline font-bold mt-2">
                  More Information
                </button>*/}
              </div>
            </div>
          </div>

          {/* Reviews - Mobile */}
          <section className="my-16 block lg:hidden">
            <div className="border rounded-lg p-6">
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Product Ratings & Reviews
                </h2>
                <div className="flex items-center gap-4">
                  <p className="text-5xl font-bold">
                    {" "}
                    {reviews?.stats?.avgRating}/5
                  </p>
                  <div>
                    <p className="text-gray-600">
                      {reviews?.stats?.totalReviews} New Reviews
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <RatingBreakdown stats={reviews?.stats} />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <div className="max-h-72 overflow-y-auto custom-scrollbar pr-4 space-y-8">
                  {reviews?.reviews?.map((review) => (
                    <div key={review.id}>
                      <div className="flex items-center gap-3">
                        <img
                          src="https://i.pravatar.cc/50"
                          alt="Reviewer"
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-bold">{review?.userName}</p>
                          <div className="flex text-yellow-400">
                            {[...Array(review?.rating)]?.map((_, i) => (
                              <FaStar key={i} />
                            ))}
                            {[...Array(5 - review.rating)]?.map((_, i) => (
                              <FiStar key={i} className="text-gray-300" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-4 text-sm italic">
                        {review?.comment}
                      </p>
                      {review?.images?.length > 0 && (
                        <div className="flex gap-3 mt-4">
                          {review?.images?.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`Review image ${i + 1}`}
                              className="w-20 h-20 rounded-md object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

     


    
      </div>
    </div>
  );
}




