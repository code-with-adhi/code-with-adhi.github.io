// src/components/Certificates.jsx
import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import CertificateCard from "./CertificateCard.jsx"; // Import the new card component

function Certificates() {
  const [certificates, setCertificates] = useState(null);

  useEffect(() => {
    // This query fetches all the certificate details
    const query = `*[_type == "certificate"] | order(issuedDate desc){
  title,
  issuer,
  credentialURL,
  issuedDate, // Make sure this is included
  previewImage{
    asset->{
      url
    }
  },
  description,
  associatedSkills[]->{
    name,
    icon{
      asset->{
        url
      }
    }
  }
}`;
    sanityClient.fetch(query).then((data) => setCertificates(data));
  }, []);

  return (
    <section id="certificates">
      <h2>Certificates & Credentials</h2>
      <div className="certificates-grid">
        {!certificates ? (
          <p>Loading certificates...</p>
        ) : (
          certificates.map((cert, index) => (
            <CertificateCard key={index} certificate={cert} />
          ))
        )}
      </div>
    </section>
  );
}

export default Certificates;
