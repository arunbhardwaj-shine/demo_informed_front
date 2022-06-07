import React,{useState,useEffect,useRef} from "react";
import EmailEditor from "react-email-editor";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loader } from "../../../loader";

var state_object = {};
const CreateEmails = (props) => {
  const [id, setId] = useState();
  const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [templateList, setTemplateList] = useState();
  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  const [template, setTemplate] = useState();
  const [tName, setTName] = useState();
  const [FormShow, setFormShow] = useState(false);
  const [allTags, setAllTags] = useState({});
  const [tagClickedFirst, setTagClickedFirst] = useState([]);
  const [tagsReRender, setTagsReRender] = useState(0);
  const [newTag, setNewTag] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalSampleEmail, setModalSampleEmail] = useState(false);
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

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

  const removeTagFinal = (index) => {
    const tags = finalTags;
    const tagsClickedFirst = tagClickedFirst;
    tags.splice(index, 1);
    tagsClickedFirst.splice(index, 1);
    setFinalTags(tags);
    setTagClickedFirst(tagsClickedFirst);

    setTagsReRender(tagsReRender + 1);
  };
  
  const getTemplateList = (id) => {
    ExportApi.UserTemplateList(id).then((resp) => {
      if (resp.ok) {
        console.log('data',resp.data);
        setTemplateList(resp.data.data);
      }
    });
  };

  const emailEditorRef = useRef(null);

  const handleGetTemplate = (idd) => {
    //setDpc();
    setId(idd);
    ExportApi.UserTemplate(idd).then((resp) => {
      if (resp.ok) {
        console.log("first,",resp.data.data)
        setTemplate(resp.data.data);
        setTimeout(() => {
          emailEditorRef.current.editor.loadDesign(
            resp.data.data.json_description
              ? JSON.parse(resp.data.data.json_description)
              : "No Content"
          );
        }, 1000);
      }
    });
  };

  const onLoad = () => {
    // emailEditorRef.current.editor.loadDesign(dpc?dpc:hello);
  };
  const onReady = () => {
    // await emailEditorRef.current.editor.loadDesign(dpc)
    console.log("onReady");
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
          //setDpc(design);
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
                //setDpc();
                getTemplateList(localStorage.getItem("EventIdHeader"))
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
    tags.splice(index, 1);
    setTagClickedFirst(tags);
    setTagsReRender(tagsReRender + 1);
  };
  
  useEffect(() => {
    window.addEventListener('EventId',()=> getTemplateList(localStorage.getItem("EventIdHeader")))
    getTemplateList(localStorage.getItem("EventIdHeader"))
  }, []);

	return ( 
	  <>
      <div className="right-sidebar">
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <Link to="/webinar/emails">
                  <button className="btn btn-primary btn-bordered back">
                    Back
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="col-12 col-md-9">
              <ul className="tabnav-link">
                <li className="active active-main">
                  <Link to="/EmailArticleSelect">Prepare Your Email</Link>
                </li>
                <li className="">
                  <Link to="/SelectHCP">Select Smart List</Link>
                </li>
                <li className="">
                  <a href="javascript:void(0)">Approve And Send</a>
                </li>
							</ul>
            </div>
            
            <div className="col-12 col-md-2">
              <div className="header-btn">
                <button className="btn btn-primary btn-bordered move-draft" >
                  Save As Draft
                </button>
                <Link to="/webinar/emails/smart-list">
                  <button className="btn btn-primary btn-filled next" >
                      Next
                  </button>
                </Link>
              </div>
            </div>

            <div className="top-header">
		          <div className="custom-container">
		            <div className="row">
		              <div className="page-title">
		                <h4>Select your Template</h4>
		              </div>
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
	                  <h2>Data Not Found</h2>
	                )}  
              	</AliceCarousel> 

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
	            </div>
	          </div>
	          </section>
            {FormShow?<> {template ? (
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <div className="shadow-lg p-3 mb-5 bg-white rounded md={{ span: 8, offset: 3 }} form-inline row justify-content-between align-items-center">
                  <div className="form-group col-12">
                    
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

                    <Button onClick={(e) => { setModalSampleEmail(true); setId(localStorage.getItem('idd')); }} >
                      Send A Sample
                    </Button>  
                    <Button type="button">Approved</Button>
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
        </div>
      </div>  


      {/* ---- start model code for Add tags -----------*/}                
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
            <button type="button"className="btn btn-primary save btn-filled">
              Save
            </button>
          </Modal.Footer>
      </Modal>   
      {/* ---- start model code for Add tags -----------*/}          

		</>
	)
}
export default CreateEmails;