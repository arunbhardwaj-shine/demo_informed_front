import moment from "moment";
import React, { useEffect, useState } from "react";
const TemplateOne = ({ children ,formData}) => {
  const eventData =formData?.raw_description;
  const formattedDateString = moment(eventData.dateStart, 'D MMMM YYYY').format('D MMMM YYYY');


  return (
    <>
<link rel="stylesheet" href="https://webinar.docintel.app/FVIIIrelevance2024/register/assets/fonts/fonts.css"/>
  <div className="wrapper emory">
    <section className="factor-season">
      <div className="container">
        <div className="row">
          <div className="factor-season-inner"  style={{
            backgroundImage: `url("${formData?.content?.headerImageUrl}")`,
          }}>
            <div className="row">
              <div className="col-sm-8 col-md-8">
                <div className="factor-season-left">
                  <div className="factor__logo">
                    <img
                      src="https://webinar.docintel.app/FVIIIrelevance2024/register/assets/images/factor-logo-europe.png"
                      alt="Factor logo"
                    />
                  </div>
                  <h2>
                    {
                                           formattedDateString

                    }
                    <br />
                    {
  `${eventData.dateStartHour}:${eventData.dateStartMin < 10 ? '0' + eventData.dateStartMin : eventData.dateStartMin}-${
    eventData.dateEndHour
  }:${eventData.dateEndMin < 10 ? '0' + eventData.dateEndMin : eventData.dateEndMin}`
}
                    <br />
                    Frankfurt, Germany
                  </h2>
                </div>
              </div>
              <div className="col-sm-4 col-md-4">
                <div className="factor-season-right">
                  <h3>
                    {
                      eventData.speaker_name
                    }
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  {children}
  <footer>
    <div className="container">
      <div className="row">
        <div className="footer-inner" style={{
            backgroundImage: `url("${formData?.content?.footerImageUrl}")`,
          }}>
          <div className="footer-left">
            <div className="footer-logo">
              <img src="https://webinar.docintel.app/FVIIIrelevance2024/register/assets/images/footer-logo.png" alt="footer-logo" />
            </div>
          </div>
          <div className="footer-right"></div>
          <div className="footer-copyright">
            <span>© 2023 CP. All rights Reserved</span>
            <ul>
              <li>
                <a
                  target="_blank"
                  href="https://albert.docintel.app/privacy_policy/"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://albert.docintel.app/terms_of_use/"
                >
                  Terms of Services
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
  </div>
  
  <div className="modal fade" id="myModal">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            ×
          </button>
        </div>
        {/* Modal body */}
        <div className="modal-body"></div>
      </div>
    </div>
  </div>
</>

  );
};

export default TemplateOne;


