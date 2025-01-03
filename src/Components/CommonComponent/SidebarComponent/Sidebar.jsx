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

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                          <g clipPath="url(#clip0_1228_25261)">

                          <path fillRule="evenodd" clipRule="evenodd" d="M2.34912 -0.000184536C1.05603 -0.000184536 0.0077614 1.02311 0.00771219 2.28544L-0.00585937 21.7141C-0.00590858 22.9765 1.04239 23.9999 2.33555 23.9999H21.6515C22.9446 23.9999 23.9929 22.9765 23.9929 21.7141V2.27992C23.9929 1.01755 22.9446 -0.00579691 21.6515 -0.00579691L2.34912 -0.000184536ZM17.1593 4.79985H19.3193C19.4147 4.79985 19.5063 4.76193 19.5738 4.69441C19.6413 4.6269 19.6792 4.53533 19.6792 4.43986C19.6792 3.77151 19.4137 3.13054 18.9412 2.65795C18.4686 2.18535 17.8276 1.91985 17.1593 1.91985C17.0638 1.91985 16.9722 1.95778 16.9047 2.0253C16.8372 2.09281 16.7993 2.18438 16.7993 2.27985V4.26345C16.7993 4.63786 16.9613 4.79985 17.1593 4.79985ZM14.1467 7.47537C13.8653 7.19687 13.6582 6.85224 13.5443 6.473C13.4294 6.09522 13.4084 5.6951 13.4831 5.30735C13.5577 4.9196 13.7258 4.55592 13.9727 4.24786C14.1981 3.96986 14.4828 3.74583 14.806 3.59218C15.1292 3.43853 15.4826 3.35915 15.8404 3.35986C15.9313 3.35986 16.0184 3.39598 16.0827 3.46028C16.147 3.52458 16.1831 3.61178 16.1831 3.70272V4.90272C16.1831 5.03911 16.2372 5.16992 16.3336 5.26637C16.43 5.36282 16.5608 5.417 16.6971 5.417H17.8966C17.9874 5.417 18.0746 5.45312 18.1389 5.51742C18.2031 5.58172 18.2393 5.66893 18.2393 5.75986C18.2393 6.39638 17.9865 7.00682 17.5366 7.45691C17.0868 7.907 16.4766 8.15985 15.8404 8.15985C15.6088 8.16011 15.3782 8.12898 15.155 8.06728C14.7747 7.95739 14.4281 7.75388 14.1467 7.47537ZM17.1193 11.3477C17.12 10.6478 17.6927 10.0806 18.3993 10.0799C19.1061 10.0799 19.6792 10.6475 19.6792 11.3477C19.6792 12.0479 19.1061 12.6156 18.3993 12.6156C18.1608 12.6148 17.9275 12.5475 17.7261 12.4213L15.403 13.7893C15.404 13.802 15.4057 13.8145 15.4074 13.827C15.41 13.8456 15.4125 13.8642 15.4125 13.8834C15.4133 14.5292 14.9233 15.072 14.2754 15.1435C13.6274 15.215 13.0288 14.7922 12.886 14.1621L10.7437 13.1111C10.3466 13.4922 9.74443 13.5703 9.26162 13.3036L6.7935 15.1282C6.84912 15.2704 6.87819 15.4213 6.87928 15.5739C6.87928 16.2741 6.30615 16.8418 5.59928 16.8418C4.89241 16.8418 4.31928 16.2741 4.31928 15.5739C4.31928 14.8736 4.89241 14.3061 5.59928 14.3061C5.8249 14.3073 6.04616 14.3683 6.2399 14.4827L8.68365 12.6762C8.48506 12.2022 8.59459 11.6565 8.96115 11.2937C9.32756 10.9309 9.87865 10.8227 10.3571 11.0196C10.8355 11.2166 11.1469 11.6797 11.146 12.1929C11.144 12.2478 11.1385 12.3026 11.1293 12.3569L13.0132 13.2812C13.2055 12.924 13.5596 12.6804 13.9647 12.6267C14.3697 12.573 14.7761 12.7157 15.0565 13.0102L17.1924 11.7526C17.1457 11.6226 17.121 11.4858 17.1193 11.3477ZM17.546 15.1513H19.2526C19.4882 15.1513 19.6793 15.3406 19.6793 15.5739L19.6792 21.6572C19.6792 21.8906 19.4882 22.0799 19.2525 22.0799H17.546C17.3103 22.0799 17.1193 21.8906 17.1193 21.6572L17.1193 15.5739C17.1193 15.3406 17.3104 15.1513 17.546 15.1513ZM10.7193 15.9965H9.01259C8.77697 15.9965 8.58603 16.1857 8.58603 16.4191L8.586 21.6572C8.586 21.8906 8.77694 22.0798 9.01257 22.0798H10.7193C10.9549 22.0798 11.146 21.8906 11.146 21.6572L11.146 16.4191C11.146 16.1857 10.9549 15.9965 10.7193 15.9965ZM4.31928 19.8C4.31928 19.5666 4.51038 19.3775 4.746 19.3775H6.45256C6.68819 19.3775 6.87928 19.5666 6.87928 19.8L6.87925 21.6572C6.87925 21.8906 6.68816 22.0798 6.45254 22.0798H4.74598C4.51035 22.0798 4.31926 21.8906 4.31926 21.6572L4.31928 19.8ZM13.2793 17.6869H14.986C15.2216 17.6869 15.4125 17.8762 15.4125 18.1096L15.4125 21.6572C15.4125 21.8906 15.2216 22.0798 14.986 22.0798H13.2792C13.0436 22.0798 12.8525 21.8906 12.8525 21.6572L12.8525 18.1096C12.8525 17.8762 13.0436 17.6869 13.2793 17.6869ZM4.79926 2.39985C4.53416 2.39985 4.31926 2.61476 4.31926 2.87985C4.31926 3.14495 4.53416 3.35985 4.79926 3.35985H11.9993C12.2644 3.35985 12.4793 3.14495 12.4793 2.87985C12.4793 2.61476 12.2644 2.39985 11.9993 2.39985H4.79926ZM4.31926 5.27986C4.31926 5.01476 4.53416 4.79985 4.79926 4.79985H9.11926C9.38436 4.79985 9.59926 5.01476 9.59926 5.27986C9.59926 5.54495 9.38436 5.75985 9.11926 5.75985H4.79926C4.53416 5.75985 4.31926 5.54495 4.31926 5.27986Z" fill="#0066BE" fillOpacity="0.6"/>

                          </g>

                          <defs>

                            <clipPath id="clip0_1228_25261">

                              <rect width="24" height="24" fill="white"/>

                            </clipPath>

                          </defs>

                        </svg>

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

                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                        <g clipPath="url(#clip0_1228_25253)">

                        <path fillRule="evenodd" clipRule="evenodd" d="M16.7459 0H2.23283C0.999648 0 -3.27717e-05 0.976868 8.06419e-10 2.18188L0.000534077 21.8182C0.00056685 23.0232 1.00023 24 2.23336 24H14.184V20.4744C14.184 18.7547 15.22 17.2725 16.7 16.6207C16.2894 16.0283 16.0488 15.309 16.0488 14.5334C16.0488 12.7597 17.3073 11.28 18.9787 10.94V2.18182C18.9787 0.976831 17.979 0 16.7459 0ZM4.27815 6.48998C4.28772 6.47931 4.29786 6.46913 4.30856 6.45955C4.31494 6.45383 4.32122 6.44795 4.32739 6.44191L6.59927 4.21797C6.80601 4.0156 6.80601 3.68749 6.59927 3.48511C6.39254 3.28274 6.05735 3.28274 5.85062 3.48511L4.02506 5.27214C3.93672 5.35862 3.79427 5.36106 3.70289 5.27765L2.88869 4.53441C2.67474 4.33911 2.33957 4.35057 2.14006 4.56C1.94055 4.76944 1.95225 5.09754 2.1662 5.29284L3.51861 6.52737C3.73256 6.72267 4.06774 6.71121 4.26725 6.50178C4.27095 6.49789 4.27459 6.49395 4.27815 6.48998ZM8.65699 5.33333C8.65699 4.96514 8.95547 4.66667 9.32365 4.66667H16.6473C17.0155 4.66667 17.3139 4.96514 17.3139 5.33333C17.3139 5.70152 17.0155 6 16.6473 6H9.32366C8.95547 6 8.65699 5.70152 8.65699 5.33333ZM8.65699 11.3333C8.65699 10.9651 8.95547 10.6667 9.32365 10.6667H13.9836C14.3518 10.6667 14.6503 10.9651 14.6503 11.3333C14.6503 11.7015 14.3518 12 13.9836 12H9.32366C8.95547 12 8.65699 11.7015 8.65699 11.3333ZM4.27815 12.49C4.28772 12.4793 4.29786 12.4691 4.30856 12.4595C4.31494 12.4538 4.32122 12.448 4.32739 12.4419L6.59927 10.218C6.80601 10.0156 6.80601 9.68749 6.59927 9.48511C6.39254 9.28274 6.05735 9.28274 5.85062 9.48511L4.02506 11.2721C3.93672 11.3586 3.79427 11.3611 3.70289 11.2776L2.88869 10.5344C2.67474 10.3391 2.33957 10.3506 2.14006 10.56C1.94055 10.7694 1.95225 11.0975 2.1662 11.2928L3.51861 12.5274C3.73256 12.7227 4.06774 12.7112 4.26725 12.5018C4.27095 12.4979 4.27459 12.494 4.27815 12.49ZM8.65699 17.3333C8.65699 16.9651 8.95547 16.6667 9.32365 16.6667H12.6518C13.0199 16.6667 13.3184 16.9651 13.3184 17.3333C13.3184 17.7015 13.0199 18 12.6518 18H9.32365C8.95547 18 8.65699 17.7015 8.65699 17.3333ZM2.66442 15.3333C2.29623 15.3333 1.99776 15.6318 1.99776 16V18.6667C1.99776 19.0349 2.29623 19.3333 2.66442 19.3333H5.99253C6.36072 19.3333 6.65919 19.0349 6.65919 18.6667V16C6.65919 15.6318 6.36072 15.3333 5.99253 15.3333H2.66442Z" fill="#0066BE" fillOpacity="0.6"/>

                        <path d="M22.2059 14.5499C22.2059 15.9583 21.0656 17.1001 19.6586 17.1001C18.2519 17.1001 17.1109 15.9585 17.1109 14.5502C17.1109 13.1418 18.2519 12 19.6586 12C21.0654 12 22.2059 13.1416 22.2059 14.5499Z" fill="#0066BE" fillOpacity="0.6"/>

                        <path d="M18.5777 17.2739H20.7391C22.5376 17.2739 24.0006 18.7389 24 20.5393V23.186H23.9818L23.8116 23.2722C23.726 23.3158 22.3366 24 19.9395 24C18.7123 24 17.2212 23.821 15.5049 23.2841L15.3229 23.2271L15.3161 23.1856V20.5393C15.3161 18.7389 16.7792 17.2739 18.5777 17.2739Z" fill="#0066BE" fillOpacity="0.6"/>

                        </g>

                        <defs>

                        <clipPath id="clip0_1228_25253">

                        <rect width="24" height="24" fill="white"/>

                        </clipPath>

                        </defs>

                      </svg>

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

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                            <g clipPath="url(#clip0_1341_10358)">

                              <path d="M14.3979 1.64756L9.5198 6.52566C9.51037 6.53503 9.50451 6.54642 9.49514 6.55589C10.6969 6.38086 11.9314 6.50086 13.0758 6.94711L16.3866 3.63633C17.4834 2.5395 19.2673 2.5395 20.3641 3.63633C21.4609 4.73306 21.4609 6.51698 20.3641 7.61372C20.1771 7.80084 15.204 12.774 15.486 12.4918C14.3805 13.5974 12.5668 13.5501 11.5085 12.4918C10.9604 11.9437 10.068 11.9437 9.5198 12.4918L8.66602 13.3456C8.90283 13.748 9.17433 14.1352 9.5198 14.4806C11.6029 16.5638 15.1886 16.7302 17.4445 14.5053C17.454 14.4959 17.4653 14.49 17.4748 14.4806L22.3529 9.60253C24.5495 7.40578 24.5495 3.84431 22.3529 1.64756C20.1561 -0.549187 16.5947 -0.549187 14.3979 1.64756Z" fill="#0066BE" fillOpacity="0.6"/>

                              <path d="M10.9352 17.0421L7.61373 20.3636C6.517 21.4604 4.73307 21.4604 3.63634 20.3636C2.53951 19.2668 2.53951 17.4829 3.63634 16.3861C3.82337 16.1991 8.80712 11.2153 8.52507 11.4974C9.63057 10.3919 11.4443 10.4391 12.5026 11.4974C13.0507 12.0456 13.9431 12.0456 14.4913 11.4974L15.3451 10.6436C15.1082 10.2412 14.8367 9.85402 14.4913 9.50864C12.4121 7.42941 8.82911 7.2525 6.56654 9.48394C6.55712 9.49331 6.54578 9.49922 6.53631 9.50864L1.64753 14.3974C-0.549129 16.5941 -0.549223 20.1556 1.64753 22.3524C3.84428 24.5491 7.40584 24.5491 9.6025 22.3524L14.4912 17.4636C14.5007 17.4542 14.5065 17.4429 14.5159 17.4333C13.3142 17.6084 12.0797 17.4884 10.9352 17.0421Z" fill="#0066BE" fillOpacity="0.6"/>

                            </g>

                            <defs>

                              <clipPath id="clip0_1341_10358">

                                <rect width="24" height="24" fill="white"/>

                              </clipPath>

                            </defs>

                          </svg>

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

                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                        <g clipPath="url(#clip0_1228_25261)">

                        <path fillRule="evenodd" clipRule="evenodd" d="M2.34912 -0.000184536C1.05603 -0.000184536 0.0077614 1.02311 0.00771219 2.28544L-0.00585937 21.7141C-0.00590858 22.9765 1.04239 23.9999 2.33555 23.9999H21.6515C22.9446 23.9999 23.9929 22.9765 23.9929 21.7141V2.27992C23.9929 1.01755 22.9446 -0.00579691 21.6515 -0.00579691L2.34912 -0.000184536ZM17.1593 4.79985H19.3193C19.4147 4.79985 19.5063 4.76193 19.5738 4.69441C19.6413 4.6269 19.6792 4.53533 19.6792 4.43986C19.6792 3.77151 19.4137 3.13054 18.9412 2.65795C18.4686 2.18535 17.8276 1.91985 17.1593 1.91985C17.0638 1.91985 16.9722 1.95778 16.9047 2.0253C16.8372 2.09281 16.7993 2.18438 16.7993 2.27985V4.26345C16.7993 4.63786 16.9613 4.79985 17.1593 4.79985ZM14.1467 7.47537C13.8653 7.19687 13.6582 6.85224 13.5443 6.473C13.4294 6.09522 13.4084 5.6951 13.4831 5.30735C13.5577 4.9196 13.7258 4.55592 13.9727 4.24786C14.1981 3.96986 14.4828 3.74583 14.806 3.59218C15.1292 3.43853 15.4826 3.35915 15.8404 3.35986C15.9313 3.35986 16.0184 3.39598 16.0827 3.46028C16.147 3.52458 16.1831 3.61178 16.1831 3.70272V4.90272C16.1831 5.03911 16.2372 5.16992 16.3336 5.26637C16.43 5.36282 16.5608 5.417 16.6971 5.417H17.8966C17.9874 5.417 18.0746 5.45312 18.1389 5.51742C18.2031 5.58172 18.2393 5.66893 18.2393 5.75986C18.2393 6.39638 17.9865 7.00682 17.5366 7.45691C17.0868 7.907 16.4766 8.15985 15.8404 8.15985C15.6088 8.16011 15.3782 8.12898 15.155 8.06728C14.7747 7.95739 14.4281 7.75388 14.1467 7.47537ZM17.1193 11.3477C17.12 10.6478 17.6927 10.0806 18.3993 10.0799C19.1061 10.0799 19.6792 10.6475 19.6792 11.3477C19.6792 12.0479 19.1061 12.6156 18.3993 12.6156C18.1608 12.6148 17.9275 12.5475 17.7261 12.4213L15.403 13.7893C15.404 13.802 15.4057 13.8145 15.4074 13.827C15.41 13.8456 15.4125 13.8642 15.4125 13.8834C15.4133 14.5292 14.9233 15.072 14.2754 15.1435C13.6274 15.215 13.0288 14.7922 12.886 14.1621L10.7437 13.1111C10.3466 13.4922 9.74443 13.5703 9.26162 13.3036L6.7935 15.1282C6.84912 15.2704 6.87819 15.4213 6.87928 15.5739C6.87928 16.2741 6.30615 16.8418 5.59928 16.8418C4.89241 16.8418 4.31928 16.2741 4.31928 15.5739C4.31928 14.8736 4.89241 14.3061 5.59928 14.3061C5.8249 14.3073 6.04616 14.3683 6.2399 14.4827L8.68365 12.6762C8.48506 12.2022 8.59459 11.6565 8.96115 11.2937C9.32756 10.9309 9.87865 10.8227 10.3571 11.0196C10.8355 11.2166 11.1469 11.6797 11.146 12.1929C11.144 12.2478 11.1385 12.3026 11.1293 12.3569L13.0132 13.2812C13.2055 12.924 13.5596 12.6804 13.9647 12.6267C14.3697 12.573 14.7761 12.7157 15.0565 13.0102L17.1924 11.7526C17.1457 11.6226 17.121 11.4858 17.1193 11.3477ZM17.546 15.1513H19.2526C19.4882 15.1513 19.6793 15.3406 19.6793 15.5739L19.6792 21.6572C19.6792 21.8906 19.4882 22.0799 19.2525 22.0799H17.546C17.3103 22.0799 17.1193 21.8906 17.1193 21.6572L17.1193 15.5739C17.1193 15.3406 17.3104 15.1513 17.546 15.1513ZM10.7193 15.9965H9.01259C8.77697 15.9965 8.58603 16.1857 8.58603 16.4191L8.586 21.6572C8.586 21.8906 8.77694 22.0798 9.01257 22.0798H10.7193C10.9549 22.0798 11.146 21.8906 11.146 21.6572L11.146 16.4191C11.146 16.1857 10.9549 15.9965 10.7193 15.9965ZM4.31928 19.8C4.31928 19.5666 4.51038 19.3775 4.746 19.3775H6.45256C6.68819 19.3775 6.87928 19.5666 6.87928 19.8L6.87925 21.6572C6.87925 21.8906 6.68816 22.0798 6.45254 22.0798H4.74598C4.51035 22.0798 4.31926 21.8906 4.31926 21.6572L4.31928 19.8ZM13.2793 17.6869H14.986C15.2216 17.6869 15.4125 17.8762 15.4125 18.1096L15.4125 21.6572C15.4125 21.8906 15.2216 22.0798 14.986 22.0798H13.2792C13.0436 22.0798 12.8525 21.8906 12.8525 21.6572L12.8525 18.1096C12.8525 17.8762 13.0436 17.6869 13.2793 17.6869ZM4.79926 2.39985C4.53416 2.39985 4.31926 2.61476 4.31926 2.87985C4.31926 3.14495 4.53416 3.35985 4.79926 3.35985H11.9993C12.2644 3.35985 12.4793 3.14495 12.4793 2.87985C12.4793 2.61476 12.2644 2.39985 11.9993 2.39985H4.79926ZM4.31926 5.27986C4.31926 5.01476 4.53416 4.79985 4.79926 4.79985H9.11926C9.38436 4.79985 9.59926 5.01476 9.59926 5.27986C9.59926 5.54495 9.38436 5.75985 9.11926 5.75985H4.79926C4.53416 5.75985 4.31926 5.54495 4.31926 5.27986Z" fill="#0066BE" fillOpacity="0.6"/>

                        </g>

                        <defs>

                          <clipPath id="clip0_1228_25261">

                            <rect width="24" height="24" fill="white"/>

                          </clipPath>

                        </defs>

                      </svg>

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
                                      : isNorgineAccount ?
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
                                        </li> : isGenaAccount?
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
                                        <path d="M4283 5035 c-68 -29 -559 -318 -581 -342 -17 -19 -22 -34 -19 -52 8 -38 322 -572 353 -599 18 -16 32 -20 52 -16 41 9 57 35 82 126 12 46 24 87 27 91 6 11 124 -55 192 -108 131 -101 249 -254 310 -400 54 -129 72 -216 78 -374 6 -160 15 -181 72 -181 41 0 73 33 109 115 60 134 77 229 76 425 0 155 -3 186 -26 271 -88 327 -295 591 -580 740 -43 22 -78 46 -78 54 0 7 10 55 21 105 21 91 21 93 2 118 -26 34 -53 42 -90 27z" />{" "}
                                        <path d="M1212 5026 c-367 -70 -669 -293 -831 -613 -17 -35 -37 -63 -44 -63 -6 0 -46 9 -87 20 -41 11 -87 20 -102 20 -32 0 -68 -41 -68 -79 0 -30 309 -575 342 -603 43 -38 72 -26 365 143 153 88 284 166 291 173 7 7 15 28 18 48 9 51 -15 70 -122 98 -49 13 -90 24 -92 26 -2 1 9 26 24 56 112 222 326 405 571 487 92 31 224 51 334 51 90 0 99 2 113 22 20 29 20 62 0 93 -18 28 -131 74 -257 106 -107 27 -349 35 -455 15z" />{" "}
                                        <path d="M2128 5018 c-23 -20 -37 -59 -97 -279 -39 -141 -71 -264 -71 -272 0 -9 10 -27 23 -41 18 -20 69 -38 278 -95 140 -39 267 -71 281 -71 14 0 37 9 52 21 35 28 34 68 -4 136 -16 29 -30 57 -30 62 0 4 28 17 63 27 86 25 296 26 387 1 139 -37 259 -107 377 -219 81 -76 113 -86 151 -45 43 46 20 129 -76 275 -126 193 -308 328 -539 399 -81 25 -102 27 -258 27 -157 0 -177 -2 -260 -28 -49 -15 -91 -23 -93 -18 -1 4 -21 37 -45 73 -37 56 -46 64 -77 67 -25 2 -43 -4 -62 -20z" />{" "}
                                        <path d="M2435 4090 c-366 -31 -701 -191 -956 -456 -201 -210 -323 -436 -391 -729 -30 -130 -37 -401 -13 -550 51 -328 214 -632 463 -865 530 -497 1357 -529 1937 -75 457 357 666 929 549 1502 -78 385 -341 753 -689 963 -265 160 -591 236 -900 210z m333 -166 c271 -40 525 -164 727 -356 237 -224 379 -515 415 -848 39 -357 -101 -769 -350 -1032 l-69 -73 -1 105 c0 116 -13 178 -55 260 -47 92 -111 144 -329 265 -239 132 -244 137 -253 273 l-6 91 59 64 c97 106 184 299 184 407 0 19 4 50 10 68 6 25 5 44 -5 70 -7 21 -21 63 -31 96 -50 168 -214 312 -399 351 -88 18 -122 18 -210 0 -195 -41 -344 -176 -411 -375 -23 -69 -23 -208 1 -300 31 -121 114 -270 189 -339 24 -23 26 -31 26 -105 0 -89 -19 -145 -61 -182 -13 -11 -109 -67 -212 -124 -156 -86 -197 -113 -242 -161 -91 -99 -125 -196 -125 -362 l-1 -92 -58 63 c-124 132 -234 328 -286 507 -81 281 -71 603 28 866 172 457 580 789 1062 865 113 17 279 17 403 -2z m132 -744 c46 -24 50 -43 25 -148 -34 -144 -144 -295 -253 -349 -114 -56 -218 -30 -327 81 -62 63 -135 188 -151 259 -6 26 -5 27 21 17 14 -5 60 -10 101 -10 94 0 192 31 304 96 134 78 206 92 280 54z" />{" "}
                                        <path d="M773 3550 c-84 -30 -165 -77 -249 -145 -154 -123 -259 -280 -321 -481 -25 -82 -27 -102 -27 -259 0 -157 2 -177 28 -260 15 -49 23 -91 18 -93 -4 -1 -37 -21 -73 -45 -58 -38 -64 -46 -67 -79 -6 -66 13 -75 306 -156 278 -78 310 -81 336 -39 25 41 157 543 150 571 -16 63 -79 72 -164 22 -67 -40 -62 -43 -86 67 -21 100 -18 257 6 353 38 150 107 268 224 386 67 68 73 102 27 149 -34 34 -38 34 -108 9z" />{" "}
                                        <path d="M4433 3150 c-12 -5 -26 -17 -32 -28 -17 -31 -151 -524 -151 -554 0 -37 32 -68 71 -68 17 0 57 15 89 34 67 40 62 43 86 -67 21 -100 18 -257 -6 -352 -39 -152 -98 -256 -214 -376 -76 -78 -85 -111 -40 -156 22 -22 32 -25 69 -21 94 11 256 109 371 223 107 108 192 252 241 412 25 81 27 101 27 258 0 156 -3 177 -28 259 -14 49 -25 90 -24 91 2 1 29 16 60 34 32 18 65 42 73 54 18 26 20 77 2 100 -8 12 -104 43 -282 92 -149 41 -274 75 -280 74 -5 0 -20 -4 -32 -9z" />{" "}
                                        <path d="M233 1930 c-31 -13 -90 -134 -121 -249 -23 -85 -26 -116 -26 -271 -1 -149 3 -188 22 -263 85 -337 297 -607 595 -758 42 -22 77 -42 77 -46 0 -3 -12 -50 -26 -104 -25 -93 -26 -100 -10 -124 20 -30 60 -42 97 -28 35 14 549 310 572 330 36 33 22 68 -144 357 -89 155 -171 291 -182 304 -25 27 -79 30 -105 4 -9 -9 -28 -59 -41 -110 -27 -107 -18 -104 -134 -34 -205 123 -361 328 -432 567 -22 72 -28 116 -32 225 -5 169 -7 176 -43 195 -33 17 -36 17 -67 5z" />{" "}
                                        <path d="M4355 1269 c-154 -88 -291 -171 -304 -184 -27 -27 -31 -79 -8 -102 8 -8 56 -26 108 -40 52 -14 96 -27 98 -29 2 -2 -11 -29 -29 -61 -186 -332 -518 -523 -909 -523 -99 0 -121 -12 -121 -67 0 -50 10 -63 67 -89 297 -131 678 -122 965 22 215 108 408 298 514 507 19 37 41 67 49 67 8 0 53 -9 100 -20 106 -25 101 -25 130 5 45 44 38 65 -136 366 -89 154 -171 286 -182 294 -12 8 -31 15 -42 15 -11 0 -147 -72 -300 -161z" />{" "}
                                        <path d="M1587 899 c-45 -27 -40 -96 18 -211 114 -227 331 -404 592 -485 81 -25 101 -27 258 -27 156 0 177 3 259 28 49 14 90 25 91 24 1 -2 19 -31 39 -66 21 -34 46 -67 56 -72 33 -18 78 -12 94 12 16 26 156 524 156 556 0 52 -32 67 -305 141 -143 39 -272 71 -287 71 -33 0 -68 -35 -68 -68 0 -14 16 -53 35 -88 l35 -63 -52 -17 c-78 -24 -284 -30 -375 -11 -149 32 -265 94 -384 205 -81 76 -124 95 -162 71z" />{" "}
                                      </g>{" "}
                                    </svg>
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
                                    <path d="M2455 4510 c-254 -51 -435 -273 -435 -534 0 -165 44 -270 160 -387 113 -114 229 -162 390 -161 256 1 482 188 531 440 26 136 -7 299 -83 410 -123 180 -352 274 -563 232z" />{" "}
                                    <path d="M1520 4369 c-97 -26 -212 -98 -266 -166 -36 -45 -80 -125 -89 -164 -6 -23 -1 -31 37 -57 124 -86 220 -240 244 -391 4 -22 8 -41 9 -41 1 0 28 9 61 21 73 26 218 36 294 20 30 -6 82 -23 115 -36 l60 -25 29 30 29 29 -26 40 c-72 109 -102 217 -101 366 1 92 5 122 27 185 l27 75 -27 23 c-39 32 -108 67 -172 86 -60 18 -194 20 -251 5z" />{" "}
                                    <path d="M3370 4361 c-74 -24 -127 -52 -176 -95 l-42 -36 20 -62 c47 -150 31 -326 -42 -472 l-39 -79 29 -37 30 -38 67 25 c96 36 238 42 350 16 l83 -20 6 36 c23 136 74 232 179 336 44 45 95 87 113 94 29 12 33 18 27 39 -3 14 -17 44 -30 67 -61 103 -155 179 -274 221 -84 30 -218 32 -301 5z" />{" "}
                                    <path d="M4195 4004 c-86 -20 -117 -31 -170 -57 -72 -36 -173 -134 -207 -202 -31 -62 -55 -136 -61 -193 -5 -41 -4 -43 38 -72 62 -43 139 -133 178 -209 35 -67 67 -162 67 -200 0 -58 222 -93 351 -55 220 65 369 259 369 483 0 221 -135 409 -346 481 -55 19 -181 33 -219 24z" />{" "}
                                    <path d="M740 3974 c-336 -89 -488 -475 -300 -761 126 -192 369 -278 579 -205 l55 18 12 60 c14 67 37 129 73 193 29 52 126 158 176 192 32 22 34 27 29 64 -19 128 -66 225 -150 308 -125 124 -309 175 -474 131z" />{" "}
                                    <path d="M1580 3482 c-97 -28 -164 -66 -228 -130 -100 -100 -152 -222 -152 -357 0 -226 149 -423 367 -486 115 -32 231 -23 344 27 56 25 57 26 74 92 29 105 79 193 157 277 l71 76 -7 52 c-17 127 -63 226 -144 310 -124 128 -320 185 -482 139z" />{" "}
                                    <path d="M3350 3494 c-208 -40 -363 -186 -415 -389 -23 -92 -22 -95 53 -157 109 -88 197 -240 218 -374 6 -39 9 -42 57 -59 29 -9 91 -19 138 -22 145 -9 273 41 381 149 124 124 173 298 132 467 -54 220 -239 374 -464 386 -41 2 -86 1 -100 -1z" />{" "}
                                    <path d="M2270 3384 c-86 -10 -84 -7 -45 -77 36 -65 75 -196 75 -250 0 -24 3 -28 18 -21 109 48 159 58 272 58 87 -1 130 -6 177 -21 l61 -20 6 51 c9 66 48 178 80 226 23 35 24 39 8 46 -18 8 -592 15 -652 8z" />{" "}
                                    <path d="M2520 2974 c-113 -22 -207 -71 -285 -149 -100 -99 -148 -214 -148 -350 0 -281 223 -505 503 -505 276 0 500 222 500 496 0 50 -7 110 -16 142 -45 158 -172 290 -326 341 -63 21 -181 34 -228 25z" />{" "}
                                    <path d="M4045 2923 c-23 -147 -64 -244 -140 -338 l-46 -55 48 -20 c225 -94 378 -254 456 -478 28 -79 31 -101 35 -237 2 -82 7 -153 11 -157 10 -11 206 8 333 32 95 18 310 85 361 111 18 10 18 26 15 332 -4 302 -5 326 -27 392 -64 199 -213 351 -413 423 -71 26 -80 27 -350 30 l-277 4 -6 -39z" />{" "}
                                    <path d="M564 2939 c-210 -27 -399 -162 -493 -353 -64 -128 -71 -177 -71 -518 l0 -297 79 -30 c175 -68 355 -107 537 -118 l102 -6 4 159 c5 129 10 171 28 224 73 214 210 370 408 468 l98 48 -44 54 c-75 96 -114 192 -137 343 l-6 37 -222 -1 c-122 -1 -250 -5 -283 -10z" />{" "}
                                    <path d="M1323 2430 c-215 -56 -383 -217 -454 -435 -22 -66 -23 -88 -27 -396 l-3 -325 133 -37 c214 -59 483 -107 599 -107 l39 0 0 123 c0 67 7 152 14 188 55 258 243 471 503 570 22 8 21 10 -27 74 -78 103 -113 186 -128 300 l-7 60 -285 2 c-251 2 -293 0 -357 -17z" />{" "}
                                    <path d="M3210 2418 c-1 -97 -58 -239 -137 -341 l-44 -57 48 -20 c207 -87 358 -237 437 -434 41 -102 56 -187 56 -323 l0 -123 63 6 c248 21 420 58 586 126 l73 31 -5 316 c-5 348 -8 369 -71 496 -83 165 -235 290 -411 335 -68 17 -111 20 -337 20 l-258 0 0 -32z" />{" "}
                                    <path d="M2230 1915 c-227 -50 -421 -240 -480 -471 -18 -69 -20 -111 -20 -385 l0 -308 68 -20 c566 -169 1161 -172 1564 -9 l83 34 0 319 c0 307 -1 323 -23 395 -62 200 -211 354 -414 428 -73 27 -74 27 -393 29 -247 2 -335 -1 -385 -12z" />{" "}
                                  </g>{" "}
                                </svg>
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
                                    <path d="M1723 4889 c-70 -27 -137 -94 -175 -176 -41 -88 -44 -187 -7 -276 22 -53 294 -436 311 -437 12 0 290 382 312 429 32 71 30 207 -5 282 -37 79 -93 137 -164 171 -51 24 -72 28 -140 27 -55 0 -96 -6 -132 -20z m202 -83 c97 -41 155 -126 155 -228 0 -69 -16 -111 -60 -162 -50 -57 -103 -80 -180 -80 -255 0 -337 344 -108 458 60 30 138 35 193 12z" />{" "}
                                    <path d="M1760 4708 c-52 -36 -72 -70 -73 -124 -1 -97 59 -159 153 -159 95 1 152 60 152 158 0 83 -66 147 -152 147 -32 0 -57 -7 -80 -22z" />{" "}
                                    <path d="M2478 4413 c-16 -2 -28 -6 -28 -9 0 -2 56 -86 125 -186 141 -203 161 -250 152 -354 -6 -78 -38 -148 -114 -243 -40 -51 -75 -84 -113 -105 -55 -31 -56 -31 -187 -28 -159 3 -172 -2 -242 -91 -57 -73 -126 -115 -198 -123 -26 -3 -102 1 -167 10 -134 18 -177 12 -233 -30 -55 -42 -80 -112 -62 -177 12 -46 119 -218 165 -266 26 -27 42 -35 83 -39 47 -4 60 0 166 54 112 56 117 58 198 58 45 1 98 -2 118 -7 l35 -7 17 53 c79 251 355 375 582 263 220 -109 314 -369 208 -580 -14 -28 -47 -81 -74 -117 -27 -37 -49 -70 -49 -74 0 -9 47 -69 142 -182 104 -123 118 -147 118 -208 0 -80 -27 -114 -195 -244 -175 -135 -178 -140 -250 -371 -43 -141 -47 -148 -120 -240 -73 -92 -96 -139 -111 -225 -14 -82 -65 -150 -136 -179 -50 -21 -83 -20 -134 5 -71 34 -81 60 -125 326 -22 137 -47 255 -58 278 -10 22 -83 123 -161 225 -78 102 -150 201 -160 221 -11 20 -42 119 -70 219 -70 252 -86 279 -188 316 -26 9 -66 26 -90 36 -57 27 -261 214 -316 291 -59 83 -93 113 -145 132 -67 23 -125 18 -256 -23 -118 -37 -119 -38 -127 -72 -40 -187 -50 -508 -22 -699 138 -944 869 -1673 1802 -1796 131 -17 410 -20 532 -5 472 59 894 264 1231 600 176 175 296 342 405 565 142 291 214 598 214 915 l0 121 -77 -6 c-158 -12 -176 -21 -224 -116 -40 -81 -87 -130 -161 -170 -63 -34 -63 -34 -218 -37 -147 -3 -157 -2 -200 21 -68 36 -98 86 -115 191 -16 97 -16 97 -97 176 -67 65 -82 107 -76 220 6 121 23 146 220 321 93 83 178 165 189 183 52 86 -9 216 -109 231 -174 27 -272 123 -260 255 4 40 24 82 98 211 89 155 92 163 74 176 -39 29 -342 173 -434 207 -128 46 -305 92 -431 110 -114 16 -298 26 -341 19z" />{" "}
                                    <path d="M2230 4363 c-12 -21 -97 -138 -188 -260 -131 -176 -171 -223 -189 -223 -18 0 -49 35 -139 155 -64 85 -122 155 -128 155 -15 0 -188 -106 -274 -168 -47 -33 -61 -49 -56 -61 69 -163 69 -274 0 -408 -27 -54 -339 -474 -361 -485 -24 -14 -43 3 -131 120 l-87 116 -33 -71 c-73 -161 -141 -373 -120 -373 7 0 52 14 102 31 188 64 330 19 438 -139 55 -81 243 -258 300 -282 23 -9 62 -25 87 -34 57 -21 122 -75 153 -129 14 -23 48 -125 76 -227 29 -102 62 -204 75 -227 12 -22 87 -125 165 -228 79 -103 151 -208 160 -234 10 -25 35 -149 56 -276 32 -196 41 -233 61 -252 58 -58 142 -4 161 104 16 92 49 158 124 251 66 82 69 89 119 246 73 233 79 241 289 401 63 48 121 94 128 103 17 23 15 83 -5 112 -10 14 -54 68 -99 121 -44 53 -88 107 -97 119 -9 13 -18 22 -20 19 -2 -2 -41 -53 -86 -114 -87 -116 -100 -129 -125 -119 -22 8 -335 430 -369 496 -15 31 -33 84 -39 117 l-11 60 -50 12 c-87 20 -151 8 -278 -56 -107 -53 -118 -57 -174 -53 -98 6 -143 39 -223 161 -105 162 -125 207 -125 275 1 71 34 144 87 190 84 74 145 86 317 65 187 -24 188 -23 318 122 53 58 126 87 214 84 160 -6 184 -4 220 21 40 27 136 154 154 202 19 55 15 137 -10 190 -12 26 -78 128 -147 227 l-125 180 -47 1 c-43 0 -48 -3 -68 -37z" />{" "}
                                    <path d="M795 4091 c-93 -24 -177 -96 -222 -189 -23 -49 -27 -70 -28 -147 0 -73 4 -99 23 -139 23 -51 298 -426 312 -426 4 0 72 87 151 193 167 224 196 285 185 395 -11 126 -93 246 -201 293 -54 24 -167 34 -220 20z m141 -96 c130 -39 201 -175 162 -309 -16 -55 -99 -138 -154 -154 -136 -40 -268 30 -311 166 -39 123 32 250 166 298 48 17 77 17 137 -1z" />{" "}
                                    <path d="M805 3906 c-86 -38 -119 -139 -72 -220 77 -135 287 -81 287 74 0 62 -28 110 -80 137 -49 26 -91 29 -135 9z" />{" "}
                                    <path d="M3687 3861 c-74 -127 -87 -156 -87 -194 0 -75 49 -118 157 -138 71 -13 119 -37 159 -81 97 -102 96 -244 0 -341 -24 -23 -106 -98 -184 -166 -158 -139 -172 -160 -172 -267 0 -80 7 -94 80 -164 63 -61 85 -106 95 -204 6 -50 12 -65 41 -94 l34 -34 147 4 c141 3 150 4 195 31 45 26 90 81 115 138 18 42 73 98 116 121 33 17 140 33 240 38 22 1 -75 533 -103 563 -4 4 -20 -11 -35 -33 -33 -47 -59 -64 -80 -53 -25 15 -277 357 -303 413 -39 84 -42 186 -8 272 l27 66 -53 50 c-97 91 -266 222 -285 222 -5 0 -48 -67 -96 -149z" />{" "}
                                    <path d="M4370 3811 c-158 -33 -250 -204 -195 -361 16 -44 230 -340 246 -340 13 0 218 277 240 325 25 54 25 166 0 221 -52 114 -173 179 -291 155z m127 -75 c124 -58 156 -210 67 -314 -119 -139 -354 -56 -355 125 -1 88 36 149 113 187 64 32 108 33 175 2z" />{" "}
                                    <path d="M4361 3657 c-39 -20 -63 -61 -63 -105 1 -73 45 -112 123 -112 50 0 94 39 104 93 17 90 -83 166 -164 124z" />{" "}
                                    <path d="M2505 3127 c-64 -22 -97 -42 -141 -89 -54 -57 -69 -84 -90 -153 -22 -76 -15 -165 19 -236 26 -57 291 -419 306 -419 15 0 289 373 313 426 34 74 32 199 -4 276 -58 125 -163 198 -291 204 -42 2 -89 -2 -112 -9z m199 -115 c102 -56 148 -170 114 -284 -15 -51 -82 -126 -133 -149 -112 -51 -258 2 -317 115 -29 54 -31 155 -4 206 71 136 211 182 340 112z" />{" "}
                                    <path d="M2536 2950 c-58 -18 -106 -85 -106 -150 0 -44 36 -108 73 -130 43 -27 121 -26 165 0 101 62 94 218 -13 270 -44 21 -72 24 -119 10z" />{" "}
                                  </g>{" "}
                                </svg>
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