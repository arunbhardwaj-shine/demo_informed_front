import React, { useEffect, useState,useRef } from "react";
import EmailEditor from 'react-email-editor';
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import CreateTemplate from "./CreateTemplate";
import { Testmail } from "./Testmail";
const Template = () => {
  const [testMail, SetTestMail] = useState(false);
  const [event, setEvent] = useState([]);
  const [id, setId] = useState();
  const [tName, setTName] = useState();
  const [templateList, setTemplateList] = useState();
  const [template, setTemplate] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [dpc, setDpc] = useState();
  const [render, setRender] = useState(0);
  const [hello, setHello] = useState(JSON.parse(localStorage.getItem('hello')));
  const formik = useFormik({
    initialValues: {
       Subject:template?template.subject:'',
    },
    validationSchema: Yup.object({
      Subject: Yup.string().required("Enter your subject"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      const exportHtml = async () => {
        emailEditorRef.current.editor.exportHtml((data) => {
          const { design, html } = data;
          // console.log("htmmmm",html)
          setDpc(design)
          localStorage.setItem('html', html);
           localStorage.setItem('bodyaa', JSON.stringify(design));
           ExportApi.UpdateTemplate(values.Subject,design,html,localStorage.getItem("idd")).then((resp) => {
            if (resp.ok) {
              if (resp.data.code == 200) {
                setDpc()
                setModalShow(false)
                // handleGetEventlist()
                  //  handleGetTemplate(localStorage.getItem("idd"))
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
              })
      };
      exportHtml();
        // setDpc (JSON.parse(dpc));
        // let data1=JSON.parse(localStorage.getItem('bodyaa'))
     
    },
  });
  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        setEvent(resp.data.data);
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
  
  const handleGetTemplate = (idd) => {
    setDpc()
     setId(idd);
      ExportApi.UserTemplate(idd).then((resp) => {
        if (resp.ok) {
          //   console.log('1',resp.data.data.json_description)
          // setDpc(resp.data.data.json_description?JSON.parse(resp.data.data.json_description):"")
          setTemplate(resp.data.data);
          setTimeout(() => {
            
            emailEditorRef.current.editor.loadDesign(resp.data.data.json_description?JSON.parse(resp.data.data.json_description ):hello)
          }, 1000);
        }
      });
  };
  
  const emailEditorRef = useRef(null);
  const onLoad = () => {
      // emailEditorRef.current.editor.loadDesign(dpc?dpc:hello);
  }
  const onReady = () => {
    // await emailEditorRef.current.editor.loadDesign(dpc)
    console.log('onReady');
  };
  const handleError = () => {
if(template==null||template==undefined){
  setDpc()
  setTemplate()
}
  }
  useEffect(() => {
    handleError()
  }, [template]);
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
        <Col md={{ span: 8, offset: 3 }}>
          <h2>
            Templates
          </h2>
          <Row>
          <Col className="mb-5">
          <Form.Label>Select Event </Form.Label>
                  <Form.Select
                    name="type"
                    onChange={(e) =>{handleGetTemplateList(e.target.value);setTemplateList(null);setTemplate(null)}}
                    onBlur={formik.handleBlur}
                    value={formik.values.type} >
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
                onClick={() => {setModalShow(true); }}>
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
        centered >
            <Modal.Header onClick={()=>setModalShow(false)} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Create Template
                </Modal.Title>
              </Modal.Header>
        <Modal.Body>
    <CreateTemplate htTemplate={handleGetTemplateList} data={setModalShow} />
        </Modal.Body>
      </Modal>
      <Modal
        show={modalShow2}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered >
            <Modal.Header onClick={()=>setModalShow2(false)} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Test Mail
                </Modal.Title>
              </Modal.Header>
        <Modal.Body>
         <Testmail data={setModalShow2} data1={id}/>
        </Modal.Body>
      </Modal>
      <Col md={{ span: 8, offset: 3 }}>
       <Row>
         <Col className="mb-5">
         {templateList!=undefined||templateList!=null?
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
                    <td><Button
                onClick={(e) => { setModalShow2(true);setId(val.id) }} >
               Test Mail
              </Button><Button onClick={(e)=>{localStorage.setItem("idd",val.id) ; handleGetTemplate(val.id);localStorage.setItem("template",val.name);setTName(val.name)}}>Edit</Button> </td>
                  </tr>
                )):<h2>Data Not Found</h2>}
              </tbody>
            </Table>:<h2>Data Not Found</h2>}
         </Col>
       </Row>
      </Col>
      {template?
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col
            className="shadow-lg p-3 mb-5 bg-white rounded"
            md={{ span: 8, offset: 3 }}
          >
            <Col><h4>Template name : {tName?tName:localStorage.getItem("template")}</h4> </Col>
            <Row>
              <Col className="mb-5">
            <Button type="submit" >
            Save
          </Button>
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
                <div style={{ color: "red" }}>{formik.errors.Subject}</div>
              ) : null}
                  </Form.Group>
                </Col>
                <Col></Col>
              </Col>
            </Row>
            <div>
            <Form.Label >
                  Description
                </Form.Label>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
    </div>
          </Col>
        </Row>  
     </form>:null}
    </div>
  );
};

export default Template;
