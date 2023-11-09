import React, { useEffect, useState } from "react";


export default function TemplateOne({children,formData}) {
  
  return (
    <>
  
    <link rel="stylesheet" href="https://webinar.docintel.app/Webinar/css/style.css?v=1.7" />
    <link rel="stylesheet" href="https://webinar.docintel.app/Webinar/css/custom.css?v=1.7" />
    <link rel="stylesheet" href="https://webinar.docintel.app/Webinar/fonts/fonts.css?v=1.7" />
    <link rel="stylesheet" href="https://webinar.docintel.app/Webinar/css/login.css?v=1.7" />
    {/*<link rel="stylesheet" href="css/responsive.css">
    <link rel="stylesheet" href="css/style.css">*/}
    <div className="wrapper">
      <section className="factor-season">
        <div className="container">
          <div className="row">
            <div className="factor-season-inner">
              <div className="row">
                <div className="col-sm-8 col-md-8">
                  <div className="factor-season-left">
                    <div className="factor__logo">
                      <img src="https://webinar.docintel.app/Webinar/images/logo.png" alt="Factor logo" />
                    </div>
                    <h1>26-27 October 2022</h1>
                    <h2>
                      University of Miami – Hemophilia Treatment Center, Miami FL
                      33136
                    </h2>
                  </div>
                </div>
                <div className="col-sm-4 col-md-4">
                  <div className="factor-season-right">
                    <div className="emory__logo">
                      <img src="https://webinar.docintel.app/Webinar/images/logo1.png" alt="Emory logo" />
                    </div>
                    <h3>
                      Chair : Fernando F Corrales-Medina, MD FAAP, Miami, USA
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
   {
    children
   }
    </div>
    <div className="modal fade thnku" id="myModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              <img src="https://webinar.docintel.app/Webinar/images/cross.png" alt="Close" />
            </button>
          </div>
          {/* Modal body */}
          <div className="modal-body">
            <h2>Thank you for registering.</h2>
          </div>
        </div>
      </div>
    </div>
    <script type="https://webinar.docintel.app/Webinar/text/javascript" src="https://webinar.docintel.app/Webinar/js/login.js"></script>

  </>
  
  )
}
