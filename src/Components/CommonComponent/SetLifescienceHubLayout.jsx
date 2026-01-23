import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./HeaderComponent/Header";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const SetLifescienceHubLayout = () => {

  const isHubAccount =
    localStorage.getItem("user_id") === "HPW6EwQy6v8VrfnMsjz8tg==";

  const dummyData = [
    {
      image: `${path_image}crm-icon.svg`,
      title: "Trials",
      subtitle: "See who read what, their RTR-activity and their habits",
      link: "/trials",
    },
    {
      image: `${path_image}library-icon.svg`,
      title: "Library",
      subtitle: "Create and edit content, see all of your content here",
      link: "/library-content",
    },
    {
      image: `${path_image}email-icon1.svg`,
      title: "Email",
      subtitle: "Send and resend an email, and work with your lists",
      link: "/EmailStatss",
    },
    {
      image: `${path_image}Survey_home_icon.svg`,
      title: "Survey",
      subtitle: "Make surveys to hear what they think",
      link: "/survey/survey-list",
    },
    {
      image: `${path_image}webinar-icon.svg`,
      title: "Meetings",
      subtitle: "Check the engagement rates, dig into readers and content",
      link: "/webinar/event-listing",
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    let newdata = [...dummyData];

    if (
      (localStorage.getItem("webinar_flag") == 1) ||
      isHubAccount
    ) {
      newdata.push({
        image: `${path_image}analytics-icon.svg`,
        title: "Analytics",
        subtitle: "Check the engagement rates, dig into readers and content",
        link: "/Trial-analytics",
      });
    }

    setData(newdata);
  }, []);

  const navigate = useNavigate();
  const [active, setActive] = useState();

 const handleChange = (title) => {
  setActive(title);

  if (title === "Library") {
    navigate("/library-content");
  }
  else if (title === "Trials") {
     navigate("/trials");
  } 

  else if (title === "Analytics") {
    navigate("/Trial-analytics");
  }

  else if (title === "Email") {
    navigate("/EmailStatss");
  }
  
  else if (title === "Meetings") {
    if (localStorage.getItem("webinar_flag") == 1 || isHubAccount) {
      navigate("/webinar/event-listing");
    }

  }  else if (title === "Survey") {
    navigate("/survey/survey-list");
  }
};


  const isAuthenticated = localStorage.getItem("user_id") !== null;
      console.log("data",data)
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {isAuthenticated ? (
        <>
          <Header />
          <div className="default-layout">
            <div className="landing-layout library_create d-flex">
              <Row>
                {data.map((item, index) => (
                  <div
                    key={index}
                    className={
                      active === index
                        ? "col library_create-box active"
                        : "col library_create-box"
                    }
                    onClick={() => handleChange(item.title)}
                  >
                    <div className="create-library-img">
                      <img src={item.image} alt={item.title} />
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

export default SetLifescienceHubLayout;
