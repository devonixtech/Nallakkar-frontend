import {
  FaFacebookF,
  FaXTwitter,
  FaWhatsapp,
  FaInstagram,
  FaRegEnvelope,
} from "react-icons/fa6";
import { GoLocation } from "react-icons/go";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import logo from "../../assets/whitelogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const hoverClasses =
    "hover:text-rose hover:underline transition-colors duration-200";

  return (
    <footer className="bg-[#151a3e] text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:justify-between gap-8">
        {/* Left: Logo and Description */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="Nallakkar" className="ml-[-14px]" />
          </div>
          <p className="mb-4 text-xs font-light leading-relaxed">
            At Nallakkar, we create original, quality products with cultural
            authenticity, designed in-house to meet your modern needs. We're
            more than a brand; we're "good people" building good things with
            good intent, dedicated to elevating your everyday moments.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3 text-lg">
            <a href="#" aria-label="Facebook" className={hoverClasses}>
              <FaFacebookF />
            </a>
            <a href="#" aria-label="X" className={hoverClasses}>
              <FaXTwitter />
            </a>
            <a href="#" aria-label="WhatsApp" className={hoverClasses}>
              <FaWhatsapp />
            </a>
            <a href="#" aria-label="Instagram" className={hoverClasses}>
              <FaInstagram />
            </a>
            <a href="#" aria-label="Email" className={hoverClasses}>
              <FaRegEnvelope />
            </a>
          </div>
        </div>

        {/* Middle Columns */}
        {/* Middle & Right Columns */}
        <div className="w-full md:flex md:flex-row md:gap-20">
          {/* Mobile Grid, Desktop Flex */}
          <div className="grid grid-cols-2 gap-8 md:flex md:flex-row md:gap-20 w-full">
            {/* ABOUT */}
            <div>
              <div className="font-semibold mb-3 text-base">ABOUT</div>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className={hoverClasses}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to={"ContactSection"} className={hoverClasses}>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a href="#" className={hoverClasses}>
                    Nallakkar Stories
                  </a>
                </li>
              </ul>
            </div>

            {/* HELP */}
            <div>
              <div className="font-semibold mb-3 text-base">HELP</div>
              <ul className="space-y-2">
                <li>
                  <Link to={"/PaymentSecurity"} className={hoverClasses}>
                    Payments
                  </Link>
                </li>
                <li>
                  <Link to={"/ShippingPolicy"} className={hoverClasses}>
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link to={"/TermsAndConditions"} className={hoverClasses}>
                    Cancellation & Returns
                  </Link>
                </li>
                <li>
                  <Link to={"/FAQSection"} className={hoverClasses}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* PRODUCT DETAILS */}
            <div>
              <div className="font-semibold mb-3 text-base text-nowrap">
                Product Details
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className={hoverClasses}>
                    Kids
                  </a>
                </li>
                <li>
                  <a href="#" className={hoverClasses}>
                    Women
                  </a>
                </li>
                <li>
                  <a href="#" className={hoverClasses}>
                    Toys
                  </a>
                </li>
                <li>
                  <a href="#" className={hoverClasses}>
                    Home Decors
                  </a>
                </li>
                <li>
                  <a href="#" className={hoverClasses}>
                    Accessories
                  </a>
                </li>
              </ul>
            </div>

            {/* REACH US */}
            <div>
              <div className="font-semibold mb-3 text-base">Reach Us</div>
              <div className="mb-2 flex items-start gap-2">
                <GoLocation className="w-4 h-4 mt-1 flex-shrink-0 text-white" />
                <span className="text-xs leading-tight">
                  Flat No.: 1, Ward Number 8/5, Karyappa Badavane, Lingenahlli.,
                  Madhugiri, <br />
                  Tumakuru, Karnataka-572132.
                  <br />
                  Nearby Landmark: Assistant Executive Engineer Office.
                </span>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-white flex-shrink-0" />
                <span className="text-xs">+91-8884665337</span>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineMail className="w-4 h-4 text-white flex-shrink-0" />
                <span className="text-xs">support@nallakkar.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="border-t border-gray-500 py-4 px-6 flex justify-center">
        <div className="flex flex-wrap gap-6 text-xs text-gray-200 justify-center">
          <a href="#" className={hoverClasses}>
            Returns Policy
          </a>
          <a href="#" className={hoverClasses}>
            Privacy Policy
          </a>
          <a href="#" className={hoverClasses}>
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
