import React, { useState } from "react";
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
import packageIcon from "../../assets/box.png"; // replace with your icon
import daysIcon from "../../assets/time.png"; // replace with your icon
import arrivalIcon from "../../assets/delivery-truck.png";
import { Link } from "react-router-dom";

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

const reviewsData = [
  {
    id: 1,
    author: "Naveena Reddy",
    rating: 5,
    comment:
      "\"NallaKar dedication to sustainable and ethical practices resonates strongly with me. As a consumer, it's reassuring to know that I'm supporting a brand that values the planet.\"",
    images: [img1, img2, img3],
  },
  {
    id: 3,
    author: "Priya Patel",
    rating: 5,
    comment:
      '"Absolutely beautiful product. Looks even better in person than in the pictures. Highly recommend!"',
    images: [img4],
  },
  {
    id: 2,
    author: "Rohan Sharma",
    rating: 4,
    comment:
      '"Great quality jacket, my daughter loves it. The fit is perfect. The delivery was also very fast."',
    images: [],
  },
];

const similarProducts = [
  {
    title: "Men Regular Fit Self Design Light Shirt",
    price: " 529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    image: man,
  },
  {
    title: "Men Regular Fit Self Design Light Shirt",
    price: " 529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    image: shoes,
  },
  {
    title: "Men Regular Fit Self Design Light Shirt",
    price: " 529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    image: jacket,
  },
  {
    title: "Men Regular Fit Self Design Light Shirt",
    price: " 529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    image: women,
  },
  {
    title: "Men Regular Fit Self Design Light Shirt",
    price: " 529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    image: doll,
  },
];

const ProductCard = ({ product }) => (
  <div className="group flex-shrink-0 w-48 md:w-56">
    <div className="relative w-full overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
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
      <p className="font-bold text-gray-800"> Nallakkar</p>
      <p className="text-gray-500 truncate">{product.title}</p>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-darkpink font-semibold text-sm">₹{product.price}</p>
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
  const [selectedSize, setSelectedSize] = useState("M");
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
    <div className="bg-white font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="pt-8 flex justify-between items-center">
          <button className="flex items-center gap-2">
            <FiChevronLeft size={20} />
            <span className="font-medium text-xl">Home / Product details</span>
          </button>
          <button className="flex items-center gap-2">
            <FiShare2 size={20} />
            <span className="hidden sm:block">Share</span>
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-x-[2rem] mt-8">
          <div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-4">
                {productData.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-28 h-40 rounded-lg overflow-hidden border-2 ${
                      selectedImage === img
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

              <div className="flex-1">
                <img
                  src={selectedImage}
                  alt="Selected Product"
                  className="w-full h-[680px] object-cover rounded-lg aspect-[4/5]"
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
                    <p className="text-5xl font-bold">{productData.rating}/5</p>
                    <div>
                      <p className="text-gray-600">
                        {productData.reviewsCount} New Reviews
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1">
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
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <div className="max-h-72 overflow-y-auto custom-scrollbar pr-4 space-y-8">
                    {reviewsData.map((review) => (
                      <div key={review.id}>
                        <div className="flex items-center gap-3">
                          <img
                            src="https://i.pravatar.cc/50"
                            alt="Reviewer"
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <p className="font-bold">{review.author}</p>
                            <div className="flex text-yellow-400">
                              {[...Array(review.rating)].map((_, i) => (
                                <FaStar key={i} />
                              ))}
                              {[...Array(5 - review.rating)].map((_, i) => (
                                <FiStar key={i} className="text-gray-300" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-4 text-sm italic">
                          {review.comment}
                        </p>
                        {review.images.length > 0 && (
                          <div className="flex gap-3 mt-4">
                            {review.images.map((img, i) => (
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
          <div className="flex flex-col gap-y-6 lg:mt-0 pl-[2rem] border-l-2">
            <div>
              <button className="text-xs mb-4 uppercase font-bold border py-1 px-2 rounded-sm text-gray-400 tracking-wider">
                {productData.category}
              </button>
              <h1 className="text-3xl -mb-2 font-extrabold text-gray-900">
                {productData.name}
              </h1>
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-900">
                ₹{productData.price.toFixed(2)}
              </p>
              <p className="text-sm font-medium mt-4">
                Order in 12h 30m to get next day delivery
              </p>
            </div>

            <div>
              <p className="text-sm font-bold mb-3">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((size) => (
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
            </div>

            <div className="flex gap-4 items-center">
              <Link to={'/cart'} className="py-3 px-6 bg-primary text-white font-bold transition-colors">
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
              <p>
                <span>100% Original Products</span>
              </p>
              <p>Pay on delivery might be available</p>
              <p>Easy 7 days returns and exchanges</p>
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
            <div className="bg-gray-50 text-sm">
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
                </button>
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
                  <p className="text-5xl font-bold">{productData.rating}/5</p>
                  <div>
                    <p className="text-gray-600">
                      {productData.reviewsCount} New Reviews
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-1">
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
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <div className="max-h-72 overflow-y-auto custom-scrollbar pr-4 space-y-8">
                  {reviewsData.map((review) => (
                    <div key={review.id}>
                      <div className="flex items-center gap-3">
                        <img
                          src="https://i.pravatar.cc/50"
                          alt="Reviewer"
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-bold">{review.author}</p>
                          <div className="flex text-yellow-400">
                            {[...Array(review.rating)].map((_, i) => (
                              <FaStar key={i} />
                            ))}
                            {[...Array(5 - review.rating)].map((_, i) => (
                              <FiStar key={i} className="text-gray-300" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-4 text-sm italic">
                        {review.comment}
                      </p>
                      {review.images.length > 0 && (
                        <div className="flex gap-3 mt-4">
                          {review.images.map((img, i) => (
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

        <div className="py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Similar Products
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar">
            {similarProducts.map((item, index) => (
              <div
                key={index}
                className={`text-center min-w-[160px] sm:min-w-[200px] md:min-w-0 bg-white transition-all duration-300 transform ${
                  activeCard === index
                    ? "shadow-xl scale-[1.02]"
                    : "hover:shadow-lg hover:-translate-y-1"
                }`}
                onMouseDown={() => setActiveCard(index)}
                onMouseUp={() => setActiveCard(null)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover transition-transform duration-300 ${
                      activeCard === index ? "scale-105" : "hover:scale-105"
                    }`}
                  />
                  {/* Rating */}
                  <div className="absolute bottom-2 left-2 bg-white text-xs px-2 py-1 rounded shadow text-gray-700 flex items-center gap-1">
                    <span>{item.rating}</span> • <span>{item.reviews}</span>
                  </div>
                  {/* Heart Icon */}
                  <button
                    onClick={() => toggleWishlist(index)}
                    className="absolute top-2 right-2  p-1 transition hover:scale-110"
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

        <div className="pb-14">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recently Viewed
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar">
            {similarProducts.map((item, index) => (
              <div
                key={index}
                className={`text-center min-w-[160px] sm:min-w-[200px] md:min-w-0 bg-white transition-all duration-300 transform ${
                  activeCard === index
                    ? "shadow-xl scale-[1.02]"
                    : "hover:shadow-lg hover:-translate-y-1"
                }`}
                onMouseDown={() => setActiveCard(index)}
                onMouseUp={() => setActiveCard(null)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover transition-transform duration-300 ${
                      activeCard === index ? "scale-105" : "hover:scale-105"
                    }`}
                  />
                  {/* Rating */}
                  <div className="absolute bottom-2 left-2 bg-white text-xs px-2 py-1 rounded shadow text-gray-700 flex items-center gap-1">
                    <span>{item.rating}</span> • <span>{item.reviews}</span>
                  </div>
                  {/* Heart Icon */}
                  <button
                    onClick={() => toggleWishlist(index)}
                    className="absolute top-2 right-2  p-1 transition hover:scale-110"
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
      </div>
    </div>
  );
}
