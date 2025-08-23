import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Cart from "./Cart";
import BuyNow from "./Categories/BuyNow";

export default function ProductOverview() {
  return (
    <div className="max-w-6xl mx-auto p-6 pb-20 lg:pb-6">
      <div className="flex items-center gap-2 -mb-3 -ml-6">
        <ArrowLeft className="w-5 h-5 cursor-pointer" />
        <h1 className="text-2xl font-bold">Product Overview</h1>
      </div>
      <div>
        <BuyNow></BuyNow>
        {/* Delivery Address */}
        <h3 className="flex items-center gap-2 font-semibold text-lg mb-2">
          <span>📍</span> Delivery Address
        </h3>
        <div className="bg-white border shadow rounded-md p-4 mb-6">
          <div className="flex justify-between">
            <p>
              <span className="font-semibold">Naveena Reddy</span>
              <br />
              403, Aashirvad Nilaya 7th main, 1st cross B, Narayanapura,
              Mahadevapura, Bengaluru, Karnataka - 560048
              <br />
              6300********
            </p>
            <button className="text-red-500 rounded-none">Change</button>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="text-right">
        <Link
          to={"/PaymentPage"}
          className="bg-primary text-white px-6 py-2 hover:bg-rose"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
