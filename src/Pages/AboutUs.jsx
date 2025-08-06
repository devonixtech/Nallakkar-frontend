import React from "react";
import watermark from "../assets/Path.png";
import {
  Sparkle,
  ShieldCheck,
  Clock,
  LifeBuoy,
  RefreshCw,
  Leaf,
} from "lucide-react";

// Import your icon images
import createUniqueImg from "../assets/fast-delivery.png";
import AboutNallakkar from "./HomeFolder/AboutNallakkar";
// import fastDeliveryImg from "./assets/icons/fast-delivery.png";
// import qualitySecurityImg from "./assets/icons/quality-security.png";
// import flexibilityImg from "./assets/icons/flexibility.png";
// import supportImg from "./assets/icons/support.png";
import sustainableImg from "../assets/benifits.png";

const features = [
  {
    icon: <Sparkle className="w-7 h-7 text-[#1e2241]" />,
    title: "Create Unique",
    desc:
      "Uncover unique treasures and experiences tailored just for you. We're here to help you find what you truly love.",
    img: createUniqueImg,
  },
  {
    icon: <Clock className="w-7 h-7 text-[#1e2241]" />,
    title: "Fast Delivery",
    desc:
      "Get your order fast with our lightning-quick shipping! We're committed to getting your items to you as soon as possible.",
    img: createUniqueImg,
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-[#1e2241]" />,
    title: "Quality And Security",
    desc:
      "Experience peace of mind with our unwavering commitment to top-tier quality and ironclad security. Your satisfaction and safety are our highest priorities.",
    img: createUniqueImg,
  },
  {
    icon: <RefreshCw className="w-7 h-7 text-[#1e2241]" />,
    title: "Flexibility And Patience",
    desc:
      "Your needs come first. We offer flexible solutions and the patience to ensure you’re always satisfied.",
    img: createUniqueImg,
  },
  {
    icon: <LifeBuoy className="w-7 h-7 text-[#1e2241]" />,
    title: "Support 24/7",
    desc:
      "Get immediate help whenever you need it, with our continuous 24/7 support. We’re always on standby to address your queries and ensure uninterrupted service.",
    img: createUniqueImg,
  },
  {
    icon: <Leaf className="w-7 h-7 text-[#1e2241]" />,
    title: "Sustainable by Design",
    desc:
      "Crafting solutions that benefit both our clients and the environment. We prioritize sustainability, delivering products and services with long-term ecological responsibility.",
    img: sustainableImg,
  },
];

export default function WorkSection() {
  return (
    <div>
      <AboutNallakkar></AboutNallakkar>
      <div className="relative bg-white min-h-[540px] flex items-center justify-center py-10">
        {/* Watermark */}
        <img
          src={watermark}
          alt="watermark"
          className="absolute left-0 lg:left-24 top-1/2 transform -translate-y-1/2 z-0 w-72 lg:w-[18rem] pointer-events-none"
          style={{ mixBlendMode: "multiply" }}
        />
        <div className="relative flex w-full max-w-5xl mx-auto z-10">
          {/* Left Side */}
          <div className="flex-1 flex items-center justify-center">
            <span className="text-2xl lg:text-3xl font-bold text-gray-800 z-10 -left-20 relative">
              What&apos;s We Work
            </span>
          </div>
          {/* Right Side */}
          <div className="flex-[2] grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-10 pl-8">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 items-start">
                {/* <img
                  src={f.img}
                  alt={f.title}
                  className="w-[50px] h-[50px] mb-2 border-2 border-gray-400 rounded-full p-1"
                  style={{ objectFit: "contain" }}
                /> */}
                <div className="pt-1 border-2 border-gray-400 rounded-full p-1">{f.icon}</div>
                <div>
                  <div className="font-bold text-primary mb-1 text-base">
                    {f.title}
                  </div>
                  <p className="text-[#414141] text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
