// import banner1 from "../../assets/Group 328.png";
// import blackgirl from "../../assets/fashionale.png";
// import couple from "../../assets/couple.png";
// import mainImage from "../../assets/sunglasses.png"; // Image with three children
// import backgroundImage from "../../assets/Rectangle.png"; // Grayish background rectangle
// import playfulText from "../../assets/Playful.png"; // "Playful" text graphic
// import fashionText from "../../assets/FASHION.png"; // "FASHION" text graphic

// const images = {
//   main: banner1,
//   women: blackgirl,
//   couple: couple,
// };

// export default function FashionLayout() {
//   return (
//     <div className="flex flex-wrap overflow-x-hidden">
//       {/* Left main block */}
//       <div
//         className="w-full md:w-1/2 relative flex items-center justify-center p-3 md:p-8"
//         style={{ height: "553px" }}
//       >
//         <img
//           src={images.main}
//           alt="Main Fashion"
//           className="absolute right-0 bottom-0 w-full h-full object-cover"
//           style={{ zIndex: 1 }}
//         />
//         {/* Mobile overlay title to keep message visible on tall/skinny phones */}
//         <div className="absolute inset-x-0 bottom-3 md:hidden px-4">
//           <div className="bg-white/80 backdrop-blur-sm text-gray-900 inline-block px-3 py-1 rounded">
//             New Fashion
//           </div>
//         </div>
//       </div>

//       {/* Right blocks grid */}
//       <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-4 pl-0 md:pl-4">
//         <div className="flex flex-col md:flex-row gap-3 md:gap-1">
//           {/* Women Trendy */}
//           <div className="bg-black relative flex-1 overflow-hidden shadow">
//             <img
//               src={images.women}
//               alt="Women Trendy"
//               className="object-cover w-full h-44 sm:h-56 md:h-72 opacity-100"
//             />
//             {/* Text Content */}
//             <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-20 leading-tight mt-6 sm:mt-10 md:mt-16">
//               <h2 className="text-white font-normal text-lg sm:text-xl">
//                 Women <br />
//                 <span className="text-white text-2xl sm:text-3xl font-semibold">
//                   Trendy
//                 </span>
//               </h2>
//               <button className="mt-3 sm:mt-4 py-1.5 px-4 bg-white text-black text-xs sm:text-sm md:text-base font-semibold w-fit tracking-wide">
//                 SHOP NOW
//               </button>
//             </div>
//             {/* Vertical Side Text */}
//             <div className="absolute top-1/2 right-1 md:right-0 -translate-y-1/2 text-[10px] sm:text-xs md:text-sm text-gray-300 rotate-90 tracking-widest">
//               fashion choices
//             </div>
//           </div>

//           {/* Find your Style */}
//           <div className="bg-gray-800 relative flex-1 overflow-hidden shadow">
//             <img
//               src={images.couple}
//               alt="Find your Style"
//               className="object-cover w-full h-44 sm:h-56 md:h-72 opacity-100"
//             />
//             <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 md:px-10">
//               <h2 className="text-white font-bold text-xl sm:text-2xl md:text-2xl leading-tight">
//                 Find your <br />
//                 <span className="text-white">style</span>
//               </h2>
//               <button className="mt-3 sm:mt-4 py-1.5 px-4 bg-white text-black text-xs sm:text-sm md:text-base font-semibold w-fit tracking-wide">
//                 SHOP NOW
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-3 md:gap-4 items-stretch">
//           <div
//             className="w-full flex items-center justify-center"
//             style={{
//               backgroundImage: `url(${backgroundImage})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               height: "248px",
//             }}
//           >
//             {/* Stack on very small screens, split 50/50 from sm up */}
//             <div className="w-full sm:w-1/2 h-full flex items-center justify-center px-4 sm:px-0">
//               <img
//                 src={mainImage}
//                 alt="Children in playful fashion"
//                 className="h-[80%] sm:h-full w-auto object-contain"
//               />
//             </div>

//             {/* Right side: Text and button */}
//             <div className="w-full sm:w-1/2 flex flex-col items-start justify-center px-6 sm:px-8 mt-2 sm:mt-0">
//               <img
//                 src={playfulText}
//                 alt="Playful"
//                 className="h-12 sm:h-16 object-contain"
//               />
//               <img
//                 src={fashionText}
//                 alt="FASHION"
//                 className="h-10 sm:h-12 object-contain sm:ml-14 -mt-3 sm:-mt-6"
//               />
//               <button className="bg-black text-white px-3 py-1 sm:ml-32 mt-2 font-semibold hover:bg-gray-800 transition">
//                 SHOP NOW
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import banner1 from "../../assets/Group 328.png";
import blackgirl from "../../assets/fashionale.png";
import couple from "../../assets/couple.png";
import mainImage from "../../assets/sunglasses.png"; // Image with three children
import backgroundImage from "../../assets/Rectangle.png"; // Grayish background rectangle
import playfulText from "../../assets/Playful.png"; // "Playful" text graphic
import fashionText from "../../assets/FASHION.png"; // "FASHION" text graphic

const images = {
  main: banner1,
  women: blackgirl,
  couple: couple,
};

export default function FashionLayout() {
  return (
    <div className="flex flex-wrap overflow-x-hidden">
      {/* Left main block (desktop unchanged) */}
      <div
        className="w-full md:w-1/2 relative flex items-center justify-center p-3 md:p-8"
        style={{ height: "553px" }}
      >
        <img
          src={images.main}
          alt="Main Fashion"
          className="absolute right-0 bottom-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
        />
        {/* Mobile overlay title */}
        <div className="absolute inset-x-0 bottom-3 md:hidden px-4">
          <div className="bg-white/80 backdrop-blur-sm text-gray-900 inline-block px-3 py-1 rounded">
            New Fashion
          </div>
        </div>
      </div>

      {/* Right blocks grid (desktop unchanged) */}
      <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-4 pl-0 md:pl-4">
        {/* Middle two cards: side-by-side on mobile and desktop */}
        <div className="flex flex-row gap-3 md:gap-1 mt-3 md:mt-0">
          {/* Women Trendy */}
          <div className="bg-black relative w-1/2 md:flex-1 overflow-hidden shadow">
            <img
              src={images.women}
              alt="Women Trendy"
              className="object-cover w-full h-44 sm:h-56 md:h-72 opacity-100"
            />
            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-10 md:px-20 leading-tight mt-4 sm:mt-8 md:mt-16">
              <h2 className="text-white font-normal text-sm sm:text-xl">
                Women <br />
                <span className="text-white text-xl sm:text-3xl font-semibold">
                  Trendy
                </span>
              </h2>
              <button className="mt-2 sm:mt-4 py-1.5 px-4 bg-white text-black text-xs sm:text-sm md:text-base font-semibold w-fit tracking-wide">
                SHOP NOW
              </button>
            </div>
            {/* Vertical Side Text */}
            <div className="absolute top-1/2 right-1 md:right-0 -translate-y-1/2 text-[10px] sm:text-xs md:text-sm text-gray-300 rotate-90 tracking-widest">
              fashion choices
            </div>
          </div>

          {/* Find your Style */}
          <div className="bg-gray-800 relative w-1/2 md:flex-1 overflow-hidden shadow">
            <img
              src={images.couple}
              alt="Find your Style"
              className="object-cover w-full h-44 sm:h-56 md:h-72 opacity-100"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-12 md:px-10">
              <h2 className="text-white font-bold text-lg sm:text-2xl md:text-2xl leading-tight">
                Find your <br />
                <span className="text-white">style</span>
              </h2>
              <button className="mt-2 sm:mt-4 py-1.5 px-4 bg-white text-black text-xs sm:text-sm md:text-base font-semibold w-fit tracking-wide">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>

        {/* Bottom banner section: unchanged same as desktop (same height/width) */}
        <div className="hidden md:flex gap-3 md:gap-4 items-stretch">
          <div
            className="w-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "248px",
            }}
          >
            {/* Left: Image */}
            <div className="w-full sm:w-1/2 h-full flex items-center justify-center px-4 sm:px-0">
              <img
                src={mainImage}
                alt="Children in playful fashion"
                className="h-[80%] sm:h-full w-auto object-contain"
              />
            </div>

            {/* Right: Text and button */}
            <div className="w-full sm:w-1/2 flex flex-col items-start justify-center px-6 sm:px-8 mt-2 sm:mt-0">
              <img
                src={playfulText}
                alt="Playful"
                className="h-12 sm:h-16 object-contain"
              />
              <img
                src={fashionText}
                alt="FASHION"
                className="h-10 sm:h-12 object-contain sm:ml-14 -mt-3 sm:-mt-6"
              />
              <button className="bg-black text-white px-3 py-1 sm:ml-32 mt-2 font-semibold hover:bg-gray-800 transition">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
