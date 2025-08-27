import Kids from "./Kids";
import MobileKids from "./MobileKids";
import MobileWomen from "./MobileWomen";
import Women from "./Women";

const WomenWrapper = () => {
  return (
    <div>
      <div className="hidden md:block">
        <Women></Women>
      </div>
      <div className="block md:hidden">
        <MobileWomen></MobileWomen>
      </div>
    </div>
  );
};

export default WomenWrapper;
