// src/components/SkillTooltip.jsx
import React from "react";
import { Link } from "react-router-dom";

// Add onClose to the props
function SkillTooltip({ skill, onClose }) {
  if (!skill) return null;

  return (
    <div className="skill-tooltip-content">
      <div className="tooltip-header">
        {skill.icon && <img src={skill.icon.asset.url} alt={skill.name} />}
        <h3>{skill.name}</h3>
      </div>
      <div className="tooltip-body">
        <p>
          <strong>Proficiency:</strong> {skill.proficiency}
        </p>
        {skill.relatedProjects?.length > 0 && (
          <>
            <p>
              <strong>Used in Projects:</strong>
            </p>
            <ul>
              {skill.relatedProjects.map((project) => (
                <li key={project.slug}>
                  <Link to={`/project/${project.slug}`}>{project.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default SkillTooltip;
