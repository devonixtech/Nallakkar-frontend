import React from "react";
import { ShoppingBag } from "lucide-react"; // bag icon for order confirmation
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <div className="flex items-center justify-center pt-32 pb-44 bg-white">
      <div className="text-center">
        {/* Bag Icon */}
        <ShoppingBag className="mx-auto w-16 h-16 text-[#141A44]" />

        {/* Title */}
        <h2 className="mt-4 text-3xl font-bold text-primary">Thank You!</h2>

        {/* Subtitle */}
        <p className="mt-2 max-w-md mx-auto">
          Your order has been successfully placed. We’ve sent a confirmation
          email to
          <span className="font-medium"> customer@example.com </span>
          with all the details.
        </p>

        {/* Button */}
        <Link
          to={"/orderHistory"}
          className="inline-block mt-6 px-10 py-2 bg-primary text-white hover:bg-rose"
        >
          Okay
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
