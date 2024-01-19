import React from "react";
import { Image } from "react-bootstrap";
import { climaworldLogo } from "../assets/img";
import investor_ppt from "../assets/investor/ClimaWorld_Investor_Präsentation.pdf";
import shareholder_template from "../assets/investor/ClimaWorld_Investor_Gesellschaftervertrag-Vorlage.pdf";
import cff from "../assets/investor/ClimaWorld_Investor_Finanzplan_(CFF)-Cash-Flow-Forecast.pdf";
import sa from "../assets/investor/ClimaWorld_Investor_Finanzplan_(SA)-Sales-Assumptions.pdf";

/* 
  
  Investor Page: investor information page with resources and contact information
 
  */
export default function Investor() {
  // Everything that should be listed under resources
  const ressources = [
    {
      title: "Präsentation:",
      files: [
        { name: "ClimaWorld Investor Präsentation.pdf", link: investor_ppt },
      ],
    },
    {
      title: "Finanzplan:",
      files: [
        {
          name: "ClimaWorld Investor Finanzplan (CFF)Cash-Flow-Forecast.pdf",
          link: cff,
        },
        {
          name: "ClimaWorld Investor Finanzplan (SA)Sales-Assumptions.pdf",
          link: sa,
        },
      ],
    },
    {
      title: "Gesellschaftervertrag:",
      files: [
        {
          name: "ClimaWorld Investor Gesellschaftervertrag-Vorlage.pdf",
          link: shareholder_template,
        },
      ],
    },
  ];

  // Everything that should be listed under contact
  const contact = [
    {
      title: "Videocall:",
      files: [
        {
          name: "https://zcal.co/climaworld",
          link: "https://zcal.co/climaworld",
        },
      ],
    },
    {
      title: "Mail:",
      files: [
        { name: "lapo@climaworld.app", link: "mailto:lapo@climaworld.app" },
      ],
    },
    {
      title: "Whatsapp/Telegram/Viber/Signal:",
      files: [{ name: "+49 0000000", link: "" }],
    },
  ];

  return (
    // A Custom header different to the standard one since no menu
    <div className="d-flex flex-column m-4">
      <div className="d-flex align-items-center gap-3">
        <Image
          src={climaworldLogo}
          height={60}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "60px",
            maxWidth: "256.8px",
          }}
        />
        <div className="fs-2">Investor</div>
      </div>

      <hr />

      <div
        className="mt-3 d-flex flex-wrap"
        style={{ columnGap: "11rem", rowGap: "3rem" }}
      >
        {/* Maybe embed iframes for immediate access presentation, contact (zcal) */}
        <div>
          <div className="fs-4">Ressourcen</div>
          {ressources.map((ressource) => (
            <div className="mt-4 ">
              <div className="fw-bold">{ressource.title}</div>
              <div className="d-flex flex-column gap-2 mt-2">
                {ressource.files.map((file) => (
                  <a href={file.link} download={file.name}>
                    {file.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="fs-4 ">Kontakt</div>
          {contact.map((ressource) => (
            <div className="mt-4 ">
              <div className="fw-bold">{ressource.title}</div>
              <div className="d-flex flex-column gap-2 mt-2">
                {ressource.files.map((file) =>
                  file.link ? (
                    <a href={file.link} download={file.name}>
                      {file.name}
                    </a>
                  ) : (
                    <div>{file.name}</div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
