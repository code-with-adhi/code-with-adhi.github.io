import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section id="hero">
       <h1>Adhithya A</h1>
      <p className="hero-subtitle">Full Stack Developer</p>
      <p>
        I'm a student specializing in AI, Web Development & Data Science.
        Currently, I'm pursuing my degree in Artificial Inteligence and Data
        Science at Panimalar Engineering College Chennai City Campus.
      </p>
      <div className="cta-buttons">
        <Link to="/about" className="primary">
          About Me
        </Link>
      </div>
    </section>
  );
}

export default Hero;
