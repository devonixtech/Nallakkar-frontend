import React from "react";
import { CheckCircle } from "lucide-react"; // using lucide-react for the success icon
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center pt-36 pb-44 bg-white">
      <div className="text-center">
        {/* Success Icon */}
        <CheckCircle className="mx-auto w-16 h-16 text-green-500" />

        {/* Title */}
        <h2 className="mt-4 text-lg font-semibold text-gray-900">
          Payment Successful
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm">to Nallakkar Payments</p>

        {/* Amount */}
        <p className="mt-2 text-2xl font-bold text-gray-900">1500</p>

        {/* Button */}
        <Link
          to="/OrderConfirmation"
          className="mt-4 px-36 py-2 bg-primary text-white hover:bg-rose block mx-auto text-center"
        >
          Done
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
