// src/components/CertificateCard.jsx
import React, { useState } from "react";

function CertificateCard({ certificate }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  const handleInteraction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFlipped((prev) => {
      return !prev;
    });
  };
  return (
    <div
      className="flip-card"
      onClick={handleCardClick}
      onTouchEnd={handleInteraction}
    >
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front">
          {certificate.previewImage && (
            <img
              src={certificate.previewImage.asset.url}
              alt={certificate.title}
            />
          )}
        </div>

        <div className="flip-card-back">
          {/* Add this wrapper div */}
          <div className="info-block">
            <h3>{certificate.title}</h3>
            <p className="issuer">Issued by: {certificate.issuer}</p>
            {certificate.issuedDate && (
              <p className="date">{certificate.issuedDate}</p>
            )}
          </div>

          {/* The rest of the content remains the same */}
          {certificate.credentialURL && (
            <a href={certificate.credentialURL} /* ... */>Verify Credential</a>
          )}
        </div>
      </div>
    </div>
  );
}

export default CertificateCard;
