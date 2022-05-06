import React, { useEffect, useState,useRef } from "react";
import { render } from 'react-dom';

import EmailEditor from 'react-email-editor';
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
  const [editLinkData, setEditLinkData] = useState([]);
  const [render, setRender] = useState(0);
  const [hello, setHello] = useState(JSON.parse(localStorage.getItem('hello')));
  const [linkInput, setLinkInput] = useState([
    { name: "LinkName", link: "Link" },
  ]);
  const [linkData, setLinkData] = useState([{ name: "", link: "" }]);
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
          localStorage.setItem('bodyaa', JSON.stringify(design));
              })
      };
      exportHtml();
      setDpc (JSON.parse(localStorage.getItem('bodyaa')))
      let data = JSON.stringify(linkData);
      ExportApi.UpdateTemplate(values.Subject,localStorage.getItem('bodyaa'),id,linkData[0].name&&linkData[0].link?data:null,).then((resp) => {
        if (resp.ok) {
          if (resp.data.code == 200) {
            setLinkInput([ { name: "LinkName", link: "Link" }])
            setLinkData([{ name: "", link: "" }])
            setModalShow(false)
            handleGetEventlist()
             handleGetTemplate(localStorage.getItem("idd"))
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

    },
  });
  const handleEditInputValue= (data)=>{
    console.log(data)
    setLinkData(data)
   
    if(data){
    for (let index = 1; index < data.length; index++) {  
      linkInput.push({ name: "LinkName", link: "Link" })
     }
    }else{
      console.log("editLinkData.length<1")
      setLinkInput([ { name: "LinkName", link: "Link" }])
      setLinkData([{ name: "", link: "" }])
      setRender(render+1)
    }
  }

  const handleMaltiInputRumove = (i) => {
      let data=[...linkInput]
      let data1=[...linkData]
      data.splice(i, 1);
      data1.splice(i, 1);
      setTimeout(() => {
        setLinkInput(data);
      },500);
      setLinkData(data1)
      
  };
  const handleMaltiInputAdd = () => {
    setLinkInput([...linkInput,{ name: "LinkName", link: "Link" }]);
    setLinkData([...linkData, { name: "", link: "" }]);
  };
  const handleLinkValue = (e, i) => {
    if (e.target.name === `LinkName${i}`) {
      const linkInput = linkData[i];
      linkInput.name = e.target.value;
      linkData.splice(i, 1, { ...linkInput });
      setLinkData([...linkData]);
    } else if (e.target.name === `Link${i}`) {
      const linkInput = linkData[i];
      linkInput.link = e.target.value;
      linkData.splice(i, 1, { ...linkInput});
      setLinkData([...linkData]);
    }
  };
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
     setId(idd);
    ExportApi.UserTemplate(idd).then((resp) => {
      if (resp.ok) {
        setEditLinkData(resp.data.data.data)
        // resp.data.data.description===""? setDpc():setDpc(JSON.parse(resp.data.data.description))
        handleEditInputValue(resp.data.data.data,resp.data.data.description)
        setTemplate(resp.data.data);
        // emailEditorRef.current.editor.loadDesign(resp.data.data.description?JSON.parse(resp.data.data.description):hello)
      }
    });
  };

  const emailEditorRef = useRef(null);
  const onLoad =  () => {
    setTimeout(function(){
      emailEditorRef.current.editor.loadDesign(dpc?dpc:hello);
    }, 2000);
  }
  const onReady = () => {
     emailEditorRef.current.editor.loadDesign(hello)
    console.log('onReady');
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
              {linkInput.map((malti, i) => (
                <fieldset className="border p-2">
                  <div key={i}>
                    {linkInput.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => handleMaltiInputRumove(i)}
                        className="btn-close float-end"
                        aria-label="Close"
                      />
                    ) : null}
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label column sm={2}>
                        Link Name
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                        value={linkData[i]?.name}
                          name={
                            linkInput.length === 0 ? malti?.name : malti?.name + i
                          }
                          onChange={(e) => {
                            handleLinkValue(e, i);
                          }}
                        />
                      </Col>
                      <div className="mt-2"></div>
                      <Form.Label column sm={2}>
                      Link
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                        value={linkData[i]?.link}
                          name={
                            linkInput.length === 0 ? malti.link : malti.link + i
                          }
                          onChange={(e) => {
                           handleLinkValue(e, i);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </div>
                </fieldset>
              ))}
              <div className="mt-2"></div>
              <Form.Group className="mb-3">
                <Button
                  onClick={handleMaltiInputAdd}
                  className="speaker-button"
                >
                  Add More Speaker
                </Button>
              </Form.Group>
              <div className="clearfix"></div>
              <div className="mt-2"></div>   
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
