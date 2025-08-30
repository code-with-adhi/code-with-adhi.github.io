// src/components/FadeIn.jsx
import React from "react";
import { useInView } from "react-intersection-observer";

function FadeIn({ children }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.1, // Trigger when 10% of the component is visible
  });

  return (
    <div ref={ref} className={`fade-in-section ${inView ? "is-visible" : ""}`}>
      {children}
    </div>
  );
}

export default FadeIn;
