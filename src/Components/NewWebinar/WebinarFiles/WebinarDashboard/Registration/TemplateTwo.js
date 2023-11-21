import moment from 'moment';
import React from 'react'
export default function TemplateTwo({children,formData}) {
  let eventData=formData?.content?.eventDetails
  
  const formatDate = (date) => {
    return moment(new Date(date), 'YYYY-MM-DD').format('dddd, D MMMM YYYY');
  };
  
  const SubHeadingOneDate = formatDate(eventData?.SubHeadingOneDate?.value);
  const SubHeadingTwoDate = formatDate(eventData?.SubHeadingTwoDate?.value);
  const SubHeadingThreeDate = formatDate(eventData?.SubHeadingThreeDate?.value);
  const renderEvent = (event, dateKey, valueKey, colorKey) => {
    const formattedDate = formatDate(event[dateKey]?.value);
    const textColor = event[dateKey]?.color;

    return (
      <div className="invertor-metting" key={dateKey}>
        <div className="meeting-logo">
          {event[dateKey]?.image && <img src={event[dateKey]?.image} alt="" />}
        </div>
        <div className="logo-top">
          <h5 style={{ color: event[valueKey]?.color }}>{event[valueKey]?.value}</h5>
          <p style={{ color: textColor }}>{formattedDate}</p>
        </div>
      </div>
    );
  };
  return (
    <>
  

  
    <div className="motivate_outer">
      <div className="motivate_inner" style={{ background: `${formData?.content?.backgroundColor}` }}>
        <div className="top_header"  >
          <h2 style={{
                    color:eventData?.heading?.color
        }}>{`${eventData?.heading?.value?eventData?.heading?.value:"Registration"}`}</h2>
        </div>
        <div className="motivation-body">
          <div className="logo-part">
            <div className="row">
              <div className="col-12">
                <div className="invertor-metting">
                  <div className="meeting-logo"></div>
                  <div className="logo-top" >
                    <h5 style={{
                    color:eventData?.SubHeadingOne?.color
                  }} >{`${eventData?.SubHeadingOne?.value?eventData?.SubHeadingOne?.value:"Welcome dinner"}`}</h5>
                    <p style={{
                    color:eventData?.SubHeadingOneDate?.color
                  }} >{SubHeadingOneDate}</p>
                  </div>
                </div>
                <div className="invertor-metting">
                  <div className="meeting-logo">
                    {/* <img src="images/im-workshop.png" alt=""> */}
                    <img                       src={`${formData?.content?.logoImageUrl?formData?.content?.logoImageUrl:"https://webinar.docintel.app/MOTIVATE-study/Regi/images/lund-logo.png"}`}alt="" />
                  </div>
                  <div className="logo-top">
                    <h5 style={{
                    color:eventData?.SubHeadingTwo?.color
                  }} >{`${eventData?.SubHeadingTwo?.value?eventData?.SubHeadingTwo?.value:"International ITI School and networking dinner"}`}</h5>
                    <p style={{
                    color:eventData?.SubHeadingTwoDate?.color
                  }}>{SubHeadingTwoDate}</p>
                  </div>
                </div>
                <div className="invertor-metting">
                  <div className="meeting-logo">
                    <img src="https://webinar.docintel.app/MOTIVATE-study/Regi/images/motivate-modern-logo-min.png" alt="" />
                  </div>
                  <div className="logo-top">
                    <h5 style={{
                    color:eventData?.SubHeadingThree?.color
                  }}>{`${eventData?.SubHeadingThree?.value?eventData?.SubHeadingThree?.value:"MOTIVATE Investigators meeting"}`} </h5>
                    <p style={{
                    color:eventData?.SubHeadingThreeDate?.color
                  }} >{SubHeadingThreeDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="motivate-mid-sec text-center">
            <h2 style={{
                    color:eventData?.speakerName?.color
                  }}>{eventData?.speakerName?.value}</h2>
            <p> These meetings are for healthcare professionals only.</p>
          </div>
          {children}
        </div>
      </div>
      {/* <iframe src="https://webinar.docintel.app/MOTIVATE-study/Regi/login.php?utmevent=ITI-school-motivate-meeting" height="1000px" width="100%" title="Iframe Example"></iframe> */}
    </div>
   
        
  </>
  
  )
}
