import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import * as Yup from "yup";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loader } from "../../../loader";
import { BaseUrlImage } from "../../../Api/BaseApi";

const Registration = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
  const [modalShow, setModalShow] = useState(false);
  const [registrationPageList, setRegistrationPageList] = useState();
  const [editdata, setEditdata] = useState();
  const [format, setFormat] = useState();
  const [mode, setMode] = useState();
  const [modeType, setModeType] = useState();
  const [modeShow, setModeShow] = useState(false);
  const [eventCode, setEventCode] = useState();
  const [show, setShow] = useState(false);
  const [registrationPageIdCopy, setRegistrationPageIdCopy] = useState();
  const [deleteId, setDeleteId] = useState();
  const [massage, setMassage] = useState("Please Select Event");
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [copy, setCopy] = useState();
  const [error, setError] = useState(false);
  const [errorSelectId, setErrorSelectId] = useState(false);

  let navigate = useNavigate();
  const handleGetRegistrationPageList = (id) => {
    loader("Show");
    ExportApi.RegistrationPageList(id).then((resp) => {
      if (resp.ok) {
        loader("hide");
        if (resp.data.code === 200) {
          localStorage.removeItem("registrationPageId");
          localStorage.removeItem("EditRegistrationPageId");
          // console.log(resp.data.data)
          setRegistrationPageList(resp.data.data);
          setMassage();
        }
        if (resp.data.code === 404) {
          setRegistrationPageList();
          setMassage("Data Not Found");
        }
      }
    });
  };
  const handleGetRegistrationPagedata = () => {
    loader("Show");
    if (registrationPageIdCopy) {
      ExportApi.RegistrationPageCopyData(registrationPageIdCopy)
        .then((resp) => {
          if (resp.ok && resp.data.code === 200) {
            loader("hide");
            handleGetRegistrationPageList(
              localStorage.getItem("EventIdHeader")
            );
            setModalShow1(false);
            setErrorSelectId(false);
            setError(false);
            setRegistrationPageIdCopy();
            setModeType();
            // console.log(resp.data.data)
            // setData(JSON.parse(resp.data.data?.json_data))
          }
        })
        .catch((err) => {
          loader("hide");
        });
    } else {
      setErrorSelectId("Please select registration page");
    }
  };
  const handleCreateRegistrationPage = () => {
    loader("show");
    setError(false);
    if (registrationPageList[0]?.mode == "Virtual") {
      // alert("1")
      ExportApi.CreateRegistrationPage(
        localStorage.getItem("EventIdHeader"),
        "onsite"
      ).then((resp) => {
        if (resp.ok) {
          // toast.error(resp.data.message);
          localStorage.setItem("EditRegistrationPageId", resp.data.data.id);
          setModalShow1(false);
          setErrorSelectId(false);
          setError(false);
          setRegistrationPageIdCopy();
          //setModeType();

          navigate("/webinar/portal/NewRegistration");
          setShow(false);

          // setData(resp.data.data)
          loader("hide");
        } else {
          toast.error(resp.data.message);
        }
      });
    } else {
      // alert("2")
      ExportApi.CreateRegistrationPage(
        localStorage.getItem("EventIdHeader"),
        "virtual"
      ).then((resp) => {
        if (resp.ok) {
          // toast.error(resp.data.message);
          localStorage.setItem("EditRegistrationPageId", resp.data.data.id);
          setModalShow1(false);
          setErrorSelectId(false);
          setError(false);
          setRegistrationPageIdCopy();
          //setModeType();
          navigate("/webinar/portal/NewRegistration");
          setShow(false);
          // setData(resp.data.data)
          loader("hide");
        } else {
          toast.error(resp.data.message);
        }
      });
    }
  };

  const handleCreateRegistrationPageFirst = () => {
    ExportApi.CreateRegistrationPage(
      localStorage.getItem("EventIdHeader"),
      "virtual"
    ).then((resp) => {
      if (resp.ok) {
        //console.log("EditRegistrationPageId", resp.data.data.id);
        localStorage.setItem("EditRegistrationPageId", resp.data.data.id);
        setModeType();
        setTimeout(() => {
          navigate("/webinar/portal/NewRegistration");
          setShow(false);
        }, 1000);
        // setData(resp.data.data)
        loader("hide");
      }
    });
  };
  const handleGetRegistrationDelete = () => {
    ExportApi.RegistrationPageDelete(deleteId).then((resp) => {
      if (resp.ok) {
        localStorage.removeItem("registrationPageId");
        localStorage.removeItem("EditRegistrationPageId");
        setModalShow3(false);
        handleGetRegistrationPageList(localStorage.getItem("EventIdHeader"));
        toast.success(resp.data.message);
      }
    });
  };
  useEffect(() => {
    window.addEventListener("EventId", () => {
      localStorage.removeItem("registrationPageId");
      localStorage.removeItem("EditRegistrationPageId");
      handleGetRegistrationPageList(localStorage.getItem("EventIdHeader"));
    });
    handleGetRegistrationPageList(localStorage.getItem("EventIdHeader"));
    // handleGetTemplateList(localStorage.getItem("EventIdHeader"));
    if (!localStorage.getItem("EventIdHeader")) {
      loader("hide");
    }
  }, []);

  return (
    <>
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <div className="right-sidebar col">
        <div className="top-header sticky">
          <div className="page-title">
            <h3>Registration Page </h3>
          </div>
          {registrationPageList?.length == 2 ||
          registrationPageList?.length > 2 ? null : (
            <>
              {" "}
              {registrationPageList === undefined ||
              registrationPageList === null ? (
                <Button onClick={() => handleCreateRegistrationPageFirst()}>
                  Create Registration Page
                </Button>
              ) : (
                <>
                  {" "}
                  {registrationPageList?.length == 1 ||
                  registrationPageList?.length > 1 ? (
                    <div className="top-right-action">
                      <Button onClick={() => handleCreateRegistrationPage()}>
                        Create Registration Page
                      </Button>
                    </div>
                  ) : registrationPageList.length == 1 ? (
                    <>
                      {" "}
                      {registrationPageList?.length == 2 ||
                      registrationPageList?.length > 2 ? null : (
                        <div className="top-right-action">
                          <Button
                            onClick={() => handleCreateRegistrationPage()}
                          >
                            Create Registration Page
                          </Button>
                        </div>
                      )}
                    </>
                  ) : null}
                </>
              )}
            </>
          )}
        </div>
        <div className="registration-table">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {registrationPageList ? (
                <>
                  {registrationPageList?.map((val, i) => (
                    <tr key={i}>
                      <td>{val.mode} Registration Page</td>

                      <td>
                        <ul className="hcp-table-content-right">
                          <div className="user-type-action">
                            <button
                              title="Edit"
                              onClick={(e) => {
                                localStorage.setItem(
                                  "EditRegistrationPageId",
                                  val.id
                                );
                                setTimeout(() => {
                                  navigate("/webinar/portal/NewRegistration");
                                }, 1000);
                              }}
                              className="btn btn-primary btn-filled"
                            >
                              <img
                                alt="edit"
                                src={path_image + "edit-btn.png"}
                              />
                            </button>
                            <button
                              title="Preview"
                              onClick={() => {
                                loader("show");
                                setEventCode(val.code);
                                setFormat(val.format);
                                setMode(val.mode);
                                setModalShow(true);
                                setTimeout(() => {
                                  loader("hide");
                                }, 1500);
                              }}
                              className="btn btn-primary btn-filled"
                            >
                              <img
                                alt="Preview"
                                src={path_image + "eye-svgrepo-com.svg"}
                                style={{ height: "25px", width: "25px" }}
                              />
                            </button>
                            <button
                              title="Delete"
                              onClick={(e) => {
                                setDeleteId(val.id);
                                setModalShow3(true);
                              }}
                              className="btn btn-primary btn-filled"
                            >
                              <img
                                alt="Delete"
                                src={path_image + "delete-btn.png"}
                              />
                            </button>
                            <button
                              title="copy-link"
                              onClick={(e) => {
                                setCopy(i);
                                setTimeout(() => {
                                  setCopy();
                                }, 1000);
                                navigator.clipboard.writeText(
                                  `${BaseUrlImage}/SH2022/index${val.format}.php?event=${val.code}&mode=${val.mode}`
                                );
                              }}
                              className="btn btn-primary btn-filled"
                            >
                              <img
                                alt="copy-link"
                                src={path_image + "copy-link.svg"}
                              />
                            </button>
                            {copy == i ? <p>Copied</p> : null}
                          </div>
                        </ul>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <div className="hcp-table-content">
                  <br />
                  {massage}
                </div>
              )}
            </tbody>
          </Table>
        </div>

        <Modal
          show={modalShow}
          id="template_preview"
          onHide={() => {
            setModalShow(false);
          }}
        >
          <Modal.Header closeButton>
            <h4>Preview Page </h4>
          </Modal.Header>
          <Modal.Body>
            <iframe
              src={`${BaseUrlImage}/SH2022/index${format}.php?event=${eventCode}&mode=${mode}`}
            ></iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                setModalShow(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={modalShow1}
          className="send-confirm create-registration"
          id="create-registration"
        >
          <Modal.Header>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => {
                setModalShow1(false);
                setShow(false);
                setModeShow(false);
              }}
            ></button>
          </Modal.Header>
          <Modal.Body>
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
            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                data-bs-dismiss="modal"
                onClick={() => {
                  //setShow(false);
                  setModeType("onsite");
                  handleCreateRegistrationPage();
                  //setModeShow(true)
                  // handleCreateRegistrationPage()
                  // localStorage.removeItem("registrationPageId");
                  // localStorage.removeItem("EditRegistrationPageId")
                }}
              >
                Create new
              </button>
              {registrationPageList === undefined ? null : (
                <button
                  type="button"
                  className="btn btn-primary btn-filled"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setShow(true);
                    //setModeShow(false);
                    setRegistrationPageIdCopy(
                      localStorage.getItem("Virtual_page_id")
                    );
                    handleGetRegistrationPagedata();
                  }}
                >
                  Copy from existing
                </button>
              )}{" "}
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={modalShow3}
          className="send-confirm"
          id="delete-registration"
        >
          <Modal.Header>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => setModalShow3(false)}
            ></button>
          </Modal.Header>
          <Modal.Body>
            <img src={path_image + "alert.png"} alt="" />
            <h4>
              The record will be deleted from the list.
              <br />
              Are you sure you want to delete it?
            </h4>

            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                data-bs-dismiss="modal"
                onClick={() => {
                  handleGetRegistrationDelete();
                }}
              >
                Yes Please!
              </button>
              <button
                type="button"
                className="btn btn-primary btn-bordered light"
                data-bs-dismiss="modal"
                onClick={() => setModalShow3(false)}
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {console.log("mode", mode)}
    </>
  );
};
export default Registration;
