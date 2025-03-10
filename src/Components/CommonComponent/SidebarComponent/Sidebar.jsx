import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import { Player, BigPlayButton } from "video-react";
import { useSidebar } from "../LoginLayout";
import { useNavigate } from "react-router-dom";

let title = "";
let video_url = "";
let video_poster = "";
const Sidebar = () => {
   
  const rdLikeArray=["56Ek4feL/1A8mZgIKQWEqg==","bWmUjqX7J011   WUTYn9g==","MXl8m36VZFYXpgFVz3Pg0g=="]
  const isRdAccount=localStorage.getItem("user_id")=="56Ek4feL/1A8mZgIKQWEqg=="
  const isNorgineAccount=localStorage.getItem("user_id")=="bWmUjqX7J011   WUTYn9g=="
  const isGenaAccount=localStorage.getItem("user_id")=="MXl8m36VZFYXpgFVz3Pg0g=="
  const isLikeRdAccount= rdLikeArray.includes(localStorage.getItem("user_id"))
  let navigate = useNavigate();
  let c_id = 0;
  let webinar_c_id = 0;
  const location = useLocation();
 

  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  let sidebar_image_path= import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN_SIDEBAR;
   
  let path = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [getHideShowSideContent, setHideShowSideContent] = useState(false);
  const [getOpenVideoPopup, setOpenVideoPopup] = useState(false);
  const [get_user_id, set_user_id] = useState();
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));

  const { selectedItem, eventIdContext } = useSidebar();
 

  useEffect(() => {
    let user_id = localStorage.getItem("user_id");
    if (user_id) {
      set_user_id(user_id);
    }

  }, [selectedItem]);

  const toggleClassToBody = () => {
    document.body.classList.toggle("toggle_sidebar");
  };


 

  useEffect(() => {
    const activeSublinksElements = document.querySelectorAll(".active.sub-links");

    if (activeSublinksElements?.length > 0) {
      document.body.classList.add('active-subLink');

    } else {
      document.body.classList.remove('active-subLink');
    }

    return () => {
      document.body.classList.remove('active-subLink');
    };
  }, [location?.pathname]);

  const eventList = () => {
    navigate("/webinar/event-listing");
  };

 

  if (location.pathname == "/EmailList") {
    title = "Email overview";
    video_url =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/videos/email_page_1.mp4";
    video_poster =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/poster/email_page_1.png";
  } else if (location.pathname == "/EmailArticleSelect") {
    title = "Selecting content for your email";
    video_url =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/videos/email_page_2.mp4";
    video_poster =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/poster/email_page_2.png";
  } else if (location.pathname == "/CreateEmail") {
    title = "Writing your email";
    video_url =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/videos/email_page_3.mp4";
    video_poster =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/poster/email_page_3.png";
  } else if (location.pathname == "/SelectHCP") {
    title = "Select HCPs to mail";
    video_url =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/videos/email_page_4.mp4";
    video_poster =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/poster/email_page_4.png";
  } else if (location.pathname == "/VerifyHCP") {
    title = "Select HCPs to mail";
    video_url =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/videos/email_page_5.mp4";
    video_poster =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/poster/email_page_5.png";
  } else if (
    location.pathname == "/verifyMAIL" ||
    location.pathname == "/VerifyMAIL" ||
    location.pathname == "/VerifyHcpMAIL"
  ) {
    title = "Sending your email";
    video_url =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/videos/email_page_8.mp4";
    video_poster =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/poster/email_page_8.png";
  } else if (location.pathname == "/SelectSmartListUsers") {
    title = "Verify & adjust your SmartList";
    video_url =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/videos/email_page_6.mp4";
    video_poster =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/poster/email_page_6.png";
  } else if (location.pathname == "/SelectSmartList") {
    title = "Select HCPs to mail";
    video_url = "";
    video_poster = "";
  } else if (location.pathname == "/SmartList") {
    localStorage.removeItem("sd_i");
    title = "Creating new SmartList";
  } else if (location.pathname == "/CreateSmartList") {
    title = "Creating new SmartList";
    video_url =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/videos/smart_list_uploading_excel.mp4";
    video_poster =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/poster/smart_list_uploading_excel.png";
    if (localStorage.getItem("sd_i")) {
      c_id = localStorage.getItem("sd_i");
    }
  } else if (location.pathname == "/ViewSmartList") {
    title = "View smart list readers";
    video_url = "";
  } else if (location.pathname == "/EditList") {
    title = "Edit smart list";
    video_url = "";
  } else if (location.pathname == "/SmartListFilter") {
    title = "Creating new SmartList";
    video_url =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/videos/smart_list_sagment.mp4";
    video_poster =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/poster/smart_list_sagment.png";
    if (localStorage.getItem("sd_i")) {
      c_id = localStorage.getItem("sd_i");
    }
  } else if (location.pathname == "/UploadExcel") {
    title = "Verify Readers list.";
    video_url = "";
    if (localStorage.getItem("sd_i")) {
      c_id = localStorage.getItem("sd_i");
    }
  } else if (location.pathname == "/EmailArticleSelect") {
    title = "Selecting content for your email";
    video_url =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/videos/email_page_2.mp4";
    video_poster =
      "https://docintel.s3.eu-west-1.amazonaws.com/react_help/poster/email_page_2.png";
  } else if (location.pathname == "/library-content") {
    title = "Library overview";
    video_url = "/componentAssets/images/library.mp4";
    video_poster = "/componentAssets/images/library-page-poster.png";
  } else if (location.pathname == "/set-popup") {
    title = "Set Pop-up";
    video_url = "/componentAssets/images/set-popup.mp4";
    video_poster = "/componentAssets/images/popup-screenshot.png";
  } else if (location.pathname == "/library-sublink") {
    title = "New SubLink";
    video_url = "/componentAssets/images/new-sublink.mp4";
    video_poster = "/componentAssets/images/new-sublink.png";
  } else if (location.pathname == "/products") {
    title = "Products and Tags";
    video_url = "/componentAssets/images/products-tags.mp4";
    video_poster = "/componentAssets/images/products-tags.png";
  } else if (
    location.pathname == "/library-create-user" ||
    location.pathname == "/preview-content" ||
    location.pathname == "/content-detail"
  ) {
    title = "Create content";
    video_url = "/componentAssets/images/create_content.mp4";
    video_poster = "/componentAssets/images/create-content.png";
  }

  //webinar email smartlist createNewSmartList
  else if (
    location.pathname == "/webinar/email/smartlist/smartlistfilter") {
    if (localStorage.getItem("webinar_sd_i")) {
      webinar_c_id = localStorage.getItem("webinar_sd_i");
    }
  }
  else if (location.pathname == "/webinar/email/smartlist/createsmartlist") {
    if (localStorage.getItem("webinar_sd_i")) {

      webinar_c_id = localStorage.getItem("webinar_sd_i");

    }
  } else if (location.pathname == "/webinar/email/smartlist/uploadsmartlist") {
    if (localStorage.getItem("webinar_sd_i")) {

      webinar_c_id = localStorage.getItem("webinar_sd_i");

    }
  }
  else if (location.pathname == "/webinar/email/smartlist") {
    localStorage.removeItem("webinar_sd_i");
    title = "Creating new SmartList";
  }


 

  useEffect(() => {
    const currentLocation = window.location.pathname;
    const divElement = document.querySelector('.left-sidebar');

    if (

      currentLocation === '/webinar/event-listing' || currentLocation === '/library-add-link' || currentLocation === '/survey/survey-builder' || currentLocation === '/survey/form-builder' || currentLocation === '/survey/survey-configure' || currentLocation === '/survey/survey-setup' || currentLocation === '/survey/404' || currentLocation === '/survey/thank-you' || currentLocation === '/survey/survey-preview'
      || currentLocation === '/sunshine-timeline' || currentLocation === '/change-password' || currentLocation === '/aland-activity'
    ) {
      divElement?.classList.add('hidesidebar');
    } else {
      divElement?.classList.remove('hidesidebar');
    }

    return () => {
      divElement?.classList.remove('hidesidebar');
    };
  }, [location?.pathname]);


  const isActive = location.pathname === '/webinar/live-stream'
  const isActivePolls = location.pathname === '/webinar/live-stream/polls-layout'
  const isActiveContact = location.pathname === '/webinar/live-stream/contact-dm'
  const isActiveSpeaker = location.pathname === '/webinar/live-stream/speaker-zone'
  const isActiveSettings = location.pathname === '/webinar/live-stream/settings'
  const isActiveChatPage = location.pathname === '/webinar/live-stream/chat-link'
  const isActiveSurveyPage = location.pathname === '/webinar/analytics/question-data'

  const isActiveSurveyEmail = location.pathname === '/survey/email' ||
		  location.pathname === '/survey/email/selectsurvey' ||
		  location.pathname === '/survey/email/select-hcp' ||
		  location.pathname === '/survey/email/smart-list' ||
		  location.pathname === '/survey/email/select-smartlist-users' ||
		  location.pathname === '/survey/email/verify-hcp' ||
		  location.pathname === '/survey/email/verify-hcp-mail' ||
		  location.pathname === '/survey/email/verify-mail' ||
		  location.pathname === '/survey/email/create-email'

  const isActiveSurveySmartList = location.pathname === '/survey/smartlist' || location.pathname === '/survey/ViewSmartList' || location.pathname === '/survey/smartlist/UploadExcel' || location.pathname ===  '/survey/smartlist/createlist'

  const isActiveSurveyAutomail = location.pathname === '/survey/AutoEmail'
  const isActiveSurveyTemplate= location.pathname === '/survey/TemplateBuilder';

  const isActiveEmail = location.pathname === '/webinar/email' ||
    location.pathname === '/webinar/email/create-new-email' ||
    location.pathname === '/webinar/email/selectHCP' ||
    location.pathname === '/webinar/email/selectSmartList' ||
    location.pathname === '/webinar/email/verifyMAIL' ||
    location.pathname === '/webinar/email/verifyHCP' ||
    location.pathname === '/webinar/email/verifyHcpMAIL' ||
    location.pathname === '/webinar/email/selectSmartListUsers' ||
    ((location.pathname == "/webinar/email/smartlist/createsmartlist" ||
      location.pathname == "/webinar/email/smartlist/smartlistfilter" ||
      location.pathname == "/webinar/email/smartlist/uploadsmartlist")
      && webinar_c_id != 0)
  const isActiveAutomail = location.pathname === '/webinar/email/auto-emails'

  const isActiveSmartlist = location.pathname === '/webinar/email/smartlist' ||
    location.pathname == "/webinar/email/smartlist/editlist" ||
    location.pathname == "/webinar/email/smartlist/filterSegment" ||
    location.pathname == "/webinar/email/smartlist/table" ||
    location.pathname == "/webinar/email/smartlist/viewlist" ||
    location.pathname == "/webinar/email/smartlist/viewTable" ||
    location.pathname == "/webinar/email/smartlist/verifylist" ||
    ((location.pathname == "/webinar/email/smartlist/createsmartlist" ||
      location.pathname == "/webinar/email/smartlist/uploadsmartlist" ||
      location.pathname == "/webinar/email/smartlist/smartlistfilter"
    ) && webinar_c_id == 0);

  return (
    <>
      <div className="left-sidebar" id="left-sidebar">
        <div className="sidebar-menu">
          {window.location.pathname === "/webinar/invitees" ||
            window.location.pathname == "/webinar/registration" ||
            window.location.pathname == "/webinar/email" ||
            window.location.pathname == "/webinar/live-stream" ||
            window.location.pathname == "/webinar/live-stream/polls-layout" ||
            window.location.pathname == "/webinar/analytics/question-data" ||
            window.location.pathname == "/webinar/live-stream/chat-link" ||
            window.location.pathname == "/webinar/analytics" || 
            window.location.pathname == "/webinar/analytics/analytics-attendees" ||
            window.location.pathname == "/webinar/analytics/analytics-poll" ||
            window.location.pathname == "/webinar/analytics/analytics-questions" ||
            window.location.pathname == "/webinar/analytics/analytics-emails" ||
            window.location.pathname == "/webinar/analytics/analytics-regions" ||
            window.location.pathname === "/webinar/live-stream/settings" ||
            window.location.pathname === "/webinar/live-stream/speaker-zone" ||
            window.location.pathname == "/webinar/email/auto-emails" ||
            window.location.pathname == "/webinar/email/smartlist" ||
            window.location.pathname === '/webinar/email/create-new-email' ||
            window.location.pathname === '/webinar/email/selectHCP' ||
            window.location.pathname === '/webinar/email/selectSmartList' ||
            window.location.pathname === '/webinar/email/verifyMAIL' ||
            window.location.pathname === '/webinar/email/verifyHCP' ||
            window.location.pathname === '/webinar/email/verifyHcpMAIL' ||
            window.location.pathname === '/webinar/email/selectSmartListUsers' ? (
            <>
 
              <div className="sidebar_txt">
                <button className="toggle_btn" onClick={() => {
                  eventList();
                }}>
                  <img src={path_image + "home-icon.svg"} alt="toggle-sidebar" />
                </button>
                <span title={eventIdContext?.eventTitle ? eventIdContext?.eventTitle : localStorageEvent?.eventTitle}>{eventIdContext?.eventTitle ? eventIdContext?.eventTitle : localStorageEvent?.eventTitle}</span>
              </div>
            </>
          ) : null}

     

          {!(window.location.pathname === "/webinar/invitees" ||
            window.location.pathname === "/webinar/registration" ||
            window.location.pathname === "/webinar/email" ||
            window.location.pathname === "/webinar/live-stream" ||
            window.location.pathname == "/webinar/live-stream/polls-layout" ||
            window.location.pathname == "/webinar/analytics/question-data" ||
            window.location.pathname == "/webinar/live-stream/chat-link" ||
            window.location.pathname === "/webinar/analytics" || 
            window.location.pathname == "/webinar/analytics/analytics-attendees" ||
            window.location.pathname == "/webinar/analytics/analytics-poll" ||
            window.location.pathname == "/webinar/analytics/analytics-questions" ||
            window.location.pathname == "/webinar/analytics/analytics-emails" ||
            window.location.pathname == "/webinar/analytics/analytics-regions" ||
            window.location.pathname === "/webinar/live-stream/contact-dm" ||
            window.location.pathname === "/webinar/live-stream/settings" ||
            window.location.pathname === "/webinar/live-stream/speaker-zone" ||
            window.location.pathname === "/webinar/email/auto-emails" ||
            window.location.pathname === "/webinar/email/smartlist" ||
            window.location.pathname === "/webinar/email/create-new-email" ||
            window.location.pathname === '/webinar/email/selectHCP' ||
            window.location.pathname === '/webinar/email/selectSmartList' ||
            window.location.pathname === '/webinar/email/verifyMAIL' ||
            window.location.pathname === '/webinar/email/verifyHCP' ||
            window.location.pathname === '/webinar/email/verifyHcpMAIL' ||
            window.location.pathname === '/survey/email' ||
            window.location.pathname === '/survey/email/selectsurvey' ||
            window.location.pathname === '/survey/email/create-email' ||
            window.location.pathname === '/survey/auto-email' ||
            window.location.pathname === '/survey/smartlist' ||
            window.location.pathname === '/survey/smartlist/createlist' ||
            window.location.pathname === '/survey/smartlist/UploadExcel' ||
            window.location.pathname === '/survey/ViewSmartList' ||
            window.location.pathname === '/survey/EditList' ||
            window.location.pathname === '/survey/AutoEmail' ||
            window.location.pathname === '/survey/TemplateBuilder' ||
            window.location.pathname === '/webinar/email/selectSmartListUsers') && (
              <button className="toggle_btn" onClick={() => toggleClassToBody()}>
                <img src={path_image + "arrow-left.svg"} alt="toggle-sidebar" />
              </button>
            )}
          {window.location.pathname == "/SmartList" ||
            window.location.pathname == "/EditList" ||
            window.location.pathname == "/CreateSmartList" ||
            window.location.pathname == "/SmartListFilter" ||
            window.location.pathname == "/SelectSmartList" ||
            window.location.pathname == "/EmailList" ||
            window.location.pathname == "/RD-EmailList" ||
            window.location.pathname == "/TemplateBuilder" ||
            window.location.pathname == "/AutoEmail" ||
            window.location.pathname == "/IRTRole" ||
            window.location.pathname == "/EmailArticleSelect" ||
            window.location.pathname == "/CreateEmail" ||
            window.location.pathname == "/FilterSegment" ||
            window.location.pathname == "/SelectHCP" ||
            window.location.pathname == "/VerifyHCP" ||
            window.location.pathname == "/VerifyMAIL" ||
            window.location.pathname == "/verifyMAIL" ||
            window.location.pathname == "/VerifyHcpMAIL" ||
            window.location.pathname == "/SelectSmartListUsers" ||
            window.location.pathname == "/VerifySmartList" ||
            window.location.pathname == "/ViewSmartList" ||
            window.location.pathname == "/UploadExcel" ||
            window.location.pathname == "/UpdatedTable" ||
            window.location.pathname == "/ViewTable" ||
            window.location.pathname == "/EmailStatss" ||
            window.location.pathname == "/blocked-users" ||
            window.location.pathname == "/bounced-email" ||
            window.location.pathname == "/get-details" ? (

            <ul>

              <li
                className={
                  (location.pathname == "/EmailList" ||
                    location.pathname === "/EmailArticleSelect" ||
                    location.pathname === "/CreateEmail" ||
                    location.pathname === "/SelectHCP" ||
                    location.pathname === "/CreateEmail" ||
                    location.pathname === "/VerifyHCP" ||
                    location.pathname === "/VerifyMAIL" ||
                    location.pathname === "/verifyMAIL" ||
                    location.pathname === "/SelectSmartListUsers" ||
                    location.pathname === "/SelectSmartList" ||
                    location.pathname === "/VerifyHcpMAIL" ||
                    ((location.pathname == "/CreateSmartList" ||
                      location.pathname == "/SmartListFilter" ||
                      location.pathname == "/UploadExcel") &&
                      c_id != 0)) && location?.state?.IrtObj?.IRTFlag != 1
                    ? "active"
                    : "side_li"
                }
              >
                <Link to={"/EmailList"}>
                  <img src= { sidebar_image_path + "mail-icon.svg" } alt=""/>
                   {" "}
                  <p>Email</p>
                </Link>
              </li>

              {(isLikeRdAccount) ?
                <li
                  className={
                    location.pathname == "/IRTRole" ||
                      ((location.pathname == "/EmailList" ||
                        location.pathname == "/RD-EmailList" ||
                        location.pathname === "/EmailArticleSelect" ||
                        location.pathname === "/CreateEmail" ||
                        location.pathname === "/SelectHCP" ||
                        location.pathname === "/CreateEmail" ||
                        location.pathname === "/VerifyHCP" ||
                        location.pathname === "/VerifyMAIL" ||
                        location.pathname === "/verifyMAIL" ||
                        location.pathname === "/SelectSmartListUsers" ||
                        location.pathname === "/SelectSmartList" ||
                        location.pathname === "/VerifyHcpMAIL" ||
                        ((location.pathname == "/CreateSmartList" ||
                          location.pathname == "/SmartListFilter" ||
                          location.pathname == "/UploadExcel") &&
                          c_id != 0)) && location?.state?.IrtObj?.IRTFlag == 1)

                      ? "active"
                      : "side_li"
                  }
                >
                  <Link to={"/IRTRole"}>

                  <img src= { sidebar_image_path + "irt-role.svg" } alt=""/>
                  {" "}
                    <p>Email IRT</p>
                  </Link>
                </li>
                : null}

              <li
                className={
                  location.pathname == "/AutoEmail" && c_id == 0
                    ? "active"
                    : "side_li"
                }
              >
                <Link to={"/AutoEmail"}>
                <img src= { sidebar_image_path + "auto-email.svg" } alt=""/>
                  {" "}
                  <p>Auto Email</p>
                </Link>
              </li>
              <li
                className={
                  location.pathname == "/TemplateBuilder" && c_id == 0
                    ? "active"
                    : "side_li"
                }
              >
                <Link to={"/TemplateBuilder"}>
                <img src= { sidebar_image_path + "template-builder.svg" } alt=""/>
                {" "}
                  <p>Template Builder</p>
                </Link>
              </li>

              <li
                className={
                  (location.pathname == "/SmartList" ||
                    location.pathname == "/EditList" ||
                    location.pathname == "/CreateSmartList" ||
                    location.pathname == "/SmartListFilter" ||
                    location.pathname == "/UploadExcel" ||
                    location.pathname == "/ViewSmartList" ||
                    location.pathname == "/VerifySmartList") &&
                    c_id == 0
                    ? "active"
                    : "side_li"
                }
              >
                <Link to={"/SmartList"}>
                <img src= { sidebar_image_path + "attendees.svg" } alt=""/>
                {" "}
                  <p>Smart list</p>
                </Link>
              </li>
              <li
                className={
                  (location.pathname === "/EmailStatss" ||
                    location.pathname === "/get-details") &&
                    c_id == 0
                    ? "active"
                    : "side_li"
                }
              >
                <Link to={"/EmailStatss"}>
                <img src= { sidebar_image_path + "analytics-email.svg" } alt=""/>
                {" "}
                  <p>Email Results</p>
                </Link>
              </li>
             

              {localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ==" ? (
                <li
                  className={
                    location.pathname === "/bounced-email" && c_id == 0
                      ? "active"
                      : "side_li"
                  }
                >
                  <Link to={"/bounced-email"}>
                   <img src= { sidebar_image_path + "bounced-email.svg" } alt=""/>
                   {" "}
                    <p>Bounced Email</p>
                  </Link>
                </li>
              ) : null}
            </ul>
          ) : window.location.pathname == "/library-content" || window.location.pathname == "/library-mandatory" || window.location.pathname == "/library-mandatory-content" ||
            location.pathname == "/create-docintel-link" ||
            window.location.pathname == "/library-edit" ||
            window.location.pathname == "/library-create" ||
            window.location.pathname == "/library-sublink" ||
            window.location.pathname == "/library-topics" ||
            window.location.pathname == "/library-campaign" ||
            window.location.pathname == "/spc" ||
            window.location.pathname == "/all-events" ||
            window.location.pathname == "/set-popup" ||
            window.location.pathname == "/library-popup" ||
            window.location.pathname == "/preview-content" ||
            window.location.pathname == "/spc-edit" ||
            window.location.pathname == "/spc-view" ||
            window.location.pathname == "/spc-render" ||
            window.location.pathname == "/spc-delete" ||
            window.location.pathname == "/spc-create" ||
            window.location.pathname == "/products" ||
            window.location.pathname == "/library-delete" ||
            window.location.pathname == "/library-create-user" ||
            window.location.pathname == "/library-add-link" ||
            window.location.pathname == "/edit-Consent-Options" ||
            window.location.pathname == "/library-create-pharma" ||
            window.location.pathname == "/library-edit-listing" ||
            window.location.pathname == "/content-detail" ? (
            <ul>

              <li
                // className={
                //   location.pathname == "/library-content" || (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="  || localStorage.getItem("user_id")=="bWmUjqX7J011   WUTYn9g==" && (location?.state?.flag === "Non-mandatory")?location.pathname == "/library-edit-listing" || location.pathname == "/library-edit"  || location.pathname == "/library-create-user" || location.pathname == "/preview-content" || location.pathname == "/content-detail" || location.pathname == "/library-sublink" :'')    ? "active" : "side_li"
                // }
                className={
                  location.pathname === "/library-content" ||
                    (isLikeRdAccount &&
                      location?.state?.flag === "Non-mandatory" &&
                      (
                        location.pathname === "/library-edit-listing" ||
                        location.pathname === "/library-edit" ||
                        location.pathname === "/library-create-user" ||
                        location.pathname === "/preview-content" ||
                        location.pathname === "/content-detail" ||
                        location.pathname === "/library-sublink"
                        || location.pathname == "/library-add-link"
                      )
                    ) ? "active" : "side_li"
                }

              >
                <Link
                  to={"/library-content"}
                  state={{
                    title:isLikeRdAccount ? "Non-mandatory" : '',
                    flag: isLikeRdAccount ? "Non-mandatory" : ''
                  }}

                >
                   <img src= { sidebar_image_path + "library-content.svg" } alt=""/>
                   {" "}
                  <p>{isLikeRdAccount ? 'Non Mandatory' : 'Content'}</p>
                </Link>
              </li>


              {isLikeRdAccount ?
                <li
                  className={
                    location.pathname == "/library-mandatory" || location.pathname == "/library-mandatory-content" || (location?.state?.flag === "mandatory" ? location.pathname == "/library-edit-listing" || location.pathname == "/library-edit" || location.pathname == "/library-create-user" || location.pathname == "/preview-content" || location.pathname == "/content-detail" || location.pathname == "/library-sublink" || location.pathname == "/library-add-link" : '') ? "active" : "side_li"
                  }
                >
                  <Link to={"/library-mandatory"}> 
                  <img src= { sidebar_image_path + "library-mandatory.svg" } alt=""/>
                   {" "}
                    <p>Mandatory Content</p>
                  </Link>
                </li> : ''
              }



              {!isLikeRdAccount?
                <li
                  className={
                    (location.pathname == "/library-create" ||
                      location.pathname == "/library-edit" ||
                      location.pathname == "/library-sublink" ||
                      location.pathname == "/library-topics" ||
                      location.pathname == "/set-popup" ||
                      location.pathname == "/library-popup" ||
                      location.pathname == "/preview-content" ||
                      location.pathname == "/library-create-user" ||
                      location.pathname == "/library-add-link" ||
                      location.pathname == "/edit-Consent-Options" ||
                      location.pathname == "/auto_popup" ||
                      location.pathname == "/create-docintel-link" ||
                      location.pathname == "/library-edit-listing" ||
                      location.pathname == "/content-detail") &&
                      c_id == 0
                      ? "active"
                      : "side_li"
                  }
                >
                  <Link to={"/library-create"}>
                  <img src= { sidebar_image_path + "library-create.svg" } alt=""/>
                   {" "}
                    <p>Create &amp; Change</p>
                  </Link>
                </li> : ''}

              {localStorage.getItem("user_id") == "rjiGlqA9DXJVH7bDDTX0Lg==" ||
                localStorage.getItem("user_id") == "wW0geGtDPvig5gF 6KbJrg==" ||
                localStorage.getItem("user_id") == "z2TunmZQf3QwCsICFTLGGQ==" ||
                localStorage.getItem("user_id") == "qDgwPdToP05Kgzc g2VjIQ==" ||
                localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ==" ||
                localStorage.getItem("user_id") == "59A m0rrvmC9UrYZKZXJxA==" ? (
                <li
                  className={
                    (location.pathname == "/spc" ||
                      location.pathname == "/spc-create" ||
                      location.pathname == "/spc-edit" ||
                      location.pathname == "/spc-view" ||
                      location.pathname == "/spc-render" ||
                      location.pathname == "/spc-delete") &&
                      c_id == 0
                      ? "active"
                      : "side_li"
                  }
                >
                  <Link to={"/spc"}>
                  <img src= { sidebar_image_path + "all-events.svg" } alt=""/>
                   {" "}
                    <p>SPC</p>
                  </Link>
                </li>
              ) : null}

              {localStorage.getItem("user_id") == "rjiGlqA9DXJVH7bDDTX0Lg==" ? (
                <li
                  className={
                    (location.pathname == "/all-events") &&
                      c_id == 0
                      ? "active"
                      : "side_li"
                  }
                >
                  <Link to={"/all-events"}>
                  <img src= { sidebar_image_path + "all-events.svg" } alt=""/>
                  {" "}
                    <p>All Events</p>
                  </Link>
                </li>
              ) : null}
              {isLikeRdAccount
                ? null : localStorage.getItem(
                  "group_id"
                ) == 2 ? null : (
                  <li
                    className={
                      location.pathname == "/products" && c_id == 0
                        ? "active"
                        : "side_li"
                    }
                  >
                    <Link to={"/products"}>
                    <img src= { sidebar_image_path + "products.svg" } alt=""/>
                     {" "}           
                      {localStorage.getItem("group_id") == 3 ? (
                        isLikeRdAccount
                          ? (
                            <p>Topics</p>
                          ) : localStorage.getItem("user_id") ==
                            "B7SHpAc XDXSH NXkN0rdQ==" ? (
                            <p>Products & Topics</p>
                          ) : (
                            <p>Products & Tags</p>
                          )
                      ) : null}
                    </Link>
                  </li>
                )}
               
 
       
            </ul>
          ) : window.location.pathname == "/license-content" ||
            window.location.pathname == "/license-edit" ||
            window.location.pathname == "/license-create" ||
            window.location.pathname == "/license-sublink" ||
            window.location.pathname == "/license-topics" ||
            window.location.pathname == "/license-set-popup" ||
            window.location.pathname == "/license-popup" ||
            window.location.pathname == "/license-preview-content" ||
            window.location.pathname == "/license-delete" ||
            window.location.pathname == "/license-create-user" ||
            window.location.pathname == "/license-edit-listing" ||
            window.location.pathname == "/license-content-detail" ||
            window.location.pathname == "/license-add-link" ||
            window.location.pathname == "/license/renew-listing" ||
            window.location.pathname == "/license/renew" ? (
            <ul>

              {isRdAccount ?
                <li
                  className={
                    location.pathname == "/library-content" || location.pathname == "/license-edit-listing" || location.pathname == "/library-edit" ? "active" : "side_li"
                  }
                >
                  <Link to={"/library-content"}>
                  <img src= { sidebar_image_path + "license-content.svg" } alt=""/>
                  {" "} 
                    <p>Non Mandatory</p>
                  </Link>
                </li> : ''
              }

              <li
                className={
                  location.pathname == "/license-content" ? "active" : "side_li"
                }
              >
                <Link to={"/license-content"}>
                <img src= { sidebar_image_path + "license-content.svg" } alt=""/>
                {" "} 
                  <p>Content</p>
                </Link>
              </li>



              <li
                className={
                  (location.pathname == "/license-create" ||
                    location.pathname == "/license-edit" ||
                    location.pathname == "/license-sublink" ||
                    location.pathname == "/license-set-popup" ||
                    location.pathname == "/license-popup" ||
                    location.pathname == "/license-preview-content" ||
                    location.pathname == "/license-create-user" ||
                    location.pathname == "/edit-Consent-Options" ||
                    location.pathname == "/license-edit-listing" ||
                    location.pathname == "/license-content-detail" ||
                    location.pathname == "/license-add-link" ||
                    location.pathname == "/license/renew-listing" ||
                    location.pathname == "/license/renew") &&
                    c_id == 0
                    ? "active"
                    : "side_li"
                }
              >
                <Link to={"/license-create"}>
                <img src= { sidebar_image_path + "license-create.svg" } alt=""/>
                {" "}

                  <p>Create &amp; Change</p>
                </Link>
              </li>

              <li
                className={
                  location.pathname == "/license-topics" && c_id == 0
                    ? "active"
                    : "side_li"
                }
              >
                <Link to={"/license-topics"}>
                <img src= { sidebar_image_path + "products.svg" } alt=""/>
                {" "}
                  <p>Products</p>
                </Link>
              </li>
            </ul>
          ) : window.location.pathname == "/readers-view" ||
            window.location.pathname == "/reader-add" ||
            window.location.pathname == "/reader-edit" ||
            window.location.pathname == "/readers-list" ||
            window.location.pathname == "/reader-review" ||
            window.location.pathname == "/site" ||
            window.location.pathname == "/add-site" ||
            window.location.pathname == "/edit-site" ||
            window.location.pathname == "/site-listing" ||
            window.location.pathname == "/new-readers-reviews" ||
            window.location.pathname == "/IRT-Mandatory" ||
            window.location.pathname == "/mandatory-reader-edit" ||
            window.location.pathname == "/timeline-detail" ? (
            <ul>

              {isLikeRdAccount ?
                (
                  <li
                    className={
                      location.pathname == "/IRT-Mandatory" || location.pathname == "/new-readers-reviews" ||
                        location.pathname == "/reader-add" || location.pathname == "/mandatory-reader-edit" || location.pathname == "/readers-list" ||
                        ((window.location.pathname == "/timeline-detail" || window.location.pathname == "/reader-review") && localStorage.getItem('irt_sec') == 1)
                        ? "active"
                        : "side_li"
                    }
                  >
                    <Link to={"/IRT-Mandatory"}>
                      
                    <img src= { sidebar_image_path + "irt-mandatory.svg" } alt=""/>
                    {" "}
                      <p>IRTs</p>
                    </Link>
                  </li>
                )
                : null}
              <li
                className={
                  (location.pathname == "/readers-view"
                    || (location.pathname == "/reader-edit" &&isLikeRdAccount) ||
                    ((location.pathname == "/timeline-detail" || location.pathname == "/reader-review" ) && (localStorage.getItem('irt_sec') != 1 && localStorage.getItem('irt_sec') != null)))
                    ? "active"
                    : "side_li"
                }
              >
                <Link to={"/readers-view"}>
                <img src= { sidebar_image_path + "attendees.svg" } alt=""/>
                {" "}
                  <p>
                    {isLikeRdAccount
                        ? "HCPs"
                        : "CRM"
                    }</p>
                </Link>
              </li>
              {!isLikeRdAccount?
                <li
                  className={
                    location.pathname == "/reader-add" ||
                      location.pathname == "/reader-review" ||
                      location.pathname == "/reader-edit" ||
                      (location.pathname == "/readers-list" && c_id == 0)
                      ? "active"
                      : "side_li"
                  }
                >
                  <Link to={"/reader-add"}>
                  <img src= { sidebar_image_path + "readers-add.svg" } alt=""/>
                  {" "}
                    <p>Add Contact</p>
                  </Link>
                </li> : null}

              {isLikeRdAccount
                ? (
                  <li
                    className={
                      location.pathname == "/add-site" ||
                        location.pathname == "/site" ||
                        location.pathname == "/site-listing" ||
                        location.pathname == "/edit-site"
                        ? "active"
                        : "side_li"
                    }
                  >
                    <Link to={"/site-listing"}>
                    <img src= { sidebar_image_path + "site-listing.svg" } alt=""/>
                    {" "}
                      <p>Sites</p>
                    </Link>
                  </li>
                ) : null}

            </ul>
          ) :
            window.location.pathname == "/webinar/invitees" ||
              window.location.pathname == "/webinar/registration" ||
              window.location.pathname == "/webinar/email" ||
              window.location.pathname == "/webinar/live-stream" ||
              window.location.pathname == "/webinar/live-stream/polls-layout" ||
              window.location.pathname == "/webinar/analytics/question-data" ||
              window.location.pathname == "/webinar/live-stream/chat-link" ||
              window.location.pathname == "/webinar/live-stream/contact-dm" ||
              window.location.pathname === "/webinar/live-stream/settings" ||
              window.location.pathname === "/webinar/live-stream/speaker-zone" ||
              window.location.pathname == "/webinar/analytics" ||
              window.location.pathname == "/webinar/email/auto-emails" ||
              window.location.pathname == "/webinar/email/smartlist" ||
              window.location.pathname == "/webinar/email/smartlist/createsmartlist" ||
              window.location.pathname == "/webinar/email/smartlist/smartlistfilter" ||
              window.location.pathname == "/webinar/email/smartlist/uploadsmartlist" ||
              window.location.pathname == "/webinar/email/smartlist/editlist" ||
              window.location.pathname == "/webinar/email/smartlist/filterSegment" ||
              window.location.pathname == "/webinar/email/smartlist/table" ||
              window.location.pathname == "/webinar/email/smartlist/viewlist" ||
              window.location.pathname == "/webinar/email/smartlist/viewTable" ||
              window.location.pathname == "/webinar/email/smartlist/verifylist" ||
              window.location.pathname == "/webinar/email/create-new-email" ||
              window.location.pathname === '/webinar/email/selectHCP' ||
              window.location.pathname === '/webinar/email/selectSmartList' ||
              window.location.pathname === '/webinar/email/verifyMAIL' ||
              window.location.pathname === '/webinar/email/verifyHCP' ||
              window.location.pathname === '/webinar/email/verifyHcpMAIL' ||
              window.location.pathname === '/webinar/analytics/analytics-attendees' ||
              window.location.pathname === '/webinar/analytics/analytics-poll' ||
              window.location.pathname === '/webinar/analytics/analytics-questions' ||
              window.location.pathname === '/webinar/analytics/analytics-regions' ||
              window.location.pathname === '/webinar/analytics/analytics-emails' ||
              window.location.pathname === '/webinar/analytics/analytics-events' ||
              window.location.pathname === '/webinar/email/selectSmartListUsers' ?
              (
                <ul>
                  <li
                    className={
                      location.pathname == "/webinar/invitees"
                        ? "active"
                        : "side_li"
                    }
                  >
                    <Link to={"/webinar/invitees"}>
                    <img src= { sidebar_image_path + "attendees.svg" } alt=""/>
                    {" "}
                      <p>Registered Users</p>
                    </Link>
                  </li>

                  <li
                    className={
                      location.pathname == "/webinar/registration"
                        ? "active"
                        : "side_li"
                    }
                  >
                    <Link to={"/webinar/registration"}>
                    <img src= { sidebar_image_path + "registration-page.svg" } alt=""/>
                    {" "}
                      <p>Registration Page</p>
                    </Link>
                  </li>

                  <li
                    className={
                      location.pathname == "/webinar/email" ||
                        location.pathname == "/webinar/email/auto-emails" ||
                        location.pathname == "/webinar/email/smartlist" ||

                        location.pathname == "/webinar/email/smartlist/smartlistfilter" ||
                        location.pathname == "/webinar/email/smartlist/uploadsmartlist" ||
                        location.pathname == "/webinar/email/smartlist/editlist" ||
                        location.pathname == "/webinar/email/smartlist/filterSegment" ||
                        location.pathname == "/webinar/email/smartlist/table" ||
                        location.pathname == "/webinar/email/smartlist/viewlist" ||
                        location.pathname == "/webinar/email/smartlist/viewTable" ||
                        location.pathname == "/webinar/email/smartlist/verifylist" ||
                        location.pathname == "/webinar/email/create-new-email" ||
                        location.pathname === '/webinar/email/selectHCP' ||
                        location.pathname === '/webinar/email/selectSmartList' ||
                        location.pathname == "/webinar/email/smartlist/createsmartlist" ||
                        location.pathname === '/webinar/email/verifyMAIL' ||
                        location.pathname === '/webinar/email/verifyHCP' ||
                        location.pathname === '/webinar/email/verifyHcpMAIL' ||
                        location.pathname === '/webinar/email/selectSmartListUsers'
                        ? "active sub-links"
                        : "side_li sub-links"
                    }
                  >
                    <Link to={"/webinar/email"}>
                    <img src= { sidebar_image_path +"webinar-email.svg" } alt=""/>
                    {" "}
                      <p>Email</p>
                    </Link>
                    <div className="left-sidebar-secondary">
                      <div className="sidebar-menu-secondary">
                        
                        <ul>
                          <li className={isActiveEmail ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/email">
                            <img src= { sidebar_image_path +"webinar-email.svg" } alt=""/>
                            {" "}
                              <p>Email</p>
                            </Link>
                          </li>
                          <li className={isActiveAutomail ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/email/auto-emails">
                            <img src= { sidebar_image_path +"auto-email.svg" } alt=""/>
                            {" "}
                              <p>Auto Emails</p>
                            </Link>
                          </li>

                          <li className={isActiveSmartlist ? 'active' : 'side_li'}
                           
                          >
                            <Link to="/webinar/email/smartlist">
                            <img src= { sidebar_image_path +"attendees.svg" } alt=""/>
                            {" "}
                              <p>Smart List</p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li
                    className={
                      location.pathname == "/webinar/live-stream" || location.pathname == "/webinar/live-stream/polls-layout" || window.location.pathname == "/webinar/live-stream/contact-dm" || location.pathname == "/webinar/live-stream/chat-link"
                        || window.location.pathname === "/webinar/live-stream/settings" || window.location.pathname === "/webinar/live-stream/speaker-zone"
                        ? "active sub-links"
                        : "side_li sub-links"
                    }
                  // className="active sub-links"
                  >
                    <Link to={"/webinar/live-stream"}>
                    <img src= { sidebar_image_path +"live-stream.svg" } alt=""/>
                    {" "}
                      <p>Live Stream</p>
                    </Link>
                    <div className="left-sidebar-secondary">
                      <div className="sidebar-menu-secondary">
                        {/* <div className="sidebar_txt">
                          <button className="toggle_btn" onClick={() => {
                            eventList();
                          }}>
                            <img src={path_image + "home-icon.svg"} alt="toggle-sidebar" />
                          </button>
                       
                          <span title={eventIdContext?.eventTitle ? eventIdContext?.eventTitle : localStorageEvent?.eventTitle}>{eventIdContext?.eventTitle ? eventIdContext?.eventTitle : localStorageEvent?.eventTitle}</span>
                        </div> */}
                        <ul>
                          <li className={isActive ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/live-stream">
                            <img src= { sidebar_image_path +"live-stream.svg" } alt=""/>
                            {" "}
                              <p>Live Stream</p>
                            </Link>
                          </li>
                          <li className={isActiveSpeaker ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/live-stream/speaker-zone">
                            <img src= { sidebar_image_path +"speaker-zone.svg" } alt=""/>
                            {" "}
                              <p>Speaker Zone</p>
                            </Link>
                          </li>

                          <li className={isActivePolls ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/live-stream/polls-layout">
                            <img src= { sidebar_image_path +"polls.svg" } alt=""/>
                            {" "}
                              <p>Polls</p>
                            </Link>
                          </li>
                          <li className={isActiveChatPage ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/live-stream/chat-link">
                            <img src= { sidebar_image_path +"chat-link.svg" } alt=""/>
                            {" "}
                              <p>Chat Link</p>
                            </Link>
                          </li>

                          <li className={isActiveSettings ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/live-stream/settings">
                            <img src= { sidebar_image_path +"settings.svg" } alt=""/>
                            {" "}
                              <p>Settings</p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li className={
                    location.pathname == "/webinar/analytics-events" || location.pathname == "/webinar/analytics" || location.pathname == "/webinar/analytics/analytics-attendees" || location.pathname == "/webinar/analytics/analytics-poll" || location.pathname == "/webinar/analytics/analytics-questions" || location.pathname == "/webinar/analytics/analytics-regions" || window.location.pathname == "/webinar/analytics/question-data" || window.location.pathname == "/webinar/analytics/analytics-emails" || location.pathname == "/webinar/analytics/analytics-attendees"
                      || location.pathname == "/webinar/analytics/analytics-poll" || location.pathname == "/webinar/analytics/analytics-questions"
                      || location.pathname == "/webinar/analytics/analytics-emails" || location.pathname == "/webinar/analytics/analytics-regions"

                      ? "active sub-links"
                      : "side_li sub-links"
                  }
                  >
                    <Link to={"/webinar/analytics"}>
                    <img src= { sidebar_image_path +"analytics.svg" } alt=""/>
                    {" "}
                      <p>Analytics</p>
                    </Link>
                    <div className="left-sidebar-secondary">
                      <div className="sidebar-menu-secondary">
                        
                        <ul>
                          <li className={location.pathname == "/webinar/analytics" ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/analytics">
                            <img src= { sidebar_image_path +"analytics.svg" } alt=""/>
                            {" "}
                              <p>Dashboard</p>
                            </Link>
                          </li>
                          <li className={location.pathname == "/webinar/analytics/analytics-attendees" ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/analytics/analytics-attendees">
                            <img src= { sidebar_image_path +"attendees.svg" } alt=""/>
                            {" "}
                              <p>Attendees</p>
                            </Link>
                          </li>

                          <li className={location.pathname == "/webinar/analytics/analytics-poll" ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/analytics/analytics-poll">
                            <img src= { sidebar_image_path +"polls.svg" } alt=""/>
                            {" "}
                              <p>Polls</p>
                            </Link>
                          </li>
                          <li className={location.pathname == "/webinar/analytics/analytics-questions" ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/analytics/analytics-questions">
                            <img src= { sidebar_image_path +"questions.svg" } alt=""/>
                            {" "}
                              <p>Questions</p>
                            </Link>
                          </li>
                          <li className={location.pathname == "/webinar/analytics/analytics-emails" ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/analytics/analytics-emails">
                            <img src= { sidebar_image_path +"analytics-email.svg" } alt=""/>
                            {" "}
                              <p>Emails</p>
                            </Link>
                          </li>
                          <li className={location.pathname == "/webinar/analytics/analytics-regions" ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/analytics/analytics-regions">
                            <img src= { sidebar_image_path +"region-stats.svg" } alt=""/>
                            {" "}
                              <p>Region Stats</p>
                            </Link>
                          </li>
                          <li className={isActiveSurveyPage ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/analytics/question-data">
                            <img src= { sidebar_image_path +"post-survey.svg" } alt=""/>
                            {" "}
                              <p>Post Survey</p>
                            </Link>
                          </li>
                        
                        </ul>
                      </div>
                    </div>
                  </li>


                </ul>
              ) :
              window.location.pathname == "/webinar/invitees" ||
                window.location.pathname == "/webinar/registration" ||
                window.location.pathname == "/webinar/email" ||
                window.location.pathname == "/webinar/live-stream" ||
                window.location.pathname == "/webinar/live-stream/polls-layout" ||
                window.location.pathname == "/webinar/analytics/question-data" ||
                window.location.pathname == "/webinar/live-stream/chat-link" ||
                window.location.pathname == "/webinar/analytics" ?
                (
                  <ul>
                    <li
                      className={
                        location.pathname == "/webinar/invitees"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to={"/webinar/invitees"}>
                      <img src= { sidebar_image_path +"attendees.svg" } alt=""/>
                      {" "}
                        <p>Registered Users</p>
                      </Link>
                    </li>

                    <li
                      className={
                        location.pathname == "/webinar/registration"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to={"/webinar/registration"}>
                      <img src= { sidebar_image_path +"webinar-registration-page.svg" } alt=""/>
                      {" "}
                        <p>Registration Page</p>
                      </Link>
                    </li>
                    <li
                      className={
                        location.pathname == "/webinar/email"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to={"/webinar/email"}>
                      <img src= { sidebar_image_path +"webinar-email.svg" } alt=""/>
                       {" "}
                        <p>Email</p>
                      </Link>
                    </li>

               

                    <li
                      className={
                        location.pathname == "/analytics"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to={"/analytics"}>
                      <img src= { sidebar_image_path +"analytics.svg" } alt=""/>
                      {" "}
                        <p>Analytics</p>
                      </Link>
                    </li>
                  </ul>
                ) :
                window.location.pathname == "/webinar/invitees" ||
                  window.location.pathname == "/webinar/registration" ||
                  window.location.pathname == "/webinar/email" ||
                  window.location.pathname == "/webinar/live-stream" ||
                  window.location.pathname == "/webinar/live-stream/polls-layout" ||
                  window.location.pathname == "/webinar/analytics/question-data" ||
                  window.location.pathname == "/webinar/live-stream/chat-link" ||
                  window.location.pathname == "/webinar/analytics" ?
                  (
                    <ul>
                      <li
                        className={
                          location.pathname == "/webinar/invitees"
                            ? "active"
                            : "side_li"
                        }
                      >
                        <Link to={"/webinar/invitees"}>
                        <img src= { sidebar_image_path + "attendees.svg" } alt=""/>
                        {" "}
                          <p>Registered Users</p>
                        </Link>
                      </li>
                      <li
                        className={
                          location.pathname == "/webinar/registration"
                            ? "active"
                            : "side_li"
                        }
                      >
                        <Link to={"/webinar/registration"}>
                        <img src= { sidebar_image_path + "registration-page.svg" } alt=""/>
                        {" "}
                          <p>Registration Page</p>
                        </Link>
                      </li>
                      <li
                        className={
                          location.pathname == "/webinar/email"
                            ? "active"
                            : "side_li"
                        }
                      >
                        <Link to={"/webinar/email"}>
                        <img src= { sidebar_image_path +"webinar-email.svg" } alt=""/>
                        {" "}
                          <p>Email</p>
                        </Link>
                      </li>

                      
                      <li
                        className={
                          location.pathname == "/analytics"
                            ? "active"
                            : "side_li"
                        }
                      >
                        <Link to={"/analytics"}>
                         <img src= { sidebar_image_path +"analytics.svg" } alt=""/>
                         {" "}
                          <p>Analytics</p>
                        </Link>
                      </li>
                    </ul>
                  )
                  :

                  window.location.pathname == "/survey/survey-list" ||
                  window.location.pathname == "/survey/survey-setup" ||
                  window.location.pathname == "/survey/survey-sublink" ||
                  window.location.pathname == "/survey/topics" ||
                  window.location.pathname == "/survey/survey-analytics" ||
                  window.location.pathname == "/survey/email" ||
                  window.location.pathname == "/survey/email/selectsurvey" ||
                  window.location.pathname == "/survey/email/create-email" ||
                  window.location.pathname == "/survey/AutoEmail" ||
                  window.location.pathname == "/survey/smartlist" ||
                  window.location.pathname == "/survey/email/select-hcp" ||
                  window.location.pathname == "/survey/email/smart-list" ||
                  window.location.pathname == "/survey/email/select-smartlist-users" ||
                  window.location.pathname == "/survey/email/verify-hcp" ||
                  window.location.pathname == "/survey/email/verify-mail" ||
                  window.location.pathname == "/survey/email/verify-hcp-mail" ||
                  window.location.pathname == "/survey/TemplateBuilder" ||
                  window.location.pathname == "/survey/ViewSmartList" ||
                  window.location.pathname == "/survey/smartlist/createlist" ||
                  window.location.pathname == "/survey/smartlist/UploadExcel" ||
                  window.location.pathname == "/survey/survey-analytics-detail"?

                  (

                    <ul>

                      <li

                        className={

                          location.pathname == "/survey/survey-list"

                            ? "active"

                            : "side_li"

                        }

                      >

                        <Link to={"/survey/survey-list"}>

                        <img src= { sidebar_image_path +"surveys.svg" } alt=""/>
                         {" "}
                          <p>Surveys</p>

                        </Link>

                      </li>

                      <li

                        className={

                          location.pathname == "/survey/survey-sublink"

                            ? "active"

                            : "side_li"

                        }

                      >

                        <Link to={"/survey/survey-sublink"}>

                        <img src= { sidebar_image_path +"survey-sublink.svg" } alt=""/>
                        {" "}

                          <p>SubLinks</p>

                        </Link>

                      </li>

                      <li

                              className={

                                location.pathname == "/survey/topics"

                                  ? "active"

                                  : "side_li"

                              }

                              >

                              <Link to={"/survey/topics"}>

                              <img src= { sidebar_image_path + "topics.svg" } alt=""/>
                              {" "}

                                <p>Topics</p>

                              </Link>

                              </li>

                      <li

                        className={

                          location.pathname == "/survey/survey-analytics" || window.location.pathname == "/survey/survey-analytics-detail"

                            ? "active"

                            : "side_li"

                        }

                      >

                        <Link to={"/survey/survey-analytics"}>

                        <img src= { sidebar_image_path +"analytics.svg" } alt=""/>
                         {" "}

                          <p>Analytics</p>

                        </Link>

                      </li>

                      <li className={
                          location.pathname == "/survey/email" ||
                          location.pathname == "/survey/email/selectsurvey" ||
                          location.pathname == "/survey/email/select-hcp" ||
                          location.pathname == "/survey/email/smart-list" ||
                          location.pathname == "/survey/email/select-smartlist-users" ||
                          location.pathname == "/survey/email/verify-hcp" ||
                          location.pathname == "/survey/email/verify-mail" ||
                          location.pathname == "/survey/email/verify-hcp-mail" ||
                          location.pathname == "/survey/AutoEmail" ||
                          location.pathname == "/survey/smartlist" ||
                          location.pathname == "/survey/email/create-email" ||
                          window.location.pathname == "/survey/ViewSmartList" ||
                          window.location.pathname == "/survey/smartlist/createlist" ||
                          window.location.pathname == "/survey/smartlist/UploadExcel" ||
                          location.pathname == "/survey/TemplateBuilder" 
                           ? "active sub-links"
                        : "side_li sub-links"
                        }
                      >
                        <Link to={"/survey/email"}>
                          <img src= { sidebar_image_path +"mail-icon.svg" } alt=""/>
                          <p>Email</p>
                        </Link>
                          <div className="left-sidebar-secondary">
                            <div className="sidebar-menu-secondary">
                              <ul>
                                <li className={isActiveSurveyEmail ? 'active' : 'side_li'}
                                >
                                  <Link to="/survey/email">
                                  <img src= { sidebar_image_path +"webinar-email.svg" } alt=""/>
                                    <p>Email</p>
                                  </Link>
                                </li>
                                <li className={isActiveSurveyAutomail ? 'active' : 'side_li'}
                                >
                                  <Link to="/survey/AutoEmail">
                                  <img src= { sidebar_image_path +"auto-email.svg" } alt=""/>
                                  {" "}
                                    <p>Auto Emails</p>
                                  </Link>
                                </li>
                                <li
                                  className={isActiveSurveyTemplate ? "active" : "side_li"}
                                >
                                  <Link to={"/survey/TemplateBuilder"}>
                                    <img
                                      src={sidebar_image_path + "template-builder.svg"}
                                      alt=""
                                    />{" "}
                                    <p>Template Builder</p>
                                  </Link>
                                </li>

                                <li className={isActiveSurveySmartList ? 'active' : 'side_li'}>
                                  <Link to="/survey/smartlist">
                                  <img src= { sidebar_image_path +"attendees.svg" } alt=""/>
                                    <p>Smart List</p>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                      </li>
                    </ul>
                ):

                window.location.pathname == "/survey/survey-list" || window.location.pathname == "/survey/topics" || window.location.pathname == "/survey/survey-sublink" || window.location.pathname == "/survey/survey-analytics" || window.location.pathname == "/survey/survey-analytics-detail"?

                (

                  <ul>

                    <li

                      className={

                        location.pathname == "/survey/survey-list"

                          ? "active"

                          : "side_li"

                      }

                    >

                      <Link to={"/survey/survey-list"}>

                      <img src= { sidebar_image_path +"surveys.svg" } alt=""/>
                      {" "}

                        <p>Surveys</p>

                      </Link>

                    </li>

                    <li

                      className={

                        location.pathname == "/survey/survey-sublink"

                          ? "active"

                          : "side_li"

                      }

                    >

                      <Link to={"/survey/survey-sublink"}>

                      <img src= { sidebar_image_path +"survey-sublink.svg" } alt=""/>
                        {" "}


                        <p>SubLinks</p>

                      </Link>

                    </li>

                    
                      <li

                              className={

                                location.pathname == "/survey/topics"

                                  ? "active"

                                  : "side_li"

                              }

                              >

                              <Link to={"/survey/topics"}>

                              <img src= { sidebar_image_path + "topics.svg" } alt=""/>
                              {" "}

                                <p>Topics</p>

                              </Link>

                          </li>

                    <li

                      className={

                        location.pathname == "/survey/survey-analytics" || window.location.pathname == "/survey/survey-analytics-detail"

                          ? "active"

                          : "side_li"

                      }

                    >

                      <Link to={"/survey/survey-analytics"}>
                      <img src= { sidebar_image_path +"analytics.svg" } alt=""/>
                      {" "}

                      

                        <p>Analytics</p>

                      </Link>

                    </li>

                  </ul>

              ) :  
              location.pathname ==  "/Emaillist-publisher" ||
              location.pathname ==  "/create-sunshine-email" ||
              location.pathname ==  "/Verify-sunshine-mail" 

                ?(<ul>
                <li
                  className={
                    location.pathname == "/Emaillist-publisher" ||
                    location.pathname == "/create-sunshine-email" ||
                    location.pathname == "/Verify-sunshine-mail"
                      ? "active"
                      : "side_li"
                  }
                >
                  <Link to={"/Emaillist-publisher"}>
                    <img src= { sidebar_image_path +"webinar-email.svg" } alt=""/>
                    <p>Email</p>
                  </Link>
                </li></ul>) 
              :
                  window.location.pathname == "/webinar/event-listing" ||
                    window.location.pathname == "/webinar/registration" ||
                    window.location.pathname == "/poll-listing"
                    ? ( 
                      ''
                    ) : localStorage.getItem("group_id") == 2 ? (
                      window.location.pathname == "/LEX-210-analytics" ||
                        window.location.pathname == "/trial-analytics" ||
                        window.location.pathname == "/registration-type" ||
                        window.location.pathname == "/top-sales" ||
                        window.location.pathname == "/top-reseller" ||
                        window.location.pathname == "/top-clients" ||
                        window.location.pathname == "/sales-by-country" ||
                        window.location.pathname == "/content-analytics" ||
                        window.location.pathname == "/openings-by-country" ? (
                        <>
                          <ul>
                            <li
                              className={
                                location.pathname == "/content-analytics"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link to={"/content-analytics"}>
                              <img src= { sidebar_image_path +"analytics.svg" } alt=""/>
                              {" "}
                                <p>Content Analytics</p>
                              </Link>
                            </li>
                            {isLikeRdAccount
                              ? null : localStorage.getItem(
                                "group_id"
                              ) == 2 ? null : (
                                <>
                                  {isRdAccount ?
                                      <li
                                        className={
                                          location.pathname == "/LEX-210-analytics"
                                            ? "active"
                                            : "side_li"
                                        }
                                      >
                                        <Link to={"/LEX-210-analytics"}>
                                        <img src= { sidebar_image_path +"trails.svg" } alt=""/>
                                        {" "}
                                          <p>Trials</p>
                                        </Link>
                                      </li>
                                      : isNorgineAccount ?
                                        <li
                                          className={
                                            location.pathname == "/trial-analytics"
                                              ? "active"
                                              : "side_li"
                                          }
                                        >
                                          <Link to={"/trial-analytics"}>
                                          <img src= { sidebar_image_path +"trails.svg" } alt=""/>
                                          {" "}
                                            <p>Trials</p>
                                          </Link>
                                        </li> : isGenaAccount?
                                        <li
                                          className={
                                            location.pathname == "/trial-analytics"
                                              ? "active"
                                              : "side_li"
                                          }
                                        >
                                          <Link to={"/trial-analytics"}>
                                          <img src= { sidebar_image_path +"trails.svg" } alt=""/>
                                          {" "}
                                            <p>Gena Trials</p>
                                          </Link>
                                        </li>
                                        : null
                                  }
                                </>
                              )}
                            <li
                              className={
                                location.pathname == "/registration-type"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link to={"/registration-type"}>
                              <img src= { sidebar_image_path +"top-content.svg" } alt=""/>
                              {" "}
                                <p>Top Content</p>
                              </Link>
                            </li>

                            {localStorage.getItem("user_id") !==
                              "wPqk14Be1HbMIrzS0wqN3Q==" ? (
                              <>
                                <li
                                  className={
                                    location.pathname == "/top-sales"
                                      ? "active"
                                      : "side_li"
                                  }
                                >
                                  <Link to={"/top-sales"}>
                                  <img src= { sidebar_image_path +"top-content.svg" } alt=""/>
                                  {" "}
                                    <p>Top Sales</p>
                                  </Link>
                                </li>

                                <li
                                  className={
                                    location.pathname == "/top-reseller"
                                      ? "active"
                                      : "side_li"
                                  }
                                >
                                  <Link to={"/top-reseller"}>
                                      <img src= { sidebar_image_path +"top-reseller.svg" } alt=""/>
                                      {" "}
                                    <p>Top Reseller</p>
                                  </Link>
                                </li>
                              </>
                            ) : null}

                            <li
                              className={
                                location.pathname == "/top-clients" ? "active" : "side_li"
                              }
                            >
                              <Link to={"/top-clients"}>
                              <img src= { sidebar_image_path +"top-clients.svg" } alt=""/>
                              {" "}
                                <p>Top Clients</p>
                              </Link>
                            </li>

                            <li
                              className={
                                location.pathname == "/sales-by-country"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link to={"/sales-by-country"}>
                              <img src= { sidebar_image_path +"sales-by-country.svg" } alt=""/>
                              {" "}
                                <p>Sales By Country</p>
                              </Link>
                            </li>

                            <li
                              className={
                                location.pathname == "/openings-by-country"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link to={"/openings-by-country"}>
                              <img src= { sidebar_image_path +"opening-by-country.svg" } alt=""/>
                                 {" "}
                                <p>Opening By Country</p>
                              </Link>
                            </li>
                          </ul>
                        </>
                      ) : null
                    ) : localStorage.getItem("group_id") == 3 ? (
                      localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ==" ||
                        localStorage.getItem("user_id") == "UbCJcnLM9fe HsRMgX8c1A==" ||
                        localStorage.getItem("user_id") == "wW0geGtDPvig5gF 6KbJrg==" ||
                        localStorage.getItem("user_id") == "z2TunmZQf3QwCsICFTLGGQ==" ||
                        localStorage.getItem("user_id") == "qDgwPdToP05Kgzc g2VjIQ==" 
                       ? (
                        window.location.pathname == "/totalhcp" ||
                          window.location.pathname == "/country-registration" ||
                          window.location.pathname == "/delivery-stats" ||
                          window.location.pathname == "/trending-topics" ||
                          window.location.pathname == "/trending-content" ||
                          window.location.pathname == "/content-type" ||
                          window.location.pathname == "/content-analytics" ||
                          window.location.pathname == "/analytic-trending-topics" ||
                          window.location.pathname == "/analytic-delivery-registration" ||
                          window.location.pathname == "/analytic-delivery-trends" ||
                          window.location.pathname == "/analytic-trending-content" ||
                          window.location.pathname == "/analytic-content-type" ||
                          window.location.pathname == "/campaign-stats" ? (
                          <ul>
                            <li
                              className={
                                location.pathname == "/totalhcp" ? "active" : "side_li"
                              }
                            >
                              <Link to={"/totalhcp"}>
                              <img src= { sidebar_image_path +"total-hcps.svg" } alt=""/>
                              {" "}
                                <p>Total HCPs </p>
                              </Link>
                            </li>
                            <li
                              className={
                                location.pathname == "/country-registration"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link to={"/country-registration"}>
                              <img src= { sidebar_image_path +"sales-by-country.svg" } alt=""/>
                              {" "}
                                <p>Country Registration</p>
                              </Link>
                            </li>
                            <li
                              className={
                                location.pathname == "/campaign-stats" ||
                                  location.pathname == "/analytic-delivery-registration"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link
                                to={
                                  localStorage.getItem("user_id") ==
                                    "B7SHpAc XDXSH NXkN0rdQ=="
                                    ? "/campaign-stats"
                                    : "/analytic-delivery-registration"
                                }
                              >
                                <img src= { sidebar_image_path +"top-content.svg" } alt=""/>
                                {" "}
                                <p>Delivery Registration </p>
                              </Link>
                            </li>
                            <li
                              className={
                                location.pathname == "/delivery-stats" ||
                                  location.pathname == "/analytic-delivery-trends"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link
                                to={
                                  localStorage.getItem("user_id") ==
                                    "B7SHpAc XDXSH NXkN0rdQ=="
                                    ? "/delivery-stats"
                                    : "/analytic-delivery-trends"
                                }
                              >
                               <img src= { sidebar_image_path +"top-content.svg" } alt=""/>
                               {" "}
                                <p>Delivery Trends</p>
                              </Link>
                            </li>
                            <li
                              className={
                                location.pathname == "/trending-topics" ||
                                  location.pathname == "/analytic-trending-topics"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link
                                to={
                                  localStorage.getItem("user_id") ==
                                    "B7SHpAc XDXSH NXkN0rdQ=="
                                    ? "/trending-topics"
                                    : "/analytic-trending-topics"
                                }
                              >
                               <img src= { sidebar_image_path +"top-content.svg" } alt=""/>
                               {" "}
                                <p>Trending Topics</p>
                              </Link>
                            </li>
                            <li
                              className={
                                location.pathname == "/trending-content" ||
                                  location.pathname == "/analytic-trending-content"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link
                                to={
                                  localStorage.getItem("user_id") ==
                                    "B7SHpAc XDXSH NXkN0rdQ=="
                                    ? "/trending-content"
                                    : "/analytic-trending-content"
                                }
                              >
                                 <img src= { sidebar_image_path +"top-content.svg" } alt=""/>
                                 {" "}
                                <p>Trending Content</p>
                              </Link>
                            </li>
                            <li
                              className={
                                location.pathname == "/content-type" ||
                                  location.pathname == "/analytic-content-type"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link
                                to={
                                  localStorage.getItem("user_id") ==
                                    "B7SHpAc XDXSH NXkN0rdQ=="
                                    ? "/content-type"
                                    : "/analytic-content-type"
                                }
                              >
                               <img src= { sidebar_image_path +"content-type.svg" } alt=""/>
                               {" "}
                                <p>Content Type</p>
                              </Link>
                            </li>
                          </ul>
                        ) : null
                      ) :
                      
                      localStorage.getItem("account_type") == "USA_PHARMA"? (
                        window.location.pathname == "/totalhcp" ||
                          window.location.pathname == "/country-registration" ||
                          window.location.pathname == "/campaign-stats" ||
                          window.location.pathname == "/analytic-delivery-trends" ||
                          window.location.pathname == "/delivery-stats" ||
                          // window.location.pathname == "/trending-topics" ||
                          window.location.pathname == "/trending-content" ||
                          // window.location.pathname == "/content-type" ||  
                          window.location.pathname == "/content-analytics"                      
                         ? (
                          <ul>
                            <li
                              className={
                                location.pathname == "/totalhcp" ? "active" : "side_li"
                              }
                            >
                              <Link to={"/totalhcp"}>
                              <img src= { sidebar_image_path +"total-hcps.svg" } alt=""/>
                               {" "}
                                <p>Total HCPs </p>
                              </Link>
                            </li>
                            <li
                              className={
                                location.pathname == "/country-registration"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link to={"/country-registration"}>
                              <img src= { sidebar_image_path +"sales-by-country.svg" } alt=""/>
                              {" "}
                                <p>Country Registration</p>
                              </Link>
                            </li>
                            <li
                              className={
                                location.pathname == "/campaign-stats" 
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link
                                to={"/campaign-stats"}
                              >
                                <img src= { sidebar_image_path +"top-content.svg" } alt=""/>
                                {" "}
                                <p>Delivery Registration </p>
                              </Link>
                            </li>
                            <li
                              className={
                                location.pathname == "/delivery-stats" 
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link
                                to={"/delivery-stats"                              
                                }
                              >
                                 <img src= { sidebar_image_path +"top-content.svg" } alt=""/>
                                 {" "}
                                <p>Delivery Trends</p>
                              </Link>
                            </li>
                            
                            <li
                              className={
                                // location.pathname == "/sunshine-trending-content" 
                                location.pathname == "/trending-content" 
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link
                                to={
                                    // "/sunshine-trending-content"
                                     "/trending-content" 
                                }
                              >
                                <img src= { sidebar_image_path +"top-content.svg" } alt=""/>
                                {" "}
                                <p>Trending Content</p>
                              </Link>
                            </li>
                         
                          </ul>
                        ) : null
                      ) 
                      
                      : localStorage.getItem("user_id") ==
                        "iSnEsKu5gB/DRlycxB6G4g==" ? (
                        window.location.pathname == "/octalatch-totalhcp" ||
                          window.location.pathname == "/octa-country" ||
                          window.location.pathname == "/analytics-events" ||
                          window.location.pathname == "/octa-country-registration" ||
                          window.location.pathname == "/octalatch-deliveryregistration" ||
                          window.location.pathname == "/octa-trending-content" ||
                          window.location.pathname == "/content-analytics" ||
                          window.location.pathname == "/octa-trending-contenty" ? (
                          <ul>
                            <li
                              className={
                                location.pathname == "/octalatch-totalhcp"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link to={"/octalatch-totalhcp"}>
                              <img src= { sidebar_image_path +"total-hcps.svg" } alt=""/>
                              {" "}
                                <p>Total HCPs </p>
                              </Link>
                            </li>

                            <li
                              className={
                                location.pathname == "/octa-country-registration"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link to={"/octa-country-registration"}>
                              <img src= { sidebar_image_path +"sales-by-country.svg" } alt=""/>
                              {" "}
                                <p>Country Registration</p>
                              </Link>
                            </li>

                            <li
                              className={
                                location.pathname == "/octalatch-deliveryregistration"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link to={"/octalatch-deliveryregistration"}>
                              <img src= { sidebar_image_path +"top-content.svg" } alt=""/>
                              {" "}
                                <p>Delivery Registration</p>
                              </Link>
                            </li>

                            <li
                              className={
                                location.pathname == "/octa-trending-content"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link to={"/octa-trending-content"}>
                              <img src= { sidebar_image_path +"top-content.svg" } alt=""/>
                              {" "}
                                <p>Trending Content </p>
                              </Link>
                            </li>

                            <li
                              className={
                                location.pathname == "/octa-country"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link to={"/octa-country"}>
                              <img src= { sidebar_image_path +"top-content.svg" } alt=""/>
                              {" "}
                                <p>Stats By Region</p>
                              </Link>
                            </li>

                            <li
                              className={
                                location.pathname == "/analytics-events"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link to={"/analytics-events"}>
                              <img src= { sidebar_image_path +"top-content.svg" } alt=""/>
                              {" "}
                                <p>Event summary</p>
                              </Link>
                            </li>
                          </ul>
                        ) : null
                      ) :isLikeRdAccount
                        ? (
                          window.location.pathname == "/content-analytics" ||
                            window.location.pathname == "/feedback" ||
                            window.location.pathname == "/trial-analytics" ||
                            window.location.pathname == "/LEX-210-analytics" ? (
                            <ul>
                              {
                               isRdAccount ?
                                  <li
                                    className={
                                      location.pathname == "/LEX-210-analytics"
                                        ? "active"
                                        : "side_li"
                                    }
                                  >
                                    <Link to={"/LEX-210-analytics"}>
                                    <img src= { sidebar_image_path +"trails.svg" } alt=""/>
                                    {" "}
                                    <p>Trials</p>
                                    </Link>
                                  </li>
                                  :
                                  <li
                                    className={
                                      location.pathname == "/trial-analytics"
                                        ? "active"
                                        : "side_li"
                                    }
                                  >
                                    <Link to={"/trial-analytics"}>
                                    <img src= { sidebar_image_path +"trails.svg" } alt=""/>
                                    {" "}
                                      <p>Trials</p>
                                    </Link>
                                  </li>
                              }
                              <li
                                className={
                                  location.pathname == "/content-analytics"
                                    ? "active"
                                    : "side_li"
                                }
                              >
                                <Link to={"/content-analytics"}>
                                <img src= { sidebar_image_path +"analytics.svg" } alt=""/>
                                {" "}
                                  <p>Content Analytics</p>
                                </Link>
                              </li>
                              {
                                localStorage.getItem('user_id') == '56Ek4feL/1A8mZgIKQWEqg==' ?
                                  <li
                                    className={
                                      location.pathname == "/feedback"
                                        ? "active"
                                        : "side_li"
                                    }
                                  >
                                    <Link to={"/feedback"}>
                                    <img src= { sidebar_image_path +"feedback.svg" } alt=""/>
                                    {" "}
                                      <p>Feedback</p>
                                    </Link>
                                  </li>
                                  : null
                              }
                            </ul>
                          ) : null
                        ) : localStorage.getItem("user_id") !==
                          "ref9i5kQrBab/lRKV9H1JA==" ? (
                          <ul>
                            <li
                              className={
                                location.pathname == "/content-analytics"
                                  ? "active"
                                  : "side_li"
                              }
                            >
                              <Link to={"/content-analytics"}>
                              <img src= { sidebar_image_path +"analytics.svg" } alt=""/>
                              {" "}
                                <p>Content Analytics</p>
                              </Link>
                            </li>
                            {localStorage.getItem("user_id") === "IJype v19WASFcSlrfRENQ==" ?
                              <li
                                className={
                                  location.pathname == "/survey/survey-data"
                                    ? "active"
                                    : "side_li"
                                }
                              >
                                <Link to={"/survey/survey-data"}>
                                <img src= { sidebar_image_path +"post-survey.svg" } alt=""/>
                                {" "}
                                  <p>Survey</p>
                                </Link>
                              </li> : ''}
                          </ul>
                        ) : null
                    ) : null}
        </div>

        {/*Help pages for page1 start*/}
        {location.pathname == "/EmailList" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
                <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                {" "}
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library">
                    <div className="help-popup-content-video">
                      <h6>Email overview</h6>
                      <div
                        className="help-content-popup"
                        onClick={() =>
                          setOpenVideoPopup(
                            (getOpenVideoPopup) => !getOpenVideoPopup
                          )
                        }
                      >
                        <a   href="#"
    onClick={(e) => e.preventDefault()}>
                          <img src={video_poster} alt="" />
                        </a>
                      </div>
                    </div>
                    <div className="help-popup-content-list">
                      <p className="help-popup-title">
                        The navigation bar links to:
                      </p>
                      <ul>
                        <li>Email</li>
                        <li>Auto Email</li>
                        <li>Template Builder</li>
                        <li>Smart List</li>
                        <li>Email Results </li>
                      </ul>
                    </div>
                    <div className="help-popup-content-library-inside">
                      <p>
                        This page contains all the emails you draft and send.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        You can create a new email by clicking the Create Email
                        box.
                      </p>
                    </div>

                    <div className="help-popup-find-content">
                      <p className="help-popup-title">
                        There are three types of emails:{" "}
                      </p>
                      <ul>
                        <li>Draft (yellow bar)</li>
                        <li>Approved Draft (Green bar)</li>
                        <li>Send (no colour)</li>
                      </ul>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        Use the Search box quickly identify the right email.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        The Filter By icon narrows down your search by selecting
                        criteria.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        Click the trashcan to delete any draft or email you no
                        longer want.
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                    {" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    
        {location.pathname == "/EmailArticleSelect" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
               <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
               {" "}
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library">
                    <div className="help-popup-content-video">
                      <h6>{title}</h6>
                      <div
                        className="help-content-popup"
                        onClick={() =>
                          setOpenVideoPopup(
                            (getOpenVideoPopup) => !getOpenVideoPopup
                          )
                        }
                      >
                        <a   href="#"
    onClick={(e) => e.preventDefault()}>
                          <img src={video_poster} alt="" />
                        </a>
                      </div>
                    </div>
                    <div className="help-popup-content-library-inside">
                      <p>
                        This page let you pick the correct content to email. As
                        you go to the next page the email will be saved as a
                        draft on the email page (previous page).
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <img src={path_image + "content-select.svg"} alt="" />
                      <p>
                        You can track your progress and navigate back when
                        needed.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>This page shows all the content from your Library.</p>
                    </div>

                    <div className="help-popup-find-content">
                      <img src={path_image + "search-img.svg"} alt="" />
                      <p className="help-popup-title">
                        You can also use the search bar or filter box to find
                        your content.
                      </p>
                    </div>

                    <div className="help-popup-find-content">
                      <img
                        src={path_image + "help/placeholder_content.png"}
                        alt=""
                      />
                      <p className="help-popup-title">
                        Click "Placeholder" box if your content is not ready
                        yet.{" "}
                      </p>
                    </div>

                    <div className="help-popup-find-content">
                      <img src={path_image + "help/pure_content.png"} alt="" />
                      <p className="help-popup-title">
                        Click "Pure text" you don’t want to include any content
                        in your email.
                      </p>
                    </div>

                    <div className="help-popup-find-content">
                      <img
                        src={path_image + "help/sample_content.png"}
                        alt=""
                      />
                      <p className="help-popup-title">
                        Each "Content box" will include the title of the
                        content, subtitle, tag, upload date, language, if a SPC
                        is included, and the date of the last email the content
                        was included in.
                      </p>
                    </div>

                    <div className="help-popup-content-preview">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Preview
                        </a>
                      </div>
                      <p>
                        The "Preview" button will open the Docintel link in a
                        new tab. Please check that you are selecting the correct
                        content.
                      </p>
                    </div>

                    <div className="help-popup-next" id="selected_center_img">
                      <img src={path_image + "help/selected_btn.png"} alt="" />
                      <p className="help-popup-title">
                        Click the checkmark to select the content you want to
                        email and click on the next button to move to the next
                        step.
                      </p>
                    </div>

                    <div className="help-popup-next">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Cancel
                        </a>
                      </div>
                      <p>
                        Click "Cancel" to stop the content selection process. At
                        this stage no Draft will be saved.
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                    {" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
  
        {location.pathname == "/CreateEmail" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
                <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                {" "}
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library">
                    <div className="help-popup-content-video">
                      <h6>{title}</h6>
                      <div
                        className="help-content-popup"
                        onClick={() =>
                          setOpenVideoPopup(
                            (getOpenVideoPopup) => !getOpenVideoPopup
                          )
                        }
                      >
                        <a   href="#"
    onClick={(e) => e.preventDefault()}>
                          <img src={video_poster} alt="" />
                        </a>
                      </div>
                    </div>
                    <div className="help-popup-content-library-inside">
                      <p>
                        This page let you pick your template, craft your email,
                        and correct drafts.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <img
                        src={path_image + "help/selected_template.png"}
                        alt=""
                      />
                      <p>
                        Select the template that you want to use as your email.
                      </p>
                    </div>

                    {/*Adding ul li*/}
                    <div className="help-popup-content-list">
                      <img
                        src={path_image + "help/creating_email.png"}
                        alt=""
                      />
                      <p className="help-popup-title">
                        To manage your campaigns and emails we ask that you
                        enter the following information:
                      </p>
                      <ul>
                        <li>Email description (what is this email about)</li>
                        <li>
                          Email campaign (Is it part of a campaign of many
                          emails? For instance ISTH2022)
                        </li>
                        <li>
                          Email creator (autofills with your login name, but you
                          can change it)
                        </li>
                      </ul>
                    </div>

                    <div className="help-popup-content-preview">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          + Add Tag
                        </a>
                      </div>
                      <p>
                        We use #tags for both analytics and to sort and find
                        emails.Click the "+Add Tags" button to select, remove or
                        add new tags.
                      </p>
                    </div>

                    <div className="help-popup-find-content">
                      <img src={path_image + "help/subject.png"} alt="" />
                      <p className="help-popup-title">
                        Enter the email subject line (this is a draft and you
                        can change it as many times as needed).
                      </p>
                    </div>

                    <div className="help-popup-content-preview">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Save as Template
                        </a>
                      </div>
                      <p>
                        "Save as Template" updates the current template or saves
                        as a new template.{" "}
                      </p>
                    </div>

                    <div className="help-popup-content-preview">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Save as new Template
                        </a>
                      </div>
                      <p>
                        Save as a new template you need to enter a new name for
                        the template that will appear in the template section at
                        the top.
                      </p>
                    </div>

                    <div className="help-popup-content-preview">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Send a Sample
                        </a>
                      </div>
                      <p>
                        "Send a Sample" lets you email your sample for
                        feedback/approval from peers.
                      </p>
                    </div>

                    <div className="help-popup-find-content">
                      <img src={path_image + "help/search_hcp.png"} alt="" />
                      <p>
                        You can search for people by their name or email or
                        both. You can also add a person to your CRM.
                      </p>
                    </div>

                    <div className="help-popup-next">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Save As Draft
                        </a>
                      </div>
                      <p>
                        While you wait for approval you can save your template
                        by clicking the "Save As Draft" button. This action will
                        take you to the main page where you can see your draft
                        email.
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                    {" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    
        {location.pathname == "/SelectHCP" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
               <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
               {" "}
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library">
                    <div className="help-popup-content-video">
                      <h6>{title}</h6>
                      <div
                        className="help-content-popup"
                        onClick={() =>
                          setOpenVideoPopup(
                            (getOpenVideoPopup) => !getOpenVideoPopup
                          )
                        }
                      >
                        <a   href="#"
    onClick={(e) => e.preventDefault()}>
                          <img src={video_poster} alt="" />
                        </a>
                      </div>
                    </div>
                    <div className="help-popup-content-library-inside">
                      <p>
                        This page lets you choose to send to one HCP or a
                        segment of your contacts.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <img src={path_image + "help/selected_hcp.png"} alt="" />
                      <p>
                        Select a group or a single HCP to include in your
                        campaign email.
                      </p>
                    </div>

                    <div className="help-popup-next">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Save As Draft
                        </a>
                      </div>
                      <p>
                        At this stage you can also save you email as a draft by
                        selecting the "Save As Draft" button in the top
                        right-hand corner.
                      </p>
                    </div>

                    <div className="help-popup-next">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Back
                        </a>
                      </div>
                      <p>
                        By selecting the "Back" button you can go back to the
                        previous step to amend your email template.
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                    {" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/*Help Pages for page4 end*/}

        {/*Help Pages for page5 start*/}
        {location.pathname == "/SelectSmartList" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
              <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
              {" "}
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library">
                    <div className="help-popup-content-video">
                      <h6>{title}</h6>
                      {/*
                    <div className="help-content-popup" onClick={() => setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)}>
                      <a   href="#"
    onClick={(e) => e.preventDefault()}>
                        <img src= {video_poster} alt="" />
                      </a>
                    </div>
                    */}
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>Here you select who you will email.</p>
                    </div>
                    <div className="help-popup-content-library-inside">
                      <p>You can see all your existing smart lists.</p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <img src={path_image + "help/smart_list.png"} alt="" />
                      <p>
                        Each smart list will contain key data held on your HCPs.
                        You can also see date and time when the smart list was
                        created, and the number of people included in the list.
                      </p>
                    </div>

                    <div className="help-popup-next">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          View
                        </a>
                      </div>
                      <p>
                        The "View" button opens a window with information about
                        people on your smart list.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <img src={path_image + "help/create_upload.png"} alt="" />
                      <p>
                        To create a new SmartList chose to either
                        <br />
                        "Create New Smart List" from existing HCPs in your
                        lists.
                        <br />
                        or
                        <br />
                        "Upload Excel File" to upload fresh HCP’s
                      </p>
                    </div>

                    <div className="help-popup-content-list">
                      <img src={path_image + "help/upload_list.png"} alt="" />
                      <p></p>
                      <p className="help-popup-title">
                        The "Upload Excel File" button opens a pop-up to:
                      </p>
                      <ul>
                        <li>Name of your SmartList,</li>
                        <li>
                          Name who is creating the list (so you can easily sort
                          or spot your own SmartLists){" "}
                        </li>
                        <li>
                          Upload (and if needed download the template excel so
                          the fields are correctly uploaded).
                        </li>
                      </ul>
                    </div>

                    <div className="help-popup-next">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Create New Smart List
                        </a>
                      </div>
                      <p>
                        "Create New Smart List" will take you to a new screen to
                        segement from your existing lists of HCPs (see Help on
                        that page)
                      </p>
                    </div>

                    <div className="help-popup-next">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Save As Draft
                        </a>
                      </div>
                      <p>
                        You can save the email as a draft by clicking on "Save
                        As Draft". This will take you back to the front page and
                        you can come back any time to this draft.
                      </p>
                    </div>

                    <div className="help-popup-next">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Next
                        </a>
                      </div>
                      <p>
                        To proceed and verify & adjust your new SmartLists click
                        "Next"
                      </p>
                    </div>

                    <div className="help-popup-next">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Cancel
                        </a>
                      </div>
                      <p>
                        If you decide not to create a list click the "Cancel"
                        button and go back to the main page.
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                    {" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    
        {location.pathname == "/SelectSmartListUsers" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
              <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
              {" "}
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library">
                    <div className="help-popup-content-video">
                      <h6>{title}</h6>
                      <div
                        className="help-content-popup"
                        onClick={() =>
                          setOpenVideoPopup(
                            (getOpenVideoPopup) => !getOpenVideoPopup
                          )
                        }
                      >
                        <a   href="#"
    onClick={(e) => e.preventDefault()}>
                          <img src={video_poster} alt="" />
                        </a>
                      </div>
                    </div>
                    <div className="help-popup-content-library-inside">
                      <p>
                        Double checking and adjusting your selected SmartList.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        This lists all the people uploaded or segmented from
                        your existing lists.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <img src={path_image + "help/more_info.png"} alt="" />
                      <p>
                        "Show more information” button you can see more
                        information about your contacts.
                      </p>
                    </div>

                    <div className="help-popup-next">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Sort by{" "}
                          <img
                            src="componentAssets/images/sort.svg"
                            alt="Shorting"
                          />
                        </a>
                      </div>
                      <p>
                        "Sort by" lets you see your contacts in alphabetical
                        order.{" "}
                      </p>
                    </div>

                    <div className="help-popup-next">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Add
                        </a>
                      </div>
                      <p>
                        The "Add" button allows you to add more people, perhaps
                        someone who didn’t match the criteria but you want to
                        reach anyway.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <img src={path_image + "help/add_new_hcp.png"} alt="" />
                      <p>
                        The "Add New HCP" box and enter their details.
                        <br />
                        You can add more than one more HCP by clicking "Add HCP"
                        on the right-hand side. When you finish click "Save".{" "}
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <img src={path_image + "help/add_del.png"} alt="" />
                      <p>
                        You can delete a person from your list by clicking the
                        "Trashcan" on the right side. This will only remove them
                        from the list, they will still be in your database.
                        <br />
                        Click the "Plus" sign to re-join them back onto the list
                        – if you have regrets.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <img src={path_image + "help/edit.png"} alt="" />
                      <p>
                        The "Edit" button allows you to amend information about
                        your contacts. These changes will take effect in your
                        database, so be cautious.
                        <br />
                        Click the "Save" button to keep your changes.
                        <br />
                        Click on "Close" if you don’t want to save your changes.{" "}
                      </p>
                    </div>

                    <div className="help-popup-next">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Next
                        </a>
                      </div>
                      <p>
                        The "Next" button in the top right-hand corner takes you
                        to the next step.{" "}
                      </p>
                    </div>

                    <div className="help-popup-next">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Save as Draft
                        </a>
                      </div>
                      <p>
                        If you need a break click "Save as Draft" and on the
                        front page click "Edit" to start up again.{" "}
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                    {" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/*Help Pages for page6 end*/}

        {/*Help Pages for page8 start*/}
        {(location.pathname == "/VerifyMAIL" ||
          location.pathname == "/verifyMAIL" ||
          location.pathname == "/VerifyHcpMAIL") && (
            <>
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                   <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                   {" "}
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library">
                      <div className="help-popup-content-video">
                        <h6>{title}</h6>
                        <div
                          className="help-content-popup"
                          onClick={() =>
                            setOpenVideoPopup(
                              (getOpenVideoPopup) => !getOpenVideoPopup
                            )
                          }
                        >
                          <a   href="#"
    onClick={(e) => e.preventDefault()}>
                            <img src={video_poster} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          You're ready to send the email.
                          <br />
                          Here is all the information about the email that you
                          want to send.
                        </p>
                      </div>

                      <div className="help-popup-content-library-inside">
                        <p>
                          Please review well before sending, you can still change
                          everything.
                        </p>
                      </div>

                      <div className="help-popup-next">
                        <div className="btn-form">
                          <a
                              href="#"
    onClick={(e) => e.preventDefault()}
                            className="btn btn-primary btn-filled"
                          >
                            Approved?
                          </a>
                        </div>
                        <p>
                          If you've been preparing it for sending later you can
                          click the "Approved?" so you can easily identify it and
                          send later.
                        </p>
                      </div>

                      <div className="help-popup-next">
                        <div className="btn-form">
                          <a
                              href="#"
    onClick={(e) => e.preventDefault()}
                            className="btn btn-primary btn-filled"
                          >
                            Save As Draft
                          </a>
                        </div>
                        <p>
                          You can still save your email as draft by clicking on
                          the "Save As Draft" button in the top right-hand corner.
                        </p>
                      </div>

                      <div className="help-popup-next">
                        <div className="btn-form">
                          <a
                              href="#"
    onClick={(e) => e.preventDefault()}
                            className="btn btn-primary btn-filled"
                          >
                            Send
                          </a>
                        </div>
                        <p>
                          If you’re ready click "Send" and let those HCPs hear
                          from you.{" "}
                        </p>
                      </div>
                    </div>
                    <div
                      className="help-popup-close"
                      onClick={() =>
                        setHideShowSideContent(
                          (getHideShowSideContent) => !getHideShowSideContent
                        )
                      }
                    >
                      <a   href="#"
    onClick={(e) => e.preventDefault()}>
                      <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                      {" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        {/*Help Pages for page8 end*/}

        {/*Help Pages for Smart list upload Excel start*/}
        {location.pathname == "/CreateSmartList" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
                 <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                 {" "}
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library">
                    <div className="help-popup-content-video">
                      <h6>{title}</h6>
                      <div
                        className="help-content-popup"
                        onClick={() =>
                          setOpenVideoPopup(
                            (getOpenVideoPopup) => !getOpenVideoPopup
                          )
                        }
                      >
                        <a   href="#"
    onClick={(e) => e.preventDefault()}>
                          <img src={video_poster} alt="" />
                        </a>
                      </div>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        Enter SmartList name in the box so you can find it
                        again.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <img
                        src={path_image + "help/creator_name_t.png"}
                        alt=""
                      />
                      <p>
                        Creator name is automatically what is account name, but
                        you can change it if needed.
                      </p>
                    </div>

                

                    <div className="help-popup-content-list">
                      <p className="help-popup-title">
                        Two ways to create a new list:
                      </p>
                      <ul>
                        <li>
                          Segment from existing Readers (see further after
                          clicking it).
                        </li>
                        <li>
                          Upload new list of HCPs (continue to read below)
                        </li>
                      </ul>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <img src={path_image + "help/download_file.png"} alt="" />
                      <p>
                        To upload a new list, please download the template
                        first.This ensure the data is uploaded correctly and
                        seamlessly match into the system.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        When your list is ready click the big button and select
                        your file.
                      </p>
                    </div>

                    <div className="help-popup-content-preview">
                      <div className="btn-form">
                        <a
                            href="#"
    onClick={(e) => e.preventDefault()}
                          className="btn btn-primary btn-filled"
                        >
                          Next
                        </a>
                      </div>
                      <p>
                        After selecting you click next to go to start writing
                        the email.
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path + "question-mark.svg" } alt=""/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/*Help Pages for Smart list upload Excel end*/}

        {/*Help Pages for filter segment start*/}
        {location.pathname == "/SmartListFilter" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
                <img src= { sidebar_image_path + "question-mark.svg" } alt=""/>
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library">
                    <div className="help-popup-content-video">
                      <h6>{title}</h6>
                      <div
                        className="help-content-popup"
                        onClick={() =>
                          setOpenVideoPopup(
                            (getOpenVideoPopup) => !getOpenVideoPopup
                          )
                        }
                      >
                        <a   href="#"
    onClick={(e) => e.preventDefault()}>
                          <img src={video_poster} alt="" />
                        </a>
                      </div>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>Select the people that you want to email.</p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        A list of people will appear at the bottom of the screen
                        based on your selected criteria. You can go back and
                        edit your criteria to select more people for your list.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        You can download an Excel file with your selected
                        contacts.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        You can add a new person to your smart list or remove
                        them easily.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        The edit button allows you to scrutinize your list of
                        contacts and further amend if necessary.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        By clicking on the sort by button you will be able to
                        see contacts in alphabetic order.
                      </p>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        When you are done creating your list click the create or
                        cancel icon in the top right-hand corner if you do not
                        want to go ahead.
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path + "cross.svg" } alt=""/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/*Help Pages for filter segment end*/}
        {/*Help Pages for filter segment start*/}
        {location.pathname == "/set-popup" && (
          <>
            {localStorage.getItem("group_id") == 3 && selectedItem ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                  <img src= { sidebar_image_path + "question-mark.svg" } alt=""/>
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                      <div className="help-popup-content-video">
                        <h6>Create content</h6>
                        <div
                          className="help-content-popup"
                          onClick={() =>
                            setOpenVideoPopup(
                              (getOpenVideoPopup) => !getOpenVideoPopup
                            )
                          }
                        >
                          <a   href="#"
    onClick={(e) => e.preventDefault()}>
                            <img src={video_poster} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Steps 2 :</strong> “Edit Consent Options”
                        </p>
                        <p>
                          Proceed to the next step to customise settings like{" "}
                        </p>
                        <ul style={{ margin: "0 0 9px" }}>
                          <li>consent type</li>
                          <li>language</li>
                          <li>pop-up appearance time</li>
                        </ul>
                        <p>Select the pop-up and edit text if needed.</p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <Button className="btn-filled">Save</Button>
                        <p>
                          <span>
                            Click “Save”, when you do any editing to the pop-up.{" "}
                          </span>
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <div className="d-flex align-items-center justify-content-center button-group">
                          <Button className="btn-bordered small">Back</Button>
                          <Button className="btn-filled small">Next</Button>
                        </div>

                        <p>
                          <span>
                            Click “Next” to proceed to the final step or “Back”
                            to go back to the previous step.
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="help-popup-close"
                      onClick={() =>
                        setHideShowSideContent(
                          (getHideShowSideContent) => !getHideShowSideContent
                        )
                      }
                    >
                      <a   href="#"
    onClick={(e) => e.preventDefault()}>
                      <img src= { sidebar_image_path + "cross.svg" } alt=""/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : localStorage.getItem("group_id") == 3 ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                  <img src= { sidebar_image_path + "question-mark.svg" } alt=""/>
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                      <div className="help-popup-content-video">
                        <h6>{title}</h6>
                        <div
                          className="help-content-popup"
                          onClick={() =>
                            setOpenVideoPopup(
                              (getOpenVideoPopup) => !getOpenVideoPopup
                            )
                          }
                        >
                          <a   href="#"
    onClick={(e) => e.preventDefault()}>
                            <img src={video_poster} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="help-popup-content-library-inside library-p publisher">
                        <p>
                          <strong>
                            This page allows you to make changes to your
                            standard consent and pop-up texts
                          </strong>
                        </p>
                        <br />
                        <p>
                          <strong>To set your pop-up:</strong>
                        </p>
                        <ul>
                          <li>
                            Select the language you want your pop-ups to appear
                            in
                          </li>
                          <li>
                            Choose the type of pop-up you wish to create or
                            modify
                          </li>
                          <li>Edit the text of the pop-up if needed</li>
                        </ul>
                        <br />
                        <Button className="btn-filled small">Save</Button>
                        <p style={{ textAlign: "center" }}>
                          <span>Once completed, click “Save”.</span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="help-popup-close"
                      onClick={() =>
                        setHideShowSideContent(
                          (getHideShowSideContent) => !getHideShowSideContent
                        )
                      }
                    >
                      <a   href="#"
    onClick={(e) => e.preventDefault()}>
                      <img src= { sidebar_image_path + "cross.svg" } alt=""/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {localStorage.getItem("group_id") == 2 && selectedItem ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                  <img src= { sidebar_image_path + "question-mark.svg" } alt=""/>
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                       
                      <div className="help-popup-content-library-inside">
                        <h6>Create content</h6>
                        <br />
                        <p>
                          <strong>Steps 2 :</strong> “Edit Consent Options”
                        </p>
                        <p>
                          Proceed to the next step to customise settings like{" "}
                        </p>
                        <ul style={{ margin: "0 0 9px" }}>
                          <li>consent type</li>
                          <li>language</li>
                          <li>pop-up appearance time</li>
                        </ul>
                        <p>Select the pop-up and edit text if needed.</p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <Button className="btn-filled">Save</Button>
                        <p>
                          <span>
                            Click “Save”, when you do any editing to the pop-up.{" "}
                          </span>
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <div className="d-flex align-items-center justify-content-center button-group">
                          <Button className="btn-bordered small">Back</Button>
                          <Button className="btn-filled small">Next</Button>
                        </div>

                        <p>
                          <span>
                            Click “Next” to proceed to the final step or “Back”
                            to go back to the previous step.
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="help-popup-close"
                      onClick={() =>
                        setHideShowSideContent(
                          (getHideShowSideContent) => !getHideShowSideContent
                        )
                      }
                    >
                      <a   href="#"
    onClick={(e) => e.preventDefault()}>
                      <img src= { sidebar_image_path + "edit-consent.svg" } alt=""/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : localStorage.getItem("group_id") == 2 ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                 <img src= { sidebar_image_path + "question-mark.svg" } alt=""/>
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                       
                      <div className="help-popup-content-library-inside">
                        <h6>Set Popup</h6>
                        <br />
                        <p>
                          <strong>
                            This page allows you to make changes to your
                            standard consent and pop-up texts
                          </strong>
                        </p>
                        <br />
                        <p>
                          <strong>To set your pop-up:</strong>
                        </p>
                        <ul>
                          <li>
                            Select the language you want your pop-ups to appear
                            in
                          </li>
                          <li>
                            Choose the type of pop-up you wish to create or
                            modify
                          </li>
                          <li>Edit the text of the pop-up if needed</li>
                        </ul>
                        <br />
                        <Button className="btn-filled small">Save</Button>
                        <p style={{ textAlign: "center" }}>
                          <span>Once completed, click “Save”.</span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="help-popup-close"
                      onClick={() =>
                        setHideShowSideContent(
                          (getHideShowSideContent) => !getHideShowSideContent
                        )
                      }
                    >
                      <a   href="#"
    onClick={(e) => e.preventDefault()}>
                      <img src= { sidebar_image_path + "cross.svg" } alt=""/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
 
        {location.pathname == "/library-sublink" && (
          <>
            {localStorage.getItem("group_id") == 3 ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                 <img src= { sidebar_image_path + "librray-sublink-popup.svg" } alt=""/>
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                      <div className="help-popup-content-video">
                        <h6>{title}</h6>
                        <div
                          className="help-content-popup"
                          onClick={() =>
                            setOpenVideoPopup(
                              (getOpenVideoPopup) => !getOpenVideoPopup
                            )
                          }
                        >
                          <a   href="#"
    onClick={(e) => e.preventDefault()}>
                            <img src={video_poster} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>
                            A Sublink is a unique link that leads to the main
                            link, and can be tracked separately. It can be
                            useful for events, promotion, social media etc.
                          </strong>
                        </p>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>
                            To create new sublink for your content:
                          </strong>
                        </p>
                        <p>
                          By choosing the content you wish to create a sub-link
                          of, either from the:
                        </p>
                        <ul>
                          <li>Title</li>
                          <li>Content URL</li>
                        </ul>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          On the right-hand side of the screen, you'll find a
                          list of all the sub-links you've previously created.
                          Each sub-link will feature with:
                        </p>
                        <img src={path_image + "docintel-link.png"} alt="" />
                        <ul>
                          <li>Title and link</li>
                          <li>Copy icon to copy the link quickly</li>
                        </ul>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <img
                          className="qr-download"
                          src={path_image + "qr-code-download.png"}
                          alt=""
                        />
                        <p>
                          <span>
                            Click on the download icon to download the sublink
                            QR
                          </span>
                        </p>
                        <Button className="btn-bordered white">
                          Analytics
                        </Button>
                        <p>
                          <span>
                            Your “Analytics” button will take you to the
                            analytics page of the sublink.
                          </span>
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <Button className="btn-filled">
                          Create New Link +
                        </Button>
                        <p>
                          <span>
                            Click on “Create New Link” to reveal a pop-up that
                            allows you to create a new sublink for the selected
                            content.
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="help-popup-close"
                      onClick={() =>
                        setHideShowSideContent(
                          (getHideShowSideContent) => !getHideShowSideContent
                        )
                      }
                    >
                      <a   href="#"
    onClick={(e) => e.preventDefault()}>
                      <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                      {" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {localStorage.getItem("group_id") == 2 ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                  <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                  {" "}
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                      
                      <div className="help-popup-content-library-inside library-p publisher">
                        <p>
                          <strong>
                            A Sublink is a unique link that leads to the main
                            link, and can be tracked separately. It can be
                            useful for events, promotion, social media etc.
                          </strong>
                        </p>
                        <br />
                        <p>
                          <strong>
                            To create new sublink for your content:
                          </strong>
                          <br />
                          By choosing the content you wish to create a sub-link
                          of, either from the:
                        </p>
                        <ul>
                          <li>Title</li>
                          <li>Content URL</li>
                        </ul>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          On the right-hand side of the screen, you'll find a
                          list of all the sub-links you've previously created.
                          Each sub-link will feature with:
                        </p>
                        <img src={path_image + "docintel-link.png"} alt="" />
                        <ul>
                          <li>Title and link</li>
                          <li>Copy icon to copy the link quickly</li>
                        </ul>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <img
                          className="qr-download"
                          src={path_image + "qr-code-download.png"}
                          alt=""
                        />
                        <p>
                          <span>
                            Click on the download icon to download the sublink
                            QR
                          </span>
                        </p>
                        <Button className="btn-bordered">Analytics</Button>
                        <p>
                          <span>
                            Your “Analytics” button will take you to the
                            analytics page of the sublink.{" "}
                          </span>
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <Button className="btn-filled">
                          Create New Link +
                        </Button>
                        <p>
                          <span>
                            Click on “Create New Link” to reveal a pop-up that
                            allows you to create a new sublink for the selected
                            content.
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="help-popup-close"
                      onClick={() =>
                        setHideShowSideContent(
                          (getHideShowSideContent) => !getHideShowSideContent
                        )
                      }
                    >
                      <a   href="#"
    onClick={(e) => e.preventDefault()}>
                      <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                      {" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
       
        {location.pathname == "/library-content" && (
          <>
            {localStorage.getItem("group_id") == 3 ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                 <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                 {" "}
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                      <div className="help-popup-content-video">
                        <h6>{title}</h6>
                        <div
                          className="help-content-popup"
                          onClick={() =>
                            setOpenVideoPopup(
                              (getOpenVideoPopup) => !getOpenVideoPopup
                            )
                          }
                        >
                          <a   href="#"
    onClick={(e) => e.preventDefault()}>
                            <img src={video_poster} alt="" />
                          </a>
                        </div>
                      </div>

                      <div className="help-popup-content-library-inside pharma">
                        <p>
                          <strong>Three main Sections:</strong>
                        </p>
                        <ul>
                          <li>Content</li>
                          <li>Create & Change</li>
                          <li>Products and Tags</li>
                        </ul>
                      </div>

                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Content Section</strong>
                          <br />
                          In this page, you can access the all the content you
                          have created. Each content card includes:
                        </p>
                        <ul>
                          <li>Content cover</li>
                          <li>Title</li>
                          <li>Subtitle</li>
                          <li>Author name</li>
                          <li>Selected tag</li>
                        </ul>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <p>On your content cards you will find four tabs:</p>
                        <img
                          src={path_image + "pharma-content-card.png"}
                          alt=""
                        />
                      </div>

                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Docintel Link Tab</strong>
                        </p>
                        <ul>
                          <li>
                            <strong>The main Docintel link to share</strong>
                          </li>
                          <li>
                            <strong>Upload date</strong>
                          </li>
                          <li>
                            <strong>inforMedGO link</strong> - When entered in
                            the inforMedGO app (free in the app store) it allows
                            sharing the content with a HCP and gathering
                            consent.
                          </li>
                          <li>
                            <strong>Docintel Code</strong> - When entered in the
                            Docintel app (free in the app stores and online in
                            browsers) it ask the HCP to give consent and gives
                            access the content through their private Docintel
                            account.
                          </li>
                          <li>
                            <strong>Language of the content</strong>
                          </li>
                          <li>
                            <strong>Link Type</strong> - Tells the level of
                            consent requested from the HCP.
                          </li>
                          <li>
                            <strong>Enhanced</strong> - Identifying if the
                            content contains: SPC{" "}
                            <img src={path_image + "spc-img.png"} alt="" />,
                            videos{" "}
                            <img src={path_image + "video-img.png"} alt="" />{" "}
                            and links{" "}
                            <img src={path_image + "link-img.png"} alt="" />.
                          </li>
                        </ul>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          At the bottom of the content card you will find three
                          buttons:
                        </p>
                        <Button className="btn-bordered white">
                          Preview article
                        </Button>
                        <p>
                          <span>
                            Opens content in a new tab for preview. Usage is not
                            tracked.
                          </span>
                        </p>
                        <Button className="btn-bordered white">
                          Download QR
                        </Button>
                        <p>
                          <span>
                            To generate and download a QR code for the content.
                          </span>
                        </p>
                        <Button className="btn-bordered white">
                          Send in email
                        </Button>
                        <p>
                          <span>
                            Directs you to the email engine to send the content
                            via email.
                          </span>
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Data Tab</strong>
                          <br />
                          Click to access detailed analytics of the selected
                          content including. See{" "}
                          <img
                            src={path_image + "info_circle_icon.svg"}
                            alt=""
                          />{" "}
                          for details :
                        </p>
                        <ul>
                          <li>Total Openings</li>
                          <li>Total Unique Readers</li>
                          <li>Registered Readers</li>
                          <li>SubLinks</li>
                          <li>Downloaded (if enabled)</li>
                          <li>Printed (if enabled)</li>
                        </ul>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <p>At the bottom of the Data tab are two buttons:</p>

                        <Button className="btn-bordered white">
                          Analytics
                        </Button>
                        <p>
                          <span>
                            This takes you to the analytics page, revealing the
                            analytics of the selected content.
                          </span>
                        </p>
                        <Button className="btn-bordered btn-voilet white">
                          Reset the collected data
                        </Button>
                        <p className="voilet-text">
                          Deletes usage, users and any other collected data for
                          the selected content. Be careful.
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Change Tab</strong>
                          <br />
                          This tab allows you to make changes to your content.
                        </p>
                        <Button className="btn-filled">Update</Button>
                        <p>
                          <span>
                            You can change the consent type and clicking
                            “Update” to secure your changes.
                          </span>
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <p>At the bottom three buttons:</p>
                        <Button className="btn-bordered white">
                          Edit Docintel link
                        </Button>
                        <p>
                          <span>
                            Redirects you to the creation page, allowing you to
                            make changes to the content.
                          </span>
                        </p>
                        <Button className="btn-bordered white">
                          Add / remove tags
                        </Button>
                        <p>
                          <span>
                            Opens Tags pop-up where you can add new or remove
                            tags from your content. Tags are useful for users to
                            filter content by if they have a library, for
                            tracking usage, and for AI to learn from.{" "}
                          </span>
                        </p>
                        <Button className="btn-bordered white">
                          New sublink
                        </Button>
                        <p>
                          <span>
                            Redirects you to the New Sublinks page to create a
                            new sublink for your content.
                          </span>
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>About Tab</strong>
                          <br />
                          Provides further information about the content.
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Search and Filter</strong>
                        </p>
                        <img src={path_image + "searchbar.png"} alt="" />
                        <p>
                          <span>
                            On the right of the page, you will find the search
                            bar and filter by to locate specific content by
                            title or other criteria.
                          </span>
                        </p>
                        <img
                          className="filter-tags"
                          src={path_image + "tag-selected.png"}
                          alt=""
                        />
                        <p>
                          <span>
                            After filtering you can undo a filter by clicking
                            the purple <b>x</b> for each filter criteria (it
                            re-filters then).
                          </span>
                        </p>
                        <Button className="btn-bordered">Remove All</Button>
                        <p>
                          <span>
                            Or click the “Remove All” button to see everything
                            again.
                          </span>
                        </p>
                        <p>
                          Should have need for more custom filters please open a
                          ticket in the upper right corner, or email your
                          contact.
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Delete content</strong>
                        </p>
                        <img
                          className="dleete-btn"
                          src={path_image + "delete-button.png"}
                          alt=""
                        />
                        <p>
                          <span>
                            Besides the search bar and filter you will find a
                            rubbish bin for your deletion purposes. Once
                            clicked, this will activate the ability to delete
                            any content.
                          </span>
                        </p>
                        <Button className="btn-bordered small">Cancel</Button>
                        <p>
                          <span>
                            By clicking “Cancel” to leave deletion mode.
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="help-popup-close"
                      onClick={() =>
                        setHideShowSideContent(
                          (getHideShowSideContent) => !getHideShowSideContent
                        )
                      }
                    >
                      <a   href="#"
    onClick={(e) => e.preventDefault()}>
                      <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                      {" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {localStorage.getItem("group_id") == 2 ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                 <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                 {" "}
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                      
                      <div className="help-popup-content-library-inside library-p publisher">
                        <p>
                          <strong>Library overview</strong>
                        </p>
                        <p>
                          The Library is for you to create samples to share with
                          clients.
                          <br />
                          If it’s a sale please go to <strong>
                            Licensed
                          </strong>{" "}
                          and use Create & Change.
                        </p>
                        <p>
                          <strong>Two main Sections:</strong>
                        </p>
                        <ul>
                          <li>Content</li>
                          <li>Create & Change</li>
                        </ul>
                      </div>

                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Content Section</strong>
                          <br />
                          In this page, you can access the all the content you
                          have created. Each content card includes:
                        </p>
                        <ul>
                          <li>Content cover</li>
                          <li>Title</li>
                          <li>Subtitle</li>
                          <li>Author name</li>
                        </ul>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <p>On your content cards you will find four tabs:</p>
                        <img
                          src={path_image + "pharma-content-card.png"}
                          alt=""
                        />
                      </div>

                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Docintel Link Tab</strong>
                        </p>
                        <ul>
                          <li>
                            <strong>The main Docintel link to share</strong>
                          </li>
                          <li>
                            <strong>Upload date</strong>
                          </li>
                          <li>
                            <strong>inforMedGO link</strong> - When entered in
                            the inforMedGO app (free in the app store) it allows
                            sharing the content with a HCP and gathering
                            consent.
                          </li>
                          <li>
                            <strong>Docintel Code</strong> - When entered in the
                            Docintel app (free in the app stores and online in
                            browsers) it ask the HCP to give consent and gives
                            access the content through their private Docintel
                            account.
                          </li>
                          <li>
                            <strong>Language of the content</strong>
                          </li>
                          <li>
                            <strong>Link Type</strong> - Tells the level of
                            consent requested from the HCP.
                          </li>
                          <li>
                            <strong>Enhanced</strong> - Identifying if the
                            content contains: SPC{" "}
                            <img src={path_image + "spc-img.png"} alt="" />,
                            videos{" "}
                            <img src={path_image + "video-img.png"} alt="" />{" "}
                            and links{" "}
                            <img src={path_image + "link-img.png"} alt="" />.
                          </li>
                        </ul>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          At the bottom of the content card you will find three
                          buttons:
                        </p>

                        <Button className="btn-bordered white">
                          Preview article
                        </Button>
                        <p>
                          <span>
                            Opens content in a new tab for preview. Usage is not
                            tracked.
                          </span>
                        </p>
                        <Button className="btn-bordered white">
                          Download QR
                        </Button>
                        <p>
                          <span>
                            To generate and download a QR code for the content.
                          </span>
                        </p>
                        <Button className="btn-bordered white">
                          Send in email
                        </Button>
                        <p>
                          <span>
                            Directs you to the email engine to send the content
                            via email.
                          </span>
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Data Tab</strong>
                          <br />
                          Click to access detailed analytics of the selected
                          content including. See{" "}
                          <img
                            src={path_image + "info_circle_icon.svg"}
                            alt=""
                          />{" "}
                          for details :
                        </p>
                        <ul>
                          <li>Total Openings</li>
                          <li>Total Unique Readers</li>
                          <li>Registered Readers</li>
                          <li>SubLinks</li>
                          <li>Downloaded (if enabled)</li>
                          <li>Printed (if enabled)</li>
                        </ul>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <p>At the bottom of the Data tab are two buttons:</p>

                        <Button className="btn-bordered white">
                          Analytics
                        </Button>
                        <p>
                          <span>
                            This takes you to the analytics page, revealing the
                            analytics of the selected content.
                          </span>
                        </p>
                        <Button className="btn-bordered btn-voilet white">
                          Reset the collected data
                        </Button>
                        <p className="voilet-text">
                          Deletes usage, users and any other collected data for
                          the selected content. Be careful.
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Change Tab</strong>
                          <br />
                          This tab allows you to make changes to your content.
                        </p>
                        <Button className="btn-filled">Update</Button>
                        <p>
                          <span>
                            You can change the consent type and clicking
                            “Update” to secure your changes.
                          </span>
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <p>At the bottom three buttons:</p>
                        <Button className="btn-bordered white">
                          Edit Docintel link
                        </Button>
                        <p>
                          <span>
                            Redirects you to the creation page, allowing you to
                            make changes to the content.
                          </span>
                        </p>
                        <Button className="btn-bordered white">
                          Add / remove tags
                        </Button>
                        <p>
                          <span>
                            Opens Tags pop-up where you can add new or remove
                            tags from your content. Tags are useful for users to
                            filter content by if they have a library, for
                            tracking usage, and for AI to learn from.{" "}
                          </span>
                        </p>
                        <Button className="btn-bordered white">
                          New sublink
                        </Button>
                        <p>
                          <span>
                            Redirects you to the New Sublinks page to create a
                            new sublink for your content.
                          </span>
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>About Tab</strong>
                          <br />
                          Provides further information about the content.
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Search and Filter</strong>
                        </p>
                        <img src={path_image + "searchbar.png"} alt="" />
                        <p>
                          <span>
                            On the right of the page, you will find the search
                            bar and filter by to locate specific content by
                            title or other criteria.
                          </span>
                        </p>
                        <img
                          className="filter-tags"
                          src={path_image + "tag-selected.png"}
                          alt=""
                        />
                        <p>
                          <span>
                            After filtering you can undo a filter by clicking
                            the purple <b>x</b> for each filter criteria (it
                            re-filters then).
                          </span>
                        </p>
                        <Button className="btn-bordered">Remove All</Button>
                        <p>
                          <span>
                            Or click the “Remove All” button to see everything
                            again.
                          </span>
                        </p>
                        <p>
                          Should have need for more custom filters please open a
                          ticket in the upper right corner, or email your
                          contact.
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Delete content</strong>
                        </p>
                        <img
                          className="dleete-btn"
                          src={path_image + "delete-button.png"}
                          alt=""
                        />
                        <p>
                          <span>
                            Besides the search bar and filter you will find a
                            rubbish bin for your deletion purposes. Once
                            clicked, this will activate the ability to delete
                            any content.
                          </span>
                        </p>
                        <Button className="btn-bordered small">Cancel</Button>
                        <p>
                          <span>
                            By clicking “Cancel” to leave deletion mode.
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="help-popup-close"
                      onClick={() =>
                        setHideShowSideContent(
                          (getHideShowSideContent) => !getHideShowSideContent
                        )
                      }
                    >
                      <a   href="#"
    onClick={(e) => e.preventDefault()}>
                      <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                      {" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
   
        {location.pathname == "/license-content" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
               <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
               {" "}
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library library-p">
                    

                    <div className="help-popup-content-library-inside library-p publisher">
                      <h6>Licensed content</h6>
                      <p>
                        This module is for all your sales. Here you can set the
                        limits you’ve agreed with your client. When the limits
                        are near (date and/or usage) you will get alerted via
                        email.
                      </p>
                      <br />
                      <p>
                        <strong>Two main Sections:</strong>
                      </p>
                      <ul>
                        <li>Content</li>
                        <li>Create & Change</li>
                      </ul>
                      <br />
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        <strong>Content Section</strong>
                        <br />
                        In this page, you can access the all the content you
                        have created. Each content card includes:
                      </p>
                      <ul>
                        <li>Content cover</li>
                        <li>Title</li>
                        <li>Subtitle</li>
                        <li>Author name</li>
                      </ul>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <p>On your content cards you will find four tabs:</p>
                      <img
                        src={path_image + "pharma-content-card.png"}
                        alt=""
                      />
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        <strong>Docintel Link Tab</strong>
                      </p>
                      <ul>
                        <li>Displays the link for sharing</li>
                        <li>Upload date</li>
                        <li>inforMedGO link</li>
                        <li>Docintel Code</li>
                        <li>Language of the content</li>
                        <li>Link Type</li>
                        <li>
                          Enhanced (Identifying if the content contains: SPC{" "}
                          <img src={path_image + "spc-img.png"} alt="" />,
                          videos{" "}
                          <img src={path_image + "video-img.png"} alt="" /> and
                          links <img src={path_image + "link-img.png"} alt="" />
                          .)
                        </li>
                      </ul>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <p>
                        At the bottom of the content card you will find three
                        buttons:
                      </p>
                      <Button className="btn-bordered">Preview article</Button>
                      <p>
                        <span>
                          Opens content in a new tab for preview. Usage is not
                          tracked.
                        </span>
                      </p>
                      <Button className="btn-bordered">Download QR</Button>
                      <p>
                        <span>
                          To generate and download a QR code for the content.
                        </span>
                      </p>
                      <Button className="btn-bordered">Send in email</Button>
                      <p>
                        <span>
                          Directs you to the email engine to send the content
                          via email.
                        </span>
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <p>
                        <strong>Data Tab</strong>
                        <br />
                        Click to access detailed analytics of the selected
                        content including. See{" "}
                        <img
                          src={path_image + "info_circle_icon.svg"}
                          alt=""
                        />{" "}
                        for details :
                      </p>
                      <ul>
                        <li>Total Openings</li>
                        <li>Total Unique Readers</li>
                        <li>Registered Readers</li>
                        <li>SubLinks</li>
                        <li>Downloaded (if enabled)</li>
                        <li>Printed (if enabled)</li>
                      </ul>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <p>At the bottom of the Data tab are two buttons:</p>
                      <Button className="btn-bordered">Analytics</Button>
                      <p>
                        <span>
                          This takes you to the analytics page, revealing the
                          analytics of the selected content.
                        </span>
                      </p>
                      <Button className="btn-bordered btn-voilet">
                        Reset the collected data
                      </Button>
                      <p className="voilet-text">
                        Deletes usage, users and any other collected data for
                        the selected content. Be careful.
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <p>
                        <strong>Change Tab</strong>
                        <br />
                        This tab allows you to make changes to your content.
                      </p>
                      <Button className="btn-filled">Update</Button>
                      <p>
                        <span>
                          You can change the consent type and clicking “Update”
                          to secure your changes.
                        </span>
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <p>At the bottom three buttons:</p>
                      <Button className="btn-bordered">
                        Edit Docintel link
                      </Button>
                      <p>
                        <span>
                          Redirects you to the creation page, allowing you to
                          make changes to the content.
                        </span>
                      </p>
                      <Button className="btn-bordered">
                        Add / remove tags
                      </Button>
                      <p>
                        <span>
                          Opens Tags pop-up where you can add new or remove tags
                          from your content. Tags are useful for users to filter
                          content by if they have a library, for tracking usage,
                          and for AI to learn from.{" "}
                        </span>
                      </p>
                      <Button className="btn-bordered">New sublink</Button>
                      <p>
                        <span>
                          Redirects you to the New Sublinks page to create a new
                          sublink for your content.
                        </span>
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <p>
                        <strong>About Tab</strong>
                        <br />
                        Provides further information about the content.
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <p>
                        <strong>Search and Filter</strong>
                      </p>
                      <img src={path_image + "searchbar.png"} alt="" />
                      <p>
                        <span>
                          On the right of the page, you will find the search bar
                          and filter by to locate specific content by title or
                          other criteria.
                        </span>
                      </p>
                      <img
                        className="filter-tags"
                        src={path_image + "tag-selected.png"}
                        alt=""
                      />
                      <p>
                        <span>
                          After filtering you can undo a filter by clicking the
                          purple <b>x</b> for each filter criteria (it
                          re-filters then).
                        </span>
                      </p>
                      <Button className="btn-bordered">Remove All</Button>
                      <p>
                        <span>
                          Or click the “Remove All” button to see everything
                          again.
                        </span>
                      </p>
                      <p>
                        Should have need for more custom filters please open a
                        ticket in the upper right corner, or email your contact.
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <p>
                        <strong>Delete content</strong>
                      </p>
                      <img
                        className="dleete-btn"
                        src={path_image + "delete-button.png"}
                        alt=""
                      />
                      <p>
                        <span>
                          Besides the search bar and filter you will find a
                          rubbish bin for your deletion purposes. Once clicked,
                          this will activate the ability to delete any content.
                        </span>
                      </p>
                      <Button className="btn-bordered">Cancel</Button>
                      <p>
                        <span>
                          By clicking “Cancel” to leave deletion mode.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                    {" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {location.pathname == "/license-set-popup" && selectedItem ? (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
                <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                {" "}
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library library-p">
                     
                    <div className="help-popup-content-library-inside">
                      <p>
                        <strong>Steps 2 :</strong> “Edit Consent Options”
                      </p>
                      <p>
                        Proceed to the next step to customise settings like{" "}
                      </p>
                      <ul style={{ margin: "0 0 9px" }}>
                        <li>consent type</li>
                        <li>language</li>
                        <li>pop-up appearance time</li>
                      </ul>
                      <p>Select the pop-up and edit text if needed.</p>
                    </div>
                    <div className="dotted-line">&nbsp;</div>
                    <div className="help-popup-content-library-inside">
                      <Button className="btn-filled">Save</Button>
                      <p>
                        <span>
                          Click “Save”, when you do any editing to the pop-up.{" "}
                        </span>
                      </p>
                    </div>
                    <div className="dotted-line">&nbsp;</div>
                    <div className="help-popup-content-library-inside">
                      <div className="d-flex align-items-center justify-content-center button-group">
                        <Button className="btn-bordered small">Back</Button>
                        <Button className="btn-filled small">Next</Button>
                      </div>

                      <p>
                        <span>
                          Click “Next” to proceed to the final step or “Back” to
                          go back to the previous step.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                    {" "}
                    </a>
                  </div>
                </div>
                <div
                  className="help-popup-close"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                  <a   href="#"
    onClick={(e) => e.preventDefault()}>
                  <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                  {" "}
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : location.pathname == "/license-set-popup" ? (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
                <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                {" "}
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library library-p">
                   
                    <div className="help-popup-content-library-inside">
                      <h6>Set Popup</h6>
                      <br />
                      <p>
                        <strong>
                          This page allows you to make changes to your standard
                          consent and pop-up texts
                        </strong>
                      </p>
                      <br />
                      <p>
                        <strong>To set your pop-up:</strong>
                      </p>
                      <ul>
                        <li>
                          Select the language you want your pop-ups to appear in
                        </li>
                        <li>
                          Choose the type of pop-up you wish to create or modify
                        </li>
                        <li>Edit the text of the pop-up if needed</li>
                      </ul>
                      <br />
                      <Button className="btn-filled small">Save</Button>
                      <p style={{ textAlign: "center" }}>
                        <span>Once completed, click “Save”.</span>
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                    {" "}
                    </a>
                  </div>
                </div>
                <div
                  className="help-popup-close"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                  <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                    {" "}
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

     
        {location.pathname == "/license-preview-content" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
               <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
               {" "}
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library library-p">
                     
                    <div className="help-popup-content-library-inside">
                      <h6>Create content</h6>
                      <br />
                      <p>
                        <strong>Steps 3 :</strong> “Preview your content &
                        publish"
                      </p>
                      <p></p>
                      <p>
                        Review your content details and make necessary edits.
                      </p>
                    </div>
                    <div className="dotted-line">&nbsp;</div>
                    <div className="help-popup-content-library-inside">
                      <img
                        className="dleete-btn"
                        src={path_image + "edit-button-white.png"}
                        alt=""
                      />
                      <p></p>
                      <p>
                        <span>
                          If needed, change the title by clicking on the pen
                          icon.
                        </span>
                      </p>
                    </div>
                    <div className="dotted-line">&nbsp;</div>
                    <div className="help-popup-content-library-inside">
                      <Button className="btn-bordered">
                        Change content file
                      </Button>
                      <p>
                        <span>
                          Click “Change content file” to change the uploaded
                          content file.
                        </span>
                      </p>
                    </div>
                    <div className="dotted-line">&nbsp;</div>
                    <div className="help-popup-content-library-inside">
                      <p className="voilet-text">
                        You have to scroll to the bottom to complete previewing
                        your file and that will enable the “Publish” button.
                      </p>
                      <Button className="btn-filled publish">Publish</Button>
                      <p>
                        <span>Click “Publish” to finalise your content. </span>
                      </p>
                    </div>
                    <div className="dotted-line">&nbsp;</div>
                    <div className="help-popup-content-library-inside">
                      <Button className="btn-bordered back">Back</Button>
                      <p></p>
                      <p>
                        <span>
                          Or click “Back” to go back to the previous step.
                        </span>
                      </p>
                    </div>
                    <div
                      className="help-popup-close"
                      onClick={() =>
                        setHideShowSideContent(
                          (getHideShowSideContent) => !getHideShowSideContent
                        )
                      }
                    >
                      <a   href="#"
    onClick={(e) => e.preventDefault()}>
                      <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                      {" "}
                      </a>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                    {" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
       
        {location.pathname == "/license-sublink" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
               <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
               {" "}
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner library-p">
                 
                  <div className="help-popup-content-library-inside">
                    <p>
                      <strong>
                        A Sublink is a unique link that leads to the main link,
                        and can be tracked separately. It can be useful for
                        events, promotion, social media etc.
                      </strong>
                    </p>
                  </div>
                  <div className="help-popup-content-library-inside">
                    <p>
                      <strong>To create new sublink for your content:</strong>
                    </p>
                    <p>
                      By choosing the content you wish to create a sub-link of,
                      either from the:
                    </p>
                    <ul>
                      <li>Title</li>
                      <li>Content URL</li>
                    </ul>
                  </div>
                  <div className="help-popup-content-library-inside">
                    <p>
                      On the right-hand side of the screen, you'll find a list
                      of all the sub-links you've previously created. Each
                      sub-link will feature with:
                    </p>
                    <img src={path_image + "docintel-link.png"} alt="" />
                    <ul>
                      <li>Title and link</li>
                      <li>Copy icon to copy the link quickly</li>
                    </ul>
                  </div>
                  <div className="help-popup-content-library-inside">
                    <img
                      className="qr-download"
                      src={path_image + "qr-code-download.png"}
                      alt=""
                    />
                    <p>
                      <span>
                        Click on the download icon to download the sublink QR
                      </span>
                    </p>
                    <Button className="btn-bordered white">Analytics</Button>
                    <p>
                      <span>
                        Your “Analytics” button will take you to the analytics
                        page of the sublink.
                      </span>
                    </p>
                  </div>
                  <div className="dotted-line">&nbsp;</div>
                  <div className="help-popup-content-library-inside">
                    <Button className="btn-filled">Create New Link +</Button>
                    <p>
                      <span>
                        Click on “Create New Link” to reveal a pop-up that
                        allows you to create a new sublink for the selected
                        content.
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="help-popup-close"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                  <a   href="#"
    onClick={(e) => e.preventDefault()}>
                  <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                  {" "}
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
 
        {location.pathname == "/library-create-user" && (
          <>
            {localStorage.getItem("group_id") == 3 ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                   <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                   {" "}
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                      <div className="help-popup-content-video">
                        <h6>{title}</h6>
                        <div
                          className="help-content-popup"
                          onClick={() =>
                            setOpenVideoPopup(
                              (getOpenVideoPopup) => !getOpenVideoPopup
                            )
                          }
                        >
                          <a   href="#"
    onClick={(e) => e.preventDefault()}>
                            <img src={video_poster} alt="" />
                          </a>
                        </div>
                      </div>

                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Three Steps to Create Your Content</strong>
                        </p>
                        <p></p>
                        <img
                          src={path_image + "create-content-steps.png"}
                          alt=""
                        />
                        <p>
                          <strong>Steps 1 : </strong>“Create Your Content”
                        </p>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          Start by filling in the information about{" "}
                          <strong>Who is involved</strong> and if they can print
                          or download the sample.
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <Button className="btn-purple btn-bordered">
                          Add new product +
                        </Button>
                        <p>
                          <span>
                            Next add the product. To add a new product, click
                            “Add a New Product” found to the right of the
                            “Product” bar. This will reveal a pop-up.
                          </span>
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <img src={path_image + "group-topics.png"} alt="" />
                        <p></p>
                        <p>
                          <span>
                            To add topic tags, click “Add Topic” and select one
                            or more from the predefined list or create your own.
                          </span>
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <p>
                          Next <strong>Create the Docintel link</strong> for
                          your content.
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          Select the Docintel format, such as PDF, Video and
                          E-book.
                        </p>
                        <img src={path_image + "select-format.png"} alt="" />
                        <p>
                          <span>
                            <strong>E-book</strong> allows you to upload
                            individual chapters by clicking “Choose Your File”
                            and type chapter title.{" "}
                          </span>
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <img src={path_image + "select-cover-img.png"} alt="" />
                        <p>
                          <span>
                            {" "}
                            The last thing is uploading the content cover by
                            clicking “Choose Your File”.
                          </span>
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <Button className="btn-filled cancel">Next</Button>
                        <p>
                          <span>Click “Next” to move to the next step.</span>
                        </p>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Something else</strong>
                          <br />
                          If you have any special requirements that are not
                          available here please open a ticket in the upper right
                          corner or email/call your inforMed.pro contact.
                        </p>
                      </div>

                      <div
                        className="help-popup-close"
                        onClick={() =>
                          setHideShowSideContent(
                            (getHideShowSideContent) => !getHideShowSideContent
                          )
                        }
                      >
                        <a   href="#"
    onClick={(e) => e.preventDefault()}>
                        <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                        {" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {localStorage.getItem("group_id") == 2 ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                   <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                   {" "}
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                      
                      <div className="help-popup-content-library-inside">
                        <h6>Create content</h6>
                        <br />
                        <p>
                          <strong>Three Steps to Create Your Content</strong>
                        </p>
                        <p></p>
                        <img
                          src={path_image + "create-content-steps.png"}
                          alt=""
                        />
                        <p>
                          <strong>Steps 1 : </strong>“Create Your Content”
                        </p>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          Start by filling in the information about{" "}
                          <strong>Who is involved</strong> and if they can print
                          or download the sample.
                        </p>
                      </div>
                      <hr />

                      <div className="help-popup-content-library-inside">
                        <p>
                          Next <strong>Create the Docintel link</strong> for
                          your content.
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          Select the Docintel format, such as PDF, Video and
                          E-book.
                        </p>
                        <p></p>
                        <img src={path_image + "select-format.png"} alt="" />
                        <p></p>
                        <p>
                          <span>
                            <strong>E-book</strong> allows you to upload
                            individual chapters by clicking “Choose Your File”
                            and type chapter title.{" "}
                          </span>
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <img src={path_image + "select-cover-img.png"} alt="" />
                        <p></p>
                        <p>
                          <span>
                            {" "}
                            The last thing is uploading the content cover by
                            clicking “Choose Your File”.
                          </span>
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <Button className="btn-filled cancel">Next</Button>
                        <p>
                          <span>Click “Next” to move to the next step.</span>
                        </p>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Something else</strong>
                          <br />
                          If you have any special requirements that are not
                          available here please open a ticket in the upper right
                          corner or email/call your inforMed.pro contact.
                        </p>
                      </div>
                      <div
                        className="help-popup-close"
                        onClick={() =>
                          setHideShowSideContent(
                            (getHideShowSideContent) => !getHideShowSideContent
                          )
                        }
                      >
                        <a   href="#"
    onClick={(e) => e.preventDefault()}>
                        <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                        {" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
     
        {location.pathname == "/license-create-user" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
                 <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                 {" "}
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library library-p">
                     
                    <div className="help-popup-content-library-inside">
                      <h6>Create content</h6>
                      <br />
                      <p>
                        <strong>Three Steps to Create Your Content</strong>
                      </p>
                      <img
                        src={path_image + "create-content-steps.png"}
                        alt=""
                      />
                      <p>
                        <strong>Steps 1 : </strong>“Create Your Content”
                      </p>
                    </div>
                    <div className="help-popup-content-library-inside">
                      <p>
                        Start by filling in the information about{" "}
                        <strong>Who is involved</strong> and if they can print
                        or download the sample.
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <p>
                        <strong>Limits agreed</strong>
                        <br />
                        Is your chance to set the limits you've agreed with your
                        client. When those limits are near you will get alerted
                        via email.
                      </p>
                      <img src={path_image + "set-limit.png"} alt="" />
                      <p>
                        Usage refer to Unique Readers, not just quantity of
                        openings.
                      </p>
                    </div>
                    <div className="dotted-line">&nbsp;</div>
                    <div className="help-popup-content-library-inside">
                      <p>
                        Next <strong>Create the Docintel link</strong> for your
                        content.
                      </p>
                    </div>
                    <div className="dotted-line">&nbsp;</div>
                    <div className="help-popup-content-library-inside">
                      <p>
                        Select the Docintel format, such as PDF, Video and
                        E-book.
                      </p>
                      <p></p>
                      <img src={path_image + "select-format.png"} alt="" />
                      <p></p>
                      <p>
                        <span>
                          <strong>E-book</strong> allows you to upload
                          individual chapters by clicking “Choose Your File” and
                          type chapter title.{" "}
                        </span>
                      </p>
                    </div>
                    <div className="dotted-line">&nbsp;</div>
                    <div className="help-popup-content-library-inside">
                      <img src={path_image + "select-cover-img.png"} alt="" />
                      <p></p>
                      <p>
                        <span>
                          {" "}
                          The last thing is uploading the content cover by
                          clicking “Choose Your File”.
                        </span>
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <Button className="btn-filled cancel">Next</Button>
                      <p>
                        <span>Click “Next” to move to the next step.</span>
                      </p>
                    </div>
                    <div className="help-popup-content-library-inside">
                      <p>
                        <strong>Something else</strong>
                        <br />
                        If you have any special requirements that are not
                        available here please open a ticket in the upper right
                        corner or email/call your inforMed.pro contact.
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                    {" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      
        {location.pathname == "/preview-content" && (
          <>
            {localStorage.getItem("group_id") == 3 ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                   <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                   {" "}
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                      <div className="help-popup-content-video">
                        <h6>{title}</h6>
                        <div
                          className="help-content-popup"
                          onClick={() =>
                            setOpenVideoPopup(
                              (getOpenVideoPopup) => !getOpenVideoPopup
                            )
                          }
                        >
                          <a   href="#"
    onClick={(e) => e.preventDefault()}>
                            <img src={video_poster} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Steps 3 :</strong> “Preview your content &
                          publish
                        </p>
                        <p></p>
                        <p>
                          Review your content details and make necessary edits.
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <img
                          className="dleete-btn"
                          src={path_image + "edit-button-white.png"}
                          alt=""
                        />
                        <p></p>
                        <p>
                          <span>
                            If needed, change the title by clicking on the pen
                            icon.
                          </span>
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <Button className="btn-bordered">
                          Change content file
                        </Button>
                        <p>
                          <span>
                            Click “Change content file” to change the uploaded
                            content file.
                          </span>
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <p className="voilet-text">
                          You have to scroll to the bottom to complete
                          previewing your file and that will enable the
                          “Publish” button.
                        </p>
                        <Button className="btn-filled publish">Publish</Button>
                        <p>
                          <span>
                            Click “Publish” to finalise your content.
                          </span>
                        </p>
                      </div>
                      <hr />
                      <div className="help-popup-content-library-inside">
                        <Button className="btn-bordered back">Back</Button>
                        <p></p>
                        <p>
                          <span>
                            Or click “Back” to go back to the previous step.
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="help-popup-close"
                      onClick={() =>
                        setHideShowSideContent(
                          (getHideShowSideContent) => !getHideShowSideContent
                        )
                      }
                    >
                      <a   href="#"
    onClick={(e) => e.preventDefault()}>
                      <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                      {" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {localStorage.getItem("group_id") == 2 ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                  <img src= { sidebar_image_path +"question-mark.svg" } alt=""/>
                  {" "}
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                       
                      <div className="help-popup-content-library-inside library-p publisher">
                        <div className="help-popup-content-library-inside">
                          <h6>Create content</h6>
                        </div>
                        <div className="help-popup-content-library-inside">
                          <p>
                            <strong>Steps 3 :</strong> “Preview your content &
                            publish
                          </p>
                          <p></p>
                          <p>
                            Review your content details and make necessary
                            edits.
                          </p>
                        </div>
                        <hr />
                        <div className="help-popup-content-library-inside">
                          <img
                            className="dleete-btn"
                            src={path_image + "edit-button-white.png"}
                            alt=""
                          />
                          <p></p>
                          <p>
                            <span>
                              If needed, change the title by clicking on the pen
                              icon.
                            </span>
                          </p>
                        </div>
                        <hr />
                        <div className="help-popup-content-library-inside">
                          <Button className="btn-bordered">
                            Change content file
                          </Button>
                          <p>
                            <span>
                              Click “Change content file” to change the uploaded
                              content file.
                            </span>
                          </p>
                        </div>
                        <hr />
                        <div className="help-popup-content-library-inside">
                          <p className="voilet-text">
                            You have to scroll to the bottom to complete
                            previewing your file and that will enable the
                            “Publish” button.
                          </p>
                          <Button className="btn-filled publish">
                            Publish
                          </Button>
                          <p>
                            <span>
                              Click “Publish” to finalise your content.
                            </span>
                          </p>
                        </div>
                        <hr />
                        <div className="help-popup-content-library-inside">
                          <Button className="btn-bordered back">Back</Button>
                          <p></p>
                          <p>
                            <span>
                              Or click “Back” to go back to the previous step.
                            </span>
                          </p>
                        </div>
                      </div>
                      <div
                        className="help-popup-close"
                        onClick={() =>
                          setHideShowSideContent(
                            (getHideShowSideContent) => !getHideShowSideContent
                          )
                        }
                      >
                        <a   href="#"
    onClick={(e) => e.preventDefault()}>
                        <img src= { sidebar_image_path +"cross.svg" } alt=""/>
                      {" "}
                      
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
     
        {location.pathname == "/content-detail" && (
          <>
            {localStorage.getItem("group_id") == 3 ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                 <img src= { sidebar_image_path + "question-mark.svg" } alt=""/>
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                      <div className="help-popup-content-video">
                        <h6>{title}</h6>
                        <div
                          className="help-content-popup"
                          onClick={() =>
                            setOpenVideoPopup(
                              (getOpenVideoPopup) => !getOpenVideoPopup
                            )
                          }
                        >
                          <a   href="#"
    onClick={(e) => e.preventDefault()}>
                            <img src={video_poster} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="help-popup-content-library-inside">
                        <p>
                          <strong>Content Details </strong>
                          <br />A summary of your content to review.
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <img
                          className="dleete-btn small"
                          src={path_image + "copy-content.png"}
                          alt=""
                        />
                        <p></p>
                        <p>
                          <span>
                            To copy the Docintel link you can click on the copy
                            icon to copy it.
                          </span>
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <Button className="btn-bordered small">Close</Button>
                        <p>
                          <span>
                            Once happy with your content, click “Close” to
                            finish.
                          </span>
                        </p>
                      </div>
                      <div className="dotted-line">&nbsp;</div>
                      <div className="help-popup-content-library-inside">
                        <Button className="btn-bordered small disabled">
                          Edit
                        </Button>
                        <p>
                          <span>
                            Or click “Edit” to make any final adjustments.
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="help-popup-close"
                      onClick={() =>
                        setHideShowSideContent(
                          (getHideShowSideContent) => !getHideShowSideContent
                        )
                      }
                    >
                      <a   href="#"
    onClick={(e) => e.preventDefault()}>
                      <img src= { sidebar_image_path + "cross.svg" } alt=""/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {localStorage.getItem("group_id") == 2 ? (
              <div className="help-popup">
                <div
                  className="help-popup-view"
                  onClick={() =>
                    setHideShowSideContent(
                      (getHideShowSideContent) => !getHideShowSideContent
                    )
                  }
                >
                  <img src= { sidebar_image_path + "question-mark.svg" } alt=""/>
                </div>
                <div
                  className={
                    getHideShowSideContent
                      ? "help-popup-content show"
                      : "help-popup-content"
                  }
                >
                  <div className="help-popup-content-inner">
                    <div className="help-popup-content-library library-p">
                     
                      <div className="help-popup-content-library-inside library-p publisher">
                        <div className="help-popup-content-library-inside">
                          <h6>Create content</h6>
                        </div>
                        <div className="help-popup-content-library-inside">
                          <p>
                            <strong>Content Details </strong>
                            <br />A summary of your content to review.
                          </p>
                        </div>
                        <hr />
                        <div className="help-popup-content-library-inside">
                          <img
                            className="dleete-btn small"
                            src={path_image + "copy-content.png"}
                            alt=""
                          />
                          <p></p>
                          <p>
                            <span>
                              To copy the Docintel link you can click on the
                              copy icon to copy it.
                            </span>
                          </p>
                        </div>
                        <hr />
                        <div className="help-popup-content-library-inside">
                          <Button className="btn-bordered small">Close</Button>
                          <p>
                            <span>
                              Once happy with your content, click “Close” to
                              finish.
                            </span>
                          </p>
                        </div>
                        <hr />
                        <div className="help-popup-content-library-inside">
                          <Button className="btn-bordered small disabled">
                            Edit
                          </Button>
                          <p>
                            <span>
                              Or click “Edit” to make any final adjustments.
                            </span>
                          </p>
                        </div>
                      </div>
                      <div
                        className="help-popup-close"
                        onClick={() =>
                          setHideShowSideContent(
                            (getHideShowSideContent) => !getHideShowSideContent
                          )
                        }
                      >
                        <a   href="#"
    onClick={(e) => e.preventDefault()}>
                        <img src= { sidebar_image_path + "cross.svg" } alt=""/>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
    
        {location.pathname == "/license-content-detail" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
             <img src= { sidebar_image_path + "question-mark.svg" } alt=""/>
              </div>
              <div
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library library-p">
                 
                    <div className="help-popup-content-library-inside">
                      <h6>Create content</h6>
                      <br />
                      <p>
                        <strong>Content Details </strong>
                        <br />A summary of your content to review.
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <img
                        className="dleete-btn small"
                        src={path_image + "copy-content.png"}
                        alt=""
                      />
                      <p></p>
                      <p>
                        <span>
                          This is the link to send to your client. To copy the
                          Docintel link you can click on the copy icon to copy
                          it.
                          <br />
                          <br />
                          They can use it right away, or review and you can
                          Reset data back to zero when they have approved.
                          <br /> <br />
                          If you need amend anything go back to Create & Change,
                          find the eprint and change the parts that needs
                          changing.
                        </span>
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <Button className="btn-bordered small">Close</Button>
                      <p>
                        <span>
                          Once happy with your content, click “Close” to finish.
                        </span>
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <Button className="btn-bordered small disabled">
                        Edit
                      </Button>
                      <p>
                        <span>
                          Or click “Edit” to make any final adjustments.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
    onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path + "cross.svg" } alt=""/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      
        {location.pathname == "/products" && (
          <>
            <div className="help-popup">
              <div
                className="help-popup-view"
                onClick={() =>
                  setHideShowSideContent(
                    (getHideShowSideContent) => !getHideShowSideContent
                  )
                }
              >
                <img src= { sidebar_image_path + "question-mark.svg" } alt=""/>
              </div>
              <div 
                className={
                  getHideShowSideContent
                    ? "help-popup-content show"
                    : "help-popup-content"
                }
              >
                <div className="help-popup-content-inner">
                  <div className="help-popup-content-library library-p">
                    <div className="help-popup-content-video">
                      <h6>{title}</h6>
                      <div
                        className="help-content-popup"
                        onClick={() =>
                          setOpenVideoPopup(
                            (getOpenVideoPopup) => !getOpenVideoPopup
                          )
                        }
                      >
                        <a   href="#"
    onClick={(e) => e.preventDefault()}>
                          <img src={video_poster} alt="" />
                        </a>
                      </div>
                    </div>

                    <div className="help-popup-content-library-inside">
                      <p>
                        <strong>Selecting Type</strong>
                        <br />
                        At the top of the page, you'll find the “Select Type”
                        bar. Click to select “Products” or “Tags”.
                      </p>
                      <p>
                        If you’ve selected “Products or Tags” you’ll see a list
                        of all your products or tags at the bottom of the page.
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <img
                        className="dleete-btn"
                        src={path_image + "edit-button.png"}
                        alt=""
                      />
                      <p>
                        <span>
                          To edit a product or tag, click the “Edit” button
                          (Pictured as a pencil), next to that product or tag.{" "}
                        </span>
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <Button className="btn-bordered btn-purple">
                        Add New Product +
                      </Button>
                      <Button className="btn-bordered btn-purple">
                        Add New Topic +
                      </Button>
                      <p>
                        <span>
                          To add a new product or topic, click the “Add New
                          Product/topic” button at the top right-hand corner.
                        </span>
                      </p>
                    </div>
                    <hr />
                    <div className="help-popup-content-library-inside">
                      <img
                        className="dleete-btn"
                        src={path_image + "edit-button.png"}
                        alt=""
                      />
                      <p>
                        <span>
                          To edit a product or tag, click the “Edit” button
                          (Pictured as a pencil), next to that product or tag.{" "}
                        </span>
                      </p>
                    </div>
                    <div className="dotted-line">&nbsp;</div>
                    <div className="help-popup-content-library-inside">
                      <Button className="btn-bordered btn-purple">
                        Add New Product +
                      </Button>
                      <Button className="btn-bordered btn-purple">
                        Add New Topic +
                      </Button>
                      <p>
                        <span>
                          To add a new product or topic, click the “Add New
                          Product/topic” button at the top right-hand corner.
                        </span>
                      </p>
                    </div>
                    <div className="dotted-line">&nbsp;</div>
                    <div className="help-popup-content-library-inside">
                      <img
                        className="dleete-btn"
                        src={path_image + "delete-button.png"}
                        alt=""
                      />
                      <p>
                        <span>
                          If you wish to remove a product, click the “Delete”
                          button found below the “Add New Product/topic” button.
                          This will activate delete buttons for all products or
                          topics. Select the products or topics you want to
                          delete by clicking their respective delete buttons.
                        </span>
                      </p>
                      <Button className="btn-filled cancel">Cancel</Button>
                      <p>
                        <span>
                          To exit the deletion mode without removing any
                          products or topics, click the “Cancel” button. This
                          will send you back to the original page.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className="help-popup-close"
                    onClick={() =>
                      setHideShowSideContent(
                        (getHideShowSideContent) => !getHideShowSideContent
                      )
                    }
                  >
                    <a   href="#"
                       onClick={(e) => e.preventDefault()}>
                    <img src= { sidebar_image_path + "cross.svg" } alt=""/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        <Modal
          show={getOpenVideoPopup}
          className="full_video_popup"
          id="open_video_popup"
        >
          <Modal.Header>
            <h5 className="modal-title" id="staticBackdropLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() =>
                setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)
              }
            ></button>
          </Modal.Header>
          <Modal.Body>
            <Player playsInline poster={video_poster} src={video_url}>
              <BigPlayButton position="center" />
            </Player>
          </Modal.Body>
        </Modal>
       
      </div>
    </>
  );
};

export default Sidebar;