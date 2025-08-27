import React from "react";
import MobileKids from "./MobileKids";
import HomeDecor from "./HomeDecor";

const HomeDecorWrapper = () => {
  return (
    <div>
      <div className="hidden md:block">
        <HomeDecor></HomeDecor>
      </div>
      <div className="block md:hidden">
        <MobileKids></MobileKids>
      </div>
    </div>
  );
};

export default HomeDecorWrapper;
