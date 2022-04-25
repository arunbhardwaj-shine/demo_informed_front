import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CKEditor } from '@ckeditor/ckeditor5-react';
 import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Template = () => {
  const [err, setErr] = useState(false);
  const [event, setEvent] = useState([]);
  const [id, setId] = useState();
  const [templateList, setTemplateList] = useState([]);
  const [template, setTemplate] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      file:"",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter your name"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter your email"),
    }),
    onSubmit: (values) => {
      console.log(values)
      ExportApi.UserTemplateSandMail(values.name, values.email,id)
        .then((resp) => {
          if (resp.data) {
            if (resp.data.code == 200) {
              console.log(resp.data);
            }
          }
        })
        .catch((err) => console.log(err));
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
  const handleGetTemplateList = (id) => {
    ExportApi.UserTemplateList(id).then((resp) => {
      if (resp.ok) {
          console.log(resp.data.data)
          setTemplateList(resp.data.data);
      }
    });
  };
  const handleGetTemplate = (id) => {
    setId(id)
    ExportApi.UserTemplate(id).then((resp) => {
      if (resp.ok) {
          console.log(resp.data.data)
          setTemplate(resp.data.data);
      }
    });
  };
  useEffect(() => {
    handleGetEventlist()
  }, [])
  return (
    <div>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>
            <center>Set Template</center>
          </h2>
          <Row>
            <Col className="mb-5">
              <Button onClick={()=>{setModalShow(true)}}>Create New Template</Button>
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
         <Form.Label >Select Event </Form.Label>
           <Form.Select
                name="type"
                onChange={(e)=>handleGetTemplateList(e.target.value)} 
                onBlur={formik.handleBlur}
              value={formik.values.type}
            >
              <option> Select Event</option>
              {event?.map((val, i) => (
                   <React.Fragment key={i}>
                        <option  value={val.id}>
                          {val.title}
                        </option>
                        </React.Fragment>
              ))}
            </Form.Select>
            </Col>
        <Col className="mb-3"><Form.Label >Template Name </Form.Label>
        <Form.Control
                    name="Templatename"
                    type="text"
                    placeholder="Template Name"
      /> </Col>
        </Row>
       <Button type="submit" onClick={()=>setModalShow(false)} >Go</Button>
      </Modal.Body>
    </Modal>
            <form onSubmit={formik.handleSubmit}>
    <Row>

        <Col className="shadow-lg p-3 mb-5 bg-white rounded" md={{ span: 6, offset: 3 }}>
        <Col>  <Col>
                <Button type="submit">Send</Button>
              </Col>
                <Form.Group className="mb-3">
                  <Form.Label>NAME</Form.Label>
                  <Form.Control
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    type="text"
                    placeholder="Name"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div style={{ color: "red" }}>{formik.errors.name}</div>
                  ) : null}
                  <p style={{ color: "red" }}> {err ? err : null}</p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    type="email"
                    placeholder="name@example.com"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                  ) : null}
                  <p style={{ color: "red" }}> {err ? err : null}</p>
                </Form.Group>
              </Col>
              <Col> <Form.Group controlId="formFileLg" className="mb-3">
    <Form.Label>Choice File</Form.Label>
    <Form.Control  name="file"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.file}
                    placeholder="name@example.com" type="file" size="md" />
  </Form.Group></Col>
            <Row>
            
         
                <Col>
            <Col className="mb-3"> <Form.Label >Select Event </Form.Label>
            <Form.Select
                name="type"
                onChange={(e)=>handleGetTemplateList(e.target.value)} 
                onBlur={formik.handleBlur}
              value={formik.values.type}
            >
              <option> Select Event</option>
              {event?.map((val, i) => (
                   <React.Fragment key={i}>
                        <option  value={val.id}>
                          {val.title}
                        </option>
                        </React.Fragment>
              ))}

            </Form.Select></Col>
            <Col className="mb-3"> <Form.Label >Email Template </Form.Label>
              <Form.Select
               name="Templateid"
                onChange={(e)=>handleGetTemplate(e.target.value)}
                onBlur={formik.handleBlur}
                value={formik.values.templateid}
              ><option>Please Select</option>
                {templateList?.map((val, i) => (
                   <React.Fragment key={i}>
                        <option  value={val.id}>
                          {val.name}
                        </option>
                        </React.Fragment>
              ))}
              </Form.Select></Col>
              <Col>    <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    name="Subject"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                     value={template.subject}
                    type="text"
                    placeholder="Subject"
                  />
                </Form.Group></Col>
            <Col></Col>
            </Col>
            </Row>
                    <CKEditor
                    editor={ ClassicEditor }
                     data={template?template.description:"hello"}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        // console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        // console.log( 'Focus.', editor );
                    } }
                />
                
                </Col>
                </Row>
</form>
                
    </div>
  );
};

export default Template;
