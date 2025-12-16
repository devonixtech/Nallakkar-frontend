import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderByOrderId } from "../../Redux/slices/ordersSlice";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  
  const orderDetails = useSelector((state) => state?.orders?.orderData || null);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderByOrderId(id));
    }
  }, [dispatch, id]);
   
  if (!orderDetails) {
    return (
      <div className="text-center py-20 text-gray-600">
        Loading order details...
      </div>
    );
  }

  const orderInfo = orderDetails.order_details;
  const items = orderInfo?.order_items || [];

  return (
    <>
      <Helmet>
        <title>Admin Order #{orderDetails.order_id} | Nallakkar</title>
      </Helmet>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#141A44]">
            Order #{orderDetails.order_id}
          </h1>
          <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
            {orderDetails.tracking_status}
          </span>
        </div>

        {/* Customer Info */}
        <div className="bg-white p-6 rounded-lg shadow border mb-6">
          <h3 className="font-bold mb-3 text-lg">Customer Information</h3>
          <p><b>Name:</b> {orderInfo?.shipping_first_name} {orderInfo?.shipping_last_name}</p>
          <p><b>Email:</b> {orderDetails?.customer_email}</p>
          <p><b>Phone:</b> {orderInfo?.shipping_phone}</p>
        </div>

        {/* Products */}
        <div className="bg-white p-6 rounded-lg shadow border mb-6">
          <h3 className="font-bold mb-4 text-lg">Products</h3>

          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-6 border-b pb-4 mb-4 last:border-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded object-cover"
              />
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                <p className="text-sm">Qty: {item.units}</p>
                <p className="text-sm font-semibold">
                  ₹{item.selling_price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping */}
        <div className="bg-white p-6 rounded-lg shadow border mb-6">
          <h3 className="font-bold mb-3 text-lg">Shipping Address</h3>
          <p>{orderInfo?.shipping_address}</p>
          <p>
            {orderInfo?.shipping_city}, {orderInfo?.shipping_state} -{" "}
            {orderInfo?.shipping_pincode}
          </p>
        </div>

        {/* Payment */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="font-bold mb-3 text-lg">Payment</h3>
          <div className="flex justify-between">
            <span>Total Amount</span>
            <span className="font-bold">
              ₹{orderDetails.total_amount / 100}
            </span>
          </div>
          <p className="text-sm mt-2">
            <b>Payment Mode:</b> {orderDetails?.payment_method}
          </p>
        </div>

        {/* Admin Actions */}
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-2 bg-green-600 text-white rounded">
            Mark as Shipped
          </button>

          <button className="px-6 py-2 bg-red-600 text-white rounded">
            Cancel Order
          </button>

          <Link
            to="/admin/orders"
            className="ml-auto text-blue-600 hover:underline"
          >
            ← Back to Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminOrderDetails;
