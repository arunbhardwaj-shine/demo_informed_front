import axios from "axios";
import { connect } from "react-redux";
import { loader } from "../../loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { popup_alert } from "../../popup_alert";
import { Col, Modal,Tab,Tabs } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
 
const VerifyHcpMAIL = (props) => {
  const rdLikeArray=["56Ek4feL/1A8mZgIKQWEqg==","bWmUjqX7J011   WUTYn9g==","MXl8m36VZFYXpgFVz3Pg0g=="]
  const isLikeRdAccount= rdLikeArray.includes(localStorage.getItem("user_id"))
  const groupId= localStorage.getItem("group_id")
  const routeTypeSurvey = props?.type == "survey" ? 1 : 0;
  const surveyid = props?.getEmailData?.survey_id ? props?.getEmailData?.survey_id : props?.getDraftData?.campaign_data?.survey_id ? props?.getDraftData?.campaign_data?.survey_id : 0;
  const surveySubLinkId = props?.getEmailData?.sublink_id ? props?.getEmailData?.sublink_id : props?.getDraftData?.campaign_data?.sublink_id ? props?.getDraftData?.campaign_data?.sublink_id : 0;
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [campaign_id_st, setCampaign_id] = useState();
  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
 
  const [templateId, setTemplateId] = useState(0);
  
  const [getRemovedHcp, setRemovedHcp] = useState([]);
  const [getSmartListData, setSmartListData] = useState([]);
  const [reRender, setReRender] = useState(0);
  const [template_source_code, setTemplate] = useState(
    props?.getEmailData?.template
      ? props?.getEmailData?.template
      : props?.getDraftData?.source_code
  );

  var var_template_source_code = template_source_code?.replaceAll("800", "450");
  var_template_source_code = var_template_source_code?.replaceAll("600", "450");

  const selectedHcp = (location?.state?.selectedHcp&&location?.state?.selectedHcp!="undefined")
    ? location?.state?.selectedHcp
    : props?.getDraftData?.campaign_data?.selectedHcp ?
      props?.getDraftData?.campaign_data?.selectedHcp
    : props?.getSelected ? 
      props?.getSelected
    : [];

     
    const searchedUsers = location?.state
    ? location?.state?.searchedUsers
    : props?.getDraftData?.campaign_data?.searchedUsers
    ?props?.getDraftData?.campaign_data?.searchedUsers
    :[];

  const PdfSelected = location?.state
    ? location?.state?.PdfSelected
    : props?.getDraftData?.PdfSelected;

  const [getpdfdata, setPdfData] = useState([]);
  const [getSurveyData, setSurveyData] = useState([]);

  const [getReaderDetails, setReaderDetails] = useState({});
  const [getSmartListName, setSmartListName] = useState("");
  const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);
  const [showLessInfo, setShowLessInfo] = useState(true);
  const [getSelectedPdfId, setSelectedPdfId] = useState(PdfSelected);
  const [getArticleType, setArticleType] = useState(
    props?.getEmailData?.status
      ? props?.getEmailData?.status
      : props?.getDraftData?.status && props?.getDraftData?.status != ""
      ? props?.getDraftData?.status
      : 0
  );
  const [irtRoleObj,setIRTRoleObj] = useState(
    typeof location?.state?.IrtObj !== "undefined" ? location?.state?.IrtObj : {}
  );

  const [IRTTraining, setIRTTraining] = useState(props?.getEmailData?.startTraining  ? props?.getEmailData?.startTraining : 0);

  const BrokenImage =
    "https://docintel.s3-eu-west-1.amazonaws.com/cover/default/default.png";

  useEffect(() => {
    let campaign_id =
      typeof props?.getEmailData === "object" &&
      props?.getEmailData !== null &&
      props?.getEmailData?.campaign_id
        ? props?.getEmailData?.campaign_id
        : props?.getDraftData?.campaign_id
        ? props?.getDraftData?.campaign_id
        : "";
    setCampaign_id(campaign_id);

    if (
      (typeof props?.getSelectedSmartListData === "object" &&
        props?.getSelectedSmartListData !== null) ||
      (props?.getDraftData !== null && props?.getDraftData?.smart_list_data)
    ) {
      let smart_list_data =
        typeof props?.getSelectedSmartListData === "object" &&
        props?.getSelectedSmartListData !== null
          ? props?.getSelectedSmartListData
          : props?.getDraftData?.smart_list_data;
      setSmartListData(smart_list_data);
    }

    if (location.state?.removedHcp) {
      if (
        typeof location.state.removedHcp != "undefined" &&
        location.state.removedHcp != ""
      ) {
        setRemovedHcp(location.state.removedHcp);
      }
    } else {
      if (props?.getDraftData?.campaign_data) {
        if (props?.getDraftData?.campaign_data?.removedHcp) {
          if (
            typeof props?.getDraftData?.campaign_data.removedHcp != "undefined" &&
            props?.getDraftData?.campaign_data.removedHcp != ""
          ) {
            setRemovedHcp(props?.getDraftData?.campaign_data.removedHcp);
          }
        }
      }
    }

    getpdfData();


  }, []);

  axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
  const getpdfData = async () => {
    let pdf_id = props?.getEmailData?.PdfSelected
      ? props?.getEmailData?.PdfSelected
      : props?.getDraftData?.pdf_id;
    setSelectedPdfId(pdf_id);
    if (
      typeof pdf_id !== "undefined" &&
      pdf_id != 0 &&
      pdf_id != 13 &&
      pdf_id != 14 &&
      pdf_id != 16 &&
      pdf_id != 1
    ) {
      axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
      const body = {
        user_id: localStorage.getItem("user_id"),
        pdf_id: pdf_id,
      };
      loader("show");
      await axios
        .post(`emailapi/get_pdf`, body)
        .then((res) => {
          if (res.data.status_code == 200) {
            setPdfData(res.data.response.data);
          } else {
            toast.error(res.data.message);
          }
          loader("hide");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }

    if(pdf_id == 1){
      axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
      const body = {
        user_id: localStorage.getItem("user_id"),
        surveyId: surveyid,
        surveySubLinkId: surveySubLinkId
      };
      loader("show");
      await axios
        .post(`emailapi/get_survey_details`, body)
        .then((res) => {
          if (res.data.status_code == 200) {
            setSurveyData(res.data.response.data);
          } else {
            toast.error(res.data.message);
          }
          loader("hide");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }
  };

  const handleInputChange = (event, selected) => {
    const div = document.querySelector("div.active");

    if (div) {
      div.classNameNameList.remove("active");
    }
    event.target.classNameNameList.toggle("active");
    setTemplateId(selected);
  };

 

  const saveAsDraft = async () => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      pdf_id: props?.getEmailData?.PdfSelected
        ? props?.getEmailData?.PdfSelected
        : props?.getDraftData?.pdf_id,
      description: props?.getEmailData?.emailDescription
        ? props?.getEmailData?.emailDescription
        : props?.getDraftData?.description
        ? props?.getDraftData?.description
        : "",
      creator: props?.getEmailData?.emailCreator
        ? props?.getEmailData?.emailCreator
        : props?.getDraftData?.creator
        ? props?.getDraftData?.creator
        : "",
      campaign_name: props?.getEmailData?.emailCampaign
        ? props?.getEmailData?.emailCampaign
        : props?.getDraftData?.campaign,
      subject: props?.getEmailData?.emailSubject
        ? props?.getEmailData?.emailSubject
        : props?.getDraftData?.subject,
      route_location: routeTypeSurvey ? "survey/email/verify-hcp-mail" : "VerifyHcpMAIL",
      tags: props?.getEmailData?.tags
        ? props?.getEmailData?.tags
        : props?.getDraftData?.tags,
      campaign_data: {
        template_id: props?.getEmailData?.templateId
          ? props?.getEmailData?.templateId
          : props?.getDraftData?.campaign_data.template_id,
        selectedHcp: selectedHcp,
        searchedUsers:irtRoleObj?.IRTFlag?searchedUsers:[],
        list_selection: props?.getEmailData?.selected
          ? props?.getEmailData?.selected
          : props?.getDraftData?.campaign_data?.list_selection
          ?props?.getDraftData?.campaign_data?.list_selection
          :[],
        removedHcp: getRemovedHcp,
        sublink_id: props?.getEmailData?.sublink_id
          ? props?.getEmailData.sublink_id
          : surveySubLinkId,
        survey_id: props?.getEmailData?.survey_id
          ? props?.getEmailData.survey_id
          : surveyid,
      },
      campaign_id: campaign_id_st,
      source_code: props?.getEmailData?.template
        ? props?.getEmailData?.template
        : props?.getDraftData?.source_code,
      status: 2,
    };
   
    axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        if (res.data.status_code === 200) {
          setCampaign_id(res.data.response.data.id);
          if(irtRoleObj?.IRTFlag){
             
            popup_alert({
              visible: "show",
              message: "Your changes has been saved <br />successfully !",
              type: "success",
              redirect: "/IRTRole",
            });
          }else{
            const redirectRoute = routeTypeSurvey ? "/survey/email" : "/EmailList";
            popup_alert({
              visible: "show",
              message: "Your changes has been saved <br />successfully !",
              type: "success",
              redirect: redirectRoute,
            });
          }
         
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const createEmail = async () => {
    if (getSelectedPdfId == 13) {
      popup_alert({
        visible: "show",
        message:
          "We can't send this email until you've chosen the right content. Please go back to 'Select Content' and pick something. ",
        type: "error",
      });
    } else {
      let finalTags = props?.getEmailData?.tags
        ? props?.getEmailData?.tags.map((tags) => {
            return tags.innerHTML || tags;
          })
        : props?.getDraftData?.tags.map((tags) => {
            return tags.innerHTML || tags;
          });

      let user_list =
        props?.getEmailData?.selectedHcp || location.state
          ? selectedHcp.map((userId) => {
              return userId.profile_user_id || userId.user_id;
            })
          : props?.getDraftData?.campaign_data.selectedHcp.map((userId) => {
              return userId.profile_user_id || userId.user_id;
            });

      const body = {
        user_id: localStorage.getItem("user_id"),
        route_location: routeTypeSurvey ? "survey/email/verify-hcp-mail" : "VerifyHcpMAIL",
        pdf_id: props?.getEmailData?.PdfSelected
          ? props?.getEmailData?.PdfSelected
          : props?.getDraftData?.pdf_id,
        subject: props?.getEmailData?.emailSubject
          ? props?.getEmailData?.emailSubject
          : props?.getDraftData?.subject,
        description: props?.getEmailData?.emailDescription
          ? props?.getEmailData?.emailDescription
          : props?.getDraftData?.description
          ? props?.getDraftData?.description
          : "",
        creator: props?.getEmailData?.emailCreator
          ? props?.getEmailData?.emailCreator
          : props?.getDraftData?.creator
          ? props?.getDraftData?.creator
          : "",
        campaign_name: props?.getEmailData?.emailCampaign
          ? props?.getEmailData?.emailCampaign
          : props?.getDraftData?.campaign,
        tags: finalTags,
        template_source_code: props?.getEmailData?.template
          ? props?.getEmailData?.template
          : props?.getDraftData?.source_code,
        campaign_id: campaign_id_st,
        campaign_data: {
          user_list: user_list,
          template_id: props?.getEmailData?.templateId
            ? props?.getEmailData?.templateId
            : props?.getDraftData?.campaign_data.template_id,
          list_selection: props?.getEmailData?.selected
            ? props?.getEmailData?.selected
            : props?.getDraftData?.campaign_data?.list_selection,
          sublink_id: props?.getEmailData?.sublink_id
            ? props?.getEmailData.sublink_id
            : surveySubLinkId,
          survey_id: props?.getEmailData?.survey_id
            ? props?.getEmailData.survey_id
            : surveyid,
        },
      };
      axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
      loader("show");
      if(localStorage.getItem('user_id') == 'rjiGlqA9DXJVH7bDDTX0Lg=='){
        await axios
          .post(`emailapi/send_email_new`, body)
          .then((res) => {
            loader("hide");
            if (res.data.status_code === 200) {
              const redirectRoute = routeTypeSurvey ? "/survey/email" : "/EmailList";
              popup_alert({
                visible: "show",
                message: res?.data?.message ?res?.data?.message:"Mail sent successfully",
                type: "success",
                redirect: redirectRoute,
              });
            } else {
              popup_alert({
                visible: "show",
                message: res.data.message,
                type: "error",
              });
            }
          })
          .catch((err) => {
            loader("hide");
            toast.error("Something went wrong");
            console.log(err);
          });
      }else{
        await axios
          .post(`emailapi/send_email`, body)
          .then((res) => {
            loader("hide");
            if (res.data.status_code === 200) {

              if(irtRoleObj?.IRTFlag){
                // setSearchedUsers(searchedUsers)
                popup_alert({
                  visible: "show",
                  message:  res?.data?.message ?  res?.data?.message : "Your changes has been saved <br />successfully !",
                  type: "success",
                  redirect: "/IRTRole",
                });
              }else
            {
              const redirectRoute = routeTypeSurvey ? "/survey/email" : "/EmailList";
                popup_alert({
                visible: "show",
                message: res?.data?.message ?res?.data?.message:"Mail sent successfully",
                type: "success",
                redirect: redirectRoute,
              });}
            } else {
              popup_alert({
                visible: "show",
                message: res.data.message,
                type: "error",
              });
            }
          })
          .catch((err) => {
            toast.error("Something went wrong");
            loader("hide");
            console.log(err);
          });
      }
    }
  };

  const removeTag = (i) => {
    const allTags = props?.getEmailData?.tags
      ? props?.getEmailData?.tags
      : props?.getDraftData?.tags;
    
    allTags.splice(i, 1);
    
    setReRender(reRender + 1);
    
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeButtonClicked = () => {
    setIsOpen(false);
    const closeRoute = routeTypeSurvey ? "/survey/email" : "/EmailList"
    navigate(closeRoute);
  };

  const backClicked = () => {
    const backRoute = routeTypeSurvey ? "/survey/email/verify-hcp" : "/VerifyHCP";
    if(irtRoleObj?.IRTFlag){
      navigate(backRoute,{state: {IrtObj:irtRoleObj}})
    }else{
      navigate(backRoute);
    }
  };

  

  const showMoreInfo = (e) => {
    e.preventDefault();
    setShowLessInfo(!showLessInfo);
  };

  const approvedClicked = async (e) => {
    let status = getArticleType;
    if (getArticleType === 3) {
      await setArticleType(2);
      status = 2;
    } else {
      await setArticleType(3);
      status = 3;
    }
    e.preventDefault();
    const body = {
      user_id: localStorage.getItem("user_id"),
      pdf_id: props?.getEmailData?.PdfSelected
        ? props?.getEmailData?.PdfSelected
        : props?.getDraftData?.pdf_id,
      description: props?.getEmailData?.emailDescription
        ? props?.getEmailData?.emailDescription
        : props?.getDraftData?.description
        ? props?.getDraftData?.description
        : "",
      creator: props?.getEmailData?.emailCreator
        ? props?.getEmailData?.emailCreator
        : props?.getDraftData?.creator
        ? props?.getDraftData?.creator
        : "",
      campaign_name: props?.getEmailData?.emailCampaign
        ? props?.getEmailData?.emailCampaign
        : props?.getDraftData?.campaign,
      subject: props?.getEmailData?.emailSubject
        ? props?.getEmailData?.emailSubject
        : props?.getDraftData?.subject,
      route_location: routeTypeSurvey ? "survey/email/verify-hcp-mail" : "VerifyHcpMAIL",
      tags: props?.getEmailData?.tags
        ? props?.getEmailData?.tags
        : props?.getDraftData?.tags,
      campaign_data: {
        template_id: props?.getEmailData?.templateId
          ? props?.getEmailData?.templateId
          : props?.getDraftData?.campaign_data.template_id,
        selectedHcp: selectedHcp,
        searchedUsers:irtRoleObj?.IRTFlag?searchedUsers:[],
        list_selection: props?.getEmailData?.selected
          ? props?.getEmailData?.selected
          : props?.getDraftData?.campaign_data?.list_selection,
        sublink_id: props?.getEmailData?.sublink_id
          ? props?.getEmailData.sublink_id
          : surveySubLinkId,
        survey_id: props?.getEmailData?.survey_id
          ? props?.getEmailData.survey_id
          : surveyid,
      },
      campaign_id: campaign_id_st,
      source_code: props?.getEmailData?.template
        ? props?.getEmailData?.template
        : props?.getDraftData?.source_code,
      status: status,
      approved_page: 1,
    };
    axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        if (res.data.status_code === 200) {
          setCampaign_id(res.data.response.data.id);
          if (status === 3) {
            toast.success("Approved Draft saved");
          } else {
            toast.success("Draft saved");
          }
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });
  };

  const handleSpcFun = (data) => {
    let newWindow = "";
    newWindow = window.open("/article_preview");
    newWindow.data = data;
  };

  const handleSelectUsers = () => {
    const selectRoute = routeTypeSurvey ? "/survey/email/selectsurvey" : "/EmailArticleSelect";  
    navigate(selectRoute, {
      state: {IrtObj:irtRoleObj},
    });
  };
 
  const handleCreateMail = () => {
    const emailRoute = routeTypeSurvey ? "/survey/email/create-email" : "/CreateEmail";
    navigate(emailRoute, {
      state: {IrtObj:irtRoleObj},
    });
  };

  const handleVerifyHCPClicked = () => {
    const verifyHcpRoute = routeTypeSurvey ? "/survey/email/verify-hcp" : "/VerifyHCP";
    navigate(verifyHcpRoute, {
      state: {IrtObj:irtRoleObj},
    });
  };

  const imageOnError = (event) => {
    event.currentTarget.src = BrokenImage;
    event.currentTarget.className = "error";
  };
  

  return (
    <>
      <div className="col right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="page-top-nav sticky">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    <button
                      className="btn btn-primary btn-bordered back"
                      onClick={backClicked}
                    >
                      Back
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <ul className="tabnav-link">
                  <li className="active" onClick={handleSelectUsers}>
                    {
                      routeTypeSurvey ? "Select Survey" :"Select Content"
                    }
                    </li>
                    <li className="active" onClick={handleCreateMail}>
                      Create Your Email
                    </li>
                
                    <li className="active" onClick={handleVerifyHCPClicked}>
                      {
                        IRTTraining ? "Verify Your IRT" : 
                        irtRoleObj?.IRTFlag ? "Select & Verify Your IRTs" :
                          "Select & Verify Your HCPs"
                      }
                      
                    </li>

                    <li className="active active-main">
                      <a href="#">Verify your Email</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-3">
                  <div className="header-btn">
                    {
                      IRTTraining ? 
                      <Link to = {"/new-readers-reviews"}
                        
                        state= {irtRoleObj}
                        className="btn btn-primary btn-bordered move-draft">
                        Cancel
                      </Link>
                      :
                      <>
                        {isLikeRdAccount
                          ? 
                          <>
                              {
                                irtRoleObj?.IRTFlag ? 
                                  <Link to = {"/RD-EmailList"}
                                  state= {{IrtObj: irtRoleObj}}
                                    className="btn btn-primary btn-bordered move-draft engine_cancel">
                                    Cancel
                                  </Link>
                                :
                                <Link to = {"/EmailList"}
                                  className="btn btn-primary btn-bordered move-draft engine_cancel">
                                  Cancel
                                </Link>
                              }
                              <button
                                className="btn btn-primary btn-bordered"
                                onClick={saveAsDraft}
                              >
                                Save As Draft
                              </button>
                            </>
                          :
                            <button
                              className="btn btn-primary btn-bordered move-draft"
                              onClick={saveAsDraft}
                            >
                              Save As Draft
                            </button>
                        }
                      </>
                    }
                    <button
                      className={
                        getSelectedPdfId == 13
                          ? "btn btn-primary btn-filled next send_btn send_disabled"
                          : "btn btn-primary btn-filled next send_btn"
                      }
                      onClick={createEmail}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <section className="verify_email sunshine_mail_verify">
              <div className="row">
                <div className="col-12 verify-left">
                  <div className="verify-mail-box">
                    <div className="verify-email-detail">
                      <div>
                        <h4>Email Details</h4>
                        <h6>
                          <strong>Campaign Title | </strong>
                          {props?.getEmailData?.emailCampaign
                            ? props?.getEmailData?.emailCampaign
                            : props?.getDraftData?.campaign}
                        </h6>
                        <h6>
                          <strong>Creator | </strong>
                          {props?.getEmailData?.emailCreator
                            ? props?.getEmailData?.emailCreator
                            : props?.getDraftData?.creator
                            ? props?.getDraftData?.creator
                            : ""}
                        </h6>
                        <h6>
                          <strong>Tags | </strong>
                          <ul>
                            {props?.getEmailData?.tags
                              ? props?.getEmailData?.tags.map((tags, i) => {
                                  return (
                                    <React.Fragment key={i+1}>
                                      <li className="list1">
                                        {tags.innerHTML || tags}{" "}
                                        <img
                                          src={path_image + "filter-close.svg"}
                                          alt="Close-filter"
                                          onClick={() => removeTag(i)}
                                        />
                                      </li>
                                    </React.Fragment>
                                  );
                                })
                              : props?.getDraftData?.tags.map((tags, i) => {
                                  return (
                                    <React.Fragment key={i}>
                                      <li className="list1">
                                        {tags?.innerHTML || tags}{" "}
                                        <img
                                          src={path_image + "filter-close.svg"}
                                          alt="Close-filter"
                                          onClick={() => removeTag(i)}
                                        />
                                      </li>
                                    </React.Fragment>
                                  );
                                })}
                          </ul>
                        </h6>
                      </div>
                      {
                        !IRTTraining ?
                        <div className="form-buttons right-side">
                          <button
                            className={
                              typeof getArticleType !== "undefined" &&
                              getArticleType == 3
                                ? "btn btn-primary approved-btn btn-bordered checked"
                                : "btn btn-primary approved-btn btn-bordered"
                            }
                            onClick={(e) => approvedClicked(e)}
                          >
                            {typeof getArticleType !== "undefined" &&
                            getArticleType == 3
                              ? "Approved"
                              : "Approve?"}
                            <img
                              src={path_image + "approved-btn.svg"}
                              className="approve_btn"
                              alt=""
                            />
                            <img
                              src={path_image + "/approved-by-btn.svg"}
                              className="approved_btn"
                              alt=""
                            />
                          </button>
                        </div>
                        : null
                      }
                    </div>
                    <div className="mail-recipt sunshine-mail-recipt">
                      <div className="d-flex justify-content-between">
                      <Col className="mail-recipt-left">
                          <h6>
                            The recipients <span>| {selectedHcp?.length}</span>
                          </h6>

                          <p>
                            Single HCP <span>| {selectedHcp?.length}</span>
                          </p>

                          {
                            IRTTraining && selectedHcp?.length == 1 ?
                              (
                                selectedHcp.map((data, index) => {
                                  return (
                                    <React.Fragment key={index}>
                                      <div className="library-content-box-layuot readerlist d-flex">
                                        <div className="doc-content-main-box col" key={index}>
                                          <div className="doc-content-header">
                                            <div className="doc-content d-flex justify-content-between w-100">
                                              <h4>
                                                {data?.first_name} {data?.last_name}
                                              </h4>
                                            </div>
                                          </div>
                                          <div className="tabs-data">
                                            <Tabs
                                              defaultActiveKey="personal-details"
                                              fill
                                            >
                                              <Tab
                                                eventKey="personal-details"
                                                title="Personal Details"
                                                className="flex-column justify-content-between"
                                              >
                                                <div className="tab-panel d-flex flex-column justify-content-between">
                                                  <ul className="tab-mail-list">
                                                    <li>
                                                      <h6 className="tab-content-title">
                                                        Email
                                                      </h6>
                                                      <h6>
                                                        {data?.email ? data?.email : "N/A"}
                                                      </h6>
                                                    </li>

                                                    <li>
                                                      <h6 className="tab-content-title">
                                                        Country
                                                      </h6>
                                                      <h6>
                                                        {data?.country
                                                          ? data?.country == "B&H"
                                                            ? "Bosnia and Herzegovina"
                                                            : data?.country
                                                          : "N/A"}
                                                      </h6>
                                                    </li>

                                                    <li>
                                                      <h6 className="tab-content-title">
                                                        IRT role
                                                      </h6>
                                                      <h6>
                                                        {data?.user_type}
                                                      </h6>
                                                    </li>

                                                    <li>
                                                      <h6 className="tab-content-title">
                                                        Site number
                                                      </h6>
                                                      <h6>
                                                        {data?.site_number}
                                                      </h6>
                                                    </li>

                                                    <li>
                                                      <h6 className="tab-content-title">
                                                        Site name
                                                      </h6>
                                                      <h6>
                                                        {data?.site_name}
                                                      </h6>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </Tab>
                                            </Tabs>
                                          </div>
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  )
                                })
                              )
                              :
                              null
                          }
                        

                      
                      </Col>
                      <Col className="mail-recipt-right">
                        {
                          getSelectedPdfId != 1 ?
                          <>
                            <h6>Content that will be send</h6>
                            <p>
                              Content <span>| 1</span>
                            </p>
                            
                            {typeof getpdfdata !== "undefined" && getpdfdata.hasOwnProperty('pdf_title') &&
                              getSelectedPdfId != 13 &&
                              getSelectedPdfId != 14 &&
                              getSelectedPdfId != 16 && (
                              <div className="library-content-box-layuot readerlist">
                                <div className="doc-content-main-box" key={getSelectedPdfId}>
                                  
                                <div className="doc-content-header">
                                  <div className="doc-content-header-logo">
                                      <a href="#">
                                        <img
                                          alt="doc-logo"
                                          src={getpdfdata?.pdf_cover_img}
                                          onError={imageOnError}
                                          style={{ width: "67px" }}
                                        />
                                      </a>
                                    </div>
                                  <div className="doc-content">
                                  <h5
                                        dangerouslySetInnerHTML={{
                                          __html: getpdfdata?.pdf_title,
                                        }}
                                  ></h5>
                                  <h6>
                                        {getpdfdata?.pdf_sub_title
                                          ? getpdfdata.pdf_sub_title
                                          : getpdfdata?.folder_name}
                                    </h6>
                                    <p>{getpdfdata?.key_author}</p>
                                      <div className="select-tags">
                                        {getpdfdata?.tags?.length
                                          ? JSON.parse(getpdfdata.tags)?.map((data,i) => {
                                            return <div key={i}>{data}</div>;
                                          })
                                          : ""}
                                      </div>
                                  </div>
                                </div>
                                  
                                  <div className="tabs-data">
                                    <Tabs
                                      defaultActiveKey="docintel-link"
                                      fill
                                    >
                                      <Tab
                                        eventKey="docintel-link"
                                        title="Link"
                                        className="flex-column justify-content-between"
                                      >
                                        <div className="tab-panel d-flex flex-column justify-content-between">
                                          <div className="tab-content-links">
                                          <a href={getpdfdata?.docintel_link}
                                            className="doc-link"
                                            target="_blank"
                                          >
                                            {getpdfdata?.docintel_link}
                                          </a>
                                          {/* <span className="copy-content"><img src={path_image + "copy-content.svg"} alt="Copy"/> */}
                                          {/* </span> */}
                                          </div>
                                          <ul className="tab-mail-list">
                                            <li>
                                              <h6 className="tab-content-title">
                                                Upload date
                                              </h6>
                                              <h6>
                                                {getpdfdata?.article_date}
                                              </h6>
                                            </li>

                                            <li>
                                              <h6 className="tab-content-title">
                                                inforMedGO code
                                              </h6>
                                              <h6>
                                                {getpdfdata?.informed_code}
                                              </h6>
                                            </li>

                                            <li>
                                              <h6 className="tab-content-title">
                                                Docintel code
                                              </h6>
                                              <h6>
                                                {getpdfdata?.docintel_code}
                                              </h6>
                                            </li>

                                            <li>
                                              <h6 className="tab-content-title">
                                                Language
                                              </h6>
                                              <h6>
                                                {getpdfdata?.pdf_language}
                                              </h6>
                                            </li>
                                            
                                          </ul>
                                        </div>
                                        <div className="mail-content-footer">
                                          {
                                            getpdfdata?.pdf_spc_included ? 
                                              <button className="btn btn-primary btn-filled" onClick={() =>
                                                handleSpcFun(getpdfdata?.spc_url)
                                              }>
                                                Preview
                                              </button>
                                            : 
                                            <a
                                              href={getpdfdata.pdf_preview_link}
                                              target="_blank"
                                            >
                                              <button className="btn btn-primary btn-filled">
                                                Preview
                                              </button>
                                            </a>
                                          }
                                        </div>
                                      </Tab>
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                              )}
                            {getSelectedPdfId == 13 && (
                              <>
                                <div className="mail-content-select-box">
                                  <div className="mail-content-select-top">
                                    <div className="mail-preview-img">
                                      <img
                                        src={path_image + "dummy-img.png"}
                                        alt="Preview "
                                      />
                                    </div>
                                    <div className="mail-box-content">
                                      <h5>Placeholder</h5>
                                      <p>Empty Content</p>
                                      <div className="mailbox-tags">
                                        <p>
                                          Select this when you don't have your
                                          content ready
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}

                            {getSelectedPdfId == 16 && (
                              <>
                                <div className="mail-content-select-box">
                                  <div className="mail-content-select-top">
                                    <div className="mail-preview-img">
                                      <img
                                        src={path_image + "dummy-img.png"}
                                        alt="Preview "
                                      />
                                    </div>
                                    <div className="mail-box-content">
                                      <h5>Pure Text</h5>
                                      <p>Empty Content</p>
                                      <div className="mailbox-tags">
                                        <p>
                                          Select this when you don't want to
                                          include a content to your email
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}

                            {getSelectedPdfId == 14 && isLikeRdAccount && (
                              <>
                                <div className="mail-content-select-box">
                                  <div className="mail-content-select-top">
                                    <div className="mail-preview-img">
                                      <img
                                        src={path_image + "dummy-img.png"}
                                        alt="Preview "
                                      />
                                    </div>
                                    <div className="mail-box-content">
                                      <h5>Site user</h5>
                                      <p>Empty Content</p>
                                      <div className="mailbox-tags">
                                        <p>
                                          Select this when you want to send content to Site user
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                          :
                          <>
                          <h6>Survey that will be send</h6>
                          <p>
                            Survey <span>| 1</span>
                          </p>
                              
                                <div className="mail-content-select-box survey-mail mt-3">
                                  <div className="mail-content-select-top">
                                    <div className="mail-box-content">
                                      {getSurveyData?.is_draft == "1" && (
                                        <div className="survey_status">
                                          <span>Live</span>
                                        </div>
                                      )}
                                      {getSurveyData?.is_draft == "2" && (
                                        <div className="survey_status completed">
                                          <span>Completed</span>
                                        </div>
                                      )}
                                      <h5>{getSurveyData.survey_title}</h5>
                                      <p>{getSurveyData.subtitle}</p>
                                      <span>{getSurveyData.creator_name}</span>
                                      <div className="mailbox-tags">
                                        {
                                          getSurveyData?.tags?.length == 0 ? 
                                            <ul><li>N/A</li></ul>
                                          : 
                                          <ul>
                                            {
                                              getSurveyData?.tags?.map((tag, index) =>(
                                                <li key={index}>{tag}</li>
                                              ))
                                            }
                                          </ul>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mail-content-table">
                                      <table>
                                        <tbody><tr>
                                          <th>Consent</th>
                                          <td>
                                            {getSurveyData?.survey_consent != "" ? (
                                              getSurveyData?.survey_consent ===
                                                "Mandatory consent" ? (
                                                <span>Mandatory</span>
                                              ) : getSurveyData?.survey_consent ===
                                                "Optional consent" ? (
                                                <span>Optional</span>
                                              ) : (
                                                <span>Anonymous</span>
                                              )
                                            ) : (
                                              <span>N/A</span>
                                            )}
                                          </td>
                                        </tr>
                                          <tr>
                                            <th>Created date</th>
                                            <td><span>
                                              {getSurveyData?.formatted_date}
                                            </span>
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Last email</th>
                                            <td>{getSurveyData?.lastEmailSent}</td>
                                          </tr>
                                          <tr>
                                            <th>Link  <img src={path_image + "info_circle_icon.svg"}  alt=""/></th>
                                            <td> {getSurveyData?.linkType}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    
                                  </div>
                                  <div className="mail-content-footer">
                                    <a href={getSurveyData?.preview_link} target="_blank">
                                      <button className="btn btn-primary btn-filled">
                                        Preview
                                      </button>
                                    </a>
                                  </div>
                                </div>
                              
                          </>
                        }
                      </Col>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 verify-right">
                  <div className="preview_mail">
                    <h4>
                      {props?.getEmailData?.emailSubject
                        ? props?.getEmailData?.emailSubject
                        : props?.getDraftData?.subject}
                    </h4>
                   

                    <div
                      className="preview-mail-box verify-preview"
                      dangerouslySetInnerHTML={{
                        __html: var_template_source_code,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Modal
        id="add_hcp"
        show={isOpen}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div
          
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          
          aria-hidden="true"
        >
            
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Email Sent
            </h5>
          </div>
          <div className="modal-body">Email has been sent successfully</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={closeButtonClicked}
               
            >
              Close
            </button>
          </div>
        </div>
         
      </Modal>

      {/* Reader Details popup */}
      <Modal
        show={getSmartListPopupStatus}
        className="smart_list_popup"
        id="smart_list_popup_id"
      >
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            {typeof getReaderDetails !== "undefined" &&
              getReaderDetails.length > 0 &&
              getSmartListName}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() =>
              setSmartListPopupStatus(
                (getSmartListPopupStatus) => !getSmartListPopupStatus
              )
            }
          ></button>
        </Modal.Header>
        <Modal.Body>
          <section className="search-hcp">
            <div className="result-hcp-table">
              <div className="table-title">
                <h4>
                  HCPs{" "}
                  <span>
                    |
                    {typeof selectedHcp !== "undefined" &&
                      selectedHcp.length > 0 &&
                      selectedHcp.length}
                  </span>
                </h4>
                <div className="selected-hcp-table-action">
                  <a
                    className="show-less-info"
                    onClick={(e) => showMoreInfo(e)}
                  >
                    {showLessInfo == true ? (
                      <p className="show_more">Show More information</p>
                    ) : (
                      <p className="show_less">Show less information</p>
                    )}{" "}
                  </a>
                </div>
              </div>
              <div className="selected-hcp-list">
                <table className="table">
                  <thead className="sticky-header">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Bounced</th>
                      <th scope="col">Country</th>
                      {isLikeRdAccount ? (
                        <>
                        <th scope="col">Site number</th>
                        <th scope="col">IRT mandatory training</th>
                        <th scope="col">IRT role</th>
                        </>
                      ) : (
                        <>
                        {groupId !=2 && <th scope="col">Business unit</th>}
                        <th scope="col">Contact type</th>
                        </>
                      )}
                      {showLessInfo == false ? (
                        <>
                          <th scope="col">Consent</th>
                          <th scope="col">Email received</th>
                          <th scope="col">Openings</th>
                          <th scope="col">Registrations</th>
                          <th scope="col">Last email</th>
                        </>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {typeof selectedHcp !== "undefined" &&
                      selectedHcp.length > 0 &&
                      selectedHcp.map((rr, i) => {
                        return (
                          <React.Fragment key={i}>
                            <tr>
                              <td>{rr.first_name}</td>
                              <td>{rr.email}</td>
                              <td>{rr.bounce}</td>
                              <td>{rr.country}</td>
                              {isLikeRdAccount&&(<><td>{rr?.site_number?rr?.site_number:"N/A"}</td></>)}
                            { groupId !=2 &&  <td>
                                {isLikeRdAccount
                                    ? rr?.irt
                                      ? "Yes"
                                      : "No"
                                    :rr.ibu
                                    ? rr.ibu
                                    : "N/A"}
                              </td>}
                              <td>
                                {isLikeRdAccount
                                  ? rr.user_type != 0 ? rr.user_type : "N/A"
                                  : rr.contact_type
                                }
                              </td>
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.consent}</span>{" "}
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.email_received}</span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.email_opening}</span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.registration}</span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.last_email}</span>
                                </td>
                              ) : null}
                              <td className="add-new-hcp" colspan="12"></td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>
      {/*Reader Details popup end*/}
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(VerifyHcpMAIL);
