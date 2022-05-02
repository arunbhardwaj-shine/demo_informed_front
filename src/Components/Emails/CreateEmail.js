import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import OwlCarousel from "react-owl-carousel";
import { connect } from "react-redux";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { getEmailData } from "../../actions";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { loader } from "../../loader";

const CreateEmail = (props) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const navigate = useNavigate();
  const [SendListData, setSendListData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const location = useLocation();
  const { PdfSelected } = location.state;
  const { campaign_id } = location.state;
  const pathname = location.pathname;
  const [templateList, setTemplateList] = useState([]);
  const [template, setTemplate] = useState("");
  const [emailDescription, setEmailDescription] = useState("");
  const [emailCreator, setEmailCreator] = useState("");
  const [counter, setCounter] = useState(0);
  const [modalCounter, setModalCounter] = useState(0);
  const [emailCampaign, setemailCampaign] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [renderAfterValidation, setRenderAfterValidation] = useState(0);
  const [tagClickedFirst, setTagClickedFirst] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [allTags, setAllTags] = useState({});
  const [newTag, setNewTag] = useState("");
  const [finalTags, setFinalTags] = useState([]);
  const [tagsReRender, setTagsReRender] = useState(0);
  const [tagsCounter, setTagsCounter] = useState(0);
  const [validator] = React.useState(new SimpleReactValidator());
  const [validator2] = React.useState(new SimpleReactValidator());

  const newArr = [];

  useEffect(() => {
    const body = {
      user_id: 18207,
      language: "",
      ibu: "",
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const getTemplateListData = async () => {
      loader("show");
      await axios
        .post(`emailapi/get_template_list`, body)
        .then((res) => {
          console.log(res);
          setTemplateList(res.data.response.data);
          setCounter(counter + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTemplateListData();
  }, []);

  useEffect(() => {
    const body = {
      user_id: 18207,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const getAllTags = async () => {
      console.log(process.env.REACT_APP_API_KEY);
      await axios
        .post(`emailapi/get_tags`, body)
        .then((res) => {
          setAllTags(res.data.response.data);
            if(typeof campaign_id === "undefined" || campaign_id == 0){
              loader("hide");
            }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllTags();
    getCampaignData();
  }, []);

  const getCampaignData = async () => {
    if(typeof campaign_id !== "undefined" && campaign_id != 0){
      const body = {
        user_id: 18207,
        campaign_id: campaign_id
      };
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      await axios
        .post(`emailapi/get_campaign_details`, body)
        .then((res) => {
          let campaign_data = res.data.response.data;
          setEmailDescription(campaign_data.description);
          setEmailCreator(campaign_data.creator);
          setemailCampaign(campaign_data.campaign);
          setEmailSubject(campaign_data.subject);
          setFinalTags(campaign_data.tags);
          setTemplate(campaign_data.source_code)
          loader("hide");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const saveAsTemplateButtonClicked = async () => {
    const body = {
      user_id: 18207,
      source_code: template,
      template_id: templateId,
      name: templateName,
      status: 2,
      language: 2,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/add_update_template`, body)
      .then((res) => {
        loader("hide");
       // console.log(res);
      })
      .catch((err) => {
       // console.log(err);
      });
  };

  const saveButtonClicked = () => {
    setFinalTags(tagClickedFirst);
    closeModal();
  };

  const closeModal = () => {
    //console.log("closed");
    setIsOpen(false);
  };

  const saveAsDraft = async () => {
    let tagss = [];
    finalTags.map((tags) => {
      tagss.push(tags.innerText || tags);
    });
   // console.log(tagss);
    const body = {
      user_id: 18207,
      pdf_id: PdfSelected,
      description: emailDescription,
      creator: emailCreator,
      campaign_name: emailCampaign,
      subject: emailSubject,
      route_location: pathname,
      tags: tagss,
      campaign_data: {
        template_id: templateId,
      },
    };

    console.log(body);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        loader("hide");
       // console.log(res);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const templateClicked = (template, e) => {
    e.preventDefault();
    const div = document.querySelector("img.select_mm");
    console.log(div);

    if (div) {
      div.classList.remove("select_mm");
    }

    setTemplateId(template.id);
    setTemplateName(template.name);
    setTemplate(template.source_code);
    e.target.classList.toggle("active");
  };

  const emailSubjectChanged = (e) => {
    setEmailSubject(e.target.value);
  };

  const nextClicked = () => {
    if (validator.allValid()) {
      props.getEmailData({
        emailDescription: emailDescription,
        emailCreator: emailCreator,
        emailCampaign: emailCampaign,
        emailSubject: emailSubject,
        templateId: templateId,
        tags: finalTags,
        template: template,
        pdf_id: PdfSelected,
      });

      navigate("/SelectHCP");
    } else {
      //console.log("show error messages");
      //console.log(validator.errorMessages);
      validator.showMessages();
      setRenderAfterValidation(renderAfterValidation + 1);
    }
  };

  const tagButtonClicked = () => {
    // $('#myModal').modal('show'
    // document.getElementById("tagsModal").modal('show');
    setIsOpen(true);
    setModalCounter(modalCounter + 1);
  };

  const newTagChanged = (e) => {
    setNewTag(e.target.value);
    e.target.value = "";
    const new_atg = document.getElementById("new-tag");
    new_atg.value = "";
    //console.log(new_atg);
  };

  const emailDescriptionChange = (e) => {
    setEmailDescription(e.target.value);
  };

  const emailCreatorChange = (e) => {
    setEmailCreator(e.target.value);
  };

  const changeEmailCampaign = (e) => {
    setemailCampaign(e.target.value);
  };

  useEffect(() => {}, []);

  const addTag = () => {
    if (validator2.allValid()) {
      setTagClickedFirst((oldArray) => [...oldArray, newTag]);
      setNewTag("");
    } else {
      validator2.showMessages();
      setTagsCounter(tagsCounter + 1);
    }
  };

  const tagClicked = (event) => {
    setTagClickedFirst((oldArray) => [...oldArray, event.target]);
  };

  const removeTag = (index) => {
    //console.log(index);
    const tags = tagClickedFirst;

    tags.splice(index, 1);
    //console.log(tags);
    setTagClickedFirst(tags);
    setTagsReRender(tagsReRender + 1);
    // tagClickedFirst.splice(index, 1);
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

  return (
    <>
      <div className="col right-sidebar">
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <button className="btn btn-primary btn-bordered back">
                  <Link to="/EmailArticleSelect">Back</Link>
                </button>
              </div>
            </div>
            <div className="col-12 col-md-9">
              <ul className="tabnav-link">
                <li className="">
                  <a href="">Select Content</a>
                </li>
                <li className="active">
                  <a href="">Create Your Email</a>
                </li>
                <li className="">
                  <a href="">Select HCPs</a>
                </li>
                <li className="">
                  <a href="">Verify your list</a>
                </li>
                <li className="">
                  <a href="">Verify your Email</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-2">
              <div className="header-btn">
                <button
                  className="btn btn-primary btn-bordered move-draft"
                  onClick={saveAsDraft}
                >
                  Save As Draft
                </button>

                <button
                  className="btn btn-primary btn-filled next"
                  onClick={nextClicked}
                >
                  Next
                </button>
              </div>
            </div>
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
              <OwlCarousel
                className="mail-templates owl-carousel owl-theme"
                margin={20}
                items={5}
                dots={false}
                speed={500}
                nav
              >
                {templateList.map((template) => {
                  return (
                    <>
                      <div
                        className="item"
                        onClick={(e) => templateClicked(template, e)}
                      >
                        <img src={path_image + "content_added1.png"} alt="" />
                        <p>{template.name}</p>
                      </div>
                    </>
                  );
                })}
              </OwlCarousel>
              <input type="hidden" id="mail_template" value={templateId} />
              {validator.message("Templates", templateId, "required")}
              <div className="email-form">
                <form>
                  <div className="form-inline row justify-content-between align-items-center">
                    <div className="form-group col-12 col-md-7">
                      <label for="exampleInputEmail1">Email Description </label>
                      <input
                        onChange={(e) => emailDescriptionChange(e)}
                        type="text"
                        className="form-control"
                        id="email-desc"
                        value={emailDescription}
                      />
                      {validator.message(
                        "emailDesc",
                        emailDescription,
                        "required"
                      )}
                    </div>
                    <div className="form-group right-side col-12 col-md-5">
                      <label for="exampleInputEmail1">Email Creator</label>
                      <input
                        onChange={(e) => emailCreatorChange(e)}
                        type="text"
                        className="form-control"
                        id="email-address"
                        value={emailCreator}
                      />
                      {validator.message("creator", emailCreator, "required")}
                    </div>
                  </div>
                  <div className="form-inline row justify-content-between align-items-center">
                    <div className="form-group">
                      <label for="exampleInputEmail1">Email Campaign</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email-campaign"
                        value={emailCampaign}
                        onChange={changeEmailCampaign}
                      />
                      {validator.message(
                        "emailCampaign",
                        emailCampaign,
                        "required"
                      )}
                    </div>
                  </div>
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
                        {/* {Object.values(allTags).map((data) => {
                          return (
                            <>
                              <li className="list1">
                                {data}{" "}
                                <img
                                  src={path_image + "filter-close.svg"}
                                  alt="Close-filter"
                                />
                              </li>
                            </>
                          );
                        })} */}
                        {/*
                        <li className="list1">
                          tag1{" "}
                          <img
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </li>
                        <li className="list2">
                          tag2{" "}
                          <img
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </li>
                        <li className="list3">
                          tag3{" "}
                          <img
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </li>
                        <br />
                        <li className="list4">
                          tag4{" "}
                          <img
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </li>
                        <li className="list5">
                          tag5{" "}
                          <img
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </li> */}
                      </ul>
                    </div>
                  </div>
                  <div className="form-inline row justify-content-end align-items-center">
                    <div className="form-group col-12 col-md-7">
                      <label for="exampleInputEmail1">Email Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email-subject"
                        onChange={(e) => emailSubjectChanged(e)}
                        value={emailSubject}
                      />
                      {validator.message(
                        "emailSubject",
                        emailSubject,
                        "required"
                      )}
                    </div>
                    <div className="form-buttons right-side col-12 col-md-5">
                      <button className="btn btn-primary approved-btn btn-bordered">
                        Approved{" "}
                        <img src={path_image + "approved-btn.svg"} alt="" />
                      </button>
                      <button className="btn btn-primary btn-filled btn-large">
                        Send A Sample{" "}
                        <img src={path_image + "send-sample.svg"} alt="" />
                      </button>
                      <button
                        className="btn btn-primary btn-filled"
                        onClick={(e) => {
                          saveAsTemplateButtonClicked();
                          e.preventDefault();
                        }}
                      >
                        Save As template
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <CKEditor
              editor={ClassicEditor}
              data={template}
              readOnly = {true}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
              }}
              onChange={(event, editor) => {
                //console.log(editor);
                const data = editor.getData();
                setTemplate(data);
              }}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
          </div>
        </section>
      </div>

      <div
        className="modal fade"
        id="tagsModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="tagsModal"
        aria-hidden="true"
      >
        <Modal show={isOpen}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
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
              </div>
              <div className="modal-body">
                <div className="select-tags">
                  <h6>Select Tag :</h6>
                  <div className="tag-lists">
                    <div className="tag-lists-view">
                      {Object.values(allTags).map((data) => {
                        return (
                          <>
                            <div onClick={(event) => tagClicked(event)}>
                              {data}{" "}
                            </div>
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
                          <div>{data.innerHTML || data}</div>
                          <img
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                            onClick={() => removeTagFinal(index)}
                          />
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
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
                    {validator2.message("newTag", newTag, "required")}
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
                  className="btn btn-primary save btn-filled"
                  onClick={saveButtonClicked}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  //console.log(state);

  return state;
};

export default connect(mapStateToProps, { getEmailData: getEmailData })(
  CreateEmail
);
