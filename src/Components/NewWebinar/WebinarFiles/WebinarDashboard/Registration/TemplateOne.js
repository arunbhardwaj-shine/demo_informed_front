import moment from "moment";
import React, { useEffect, useState } from "react";


export default function TemplateOne({children,formData}) {
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

  return (
    <>
    <div className="wrapper vwd">
      <section className="factor-season" >
        <div className="container">
          <div className="row">
            <div className="factor-season-inner" style={
                  formData?.content?.headerImageUrl
                    ? {
                        backgroundImage: `url("${formData?.content?.headerImageUrl}")`,
                      }
                    : {}
                }>
              <div className="row">
                <div className="col-sm-8 col-md-8">
                  <div className="factor-season-left">
                    <div className="factor__logo">
                    <img  src={`${formData?.content?.logoImageUrl?formData?.content?.logoImageUrl:"https://webinar.docintel.app/Webinar/images/logo.png"}`}alt="Factor logo" />

                      {/* <img src="https://webinar.docintel.app/Webinar/images/logo.png" alt="Factor logo" /> */}
                    </div>
                    <h1 style= {{
                            color:eventDataSample?.eventStartDate?.color
                          }}>
                        {formattedDateRange}</h1>
                    <h2   style={{
                           
                            color:eventDataSample?.eventLocation?.color
                          }}
                        >
                          {eventDataSample?.eventLocation?.value
                            ? eventDataSample?.eventLocation?.value
                            : eventData?.location}
                    </h2>
                  </div>
                </div>
                <div className="col-sm-4 col-md-4">
                  <div className="factor-season-right">
                    <div className="emory__logo">
                      
                      <img src="https://webinar.docintel.app/Webinar/images/logo1.png" alt="Emory logo" />
                    </div>
                    <h3 style={{
                            textTransform: "capitalize",
                            color:eventDataSample?.speakerName?.color
                          }}>
                          {" "}
                          {eventDataSample?.speakerName?.value
                            ? eventDataSample?.speakerName?.value
                            : eventData.speaker_name}
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

  </>
  
  )
}
