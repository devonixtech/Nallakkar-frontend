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
        <h3 className="text-lg md:text-xl font-semibold text-[#1a214c] mb-4">
          We’re Here to Help You
        </h3>
        <p className="text-sm md:text-base max-w-2xl mx-auto text-gray-700">
          We’d love to hear from you! Whether you have product questions or need
          help with an order from Nallakkar, our local team is dedicated to
          providing prompt assistance. Get in touch today.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-6">
        <ContactCard
          icon={map}
          text="Flat No:1, Ward Number 85, Kariyappa Badavane, Linganahalli - Madhugiri, Tumakuru, Karnataka-572132. Nearby Landmark: Assistant Executive Engineer Office."
          image={women}
        />
        <ContactCard icon={call} text="+91-8884665337" image={women} />
        <ContactCard icon={msg} text="contact@nallakkar.com" image={laptop} />
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

const ContactCard = ({ icon, text, image }) => (
  <div className="relative w-[300px] h-[170px] mx-auto">
    {/* Floating Icon */}
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-30 bg-white p-2 border-2 border-primary rounded-full shadow-md">
      <img src={icon} alt="Icon" className="w-7 h-7" />
    </div>

    {/* Card */}
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg z-10">
      {/* Background Image */}
      <img
        src={image}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Text Content */}
      <div className="relative z-20 flex items-center justify-center w-full h-full px-4 text-center">
        <p className="text-white font-semibold text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  </div>
);

export default ContactSection;
