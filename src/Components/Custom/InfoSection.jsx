// InfoSection.jsx
import React from "react";

const InfoSection = ({ imageSrc, alt, title }) => (
  <div className="relative rounded overflow-hidden w-full">
    <img
      src={imageSrc}
      alt={alt}
      className="w-full h-40 object-cover"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <h2 className="text-white text-xl font-bold drop-shadow text-center">
        {title}
      </h2>
    </div>
  </div>
);

export default InfoSection;
