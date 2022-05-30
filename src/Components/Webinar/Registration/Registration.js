import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import * as Yup from "yup";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import CreateRegistration from "./CreateRegistration";
import { Link } from "react-router-dom";
const Registration = () => {
  const [eventid, setEventId] = useState();
  const [event, setEvent] = useState([]);
  const [id, setId] = useState();
  const [registrationPageList, setRegistrationPageList] = useState();
  const [template, setTemplate] = useState();
  const [editdata, setEditdata] = useState();
  const [eventCode, setEventCode] = useState();
  const [UrlAlias, setUrlAlias] = useState();
  const [errimage, setErrimage] = useState(false);
  const [massage, setMassage] = useState("Please Select Event");
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [body, setBody] = useState();
  const [err, setErr] = useState(false);
  const [image, setimage] = useState();
  const [flag, setFlag] = useState(false);
  const [templateList, setTemplateList] = useState();
  const handeleimage = (e) => {
    if (e?.target?.files[0].type.match(/\/(jpg|jpeg|png)$/)) {
      setErrimage(false);
      let file = e.target.files[0];
      setimage(e.target.files[0]);

      if (file) {
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
      }
    } else {
      setErrimage(true);
      setErrimage("Only jpeg, png, jpg, are allowed");
    }
  };
  const handleGetTemplateList = () => {
    ExportApi.UserTemplateList(id).then((resp) => {
      if (resp.ok) {
        setTemplateList(resp.data.data);
      }
    });
  };
  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        setEvent(resp.data.data);
      }
    });
  };
  const handleGetRegistrationPageList = (id) => {
    if (id === "Shine") {
      setId(null);
    } else {
      setId(id);
    }
    ExportApi.RegistrationPageList(id).then((resp) => {
      if (resp.ok) {
        setRegistrationPageList(resp.data.data);
        if (resp.data.code === 404) {
          setMassage("Data Not Found");
        }
      }
    });
  };
  const handleGetRegistrationPagedata = (id) => {
      ExportApi.RegistrationPageData(id).then((resp) => {
      if (resp.ok) {
        setimage(null);
        handleGetTemplateList();
        setEditdata(resp.data.data);
        setEventCode(resp.data.data.event.code)
        setUrlAlias(resp.data.data.url)
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      RegistrationPageTitle: editdata ? editdata.title : "",
      url: editdata ? editdata.url : "",
      body: editdata ? editdata.body : "",
      TemplateId: editdata ? editdata.template_id : "",
    },
    validationSchema: Yup.object({
      TemplateId: Yup.string().required("Please select template "),
      RegistrationPageTitle: Yup.string().required(
        "Enter your registration page title"
      ),
      body: Yup.string().required("Enter a Body text"),
      url: Yup.string()
        .matches(/^[a-zA-Z]+$/u, "Only alphabets are allowed")
        .required("Enter url alias"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      let formData = new FormData();

      formData.append("form_id", editdata.id);

      formData.append("body", values.body);

      formData.append("title", values.RegistrationPageTitle);

      // formData.append("file", image);
      formData.append("url", UrlAlias);
      formData.append("template_id", values.TemplateId);
      UrlAlias?ExportApi.UpdateRegistrationPageData(formData).then((resp) => {
        if (resp.ok) {
          if (resp.data.code == 200) {
            handleGetRegistrationPageList(id);
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
      }):console.log("errr");
    },
  });
  useEffect(() => {
    handleGetEventlist();
  }, []);
  return (
    <div>
      <Row>
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
          <h2>Registration page</h2>
          <Row>
            <Row>
              <Col className="mb-5">
                <Form.Label>Select Event </Form.Label>
                <Form.Select
                  name="type"
                  onChange={(e) => {
                    handleGetRegistrationPageList(e.target.value);
                    setEventId(e.target.value);
                    setModalShow2(true);
                    setEditdata(null);
                  }}
                >
                  <option value="Shine"> Select Event</option>
                  {event?.map((val, i) => (
                    <React.Fragment key={i}>
                      <option value={val.id}>{val.title}</option>
                    </React.Fragment>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            {id ? (
              <Button
                onClick={() => {
                  setModalShow(true);
                }}
              >
                Create New Registration page
              </Button>
            ) : null}
            {registrationPageList ? (
              <Row>
                <Col className="mb-5">
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrationPageList?.map((val, i) => (
                        <tr key={i}>
                          <td>{val.title}</td>
                          <td>
                            <Link
                              to={`/webinar/register/${val.code}/${val.url}/${1}`}
                              target="_blank"
                            >
                              <Button>Preview</Button>
                            </Link>
                            <Button
                              onClick={(e) => {
                                handleGetRegistrationPagedata(val.id);
                                setFlag(false);
                              }}
                            >
                              Edit
                            </Button>{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            ) : (
              <h2>{massage}</h2>
            )}
          </Row>
          <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header onClick={() => setModalShow(false)} closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Create Registration Page
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateRegistration
                hendletable={handleGetRegistrationPageList}
                data={setModalShow}
                id={id}
              />
            </Modal.Body>
          </Modal>

          {editdata ? (
            <Row>
              <Col>
                <form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col className="mb-5">
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Registration Page Title</Form.Label>
                          <Form.Control
                            name="RegistrationPageTitle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.RegistrationPageTitle}
                            type="text"
                            placeholder="Title"
                          />
                          {formik.touched.RegistrationPageTitle &&
                          formik.errors.RegistrationPageTitle ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.RegistrationPageTitle}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Select Template </Form.Label>
                        <Form.Select
                          name="TemplateId"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.TemplateId}
                        >
                          <option> Select Template</option>
                          {templateList
                            ? templateList?.map((val, i) => (
                                <React.Fragment key={i}>
                                  <option value={val.id}>{val.name}</option>
                                </React.Fragment>
                              ))
                            : null}
                        </Form.Select>
                        {formik.touched.RegistrationPageTitle &&
                        formik.errors.RegistrationPageTitle ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.RegistrationPageTitle}
                          </div>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Form.Group className="mb-3">
                      <Form.Label>( http://51.89.210.56:3000/webinar/register/{eventCode}/{UrlAlias}/1) </Form.Label>
                      <Form.Control
                        name="url"
                        onChange={(e)=>setUrlAlias(e.target.value)}
                        value={UrlAlias}
                        type="text"
                        placeholder="url"
                      />
                      {UrlAlias ?null :(
                        <div style={{ color: "red" }}>Enter url alias</div>
                      ) }
                    </Form.Group>
                    <Row>
                      <Col xs={12}>
                        <Form.Label>Body Text</Form.Label>
                        <textarea
                          name="body"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.body}
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="18"
                        ></textarea>
                        {formik.touched.body && formik.errors.body ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.body}
                          </div>
                        ) : null}
                        <p style={{ color: "red" }}>{err}</p>
                      </Col>
                      {/* <Col xs={3}>
                        <div>
                          <img
                            id="imgVieww"
                            src={
                              flag == false
                                ? `http://51.89.210.56:8000${editdata.file}`
                                : ""
                            }
                            alt="Viewing the registration page image"
                            width={340}
                          />
                        </div>
                      </Col> */}
                    </Row>
                    {/* <Form.Group controlId="formFileLg" className="mb-3">
                      <Form.Label>Choice File</Form.Label>
                      <Form.Control
                        name="file"
                        onChange={(e) => {
                          handeleimage(e);
                        }}
                        type="file"
                        size="md"
                      />
                      <p style={{ color: "red" }}>{errimage}</p>
                    </Form.Group> */}
                    <Button type="submit">Save</Button>
                  </Row>
                </form>
                {/* {editdata[0].file} */}
              </Col>
            </Row>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default Registration;
