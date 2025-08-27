import React, { useState } from "react";
import { IoChevronUp, IoChevronDown, IoLocationSharp } from "react-icons/io5";
import { SiGooglepay } from "react-icons/si";
import { ArrowLeft } from "lucide-react";
import img1 from "../assets/details2.png";
import { Link, useNavigate } from "react-router-dom";

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

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

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

const OrderSummary = () => (
  <div className="lg:w-1/3 w-full p-6 space-y-6 pb-16 lg:pb-6">
    {/* Product Card */}
    <div className="bg-white p-4 border rounded-lg shadow-sm flex space-x-4">
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
    </div>

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
        <p>+₹1500</p>
      </div>
      <hr />
      <div className="flex justify-between font-bold text-lg">
        <p>Order Total</p>
        <p>₹1500</p>
      </div>
      <Link
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

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="container mx-auto max-w-6xl py-4">
        <main className="flex flex-col lg:flex-row lg:space-x-4">
          <PaymentOptions
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
          <OrderSummary />
        </main>
      </div>
    </div>
  );
}

export default PaymentPage;
