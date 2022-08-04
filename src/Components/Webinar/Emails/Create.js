import React, { useState, useEffect, useRef } from "react";
import EmailEditor from "react-email-editor";
import { Link, useLocation } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Testmail } from "../Template/Testmail";
import { loader } from "../../../loader";

var state_object = {};
const CreateEmails = (props) => {
  const location = useLocation();
  const [id, setId] = useState();
  const [FormShow, setFormShow] = useState(false);
  const [tName, setTName] = useState();
  const [templateList, setTemplateList] = useState();
  const [template, setTemplate] = useState();
  const [templateId, setTemplateId] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [TemplateIdActive, setTemplateIdActive] = useState();
  const [dpc, setDpc] = useState();
  const [message, setMessage] = useState(false);
  const [render, setRender] = useState(0);
  const [modalShow1, setModalShow1] = useState(false);
  const [notCreateColletion, setnototCreateColletion] = useState(true);
  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  // ----------------added for new design implementations
  const [activeIndex, setActiveIndex] = useState(0);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  // ---------------------ended---------------
  // const [id, setId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [Massage, setMassage] = useState();
  const [nextPage, setnextPage] = useState(false);
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
  let navigate = useNavigate();

  const templateClicked = (template, e) => {
    // const div = document.querySelector("img.select_mm");

    // if (div) {
    //   div.classList.remove("select_mm");
    // }

    setTemplateIdActive(template.id);
    // e.target.classList.toggle("select_mm");
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
    setMassage();
    if (typeof newTag == "undefined" || newTag.trim().length == 0) {
      setMassage("Please input a tag");
    } else {
      if (!tagClickedFirst.includes(newTag)) {
        setTagClickedFirst((oldArray) => [...oldArray, newTag]);
      } else {
        setMassage("Tag already in list.");
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
    setMassage();
    if (!tagClickedFirst.includes(dd)) {
      setTagClickedFirst((oldArray) => [...oldArray, dd]);
    } else {
      // toast.error("Tag already in list.");
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
    // console.log("tag", tagClickedFirst);
    tagClickedFirst.splice(index, 1);
    setFinalTags(tagClickedFirst);
    // setTagsReRender(tagsReRender + 1);
    setTagClickedFirst(tagClickedFirst);
    setTagsReRender(tagsReRender + 1);
    // console.log("2", tagClickedFirst);
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
      is_approved: 1,
    },
    validationSchema: Yup.object({
      Subject: Yup.string().required("Enter your subject"),
      tempName: Yup.string().required("Enter your templete name"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      loader("show");
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
            localStorage.getItem("TEMPLATEID"),
            tagClickedFirst,
            "0"
          ).then((resp) => {
            if (resp.ok) {
              if (resp.data.code == 200) {
                setDpc();
                setFormShow(false);
                setModalShow(false);
                loader("hide");
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
                loader("hide");
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

  const handleEmailSCreate = (id) => {
    loader("show");
    if (localStorage.getItem("TEMPLATEID")) {
      if (localStorage.getItem("stateid")) {
        // alert(localStorage.getItem("stateid"))
        ExportApi.UpdateEmailSCreate(
          localStorage.getItem("TEMPLATEID"),
          localStorage.getItem("stateid")
        ).then((resp) => {
          if (resp.ok) {
            toast.success(resp.data.message)
            //  console.log( resp.data.data.collection_id)
            localStorage.setItem("collection_id", resp.data.data.collection_id);
            if (id == 1) {
              navigate("/webinar/email/SelectHCP");
            }
          }
        });
      } else {
        if (id == 0) {
          ExportApi.EmailSCreate(
            localStorage.getItem("TEMPLATEID"),
            localStorage.getItem("EventIdHeader"),
            formik.values.Subject,
            tagClickedFirst
          ).then((resp) => {
            if (resp.ok) {
              setnototCreateColletion(false)
              toast.success(resp.data.message)
              //  console.log( resp.data.data.collection_id)
              localStorage.setItem(
                "collection_id",
                resp.data.data.collection_id
              );
              loader("hide");
            }
          });
        } else {
          formik.handleSubmit();
          setTimeout(() => {
            formik.values.Subject
              ? ExportApi.EmailSCreate(
                  localStorage.getItem("TEMPLATEID"),
                  localStorage.getItem("EventIdHeader"),
                  formik.values.Subject,
                  tagClickedFirst
                ).then((resp) => {
                  if (resp.ok) {
                    toast.success(resp.data.message)
                    //  console.log( resp.data.data.collection_id)
                    localStorage.setItem(
                      "collection_id",
                      resp.data.data.collection_id
                    );
                    navigate("/webinar/email/SelectHCP");
                  }
                })
              : toast.warning("Please enter Subject");
          }, 500);
        }
      }
    }
    loader("hide");
  };
  const handleGetTemplateList = (id, tempId) => {
    ExportApi.UserTemplateList(id).then((resp) => {
      if (resp.ok) {
        loader("hide");
        if (resp.data.code == 200) {
          setTemplateList(resp.data.data);
          handleGetTemplate(tempId ? tempId : resp.data.data[0].id);
          setTemplateIdActive(tempId ? tempId : resp.data.data[0].id);
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
  const handleGetCollectionData = (id) => {
    loader("hide");
    ExportApi.getCollectionData(id).then((resp) => {
      if (resp.ok) {
        
        // console.log(resp.data.data.template_id)
        handleGetTemplateList(
          resp.data.data.event_id,
          resp.data.data.template_id
        );
        handleGetTemplate(resp.data.data.template_id);
        // if (resp.data.code == 200) {
        //   setTemplateList(resp.data.data);
        //   handleGetTemplate(resp.data.data[0].id);
        // } else {
        //   if (localStorage.getItem("EventIdHeader")) {
        //     setMessage("Please create template");
        //     setTemplateList();
        //     setTemplate();
        //   } else {
        //     setMessage("Please create Event");
        //   }
        // }
      }
    });
  };
  const handleDeleteTemplate = () => {
    // console.log("yyy", templateId);
    ExportApi.DeleteTemplate(templateId.id).then((resp) => {
      if (resp.ok) {
        // console.log("yyy", templateId.id);
        // console.log("ywy", templateId.event_id);
        handleGetTemplateList(localStorage.getItem("EventIdHeader"));
      }
    });
  };
  const handleGetTemplate = (idd) => {
    loader("show");
    localStorage.setItem("TEMPLATEID", idd);
    setDpc();
    setId(idd);
    ExportApi.UserTemplate(idd).then((resp) => {
      if (resp.ok) {
        if (resp.data.data.json_description) {
          setTimeout(() => {
            loader("hide");
            emailEditorRef.current.editor.loadDesign(
              resp.data.data.json_description
                ? JSON.parse(resp.data.data.json_description)
                : emailEditorRef.current.editor.loadDesign()
            );
           
           
            setnextPage(true);
          }, 1000);
        } else {
          setTimeout(() => {
            loader("hide");
            emailEditorRef.current.editor.loadDesign();
           
            setnextPage(true);
          }, 1000);
        }
        // console.log(resp.data.data.tags);
        resp.data.data.tags
          ? setFinalTags(resp.data.data.tags)
          : setFinalTags([]);
        resp.data.data.tags
          ? setTagClickedFirst(resp.data.data.tags)
          : setTagClickedFirst([]);
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
    loader("show");
    if (localStorage.getItem("stateid")) {
      handleGetCollectionData(localStorage.getItem("stateid"));
    } else {
      window.addEventListener("EventId", () =>
        handleGetTemplateList(localStorage.getItem("EventIdHeader"))
      );
      handleGetTemplateList(localStorage.getItem("EventIdHeader"));
      if (localStorage.getItem("EventIdHeader")) {
        console.log("done");
      } else {
        setMessage("Please create Event");
      }
    }

    // const { id,  } = state;
    // console.log("pp",id, )
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
      <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
      <div className="right-sidebar col">
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
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <Link to="/webinar/email/emails">
                  <button className="btn btn-primary btn-filled ">
              Back
                  </button>
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-8">
              <ul className="tabnav-link">
                <li className="active active-main">
                  <a href="#">Prepare Your Email</a>
                </li>
                <li className="">
                  <a href="javascript:void(0)">Select HCPs</a>
                </li>
                <li className="">
                  <a href="#">Select Smart List</a>
                </li>
                <li className="">
                  <a href="#">Approve And Send</a>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-3">
              <div className="header-btn">
                <button
                  type="button"
                  onClick={() => {
                    handleEmailSCreate(0);
                  }}
                  className="btn btn-primary btn-bordered move-draft"
                >
                  Save As Draft
                </button>
                {nextPage ? (
<>
                  {notCreateColletion?   <button
                    type="button"
                    className="btn btn-primary btn-filled"
                    onClick={() => {
                      handleEmailSCreate(1);
                    }}
                  >
                   Next
                  </button>:   <button
                  type="button"
                  className="btn btn-primary btn-filled "
                  onClick={() => {
                    navigate("/webinar/email/SelectHCP");
                  }}
                >
                Back
                </button>}
                </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <section className="select-mail-template">
          <div className="row select-mail-template-slider">
            <AliceCarousel
              mouseTracking
              disableDotsControls
              activeIndex={activeIndex}
              responsive={responsive}
              onSlideChanged={syncActiveIndex}
            >
              {templateList ? (
                templateList?.map((val, i) => (
                  <div
                    key={i}
                    className="item"
                    onClick={(e) =>{ templateClicked(val, e);
                      localStorage.setItem("TEMPLATEID", val.id);
                          handleGetTemplate(val.id);
                          localStorage.setItem("template", val.name);
                          setTName(val.name);
                          setFormShow(true);
                    }}
                  >
                    <div  className={
                          typeof TemplateIdActive !== "undefined" &&
                          TemplateIdActive == val.id
                            ? "item-list select_mm"
                            : "item-list"
                        }>
                      {/* <div className="item-top-schedule">
                        <img  src={path_image + "webinar/mail-schedule.png"} alt="" />
												</div> */}
                      <img
                        value={val.id}
                        src={path_image + "content_added1.png"}
                        alt=""
                        // onClick={(e) => {
                        //   localStorage.setItem("TEMPLATEID", val.id);
                        //   handleGetTemplate(val.id);
                        //   localStorage.setItem("template", val.name);
                        //   setTName(val.name);
                        //   setFormShow(true);
                        // }}
                      />
                    </div>
                    <p>{val.name}</p>
                  </div>
                ))
              ) : (
                <h2>{null}</h2>
              )}
            </AliceCarousel>
          </div>
          <Modal
            show={modalShow2}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <h4>Test Mail</h4>
              <button
                type="button"
                onClick={() => setModalShow2(false)}
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </Modal.Header>
            <Modal.Body>
              <Testmail data={setModalShow2} />
            </Modal.Body>
          </Modal>

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
            <div className="email-form">
              <form onSubmit={formik.handleSubmit}>
                <div className="input-group w-100">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-bordered"
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
                    {finalTags.length > 0 ? (
                      <ul>
                        {finalTags.map((tags, index) => {
                          return (
                            <li key={index} className={"list" + index}>
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
                      <p className="no-tags">No Selected Tags</p>
                    )}
                  </div>
                </div>
                <div className="form-inline row justify-content-end align-items-center">
                  <div className="form-group col-12 col-md-7">
                    <label htmlFor="exampleInputEmail1">Subject</label>
                    <input
                      type="text"
                      name="Subject"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Subject}
                      id="email-subject"
                    />
                    {formik.touched.Subject && formik.errors.Subject ? (
                      <div className="error" style={{ color: "red" }}>
                        {formik.errors.Subject}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-buttons right-side col-12 col-md-5">
                    <button
                      type="button"
                      className="btn btn-primary btn-filled btn-large"
                      onClick={(e) => {
                        setModalShow2(true);
                        setId(localStorage.getItem("idd"));
                      }}
                    >
                      Send A Sample
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
                          fillRule="evenodd"
                          clipRule="evenodd"
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

                    <button className="btn btn-primary btn-filled" type="submit">
                      Save
                    </button>
                    {/* <button className="btn btn-primary btn-filled" type="button"  onClick={(e) => {
                        setModalShow2(true);
                        setId(localStorage.getItem("idd"));
                      }}>
                      Save As Template
                    </button> */}
                  </div>
                </div>
              </form>
              <div className="sample-mail-templates">
                <div className="select-sample-template">
                  <img src="assets/images/mail-sample.png" alt="" />
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
          {/* <Modal id="tagsModal" show={isOpen}>
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
					<h6>Selected Tag <span>| {tagClickedFirst.length}</span></h6>
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
                <div className="error" style={{color:"red",paddingLeft:"50px"}}>{Massage}</div>
          </form>
          <button
            type="button"
            onClick={saveButtonClicked}
            className="btn btn-primary save btn-filled"
          >
            Save
          </button>
        </Modal.Footer>
      </Modal> */}
        </section>

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
                  {Object.values(allTags).map((data,i) => {
                    return (
                    
                        <div key={i} onClick={(event) => tagClicked(data)}>{data} </div>
                      
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
                      <div key={index} className="tag-cross">
                        {data.innerHTML || data}
                        <img
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                          onClick={() => removeTagFinal(index)}
                        />
                      </div>
                  );
                })}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <form>
              <div className="form-group">
                <label htmlFor="new-tag">New Tag</label>
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
              <div
                className="error"
                style={{
                  color: "red",
                  paddingLeft: "100px",
                  paddingTop: "10px",
                }}
              >
                {Massage}
              </div>
            </form>
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={saveButtonClicked}
            >
              Save
            </button>
          </Modal.Footer>
        </Modal>
        {/* ---- start model code for Add tags -----------*/}
      </div>
      {/* <Modal show={isOpen} className="send-confirm" id="delete-smartlist">
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              setIsOpen(false);
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <img src={path + "alert.png"} alt="" />
          <h4>
            The record will be deleted from the list.
            <br />
            Are you sure you want to delete it?
          </h4>

          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={() => {
                deleteReader(profileUserId);
                setIsOpen(false);

                setOpenDeleteConfirmation(true);
                // setUpdatedData(update + 1);
              }}
            >
              Yes Please!
            </button>

            <button
              type="button"
              className="btn btn-primary btn-bordered light"
              data-bs-dismiss="modal"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal> */}
    </>
  );
};
export default CreateEmails;
