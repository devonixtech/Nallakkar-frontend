import {
  FaShippingFast,
  FaGem,
  FaHandsHelping,
  FaShieldAlt,
} from "react-icons/fa";

export default function Features() {
  return (
    <div className="flex justify-center items-start font-montserrat bg-white px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
        {/* Fast Shipping */}
        <div className="flex-1 flex flex-col items-start p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-gray-100 mr-4">
              <FaShippingFast className="text-2xl text-[#1a214c]" />
            </div>
            <h2 className="font-bold text-lg text-[#1a214c]">Fast Shipping</h2>
          </div>
          <p className="leading-relaxed text-gray-700">
            Get your order fast with our lightning-quick shipping! We&apos;re
            committed to getting your items to you as soon as possible.
          </p>
        </div>

        {/* Create Unique */}
        <div className="flex-1 flex flex-col items-start p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-gray-100 mr-4">
              <FaGem className="text-2xl text-[#1a214c]" />
            </div>
            <h2 className="font-bold text-lg text-[#1a214c]">Create Unique</h2>
          </div>
          <p className="leading-relaxed text-gray-700">
            Uncover unique treasures and experiences tailored just for you.
            We&apos;re here to help you find what you truly love.
          </p>
        </div>

        {/* Flexibility And Patience */}
        <div className="flex-1 flex flex-col items-start p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-gray-100 mr-4">
              <FaHandsHelping className="text-2xl text-[#1a214c]" />
            </div>
            <h2 className="font-bold text-lg text-[#1a214c]">Flexibility And Patience</h2>
          </div>
          <p className="leading-relaxed text-gray-700">
            Your needs come first. We offer flexible solutions and the patience to
            ensure you&apos;re always satisfied.
          </p>
        </div>

        {/* Quality And Security */}
        <div className="flex-1 flex flex-col items-start p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-gray-100 mr-4">
              <FaShieldAlt className="text-2xl text-[#1a214c]" />
            </div>
            <h2 className="font-bold text-lg text-[#1a214c]">Quality And Security</h2>
          </div>
          <p className="leading-relaxed text-gray-700">
            Experience peace of mind with our unwavering commitment to top-tier
            quality and ironclad security. Your satisfaction and safety are our
            highest priorities.
          </p>
        </div>
      </div>
    </div>
  );
}