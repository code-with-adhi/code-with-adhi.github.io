// src/components/Footer.jsx
import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";

function Footer() {
  const [socialLinks, setSocialLinks] = useState(null);

  useEffect(() => {
    // This query now filters for specific platforms
    const query = `*[_type == "socialLink" && lower(platform) in ["github", "linkedin"]]{
      platform,
      url
    }`;
    sanityClient.fetch(query).then((data) => setSocialLinks(data));
  }, []);

  const getIconClass = (platform) => {
    switch (platform.toLowerCase()) {
      case "github":
        return "fab fa-github";
      case "linkedin":
        return "fab fa-linkedin";
      default:
        return "fas fa-envelop";
    }
  };

  return (
    <footer>
      <div className="social-links">
        {socialLinks &&
          socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={getIconClass(link.platform)}></i>
            </a>
          ))}
        {/* Add a hardcoded mailto link for your email */}
        <a href="mailto:adhithya688@gmail.com">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
      <p>&copy; 2025 Adhithya. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
