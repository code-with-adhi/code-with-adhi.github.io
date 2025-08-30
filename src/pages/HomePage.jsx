// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";

// Import all the components
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import ProjectCard from "../components/ProjectCard";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FadeIn from "../components/Fadein";
import Certificates from "../components/Certificates";

// A component just for the project list
function ProjectsList() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const query = `*[_type == "project"]{
      title,
      "slug": slug.current,
      projectImage{ asset->{ url } },
      shortDescription
    }`;
    sanityClient.fetch(query).then((data) => setProjects(data));
  }, []);

  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {!projects ? (
          <p>Loading projects...</p>
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))
        )}
      </div>
    </section>
  );
}

// The main HomePage component that assembles everything
function HomePage() {
  return (
    // Add this wrapper div
    <div className="main-content">
      <Navbar />
      <FadeIn>
        <Hero />
      </FadeIn>
      <FadeIn>
        <Skills />
      </FadeIn>
      <FadeIn>
        <Certificates />
      </FadeIn>
      <FadeIn>
        <ProjectsList />
      </FadeIn>
      <FadeIn>
        <Contact />
      </FadeIn>
      <Footer />
    </div>
  );
}

export default HomePage;
