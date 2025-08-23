import { Helmet } from "react-helmet-async";

export default function Orders() {
  const orders = [
    {
      id: "#1001",
      customer: "John Doe",
      email: "john@example.com",
      date: "2024-01-15",
      total: "$299.99",
      status: "Delivered",
      items: 3,
    },
    {
      id: "#1002",
      customer: "Jane Smith",
      email: "jane@example.com",
      date: "2024-01-14",
      total: "$89.50",
      status: "Processing",
      items: 2,
    },
    {
      id: "#1003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      date: "2024-01-14",
      total: "$449.99",
      status: "Shipped",
      items: 1,
    },
    {
      id: "#1004",
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      date: "2024-01-13",
      total: "$159.99",
      status: "Pending",
      items: 4,
    },
    {
      id: "#1005",
      customer: "David Brown",
      email: "david@example.com",
      date: "2024-01-13",
      total: "$75.00",
      status: "Cancelled",
      items: 2,
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Order Management
            </h2>
            <p className="text-gray-600">Track and manage customer orders</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center whitespace-nowrap cursor-pointer">
              <i className="ri-download-line mr-2"></i>
              Export Orders
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">1,247</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-shopping-cart-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Orders
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">23</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-orange-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">45</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="ri-loader-line text-yellow-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">1,156</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search orders by ID or customer..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input
                type="date"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Items
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Total
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-blue-600">
                        {order.id}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order.customer}
                        </p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {order.date}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {order.items}
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                      {order.total}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        className={`text-xs font-medium rounded-full px-2 py-1 border-0 ${getStatusColor(
                          order.status
                        )} pr-8`}
                      >
                        <option value="pending">Pending</option>
                        <option
                          value="processing"
                          selected={order.status === "Processing"}
                        >
                          Processing
                        </option>
                        <option
                          value="shipped"
                          selected={order.status === "Shipped"}
                        >
                          Shipped
                        </option>
                        <option
                          value="delivered"
                          selected={order.status === "Delivered"}
                        >
                          Delivered
                        </option>
                        <option
                          value="cancelled"
                          selected={order.status === "Cancelled"}
                        >
                          Cancelled
                        </option>
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 cursor-pointer">
                          <i className="ri-eye-line"></i>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-600 cursor-pointer">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-purple-600 cursor-pointer">
                          <i className="ri-printer-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              Showing 1 to 5 of 1,247 results
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 cursor-pointer">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm cursor-pointer">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
