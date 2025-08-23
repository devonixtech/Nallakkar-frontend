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
import create from "../assets/svg/Create Unique.svg";
import patience from "../assets/svg/Flexibility And Patience.svg";
import assurance from "../assets/svg/Quality And Security.svg";
import fastDevliry from "../assets/svg/fast-delivery.svg";
import sustainableImg from "../assets/svg/Sustainable by Design.svg";
import support from "../assets/svg/Support 247.svg";
import path from "../assets/Path.png";
import background from "../assets/background.png";

const features = [
  {
    icon: <Sparkle className="w-4 h-7 text-[#1e2241]" />,
    title: "Create Unique",
    desc:
      "Uncover unique treasures and experiences tailored just for you. We're here to help you find what you truly love.",
    img: create,
  },
  {
    icon: <Clock className="w-7 h-7 text-[#1e2241]" />,
    title: "Fast Delivery",
    desc:
      "Get your order fast with our lightning-quick shipping! We're committed to getting your items to you as soon as possible.",
    img: fastDevliry,
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-[#1e2241]" />,
    title: "Quality And Security",
    desc:
      "Experience peace of mind with our unwavering commitment to top-tier quality and ironclad security. Your satisfaction and safety are our highest priorities.",
    img: assurance,
  },
  {
    icon: <RefreshCw className="w-7 h-7 text-[#1e2241]" />,
    title: "Flexibility And Patience",
    desc:
      "Your needs come first. We offer flexible solutions and the patience to ensure you’re always satisfied.",
    img: patience,
  },
  {
    icon: <LifeBuoy className="w-7 h-7 text-[#1e2241]" />,
    title: "Support 24/7",
    desc:
      "Get immediate help whenever you need it, with our continuous 24/7 support. We’re always on standby to address your queries and ensure uninterrupted service.",
    img: support,
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
      <div className="flex flex-col md:flex-row bg-white px-[2rem] md:px-[7rem] py-10 md:py-16 items-center md:items-start overflow-x-hidden">
        {/* Left: Text Content */}
        <div className="md:w-1/2 mt-5 text-primary font-montserrat">
          <h2 className="text-2xl font-bold mb-6">About Nallakkar</h2>
          <p className="mb-4 font-[500] leading-tight">
            At Nallakkar, we believe in creating more than just products—we
            build a brand experience rooted in originality, quality, and
            cultural authenticity. Every Nallakkar Product reflects our passion
            for design with purpose, made exclusively in-house and crafted to
            meet the evolving needs of modern individuals and families.
          </p>
          <p className="mb-4 font-[500] leading-tight">
            Founded with a vision to redefine everyday living through thoughtful
            innovation, Nallakkar represents trust, creativity, and rooted
            values. Our name—Nallakkar, meaning “good people”—is a reflection of
            who we are and who we serve.
          </p>
          <p className="mb-4 font-[500] leading-tight">
            We are committed to offering products that are not only beautiful
            and functional, but also tell a story—your story. Whether it’s for
            your home, your loved ones, or yourself, Nallakkar Products are
            designed to elevate everyday moments.
          </p>
          <p className="font-[500] leading-tight">
            This is more than a brand. This is a movement of good people,
            building good things, with good intent.
          </p>

          <div className="flex gap-8 items-center mt-6">
            {/* Profile 1 */}
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Sumedha NR"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-[#1e2241]"
              />
              <div>
                <div className="font-bold text-primary">Sumedha NR</div>
                <div className="text-primary text-xs font-medium">
                  Founder & CEO
                </div>
              </div>
            </div>
            {/* Profile 2 */}
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/82.jpg"
                alt="Boomika T.S"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-[#1e2241]"
              />
              <div>
                <div className="font-bold text-primary">Boomika T.S</div>
                <div className="text-primary text-xs font-medium">
                  Co-Founder & Managing Director
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Images (hidden on mobile) */}
        <div className="hidden md:block md:w-1/2">
          <div className="relative flex items-center justify-center min-h-[540px] w-[420px] mx-[13rem]">
            {/* Pink Paint Blob */}
            <img
              src={path}
              alt=""
              className="absolute -left-14 top-[280px] w-[400px] h-[220px] z-0 select-none pointer-events-none"
              draggable={false}
            />

            {/* Top Oval - Background */}
            <div className="absolute -left-11 top-0 w-[250px] h-[390px] rounded-[55%/40%] overflow-hidden z-10 shadow-md">
              <img
                src={background}
                alt=""
                className="object-cover w-full h-full"
                draggable={false}
              />
            </div>

            {/* Main Oval - People */}
            <div className="absolute left-0 top-[85px] w-[250px] h-[410px] rounded-[55%/40%] overflow-hidden z-20 border-4 border-white shadow-xl bg-white">
              <img
                src="https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=facearea&w=400&q=80"
                alt=""
                className="object-cover w-full h-full"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white min-h-[540px] flex items-center justify-center py-10 px-4 sm:px-6 md:px-8">
        {/* Watermark */}
        <img
          src={watermark}
          alt="watermark"
          className="hidden lg:block absolute left-0 sm:left-28 md:left-24 top-1/2 transform -translate-y-1/2 z-0 w-44 sm:w-60 md:w-[18rem] pointer-events-none"
          style={{ mixBlendMode: "multiply" }}
        />

        <div className="relative flex flex-col md:flex-row w-full max-w-5xl mx-auto z-10 gap-8 md:gap-0">
          {/* Left Side */}
          <div className="flex-1 flex items-center justify-center md:justify-start">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 z-10 relative text-center md:text-left">
              What&apos;s We Work
            </span>
          </div>
          {/* Right Side */}
          <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 sm:gap-x-10">
            {features.map((f) => (
              <div key={f.title} className="flex gap-3 sm:gap-4 items-start">
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-12 h-12 sm:w-[40px] sm:h-[50px] mb-1 rounded-full shadow-lg p-1 object-contain"
                />
                <div>
                  <div className="font-bold text-primary mb-1 text-sm sm:text-base">
                    {f.title}
                  </div>
                  <p className="text-[#414141] text-xs sm:text-sm leading-relaxed">
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
