 import React, { useState, useEffect } from "react";
import { IoChevronUp, IoChevronDown, IoLocationSharp } from "react-icons/io5";
import { SiGooglepay } from "react-icons/si";
import { ArrowLeft } from "lucide-react";
import img1 from "../assets/details2.png";
import { Link, useNavigate } from "react-router-dom";
import { fetchCartByUserId } from "../Redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
// import CustomPayment from "./CustomPayment";
import { createPaymentOrder, verifyPaymentAndCreateShipment, resetPaymentState } from "../Redux/slices/paymentSlice";
import AddressAutocompleteTestUI from "./AddressAutocompleteTestUI";

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

// --- Main Page Sections ---

const PaymentOptions = ({ selectedPayment, setSelectedPayment }) => {
  const [openSection, setOpenSection] = useState("upi");
  const navigate = useNavigate();

  return (
    <div className="lg:w-2/3 w-full bg-white p-6">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 -ml-6"
      >
        <ArrowLeft className="text-2xl" />
        <h1 className="text-xl font-bold">Select Payment method</h1>
      </div>
      <h2 className="font-semibold mb-2 text-[18px]">Payment Options</h2>
      <div className="shadow-md rounded-md p-4">
        {/* Last Used */}
        <div className="border-b pb-2">
          <p className="text-sm font-semibold text-gray-600 mb-2">Last Used</p>
          <RadioInput
            id="phonepe_last_used"
            value="phonepe_last_used"
            checked={selectedPayment === "phonepe_last_used"}
            onChange={(e) => setSelectedPayment(e.target.value)}
            icon={<PhonePeIcon />}
            label="Phonepe"
          />
        </div>

        {/* Pay by any UPI App */}
        <AccordionItem
          title="Pay by any UPI App"
          isOpen={openSection === "upi"}
          onToggle={() => handleToggle("upi")}
        >
          <div className="space-y-2">
            <RadioInput
              id="phonepe_upi"
              value="phonepe_upi"
              checked={selectedPayment === "phonepe_upi"}
              onChange={(e) => setSelectedPayment(e.target.value)}
              icon={<PhonePeIcon />}
              label="Phonepe"
            />
            <RadioInput
              id="googlepay_upi"
              value="googlepay_upi"
              checked={selectedPayment === "googlepay_upi"}
              onChange={(e) => setSelectedPayment(e.target.value)}
              icon={<SiGooglepay className="text-2xl" />}
              label="GooglePay"
            />
            <div className="flex items-center space-x-4 py-3">
              <input
                type="radio"
                id="credpay_upi"
                name="paymentMethod"
                value="credpay_upi"
                checked={selectedPayment === "credpay_upi"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="h-4 w-4"
              />
              <div className="flex items-center space-x-3">
                <CredPayIcon />
                <div>
                  <span className="font-medium text-gray-800">CredPay</span>
                  <p className="text-xs text-green-600">
                    Upto ₹50 cashback on orders above 500* T&C
                  </p>
                </div>
              </div>
            </div>
            <button className="font-semibold text-pink-600 text-sm ml-8 mt-2">
              ADD UPI ID +
            </button>
          </div>
        </AccordionItem>

        {/* Wallets */}
        <AccordionItem
          title="Wallets"
          isOpen={openSection === "wallets"}
          onToggle={() => handleToggle("wallets")}
        >
          <RadioInput
            id="simpl_wallet"
            value="simpl_wallet"
            checked={selectedPayment === "simpl_wallet"}
            onChange={(e) => setSelectedPayment(e.target.value)}
            icon={<SimplIcon />}
            label="SIMPL"
          />
        </AccordionItem>

        {/* Debit/Credit Cards */}
        <AccordionItem
          title="Debit/Credit Cards"
          isOpen={openSection === "cards"}
          onToggle={() => handleToggle("cards")}
        >
          <p className="text-gray-500 ml-8">Card options would be here.</p>
        </AccordionItem>

        {/* Net Banking */}
        <AccordionItem
          title="Net Banking"
          isOpen={openSection === "netbanking"}
          onToggle={() => handleToggle("netbanking")}
        >
          <div className="space-y-2">
            <RadioInput
              id="sbi"
              value="sbi"
              checked={selectedPayment === "sbi"}
              onChange={(e) => setSelectedPayment(e.target.value)}
              label="State Bank of India"
            />
            <RadioInput
              id="hdfc"
              value="hdfc"
              checked={selectedPayment === "hdfc"}
              onChange={(e) => setSelectedPayment(e.target.value)}
              icon={<HdfcIcon />}
              label="HDFC Bank"
            />
            <RadioInput
              id="icici"
              value="icici"
              checked={selectedPayment === "icici"}
              onChange={(e) => setSelectedPayment(e.target.value)}
              icon={<IciciIcon />}
              label="ICICI BANK"
            />
            <RadioInput
              id="axis"
              value="axis"
              checked={selectedPayment === "axis"}
              onChange={(e) => setSelectedPayment(e.target.value)}
              icon={<AxisBankIcon />}
              label="AXIS BANK"
            />
            <button className="font-semibold text-pink-600 text-sm ml-8 mt-2">
              VIEW ALL BANK
            </button>
          </div>
        </AccordionItem>
      </div>
      {/* Cash on Delivery */}
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

const OrderSummary = ({ selling_price  , handlePayment}) => (
  <div className="lg:w-1/3 w-full p-6 space-y-6 pb-16 lg:pb-6">
    {/* Product Card */}
    {/* <div className="bg-white p-4 border rounded-lg shadow-sm flex space-x-4">
      <img
        src={img1} // Placeholder image
        alt="Girl Jacket"
        className="w-24 h-32 object-cover rounded-md"
      />
      <div className="text-sm space-y-1">
        <h3 className="font-bold">Girl Jacket Jacket</h3>
        <p className="font-semibold">₹1500.00</p>
        <p className="text-gray-500">Nallakkar</p>
        <p className="text-gray-500">Qty: 1</p>
        <p className="text-gray-500">size: S</p>
        <p className="font-medium text-green-600">Free Delivery</p>
      </div>
    </div> */}

    {/* Delivery Address */}
    <div className="bg-white p-4 border rounded-lg shadow-sm">
      <div className="flex items-center font-bold text-gray-700 mb-3">
        <IoLocationSharp className="mr-2" />
        Delivery Address
      </div>
      <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
        <div className="flex justify-between items-start">
          <p className="font-bold text-gray-800">Naveena Reddy</p>
          <button className="text-rose font-semibold">Change</button>
        </div>
        <p>
          403, Aashirvad nilaya 7th main, 1st cross B Narayanapura, Mahadevapura
          Bengaluru, Karnataka-560048
        </p>
        <p>6300******</p>
      </div>
    </div>

    {/* Price Details */}
    <div className="bg-white p-4 border rounded-lg shadow-sm space-y-3">
      <h3 className="font-bold text-gray-700">Price Details (1 items)</h3>
      <div className="flex justify-between text-gray-600">
        <p>Total Product Price</p>
        <p>{selling_price}</p>
      </div>
      <hr />
      <div className="flex justify-between font-bold text-lg">
        <p>Order Total</p>
        <p>₹{selling_price}</p>
      </div>
      <Link
         onClick={handlePayment}
        to={"/PaymentSuccess"}

        className="block text-center w-full bg-primary text-white py-3 font-bold text-lg mt-2 hover:bg-rose transition-colors"
      >
        Pay Now
      </Link>
    </div>
  </div>
);

function PaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState("phonepe_last_used");
  const [amount, setAmount] = useState(100);
  const dispatch = useDispatch();
  //  const userId = localStorage.getItem("userId");
 
  const userCart = useSelector((state) => state?.cart?.items);
  const { order, shipment, loading, error, success } = useSelector(
    (state) => state.payment
  );
 const userString = localStorage.getItem("user");
const user = JSON.parse(userString);
const user_Id = user.id;
     useEffect(() => {
      fetchCartByUserId(user_Id);
    }, [dispatch, user_Id]);
  const items = useSelector((state) => state.cart);
  console.log("User Cart Items:", items);
  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  const userdetails =
  useSelector((state) => state?.address?.selectedAddress) ||
  JSON.parse(localStorage.getItem("selectedAddress")) ||
  null;
     console.log("add",userdetails)
  // console.log("Selected Address", selectedAddress);
  //  const userdetails =   {
  //           "id": 1,
  //           "userId": 8,
  //           "firstName": "Ankit",
  //           "lastName": "Verma",
  //           "contactNumber": "7693803028",
  //           "address": {
  //               "city": "Mumbai",
  //               "state": "Maharashtra",
  //               "street": "MG Road, Andheri East",
  //               "houseNo": "101 A Wing",
  //               "pincode": "400069",
  //               "landmark": "Near Metro Station"
  //           }};
            // Assuming `cartData` is your API response (like the one in your screenshot)
 
// console.log((items))
// Transform to Shiprocket order_items format
const orderItems = items?.items?.map(item => ({
  name: item.productName.trim(),
  sku: `PROD-${item.productId}`, // Or use your real SKU if available
  units: Number(item.quantity),
  selling_price: item.productPrice
}));
const selling_price = items?.totalPrice
console.log("orderItems",items);
// console.log("22",orderItems);
  // let totalPrice = userCart?.totalPrice || 0;

  // if (buyNowItem?.product) {
  //   const variantPrice =
  //     buyNowItem.variant?.price || buyNowItem.product.price || 0;
  //   totalPrice = variantPrice * buyNowItem.quantity;
  // }
{console.log(userCart)}
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
                // orderDetails: {
                //   billing_customer_name: "Ankit Verma",
                //   billing_email: "ankit@example.com",
                //   amount,
                // },
                orderDetails: {
                  billing_first_name: userdetails.firstName,
                  billing_last_name: userdetails.lastName,
                  billing_email:  user?.email,
                  amount: amount,
                  billing_address: userdetails?.address?.houseNo + ", " + userdetails?.address?.street + ", " + (userdetails?.address?.landmark || ""),
                  billing_city: userdetails?.address?.city,
                  billing_pincode: userdetails?.address?.pincode,
                  billing_state: userdetails?.address?.state,
                  billing_country: "India",
                  billing_phone: userdetails.contactNumber,
                  shipping_is_billing: false,
                  shipping_first_name:  userdetails.firstName,
                  shipping_last_name: userdetails.lastName,
                  shipping_address:  userdetails?.address?.houseNo + ", " + userdetails?.address?.street + ", " + (userdetails?.address?.landmark || ""),
                  shipping_city: userdetails?.address?.city,
                  shipping_pincode: userdetails?.address.pincode,
                  shipping_state: userdetails?.address?.state,
                  shipping_country: "India",
                  shipping_email: user?.email,
                  shipping_phone: userdetails.contactNumber,
                  order_items:  orderItems,
                  shipping_charges: 50,
                  sub_total: 499,
                },
              })
            );
          },
          prefill: {
            name: "Ankit Verma",
            email: "ankit@example.com",
            contact: "9999999999",
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
      <div className="container mx-auto max-w-6xl py-4">
        <main className="flex flex-col lg:flex-row lg:space-x-4">
          <PaymentOptions
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
          <OrderSummary  selling_price={selling_price} handlePayment={handlePayment} />
        </main>
      </div>
      {/* <CustomPayment /> */}
      {/* <AddressAutocompleteTestUI/> */}
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