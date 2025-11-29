import React from "react";
import InfoSection from "../Components/Custom/InfoSection";

// Replace if needed
const bannerImage = "https://i.ibb.co/VcVGxTtW/2151998496.jpg";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto bg-white rounded-lg">

        {/* Banner Section */}
        <InfoSection
          imageSrc={bannerImage}
          alt="Return Policy Banner"
          title="Return & Refund Policy"
        />

        {/* Content */}
        <div className="px-4 sm:px-6 md:px-20 py-10 text-[#565658] text-[16px] md:text-[18px] leading-relaxed font-montserrat space-y-8">

          <section>
            <h3 className="text-[20px] md:text-[22px] font-semibold text-primary mb-2">
              NALLAKKAR - Return & Refund Policy
            </h3>
            <p>
              At NALLAKKAR, we take great care to ensure that every Nallakkar
              product is crafted, checked and packaged with precision. Each order
              undergoes strict quality inspection before dispatch. Since our
              products are created with high standards and attention to detail,
              we do not accept returns or exchanges for reasons such as change of
              mind, dislike of the product, or any other personal preference.
            </p>
            <p className="mt-2">
              A return or refund is allowed <strong>only</strong> if the Nallakkar
              product you receive is damaged or defective at the time of delivery.
            </p>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">
              Informing Us About Damaged or Incorrect Products
            </h4>
            <p>
              If you receive a damaged or incorrect Nallakkar product, you must
              inform us <strong>within forty-eight hours</strong> of delivery. The
              item must remain unused, unwashed and in its original condition with
              all tags, labels, and packaging intact.
            </p>
            <p className="mt-2">
              An <strong>unboxing video without cuts or edits</strong> is required
              as proof to validate the claim. Once your request is submitted, our
              team will review the video and images and respond within
              <strong> 24–48 hours</strong>.
            </p>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">
              Pickup, Inspection & Refund Process
            </h4>
            <p>
              If your claim is approved, we will arrange a pickup from your
              address wherever possible. In locations where pickup service is not
              available, you may be asked to courier the product back to us.
            </p>
            <p className="mt-2">
              Once the product reaches us, it will undergo a quality inspection.
              Refunds are processed <strong>only after the inspection is completed</strong>.
            </p>
            <p className="mt-2">
              Approved refunds will be issued either as:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Store Credit</li>
              <li>Bank Refund (only if damage/defect is from our side)</li>
            </ul>

            <p className="mt-2">
              Refund completion may take <strong>7–10 working days</strong> after
              approval.
            </p>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">
              Non-Returnable & Non-Refundable Items
            </h4>
            <p>We do not accept returns or refunds for:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Products bought during sales, discounts, offers or clearance</li>
              <li>Customized, altered, or modified items</li>
              <li>Used, washed, damaged, or tampered products</li>
            </ul>
            <p className="mt-2">
              Any returned item not meeting our quality requirements will be
              rejected and shipped back to the customer.
            </p>
            <p>
              NALLAKKAR reserves the right to approve or deny any return request
              based on quality verification.
            </p>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">
              Our Commitment
            </h4>
            <p>
              This policy is designed to maintain fairness, transparency and the
              high standards that NALLAKKAR represents. For any concerns related
              to your order, you may contact our support team at
              <strong> support@nallakkar.com</strong> and we will be happy to
              assist you.
            </p>
          </section>

          <section>
            <h4 className="font-semibold text-primary text-[20px] mb-2">
              Facing Return & Refund Issues?
            </h4>
            <ul className="list-inside mt-2 space-y-1">
              <li><strong>Email:</strong> support@nallakkar.com</li>
              <li><strong>Call/WhatsApp:</strong> +91-8884665337</li>
              <li><strong>Company:</strong> NALLAKKAR TECHNOLOGIES LLP</li>
               <li><strong>Registered Address:</strong> Madhugiri,</li>
              <li>Tumakuru, Karnataka-572132</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
