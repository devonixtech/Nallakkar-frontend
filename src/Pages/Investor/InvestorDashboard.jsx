import { Helmet } from "react-helmet-async";
import InvestorProduct from "./InvestorProduct";
export default function InvestorDashboard() {
  const stats = [
   
    {
      title: "Total Orders",
      value: "245",
      icon: "ri-shopping-cart-line",
    },
    {
      title: "Pending Claims",
      value: "5",
      icon: "ri-time-line",
    },
    {
      title: "Total Earnings",
      value: "$4,560",
      icon: "ri-money-dollar-circle-line",
    },
  ];

  const recentOrders = [
    {
      id: "#INV-1001",
      product: "Wireless Headphones",
      amount: "$299",
      status: "Delivered",
      claimable: true,
    },
    {
      id: "#INV-1002",
      product: "Smartphone Case",
      amount: "$29",
      status: "Processing",
      claimable: false,
    },
    {
      id: "#INV-1003",
      product: "Laptop Stand",
      amount: "$89",
      status: "Shipped",
      claimable: false,
    },
    {
      id: "#INV-1004",
      product: "USB Cable",
      amount: "$15",
      status: "Pending",
      claimable: false,
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

  return (
    <>
      <Helmet>
        <title>Investor Dashboard - Nallakkar</title>
      </Helmet>

      <div className="space-y-6">
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

      <InvestorProduct/>
      </div>
    </>
  );
}
