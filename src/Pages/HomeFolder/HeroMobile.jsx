// // src/components/HeroMobile.jsx
// import React from "react";
// import modelImg from "../../assets/banner1.png"; // update with correct path

// export default function HeroMobile() {
//   return (
//     <section className="bg-white px-5 py-8">
//       {/* Heading */}
//       <h2 className="text-[28px] font-bold leading-tight text-left">
//         Your Next Look <br /> Starts Here
//       </h2>

//       {/* Brand Name */}
//       <h3 className="text-[28px] font-bold text-[#EC3557] mt-2 text-left">
//         NALLAKKAR
//       </h3>

//       {/* Paragraph */}
//       <p className="text-[16px] text-black font-medium mt-4 leading-snug text-left">
//         Step into the world of NALLAKKAR – where tradition meets modern
//         elegance. From timeless weaves to bold essentials, discover your
//         next signature look.
//       </p>

//       {/* Button */}
//       <button className="mt-6 px-6 py-3 bg-[#1a214c] text-white font-semibold text-sm hover:bg-[#EC3557] transition text-left">
//         SHOP NOW
//       </button>

//       {/* Model Image */}
//       <div className="mt-6">
//         <img
//           src={modelImg}
//           alt="Model"
//           className="w-full h-auto object-contain"
//         />
//       </div>
//     </section>
//   );
// }

// src/components/HeroMobile.jsx
import React from "react";
import modelImg from "../../assets/banner1.png";
import mobileMenu from "../../assets/mobileMenu.jpg";

export default function HeroMobile() {
  return (
    <section className="bg-white px-5">
      {/* Heading */}
      <img src={mobileMenu} alt="" />
    </section>
  );
}
