import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { useFormik } from "formik";
import "../webinar.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { date } from "yup";
import Add from "./Add";
const EventData = () => {
  const [event, setEvent] = useState([]);
  const [message, setMessage] = useState();
  const [eventdata, setEventData] = useState([]);
  const [SpDataSingle, setSpDataSingle] = useState();
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [update, setUpdate] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [Speakername, setSpeakerName] = useState([{ name: "", email: "" }]);
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        //  console.log(resp.data)
        setEvent(resp.data.data);
      }
    });
  };
  const handleGetEventlistSerch = (data) => {
    ExportApi.GetEventListSerch(data).then((resp) => {
      if (resp.ok) {
        //  console.log(resp.data)
        console.log(resp.data.data);
        setEvent(resp.data.data);
      }
    });
  };
  const handleGetEventlistEdidData = (val) => {
    ExportApi.GetEventListData(val).then((resp) => {
      if (resp.ok) {
        setModalShow(true);
        setSpDataSingle(resp.data.data.speaker_data);
        setEventData(resp.data.data);
      }
    });
  };
  const handleMaltiInputAdd = () => {
    setSpeakerName([...Speakername, { name: "", email: "" }]);
  };
  const handleSpeakerName = (e, i) => {
    if (e.target.name === `name${i}`) {
      const speker = Speakername[i];
      speker.name = e.target.value;
      Speakername.splice(i, 1, { ...speker });
      setSpeakerName([...Speakername]);
    } else if (e.target.name === `email${i}`) {
      const speker = Speakername[i];
      speker.email = e.target.value;
      Speakername.splice(i, 1, { ...speker });
      setSpeakerName([...Speakername]);
    }
  };

  const sortSelectedUsers = (e) => {
    e.preventDefault();
    //  const dates = ["03/03/2014", "01/03/2014", "02/03/2014", "04/03/2014"];
    let normalArr = [];
    normalArr = event;

    // console.log(normalArr);

    if (sorting == 0) {
      normalArr.sort(function (a, b) {
        let aa = a.event_date.split("/").reverse().join(),
          bb = b.event_date.split("/").reverse().join();

        return aa < bb ? -1 : aa > bb ? 1 : 0;
      });
    } else {
      normalArr.sort(function (a, b) {
        let aa = a.event_date.split("/").reverse().join(),
          bb = b.event_date.split("/").reverse().join();

        return aa > bb ? -1 : aa < bb ? 1 : 0;
      });
    }

    setEvent(normalArr);
    setSorting(1 - sorting);
    setUpdate(update + 1);

    console.log(normalArr);
  };

  const handleMaltiInputRumove = (i) => {
    console.log("i", i);
    Speakername.splice(i, 1);
    setSpeakerName([...Speakername]);
  };
  const formik = useFormik({
    initialValues: {
      EventTitle: eventdata ? eventdata.title : "",
      Description: eventdata ? eventdata.description : "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      let a = JSON.stringify(Speakername);
      ExportApi.GetEventListDataUpdate(
        eventdata.id,
        values.EventTitle,
        Speakername[0].name && Speakername[0].email ? a : null,
        values.Description
      )
        .then((resp) => {
          if (resp.data) {
            if (resp.data.code == 200) {
              setModalShow(false);
              handleGetEventlist();
              toast.success(resp.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              toast.error(resp.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          }
        })
        .catch((err) => console.log(err));
    },
  });

  const closePopup = () => {
    setShow(false);
  };

  useEffect(() => {
    handleGetEventlist();
  }, []);
  return (
    <div style={{ marginLeft: "300px" }}>
      {/* <Row>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Events</h2>
          <Row>
            <Col>
              <Link to="/webinar/event/add">
                <Button>Create Event</Button>
              </Link>
            </Col>
            <Col>
              <Form.Control
                onChange={(e) => {
                  handleGetEventlistSerch(e.target.value);
                }}
                name="Search"
                placeholder="Search......"
              />
            </Col>
          </Row>

          <br />
          <Table bordered hover>
            <thead>
              <tr>
                <th>Event Date</th>
                <th>Event Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {event ? (
                <>
                  {event ? (
                    event?.map((val, i) => (
                      <tr key={i}>
                     
                        <td>{val.event_date}</td>
                        <td>{val.title}</td>
                        <td>
                          <Button
                            onClick={() => handleGetEventlistEdidData(val.id)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <Table bordered hover>
                      <thead>
                        <tr>
                          <th>Event Date</th>
                          <th>Event Title</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tr></tr>
                      <tr>
                        Data Not Found{" "}
                        <Link to="/webinar/event/add" style={{ color: "red" }}>
                          Please create event{" "}
                        </Link>
                      </tr>
                    </Table>
                  )}
                </>
              ) : (
                <h2>
                  Data Not Found{" "}
                  <Link to="/webinar/event/add" style={{ color: "red" }}>
                    Please create event{" "}
                  </Link>
                </h2>
              )}
            </tbody>
          </Table>
          <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header
              onClick={() => {
                setSpeakerName([{ name: "", email: "" }]);
                setModalShow(false);
              }}
              closeButton
            >
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Event
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={formik.handleSubmit}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label column sm={2}>
                    Event Title{" "}
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      name="EventTitle"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.EventTitle}
                    />
                    {formik.touched.EventTitle && formik.errors.EventTitle ? (
                      <div style={{ color: "red" }}>
                        {formik.errors.EventTitle}
                      </div>
                    ) : null}
                  </Col>
                </Form.Group>
                <fieldset className="border p-2">
                  {SpDataSingle?.map((malti, i) => (
                    <Form.Group className="edit-event" key={i}>
                      <Form.Label column sm={3}>
                        Name <h6>{malti.name}</h6>
                      </Form.Label>
                      <Form.Label column sm={3}>
                        Email <h6>{malti.email}</h6>
                      </Form.Label>
                    </Form.Group>
                  ))}
                </fieldset>
                <div class="mt-2 clearfix"></div>

                {Speakername.map((malti, i) => (
                  <fieldset class="border p-2">
                    <div key={i}>
                      {Speakername.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => handleMaltiInputRumove(i)}
                          className="btn-close float-end"
                          aria-label="Close"
                        />
                      ) : null}
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label column sm={3}>
                          Speaker Name
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Control
                            name={
                              Speakername.length === 0 ? "name" : "name" + i
                            }
                            value={malti.name}
                            onChange={(e) => {
                              handleSpeakerName(e, i);
                            }}
                          />
                        </Col>
                        <div class="mt-2 clearfix"></div>
                        <Form.Label column sm={3}>
                          Speaker Email
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Control
                            type="email"
                            name={
                              Speakername.length === 0 ? "email" : "email" + i
                            }
                            onChange={(e) => {
                              handleSpeakerName(e, i);
                            }}
                            value={malti.email}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </fieldset>
                ))}
                <div class="mt-2"></div>
                <Form.Group className="mb-3">
                  <Button
                    onClick={handleMaltiInputAdd}
                    className="speaker-button"
                  >
                    Add More Speaker
                  </Button>
                </Form.Group>
                <div className="clearfix"></div>
                <div className="mt-2"></div>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label column sm={2}>
                    Description
                  </Form.Label>
                  <Col sm={10}>
                    {" "}
                    <textarea
                      name="Description"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Description}
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </Col>
                </Form.Group>

                <Modal.Footer>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSpeakerName([{ name: "", email: "" }]);
                      setModalShow(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button type="submit" variant="success">
                    Update
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row> */}

      <div class="right-sidebar">
        <div class="top-header">
          <div class="page-title"></div>
          <div class="top-right-action">
            <div class="search-bar">
              <form class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    handleGetEventlistSerch(e.target.value);
                  }}
                />
                <button
                  class="btn btn-outline-success"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
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
            <div className="hcp-sort">
              <>
                <button
                  onClick={(e) => {
                    sortSelectedUsers(e);
                  }}
                  className="btn btn-outline-primary"
                >
                  Sort By
                  {/* Sort By <img src={path_image + "sort.svg"} /> */}
                </button>
              </>
            </div>

            <div class="clear-search">
              <button class="btn btn-outline-primary" type="submit">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                    fill="#0066BE"
                  />
                  <path
                    d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                    fill="#0066BE"
                  />
                  <path
                    d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                    fill="#0066BE"
                  />
                  <path
                    d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                    fill="#0066BE"
                  />
                  <path
                    d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                    fill="#0066BE"
                  />
                  <path
                    d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                    fill="#0066BE"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="smart-list-result">
          <div class="col smartlist-result-block">
            <div class="smartlist-add smartlist-view">
              <Button
                onClick={() => {
                  setShow(true);
                }}
              >
                Create New Webinar/Event
              </Button>
            </div>
            {event.map((event) => {
              return (
                <>
                  <div
                    class="smartlist-view email_box"
                    style={{ margin: "8px" }}
                  >
                    <div class="mail-box-content">
                      <h5>{event.title}</h5>

                      <div class="mail-time">
                        <span>
                          {event.event_date} |{event.event_start_time}
                        </span>
                      </div>
                      <div class="smart-list-added-user">days left {}</div>
                      <div class="mail-stats">
                        <ul>
                          <li></li>
                          <li></li>
                        </ul>
                      </div>
                      <div class="smartlist-buttons"></div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>{" "}
        <div className="container">
          <Add closePopup={closePopup} getEventList={handleGetEventlist} />
        </div>
      </Modal>
    </div>
  );
};

export default EventData;
