import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import banner from "../assets/wishlist.png";
// The wishlist1 and wishlist2 imports are not used in the final mapped logic,
// as the items come from the Redux store, but I'll keep the imports for completeness.
import wishlist1 from "../assets/whishlist1.png";
import wishlist2 from "../assets/whishlist2.png";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlistByUserId, removeFromWishlist } from "../Redux/slices/wishlistSlice";

// --- Main Wishlist Component ---
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 👈 New state for current page
  const itemsPerPage = 10; // 👈 Define items per page

  const dispatch = useDispatch();
  // const userId = localStorage.getItem("userId");
  const userId = 7; // temp userId

  // --- Redux State ---
  const { items, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistByUserId(userId));
    }
  }, [dispatch, userId]);

  // --- Pagination Logic ---
  // Calculate the total number of pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get current items for the selected page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page handler
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0); // Optional: scroll to the top when page changes
    }
  };

  // Logic to generate dynamic page numbers for the pagination bar
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // e.g., show up to 5 page numbers at a time
    let startPage;
    let endPage;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than maxToShow
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calculate start and end pages for the visible range
      const offset = Math.floor(maxPagesToShow / 2);
      if (currentPage <= offset + 1) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + offset >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - offset;
        endPage = currentPage + offset;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };


  const toggleWishlist = (index) => {
    setWishlist((prev) =>
      prev.includes(index)
        ? prev.filter((id) => id !== index)
        : [...prev, index]
    );
    // NOTE: In a real app, you would also dispatch removeFromWishlist here
    // with the actual product ID.
    // dispatch(removeFromWishlist(item.productId));
  };

  if (loading) return <div className="text-center py-20">Loading Wishlist...</div>;
  if (error) return <div className="text-center py-20 text-red-600">Error: {error}</div>;

  // Render nothing if there are no items after loading
  if (items.length === 0 && !loading) {
    return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold">Your Wishlist is Empty 💔</h2>
            <p className="mt-2 text-gray-600">Start adding some items you love!</p>
            <Link to={"/products"} className="mt-4 inline-block bg-darkpink text-white px-4 py-2 rounded hover:bg-pink transition">
                Go to Shop
            </Link>
        </div>
    );
  }

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
        {/* Banner Section (omitted for brevity - remains the same) */}
        <div
          className="relative bg-cover bg-center h-80"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute inset-0 bg-opacity-90"></div>
          <div className="relative h-full flex flex-col justify-center items-start text-white p-8 sm:p-12 lg:p-24">
            <h1 className="text-5xl md:text-6xl font-bold">Wishlist</h1>
            <p className="mt-2 text-base">
              <Link to={"/MainHome"}>Home </Link>| Wishlist
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-16 mt-6 px-2 md:px-12 scrollbar-hide">
          {/* Map over the PAGINATED currentItems, not the full items array */}
          {currentItems.map((item, index) => (
            <div
              key={item?.id || index} // Use item.id for a stable key
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
                <Link to={`/product/${item?.productId}`}>
                  <img
                    src={item?.image?.[0]} // Use optional chaining for safe access
                    alt={item?.name}
                    className={`w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover transition-transform duration-300 ${
                      activeCard === index
                        ? "scale-105"
                        : "group-hover:scale-105"
                    }`}
                  />
                </Link>

                {/* Hover Add to Cart Button with Icon (omitted for brevity - remains the same) */}
                <Link to={`/product/${item?.productId}`}>
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
                  <span>{item?.rating}</span> • <span>{item?.reviews}</span>
                </div>

                {/* Heart Icon */}
                <button
                  onClick={() => toggleWishlist(item?.id)} // Use item.id for Redux logic later
                  className="absolute top-2 right-2 p-1 transition hover:scale-110"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      // Note: Your local `wishlist` state is not fully integrated with Redux for removal,
                      // so I'm using a simple check here. For a full implementation, you'd check
                      // if the item ID exists in the Redux `items` array.
                      true // Assuming all rendered items are in the wishlist
                        ? "fill-rose text-rose"
                        : "text-gray-400"
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
                <span className="text-gray-500 text-xs">{item.discount}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-3 gap-2">
            {/* Previous Button */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-pinkLight hover:bg-pink text-white"
              }`}
            >
              &lt;
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition ${
                  currentPage === number
                    ? "bg-darkpink text-white font-bold"
                    : "bg-pinkLight hover:bg-pink hover:text-white text-white"
                }`}
              >
                {number}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-pinkLight hover:bg-pink text-white"
              }`}
            >
              &gt;
            </button>
          </div>
        )}

        {/* Hide scrollbar style (omitted for brevity - remains the same) */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .fill-rose {
            fill: #f43f5e; /* Tailwind's rose-500 or similar */
          }
          .text-rose {
            color: #f43f5e;
          }
          .bg-darkpink {
            background-color: #ec4899; /* Example dark pink */
          }
          .bg-pinkLight {
            background-color: #fbcfe8; /* Example light pink */
          }
        `}</style>
      </div>
    </>
  );
};

export default Wishlist;