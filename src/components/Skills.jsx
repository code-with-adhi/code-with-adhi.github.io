// src/components/Skills.jsx
import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import SkillTooltip from "./SkillTooltip.jsx";

function Skills() {
  const [groupedSkills, setGroupedSkills] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [pinnedSkill, setPinnedSkill] = useState(null);

  // The active skill is whichever one is pinned, or if none is pinned, the one being hovered.
  const activeSkill = pinnedSkill || hoveredSkill;

  useEffect(() => {
    // This effect handles clicking anywhere on the page to close a pinned tooltip.
    const handleOutsideClick = (event) => {
      // If a skill is pinned and the user clicks outside of the skill item or the tooltip itself...
      if (
        pinnedSkill &&
        !event.target.closest(".skill-item-wrapper, .skill-tooltip-content")
      ) {
        setPinnedSkill(null); // ...then unpin it.
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [pinnedSkill]); // This effect re-runs if the pinnedSkill changes.

  useEffect(() => {
    const query = `*[_type == "skill"] | order(order asc){
      name,
      category,
      icon{ asset->{ url } },
      proficiency,
      relatedProjects[]->{ title, "slug": slug.current }
    }`;

    sanityClient.fetch(query).then((skills) => {
      const groups = skills.reduce((acc, skill) => {
        (acc[skill.category] = acc[skill.category] || []).push(skill);
        return acc;
      }, {});
      setGroupedSkills(groups);
    });
  }, []);

  // --- Event Handlers for Hover and Click ---

  const handleMouseEnter = (skill) => {
    // Only show the tooltip on hover if no skill is currently pinned.
    if (!pinnedSkill) {
      setHoveredSkill(skill);
    }
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
  };

  const handleClick = (skill) => {
    // If the clicked skill is already pinned, unpin it.
    if (pinnedSkill?.name === skill.name) {
      setPinnedSkill(null);
    } else {
      // Otherwise, pin the new skill and clear any hover effects.
      setPinnedSkill(skill);
      setHoveredSkill(null);
    }
  };

  const categoryTitles = {
    languages: "Programming Languages",
    frameworks: "Frameworks & Libraries",
    databases: "Databases",
    tools: "Tools & Platforms",
  };

  if (!groupedSkills) return <div>Loading skills...</div>;

  return (
    <section id="skills">
      <h2>My Skills</h2>
      <div className="skills-container">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category} className="skill-category">
            <h3>{categoryTitles[category] || category}</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-item-wrapper"
                  onMouseEnter={() => handleMouseEnter(skill)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(skill)}
                >
                  <div
                    className={`skill-item ${
                      activeSkill?.name === skill.name ? "active" : ""
                    }`}
                  >
                    {skill.icon && (
                      <img src={skill.icon.asset.url} alt={skill.name} />
                    )}
                    <p>{skill.name}</p>
                  </div>

                  {/* The tooltip now appears if a skill is active (either pinned or hovered) */}
                  {activeSkill?.name === skill.name && (
                    <SkillTooltip
                      skill={skill}
                      onClose={() => setPinnedSkill(null)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
