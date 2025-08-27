import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import shoppingcart from "../assets/ShoppingCart.png";
import details from "../assets/details2.png";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header with background image */}

      <div
        className="w-full h-60 lg:h-80 bg-cover bg-center flex items-center justify-start pl-20"
        style={{
          backgroundImage: `url(${shoppingcart})`,
        }}
      >
        <div>
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <p className="mt-2">
            <Link to={"/MainHome"}>Home </Link> |{" "}
            <span className="font-semibold">Shopping Cart</span>
          </p>
        </div>
      </div>

      {/* Cart Section */}
      <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Product List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Table Headings - hidden on mobile */}
          <div className="hidden sm:grid grid-cols-4 font-semibold text-sm border-b pb-2">
            <p>PRODUCT NAME</p>
            <p className="text-center">UNIT PRICE</p>
            <p className="text-center">QUANTITY</p>
            <p className="text-right">TOTAL</p>
          </div>

          {/* Product Item */}
          {[1, 2].map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:grid sm:grid-cols-4 gap-4 items-start sm:items-center border-b pb-4 pt-4"
            >
              {/* Product Info */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <img
                  src={details}
                  alt="product"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                />
                <div>
                  <p className="text-sm text-gray-400">Nallakkar</p>
                  <p className="text-xs sm:text-sm font-semibold">
                    Boy Regular Fit Self Design Light T Shirt ( S )
                  </p>
                  <div className="w-5 h-5 rounded-full bg-yellow-700 border mt-2"></div>
                </div>
              </div>

              {/* Unit Price */}
              <p className="text-gray-700 sm:text-center text-sm sm:text-base">
                1500.00
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-2 sm:justify-center">
                <button className="px-2 py-1 border rounded">
                  <FaMinus size={12} />
                </button>
                <span className="text-sm sm:text-base">2</span>
                <button className="px-2 py-1 border rounded">
                  <FaPlus size={12} />
                </button>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <p className="text-gray-700 text-sm sm:text-base">3000.00</p>
                <button className="text-gray-500 hover:text-red-500">
                  <FaTimes />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Price Details */}
        <div className="pb-12 lg:pb-0 font-semibold text-black">
          <div className="border rounded-lg shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold">Price Details</h2>
            <div className="flex justify-between text-sm sm:text-base">
              <p>Price (7 items)</p>
              <p>₹ 12000/-</p>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <p>Discounts</p>
              <p>5%</p>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <p>GST %</p>
              <p>0000</p>
            </div>
            <div className="flex justify-between font-semibold border-t pt-3 text-sm sm:text-base">
              <p>Total Amount</p>
              <p>₹ 12000/-</p>
            </div>
            <p className="text-green-600 text-xs sm:text-sm">
              You will save ₹1000.00 on this order
            </p>

            {/* Buttons */}
            <Link to={'/category/kids'} className="block text-center w-full border py-2 font-medium hover:bg-gray-100 text-sm sm:text-base">
              Continue Shopping
            </Link>
            <Link
              to={"/SelectAddress"}
              className="block text-center w-full bg-primary text-white py-2 font-semibold hover:bg-rose text-sm sm:text-base"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
