import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loader } from "../../../loader";
import ExportApi from "../../../Api/ExportApi";

const RegistraionDetails = () => {
  const [inputbox, setInputBox] = useState([
    { value: "Name", name: "Name", isActive: false },
    { value: "Email", name: "Email", isActive: false },
    { value: "Region", name: "Region", isActive: false },
    { value: "Dr Number", name: "Dr number", isActive: false },
    { value: "State", name: "State", isActive: false },
    { value: "Hospital", name: "Hospital", isActive: false },
    { value: "Profession", name: "Profession", isActive: false },
    { value: "Consent", name: "Consent", isActive: false },
  ]);
  const [modalShow, setModalShow] = useState(false);
  const [event, setEvent] = useState([]);
  const [selectedName, setSelectedName] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [checkboxData, setcheckboxData] = useState([]);
  const [FieldValue, setFieldValue] = useState();
  const [show, setShow] = useState(false);
  const [image, setimage] = useState();
  const [field, setField] = useState("");
  const [errimage, setErrimage] = useState(false);
  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  let navigate = useNavigate();
  const handeleimage = (e) => {
    let file = e.target.files[0];
    setimage(e.target.files[0]);

    if (file) {
      const preview = document.getElementById("imgVieww");
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          preview.src = reader.result;
        },
        false
      );
      reader.readAsDataURL(file);
    }
  };
  const handleRadioChangedata = (e, i) => {
    const { checked, name } = e.target;
    const Index = selectedName.findIndex((v) => v.value == name);
    // console.log("selectedName",selectedName)
    let copy = selectedName[Index];
    copy.required = checked;
    setSelectedName([...selectedName]);
  };

  const handleRadioChange = (e, i) => {
    const { checked, name } = e.target;
    setFieldValue(name);

    let data = { value: name, required: false };
    const Copyinputbox = inputbox[i];
    Copyinputbox.isActive = e.target.checked;
    setInputBox([...inputbox]);
    if (selectedName[i]?.value != name && checked == true) {
      // console.log("data",data)
      selectedName.push(data);
    } else {
      selectedName.splice(i, 1);
      setSelectedName([...selectedName]);
    }
  };
  // console.log("Values", FieldValue);

  const addData = () => {
    setField("");
    setShow(true);
    //console.log("add data");
  };
  const handleErrorImage = () => {
    if (image) {
      setErrimage("");
    } else {
      setErrimage("Please Choose file");
    }
  };
  const formik = useFormik({
    initialValues: {
      Title: "",
      Body: "",
    },
    validationSchema: Yup.object({
      Title: Yup.string().required("Title is required"),
      Body: Yup.string().required("Body text is required"),
    }),
    onSubmit: (values) => {
      // console.log(selectedName);
      let copyData = JSON.stringify(selectedName);
      let formData = new FormData();
      formData.append("body", values.Body);
      formData.append("file", image);
      formData.append("title", values.Title);
      formData.append("fields", copyData);
      formData.append("event_id", localStorage.getItem("EventIdHeader"));
      if (image) {
        loader("show");
        // console.log("formData,", formData);
        ExportApi.CreateRegistrationPagedetail(formData)
          .then((resp) => {
            if (resp.data) {
              // console.log(resp.data);
              if (resp.data.code == 200) {
                loader("hide");
                toast.success(resp.data.message);
                setTimeout(() => {
                  navigate("/webinar/portal/registrationDetailslist");
                }, 1000);
              } else {
                loader("hide");
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
      } else {
        setErrimage("Please Choose file");
      }
    },
  });
  useEffect(() => {
    window.addEventListener("EventId", () =>
      setEvent(localStorage.getItem("EventIdHeader"))
    );
    setEvent(localStorage.getItem("EventIdHeader"));
    if (localStorage.getItem("EventIdHeader")) {
      console.log("done");
    } else {
      loader("hide");
    }
  }, []);

  const saveClicked = () => {
    if (field.length > 0) {
      setInputBox((oldArray) => [
        ...oldArray,
        { value: field, name: field, isActive: false },
      ]);
      setField("");
      setShow(false);
    } else {
      toast.warning("Please enter field name");
    }
  };
  return (
    <>
      {/* {console.log("selectedName",selectedName)} */}
      <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
      <div class="right-sidebar col">
        <div className="custom-container">
          <Row>
            <div className="page-title d-flex justify-content-between">
              <h2>Registration Page</h2>
              <Link to="/webinar/portal/registrationDetailslist">
                <Button> List</Button>{" "}
              </Link>
            </div>
            <div className="registration_form">
              <Col className="registration_left">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-inline row ">
                    <div className="form-group col-12 col-md-12 d-flex justify-content-between align-items-center">
                      <Form.Label> Registration Page Title</Form.Label>
                      <Form.Control
                        name="Title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Title}
                      />
                      {formik.touched.Title && formik.errors.Title ? (
                        <div className="error" style={{ color: "red" }}>
                          {formik.errors.Title}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="form-inline row ">
                    <div className="form-group col-12 col-md-12 d-flex justify-content-between align-items-center">
                      <Form.Label> Body Text</Form.Label>
                      <textarea
                        name="Body"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Body}
                        className="form-control"
                        rows="6"
                      ></textarea>
                      {formik.touched.Body && formik.errors.Body ? (
                        <div className="error" style={{ color: "red" }}>
                          {formik.errors.Body}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-inline box-added form-group">
                    <h5>What data should be collected?</h5>
                    <div className="form-inline">
                      {inputbox?.map((data, i) => {
                        return (
                          <>
                            <div class="form-check">
                              <Form.Label>{data.value}</Form.Label>
                              <Form.Control
                                type="checkbox"
                                onChange={(e) => {
                                  handleRadioChange(e, i);
                                  if (e.target.checked) {
                                    setModalShow(true);
                                  } else {
                                    setModalShow(false);
                                  }
                                }}
                                value={data.value}
                                name={data.name}
                                className="form-check-input"
                              />

                              {/* 
                            {data.isActive == true ? (
                              <>
                                  <br/><span>Required</span>
                                  <Form.Control
                                    name={data.name}
                                    type="checkbox"
                                    className="form-check-input"
                                    onChange={(e) => handleRadioChangedata(e, i)}
                                    // name="required"
                                  />
                              </>
                            ) : null} */}
                            </div>
                          </>
                        );
                      })}

                      <Modal
                        show={modalShow}
                        className="send-confirm"
                        id="resend-confirm"
                      >
                        <Modal.Header>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            onClick={() =>
                              setModalShow((modalShow) => !modalShow)
                            }
                          ></button>
                        </Modal.Header>
                        <Modal.Body>
                          <img src={path_image + "webinar/alert.png"} alt="" />
                          <h4>You want this field required ?</h4>
                          <div className="modal-buttons">
                            <div className="modal-buttons-register">
                              <Form.Control
                                name={FieldValue}
                                value={FieldValue}
                                type="checkbox"
                                className="form-check-input"
                                onChange={(e) => {
                                  handleRadioChangedata(e);
                                  if (e.target.checked) {
                                    setModalShow(false);
                                  }
                                }}
                              />
                              <button
                                type="button"
                                className="btn btn-primary btn-filled"
                              >
                                Yes
                              </button>
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary btn-bordered light"
                              onClick={(e) => setModalShow(false)}
                            >
                              No
                            </button>
                          </div>
                        </Modal.Body>
                      </Modal>

                      {/* {console.log("FieldValue", FieldValue)} */}
                      <button type="button" onClick={addData}>
                        Add data field <span>+</span>
                      </button>
                    </div>
                    <div className="add_field_new">
                      {show == true ? (
                        <>
                          <input
                            type="text"
                            onChange={(e) => {
                              setField(e.target.value);
                            }}
                            className="form-control"
                          />
                          <button
                            type="button"
                            className="btn btn-primary btn-filled"
                            onClick={saveClicked}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary btn-bordered"
                            onClick={() => {
                              setShow(false);
                              setField("");
                            }}
                          >
                            Close
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="upload-file-box">
                    <div className="box">
                      <input
                        type="file"
                        name="file-4[]"
                        id="file-4"
                        onChange={(e) => handeleimage(e)}
                        className="inputfile inputfile-3"
                        data-multiple-caption="{count} files selected"
                        multiple
                      />
                      <label for="file-4">
                        <span>Choose Your File</span>
                      </label>
                      <p>Upload your registration page design file</p>
                    </div>
                  </div>

                  {/* <Col>
                  <div>
                    <img id="imgVieww" src="" alt="Viewing the registration page image" width={340} />
                  </div>
                </Col> */}

                  {/* <input type="file" onChange={(e) => handeleimage(e)} /> */}
                  <div class="form-inline">
                    <div style={{ color: "red" }}>{errimage}</div>

                    <button
                      onClick={handleErrorImage}
                      className="btn btn-primary reg-submit"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Col>
              <Col className="registration_right">
                <div className="registration_right-view">
                  <img
                    id="imgVieww"
                    src={path_image + "dummy-img.png"}
                    alt="Viewing the registration page image"
                  />
                </div>
              </Col>
            </div>

            <div className="download-sample">
              <p>
                Download registration page design guide file to design yours
              </p>
              <div className="upload-btn">
                <label for="input-file">Download File</label>
                <input id="input-file" type="file" />
              </div>
            </div>
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
          </Row>
        </div>
      </div>
    </>
  );
};
export default RegistraionDetails;
