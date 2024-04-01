import React, { useEffect, useState } from "react";
import { getWebinarEmailData } from "../../../../../actions";
import { connect, connectAdvanced } from "react-redux";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";

import { compose } from "redux";
import { loader } from "../../../../../loader";
//import { connect } from "react-redux";
import { getWebinarCampaignId } from "../../../../../actions";
import { popup_alert } from "../../../../../popup_alert";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import SmartListTableLayout from "../../../../CommonComponent/SmartListTableLayout";
import SmartListLayout from "../../../../CommonComponent/SmartListLayout";

const WebinarVerifyMAIL = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventIdContext, handleEventId } = useSidebar()
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
  const [eventId, setEventId] = useState(
    eventIdContext?.eventId
      ? eventIdContext?.eventId
      : localStorageEvent?.eventId
  );
  const [isOpen, setIsOpen] = useState(false);
  const [campaign_id_st, setCampaign_id] = useState();
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [SendListData, setSendListData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [templateId, setTemplateId] = useState(0);
  const [tags, setTags] = useState([]);
  const [getRemovedHcp, setRemovedHcp] = useState([]);
  const [showPreogressBar, setShowProgressBar] = useState(false);
  const [getSmartListData, setSmartListData] = useState([]);
  const [showCircularProgressView, setShowCircularProgressView] =
    useState(false);
  const [reRender, setReRender] = useState(0);
  const [mailsIncrement, setMailsIncrement] = useState(0);
  const [uploadOrDownloadCount, setUploadOrDownloadCount] = React.useState(0);
  const [template_source_code, setTemplate] = useState(
    props.getWebinarEmailData?.template
      ? props.getWebinarEmailData?.template
      : props.getWebinarDraftData?.source_code
  );
  const [selected, setSelected] = useState(location?.state?.selected ?
    location?.state?.selected
    : props.getWebinarDraftData?.campaign_data?.selected)

  var var_template_source_code = template_source_code?.replaceAll("800", "450");
  var_template_source_code = var_template_source_code?.replaceAll("600", "450");

  const selectedHcp = location?.state
    ? location.state?.selectedHcp
    : props.getWebinarDraftData?.campaign_data?.selectedHcp;

  const PdfSelected = location.state
    ? location.state?.PdfSelected
    : props.getWebinarDraftData?.PdfSelected;


  const [getpdfdata, setPdfData] = useState([]);
  const [userId, setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==")
  const [getReaderDetails, setReaderDetails] = useState({});
  const [getSmartListName, setSmartListName] = useState("");
  const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);
  const [showLessInfo, setShowLessInfo] = useState(true);
  const [getSelectedPdfId, setSelectedPdfId] = useState(PdfSelected);
  const [selectedListId, setSelectedListId] = useState(0);
  const [addListOpen, setAddListOpen] = useState(false);
  const [getArticleType, setArticleType] = useState(
    props.getWebinarEmailData?.status
      ? props.getWebinarEmailData?.status
      : props.getWebinarDraftData?.status && props.getWebinarDraftData?.status != ""
        ? props.getWebinarDraftData?.status
        : 0
  );
  const [thisEventToggled,setThisEventToggled]=useState(location?.state?.thisEventToggled ? 
    location?.state?.thisEventToggled 
    : props.getWebinarDraftData?.campaign_data?.thisEventToggled)
 

  useEffect(() => {
    let campaign_id =
      typeof props.getWebinarEmailData === "object" &&
        props.getWebinarEmailData !== null &&
        props.getWebinarEmailData?.campaign_id
        ? props.getWebinarEmailData?.campaign_id
        : props.getWebinarDraftData?.campaign_id
          ? props.getWebinarDraftData?.campaign_id
          : "";
    setCampaign_id(campaign_id);

    if (
      (typeof props.getWebinarSelectedSmartListData === "object" &&
        props.getWebinarSelectedSmartListData !== null) ||
      (props.getWebinarDraftData !== null && props.getWebinarDraftData?.smart_list_data)
    ) {
      let smart_list_data =
        typeof props.getWebinarSelectedSmartListData === "object" &&
          props.getWebinarSelectedSmartListData !== null
          ? props.getWebinarSelectedSmartListData
          : props.getWebinarDraftData?.smart_list_data;
      setSmartListData(smart_list_data);
    }

    if (location.state?.removedHcp) {
      if (
        typeof location.state?.removedHcp != "undefined" &&
        location.state?.removedHcp != ""
      ) {
        setRemovedHcp(location.state?.removedHcp);
      }
    } else {
      if (props.getWebinarDraftData?.campaign_data?.removedHcp) {
        if (
          typeof props.getWebinarDraftData?.campaign_data?.removedHcp != "undefined" &&
          props.getWebinarDraftData?.campaign_data?.removedHcp != ""
        ) {
          setRemovedHcp(props.getWebinarDraftData?.campaign_data?.removedHcp);
        }
      }
    }

    getpdfData();
  }, []);

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const getpdfData = async () => {
    let pdf_id = props.getWebinarEmailData?.PdfSelected
      ? props.getWebinarEmailData?.PdfSelected
      : props.getWebinarDraftData?.pdf_id;
    setSelectedPdfId(pdf_id);
    if (
      typeof pdf_id !== "undefined" &&
      pdf_id != 0 &&
      pdf_id != 13 &&
      pdf_id != 14 &&
      pdf_id != 16
    ) {
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      const body = {
        user_id: localStorage.getItem("user_id"),
        pdf_id: pdf_id,
      };
      loader("show");
      await axios
        .post(`emailapi/get_pdf`, body)
        .then((res) => {
          if (res?.data?.status_code == 200) {
            setPdfData(res?.data?.response?.data);
          } else {
            toast.error(res?.data?.message);
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

  const nextClicked = () => {
    console.log("next clicked");
  };

  const saveAsDraft = async () => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      pdf_id: 0,
      event_id: eventId,
      description: props.getWebinarEmailData?.emailDescription
        ? props.getWebinarEmailData?.emailDescription
        : props.getWebinarDraftData?.description
          ? props.getWebinarDraftData?.description
          : "",
      creator: props.getWebinarEmailData?.emailCreator
        ? props.getWebinarEmailData?.emailCreator
        : props.getWebinarDraftData?.creator
          ? props.getWebinarDraftData?.creator
          : "",
      campaign_name: "webinar",

      subject: props.getWebinarEmailData?.emailSubject
        ? props.getWebinarEmailData?.emailSubject
        : props.getWebinarDraftData?.subject,
      route_location: "webinar/email/verifyMAIL",
      tags: props.getWebinarEmailData?.tags
        ? props.getWebinarEmailData?.tags
        : props.getWebinarDraftData?.tags,
      campaign_data: {
        template_id: props.getWebinarEmailData?.templateId
          ? props.getWebinarEmailData?.templateId
          : props.getWebinarDraftData?.campaign_data?.template_id,
        smart_list_id:
          typeof getSmartListData !== "undefined" &&
            getSmartListData.hasOwnProperty("id")
            ? getSmartListData.id
            : "",
        selectedHcp: selectedHcp,
        list_selection: props.getWebinarEmailData?.selected
          ? props.getWebinarEmailData?.selected
          : props.getWebinarDraftData?.campaign_data?.list_selection,
        auto_responder_id: props.getWebinarEmailData?.templateId
          ? props.getWebinarEmailData?.templateId
          : props.getWebinarDraftData?.campaign_data?.template_id,

        removedHcp: getRemovedHcp,
        selected: location?.state?.selected
          ? location?.state?.selected
          : props.getWebinarDraftData?.campaign_data?.selected,
          thisEventToggled:thisEventToggled
      },
      campaign_id: campaign_id_st,
      source_code: props.getWebinarEmailData?.template
        ? props.getWebinarEmailData?.template
        : props.getWebinarDraftData?.source_code,
      status: 2,
      auto_responder_id: props.getWebinarEmailData?.templateId
        ? props.getWebinarEmailData?.templateId
        : props.getWebinarDraftData?.campaign_data?.template_id,

    };
   
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        if (res.data.status_code === 200) {
          setCampaign_id(res?.data?.response?.data?.id);
          popup_alert({
            visible: "show",
            message: "Your changes has been saved <br />successfully !",
            type: "success",
            redirect: "/webinar/email",
          });
        } else {
          toast.warning(res?.data?.message);
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
      let finalTags = props.getWebinarEmailData?.tags
        ? props.getWebinarEmailData?.tags?.map((tags) => {
          return tags.innerHTML || tags;
        })
        : props.getWebinarDraftData?.tags?.map((tags) => {
          return tags.innerHTML || tags;
        });

      let user_list =
        props.getWebinarEmailData?.selectedHcp || location.state
          ? selectedHcp?.map((userId) => {
            return userId.profile_user_id || userId.user_id;
          })
          : props.getWebinarDraftData?.campaign_data?.selectedHcp?.map((userId) => {
            return userId.profile_user_id || userId.user_id;
          });

      const body = {
        user_id: localStorage.getItem("user_id"),
        route_location: "webinar/email/verifyMAIL",
        pdf_id: 0,
        // pdf_id: props.getWebinarEmailData?.PdfSelected
        //   ? props.getEmailData.PdfSelected
        //   : props.getDraftData.pdf_id,
        event_id: eventId,
        subject: props.getWebinarEmailData?.emailSubject
          ? props.getWebinarEmailData?.emailSubject
          : props.getWebinarDraftData?.subject,
        description: props.getWebinarEmailData?.emailDescription
          ? props.getWebinarEmailData?.emailDescription
          : props.getWebinarDraftData?.description
            ? props.getWebinarDraftData?.description
            : "",
        creator: props.getWebinarEmailData?.emailCreator
          ? props.getWebinarEmailData?.emailCreator
          : props.getWebinarDraftData?.creator
            ? props.getWebinarDraftData?.creator
            : "",
        campaign_name: "webinar",
        // campaign_name: props.getWebinarEmailData?.emailCampaign
        //   ? props.getWebinarEmailData?.emailCampaign
        //   : props.getWebinarDraftData?.campaign,
        tags: finalTags,
        template_source_code: props.getWebinarEmailData?.template
          ? props.getWebinarEmailData?.template
          : props.getWebinarDraftData?.source_code,
        campaign_id: campaign_id_st,
        campaign_data: {
          user_list: user_list,
          smart_list_id:
            typeof getSmartListData !== "undefined" &&
              getSmartListData.hasOwnProperty("id")
              ? getSmartListData.id
              : "",
          template_id: props.getWebinarEmailData?.templateId
            ? props.getWebinarEmailData?.templateId
            : props.getWebinarDraftData?.campaign_data?.template_id,
          list_selection: props.getWebinarEmailData?.selected
            ? props.getWebinarEmailData?.selected
            : props.getWebinarDraftData?.campaign_data.list_selection,
          auto_responder_id: props.getWebinarEmailData?.templateId
            ? props.getWebinarEmailData?.templateId
            : props.getWebinarDraftData?.campaign_data?.template_id,
        },
        auto_responder_id: props.getWebinarEmailData?.templateId
          ? props.getWebinarEmailData?.templateId
          : props.getWebinarDraftData?.campaign_data?.template_id,
      };


      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      //loader("show");
      setShowProgressBar(true);
      if (localStorage.getItem('user_id') == 'rjiGlqA9DXJVH7bDDTX0Lg==' || localStorage.getItem('user_id') == 'm5JI5zEDY3xHFTZBnSGQZg==') {
        await axios
          .post(`webinar/send_webinar_email_new`, body)
          .then((res) => {
            // loader("hide");
            if (res?.data?.status_code === 200) {
              setUploadOrDownloadCount(100);
              clearInterval(timer);
              setTimeout(() => {
                popup_alert({
                  visible: "show",
                  message: res?.data?.message ? res?.data?.message : "Mail sent successfully",
                  type: "success",
                  redirect: "/webinar/email",
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
          .post(`webinar/send_webinar_email_new`, body)
          .then((res) => {
            // loader("hide");
            if (res?.data?.status_code === 200) {
              setUploadOrDownloadCount(100);
              clearInterval(timer);
              setTimeout(() => {
                popup_alert({
                  visible: "show",
                  message: res?.data?.message,
                  type: "success",
                  redirect: "/webinar/email",
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
                message: res?.data?.message,
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
    const allTags = props.getWebinarEmailData?.tags
      ? props.getWebinarEmailData?.tags
      : props.getWebinarDraftData?.tags;
    allTags?.splice(i, 1);
    setReRender(reRender + 1);


    //  props.getEmailData();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeButtonClicked = () => {
    setIsOpen(false);
    navigate("/webinar/email");
  };

  const backClicked = () => {
    if (
      typeof getSmartListData !== "undefined" &&
      getSmartListData.hasOwnProperty("id")
    ) {
      navigate("/webinar/email/selectSmartListUsers", {
        state: {
          ...location?.state,
        },
      });
    } else {
      navigate("/webinar/email/verifyHCP");
    }
  };

  const openSmartListPopup = async (smart_list_id) => {
    setShowLessInfo(true);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      list_id: smart_list_id,
      show_specific: 1,
    };
    loader("show");
    await axios
      .post(`distributes/get_reders_list`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          setReaderDetails(res?.data?.response.data);
          setSmartListName(res?.data?.response?.smart_list_name);
          setSmartListPopupStatus(true);
        } else {
          toast.warning(res?.data?.message);
        }
        loader("hide");
      })
      .catch((err) => {
        toast.warning("Something went wrong");
        loader("hide");
      });
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
      pdf_id: 0,
      //   pdf_id: props.getWebinarEmailData?.PdfSelected
      //     ? props.getEmailData.PdfSelected
      //     : props.getDraftData.pdf_id,
      event_id: eventId,
      description: props.getWebinarEmailData?.emailDescription
        ? props.getWebinarEmailData?.emailDescription
        : props.getWebinarDraftData?.description
          ? props.getWebinarDraftData?.description
          : "",
      creator: props.getWebinarEmailData?.emailCreator
        ? props.getWebinarEmailData?.emailCreator
        : props.getWebinarDraftData?.creator
          ? props.getWebinarDraftData?.creator
          : "",
      campaign_name: "webinar",
      // campaign_name: props.getWebinarEmailData?.emailCampaign
      //   ? props.getWebinarEmailData?.emailCampaign
      //   : props.getWebinarDraftData?.campaign,
      subject: props.getWebinarEmailData?.emailSubject
        ? props.getWebinarEmailData?.emailSubject
        : props.getWebinarDraftData?.subject,
      route_location: "webinar/email/verifyMAIL",
      tags: props.getWebinarEmailData?.tags
        ? props.getWebinarEmailData?.tags
        : props.getWebinarDraftData?.tags,
      campaign_data: {
        template_id: props.getWebinarEmailData?.templateId
          ? props.getWebinarEmailData?.templateId
          : props.getWebinarDraftData?.campaign_data?.template_id,
        smart_list_id:
          typeof getSmartListData !== "undefined" &&
            getSmartListData.hasOwnProperty("id")
            ? getSmartListData?.id
            : "",
        selectedHcp: selectedHcp,
        list_selection: props.getWebinarEmailData?.selected
          ? props.getWebinarEmailData?.selected
          : props.getWebinarDraftData?.campaign_data?.list_selection,
        auto_responder_id: props.getWebinarEmailData?.templateId
          ? props.getWebinarEmailData?.templateId
          : props.getWebinarDraftData?.campaign_data?.template_id,
        removedHcp: getRemovedHcp,
        selected: location?.state?.selected
          ? location?.state?.selected
          : props.getWebinarDraftData?.campaign_data?.selected,
          thisEventToggled:thisEventToggled
      },
      campaign_id: campaign_id_st,
      source_code: props.getWebinarEmailData?.template
        ? props.getWebinarEmailData?.template
        : props.getWebinarDraftData?.source_code,
      status: status,
      approved_page: 1,
      auto_responder_id: props.getWebinarEmailData?.templateId
        ? props.getWebinarEmailData?.templateId
        : props.getWebinarDraftData?.campaign_data?.template_id,

    };
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        if (res?.data?.status_code === 200) {
          setCampaign_id(res?.data?.response?.data?.id);
          if (status === 3) {
            toast.success("Approved Draft saved");
          } else {
            toast.success("Draft saved");
          }
        } else {
          toast.warning(res?.data?.message);
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
  const viewSmartListData = async (id) => {
    setAddListOpen(false);
    setSelectedListId(id);
  }
  const closeSmartListPopup = async () => {
    setSelectedListId(0);
    setAddListOpen(true);
  }
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
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">

                    <li className="active">
                      <Link to="/webinar/email/create-new-email">Create Your Email</Link>
                    </li>
                    <li className="active">
                      <Link 
                      to={selected == 1 ? "/webinar/email/selectSmartList" : "/webinar/email/selectHCP"}
                      state={selected == 1?{selected:selected,thisEventToggled:thisEventToggled}:null}
                      >
                        {localStorage.getItem("user_id") == userId ? "Select Users" : "Select HCPs"}</Link>
                    </li>

                    {/*
                   typeof getSmartListData !== "undefined" &&
                   getSmartListData.hasOwnProperty("id")
                     ? <li className="active">
                     <Link to="/SelectSmartList">Select Smart List</Link>
                   </li>
                     :  ""
                     */}

                    {typeof getSmartListData !== "undefined" &&
                      getSmartListData.hasOwnProperty("id") ? (
                      <li className="active">
                        <Link 
                        to="/webinar/email/selectSmartListUsers"
                        state={selected == 1?{selected:selected,thisEventToggled:thisEventToggled}:null}
                        >Verify Your List</Link>
                      </li>
                    ) : (
                      <li className="active">
                        <Link to="/webinar/email/verifyHCP">Select Verify Your HCPs</Link>
                      </li>
                    )}

                    <li className="active active-main">
                      <a href="javascript:void(0)">Verify your Email</a>
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

            <section className="verify_email">
              <div className="row">
                <div className="col-12 verify-left">
                  <div className="verify-mail-box">
                    <div className="verify-email-detail">
                      <div>
                        <h4>Email Details</h4>
                        <h6>
                          <strong>Campaign Title | </strong>
                          {props.getWebinarEmailData?.emailCampaign
                            ? props.getWebinarEmailData?.emailCampaign
                            : props.getWebinarDraftData?.campaign}
                        </h6>
                        <h6>
                          <strong>Creator | </strong>
                          {props.getWebinarEmailData?.emailCreator
                            ? props.getWebinarEmailData?.emailCreator
                            : props.getWebinarDraftData?.creator
                              ? props.getWebinarDraftData?.creator
                              : ""}
                        </h6>
                        <h6>
                          <strong>Tags | </strong>
                          <ul>
                            {props.getWebinarEmailData?.tags
                              ? props.getWebinarEmailData?.tags?.map((tags, i) => {
                                return (
                                  <>
                                    <li className="list1">
                                      {tags?.innerHTML || tags}{" "}
                                      <img
                                        src={path_image + "filter-close.svg"}
                                        alt="Close-filter"
                                        onClick={() => removeTag(i)}
                                      />
                                    </li>
                                  </>
                                );
                              })
                              : props.getWebinarDraftData?.tags?.map((tags, i) => {
                                return (
                                  <>
                                    <li className="list1">
                                      {tags?.innerHTML || tags}{" "}
                                      <img
                                        src={path_image + "filter-close.svg"}
                                        alt="Close-filter"
                                        onClick={() => removeTag(i)}
                                      />
                                    </li>
                                  </>
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
                    <div className="mail-recipt">
                      <div className="row">
                        {/* <div className="col-12 col-md-12 mail-recipt-right">
                          <h6>Content that will be send</h6>
                          <p>
                            Content <span>| 1</span>
                          </p>
                          {typeof getpdfdata !== "undefined" &&
                            getSelectedPdfId != 13 &&
                            getSelectedPdfId != 14 &&
                            getSelectedPdfId != 16 && (
                              <div className="mail-content-select-box">
                                <div className="mail-content-select-top">
                                  <div className="mail-preview-img">
                                    <img
                                      src={path_image + "dummy-img.png"}
                                      alt="Preview "
                                    />
                                  </div>
                                  <div className="mail-box-content">
                                    <h5>{getpdfdata?.pdf_title}</h5>
                                    <p>{getpdfdata?.pdf_sub_title}</p>
                                    <div className="mailbox-tags">
                                      <ul>
                                        {typeof getpdfdata?.pdf_tags !==
                                          "undefined" &&
                                          getpdfdata?.pdf_tags.length > 0 ? (
                                          getpdfdata?.pdf_tags?.map((tag) => {
                                            return (
                                              <li className="list1">{tag}</li>
                                            );
                                          })
                                        ) : (
                                          <li className="list1">N/A</li>
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="mail-content-table">
                                  <table>
                                    <tbody>
                                      <tr>
                                        <th>Upload date</th>
                                        <td>{getpdfdata?.pdf_created}</td>
                                      </tr>
                                      <tr>
                                        <th>Language</th>
                                        <td>{getpdfdata?.pdf_language}</td>
                                      </tr>
                                      <tr>
                                        <th>SPC</th>
                                        <td>
                                          {getpdfdata?.pdf_spc_included === 0
                                            ? "No"
                                            : "Yes"}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Last email</th>
                                        <td>
                                          {getpdfdata?.pdf_last_sent == ""
                                            ? "N/A"
                                            : getpdfdata?.pdf_last_sent}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
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
                                        href={getpdfdata?.pdf_preview_link}
                                        target="_blank"
                                      >
                                        <button className="btn btn-primary btn-filled">
                                          Preview
                                        </button>
                                      </a>
                                  }
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

                          {getSelectedPdfId == 14 && localStorage.getItem('user_id') == "56Ek4feL/1A8mZgIKQWEqg==" && (
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
                        </div> */}

                        <div className="col-12 col-md-12 mail-recipt-left">
                          <h6>
                            The recipients <span>| {selectedHcp?.length}</span>
                          </h6>
                          <p>{/* Single HCP <span>| 1</span> */}</p>

                          {(getSmartListData?.length !== 0 && selected == 1) && (
                            <div className="smartlist-view email_box_outer">
                              <div className="smartlist-view email_box">
                                <div className="mail-box-content">
                                  <h5>{getSmartListData?.name}</h5>
                                  <SmartListLayout data={getSmartListData} iseditshow={0} isviewshow={1} deletestatus={0} viewSmartListData={viewSmartListData} webinarFlag={1} />
                                  {/* <div className="mailbox-table">
                                    <table>
                                      <tbody>
                                        <tr>
                                          <th>Contact type</th>
                                          <td>
                                            {getSmartListData?.contact_type}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Speciality</th>
                                          <td>{getSmartListData?.speciality}</td>
                                        </tr>
                                        <tr>
                                          <th>Readers</th>
                                          <td>
                                            {getSmartListData?.reader_selection}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>IBU</th>
                                          <td>{getSmartListData?.ibu}</td>
                                        </tr>
                                        <tr>
                                          <th>Product</th>
                                          <td>{getSmartListData?.product}</td>
                                        </tr>
                                        <tr>
                                          <th>Country</th>
                                          <td>{getSmartListData?.country}</td>
                                        </tr>
                                        <tr>
                                          <th>Registered</th>
                                          <td>{getSmartListData?.registered}</td>
                                        </tr>
                                        <tr>
                                          <th>Created by</th>
                                          <td>
                                            <span>
                                              {getSmartListData?.creator}
                                            </span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div> */}

                                  {/* <div className="mail-time">
                                    <span>{getSmartListData?.created_at}</span>
                                  </div> */}
                                  {/* <div className="smart-list-added-user">
                                    <img
                                      src={path_image + "smartlist-user.svg"}
                                      alt="User icon"
                                    />
                                  
                                    {selectedHcp?.length}
                                  </div> */}

                                  {/* <div className="smartlist-buttons">
                                    <button
                                      className="btn btn-primary btn-bordered view"
                                      onClick={() =>
                                        openSmartListPopup(getSmartListData?.id)
                                      }
                                    >
                                      View
                                    </button>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 verify-right">
                  <div className="preview_mail">
                    <h4>
                      {props.getWebinarEmailData?.emailSubject
                        ? props.getWebinarEmailData?.emailSubject
                        : props.getWebinarDraftData?.subject}
                    </h4>
                    {/*
                    <p>
                      {props.getEmailData?.emailDescription
                        ? props.getEmailData.emailDescription
                        : props.getDraftData.description}
                    </p>
                    */}
                    <div
                      className="preview-mail-box"
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
              getReaderDetails?.length > 0 &&
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
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Bounced</th>
                      <th scope="col">Country</th>

                      {localStorage.getItem("user_id") ===
                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                        <>
                          <th scope="col">IRT mandatory training</th>
                          <th scope="col">IRT role</th>
                        </>
                      ) : (
                        <>
                          <th scope="col">Business unit</th>
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
                      selectedHcp?.length > 0 &&
                      selectedHcp?.map((rr, i) => {
                        return (
                          <>
                            <tr>
                              <td>{rr?.first_name}</td>
                              <td>{rr?.email}</td>
                              <td>{rr?.bounce}</td>
                              <td>{rr?.country}</td>
                              <td>
                                {localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg=="
                                  ? rr?.irt
                                    ? "Yes"
                                    : "No"
                                  : rr?.ibu
                                    ? rr?.ibu
                                    : "N/A"}
                              </td>
                              <td>
                                {localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                                  ? rr?.user_type != 0 ? rr?.user_type : "N/A"
                                  : rr?.contact_type
                                }
                              </td>
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr?.consent}</span>{" "}
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr?.email_received}</span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr?.email_opening}</span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr?.registration}</span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr?.last_email}</span>
                                </td>
                              ) : null}
                              <td className="add-new-hcp" colspan="12"></td>
                            </tr>
                          </>
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
          <SmartListTableLayout id={selectedListId} closeSmartListPopup={closeSmartListPopup} />
          : null
      }
    </>
  );
};

const mapStateToProps = (state) => {

  //  let emailData = state.getEmailData;
  return state;
};
export default connect(mapStateToProps)(WebinarVerifyMAIL);
