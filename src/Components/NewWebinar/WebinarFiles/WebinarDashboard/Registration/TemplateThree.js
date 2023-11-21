import moment from "moment";
import React, { useEffect, useState } from "react";
const TemplateOne = ({ children, formData }) => {
  const eventData = formData?.raw_description;
  // const formattedStartDateString = moment(
  //   new Date(eventData.dateStart),
  //   "D MMMM YYYY"
  // ).format("D MMMM YYYY");
  // const formattedEndDateString = moment(
  //   new Date(eventData.dateEnd),
  //   "D MMMM YYYY"
  // ).format("D MMMM YYYY");

  let eventDataSample = formData?.content?.eventDetails;

  let formattedDateRange = "";
  const startDate = moment(
    new Date(
      eventDataSample?.eventStartDate?.value
        ? eventDataSample?.eventStartDate?.value
        : eventData.dateStart
    ),
    "YYYY-MM-DD"
  );
  const endDate = moment(
    new Date(
      eventDataSample?.eventEndDate?.value
        ? eventDataSample?.eventEndDate?.value
        : eventData.dateEnd
    ),
    "YYYY-MM-DD"
  );
  if (startDate.isSame(endDate, "day")) {
    formattedDateRange = startDate.format("D MMMM YYYY");
  } else if (startDate.isSame(endDate, "month")) {
    formattedDateRange = `${startDate.format("D")} - ${endDate.format("D MMMM YYYY")}`;
  } else {
    formattedDateRange = `${startDate.format("D MMMM")} - ${endDate.format("D MMMM YYYY")}`;
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://webinar.docintel.app/FVIIIrelevance2024/register/assets/fonts/fonts.css"
      />
      <div className="wrapper emory">
        <section className="factor-season">
          <div className="container">
            <div className="row">
              <div
                className="factor-season-inner"
                style={
                  formData?.content?.headerImageUrl
                    ? {
                        backgroundImage: `url("${formData?.content?.headerImageUrl}")`,
                      }
                    : {}
                }
              >
                <div className="row">
                  <div className="col-sm-8 col-md-8">
                    <div className="factor-season-left">
                      <div className="factor__logo">
                        <img
                          src={`${
                            formData?.content?.logoImageUrl
                              ? formData?.content?.logoImageUrl
                              : "https://webinar.docintel.app/FVIIIrelevance2024/register/assets/images/factor-logo-europe.png"
                          }`}
                          alt="Factor logo"
                        />
                      </div>
                      <h2 style= {{
                            color:eventDataSample?.eventStartDate?.color
                          }}>
                        {formattedDateRange}
                        <br />
                        {`${eventData.dateStartHour}:${
                          eventData.dateStartMin < 10
                            ? "0" + eventData.dateStartMin
                            : eventData.dateStartMin
                        }-${eventData.dateEndHour}:${
                          eventData.dateEndMin < 10
                            ? "0" + eventData.dateEndMin
                            : eventData.dateEndMin
                        }`}
                        <br />
                        <span
                          style={{
                            textTransform: "capitalize",
                            color:eventDataSample?.eventLocation?.color
                          }}
                        >
                          {eventDataSample?.eventLocation?.value
                            ? eventDataSample?.eventLocation?.value
                            : eventData?.location}
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4">
                    <div className="factor-season-right">
                      <h3>
                        <span style={{
                            textTransform: "capitalize",
                            color:eventDataSample?.speakerName?.color
                          }}>
                          {" "}
                          {eventDataSample?.speakerName?.value
                            ? eventDataSample?.speakerName?.value
                            : eventData.speaker_name}
                        </span>
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
              <div
                className="footer-inner"
                style={
                  formData?.content?.footerImageUrl
                    ? {
                        backgroundImage: `url("${formData?.content?.footerImageUrl}")`,
                      }
                    : {}
                }
              >
                <div className="footer-left">
                  <div className="footer-logo">
                    <img
                      alt="footer-logo"
                      src={`${
                        formData?.content?.logoImageUrl
                          ? formData?.content?.logoImageUrl
                          : "https://webinar.docintel.app/FVIIIrelevance2024/register/assets/images/factor-logo-europe.png"
                      }`}
                    />
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
    </>
  );
};

export default TemplateOne;
