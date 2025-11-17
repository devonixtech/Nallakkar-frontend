import { Helmet } from "react-helmet-async";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../Redux/slices/ordersSlice";

export default function Orders() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 10; // per-page limit

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);
  const orders = useSelector((state) => state.orders.orders);
  const pendingOrders = orders?.filter(o => o.tracking_status === "Pending") || [];
  const processingOrders = orders?.filter(o => o.tracking_status === "Processing") || [];
  const shippedOrders = orders?.filter(o => o.tracking_status === "Shipped") || [];
  const deliveredOrders = orders?.filter(o => o.tracking_status === "Delivered") || [];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = orders?.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil((orders?.length || 0) / rowsPerPage);

  console.log("Orders from Redux:", orders);
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
          {/* <div className="flex items-center space-x-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center whitespace-nowrap cursor-pointer">
              <i className="ri-download-line mr-2"></i>
              Export Orders
            </button>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{orders?.length}</p>
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
                <p className="text-2xl font-bold text-gray-900 mt-2">{pendingOrders?.length}</p>
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
                <p className="text-2xl font-bold text-gray-900 mt-2">{processingOrders?.length}</p>
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
                <p className="text-2xl font-bold text-gray-900 mt-2">{deliveredOrders?.length}</p>
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
                  {/* <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRows?.map((order) => (

                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-blue-600">
                        {order?.shiprocket_order_id}

                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order?.customer_name}
                        </p>
                        <p className="text-sm text-gray-500">{order?.customer_email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {new Date(order?.created_at).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>

                    <td className="py-4 px-4 text-sm text-gray-700">
                      {order?.items}
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                      {order?.total_amount}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.tracking_status)}`}>
                        {order.tracking_status}
                      </span>
                      {/* <select
                        className={`text-xs font-medium rounded-full px-2 py-1 border-0 ${getStatusColor(
                          order?.status
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
                          selected={order?.status === "Shipped"}
                        >
                          Shipped
                        </option>
                        <option
                          value="delivered"
                          selected={order?.status === "Delivered"}
                        >
                          Delivered
                        </option>
                        <option
                          value="cancelled"
                          selected={order?.status === "Cancelled"}
                        >
                          Cancelled
                        </option>
                      </select> */}
                    </td>
                    {/* <td className="py-4 px-4">
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
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, orders?.length)} of {orders?.length} results
            </p>

            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className={`px-3 py-1 border rounded text-sm ${currentPage === 1 ? "text-gray-300" : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded text-sm border ${currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={`px-3 py-1 border rounded text-sm ${currentPage === totalPages ? "text-gray-300" : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
