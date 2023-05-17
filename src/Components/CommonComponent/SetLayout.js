import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Header from "./HeaderComponent/Header";
import { Route, Navigate, useNavigate } from "react-router-dom";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const SetLayout = () => {
  const data = [
    {
      image: `${path_image}library-icon.svg`,
      title: "Library",
      subtitle: "Create and edit content, see all of your content here",
    },
    {
      image: `${path_image}crm-icon.svg`,
      title: "CRM",
      subtitle: "See who read what, their RTR-activity and their habits",
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
    {
      image: `${path_image}webinar-icon.svg`,
      title: "Webinar",
      subtitle: "See Webinar Event users",
    },
  ];
  const navigate = useNavigate();
  let [active, setActive] = useState();
  const handleChange = (value) => {
    setActive(value);
    if (value == 0) {
      navigate("/library-content");
    } else if (value == 1) {
      navigate("/readers-view");
    } else if (value == 2) {
      localStorage.getItem("group_id") == 2
        ? navigate("/content-analytics")
        : localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ=="
        ? navigate("/totalhcp")
        : localStorage.getItem("user_id") == "iSnEsKu5gB/DRlycxB6G4g=="
        ? navigate("/octalatch-totalhcp")
        : navigate("/content-analytics");
    } else if (value == 3) {
      navigate("/EmailList");
    } else if (value == 4) {
      // navigate("/");
      console.log("webinar ");
      if (
        typeof localStorage.getItem("webinar_flag") !== "undefined" &&
        localStorage.getItem("webinar_flag") == 1 &&
        localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg=="
      ) {
        console.log("------>");

        navigate(
          "https://informed.pro/Webinar/readers_webinar?rdylr=" +
            localStorage.getItem("user_id")
        );
      }

      // {
      //   localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ? (
      //     <li className="nav-item">
      //       <a
      //         className="nav-link"
      //         target="_blank"
      //         href={
      //           "https://informed.pro/webinar/qa_survey?rdylr=" +
      //           localStorage.getItem("user_id")
      //         }
      //       >
      //         Q&A/SURVEY
      //       </a>
      //     </li>
      //   ) : (
      //     ""
      //   );
      // }
    }
  };

  const isAuthenticated = localStorage.getItem("user_id") !== null;

  return (
    <>
      {isAuthenticated ? (
        <>
          <Header />
           <div className="default-layout">
            <div className="landing-layout library_create d-flex">
              <Row>
                {data.map((item, index) => (
                  <div
                    className={
                      active == index
                        ? "col library_create-box active"
                        : "col library_create-box"
                    }
                    key={index}
                    onClick={() => handleChange(index)}
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
          </div>
        </>
      ) : (
        <Navigate to="/informed" />
      )}
    </>
  );
};

export default SetLayout;
