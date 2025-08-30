// src/pages/AboutPage.jsx
import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";

// Import shared components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn.jsx";
import SocialLinks from "../components/SocialLinks";

function AboutPage() {
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    // Updated query to fetch proficiency
    const query = `*[_type == "skill"] | order(name asc){
    name,
    icon{ asset->{ url } },
    proficiency
  }`;

    sanityClient
      .fetch(query)
      .then((data) => setSkills(data))
      .catch(console.error);
  }, []);

  return (
    <>
      <main className="about-page">
        {/* Add this wrapper div to control the page size */}
        <div className="main-content">
          <Navbar />
          <FadeIn>
            <section>
              <div className="profile-header">
                <img src="/assets/dp.jpeg" alt="Adhithya" />
                <h1>Adhithya</h1>
              </div>
              <div className="about-content">
                <p>
                  Hello, I'm Adhi. I'm a student pursuing my Bachelor of
                  Technology degree in Artificial Intelligence and Data Science
                  at Panimalar Engineering College Chennai City Campus.
                </p>
                <p>
                  I have a strong foundation in machine learning, data analysis,
                  and cloud computing. In addition to my expertise in AI and
                  data science, I am currently expanding my skills in full-stack
                  development, working with frontend and backend technologies to
                  build web applications.
                </p>
                <p>
                  In addition to my technical skills, I enjoy solving coding
                  challenges on platforms like Codewars and HackerRank to
                  sharpen my problem-solving abilities and explore new
                  algorithms.
                </p>

                <div className="skills-section">
                  <h3>My skill set includes:</h3>
                  <div className="skills-about-list">
                    {!skills ? (
                      <p>Loading skills...</p>
                    ) : (
                      skills.map((skill, index) => (
                        <div key={index} className="skill-item-about">
                          {skill.icon && (
                            <img src={skill.icon.asset.url} alt={skill.name} />
                          )}
                          <span>{skill.name}</span>
                          {/* Display proficiency */}
                          <span className="skill-proficiency">
                            ({skill.proficiency})
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
          <FadeIn>
            <section className="social-connect">
              <h2>Connect With Me</h2>
              <SocialLinks />
            </section>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AboutPage;
