import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../Redux/slices/bannerSlice";

const FashionMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const { banners } = useSelector((state) => state.banners);

  return (
    <div className="bg-white px-2">
      <div className="grid grid-cols-2 gap-2">

        {/* LEFT BIG IMAGE */}
        <div
          className="col-span-2 h-[320px] relative bg-cover bg-center"
          style={{ backgroundImage: `url(${banners?.[1]?.images || ""})` }}
        >
        </div>

        {/* RIGHT TOP - 1 */}
        <div
          className="h-[150px] relative bg-cover bg-center"
          style={{ backgroundImage: `url(${banners?.[2]?.images || ""})` }}
        >
          <button
            onClick={() => navigate("/category/kids")}
            className="absolute bottom-2 right-2 bg-white text-black text-xs px-3 py-1 font-semibold"
          >
            SHOP NOW
          </button>
        </div>

        {/* RIGHT TOP - 2 */}
        <div
          className="h-[150px] relative bg-cover bg-center"
          style={{ backgroundImage: `url(${banners?.[3]?.images || ""})` }}
        >
          <button
            onClick={() => navigate("/category/kids")}
            className="absolute bottom-2 right-2 bg-white text-black text-xs px-3 py-1 font-semibold"
          >
            SHOP NOW
          </button>
        </div>

        {/* RIGHT BOTTOM */}
        <div
          className="col-span-2 h-[180px] relative bg-cover bg-center"
          style={{ backgroundImage: `url(${banners?.[4]?.images || ""})` }}
        >
        </div>

      </div>
    </div>
  );
};

export default FashionMobile;
