import React, { useEffect, useState } from "react";
import { alex, marco, sophie } from "./pics";
import TestimonialItem from "./TestimonialItem";
import TestimonialCarousel from "./TestimonialCarousel";

export default function Testimonials() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 768;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  const testimonials = [
    {
      name: "Marco L.",
      pic: marco,
      text: "Ecological impact has never been easier! Giving a little bit to fight the consequences of climate change is very simple and the lottery makes it fun, too!",
    },
    {
      name: "Sophie W.",
      pic: sophie,
      text: "A very easy and fun way to help fight climate change. Finally something I can keep committed to.",
    },
    {
      name: "Alex B.",
      pic: alex,
      text: "There's no better way to make meaningful contributions to the fight against climate change than through Climaworld. Total transparency, fun prize draws & for the price of a coffee per month?! Win win!",
    },
  ];
  return (
    <div
      className="pt-5 pb-3 d-flex justify-content-center"
      style={{ backgroundColor: "var(--c-p2)" }}
    >
      <div className="w-100">
        <div className="fs-3 fw-bold text-center">
          What do our members think?
        </div>
        {width < breakpoint ? (
          <TestimonialCarousel items={testimonials} />
        ) : (
          <div className="mt-5 d-flex justify-content-center">
            {testimonials.map((testimonial, index) => {
              return <TestimonialItem key={index} index={index} testimonial={testimonial} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
