import moment from "moment";
import React from "react";
export default function TemplateFive({ children, formData }) {
  let eventData = formData?.content?.eventDetails;

  const formatDate = (date) => {
    return moment(new Date(date), "YYYY-MM-DD").format("dddd, D MMMM YYYY");
  };


  const renderEvent = (event, dateKey, valueKey, colorKey) => {
    const formattedDate = formatDate(event[dateKey]?.value);
    const textColor = event[dateKey]?.color;

    return (
      <div className="invertor-metting" key={dateKey}>
        <div className="meeting-logo">
          {event[dateKey]?.image && <img src={event[dateKey]?.image} alt="" />}
        </div>
        <div className="logo-top">
          <h5 style={{ color: event[valueKey]?.color }}>
            {event[valueKey]?.value}
          </h5>
          <p style={{ color: textColor }}>{formattedDate}</p>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="octa-academy">
        <div
          className="octa-academy_inner"
          // style={{ background: `${eventData?.headerImageUrl}` }}
        >
          <div className="top_header"  style={{
                 backgroundImage: `url("${formData?.content?.headerImageUrl}")`
              }}>
            <h2
              style={{
                color: eventData?.HeaderHeadingOne?.color
              }}
              dangerouslySetInnerHTML={{
                __html: eventData?.HeaderHeadingOne?.value
                  ? eventData?.HeaderHeadingOne?.value
                  : "",
              }}
            ></h2>
            <h2
              style={{
                color: eventData?.HeaderHeadingTwo?.color,
              }}
              dangerouslySetInnerHTML={{
                __html: eventData?.HeaderHeadingTwo?.value
                  ? eventData?.HeaderHeadingTwo?.value
                  : "",
              }}
            ></h2>
          </div>
          <div className="motivation-body">
            <div className="logo-part">
              <div className="row">
                <div className="col-12">
                  <div className="invertor-metting">
                    <div className="meeting-logo"></div>
                    <div className="logo-top">
                      <h5
                        style={{
                          color: eventData?.HeadingOne?.color,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: eventData?.HeadingOne?.value
                            ? eventData?.HeadingOne?.value
                            : "",
                        }}
                      ></h5>
                      <h5
                        style={{
                          color: eventData?.HeadingTwo?.color,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: eventData?.HeadingTwo?.value
                            ? eventData?.HeadingTwo?.value
                            : "",
                        }}
                      ></h5>
                      <h5
                        style={{
                          color: eventData?.EventDate?.color,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: eventData?.EventDate?.value
                            ? eventData?.EventDate?.value
                            : "",
                        }}
                      ></h5>
                      <h5
                        style={{
                          color: eventData?.EventTimeAndLocation?.color,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: eventData?.EventTimeAndLocation?.value
                            ? eventData?.EventTimeAndLocation?.value
                            : "",
                        }}
                      ></h5>
                      <h5
                        style={{
                          color: eventData?.pageTitle?.color,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: eventData?.pageTitle?.value
                            ? eventData?.pageTitle?.value
                            : "",
                        }}
                      ></h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
