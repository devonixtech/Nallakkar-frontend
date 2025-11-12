import React, { useState, useRef, useEffect } from "react";
import { FiShare2 } from "react-icons/fi";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";

const ShareButton = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const wrapperRef = useRef(null); // ✅ ref for the wrapper

  const productUrl = product?.id
    ? `${window.location.origin}/product/${product.id}`
    : window.location.href;

  const toggleMenu = () => setIsOpen(!isOpen);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(productUrl);
    setCopySuccess("Link copied!");
    setTimeout(() => setCopySuccess(""), 2000);
    setIsOpen(false); // close after copy
  };

  // ✅ Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      {/* Main Share Button */}
      <button className="flex items-center gap-2" onClick={toggleMenu}>
        <FiShare2 size={20} />
        <span className="hidden sm:block">Share</span>
      </button>

      {/* ✅ Fixed Dropdown Menu (mobile-friendly) */}
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 bg-white border rounded shadow-lg p-3 
          flex flex-col gap-2 z-10 w-48 sm:w-56"
        >
          <FacebookShareButton url={productUrl} quote={product?.name}>
            <div className="flex items-center gap-2 cursor-pointer">
              <FacebookIcon size={32} round />
              <span>Facebook</span>
            </div>
          </FacebookShareButton>

          <WhatsappShareButton url={productUrl} title={product?.name}>
            <div className="flex items-center gap-2 cursor-pointer">
              <WhatsappIcon size={32} round />
              <span>WhatsApp</span>
            </div>
          </WhatsappShareButton>

          <button
            onClick={copyToClipboard}
            className="border px-2 py-1 rounded text-sm flex items-center gap-2 hover:bg-gray-100"
          >
            Copy Link
          </button>

          {copySuccess && (
            <span className="text-green-500 text-sm">{copySuccess}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ShareButton;
