import React, { useEffect, useState, useRef } from "react";
import EmailEditor from "react-email-editor";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import CreateTemplate from "./CreateTemplate";
import { Testmail } from "./Testmail";
import Delete from './../Readers/Delete.jpg'
import { loader } from "../../../loader";
const Template = () => {
  const [testMail, SetTestMail] = useState(false);
  const [event, setEvent] = useState([]);
  const [id, setId] = useState();
  const [eventid, setEventId] = useState();
  const [tName, setTName] = useState();
  const [templateList, setTemplateList] = useState();
  const [template, setTemplate] = useState();
  const [templateId, setTemplateId] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [dpc, setDpc] = useState();
  const [render, setRender] = useState(0);
  const [modalShow1, setModalShow1] = useState(false);
  const [hello, setHello] = useState(JSON.parse(localStorage.getItem("hello")));
  
  const formik = useFormik({
    initialValues: {
      Subject: template ? template.subject : "",
      tempName:template ? template.name : "",
      eventid:template ? template.event_id : "",
    },
    validationSchema: Yup.object({
      Subject: Yup.string().required("Enter your subject"),
      tempName: Yup.string().required("Enter your templete name"),
      eventid: Yup.string().required("select event"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      loader("show")
      const exportHtml = async () => {
        emailEditorRef.current.editor.exportHtml((data) => {
          const { design, html } = data;
          setDpc(design);
          localStorage.setItem("html", html);
          ExportApi.UpdateTemplate(
            values.Subject,
            values.tempName,
            values.event_id,
            design,
            html,
            localStorage.getItem("idd")
          ).then((resp) => {
            if (resp.ok) {
              if (resp.data.code == 200) {
                loader("hide")
                setDpc();
                setModalShow(false);
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
          });
        });
      };
      exportHtml();
    },
  });
  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        setEvent(resp.data.data);
        setEventId(resp.data.data[0].id)
        handleGetTemplateList(resp.data.data[0].id)
      }
    });
  };
  const handleGetTemplateList = (id) => {
    ExportApi.UserTemplateList(id).then((resp) => {
      if (resp.ok) {
        setTemplateList(resp.data.data);
      }
    });
  };
  const handleDeleteTemplate = () => {
    console.log("yyy",templateId)
    ExportApi.DeleteTemplate(templateId.id).then((resp) => {
      if (resp.ok) {
        console.log("yyy",templateId.id)
        console.log("ywy",templateId.event_id)
        handleGetTemplateList(eventid)
        
      }
    });
  };

  const handleGetTemplate = (idd) => {
    setDpc();
    setId(idd);
    ExportApi.UserTemplate(idd).then((resp) => {
      if (resp.ok) {
        console.log("first,",resp.data.data)
        setTemplate(resp.data.data);
        setTimeout(() => {
          emailEditorRef.current.editor.loadDesign(
            resp.data.data.json_description
              ? JSON.parse(resp.data.data.json_description)
              : hello
          );
        }, 1000);
      }
    });
  };

  const emailEditorRef = useRef(null);
  const onLoad = () => {
    // emailEditorRef.current.editor.loadDesign(dpc?dpc:hello);
  };
  const onReady = () => {
    // await emailEditorRef.current.editor.loadDesign(dpc)
    console.log("onReady");
  };
  const handleError = () => {
    if (template == null || template == undefined) {
      setDpc();
      setTemplate();
    }
  };
  useEffect(() => {
    handleError();
  }, [template]);
  useEffect(() => {
    handleGetEventlist();
  }, []);
  return (
    <div class="right-sidebar">
       <div className="loader" id="custom_loader">
	        <span className="loader-view"> </span>
          </div>
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
        <Col md={{ span: 8, offset: 3 }}>
          <h2>Templates</h2>
          <Row>
            <Col className="mb-5">
              <Form.Label>Select Event </Form.Label>
              <Form.Select
                name="type"
                value={eventid}
                onChange={(e) => {
                  handleGetTemplateList(e.target.value);
                  setTemplateList(null);
                  setTemplate(null);
                  setEventId(e.target.value)
                }}
              >
                <option> Select Event</option>
                {event?.map((val, i) => (
                  <React.Fragment key={i}>
                    <option value={val.id}>{val.title}</option>
                  </React.Fragment>
                ))}
              </Form.Select>
            </Col>
            <Col className="mb-5">
              <Button
                onClick={() => {
                  setModalShow(true);
                }}
              >
                Create New Template
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header onClick={() => setModalShow(false)} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Template
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTemplate
            htTemplate={handleGetTemplateList}
            data={setModalShow}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={modalShow2}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header onClick={() => setModalShow2(false)} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Test Mail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Testmail data={setModalShow2} data1={id} />
        </Modal.Body>
      </Modal>
      <Col md={{ span: 8, offset: 3 }}>
        <Row>
          <Col className="mb-5">
            {templateList != undefined || templateList != null ? (
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Template Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {templateList ? (
                    templateList?.map((val, i) => (
                      <tr key={i}>
                        <td>{val.name}</td>
                        <td>
                          <Button
                            onClick={(e) => {
                              setModalShow2(true);
                              setId(val.id);
                            }}
                          >
                            Test Mail
                          </Button>
                          <Button
                            onClick={(e) => {
                              localStorage.setItem("idd", val.id);
                              handleGetTemplate(val.id);
                              localStorage.setItem("template", val.name);
                              setTName(val.name);
                            }}
                          >
                            Edit
                          </Button>{" "}
                          <img
                                src={Delete}
                                onClick={() => {
                                  setModalShow1(true)
                                  setTemplateId(val)
                                  // handleGetReadersDataPage(currentPage);
                                }}
                                width={90}
                              />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h2>Data Not Found</h2>
                  )}
                </tbody>
              </Table>
            ) : (
              <h2>Data Not Found</h2>
            )}
          </Col>
          <Modal
      show={modalShow1}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header onClick={()=>setModalShow1(false)} closeButton>
      </Modal.Header>
      <Modal.Body>
        <h6>The Delete action will delete the HCP from your account entirly</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{handleDeleteTemplate(); setModalShow1(false)}}>Delete</Button>
        <Button onClick={()=>{setModalShow1(false)}}>Close</Button>
      </Modal.Footer>
    </Modal>
        </Row>
      </Col>
      {template ? (
        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col
              className="shadow-lg p-3 mb-5 bg-white rounded"
              md={{ span: 8, offset: 3 }}
            >
              <Col>
                {/* <h4>
                  Template name :{" "}
                  {tName ? tName : localStorage.getItem("template")}
                </h4>{" "} */}
              </Col>
              <Row>
                <Col className="mb-5">
                  <Button type="submit">Save</Button>
                  <Col className="mb-5">
              <Form.Label>Select Event </Form.Label>
              <Form.Select
                name="eventid"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.eventid}
              >
                <option> Select Event</option>
                {event?.map((val, i) => (
                  <React.Fragment key={i}>
                    <option value={val.id}>{val.title}</option>
                  </React.Fragment>
                ))}
              </Form.Select>
              {formik.touched.eventid && formik.errors.eventid ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.eventid}
                        </div>
                      ) : null}
            </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Template name</Form.Label>
                      <Form.Control
                        name="tempName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.tempName}
                        type="text"
                        placeholder="Template name"
                      />
                      {formik.touched.tempName && formik.errors.tempName ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.tempName}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col>
                  <Form.Group className="mb-3">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        name="Subject"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Subject}
                        type="text"
                        placeholder="Subject"
                      />
                      {formik.touched.Subject && formik.errors.Subject ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.Subject}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Col>
              </Row>
              <div>
                <Form.Label>Description</Form.Label>
                <EmailEditor
                  ref={emailEditorRef}
                  onLoad={onLoad}
                  onReady={onReady}
                />
              </div>
            </Col>
   
          </Row>
        </form>
      ) : null}
    </div>
  );
};

export default Template;
