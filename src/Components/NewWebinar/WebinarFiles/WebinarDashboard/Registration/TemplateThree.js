import moment from "moment";
import React, { useEffect, useState } from "react";
const TemplateOne = ({ children, formData }) => {
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
    formattedDateRange = startDate.format("D MMMM YYYY");
  } else if (startDate.isSame(endDate, "month")) {
    formattedDateRange = `${startDate.format("D")}-${endDate.format("D MMMM YYYY")}`;
  } else {
    formattedDateRange = `${startDate.format("D MMMM")}-${endDate.format("D MMMM YYYY")}`;
  }
  const eventStartTime = eventDataSample?.eventStartTime?.value ?? '00:00';
  const eventEndTime = eventDataSample?.eventEndTime?.value ?? '00:00';
  function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(':');
    const formattedTime = new Date(`2000-01-01T${time}:00`);
    return formattedTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}
const convertedStartTime = convertTo12HourFormat(eventStartTime);
const convertedEndTime = convertTo12HourFormat(eventEndTime);
const timeRange = `${convertedStartTime} - ${convertedEndTime}`;
const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
const eventId = localStorageEvent?.eventId
// console.log(eventId === 507 ,'eventId')

  return (
    <>
      <div 
      // className="wrapper emory"
      className={`wrapper emory ${eventId === 505   ? "French" : ""}`}
      >
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
                    {eventId === 505  ? 
                    <h1>
                      <span style={{
                          textTransform: "capitalize",
                          color:eventDataSample?.eventTitle?.color
                        }}
                        dangerouslySetInnerHTML={{
                          __html: eventDataSample?.eventTitle?.value
                          ? eventDataSample?.eventTitle?.value
                          : ''
                        }}
                       />
                    </h1>
                   : <div className="factor__logo">
                        <img
                          src={`${
                            formData?.content?.logoImageUrl
                              ? formData?.content?.logoImageUrl
                              : ""
                          }`}
                          alt="Factor logo"
                        />
                      </div>
                  }
                      {/* <div className="factor__logo">
                        <img
                          src={`${
                            formData?.content?.logoImageUrl
                              ? formData?.content?.logoImageUrl
                              : ""
                          }`}
                          alt="Factor logo"
                        />
                      </div> */}
                      <h2 style= {{
                            color:eventDataSample?.eventStartDate?.color
                          }}>
                        {formattedDateRange}{eventId === 505 ? ', ' : ''}

                       { eventId != 505 ?<><br />
                         <span style= {{
                            color:eventDataSample?.eventStartTime?.color
                          }}>{timeRange}</span>
                        <br /></>: ''}
                        <span
                          style={{
                            textTransform: "capitalize",
                            color:eventDataSample?.eventLocation?.color
                          }}
                          dangerouslySetInnerHTML={{
                            __html: eventDataSample?.eventLocation?.value
                            ? eventDataSample?.eventLocation?.value
                            : eventData?.location
                          }}
                        />
                          {/* {eventDataSample?.eventLocation?.value
                            ? eventDataSample?.eventLocation?.value
                            : eventData?.location} */}
                        {/* </span> */}
                      </h2>
                    </div>
                  </div>

                  {eventId === 505  ? 
                   <div className="col-sm-4">
                   <div className="factor-season-right">
                   <div className="factor__logo">
                   <img
                     src={`${
                       formData?.content?.logoImageUrl
                         ? formData?.content?.logoImageUrl
                         : ""
                     }`}
                     alt="Factor logo"
                   />
                 </div> </div> </div>
                   : <div className="col-sm-4 col-md-4">
                   <div className="factor-season-right">
                     <h3>
                       <span style={{
                           textTransform: "capitalize",
                           color:eventDataSample?.speakerName?.color
                         }}
                         dangerouslySetInnerHTML={{
                           __html: eventDataSample?.speakerName?.value
                           ? eventDataSample?.speakerName?.value
                           : eventData.speaker_name
                         }}
                        />
                         {" "}
                     </h3>
                   </div>
                 </div>
                  }

                  {/* <div className="col-sm-4 col-md-4">
                    <div className="factor-season-right">
                      <h3>
                        <span style={{
                            textTransform: "capitalize",
                            color:eventDataSample?.speakerName?.color
                          }}
                          dangerouslySetInnerHTML={{
                            __html: eventDataSample?.speakerName?.value
                            ? eventDataSample?.speakerName?.value
                            : eventData.speaker_name
                          }}
                         />
                          {" "}
                      </h3>
                    </div>
                  </div> */}
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
                          : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="footer-right"></div>
                <div className="footer-copyright">
                  <span>© 2024 CP. All rights Reserved</span>
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
