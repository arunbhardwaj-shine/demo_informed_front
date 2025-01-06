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
   
  const rdLikeArray=["56Ek4feL/1A8mZgIKQWEqg==","sNl1hra39QmFk9HwvXETJA==","MXl8m36VZFYXpgFVz3Pg0g=="]
  const isRdAccount=localStorage.getItem("user_id")=="56Ek4feL/1A8mZgIKQWEqg=="
  const isNorgineAccount=localStorage.getItem("user_id")=="sNl1hra39QmFk9HwvXETJA=="
  const isGenaAccount=localStorage.getItem("user_id")=="MXl8m36VZFYXpgFVz3Pg0g=="
  const isLikeRdAccount= rdLikeArray.includes(localStorage.getItem("user_id"))
  let navigate = useNavigate();
  let c_id = 0;
  let webinar_c_id = 0;
  const location = useLocation();
 

  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  let sidebar_image_path= import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN_SIDEBAR;
  console.log(path_image)
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
      "https://webinar.informed.pro/react_help/videos/email_page_1.mp4";
    video_poster =
      "https://webinar.informed.pro/react_help/poster/email_page_1.png";
  } else if (location.pathname == "/EmailArticleSelect") {
    title = "Selecting content for your email";
    video_url =
      "https://webinar.informed.pro/react_help/videos/email_page_2.mp4";
    video_poster =
      "https://webinar.informed.pro/react_help/poster/email_page_2.png";
  } else if (location.pathname == "/CreateEmail") {
    title = "Writing your email";
    video_url =
      "https://webinar.informed.pro/react_help/videos/email_page_3.mp4";
    video_poster =
      "https://webinar.informed.pro/react_help/poster/email_page_3.png";
  } else if (location.pathname == "/SelectHCP") {
    title = "Select HCPs to mail";
    video_url =
      "https://webinar.informed.pro/react_help/videos/email_page_4.mp4";
    video_poster =
      "https://webinar.informed.pro/react_help/poster/email_page_4.png";
  } else if (location.pathname == "/VerifyHCP") {
    title = "Select HCPs to mail";
    video_url =
      "https://webinar.informed.pro/react_help/videos/email_page_5.mp4";
    video_poster =
      "https://webinar.informed.pro/react_help/poster/email_page_5.png";
  } else if (
    location.pathname == "/verifyMAIL" ||
    location.pathname == "/VerifyMAIL" ||
    location.pathname == "/VerifyHcpMAIL"
  ) {
    title = "Sending your email";
    video_url =
      "https://webinar.informed.pro/react_help/videos/email_page_8.mp4";
    video_poster =
      "https://webinar.informed.pro/react_help/poster/email_page_8.png";
  } else if (location.pathname == "/SelectSmartListUsers") {
    title = "Verify & adjust your SmartList";
    video_url =
      "https://webinar.informed.pro/react_help/videos/email_page_6.mp4";
    video_poster =
      "https://webinar.informed.pro/react_help/poster/email_page_6.png";
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
      "https://webinar.informed.pro/react_help/videos/smart_list_uploading_excel.mp4";
    video_poster =
      "https://webinar.informed.pro/react_help/poster/smart_list_uploading_excel.png";
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
      "https://webinar.informed.pro/react_help/videos/smart_list_sagment.mp4";
    video_poster =
      "https://webinar.informed.pro/react_help/poster/smart_list_sagment.png";
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
      "https://webinar.informed.pro/react_help/videos/email_page_2.mp4";
    video_poster =
      "https://webinar.informed.pro/react_help/poster/email_page_2.png";
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
            window.location.pathname == "/webinar/analytics" || window.location.pathname == "/webinar/analytics/analytics-attendees" ||
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
            window.location.pathname === "/webinar/analytics" || window.location.pathname == "/webinar/analytics/analytics-attendees" ||
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
                <img src= { sidebar_image_path + "smart-list.svg" } alt=""/>
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
                <img src= { sidebar_image_path + "email-statss.svg" } alt=""/>
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
                //   location.pathname == "/library-content" || (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="  || localStorage.getItem("user_id")=="sNl1hra39QmFk9HwvXETJA==" && (location?.state?.flag === "Non-mandatory")?location.pathname == "/library-edit-listing" || location.pathname == "/library-edit"  || location.pathname == "/library-create-user" || location.pathname == "/preview-content" || location.pathname == "/content-detail" || location.pathname == "/library-sublink" :'')    ? "active" : "side_li"
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
                  <img src= { sidebar_image_path + "spc.svg" } alt=""/>
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
                  <img src= { sidebar_image_path + "library-content2.svg" } alt=""/>
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
                <img src= { sidebar_image_path + "license-topics.svg" } alt=""/>
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
                <img src= { sidebar_image_path + "readers-view.svg" } alt=""/>
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
                    <img src= { sidebar_image_path + "registered-users.svg" } alt=""/>
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
                            <img src= { sidebar_image_path +"webinar-email2.svg" } alt=""/>
                            {" "}
                              <p>Email</p>
                            </Link>
                          </li>
                          <li className={isActiveAutomail ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <Link to="/webinar/email/auto-emails">
                            <img src= { sidebar_image_path +"auto-email2.svg" } alt=""/>
                            {" "}
                              <p>Auto Emails</p>
                            </Link>
                          </li>

                          <li className={isActiveSmartlist ? 'active' : 'side_li'}
                           
                          >
                            <Link to="/webinar/email/smartlist">
                            <img src= { sidebar_image_path +"smart-list2.svg" } alt=""/>
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
                            <img src= { sidebar_image_path +" dashboard.svg" } alt=""/>
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
                      <img src= { sidebar_image_path +"registered-users-invitees.svg" } alt=""/>
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
                      <img src= { sidebar_image_path +"webinar-email2.svg" } alt=""/>
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
                        <img src= { sidebar_image_path + "registered-users.svg" } alt=""/>
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

                  window.location.pathname == "/survey/survey-list" || window.location.pathname == "/survey/survey-setup" || window.location.pathname == "/survey/survey-sublink" || window.location.pathname == "/survey/survey-analytics" || window.location.pathname == "/survey/survey-analytics-detail"?

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

                ):

                window.location.pathname == "/survey/survey-list" || window.location.pathname == "/survey/survey-sublink" || window.location.pathname == "/survey/survey-analytics" || window.location.pathname == "/survey/survey-analytics-detail"?

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

              )  :
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M2360 5114 c-114 -11 -328 -47 -434 -75 -352 -90 -701 -266 -982 -495 -85 -69 -360 -342 -352 -349 2 -2 80 19 173 46 137 41 216 57 407 84 l237 33 102 57 103 57 117 -32 117 -33 188 9 189 9 66 100 c36 55 70 100 75 100 5 0 50 -6 99 -14 81 -12 113 -11 314 9 l224 21 65 71 c36 38 105 96 152 128 l87 58 128 -19 c86 -13 141 -17 168 -12 l41 8 -74 34 c-176 79 -443 154 -665 187 -97 15 -453 26 -545 18z m653 -152 c42 -24 77 -46 77 -50 0 -7 -195 -157 -228 -176 -9 -5 -66 -14 -128 -20 l-112 -12 -52 34 -52 33 73 46 c97 60 333 192 339 190 3 -1 40 -21 83 -45z m-1056 -144 l53 -22 75 24 c41 13 76 22 78 19 18 -24 77 -133 74 -136 -3 -2 -81 -24 -173 -48 l-169 -44 -83 47 -83 47 32 25 c17 14 55 44 83 67 28 23 53 42 56 42 2 1 28 -9 57 -21z" />{" "}
                                    <path d="M3120 4547 l0 -52 101 -100 c118 -117 239 -251 239 -265 0 -5 -27 -23 -60 -40 -60 -30 -61 -30 -112 -15 -28 8 -87 29 -130 47 l-78 32 0 67 0 66 -52 21 c-29 11 -76 29 -104 40 l-51 21 -34 -150 -34 -149 -99 -22 c-54 -12 -100 -28 -103 -35 -3 -7 -1 -45 4 -85 l8 -73 135 -26 c74 -14 136 -26 137 -25 1 1 12 60 24 131 12 72 23 131 24 133 1 1 51 -5 111 -14 80 -12 123 -24 160 -45 46 -26 61 -29 138 -29 l86 0 56 -112 c53 -106 65 -121 211 -272 l154 -160 -6 -41 c-14 -86 -3 -82 -160 -61 l-100 13 -211 -106 -212 -106 -154 -185 c-154 -185 -155 -186 -174 -265 l-20 -80 -47 -3 c-40 -3 -66 5 -158 47 l-110 50 -87 -43 c-48 -23 -93 -45 -99 -49 -8 -5 -6 -28 7 -79 10 -40 21 -86 25 -103 l7 -30 43 50 43 50 77 3 77 4 -7 -95 -7 -96 62 -18 c56 -15 68 -24 127 -89 l64 -71 101 29 100 29 107 -16 c58 -9 174 -34 257 -56 83 -21 179 -42 214 -46 37 -3 70 -13 79 -22 9 -9 62 -69 119 -133 l103 -116 219 -129 c121 -70 219 -133 218 -138 -2 -6 -66 -131 -143 -277 l-139 -267 -151 -69 -150 -69 -59 -157 -59 -157 -210 -142 c-116 -78 -214 -145 -220 -148 -12 -9 -56 -163 -47 -167 12 -5 185 47 295 89 877 331 1510 1126 1630 2049 66 505 -12 989 -231 1449 -65 135 -169 311 -184 311 -5 0 -20 -4 -33 -9 -13 -5 -111 -17 -218 -26 -107 -9 -203 -20 -214 -25 -11 -4 -45 -46 -74 -94 -30 -47 -55 -86 -56 -86 -1 0 -21 7 -45 15 -28 10 -92 60 -198 156 l-157 141 -41 117 c-71 201 -70 199 -179 297 l-100 90 -110 22 c-60 12 -116 22 -122 22 -9 0 -13 -17 -13 -53z" />{" "}
                                    <path d="M455 3875 c-27 -7 -62 -16 -77 -19 -30 -7 -74 -81 -152 -254 -243 -541 -290 -1148 -131 -1725 83 -305 229 -600 428 -866 93 -124 365 -396 490 -490 513 -383 1142 -567 1747 -510 63 6 116 12 118 14 2 1 -3 70 -10 153 l-12 151 58 240 58 240 -57 203 c-54 192 -62 213 -152 380 l-94 176 80 169 c45 93 81 173 81 179 0 6 -35 21 -77 34 -75 21 -82 26 -178 121 l-100 98 -212 47 -211 48 -71 145 -71 146 0 -88 0 -88 -32 3 c-29 3 -48 25 -215 251 l-183 248 0 204 0 205 -131 213 c-72 116 -133 215 -137 218 -4 4 -101 -11 -217 -32 -180 -33 -231 -39 -353 -39 l-143 0 -70 45 c-38 24 -69 48 -69 52 1 5 40 38 87 76 89 70 90 73 8 52z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z" />{" "}
                                    <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z" />{" "}
                                    <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z" />{" "}
                                    <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z" />{" "}
                                    <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  {" "}
                                  <g clipPath="url(#clip0_301_44)">
                                    {" "}
                                    <path
                                      d="M8.50001 13.5C8.22387 13.5 8.00001 13.2761 8.00001 13V11.5H6.50001C6.22387 11.5 6.00001 11.2761 6.00001 11C6.00001 10.7239 6.22387 10.5 6.50001 10.5H8.00001V9.00001C8.00001 8.72387 8.22387 8.50001 8.50001 8.50001C8.77615 8.50001 9.00001 8.72387 9.00001 9.00001V10.5H10.5C10.7762 10.5 11 10.7239 11 11C11 11.2761 10.7762 11.5 10.5 11.5H9.00001V13C9.00001 13.2761 8.77615 13.5 8.50001 13.5Z"
                                      fill="#0066BE"
                                      fillOpacity="0.6"
                                    />{" "}
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M0.000305177 2.00005C0.00027582 0.895463 0.895715 0 2.00031 0H15C16.1046 0 17 0.895429 17 2V15.6654L13.4225 20.9994C13.374 21.0717 13.3452 21.1554 13.339 21.2423L13.2849 22H2.00078C0.896235 22 0.000812916 21.1046 0.000783561 20.0001L0.000305177 2.00005ZM8.50001 15C10.7092 15 12.5 13.2091 12.5 11C12.5 8.79087 10.7092 7.00001 8.50001 7.00001C6.29087 7.00001 4.50001 8.79087 4.50001 11C4.50001 13.2091 6.29087 15 8.50001 15Z"
                                      fill="#0066BE"
                                      fillOpacity="0.6"
                                    />{" "}
                                    <path
                                      d="M14.4467 23.9681C14.3081 24.0368 14.1473 23.929 14.1583 23.7747L14.3392 21.2423C14.3454 21.1554 14.3741 21.0717 14.4226 20.9994L20.4074 12.0762L22.8989 13.7473L16.9141 22.6704C16.8656 22.7427 16.7991 22.8011 16.7211 22.8398L14.4467 23.9681Z"
                                      fill="#0066BE"
                                      fillOpacity="0.6"
                                    />{" "}
                                    <path
                                      d="M23.1774 13.3321L23.5886 12.7191C23.9757 12.1419 23.8251 11.3583 23.2534 10.9748L22.8381 10.6963C22.2663 10.3128 21.4842 10.4708 21.0971 11.048L20.686 11.661L23.1774 13.3321Z"
                                      fill="#0066BE"
                                      fillOpacity="0.6"
                                    />{" "}
                                  </g>{" "}
                                  <defs>
                                    {" "}
                                    <clipPath id="clip0_301_44">
                                      {" "}
                                      <rect width="24" height="24" fill="white" />{" "}
                                    </clipPath>{" "}
                                  </defs>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M2440 5114 c-14 -2 -52 -9 -85 -15 -136 -23 -299 -90 -420 -172 -87 -59 -225 -197 -285 -283 -70 -101 -136 -243 -167 -361 -24 -88 -27 -115 -27 -273 0 -157 3 -185 26 -272 108 -399 405 -700 797 -806 87 -24 113 -26 281 -26 168 0 194 2 282 26 391 106 688 407 796 806 23 87 26 115 26 272 0 158 -3 185 -27 273 -53 199 -156 374 -304 518 -161 157 -331 249 -547 295 -69 15 -296 27 -346 18z" />{" "}
                                    <path d="M2240 2720 c-93 -10 -214 -33 -302 -57 l-56 -15 -60 -152 c-130 -327 -219 -657 -287 -1058 -4 -24 1 -29 60 -57 91 -42 167 -117 213 -210 36 -73 37 -78 37 -185 0 -104 -2 -115 -32 -179 -44 -93 -119 -169 -212 -215 -73 -36 -78 -37 -186 -37 -108 0 -113 1 -186 37 -93 46 -168 122 -212 215 -30 64 -32 75 -32 178 0 103 2 114 32 178 43 91 118 168 206 212 38 19 75 35 81 35 7 0 22 66 39 166 37 218 121 552 195 772 33 97 59 178 57 180 -6 6 -118 -60 -220 -129 -198 -134 -356 -295 -496 -503 -184 -273 -285 -568 -309 -902 -13 -188 -13 -868 1 -917 7 -26 21 -44 42 -57 31 -20 68 -20 1947 -20 1879 0 1916 0 1947 20 21 13 35 31 42 57 14 50 14 743 1 923 -51 662 -426 1224 -1019 1529 -57 29 -104 51 -107 49 -2 -3 5 -47 17 -99 34 -154 59 -347 59 -454 l0 -100 108 -110 c318 -326 453 -642 387 -900 -32 -123 -131 -240 -259 -305 -120 -60 -191 -47 -217 40 -18 59 8 96 99 141 40 20 87 49 103 65 158 149 70 443 -230 774 -40 44 -88 92 -107 106 l-34 26 -101 -57 c-186 -105 -359 -251 -442 -372 -75 -109 -97 -233 -56 -323 12 -27 48 -72 92 -112 69 -65 72 -70 72 -114 0 -39 -5 -50 -33 -75 -48 -43 -96 -40 -159 10 -158 125 -232 293 -204 463 24 144 85 258 211 391 132 140 307 267 493 358 l67 33 0 58 c0 108 -65 492 -103 605 -14 42 -16 43 -187 74 -95 18 -163 22 -395 24 -154 2 -318 0 -365 -5z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M2360 5114 c-114 -11 -328 -47 -434 -75 -352 -90 -701 -266 -982 -495 -85 -69 -360 -342 -352 -349 2 -2 80 19 173 46 137 41 216 57 407 84 l237 33 102 57 103 57 117 -32 117 -33 188 9 189 9 66 100 c36 55 70 100 75 100 5 0 50 -6 99 -14 81 -12 113 -11 314 9 l224 21 65 71 c36 38 105 96 152 128 l87 58 128 -19 c86 -13 141 -17 168 -12 l41 8 -74 34 c-176 79 -443 154 -665 187 -97 15 -453 26 -545 18z m653 -152 c42 -24 77 -46 77 -50 0 -7 -195 -157 -228 -176 -9 -5 -66 -14 -128 -20 l-112 -12 -52 34 -52 33 73 46 c97 60 333 192 339 190 3 -1 40 -21 83 -45z m-1056 -144 l53 -22 75 24 c41 13 76 22 78 19 18 -24 77 -133 74 -136 -3 -2 -81 -24 -173 -48 l-169 -44 -83 47 -83 47 32 25 c17 14 55 44 83 67 28 23 53 42 56 42 2 1 28 -9 57 -21z" />{" "}
                                    <path d="M3120 4547 l0 -52 101 -100 c118 -117 239 -251 239 -265 0 -5 -27 -23 -60 -40 -60 -30 -61 -30 -112 -15 -28 8 -87 29 -130 47 l-78 32 0 67 0 66 -52 21 c-29 11 -76 29 -104 40 l-51 21 -34 -150 -34 -149 -99 -22 c-54 -12 -100 -28 -103 -35 -3 -7 -1 -45 4 -85 l8 -73 135 -26 c74 -14 136 -26 137 -25 1 1 12 60 24 131 12 72 23 131 24 133 1 1 51 -5 111 -14 80 -12 123 -24 160 -45 46 -26 61 -29 138 -29 l86 0 56 -112 c53 -106 65 -121 211 -272 l154 -160 -6 -41 c-14 -86 -3 -82 -160 -61 l-100 13 -211 -106 -212 -106 -154 -185 c-154 -185 -155 -186 -174 -265 l-20 -80 -47 -3 c-40 -3 -66 5 -158 47 l-110 50 -87 -43 c-48 -23 -93 -45 -99 -49 -8 -5 -6 -28 7 -79 10 -40 21 -86 25 -103 l7 -30 43 50 43 50 77 3 77 4 -7 -95 -7 -96 62 -18 c56 -15 68 -24 127 -89 l64 -71 101 29 100 29 107 -16 c58 -9 174 -34 257 -56 83 -21 179 -42 214 -46 37 -3 70 -13 79 -22 9 -9 62 -69 119 -133 l103 -116 219 -129 c121 -70 219 -133 218 -138 -2 -6 -66 -131 -143 -277 l-139 -267 -151 -69 -150 -69 -59 -157 -59 -157 -210 -142 c-116 -78 -214 -145 -220 -148 -12 -9 -56 -163 -47 -167 12 -5 185 47 295 89 877 331 1510 1126 1630 2049 66 505 -12 989 -231 1449 -65 135 -169 311 -184 311 -5 0 -20 -4 -33 -9 -13 -5 -111 -17 -218 -26 -107 -9 -203 -20 -214 -25 -11 -4 -45 -46 -74 -94 -30 -47 -55 -86 -56 -86 -1 0 -21 7 -45 15 -28 10 -92 60 -198 156 l-157 141 -41 117 c-71 201 -70 199 -179 297 l-100 90 -110 22 c-60 12 -116 22 -122 22 -9 0 -13 -17 -13 -53z" />{" "}
                                    <path d="M455 3875 c-27 -7 -62 -16 -77 -19 -30 -7 -74 -81 -152 -254 -243 -541 -290 -1148 -131 -1725 83 -305 229 -600 428 -866 93 -124 365 -396 490 -490 513 -383 1142 -567 1747 -510 63 6 116 12 118 14 2 1 -3 70 -10 153 l-12 151 58 240 58 240 -57 203 c-54 192 -62 213 -152 380 l-94 176 80 169 c45 93 81 173 81 179 0 6 -35 21 -77 34 -75 21 -82 26 -178 121 l-100 98 -212 47 -211 48 -71 145 -71 146 0 -88 0 -88 -32 3 c-29 3 -48 25 -215 251 l-183 248 0 204 0 205 -131 213 c-72 116 -133 215 -137 218 -4 4 -101 -11 -217 -32 -180 -33 -231 -39 -353 -39 l-143 0 -70 45 c-38 24 -69 48 -69 52 1 5 40 38 87 76 89 70 90 73 8 52z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z" />{" "}
                                    <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z" />{" "}
                                    <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z" />{" "}
                                    <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M2440 5114 c-14 -2 -52 -9 -85 -15 -136 -23 -299 -90 -420 -172 -87 -59 -225 -197 -285 -283 -70 -101 -136 -243 -167 -361 -24 -88 -27 -115 -27 -273 0 -157 3 -185 26 -272 108 -399 405 -700 797 -806 87 -24 113 -26 281 -26 168 0 194 2 282 26 391 106 688 407 796 806 23 87 26 115 26 272 0 158 -3 185 -27 273 -53 199 -156 374 -304 518 -161 157 -331 249 -547 295 -69 15 -296 27 -346 18z" />{" "}
                                    <path d="M2240 2720 c-93 -10 -214 -33 -302 -57 l-56 -15 -60 -152 c-130 -327 -219 -657 -287 -1058 -4 -24 1 -29 60 -57 91 -42 167 -117 213 -210 36 -73 37 -78 37 -185 0 -104 -2 -115 -32 -179 -44 -93 -119 -169 -212 -215 -73 -36 -78 -37 -186 -37 -108 0 -113 1 -186 37 -93 46 -168 122 -212 215 -30 64 -32 75 -32 178 0 103 2 114 32 178 43 91 118 168 206 212 38 19 75 35 81 35 7 0 22 66 39 166 37 218 121 552 195 772 33 97 59 178 57 180 -6 6 -118 -60 -220 -129 -198 -134 -356 -295 -496 -503 -184 -273 -285 -568 -309 -902 -13 -188 -13 -868 1 -917 7 -26 21 -44 42 -57 31 -20 68 -20 1947 -20 1879 0 1916 0 1947 20 21 13 35 31 42 57 14 50 14 743 1 923 -51 662 -426 1224 -1019 1529 -57 29 -104 51 -107 49 -2 -3 5 -47 17 -99 34 -154 59 -347 59 -454 l0 -100 108 -110 c318 -326 453 -642 387 -900 -32 -123 -131 -240 -259 -305 -120 -60 -191 -47 -217 40 -18 59 8 96 99 141 40 20 87 49 103 65 158 149 70 443 -230 774 -40 44 -88 92 -107 106 l-34 26 -101 -57 c-186 -105 -359 -251 -442 -372 -75 -109 -97 -233 -56 -323 12 -27 48 -72 92 -112 69 -65 72 -70 72 -114 0 -39 -5 -50 -33 -75 -48 -43 -96 -40 -159 10 -158 125 -232 293 -204 463 24 144 85 258 211 391 132 140 307 267 493 358 l67 33 0 58 c0 108 -65 492 -103 605 -14 42 -16 43 -187 74 -95 18 -163 22 -395 24 -154 2 -318 0 -365 -5z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M2360 5114 c-114 -11 -328 -47 -434 -75 -352 -90 -701 -266 -982 -495 -85 -69 -360 -342 -352 -349 2 -2 80 19 173 46 137 41 216 57 407 84 l237 33 102 57 103 57 117 -32 117 -33 188 9 189 9 66 100 c36 55 70 100 75 100 5 0 50 -6 99 -14 81 -12 113 -11 314 9 l224 21 65 71 c36 38 105 96 152 128 l87 58 128 -19 c86 -13 141 -17 168 -12 l41 8 -74 34 c-176 79 -443 154 -665 187 -97 15 -453 26 -545 18z m653 -152 c42 -24 77 -46 77 -50 0 -7 -195 -157 -228 -176 -9 -5 -66 -14 -128 -20 l-112 -12 -52 34 -52 33 73 46 c97 60 333 192 339 190 3 -1 40 -21 83 -45z m-1056 -144 l53 -22 75 24 c41 13 76 22 78 19 18 -24 77 -133 74 -136 -3 -2 -81 -24 -173 -48 l-169 -44 -83 47 -83 47 32 25 c17 14 55 44 83 67 28 23 53 42 56 42 2 1 28 -9 57 -21z" />{" "}
                                    <path d="M3120 4547 l0 -52 101 -100 c118 -117 239 -251 239 -265 0 -5 -27 -23 -60 -40 -60 -30 -61 -30 -112 -15 -28 8 -87 29 -130 47 l-78 32 0 67 0 66 -52 21 c-29 11 -76 29 -104 40 l-51 21 -34 -150 -34 -149 -99 -22 c-54 -12 -100 -28 -103 -35 -3 -7 -1 -45 4 -85 l8 -73 135 -26 c74 -14 136 -26 137 -25 1 1 12 60 24 131 12 72 23 131 24 133 1 1 51 -5 111 -14 80 -12 123 -24 160 -45 46 -26 61 -29 138 -29 l86 0 56 -112 c53 -106 65 -121 211 -272 l154 -160 -6 -41 c-14 -86 -3 -82 -160 -61 l-100 13 -211 -106 -212 -106 -154 -185 c-154 -185 -155 -186 -174 -265 l-20 -80 -47 -3 c-40 -3 -66 5 -158 47 l-110 50 -87 -43 c-48 -23 -93 -45 -99 -49 -8 -5 -6 -28 7 -79 10 -40 21 -86 25 -103 l7 -30 43 50 43 50 77 3 77 4 -7 -95 -7 -96 62 -18 c56 -15 68 -24 127 -89 l64 -71 101 29 100 29 107 -16 c58 -9 174 -34 257 -56 83 -21 179 -42 214 -46 37 -3 70 -13 79 -22 9 -9 62 -69 119 -133 l103 -116 219 -129 c121 -70 219 -133 218 -138 -2 -6 -66 -131 -143 -277 l-139 -267 -151 -69 -150 -69 -59 -157 -59 -157 -210 -142 c-116 -78 -214 -145 -220 -148 -12 -9 -56 -163 -47 -167 12 -5 185 47 295 89 877 331 1510 1126 1630 2049 66 505 -12 989 -231 1449 -65 135 -169 311 -184 311 -5 0 -20 -4 -33 -9 -13 -5 -111 -17 -218 -26 -107 -9 -203 -20 -214 -25 -11 -4 -45 -46 -74 -94 -30 -47 -55 -86 -56 -86 -1 0 -21 7 -45 15 -28 10 -92 60 -198 156 l-157 141 -41 117 c-71 201 -70 199 -179 297 l-100 90 -110 22 c-60 12 -116 22 -122 22 -9 0 -13 -17 -13 -53z" />{" "}
                                    <path d="M455 3875 c-27 -7 -62 -16 -77 -19 -30 -7 -74 -81 -152 -254 -243 -541 -290 -1148 -131 -1725 83 -305 229 -600 428 -866 93 -124 365 -396 490 -490 513 -383 1142 -567 1747 -510 63 6 116 12 118 14 2 1 -3 70 -10 153 l-12 151 58 240 58 240 -57 203 c-54 192 -62 213 -152 380 l-94 176 80 169 c45 93 81 173 81 179 0 6 -35 21 -77 34 -75 21 -82 26 -178 121 l-100 98 -212 47 -211 48 -71 145 -71 146 0 -88 0 -88 -32 3 c-29 3 -48 25 -215 251 l-183 248 0 204 0 205 -131 213 c-72 116 -133 215 -137 218 -4 4 -101 -11 -217 -32 -180 -33 -231 -39 -353 -39 l-143 0 -70 45 c-38 24 -69 48 -69 52 1 5 40 38 87 76 89 70 90 73 8 52z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z" />{" "}
                                    <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z" />{" "}
                                    <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z" />{" "}
                                    <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                <svg
                                  version="1.0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512.000000pt"
                                  height="512.000000pt"
                                  viewBox="0 0 512.000000 512.000000"
                                >
                                  {" "}
                                  <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#0066be"
                                    fillOpacity="0.6"
                                    stroke="none"
                                  >
                                    {" "}
                                    <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z" />{" "}
                                    <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                    <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clipPath="url(#clip0_605_8499)">
                                          <path
                                            d="M13.8744 18.375H12.5563L7.69967 12.2224C7.8317 12.0112 7.88983 11.7622 7.8649 11.5144C7.83997 11.2667 7.7334 11.0342 7.56196 10.8536C7.39051 10.673 7.1639 10.5545 6.91777 10.5167C6.67163 10.479 6.41992 10.5241 6.20221 10.645C5.9845 10.7658 5.81313 10.9557 5.71506 11.1845C5.61699 11.4134 5.59776 11.6684 5.66042 11.9094C5.72307 12.1505 5.86404 12.3638 6.06117 12.516C6.2583 12.6681 6.5004 12.7504 6.74942 12.75C6.8723 12.7487 6.99409 12.7269 7.1098 12.6855L7.58755 13.2907C7.32902 13.4268 7.04154 13.4986 6.74942 13.5C6.34949 13.5065 5.95765 13.387 5.62939 13.1584C5.30113 12.9299 5.05309 12.6039 4.92038 12.2265C4.78767 11.8492 4.77702 11.4397 4.88995 11.056C5.00287 10.6723 5.23364 10.3338 5.54958 10.0885C5.86552 9.84322 6.25062 9.70353 6.65035 9.68922C7.05008 9.67491 7.44418 9.78672 7.77685 10.0088C8.10952 10.2309 8.3639 10.552 8.50396 10.9266C8.64403 11.3013 8.66269 11.7105 8.55729 12.0964L9.37442 13.1321V8.25L11.0244 12.2119C11.1122 12.4267 11.2817 12.598 11.4957 12.6878C11.7097 12.7777 11.9507 12.7789 12.1655 12.6911C12.3804 12.6034 12.5516 12.4338 12.6415 12.2198C12.7314 12.0058 12.7326 11.7649 12.6448 11.55L10.6903 6.6645C10.5233 6.24695 10.235 5.88902 9.86264 5.63689C9.49026 5.38476 9.05088 5.25 8.60117 5.25H4.52267C4.07296 5.25 3.63358 5.38476 3.2612 5.63689C2.88882 5.88902 2.60054 6.24695 2.43355 6.6645L0.479046 11.55C0.391275 11.7649 0.392459 12.0058 0.482336 12.2198C0.572213 12.4338 0.74342 12.6034 0.958295 12.6911C1.17317 12.7789 1.41411 12.7777 1.62811 12.6878C1.84212 12.598 2.01165 12.4267 2.09942 12.2119L3.74942 8.25V22.4876C3.75051 22.7864 3.86913 23.0728 4.07964 23.2848C4.29015 23.4968 4.57564 23.6175 4.87441 23.6208C5.17318 23.624 5.46123 23.5096 5.6763 23.3022C5.89138 23.0948 6.0162 22.8111 6.0238 22.5124L6.18692 15H6.93692L7.10005 22.5124C7.10764 22.8111 7.23246 23.0948 7.44754 23.3022C7.66261 23.5096 7.95066 23.624 8.24943 23.6208C8.5482 23.6175 8.83369 23.4968 9.0442 23.2848C9.25471 23.0728 9.37333 22.7864 9.37442 22.4876V15.5546L12.08 18.9821C12.1151 19.0266 12.1598 19.0626 12.2108 19.0874C12.2618 19.1121 12.3177 19.125 12.3744 19.125H13.8744V18.375Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M15.1875 5.0625H17.0625V7.875H15.1875V5.0625Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M18.1875 3.09375H20.0625V7.875H18.1875V3.09375Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M21.1875 1.125H23.0625V7.875H21.1875V1.125Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M14.625 8.625H23.625V9.375H14.625V8.625Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M18.6041 16.9519C18.394 16.8233 18.1608 16.7374 17.9176 16.699C17.6743 16.6606 17.4259 16.6704 17.1865 16.728C16.9471 16.7856 16.7214 16.8898 16.5223 17.0346C16.3231 17.1795 16.1545 17.3621 16.0259 17.5721L14.0681 20.7705C13.809 21.1947 13.7288 21.7043 13.845 22.1875C13.9612 22.6708 14.2643 23.0882 14.6879 23.3482C14.898 23.4768 15.1313 23.5627 15.3745 23.6011C15.6177 23.6395 15.8661 23.6295 16.1055 23.5719C16.3449 23.5143 16.5706 23.4101 16.7698 23.2652C16.9689 23.1203 17.1375 22.9377 17.2661 22.7276L19.2243 19.5296C19.4832 19.1054 19.5633 18.5958 19.4471 18.1125C19.3308 17.6293 19.0276 17.2119 18.6041 16.9519ZM18.5846 19.1385L17.8008 20.4187L15.8816 19.2442L16.6657 17.9625C16.7425 17.8358 16.8436 17.7256 16.9631 17.6381C17.0827 17.5506 17.2183 17.4876 17.3622 17.4527C17.5062 17.4177 17.6556 17.4116 17.802 17.4345C17.9483 17.4575 18.0887 17.5092 18.215 17.5865C18.3413 17.6639 18.4511 17.7654 18.5381 17.8853C18.6251 18.0052 18.6876 18.1411 18.7219 18.2852C18.7563 18.4293 18.7618 18.5787 18.7382 18.725C18.7147 18.8712 18.6624 19.0114 18.5846 19.1374V19.1385Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M18.2852 22.5C18.5659 22.8519 18.9224 23.136 19.3281 23.3309C19.7339 23.5259 20.1784 23.6269 20.6286 23.6262C21.0787 23.6255 21.5229 23.5232 21.9281 23.327C22.3332 23.1308 22.6889 22.8456 22.9685 22.4929L19.5602 20.4172L18.2852 22.5Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M20.6259 17.625C20.4487 17.6258 20.2719 17.6424 20.0976 17.6745C20.2184 18.0155 20.2673 18.3779 20.2411 18.7388C20.2149 19.0996 20.1142 19.4511 19.9453 19.7711L23.3608 21.8513C23.5669 21.3948 23.6551 20.8939 23.6175 20.3945C23.5799 19.8951 23.4176 19.413 23.1455 18.9926C22.8734 18.5721 22.5002 18.2266 22.06 17.9877C21.6198 17.7488 21.1268 17.6241 20.6259 17.625Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M6.5625 4.875C7.80514 4.875 8.8125 3.86764 8.8125 2.625C8.8125 1.38236 7.80514 0.375 6.5625 0.375C5.31986 0.375 4.3125 1.38236 4.3125 2.625C4.3125 3.86764 5.31986 4.875 6.5625 4.875Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M12.9437 2.25H14.3196C14.408 2.50021 14.5821 2.71109 14.811 2.84536C15.0399 2.97964 15.3089 3.02868 15.5705 2.9838C15.832 2.93892 16.0693 2.80303 16.2404 2.60012C16.4114 2.39722 16.5052 2.14039 16.5052 1.875C16.5052 1.60962 16.4114 1.35278 16.2404 1.14988C16.0693 0.946979 15.832 0.811081 15.5705 0.766204C15.3089 0.721327 15.0399 0.770362 14.811 0.904641C14.5821 1.03892 14.408 1.2498 14.3196 1.5H12.7506C12.6908 1.5 12.632 1.51425 12.5789 1.54158C12.5258 1.56891 12.48 1.60853 12.4453 1.65713L10.5703 4.28213L11.1808 4.71788L12.9437 2.25Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_605_8499">
                                            <rect width="24" height="24" fill="white" />
                                          </clipPath>
                                        </defs>
                                      </svg>
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
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clipPath="url(#clip0_605_8499)">
                                          <path
                                            d="M13.8744 18.375H12.5563L7.69967 12.2224C7.8317 12.0112 7.88983 11.7622 7.8649 11.5144C7.83997 11.2667 7.7334 11.0342 7.56196 10.8536C7.39051 10.673 7.1639 10.5545 6.91777 10.5167C6.67163 10.479 6.41992 10.5241 6.20221 10.645C5.9845 10.7658 5.81313 10.9557 5.71506 11.1845C5.61699 11.4134 5.59776 11.6684 5.66042 11.9094C5.72307 12.1505 5.86404 12.3638 6.06117 12.516C6.2583 12.6681 6.5004 12.7504 6.74942 12.75C6.8723 12.7487 6.99409 12.7269 7.1098 12.6855L7.58755 13.2907C7.32902 13.4268 7.04154 13.4986 6.74942 13.5C6.34949 13.5065 5.95765 13.387 5.62939 13.1584C5.30113 12.9299 5.05309 12.6039 4.92038 12.2265C4.78767 11.8492 4.77702 11.4397 4.88995 11.056C5.00287 10.6723 5.23364 10.3338 5.54958 10.0885C5.86552 9.84322 6.25062 9.70353 6.65035 9.68922C7.05008 9.67491 7.44418 9.78672 7.77685 10.0088C8.10952 10.2309 8.3639 10.552 8.50396 10.9266C8.64403 11.3013 8.66269 11.7105 8.55729 12.0964L9.37442 13.1321V8.25L11.0244 12.2119C11.1122 12.4267 11.2817 12.598 11.4957 12.6878C11.7097 12.7777 11.9507 12.7789 12.1655 12.6911C12.3804 12.6034 12.5516 12.4338 12.6415 12.2198C12.7314 12.0058 12.7326 11.7649 12.6448 11.55L10.6903 6.6645C10.5233 6.24695 10.235 5.88902 9.86264 5.63689C9.49026 5.38476 9.05088 5.25 8.60117 5.25H4.52267C4.07296 5.25 3.63358 5.38476 3.2612 5.63689C2.88882 5.88902 2.60054 6.24695 2.43355 6.6645L0.479046 11.55C0.391275 11.7649 0.392459 12.0058 0.482336 12.2198C0.572213 12.4338 0.74342 12.6034 0.958295 12.6911C1.17317 12.7789 1.41411 12.7777 1.62811 12.6878C1.84212 12.598 2.01165 12.4267 2.09942 12.2119L3.74942 8.25V22.4876C3.75051 22.7864 3.86913 23.0728 4.07964 23.2848C4.29015 23.4968 4.57564 23.6175 4.87441 23.6208C5.17318 23.624 5.46123 23.5096 5.6763 23.3022C5.89138 23.0948 6.0162 22.8111 6.0238 22.5124L6.18692 15H6.93692L7.10005 22.5124C7.10764 22.8111 7.23246 23.0948 7.44754 23.3022C7.66261 23.5096 7.95066 23.624 8.24943 23.6208C8.5482 23.6175 8.83369 23.4968 9.0442 23.2848C9.25471 23.0728 9.37333 22.7864 9.37442 22.4876V15.5546L12.08 18.9821C12.1151 19.0266 12.1598 19.0626 12.2108 19.0874C12.2618 19.1121 12.3177 19.125 12.3744 19.125H13.8744V18.375Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M15.1875 5.0625H17.0625V7.875H15.1875V5.0625Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M18.1875 3.09375H20.0625V7.875H18.1875V3.09375Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M21.1875 1.125H23.0625V7.875H21.1875V1.125Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M14.625 8.625H23.625V9.375H14.625V8.625Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M18.6041 16.9519C18.394 16.8233 18.1608 16.7374 17.9176 16.699C17.6743 16.6606 17.4259 16.6704 17.1865 16.728C16.9471 16.7856 16.7214 16.8898 16.5223 17.0346C16.3231 17.1795 16.1545 17.3621 16.0259 17.5721L14.0681 20.7705C13.809 21.1947 13.7288 21.7043 13.845 22.1875C13.9612 22.6708 14.2643 23.0882 14.6879 23.3482C14.898 23.4768 15.1313 23.5627 15.3745 23.6011C15.6177 23.6395 15.8661 23.6295 16.1055 23.5719C16.3449 23.5143 16.5706 23.4101 16.7698 23.2652C16.9689 23.1203 17.1375 22.9377 17.2661 22.7276L19.2243 19.5296C19.4832 19.1054 19.5633 18.5958 19.4471 18.1125C19.3308 17.6293 19.0276 17.2119 18.6041 16.9519ZM18.5846 19.1385L17.8008 20.4187L15.8816 19.2442L16.6657 17.9625C16.7425 17.8358 16.8436 17.7256 16.9631 17.6381C17.0827 17.5506 17.2183 17.4876 17.3622 17.4527C17.5062 17.4177 17.6556 17.4116 17.802 17.4345C17.9483 17.4575 18.0887 17.5092 18.215 17.5865C18.3413 17.6639 18.4511 17.7654 18.5381 17.8853C18.6251 18.0052 18.6876 18.1411 18.7219 18.2852C18.7563 18.4293 18.7618 18.5787 18.7382 18.725C18.7147 18.8712 18.6624 19.0114 18.5846 19.1374V19.1385Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M18.2852 22.5C18.5659 22.8519 18.9224 23.136 19.3281 23.3309C19.7339 23.5259 20.1784 23.6269 20.6286 23.6262C21.0787 23.6255 21.5229 23.5232 21.9281 23.327C22.3332 23.1308 22.6889 22.8456 22.9685 22.4929L19.5602 20.4172L18.2852 22.5Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M20.6259 17.625C20.4487 17.6258 20.2719 17.6424 20.0976 17.6745C20.2184 18.0155 20.2673 18.3779 20.2411 18.7388C20.2149 19.0996 20.1142 19.4511 19.9453 19.7711L23.3608 21.8513C23.5669 21.3948 23.6551 20.8939 23.6175 20.3945C23.5799 19.8951 23.4176 19.413 23.1455 18.9926C22.8734 18.5721 22.5002 18.2266 22.06 17.9877C21.6198 17.7488 21.1268 17.6241 20.6259 17.625Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M6.5625 4.875C7.80514 4.875 8.8125 3.86764 8.8125 2.625C8.8125 1.38236 7.80514 0.375 6.5625 0.375C5.31986 0.375 4.3125 1.38236 4.3125 2.625C4.3125 3.86764 5.31986 4.875 6.5625 4.875Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                          <path
                                            d="M12.9437 2.25H14.3196C14.408 2.50021 14.5821 2.71109 14.811 2.84536C15.0399 2.97964 15.3089 3.02868 15.5705 2.9838C15.832 2.93892 16.0693 2.80303 16.2404 2.60012C16.4114 2.39722 16.5052 2.14039 16.5052 1.875C16.5052 1.60962 16.4114 1.35278 16.2404 1.14988C16.0693 0.946979 15.832 0.811081 15.5705 0.766204C15.3089 0.721327 15.0399 0.770362 14.811 0.904641C14.5821 1.03892 14.408 1.2498 14.3196 1.5H12.7506C12.6908 1.5 12.632 1.51425 12.5789 1.54158C12.5258 1.56891 12.48 1.60853 12.4453 1.65713L10.5703 4.28213L11.1808 4.71788L12.9437 2.25Z"
                                            fill="#0066BE"
                                            fillOpacity="0.6"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_605_8499">
                                            <rect width="24" height="24" fill="white" />
                                          </clipPath>
                                        </defs>
                                      </svg>
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
                                  <svg
                                    width="20"
                                    height="24"
                                    viewBox="0 0 20 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M2.74061 0C1.44752 0 0.399245 1.0233 0.399196 2.28563L0.398438 21.7142C0.398388 22.9766 1.44669 24 2.73985 24H17.2586C18.5517 24 19.6 22.9767 19.6 21.7143V2.28571C19.6 1.02335 18.5517 0 17.2586 0H2.74061ZM15.1584 4.8H17.3184C17.4139 4.8 17.5055 4.76207 17.573 4.69456C17.6405 4.62704 17.6784 4.53548 17.6784 4.44C17.6784 3.77165 17.4129 3.13068 16.9403 2.65809C16.4678 2.1855 15.8268 1.92 15.1584 1.92C15.063 1.92 14.9714 1.95793 14.9039 2.02544C14.8364 2.09295 14.7984 2.18452 14.7984 2.28V4.2636C14.7984 4.638 14.9604 4.8 15.1584 4.8ZM12.1459 7.47552C11.8645 7.19701 11.6574 6.85238 11.5435 6.47314C11.4286 6.09536 11.4076 5.69525 11.4822 5.3075C11.5569 4.91974 11.7249 4.55607 11.9719 4.248C12.1973 3.97001 12.482 3.74598 12.8052 3.59233C13.1283 3.43868 13.4818 3.3593 13.8396 3.36C13.9304 3.36 14.0176 3.39613 14.0819 3.46043C14.1462 3.52472 14.1823 3.61193 14.1823 3.70286V4.90286C14.1823 5.03926 14.2364 5.17007 14.3328 5.26651C14.4292 5.36296 14.56 5.41714 14.6963 5.41714H15.8957C15.9866 5.41714 16.0738 5.45327 16.1381 5.51757C16.2023 5.58186 16.2384 5.66907 16.2384 5.76C16.2384 6.39652 15.9857 7.00697 15.5358 7.45706C15.0859 7.90714 14.4758 8.16 13.8396 8.16C13.608 8.16026 13.3774 8.12912 13.1542 8.06743C12.7739 7.95753 12.4272 7.75403 12.1459 7.47552ZM15.1184 11.3478C15.1192 10.648 15.6919 10.0808 16.3984 10.08C17.1053 10.08 17.6784 10.6477 17.6784 11.3478C17.6784 12.048 17.1053 12.6157 16.3984 12.6157C16.16 12.6149 15.9267 12.5476 15.7253 12.4215L13.4022 13.7894C13.4031 13.8022 13.4049 13.8147 13.4066 13.8272C13.4092 13.8457 13.4117 13.8643 13.4117 13.8835C13.4125 14.5294 12.9225 15.0722 12.2745 15.1437C11.6266 15.2152 11.028 14.7923 10.8852 14.1623L8.74283 13.1113C8.3458 13.4923 7.74361 13.5705 7.2608 13.3038L4.79268 15.1283C4.8483 15.2706 4.87736 15.4215 4.87846 15.5741C4.87846 16.2742 4.30533 16.8419 3.59846 16.8419C2.89159 16.8419 2.31846 16.2742 2.31846 15.5741C2.31846 14.8737 2.89159 14.3062 3.59846 14.3062C3.82409 14.3075 4.04534 14.3684 4.23908 14.4828L6.68283 12.6764C6.48424 12.2023 6.59377 11.6566 6.96033 11.2938C7.32674 10.9311 7.87783 10.8229 8.35627 11.0197C8.8347 11.2168 9.14611 11.6798 9.14517 12.193C9.14314 12.248 9.13767 12.3028 9.12845 12.3571L11.0124 13.2814C11.2047 12.9241 11.5588 12.6805 11.9639 12.6268C12.3689 12.5731 12.7753 12.7158 13.0556 13.0104L15.1916 11.7527C15.1448 11.6227 15.1202 11.4859 15.1184 11.3478ZM15.5452 15.1514H17.2517C17.4874 15.1514 17.6785 15.3407 17.6785 15.5741L17.6784 21.6573C17.6784 21.8907 17.4873 22.08 17.2517 22.08H15.5452C15.3095 22.08 15.1184 21.8907 15.1184 21.6573L15.1185 15.5741C15.1185 15.3407 15.3096 15.1514 15.5452 15.1514ZM8.71848 15.9966H7.01177C6.77614 15.9966 6.58521 16.1859 6.58521 16.4193L6.58518 21.6573C6.58518 21.8907 6.77612 22.08 7.01174 22.08H8.71846C8.95408 22.08 9.14518 21.8907 9.14518 21.6573L9.1452 16.4193C9.1452 16.1859 8.95411 15.9966 8.71848 15.9966ZM2.31846 19.8001C2.31846 19.5668 2.50956 19.3776 2.74518 19.3776H4.45174C4.68737 19.3776 4.87846 19.5668 4.87846 19.8001L4.87843 21.6573C4.87843 21.8907 4.68734 22.08 4.45171 22.08H2.74516C2.50953 22.08 2.31844 21.8907 2.31844 21.6573L2.31846 19.8001ZM11.2784 17.6871H12.9852C13.2208 17.6871 13.4117 17.8764 13.4117 18.1098L13.4117 21.6573C13.4117 21.8907 13.2208 22.08 12.9851 22.08H11.2784C11.0428 22.08 10.8517 21.8907 10.8517 21.6573L10.8517 18.1098C10.8517 17.8764 11.0428 17.6871 11.2784 17.6871ZM2.79844 2.4C2.53334 2.4 2.31844 2.6149 2.31844 2.88C2.31844 3.1451 2.53334 3.36 2.79844 3.36H9.99844C10.2635 3.36 10.4784 3.1451 10.4784 2.88C10.4784 2.6149 10.2635 2.4 9.99844 2.4H2.79844ZM2.31844 5.28C2.31844 5.0149 2.53334 4.8 2.79844 4.8H7.11844C7.38353 4.8 7.59844 5.0149 7.59844 5.28C7.59844 5.5451 7.38353 5.76 7.11844 5.76H2.79844C2.53334 5.76 2.31844 5.5451 2.31844 5.28Z"
                                      fill="#0066BE"
                                      fillOpacity="0.6"
                                    />
                                  </svg>
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
                                      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 118.1 122.88"><g><path d="M69.41,20.71c10.95,0,14.33,0.09,25.28,0.09c1.25,0,2.45,0.11,3.61,0.33c1.15,0.22,2.26,0.54,3.29,0.98 c1.04,0.44,2.05,0.99,3.02,1.64c0.96,0.65,1.87,1.41,2.73,2.26c0.86,0.86,1.62,1.78,2.26,2.73c0.66,0.97,1.21,1.98,1.64,3.02 c0.43,1.04,0.76,2.14,0.98,3.29c0.22,1.16,0.33,2.36,0.33,3.61v36.24c0,1.25-0.11,2.45-0.33,3.61c-0.22,1.16-0.55,2.26-0.98,3.29 c-0.44,1.05-0.99,2.06-1.64,3.02c-0.65,0.96-1.41,1.87-2.26,2.73l-0.01,0.01c-0.89,0.87-1.82,1.63-2.78,2.27 c-0.96,0.65-1.97,1.19-3.01,1.63c-1.04,0.43-2.13,0.76-3.28,0.98c-1.14,0.22-2.34,0.33-3.58,0.33H81c-0.43,0-0.85,0.1-1.24,0.29 c-0.36,0.18-0.69,0.44-0.94,0.78l-0.02,0.02c-1.08,1.43-2.21,2.82-3.4,4.16c-1.19,1.33-2.43,2.62-3.76,3.84 c-1.29,1.2-2.65,2.35-4.06,3.46c-1.41,1.11-2.87,2.15-4.36,3.13c-1.43,0.94-2.94,1.84-4.51,2.69c-1.55,0.84-3.14,1.62-4.76,2.34 c-0.18,0.08-0.38,0.07-0.56-0.03c-0.3-0.17-0.41-0.56-0.24-0.86c0.29-0.51,0.57-1.02,0.85-1.56c0.27-0.5,0.51-1.01,0.75-1.55l0,0 c0.46-1.03,0.9-2.08,1.32-3.16c0.43-1.09,0.83-2.18,1.22-3.31c0.37-1.05,0.71-2.14,1.04-3.24c0.33-1.1,0.64-2.21,0.94-3.32 c0.08-0.33,0.16-0.66,0.16-1c0-0.74-0.3-1.43-0.79-1.92l-0.03-0.03c-0.5-0.5-1.2-0.82-1.95-0.82H40.76c-1.25,0-2.44-0.11-3.58-0.33 c-1.13-0.22-2.21-0.54-3.24-0.97l-0.02-0.01c-1.02-0.4-2.01-0.94-2.96-1.58c-0.98-0.66-1.93-1.45-2.84-2.33l-0.01-0.01 c-0.86-0.86-1.62-1.77-2.27-2.73c-0.66-0.97-1.2-1.97-1.64-3.02c-0.43-1.04-0.76-2.14-0.98-3.29c-0.22-1.16-0.33-2.36-0.33-3.61 v-7.37c0-3.7-4.79-3.73-5.59-1.09v8.41c0,1.58,0.15,3.12,0.43,4.6c0.29,1.51,0.72,2.97,1.29,4.39c0.56,1.37,1.27,2.69,2.13,3.96 c0.86,1.26,1.86,2.47,3,3.61c1.13,1.14,2.34,2.14,3.61,3c1.25,0.85,2.57,1.56,3.94,2.12l0.02,0.01c1.41,0.57,2.88,1,4.38,1.29 c1.48,0.28,3.02,0.43,4.6,0.43l11.43,0c0.07,0,0.15,0.01,0.22,0.03c0.33,0.11,0.51,0.46,0.41,0.79l-0.01,0.02 c-0.22,0.7-0.44,1.4-0.69,2.15l-0.01,0.04c-0.35,1.01-0.74,2.04-1.15,3.07c-0.39,0.97-0.79,1.93-1.21,2.85 c-0.01,0.05-0.02,0.09-0.04,0.14c-0.41,0.93-0.88,1.85-1.43,2.76c-0.54,0.91-1.15,1.8-1.81,2.68c-0.68,0.88-1.44,1.77-2.28,2.67 l-0.03,0.04c-0.85,0.9-1.77,1.79-2.76,2.65c-0.57,0.51-0.88,1.21-0.92,1.91c-0.04,0.7,0.19,1.42,0.7,1.99 c0.36,0.4,0.8,0.67,1.28,0.81c0.48,0.14,1,0.16,1.49,0.02c2.08-0.56,4.12-1.17,6.1-1.85c1.98-0.68,3.9-1.42,5.74-2.22 c1.86-0.8,3.68-1.68,5.44-2.63c1.75-0.94,3.45-1.96,5.09-3.04l0,0c1.63-1.06,3.21-2.19,4.74-3.39c1.53-1.2,3-2.46,4.41-3.77 l0.03-0.03c1.19-1.12,2.34-2.3,3.46-3.52c1.13-1.24,2.22-2.52,3.24-3.82c0.11-0.17,0.31-0.29,0.53-0.29h12.02 c1.61,0,3.15-0.15,4.64-0.43c1.5-0.29,2.94-0.72,4.32-1.28l0.02-0.01c1.39-0.59,2.71-1.31,3.98-2.16c1.26-0.85,2.46-1.83,3.6-2.97 c1.14-1.14,2.14-2.35,3-3.61c0.85-1.26,1.57-2.59,2.13-3.96c0.57-1.39,1-2.84,1.29-4.35c0.28-1.48,0.43-3.03,0.43-4.64l0-36.24 c0-1.61-0.15-3.16-0.43-4.64c-0.29-1.51-0.72-2.96-1.29-4.34c-0.56-1.37-1.28-2.7-2.13-3.96c-0.86-1.27-1.86-2.48-2.99-3.61 c-1.14-1.14-2.34-2.14-3.61-3c-1.25-0.85-2.57-1.56-3.94-2.12l-0.02-0.01c-1.42-0.57-2.88-1-4.39-1.29 c-1.48-0.28-3.02-0.43-4.6-0.43c-11.38,0-15.19-0.05-26.57-0.05C65.42,15.91,65.24,20.71,69.41,20.71L69.41,20.71z M47.02,76.55 c-1.45,0.02-2.63-1.14-2.65-2.59c-0.02-1.45,1.14-2.63,2.59-2.65l27.78-0.42l5.32-0.34c1.45-0.09,2.69,1.01,2.78,2.45 c0.09,1.45-1.01,2.69-2.45,2.78l-5.32,0.34C75.07,76.12,49.36,76.51,47.02,76.55L47.02,76.55z M55.34,60.09 c-1.45,0-2.63-1.18-2.63-2.63c0-1.45,1.18-2.63,2.63-2.63h37.52c1.45,0,2.63,1.18,2.63,2.63c0,1.45-1.18,2.63-2.63,2.63H55.34 L55.34,60.09z M67.02,44.39c-1.45,0-2.63-1.18-2.63-2.63c0-1.45,1.18-2.63,2.63-2.63h25.84c1.45,0,2.63,1.18,2.63,2.63 c0,1.45-1.18,2.63-2.63,2.63H67.02L67.02,44.39z M28.3,0.52l7.15,17.46l18.82,1.4c0.46,0.03,0.81,0.43,0.78,0.9 c-0.02,0.24-0.14,0.45-0.31,0.6L40.35,33.06l4.48,18.34c0.11,0.45-0.17,0.9-0.62,1.01c-0.24,0.06-0.47,0.01-0.66-0.12l-16.03-9.92 l-16.05,9.93c-0.39,0.24-0.91,0.12-1.15-0.27c-0.12-0.2-0.15-0.43-0.1-0.64l4.48-18.34L0.3,20.87c-0.35-0.3-0.4-0.83-0.1-1.18 c0.15-0.18,0.36-0.28,0.58-0.3l18.82-1.4l7.15-17.46c0.17-0.43,0.66-0.63,1.09-0.46C28.06,0.15,28.22,0.32,28.3,0.52L28.3,0.52z" fill="#0066be" fillOpacity="0.6" /></g></svg>
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
                                <svg
                                  width="20"
                                  height="24"
                                  viewBox="0 0 20 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.74061 0C1.44752 0 0.399245 1.0233 0.399196 2.28563L0.398438 21.7142C0.398388 22.9766 1.44669 24 2.73985 24H17.2586C18.5517 24 19.6 22.9767 19.6 21.7143V2.28571C19.6 1.02335 18.5517 0 17.2586 0H2.74061ZM15.1584 4.8H17.3184C17.4139 4.8 17.5055 4.76207 17.573 4.69456C17.6405 4.62704 17.6784 4.53548 17.6784 4.44C17.6784 3.77165 17.4129 3.13068 16.9403 2.65809C16.4678 2.1855 15.8268 1.92 15.1584 1.92C15.063 1.92 14.9714 1.95793 14.9039 2.02544C14.8364 2.09295 14.7984 2.18452 14.7984 2.28V4.2636C14.7984 4.638 14.9604 4.8 15.1584 4.8ZM12.1459 7.47552C11.8645 7.19701 11.6574 6.85238 11.5435 6.47314C11.4286 6.09536 11.4076 5.69525 11.4822 5.3075C11.5569 4.91974 11.7249 4.55607 11.9719 4.248C12.1973 3.97001 12.482 3.74598 12.8052 3.59233C13.1283 3.43868 13.4818 3.3593 13.8396 3.36C13.9304 3.36 14.0176 3.39613 14.0819 3.46043C14.1462 3.52472 14.1823 3.61193 14.1823 3.70286V4.90286C14.1823 5.03926 14.2364 5.17007 14.3328 5.26651C14.4292 5.36296 14.56 5.41714 14.6963 5.41714H15.8957C15.9866 5.41714 16.0738 5.45327 16.1381 5.51757C16.2023 5.58186 16.2384 5.66907 16.2384 5.76C16.2384 6.39652 15.9857 7.00697 15.5358 7.45706C15.0859 7.90714 14.4758 8.16 13.8396 8.16C13.608 8.16026 13.3774 8.12912 13.1542 8.06743C12.7739 7.95753 12.4272 7.75403 12.1459 7.47552ZM15.1184 11.3478C15.1192 10.648 15.6919 10.0808 16.3984 10.08C17.1053 10.08 17.6784 10.6477 17.6784 11.3478C17.6784 12.048 17.1053 12.6157 16.3984 12.6157C16.16 12.6149 15.9267 12.5476 15.7253 12.4215L13.4022 13.7894C13.4031 13.8022 13.4049 13.8147 13.4066 13.8272C13.4092 13.8457 13.4117 13.8643 13.4117 13.8835C13.4125 14.5294 12.9225 15.0722 12.2745 15.1437C11.6266 15.2152 11.028 14.7923 10.8852 14.1623L8.74283 13.1113C8.3458 13.4923 7.74361 13.5705 7.2608 13.3038L4.79268 15.1283C4.8483 15.2706 4.87736 15.4215 4.87846 15.5741C4.87846 16.2742 4.30533 16.8419 3.59846 16.8419C2.89159 16.8419 2.31846 16.2742 2.31846 15.5741C2.31846 14.8737 2.89159 14.3062 3.59846 14.3062C3.82409 14.3075 4.04534 14.3684 4.23908 14.4828L6.68283 12.6764C6.48424 12.2023 6.59377 11.6566 6.96033 11.2938C7.32674 10.9311 7.87783 10.8229 8.35627 11.0197C8.8347 11.2168 9.14611 11.6798 9.14517 12.193C9.14314 12.248 9.13767 12.3028 9.12845 12.3571L11.0124 13.2814C11.2047 12.9241 11.5588 12.6805 11.9639 12.6268C12.3689 12.5731 12.7753 12.7158 13.0556 13.0104L15.1916 11.7527C15.1448 11.6227 15.1202 11.4859 15.1184 11.3478ZM15.5452 15.1514H17.2517C17.4874 15.1514 17.6785 15.3407 17.6785 15.5741L17.6784 21.6573C17.6784 21.8907 17.4873 22.08 17.2517 22.08H15.5452C15.3095 22.08 15.1184 21.8907 15.1184 21.6573L15.1185 15.5741C15.1185 15.3407 15.3096 15.1514 15.5452 15.1514ZM8.71848 15.9966H7.01177C6.77614 15.9966 6.58521 16.1859 6.58521 16.4193L6.58518 21.6573C6.58518 21.8907 6.77612 22.08 7.01174 22.08H8.71846C8.95408 22.08 9.14518 21.8907 9.14518 21.6573L9.1452 16.4193C9.1452 16.1859 8.95411 15.9966 8.71848 15.9966ZM2.31846 19.8001C2.31846 19.5668 2.50956 19.3776 2.74518 19.3776H4.45174C4.68737 19.3776 4.87846 19.5668 4.87846 19.8001L4.87843 21.6573C4.87843 21.8907 4.68734 22.08 4.45171 22.08H2.74516C2.50953 22.08 2.31844 21.8907 2.31844 21.6573L2.31846 19.8001ZM11.2784 17.6871H12.9852C13.2208 17.6871 13.4117 17.8764 13.4117 18.1098L13.4117 21.6573C13.4117 21.8907 13.2208 22.08 12.9851 22.08H11.2784C11.0428 22.08 10.8517 21.8907 10.8517 21.6573L10.8517 18.1098C10.8517 17.8764 11.0428 17.6871 11.2784 17.6871ZM2.79844 2.4C2.53334 2.4 2.31844 2.6149 2.31844 2.88C2.31844 3.1451 2.53334 3.36 2.79844 3.36H9.99844C10.2635 3.36 10.4784 3.1451 10.4784 2.88C10.4784 2.6149 10.2635 2.4 9.99844 2.4H2.79844ZM2.31844 5.28C2.31844 5.0149 2.53334 4.8 2.79844 4.8H7.11844C7.38353 4.8 7.59844 5.0149 7.59844 5.28C7.59844 5.5451 7.38353 5.76 7.11844 5.76H2.79844C2.53334 5.76 2.31844 5.5451 2.31844 5.28Z"
                                    fill="#0066BE"
                                    fillOpacity="0.6"
                                  />
                                </svg>
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
                                  <svg xmlns="
                                http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g clipPath="url(#clip0_5227_477)">
                                      <path fillRule="evenodd" clipRule="evenodd" d="M20.2653 8.66356C20.3525 8.44548 20.6475 8.44548 20.7347 8.66356L21.5218 10.6323C21.5585 10.724 21.6409 10.7867 21.7355 10.7949L23.7662 10.9708C23.9911 10.9902 24.0823 11.2841 23.9112 11.4383L22.3671 12.8309C22.2951 12.8958 22.2636 12.9973 22.2854 13.0941L22.7533 15.1715C22.8051 15.4016 22.5665 15.5832 22.3736 15.4605L20.6321 14.3524C20.5509 14.3008 20.4491 14.3008 20.3679 14.3524L18.6264 15.4605C18.4335 15.5832 18.1949 15.4016 18.2467 15.1715L18.7146 13.0941C18.7364 12.9973 18.7049 12.8958 18.6329 12.8309L17.0888 11.4383C16.9177 11.2841 17.0089 10.9902 17.2338 10.9708L19.2645 10.7949C19.3591 10.7867 19.4415 10.724 19.4782 10.6323L20.2653 8.66356ZM19.9424 10.8179L20.5 9.4234L21.0576 10.8179C21.1608 11.076 21.4003 11.2677 21.6924 11.293L23.1827 11.4221L22.0322 12.4596C21.8221 12.6491 21.7373 12.9362 21.7977 13.2039L22.1387 14.7184L20.9005 13.9306C20.6556 13.7747 20.3444 13.7747 20.0995 13.9306L18.8613 14.7184L19.2024 13.2039C19.2627 12.9362 19.1779 12.6491 18.9678 12.4596L17.8173 11.4221L19.3076 11.293C19.5997 11.2677 19.8392 11.076 19.9424 10.8179Z" fill="#0066BE" fillOpacity="0.6" />
                                      <path d="M3.26533 8.66356C3.35252 8.44548 3.64748 8.44548 3.73467 8.66356L4.52183 10.6323C4.55851 10.724 4.64091 10.7867 4.73554 10.7949L6.76618 10.9708C6.99112 10.9902 7.08226 11.2841 6.91122 11.4383L5.36706 12.8309C5.2951 12.8958 5.26363 12.9973 5.28543 13.0941L5.75328 15.1715C5.80511 15.4016 5.56648 15.5832 5.37357 15.4605L3.63208 14.3524C3.55093 14.3008 3.44907 14.3008 3.36792 14.3524L1.62643 15.4605C1.43352 15.5832 1.19489 15.4016 1.24672 15.1715L1.71457 13.0941C1.73637 12.9973 1.7049 12.8958 1.63294 12.8309L0.088785 11.4383C-0.0822624 11.2841 0.0088847 10.9902 0.233821 10.9708L2.26446 10.7949C2.35909 10.7867 2.44149 10.724 2.47817 10.6323L3.26533 8.66356Z" fill="#0066BE" fillOpacity="0.6" />
                                      <path d="M11.7653 8.66356C11.8525 8.44548 12.1475 8.44548 12.2347 8.66356L13.0218 10.6323C13.0585 10.724 13.1409 10.7867 13.2355 10.7949L15.2662 10.9708C15.4911 10.9902 15.5823 11.2841 15.4112 11.4383L13.8671 12.8309C13.7951 12.8958 13.7636 12.9973 13.7854 13.0941L14.2533 15.1715C14.3051 15.4016 14.0665 15.5832 13.8736 15.4605L12.1321 14.3524C12.0509 14.3008 11.9491 14.3008 11.8679 14.3524L10.1264 15.4605C9.93352 15.5832 9.69489 15.4016 9.74672 15.1715L10.2146 13.0941C10.2364 12.9973 10.2049 12.8958 10.1329 12.8309L8.58879 11.4383C8.41774 11.2841 8.50888 10.9902 8.73382 10.9708L10.7645 10.7949C10.8591 10.7867 10.9415 10.724 10.9782 10.6323L11.7653 8.66356Z" fill="#0066BE" fillOpacity="0.6" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_5227_477">
                                        <rect width="24" height="24" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                        <a href="javascript:;">
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
                    <a href="javascript:;">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                          fill="#8A4E9C"
                        />
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                          fill="#8A4E9C"
                        />
                      </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                        <a href="javascript:;">
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
                          href="javascript:;"
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
                          href="javascript:;"
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
                    <a href="javascript:;">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                          fill="#8A4E9C"
                        />
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                          fill="#8A4E9C"
                        />
                      </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                        <a href="javascript:;">
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
                          href="javascript:;"
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
                          href="javascript:;"
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
                          href="javascript:;"
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
                          href="javascript:;"
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
                          href="javascript:;"
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
                    <a href="javascript:;">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                          fill="#8A4E9C"
                        />
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                          fill="#8A4E9C"
                        />
                      </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                        <a href="javascript:;">
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
                          href="javascript:;"
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
                          href="javascript:;"
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
                    <a href="javascript:;">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                          fill="#8A4E9C"
                        />
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                          fill="#8A4E9C"
                        />
                      </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                      <a href="javascript:;">
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
                          href="javascript:;"
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
                          href="javascript:;"
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
                          href="javascript:;"
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
                          href="javascript:;"
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
                          href="javascript:;"
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
                    <a href="javascript:;">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                          fill="#8A4E9C"
                        />
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                          fill="#8A4E9C"
                        />
                      </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                        <a href="javascript:;">
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
                          href="javascript:;"
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
                          href="javascript:;"
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
                          href="javascript:;"
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
                          href="javascript:;"
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
                    <a href="javascript:;">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                          fill="#8A4E9C"
                        />
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                          fill="#8A4E9C"
                        />
                      </svg>
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
                  <svg
                    width="16"
                    height="38"
                    viewBox="0 0 16 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
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
                          <a href="javascript:;">
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
                            href="javascript:;"
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
                            href="javascript:;"
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
                            href="javascript:;"
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
                      <a href="javascript:;">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                            fill="#8A4E9C"
                          />
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                            fill="#8A4E9C"
                          />
                        </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                        <a href="javascript:;">
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
                          href="javascript:;"
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
                    <a href="javascript:;">
                    <img src= { sidebar_image_path + "smart-list-filter.svg" } alt=""/>
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
                <img src= { sidebar_image_path + "smart-list-help-popup.svg" } alt=""/>
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
                        <a href="javascript:;">
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
                    <a href="javascript:;">
                    <img src= { sidebar_image_path + "help-popup-close.svg" } alt=""/>
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
                  <img src= { sidebar_image_path + "help-popup-view.svg" } alt=""/>
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
                          <a href="javascript:;">
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
                      <a href="javascript:;">
                      <img src= { sidebar_image_path + "create-content.svg" } alt=""/>
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
                  <img src= { sidebar_image_path + "help-popup.svg" } alt=""/>
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
                          <a href="javascript:;">
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
                      <a href="javascript:;">
                      <img src= { sidebar_image_path + "help-setup-popup.svg" } alt=""/>
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
                  <img src= { sidebar_image_path + "help-setup-view.svg" } alt=""/>
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
                      <a href="javascript:;">
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
                 <img src= { sidebar_image_path + "edit-consent-view.svg" } alt=""/>
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
                      <a href="javascript:;">
                      <img src= { sidebar_image_path + "edit-consent-close.svg" } alt=""/>
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
                          <a href="javascript:;">
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
                      <a href="javascript:;">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                            fill="#8A4E9C"
                          />
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                            fill="#8A4E9C"
                          />
                        </svg>
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
                  <svg
                    width="16"
                    height="38"
                    viewBox="0 0 16 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
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
                      <a href="javascript:;">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                            fill="#8A4E9C"
                          />
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                            fill="#8A4E9C"
                          />
                        </svg>
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
                  <svg
                    width="16"
                    height="38"
                    viewBox="0 0 16 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
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
                          <a href="javascript:;">
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
                            the purple <d>x</d> for each filter criteria (it
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
                      <a href="javascript:;">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                            fill="#8A4E9C"
                          />
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                            fill="#8A4E9C"
                          />
                        </svg>
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
                  <svg
                    width="16"
                    height="38"
                    viewBox="0 0 16 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
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
                            the purple <d>x</d> for each filter criteria (it
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
                      <a href="javascript:;">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                            fill="#8A4E9C"
                          />
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                            fill="#8A4E9C"
                          />
                        </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                          purple <d>x</d> for each filter criteria (it
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
                    <a href="javascript:;">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                          fill="#8A4E9C"
                        />
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                          fill="#8A4E9C"
                        />
                      </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                    <a href="javascript:;">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                          fill="#8A4E9C"
                        />
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                          fill="#8A4E9C"
                        />
                      </svg>
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
                  <a href="javascript:;">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="2.72751"
                        height="19.7402"
                        rx="1.36376"
                        transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                        fill="#8A4E9C"
                      />
                      <rect
                        width="2.72751"
                        height="19.7402"
                        rx="1.36376"
                        transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                        fill="#8A4E9C"
                      />
                    </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                    <a href="javascript:;">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                          fill="#8A4E9C"
                        />
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                          fill="#8A4E9C"
                        />
                      </svg>
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
                  <a href="javascript:;">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="2.72751"
                        height="19.7402"
                        rx="1.36376"
                        transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                        fill="#8A4E9C"
                      />
                      <rect
                        width="2.72751"
                        height="19.7402"
                        rx="1.36376"
                        transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                        fill="#8A4E9C"
                      />
                    </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                      <a href="javascript:;">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                            fill="#8A4E9C"
                          />
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                            fill="#8A4E9C"
                          />
                        </svg>
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
                    <a href="javascript:;">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                          fill="#8A4E9C"
                        />
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                          fill="#8A4E9C"
                        />
                      </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                  <a href="javascript:;">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="2.72751"
                        height="19.7402"
                        rx="1.36376"
                        transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                        fill="#8A4E9C"
                      />
                      <rect
                        width="2.72751"
                        height="19.7402"
                        rx="1.36376"
                        transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                        fill="#8A4E9C"
                      />
                    </svg>
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
                  <svg
                    width="16"
                    height="38"
                    viewBox="0 0 16 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
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
                          <a href="javascript:;">
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
                        <a href="javascript:;">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="2.72751"
                              height="19.7402"
                              rx="1.36376"
                              transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                              fill="#8A4E9C"
                            />
                            <rect
                              width="2.72751"
                              height="19.7402"
                              rx="1.36376"
                              transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                              fill="#8A4E9C"
                            />
                          </svg>
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
                  <svg
                    width="16"
                    height="38"
                    viewBox="0 0 16 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
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
                        <a href="javascript:;">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="2.72751"
                              height="19.7402"
                              rx="1.36376"
                              transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                              fill="#8A4E9C"
                            />
                            <rect
                              width="2.72751"
                              height="19.7402"
                              rx="1.36376"
                              transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                              fill="#8A4E9C"
                            />
                          </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                    <a href="javascript:;">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                          fill="#8A4E9C"
                        />
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                          fill="#8A4E9C"
                        />
                      </svg>
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
                  <svg
                    width="16"
                    height="38"
                    viewBox="0 0 16 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
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
                          <a href="javascript:;">
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
                      <a href="javascript:;">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                            fill="#8A4E9C"
                          />
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                            fill="#8A4E9C"
                          />
                        </svg>
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
                  <svg
                    width="16"
                    height="38"
                    viewBox="0 0 16 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
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
                        <a href="javascript:;">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="2.72751"
                              height="19.7402"
                              rx="1.36376"
                              transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                              fill="#8A4E9C"
                            />
                            <rect
                              width="2.72751"
                              height="19.7402"
                              rx="1.36376"
                              transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                              fill="#8A4E9C"
                            />
                          </svg>
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
                  <svg
                    width="16"
                    height="38"
                    viewBox="0 0 16 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
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
                          <a href="javascript:;">
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
                      <a href="javascript:;">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                            fill="#8A4E9C"
                          />
                          <rect
                            width="2.72751"
                            height="19.7402"
                            rx="1.36376"
                            transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                            fill="#8A4E9C"
                          />
                        </svg>
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
                  <svg
                    width="16"
                    height="38"
                    viewBox="0 0 16 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
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
                        <a href="javascript:;">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="2.72751"
                              height="19.7402"
                              rx="1.36376"
                              transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                              fill="#8A4E9C"
                            />
                            <rect
                              width="2.72751"
                              height="19.7402"
                              rx="1.36376"
                              transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                              fill="#8A4E9C"
                            />
                          </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                    <a href="javascript:;">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                          fill="#8A4E9C"
                        />
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                          fill="#8A4E9C"
                        />
                      </svg>
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
                <svg
                  width="16"
                  height="38"
                  viewBox="0 0 16 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z"
                    fill="#0066BE"
                    fillOpacity="0.6"
                  />
                </svg>
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
                        <a href="javascript:;">
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
                    <a href="javascript:;">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)"
                          fill="#8A4E9C"
                        />
                        <rect
                          width="2.72751"
                          height="19.7402"
                          rx="1.36376"
                          transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)"
                          fill="#8A4E9C"
                        />
                      </svg>
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