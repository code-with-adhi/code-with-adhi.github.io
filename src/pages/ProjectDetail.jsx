// src/pages/ProjectDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import sanityClient from "../client.js";
import { PortableText } from "@portabletext/react";

function ProjectDetail() {
  const [project, setProject] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    // This GROQ query is now updated to fetch the referenced skills
    const query = `*[_type == "project" && slug.current == "${slug}"][0]{
      title,
      projectImage{
        asset->{
          url
        }
      },
      imageGallery[]{
        asset->{
          url
        }
      },
      shortDescription,
      longDescription,
      // --- THIS IS THE UPDATED PART ---
      skillsUsed[]->{
        name,
        icon{
          asset->{
            url
          }
        }
      },
      githubLink,
      liveLink
    }`;

    sanityClient
      .fetch(query)
      .then((data) => setProject(data))
      .catch(console.error);
  }, [slug]); // Re-run the effect if the slug changes

  if (!project) {
    return <div>Loading project details...</div>;
  }

  return (
    <article className="project-detail">
      <header>
        <div className="detail-header">
          <Link to="/" className="back-button">
            <i className="fas fa-arrow-left"></i> Back
          </Link>
          <h1>{project.title}</h1>
        </div>
        <p>{project.shortDescription}</p>
        <div className="project-links">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary" // New class
            >
              <i className="fab fa-github"></i> GitHub Repo
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary" // New class
            >
              <i className="fas fa-external-link-alt"></i> Live Site
            </a>
          )}
        </div>
      </header>

      <img
        src={project.projectImage.asset.url}
        alt={project.title}
        className="main-image"
      />

      <div className="project-content">
        <h2>About The Project</h2>
        <PortableText value={project.longDescription} />

        {/* --- THIS IS THE UPDATED DISPLAY LOGIC --- */}
        {project.skillsUsed && project.skillsUsed.length > 0 && (
          <div className="project-skills">
            <h2>Skills Used</h2>
            <div className="skills-list">
              {project.skillsUsed.map((skill) => (
                <div key={skill.name} className="skill-tag">
                  {skill.icon && (
                    <img src={skill.icon.asset.url} alt={skill.name} />
                  )}
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {project.imageGallery && (
          <>
            <h2>Gallery</h2>
            <div className="gallery">
              {project.imageGallery.map((image, index) => (
                <img
                  key={index}
                  src={image.asset.url}
                  alt={`Project gallery image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export default ProjectDetail;
