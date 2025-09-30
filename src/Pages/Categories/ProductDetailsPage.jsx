

import React, { useState,useEffect } from "react";
import { FiHeart, FiShare2, FiStar, FiChevronLeft } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import img1 from "../../assets/details1.png";
import img2 from "../../assets/details2.png";
import img3 from "../../assets/details3.png";
import img4 from "../../assets/details4.png";
import man from "../../assets/man.png";
import shoes from "../../assets/mens.png";
import jacket from "../../assets/women-white.png";
import women from "../../assets/dancing-team-studio.png";
import doll from "../../assets/3d-children.png";
import { Heart } from "lucide-react";
import discountIcon from "../../assets/Layer_2.png"; // replace with your icon
import packageIcon from "../../assets/box.png"; 
import daysIcon from "../../assets/time.png";  
import arrivalIcon from "../../assets/delivery-truck.png";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
  import { fetchReviewsByProduct } from "../../Redux/slices/reviewSlice";
  import { useParams } from "react-router-dom";
  import { fetchProductById , fetchSimilarProducts} from "../../Redux/slices/productSlice";
import Slider from "react-slick"; // Assuming react-slick
  import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
        <p className="text-darkpink font-semibold text-sm">₹{product?.price}</p>
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



export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(productData.images[0]);
  // const [selectedSize, setSelectedSize] = useState("M");
  const [wishlist, setWishlist] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState({});

const dispatch = useDispatch();
const productId = useParams();
  useEffect(() => {
    dispatch(fetchReviewsByProduct(2));
    dispatch(fetchProductById(productId?.id));
    dispatch(fetchSimilarProducts(productId?.id))
  }, [dispatch]);
  const reviews = useSelector((state) => state)?.reviews?.productReviews;
  // console.log("reviews",reviews)
  const toggleWishlist = (index) => {
    setWishlist((prev) =>
      prev.includes(index)
        ? prev.filter((id) => id !== index)
        : [...prev, index]
    );
  };
  
  const product = useSelector((state) => state)?.products?.productData?.data;
  const  similarProducts = useSelector((state)=>state?.products?.similarProducts)


// Custom Arrows
const NextArrow = ({ onClick }) => (
  <button
    className="w-10 h-10 flex items-center justify-center rounded-full  text-black absolute -bottom-14 right-[45%] z-10 shadow-md" style={{backgroundColor: "#1a214c", color: "white"}}
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="w-10  h-10 flex items-center justify-center rounded-full  text-black absolute -bottom-14 left-[48%] z-10 shadow-md"
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

// Slider Settings
const sliderSettings = {
  dots: false,   // dots hata diye
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

  console.log("similarProducts1",similarProducts)
  console.log("product",product)



  
  // setSelectedImage(product?.image[0] || "");
  // const stats = reviews?.stats || {};
  useEffect(() => {
  if (product?.image?.length > 0) {
    setSelectedImage(product?.image[0]);
  }
}, [product]);
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
            <span className="font-medium text-xl">
              <Link to={"/MainHome"}>Home</Link> / Product details
            </span>
          </button>
          <button className="flex items-center gap-2">
            <FiShare2 size={20} />
            <span className="hidden sm:block">Share</span>
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-x-[2rem] mt-8">
          <div>
           <div className="flex flex-col md:flex-row gap-4">
  {/* Thumbnail Section */}
  <div className="order-2 md:order-1 flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
    {product?.image?.map((img, index) => (
      <button
        key={index}
        onClick={() => setSelectedImage(img)}
        className={`w-20 h-28 md:w-28 md:h-40 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
          selectedImage === img ? "border-gray-800" : "border-transparent"
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
  <div className="order-1 md:order-2 flex-1">
    <img
      src={selectedImage}
      alt="Selected Product"
      className="w-full h-[400px] md:h-[680px] object-cover rounded-lg aspect-[4/5]"
    />
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
                    <p className="text-5xl font-bold">{reviews?.stats?.avgRating}/5</p>
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
              <button className="text-xs mb-4 uppercase font-bold border py-1 px-2 rounded-sm text-gray-400 tracking-wider">
                {productData?.category}
              </button>
              <h1 className="text-3xl -mb-2 font-extrabold text-gray-900">
                {product?.name}
              </h1>
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-900">
                ₹{product?.price}
              </p>
              <p className="text-sm font-medium mt-4">
                Order in 12h 30m to get next day delivery
              </p>
            </div>
             <div>
  { Array.isArray(product?.variants) && product.variants.length > 0 &&
  Object.keys(product.variants[0]).map((key) => (
    <div key={key} className="mb-4">
      <p className="text-sm font-bold mb-3">{`Select ${key}`}</p>
      <div className="flex flex-wrap gap-3">
        {Array?.from(new Set(product?.variants?.map(v => v[key]))).map(option => (
          <button
            key={option}
            onClick={() =>
              setSelectedVariant(prev => ({ ...prev, [key]: option }))
            }
            className={`w-20 h-12 flex items-center justify-center rounded-[3px] font-bold text-lg transition-colors
              ${selectedVariant[key] === option
                ? "bg-primary text-white"
                : "bg-gray-100 text-primary border-gray-300 hover:bg-gray-100"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  ))}
</div>

            {/* <div>
              <p className="text-sm font-bold mb-3">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {productData?.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-16 h-12 flex items-center justify-center rounded-[3px] font-bold text-lg transition-colors
                                            ${
                                              selectedSize === size
                                                ? "bg-primary text-white"
                                                : "bg-gray-100 text-primary border-gray-300 hover:bg-gray-100"
                                            }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div> */}

            <div className="flex gap-4 items-center">
              <Link
                to={"/cart"}
                className="py-3 px-6 bg-primary text-white font-bold transition-colors"
              >
                Add to Cart
              </Link>
              <Link
                to={"/buyNow"}
                className="py-3 px-8 bg-rose text-white font-bold transition-colors"
              >
                Buy Now
              </Link>
              <button className="p-3 rounded-md hover:bg-gray-100 transition-colors">
                <FiHeart size={24} className="text-gray-600" />
              </button>
            </div>

            <div>
              <p className="font-bold text-[20px] mb-2">Delivery Options</p>
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="flex-grow p-2 outline-none"
                />
                <button className="px-4 text-rose font-bold bg-gray-50 hover:bg-gray-100">
                  Check
                </button>
              </div>
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

            <div>
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
            </div>

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
                <p>
                  {product?.description2}
                </p>
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
                  <p className="text-5xl font-bold"> {reviews?.stats?.avgRating}/5</p>
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

        {/* --- SIMILAR PRODUCTS SLIDER CHANGE --- */}
        <div className="py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Similar Products
          </h2>
          {/* Change 1: Replace the old flex container with Slider component */}
          <div className="slider-container">
            {/* Pass the settings to the Slider component */}
            <Slider {...sliderSettings}>
              {similarProducts?.map((item, index) => (
                // Important: The Slider requires direct children, so remove flex-shrink-0 or min-w/w classes on the wrapper inside the map if they conflict with the library's styling. The library will handle the layout.
                <div
                  key={index}
                  className={`group slidercard text-center bg-white p-2 transition-all duration-300 transform ${
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
                        alt={item?.title}
                        className={`w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover transition-transform duration-300 ${
                          activeCard === index
                            ? "scale-105"
                            : "group-hover:scale-105"
                        }`}
                      />
                    </Link>

                    {/* Hover Add to Cart Button with Icon */}
                    <Link to={`/product/${item?.id}`}>
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
                      <span>{item?.rating}</span> •{" "}
                      <span>{item?.reviewCount}</span>
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
                    {item?.name}
                  </p>

                  <div className="flex justify-between items-center gap-2 mt-1 px-2 pb-2">
                    <span className="text-darkpink font-semibold text-sm">
                      {item?.price}
                    </span>
                    <span className="text-gray-500 text-xs">
                      ( {item?.discount}% )
                    </span>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        {/* --- SIMILAR PRODUCTS SLIDER CHANGE END --- */}


        {/* --- RECENTLY VIEWED SLIDER CHANGE --- */}
        <div className="pb-14 pt-14">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-5">
            Recently Viewed
          </h2>
          {/* Change 2: Replace the old flex container with Slider component */}
          <div className="slider-container">
            <Slider {...sliderSettings}>
              {/* Using similarProducts as a placeholder for recently viewed data */}
              {similarProducts?.map((item, index) => (
                <div
                  key={index}
                  className={`group text-center bg-white p-2 transition-all duration-300 transform ${
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
                        src={item.image[0]}
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
                      <span>{item.rating}</span> •{" "}
                      <span>{item?.reviewCount}</span>
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
                    {item?.name}
                  </p>

                  <div className="flex justify-between items-center gap-2 mt-1 px-2 pb-2">
                    <span className="text-darkpink font-semibold text-sm">
                      {item.price}
                    </span>
                    <span className="text-gray-500 text-xs">
                      ( {item.discount}% )
                    </span>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
