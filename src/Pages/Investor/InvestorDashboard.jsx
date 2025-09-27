import { Helmet } from "react-helmet-async";

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

        {/* Recent Orders */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Orders
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600">Order ID</th>
                  <th className="text-left py-2 text-gray-600">Product</th>
                  <th className="text-left py-2 text-gray-600">Amount</th>
                  <th className="text-left py-2 text-gray-600">Status</th>
                  <th className="text-left py-2 text-gray-600">Claim</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100">
                    <td className="py-3 text-gray-900">{order.id}</td>
                    <td className="py-3 text-gray-700">{order.product}</td>
                    <td className="py-3 font-medium text-gray-900">
                      {order.amount}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <button
                        disabled={!order.claimable}
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          order.claimable
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Claim
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
