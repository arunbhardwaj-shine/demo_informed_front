import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const data = [
  {
    image: `${path_image}create-icon.png`,
    title: "Create",
    subtitle: "Upload Content here to create  a new Docintel Link",
  },
  {
    image: `${path_image}edit-icon.png`,
    title: "Edit",
    subtitle: "Change or Replace an existing Docintel Link from here",
  },
  {
    image: `${path_image}link-icon.png`,
    title: "New SubLink",
    subtitle: "SubLinks leads to Docintel Link but are tracked seperately",
  },
  {
    image: `${path_image}popup-icon.png`,
    title: "Set Pop up",
    subtitle: "Update and add the Pop up text and design from here",
  },
  {
    image: `${path_image}topics.png`,
    title: "Topics & Products",
    subtitle: "Add new or delete an existing topic and product",
  },
];

// if(localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg=="){
//     const newObj = {
//       image: `${path_image}topics.png`,
//       title: "Topics",
//       subtitle: "Add new or delete an existing topic",
//     };
//     data.push(newObj);
// }



const LibraryCreate = () => {
  const navigate = useNavigate();
  let [active, setActive] = useState();
  const handleChange = (value) => {
    setActive(value);
    if (value == 0) {
      navigate("/library-create-user");
    } else if (value == 1) {
      navigate("/library-edit-listing", {
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
    } else if (value == 3) {
      navigate("/set-popup");
    } else if (value == 4) {
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

export default LibraryCreate;
