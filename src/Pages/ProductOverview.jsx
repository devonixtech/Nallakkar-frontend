import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import img1 from "../assets/details2.png";
import { FaArrowLeft } from "react-icons/fa";

export default function ProductOverview() {
  const [quantity, setQuantity] = useState(1);
  const price = 1500.0;
  const navigate = useNavigate();

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const totalProductPrice = price * quantity;
  const orderTotal = totalProductPrice;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 pb-24 lg:pb-6">
      {/* Top Header */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="w-5 h-5" />
        <h1 className="text-xl sm:text-2xl font-bold">Product Overview</h1>
      </div>

      {/* Product Details Section */}
      <div className="pb-6 pt-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            className="flex items-center gap-3 mb-4 sm:mb-6 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            {/* <FaArrowLeft className="text-base sm:text-lg" /> */}
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
              Product Details
            </h2>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg border shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Section */}
              <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 md:pr-6 md:border-r">
                <img
                  src={img1}
                  alt="Girl Jacket"
                  className="w-32 h-40 sm:w-40 sm:h-48 object-cover rounded-lg shadow mx-auto sm:mx-0"
                />
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Girl Jacket
                  </h2>
                  <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
                    ₹{price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Nallakkar</p>
                  <hr className="my-2" />

                  {/* Quantity Section */}
                  <div className="flex items-center gap-3 mt-2">
                    <label htmlFor="quantity" className="text-sm font-medium">
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

                  <p className="text-sm font-medium mt-2">Size : S</p>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
                    <p className="text-sm font-medium">Free Delivery</p>
                    {/* <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                      Edit
                    </button> */}
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg h-full flex flex-col">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                    Price Details ({quantity} {quantity > 1 ? "items" : "item"})
                  </h3>

                  <div className="flex justify-between text-gray-700 mb-2 text-sm sm:text-base">
                    <span>Total Product Price</span>
                    <span>+₹{totalProductPrice.toFixed(2)}</span>
                  </div>

                  <hr className="my-2" />

                  <div className="flex justify-between font-bold text-base sm:text-lg text-gray-900">
                    <span>Order Total</span>
                    <span>₹{orderTotal.toFixed(2)}</span>
                  </div>

                  <Link
                    to={"/SelectAddress"}
                    className="text-md  text-rose font-semibold text-end mt-9"
                  >
                    Edit
                  </Link>

                  {/* <Link
                    to="/SelectAddress"
                    className="block w-full mt-4 bg-primary text-white py-2 rounded text-center hover:bg-rose transition"
                  >
                    ADD DELIVERY ADDRESS
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <h3 className="flex items-center gap-2 font-semibold text-base sm:text-lg mb-2">
        <span>📍</span> Delivery Address
      </h3>
      <div className="bg-white border shadow rounded-md p-4 mb-6 text-sm sm:text-base">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <p>
            <span className="font-semibold">Naveena Reddy</span>
            <br />
            403, Aashirvad Nilaya 7th main, 1st cross B, Narayanapura,
            Mahadevapura, Bengaluru, Karnataka - 560048
            <br />
            6300********
          </p>
          <Link
            to={"/SelectAddress"}
            className="text-rose font-medium sm:text-base"
          >
            Change
          </Link>
        </div>
      </div>

      {/* Continue Button */}
      <div className="text-right">
        <Link
          to={"/PaymentPage"}
          className="bg-primary text-white px-6 py-2 hover:bg-rose text-sm sm:text-base"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
