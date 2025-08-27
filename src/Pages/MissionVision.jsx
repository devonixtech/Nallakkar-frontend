// import React from "react";
// import bussiness from "../assets/businessman.jpg";
// import bulb from "../assets/svg/vision.svg";
// import mission from "../assets/svg/mission-statement.svg";

// // You can replace these with actual icon components or SVGs if you prefer
// const VisionIcon = () => (
//   <img src={bulb} alt="Vision Icon" className="w-16 h-16" />
// );

// const MissionIcon = () => (
//   <img src={mission} alt="Mission Icon" className="w-16 h-16" />
// );

// const MissionVision = () => {
//   return (
//     <>
//       <div
//         className="relative py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
//         style={{ backgroundImage: `url(${bussiness})` }}
//       >
//         {/* Overlay for better text readability */}
//         <div className="absolute inset-0 bg-primary opacity-90"></div>

//         <div className="relative max-w-7xl mx-auto">
//           <h2 className="text-3xl font-extrabold text-center text-white sm:text-4xl mb-16">
//             Our mission and vision statement
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
//             {/* Vision Card */}
//             <div className="relative bg-white rounded-2xl shadow-xl p-8 pt-16">
//               <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
//                 <VisionIcon />
//               </div>
//               <p className="text-center text-gray-600">
//                 Our vision is to build Nallakkar into a widely recognized and
//                 respected brand in India and beyond. Over the years, we aim to
//                 expand across categories, ensuring that Nallakkar is a name
//                 people choose with confidence, no matter what they buy.
//               </p>
//             </div>

//             {/* Mission Card */}
//             <div className="relative bg-white rounded-2xl shadow-xl p-8 pt-16">
//               <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
//                 <MissionIcon />
//               </div>
//               <p className="text-center text-gray-600">
//                 Our mission is to create and deliver quality products under the
//                 Nallakkar brand, with a focus on trust, originality, and
//                 customer satisfaction. We want every product carrying the
//                 Nallakkar name to stand for reliability and value.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MissionVision;

import React from "react";
import bussiness from "../assets/businessman.jpg";
import bulb from "../assets/svg/vision.svg";
import mission from "../assets/svg/mission-statement.svg";

const VisionIcon = () => (
  <img src={bulb} alt="Vision Icon" className="w-10 h-10" />
);

const MissionIcon = () => (
  <img src={mission} alt="Mission Icon" className="w-10 h-10" />
);

const MissionVision = () => {
  return (
    <div
      className="relative py-14 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${bussiness})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#233a4a] opacity-90"></div>

      <div className="relative max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-left text-white sm:text-4xl mb-24">
          Our mission and vision statement
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
          {/* Vision Card */}
          <div className="relative bg-white rounded-[40px] shadow-md p-8 pt-14 max-w-lg mx-auto">
            {/* Icon Circle */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-md">
              <VisionIcon />
            </div>
            <p className="text-center text-gray-950 text-base leading-relaxed">
              Our vision is to build Nallakkar into a widely recognized and
              respected brand in India and beyond. Over the years, we aim to
              expand across categories, ensuring that Nallakkar is a name people
              choose with confidence, no matter what they buy.
            </p>
          </div>

          {/* Mission Card */}
          <div className="relative bg-white rounded-[40px] shadow-md p-8 pt-14 max-w-lg mx-auto">
            {/* Icon Circle */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-md">
              <MissionIcon />
            </div>
            <p className="text-center text-gray-950 text-base leading-relaxed">
              Our mission is to create and deliver quality products under the
              Nallakkar brand, with a focus on trust, originality, and customer
              satisfaction. We want every product carrying the Nallakkar name to
              stand for reliability and value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
