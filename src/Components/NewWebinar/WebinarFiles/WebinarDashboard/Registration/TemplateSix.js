import moment from "moment";
import React, { useEffect, useState } from "react";
const TemplateSix = ({ children, formData }) => {
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
      
      <div className="wrapper emory">
        
        {children}
        
      </div>
    </>
  );
};

export default TemplateSix;
