import React from "react";
import create from "../../assets/createUnique.png";
import patience from "../../assets/patience (1).png";
import assurance from "../../assets/assurance.png";
import fastDevliry from "../../assets/fast-delivery.png";

const featuresBar = [
  {
    title: "Fast Shipping",
    body:
      "Get your order fast with our lightning‑quick shipping! We're committed to getting your items to you as soon as possible.",
    icon: fastDevliry,
  },
  {
    title: "Create Unique",
    body:
      "Uncover unique treasures and experiences tailored just for you. We're here to help you find what you truly love.",
    icon: create,
  },
  {
    title: "Flexibility And Patience",
    body:
      "Your needs come first. We offer flexible solutions and the patience to ensure you're always satisfied.",
    icon: patience,
  },
  {
    title: "Quality And Security",
    body:
      "Experience peace of mind with our unwavering commitment to top‑tier quality and ironclad security.",
    icon: assurance,
  },
];

export default function Features() {
  return (
    <section className="w-full bg-white">
      {/* Subtle pattern background (optional) */}
      <div className="relative">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuresBar.map((f, idx) => (
              <article key={idx} className="flex items-start gap-4">
                {/* Icon in small rounded badge */}
                <div className="shrink-0">
                  <div className="h-8 w-8 rounded-full border border-gray-200 bg-white shadow-md grid place-items-center">
                    <img
                      src={f.icon}
                      alt=""
                      className="h-5 w-5 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Texts */}
                <div className="space-y-1">
                  <h3 className="text-[21px] font-bold tracking-tight text-primary text-nowrap">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-5 text-[#17171A">{f.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
