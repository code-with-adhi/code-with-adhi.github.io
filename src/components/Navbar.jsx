// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <NavLink to="/" className="logo">
        <img src="/assets/logo.png" alt="Adhi portfolio logo" />
      </NavLink>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      {/* Add 'open' class when menu is active */}
      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/about" onClick={toggleMenu}>
            About
          </NavLink>
        </li>
        <li>
          <HashLink smooth to="/#skills" onClick={toggleMenu}>
            Skills
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/#certificates" onClick={toggleMenu}>
            Certificates
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/#projects" onClick={toggleMenu}>
            Projects
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/#contact" onClick={toggleMenu}>
            Contact
          </HashLink>
        </li>
        <li>
          <a
            href="/assets/Adhi-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={toggleMenu}
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
