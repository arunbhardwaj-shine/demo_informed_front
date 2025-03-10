import React, { useEffect, useState } from "react";
 
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal,Tab,Tabs,Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
 
import { loader } from "../../loader";
 
import { popup_alert } from "../../popup_alert";
import { toast } from "react-toastify";
 
import SmartListLayout from "../CommonComponent/SmartListLayout";
import SmartListTableLayout from "../CommonComponent/SmartListTableLayout";

import { CircularProgressbar } from "react-circular-progressbar";
 
import "react-circular-progressbar/dist/styles.css";

const VerifyMAIL = (props) => {
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
  const [tags, setTags] = useState([]);
  const [getRemovedHcp, setRemovedHcp] = useState([]);
  const [showPreogressBar, setShowProgressBar] = useState(false);
  const [getSmartListData, setSmartListData] = useState([]);
  const [getSurveyData, setSurveyData] = useState([]);
  
  const [reRender, setReRender] = useState(0);
  const [mailsIncrement, setMailsIncrement] = useState(0);
  const [selectedListId, setSelectedListId] = useState(0);
  const [uploadOrDownloadCount, setUploadOrDownloadCount] = React.useState(0);
  const [template_source_code, setTemplate] = useState(
    props?.getEmailData?.template
      ? props?.getEmailData?.template
      : props?.getDraftData?.source_code
  );

  var var_template_source_code = template_source_code.replaceAll("800", "450");
  var_template_source_code = var_template_source_code.replaceAll("600", "450");

  const selectedHcp = location?.state?.selectedHcp
    ? location?.state?.selectedHcp
    : props?.getDraftData?.campaign_data?.selectedHcp;

  const PdfSelected = location.state
    ? location.state.PdfSelected
    : props?.getDraftData?.PdfSelected;

  const [getpdfdata, setPdfData] = useState([]);
  const [getReaderDetails, setReaderDetails] = useState({});
  const [getSmartListName, setSmartListName] = useState("");
  const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);
  const [showLessInfo, setShowLessInfo] = useState(true);
  const [getSelectedPdfId, setSelectedPdfId] = useState(PdfSelected);
  const [sortBy, setSortBy] = useState('first_name'); // Initial sort key
  const [sortOrder, setSortOrder] = useState('asc');
  const [getArticleType, setArticleType] = useState(
    props?.getEmailData?.status
      ? props?.getEmailData?.status
      : props?.getDraftData?.status && props?.getDraftData?.status != ""
        ? props?.getDraftData?.status
        : 0
  );

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
      if (props?.getDraftData?.campaign_data?.removedHcp) {
        if (
          typeof props?.getDraftData?.campaign_data.removedHcp != "undefined" &&
          props?.getDraftData?.campaign_data.removedHcp != ""
        ) {
          setRemovedHcp(props?.getDraftData?.campaign_data.removedHcp);
        }
      }
    }

    getpdfData();
  }, []);

  const BrokenImage =
    "https://docintel.s3-eu-west-1.amazonaws.com/cover/default/default.png";

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
      route_location: routeTypeSurvey ? "survey/email/verify-mail" : "VerifyMAIL",
      tags: props?.getEmailData?.tags
        ? props?.getEmailData?.tags
        : props?.getDraftData?.tags,
      campaign_data: {
        template_id: props?.getEmailData?.templateId
          ? props?.getEmailData?.templateId
          : props?.getDraftData?.campaign_data.template_id,
        smart_list_id:
          typeof getSmartListData !== "undefined" &&
            getSmartListData.hasOwnProperty("id")
            ? getSmartListData.id
            : "",
        selectedHcp: selectedHcp,
        list_selection: props?.getEmailData?.selected
          ? props?.getEmailData?.selected
          : props?.getDraftData?.campaign_data.list_selection,
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
          const redirectRoute = routeTypeSurvey ? "/survey/email" : "/EmailList";
          popup_alert({
            visible: "show",
            message: "Your changes has been saved <br />successfully !",
            type: "success",
            redirect: redirectRoute,
          });
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
    let i = 0;
    const intervals_spend = (25 / 100) * selectedHcp?.length;

    var intervals_increment = 100 / intervals_spend;
    var mails_increment = selectedHcp?.length / intervals_spend;
    let adr = 0;
    let incr_msg = 0;
    const timer = setInterval(() => {
      adr = adr + intervals_increment;
      incr_msg = incr_msg + mails_increment;
      if (adr >= 98) {
        setUploadOrDownloadCount(98);
      } else {
        setUploadOrDownloadCount(parseInt(adr));
      }

      if (incr_msg >= selectedHcp?.length) {
        setMailsIncrement(selectedHcp?.length);
      } else {
        setMailsIncrement(parseInt(incr_msg));
      }
    }, 1000);

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
        props?.getEmailData?.selectedHcp || location?.state?.selectedHcp
          ? selectedHcp?.map((userId) => {
            return userId.profile_user_id || userId.user_id;
          })
          : props?.getDraftData?.campaign_data.selectedHcp.map((userId) => {
            return userId.profile_user_id || userId.user_id;
          });

      const body = {
        user_id: localStorage.getItem("user_id"),
        route_location: routeTypeSurvey ? "survey/email/verify-mail" : "VerifyMAIL",
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
          smart_list_id:
            typeof getSmartListData !== "undefined" &&
              getSmartListData.hasOwnProperty("id")
              ? getSmartListData.id
              : "",
          template_id: props?.getEmailData?.templateId
            ? props?.getEmailData?.templateId
            : props?.getDraftData?.campaign_data.template_id,
          list_selection: props?.getEmailData?.selected
            ? props?.getEmailData?.selected
            : props?.getDraftData?.campaign_data.list_selection,
          sublink_id: props?.getEmailData?.sublink_id
            ? props?.getEmailData.sublink_id
            : surveySubLinkId,
          survey_id: props?.getEmailData?.survey_id
            ? props?.getEmailData.survey_id
            : surveyid,
        },
      };
      axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
      //loader("show");
      setShowProgressBar(true);
      if (localStorage.getItem('user_id') == 'rjiGlqA9DXJVH7bDDTX0Lg==' || localStorage.getItem('user_id') == 'm5JI5zEDY3xHFTZBnSGQZg==') {
        await axios
          .post(`emailapi/send_email_new`, body)
          .then((res) => {
            // loader("hide");
            if (res.data.status_code === 200) {
              setUploadOrDownloadCount(100);
              clearInterval(timer);
              const redirectRoute = routeTypeSurvey ? "/survey/email" : "/EmailList";
              setTimeout(() => {
                popup_alert({
                  visible: "show",
                  message: res?.data?.message ? res?.data?.message : "Mail sent successfully",
                  type: "success",
                  redirect: redirectRoute,
                });
                setUploadOrDownloadCount(0);
                setMailsIncrement(0);

                setShowProgressBar(false);
              }, 1000);
            } else {
              clearInterval(timer);
              setUploadOrDownloadCount(0);
              setMailsIncrement(0);

              setShowProgressBar(false);
              popup_alert({
                visible: "show",
                message: res?.data?.message ? res?.data?.message : "Mail sent successfully",
                type: "error",
              });
            }
          })
          .catch((err) => {
            clearInterval(timer);
            setShowProgressBar(false);
            toast.error("Something went wrong");
            console.log(err);
          });
      } else {
        await axios
          .post(`emailapi/send_email`, body)
          .then((res) => {
            // loader("hide");
            if (res.data.status_code === 200) {
              setUploadOrDownloadCount(100);
              clearInterval(timer);
              const redirectRoute = routeTypeSurvey ? "/survey/email" : "/EmailList";
              setTimeout(() => {
                popup_alert({
                  visible: "show",
                  message: res.data.message,
                  type: "success",
                  redirect: redirectRoute,
                });
                setUploadOrDownloadCount(0);
                setMailsIncrement(0);

                setShowProgressBar(false);
              }, 1000);
            } else {
              clearInterval(timer);
              setUploadOrDownloadCount(0);
              setMailsIncrement(0);

              setShowProgressBar(false);
              popup_alert({
                visible: "show",
                message: res.data.message,
                type: "error",
              });
            }
          })
          .catch((err) => {
            clearInterval(timer);
            setShowProgressBar(false);
            toast.error("Something went wrong");
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
    const redirectRoute = routeTypeSurvey ? "/survey/email" : "/EmailList";
    navigate(redirectRoute);
  };

  const backClicked = () => {
    if (
      typeof getSmartListData !== "undefined" &&
      getSmartListData.hasOwnProperty("id")
    ) {
      const backRoute = routeTypeSurvey ? "/survey/email/select-smartlist-users" : "/SelectSmartListUsers";
      navigate(backRoute, {
        state: {
          ...location?.state
        },
      });
    } else {
      const backRoute = routeTypeSurvey ? "/survey/email/verify-hcp" : "/VerifyHCP";
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
      route_location: routeTypeSurvey ? "survey/email/verify-mail" : "VerifyMAIL",
      tags: props?.getEmailData?.tags
        ? props?.getEmailData?.tags
        : props?.getDraftData?.tags,
      campaign_data: {
        template_id: props?.getEmailData?.templateId
          ? props?.getEmailData?.templateId
          : props?.getDraftData?.campaign_data.template_id,
        smart_list_id:
          typeof getSmartListData !== "undefined" &&
            getSmartListData.hasOwnProperty("id")
            ? getSmartListData.id
            : "",
        selectedHcp: selectedHcp,
        list_selection: props?.getEmailData?.selected
          ? props?.getEmailData?.selected
          : props?.getDraftData?.campaign_data.list_selection,
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

  const handleSort = (key) => {
    setSortBy(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); 
  };

  const sortData = (data, key, order) => {
    return data.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
  
      // Handle different data types (numbers, strings)
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return order === 'asc'
          ? valueA?.localeCompare(valueB) // Handle string sorting with locale awareness
          : valueB?.localeCompare(valueA);
      }
    });
  };

  const viewSmartListData = async(id) => {
    setSelectedListId(id);
  }

  const closeSmartListPopup = async() => {
    setSelectedListId(0);
  }

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
                    <li className="active">
                      {
                        routeTypeSurvey ? 
                        <Link to="/survey/email/selectsurvey">Select Survey</Link>
                        :
                        <Link to="/EmailArticleSelect">Select Content</Link>
                      }
                    </li>
                    <li className="active">
                      <Link to={routeTypeSurvey ? "/survey/email/create-email" : "/CreateEmail"}>Create Your Email</Link>
                    </li>
                    <li className="active">
                      <Link to={routeTypeSurvey ? "/survey/email/smart-list" : "/SelectSmartList"}>{isLikeRdAccount ? "Select Users" : "Select HCPs"}</Link>
                    </li>

                   

                    {typeof getSmartListData !== "undefined" &&
                      getSmartListData.hasOwnProperty("id") ? (
                      <li className="active">
                        <Link to={routeTypeSurvey ? "/survey/email/select-smartlist-users" : "/SelectSmartListUsers"}>Verify Your List</Link>
                      </li>
                    ) : (
                      <li className="active">
                        <Link to="/VerifyHCP">Select Verify Your HCPs</Link>
                      </li>
                    )}

                    <li className="active active-main">
                      <a href="#">Verify your Email</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-3">
                  <div className="header-btn">
                    {isLikeRdAccount
                      ?
                        <Link to = {"/EmailList"}
                          className="btn btn-primary btn-bordered move-draft engine_cancel">
                          Cancel
                        </Link>
                      : null  
                    }
                    <button
                      className="btn btn-primary btn-bordered"
                      onClick={saveAsDraft}
                    >
                      Save As Draft
                    </button>
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
                                  <React.Fragment key={"tags_" + i}>
                                    <li className="list1"  >
                                      {tags.innerHTML || tags}{" "}
                                      <img
                                        key={"tags_img_" + i}
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
                                  < React.Fragment key={i}>
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
                              })}
                          </ul>
                        </h6>
                      </div>
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
                    </div>
                    <div className="mail-recipt sunshine-mail-recipt">
                      <div className="d-flex justify-content-between">

                        <Col className="mail-recipt-left">
                          <h6>
                            The recipients <span>| {selectedHcp?.length}</span>
                          </h6>
                          {getSmartListData?.length !== 0 && (
                            <div className="smartlist-view email_box_outer new-smartlist">
                              <div className="smartlist-view email_box w-100" style={{flex: "0 0 100%"}}>
                                <div className="mail-box-content">
                                  <div className="mail-box-conten-title">
                                    <h5>{getSmartListData?.name}</h5>
                                  </div>
                                  <SmartListLayout data = {getSmartListData} iseditshow={0} isviewshow={1} deletestatus = {0} viewSmartListData = {viewSmartListData} />
                                </div>
                              </div>
                            </div>
                          )}
                        </Col>

                        <Col className="mail-recipt-right">
                          {
                            getSelectedPdfId != 1 ?
                            <>
                              <h6>Content that will be send</h6>
                              <p>
                                Content <span>| 1</span>
                              </p>


                              {typeof getpdfdata !== "undefined" &&
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
                                            ? JSON.parse(getpdfdata.tags)?.map((data,index) => {
                                              return <div key={index} >{data}</div>;
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
                                            'N/A'
                                            :
                                            <ul>
                                              {
                                                getSurveyData?.tags?.map((tag, index) => (
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
                                            <td>20 May.2025 | 2:00 PM</td>
                                          </tr>
                                          <tr>
                                            <th>Link  <img src={path_image + "info_circle_icon.svg"} alt="" /></th>
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
                      selectedHcp?.length > 0 &&
                      selectedHcp?.length}
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
                      <th scope="col">Name
                      <button
                              className={`event_sort_btn ${sortBy == "first_name" ?
                              sortOrder == "asc"
                              ? "svg_asc"
                              : "svg_active"
                              : "" 
                            }`}
                              onClick={() => handleSort('first_name')}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                      </th>
                      <th scope="col">Email
                      <button
                              className={`event_sort_btn ${sortBy == "email" ?
                                  sortOrder == "asc"
                                  ? "svg_asc"
                                  : "svg_active"
                                  : "" 
                                }`}
                              onClick={() => handleSort('email')}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                      </th>
                      <th scope="col">Bounced</th>
                      <th scope="col">Country
                      <button
                                className={`event_sort_btn ${sortBy == "country" ?
                                sortOrder == "asc"
                                  ? "svg_asc"
                                  : "svg_active"
                                : "" 
                              }`}
                                onClick={() => handleSort('country')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white"/>
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                      </th>

                      {
                   
                      (isLikeRdAccount)?
                        (
                        <>
                          <th scope="col">IRT mandatory training</th>
                          <th scope="col">IRT role</th>
                        </>
                      ) : (
                        <>
                          {groupId !=2 && <th scope="col">Business unit
                          <button
                                className={`event_sort_btn ${sortBy == "ibu" ?
                                sortOrder == "asc"
                                  ? "svg_asc"
                                  : "svg_active"
                                : "" 
                              }`}
                                onClick={() => handleSort('ibu')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white"/>
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                          </th>}
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
                      sortData(selectedHcp, sortBy, sortOrder)?.map((rr, i) => {
                        return (
                          <React.Fragment key={i}>
                            <tr>
                              <td>{rr.first_name}</td>
                              <td>{rr.email}</td>
                              <td>{rr.bounce}</td>
                              <td>{rr.country}</td>
                             {groupId !=2 && <td>
                                {isLikeRdAccount
                                  ? rr?.irt
                                    ? "Yes"
                                    : "No"
                                  : rr.ibu
                                    ? rr.ibu
                                    : "N/A"}
                              </td>}
                              <td>
                                {
                                (isLikeRdAccount)
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

      <Modal
        show={showPreogressBar}
        className="send-confirm"
        id="upload-confirm"
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div
            className="circular-progressbar"
            style={{
              width: 100,
              height: 100,
            }}
          >
            <CircularProgressbar
              value={uploadOrDownloadCount}
              text={`${uploadOrDownloadCount}%`}
              strokeWidth={5}
            />
          </div>
        </Modal.Body>
        <h4>
          {" "}
          {mailsIncrement} mails sent of {selectedHcp?.length}
        </h4>
      </Modal>

      {
        selectedListId ?
         <SmartListTableLayout id = {selectedListId}  closeSmartListPopup = {closeSmartListPopup} />
         : null
      }
    </>
  );
};

const mapStateToProps = (state) => {
 

  //  let emailData = state.getEmailData;
  return state;
};
export default connect(mapStateToProps)(VerifyMAIL);
