import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
const EmailSand = () => {
  const [currentPage, setCurrentPage] = useState();
  const [type, setType] = useState();
  const [paginate, setPaginate] = useState();
  const [event, setEvent] = useState([]);
  const [eventId, setEventId] = useState();
  const [eventName, setEventName] = useState();
  const [Show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [EmailData, setEmailData] = useState();
  const [templateList, setTemplateList] = useState();
  const [templateId, setTemplateId] = useState();
  const [massage, setMassage] = useState();
  const [registeredNonRegistered, setRegisteredNonRegistered] = useState();
  const [checked, setChecked] = React.useState([1]);
  const [Checkbox, setCheckbox] = React.useState([]);
  const [data, setData] = useState([]);
  const [image, setimage] = useState("");
  const [All, setAll] = useState([]);
  const handeleimage = (e) => {
    setimage(e.target.files[0]);
  };
  const downloadFile = () => {
        let link = document.createElement('a');
        link.href = "http://51.89.210.56:8000/files/Sample.xlsx";
        link.setAttribute('download', 'file.xlsx');
        document.body.appendChild(link);
        link.download = '';
        link.click();
        document.body.removeChild(link);
  }
  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        setEvent(resp.data.data);
      }
    });
  };
  const handeleSearch = (e) => {
    ExportApi.ParticipantPageSearch(
      currentPage,
      eventId,
      registeredNonRegistered,
      type,
      e
    ).then((resp) => {
      if (resp.ok) {
        if (resp.data.code === 404) {
          setEmailData();
          setMassage("Data Not Found");
        } else {
          setMassage(false)
          console.log(resp.data.data);
          let a = resp.data.data.data;
          for (let index = 0; index < a.length; index++) {
            if (a.length !== Checkbox.length) Checkbox.push({ Check: false });
          }
          setPaginate(resp.data.data.paginate);
          setCurrentPage(resp.data.data.paginate.currentPage);
          setEmailData(resp.data.data.data);
        }
      }
    });
  };
  const sendExcelFile = () => {
    let formData = new FormData();
    formData.append("file", image);
    formData.append("event_id", eventId);
    if (image) {
      ExportApi.Excelsend(formData).then((resp) => {
        if (resp.ok) {
          if (resp.data.code == 200) {
            setShow(false);
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
          console.log(resp.data);
        }
      });
    }
  };

  const handleGetTemplateList = (id) => {
    ExportApi.UserTemplateList(id).then((resp) => {
      if (resp.ok) {
        console.log("first", resp.data.code);
        if (resp.data.code == 404) {
          setTemplateId();
        }
        setTemplateList(resp.data.data);
      }
    });
  };
  const handleGetTemplateListhtml = () => {
    setModalShow(true);
    ExportApi.UserTemplate(templateId).then((resp) => {
      if (resp.ok) {
        console.log(resp.data.data.subject);
        document.getElementById("title").innerText = resp.data.data.subject;
        document.getElementById("one").innerHTML = resp.data.data.description;
      }
    });
  };
  const handleGSendEmail = (id) => {
    let a = JSON.stringify(data);
    ExportApi.sandAllmaik(templateId, a, registeredNonRegistered).then(
      (resp) => {
        if (resp.ok) {
          if (resp.data.code == 200) {
            setShow(false);
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
          console.log(resp.data.data);
        }
      }
    );
  };
  const handleGetEmaildataRegistered = (value) => {
    if (value =="null") {
      setMassage("Data Not Found");
      setEmailData();
    } else {
    ExportApi.EmailSandRegistered(value, eventId).then((resp) => {
      if (resp.ok) {
        if (resp.data.code === 404) {
          setMassage("Data Not Found");
          setEmailData();
        } else {
          setMassage(false)
          console.log(resp.data.data);
          let a = resp.data.data.data;
          for (let index = 0; index < a.length; index++) {
            if (a.length !== Checkbox.length) Checkbox.push({ Check: false });
          }
          setPaginate(resp.data.data.paginate);
          setCurrentPage(resp.data.data.paginate.currentPage);
          setEmailData(resp.data.data.data);
        }
      }
    });
  }
  };
  const handleGetEmaildataRegisteredUserType = (value) => {
    ExportApi.EmailSandRegisteredType(
      registeredNonRegistered,
      eventId,
      value
    ).then((resp) => {
      if (resp.ok) {
        if (resp.data.code === 404) {
          setEmailData();
          setMassage("Data Not Found");
        } else {
          setEmailData(resp.data.data.data);
          let a = resp.data.data.data;
          for (let index = 0; index < a.length; index++) {
            if (a.length !== Checkbox.length) Checkbox.push({ Check: false });
          }
          setPaginate(resp.data.data.paginate);
          setCurrentPage(resp.data.data.paginate.currentPage);
        }
      }
    });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().required("Email is required"),
    }),
    onSubmit: (values) => {
      ExportApi.EmailSand(eventId, values.name, values.email)
        .then((resp) => {
          if (resp.data) {
            if (resp.data.code == 200) {
              setShow(false);
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
  useEffect(() => {
    handleGetEventlist();
  }, []);
  const Checkboxhandle = (e) => {
    if (e.target.checked === false) {
      setData([]);
      setAll([]);
    }
    for (let index = 0; index < EmailData.length; index++) {
      const obj = EmailData[index];
      const Check = Checkbox[index];
      Check.Check = e.target.checked;
      Checkbox.splice(index, 1, Check);
      setChecked([...Checkbox]);
      console.log(obj);
      if (e.target.checked === true) {
        All.push(obj);
        setData(All);
      }
    }
  };
  const Checkboxhandlebox = (e, val, i) => {
    const Check1 = Checkbox[i];
    Check1.Check = e.target.checked;
    Checkbox.splice(i, 1, Check1);
    console.log(Checkbox);
    setChecked([...Checkbox]);
    if (e.target.checked === true) {
      setData([...data, val]);
    } else {
      const index = data?.findIndex((v) => v.id == val.id);
      const dataCopy = data;
      console.log(dataCopy);
      dataCopy.splice(index, 1);
      console.log(dataCopy);
      setData(dataCopy);
    }
  };
  const handleTempId = (e) => {
    console.log(e);
    if (e == "null") {
      setTemplateId();
    } else {
      setTemplateId(e);
    }
  };
  const handleGetParticipantPage = (id) => {
    ExportApi.ParticipantPage(id, eventId, registeredNonRegistered).then(
      (resp) => {
        if (resp.ok) {
          console.log(resp.data);
          if (resp.data.code === 404) {
            setEmailData();
            setMassage("Data Not Found");
          } else {
            setMassage(false)
            setPaginate(resp.data.data.paginate);
            setCurrentPage(resp.data.data.paginate.currentPage);
            setEmailData(resp.data.data.data);
          }
        }
      }
    );
  };

  useEffect(() => {
    console.log(data);
  }, [checked, data]);
  return (
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
        <h2>Email Send</h2>
        <Row style={{ paddingTop: "20px" }}>
          {eventId === "null" ||
          eventId === null ||
          eventId === undefined ? null : (
            <Col>
              <Button onClick={() => setShow(true)}>Add User</Button>
            </Col>
          )}
          {data.length>0&&templateId?<Col>
            <Button
              onClick={() => {
                handleGSendEmail();
              }}
            >
              Send Mail
            </Button>
          </Col>:null}
        </Row>
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <Form.Label>Select Event </Form.Label>
            <Form.Select
              name="type"
              onChange={(e) => {
                handleGetTemplateList(e.target.value);
                setEventId(e.target.value);
                setEventName(e.target.options[e.target.selectedIndex].text);
              }}
            >
              <option value="null"> Select Event</option>
              {event?.map((val, i) => (
                <React.Fragment key={i}>
                  <option value={val.id}>{val.title}</option>
                </React.Fragment>
              ))}
            </Form.Select>
          </Col>
          <Col>
            {eventId==="null"||eventId===null||eventId===undefined?null: (
              <>
                <Form.Label>Select Template </Form.Label>
                <Form.Select
                  onChange={(e) => {
                    handleTempId(e.target.value);
                  }}
                  name="type"
                >
                  <option value="null"> Select Template</option>
                  {templateList
                    ? templateList?.map((val, i) => (
                        <React.Fragment key={i}>
                          <option value={val.id}>{val.name}</option>
                        </React.Fragment>
                      ))
                    : null}
                </Form.Select>
              </>
            )}
          </Col>
          <Col>
            {templateList != undefined || templateList != null ? (
              <>
                {templateId ? (
                  <Button
                    onClick={() => {
                      handleGetTemplateListhtml();
                    }}
                  >
                    Preview
                  </Button>
                ) : null}
              </>
            ) : null}
          </Col>
          <Col>
            {eventId==="null"||eventId===null||eventId===undefined?null:  (
              <>
                <Form.Label>Select Users </Form.Label>
                <Form.Select
                  onChange={(e) => {
                    handleGetEmaildataRegistered(e.target.value);
                    setRegisteredNonRegistered(e.target.value);
                  }}
                  aria-label="Default select example"
                >
                  <option value="null">Select User</option>
                  <option value={0}>All Registered</option>
                  <option value={1}>All Non Registered</option>
                </Form.Select>
              </>
            )}
          </Col>
          {eventId==="null"||eventId===null||eventId===undefined?null:<Col>
            {registeredNonRegistered==="null"||registeredNonRegistered===null||registeredNonRegistered===undefined||registeredNonRegistered==1?null: (
              <>
                <Form.Label>Select User Type </Form.Label>
                <Form.Select
                  onChange={(e) => {
                    handleGetEmaildataRegisteredUserType(e.target.value);
                    setType(e.target.value);
                  }}
                >
                  <option>Select User Type</option>
                  <option value="HCP">HCP</option>
                  <option value="Staff User">Staff User</option>
                  <option value="Test User">Test User</option>
                </Form.Select>
              </>
            ) }
          </Col>
          }
        </Row>
        <Row>
          {eventId === "null" ||
          eventId === null ||
          eventId === undefined ? null : (
            <Col>
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Choice File</Form.Label>
                <Form.Control
                  name="file"
                  onChange={(e) => {
                    handeleimage(e);
                  }}
                  type="file"
                  size="md"
                  accept="application/vnd.ms-excel"
                />
                <p>Excel file should contain first name, last name and email</p>
                <Button
                  onClick={() => {
                    sendExcelFile();
                  }}
                >
                  Upload
                </Button>
              </Form.Group>
            </Col>
          )}
          <>
            <Row>
              <Col>
                <div class="download-sample">
              <div class="upload-btn" onClick={downloadFile}>
                <label for="input-file">Download Sample File</label>
              </div>
            </div>
              </Col>
              <Col>
                <Form.Control
                  name="Search"
                  onChange={(e) => {
                    handeleSearch(e.target.value);
                  }}
                  type="text"
                  size="md"
                  placeholder="Search....."
                />
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <h6>Selected User {data.length > 0 ? data.length : 0}</h6>
            <br />
            {eventId==="null"||eventId===null||eventId===undefined?null:  <Table bordered hover>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        Checkboxhandle(e);
                      }}
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {EmailData==="null"||EmailData===null||EmailData===undefined?<h2>{massage}</h2>: (
                  EmailData?.map((val, i) => (
                    <tr key={i}>
                      <td>
                        <input
                          type="checkbox"
                          value={Checkbox[i].Check}
                          checked={Checkbox[i].Check}
                          onChange={(e) => Checkboxhandlebox(e, val, i)}
                        />
                      </td>
                      {val.name ? (
                        <td>{val.name}</td>
                      ) : (
                        <td>
                          {val.first_name} {val.last_name}
                        </td>
                      )}
                      <td>{val.email}</td>
                    </tr>
                  ))
                )}
              </tbody>
              <Row style={{ color: "blue" }}>
                {/* <Col></Col> */}
                {paginate?.previousPageUrl ? (
                  <Col>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleGetParticipantPage(currentPage - 1);
                      }}
                    >
                      Previous
                    </p>
                  </Col>
                ) : null}
                {paginate?.nextPageUrl ? (
                  <Col>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleGetParticipantPage(currentPage + 1);
                      }}
                    >
                      Next
                    </p>
                  </Col>
                ) : null}
              </Row>
            </Table>}
          </>
        </Row>
      </Col>

      <Modal
        size="sm"
        show={Show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body>
          <div>
            <h2 style={{ fontWeight: "bold" }}>
              <center>{eventName ? eventName : null}</center>
            </h2>
            <center>
              <h5 style={{ color: "gray" }}>Add User</h5>
            </center>
          </div>
          <br />
          <form onSubmit={formik.handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div style={{ color: "red" }}>{formik.errors.name}</div>
                ) : null}
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label column sm={2}>
                Email{" "}
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                ) : null}
              </Col>
            </Form.Group>
            <Button type="submit" className="event-submit-button">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header onClick={() => setModalShow(false)} closeButton>
          <Modal.Title>
            <div id="title"></div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="one"></div>
        </Modal.Body>
      </Modal>
      <Col></Col>
    </Row>
  );
};

export default EmailSand;
