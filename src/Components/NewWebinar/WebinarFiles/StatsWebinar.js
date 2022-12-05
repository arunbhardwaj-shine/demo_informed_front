import React from "react";
import { Col, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

const StatsWebinar = () => {
  const [eventSelected, setEventSelected] = useState("testing");
  const [userType, setUserType] = useState("HCP");
  const [reportType, setReportType] = useState("All");

  const userTypeClicked = (e) => {
    console.log(e);
    setUserType(e);
  };

  const eventDropDownClicked = (e) => {
    console.log(e);
    setEventSelected(e);
  };

  const reportDropDownClicked = (e) => {
    console.log(e);
    setReportType(e);
  };
  return (
    <>
      <Col className="col right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header webinar-view">
              <div className="top-right-action left-sided">
                <div className="col">
                  <div className="select-event">
                    <label>Select Event</label>
                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                      title={eventSelected}
                      onSelect={(event) => eventDropDownClicked(event)}
                    >
                      <Dropdown.Item eventKey="testing">testing</Dropdown.Item>
                      <Dropdown.Item eventKey="ISTH 2020">
                        ISTH 2020
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
                <div className="col">
                  <div className="select-event">
                    <label>Select Type</label>
                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                      title={userType}
                      onSelect={(event) => userTypeClicked(event)}
                    >
                      <Dropdown.Item eventKey="HCP">HCP</Dropdown.Item>
                      <Dropdown.Item eventKey="HCP team">
                        HCP team
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Staff User">
                        Staff User
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Distributor">
                        Distributor
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Test user">
                        Test user
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>

                <div className="col">
                  <div className="select-event">
                    <label>Select Report Type</label>
                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                      title={reportType}
                      onSelect={(event) => reportDropDownClicked(event)}
                    >
                      <Dropdown.Item eventKey="All">All</Dropdown.Item>
                      <Dropdown.Item eventKey="Poll"> Poll</Dropdown.Item>
                      <Dropdown.Item eventKey="Survey">Survey</Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </div>
              <div className="top-right-action right-sided">
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
                <div className="col">
                  <div className="smart-list-download">
                    <button
                      id="test-table-xls-button"
                      class="btn btn-outline-primary"
                      type="button"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="top-header webinar-view">
              <div className="page-title">
                <h2>Webinar Stats</h2>
              </div>
              <div className="show-event-date">
                <p>Event Date : 20-04-2023</p>
              </div>
            </div>
          </Row>
          <div className="selected-hcp-list">
            <table className="table webinar-reader" id="table-to-xls">
              <thead className="sticky-header">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Country</th>
                  <th scope="col">Webinar Watched </th>
                  <th scope="col">Start Time</th>
                  <th scope="col">End Time</th>
                  <th scope="col">Spent Time</th>
                </tr>
              </thead>
              <tbody className="form-group">
                <tr className="seprator-add">
                  <td colspan="7"></td>
                </tr>
                <tr id={`row-selected`}>
                  <td id={`field_name`}>
                    <span> {"Anuj" + " " + "Sharma"} </span>
                  </td>

                  <td id={`field_email`}>{"risindezires@gmail.com"}</td>

                  <td id={`field_bounced`}>0</td>

                  <td id="field_business_unit">ibu</td>
                  <td id="field_business_unit">yes</td>
                  <td id="field_business_unit">2</td>
                  <td id="field_business_unit">3</td>
                </tr>

                <tr id={`row-selected`}>
                  <td id={`field_name`}>
                    <span> {"Anuj" + " " + "Sharma"} </span>
                  </td>
                  <td id={`field_email`}>{"risindezires@gmail.com"}</td>
                  <td id={`field_bounced`}>0</td>
                  <td id="field_business_unit">ibu</td>
                  <td id="field_business_unit">No</td>
                  <td id="field_business_unit">2</td>
                  <td id="field_business_unit">3</td>
                </tr>
                <tr id={`row-selected`}>
                  <td id={`field_name`}>
                    <span> {"Anuj" + " " + "Sharma"} </span>
                  </td>
                  <td id={`field_email`}>{"risindezires@gmail.com"}</td>
                  <td id={`field_bounced`}>0</td>
                  <td id="field_business_unit">ibu</td>
                  <td id="field_business_unit">yes</td>
                  <td id="field_business_unit">2</td>
                  <td id="field_business_unit">3</td>
                </tr>

                <tr id={`row-selected`}>
                  <td id={`field_name`}>
                    <span> {"Anuj" + " " + "Sharma"} </span>
                  </td>

                  <td id={`field_email`}>{"risindezires@gmail.com"}</td>

                  <td id={`field_bounced`}>0</td>

                  <td id="field_business_unit">ibu</td>
                  <td id="field_business_unit">No</td>
                  <td id="field_business_unit">2</td>
                  <td id="field_business_unit">3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Col>
    </>
  );
};
export default StatsWebinar;
