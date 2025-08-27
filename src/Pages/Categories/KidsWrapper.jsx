import React from "react";
import Kids from "./Kids";
import MobileKids from "./MobileKids";

const KidsWrapper = () => {
  return (
    <div>
      <div className="hidden md:block">
        <Kids></Kids>
      </div>
      <div className="block md:hidden">
        <MobileKids></MobileKids>
      </div>
    </div>
  );
};

export default KidsWrapper;
