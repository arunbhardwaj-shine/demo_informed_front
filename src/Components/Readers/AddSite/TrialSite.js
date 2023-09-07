import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const data = [
  {
    image: `${path_image}create-icon.png`,
    title: "Create",
    subtitle: "Create new Site Data",
  },
  {
    image: `${path_image}edit-icon.png`,
    title: "View",
    subtitle: "Site Data Listing",
  }
];


const TrialSite = () => {
  const navigate = useNavigate();
  let [active, setActive] = useState();
  const handleChange = (value) => {
    setActive(value);
    if (value == 0) {
      navigate("/add-site");
    } else if (value == 1) {
      navigate("/site-listing");
    }
  };
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title">
                <h2>Create &amp; Change</h2>
              </div>
            </div>
            <div className="library_create d-flex">
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
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default TrialSite;
