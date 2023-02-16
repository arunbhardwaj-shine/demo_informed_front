import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const data = [
  {
    image: `${path_image}create-icon.png`,
    title: "Create",
    subtitle: "Upload Content here to create  a new 1ClickLink",
  },
  {
    image: `${path_image}edit-icon.png`,
    title: "Edit",
    subtitle: "Change or Replace an existing 1ClickLink from here",
  },
  {
    image: `${path_image}link-icon.png`,
    title: "New SubLink",
    subtitle: "SubLinks leads to 1ClickLinks but are tracked seperately",
  },
  {
    image: `${path_image}popup-icon.png`,
    title: "Set Pop up",
    subtitle: "Update and add the Pop up text and design from here",
  },
  {
    image: `${path_image}topics.png`,
    title: "Topics",
    subtitle: "Add new or delete an existing topic",
  },
];

const LibraryCreate = () => {
  const navigate = useNavigate();
  let [active, setActive] = useState();
  const handleChange = (value) => {
    setActive(value);
    if (value == 0) {
      navigate("/library-create-user");
    } else if (value == 1) {
      navigate("/library-edit", {
        state: {
          data: "edit",
        },
      });
    } else if (value == 2) {
      navigate("/library-sublink", {
        state: {
          data: "sublink",
        },
      });
    }
    else if (value == 4) {
      navigate("/library-topics", {
        state: {
          data: "sublink",
        },
      });
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
              <div className="top-right-action">
                <div className="search-bar">
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      id="email_search"
                      //    onChange={(e) => searchChange(e)}
                    />
                    <button className="btn btn-outline-success" type="submit">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z"
                          fill="#97B6CF"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
                <div className={"filter-by nav-item dropdown"}>
                  <button
                    className="btn btn-secondary dropdown"
                    type="button"
                    id="dropdownMenuButton2"
                  >
                    Filter By
                    <svg
                      className="close-arrow"
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="2.09896"
                        height="15.1911"
                        rx="1.04948"
                        transform="matrix(0.720074 0.693897 -0.720074 0.693897 11.0977 0)"
                        fill="#0066BE"
                      />
                      <rect
                        width="2.09896"
                        height="15.1911"
                        rx="1.04948"
                        transform="matrix(0.720074 -0.693897 0.720074 0.693897 0 1.45898)"
                        fill="#0066BE"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Row>
          <Row>
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

export default LibraryCreate;
