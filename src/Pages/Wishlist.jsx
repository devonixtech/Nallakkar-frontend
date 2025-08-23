import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import banner from "../assets/wishlist.png";
import wishlist1 from "../assets/whishlist1.png";
import wishlist2 from "../assets/whishlist2.png";
import { Heart } from "lucide-react";

// --- Mock Data ---
// In a real application, you would fetch this data from an API.
const wishlistItems = [
  {
    id: 1,
    title: "101 Tales The Great Panchatantra Collection",
    author: "Nalfikkar",
    price: "529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    imageUrl: wishlist1, // Replace with your image path
  },
  {
    id: 2,
    title: "The Secret Garden",
    author: "Nalfikkar",
    price: "529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    imageUrl: wishlist2, // Replace with your image path
  },
  {
    id: 3,
    title: "101 Tales The Great Panchatantra Collection",
    author: "Nalfikkar",
    price: "529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    imageUrl: wishlist1, // Replace with your image path
  },
  {
    id: 4,
    title: "The Secret Garden",
    author: "Nalfikkar",
    price: "529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    imageUrl: wishlist2, // Replace with your image path
  },
  {
    id: 5,
    title: "101 Tales The Great Panchatantra Collection",
    author: "Nalfikkar",
    price: "529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    imageUrl: wishlist1, // Replace with your image path
  },
  {
    id: 6,
    title: "101 Tales The Great Panchatantra Collection",
    author: "Nalfikkar",
    price: "529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    imageUrl: wishlist2, // Replace with your image path
  },
  {
    id: 7,
    title: "The Secret Garden",
    author: "Nalfikkar",
    price: "529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    imageUrl: wishlist1, // Replace with your image path
  },
  {
    id: 8,
    title: "101 Tales The Great Panchatantra Collection",
    author: "Nalfikkar",
    price: "529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    imageUrl: wishlist2, // Replace with your image path
  },
  {
    id: 9,
    title: "The Secret Garden",
    author: "Nalfikkar",
    price: "529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    imageUrl: wishlist1, // Replace with your image path
  },
  {
    id: 10,
    title: "101 Tales The Great Panchatantra Collection",
    price: "529.00",
    discount: "(off 35%)",
    rating: "4.2",
    reviews: "1.2K",
    imageUrl: wishlist2, // Replace with your image path
  },
];

// --- Main Wishlist Component ---
const Wishlist = () => {
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
    <>
      <Helmet>
        <title>My Wishlist | Nallakkar</title>
        <meta
          name="description"
          content="Your saved items and favorite picks."
        />
      </Helmet>
      <div className="bg-white">
        {/* Banner Section */}
        <div
          className="relative bg-cover bg-center h-80"
          style={{ backgroundImage: `url(${banner})` }} // <-- REPLACE WITH YOUR BANNER IMAGE
        >
          <div className="absolute inset-0 bg-opacity-90"></div>
          <div className="relative h-full flex flex-col justify-center items-start text-white p-8 sm:p-12 lg:p-24">
            <h1 className="text-5xl md:text-6xl font-bold">Wishlist</h1>
            <p className="mt-2 text-base">Home | Wishlist</p>
          </div>
        </div>

        {/* Products */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-16 mt-6 px-2 md:px-12 scrollbar-hide">
          {wishlistItems.map((item, index) => (
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
                  src={item.imageUrl}
                  alt={item.title}
                  className={`w-full h-[200px] sm:h-[250px] border md:h-[300px] object-cover transition-transform duration-300 ${
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

        {/* Pagination (hidden on mobile) */}
        <div className="hidden md:flex justify-center mb-3 gap-2">
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
      </div>
    </>
  );
};

export default Wishlist;
