import React from 'react'
export default function TemplateTwo({children,formdata}) {
  return (
    <>
  
    {/* <link rel="stylesheet" href="https://webinar.docintel.app/MOTIVATE-study/Regi/css/bootstrap.css" />
    <link rel="stylesheet" href="https://webinar.docintel.app/MOTIVATE-study/Regi/css/style.css" /> */}
  
    <div className="motivate_outer">
      <div className="motivate_inner">
        <div className="top_header">
          <h2>Registration</h2>
        </div>
        <div className="motivation-body">
          <div className="logo-part">
            <div className="row">
              <div className="col-12">
                <div className="invertor-metting">
                  <div className="meeting-logo"></div>
                  <div className="logo-top">
                    <h5>Welcome dinner</h5>
                    <p>Wednesday, 24 May 2023</p>
                  </div>
                </div>
                <div className="invertor-metting">
                  <div className="meeting-logo">
                    {/* <img src="images/im-workshop.png" alt=""> */}
                    <img src="https://webinar.docintel.app/MOTIVATE-study/Regi/images/lund-logo.png" alt="" />
                  </div>
                  <div className="logo-top">
                    <h5>International ITI School and networking dinner</h5>
                    <p>Thursday, 25 May 2023</p>
                  </div>
                </div>
                <div className="invertor-metting">
                  <div className="meeting-logo">
                    <img src="https://webinar.docintel.app/MOTIVATE-study/Regi/images/motivate-modern-logo-min.png" alt="" />
                  </div>
                  <div className="logo-top">
                    <h5>MOTIVATE Investigators meeting</h5>
                    <p>Friday, 26 May 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="motivate-mid-sec text-center">
            <h2>Nashville, Tennessee</h2>
            <p>These meetings are for healthcare professionals only.</p>
          </div>
          {children}
        </div>
      </div>
      {/* <iframe src="https://webinar.docintel.app/MOTIVATE-study/Regi/login.php?utmevent=ITI-school-motivate-meeting" height="1000px" width="100%" title="Iframe Example"></iframe> */}
    </div>
   
        
  </>
  
  )
}
