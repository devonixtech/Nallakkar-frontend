import React from "react";
import shoeImg from "../../assets/Rectangle 116.png"; // update path
import chairImg from "../../assets/Rectangle 119.png"; // update path

export default function PromoGrid() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <article className="relative isolate overflow-hidden bg-gray-50">
            <img
              src={shoeImg}
              alt="Minimalist Sneaker"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0" />

            <div className="relative z-10 px-8 py-10 md:px-12 md:py-12">
              <p className="text-[11px] tracking-wide uppercase">
                New arrivals
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
                Minimalist <br /> Sneaker
              </h2>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed">
                Stretch, fresh-cool help you always <br /> comfortable
              </p>
              <button className="mt-5 inline-flex items-center rounded-sm bg-rose px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-pink-700">
                Shop now
              </button>
            </div>
          </article>
          {/* Right tile - 50% Off for Autumn */}
          <article className="relative isolate overflow-hidden bg-gray-50">
            {/* Image */}
            <img
              src={chairImg}
              alt="Folded clothes on chair"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Soft gradient from left to improve text contrast */}
            <div className="absolute inset-0 " />
            {/* Content left aligned */}
            <div className="relative z-10 px-8 py-10 md:px-12 md:py-12">
              <p className="text-[11px] tracking-wide uppercase">
                Mega sale
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
                <span className="text-rose">50% </span>off
                <br />
                For Autumn
              </h2>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed">
                Stretch, fresh-cool help you always <br /> comfortable
              </p>
              <button className="mt-5 inline-flex items-center rounded-sm bg-rose px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-pink-700">
                Shop now
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
