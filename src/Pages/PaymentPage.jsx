// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { IoChevronUp, IoChevronDown, IoLocationSharp } from "react-icons/io5";
import { SiGooglepay } from "react-icons/si";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartByUserId } from "../Redux/slices/cartSlice";
import {
  createPaymentOrder,
  verifyPaymentAndCreateShipment,
} from "../Redux/slices/paymentSlice";
import AddressAutocompleteTestUI from "./AddressAutocompleteTestUI";
import { clearBuyNowItem } from "../Redux/slices/buyNowSlice";


// --- Payment Icons ---
const PhonePeIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-700 text-white font-bold text-sm">
    P
  </div>
);
const CredPayIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-400">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 5V19C6 19.5523 6.44772 20 7 20H18V4H7C6.44772 4 6 4.44772 6 5Z"
        stroke="#333"
        strokeWidth="2"
      />
      <path
        d="M12 9V15M9 12H15"
        stroke="#333"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </div>
);
const SimplIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-teal-500 text-white font-serif italic text-lg">
    S
  </div>
);
const HdfcIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center bg-[#004C8F] rounded-sm">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <rect x="4" y="4" width="6" height="16" />
      <rect x="14" y="4" width="6" height="16" />
      <rect x="4" y="10" width="16" height="4" />
    </svg>
  </div>
);
const IciciIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center rounded-md text-orange-500 font-bold text-xs bg-white border-2 border-orange-500">
    i
  </div>
);
const AxisBankIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center bg-[#8C2B3F] text-white rounded-md font-bold text-sm">
    A
  </div>
);

// --- Accordion Item ---
const AccordionItem = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center py-4 text-left font-semibold text-gray-700"
    >
      {title}
      {isOpen ? <IoChevronUp /> : <IoChevronDown />}
    </button>
    {isOpen && <div className="pb-4">{children}</div>}
  </div>
);

// --- Radio Input ---
const RadioInput = ({ id, value, checked, onChange, label, icon }) => (
  <label
    htmlFor={id}
    className="flex items-center space-x-4 py-3 cursor-pointer"
  >
    <input
      type="radio"
      id={id}
      name="paymentMethod"
      value={value}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
    />
    <div className="flex items-center space-x-3">
      {icon}
      <span className="font-medium text-gray-800">{label}</span>
    </div>
  </label>
);

// --- Payment Options ---
const PaymentOptions = ({ selectedPayment, setSelectedPayment }) => {
  const [openSection, setOpenSection] = useState("upi");
  const navigate = useNavigate();
  const handleToggle = (section) =>
    setOpenSection(openSection === section ? null : section);

  return (
    <div className="lg:w-2/3 w-full bg-white p-6">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 -ml-6 cursor-pointer"
      >
        <ArrowLeft className="text-2xl" />
        <h1 className="text-xl font-bold ml-2">Select Payment method</h1>
      </div>
      <h2 className="font-semibold mb-2 text-[18px]">Payment Options</h2>
      <div className="shadow-md rounded-md p-4">
        <AccordionItem
          title="Pay by any UPI App"
          isOpen={openSection === "upi"}
          onToggle={() => handleToggle("upi")}
        >
          <div className="space-y-2">
            <RadioInput
              id="googlepay_upi"
              value="googlepay_upi"
              checked={selectedPayment === "googlepay_upi"}
              onChange={(e) => setSelectedPayment(e.target.value)}
              icon={<SiGooglepay className="text-2xl" />}
              label="GooglePay"
            />
          </div>
        </AccordionItem>
      </div>
      <div className="p-2 mt-3 rounded-md shadow-md">
        <RadioInput
          id="cod"
          value="cod"
          checked={selectedPayment === "cod"}
          onChange={(e) => setSelectedPayment(e.target.value)}
          label="Cash on Delivery"
        />
      </div>
    </div>
  );
};

// --- Order Summary ---
const OrderSummary = ({ cartSummary, buyNowItem, handlePayment , totalPrice }) => {
  // let totalPrice = cartSummary?.totalPrice || 0;

  // if (buyNowItem?.product) {
  //   const variantPrice =
  //     buyNowItem.variant?.price || buyNowItem.product.price || 0;
  //   totalPrice = variantPrice * buyNowItem.quantity;
  // }

  return (
    <div className="lg:w-1/3 w-full p-6 space-y-6 pb-16 lg:pb-6">
      <div className="bg-white p-4 border rounded-lg shadow-sm space-y-3">
        <h3 className="font-bold text-gray-700">
          Price Details ({buyNowItem?.product ? 1 : cartSummary?.items?.length || 0} items)
        </h3>
        <div className="flex justify-between font-bold text-lg">
          <p>Order Total</p>
          <p>₹{totalPrice}</p>
        </div>
        <button
          onClick={handlePayment}
          className="block text-center w-full bg-primary text-white py-3 font-bold text-lg mt-2 hover:bg-rose transition-colors"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

// --- Main Page ---
function PaymentPage({  }) {
  const [selectedPayment, setSelectedPayment] = useState("phonepe_last_used");
  const [amount, setAmount] = useState(100);
  const dispatch = useDispatch();
  // Get buyNowItem from localStorage
const [buyNowItem, setBuyNowItem] = useState(null);

useEffect(() => {
  const storedItem = localStorage.getItem("buyNowItem");
  if (storedItem) {
    setBuyNowItem(JSON.parse(storedItem));
  }
}, []);

  



  //  const userId = localStorage.getItem("userId");
  const userId = 7;

  useEffect(() => {
    // Fetch cart data on mount
    dispatch(fetchCartByUserId(userId));
  }, [dispatch]);
  const userCart = useSelector((state) => state?.cart?.items);
  const { order, shipment, loading, error, success } = useSelector(
    (state) => state.payment
  );

  let totalPrice = userCart?.totalPrice || 0;

  if (buyNowItem?.product) {
    const variantPrice =
      buyNowItem.variant?.price || buyNowItem.product.price || 0;
    totalPrice = variantPrice * buyNowItem.quantity;
  }
{console.log(totalPrice)}
const handlePayment = async () => {
    try {
      const order_items = buyNowItem?.product
        ? [
            {
              name: buyNowItem.product.name,
              sku: buyNowItem.product.sku,
              units: buyNowItem.quantity,
              selling_price:
                buyNowItem.variant?.price || buyNowItem.product.price,
            },
          ]
        : userCart || [];

      console.log("🛍️ Order Items Sent to Payment:", order_items);

      const result = await dispatch(
        createPaymentOrder({
          amount: totalPrice,
          customer_name: "Ankit Verma",
          customer_email: "ankit@example.com",
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        const razorpayOrder = result.payload;

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Nallakkar",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async (response) => {
            console.log("✅ Payment Success Response:", response);

            // Verify payment & create shipment
            await dispatch(
              verifyPaymentAndCreateShipment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderDetails: {
                  billing_first_name: "Rahul",
                  billing_last_name: "Sharma",
                  billing_email: "rahul.sharma@example.com",
                  amount,
                  order_items,
                },
              })
            );

            // ✅ Remove BuyNowItem only after successful payment
            console.log("🧹 Clearing buyNowItem after successful payment...");
            localStorage.removeItem("buyNowItem");
            dispatch(clearBuyNowItem());
          },
          prefill: {
            name: "Ankit Verma",
            email: "ankit@example.com",
            contact: "9999999999",
          },
          theme: { color: "#3399cc" },
        };

        const razor = new window.Razorpay(options);
        razor.open();

        razor.on("payment.failed", function (response) {
          console.error("❌ Payment failed:", response.error.description);
          alert("Payment failed. Please try again.");
        });
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during payment.");
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="container mx-auto max-w-6xl py-4">
        <main className="flex flex-col lg:flex-row lg:space-x-4">
          <PaymentOptions
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
        <OrderSummary cartSummary={userCart} handlePayment={handlePayment} totalPrice={totalPrice}/>

        </main>
      </div>
      {/* <CustomPayment /> */}
      <AddressAutocompleteTestUI/>
       <div>
        <div
          style={{
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Nallakkar Payment</h2>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            style={{
              padding: "10px",
              width: "200px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
{/* working */}
          <button
            onClick={handlePayment}
            disabled={loading}
            style={{
              backgroundColor: "#3399cc",
              color: "#fff",
              padding: "10px 25px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>

          {/* ✅ Status Section */}
          <div style={{ marginTop: "25px", width: "70%", textAlign: "center" }}>
            {error && <p style={{ color: "red" }}>❌ {error}</p>}

            {success && order && !shipment && (
              <p style={{ color: "green" }}>
                ✅ Order Created — Proceed to Payment...
              </p>
            )}

            {shipment && (
              <div style={{ marginTop: "20px", color: "green" }}>
                <h3>✅ Payment Successful!</h3>
                <p>Shipment Created Successfully</p>
                <p>
                  Tracking URL:{" "}
                  <a
                    href={shipment.tracking_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#3399cc" }}
                  >
                    {shipment.tracking_url}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;



