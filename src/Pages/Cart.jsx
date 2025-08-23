import React from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import shoppingcart from "../assets/ShoppingCart.png";
import details from "../assets/details2.png";
import details1 from "../assets/details1.png";

const ShoppingCart = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header with background image */}
      <div
        className="w-full h-80 bg-cover bg-center flex items-center justify-start pl-20"
        style={{
          backgroundImage: `url(${shoppingcart})`,
        }}
      >
        <div>
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <p className="mt-2">
            Home | <span className="font-semibold">Shopping Cart</span>
          </p>
        </div>
      </div>

      {/* Cart Section */}
      <div className="max-w-7xl mx-auto py-10 px-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Product List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Table Headings */}
          <div className="grid grid-cols-4 font-semibold text-gray-600 text-sm border-b pb-2">
            <p>PRODUCT NAME</p>
            <p className="text-center">UNIT PRICE</p>
            <p className="text-center">QUANTITY</p>
            <p className="text-right">TOTAL</p>
          </div>

          {/* Product Item */}
          {[1, 2].map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center border-b pb-4 pt-4"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={details}
                  alt="product"
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-semibold">Nallakkar</p>
                  <p className="text-sm">
                    Boy Regular Fit Self Design Light T Shirt ( S )
                  </p>
                  <div className="w-5 h-5 rounded-full bg-brown-600 border mt-2"></div>
                </div>
              </div>

              {/* Unit Price */}
              <p className="text-center text-gray-700">1500.00</p>

              {/* Quantity */}
              <div className="flex items-center justify-center gap-2">
                <button className="px-2 py-1 border rounded">
                  <FaMinus size={12} />
                </button>
                <span>2</span>
                <button className="px-2 py-1 border rounded">
                  <FaPlus size={12} />
                </button>
              </div>

              {/* Total */}
              <div className="flex items-center justify-end gap-3">
                <p className="text-gray-700">3000.00</p>
                <button className="text-gray-500 hover:text-red-500">
                  <FaTimes />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Price Details */}
        <div>
          <div className="border rounded-lg shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold">Price Details</h2>
            <div className="flex justify-between text-gray-600">
              <p>Price (7 items)</p>
              <p>₹ 12000/-</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Discounts</p>
              <p>5%</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>GST %</p>
              <p>0000</p>
            </div>
            <div className="flex justify-between font-semibold border-t pt-3">
              <p>Total Amount</p>
              <p>₹ 12000/-</p>
            </div>
            <p className="text-green-600 text-sm">
              You will save ₹1000.00 on this order
            </p>

            {/* Buttons */}
            <button className="w-full border py-2 rounded text-gray-700 font-medium hover:bg-gray-100">
              Continue Shopping
            </button>
            <button className="w-full bg-blue-900 text-white py-2 rounded font-semibold hover:bg-blue-800">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
