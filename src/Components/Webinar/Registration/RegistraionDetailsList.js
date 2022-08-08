import React, { useEffect, useState } from "react";
import ExportApi from "../../../Api/ExportApi";
import { loader } from "../../../loader";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { BaseApi, BaseUrlImage } from "../../../Api/BaseApi";
const RegistrationDetailsList = () => {
  const [show, setShow] = useState(false);
  const [List, setList] = useState([]);
  const [SingleData, setSingleData] = useState();
  const [register_detail_id, setregister_detail_id] = useState();
  const [flag, setFlag] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  let path_image = process.env.REACT_APP_ASSETS_PATH_WEBINAR;

  const [inputbox, setInputBox] = useState([
    { value: "Name", name: "Name", isActive: false, required: "" },
    { value: "Email", name: "Email", isActive: false, required: "" },
    { value: "Region", name: "Region", isActive: false, required: "" },
    { value: "Dr Number", name: "Dr number", isActive: false, required: "" },
    { value: "State", name: "State", isActive: false, required: "" },
    { value: "Hospital", name: "Hospital", isActive: false, required: "" },
    { value: "Profession", name: "Profession", isActive: false, required: "" },
    { value: "Consent", name: "Consent", isActive: false, required: "" },
  ]);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [selectedName, setSelectedName] = useState([]);
  const [Massage, setMassage] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [FieldValue, setFieldValue] = useState();
  const [image, setimage] = useState();
  const [field, setField] = useState("");
  const [errimage, setErrimage] = useState(false);
  let path_image1 = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const handleRadioChangedata = (e, i) => {
    const { checked, name } = e.target;
    const Index = selectedName.findIndex((v) => v.value == name);
    selectedName[Index].required = checked;
    setSelectedName([...selectedName]);
  };

  const handleRadioChange = (e, i) => {
    const { checked, name } = e.target;
    setFieldValue(name);
    let data = { value: name, required: false };
    inputbox[i].isActive = e.target.checked;
    setInputBox([...inputbox]);
    if (selectedName[i]?.value !== name && checked == true) {
      selectedName.push(data);
    } else {
      selectedName.splice(i, 1);
      setSelectedName([...selectedName]);
    }
  };

  const addData = () => {
    setField("");
    setShow(true);
  };

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
  const handeleimage = (e) => {
    if (e?.target?.files[0].type.match(/\/(jpg|jpeg|png)$/)) {
      setErrimage(false);
      let file = e.target.files[0];
      setimage(e.target.files[0]);
      setFlag(true);
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
    } else {
      setErrimage("Only jpeg, png, jpg, are allowed");
    }
  };

  const deleteButtonClicked = (id) => {
    setDeleteId(id);
    setModalShow1(true);
  };

  const formik = useFormik({
    initialValues: {
      Title: SingleData ? SingleData.title : "",
      Body: SingleData ? SingleData.title : "",
    },
    validationSchema: Yup.object({
      Title: Yup.string().required("Title is required"),
      Body: Yup.string().required("Body text is required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      let copyData = JSON.stringify(selectedName);
      let formData = new FormData();
      formData.append("body", values.Body);
      if (image) {
        formData.append("file", image);
      }
      formData.append("title", values.Title);
      formData.append("fields", copyData);
      formData.append("register_detail_id", register_detail_id);

      formData.append("event_id", localStorage.getItem("EventIdHeader"));
      ExportApi.UpdateRegistrationPageDetail(formData)
        .then((resp) => {
          if (resp.data && resp.data.code == 200) {
            setModalShow(false);
            loader("hide");
            toast.success(resp.data.message);
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
        })
        .catch((err) => console.log(err));
    },
  });

  const deleteUser = async () => {
    setModalShow1(false);
    const body = {
      register_detail_id: JSON.stringify(deleteId),
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };
    loader("show");
    await axios
      .post(`${BaseApi}delete-registration-detail`, body, {
        headers,
      })
      .then((res) => {
        const data = List;
        const filtered_list = data.filter((data) => {
          return data.id != deleteId;
        });

        setList(filtered_list);
        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetListData = (id) => {
    ExportApi.RegistrationPageDetailList(id).then((resp) => {
      if (resp.ok) {
        loader("hide");
        if (resp.data.code === 404) {
          setMassage("Data Not Found");
          setList([]);
        } else {
          setList(resp.data.data);
        }
      }
    });
  };
  const handleGetSingleData = (id) => {
    ExportApi.RegistrationPageDetail(id).then((resp) => {
      if (resp.ok) {
        if (resp.data.code == 200) {
          let field = JSON.parse(resp.data.data.fields);
          setSingleData(resp.data.data);
          setSelectedName(JSON.parse(resp.data.data.fields));
          for (let a = 0; a < field.length; a++) {
            const index = inputbox.findIndex((v) => v.name == field[a]?.value);
            inputbox[index].isActive = true;
            inputbox[index].required = field[index].required;
            setField([...inputbox]);
          }
        }
      }
    });
  };

  useEffect(() => {
    loader("show");
  }, []);
  useEffect(() => {
    window.addEventListener("EventId", () =>
      handleGetListData(localStorage.getItem("EventIdHeader"))
    );
    handleGetListData(localStorage.getItem("EventIdHeader"));
  }, []);
  return (
    <>
    <div class="right-sidebar col">
      <div class="top-header">
        <div class="page-title">
          <h3>Registration Page List</h3>
        </div>
        <div class="top-right-action">
          <Link to="/webinar/portal/registrationDetails">
            <Button>Create Registration Page</Button>
          </Link>
        </div>
      </div>
      <div class="table-responsive">
        <Table class="table" bordered hover>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {List ? (
              List?.map((val, i) => (
                <tr key={i}>
                  <td>{val.title}</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        handleGetSingleData(val.id);
                        setregister_detail_id(val.id);
                        setModalShow(true);
                      }}
                    >
                      {" "}
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteButtonClicked(val.id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Record Found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Modal
        show={modalShow}
        id="webinar_event"
        onHide={() => {
          setModalShow(false);
        }}
      >
        <Modal.Header closeButton>
          <h4>Edit Registration Details </h4>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <div className="webinar-modal-data">
              <div className="registration_form">
                <Col className="registration_left">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="modal-body-content">
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

                      <div className="form-inline row">
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
                                        setModalShowEdit(true);
                                      } else {
                                        setModalShowEdit(false);
                                      }
                                    }}
                                    checked={data.isActive}
                                    name={data.name}
                                    className="form-check-input"
                                  />
                                  <span className="required">
                                    {inputbox[i].required == true ? "*" : null}
                                  </span>
                                </div>
                              </>
                            );
                          })}
                          <Modal
                            show={modalShowEdit}
                            className="send-confirm"
                            id="field-required"
                          >
                            <Modal.Header>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                onClick={() =>
                                  setModalShowEdit(
                                    (modalShowEdit) => !modalShowEdit
                                  )
                                }
                              ></button>
                            </Modal.Header>
                            <Modal.Body>
                              <img
                                src={path_image1 + "webinar/alert.png"}
                                alt=""
                              />
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
                                        setModalShowEdit(false);
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
                                  onClick={(e) => setModalShowEdit(false)}
                                >
                                  No
                                </button>
                              </div>
                            </Modal.Body>
                          </Modal>
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
                      <div class="form-inline">
                        <div style={{ color: "red" }}>{errimage}</div>
                      </div>
                    </div>
                  </form>
                </Col>
                <Col className="registration_right">
                  <div className="registration_right-view">
                    <img
                      id="imgVieww"
                      src={
                        flag == false
                          ? `${BaseUrlImage}${SingleData?.file}`
                          : ""
                      }
                      alt="Viewing the registration page image"
                    />
                    {/* <img
                    id="imgVieww"
                    src={path_image + "dummy-img.png"}
                    alt="Viewing the registration page image"
                  /> */}
                  </div>
                </Col>
              </div>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => formik.handleSubmit()}>
            Update
          </Button>
          <Button
            onClick={() => {
              // setModalShow1(false);
              setModalShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalShow1} className="send-confirm" id="delete-registration">
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => setModalShow1(false)}
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
                deleteUser();
              }}
            >
              Yes Please!
            </button>

            <button
              type="button"
              className="btn btn-primary btn-bordered light"
              data-bs-dismiss="modal"
              onClick={() => setModalShow1(false)}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    </>
  );
};

export default RegistrationDetailsList;
