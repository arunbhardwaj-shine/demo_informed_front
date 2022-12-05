import { useScrollTrigger } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import Select, { createFilter } from "react-select";
import SimpleReactValidator from "simple-react-validator";
import DropdownButton from "react-bootstrap/DropdownButton";
import { toast } from "react-toastify";

const EventCreate = () => {
  const path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [descriptionEdit, setDesciptionEdit] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [addEventClicked, setAddEventClicked] = useState(false);

  const [renderAfterValidation, setRenderAfterValidation] = useState(0);

  const [eventDate, setEventDate] = useState("");

  const [eventCode, setEventCode] = useState("");

  const [timezone, setTimezone] = useState("BST");
  const [validator] = React.useState(new SimpleReactValidator());
  const [date, setDate] = useState("");

  const [codeEdit, setCodeEdit] = useState("");

  const [contactType, setContactType] = useState("Hamatology");

  const [eventDescription, setEventDescription] = useState("");

  const [eventName, setEventName] = useState("");
  const [country, setCountry] = useState("Africa/johnanesburg");

  const [startTime, setStartTime] = useState("2:1");

  const [endTime, setEndTime] = useState("2:1");

  const [eventTitle, setEventTitle] = useState("");

  const onContactTypeChange = (e) => {
    setContactType(e);
  };

  const onTimezoneChange = (e) => {
    setTimezone(e);
  };

  const onCountryChange = (e) => {
    setCountry(e);
  };

  const startTimeChange = (e) => {
    setStartTime(e);
  };

  const onEndTimeChange = (e) => {
    setEndTime(e);
  };

  const saveClicked = (e) => {
    e.preventDefault();

    if (eventTitle == "") {
      toast.warning("Title is a required field");
    } else if (eventDate == "") {
      toast.warning("Event Date is a required field");
    } else if (eventCode == "") {
      toast.warning("Event Code is a required field");
    } else if (eventDescription == "") {
      toast.warning("Event description is a required field");
    }
  };

  const saveEditClicked = () => {};

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
                      className="btn btn-primary"
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
                              <svg
                                width="52"
                                height="52"
                                viewBox="0 0 52 52"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g filter="url(#filter0_d_698_5305)">
                                  <rect
                                    x="6"
                                    y="5"
                                    width="40"
                                    height="40"
                                    rx="20"
                                    fill="white"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M18.1661 27.8329C17.9976 28.0151 17.8798 28.2448 17.8262 28.4959L17.0103 32.3182C16.847 33.0833 17.4812 33.7689 18.1889 33.5924L21.7245 32.7103C21.9568 32.6524 22.1693 32.525 22.3379 32.3428L31.932 21.9707C32.6545 21.1897 32.6545 19.9234 31.932 19.1423L30.3766 17.4608C29.6541 16.6797 28.4828 16.6797 27.7603 17.4608L18.1661 27.8329ZM18.5079 31.9734L19.1707 28.8682L26.5408 20.9005L28.7503 23.2891L21.3802 31.2568L18.5079 31.9734ZM29.7314 22.2284L27.5219 19.8398L28.7414 18.5214C28.922 18.3262 29.2149 18.3262 29.3955 18.5214L30.9509 20.203C31.1315 20.3982 31.1315 20.7148 30.9509 20.9101L29.7314 22.2284Z"
                                    fill="#0066BE"
                                  />
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d_698_5305"
                                    x="0"
                                    y="0"
                                    width="52"
                                    height="52"
                                    filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB"
                                  >
                                    <feFlood
                                      flood-opacity="0"
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                      result="hardAlpha"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="3" />
                                    <feComposite
                                      in2="hardAlpha"
                                      operator="out"
                                    />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0.4 0 0 0 0 0.745098 0 0 0 0.2 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow_698_5305"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow_698_5305"
                                      result="shape"
                                    />
                                  </filter>
                                </defs>
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
                              <svg
                                width="52"
                                height="52"
                                viewBox="0 0 52 52"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g filter="url(#filter0_d_698_5305)">
                                  <rect
                                    x="6"
                                    y="5"
                                    width="40"
                                    height="40"
                                    rx="20"
                                    fill="white"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M18.1661 27.8329C17.9976 28.0151 17.8798 28.2448 17.8262 28.4959L17.0103 32.3182C16.847 33.0833 17.4812 33.7689 18.1889 33.5924L21.7245 32.7103C21.9568 32.6524 22.1693 32.525 22.3379 32.3428L31.932 21.9707C32.6545 21.1897 32.6545 19.9234 31.932 19.1423L30.3766 17.4608C29.6541 16.6797 28.4828 16.6797 27.7603 17.4608L18.1661 27.8329ZM18.5079 31.9734L19.1707 28.8682L26.5408 20.9005L28.7503 23.2891L21.3802 31.2568L18.5079 31.9734ZM29.7314 22.2284L27.5219 19.8398L28.7414 18.5214C28.922 18.3262 29.2149 18.3262 29.3955 18.5214L30.9509 20.203C31.1315 20.3982 31.1315 20.7148 30.9509 20.9101L29.7314 22.2284Z"
                                    fill="#0066BE"
                                  />
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d_698_5305"
                                    x="0"
                                    y="0"
                                    width="52"
                                    height="52"
                                    filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB"
                                  >
                                    <feFlood
                                      flood-opacity="0"
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                      result="hardAlpha"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="3" />
                                    <feComposite
                                      in2="hardAlpha"
                                      operator="out"
                                    />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0.4 0 0 0 0 0.745098 0 0 0 0.2 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow_698_5305"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow_698_5305"
                                      result="shape"
                                    />
                                  </filter>
                                </defs>
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
                              <svg
                                width="52"
                                height="52"
                                viewBox="0 0 52 52"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g filter="url(#filter0_d_698_5305)">
                                  <rect
                                    x="6"
                                    y="5"
                                    width="40"
                                    height="40"
                                    rx="20"
                                    fill="white"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M18.1661 27.8329C17.9976 28.0151 17.8798 28.2448 17.8262 28.4959L17.0103 32.3182C16.847 33.0833 17.4812 33.7689 18.1889 33.5924L21.7245 32.7103C21.9568 32.6524 22.1693 32.525 22.3379 32.3428L31.932 21.9707C32.6545 21.1897 32.6545 19.9234 31.932 19.1423L30.3766 17.4608C29.6541 16.6797 28.4828 16.6797 27.7603 17.4608L18.1661 27.8329ZM18.5079 31.9734L19.1707 28.8682L26.5408 20.9005L28.7503 23.2891L21.3802 31.2568L18.5079 31.9734ZM29.7314 22.2284L27.5219 19.8398L28.7414 18.5214C28.922 18.3262 29.2149 18.3262 29.3955 18.5214L30.9509 20.203C31.1315 20.3982 31.1315 20.7148 30.9509 20.9101L29.7314 22.2284Z"
                                    fill="#0066BE"
                                  />
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d_698_5305"
                                    x="0"
                                    y="0"
                                    width="52"
                                    height="52"
                                    filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB"
                                  >
                                    <feFlood
                                      flood-opacity="0"
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                      result="hardAlpha"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="3" />
                                    <feComposite
                                      in2="hardAlpha"
                                      operator="out"
                                    />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0.4 0 0 0 0 0.745098 0 0 0 0.2 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow_698_5305"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow_698_5305"
                                      result="shape"
                                    />
                                  </filter>
                                </defs>
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
        id="add_hcp"
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
              onClick={() => {
                setAddEventClicked(false);
                setEventTitle("");
                setEventCode("");
                setEventDescription("");
              }}
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
                                onChange={(event) =>
                                  setEventTitle(event.target.value)
                                }
                                value={eventTitle}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">BU</label>
                              <DropdownButton
                                className="dropdown-basic-button split-button-dropup"
                                title={contactType}
                                onSelect={(event) => onContactTypeChange(event)}
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="Hamatology"
                                    // className={"active"}
                                  >
                                    Hamatology
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Critical Care"
                                    // className={"active"}
                                  >
                                    Critical Care
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Immunotherapy"
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
                                title={timezone}
                                onSelect={(event) => onTimezoneChange(event)}
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="BST"
                                    // className={"active"}
                                  >
                                    BST
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="CDT"
                                    // className={"active"}
                                  >
                                    CDT
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="IST"
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
                                title={country}
                                onSelect={(event) => onCountryChange(event)}
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="Africa/johnanesburg"
                                    // className={"active"}
                                  >
                                    Africa/johnanesburg
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="America/Chicago"
                                    // className={"active"}
                                  >
                                    America/Chicago
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="Asia/Kolkata"
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
                                onChange={(event) =>
                                  setEventDate(event.target.value)
                                }
                                value={eventDate}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for=""> Event Start Time</label>
                              <DropdownButton
                                className="dropdown-basic-button split-button-dropup"
                                title={startTime}
                                onSelect={(event) => startTimeChange(event)}
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="2:1"
                                    // className={"active"}
                                  >
                                    2:1
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="4:2"
                                    // className={"active"}
                                  >
                                    4:2
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="7:2"
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
                                title={endTime}
                                onSelect={(event) => onEndTimeChange(event)}
                              >
                                <div className="scroll_div">
                                  <Dropdown.Item
                                    eventKey="5:1"
                                    // className={"active"}
                                  >
                                    5:1
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="7:4"
                                    // className={"active"}
                                  >
                                    7:4
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="7:3"
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
                                onChange={(event) =>
                                  setEventCode(event.target.value)
                                }
                                value={eventCode}
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
                                onChange={(event) =>
                                  setEventDescription(event.target.value)
                                }
                                value={eventDescription}
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
              onClick={(e) => {
                saveClicked(e);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        id="add_hcp"
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
                                onChange={(event) =>
                                  setEventName(event.target.value)
                                }
                                value={eventName}
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
                                onChange={(e) => setDate(e.target.value)}
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
                                onChange={(event) =>
                                  setCodeEdit(event.target.value)
                                }
                                value={codeEdit}
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
                                onChange={(event) =>
                                  setDesciptionEdit(event.target.value)
                                }
                                value={descriptionEdit}
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
              onClick={saveEditClicked}
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setEditEvent(false)}
              className="btn btn-primary save btn-filled"
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
