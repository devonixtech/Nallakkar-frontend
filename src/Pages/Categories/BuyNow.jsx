import { useState } from "react";
import img1 from "../../assets/details2.png";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 1500.0;

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const totalProductPrice = price * quantity;
  const orderTotal = totalProductPrice; // Assuming no other fees for now

  const navigate = useNavigate();
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mb-6"
        >
          <FaArrowLeft className="text-lg cursor-pointer" />
          <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Left Section: Product Info */}
            <div className="md:col-span-2 flex gap-4 pr-6 border-r">
              <img
                src={img1}
                alt="Girl Jacket"
                className="w-40 h-48 object-cover rounded-lg shadow"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  Girl Jacket
                </h2>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  ₹{price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">Nallakkar</p>
                <hr className="my-2" />

                {/* Quantity Section */}
                <div className="flex items-center gap-3 mt-2">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-gray-700"
                  >
                    Qty :
                  </label>
                  <div className="flex items-center border rounded">
                    <button
                      onClick={handleDecrement}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      id="quantity"
                      value={quantity}
                      readOnly
                      className="w-10 text-center border-l border-r"
                    />
                    <button
                      onClick={handleIncrement}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mt-2">size : S</p>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm font-medium text-green-600">
                    Free Delivery
                  </p>
                  <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section: Price Details */}
            <div className="md:col-span-1 text-nowrap">
              <div className="bg-gray-50 p-5 rounded-lg h-full flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Price Details ({quantity} {quantity > 1 ? "items" : "item"})
                </h3>

                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Total Product Price</span>
                  <span>+₹{totalProductPrice.toFixed(2)}</span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Order Total</span>
                  <span>₹{orderTotal.toFixed(2)}</span>
                </div>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Clicking on 'Continue' will not deduct any money
                </p>

                <Link
                  to="/SelectAddress"
                  className="block w-full bg-primary text-white py-2 rounded text-center hover:bg-rose transition"
                >
                  ADD DELIVERY ADDRESS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
