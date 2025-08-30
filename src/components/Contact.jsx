// src/components/Contact.jsx
import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Sending...");

    try {
      const response = await fetch("https://formspree.io/f/mwpnpqje", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setFormStatus("Oops! There was a problem.");
      }
    } catch (error) {
      setFormStatus("Oops! There was a problem.");
    }
  };

  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <p>
        I'm always interested in hearing about job opportunities, freelance
        projects, and tech discussions related to AI and full-stack development.
        Have a question or want to work together? Leave your details below.
      </p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">
          Send Message
        </button>
        {formStatus && <p className="form-status">{formStatus}</p>}
      </form>
    </section>
  );
}

export default Contact;
