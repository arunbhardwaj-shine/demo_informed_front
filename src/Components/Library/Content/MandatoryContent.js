import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import Header from "./HeaderComponent/Header";

function MandatoryContent() {
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const navigate = useNavigate();
  let data = [
    {
      image: `${path_image}site-user-blinded.svg`,
      title: "Site User-Blinded",
    },
    {
      image: `${path_image}investigator-blinded.svg`,
      title: "Investigator-Blinded",
    },

    {
      image: `${path_image}blinded-pharmacist.svg`,
      title: "Site Unblinded Pharmacist",
    },
  ];
  let [active, setActive] = useState();

  const handleChange = (value) => {
    setActive(value);
  };

  const navigateToLibraryList = (title) => {
    navigate("/library-mandatory-content", { state: { title } });
  };

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header sticky">
              <div className="page-title">
                <h2>Mandatory Content</h2>
              </div>
            </div>
            <div className="library_create d-flex library-mandatory">
              {data.map((item, index) => (
                <div
                  className={
                    active == index
                      ? "col library_create-box active"
                      : "col library_create-box"
                  }
                  onClick={() => navigateToLibraryList(item?.title)}
                >
                  <div className="create-library-img">
                    <img src={item.image} alt="Content msg Library" />
                  </div>
                  <div
                    className="create-library-content"
                    // onClick={() => navigateToLibraryList(item?.title)}
                  >
                    <h3>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
}

export default MandatoryContent;
