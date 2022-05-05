import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { getCampaignId, getEmailData } from "../../actions";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { loader } from "../../loader";
import { popup_alert } from "../../popup_alert";
import { toast} from "react-toastify";

const CreateEmail = (props) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const navigate = useNavigate();
  const [SendListData, setSendListData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const location = useLocation();
  const [uniqueId, setUniqueId] = useState("");
  const PdfSelected = location.state
    ? location.state.PdfSelected
    : props.getDraftData.pdf_id;
  const campaign_id = props.getDraftData ? props.getDraftData.campaign_id : "";

  const [templateList, setTemplateList] = useState([]);
  const [template, setTemplate] = useState("");
  const [campaign_id_st, setCampaign_id] = useState(campaign_id);
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
  const [isOpen_send, setIsOpensend] = useState(false);
  const [allTags, setAllTags] = useState({});
  const [newTag, setNewTag] = useState("");
  const [finalTags, setFinalTags] = useState([]);
  const [tagsReRender, setTagsReRender] = useState(0);
  const [tagsCounter, setTagsCounter] = useState(0);
  const [validator] = React.useState(new SimpleReactValidator());
  const [validator2] = React.useState(new SimpleReactValidator());
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [reRender, setReRender] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedHcp, setSelectedHcp] = useState([]);
  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const newArr = [];

  useEffect(() => {
    
    loader("show");

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
    console.log("sdsdsd");
  }, [selectedHcp]);

  useEffect(() => {
    const body = {
      user_id: 18207,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const getAllTags = async () => {
      await axios
        .post(`emailapi/get_tags`, body)
        .then((res) => {
          setAllTags(res.data.response.data);
          if (typeof campaign_id === "undefined" || campaign_id == 0) {
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

  
  const deleteSelected = (index) => {
    let arr = [];
    arr = selectedHcp;
    arr.splice(index, 1);

    setSelectedHcp(arr);
    setReRender(reRender + 1);
  };

const sendsampeap = (event)=>{

  setIsOpensend(false);

 let selected_ids  = selectedHcp.map((number) =>
    number['user_id']
);

  loader("show");
  const body = {
    user_id: 18207,
    pdf_id: PdfSelected,
    subject: emailSubject,
    template_id: templateId,
    user_list: selected_ids,
    smartlist_id: "",
  };

   console.log(body); 
  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

      axios
      .post(`emailapi/send_sample_email`, body)
      .then((res) => {
        console.log(res);
        loader("hide");
        if(res.data.status_code===200){
         
          popup_alert({"visible":"show","message":"Test mail sent successfuly","type":"success"});
        }else{
          popup_alert({"visible":"show","message":res.data.message,"type":"error"});
        }
        
        //toast.success("Test Mail sent successfuly");
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
        console.log(err);
      });

}


  const getCampaignData = async () => {
    if (typeof campaign_id !== "undefined" && campaign_id != 0) {
      const body = {
        user_id: 18207,
        campaign_id: campaign_id,
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
          setTemplate(campaign_data.source_code);
          loader("hide");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  const selectHcp = (index) => {
    // console.log(index);
    let arr = [];
    arr = searchedUsers;
    const removedArray = arr.splice(index, 1);
    // console.log(removedArray);

    setSelectedHcp((oldArray) => [...oldArray, removedArray[0]]);
    setSearchedUsers(arr);
    setReRender(reRender + 1);
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

  const nameChanged = (e) => {
    setName(e.target.value);
  };
  
  const emailChanged = (e) => {
    setEmail(e.target.value);
  };


  const closeModal = () => {
    //console.log("closed");
    setIsOpen(false);
  };

  // const saveAsDraft = async () => {
  //   let tagss = [];
  //   finalTags.map((tags) => {
  //     tagss.push(tags.innerText || tags);
  //   });

  //   // console.log(tagss);
  //   const body = {
  //     user_id: 18207,
  //     pdf_id: PdfSelected,
  //     description: emailDescription,
  //     creator: emailCreator,
  //     campaign_name: emailCampaign,
  //     subject: emailSubject,
  //     route_location: "CreateEmail",
  //     tags: tagss,
  //     campaign_data: {
  //       template_id: templateId,
  //     },
  //     campaign_id: campaign_id,
  //   };

  //   console.log(body);
  //   axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  //   loader("show");
  //   await axios
  //     .post(`emailapi/save_draft`, body)
  //     .then((res) => {
  //       console.log(res);
  //       console.log(res.data.response.data.id);
  //       setUniqueId(res.data.response.data.id);
  //       //  props.getCampaignId(res.data.response.data.id);

  //       loader("hide");

  //       props.getCampaignId(res.data.response.data.id);

  //       // console.log(res);
  //     })
  //     .catch((err) => {
  //       //console.log(err);
  //     });
  // };

  const saveAsDraft = async () => {
    let tagss = [];
    finalTags.map((tags) => {
      tagss.push(tags.innerText || tags);
    });

    const body = {
      user_id: 18207,
      pdf_id: props.getEmailData
        ? PdfSelected
        : props.getDraftData.pdf_selected,
      description: props.getEmailData
        ? emailDescription
        : props.getDraftData.description,
      creator: props.getEmailData ? emailCreator : props.getDraftData.creator,
      campaign_name: props.getEmailData
        ? emailCampaign
        : props.getDraftData.campaign,
      subject: props.getEmailData ? emailSubject : props.getDraftData.subject,
      route_location: "CreateEmail",
      tags: props.getEmailData ? tagss : props.getDraftData.tags,
      campaign_data: {
        template_id: props.getEmailData
          ? templateId
          : props.getDraftData.template_id,
      },

      campaign_id: campaign_id_st,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        loader("hide");

        setCampaign_id(res.data.response.data.id);
        //props.getCampaignId(res.data.response.data.id);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const templateClicked = (template, e) => {
    const div = document.querySelector("img.select_mm");

    if (div) {
      div.classList.remove("select_mm");
    }

    setTemplateId(template.id);
    setTemplateName(template.name);
    setTemplate(template.source_code);
    e.target.classList.toggle("select_mm");
  };

  const emailSubjectChanged = (e) => {
    setEmailSubject(e.target.value);
  };

  const nextClicked = () => {
    if (validator.allValid()) {
      props.getEmailData({
        //uniqueId: uniqueId,
        emailDescription: emailDescription,
        emailCreator: emailCreator,
        emailCampaign: emailCampaign,
        emailSubject: emailSubject,
        templateId: templateId,
        tags: finalTags,
        template: template,
        pdf_id: PdfSelected,
        campaign_id: campaign_id_st,
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

  useEffect(() => { }, []);

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


  const sendSample =(event)=>{
    event.preventDefault();
      if(templateId=="" || templateId==0 || emailSubject=="" || emailSubject==0){
          toast.error("Plese select Mail template and Subject first");
      }else{
        setIsOpensend(true);
      }

  }

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
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
};

const searchHcp = async (e) => {
  e.preventDefault();
  const body = {
    user_id: 18207,
    name: name,
    email: email,
  };

  //console.log(body);
  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  //loader("show");
  await axios
    .post(`emailapi/search_hcp`, body)
    .then((res) => {
      console.log(res);
      // console.log(res.data.response.data);
      if (res.data.response) {
        setSearchedUsers(res.data.response.data);
      }
      if (res.data.message) {
        setMessage(res.data.message);
      }
      //loader("hide");
    })
    .catch((err) => {
      console.log(err);
    });
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

                 
                      <AliceCarousel
                        mouseTracking
                        disableDotsControls
                        
                        activeIndex={activeIndex}
                        responsive={responsive}
                        onSlideChanged={syncActiveIndex}
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
              </AliceCarousel>
            
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
                        Approved
                        <img src={path_image + "approved-btn.svg"} alt="" />
                      </button>
                      <button className="btn btn-primary btn-filled btn-large" onClick={sendSample}>
                        Send A Sample
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
              readOnly={true}
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

    
          <Modal show={isOpen_send}>
            <div id="send-sample" className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">

           
              <div className="modal-header">
              <h4>Send a Sample</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setIsOpensend(false)}  ></button>
              </div>

              <div className="modal-body">
              <div className="top-header">
              <div className="page-title">
                <h4>Search For Contact By:</h4>
              </div>
              </div>
              <section className="search-hcp">
              <div className="form-search-hcp">
                <form>
                  <div className="form-inline row justify-content-between align-items-center">
                    <div className="col-12 col-md-7">
                      <div className="row justify-content-between align-items-center">
                        <div className="form-group col-sm-6">
                          <label for="hcp-name">Name</label>
                          <input type="text" className="form-control"  onChange={(e) => nameChanged(e)} id="" />
                        </div>
                        <div className="form-group col-sm-6">
                          <label for="hcp-email">Email</label>
                          <input type="mail"   onChange={(e) => emailChanged(e)} className="form-control" id="" />
                        </div>
                      </div>
                    </div>
                    <div className="form-button col-12 col-md-5">
                      <button className="btn btn-primary btn-filled"  onClick={(e) => searchHcp(e)}>Search</button>
                      <button className="btn btn-primary btn-bordered" type="button" data-bs-toggle="modal" data-bs-target="#add_hcp">Add New Contact +</button>
                      <button className="btn btn-primary btn-bordered" type="button" data-bs-toggle="modal" data-bs-target="#add_hcp">Add Smart List +</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="search-hcp-table">
              <div className="search-hcp-table-inside">

              {searchedUsers.length === 0 ? (
                <div className="not-found">
                  <h4>No Record Found!</h4>
                </div>
              ) : (
                searchedUsers.map((data, index) => {
                    return (
                      <div className="search-hcp-box">
                        <p className="send-hcp-box-title">Name | <span>{data.name}</span></p>
                        <p className="send-hcp-box-title">Email | <span>{data.email}</span></p>
                        <p className="send-hcp-box-title">Contact Type | <span>N/A</span></p>
                        <div className="add-new-field" onClick={() => selectHcp(index)}><img src={path_image + "add-row.png"} alt="Add More" /></div>
                      </div>
                    );
                  })
                )}

              </div>
              </div>
              <div className="selected-hcp-table">
                <div className="table-title">
                  <h4>Selected HCPs <span>| {selectedHcp.length}</span></h4>
                </div>
                <div className="selected-hcp-list">
                {selectedHcp.length === 0 ? (
                    <div className="not-found">
                      <h4>No Contact selected yet!</h4>
                    </div>
                  ) : (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Country</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedHcp.map((data, index2) => {
                          return (
                            <>
                              <tr >
                               <td>{data.name || data.first_name}</td>
                                <td>{data.email}</td>
                            
                                <td>{data.country}</td>
                              
                                <td className="delete_row" colSpan="12">
                                  <img
                                    src={path_image + "delete.svg"}
                                    alt="Delete Row"
                                    onClick={() => deleteSelected(index2)}
                                  />
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </section>
              
              </div>
              <div className="modal-footer">
              {selectedHcp.length === 0 ?

                <button type="button" className="btn btn-primary btn-filled disabled" data-bs-dismiss="modal">Send</button> 
              :
                <button type="button" className="btn btn-primary btn-filled" data-bs-dismiss="modal" onClick={sendsampeap}>Send</button> 
              }
              
              </div>

            </div>
            </div>
            </Modal>
         

      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

export default connect(mapStateToProps, {
  getEmailData: getEmailData,
  getCampaignId: getCampaignId,
})(CreateEmail);
