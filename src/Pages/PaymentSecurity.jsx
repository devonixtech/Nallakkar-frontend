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
  <div className="min-h-screen">
    <div className="w-full mx-auto bg-white rounded-lg">
      {/* Header Image with Title */}
      <InfoSection
        imageSrc={payment}
        alt="Payment Security Banner"
        title="Payment Security"
      />

      {/* Payment Security Description */}
      <div className="px-4 sm:px-6 md:px-20 pb-6">
        <section className="mt-12">
          <h3 className="text-[22px] font-semibold mb-2 text-primary">
            Payment Security at Nallakkar :
          </h3>
          <p className="text-[#565658] text-[18px] leading-tight">
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
          <h4 className="font-semibold text-[22px] mb-2 text-primary">
            Accepted Payment Methods
          </h4>
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
            {paymentMethods.map((method, i) => (
              <div
                key={i}
                className="border rounded px-3 py-4 text-[22px] text-[#565658] shadow-md"
              >
                {method}
              </div>
            ))}
          </div>
        </section>
        {/* Secure Payments */}
        <section className="mt-6">
          <h4 className="font-semibold text-md mb-2 text-primary text-[22px]">
            Secure Payments
          </h4>
          <p className="text-[#565668] leading-tight text-[18px]">
            All transactions on Nallakkar are processed through trusted,
            encrypted payment gateways that comply with PCI-DSS standards,
            ensuring full data protection and a safe shopping experience.
          </p>
        </section>
        {/* Order Confirmation */}
        <section className="mt-6">
          <h4 className="font-semibold text-md mb-2 text-primary text-[22px]">
            Order Confirmation
          </h4>
          <ul className="list-disc list-inside text-[#565658] text-[18px]">
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
          <h4 className="font-semibold text-md mb-2 text-primary text-[22px]">
            GST Invoice
          </h4>
          <p className="text-[#565658] text-[18px] leading-tight">
            A valid tax invoice, compliant with GST regulations, is
            automatically generated for every order. You will receive a copy via
            email after your purchase is confirmed.
          </p>
        </section>
        {/* Payment Issues */}
        <section className="mt-6">
          <h4 className="font-semibold text-md mb-2 text-primary text-[22px]">
            Facing Payment Issues?
          </h4>
          <p className="text-[#565658] text-[18px] mb-1">
            If you encounter any problems during the payment process, we&apos;re
            here to help:
          </p>
          <ul className="text-[#565658] text-[18px]">
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
