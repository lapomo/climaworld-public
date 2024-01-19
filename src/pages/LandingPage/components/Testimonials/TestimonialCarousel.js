import React from "react";
import TestimonialItem from "./TestimonialItem";
import { Carousel } from "react-bootstrap";

export default function TestimonialCarousel({items}) {
  return (
    <Carousel interval={10000} style={{ height: "392px" }}>
      {items.map((item, index) => {
        return <Carousel.Item key={index}><TestimonialItem carousel testimonial={item}/></Carousel.Item>;
      })}
    </Carousel>
  );
}
