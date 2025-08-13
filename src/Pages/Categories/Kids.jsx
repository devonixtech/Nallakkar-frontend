import React from "react";
import TopSellingProducts from "../HomeFolder/TopSellingProducts";

const categories = [
  {
    name: "Girl",
    img:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Boy",
    img:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Infant",
    img:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Toys",
    img:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Accessories",
    img:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
  },
];

const Kids = () => {
  return (
    <>
      <div className="px-4 pt-11 bg-white">
        <div
          className=" flex 
        md:flex-wrap md:justify-center
        gap-x-20 lg:gap-x-6 gap-y-6 sm:gap-y-8 mt-6
        overflow-x-auto md:overflow-x-visible
        no-scrollbar
        px-1"
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[150px] transition-transform duration-300 hover:scale-90"
            >
              <div className="w-[220px] h-[140px] rounded-[999px] overflow-hidden shadow-md">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <p className="mt-2 text-sm font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
      <TopSellingProducts />
    </>
  );
};

export default Kids;
