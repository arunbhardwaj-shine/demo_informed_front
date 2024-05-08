import moment from "moment";
import React, { useEffect, useState } from "react";


const TemplateSix = ({ children, formData }) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
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
    formattedDateRange = `${startDate.format("D")} - ${endDate.format("D MMMM YYYY")}`;
  } else {
    formattedDateRange = `${startDate.format("D MMMM")} - ${endDate.format("D MMMM YYYY")}`;
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
  return (
    <>
      <div className="isth-template">
        <div className="wrapper isth">
          <div className="login-wrapper-header">
            <div className="login-wrapper-inner">
              <div className="login-wrapper-logo">
                {/* <img src={path_image + "one-source-logo.png"} alt=""/> */}
                <img  src={`${formData?.content?.logoImageUrl?formData?.content?.logoImageUrl:""}`}alt="" />
              </div>
              <div className="login-wrapper-logo-title">
                {/* <h2 className="top-title">ISTH 2023 Symposia Live Stream</h2> */}
                <h2 className="top-title"
                style={{
                  color: formData?.content?.eventDetails?.heading?.color,
                }}
                dangerouslySetInnerHTML={{
                  __html: formData?.content?.eventDetails?.heading?.value,
                }}
              >
              </h2>
              </div>
            </div>
          </div>
          <div className="login-wrapper-mid-sec">
            <div className="login-wrapper-mid-left">
              <div className="head-sec-title">
                {/* <h2>Registration to watch our ISTH 2023 symposia</h2> */}
                <h2
                style={{
                  color: formData?.content?.eventDetails?.HeaderHeadingOne?.color,
                }}
                dangerouslySetInnerHTML={{
                  __html: formData?.content?.eventDetails?.HeaderHeadingOne?.value,
                }}
              >
              </h2>
              </div>
              <div className="head-sec-boxes">
                <div className="boxes-col-center">
                  {/* <a href="https://docintel.app/Haematology_Octapharma/UGZRqkYq" target="_blank"> */}
                    {/* <img src={path_image + "under-spotlight-wil.jpg"} alt=""/> */}
                    <img  src={`${formData?.content?.templateOneImageUrl?formData?.content?.templateOneImageUrl:""}`}alt="" />
                  {/* </a> */}
                </div>
                <div className="boxes-col-center">
                  {/* <a href="https://docintel.app/Haematology_Octapharma/VleTOjJC" target="_blank"> */}
                    {/* <img src={path_image + "under-spotlight-together.jpg"} alt=""/> */}
                    <img  src={`${formData?.content?.templateTwoImageUrl?formData?.content?.templateTwoImageUrl:""}`}alt="" />
                  {/* </a> */}
                </div>
              </div>
              <div className="head-sec">
                {/* <p>For healthcare professionals only.</p> */}
                <p
                style={{
                  color: formData?.content?.eventDetails?.Specialization?.color,
                }}
                dangerouslySetInnerHTML={{
                  __html: formData?.content?.eventDetails?.Specialization?.value,
                }}
              >
              </p>
              </div>

              <div className="mid-left-bottom">
                <ul>
                  {/* <li>Monday, June 26 2023  <span>|</span>  01:15 - 2:30 pm ET</li>
                  <li>Tuesday, June 27 2023  <span>|</span>  01:15 - 2:30 pm ET</li> */}
                  <li
                style={{
                  color: formData?.content?.eventDetails?.EventDateAndTime?.color,
                }}
                dangerouslySetInnerHTML={{
                  __html: formData?.content?.eventDetails?.EventDateAndTime?.value,
                }}
              >
              </li>
                </ul>
              </div>
              
            </div>
            <div className="login-wrapper-mid-right">
              {children}

            </div>
            
          </div>
          <div className="footer-message">
              <p
                style={{
                  color: formData?.content?.eventDetails?.footerMessage?.color,
                }}
                dangerouslySetInnerHTML={{
                  __html: formData?.content?.eventDetails?.footerMessage?.value,
                }}
              >
              </p>
          </div>
          <div className="footer-text">
              <p
                style={{
                  color: formData?.content?.eventDetails?.footerText?.color,
                }}
                dangerouslySetInnerHTML={{
                  __html: formData?.content?.eventDetails?.footerText?.value,
                }}
              >
              </p>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default TemplateSix;
