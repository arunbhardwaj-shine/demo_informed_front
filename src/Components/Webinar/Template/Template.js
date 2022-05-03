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
  const [hello, setHello] = useState();
 
  const formik = useFormik({
    initialValues: {
       Subject:template?template.subject:'',
    },
    validationSchema: Yup.object({
      Subject: Yup.string().required("Enter your subject"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(dpc)
      const exportHtml = async () => {
              emailEditorRef.current.editor.exportHtml((data) => {
                const { design, html } = data;
                localStorage.setItem('bodyaa', JSON.stringify(design));
              })
            };
        exportHtml();
        setDpc (JSON.parse(localStorage.getItem('bodyaa')))
        
      ExportApi.UpdateTemplate(values.Subject,JSON.stringify(dpc),id).then((resp) => {
        if (resp.ok) {
          if (resp.data.code == 200) {
            setModalShow(false)
            handleGetEventlist()
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
  const handleGetTemplate =async (id) => {
     setId(id);
     await SetTestMail(true)
    ExportApi.UserTemplate(id).then((resp) => {
      if (resp.ok) {
       console.log()
        setTemplate(resp.data.data);
        setDpc(resp.data.data.description)
      }
    });
  };
  const emailEditorRef = useRef(null);



  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    console.log("dpc",dpc?JSON.parse(dpc):`hello`)
     emailEditorRef.current.editor.loadDesign(dpc?JSON.parse(dpc):JSON.parse(hello));
  }

  const onReady = () => {
    // editor is ready
    
    console.log('onReady');
  };
  useEffect(() => {
    setHello(`"{"counters":{"u_column":1,"u_row":1,"u_content_heading":3,"u_content_html":3},"body":{"id":"Emt5B8Ar2i","rows":[{"id":"7w2SSIOsw-","cells":[1],"columns":[{"id":"QBU24hpeei","contents":[{"id":"Dx4pV1GscS","type":"heading","values":{"containerPadding":"10px","anchor":"","headingType":"h1","fontFamily":{"label":"Arial","value":"arial,helvetica,sans-serif"},"fontSize":"22px","textAlign":"left","lineHeight":"140%","linkStyle":{"inherit":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"displayCondition":null,"_meta":{"htmlID":"u_content_heading_1","htmlClassNames":"u_content_heading"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true,"text":"Heading"}},{"id":"kdzFBDdNHi","type":"html","values":{"html":"<strong>Hello, world!</strong>","displayCondition":null,"containerPadding":"10px","anchor":"","_meta":{"htmlID":"u_content_html_1","htmlClassNames":"u_content_html"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}},{"id":"qsJQRrPQGF","type":"heading","values":{"containerPadding":"10px","anchor":"","headingType":"h1","fontFamily":{"label":"Arial","value":"arial,helvetica,sans-serif"},"fontSize":"22px","textAlign":"left","lineHeight":"140%","linkStyle":{"inherit":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"displayCondition":null,"_meta":{"htmlID":"u_content_heading_2","htmlClassNames":"u_content_heading"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true,"text":"Heading"}},{"id":"V-lkJbRX8w","type":"html","values":{"html":"<strong>Hello, world!</strong>","displayCondition":null,"containerPadding":"10px","anchor":"","_meta":{"htmlID":"u_content_html_2","htmlClassNames":"u_content_html"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}},{"id":"Kz4se0I8JS","type":"html","values":{"html":"<strong>Hello, world!</strong>","displayCondition":null,"containerPadding":"10px","anchor":"","_meta":{"htmlID":"u_content_html_3","htmlClassNames":"u_content_html"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}},{"id":"58KQGMO1hW","type":"heading","values":{"containerPadding":"10px","anchor":"","headingType":"h1","fontFamily":{"label":"Arial","value":"arial,helvetica,sans-serif"},"fontSize":"22px","textAlign":"left","lineHeight":"140%","linkStyle":{"inherit":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"displayCondition":null,"_meta":{"htmlID":"u_content_heading_3","htmlClassNames":"u_content_heading"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true,"text":"Heading"}}],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_1","htmlClassNames":"u_column"}}}],"values":{"displayCondition":null,"columns":false,"backgroundColor":"","columnsBackgroundColor":"","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":false},"padding":"0px","anchor":"","hideDesktop":false,"_meta":{"htmlID":"u_row_1","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}}],"values":{"popupPosition":"center","popupWidth":"600px","popupHeight":"auto","borderRadius":"10px","contentAlign":"center","contentVerticalAlign":"center","contentWidth":"500px","fontFamily":{"label":"Arial","value":"arial,helvetica,sans-serif"},"textColor":"#000000","popupBackgroundColor":"#FFFFFF","popupBackgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":true},"popupOverlay_backgroundColor":"rgba(0, 0, 0, 0.1)","popupCloseButton_position":"top-right","popupCloseButton_backgroundColor":"#DDDDDD","popupCloseButton_iconColor":"#000000","popupCloseButton_borderRadius":"0px","popupCloseButton_margin":"0px","popupCloseButton_action":{"name":"close_popup","attrs":{"onClick":"document.querySelector('.u-popup-container').style.display = 'none';"}},"backgroundColor":"#e7e7e7","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":false},"preheaderText":"","linkStyle":{"body":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"_meta":{"htmlID":"u_body","htmlClassNames":"u_body"}}},"schemaVersion":8}"`)
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
    <CreateTemplate data={setModalShow} />
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
           {/* {console.log("templateList",templateList)} */}
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
              </Button><Button onClick={(e)=>{handleGetTemplate(val.id);localStorage.setItem("template",val.name);setTName(val.name)}}>Edit</Button> </td>
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
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
    </div>
            {/* <CKEditor
              editor={ClassicEditor}
              data={template ? template.description : "hello"}
              onReady={(editor) => {
                editor.editing.view.change(writer => {
                  writer.setStyle(
                      "min-height",
                      '300px',
                      editor.editing.view.document.getRoot()
                  );
              });
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDpc(data)
                 console.log({ data });
              }}
              onBlur={(event, editor) => {
                // console.log( 'Blur.', editor );
              }}
              onFocus={(event, editor) => {
                // console.log( 'Focus.', editor );
              }}
            />  */}
          </Col>
        </Row>
      </form>:null}
    </div>
  );
};

export default Template;
