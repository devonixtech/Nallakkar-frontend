import React from "react";
import InfoSection from "../Components/Custom/InfoSection";
import termsImage from "../assets/tearms.png"; // replace with your actual image path

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto bg-white rounded-lg">
        <InfoSection
          imageSrc={termsImage}
          alt="Terms and Conditions Banner"
          title="Terms and Conditions"
        />

        <div className="px-4 sm:px-6 md:px-20 py-10 text-[#565658] text-[16px] md:text-[18px] leading-relaxed font-montserrat space-y-8">

          <section>
            <h3 className="text-[20px] md:text-[22px] font-semibold text-primary mb-2">
              Terms and Conditions – Nallakkar
            </h3>
            <p>
              Welcome to Nallakkar! By accessing or using our website
              (www.nallakkar.com), you agree to be bound by these Terms and
              Conditions. Please read them carefully.
            </p>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">1. Use of Website</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>You must be at least 18 years old to use this website.</li>
              <li>You agree not to misuse the website, such as by hacking or sending spam.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">2. Products and Services</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>All products are subject to availability.</li>
              <li>We reserve the right to modify or discontinue products at any time without notice.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">3. Products & Pricing</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>All prices are listed in INR (₹) and are inclusive of applicable taxes unless otherwise stated.</li>
              <li>We reserve the right to change product prices, specifications, or availability without prior notice.</li>
              <li>Product colors may vary slightly due to screen resolution and photography.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">4. Orders & Payment</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Orders can be placed through our secure online checkout.</li>
              <li>
                Accepted payment methods include: UPI, Debit/Credit Cards, Net Banking, Wallets, and COD (where available).
              </li>
              <li>Once an order is confirmed, you will receive an order summary via email or SMS.</li>
              <li>We reserve the right to cancel any order due to stock unavailability or suspicious activity.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">5. Shipping and Delivery</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Delivery timelines vary by location.</li>
              <li>Nallakkar is not responsible for delays caused by courier partners.</li>
              <li>Delays may occur during festivals, lockdowns, or courier service issues.</li>
              <li>Shipping charges, if any, will be mentioned during checkout.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">6. Returns and Refunds</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Returns are accepted within 7 days of delivery for damaged or incorrect items.</li>
              <li>Refunds will be processed after inspection. Read our Return Policy [link].</li>
              <li>
                Certain items like innerwear, accessories, or custom orders are non-returnable. Refunds, if approved, will
                be processed within 7–10 working days via original payment method.
              </li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">7. Modifications to Terms</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>We reserve the right to update or modify these terms at any time without prior notice.</li>
              <li>Continued use of the site after changes implies acceptance of those changes.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">8. Privacy Policy</h4>
            <p>Your personal data is protected as per our [Privacy Policy link].</p>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">9. Intellectual Property</h4>
            <p>All content on this site is owned by Nallakkar and cannot be reused without permission.</p>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">10. Limitation of Liability</h4>
            <p>Nallakkar is not responsible for any direct or indirect damages from use of this site.</p>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">11. Governing Law</h4>
            <p>These terms are governed by Indian law and subject to Bengaluru jurisdiction.</p>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">Need Assistance?</h4>
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
};

export default TermsAndConditions;
