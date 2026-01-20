import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import InvestorProduct from "./InvestorProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/slices/productSlice";
import { claimAllProducts } from "../../Redux/slices/investorSlice";
import { toast } from "react-toastify";

export default function InvestorDashboard() {
  const dispatch = useDispatch();
  const investorId = localStorage.getItem('investorId');
  // const investorId = 5;
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  const products = useSelector((state) => state?.products?.products);
  const investorProducts = products?.filter(
    (product) => product?.investorId == investorId
  );


  const stats = [

    {
      title: "Total Products",
      value: investorProducts?.length,
      icon: "ri-shopping-cart-line",
    },
    // {
    //   title: "Pending Claims",
    //   value: "5",
    //   icon: "ri-time-line",
    // },
    {
      title: "Total Earnings",
      value: "0.00",
      icon: "ri-money-dollar-circle-line",
    },
  ];



  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const [hasClaimed, setHasClaimed] = useState(() => {
    return localStorage.getItem(`claim_submitted_${investorId}`) === "true";
  });

  // ✅ Check if all products of the investor are sold out (stock === 0)
  const isAllSoldOut =
    investorProducts?.length > 0 &&
    investorProducts.every((product) => Number(product.stock) === 0);

  const handleClaimAll = () => {
    dispatch(claimAllProducts())
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Claim request sent successfully!");
        setHasClaimed(true);
        localStorage.setItem(`claim_submitted_${investorId}`, "true");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to submit claim request.");
      });
  };

  return (
    <>
      <Helmet>
        <title>Investor Dashboard - Nallakkar</title>
      </Helmet>

      <div className="space-y-6">
        {/* ✅ Claim All Button */}
        <div className="flex justify-end">
          <button
            onClick={handleClaimAll}
            disabled={!isAllSoldOut || hasClaimed}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center gap-2 ${isAllSoldOut && !hasClaimed
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-md transform hover:-translate-y-0.5"
              : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
              }`}
          >
            <i className="ri-money-dollar-circle-line text-lg"></i>
            {hasClaimed ? "Claim Submitted" : "Claim All Earnings"}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className={`${stat.icon} text-blue-600 text-xl`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <InvestorProduct />
      </div>
    </>
  );
}
