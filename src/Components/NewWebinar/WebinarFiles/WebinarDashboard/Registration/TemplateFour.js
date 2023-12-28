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
    formattedDateRange = startDate.format("D. MMMM YYYY");
  } else if (startDate.isSame(endDate, "month")) {
    formattedDateRange = `${startDate.format("D")} - ${endDate.format(
      "D. MMMM YYYY"
    )}`;
  } else {
    formattedDateRange = `${startDate.format("D. MMMM")} - ${endDate.format(
      "D. MMMM YYYY"
    )}`;
  }

  const eventStartTime = eventDataSample?.eventStartTime?.value ?? `${eventData?.dateStartHour  }:${eventData?.dateStartMin}`?? "00:00";
  const eventEndTime = eventDataSample?.eventEndTime?.value ?? `${eventData?.dateEndHour  }:${eventData?.dateEndMin}` ?? "00:00";


  function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const formattedTime = new Date(`2000-01-01T${time}:00`);
    return formattedTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  }
  const convertedStartTime = convertTo12HourFormat(eventStartTime);
  const convertedEndTime = convertTo12HourFormat(eventEndTime);
  const timeRange = `${convertedStartTime} - ${convertedEndTime}`;

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />
      <div className="wrapper eahad">
        <div
          className="octapharma_event"
          style={{ background: `${formData?.content?.backgroundColor}` }}
        >
          <div className="header">
            <div className="header-text">
              <h3>
                A monthly online series of interactive patient cases presented
                by leading experts in haematology
              </h3>
            </div>
          </div>
          <div className="octapharma_event_content">
            <h4
              style={{
                color: formData?.content?.eventDetails?.pageTitle?.color,
              }}
              dangerouslySetInnerHTML={{
                __html: formData?.content?.eventDetails?.pageTitle?.value,
              }}
            >
              {/* {formData?.content?.eventDetails?.pageTitle?.value} */}
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
                color: formData?.content?.eventDetails?.SubTitle?.color,
              }}
              dangerouslySetInnerHTML={{
                __html: formData?.content?.eventDetails?.SubTitle?.value,
              }}
            >
              {/* {formData?.content?.eventDetails?.SubHeading?.value} */}
            </h3>

            <div className="speaker">
              <h4
                className="mb-4"
                style={{
                  // textTransform: "capitalize",
                  color: eventDataSample?.speakerName?.color,
                }}
                dangerouslySetInnerHTML={{
                  __html: eventDataSample?.speakerName?.value
                    ? `${eventDataSample.speakerName.value}${
                        formData?.content?.eventDetails?.Specialization?.value
                          ? ","
                          : ""
                      }`
                    : `${eventData?.speaker_name}${
                        formData?.content?.eventDetails?.Specialization?.value
                          ? ","
                          : ""
                      }`,
                }}
              >
                {/* by {eventDataSample?.speakerName?.value
              ? eventDataSample?.speakerName?.value
              : eventData?.speaker_name}
            {formData?.content?.eventDetails?.Specialization?.value && ","} */}
              </h4>

              <h4
                style={{
                  color: formData?.content?.eventDetails?.Specialization?.color,
                }}
                className="speaker-specialization"
                dangerouslySetInnerHTML={{
                  __html:
                    formData?.content?.eventDetails?.Specialization?.value,
                }}
              >
                {/* {formData?.content?.eventDetails?.Specialization?.value} */}
              </h4>
            </div>

            {/* <h4 style={{ color: eventDataSample?.eventStartDate?.color }}>
              {formattedDateRange}
            </h4> */}

<h4 dangerouslySetInnerHTML={{
  __html: `${formData?.content?.eventDetails?.eventDateDetails?.value?formData?.content?.eventDetails?.eventDateDetails?.value:"31st January 2024 <br/> 8:00 (PST) / 17:00 (CET)<br/>Online in One Source"}`
}}>
</h4>
{/* <h4 dangerouslySetInnerHTML={{
  __html: `${formData?.content?.eventDetails?.eventDateDetails?.value} (${eventData?.countryTimezone})<br/>Online in One Source`
}}>
</h4> */}


            {/*  */}
            {formData?.content?.eventDetails?.SubHeading?.value ? (
              <p
                class="speaker-specialization"
                dangerouslySetInnerHTML={{
                  __html: formData?.content?.eventDetails?.SubHeading?.value,
                }}
              />
            ) : (
              <p class="speaker-specialization">
                If you already have a One Source account you can register to the
                clinical practice session using the same login details.
              </p>
            )}

            {/*  */}
            {formData?.content?.eventDetails?.SubText?.value ? (
              <p
                class="speaker-specialization"
                dangerouslySetInnerHTML={{
                  __html: formData?.content?.eventDetails?.SubText?.value,
                }}
              />
            ) : (
              <p class="speaker-specialization">
                If you do not yet have a One Source account, by registering to a
                Clinical Practice session an automatic account will be generated
                and you will gain access to this content in accordance with the
                data privacy policy of{" "}
                <a href="https://onesource.octapharma.com/octapharma-privacy" target="_blank">
                  Octapharma AG
                </a>{" "}
                and{" "}
                <a
                  href="https://albert.docintel.app/privacy_policy/"
                  target="_blank"
                >
                  Docintel.app
                </a>{" "}
                operating this page.
              </p>
            )}

            <div className="octapharma_event_form">{children}</div>
          </div>
          <div className="footer">
            <div className="footer-inner">
              <Row>
                <Col md={8}>
                  <p>
                  To visit One Source &nbsp; 
                    <Link  target="_blank" to="https://onesource.octapharma.com/" style={{textDecoration:"underline"}}>
                     Click Here
                    </Link>{" "}.
                    <br/>
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
                    <a target="_blank" href="https://onesource.octapharma.com/octapharma-privacy">
                    <img
                      src="https://docintel.app/img/octa/e-templates/one-source/onesource-logo.gif"
                      alt="Logo image"
                    />
                    </a>
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
