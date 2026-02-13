

import { Helmet } from "react-helmet-async";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../Redux/slices/ordersSlice";
import { useNavigate } from "react-router-dom";
import InvoiceModal from "../../Components/Custom/InvoiceModal";

export default function Orders() {
  const dispatch = useDispatch();
  const [showInvoice, setShowInvoice] = useState(false);
  const navigate = useNavigate();
  // fetch orders once on mount
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const orders = useSelector((state) => state?.orders?.orders) || [];

  // Filters + pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // "" means all
  const [fromDate, setFromDate] = useState(""); // YYYY-MM-DD
  const [toDate, setToDate] = useState(""); // YYYY-MM-DD
const [selectedOrder, setSelectedOrder] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // change if you want fewer/more rows per page

  // Helper for status badge color
  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Normalized search text
  const search = (searchTerm || "").trim().toLowerCase();

  // Parse date string (YYYY-MM-DD) to Date at start/end of day for inclusive comparison
  const parseFrom = (d) => {
    if (!d) return null;
    const dt = new Date(d);
    dt.setHours(0, 0, 0, 0);
    return dt;
  };
  const parseTo = (d) => {
    if (!d) return null;
    const dt = new Date(d);
    dt.setHours(23, 59, 59, 999);
    return dt;
  };

  const fromDateObj = parseFrom(fromDate);
  const toDateObj = parseTo(toDate);

  // Filter orders (search + status + date range)
  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    return orders.filter((order) => {
      // search by order id (shiprocket_order_id), customer_name, customer_email
      const idMatch =
        (order?.shiprocket_order_id || "")
          .toString()
          .toLowerCase()
          .includes(search);
      const nameMatch =
        (order?.customer_name || "").toString().toLowerCase().includes(search);
      const emailMatch =
        (order?.customer_email || "").toString().toLowerCase().includes(search);

      const matchesSearch = search ? idMatch || nameMatch || emailMatch : true;

      // status match
      const matchesStatus = statusFilter
        ? (order?.tracking_status || "").toLowerCase() ===
        statusFilter.toLowerCase()
        : true;

      // date match - consider created_at field exists and is parseable
      let matchesDate = true;
      if (fromDateObj || toDateObj) {
        const createdAt = order?.created_at ? new Date(order.created_at) : null;
        if (!createdAt) matchesDate = false;
        else {
          if (fromDateObj && createdAt < fromDateObj) matchesDate = false;
          if (toDateObj && createdAt > toDateObj) matchesDate = false;
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [orders, search, statusFilter, fromDate, toDate, fromDateObj, toDateObj]);

  // Pagination calculations
  const totalItems = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filters/search change (so you don't get empty pages)
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, fromDate, toDate]);

  // Ensure currentPage never exceeds totalPages (e.g. after filtering)
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  // Generate page numbers with ellipsis
  // returns array like [1, 2, 3, '...', 10]
  const getPageList = (total, page, maxButtons = 7) => {
    // maxButtons = maximum visible buttons including first and last and ellipses
    // If total is small, just list all
    if (total <= maxButtons) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = [];
    const left = Math.max(2, page - 1);
    const right = Math.min(total - 1, page + 1);

    pages.push(1);
    if (left > 2) pages.push("left-ellipsis");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < total - 1) pages.push("right-ellipsis");
    pages.push(total);

    return pages;
  };

  const pageList = getPageList(totalPages, currentPage, 7);

  // Helper to format created date safely
  const formatDate = (d) => {
    if (!d) return "-";
    try {
      return new Date(d).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return d;
    }
  };

  return (
    <>
      <Helmet>
        <title>Orders - Nallakkar</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Order Management</h2>
            <p className="text-gray-600">Track and manage customer orders</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{orders?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-shopping-cart-line text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {orders?.filter((o) => (o?.tracking_status || "").toLowerCase() === "pending")?.length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-orange-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {orders?.filter((o) => (o?.tracking_status || "").toLowerCase() === "processing")?.length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="ri-loader-line text-yellow-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {orders?.filter((o) => (o?.tracking_status || "").toLowerCase() === "delivered")?.length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-green-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            {/* Search */}
            <div className="flex-1 min-w-0">
              <input
                type="text"
                placeholder="Search orders by ID, customer name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Status filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* From / To date */}
            <div className="flex gap-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                aria-label="From date"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                aria-label="To date"
              />
              <button
                onClick={() => {
                  setFromDate("");
                  setToDate("");
                }}
                className="px-3 py-2 bg-gray-100 rounded-lg text-sm"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Items</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50" >
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-blue-600" onClick={() => { navigate(`/admin/orders/${order.id}`) }} style={{ cursor: 'pointer' }}>
                        {order?.shiprocket_order_id || order?.id}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order?.customer_name}</p>
                        <p className="text-sm text-gray-500">{order?.customer_email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{formatDate(order?.created_at)}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{order?.order_details?.
                      order_items?.length}</td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{order?.total_amount / 100}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.tracking_status)}`}>
                        {order?.tracking_status || "-"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                   <button
  onClick={() => {
    setSelectedOrder(order);
    setShowInvoice(true);
  }}
  className="btn btn-primary flex items-center gap-1"
>
  <i className="ri-eye-line"></i>
  Invoice
</button>


                    </td>

                  </tr>
                ))}

                {currentOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-sm text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer: showing X to Y of Z and pagination */}
          <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              Showing {totalItems === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} results
            </p>

            {/* Pagination */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"}`}
              >
                Previous
              </button>

              {pageList.map((p, idx) => {
                if (p === "left-ellipsis" || p === "right-ellipsis") {
                  return (
                    <span key={p + idx} className="px-2 text-sm text-gray-500">
                      ...
                    </span>
                  );
                }
                return (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`px-3 py-1 rounded border ${currentPage === p ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"}`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
     <InvoiceModal
  open={showInvoice}
  order={selectedOrder}
  onClose={() => setShowInvoice(false)}
/>

    </>
  );
}
