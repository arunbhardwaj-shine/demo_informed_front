import React,{useState,useEffect,useRef} from "react";
import EmailEditor from "react-email-editor";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";



var state_object = {};
const CreateEmails = (props) => {
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
  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

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
    console.log("tag", tagClickedFirst);
    tagClickedFirst.splice(index, 1);
    setFinalTags(tagClickedFirst);
    // setTagsReRender(tagsReRender + 1);
    setTagClickedFirst(tagClickedFirst);
    setTagsReRender(tagsReRender + 1);
    console.log("2", tagClickedFirst);
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
      tempName: template ? template.name : "",
    },
    validationSchema: Yup.object({
      Subject: Yup.string().required("Enter your subject"),
      tempName: Yup.string().required("Enter your templete name"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("hello");
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
                setDpc();
                handleGetTemplateList(localStorage.getItem("EventIdHeader"));
                setFormShow(false);
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
        if (resp.data.code == 200) {
          setTemplateList(resp.data.data);
          handleGetTemplate(resp.data.data[0].id);
        } else {
          if (localStorage.getItem("EventIdHeader")) {
            setMessage("Please create template");
            setTemplateList();
            setTemplate();
          } else {
            setMessage("Please create Event");
          }
        }
      }
    });
  };
  const handleDeleteTemplate = () => {
    console.log("yyy", templateId);
    ExportApi.DeleteTemplate(templateId.id).then((resp) => {
      if (resp.ok) {
        console.log("yyy", templateId.id);
        console.log("ywy", templateId.event_id);
        handleGetTemplateList(localStorage.getItem("EventIdHeader"));
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
              : null
          );
        }, 2000);
        console.log(resp.data.data.tags);
        // resp.data.data.tags? setFinalTags(JSON.parse(resp.data.data.tags)):setFinalTags([])
        // resp.data.data.tags?  setTagClickedFirst(JSON.parse(resp.data.data.tags)):setTagClickedFirst([])
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
    window.addEventListener("EventId", () =>
      handleGetTemplateList(localStorage.getItem("EventIdHeader"))
    );
    handleGetTemplateList(localStorage.getItem("EventIdHeader"));
    if (localStorage.getItem("EventIdHeader")) {
      console.log("done");
    } else {
      setMessage("Please create Event");
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
    alert("okk")
    ExportApi.GetTags().then((resp) => {
      if (resp.ok) {
        loader("hide");
        console.log("ksisiswdd",resp.data.data[0].values)
        setAllTags(JSON.parse(resp.data.data[0].values));
        // setTemplateList(resp.data.data);
      }
    });
  };
  useEffect(() => {
    GetTagsAll();
  }, []);
 

	return ( 
	  <>
      <div className="right-sidebar">
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <Link to="/webinar/email/emails">
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
            <div class="custom-container">
              <div className="row">
                  <AliceCarousel
                    mouseTracking
                    disableDotsControls
                    activeIndex={activeIndex}
                    responsive={responsive}
                    onSlideChanged={syncActiveIndex}
                  >
                    {templateList ? (
                      templateList?.map((val, i) => (
                        <div key={i} className="item">
                          

                            
                            <img
                              src={path_image + "webinar/mail-format.png"}
                              alt=""
                              onClick={(e) => {
                                localStorage.setItem("idd", val.id);
                                handleGetTemplate(val.id);
                                localStorage.setItem("template", val.name);
                                setTName(val.name);
                                setFormShow(true);
                              }}
                              className="select_mm"
                            />
                          
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

      {/* start of delete modal code ------------------  */}
      <Modal
        show={modalShow1}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          onClick={() => setModalShow1(false)}
          closeButton
        ></Modal.Header>
        <Modal.Body>
          <h6>
            The Delete action will delete the HCP from your account entirly
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              handleDeleteTemplate();
              setModalShow1(false);
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setModalShow1(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* end of delete modal code ------------------ */}

      {templateList ? (
        <div class="email-form">
          <form onSubmit={formik.handleSubmit}>
            <div class="input-group w-100">
              <div class="input-group-prepend">
                <button
                  class="btn btn-bordered"
                  type="button"
                  id="tags-add"
                  data-bs-toggle="modal"
                  data-bs-target="#tagsModal"
                  onClick={tagButtonClicked}
                >
                  + Add Tag
                </button>
              </div>
              <div class="tags_added">
                {finalTags.length > 0 ? (
                  <ul>
                    {finalTags.map((tags, index) => {
                      return (
                        <li className={"list" + index}>
                          {tags.innerHTML || tags}
                          <img
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                            onClick={() => removeTag(index)}
                          />
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p class="no-tags">No Selected Tags</p>
                )}
              </div>
            </div>
            <div class="form-inline row justify-content-end align-items-center">
              <div class="form-group col-12 col-md-7">
                <label for="exampleInputEmail1">Subject</label>
                <input
                  type="text"
                  name="Subject"
                  class="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Subject}
                  id="email-subject"
                />
              </div>
              <div class="form-buttons right-side col-12 col-md-5">
                <button
                  class="btn btn-primary btn-filled btn-large"
                  onClick={(e) => {
                    setModalShow2(true);
                    setId(localStorage.getItem("idd"));
                  }}
                >
                  Send A Sample{" "}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7 9.6001C14.1852 9.6001 16.2 7.58538 16.2 5.1001C16.2 2.61482 14.1852 0.600098 11.7 0.600098C9.21467 0.600098 7.19995 2.61482 7.19995 5.1001C7.19995 7.58538 9.21467 9.6001 11.7 9.6001Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.78859 11.3999H15.2114C16.5869 11.4016 17.9057 11.946 18.8784 12.9137C19.8511 13.8815 20.3983 15.1935 20.4 16.562V19.757C20.4 19.9275 20.3319 20.0911 20.2107 20.2116C20.0895 20.3322 19.9252 20.3999 19.7538 20.3999H17.1626V17.7598C17.1626 17.2075 16.7149 16.7598 16.1626 16.7598H8.11061C7.55832 16.7598 7.11061 17.2075 7.11061 17.7598V20.3999H4.24613C4.07476 20.3999 3.91041 20.3322 3.78923 20.2116C3.66805 20.0911 3.59998 19.9275 3.59998 19.757V16.562C3.60169 15.1935 4.14889 13.8815 5.12157 12.9137C6.09426 11.946 7.41301 11.4016 8.78859 11.3999Z"
                      fill="white"
                    />
                    <path
                      d="M16.4719 18.5L12.4852 20.8698C12.3932 20.9225 12.2889 20.9502 12.1828 20.9502C12.0768 20.9502 11.9725 20.9225 11.8804 20.8698L7.88964 18.5C7.87056 18.5823 7.8609 18.6665 7.86084 18.751V22.7747C7.86084 23.0595 7.97397 23.3326 8.17535 23.534C8.37673 23.7354 8.64986 23.8485 8.93465 23.8485H15.4269C15.7117 23.8485 15.9848 23.7354 16.1862 23.534C16.3876 23.3326 16.5007 23.0595 16.5007 22.7747V18.751C16.5007 18.6665 16.491 18.5823 16.4719 18.5Z"
                      fill="white"
                    />
                    <path
                      d="M12.2194 20.2511L16.2431 17.8566C16.1443 17.7159 16.0131 17.6009 15.8606 17.5214C15.7081 17.442 15.5387 17.4003 15.3668 17.3999H8.8745C8.70254 17.4003 8.53318 17.442 8.38068 17.5214C8.22818 17.6009 8.097 17.7159 7.99817 17.8566L12.026 20.2511C12.0557 20.2673 12.0889 20.2758 12.1227 20.2758C12.1565 20.2758 12.1897 20.2673 12.2194 20.2511Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button class="btn btn-primary approved-btn btn-bordered">
                  Approved{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="8" cy="8" r="8" fill="#39CABC" />
                    <path
                      d="M7.85813 11.565C7.83563 11.5852 7.81431 11.6066 7.7942 11.629C7.78671 11.6373 7.77907 11.6456 7.77128 11.6537C7.35183 12.0935 6.64718 12.1176 6.19738 11.7075L3.35413 9.11496C2.90433 8.70483 2.87972 8.01582 3.29917 7.57601C3.71861 7.1362 4.42327 7.11214 4.87306 7.52227L6.58481 9.08306C6.77691 9.25822 7.07639 9.2531 7.26212 9.0715L11.1001 5.31874C11.5347 4.89375 12.2394 4.89375 12.674 5.31874C13.1087 5.74372 13.1087 6.43275 12.674 6.85774L7.89772 11.528C7.88474 11.5407 7.87154 11.553 7.85813 11.565Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button class="btn btn-primary btn-filled" type="submit">
                  Save
                </button>
              </div>
            </div>
           
          </form>
          <div class="sample-mail-templates">
											<div class="select-sample-template">
												<img src="assets/images/mail-sample.png" alt=""/>
                        <EmailEditor
                    ref={emailEditorRef}
                    onLoad={onLoad}
                    onReady={onReady}
                  ></EmailEditor>
                        </div>
                        </div>
        </div>
      ) : (
        <h2>{message}</h2>
      )}
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
				<div class="select-tags">
					<h6>Select Tag :</h6>
					<div class="tag-lists">
					<div class="tag-lists-view">
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
				<div class="selected-tags">
					<h6>Selected Tag <span>| {tagClickedFirst.length}</span></h6>
					<div class="total-selected">
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
          <button
            type="button"
            onClick={saveButtonClicked}
            className="btn btn-primary save btn-filled"
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
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