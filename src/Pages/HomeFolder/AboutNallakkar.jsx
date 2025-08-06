import React from "react";
import path from "../../assets/Path.png";
import background from "../../assets/background.png";

export default function AboutNallakkar() {
  return (
    <div className="flex flex-col md:flex-row bg-white px-[7rem] py-16 items-center md:items-start">
      {/* Left: Text Content */}
      <div className="md:w-1/2 mt-5 font-montserrat">
        <h2 className="text-2xl font-bold mb-6 text-[#222654]">
          About Nallakkar
        </h2>
        <p className="mb-4 font-[500] leading-tight">
          At Nallakkar, we believe in creating more than just products—we build
          a brand experience rooted in originality, quality, and cultural
          authenticity. Every Nallakkar Product reflects our passion for design
          with purpose, made exclusively in-house and crafted to meet the
          evolving needs of modern individuals and families.
        </p>
        <p className="mb-4 font-[500] leading-tight">
          Founded with a vision to redefine everyday living through thoughtful
          innovation, Nallakkar represents trust, creativity, and rooted values.
          Our name—Nallakkar, meaning “good people”—is a reflection of who we
          are and who we serve.
        </p>
        <p className="mb-4 font-[500] leading-tight">
          We are committed to offering products that are not only beautiful and
          functional, but also tell a story—your story. Whether it’s for your
          home, your loved ones, or yourself, Nallakkar Products are designed to
          elevate everyday moments.
        </p>
        <p className="font-[500] leading-tight">
          This is more than a brand. This is a movement of good people, building
          good things, with good intent.
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
              <div className="font-bold text-primary">
                Sumedha NR
              </div>
              <div className="text-primary text-xs font-medium">Founder & CEO</div>
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
              <div className="font-bold text-primary">
                Boomika T.S
              </div>
              <div className="text-primary text-xs font-medium">
                Co-Founder & Managing Director
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Images */}
      <div className="md:w-1/2">
        {/* Pink blob shape behind (you can use an SVG or bg image) */}
        <div className="relative flex items-center justify-center min-h-[540px] w-[420px] mx-[10rem]">
          {/* Pink Paint Blob */}
          <img
            src={path}
            alt=""
            className="absolute -left-14 top-[280px] w-[400px] h-[220px] z-0 select-none pointer-events-none"
            draggable={false}
          />

          {/* Top Oval - Background */}
          <div className="absolute -left-10 top-0 w-[250px] h-[370px] rounded-[50%/40%] overflow-hidden z-10 shadow-md border-4 border-white">
            <img
              src={background}
              alt=""
              className="object-cover w-full h-full"
              draggable={false}
            />
          </div>

          {/* Main Oval - People */}
          <div className="absolute left-0 top-[85px] w-[250px] h-[410px] rounded-[50%/40%] overflow-hidden z-20 border-4 border-white shadow-xl bg-white">
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
  );
}
