import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import Contact from "../assets/contact.png";
import women from "../assets/woman-hand.png";
import laptop from "../assets/young-girwooden-table.png";
import smiling from "../assets/smilinggirl.png";
import smiling_girl from "../assets/smilingwomen.png";
import map from "../assets/map.png";
import call from "../assets/call.png";
import msg from "../assets/msg.png";

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7 text-black"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7 text-black"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7 text-black"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

// Card Data
const contactData = [
  {
    icon: <LocationIcon />,
    bgImage: women,
    content: (
      <>
        <p>Flat No.: 1, Ward Number 8/5, Karyappa</p>
        <p>Badavane, Lingenahalli, Madhugiri,</p>
        <p>Tumakuru, Karnataka-572132. Nearby</p>
        <p>Landmark: Assistant Executive Engineer</p>
        <p>Office.</p>
      </>
    ),
  },
  {
    icon: <PhoneIcon />,
    bgImage: laptop,
    content: <p className="text-xl font-semibold">+91-8884665337</p>,
  },
  {
    icon: <MailIcon />,
    bgImage: women,
    content: <p className="text-xl font-semibold">contact@nallakkar.com</p>,
  },
];

// Reusable Card Component
const ContactCard = ({ icon, bgImage, content }) => (
  <div className="relative w-[380px] h-[240px]">
    {/* Icon */}
    <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10 bg-primary p-1 rounded-full shadow-md">
      <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center">
        {icon}
      </div>
    </div>

    {/* Card Body */}
    <div
      className="relative w-full h-full rounded-2xl bg-cover bg-center overflow-hidden shadow-xl"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gray-800 bg-opacity-70"></div>
      <div className="relative h-full flex items-center justify-center text-white text-center p-4">
        <div className="leading-tight font-medium text-md">{content}</div>
      </div>
    </div>
  </div>
);

const ContactSection = () => {
  return (
    <section className="w-full bg-white">
      {/* Header Section */}
      <div
        className="relative h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${Contact})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <h2 className="text-white text-3xl md:text-4xl font-semibold z-10">
          Contact Us
        </h2>
      </div>

      {/* Help Text */}
      <div className="text-center px-6 py-10">
        <h3 className="text-2xl md:text-3xl font-bold text-[#1a214c] mb-4">
          We’re Here to Help You
        </h3>
        <p className=" md:text-base max-w-5xl mx-auto text-primary">
          We’d love to hear from you! Whether you have product questions or need
          help with an order from Nallakkar, our local team is dedicated to
          providing prompt assistance. Get in touch today.
        </p>
      </div>

      {/* Contact Cards */}
      <div className=" w-full flex items-center justify-center py-8 px-4">
        <div className="flex flex-wrap items-center justify-center gap-16 md:gap-8">
          {contactData.map((card, index) => (
            <ContactCard
              key={index}
              icon={card.icon}
              bgImage={card.bgImage}
              content={card.content}
            />
          ))}
        </div>
      </div>

      {/* Feedback Quote */}
      <div
        className="relative h-[180px] mt-10 bg-cover bg-center flex items-center justify-center text-white text-center text-lg font-medium px-4"
        style={{ backgroundImage: `url(${smiling_girl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <p className="z-10">
          “Your feedback is important to us — we’re always listening.”
        </p>
      </div>

      <section className="flex flex-col md:flex-row bg-white px-6 md:px-20 py-16 items-center justify-between font-montserrat">
        {/* Left: Image Section */}
        <div className="relative w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <div className="bg-[#1a214c] w-[280px] h-[400px] absolute top-14 left-5 z-0"></div>
          <img
            src={smiling} // Replace with actual path
            alt="Support"
            className="w-[400px] h-[550px] object-cover relative z-10"
          />
        </div>

        {/* Right: Contact Form */}
        <div className="w-full md:w-1/2 max-w-[500px]">
          <h2 className="text-2xl font-bold text-[#1a214c] mb-2">
            Get in Touch
          </h2>
          <p className="text-sm text-gray-700 mb-6">
            Feel free to reach out for any inquiries or support; our team is
            here to help you.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1a214c] mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Naveena"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1a214c]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a214c] mb-1">
                Mobile number
              </label>
              <input
                type="text"
                placeholder="6360--------"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1a214c]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a214c] mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="naveen@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1a214c]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a214c] mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Type Here..."
                className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#1a214c]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#1a214c] text-white px-8 py-2 rounded font-semibold hover:bg-[#141936]"
            >
              SEND
            </button>
          </form>
        </div>
      </section>
    </section>
  );
};

// const ContactCard = ({ icon, text, image }) => (
//   <div className="relative w-[300px] h-[170px] mx-auto">
//     {/* Floating Icon */}
//     <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-30 bg-white p-2 border-2 border-primary rounded-full shadow-md">
//       <img src={icon} alt="Icon" className="w-7 h-7" />
//     </div>

//     {/* Card */}
//     <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg z-10">
//       {/* Background Image */}
//       <img
//         src={image}
//         alt="Background"
//         className="absolute inset-0 w-full h-full object-cover"
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-primary bg-opacity-50"></div>

//       {/* Text Content */}
//       <div className="relative z-20 flex items-center justify-center w-full h-full px-4 text-center">
//         <p className="text-white font-semibold text-sm leading-relaxed">
//           {text}
//         </p>
//       </div>
//     </div>
//   </div>
// );

export default ContactSection;
