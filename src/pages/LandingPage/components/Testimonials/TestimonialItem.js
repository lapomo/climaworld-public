import React from "react";
import { Image } from "react-bootstrap";

export default function TestimonialItem({index, testimonial, carousel = false}) {
  return (
      <div className="d-flex justify-content-center">
        {index !== 0 && !carousel && <div className="my-5 border"></div>}
        <div
          className="py-5 p-3 d-flex flex-column align-items-center justify-content-between gap-3 text-center"
          style={{ maxWidth: "450px", backgroundColor: "var(--c-p2)" }}
        >
          <Image
            height={120}
            // width={60}
            src={testimonial.pic}
            // className="rounded-circle"
            style={{ borderRadius: "50% 50% 50% 50%" }}
          />
          <q>{testimonial.text}</q>
          <div className="fw-bold">{testimonial.name}</div>
        </div>
      </div>
  );
}
