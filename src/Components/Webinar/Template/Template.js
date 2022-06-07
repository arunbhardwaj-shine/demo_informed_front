import React, { useEffect, useState, useRef } from "react";
import EmailEditor from "react-email-editor";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import CreateTemplate from "./CreateTemplate";
import { Testmail } from "./Testmail";
import { loader } from "../../../loader";
import AliceCarousel from "react-alice-carousel";
const Template = () => {
  const [id, setId] = useState();
  const [FormShow, setFormShow] = useState(false);
  const [tName, setTName] = useState();
  const [templateList, setTemplateList] = useState();
  const [template, setTemplate] = useState();
  const [templateId, setTemplateId] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [dpc, setDpc] = useState();
  const [message, setMessage] = useState(false);
  const [render, setRender] = useState(0);
  const [modalShow1, setModalShow1] = useState(false);
  const [hello, setHello] = useState(JSON.parse(localStorage.getItem("hello")));
  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN ;

   // ----------------added for new design implementations
  const [activeIndex, setActiveIndex] = useState(0);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);
 
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };

  // ---------------------ended---------------

  const formik = useFormik({
    initialValues: {
      Subject: template ? template.subject : "",
      tempName:template ? template.name : "",
    },
    validationSchema: Yup.object({
      Subject: Yup.string().required("Enter your subject"),
      tempName: Yup.string().required("Enter your templete name"),
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
            localStorage.getItem("EventIdHeader"),
            design,
            html,
            localStorage.getItem("idd")
          ).then((resp) => {
            if (resp.ok) {
              if (resp.data.code == 200) {
                loader("hide")
                setDpc();
                handleGetTemplateList(localStorage.getItem("EventIdHeader"))
                setFormShow(false)
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
  const handleGetTemplateList = (id) => {
    ExportApi.UserTemplateList(id).then((resp) => {
      if (resp.ok) {
        if (resp.data.code == 200){

          setTemplateList(resp.data.data);
        }else{
          setMessage("Please create template");
        }
      }
    });
  };
  const handleDeleteTemplate = () => {
    console.log("yyy",templateId)
    ExportApi.DeleteTemplate(templateId.id).then((resp) => {
      if (resp.ok) {
        console.log("yyy",templateId.id)
        console.log("ywy",templateId.event_id)
        handleGetTemplateList(localStorage.getItem("EventIdHeader"))
        
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
    window.addEventListener('EventId',()=> handleGetTemplateList(localStorage.getItem("EventIdHeader")))
    handleGetTemplateList(localStorage.getItem("EventIdHeader"))
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
        <Col md={{ span: 8, offset: 0 }}>
          <h2>Auto Emails</h2>
          <div className="top-header">
            <div className="custom-container">
              <div className="row">
                <div className="page-title">
                  <h4>Select your Template</h4>
                </div>
                <Button onClick={() => { setModalShow(true); }} >
                  Create New Template
                </Button>
              </div>
            </div>
          </div>
          <section className="select-mail-template">
            <div className="custom-container">
              <div className="row">
              <AliceCarousel mouseTracking disableDotsControls activeIndex={activeIndex} responsive={responsive} onSlideChanged={syncActiveIndex} >
                {templateList ? (
                  templateList ?.map((val, i) => (
                    <div key={i} className="item">
                      <img src={path_image + "content_added1.png"} alt="" onClick={(e) => {
                        localStorage.setItem("idd", val.id);
                        handleGetTemplate(val.id);
                        localStorage.setItem("template", val.name);
                        setTName(val.name);
                        setFormShow(true)
                      }}/>
                      <td>{val.name}</td>
                    </div>
                  ))
                ) : (
                  <h2>{message}</h2>
                )}  
              </AliceCarousel> 
              </div>
            </div>  
          </section> 
        </Col>
      </Row>

  {/* start of create template modal code ------------------  */}     
  <Modal show={modalShow} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
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
  {/* end of create template modal code ------------------  */} 

  {/*  start of test email modal code ------------------  */}
  <Modal show={modalShow2} size="md" aria-labelledby="contained-modal-title-vcenter" centered >
    <Modal.Header onClick={() => setModalShow2(false)} closeButton>
      <Modal.Title id="contained-modal-title-vcenter">Test Mail</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Testmail data={setModalShow2} data1={id} />
    </Modal.Body>
  </Modal>
  {/* end of test email modal code ------------------  */} 

  {/* start of delete modal code ------------------  */} 
  <Modal show={modalShow1} size="sm" aria-labelledby="contained-modal-title-vcenter" centered >
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
  {/* end of delete modal code ------------------ */}  

      {FormShow?<> {template ? (
        <form onSubmit={formik.handleSubmit}>
          <Row>
            <div className="shadow-lg p-3 mb-5 bg-white rounded md={{ span: 8, offset: 3 }} form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-7">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  name="Subject"
                  className="form-control"
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
                <Button onClick={(e) => { setModalShow2(true); setId(localStorage.getItem('idd')); }} >
                  Send A Sample
                </Button>  
                <Button type="submit">Save</Button>
              </div>
              <div className="form-group col-12 col-md-7">
                <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady}></EmailEditor>
              </div>  
            </div>
          </Row>
        </form>
      ) : null}</>:null}
    </div>
  );
};

export default Template;
