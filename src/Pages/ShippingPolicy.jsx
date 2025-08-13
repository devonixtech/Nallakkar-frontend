import React from "react";
import InfoSection from "../Components/Custom/InfoSection";
import shipping from "../assets/shipping.png";

const ShippingPolicy = () => (
  <div className="min-h-screen">
    <div className="w-full mx-auto bg-white rounded-lg">
      {/* Header Image with Title */}
      <InfoSection
        imageSrc={shipping}
        alt="Shipping Policy Banner"
        title="Shipping Policy"
      />

      {/* Shipping Policy Content */}
      <div className="px-4 sm:px-6 md:px-20 py-10 text-[#565658] text-[16px] md:text-[18px] leading-relaxed font-montserrat space-y-8">

        <section>
          <h3 className="text-[20px] md:text-[22px] font-semibold text-primary mb-2">
            Shipping Policy – Nallakkar
          </h3>
          <p>
            At Nallakkar, we are committed to delivering our products safely,
            promptly, and with care. Every order is handled with precision to
            ensure a smooth and dependable delivery experience.
          </p>
        </section>

        <section>
          <h4 className="text-[20px] md:text-[22px] font-semibold text-primary mb-2">
            Order Processing Time
          </h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Orders are typically processed within <strong>24 to 48 hours</strong> of confirmation.</li>
            <li>Orders placed on <strong>Sundays or public holidays</strong> will be processed on the next working day.</li>
          </ul>
        </section>

        <section>
          <h4 className="text-[20px] md:text-[22px] font-semibold text-primary mb-2">
            Estimated Delivery Timelines
          </h4>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Metro Cities:</strong> 3–5 working days</li>
            <li><strong>Other Urban/Non-Metro Areas:</strong> 5–7 working days</li>
            <li><strong>Remote & Rural Locations:</strong> 7–10 working days</li>
          </ul>
        </section>

        <section>
          <h4 className="text-[20px] md:text-[22px] font-semibold text-primary mb-2">
            Shipping Coverage
          </h4>
          <p>
            We currently ship across India through our trusted logistics partners.
          </p>
        </section>

        <section>
          <h4 className="text-[20px] md:text-[22px] font-semibold text-primary mb-2">
            Order Tracking
          </h4>
          <ul className="list-disc list-inside space-y-1">
            <li>A tracking link will be shared via SMS and email.</li>
            <li>You can also track the status anytime in the <strong>"My Orders"</strong> section of your Nallakkar account.</li>
          </ul>
        </section>

        <section>
          <h4 className="text-[20px] md:text-[22px] font-semibold text-primary mb-2">
            Delivery Delays
          </h4>
          <p>While we strive for timely delivery, occasional delays may occur due to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Natural calamities or extreme weather</li>
            <li>Government or pandemic-related restrictions</li>
            <li>Logistic disruptions in remote or hard-to-reach areas</li>
          </ul>
          <p>In such cases, we’ll keep you informed and updated at every step.</p>
        </section>

        <section>
          <h4 className="text-[20px] md:text-[22px] font-semibold text-primary mb-2">
            Need Assistance?
          </h4>
          <p>If you encounter any problems during the payment process, we're here to help:</p>
          <ul className="list-inside space-y-1">
            <li><strong>Email:</strong> support@nallakkar.com</li>
            <li><strong>Call/WhatsApp:</strong> +91-8846665337</li>
          </ul>
        </section>

      </div>
    </div>
  </div>
);

export default ShippingPolicy;
