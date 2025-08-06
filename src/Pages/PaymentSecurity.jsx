import React from "react";
import InfoSection from "../Components/Custom/InfoSection";
import payment from "../assets/payment.png";

const paymentMethods = [
  "UPI (PhonePe, Google Pay, Paytm, etc.)",
  "Credit & Debit Cards (Visa, Mastercard, Rupay)",
  "Net Banking",
  "Cash on Delivery (COD) – Available on selected products",
  "Wallets (Paytm, Mobikwik, etc.)",
];

const PaymentSecurity = () => (
  <div className="min-h-screen px-2 sm:px-0">
    <div className="w-full mx-auto bg-white rounded-lg">
      {/* Header Image with Title */}
      <InfoSection
        imageSrc={payment}
        alt="Payment Security Banner"
        title="Payment Security"
      />

      {/* Payment Security Description */}
      <div className="p-12">
        <section className="mt-8">
          <h3 className="text-lg font-bold mb-2 text-gray-800">
            Payment Security at Nallakkar :
          </h3>
          <p className="text-gray-600">
            We are committed to providing a secure and streamlined payment
            experience. All transactions on our platform are protected by
            advanced encryption protocols, ensuring your information remains
            confidential. Shop confidently across our range of Nallakkar
            Products, knowing your payments are processed with the highest
            standards of safety and reliability.
          </p>
        </section>
        {/* Accepted Payment Methods */}
        <section className="mt-6">
          <h4 className="font-semibold text-md mb-2 text-gray-800">
            Accepted Payment Methods
          </h4>
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
            {paymentMethods.map((method, i) => (
              <div
                key={i}
                className="border rounded px-3 py-2 text-gray-700 bg-gray-100"
              >
                {method}
              </div>
            ))}
          </div>
        </section>
        {/* Secure Payments */}
        <section className="mt-6">
          <h4 className="font-semibold text-md mb-2 text-gray-800">
            Secure Payments
          </h4>
          <p className="text-gray-600">
            All transactions on Nallakkar are processed through trusted,
            encrypted payment gateways that comply with PCI-DSS standards,
            ensuring full data protection and a safe shopping experience.
          </p>
        </section>
        {/* Order Confirmation */}
        <section className="mt-6">
          <h4 className="font-semibold text-md mb-2 text-gray-800">
            Order Confirmation
          </h4>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              You will receive an instant confirmation via email and/or SMS.
            </li>
            <li>
              Your order will be carefully packed and shipped within 24-48
              hours.
            </li>
          </ul>
        </section>
        {/* GST Invoice */}
        <section className="mt-6">
          <h4 className="font-semibold text-md mb-2 text-gray-800">
            GST Invoice
          </h4>
          <p className="text-gray-600">
            A valid tax invoice, compliant with GST regulations, is
            automatically generated for every order. You will receive a copy via
            email after your purchase is confirmed.
          </p>
        </section>
        {/* Payment Issues */}
        <section className="mt-6">
          <h4 className="font-semibold text-md mb-2 text-gray-800">
            Facing Payment Issues?
          </h4>
          <p className="text-gray-600 mb-1">
            If you encounter any problems during the payment process, we&apos;re
            here to help:
          </p>
          <ul className="text-gray-600">
            <li>
              <span className="font-medium">Email:</span> support@nallakakar.com
            </li>
            <li>
              <span className="font-medium">Call/WhatsApp:</span> +91-8846665337
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
);

export default PaymentSecurity;
