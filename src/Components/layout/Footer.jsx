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
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Footer = () => {
  const categories = useSelector((state) => state?.ctegory?.categories);
    const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategoryId") || null
  );


   const handleCategoryClick = (id) => {
    localStorage.setItem("selectedCategoryId", id);
    setSelectedCategory(id); // ✅ immediately update state
    window.dispatchEvent(new Event("storage")); // ✅ notify same tab
  };
    useEffect(() => {
      const handleStorageChange = () => {
        setSelectedCategory(localStorage.getItem("selectedCategoryId"));
      };
      window.addEventListener("storage", handleStorageChange);
  
      // ✅ Also check on mount in case it was updated in same tab
      setSelectedCategory(localStorage.getItem("selectedCategoryId"));
  
      return () => window.removeEventListener("storage", handleStorageChange);
    }, []);
  const hoverClasses =
    "hover:text-rose hover:underline transition-colors duration-200";
  const linkClass = (id) =>
    `${selectedCategory == id ? "text-darkpink font-bold" : ""}`;
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
            <a
              href="https://www.facebook.com/profile.php?id=61580089041886"
              aria-label="Facebook"
              className={hoverClasses}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/Nallakkar"
              aria-label="X"
              className={hoverClasses}
            >
              <FaXTwitter />
            </a>
            <a
              href="https://wa.me/message/XAW5HLMIHRG7M1"
              aria-label="WhatsApp"
              className={hoverClasses}
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/nallakkar_official/"
              aria-label="Instagram"
              className={hoverClasses}
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:connect@nallakkar.com"
              aria-label="Email"
              className={hoverClasses}
            >
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
                {/* <li>
                  <a href="#" className={hoverClasses}>
                    Nallakkar Stories
                  </a>
                </li> */}
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
              <div className="space-y-2 flex flex-col">
                {categories?.map((cat) => (
                  <Link
                    to="/category/kids"
                    key={cat.id}
                    className={linkClass(cat.id)}
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
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
          <Link to="/returnPolicy" className={hoverClasses}>
            Returns Policy
          </Link>
          <Link to="/privacyPolicy" className={hoverClasses}>
            Privacy Policy
          </Link>
          <Link to="/TermsAndConditions" className={hoverClasses}>
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
