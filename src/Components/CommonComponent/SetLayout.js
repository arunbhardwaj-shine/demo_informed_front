import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Header from "./HeaderComponent/Header";
import { Route, Navigate, useNavigate } from "react-router-dom";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const SetLayout = () => {
  let dummyData = [
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
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
      newdata.push({
        image: `${path_image}license-icon.svg`,
        title: "Q&A/SURVEY",
        subtitle: "Manage your polls and survey here",
      });
    }
    if (
      typeof localStorage.getItem("webinar_flag") !== "undefined" &&
      localStorage.getItem("webinar_flag") == 1 &&
      localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg==" &&
      // localStorage.getItem("user_id") != "wW0geGtDPvig5gF 6KbJrg==" &&
      localStorage.getItem("user_id") != "UbCJcnLM9fe HsRMgX8c1A==" &&
      localStorage.getItem("user_id") != "z2TunmZQf3QwCsICFTLGGQ==" &&
      localStorage.getItem("user_id") != "qDgwPdToP05Kgzc g2VjIQ=="
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
      navigate("/readers-view");
    } else if (title == "Analytics") {
      localStorage.getItem("group_id") == 2
        ? navigate("/content-analytics")
        : localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ=="
        ? navigate("/totalhcp")
        : localStorage.getItem("user_id") == "iSnEsKu5gB/DRlycxB6G4g=="
        ? navigate("/octalatch-totalhcp")
        : localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
        ? navigate("/LEX-210-analytics")
        : navigate("/content-analytics");
    } else if (title == "Email") {
      navigate("/EmailList");
    } else if (title == "Webinar") {
      if (
        typeof localStorage.getItem("webinar_flag") !== "undefined" &&
        localStorage.getItem("webinar_flag") == 1 &&
        localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg=="
      ) {
        window.open(
          "https://webinar.informed.pro/Webinar/readers_webinar?rdylr=" +
            localStorage.getItem("user_id"),
          "_blank"
        );
      }
    } else if (title == "Licensed") {
      // navigate("/license-content");
      // navigate("/license-content");
      navigate("/license-content");
    } else if (title == "Q&A/SURVEY") {
      if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
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
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default SetLayout;
