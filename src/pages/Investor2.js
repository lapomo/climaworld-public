import React from "react";
import { useEffect } from "react";
import { Accordion, Image } from "react-bootstrap";
import { climaworldLogo } from "../assets/img";
import investor_ppt from "../assets/investor/ClimaWorld_Investor_Präsentation.pdf";
import shareholder_template from "../assets/investor/ClimaWorld_Investor_Gesellschaftervertrag-Vorlage.pdf";
import cff from "../assets/investor/ClimaWorld_Investor_Finanzplan_(CFF)-Cash-Flow-Forecast.pdf";
import sa from "../assets/investor/ClimaWorld_Investor_Finanzplan_(SA)-Sales-Assumptions.pdf";

/* 

  Investor Testing Page: Try out the investor page with accordion

 */
export default function Investor() {

  const ressources = [
    {
      title: "Präsentation",
      files: [
        { name: "ClimaWorld Investor Präsentation.pdf", link: investor_ppt },
      ],
    },
    {
      title: "Gesellschaftervertrag",
      files: [
        {
          name: "ClimaWorld Investor Gesellschaftervertrag-Vorlage.pdf",
          link: shareholder_template,
        },
      ],
    },
    {
      title: "Finanzplan",
      files: [
        {
          title: "Cash Flow Forecast",
          name: "ClimaWorld Investor Finanzplan (CFF)Cash-Flow-Forecast.pdf",
          link: cff,
        },
        {
          title: "Sales Assumption",
          name: "ClimaWorld Investor Finanzplan (SA)Sales-Assumptions.pdf",
          link: sa,
        },
      ],
    },
  ];

  return (
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
      <form
        style={{
          border: "1px solid #ccc",
          padding: "3px",
          textAlign: "center",
        }}
        action="https://tinyletter.com/ClimaWorld"
        method="post"
        //   target="popupwindow"
        //   onsubmit="window.open('https://tinyletter.com/ClimaWorld', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
      >
        <p>
          <label for="tlemail">Enter your email address</label>
        </p>
        <p>
          <input
            type="text"
            style={{ width: "140px" }}
            name="email"
            id="tlemail"
          />
        </p>
        {/* <input type="hidden" value="1" name="embed" /> */}
        <input type="submit" value="Subscribe" />
      </form>

      <div style={{textAlign: "left"}} class="sender-form-field" data-sender-form-id="l8tez6x2ejjqbeex88c"></div>

      <div className="mt-3">
        <div className="fs-4">Ressourcen</div>
        <Accordion className="mt-3" style={{ maxWidth: "960px" }}>
          {ressources.map((ressource, index1) =>
            ressource.files.map((file, index2) => (
              <Accordion.Item eventKey={String(index1 + index2)}>
                <Accordion.Header>
                  <div className="fw-bold">
                    {ressource.title}
                    {ressource.files.length > 1 && " - " + file.title}:
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <object
                    data={file.link}
                    type="application/pdf"
                    width="100%"
                    height="569px"
                  >
                    <a
                      href={file.link}
                      download={file.name}
                      // style={{width: "100%", overflow: "none", whiteSpace: "wrap"}}
                    >
                      {file.name}
                    </a>
                  </object>
                </Accordion.Body>
              </Accordion.Item>
            ))
          )}
        </Accordion>
      </div>
    </div>
  );
}
