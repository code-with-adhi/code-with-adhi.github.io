// src/components/SocialLinks.jsx
import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";

function SocialLinks() {
  const [socialLinks, setSocialLinks] = useState(null);

  useEffect(() => {
    // Update the query to fetch the new icon field
    const query = `*[_type == "socialLink"]{
      platform,
      url,
      icon{
        asset->{
          url
        }
      }
    }`;
    sanityClient.fetch(query).then((data) => setSocialLinks(data));
  }, []);

  const getIconClass = (platform) => {
    switch (platform.toLowerCase()) {
      case "github":
        return "fab fa-github";
      case "linkedin":
        return "fab fa-linkedin";
      case "instagram":
        return "fab fa-instagram";
      case "twitter":
        return "fab fa-twitter";
      default:
        return "fas fa-link";
    }
  };

  if (!socialLinks) return null;

  return (
    <div className="social-links-grid">
      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link-card"
        >
          {/* Conditionally render the custom icon or the Font Awesome icon */}
          {link.icon ? (
            <img
              src={link.icon.asset.url}
              alt={link.platform}
              className="custom-social-icon-large"
            />
          ) : (
            <i className={getIconClass(link.platform)}></i>
          )}
          <span>{link.platform}</span>
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
