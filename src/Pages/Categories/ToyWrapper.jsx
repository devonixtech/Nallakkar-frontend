import React from "react";
import MobileKids from "./MobileKids";
import Toys from "./Toys";

const ToyWrapper = () => {
  return (
    <div>
      <div className="hidden md:block">
        <Toys></Toys>
      </div>
      <div className="block md:hidden">
        <MobileKids></MobileKids>
      </div>
    </div>
  );
};

export default ToyWrapper;
