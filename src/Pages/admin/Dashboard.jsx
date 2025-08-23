import { Helmet } from "react-helmet-async";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$24,500",
      change: "+12%",
      icon: "ri-money-dollar-circle-line",
    },
    {
      title: "Total Orders",
      value: "1,247",
      change: "+8%",
      icon: "ri-shopping-cart-line",
    },
    {
      title: "Total Products",
      value: "156",
      change: "+3%",
      icon: "ri-box-3-line",
    },
    {
      title: "Total Users",
      value: "2,847",
      change: "+15%",
      icon: "ri-user-line",
    },
  ];

  const recentOrders = [
    {
      id: "#1001",
      customer: "John Doe",
      product: "Wireless Headphones",
      amount: "$299",
      status: "Delivered",
    },
    {
      id: "#1002",
      customer: "Jane Smith",
      product: "Smartphone Case",
      amount: "$29",
      status: "Processing",
    },
    {
      id: "#1003",
      customer: "Mike Johnson",
      product: "Laptop Stand",
      amount: "$89",
      status: "Shipped",
    },
    {
      id: "#1004",
      customer: "Sarah Wilson",
      product: "USB Cable",
      amount: "$15",
      status: "Pending",
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
        <title>Home - Nallakkar</title>
      </Helmet>
      <div className="space-y-6">
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
                  <p className="text-sm text-green-600 mt-1">
                    {stat.change} from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className={`${stat.icon} text-blue-600 text-xl`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-gray-600">Order ID</th>
                    <th className="text-left py-2 text-gray-600">Customer</th>
                    <th className="text-left py-2 text-gray-600">Amount</th>
                    <th className="text-left py-2 text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100">
                      <td className="py-3 text-gray-900">{order.id}</td>
                      <td className="py-3 text-gray-700">{order.customer}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <i className="ri-add-line w-5 h-5 text-blue-600 mr-3"></i>
                <span className="text-gray-900 font-medium">
                  Add New Product
                </span>
              </button>
              <button className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <i className="ri-eye-line w-5 h-5 text-green-600 mr-3"></i>
                <span className="text-gray-900 font-medium">
                  View All Orders
                </span>
              </button>
              <button className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <i className="ri-user-add-line w-5 h-5 text-purple-600 mr-3"></i>
                <span className="text-gray-900 font-medium">Manage Users</span>
              </button>
              <button className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <i className="ri-settings-line w-5 h-5 text-gray-600 mr-3"></i>
                <span className="text-gray-900 font-medium">
                  System Settings
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
