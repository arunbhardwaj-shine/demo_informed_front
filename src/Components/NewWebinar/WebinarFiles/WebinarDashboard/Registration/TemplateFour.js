import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

export default function TemplateFour({ children, formData }) {
  const eventData = formData?.raw_description;
  let eventDataSample = formData?.content?.eventDetails;

  let formattedDateRange = "";
  const startDate = moment(
    new Date(
      eventDataSample?.eventStartDate?.value
        ? eventDataSample?.eventStartDate?.value
        : eventData?.dateStart
    ),
    "YYYY-MM-DD"
  );
  const endDate = moment(
    new Date(
      eventDataSample?.eventEndDate?.value
        ? eventDataSample?.eventEndDate?.value
        : eventData?.dateEnd
    ),
    "YYYY-MM-DD"
  );
  if (startDate.isSame(endDate, "day")) {
    formattedDateRange = startDate.format("D. MMMM YYYY");
  } else if (startDate.isSame(endDate, "month")) {
    formattedDateRange = `${startDate.format("D")} - ${endDate.format(
      "D MMMM YYYY"
    )}`;
  } else {
    formattedDateRange = `${startDate.format("D MMMM")} - ${endDate.format(
      "D MMMM YYYY"
    )}`;
  }

  return (
    <>
      <div className="wrapper eahad">
        <div className="octapharma_event">
          <div className="header">
            <div className="header-text">
              <h3>
                An interactive online series of monthly patient cases presented
                by Haematology leading experts
              </h3>
            </div>
          </div>
          <div className="octapharma_event_content">
            <h4
              style={{
                color: formData?.content?.eventDetails?.pageTitle?.color,
              }}
            >
              {formData?.content?.eventDetails?.pageTitle?.value}
            </h4>

            <h4
              style={{
                color: formData?.content?.eventDetails?.bodyText?.color,
              }}
            >
              {formData?.content?.eventDetails?.bodyText?.value}
            </h4>

            <h3
              style={{
                color: formData?.content?.eventDetails?.SubHeading?.color,
              }}
            >
              {formData?.content?.eventDetails?.SubHeading?.value}
            </h3>

            <div className="speaker">
              <h4
                className="mb-4"
                style={{
                  textTransform: "capitalize",
                  color: eventDataSample?.speakerName?.color,
                }}
              >
                by
                {eventDataSample?.speakerName?.value
                  ? eventDataSample?.speakerName?.value
                  : eventData?.speaker_name}
                {formData?.content?.eventDetails?.Specialization?.value && ","}
              </h4>

              <h4
                style={{
                  color: formData?.content?.eventDetails?.Specialization?.color,
                }}
                className="speaker-specialization"
              >
                {formData?.content?.eventDetails?.Specialization?.value}
              </h4>
            </div>

            <h4 style={{ color: eventDataSample?.eventStartDate?.color }}>
              {formattedDateRange}
            </h4>

            <h4>
              {formData?.content?.eventDetails?.eventStartTime?.value} (
              {eventData?.countryTimezone}) online in One Source
            </h4>

            <div className="octapharma_event_form">{children}</div>
          </div>
          <div className="footer">
            <div className="footer-inner">
              <Row>
                <Col md={8}>
                  <p>
                    <Link to="https://onesource.octapharma.com/">
                      Visit One Source,
                    </Link>{" "}
                    Octapharma’s online haematology platform for healthcare
                    professionals, to be up to date with the latest news and
                    events, and to hear leading experts share their opinions
                    about treating patients with bleeding disorders.
                  </p>
                  <p className="health-professional">
                    One Source platform is for healthcare professionals only.
                  </p>
                </Col>
                <Col md={4}>
                  <div className="footer-logo">
                    <img
                      src={path_image + "one_source_blue.svg"}
                      alt="Logo image"
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="footer-sec">
              <span>
                * This consent is mandatory in order to register for the event.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
