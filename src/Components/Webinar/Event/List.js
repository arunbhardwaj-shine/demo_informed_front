import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Dropdown } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { loader } from "../../../loader";

import Add from "./Add";
// import Edit from "./Edit";
const EventData = () => {
  const [event, setEvent] = useState([]);
  const [deletestatus, setDeleteStatus] = useState(false);
  const [message, setMessage] = useState(false);
  const [eventdata, setEventData] = useState([]);
  const [SpDataSingle, setSpDataSingle] = useState();
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [update, setUpdate] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [deletecardid, setDeleteCardId] = useState();
  const [sortingCount, setSortingCount] = useState(0);
  const [SpeakerErr, setSpeakerErr] = useState([{ name: "", email: "" }]);
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [updatedData, setUpdatedData] = useState([]);
  const [Speakername, setSpeakerName] = useState([{ name: "", email: "" }]);
  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  let path = process.env.REACT_APP_ASSETS_PATH_WEBINAR;

  const handleGetEventlist = () => {
    loader("show");
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        loader("hide");
        if (resp.data.code == 200) {
          window.dispatchEvent(new Event("EventData"));
          setMessage(false)
          setEvent(resp.data.data);
          setUpdatedData(resp.data.data);
        } else {
          setMessage("Please create event");
        }
      }
    }) .catch((err) => {
      loader("hide");
    });;
  };
  const handleGetEventlistSerch = (data) => {
    // console.log(updatedData);

    setSearch(data);

    if (data == "") {
      // console.log("here");
      setEvent(updatedData);
    }

    // ExportApi.GetEventListSerch(data).then((resp) => {
    //   if (resp.data.code == 200) {
    //     setEvent(resp.data.data);
    //   } else {
    //     setEvent([]);
    //     setMessage("No event found");
    //   }
    // });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // console.log("form submmiteed");
    let r_table = [];

    const searchData = search.trim();

    ExportApi.GetEventListSerch(searchData).then((resp) => {
      // console.log(resp);
      if (resp.data.code == 200) {
        // console.log(resp.data.data);
        setEvent(resp.data.data);
      } else {
        setEvent([]);
        setMessage("No event found");
      }
      event.preventDefault();
    })
    .catch((err) => {
      loader("hide");
    });;

    // updatedData.find(function (item) {
    //   console.log(item);
    //   if (item.name.includes(search) || item.email.includes(search)) {
    //     r_table.push(item);
    //   }
    // });
    // if (r_table.length > 0) {
    //   setEditList(r_table);
    // } else {
    //   toast.error("Data not found");
    // }
    // event.preventDefault();
    // return false;
  };

  const handleGetEventlistEdidData = (val) => {
    ExportApi.GetEventListData(val).then((resp) => {
      if (resp.ok) {
        setModalShow(true);
        setSpDataSingle(resp.data.data.speaker_data);
        setEventData(resp.data.data);
      }
    })
    .catch((err) => {
      loader("hide");
    });;
  };

  // add more speaker on click
  const handleMultiInputAdd = () => {
    setSpeakerName([...Speakername, { name: "", email: "" }]);
    setSpeakerErr([...SpeakerErr, { name: "", email: "" }]);
  };

  // handle speaker name and email fields errors on key up
  const handleEditSpeakerOnKeyUp = (e, i) => {
    if (e.target.name === `name${i}`) {
      Speakername[i].name = e.target.value;
      Speakername.splice(i, 1, { ...Speakername[i] });
      setSpeakerName([...Speakername]);
      SpeakerErr[i].name = "";
      if (e.target.value.length == 0) {
        SpeakerErr[i].name = "Name is requred";
      }
      setSpeakerErr([...SpeakerErr]);
    } else if (e.target.name === `email${i}`) {
      Speakername[i].email = e.target.value;
      Speakername.splice(i, 1, { ...Speakername[i] });
      setSpeakerName([...Speakername]);
      SpeakerErr[i].email = "";
      if (e.target.value.length == 0) {
        SpeakerErr[i].email = "Email is requred";
        setSpeakerErr([...SpeakerErr]);
      } else if (
        !Speakername[i].email.match(
          /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i
        )
      ) {
        SpeakerErr[i].email = "Invalid email address";
      }
      setSpeakerErr([...SpeakerErr]);
    }
  };

  const sortSelectedUsers = (e) => {
    e.preventDefault();
    let normalArr = [];
    normalArr = event;
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
    setSortingCount(sortingCount + 1);
  };

  const showDeleteButtons = () => {
    if (deletestatus) {
      setDeleteStatus(false);
    } else {
      setDeleteStatus(true);
    }
  };

  const handleMultiInputRemove = (i) => {
    // console.log("i", i);
    Speakername.splice(i, 1);
    SpeakerErr.splice(i, 1);
    setSpeakerName([...Speakername]);
    setSpeakerErr([...SpeakerErr]);
  };

  const showConfirmationPopup = (id) => {
    if (confirmationpopup) {
      setConfirmationPopup(false);
    } else {
      setConfirmationPopup(true);
    }
    setDeleteCardId(id);
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };

  const deleteEvent = () => {
    hideConfirmationModal();
    ExportApi.DeleteEvent(deletecardid)
      .then((resp) => {
        if (resp.ok) {
          handleGetEventlist();
          toast.success(resp.data.message)
          hideConfirmationModal();
          let updatedArray = event.filter((item) => {
            return item["id"] != deletecardid;
          });
          if (typeof updatedArray !== "undefined") {
            setEvent(updatedArray);
          }
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });

    //   const body = {
    //     event_id: deletecardid,
    //   };
    //   const headers = {
    //     "Content-Type": "application/json",
    //     Authorization: `${localStorage.getItem("Token")}`,
    //   };
    //   axios
    //     .post(`http://51.89.210.56:8000/api/delete-event`, body, { headers })
    //     .then((res) => {
    //       if (res.statusText == "OK") {
    //         hideConfirmationModal();
    //         let updatedArray = event.filter((item) => {
    //           return item["id"] != deletecardid;
    //         });
    //         if (typeof updatedArray !== "undefined") {
    //           setEvent(updatedArray);
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       toast.error("Something went wrong");
    //     });
  };

  const handleSubmit = (e) => {
    let err = true;
    for (let index = 0; index < Speakername.length; index++) {
      if (
        Speakername[index].name.length > 1 &&
        Speakername[index].email.length == 0
      ) {
        err = false;
        const copydataErr = SpeakerErr[index];
        copydataErr.email = "Email is requred  ";
        setSpeakerErr([...SpeakerErr]);
      }
    }
    return err;
  };

  const formik = useFormik({
    initialValues: {
      EventTitle: eventdata ? eventdata.title : "",
      Description: eventdata ? eventdata.description : "",
    },
    validationSchema: Yup.object({
      EventTitle: Yup.string().required("Event title is required"),
      Description: Yup.string().required("Description is required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      if (handleSubmit()) {
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
                setSpeakerName([{ name: "", email: "" }]);
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
      }
    },
  });

  const closePopup = () => {
    setShow(false);
  };

  useEffect(() => {
    handleGetEventlist();
  }, []);
  return (
    <>
       <div className="loader" id="custom_loader">
          <span className="loader-view"> </span>
        </div>
    
    <div className="right-sidebar col">
    <div className="custom-container">
        <div className="row">
      <div className="top-header">
      <div className="page-title">
            <h2>Events</h2>
          </div>
        
          <div className="top-right-action">
          <div className="search-bar">
            <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
              <input
                className="form-control me-2"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  handleGetEventlistSerch(e.target.value);
                }}
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
          <div className="Webinar-header-right-tools">
            {/* <div className="filter-by">
              <>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    Filter By
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                  <Dropdown.Item href="#/">Name</Dropdown.Item>
                  <Dropdown.Item href="#/">Name</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
              </>
            </div> */}
            <div className="hcp-sort">
              <>
                {sortingCount == 0 ? (
                  <>
                    <button
                      className="btn btn-secondary "
                      onClick={sortSelectedUsers}
                    >
                      Sort By <img src={path + "sort.svg"}></img>
                    </button>
                  </>
                ) : sorting == 0 ? (
                  <>
                    <button
                      className="btn btn-secondary"
                      onClick={sortSelectedUsers}
                    >
                      Sort By <img src={path + "sort-decending.svg"}></img>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-secondary"
                      onClick={sortSelectedUsers}
                    >
                      Sort By <img src={path + "sort-assending.svg"}></img>
                    </button>
                  </>
                )}
              </>
            </div>

            <div className="clear-search">
              <button
                className="btn btn-outline-primary"
                type="submit"
                onClick={showDeleteButtons}
              >
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
        </div>
     


      <div className="email-result">
          <div className="col email-result-block">
            <div className="email_box_block">
              <div className="email-block-add">
              {
                <>
                  <a
                    onClick={() => {
                      setShow(true);
                    }}
                    // state={{ creator: getUserDetails.username }}
                  >
                    <img src={path_image + "add-button.svg"} alt="" />
                  </a>
                  <p> Create New Webinar/Event</p>
                </>
              }
                  {/* <img src={path_image + "add-button.svg"} alt="" />
                  <p>Create New Email</p> */}
               
              </div>
            </div>
            {event?.map((val, i) => {
              return (
                <div key={i} className="email_box_block">
                  <div
                    className={
                      "email_box "+" approved" 
                    }
                  >
                    <div className="mail-box-content">
                      <div className="mail-box-content-top">
                        <div className="mail-box-content-top-view">
                          <h5>{val.title}</h5>
                          {/* <p>Email Type</p> */}
                          <div className="mailbox-description">
                            <p>{val.description}</p>
                          </div>
                        <div className="webinar_time">
                          <div className="webinar-start-time">
                            <span>Start Time {val?.event_start_time}</span>
                          </div>
                          <div className="webinar-end-time">
                            <span>End Time {val?.event_end_time}</span>
                          </div>
                        </div>
                          <div className="mail-stats">
                            <ul>
                              <li>
                                {val.days_left < 0 ? (
                                <div className="mail-status mail_send">
                            <>
                              <span></span> Fulfilled
                            </>
                            </div>
                          ) : (
                            <>
                              {val.days_left == 1 ? (
                                <span>{val.days_left + " Day Left"}</span>
                              ) : val.days_left == 0 ? (
                                <span> {val.time_left + " Time Left"}</span>
                              ) : (
                                <span>{val.days_left + " Days Left"}</span>
                              )}
                            </>
                          )}
                            
                              </li>
                              <li>
                                {/* <div className="mail-status mail_view">
                                Date
                                </div> */}
                                <span>{val.event_date}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="mail-stats">
                        {deletestatus && (
                          <div className="dlt_btn">
                            <button
                              onClick={(e) => showConfirmationPopup(val.id)}
                            >
                              <img
                                src={path_image + "delete.svg"}
                                alt="Delete Row"
                              />
                            </button>
                          </div>
                        )}
                      </div>
                        </div>
                      </div>
                      <div className="mailbox-buttons">
                        <div className="mailbox-buttons-list">
                          <button
                            className="btn btn-primary btn-bordered edit"
                            onClick={() => handleGetEventlistEdidData(val.id)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {event?.length > 0  ?null: (
              <div className="coming-soon">
                <h2>{message}</h2>
              </div>
            ) }
          </div>
        </div>
        </div>
      <div class="email-result webinar-result">
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
     
      </div>
      </div>
      
      <Modal
        id="webinar_event"
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          {" "}
          <h4>New Webinar/Event</h4>
        </Modal.Header>
        <Modal.Body>
          <Add closePopup={closePopup} getEventList={handleGetEventlist} />
        </Modal.Body>
      </Modal>
      <div className="delete">
        <Modal
          className="modal send-confirm"
          id="delete-confirm"
          show={confirmationpopup}
        >
          <Modal.Header>
            {/* <Modal.Title>Heading Text</Modal.Title>*/}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={(e) => hideConfirmationModal()}
            ></button>
          </Modal.Header>

          <Modal.Body>
            <img src={path_image + "alert.png"} alt="" />
            <h4>
              The Event will be deleted from the list.
              <br />
              Are you sure you want to delete it?
            </h4>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                onClick={(e) => deleteEvent()}
              >
                Yes Please!
              </button>
              <button
                type="button"
                className="btn btn-primary btn-bordered light"
                onClick={(e) => hideConfirmationModal()}
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          id="webinar-edit-event"
        >
          <Modal.Header
            onClick={() => {
              setSpeakerName([{ name: "", email: "" }]);
              setSpeakerErr([{ name: "", email: "" }]);
              setModalShow(false);
            }}
            closeButton
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <h4>Edit Event</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
              <div className="modal-body-content">
                <div className="form-inline row justify-content-between align-items-center">
                  <div className="form-group">
                    <label>Event Title </label>
                    <Form.Control
                      name="EventTitle"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.EventTitle}
                    />
                    {formik.touched.EventTitle && formik.errors.EventTitle ? (
                      <div className="error" style={{ color: "red" }}>
                        {formik.errors.EventTitle}
                      </div>
                    ) : null}
                  </div>
                </div>

                <fieldset className="border p-2">
                  {SpDataSingle?.map((multi, i) => (
                    <Form.Group className="edit-event" key={i}>
                      <div className="edit-event-list">
                        <Form.Label>Name</Form.Label>
                        <h6>{multi.name}</h6>
                      </div>
                      <div className="edit-event-list">
                        <Form.Label>Email</Form.Label>
                        <h6>{multi.email}</h6>
                      </div>
                    </Form.Group>
                  ))}
                </fieldset>
                <div className="mt-2 clearfix"></div>
                <fieldset class="border p-2">
                  {Speakername.map((multi, i) => (
                    <div
                      key={i}
                      className="form-inline row justify-content-between align-items-center"
                    >
                      <div className="form-group col-12 col-md-6">
                        <label>Name</label>
                        <input
                          type="text"
                          placeholder="Speaker's Name"
                          className="form-control"
                          name={Speakername.length === 0 ? "name" : "name" + i}
                          value={multi.name}
                          onChange={(e) => {
                            handleEditSpeakerOnKeyUp(e, i);
                          }}
                        />
                        <div className="error" style={{ color: "red" }}>
                          {SpeakerErr[i].name}
                        </div>
                      </div>
                      <div className="form-group col-12 col-md-6">
                        <label>Speaker's Email</label>
                        <input
                          type="text"
                          placeholder="Speaker's Email"
                          className="form-control"
                          name={
                            Speakername.length === 0 ? "email" : "email" + i
                          }
                          value={multi.email}
                          onChange={(e) => {
                            handleEditSpeakerOnKeyUp(e, i);
                          }}
                        />
                        <div className="error" style={{ color: "red" }}>
                          {SpeakerErr[i].email}
                        </div>
                      </div>
                      {Speakername.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => {
                            handleMultiInputRemove(i);
                          }}
                          className="btn-close float-end"
                          aria-label="Close"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                              fill="#ffffff"
                            ></path>
                            <path
                              d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                              fill="#ffffff"
                            ></path>
                            <path
                              d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                              fill="#ffffff"
                            ></path>
                            <path
                              d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                              fill="#ffffff"
                            ></path>
                            <path
                              d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                              fill="#ffffff"
                            ></path>
                            <path
                              d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                              fill="#ffffff"
                            ></path>
                          </svg>
                        </button>
                      ) : null}
                    </div>
                  ))}
                  <a
                    href="javascript:void(0);"
                    onClick={handleMultiInputAdd}
                    className="speaker-button"
                  >
                    Add Speaker +{" "}
                  </a>
                </fieldset>
                <div className="form-inline row justify-content-between align-items-center">
                  <div className="form-group col-12 col-md-12">
                    <label>Description </label>
                    <textarea
                      name="Description"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Description}
                      className="form-control"
                      rows="3"
                    ></textarea>
                    {formik.touched.Description && formik.errors.Description ? (
                      <div className="error" style={{ color: "red" }}>
                        {formik.errors.Description}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="modal-footer-btn">
                <Button
                  type="reset"
                  class="btn btn-primary btn-bordered"
                  variant="danger"
                  onClick={() => {
                    setSpeakerName([{ name: "", email: "" }]);
                    setSpeakerErr([{ name: "", email: "" }]);
                    setModalShow(false);
                  }}
                >
                  Close
                </Button>
                <Button type="submit" class="btn btn-primary btn-filled">
                  Update
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
    </>
  );
};

export default EventData;
