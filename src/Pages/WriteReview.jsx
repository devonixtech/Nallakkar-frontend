import React, { useState } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import details from "../assets/details2.png";
import { Link, useNavigate } from "react-router-dom";

const WriteReview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const maxChars = 250;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 pt-10 pb-24 lg:pb-10">
      {/* Header */}
      <div onClick={() => navigate(-1)} className="flex items-center mb-9 pl-8">
        <button className="text-xl">
          <FaArrowLeft />
        </button>
        <h1 className="flex-1 text-center text-2xl font-semibold">
          Write a Review
        </h1>
      </div>

      {/* Product Info */}
      <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm mb-6">
        <img
          src={details}
          alt="Product"
          className="w-20 h-20 rounded-md object-cover"
        />
        <div>
          <h2 className="font-semibold text-gray-800">
            Women Party Wear Dress
          </h2>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Rate the product</h3>
        <div className="flex gap-2">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                key={starValue}
                type="button"
                className="text-2xl"
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(null)}
              >
                <FaStar
                  className={`${
                    starValue <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Add Photo or Video</h3>
        <label className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100">
          <input type="file" className="hidden" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-sm text-gray-600">Click here to upload</span>
        </label>
      </div>

      {/* Review Textarea */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Write your Review</h3>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          maxLength={maxChars}
          rows="4"
          className="w-full border rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Would you like to write anything about this product?"
        ></textarea>
        <p className="text-right text-xs text-gray-500 mt-1">
          {maxChars - review.length} Characters remaining
        </p>
      </div>

      {/* Submit Button */}
      <Link
        to={"/OrderHistory"}
        className=" block text-center w-full bg-[#141A44] text-white font-semibold py-3 hover:bg-rose transition"
      >
        Submit Review
      </Link>
    </div>
  );
};

export default WriteReview;
