// src/components/ProjectCard.jsx
import React from "react";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <article className="project-card">
      <Link to={`/project/${project.slug}`}>
        {project.projectImage && (
          // Add this div wrapper around your image
          <div className="project-image-container">
            <img src={project.projectImage.asset.url} alt={project.title} />
          </div>
        )}
        <h3>{project.title}</h3>
        <p>{project.shortDescription}</p>
      </Link>
    </article>
  );
}

export default ProjectCard;
