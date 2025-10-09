import React from "react";
import Kids from "./Kids";
import MobileKids from "./MobileKids";

const KidsWrapper = () => {
  return (
    <div>
      <div className="block">
        <Kids></Kids>
      </div>

      {/* I have removed this mobileKids added the changed component inside the KIDS -- more better approach */}
      {/* <div className="block md:hidden">
        <MobileKids></MobileKids>
      </div> */}
    </div>
  );
};

export default KidsWrapper;
