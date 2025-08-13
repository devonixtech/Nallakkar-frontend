// components/FAQSection.jsx
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

// Replace this with your actual image import
import FAQImage from "../assets/tearms.png"; // Example image path
import InfoSection from "../Components/Custom/InfoSection";

const faqs = [
  {
    question: "1. How do I place an order?",
    answer:
      "To place an order, browse our products, add items to your cart, and proceed to checkout by providing your details and completing payment.",
  },
  {
    question: "2. How long does delivery take?",
    answer:
      "Delivery usually takes 3–7 business days, depending on your location.",
  },
  {
    question: "3. What payment methods are accepted?",
    answer:
      "We accept credit/debit cards, UPI, net banking, and wallet payments.",
  },
  {
    question: "4. Can I return or exchange a product?",
    answer:
      "Yes, products can be returned or exchanged within 7 days of delivery.",
  },
  {
    question: "5. Can I cancel my order?",
    answer:
      "Orders can be canceled before they are shipped. Contact support quickly!",
  },
  {
    question: "6. Is my payment secure?",
    answer:
      "Yes, your payment is processed through a secure and encrypted gateway.",
  },
  {
    question: "7. How can I track my order?",
    answer:
      "After shipping, you’ll receive an email/SMS with the tracking details.",
  },
  {
    question: "8. Will I receive an invoice?",
    answer: "Yes, a digital invoice will be emailed after order confirmation.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen">
      {/* ✅ Custom Image Component */}
      <div className="w-full mx-auto bg-white rounded-lg">
        <InfoSection
          imageSrc={FAQImage}
          alt="Payment Security Banner"
          title="FAQ"
        />

        {/* ✅ FAQ Content */}
        <div className="px-4 sm:px-6 md:px-20 py-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1a214c] mb-2">
            FAQ – Nallakkar
          </h2>
          <p className="text-[#ec3557] font-semibold mb-2">
            Welcome to the Nallakkar Help Center
          </p>
          <p className="text-gray-600 mb-6">
            We’re here to make your experience with Nallakkar smooth, secure,
            and satisfying. Can’t find what you’re looking for? Contact our
            customer support—we’re always happy to assist!
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-md shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center p-4 text-left font-semibold text-[#1a214c] focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className="text-sm">
                    {activeIndex === index ? (
                      <FaMinus className="text-primary" />
                    ) : (
                      <FaPlus className="text-primary" />
                    )}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>

          {/* Support Info */}
          <div className="mt-10 border-t pt-6">
            <h3 className="text-lg font-semibold text-[#1a214c] mb-2">
              Do you offer customer support?
            </h3>
            <p className="text-gray-700 mb-1">Yes, our team is here to help:</p>
            <p className="text-gray-700">
              📧 Email:{" "}
              <a href="mailto:support@nallakkar.com">support@nallakkar.com</a>
            </p>
            <p className="text-gray-700">
              📞 Call/WhatsApp: <a href="tel:+918884665337">+91-8884665337</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
