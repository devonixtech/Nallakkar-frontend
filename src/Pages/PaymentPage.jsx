 import React, { useState, useEffect } from "react";
import { IoChevronUp, IoChevronDown, IoLocationSharp } from "react-icons/io5";
// import { SiGooglepay } from "react-icons/si";
// import { ArrowLeft } from "lucide-react";
// import img1 from "../assets/details2.png";
import {  useNavigate } from "react-router-dom";
import { fetchCartByUserId } from "../Redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentOrder, verifyPaymentAndCreateShipment, resetPaymentState } from "../Redux/slices/paymentSlice";
// import { nav } from "framer-motion/client";
// import { clearBuyNowItem } from "../Redux/slices/buyNowSlice";
 import { getItem } from "../utils/localForageService";

const PhonePeIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-700 text-white font-bold text-sm">
    P
  </div>
);

const CredPayIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-400">
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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

// --- Reusable UI Components ---

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

 
 
const OrderSummary = ({ selling_price, handlePayment, address }) => {
  
const parsedAddress = address?.address || null;

  return (
    <div className="lg:flex-row w-full p-6 space-y-6 pb-16 lg:pb-6 addrsss" style={{display: "flex"}}>
      {/* Delivery Address */}
      <div className="bg-white p-4 border rounded-lg shadow-sm lg:w-2/3">
    

    
        <div className="flex items-center font-bold text-gray-700 mb-3">
          <IoLocationSharp className="mr-2" />
          Delivery Address
        </div>
        <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
          <div className="flex justify-between items-start">
            <p className="font-bold text-gray-800">
              {address?.firstName || ""} {address?.lastName || ""}
            </p>
            <button className="text-rose font-semibold hover:underline">
              Change
            </button>
          </div>

          {parsedAddress ? (
            <>
              <p className="mt-1">
                {parsedAddress.house || ""}, {parsedAddress.road || ""},{" "}
                {parsedAddress.nearby
 || ""}, {parsedAddress.city || ""},{" "}
                {parsedAddress.state || ""} - {parsedAddress.pincode || ""}
              </p>
              <p className="mt-1">{address?.contactNumber || ""}</p>
            </>
          ) : (
            <p className="text-gray-500 mt-1">No address found</p>
          )}
        </div>
          </div>
    

      {/* Price Details */}
      <div className="bg-white paymt p-4 border rounded-lg shadow-sm space-y-3 ms-4 lg:w-1/4
" style={{marginTop: "0px"}}>


 
        <h3 className="font-bold text-gray-700">Price Details (1 item)</h3>
        <div className="flex justify-between text-gray-600">
          <p>Total Product Price</p>
          <p>₹{selling_price}</p>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-lg">
          <p>Order Total</p>
          <p>₹{selling_price}</p>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-primary text-white py-3 font-bold text-lg mt-2 rounded-lg hover:bg-rose transition-colors"
        >
          Pay Now
        </button>
         </div>
     
    </div>
  );
};

function PaymentPage() {
 const [userdetails, setUserdetails] = useState(null);
 

  const [buyNowItem, setBuyNowItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
 
 const userString = localStorage.getItem("user");
const user = JSON.parse(userString);
const user_Id = user.id;
     useEffect(() => {
      dispatch(fetchCartByUserId(user_Id));
    }, [dispatch, user_Id]);
    useEffect(() => {
        const fetchAddress = async () => {
          const savedAddress = await getItem("selectedAddress");
          setUserdetails(savedAddress);
          // setSelectedAddress(savedAddress); // re-render
        };
        fetchAddress(); // <-- run async function
      }, []);
    useEffect(() => {
      
  const storedItem = localStorage.getItem("buyNowItem");
  if (storedItem) {
    setBuyNowItem(JSON.parse(storedItem));
  }
}, []);
  const items = useSelector((state) => state.cart);
  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

 

const orderItems =
  buyNowItem
    ? [
        {
          name: buyNowItem.product?.name?.trim() || "Unnamed Product",
          sku: `PROD-${buyNowItem.product?.id}`,
          productId: buyNowItem.product?.id,
          image:buyNowItem?.product?.image[0] || '',
          units: Number(buyNowItem.quantity || 1),
          selling_price:
            buyNowItem.variant?.price ||
            buyNowItem.product?.price ||
            buyNowItem.product?.selling_price ||
            0,
          length: buyNowItem.product?.length || 10,
          breadth: buyNowItem.product?.breadth || 10,
          height: buyNowItem.product?.height || 10,
          weight: buyNowItem.product?.weight || 0.5,
        },
      ]
    : items?.items?.map((item) => ({
        name: item.productName|| "Unnamed Product",
        sku: `PROD-${item.productId}`,
        productId: item.productId,
        image:item?.productImage[0],
        units: Number(item?.quantity),
        selling_price: item?.productPrice,
        length: item?.length || 10,
        breadth: item?.breadth || 10,
        height: item?.height || 10,
        weight: item?.weight || 0.5,
      }));
 
 
const totalWeight = buyNowItem
  ? (buyNowItem.product?.weight || 0.5) * buyNowItem.quantity
  : items?.items?.reduce(
      (sum, item) => sum + (item.weight || 0.5) * item.quantity,
      0
    );

const totalItems = buyNowItem
  ? buyNowItem.quantity
  : items?.items?.reduce((sum, item) => sum + item.quantity, 0);

const avgLength = buyNowItem
  ? buyNowItem.product?.length || 10
  : items?.items?.reduce(
      (sum, item) => sum + (item.length || 10) * item.quantity,
      0
    ) / totalItems;

const avgBreadth = buyNowItem
  ? buyNowItem.product?.breadth || 10
  : items?.items?.reduce(
      (sum, item) => sum + (item.breadth || 10) * item.quantity,
      0
    ) / totalItems;

const avgHeight = buyNowItem
  ? buyNowItem.product?.height || 10
  : items?.items?.reduce(
      (sum, item) => sum + (item.height || 10) * item.quantity,
      0
    ) / totalItems;

const totalLength = Math.round(avgLength);
const totalBreadth = Math.round(avgBreadth);
const totalHeight = Math.round(avgHeight);

// Selling price (from Buy Now or Cart)
const selling_price = buyNowItem
  ? (buyNowItem.product?.final_price ||
      buyNowItem.product?.price ||
      buyNowItem.product?.selling_price ||
      0) * buyNowItem.quantity
  : items?.totalPrice;

   
  const handlePayment = async () => {
    try {
      // Step 1️⃣: Create Razorpay Order via Redux
      const result = await dispatch(
        createPaymentOrder({
          amount:selling_price,
          customer_name: userdetails.firstName + " " + userdetails.lastName,
          customer_email: user?.email,
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        const razorpayOrder = result.payload;

        // Step 2️⃣: Initialize Razorpay Checkout
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Nallakkar",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async (response) => {
            // Step 3️⃣: Verify payment & create shipment via Redux
            await dispatch(
              verifyPaymentAndCreateShipment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                
                orderDetails: {
                  billing_first_name: userdetails.firstName,
                  billing_last_name: userdetails.lastName,
                  billing_email:  user?.email,
                  amount: razorpayOrder?.amount,
                  billing_address: userdetails?.address?.house + ", " + userdetails?.address?.road + ", " + (userdetails?.address?.nearby || ""),
                  billing_city: userdetails?.address?.city,
                  billing_pincode: userdetails?.address?.pincode,
                  billing_state: userdetails?.address?.state,
                  billing_country: "India",
                  billing_phone: userdetails.contactNumber,
                  shipping_is_billing: false,
                  shipping_first_name:  userdetails.firstName,
                  shipping_last_name: userdetails.lastName,
                  shipping_address:  userdetails?.address?.house + ", " + userdetails?.address?.road + ", " + (userdetails?.address?.nearby || ""),
                  shipping_city: userdetails?.address?.city,
                  shipping_pincode: userdetails?.address.pincode,
                  shipping_state: userdetails?.address?.state,
                  shipping_country: "India",
                  shipping_email: user?.email,
                  shipping_phone: userdetails.contactNumber,
                  order_items:  orderItems,
                  shipping_charges: 50,
                  sub_total: selling_price,
                  user_id: user_Id,
                  length: totalLength,
                  breadth: totalBreadth,
                 height: totalHeight,
                  weight: totalWeight,
                },
              })
            );

          // ✅ Step 4: Navigate to success page if verified successfully
             
              navigate("/PaymentSuccess");
           
           
        },
          
          prefill: {
            name: userdetails.firstName + " " + userdetails.lastName,
            email: user?.email,
            contact: userdetails.contactNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
        
      
        razor.on("payment.failed", function (response) {
          alert("❌ Payment failed: " + response.error.description);
        });
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during payment.");
    }
  };
  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="container mx-auto max-w-7xl py-4">
        <main className="flex   lg:space-x-4">
          
          <OrderSummary  selling_price={selling_price} handlePayment={handlePayment} address = {userdetails} />
        </main>
      </div>
       
     
       
    </div>
  );
}

export default PaymentPage;