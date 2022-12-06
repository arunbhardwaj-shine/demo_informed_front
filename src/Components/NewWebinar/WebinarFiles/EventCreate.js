import { useScrollTrigger } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import Select, { createFilter } from "react-select";
import DropdownButton from "react-bootstrap/DropdownButton";

const EventCreate = () => {
  const path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [isOpen, setIsOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [addEventClicked, setAddEventClicked] = useState(false);

  return (
    <>
      <Col className="col right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title">
                <h2>Create Event</h2>
              </div>

              <div className="top-right-action">
                <div className="select-event">
                  <div className="col">
                    <button
                      className="btn btn-primary btn-filled"
                      onClick={() => {
                        setAddEventClicked(true);
                      }}
                    >
                      Add Event
                    </button>
                  </div>
                </div>
                <div className="search-bar">
                  <form
                    className="d-flex"
                    // onSubmit={(e) => submitHandler(e)}
                  >
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
          </Row>
          <div className="selected-webinar-list">
            <table className="table webinar-reader">
              <thead className="sticky-header">
                <tr>
                  <th scope="col">Event Date</th>
                  <th scope="col">Title</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="form-group">
                <tr className="seprator-add">
                  <td colspan="9"></td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Infoshiv</td>
                  <td className="table_action">
                    <table>
                      <tbody>
                        <tr>
                          <td onClick={() => setEditEvent(true)}>
                            <a href="#">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.15259 11.8329C1.97037 12.0151 1.84302 12.2448 1.78507 12.4959L0.903019 16.3182C0.726463 17.0833 1.41215 17.7689 2.17722 17.5924L5.99946 16.7103C6.25056 16.6524 6.48033 16.525 6.66255 16.3428L17.0346 5.97075C17.8157 5.1897 17.8157 3.92337 17.0346 3.14232L15.3531 1.46079C14.572 0.679739 13.3057 0.679736 12.5247 1.46079L2.15259 11.8329ZM2.52201 15.9734L3.2386 12.8682L11.2063 4.90046L13.5949 7.2891L5.62724 15.2568L2.52201 15.9734ZM14.6556 6.22844L12.267 3.8398L13.5853 2.52145C13.7806 2.32618 14.0972 2.32618 14.2924 2.52145L15.974 4.20298C16.1692 4.39824 16.1692 4.71483 15.974 4.91009L14.6556 6.22844Z" fill="#0066BE"/>
                              </svg>
                            </a>
                          </td>

                          <td onClick={() => setIsOpen(true)}>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="#c50e0e"
                                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                                />
                              </svg>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Infoshiv</td>

                  <td className="table_action">
                    <table>
                      <tbody>
                        <tr>
                          <td onClick={() => setEditEvent(true)}>
                            <a href="#">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.15259 11.8329C1.97037 12.0151 1.84302 12.2448 1.78507 12.4959L0.903019 16.3182C0.726463 17.0833 1.41215 17.7689 2.17722 17.5924L5.99946 16.7103C6.25056 16.6524 6.48033 16.525 6.66255 16.3428L17.0346 5.97075C17.8157 5.1897 17.8157 3.92337 17.0346 3.14232L15.3531 1.46079C14.572 0.679739 13.3057 0.679736 12.5247 1.46079L2.15259 11.8329ZM2.52201 15.9734L3.2386 12.8682L11.2063 4.90046L13.5949 7.2891L5.62724 15.2568L2.52201 15.9734ZM14.6556 6.22844L12.267 3.8398L13.5853 2.52145C13.7806 2.32618 14.0972 2.32618 14.2924 2.52145L15.974 4.20298C16.1692 4.39824 16.1692 4.71483 15.974 4.91009L14.6556 6.22844Z" fill="#0066BE"/>
                              </svg>
                            </a>
                          </td>

                          <td onClick={() => setIsOpen(true)}>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="#c50e0e"
                                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                                />
                              </svg>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Infoshiv</td>

                  <td className="table_action">
                    <table>
                      <tbody>
                        <tr>
                          <td onClick={() => setEditEvent(true)}>
                            <a href="#">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.15259 11.8329C1.97037 12.0151 1.84302 12.2448 1.78507 12.4959L0.903019 16.3182C0.726463 17.0833 1.41215 17.7689 2.17722 17.5924L5.99946 16.7103C6.25056 16.6524 6.48033 16.525 6.66255 16.3428L17.0346 5.97075C17.8157 5.1897 17.8157 3.92337 17.0346 3.14232L15.3531 1.46079C14.572 0.679739 13.3057 0.679736 12.5247 1.46079L2.15259 11.8329ZM2.52201 15.9734L3.2386 12.8682L11.2063 4.90046L13.5949 7.2891L5.62724 15.2568L2.52201 15.9734ZM14.6556 6.22844L12.267 3.8398L13.5853 2.52145C13.7806 2.32618 14.0972 2.32618 14.2924 2.52145L15.974 4.20298C16.1692 4.39824 16.1692 4.71483 15.974 4.91009L14.6556 6.22844Z" fill="#0066BE"/>
                              </svg>
                            </a>
                          </td>

                          <td onClick={() => setIsOpen(true)}>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="#c50e0e"
                                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                                />
                              </svg>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Col>

      <Modal
        id="add_hcp" className="event_edit"
        show={addEventClicked}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          setAddEventClicked(false);
        }}
      >
        <div
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-hidden="true"
        >
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              New Event
            </h5>
            <button
              // onClick={() => {
              //   setIsOpenAdd(false);
              //   setHpc([
              //     {
              //       firstname: "",
              //       lastname: "",
              //       email: "",
              //       contact_type: "",
              //       country: "",
              //       countryIndex: "",
              //     },
              //   ]);
              //   setActiveManual("active");
              //   document.querySelector("#file-4").value = "";
              //   setActiveExcel("");
              // }}
              type="button"
              onClick={() => setAddEventClicked(false)}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="hcp-add-box">
              <div className="hcp-add-form tab-content" id="upload-confirm">
                <form id="add_hcp_form" className={"tab-pane" + "active"}>
                  <>
                    <div className="add_hcp_boxes">
                      <div className="form_action">
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Event Title</label>
                              <input
                                type="text"
                                placeholder="Event Title"
                                className="form-control"
                                // onChange={(event) =>
                                //   onFirstNameChange(event, i)
                                // }
                                // value={val.firstname}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">BU</label>
                              <DropdownButton
                                className="dropdown-basic-button split-button-dropup"
                                title={"Select Type"}
                                // onSelect={(event) =>
                                //   onContactTypeChange(event, i)
                                // }
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="HCP"
                                    // className={"active"}
                                  >
                                    Hamatology
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Staff"
                                    // className={"active"}
                                  >
                                    Critical Care
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Test Users"
                                    // className={"active"}
                                  >
                                    Immunotherapy
                                  </Dropdown.Item>
                                </div>
                              </DropdownButton>
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Timezone</label>
                              <DropdownButton
                                className="dropdown-basic-button split-button-dropup"
                                title={"Select Type"}
                                // onSelect={(event) =>
                                //   onContactTypeChange(event, i)
                                // }
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="HCP"
                                    // className={"active"}
                                  >
                                    BST
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Staff"
                                    // className={"active"}
                                  >
                                    CDT
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Test Users"
                                    // className={"active"}
                                  >
                                    IST
                                  </Dropdown.Item>
                                </div>
                              </DropdownButton>
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for=""> Country</label>
                              <DropdownButton
                                className="dropdown-basic-button split-button-dropup"
                                title={"Select Type"}
                                // onSelect={(event) =>
                                //   onContactTypeChange(event, i)
                                // }
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="HCP"
                                    // className={"active"}
                                  >
                                    Africa/johnanesburg
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Staff"
                                    // className={"active"}
                                  >
                                    America/Chicago
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Test Users"
                                    // className={"active"}
                                  >
                                    Asia/Kolkata
                                  </Dropdown.Item>
                                </div>
                              </DropdownButton>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Event Date</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Event Date"
                                // onChange={(event) =>
                                //   onFirstNameChange(event, i)
                                // }
                                // value={val.firstname}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for=""> Event Start Time</label>
                              <DropdownButton
                                className="dropdown-basic-button split-button-dropup"
                                title={"Select Type"}
                                // onSelect={(event) =>
                                //   onContactTypeChange(event, i)
                                // }
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="HCP"
                                    // className={"active"}
                                  >
                                    2:1
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Staff"
                                    // className={"active"}
                                  >
                                    4:2
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Test Users"
                                    // className={"active"}
                                  >
                                    7:2
                                  </Dropdown.Item>
                                </div>
                              </DropdownButton>
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for=""> Event End Time</label>
                              <DropdownButton
                                className="dropdown-basic-button split-button-dropup"
                                title={"Select Type"}
                                // onSelect={(event) =>
                                //   onContactTypeChange(event, i)
                                // }
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="HCP"
                                    // className={"active"}
                                  >
                                    5:1
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Staff"
                                    // className={"active"}
                                  >
                                    7:4
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Test Users"
                                    // className={"active"}
                                  >
                                    7:3
                                  </Dropdown.Item>
                                </div>
                              </DropdownButton>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Event Code</label>
                              <input
                                type="text"
                                placeholder="Event Code"
                                className="form-control"
                                // onChange={(event) =>
                                //   onFirstNameChange(event, i)
                                // }
                                // value={val.firstname}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Event Description</label>
                              <input
                                type="text"
                                placeholder="Event Description"
                                className="form-control"
                                // onChange={(event) =>
                                //   onFirstNameChange(event, i)
                                // }
                                // value={val.firstname}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hcp-modal-action">
                        <div className="hcp-action-block">
                          <>
                            <div className="hcp-remove">
                              <button
                                type="button"
                                className="btn btn-filled"
                                // onClick={() => deleteRecord(i)}
                              >
                                <img
                                  src={path_image + "delete.svg"}
                                  alt="Add More"
                                />
                              </button>
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                  </>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              // onClick={(e) => {
              //   saveClicked(e);
              // }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        id="add_hcp" className="event_edit"
        show={editEvent}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          setEditEvent(false);
        }}
      >
        <div
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-hidden="true"
        >
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Edit Event
            </h5>
            <button
              // onClick={() => {
              //   setIsOpenAdd(false);
              //   setHpc([
              //     {
              //       firstname: "",
              //       lastname: "",
              //       email: "",
              //       contact_type: "",
              //       country: "",
              //       countryIndex: "",
              //     },
              //   ]);
              //   setActiveManual("active");
              //   document.querySelector("#file-4").value = "";
              //   setActiveExcel("");
              // }}
              type="button"
              onClick={() => setEditEvent(false)}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="hcp-add-box">
              <div className="hcp-add-form tab-content" id="upload-confirm">
                <form id="add_hcp_form" className={"tab-pane" + "active"}>
                  <>
                    <div className="add_hcp_boxes">
                      <div className="form_action">
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Event Title</label>
                              <input
                                type="text"
                                placeholder="Event Title"
                                className="form-control"
                                // onChange={(event) =>
                                //   onFirstNameChange(event, i)
                                // }
                                // value={val.firstname}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">BU</label>
                              <DropdownButton
                                className="dropdown-basic-button split-button-dropup"
                                title={"Select Type"}
                                // onSelect={(event) =>
                                //   onContactTypeChange(event, i)
                                // }
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="HCP"
                                    // className={"active"}
                                  >
                                    Hamatology
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Staff"
                                    // className={"active"}
                                  >
                                    Critical Care
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Test Users"
                                    // className={"active"}
                                  >
                                    Immunotherapy
                                  </Dropdown.Item>
                                </div>
                              </DropdownButton>
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Timezone</label>
                              <DropdownButton
                                className="dropdown-basic-button split-button-dropup"
                                title={"Select Type"}
                                // onSelect={(event) =>
                                //   onContactTypeChange(event, i)
                                // }
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="HCP"
                                    // className={"active"}
                                  >
                                    BST
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Staff"
                                    // className={"active"}
                                  >
                                    CDT
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Test Users"
                                    // className={"active"}
                                  >
                                    IST
                                  </Dropdown.Item>
                                </div>
                              </DropdownButton>
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for=""> Country</label>
                              <DropdownButton
                                className="dropdown-basic-button split-button-dropup"
                                title={"Select Type"}
                                // onSelect={(event) =>
                                //   onContactTypeChange(event, i)
                                // }
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="HCP"
                                    // className={"active"}
                                  >
                                    Africa/johnanesburg
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Staff"
                                    // className={"active"}
                                  >
                                    America/Chicago
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Test Users"
                                    // className={"active"}
                                  >
                                    Asia/Kolkata
                                  </Dropdown.Item>
                                </div>
                              </DropdownButton>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Event Date</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Event Date"
                                // onChange={(event) =>
                                //   onFirstNameChange(event, i)
                                // }
                                // value={val.firstname}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for=""> Event Start Time</label>
                              <DropdownButton
                                className="dropdown-basic-button split-button-dropup"
                                title={"Select Type"}
                                // onSelect={(event) =>
                                //   onContactTypeChange(event, i)
                                // }
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="HCP"
                                    // className={"active"}
                                  >
                                    2:1
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Staff"
                                    // className={"active"}
                                  >
                                    4:2
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Test Users"
                                    // className={"active"}
                                  >
                                    7:2
                                  </Dropdown.Item>
                                </div>
                              </DropdownButton>
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for=""> Event End Time</label>
                              <DropdownButton
                                className="dropdown-basic-button split-button-dropup"
                                title={"Select Type"}
                                // onSelect={(event) =>
                                //   onContactTypeChange(event, i)
                                // }
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="HCP"
                                    // className={"active"}
                                  >
                                    5:1
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Staff"
                                    // className={"active"}
                                  >
                                    7:4
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Test Users"
                                    // className={"active"}
                                  >
                                    7:3
                                  </Dropdown.Item>
                                </div>
                              </DropdownButton>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Event Code</label>
                              <input
                                type="text"
                                placeholder="Event Code"
                                className="form-control"
                                // onChange={(event) =>
                                //   onFirstNameChange(event, i)
                                // }
                                // value={val.firstname}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Event Description</label>
                              <input
                                type="text"
                                placeholder="Event Description"
                                className="form-control"
                                // onChange={(event) =>
                                //   onFirstNameChange(event, i)
                                // }
                                // value={val.firstname}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hcp-modal-action">
                        <div className="hcp-action-block">
                          <>
                            <div className="hcp-remove">
                              <button
                                type="button"
                                className="btn btn-filled"
                                // onClick={() => deleteRecord(i)}
                              >
                                <img
                                  src={path_image + "delete.svg"}
                                  alt="Add More"
                                />
                              </button>
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                  </>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              // onClick={(e) => {
              //   saveClicked(e);
              // }}
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setEditEvent(false)}
              className="btn btn-primary btn-bordered"
              // onClick={(e) => {
              //   saveClicked(e);
              // }}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {console.log(isOpen)}
      <Modal show={isOpen} className="send-confirm" id="resend-confirm">
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              setIsOpen(false);
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <img src={path + "alert.png"} alt="" />
          <h4>
            This event will be deleted.
            <br />
            Are you sure you want to delete it?
          </h4>

          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              // onClick={() => {
              //   deleteReader(profileUserId);
              //   setIsOpen(false);

              //   setOpenDeleteConfirmation(true);
              //   // setUpdatedData(update + 1);
              // }}
            >
              Yes Please!
            </button>

            <button
              type="button"
              className="btn btn-primary btn-bordered light"
              data-bs-dismiss="modal"
              onClick={() => {
                setIsOpen(false);
              }}
              // onClick={() => {
              //   setIsOpen(false);
              // }}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventCreate;
