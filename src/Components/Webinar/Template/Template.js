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
import axios from "axios";
//import "./TemplateStyle.css"
var state_object = {};
const Template = (props) => {
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
 
  // const responsive = {
  //   0: { items: 1 },
  //   568: { items: 2 },
  //   1024: { items: 5 },
  // };

  // ---------------------ended---------------
  // const [id, setId] = useState();
  const [isOpen, setIsOpen] = useState(false);
	// const [activeIndex, setActiveIndex] = useState(0);
	// const [templateList, setTemplateList] = useState();
  // const syncActiveIndex = ({ item }) => setActiveIndex(item);
  // const [template, setTemplate] = useState();
  // const [tName, setTName] = useState();
  // const [FormShow, setFormShow] = useState(false);
  const [allTags, setAllTags] = useState({});
  const [tagClickedFirst, setTagClickedFirst] = useState([]);
  const [tagsReRender, setTagsReRender] = useState(0);
  const [newTag, setNewTag] = useState("");
  // const [modalShow, setModalShow] = useState(false);
  const [modalSampleEmail, setModalSampleEmail] = useState(false);
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };
  // let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const emailSubjectChanged = (e) => {
    setEmailSubject(e.target.value);
  };
  const [emailSubject, setEmailSubject] = useState(
    state_object != null &&
      state_object != "undefined" &&
      state_object.emailSubject
      ? state_object.emailSubject
      : props.getDraftData
      ? props.getDraftData.subject
      : ""
  );
  const addTag = () => {
    if (typeof newTag == "undefined" || newTag.trim().length == 0) {
      toast.error("Please input a tag");
    } else {
      if (!tagClickedFirst.includes(newTag)) {
        setTagClickedFirst((oldArray) => [...oldArray, newTag]);
      } else {
        toast.error("Tag already in list.");
      }
      setNewTag("");
      //setTagsCounter(tagsCounter + 1);
    }
  };

  const newTagChanged = (e) => {
    setNewTag(e.target.value);
    e.target.value = "";
    const new_atg = document.getElementById("new-tag");
    new_atg.value = "";
    //console.log(new_atg);
  };
  
  const tagClicked = (dd) => {
    if (!tagClickedFirst.includes(dd)) {
      setTagClickedFirst((oldArray) => [...oldArray, dd]);
    } else {
      toast.error("Tag already in list.");
    }
  };
  const tagButtonClicked = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    //console.log("closed");
    setIsOpen(false);
  };
  const [finalTags, setFinalTags] = useState(
    state_object != null && state_object != "undefined" && state_object.tags
      ? state_object.tags
      : props.getDraftData
      ? props.getDraftData.tags
      : []
  );
  const removeTag = (index) => {
    const tags = tagClickedFirst;
    console.log("tag",tagClickedFirst)
    tagClickedFirst.splice(index, 1);
    setFinalTags(tagClickedFirst);
    // setTagsReRender(tagsReRender + 1);
     setTagClickedFirst(tagClickedFirst);
    setTagsReRender(tagsReRender + 1);
    console.log("2",tagClickedFirst)
  };
  const removeTagFinal = (index) => {

    finalTags.splice(index, 1);
    tagClickedFirst.splice(index, 1);
    // setTagsReRender(tagsReRender + 1);
    setFinalTags(finalTags);
    setTagClickedFirst(tagClickedFirst);
    setTagsReRender(tagsReRender + 1);
  };
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
            localStorage.getItem("idd"),
            tagClickedFirst
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
          handleGetTemplate(resp.data.data[0].id)
        }else{
          if(localStorage.getItem("EventIdHeader")){
            setMessage("Please create template");
            setTemplateList()
            setTemplate()
          }else{
            loader("hide")
            setMessage("Please create Event")
          }
       
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
        setTimeout(() => {
          emailEditorRef.current.editor.loadDesign(
            resp.data.data.json_description
              ? JSON.parse(resp.data.data.json_description)
              : hello
          );
        }, 1000);
        resp.data.data.tags? setFinalTags(JSON.parse(resp.data.data.tags)):setFinalTags([])
        resp.data.data.tags?  setTagClickedFirst(JSON.parse(resp.data.data.tags)):setTagClickedFirst([])
        setTemplate(resp.data.data);
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
    if(localStorage.getItem("EventIdHeader")){
      console.log("done")
    }else{
      loader("hide")
      setMessage("Please create Event")
    }

  }, []);
  const saveButtonClicked = () => {
    if (typeof finalTags != "undefined" && finalTags.length > 0) {
      let prev_tags = finalTags;
      let new_tags = prev_tags.concat(tagClickedFirst);
      const uniqueTags = new_tags.filter((x, i, a) => a.indexOf(x) == i);
      setFinalTags(uniqueTags);
    } else {
      setFinalTags(tagClickedFirst);
    }
    closeModal();
  };
  const GetTagsAll = () => {
    ExportApi.GetTags().then((resp) => {
      if (resp.ok) {
        loader("hide")
        setAllTags(JSON.parse( resp.data.data[0].values));
        // setTemplateList(resp.data.data);
      }
    });
  };
  useEffect(() => {
    loader("show")
    GetTagsAll()
  }, []);
  return (
    <div class="right-sidebar">
       <div className="loader" id="custom_loader">
	        <span className="loader-view"> </span>
          </div>
          {localStorage.getItem("EventIdHeader")?<Row>
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
                      <p>{val.name}</p>
                    </div>
                  ))
                ) : (
                  <h2>{null}</h2>
                )}  
              </AliceCarousel> 
              </div>
            </div>  
          </section> 
        </Col>
      </Row>:null}
      

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
  {templateList?  <form onSubmit={formik.handleSubmit}>
          <Row>
            
            <div className="shadow-lg p-3 mb-5 bg-white rounded md={{ span: 8, offset: 3 }} form-inline row justify-content-between align-items-center">
            <Row><div className="form-group col-12 col-md-5"> <Button onClick={(e) => { setModalShow2(true); setId(localStorage.getItem('idd')); }} >
                  Send A Sample
                </Button>  
                </div>
                <div className="form-group col-12 col-md-5">

                <Button type="submit">Save</Button>
                </div>
                </Row>
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
              
              </div>
              <div className="email-form">
                <form>
                  <div className="input-group w-100">
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-bordered btn-primary"
                        type="button"
                        id="tags-add"
                        data-bs-toggle="modal"
                        data-bs-target="#tagsModal"
                        onClick={tagButtonClicked}
                      >
                        + Add Tag
                      </button>
                    </div>
                   
                    <div className="tags_added">
                      <ul>
                        {finalTags.map((tags, index) => {
                          return (
                            <>
                              <li className="list1">
                                {tags.innerHTML || tags}{" "}
                                <img
                                  src={path_image + "filter-close.svg"}
                                  alt="Close-filter"
                                  onClick={() => removeTag(index)}
                                />
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </form>
                </div>
               
              <div className="form-group col-12 col-md-7">
                <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady}></EmailEditor>
              </div>  
            </div>
          </Row>
        </form>:<h2>{message}</h2>}
   
      
        <Modal id="tagsModal" show={isOpen}>
          <Modal.Header>
            <h5 className="modal-title" id="staticBackdropLabel">
              Add Tags
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </Modal.Header>
          <Modal.Body>
            <div className="select-tags">
              <h6>Select Tag :</h6>
              <div className="tag-lists">
                <div className="tag-lists-view">
                  {Object.values(allTags).map((data) => {
                    return (
                      <>
                        <div onClick={(event) => tagClicked(data)}>{data} </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="selected-tags">
              <h6>
                Selected Tag <span>| {tagClickedFirst.length}</span>
              </h6>

              <div className="total-selected">
                {tagClickedFirst.map((data, index) => {
                  return (
                    <>
                      <div className="tag-cross">
                        {data.innerHTML || data}
                        <img
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                          onClick={() => removeTagFinal(index)}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <form>
              <div className="form-group">
                <label for="new-tag">New Tag</label>
                <input
                  type="text"
                  className="form-control"
                  id="new-tag"
                  value={newTag}
                  onChange={(e) => newTagChanged(e)}
                />

                <button
                  onClick={addTag}
                  type="button"
                  className="btn btn-primary add btn-bordered"
               
                >
                  Add
                </button>
              </div>
            </form>
            <button type="button"    onClick={saveButtonClicked}className="btn btn-primary save btn-filled">
              Save
            </button>
          </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Template;
