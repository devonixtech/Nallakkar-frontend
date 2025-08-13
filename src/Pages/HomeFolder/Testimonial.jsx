import testimonial from "../../assets/Testimonial.png";
import avtar from "../../assets/avtar.png";
import dotted from "../../assets/dotted.png";

const TestimonialSection = () => {
  return (
    <section className="relative font-montserrat flex flex-col h-[500px] items-center justify-center bg-[#efefef] overflow-hidden">
      {/* giant faded 'Testimonial' background */}
      <img
        src={testimonial}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
      />
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="relative z-10 text-2xl font-bold text-center mb-28 text-black">
          What People Says
        </h2>

        {/* Card wrapper (to center and control width) */}
        <div className="relative z-10 mx-auto mt-8 w-full max-w-3xl">
          {/* dotted square decor on right */}
          <img
            src={dotted}
            alt=""
            aria-hidden="true"
            className="absolute -right-6 -top-6 hidden h-24 w-24 md:block"
          />

          {/* Card */}
          <div className="relative mx-auto rounded-xl bg-white pb-[3rem] pt-[2rem] shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
            {/* avatar */}
            <div className="absolute -top-12 left-1/2 z-10 -translate-x-1/2">
              <img
                src={avtar}
                alt="Customer avatar"
                className="h-24 w-24 rounded-full border-4 border-white shadow-md object-cover"
              />
            </div>

            {/* opening quote */}
            <span className="absolute left-6 top-6 text-4xl text-primary select-none">
              &quot;
            </span>

            {/* closing quote */}
            <span className="absolute bottom-3 right-6 text-4xl text-primary select-none">
              &quot;
            </span>

            {/* Name + badge */}
            <p className="mt-4 text-center text-[15px] font-semibold text-gray-800">
              — Priya S. <span className="font-bold">Verified Buyer</span>
            </p>

            {/* Review text */}
            <p className="mx-auto mt-3 max-w-2xl text-center text-[16px] leading-7 text-[#414141]">
              I absolutely adore my new dress! The fit is perfect, and the
              fabric feels so luxurious. I received so many compliments when I
              wore it. Definitely my new favorite go-to for special occasions!
            </p>

            {/* small underline accent (as in screenshot) */}
            <div className="pointer-events-none mx-auto mt-4 h-[2px] w-32 bg-[#D9D9D9]" />
          </div>

          {/* dots/pagination under card */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F06292]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E0E0E0]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
