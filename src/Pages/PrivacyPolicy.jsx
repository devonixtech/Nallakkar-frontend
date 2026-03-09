import React from "react";
import InfoSection from "../Components/Custom/InfoSection";
import MobileBottomNav from "../Components/layout/MobileBottomNav";
const PrivacyPolicy = () => {
  return (
    <>

      <div className="min-h-screen mb-20">
        <div className="w-full mx-auto bg-white rounded-lg">

          {/* Banner Section */}
          <InfoSection
            imageSrc="https://i.ibb.co/VcVGxTtW/2151998496.jpg"
            alt="Privacy Policy Banner"
            title="Privacy Policy"
          />

          {/* Content Area */}
          <div className="px-4 sm:px-6 md:px-20 py-10 text-[#565658] 
            text-[16px] md:text-[18px] leading-relaxed font-montserrat space-y-6">

            <h3 className="text-[20px] md:text-[22px] font-semibold text-primary mb-4">
              Privacy Policy – Nallakkar
            </h3>

            <p><strong>Effective Date:</strong> 07 April 2025</p>
            <p><strong>Last Updated:</strong> 07 April 2025</p>

            <p>
              This Privacy Policy governs the manner in which NALLAKKAR TECHNOLOGIES LLP,
              operating under the brand name NALLAKKAR, collects, uses, maintains,
              discloses and protects the information of users who access or engage with
              its website and services. This policy applies to all visitors, customers
              and users of the website and is formulated in accordance with the
              Information Technology Act, 2000, the Digital Personal Data Protection
              (DPDP) Act, 2023 of India, and the General Data Protection Regulation
              (GDPR) for international users.
            </p>

            <p>
              NALLAKKAR TECHNOLOGIES LLP may collect personal identification information
              from users in various ways, including but not limited to when users visit
              the website, place an order, fill out a form, submit a query or interact
              with website features. The personal data collected may include the user's
              name, phone number, email address, shipping address, billing address and
              payment-related information necessary for fulfilling orders and responding
              to customer enquiries. Payment transactions are processed through Razorpay,
              a secure third-party payment gateway, and the Company does not store or
              retain sensitive financial or card information on its own servers.
            </p>

            <p>
              Information is collected solely through the official website of NALLAKKAR
              and only for legitimate business purposes such as processing and delivering
              orders, handling customer support requests, improving service quality,
              communicating order updates and complying with legal obligations. The
              Company does not collect data through unauthorised third-party sources
              without explicit user consent.
            </p>

            <p>
              The website may automatically collect certain non-personal information such
              as IP address, browser type, device information, date and time of access
              and usage patterns for analytical and security purposes. This data helps
              in understanding customer behaviour, enhancing website performance and
              improving user experience.
            </p>

            <p>
              NALLAKKAR may share personal information with trusted third-party service
              providers such as logistics partners for delivery purposes and payment
              processors for transaction completion, strictly on a need-to-know basis.
              The Company does not sell, rent, lease or trade personal data to third
              parties for commercial gain. Disclosure may also occur if required by law
              or legal process by governmental authorities.
            </p>

            <p>
              Reasonable administrative, technical and physical safeguards are implemented
              to protect user data against unauthorised access, alteration, disclosure or
              destruction. Personal information is retained only for as long as necessary
              to fulfil the purposes for which it was collected, or as mandated by
              applicable law.
            </p>

            <p>
              For users located outside India, personal data may be transferred and
              processed in jurisdictions that maintain adequate data protection standards,
              and appropriate safeguards are implemented in accordance with GDPR
              provisions to ensure data integrity and confidentiality.
            </p>

            <p>
              Users have the right to access, correct, update or request deletion of their
              personal data, as well as withdraw consent where applicable. Requests
              regarding data rights may be submitted through the contact details
              provided below.
            </p>

            <p>
              The services of NALLAKKAR are not intended for individuals under the age of
              18 years and the Company does not knowingly collect personal data from
              minors.
            </p>

            <p>
              NALLAKKAR TECHNOLOGIES LLP reserves the right to modify or update this
              Privacy Policy at any time without prior notice. Any changes will be
              reflected on this page with the revised effective date. Continued use of
              the website after such changes constitutes acceptance of the updated policy.
            </p>

            <h3 className="font-semibold text-primary text-[20px] mt-10">Facing Privacy Policy Issues?</h3>

            <p>
              For any questions, concerns or requests relating to this Privacy Policy or
              the handling of personal information, users may contact:
            </p>

            <p><strong>NALLAKKAR TECHNOLOGIES LLP</strong></p>
            <p><strong>Email:</strong> support@nallakkar.com</p>
            <p><strong>Call/WhatsApp:</strong> +91-8884665337</p>
            <p>
              <strong>Registered Address:</strong> Madhugiri, Tumakuru, Karnataka-572132.
            </p>

            <p>
              By accessing or using this website, the user acknowledges having read,
              understood and agreed to the terms of this Privacy Policy.
            </p>

          </div>
        </div>
      </div>
      <MobileBottomNav />
    </>
  );
};

export default PrivacyPolicy;
