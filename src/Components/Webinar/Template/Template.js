import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../Sidebar";
const Template = () => {
  const [err, setErr] = useState(false);
  const [testMail, SetTestMail] = useState(false);
  const [event, setEvent] = useState([]);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [mail, SetMail] = useState();
  const [subj, setSubj] = useState();
  const [dpc, setDpc] = useState();
  const [Templatename, setTemplatename] = useState();
  const [Selectevent, setSelectevent] = useState();
  const [templateList, setTemplateList] = useState([]);
  const [template, setTemplate] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const handleUpdateTemplateData = () => {
    ExportApi.UpdateTemplate(subj,dpc,id).then((resp) => {
      if (resp.ok) {
       console.log(resp.data)
      }
    });
  };
  const formik = useFormik({
    initialValues: {
       Subject:template.subject?template.subject:'',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter your name"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter your email"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);

    },
  });
  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        //  console.log(resp.data)
        setEvent(resp.data.data);
      }
    });
  };
  const handleTestMail = (e) => {
    e.preventDefault();
    mail?ExportApi.UserTemplateSandMail(name,mail, id)
    .then((resp) => {
      if (resp.data) {
        console.log(resp.data)
        if (resp.data.code == 200) {
          toast.success(resp.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(resp.data);
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
    }):setErr("required")
    .catch((err) => console.log(err));
  };
  const handleCreateTemplate = () => {
    ExportApi.CreateTemplate(Templatename, Selectevent).then((resp) => {
      if (resp.ok) {
        if (resp.data.code == 200) {
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
          console.log(resp.data);
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
  };
  const handleGetTemplateList = (id) => {
    ExportApi.UserTemplateList(id).then((resp) => {
      if (resp.ok) {
        console.log(resp.data.data);
        setTemplateList(resp.data.data);
      }
    });
  };
  const handleGetTemplate = (id) => {
    SetTestMail(true)
    setId(id);
    ExportApi.UserTemplate(id).then((resp) => {
      if (resp.ok) {
        console.log(resp.data.data);
        setTemplate(resp.data.data);
      }
    });
  };
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
          <h2>
            <center>Templates</center>
          </h2>
          <Row>
          <Col className="mb-5">
          <Form.Label>Select Event </Form.Label>
                  <Form.Select
                    name="type"
                    onChange={(e) => handleGetTemplateList(e.target.value)}
                    onBlur={formik.handleBlur}
                    value={formik.values.type}
                  >
                    <option> Select Event</option>
                    {event?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option value={val.id}>{val.title}</option>
                      </React.Fragment>
                    ))}
                  </Form.Select>
            </Col>
            {testMail?<Col className="mb-5">
              <Button
                onClick={() => {
                  setModalShow2(true);
                }}
              >
               Test Mail
              </Button>
            </Col>:null}
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
        <Modal.Body>
         
          <Row>
            <Col className="mb-3">
            <Form.Label>Select Event </Form.Label>
                  <Form.Select
                    name="type"
                    onChange={(e) => handleGetTemplateList(e.target.value)}
                    onBlur={formik.handleBlur}
                    value={formik.values.type}
                  >
                    <option> Select Event</option>
                    {event?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option value={val.id}>{val.title}</option>
                      </React.Fragment>
                    ))}
                  </Form.Select>
            </Col>
            <Col className="mb-3">
              <Form.Label>Template Name </Form.Label>
              <Form.Control
              onChange={(e)=>{setTemplatename(e.target.value)}}
                name="Templatename"
                type="text"
                placeholder="Template Name"
              />
            </Col>
          </Row>
          <Button
            type="submit"
          >
            Go
          </Button>
        </Modal.Body>
      </Modal>
      <Modal
        show={modalShow2}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
        <form onSubmit={(e)=>handleTestMail(e)}>
          <Row>
          <Col>
              <Form.Group className="mb-3">
                <Form.Label>NAME</Form.Label>
                <Form.Control
                  onChange={(e)=>{setName(e.target.value)}}
                  type="text"
                  placeholder="Name"
                />
                <p style={{ color: "red" }}> {err ? err : null}</p>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e)=>SetMail(e.target.value)}
                  type="email"
                  placeholder="name@example.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                ) : null}
                <p style={{ color: "red" }}> {err ? err : null}</p>
              </Form.Group>
            </Col>
            <Row>
            <Col>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Choice File</Form.Label>
              <Form.Control
                name="file"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.file}
                placeholder="name@example.com"
                type="file"
                size="md"
              />
            </Form.Group>
          </Col>
            </Row>
          </Row>
          {/* <Button type="submit" onClick={handleUpdateTemplateData}>Send</Button> */}
          <Button type="submit">Send</Button>

         </form>
        </Modal.Body>
      </Modal>
      <Col md={{ span: 6, offset: 3 }}>
       <Row>
         <Col className="mb-5">
           {console.log(templateList)}
         {templateList.length>1?
         <Table bordered hover>
              <thead>
                <tr>
                  <th>Template Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  {templateList?templateList?.map((val,i) => (
                  <tr key={i}>  
                    <td>{val.name}</td>
                    <td><Button onClick={(e)=>{handleGetTemplate(val.id)}}>Edit</Button></td>
                  </tr>
                )): <h2>Data Not Found</h2>}
              </tbody>
            </Table>:null}

         </Col>
       </Row>

</Col>
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col
            className="shadow-lg p-3 mb-5 bg-white rounded"
            md={{ span: 6, offset: 3 }}
          >

            <Row>
              <Col className="mb-5">
            <Button 
            type="submit"
            onClick={() => {
              handleCreateTemplate();
            }}
          >
            Save
          </Button>
                <Col>
                  {" "}
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      name="Subject"
                      onChange={(e)=>{setSubj(e.target.value)}}
                      onBlur={formik.handleBlur}
                      value={formik.values.Subject}
                      type="text"
                      placeholder="Subject"
                    />
                  </Form.Group>
                </Col>
                <Col></Col>
              </Col>
            </Row>
            <CKEditor
              editor={ClassicEditor}
              data={template ? template.description : "hello"}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDpc(data)
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                // console.log( 'Blur.', editor );
              }}
              onFocus={(event, editor) => {
                // console.log( 'Focus.', editor );
              }}
            />
            
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default Template;
