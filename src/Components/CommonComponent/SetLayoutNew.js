import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Header from "./HeaderComponent/Header";
import { Route, Navigate, useNavigate } from "react-router-dom";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const SetLayoutNew = () => {
    
  let dummyData = [
    {
      image: `${path_image}library-icon.svg`,
      title: "Library",
      subtitle: "Create and edit content, see all of your content here",
    },
    {
      image: `${path_image}crm-icon.svg`,
      title: "CRMs",
      subtitle: "See who read what, their RTR-activity and their habits",
    },
    {
        image: `${path_image}srm-icon.svg`,
        title: "SRM",
        subtitle: "...............................",
      },
    {
      image: `${path_image}analytics-icon.svg`,
      title: "Analytics",
      subtitle: "Check the engagement rates, dig into readers and content",
    },
    {
      image: `${path_image}email-icon1.svg`,
      title: "Email",
      subtitle: "Send and resend an email, and work with your lists",
    },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    let newdata = [...dummyData];
    if (localStorage.getItem("group_id") == 2) {
      newdata.push({
        image: `${path_image}license-icon.svg`,
        title: "Licensed",
        subtitle: "All your licensed content in one place",
      });
    }
    // if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
    //   newdata.push({
    //     image: `${path_image}q-polling.svg`,
    //     title: "Q & Poll  ",
    //     subtitle: "Engage your audience and make them part of the presentation",
    //   });
    // }
    if (
      typeof localStorage.getItem("webinar_flag") !== "undefined" &&
      localStorage.getItem("webinar_flag") == 1 || localStorage.getItem("user_id") === "IJype v19WASFcSlrfRENQ=="
      // localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg==" &&
      // localStorage.getItem("user_id") != "UbCJcnLM9fe HsRMgX8c1A==" &&
      // localStorage.getItem("user_id") != "z2TunmZQf3QwCsICFTLGGQ==" &&
      // localStorage.getItem("user_id") != "qDgwPdToP05Kgzc g2VjIQ=="
    ) {
      newdata.push({
        image: `${path_image}webinar-icon.svg`,
        title: "Webinar",
        subtitle: "See Webinar Event users",
      });
    }

    setData(newdata);
  }, []);

  const navigate = useNavigate();
  let [active, setActive] = useState();
  const handleChange = (title) => {
    setActive(title);
    if (title == "Library") {
      navigate("/library-content");
    } else if (title == "CRM") {
       (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
       ||localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
        ? navigate("/new-readers-reviews")
        :
        navigate("/readers-view");
      // navigate("/readers-view");
    } else if (title == "Analytics") {
      localStorage.getItem("group_id") == 2
        ? navigate("/content-analytics")
        : localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ=="
          ? navigate("/totalhcp")
          : localStorage.getItem("user_id") == "iSnEsKu5gB/DRlycxB6G4g=="
            ? navigate("/octalatch-totalhcp")
            : (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
            ||localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
              ? navigate("/LEX-210-analytics")
              : localStorage.getItem("user_id") == "wW0geGtDPvig5gF 6KbJrg=="
                ? navigate("/totalhcp")
                : localStorage.getItem("user_id") == "UbCJcnLM9fe HsRMgX8c1A=="
                  ? navigate("/totalhcp")
                  : localStorage.getItem("user_id") == "z2TunmZQf3QwCsICFTLGGQ=="
                    ? navigate("/totalhcp")
                    : localStorage.getItem("user_id") == "qDgwPdToP05Kgzc g2VjIQ=="
                      ? navigate("/totalhcp")
                      : navigate("/content-analytics");
    } else if (title == "Email") {
      // localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
      //   ? navigate("/IRTRole")
        // :
        navigate("/EmailList");
    } else if (title == "Webinar") {
      if (
        typeof localStorage.getItem("webinar_flag") !== "undefined" &&
        localStorage.getItem("webinar_flag") == 1
        ||
        localStorage.getItem("user_id") === "IJype v19WASFcSlrfRENQ=="
        // &&
        // localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg=="
      ) {
        navigate("/webinar/event-listing")
        // window.open(
        //   "https://webinar.informed.pro/Webinar/readers_webinar?rdylr=" +
        //     localStorage.getItem("user_id"),
        //   "_blank"
        // );
      }
    } else if (title == "Licensed") {
      // navigate("/license-content");
      // navigate("/license-content");
      navigate("/license-content");
    } else if (title == "Q&A/SURVEY") {
      if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="||localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
        window.open(
          "https://webinar.informed.pro/webinar/qa_survey?rdylr=" +
          localStorage.getItem("user_id"),
          "_blank"
        );
      }
    }
  };

  const isAuthenticated = localStorage.getItem("user_id") !== null;

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      {isAuthenticated ? (
        <>
          <Header />

          <div className="default-layout d-flex latest-home">
            <div className="library_create home-layout  d-flex">
              <Row>
                {data.map((item, index) => (
                  <div
                    className={
                      active == index
                        ? "col library_create-box active"
                        : "col library_create-box"
                    }
                    key={index}
                    onClick={() => handleChange(item?.title)}
                  >
                    <div className="create-library-img">
                      <img src={item.image} alt="Content msg Library" />
                    </div>
                    <div className="create-library-content">
                      <h3>{item.title}</h3>
                      <h5>{item.subtitle}</h5>
                    </div>
                  </div>
                ))}
              </Row>
            </div>
            <div className="timeline-layout">
              <div className="timeline-layout-inset">
                <div className="timeline-right-list">
                  <div className="timeline-right-header">
                    <div className="timeline-indicator">
                      <img src={path_image+"informed-circle-icon.svg"} alt=""/>
                    </div>
                    <div className="timeline-date">
                        <h3>LEX-210 Trial</h3>
                        <p>July. 29. 2024 <span>|</span> 3:00 PM  <sub>last update</sub></p>
                    </div>
                    </div>
                    <div className="timeline-box">
                      <div className="timeline-sticky">
                        <div className="timeline-indicator">
                            <span>&nbsp;</span>
                          </div>
                          <div className="timeline-date">
                              <p>July. 29. 2024</p>
                          </div>
                      </div>
                      <div className="timeline-box-inset">
                        <div className="timeline-indicator">
                          <div className="indicator-box">
                            <img src={path_image+"automail.svg"} alt=""/>
                          </div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-status">
                                <p>Auto Email sent</p>
                                <span>8:00 AM </span>
                            </div>
                            <div className="timeline-details">
                                <div className="details-box">
                                    <p className="timeline-details-heading">Type</p>
                                    <p>Open email reminder</p>
                                </div>
                                <div className="details-box">
                                    <p className="timeline-details-heading">Title</p>
                                    <p>Faucibus quisque nuneque ipsum masa euismod phartra donec</p>
                                </div>
                                <div className="details-box">
                                    <p className="timeline-details-heading">To</p>
                                    <div className="d-flex flex-wrap timeline-activity">
                                        <div className="timeline-activity-detail">
                                            <p>IRT Name Faucibus quisque nuneque </p>
                                            <p>Site User-Blinded</p>
                                            <span>210-000</span>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>IRT Name Faucibus quisque nuneque </p>
                                            <p>Site User-Blinded</p>
                                            <span>210-000</span>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>IRT Name Faucibus quisque nuneque </p>
                                            <p>Site User-Blinded</p>
                                            <span>210-000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                      </div>
                      <div className="timeline-box-inset">
                        <div className="timeline-indicator">
                          <div className="indicator-box">
                            <img src={path_image+"irt-training-start.svg"} alt=""/>
                          </div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-status start">
                                <p>IRT Started Training</p>
                                <span>10:20 AM </span>
                            </div>
                            <div className="timeline-details">
                                <div className="details-box">
                                    <p className="timeline-details-heading">What</p>
                                    <p>IRT has started the training but is not finished yet</p>
                                </div>
                                <div className="details-box">
                                    <p className="timeline-details-heading">Who</p>
                                    <div className="d-flex flex-wrap timeline-activity">
                                        <div className="timeline-activity-detail">
                                            <p>IRT Name Faucibus quisque nuneque </p>
                                            <p>Site User-Blinded</p>
                                            <span>210-000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                      </div>
                      <div className="timeline-box-inset">
                        <div className="timeline-indicator">
                          <div className="indicator-box">
                            <img src={path_image+"content-open.svg"} alt=""/>
                          </div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-status">
                                <p>Content Opened</p>
                                <span>2:00 PM </span>
                            </div>
                            <div className="timeline-details">
                              <div className="timeline-article d-flex">
                                <div className="timeline-article-image">
                                  <img src={path_image + "article-open-cover.png"} alt=""/>
                                </div>
                                <div className="timeline-article-detail">
                                  <div className="timeline-title">
                                    <p>Faucibus quisque nuneque ipsum masa euismod phartra donec</p>
                                  </div>
                                  <div className="timeline-subtitle">
                                    <p>Subtitle dolor nibhdolor masa euismod phartra donec</p>
                                    <div className="d-flex align-items-center include-links">
                                      <img src={path_image + "video-img.png"} alt=""/>
                                      <p>Include videos </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                                <div className="details-box">
                                    <p className="timeline-details-heading">Who</p>
                                    <div className="d-flex flex-wrap timeline-activity">
                                        <div className="timeline-activity-detail">
                                            <p>210-000</p>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>210-000</p>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>210-000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                      </div>
                    </div>
                    <div className="timeline-box">
                      <div className="timeline-sticky">
                        <div className="timeline-indicator">
                            <span>&nbsp;</span>
                          </div>
                          <div className="timeline-date">
                              <p>July. 28. 2024</p>
                          </div>
                      </div>
                      <div className="timeline-box-inset">
                        <div className="timeline-indicator">
                          <div className="indicator-box">
                            <img src={path_image+"new-hcp.svg"} alt=""/>
                          </div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-status">
                                <p>New HCP Registered</p>
                                <span>8:00 AM </span>
                            </div>
                            <div className="timeline-details">
                                <div className="details-box">
                                    <p className="timeline-details-heading">What</p>
                                    <p>A new HCP register to LEX-210 library</p>
                                </div>
                                <div className="details-box">
                                    <p className="timeline-details-heading">Who</p>
                                    <div className="d-flex flex-wrap timeline-activity">
                                        <div className="timeline-activity-detail">
                                            <p>HCP Name Faucibus quisque nuneque </p>
                                            <p>IRT role</p>
                                            <span>210-000</span>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>HCP Name Faucibus quisque nuneque </p>
                                            <p>IRT role</p>
                                            <span>210-000</span>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>HCP Name Faucibus quisque nuneque </p>
                                            <p>IRT role</p>
                                            <span>210-000</span>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>HCP Name Faucibus quisque nuneque </p>
                                            <p>IRT role</p>
                                            <span>210-000</span>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>HCP Name Faucibus quisque nuneque </p>
                                            <p>IRT role</p>
                                            <span>210-000</span>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>HCP Name Faucibus quisque nuneque </p>
                                            <p>IRT role</p>
                                            <span>210-000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                      </div>
                      <div className="timeline-box-inset">
                        <div className="timeline-indicator">
                          <div className="indicator-box">
                            <img src={path_image+"irt-traning-complete.svg"} alt=""/>
                          </div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-status complete">
                                <p>IRT Completed Training</p>
                                <span>10:20 AM </span>
                            </div>
                            <div className="timeline-details">
                                <div className="details-box">
                                    <p className="timeline-details-heading">What</p>
                                    <div className="d-flex justify-content-between">
                                      <p>IRT has completed the training and received the certificate</p>
                                      <img src={path_image + "certificate.png"} alt=""/>
                                    </div>
                                </div>
                                <div className="details-box">
                                    <p className="timeline-details-heading">Who</p>
                                    <div className="d-flex flex-wrap timeline-activity">
                                        <div className="timeline-activity-detail">
                                            <p>IRT Name Faucibus quisque nuneque </p>
                                            <p>Site User-Blinded</p>
                                            <span>210-000</span>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>IRT Name Faucibus quisque nuneque </p>
                                            <p>Investigator-Blinded</p>
                                            <span>210-000</span>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>IRT Name Faucibus quisque nuneque </p>
                                            <p>Site Unblinded Pharmacist</p>
                                            <span>210-000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                      </div>
                      <div className="timeline-box-inset">
                        <div className="timeline-indicator">
                          <div className="indicator-box">
                            <img src={path_image+"content-open.svg"} alt=""/>
                          </div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-status">
                                <p>Content Opened</p>
                                <span>2:00 PM </span>
                            </div>
                            <div className="timeline-details">
                              <div className="timeline-article d-flex">
                                <div className="timeline-article-image">
                                  <img src={path_image + "article-open-cover.png"} alt=""/>
                                </div>
                                <div className="timeline-article-detail">
                                  <div className="timeline-title">
                                    <p>Faucibus quisque nuneque ipsum masa euismod phartra donec</p>
                                  </div>
                                  <div className="timeline-subtitle">
                                    <p>Subtitle dolor nibhdolor masa euismod phartra donec</p>
                                    <div className="d-flex align-items-center include-links">
                                      <img src={path_image + "video-img.png"} alt=""/>
                                      <p>Include videos </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                                <div className="details-box">
                                    <p className="timeline-details-heading">Who</p>
                                    <div className="d-flex flex-wrap timeline-activity">
                                        <div className="timeline-activity-detail">
                                            <p>210-000</p>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>210-000</p>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>210-000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                      </div>
                      <div className="timeline-box-inset">
                        <div className="timeline-indicator">
                          <div className="indicator-box">
                            <img src={path_image+"share-materials-icon.svg"} alt=""/>
                          </div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-status">
                                <p>Content Shared</p>
                                <span>2:00 PM </span>
                            </div>
                            <div className="timeline-details">
                              <div className="timeline-article d-flex">
                                <div className="timeline-article-image">
                                  <img src={path_image + "article-open-cover.png"} alt=""/>
                                </div>
                                <div className="timeline-article-detail">
                                  <div className="timeline-title">
                                    <p>Faucibus quisque nuneque ipsum masa euismod phartra donec</p>
                                  </div>
                                  <div className="timeline-subtitle">
                                    <p>Subtitle dolor nibhdolor masa euismod phartra donec</p>
                                    <div className="d-flex align-items-center include-links">
                                      <img src={path_image + "video-img.png"} alt=""/>
                                      <p>Include videos </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                                <div className="details-box">
                                    <p className="timeline-details-heading">Who</p>
                                    <div className="d-flex flex-wrap timeline-activity">
                                        <div className="timeline-activity-detail">
                                            <p>210-000</p>
                                        </div>
                                        <div className="timeline-activity-detail">
                                            <p>210-000</p>
                                        </div>
  
                                    </div>
                                </div>
                            </div>
                        </div>

                      </div>
                    </div>

                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default SetLayoutNew
