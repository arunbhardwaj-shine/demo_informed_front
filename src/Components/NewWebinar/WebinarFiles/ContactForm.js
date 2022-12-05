import React from "react";

import { Col, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
const ContactForm = () => {
  const path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  return (
    <>
      <Col className="col right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header webinar-view">
              <div className="page-title">
                <h2>Contacts</h2>
              </div>

              <div className="top-right-action">
                  <div className="col">
                <div className="select-event">
                    <label>Select Event</label>
                    <Dropdown>
                      <Dropdown.Toggle variant="default">
                        1:1 meeting with IBU Haematology
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#">
                          1:1 meeting with IBU Haematology
                        </Dropdown.Item>
                        <Dropdown.Item href="#">PUP haematology</Dropdown.Item>
                        <Dropdown.Item href="#">
                          Making informed treatment decisions in previously
                          untreated patients with severe haemophilia A
                        </Dropdown.Item>
                        <Dropdown.Item href="#">PUP haematology</Dropdown.Item>
                        <Dropdown.Item href="#">Haematology</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="col">
                <div className="search-bar">
                  <form
                    className="d-flex"
                    // onSubmit={(e) => submitHandler(e)}
                  >
                     <label>Search</label>
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      // onChange={(e) => searchChange(e)}
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
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>
                </div>
              </div>
            </div>
          </Row>
          <div className="selected-webinar-list">
            <table className="table webinar-reader">
              <thead className="sticky-header">
                <tr>
                  <th scope="col">User Email(Contacts)</th>
                  <th scope="col">Speaker</th>
                  <th scope="col">Questions Related To</th>
                  <th scope="col">Additional Detail </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="form-group">
                <tr className="seprator-add">
                  <td colspan="5"></td>
                </tr>
                <tr id={`row-selected`}>
                  <td id={`field_name`}>
                    <span> {"Anuj" + " " + "Sharma"} </span>
                  </td>

                  <td id={`field_email`}>{"risindezires@gmail.com"}</td>

                  <td id={`field_bounced`}>0</td>

                  <td id="field_business_unit">ibu</td>
                  <td id="field_business_unit">yes</td>
                </tr>

                <tr id={`row-selected`}>
                  <td id={`field_name`}>
                    <span> {"Anuj" + " " + "Sharma"} </span>
                  </td>
                  <td id={`field_email`}>{"risindezires@gmail.com"}</td>
                  <td id={`field_bounced`}>0</td>
                  <td id="field_business_unit">ibu</td>
                  <td id="field_business_unit">No</td>
                </tr>
                <tr id={`row-selected`}>
                  <td id={`field_name`}>
                    <span> {"Anuj" + " " + "Sharma"} </span>
                  </td>
                  <td id={`field_email`}>{"risindezires@gmail.com"}</td>
                  <td id={`field_bounced`}>0</td>
                  <td id="field_business_unit">ibu</td>
                  <td id="field_business_unit">yes</td>
                </tr>

                <tr id={`row-selected`}>
                  <td id={`field_name`}>
                    <span> {"Anuj" + " " + "Sharma"} </span>
                  </td>

                  <td id={`field_email`}>{"risindezires@gmail.com"}</td>

                  <td id={`field_bounced`}>0</td>

                  <td id="field_business_unit">ibu</td>
                  <td id="field_business_unit">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Col>
    </>
  );
};
export default ContactForm;
