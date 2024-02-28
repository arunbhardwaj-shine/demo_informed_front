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
  let navigate = useNavigate();
  let c_id = 0;
  const location = useLocation();

  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [getHideShowSideContent, setHideShowSideContent] = useState(false);
  const [getOpenVideoPopup, setOpenVideoPopup] = useState(false);
  const [get_user_id, set_user_id] = useState();
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));

  const { selectedItem,eventIdContext } = useSidebar();
  // if(!eventIdContext){
  //   navigate("/webinar/event-listing");
  // }
  

  useEffect(() => {
    let user_id = localStorage.getItem("user_id");
    if (user_id) {
      set_user_id(user_id);
    }
  }, [selectedItem]);

  const toggleClassToBody = () => {
    document.body.classList.toggle("toggle_sidebar");
  };


  // const activeSublinksElements = document.querySelectorAll(".active.sub-links");

  // if (activeSublinksElements.length > 0) {
  //   document.body.classList.add('active-subLink');
  // } else {
  //   document.body.classList.remove('active-subLink');
  // }

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

  // if (
  //   location.pathname != "/EmailList" &&
  //   location.pathname != "/SmartList" &&
  //   location.pathname != "/EmailStatss" &&
  //   location.pathname != "/TemplateBuilder" &&
  //   location.pathname != "/AutoEmail"
  // ) {
  //   document.body.classList.add("toggle_sidebar");
  // } else {
  //   document.body.classList.remove("toggle_sidebar");
  // }

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


  // useEffect(() => {
  //   const currentLocation = window.location.pathname;
  //   const divElement = document.querySelector('.left-sidebar');

  //   if (currentLocation === '/webinar/event-listing') {
  //     divElement?.classList.add('hidesidebar');
  //   } else {
  //     divElement?.classList.remove('hidesidebar');
  //   }

  //   return () => {
  //     divElement?.classList.remove('hidesidebar');
  //   };
  // }, [location?.pathname]);

  useEffect(() => {
    const currentLocation = window.location.pathname;
    const divElement = document.querySelector('.left-sidebar');
    
    if (
      currentLocation === '/webinar/event-listing'
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
  const isActivePolls =  location.pathname === '/webinar/live-stream/polls-layout'
  const isActiveContact = location.pathname === '/webinar/live-stream/contact-dm'
  const isActiveSpeaker = location.pathname === '/webinar/live-stream/speaker-zone'
  const isActiveSettings = location.pathname === '/webinar/live-stream/settings'
  const isActiveChatPage = location.pathname === '/webinar/live-stream/chat-link'
  const isActiveSurveyPage = location.pathname === '/webinar/live-stream/survey/question-data'

  return (
    <>
      <div className="left-sidebar" id="left-sidebar">
        <div className="sidebar-menu">
          {window.location.pathname === "/webinar/invitees" ||
            window.location.pathname == "/webinar/registration" ||
            window.location.pathname == "/webinar/email" ||
            window.location.pathname == "/webinar/live-stream" ||
            window.location.pathname == "/webinar/live-stream/polls-layout" || window.location.pathname == "/webinar/live-stream/survey/question-data"  || window.location.pathname == "/webinar/live-stream/chat-link" || 
            window.location.pathname == "/webinar/analytics" || window.location.pathname === "/webinar/live-stream/settings" 
            || window.location.pathname === "/webinar/live-stream/speaker-zone" ? (
            <>

              {/* <button className="toggle_btn" onClick={() => toggleClassToBody()}>
            <img src={path_image + "arrow-left.svg"} alt="toggle-sidebar" />
          </button> */}
              <div className="sidebar_txt">
                <button className="toggle_btn" onClick={() => {
                  eventList();
                }}>
                  <img src={path_image + "arrow-left.svg"} alt="toggle-sidebar" />
                </button>
                {/* <span>Event Name sollicitudin faucibus molestie gulvinar ultricies</span> */}
                <span title={eventIdContext?.eventTitle?eventIdContext?.eventTitle:localStorageEvent?.eventTitle}>{eventIdContext?.eventTitle?eventIdContext?.eventTitle:localStorageEvent?.eventTitle}</span>
              </div>
            </>
          ) : null}

          {/* <button className="toggle_btn" onClick={() => toggleClassToBody()}>
            <img src={path_image + "arrow-left.svg"} alt="toggle-sidebar" />
          </button> */}

          {!(window.location.pathname === "/webinar/invitees" ||
            window.location.pathname === "/webinar/registration" ||
            window.location.pathname === "/webinar/email" ||
            window.location.pathname === "/webinar/live-stream" ||
            window.location.pathname == "/webinar/live-stream/polls-layout" || window.location.pathname == "/webinar/live-stream/survey/question-data"  ||  window.location.pathname == "/webinar/live-stream/chat-link" ||
            window.location.pathname === "/webinar/analytics" || window.location.pathname === "/webinar/live-stream/contact-dm" || window.location.pathname === "/webinar/live-stream/settings" 
            || window.location.pathname === "/webinar/live-stream/speaker-zone") && (
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
            window.location.pathname == "/TemplateBuilder" ||
            window.location.pathname == "/AutoEmail" ||
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
            window.location.pathname == "/bounced-email" ||
            window.location.pathname == "/get-details" ? (

            <ul>
              <li
                className={
                  location.pathname == "/EmailList" ||
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
                      c_id != 0)
                    ? "active"
                    : "side_li"
                }
              >
                <Link to={"/EmailList"}>
                  <svg
                    width="24"
                    height="18"
                    viewBox="0 0 24 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z"
                      fill="rgba(0, 102, 190, 0.6)"
                    />
                    <path
                      d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7.98861 12.1922 7.96501 12.2745 7.92Z"
                      fill="rgba(0, 102, 190, 0.6)"
                    />
                  </svg>
                  <p>Email</p>
                </Link>
              </li>

              <li
                className={
                  location.pathname == "/AutoEmail" && c_id == 0
                    ? "active"
                    : "side_li"
                }
              >
                <Link to={"/AutoEmail"}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.2385 4.16635L11.1144 10.2818C11.0398 10.3232 10.9561 10.3449 10.8711 10.3449C10.7861 10.3449 10.7024 10.3232 10.6278 10.2818L0.493317 4.16635C0.741985 3.80693 1.07206 3.51339 1.45576 3.31042C1.83947 3.10745 2.26559 3.00099 2.69827 3H19.0336C19.4663 3.00099 19.8924 3.10745 20.2761 3.31042C20.6598 3.51339 20.9899 3.80693 21.2385 4.16635Z"
                      fill="#0066BE"
                    />
                    <path
                      d="M21.6665 5.10146L11.6355 11.1539C11.4039 11.2884 11.1416 11.3592 10.8747 11.3592C10.6078 11.3592 10.3455 11.2884 10.1138 11.1539L0.0724633 5.10146C0.0244647 5.31164 0.000154289 5.52667 0 5.74242V16.0189C0 16.7462 0.284658 17.4438 0.791353 17.9581C1.29805 18.4724 1.98527 18.7614 2.70185 18.7614H13.6715C13.5318 18.2602 13.457 17.7314 13.457 17.1848C13.457 13.9932 16.006 11.4058 19.1504 11.4058C20.0826 11.4058 20.9624 11.6332 21.739 12.0363V5.74242C21.7388 5.52667 21.7145 5.31164 21.6665 5.10146Z"
                      fill="#0066BE"
                    />
                    <path
                      d="M23.2371 19.3041C23.4753 19.3041 23.6684 19.1081 23.6684 18.8663C23.6684 18.6245 23.4753 18.4285 23.2371 18.4285C22.9989 18.4285 22.8058 18.6245 22.8058 18.8663C22.8058 19.1081 22.9989 19.3041 23.2371 19.3041Z"
                      fill="#0066BE"
                    />
                    <path
                      d="M22.7303 20.2761C22.7303 20.5179 22.5372 20.714 22.299 20.714C22.0608 20.714 21.8677 20.5179 21.8677 20.2761C21.8677 20.0344 22.0608 19.8383 22.299 19.8383C22.5372 19.8383 22.7303 20.0344 22.7303 20.2761Z"
                      fill="#0066BE"
                    />
                    <path
                      d="M23.5687 17.6233C23.8069 17.6233 24 17.4273 24 17.1855C24 16.9437 23.8069 16.7477 23.5687 16.7477C23.3305 16.7477 23.1374 16.9437 23.1374 17.1855C23.1374 17.4273 23.3305 17.6233 23.5687 17.6233Z"
                      fill="#0066BE"
                    />
                    <path
                      d="M21.3312 21.2325C21.3312 21.4743 21.1381 21.6703 20.8999 21.6703C20.6617 21.6703 20.4686 21.4743 20.4686 21.2325C20.4686 20.9907 20.6617 20.7947 20.8999 20.7947C21.1381 20.7947 21.3312 20.9907 21.3312 21.2325Z"
                      fill="#0066BE"
                    />
                    <path
                      d="M19.2532 21.1244C18.632 21.1252 18.0196 20.9746 17.4677 20.6853C16.9157 20.396 16.4401 19.9765 16.081 19.462C15.7219 18.9474 15.4897 18.353 15.4039 17.7284C15.3181 17.1039 15.3812 16.4676 15.5879 15.873C15.7946 15.2784 16.1389 14.7428 16.5919 14.3112C17.0448 13.8797 17.5932 13.5648 18.1909 13.393C18.7886 13.2212 19.4182 13.1975 20.0268 13.3239C20.6354 13.4504 21.2052 13.7232 21.6884 14.1195H20.9784C20.8641 14.1195 20.7543 14.1657 20.6735 14.2478C20.5926 14.3299 20.5471 14.4412 20.5471 14.5573C20.5471 14.6734 20.5926 14.7848 20.6735 14.8669C20.7543 14.949 20.8641 14.9951 20.9784 14.9951H22.7037C22.8181 14.9951 22.9278 14.949 23.0087 14.8669C23.0896 14.7848 23.135 14.6734 23.135 14.5573V12.8061C23.135 12.69 23.0896 12.5787 23.0087 12.4965C22.9278 12.4144 22.8181 12.3683 22.7037 12.3683C22.5893 12.3683 22.4796 12.4144 22.3987 12.4965C22.3178 12.5787 22.2724 12.69 22.2724 12.8061V13.4764C21.6859 12.9842 20.9912 12.6425 20.2472 12.4802C19.5032 12.3179 18.7316 12.3397 17.9976 12.5438C17.2637 12.7479 16.5889 13.1283 16.0302 13.6529C15.4716 14.1774 15.0455 14.8308 14.7881 15.5577C14.5306 16.2846 14.4492 17.0637 14.5509 17.8293C14.6525 18.5948 14.9342 19.3243 15.3721 19.9561C15.8099 20.5879 16.3912 21.1034 17.0667 21.4592C17.7422 21.8149 18.4922 22.0004 19.2532 22C19.3676 22 19.4773 21.9539 19.5582 21.8718C19.6391 21.7897 19.6845 21.6783 19.6845 21.5622C19.6845 21.4461 19.6391 21.3347 19.5582 21.2526C19.4773 21.1705 19.3676 21.1244 19.2532 21.1244Z"
                      fill="#0066BE"
                    />
                    <path
                      d="M20.9753 18.4969C20.9753 18.613 20.9299 18.7243 20.849 18.8064C20.7681 18.8885 20.6585 18.9346 20.5441 18.9346C20.4297 18.9346 20.32 18.8885 20.2391 18.8064L18.9452 17.493C18.8643 17.4109 18.8188 17.2996 18.8188 17.1835V14.5567C18.8188 14.4405 18.8643 14.3292 18.9452 14.2471C19.026 14.165 19.1357 14.1188 19.2501 14.1188C19.3645 14.1188 19.4742 14.165 19.5551 14.2471C19.636 14.3292 19.6815 14.4405 19.6815 14.5567V17.0022L20.849 18.1874C20.9299 18.2695 20.9753 18.3808 20.9753 18.4969Z"
                      fill="#0066BE"
                    />
                  </svg>

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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2612_34718)">
                      <path
                        d="M14.7656 12.7676H19.0834V15.5121H14.7656V12.7676Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M14.6797 18.3516L19.11 18.3518V21.2443H14.6842L14.6797 18.3516Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M5 12.8048L12 12.8047V21L5 21.0001V12.8048Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M3.45312 1.82092e-05C2.34855 1.92626e-05 1.45312 0.895449 1.45312 2.00002V2.8594H22.5469V2C22.5469 0.895431 21.6514 8.5395e-07 20.5469 1.90735e-06L3.45312 1.82092e-05Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M5 7H19V10H5V7Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M1.4533 21.9998C1.45321 23.1045 2.34866 24 3.4533 24H20.5486C21.6532 24 22.5486 23.1046 22.5486 22V4.26562H1.45489L1.4533 21.9998ZM19.7361 21.1406C19.7361 21.5292 19.4216 21.8438 19.033 21.8438H14.8143C14.4257 21.8438 14.1111 21.5292 14.1111 21.1406V18.3281C14.1111 17.9396 14.4257 17.625 14.8143 17.625H19.033C19.4216 17.625 19.7361 17.9396 19.7361 18.3281V21.1406ZM19.7361 15.5156C19.7361 15.9042 19.4216 16.2188 19.033 16.2188H14.8143C14.4257 16.2188 14.1111 15.9042 14.1111 15.5156V12.7031C14.1111 12.3146 14.4257 12 14.8143 12H19.033C19.4216 12 19.7361 12.3146 19.7361 12.7031V15.5156ZM4.26739 7.07812C4.26739 6.68958 4.58196 6.375 4.97051 6.375H19.033C19.4216 6.375 19.7361 6.68958 19.7361 7.07812V9.89062C19.7361 10.2792 19.4216 10.5938 19.033 10.5938H4.97051C4.58196 10.5938 4.26739 10.2792 4.26739 9.89062V7.07812ZM4.26739 12.7031C4.26739 12.3146 4.58196 12 4.97051 12H12.0018C12.3903 12 12.7049 12.3146 12.7049 12.7031V21.1406C12.7049 21.5292 12.3903 21.8438 12.0018 21.8438H4.97051C4.58196 21.8438 4.26739 21.5292 4.26739 21.1406V12.7031Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2612_34718">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
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
                  <svg
                    width="24"
                    height="22"
                    viewBox="0 0 24 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.483 4.36793C15.5927 5.0637 16.3708 6.24109 16.5125 7.60777C16.965 7.81923 17.4673 7.94083 17.9999 7.94083C19.944 7.94083 21.5197 6.36509 21.5197 4.42125C21.5197 2.47711 19.944 0.901367 17.9999 0.901367C16.0743 0.901966 14.5123 2.44955 14.483 4.36793ZM12.177 11.5748C14.1212 11.5748 15.6969 9.99878 15.6969 8.05494C15.6969 6.1111 14.1209 4.53536 12.177 4.53536C10.2332 4.53536 8.65653 6.1114 8.65653 8.05524C8.65653 9.99908 10.2332 11.5748 12.177 11.5748ZM13.6701 11.8147H10.6833C8.19828 11.8147 6.17656 13.8367 6.17656 16.3218V19.9744L6.18585 20.0316L6.43744 20.1104C8.80899 20.8513 10.8693 21.0984 12.5652 21.0984C15.8775 21.0984 17.7974 20.1541 17.9157 20.0939L18.1508 19.975H18.176V16.3218C18.1769 13.8367 16.1551 11.8147 13.6701 11.8147ZM19.4935 8.18104H16.5298C16.4978 9.36681 15.9916 10.4346 15.191 11.2025C17.3999 11.8594 19.0161 13.9077 19.0161 16.3272V17.4528C21.9423 17.3455 23.6286 16.5162 23.7397 16.4605L23.9748 16.3413H24V12.6875C24 10.2028 21.9783 8.18104 19.4935 8.18104ZM6.00075 7.94143C6.68933 7.94143 7.32999 7.74045 7.87271 7.39811C8.04523 6.27284 8.64845 5.28954 9.51015 4.61982C9.51374 4.55393 9.52003 4.48864 9.52003 4.42215C9.52003 2.47801 7.94399 0.902266 6.00075 0.902266C4.05631 0.902266 2.48087 2.47801 2.48087 4.42215C2.48087 6.36539 4.05631 7.94143 6.00075 7.94143ZM9.16181 11.2025C8.36511 10.4385 7.86073 9.3764 7.82389 8.19781C7.71397 8.18972 7.60524 8.18104 7.49322 8.18104H4.50678C2.02171 8.18104 0 10.2028 0 12.6875V16.3407L0.00928491 16.397L0.260876 16.4764C2.16338 17.0703 3.86133 17.344 5.33613 17.4303V16.3272C5.33673 13.9077 6.9523 11.86 9.16181 11.2025Z"
                      fill="rgba(0, 102, 190, 0.6)"
                    />
                  </svg>
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.7924 9.57792L21.2929 7.56503V0.547555C21.2929 0.243409 21.0496 9.2425e-05 20.7454 9.2425e-05H20.7399H3.26534C2.9612 -0.0054375 2.71788 0.237879 2.71235 0.542025V0.547555V7.56503L0.218353 9.57239H0.212823C0.0801045 9.67746 0.00268555 9.8323 0.00268555 10.0037V21.2405C0.00821547 22.7668 1.24692 24 2.77318 24H21.2265C22.7528 24 23.9915 22.7668 23.997 21.2405V10.0037C24.0026 9.83783 23.9252 9.67746 23.7924 9.57792ZM21.2929 8.98622L22.515 9.97055L21.2929 10.8111V8.98622ZM3.81834 1.10608H20.1869V11.5742L12.9427 16.5567C12.3731 16.9438 11.6321 16.9438 11.0625 16.5567L3.81834 11.5742V1.10608ZM2.71235 8.98622V10.8111L1.49024 9.97055L2.71235 8.98622ZM22.8966 21.2405C22.8911 22.1585 22.1445 22.894 21.2321 22.894H2.77318C1.85521 22.894 1.1142 22.1585 1.10867 21.2405V11.0599L10.4321 17.4691C11.3777 18.1161 12.622 18.1161 13.5731 17.4691L22.8966 11.0599V21.2405Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                    <path
                      d="M22.8966 21.2405C22.8911 22.1585 22.1445 22.894 21.2321 22.894H2.77318C1.85521 22.894 1.1142 22.1585 1.10867 21.2405V11.0599L10.4321 17.4691C11.3777 18.1161 12.622 18.1161 13.5731 17.4691L22.8966 11.0599V21.2405Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                    <path
                      d="M12.7861 5.53076H11C10.7816 5.53076 10.603 5.77961 10.603 6.08376V11.4478C10.603 11.7519 10.7816 12.0008 11 12.0008H12.7861C13.0044 12.0008 13.183 11.7519 13.183 11.4478V6.08376C13.183 5.77961 13.0044 5.53076 12.7861 5.53076Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                    <path
                      d="M15.7896 12H17.5757C17.794 12 17.9727 11.7512 17.9727 11.447V3.2627C17.9727 2.95855 17.794 2.70971 17.5757 2.70971H15.7896C15.5713 2.70971 15.3927 2.95855 15.3927 3.2627V11.447C15.3927 11.7512 15.5713 12 15.7896 12Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                    <path
                      d="M8.00049 7.52221L6.52809 7.521C6.22394 7.521 5.9751 7.76984 5.9751 8.07399V11.4473C5.9751 11.7514 6.22394 12.0003 6.52809 12.0003L8.00049 12.0015C8.30463 12.0015 8.55348 11.7526 8.55348 11.4485V8.0752C8.55348 7.77106 8.30463 7.52221 8.00049 7.52221Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
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
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="512.000000pt"
                      height="512.000000pt"
                      viewBox="0 0 512.000000 512.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {" "}
                      <g
                        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#0066BE"
                        fillOpacity="0.6"
                        stroke="none"
                      >
                        {" "}
                        <path d="M2325 5109 c-882 -82 -1661 -616 -2054 -1410 -414 -832 -349 -1805 171 -2577 126 -187 339 -416 523 -564 253 -202 589 -374 904 -463 796 -223 1652 -46 2299 474 119 96 297 275 394 396 202 253 374 589 463 904 223 796 46 1655 -475 2299 -227 282 -524 519 -851 681 -431 215 -903 304 -1374 260z m552 -354 c138 -21 311 -64 438 -110 112 -40 345 -150 345 -162 0 -4 -120 -128 -267 -275 l-266 -267 -66 25 c-168 63 -337 88 -552 82 -166 -6 -308 -30 -433 -75 l-69 -25 -268 268 c-148 148 -269 272 -269 275 0 11 236 119 346 158 177 63 394 109 589 125 95 7 364 -3 472 -19z m-186 -1050 c160 -12 364 -87 521 -192 93 -61 239 -208 301 -300 137 -206 198 -409 198 -653 0 -186 -30 -328 -106 -488 -149 -314 -416 -539 -745 -626 -615 -164 -1252 202 -1414 814 -86 322 -27 669 161 952 62 93 208 239 301 301 102 68 242 132 355 162 94 25 261 45 322 39 17 -2 64 -6 106 -9z m-1779 -312 l267 -266 -20 -51 c-28 -72 -66 -226 -80 -324 -7 -53 -10 -143 -6 -245 6 -175 27 -297 73 -426 l27 -73 -269 -269 c-148 -148 -272 -269 -275 -269 -3 0 -33 57 -67 127 -293 618 -292 1314 3 1931 35 72 67 132 72 132 4 0 128 -120 275 -267z m3646 130 c253 -532 288 -1116 100 -1678 -40 -122 -160 -385 -175 -385 -4 0 -128 120 -275 267 l-267 266 20 51 c28 72 66 226 80 324 7 53 10 143 6 245 -6 175 -27 297 -73 426 l-27 73 269 269 c148 148 272 269 275 269 3 0 33 -57 67 -127z m-2459 -2383 c283 -95 670 -92 945 7 l69 25 268 -268 c148 -148 269 -272 269 -275 0 -11 -254 -127 -356 -162 -247 -86 -461 -121 -734 -121 -275 0 -492 36 -735 121 -111 39 -365 157 -365 170 0 13 524 533 537 533 6 0 52 -14 102 -30z" />{" "}
                      </g>{" "}
                    </svg>
                    <p>Bounced Email</p>
                  </Link>
                </li>
              ) : null}
            </ul>
          ) : window.location.pathname == "/library-content" ||
            location.pathname == "/create-docintel-link" ||
            window.location.pathname == "/library-edit" ||
            window.location.pathname == "/library-create" ||
            window.location.pathname == "/library-sublink" ||
            window.location.pathname == "/library-topics" ||
            window.location.pathname == "/library-campaign" ||
            window.location.pathname == "/spc" ||
            window.location.pathname == "/set-popup" ||
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
                className={
                  location.pathname == "/library-content" ? "active" : "side_li"
                }
              >
                <Link to={"/library-content"}>
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.499305 1.99992C0.499347 0.895384 1.39477 0 2.49931 0H14.489C15.5936 0 16.489 0.895429 16.489 2V19C16.489 20.1046 15.5936 21 14.489 21H2.49866C1.39406 21 0.498615 20.1045 0.498657 18.9999L0.499305 1.99992ZM2.69955 3.4375C2.69955 3.32146 2.74391 3.21018 2.82287 3.12814C2.90184 3.04609 3.00893 3 3.1206 3H6.91008C7.02175 3 7.12884 3.04609 7.20781 3.12814C7.28677 3.21018 7.33113 3.32146 7.33113 3.4375V6.5C7.33113 6.61603 7.28677 6.72731 7.20781 6.80936C7.12884 6.8914 7.02175 6.9375 6.91008 6.9375H3.1206C3.00893 6.9375 2.90184 6.8914 2.82287 6.80936C2.74391 6.72731 2.69955 6.61603 2.69955 6.5V3.4375ZM14.3657 12.0594C14.2867 12.1414 14.1796 12.1875 14.068 12.1875H3.1206C3.00893 12.1875 2.90184 12.1414 2.82287 12.0594C2.74391 11.9773 2.69955 11.866 2.69955 11.75C2.69955 11.634 2.74391 11.5227 2.82287 11.4406C2.90184 11.3586 3.00893 11.3125 3.1206 11.3125H14.068C14.1796 11.3125 14.2867 11.3586 14.3657 11.4406C14.4447 11.5227 14.489 11.634 14.489 11.75C14.489 11.866 14.4447 11.9773 14.3657 12.0594ZM14.068 9.5625H3.1206C3.00893 9.5625 2.90184 9.51641 2.82287 9.43436C2.74391 9.35231 2.69955 9.24103 2.69955 9.125C2.69955 9.00897 2.74391 8.89769 2.82287 8.81564C2.90184 8.73359 3.00893 8.6875 3.1206 8.6875H14.068C14.1796 8.6875 14.2867 8.73359 14.3657 8.81564C14.4447 8.89769 14.489 9.00897 14.489 9.125C14.489 9.24103 14.4447 9.35231 14.3657 9.43436C14.2867 9.51641 14.1796 9.5625 14.068 9.5625ZM14.068 6.9375H9.01534C8.90367 6.9375 8.79657 6.8914 8.71761 6.80936C8.63865 6.72731 8.59429 6.61603 8.59429 6.5C8.59429 6.38396 8.63865 6.27268 8.71761 6.19064C8.79657 6.10859 8.90367 6.0625 9.01534 6.0625H14.068C14.1796 6.0625 14.2867 6.10859 14.3657 6.19064C14.4447 6.27268 14.489 6.38396 14.489 6.5C14.489 6.61603 14.4447 6.72731 14.3657 6.80936C14.2867 6.8914 14.1796 6.9375 14.068 6.9375ZM14.068 3.875H9.01534C8.90367 3.875 8.79657 3.8289 8.71761 3.74686C8.63865 3.66481 8.59429 3.55353 8.59429 3.4375C8.59429 3.32146 8.63865 3.21018 8.71761 3.12814C8.79657 3.04609 8.90367 3 9.01534 3H14.068C14.1796 3 14.2867 3.04609 14.3657 3.12814C14.4447 3.21018 14.489 3.32146 14.489 3.4375C14.489 3.55353 14.4447 3.66481 14.3657 3.74686C14.2867 3.8289 14.1796 3.875 14.068 3.875ZM2.82287 14.6844C2.90184 14.7664 3.00893 14.8125 3.1206 14.8125H14.068C14.1796 14.8125 14.2867 14.7664 14.3657 14.6844C14.4447 14.6023 14.489 14.491 14.489 14.375C14.489 14.259 14.4447 14.1477 14.3657 14.0656C14.2867 13.9836 14.1796 13.9375 14.068 13.9375H3.1206C3.00893 13.9375 2.90184 13.9836 2.82287 14.0656C2.74391 14.1477 2.69955 14.259 2.69955 14.375C2.69955 14.491 2.74391 14.6023 2.82287 14.6844ZM8.59429 17.4375H3.1206C3.00893 17.4375 2.90184 17.3914 2.82287 17.3094C2.74391 17.2273 2.69955 17.116 2.69955 17C2.69955 16.884 2.74391 16.7727 2.82287 16.6906C2.90184 16.6086 3.00893 16.5625 3.1206 16.5625H8.59429C8.70596 16.5625 8.81305 16.6086 8.89201 16.6906C8.97098 16.7727 9.01534 16.884 9.01534 17C9.01534 17.116 8.97098 17.2273 8.89201 17.3094C8.81305 17.3914 8.70596 17.4375 8.59429 17.4375Z"
                      fill="rgba(0, 102, 190, 0.6)"
                    />
                    <path
                      d="M5.10922 24C4.04883 24 3.18922 22.08 3.18922 22.08H15.5898C16.6943 22.08 17.5898 21.1846 17.5898 20.08V2.88001C18.6502 2.88001 19.5098 3.73962 19.5098 4.80001V22C19.5098 23.1046 18.6143 24 17.5098 24H5.10922Z"
                      fill="rgba(0, 102, 190, 0.6)"
                    />
                  </svg>
                  <p>Content</p>
                </Link>
              </li>

              <li
                className={
                  (location.pathname == "/library-create" ||
                    location.pathname == "/library-edit" ||
                    location.pathname == "/library-sublink" ||
                    location.pathname == "/library-topics" ||
                    location.pathname == "/set-popup" ||
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_301_44)">
                      <path
                        d="M8.50001 13.5C8.22387 13.5 8.00001 13.2761 8.00001 13V11.5H6.50001C6.22387 11.5 6.00001 11.2761 6.00001 11C6.00001 10.7239 6.22387 10.5 6.50001 10.5H8.00001V9.00001C8.00001 8.72387 8.22387 8.50001 8.50001 8.50001C8.77615 8.50001 9.00001 8.72387 9.00001 9.00001V10.5H10.5C10.7762 10.5 11 10.7239 11 11C11 11.2761 10.7762 11.5 10.5 11.5H9.00001V13C9.00001 13.2761 8.77615 13.5 8.50001 13.5Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.000305177 2.00005C0.00027582 0.895463 0.895715 0 2.00031 0H15C16.1046 0 17 0.895429 17 2V15.6654L13.4225 20.9994C13.374 21.0717 13.3452 21.1554 13.339 21.2423L13.2849 22H2.00078C0.896235 22 0.000812916 21.1046 0.000783561 20.0001L0.000305177 2.00005ZM8.50001 15C10.7092 15 12.5 13.2091 12.5 11C12.5 8.79087 10.7092 7.00001 8.50001 7.00001C6.29087 7.00001 4.50001 8.79087 4.50001 11C4.50001 13.2091 6.29087 15 8.50001 15Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M14.4467 23.9681C14.3081 24.0368 14.1473 23.929 14.1583 23.7747L14.3392 21.2423C14.3454 21.1554 14.3741 21.0717 14.4226 20.9994L20.4074 12.0762L22.8989 13.7473L16.9141 22.6704C16.8656 22.7427 16.7991 22.8011 16.7211 22.8398L14.4467 23.9681Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M23.1774 13.3321L23.5886 12.7191C23.9757 12.1419 23.8251 11.3583 23.2534 10.9748L22.8381 10.6963C22.2663 10.3128 21.4842 10.4708 21.0971 11.048L20.686 11.661L23.1774 13.3321Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_301_44">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p>Create &amp; Change</p>
                </Link>
              </li>

              {localStorage.getItem("user_id") == "rjiGlqA9DXJVH7bDDTX0Lg==" ||
                localStorage.getItem("user_id") == "wW0geGtDPvig5gF 6KbJrg==" ||
                localStorage.getItem("user_id") == "z2TunmZQf3QwCsICFTLGGQ==" ||
                localStorage.getItem("user_id") == "qDgwPdToP05Kgzc g2VjIQ==" ||
                localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ==" ||
                localStorage.getItem("user_id") == "UbCJcnLM9fe HsRMgX8c1A==" ||
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
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.7407 0C1.63616 0 0.740741 0.895384 0.740699 1.99992L0.740051 18.9999C0.740009 20.1045 1.63545 21 2.74005 21H7.33966V15.5C7.33966 13.8431 8.68281 12.5 10.3397 12.5C11.9159 12.5 13.2081 13.7156 13.3302 15.2604C13.9173 15.0207 14.5607 14.8885 15.2352 14.8885C15.756 14.8885 16.2583 14.9673 16.7304 15.1136V2C16.7304 0.895429 15.835 0 14.7304 0H2.7407ZM14.3094 9.875C14.421 9.875 14.5281 9.82891 14.6071 9.74686C14.6861 9.66481 14.7304 9.55353 14.7304 9.4375C14.7304 9.32147 14.6861 9.21019 14.6071 9.12814C14.5281 9.04609 14.421 9 14.3094 9H3.36199C3.25032 9 3.14323 9.04609 3.06426 9.12814C2.9853 9.21019 2.94094 9.32147 2.94094 9.4375C2.94094 9.55353 2.9853 9.66481 3.06426 9.74686C3.14323 9.82891 3.25032 9.875 3.36199 9.875H14.3094ZM3.36199 7.25H14.3094C14.421 7.25 14.5281 7.20391 14.6071 7.12186C14.6861 7.03981 14.7304 6.92853 14.7304 6.8125C14.7304 6.69647 14.6861 6.58519 14.6071 6.50314C14.5281 6.42109 14.421 6.375 14.3094 6.375H3.36199C3.25032 6.375 3.14323 6.42109 3.06426 6.50314C2.9853 6.58519 2.94094 6.69647 2.94094 6.8125C2.94094 6.92853 2.9853 7.03981 3.06426 7.12186C3.14323 7.20391 3.25032 7.25 3.36199 7.25ZM5.1611 4H12.3219C12.4335 4 12.5406 3.95391 12.6196 3.87186C12.6986 3.78981 12.7429 3.67853 12.7429 3.5625C12.7429 3.44647 12.6986 3.33519 12.6196 3.25314C12.5406 3.17109 12.4335 3.125 12.3219 3.125H5.1611C5.04943 3.125 4.94234 3.17109 4.86337 3.25314C4.78441 3.33519 4.74005 3.44647 4.74005 3.5625C4.74005 3.67853 4.78441 3.78981 4.86337 3.87186C4.94234 3.95391 5.04943 4 5.1611 4Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M10.3494 13.4C9.18632 13.4 8.24005 14.3464 8.24005 15.5096V18.0879H12.4588V15.5096C12.4588 14.3464 11.5125 13.4 10.3494 13.4Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M8.24005 21.1038C8.24005 22.267 9.18632 23.2134 10.3494 23.2134C11.5125 23.2134 12.4588 22.267 12.4588 21.1038V18.9942H8.24005V21.1038Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M13.2401 16.4902V21.2788L17.8406 16.6779C16.4771 15.7076 14.6618 15.645 13.2401 16.4902Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M18.4592 17.3004L12.5779 23.1822C13.3065 23.7008 14.1634 23.9614 15.0212 23.9614C18.4519 23.9614 20.4354 20.078 18.4592 17.3004Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                    </svg>
                    <p>SPC</p>
                  </Link>
                </li>
              ) : null}
              {localStorage.getItem("user_id") ==
                "56Ek4feL/1A8mZgIKQWEqg==" ? null : localStorage.getItem(
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M2.10988 0.703674V2.81433C2.10988 3.20288 2.42485 3.51801 2.81321 3.51801H8.43913C8.82749 3.51801 9.14228 3.20288 9.14228 2.81433V0.703674C9.14228 0.315124 8.82749 0 8.43913 0H2.81321C2.42485 0 2.10988 0.315124 2.10988 0.703674Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M21.188 5.48778L23.0051 5.49567C23.5556 5.49807 24.0007 5.945 24.0007 6.49555L24.0008 7.5H12.749L12.7488 6.48808C12.7487 5.9356 13.1965 5.48915 13.7489 5.49231C14.358 5.49579 15.0005 5.50001 15.0005 5.50001L21.188 5.48778Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M12.749 9L12.749 10.6767H14.8106C15.1301 10.6767 15.389 10.9876 15.389 11.371V13.8768C15.389 14.2601 15.389 14.5711 15.1393 14.5711L15.1391 14.718V15.1486C15.1391 15.486 15.431 15.7605 15.7899 15.7605C16.8664 15.7605 17.4136 16.5839 17.4136 17.596V21.5H21.8912C23.0546 21.5 24.0009 20.5532 24.0009 19.3893L24.0008 9H12.749Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M11.2519 7.88111L11.2521 10.6767H9.60376C9.28428 10.6767 9.02518 10.9876 9.02518 11.371V13.8768C9.02518 14.2601 9.02518 14.5711 9.28397 14.5711V15.1486C9.28397 15.486 8.99196 15.7605 8.63305 15.7605C7.55648 15.7605 7.00043 16.5839 7.00043 17.596V21.4624H2.11006C0.946804 21.4624 0.000427246 20.5155 0.000427246 19.3517V7.89307C0.000427246 6.72925 0.946804 5.78241 2.11006 5.78241C2.49787 5.78241 2.81339 5.46674 2.81339 5.07874V4.61328L8.43913 4.60133V5.06678C8.43913 5.45478 8.75447 5.77046 9.14228 5.77046C10.3055 5.77046 11.2519 6.71729 11.2519 7.88111Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M9.70062 11.9001V13.6999C9.70062 14.0313 9.92457 14.3 10.2007 14.3H14.2007C14.4768 14.3 14.7006 14.0313 14.7006 13.6999V11.9001C14.7006 11.5687 14.4768 11.3 14.2007 11.3H10.2007C9.92457 11.3 9.70062 11.5687 9.70062 11.9001Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.0132 16.2788C14.703 16.2788 14.4507 16.0415 14.4507 15.7499V15.4001H9.95066V15.7499C9.95066 16.0415 9.69828 16.2788 9.38808 16.2788C8.45761 16.2788 7.70062 16.9904 7.70062 17.8652V22.4136C7.70062 23.2884 8.45761 24 9.38808 24H15.0132C15.9436 24 16.7006 23.2884 16.7006 22.4136V17.8652C16.7006 16.9904 15.9436 16.2788 15.0132 16.2788ZM13.6132 20.2327H12.7507V21.0733C12.7507 21.3653 12.4989 21.6022 12.1882 21.6022C11.8776 21.6022 11.6257 21.3653 11.6257 21.0733V20.2327H10.7631C10.4525 20.2327 10.2007 19.996 10.2007 19.7039C10.2007 19.4119 10.4525 19.1751 10.7631 19.1751H11.6257V18.3939C11.6257 18.1019 11.8776 17.8652 12.1882 17.8652C12.4989 17.8652 12.7507 18.1019 12.7507 18.3939V19.1751H13.6132C13.9239 19.1751 14.1758 19.4119 14.1758 19.7039C14.1758 19.996 13.9239 20.2327 13.6132 20.2327Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                    </svg>
                    {/* {localStorage.getItem("group_id") == 3 &&
                    localStorage.getItem("user_id") !=
                      "56Ek4feL/1A8mZgIKQWEqg==" ? (
                      <p>Products & Tags</p>
                    ) : (
                      <>
                        {localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                          <p>Topics</p>
                        ) : null}
                      </>
                    )} */}
                    {localStorage.getItem("group_id") == 3 ? (
                      localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
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
              {/*
                localStorage.getItem("group_id") != 2 && (

                )
                */}

              {/*
                <li
                className={
                location.pathname == "/library-delete" && c_id == 0
                ? "active"
                : "side_li"
              }
              >
              <Link to={"/library-delete"}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
              d="M14.9165 19.0566C15.0817 19.2206 15.3049 19.314 15.5386 19.3171C15.7723 19.314 15.9955 19.2206 16.1607 19.0566C16.326 18.8925 16.4202 18.671 16.4232 18.439V9.07317C16.4232 8.8403 16.33 8.61696 16.1641 8.4523C15.9982 8.28763 15.7732 8.19512 15.5386 8.19512C15.304 8.19512 15.079 8.28763 14.9131 8.4523C14.7472 8.61696 14.654 8.8403 14.654 9.07317V18.439C14.657 18.671 14.7512 18.8925 14.9165 19.0566Z"
              fill="#0066BE"
              fillOpacity="0.6"
              />
              <path
              d="M8.46161 19.3171C8.22795 19.314 8.00471 19.2206 7.83947 19.0566C7.67423 18.8925 7.58004 18.671 7.57699 18.439V9.07317C7.57699 8.8403 7.67019 8.61696 7.83609 8.4523C8.00199 8.28763 8.227 8.19512 8.46161 8.19512C8.69623 8.19512 8.92124 8.28763 9.08714 8.4523C9.25303 8.61696 9.34624 8.8403 9.34624 9.07317V18.439C9.34318 18.671 9.249 18.8925 9.08376 19.0566C8.91852 19.2206 8.69528 19.314 8.46161 19.3171Z"
              fill="#0066BE"
              fillOpacity="0.6"
              />
              <path
              d="M11.378 19.0566C11.5432 19.2206 11.7664 19.314 12.0001 19.3171C12.2338 19.314 12.457 19.2206 12.6223 19.0566C12.7875 18.8925 12.8817 18.671 12.8847 18.439V9.07317C12.8847 8.8403 12.7915 8.61696 12.6256 8.4523C12.4597 8.28763 12.2347 8.19512 12.0001 8.19512C11.7655 8.19512 11.5405 8.28763 11.3746 8.4523C11.2087 8.61696 11.1155 8.8403 11.1155 9.07317V18.439C11.1185 18.671 11.2127 18.8925 11.378 19.0566Z"
              fill="#0066BE"
              fillOpacity="0.6"
              />
              <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.4232 2.34151V3.5122H22.6154C22.85 3.5122 23.075 3.6047 23.2409 3.76937C23.4068 3.93404 23.5 4.15737 23.5 4.39024C23.5 4.62312 23.4068 4.84645 23.2409 5.01112C23.075 5.17578 22.85 5.26829 22.6154 5.26829H21.0893L20.1151 20.6517C20.0581 21.5576 19.6557 22.408 18.9896 23.03C18.3235 23.6519 17.4438 23.9988 16.5293 24H7.4707C6.56439 23.987 5.69642 23.6349 5.04037 23.0141C4.38432 22.3933 3.98854 21.5496 3.93217 20.6517L2.9131 5.26829H1.38462C1.15 5.26829 0.924995 5.17578 0.759098 5.01112C0.5932 4.84645 0.5 4.62312 0.5 4.39024C0.5 4.15737 0.5932 3.93404 0.759098 3.76937C0.924995 3.6047 1.15 3.5122 1.38462 3.5122H7.57699V2.28297C7.59194 1.68216 7.83906 1.11006 8.2672 0.685098C8.69534 0.260133 9.27171 0.0148415 9.87701 0H14.1232C14.7386 0.0152749 15.3235 0.268696 15.7533 0.70617C16.183 1.14364 16.4234 1.73051 16.4232 2.34151ZM14.654 2.34151V3.5122H9.34624V2.34151C9.34624 2.20178 9.40216 2.06778 9.5017 1.96898C9.60124 1.87018 9.73624 1.81467 9.87701 1.81467H14.1232C14.264 1.81467 14.399 1.87018 14.4985 1.96898C14.5981 2.06778 14.654 2.20178 14.654 2.34151ZM5.64246 20.5463L4.73423 5.2683L19.313 5.32683L18.3576 20.5463C18.3249 21.006 18.1182 21.4365 17.7792 21.7513C17.4401 22.0661 16.9937 22.2421 16.5293 22.2439H7.4707C7.00558 22.2449 6.55758 22.0698 6.21792 21.7544C5.87825 21.4391 5.67247 21.007 5.64246 20.5463Z"
              fill="#0066BE"
              fillOpacity="0.6"
              />
              </svg>
              <p>Delete</p>
              </Link>
              </li>
                */}
            </ul>
          ) : window.location.pathname == "/license-content" ||
            window.location.pathname == "/license-edit" ||
            window.location.pathname == "/license-create" ||
            window.location.pathname == "/license-sublink" ||
            window.location.pathname == "/license-topics" ||
            window.location.pathname == "/license-set-popup" ||
            window.location.pathname == "/license-preview-content" ||
            window.location.pathname == "/license-delete" ||
            window.location.pathname == "/license-create-user" ||
            window.location.pathname == "/license-edit-listing" ||
            window.location.pathname == "/license-content-detail" ||
            window.location.pathname == "/license-add-link"||
            window.location.pathname == "/license/renew-listing" ||
            window.location.pathname == "/license/renew" ? (
            <ul>
              <li
                className={
                  location.pathname == "/license-content" ? "active" : "side_li"
                }
              >
                <Link to={"/license-content"}>
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.499305 1.99992C0.499347 0.895384 1.39477 0 2.49931 0H14.489C15.5936 0 16.489 0.895429 16.489 2V19C16.489 20.1046 15.5936 21 14.489 21H2.49866C1.39406 21 0.498615 20.1045 0.498657 18.9999L0.499305 1.99992ZM2.69955 3.4375C2.69955 3.32146 2.74391 3.21018 2.82287 3.12814C2.90184 3.04609 3.00893 3 3.1206 3H6.91008C7.02175 3 7.12884 3.04609 7.20781 3.12814C7.28677 3.21018 7.33113 3.32146 7.33113 3.4375V6.5C7.33113 6.61603 7.28677 6.72731 7.20781 6.80936C7.12884 6.8914 7.02175 6.9375 6.91008 6.9375H3.1206C3.00893 6.9375 2.90184 6.8914 2.82287 6.80936C2.74391 6.72731 2.69955 6.61603 2.69955 6.5V3.4375ZM14.3657 12.0594C14.2867 12.1414 14.1796 12.1875 14.068 12.1875H3.1206C3.00893 12.1875 2.90184 12.1414 2.82287 12.0594C2.74391 11.9773 2.69955 11.866 2.69955 11.75C2.69955 11.634 2.74391 11.5227 2.82287 11.4406C2.90184 11.3586 3.00893 11.3125 3.1206 11.3125H14.068C14.1796 11.3125 14.2867 11.3586 14.3657 11.4406C14.4447 11.5227 14.489 11.634 14.489 11.75C14.489 11.866 14.4447 11.9773 14.3657 12.0594ZM14.068 9.5625H3.1206C3.00893 9.5625 2.90184 9.51641 2.82287 9.43436C2.74391 9.35231 2.69955 9.24103 2.69955 9.125C2.69955 9.00897 2.74391 8.89769 2.82287 8.81564C2.90184 8.73359 3.00893 8.6875 3.1206 8.6875H14.068C14.1796 8.6875 14.2867 8.73359 14.3657 8.81564C14.4447 8.89769 14.489 9.00897 14.489 9.125C14.489 9.24103 14.4447 9.35231 14.3657 9.43436C14.2867 9.51641 14.1796 9.5625 14.068 9.5625ZM14.068 6.9375H9.01534C8.90367 6.9375 8.79657 6.8914 8.71761 6.80936C8.63865 6.72731 8.59429 6.61603 8.59429 6.5C8.59429 6.38396 8.63865 6.27268 8.71761 6.19064C8.79657 6.10859 8.90367 6.0625 9.01534 6.0625H14.068C14.1796 6.0625 14.2867 6.10859 14.3657 6.19064C14.4447 6.27268 14.489 6.38396 14.489 6.5C14.489 6.61603 14.4447 6.72731 14.3657 6.80936C14.2867 6.8914 14.1796 6.9375 14.068 6.9375ZM14.068 3.875H9.01534C8.90367 3.875 8.79657 3.8289 8.71761 3.74686C8.63865 3.66481 8.59429 3.55353 8.59429 3.4375C8.59429 3.32146 8.63865 3.21018 8.71761 3.12814C8.79657 3.04609 8.90367 3 9.01534 3H14.068C14.1796 3 14.2867 3.04609 14.3657 3.12814C14.4447 3.21018 14.489 3.32146 14.489 3.4375C14.489 3.55353 14.4447 3.66481 14.3657 3.74686C14.2867 3.8289 14.1796 3.875 14.068 3.875ZM2.82287 14.6844C2.90184 14.7664 3.00893 14.8125 3.1206 14.8125H14.068C14.1796 14.8125 14.2867 14.7664 14.3657 14.6844C14.4447 14.6023 14.489 14.491 14.489 14.375C14.489 14.259 14.4447 14.1477 14.3657 14.0656C14.2867 13.9836 14.1796 13.9375 14.068 13.9375H3.1206C3.00893 13.9375 2.90184 13.9836 2.82287 14.0656C2.74391 14.1477 2.69955 14.259 2.69955 14.375C2.69955 14.491 2.74391 14.6023 2.82287 14.6844ZM8.59429 17.4375H3.1206C3.00893 17.4375 2.90184 17.3914 2.82287 17.3094C2.74391 17.2273 2.69955 17.116 2.69955 17C2.69955 16.884 2.74391 16.7727 2.82287 16.6906C2.90184 16.6086 3.00893 16.5625 3.1206 16.5625H8.59429C8.70596 16.5625 8.81305 16.6086 8.89201 16.6906C8.97098 16.7727 9.01534 16.884 9.01534 17C9.01534 17.116 8.97098 17.2273 8.89201 17.3094C8.81305 17.3914 8.70596 17.4375 8.59429 17.4375Z"
                      fill="rgba(0, 102, 190, 0.6)"
                    />
                    <path
                      d="M5.10922 24C4.04883 24 3.18922 22.08 3.18922 22.08H15.5898C16.6943 22.08 17.5898 21.1846 17.5898 20.08V2.88001C18.6502 2.88001 19.5098 3.73962 19.5098 4.80001V22C19.5098 23.1046 18.6143 24 17.5098 24H5.10922Z"
                      fill="rgba(0, 102, 190, 0.6)"
                    />
                  </svg>
                  <p>Content</p>
                </Link>
              </li>

              <li
                className={
                  (location.pathname == "/license-create" ||
                    location.pathname == "/license-edit" ||
                    location.pathname == "/license-sublink" ||
                    location.pathname == "/license-set-popup" ||
                    location.pathname == "/license-preview-content" ||
                    location.pathname == "/license-create-user" ||
                    location.pathname == "/edit-Consent-Options" ||
                    location.pathname == "/license-edit-listing" ||
                    location.pathname == "/license-content-detail" ||
                    location.pathname == "/license-add-link"||
                    location.pathname == "/license/renew-listing"||
                    location.pathname == "/license/renew") &&
                    c_id == 0
                    ? "active"
                    : "side_li"
                }
              >
                <Link to={"/license-create"}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_301_44)">
                      <path
                        d="M8.50001 13.5C8.22387 13.5 8.00001 13.2761 8.00001 13V11.5H6.50001C6.22387 11.5 6.00001 11.2761 6.00001 11C6.00001 10.7239 6.22387 10.5 6.50001 10.5H8.00001V9.00001C8.00001 8.72387 8.22387 8.50001 8.50001 8.50001C8.77615 8.50001 9.00001 8.72387 9.00001 9.00001V10.5H10.5C10.7762 10.5 11 10.7239 11 11C11 11.2761 10.7762 11.5 10.5 11.5H9.00001V13C9.00001 13.2761 8.77615 13.5 8.50001 13.5Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.000305177 2.00005C0.00027582 0.895463 0.895715 0 2.00031 0H15C16.1046 0 17 0.895429 17 2V15.6654L13.4225 20.9994C13.374 21.0717 13.3452 21.1554 13.339 21.2423L13.2849 22H2.00078C0.896235 22 0.000812916 21.1046 0.000783561 20.0001L0.000305177 2.00005ZM8.50001 15C10.7092 15 12.5 13.2091 12.5 11C12.5 8.79087 10.7092 7.00001 8.50001 7.00001C6.29087 7.00001 4.50001 8.79087 4.50001 11C4.50001 13.2091 6.29087 15 8.50001 15Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M14.4467 23.9681C14.3081 24.0368 14.1473 23.929 14.1583 23.7747L14.3392 21.2423C14.3454 21.1554 14.3741 21.0717 14.4226 20.9994L20.4074 12.0762L22.8989 13.7473L16.9141 22.6704C16.8656 22.7427 16.7991 22.8011 16.7211 22.8398L14.4467 23.9681Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                      <path
                        d="M23.1774 13.3321L23.5886 12.7191C23.9757 12.1419 23.8251 11.3583 23.2534 10.9748L22.8381 10.6963C22.2663 10.3128 21.4842 10.4708 21.0971 11.048L20.686 11.661L23.1774 13.3321Z"
                        fill="#0066BE"
                        fillOpacity="0.6"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_301_44">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2.10988 0.703674V2.81433C2.10988 3.20288 2.42485 3.51801 2.81321 3.51801H8.43913C8.82749 3.51801 9.14228 3.20288 9.14228 2.81433V0.703674C9.14228 0.315124 8.82749 0 8.43913 0H2.81321C2.42485 0 2.10988 0.315124 2.10988 0.703674Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                    <path
                      d="M21.188 5.48778L23.0051 5.49567C23.5556 5.49807 24.0007 5.945 24.0007 6.49555L24.0008 7.5H12.749L12.7488 6.48808C12.7487 5.9356 13.1965 5.48915 13.7489 5.49231C14.358 5.49579 15.0005 5.50001 15.0005 5.50001L21.188 5.48778Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                    <path
                      d="M12.749 9L12.749 10.6767H14.8106C15.1301 10.6767 15.389 10.9876 15.389 11.371V13.8768C15.389 14.2601 15.389 14.5711 15.1393 14.5711L15.1391 14.718V15.1486C15.1391 15.486 15.431 15.7605 15.7899 15.7605C16.8664 15.7605 17.4136 16.5839 17.4136 17.596V21.5H21.8912C23.0546 21.5 24.0009 20.5532 24.0009 19.3893L24.0008 9H12.749Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                    <path
                      d="M11.2519 7.88111L11.2521 10.6767H9.60376C9.28428 10.6767 9.02518 10.9876 9.02518 11.371V13.8768C9.02518 14.2601 9.02518 14.5711 9.28397 14.5711V15.1486C9.28397 15.486 8.99196 15.7605 8.63305 15.7605C7.55648 15.7605 7.00043 16.5839 7.00043 17.596V21.4624H2.11006C0.946804 21.4624 0.000427246 20.5155 0.000427246 19.3517V7.89307C0.000427246 6.72925 0.946804 5.78241 2.11006 5.78241C2.49787 5.78241 2.81339 5.46674 2.81339 5.07874V4.61328L8.43913 4.60133V5.06678C8.43913 5.45478 8.75447 5.77046 9.14228 5.77046C10.3055 5.77046 11.2519 6.71729 11.2519 7.88111Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                    <path
                      d="M9.70062 11.9001V13.6999C9.70062 14.0313 9.92457 14.3 10.2007 14.3H14.2007C14.4768 14.3 14.7006 14.0313 14.7006 13.6999V11.9001C14.7006 11.5687 14.4768 11.3 14.2007 11.3H10.2007C9.92457 11.3 9.70062 11.5687 9.70062 11.9001Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.0132 16.2788C14.703 16.2788 14.4507 16.0415 14.4507 15.7499V15.4001H9.95066V15.7499C9.95066 16.0415 9.69828 16.2788 9.38808 16.2788C8.45761 16.2788 7.70062 16.9904 7.70062 17.8652V22.4136C7.70062 23.2884 8.45761 24 9.38808 24H15.0132C15.9436 24 16.7006 23.2884 16.7006 22.4136V17.8652C16.7006 16.9904 15.9436 16.2788 15.0132 16.2788ZM13.6132 20.2327H12.7507V21.0733C12.7507 21.3653 12.4989 21.6022 12.1882 21.6022C11.8776 21.6022 11.6257 21.3653 11.6257 21.0733V20.2327H10.7631C10.4525 20.2327 10.2007 19.996 10.2007 19.7039C10.2007 19.4119 10.4525 19.1751 10.7631 19.1751H11.6257V18.3939C11.6257 18.1019 11.8776 17.8652 12.1882 17.8652C12.4989 17.8652 12.7507 18.1019 12.7507 18.3939V19.1751H13.6132C13.9239 19.1751 14.1758 19.4119 14.1758 19.7039C14.1758 19.996 13.9239 20.2327 13.6132 20.2327Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
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
            window.location.pathname == "/timeline-detail" ? (
            <ul>
              <li
                className={
                  location.pathname == "/readers-view" ||
                    location.pathname == "/timeline-detail"
                    ? "active"
                    : "side_li"
                }
              >
                <Link to={"/readers-view"}>
                  <svg
                    width="25"
                    height="22"
                    viewBox="0 0 25 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4843 4.36793C15.594 5.0637 16.3721 6.24109 16.5138 7.60777C16.9664 7.81923 17.4687 7.94083 18.0012 7.94083C19.9453 7.94083 21.5211 6.36509 21.5211 4.42125C21.5211 2.47711 19.9453 0.901367 18.0012 0.901367C16.0756 0.901966 14.5137 2.44955 14.4843 4.36793ZM12.1784 11.5748C14.1225 11.5748 15.6982 9.99878 15.6982 8.05494C15.6982 6.1111 14.1222 4.53536 12.1784 4.53536C10.2345 4.53536 8.65788 6.1114 8.65788 8.05524C8.65788 9.99908 10.2345 11.5748 12.1784 11.5748ZM13.6714 11.8147H10.6847C8.19962 11.8147 6.17791 13.8367 6.17791 16.3218V19.9744L6.18719 20.0316L6.43878 20.1104C8.81033 20.8513 10.8707 21.0984 12.5665 21.0984C15.8788 21.0984 17.7987 20.1541 17.917 20.0939L18.1521 19.975H18.1773V16.3218C18.1782 13.8367 16.1565 11.8147 13.6714 11.8147ZM19.4949 8.18104H16.5312C16.4991 9.36681 15.993 10.4346 15.1924 11.2025C17.4013 11.8594 19.0174 13.9077 19.0174 16.3272V17.4528C21.9437 17.3455 23.6299 16.5162 23.7411 16.4605L23.9762 16.3413H24.0013V12.6875C24.0013 10.2028 21.9796 8.18104 19.4949 8.18104ZM6.00209 7.94143C6.69067 7.94143 7.33133 7.74045 7.87405 7.39811C8.04657 6.27284 8.64979 5.28954 9.51149 4.61982C9.51508 4.55393 9.52137 4.48864 9.52137 4.42215C9.52137 2.47801 7.94533 0.902266 6.00209 0.902266C4.05765 0.902266 2.48221 2.47801 2.48221 4.42215C2.48221 6.36539 4.05765 7.94143 6.00209 7.94143ZM9.16316 11.2025C8.36645 10.4385 7.86207 9.3764 7.82523 8.19781C7.71531 8.18972 7.60658 8.18104 7.49457 8.18104H4.50812C2.02306 8.18104 0.00134277 10.2028 0.00134277 12.6875V16.3407L0.0106277 16.397L0.262219 16.4764C2.16473 17.0703 3.86267 17.344 5.33747 17.4303V16.3272C5.33807 13.9077 6.95365 11.86 9.16316 11.2025Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
                  <p>CRM</p>
                </Link>
              </li>

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
                  <svg
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.67544 8.8322C10.0807 8.8322 12.0301 6.85457 12.0301 4.41542C12.0301 1.97627 10.0803 -0.000976562 7.67544 -0.000976562C5.27057 -0.000976562 3.31999 1.97665 3.31999 4.4158C3.31999 6.85495 5.27057 8.8322 7.67544 8.8322Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                    <path
                      d="M9.52263 9.13324H5.8275C2.75305 9.13324 0.251831 11.6705 0.251831 14.7888V19.372L0.263318 19.4438L0.574581 19.5427C3.5086 20.4725 6.05762 20.7825 8.15567 20.7825C8.81319 20.7825 9.33459 20.8341 9.90132 20.7825C9.25681 20.4366 8.91259 19.6915 8.91259 18.9302C8.91259 17.8118 9.85364 16.9052 11.0145 16.9052H12.6333V15.2152C12.6333 14.0969 13.5743 13.1902 14.7351 13.1902C14.781 13.1902 14.8267 13.1916 14.8721 13.1944C14.1925 10.8498 12.0515 9.13324 9.52263 9.13324Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                    <path
                      d="M16.1209 15.4918C16.1209 14.8609 15.61 14.3495 14.9798 14.3495C14.3496 14.3495 13.8387 14.8609 13.8387 15.4918V18.03H11.2898C10.6596 18.03 10.1487 18.5414 10.1487 19.1722C10.1487 19.803 10.6596 20.3144 11.2898 20.3144H13.8387V22.8568C13.8387 23.4876 14.3496 23.999 14.9798 23.999C15.61 23.999 16.1209 23.4876 16.1209 22.8568V20.3144H18.6571C19.2873 20.3144 19.7982 19.803 19.7982 19.1722C19.7982 18.5414 19.2873 18.03 18.6571 18.03H16.1209V15.4918Z"
                      fill="#0066BE"
                      fillOpacity="0.6"
                    />
                  </svg>
                  <p>Add Contact</p>
                </Link>
              </li>

              {localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ? (
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
                  <Link to={"/site"}>
                    <svg
                      style={{ width: "22", height: "22" }}
                      version="1.0"
                      width="512.000000pt"
                      height="512.000000pt"
                      viewBox="0 0 512.000000 512.000000"
                    >
                      <g
                        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#0066BE"
                        fillOpacity="0.6"
                        stroke="none"
                      >
                        {" "}
                        <path d="M790 5105 c-195 -36 -349 -116 -497 -258 -111 -107 -194 -236 -242 -374 -52 -155 -51 -105 -51 -1913 0 -1808 -1 -1758 51 -1913 93 -271 325 -503 596 -596 155 -52 105 -51 1913 -51 1808 0 1758 -1 1913 51 271 93 503 325 596 596 52 155 51 105 51 1913 0 1808 1 1758 -51 1913 -93 271 -325 503 -596 596 -155 52 -103 51 -1922 50 -1371 -1 -1700 -3 -1761 -14z m2070 -859 c49 -26 79 -55 103 -101 22 -39 22 -49 25 -597 l3 -557 557 -3 c521 -3 559 -4 592 -22 49 -26 79 -55 103 -101 21 -38 22 -53 22 -305 0 -252 -1 -267 -22 -305 -24 -46 -54 -75 -103 -101 -33 -18 -71 -19 -592 -22 l-557 -3 -3 -557 c-3 -548 -3 -558 -25 -597 -24 -46 -54 -75 -103 -101 -32 -17 -60 -19 -300 -19 -240 0 -268 2 -300 19 -49 26 -79 55 -103 101 -22 39 -22 49 -25 597 l-3 557 -557 3 c-548 3 -558 3 -597 25 -46 24 -75 54 -101 103 -17 32 -19 60 -19 300 0 240 2 268 19 300 26 49 55 79 101 103 39 22 49 22 597 25 l557 3 3 557 c3 521 4 559 22 592 35 66 81 103 151 121 17 4 140 7 275 6 218 -2 249 -4 280 -21z" />{" "}
                      </g>{" "}
                    </svg>
                    <p>Add Site</p>
                  </Link>
                </li>
              ) : null}
            </ul>
          ) : 
          window.location.pathname == "/webinar/invitees" ||
              window.location.pathname == "/webinar/registration" ||
              window.location.pathname == "/webinar/email" ||
              window.location.pathname == "/webinar/live-stream" || 
               window.location.pathname == "/webinar/live-stream/polls-layout" ||  window.location.pathname == "/webinar/live-stream/survey/question-data" ||   window.location.pathname == "/webinar/live-stream/chat-link" ||  
               window.location.pathname == "/webinar/live-stream/contact-dm" || 
                window.location.pathname === "/webinar/live-stream/settings" ||
                 window.location.pathname === "/webinar/live-stream/speaker-zone" ||
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                    <path d="M14.483 4.36793C15.5927 5.0637 16.3708 6.24109 16.5125 7.60777C16.965 7.81923 17.4673 7.94083 17.9999 7.94083C19.944 7.94083 21.5197 6.36509 21.5197 4.42125C21.5197 2.47711 19.944 0.901367 17.9999 0.901367C16.0743 0.901966 14.5123 2.44955 14.483 4.36793ZM12.177 11.5748C14.1212 11.5748 15.6969 9.99878 15.6969 8.05494C15.6969 6.1111 14.1209 4.53536 12.177 4.53536C10.2332 4.53536 8.65653 6.1114 8.65653 8.05524C8.65653 9.99908 10.2332 11.5748 12.177 11.5748ZM13.6701 11.8147H10.6833C8.19828 11.8147 6.17656 13.8367 6.17656 16.3218V19.9744L6.18585 20.0316L6.43744 20.1104C8.80899 20.8513 10.8693 21.0984 12.5652 21.0984C15.8775 21.0984 17.7974 20.1541 17.9157 20.0939L18.1508 19.975H18.176V16.3218C18.1769 13.8367 16.1551 11.8147 13.6701 11.8147ZM19.4935 8.18104H16.5298C16.4978 9.36681 15.9916 10.4346 15.191 11.2025C17.3999 11.8594 19.0161 13.9077 19.0161 16.3272V17.4528C21.9423 17.3455 23.6286 16.5162 23.7397 16.4605L23.9748 16.3413H24V12.6875C24 10.2028 21.9783 8.18104 19.4935 8.18104ZM6.00075 7.94143C6.68933 7.94143 7.32999 7.74045 7.87271 7.39811C8.04523 6.27284 8.64845 5.28954 9.51015 4.61982C9.51374 4.55393 9.52003 4.48864 9.52003 4.42215C9.52003 2.47801 7.94399 0.902266 6.00075 0.902266C4.05631 0.902266 2.48087 2.47801 2.48087 4.42215C2.48087 6.36539 4.05631 7.94143 6.00075 7.94143ZM9.16181 11.2025C8.36511 10.4385 7.86073 9.3764 7.82389 8.19781C7.71396 8.18972 7.60524 8.18104 7.49322 8.18104H4.50678C2.02171 8.18104 0 10.2028 0 12.6875V16.3407L0.00928491 16.397L0.260876 16.4764C2.16338 17.0703 3.86133 17.344 5.33613 17.4303V16.3272C5.33673 13.9077 6.9523 11.86 9.16181 11.2025Z" fill="#0066BE" fill-opacity="0.6"/>
                  </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M13.3806 5.37989C13.3806 5.86588 12.9866 6.25991 12.5006 6.25991C12.0146 6.25991 11.6204 5.86595 11.6204 5.37997C11.6204 4.89398 12.0146 4.49995 12.5006 4.49995C12.9865 4.49995 13.3806 4.89391 13.3806 5.37989Z" fill="#0066BE" fill-opacity="0.6"/>
                      <path d="M12.1271 6.31989H12.8738C13.4951 6.31989 14.0006 6.82542 14.0004 7.44671V8.36005H13.9941L13.9353 8.38978C13.9057 8.40483 13.4257 8.64093 12.5976 8.64093C12.1736 8.64093 11.6585 8.57915 11.0656 8.3939L11.0027 8.3742L11.0004 8.3599V7.44671C11.0004 6.82542 11.5058 6.31989 12.1271 6.31989Z" fill="#0066BE" fill-opacity="0.6"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00077 2.28563C3.00082 1.0233 4.06477 0 5.3772 0H19.6236C20.936 0 22 1.02335 22 2.28571V21.7143C22 22.9767 20.936 24 19.6236 24H5.37643C4.06393 24 2.99995 22.9766 3 21.7142L3.00077 2.28563ZM19.477 13.7821C19.3832 13.8759 19.256 13.9286 19.1233 13.9286H6.11544C5.98275 13.9286 5.8555 13.8759 5.76167 13.7821C5.66785 13.6884 5.61514 13.5612 5.61514 13.4286C5.61514 13.296 5.66785 13.1688 5.76167 13.075C5.8555 12.9813 5.98275 12.9286 6.11544 12.9286H19.1233C19.256 12.9286 19.3832 12.9813 19.477 13.075C19.5709 13.1688 19.6236 13.296 19.6236 13.4286C19.6236 13.5612 19.5709 13.6884 19.477 13.7821ZM5.76167 16.7821C5.8555 16.8759 5.98275 16.9286 6.11544 16.9286H19.1233C19.256 16.9286 19.3832 16.8759 19.477 16.7821C19.5709 16.6884 19.6236 16.5612 19.6236 16.4286C19.6236 16.296 19.5709 16.1688 19.477 16.075C19.3832 15.9813 19.256 15.9286 19.1233 15.9286H6.11544C5.98275 15.9286 5.8555 15.9813 5.76167 16.075C5.66785 16.1688 5.61514 16.296 5.61514 16.4286C5.61514 16.5612 5.66785 16.6884 5.76167 16.7821ZM12.5 10C14.433 10 16 8.433 16 6.5C16 4.567 14.433 3 12.5 3C10.567 3 9 4.567 9 6.5C9 8.433 10.567 10 12.5 10ZM10 19C9.44772 19 9 19.4477 9 20C9 20.5523 9.44771 21 10 21H15C15.5523 21 16 20.5523 16 20C16 19.4477 15.5523 19 15 19H10Z" fill="#0066BE" fill-opacity="0.6"/>
                    </svg>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M23.92 5.28516L12.8457 11.868C12.5899 12.0144 12.3004 12.0913 12.0057 12.0913C11.711 12.0913 11.4215 12.0144 11.1657 11.868L0.0799999 5.28516C0.0270091 5.51376 0.000170336 5.74764 0 5.9823V17.1594C0 17.9505 0.314264 18.7092 0.873659 19.2686C1.43305 19.828 2.19175 20.1423 2.98286 20.1423H21.0171C21.8082 20.1423 22.5669 19.828 23.1263 19.2686C23.6857 18.7092 24 17.9505 24 17.1594V5.9823C23.9998 5.74764 23.973 5.51376 23.92 5.28516Z" fill="#0066BE" fill-opacity="0.6"/>
                    <path d="M12.2745 10.92L23.4517 4.26857C23.1772 3.87765 22.8128 3.55839 22.3891 3.33763C21.9655 3.11687 21.4951 3.00108 21.0174 3H2.98311C2.50543 3.00108 2.03499 3.11687 1.61138 3.33763C1.18776 3.55839 0.823359 3.87765 0.548828 4.26857L11.7374 10.92C11.8198 10.965 11.9121 10.9886 12.006 10.9886C12.0998 10.9886 12.1922 10.965 12.2745 10.92Z" fill="#0066BE" fill-opacity="0.6"/>
                  </svg>
                    <p>Email</p>
                  </Link>
                </li>

                <li
                  className={
                    location.pathname == "/webinar/live-stream" || location.pathname == "/webinar/live-stream/polls-layout" ||  window.location.pathname == "/webinar/live-stream/survey/question-data" || window.location.pathname == "/webinar/live-stream/contact-dm" || location.pathname == "/webinar/live-stream/chat-link"
                    || window.location.pathname === "/webinar/live-stream/settings" || window.location.pathname === "/webinar/live-stream/speaker-zone"
                      ? "active sub-links"
                      : "side_li sub-links"
                  }
                  // className="active sub-links"
                >
                  <Link to={"/webinar/live-stream"}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_3798_1070)">
                      <path d="M13.0704 6.58856C12.4751 7.18255 11.5103 7.18255 10.9151 6.58856C10.32 5.99456 10.32 5.03143 10.9151 4.43744C11.5103 3.84345 12.4751 3.84345 13.0704 4.43744C13.6655 5.03143 13.6655 5.99456 13.0704 6.58856Z" fill="#0066BE" fill-opacity="0.6"/>
                      <path d="M15.1531 8.89346C14.9675 8.89346 14.7818 8.8226 14.6404 8.68069C14.3577 8.39761 14.3583 7.93894 14.6413 7.6564C15.215 7.08384 15.5309 6.32267 15.5309 5.51316C15.5309 4.70365 15.215 3.94249 14.6413 3.36992C14.3583 3.0872 14.3577 2.62871 14.6404 2.34544C14.923 2.06236 15.3816 2.06181 15.6647 2.34453C16.5127 3.19084 16.9796 4.31602 16.9796 5.51316C16.9796 6.71012 16.5127 7.83548 15.6647 8.68179C15.5234 8.82297 15.3382 8.89346 15.1531 8.89346Z" fill="#0066BE" fill-opacity="0.6"/>
                      <path d="M16.7908 11.0259C16.6051 11.0259 16.4195 10.955 16.2781 10.8133C15.9954 10.5301 15.996 10.0716 16.279 9.78884C17.4234 8.64663 18.0539 7.12814 18.0539 5.51297C18.0539 3.8978 17.4234 2.37931 16.279 1.2371C15.996 0.95439 15.9954 0.495895 16.2781 0.212631C16.5608 -0.0704493 17.0193 -0.0709986 17.3024 0.211716C18.7211 1.62767 19.5026 3.51035 19.5024 5.51297C19.5024 7.51559 18.7211 9.39846 17.3024 10.8144C17.1611 10.9554 16.9759 11.0259 16.7908 11.0259Z" fill="#0066BE" fill-opacity="0.6"/>
                      <path d="M8.82959 8.89329C8.64447 8.89329 8.45935 8.82279 8.31781 8.68162C7.46985 7.83531 7.00293 6.70994 7.00293 5.51299C7.00293 4.31584 7.46985 3.19066 8.31781 2.34435C8.60089 2.06164 9.05957 2.062 9.3421 2.34527C9.62481 2.62835 9.62426 3.08703 9.34118 3.36974C8.76751 3.94231 8.45166 4.70348 8.45166 5.51299C8.45166 6.32249 8.76751 7.08366 9.34118 7.65623C9.62426 7.93876 9.62481 8.39744 9.3421 8.68052C9.20074 8.82224 9.01507 8.89329 8.82959 8.89329Z" fill="#0066BE" fill-opacity="0.6"/>
                      <path d="M7.19128 11.026C7.00598 11.026 6.82086 10.9555 6.6795 10.8143C5.2608 9.39837 4.47949 7.51569 4.47949 5.51306C4.47949 3.51026 5.2608 1.62758 6.6795 0.211624C6.96258 -0.0709071 7.42126 -0.0705408 7.70379 0.212723C7.9865 0.495803 7.98595 0.954298 7.70287 1.23701C6.55847 2.37922 5.92804 3.89771 5.92804 5.51288C5.92804 7.12805 6.55847 8.64673 7.70287 9.78893C7.98595 10.0716 7.9865 10.5301 7.70379 10.8134C7.56243 10.9551 7.37676 11.026 7.19128 11.026Z" fill="#0066BE" fill-opacity="0.6"/>
                      <path d="M21.5381 12.2783H2.44445C1.5086 12.2783 0.75 13.0369 0.75 13.9726V22.3055C0.75 23.2414 1.5086 24 2.44445 24H21.5379C22.4738 24 23.2324 23.2414 23.2324 22.3055V13.9726C23.2324 13.0369 22.4738 12.2783 21.5381 12.2783ZM6.32207 21.826H3.65331C3.25341 21.826 2.92913 21.5017 2.92913 21.1016V15.1767C2.92913 14.7768 3.25341 14.4523 3.65331 14.4523C4.0534 14.4523 4.37768 14.7766 4.37768 15.1767V20.3772H6.32207C6.72215 20.3772 7.04643 20.7015 7.04643 21.1016C7.04643 21.5017 6.72215 21.826 6.32207 21.826ZM9.29057 21.1016C9.29057 21.5017 8.96629 21.826 8.56621 21.826C8.16612 21.826 7.84184 21.5017 7.84184 21.1016V15.1767C7.84184 14.7768 8.16612 14.4523 8.56621 14.4523C8.96629 14.4523 9.29057 14.7766 9.29057 15.1767V21.1016ZM15.385 15.3862L13.5963 21.3109C13.5961 21.3114 13.5959 21.312 13.5957 21.3125C13.4015 21.9756 12.411 21.9593 12.21 21.3125C12.2098 21.312 12.2096 21.3114 12.2094 21.3109L10.4207 15.3862C10.3052 15.0031 10.5218 14.599 10.9048 14.4833C11.2875 14.3677 11.692 14.5843 11.8075 14.9674L12.9029 18.5953L13.9982 14.9674C14.1139 14.5843 14.518 14.3675 14.9011 14.4833C15.284 14.599 15.5008 15.0031 15.385 15.3862ZM19.8413 17.0418C20.2414 17.0418 20.5656 17.3661 20.5656 17.7662C20.5656 18.1661 20.2414 18.4905 19.8413 18.4905H17.7857V20.3772H20.2315C20.6315 20.3772 20.9558 20.7015 20.9558 21.1016C20.9558 21.5017 20.6315 21.826 20.2315 21.826H17.0614C16.6613 21.826 16.337 21.5017 16.337 21.1016V15.1767C16.337 14.7768 16.6613 14.4523 17.0614 14.4523H20.3291C20.729 14.4523 21.0534 14.7766 21.0534 15.1767C21.0534 15.5768 20.729 15.9011 20.3291 15.9011H17.7855V17.0418H19.8413Z" fill="#0066BE" fill-opacity="0.6"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_3798_1070">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                    <p>Live Stream</p>
                  </Link>
                  <div className="left-sidebar-secondary">
                    <div className="sidebar-menu-secondary">
                    <div className="sidebar_txt">
                      <button className="toggle_btn" onClick={() => {
                        eventList();
                      }}>
                        <img src={path_image + "arrow-left.svg"} alt="toggle-sidebar" />
                      </button>
                      {/* <span>Event Name sollicitudin faucibus molestie gulvinar ultricies</span> */}
                                <span title={eventIdContext?.eventTitle ? eventIdContext?.eventTitle : localStorageEvent?.eventTitle}>{eventIdContext?.eventTitle ? eventIdContext?.eventTitle : localStorageEvent?.eventTitle}</span>
                    </div>
                      <ul>
                        <li className={isActive ? 'active' : 'side_li'}
                        // className="side_li"
                        >
                          <Link to="/webinar/live-stream">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_3798_1070)">
                      <path d="M13.0704 6.58856C12.4751 7.18255 11.5103 7.18255 10.9151 6.58856C10.32 5.99456 10.32 5.03143 10.9151 4.43744C11.5103 3.84345 12.4751 3.84345 13.0704 4.43744C13.6655 5.03143 13.6655 5.99456 13.0704 6.58856Z" fill="#0066BE" fill-opacity="0.6"/>
                      <path d="M15.1531 8.89346C14.9675 8.89346 14.7818 8.8226 14.6404 8.68069C14.3577 8.39761 14.3583 7.93894 14.6413 7.6564C15.215 7.08384 15.5309 6.32267 15.5309 5.51316C15.5309 4.70365 15.215 3.94249 14.6413 3.36992C14.3583 3.0872 14.3577 2.62871 14.6404 2.34544C14.923 2.06236 15.3816 2.06181 15.6647 2.34453C16.5127 3.19084 16.9796 4.31602 16.9796 5.51316C16.9796 6.71012 16.5127 7.83548 15.6647 8.68179C15.5234 8.82297 15.3382 8.89346 15.1531 8.89346Z" fill="#0066BE" fill-opacity="0.6"/>
                      <path d="M16.7908 11.0259C16.6051 11.0259 16.4195 10.955 16.2781 10.8133C15.9954 10.5301 15.996 10.0716 16.279 9.78884C17.4234 8.64663 18.0539 7.12814 18.0539 5.51297C18.0539 3.8978 17.4234 2.37931 16.279 1.2371C15.996 0.95439 15.9954 0.495895 16.2781 0.212631C16.5608 -0.0704493 17.0193 -0.0709986 17.3024 0.211716C18.7211 1.62767 19.5026 3.51035 19.5024 5.51297C19.5024 7.51559 18.7211 9.39846 17.3024 10.8144C17.1611 10.9554 16.9759 11.0259 16.7908 11.0259Z" fill="#0066BE" fill-opacity="0.6"/>
                      <path d="M8.82959 8.89329C8.64447 8.89329 8.45935 8.82279 8.31781 8.68162C7.46985 7.83531 7.00293 6.70994 7.00293 5.51299C7.00293 4.31584 7.46985 3.19066 8.31781 2.34435C8.60089 2.06164 9.05957 2.062 9.3421 2.34527C9.62481 2.62835 9.62426 3.08703 9.34118 3.36974C8.76751 3.94231 8.45166 4.70348 8.45166 5.51299C8.45166 6.32249 8.76751 7.08366 9.34118 7.65623C9.62426 7.93876 9.62481 8.39744 9.3421 8.68052C9.20074 8.82224 9.01507 8.89329 8.82959 8.89329Z" fill="#0066BE" fill-opacity="0.6"/>
                      <path d="M7.19128 11.026C7.00598 11.026 6.82086 10.9555 6.6795 10.8143C5.2608 9.39837 4.47949 7.51569 4.47949 5.51306C4.47949 3.51026 5.2608 1.62758 6.6795 0.211624C6.96258 -0.0709071 7.42126 -0.0705408 7.70379 0.212723C7.9865 0.495803 7.98595 0.954298 7.70287 1.23701C6.55847 2.37922 5.92804 3.89771 5.92804 5.51288C5.92804 7.12805 6.55847 8.64673 7.70287 9.78893C7.98595 10.0716 7.9865 10.5301 7.70379 10.8134C7.56243 10.9551 7.37676 11.026 7.19128 11.026Z" fill="#0066BE" fill-opacity="0.6"/>
                      <path d="M21.5381 12.2783H2.44445C1.5086 12.2783 0.75 13.0369 0.75 13.9726V22.3055C0.75 23.2414 1.5086 24 2.44445 24H21.5379C22.4738 24 23.2324 23.2414 23.2324 22.3055V13.9726C23.2324 13.0369 22.4738 12.2783 21.5381 12.2783ZM6.32207 21.826H3.65331C3.25341 21.826 2.92913 21.5017 2.92913 21.1016V15.1767C2.92913 14.7768 3.25341 14.4523 3.65331 14.4523C4.0534 14.4523 4.37768 14.7766 4.37768 15.1767V20.3772H6.32207C6.72215 20.3772 7.04643 20.7015 7.04643 21.1016C7.04643 21.5017 6.72215 21.826 6.32207 21.826ZM9.29057 21.1016C9.29057 21.5017 8.96629 21.826 8.56621 21.826C8.16612 21.826 7.84184 21.5017 7.84184 21.1016V15.1767C7.84184 14.7768 8.16612 14.4523 8.56621 14.4523C8.96629 14.4523 9.29057 14.7766 9.29057 15.1767V21.1016ZM15.385 15.3862L13.5963 21.3109C13.5961 21.3114 13.5959 21.312 13.5957 21.3125C13.4015 21.9756 12.411 21.9593 12.21 21.3125C12.2098 21.312 12.2096 21.3114 12.2094 21.3109L10.4207 15.3862C10.3052 15.0031 10.5218 14.599 10.9048 14.4833C11.2875 14.3677 11.692 14.5843 11.8075 14.9674L12.9029 18.5953L13.9982 14.9674C14.1139 14.5843 14.518 14.3675 14.9011 14.4833C15.284 14.599 15.5008 15.0031 15.385 15.3862ZM19.8413 17.0418C20.2414 17.0418 20.5656 17.3661 20.5656 17.7662C20.5656 18.1661 20.2414 18.4905 19.8413 18.4905H17.7857V20.3772H20.2315C20.6315 20.3772 20.9558 20.7015 20.9558 21.1016C20.9558 21.5017 20.6315 21.826 20.2315 21.826H17.0614C16.6613 21.826 16.337 21.5017 16.337 21.1016V15.1767C16.337 14.7768 16.6613 14.4523 17.0614 14.4523H20.3291C20.729 14.4523 21.0534 14.7766 21.0534 15.1767C21.0534 15.5768 20.729 15.9011 20.3291 15.9011H17.7855V17.0418H19.8413Z" fill="#0066BE" fill-opacity="0.6"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_3798_1070">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                            <p>Live Stream</p>
                          </Link>
                        </li>
                        <li className={isActiveSpeaker ? 'active' : 'side_li'}
                        // className="side_li"
                        >
                          <Link to="/webinar/live-stream/speaker-zone">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <g clip-path="url(#clip0_3765_722)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7219 5.36932C23.0133 7.3423 23.6998 9.65809 23.695 12.0253L23.6973 24H11.6777C9.34088 23.9661 7.06621 23.2328 5.13982 21.8926C3.21344 20.5524 1.72141 18.6649 0.851458 16.4679C-0.0184992 14.2708 -0.22752 11.8621 0.250693 9.54499C0.728906 7.22785 1.87299 5.10574 3.539 3.44564C5.20501 1.78553 7.31853 0.661605 9.61363 0.215259C11.9087 -0.231086 14.2829 0.0200908 16.4374 0.937188C18.5919 1.85429 20.4305 3.39633 21.7219 5.36932ZM6.55671 3.89894C8.1393 2.82781 9.99993 2.2561 11.9033 2.2561C14.4556 2.2561 16.9035 3.28312 18.7082 5.11123C20.513 6.93933 21.5269 9.41877 21.5269 12.0041C21.5269 13.9321 20.9625 15.8167 19.905 17.4198C18.8476 19.0228 17.3446 20.2723 15.5861 21.0101C13.8276 21.7479 11.8926 21.9409 10.0258 21.5648C8.15903 21.1887 6.44427 20.2603 5.09838 18.897C3.75249 17.5337 2.83593 15.7968 2.4646 13.9058C2.09327 12.0149 2.28385 10.0549 3.01224 8.2737C3.74063 6.49249 4.97411 4.97006 6.55671 3.89894ZM17.6328 17.4189C16.2937 18.8781 14.4602 19.7718 12.4988 19.9213C12.3399 19.932 12.1806 19.9072 12.0323 19.8486C11.8839 19.7899 11.7501 19.6989 11.6404 19.5819C11.1222 19.0334 10.7939 18.3292 10.705 17.5753C10.6161 16.8214 10.7713 16.0587 11.1473 15.4019L12.2895 16.1889L11.552 12.5531L8.21623 13.4391L9.32351 14.146C8.729 15.1445 8.45585 16.3056 8.5419 17.4683C8.59063 18.1308 8.75691 18.779 9.03273 19.3817C8.05419 18.9893 7.16368 18.4014 6.41433 17.6529C5.66498 16.9044 5.07213 16.0107 4.67115 15.0251C4.27017 14.0395 4.06928 12.9822 4.08045 11.9162C4.09163 10.8503 4.31464 9.7975 4.73619 8.82074C4.82188 8.62645 4.95025 8.45455 5.11151 8.31816C5.27277 8.18177 5.46266 8.08449 5.66668 8.03374C6.39415 7.85313 7.15983 7.91624 7.8489 8.21362C8.53797 8.51099 9.11332 9.0266 9.48868 9.68315L8.24414 10.2911L11.7102 11.4692L12.6175 8.09736L11.4543 8.71235C11.0075 7.89252 10.3642 7.19974 9.58369 6.6978C8.80319 6.19585 7.91055 5.90088 6.98798 5.84003C7.82448 5.15808 8.7906 4.65781 9.8262 4.37034C10.8618 4.08287 11.9447 4.01437 13.0076 4.16908C14.0704 4.3238 15.0905 4.69843 16.0043 5.26965C16.918 5.84088 17.706 6.59648 18.319 7.48944C18.4273 7.64535 18.4993 7.82411 18.5295 8.01226C18.5597 8.20041 18.5474 8.39305 18.4935 8.57569C18.2799 9.30248 17.8412 9.94042 17.2422 10.3953C16.6432 10.8501 15.9156 11.0978 15.167 11.1016L15.2694 9.70435L12.5314 12.1525L14.96 14.6337L15.0158 13.3048C15.924 13.324 16.8228 13.1158 17.6324 12.6986C18.442 12.2814 19.1373 11.6681 19.6566 10.9131C19.7076 11.2816 19.7325 11.6533 19.7311 12.0253C19.7356 14.0309 18.9872 15.9632 17.6375 17.4306L17.6328 17.4189Z" fill="#0066BE" fill-opacity="0.6"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_3765_722">
                                  <rect width="24" height="24" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                            <p>Speaker Zone</p>
                          </Link>
                        </li>
                       
                        <li className={isActivePolls ? 'active' : 'side_li'}
                        // className="side_li"
                        >
                          <Link to="/webinar/live-stream/polls-layout">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <g clip-path="url(#clip0_3761_88)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.499864 0L1 3.9837e-06H1.50015C1.7763 3.9837e-06 2 0.223861 2 0.500003V0.999988H16.3937C16.7272 0.999988 17 1.24225 17 1.53835V4.46163C17 4.76311 16.7272 4.99999 16.3937 4.99999H2V9.99999H14.3207C14.7011 9.99999 15 10.2369 15 10.5383V13.4616C15 13.7577 14.7011 14 14.3207 14H2V19H11.273C11.6728 19 12 19.2419 12 19.5376V22.4624C12 22.7581 11.6728 23 11.273 23H2V23.5C2 23.7761 1.7763 24 1.50015 24H1H0.499847C0.223704 24 0 23.7761 0 23.5V0.500006C0 0.223857 0.223715 -4.27361e-06 0.499864 0Z" fill="#0066BE" fill-opacity="0.6"/>
                                <path d="M21.3807 2.79292C22.152 2.79292 22.7772 2.16763 22.7772 1.3964C22.7772 0.625179 22.1519 0 21.3807 0C20.6095 0 19.9839 0.625297 19.9839 1.39652C19.9839 2.16775 20.6095 2.79292 21.3807 2.79292ZM21.9731 2.88811H20.7881C19.8021 2.88811 19 3.69035 19 4.6763L19.01 5.55402L19.0137 5.57672L19.1135 5.60797C20.0544 5.90196 20.8719 6 21.5447 6C22.8589 6 23.6206 5.62532 23.6675 5.60144L23.7608 5.55426H23.7708L23.7608 4.6763C23.7611 3.69035 22.959 2.88811 21.9731 2.88811Z" fill="#0066BE" fill-opacity="0.6"/>
                                <path d="M21.3807 11.7929C22.152 11.7929 22.7772 11.1676 22.7772 10.3964C22.7772 9.62518 22.1519 9 21.3807 9C20.6095 9 19.9839 9.6253 19.9839 10.3965C19.9839 11.1677 20.6095 11.7929 21.3807 11.7929ZM21.9731 11.8881H20.7881C19.8021 11.8881 19 12.6903 19 13.6763L19.01 14.554L19.0137 14.5767L19.1135 14.608C20.0544 14.902 20.8719 15 21.5447 15C22.8589 15 23.6206 14.6253 23.6675 14.6014L23.7608 14.5543H23.7708L23.7608 13.6763C23.7611 12.6903 22.959 11.8881 21.9731 11.8881Z" fill="#0066BE" fill-opacity="0.6"/>
                                <path d="M21.3807 19.7929C22.152 19.7929 22.7772 19.1676 22.7772 18.3964C22.7772 17.6252 22.1519 17 21.3807 17C20.6095 17 19.9839 17.6253 19.9839 18.3965C19.9839 19.1677 20.6095 19.7929 21.3807 19.7929ZM21.9731 19.8881H20.7881C19.8021 19.8881 19 20.6903 19 21.6763L19.01 22.554L19.0137 22.5767L19.1135 22.608C20.0544 22.902 20.8719 23 21.5447 23C22.8589 23 23.6206 22.6253 23.6675 22.6014L23.7608 22.5543H23.7708L23.7608 21.6763C23.7611 20.6903 22.959 19.8881 21.9731 19.8881Z" fill="#0066BE" fill-opacity="0.6"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_3761_88">
                                  <rect width="24" height="24" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                            <p>Polls</p>
                          </Link>
                        </li>
                        <li className={isActiveChatPage ? 'active' : 'side_li'}
                        // className="side_li"
                        >
                          <Link to="/webinar/live-stream/chat-link">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                              width="432.000000pt" height="448.000000pt" viewBox="0 0 432.000000 448.000000"
                              preserveAspectRatio="xMidYMid meet">

                              <g transform="translate(0.000000,448.000000) scale(0.100000,-0.100000)"
                              fill="#0066be" stroke="none" fill-opacity="0.6">
                              <path d="M1975 4474 c-525 -55 -976 -266 -1340 -628 -579 -575 -779 -1426
                              -519 -2206 90 -269 223 -504 424 -742 l31 -37 -66 -406 c-36 -223 -63 -414
                              -60 -425 15 -48 41 -38 412 159 l360 191 89 -39 c269 -117 537 -171 851 -171
                              268 0 478 34 713 115 674 233 1209 817 1380 1504 138 555 55 1147 -229 1624
                              -333 558 -869 927 -1506 1038 -116 20 -437 34 -540 23z m708 -1140 c457 -115
                              654 -648 384 -1044 -45 -65 -224 -248 -276 -281 -53 -34 -102 -37 -149 -9 -62
                              38 -91 125 -61 183 7 12 66 78 134 147 160 165 180 203 180 350 0 93 -3 112
                              -27 162 -69 147 -238 243 -391 223 -113 -16 -152 -39 -292 -175 -138 -135
                              -174 -160 -227 -160 -97 0 -169 121 -124 208 27 52 277 287 347 325 158 88
                              333 113 502 71z m-105 -544 c62 -38 87 -109 61 -177 -5 -15 -171 -189 -367
                              -387 -381 -382 -408 -404 -481 -391 -81 15 -132 89 -117 172 7 33 50 81 369
                              402 199 200 376 372 392 382 39 25 101 24 143 -1z m-895 -147 c57 -28 83 -111
                              56 -180 -5 -15 -66 -84 -134 -153 -79 -80 -133 -145 -151 -180 -27 -51 -29
                              -64 -29 -165 0 -100 3 -115 27 -165 82 -167 279 -256 454 -205 86 25 115 45
                              261 187 134 131 142 135 212 129 89 -8 145 -106 111 -195 -12 -32 -142 -169
                              -240 -253 -224 -192 -525 -225 -780 -86 -97 54 -216 178 -268 280 -103 208
                              -96 454 20 651 48 83 314 349 353 354 37 5 72 -1 108 -19z"/>
                              </g>
                              </svg>
                            <p>Chat Link</p>
                          </Link>
                        </li>
                        <li className={isActiveSurveyPage ? 'active' : 'side_li'}
                        // className="side_li"
                        >
                          <Link to="/webinar/live-stream/survey/question-data">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5.625 9.61963H8.9375V12.9321H5.625V9.61963Z" fill="#0066BE" />
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1875 2.875H2.8125C1.26169 2.875 0 4.13669 0 5.6875V26.3125C0 27.8633 1.26169 29.125 2.8125 29.125H10.9752H21.0196H29.1875C30.7383 29.125 32 27.8633 32 26.3125V5.6875C32 4.13669 30.7383 2.875 29.1875 2.875ZM6.93106 23.1754L10.5079 19.5985C10.8741 19.2324 10.8741 18.6388 10.5081 18.2727C10.1419 17.9066 9.54831 17.9066 9.18225 18.2727L6.26825 21.1867L5.3505 20.269C4.98438 19.9029 4.39075 19.9029 4.02469 20.269C3.65856 20.6352 3.65862 21.2288 4.02469 21.5948L5.60531 23.1754C5.78831 23.3584 6.02831 23.45 6.26819 23.45C6.50806 23.45 6.748 23.3584 6.93106 23.1754ZM9.875 14.8072C10.3927 14.8072 10.8125 14.3874 10.8125 13.8697V8.68219C10.8125 8.16444 10.3927 7.74469 9.875 7.74469H4.6875C4.16975 7.74469 3.75 8.16444 3.75 8.68219V13.8697C3.75 14.3874 4.16975 14.8072 4.6875 14.8072H9.875ZM20.0186 8.35906H13.625C13.1073 8.35906 12.6875 8.77881 12.6875 9.29657C12.6875 9.81432 13.1073 10.2341 13.625 10.2341H20.0186C20.5364 10.2341 20.9561 9.81432 20.9561 9.29657C20.9561 8.77881 20.5364 8.35906 20.0186 8.35906ZM13.625 23.641H27.3125C27.8302 23.641 28.25 23.2213 28.25 22.7035C28.25 22.1858 27.8302 21.766 27.3125 21.766H13.625C13.1073 21.766 12.6875 22.1858 12.6875 22.7035C12.6875 23.2213 13.1073 23.641 13.625 23.641ZM13.625 17.8072C13.1073 17.8072 12.6875 18.2269 12.6875 18.7447C12.6875 19.2624 13.1073 19.6822 13.625 19.6822H20.0186C20.5364 19.6822 20.9561 19.2624 20.9561 18.7447C20.9561 18.2269 20.5364 17.8072 20.0186 17.8072H13.625ZM13.625 14.1928H27.3125C27.8302 14.1928 28.25 13.7731 28.25 13.2553C28.25 12.7376 27.8302 12.3178 27.3125 12.3178H13.625C13.1073 12.3178 12.6875 12.7376 12.6875 13.2553C12.6875 13.7731 13.1073 14.1928 13.625 14.1928Z" fill="#0066BE" />
                                    </svg>
                            <p>Survey</p>
                          </Link>
                        </li>
                        {/* <li className={isActiveContact ? 'active' : 'side_li'}
                        > 
                          <Link to="/webinar/live-stream/contact-dm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <g clip-path="url(#clip0_3761_84)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 11C8.53757 11 11 8.53757 11 5.5C11 2.46243 8.53757 0 5.5 0C2.46243 0 0 2.46243 0 5.5C0 8.53757 2.46243 11 5.5 11ZM6.80506 3.72185C6.80506 4.39667 6.25803 4.9438 5.5831 4.9438C4.90828 4.9438 4.36094 4.39677 4.36094 3.72195C4.36094 3.04713 4.90828 2.5 5.5831 2.5C6.25792 2.5 6.80506 3.04703 6.80506 3.72185ZM5.06456 5.02709H6.10143C6.96414 5.02709 7.666 5.72905 7.66568 6.59175V7.85998H7.65695L7.57533 7.90126C7.53426 7.92216 6.86775 8.25 5.71786 8.25C5.12913 8.25 4.41387 8.16422 3.59057 7.90698L3.50322 7.87963L3.5 7.85977V6.59175C3.5 5.72905 4.20185 5.02709 5.06456 5.02709Z" fill="#0066BE" fill-opacity="0.6"/>
                                <path d="M13 2.5C13 2.22386 13.2239 2 13.5 2H18.5C18.7761 2 19 2.22386 19 2.5C19 2.77614 18.7761 3 18.5 3H13.5C13.2239 3 13 2.77614 13 2.5Z" fill="#0066BE" fill-opacity="0.6"/>
                                <path d="M13.5 5C13.2239 5 13 5.22386 13 5.5C13 5.77614 13.2239 6 13.5 6H23.5C23.7761 6 24 5.77614 24 5.5C24 5.22386 23.7761 5 23.5 5H13.5Z" fill="#0066BE" fill-opacity="0.6"/>
                                <path d="M13 8.5C13 8.22386 13.2239 8 13.5 8H23.5C23.7761 8 24 8.22386 24 8.5C24 8.77614 23.7761 9 23.5 9H13.5C13.2239 9 13 8.77614 13 8.5Z" fill="#0066BE" fill-opacity="0.6"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 24C8.53757 24 11 21.5376 11 18.5C11 15.4624 8.53757 13 5.5 13C2.46243 13 0 15.4624 0 18.5C0 21.5376 2.46243 24 5.5 24ZM6.80506 16.7218C6.80506 17.3967 6.25803 17.9438 5.5831 17.9438C4.90828 17.9438 4.36094 17.3968 4.36094 16.722C4.36094 16.0471 4.90828 15.5 5.5831 15.5C6.25792 15.5 6.80506 16.047 6.80506 16.7218ZM5.06456 18.0271H6.10143C6.96414 18.0271 7.666 18.729 7.66568 19.5918V20.86H7.65695L7.57533 20.9013C7.53426 20.9222 6.86775 21.25 5.71786 21.25C5.12913 21.25 4.41387 21.1642 3.59057 20.907L3.50322 20.8796L3.5 20.8598V19.5918C3.5 18.729 4.20185 18.0271 5.06456 18.0271Z" fill="#0066BE" fill-opacity="0.6"/>
                                <path d="M13 15.5C13 15.2239 13.2239 15 13.5 15H18.5C18.7761 15 19 15.2239 19 15.5C19 15.7761 18.7761 16 18.5 16H13.5C13.2239 16 13 15.7761 13 15.5Z" fill="#0066BE" fill-opacity="0.6"/>
                                <path d="M13.5 18C13.2239 18 13 18.2239 13 18.5C13 18.7761 13.2239 19 13.5 19H23.5C23.7761 19 24 18.7761 24 18.5C24 18.2239 23.7761 18 23.5 18H13.5Z" fill="#0066BE" fill-opacity="0.6"/>
                                <path d="M13 21.5C13 21.2239 13.2239 21 13.5 21H23.5C23.7761 21 24 21.2239 24 21.5C24 21.7761 23.7761 22 23.5 22H13.5C13.2239 22 13 21.7761 13 21.5Z" fill="#0066BE" fill-opacity="0.6"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_3761_84">
                                  <rect width="24" height="24" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                            <p>Contact DM</p>
                          </Link>
                        </li> */}
                        <li className={isActiveSettings ? 'active' : 'side_li'}
                        // className="side_li"
                        >
                          <Link to="/webinar/live-stream/settings">
                          <svg xmlns="
                            http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clip-path="url(#clip0_3798_1080)">
                            <path d="M14.5692 14.5875C13.4602 14.4131 12.6806 13.387 12.8044 12.2995C12.8211 12.1521 12.8546 12.0071 12.9042 11.8673C13.0322 11.4979 12.9005 11.0704 12.5836 10.8042C11.9133 10.2257 11.1534 9.75991 10.3336 9.42513C10.1545 9.34941 9.95524 9.33563 9.76741 9.38599C9.57959 9.43634 9.41394 9.54794 9.29673 9.7031C9.14122 9.90876 8.94606 10.0812 8.72279 10.2101C8.49952 10.3391 8.25266 10.422 7.99681 10.4539C7.74096 10.4859 7.4813 10.4662 7.23318 10.3961C6.98505 10.326 6.7535 10.2069 6.5522 10.0458C6.4279 9.94593 6.31671 9.8308 6.22126 9.7031C6.10413 9.54825 5.93872 9.43685 5.7512 9.38651C5.56368 9.33617 5.36473 9.34976 5.18579 9.42513C4.42904 9.73318 3.72288 10.1532 3.09095 10.6711C2.75813 10.9415 2.61891 11.3845 2.75438 11.7661C3.1322 12.7687 2.6222 13.9439 1.58532 14.3723C1.40053 14.449 1.20577 14.4991 1.00688 14.5209C0.804171 14.545 0.613778 14.6309 0.461567 14.7669C0.309356 14.9029 0.202705 15.0825 0.156102 15.2812C-0.0337031 16.1239 -0.0506064 16.9963 0.106415 17.8458C0.146858 18.0507 0.251457 18.2375 0.405078 18.3791C0.5587 18.5206 0.753377 18.6097 0.960946 18.6333C2.07048 18.75 2.89548 19.7306 2.8247 20.8219C2.81041 21.0415 2.75873 21.2571 2.67188 21.4594C2.50782 21.8381 2.63485 22.2979 2.97376 22.5778C3.63992 23.147 4.39288 23.6059 5.20407 23.9372C5.30478 23.976 5.41122 23.9978 5.51907 24.0019C5.66516 24.0046 5.80959 23.9704 5.93891 23.9024C6.06823 23.8343 6.17826 23.7347 6.25876 23.6128C6.43138 23.3534 6.6644 23.1398 6.93779 22.9904C7.21117 22.8409 7.51676 22.76 7.82829 22.7547C8.13981 22.7494 8.44797 22.8198 8.72629 22.9599C9.0046 23.1 9.24475 23.3055 9.4261 23.5589C9.54312 23.725 9.7146 23.8448 9.91077 23.8976C10.1069 23.9505 10.3154 23.9329 10.5 23.8481C11.2422 23.5196 11.9326 23.0847 12.5494 22.5572C12.8724 22.2844 13.0027 21.8479 12.8658 21.4739C12.4758 20.4769 12.9727 19.297 14.0049 18.8583C14.1795 18.7838 14.3633 18.7332 14.5514 18.7078C14.7512 18.6787 14.9373 18.5891 15.0846 18.4509C15.2318 18.3128 15.3332 18.1328 15.375 17.9353C15.4639 17.5208 15.5121 17.0987 15.5189 16.6748C15.5184 16.228 15.4713 15.7825 15.3783 15.3454C15.3359 15.1521 15.2359 14.9761 15.0915 14.8408C14.947 14.7055 14.7649 14.6171 14.5692 14.5875ZM10.3453 16.6748C10.3454 17.1864 10.1938 17.6865 9.90963 18.112C9.62548 18.5374 9.22154 18.869 8.74892 19.0648C8.27629 19.2607 7.75621 19.312 7.25443 19.2122C6.75266 19.1125 6.29173 18.8662 5.92995 18.5044C5.56816 18.1427 5.32177 17.6818 5.22193 17.1801C5.12209 16.6783 5.17328 16.1582 5.36904 15.6856C5.5648 15.2129 5.89632 14.8089 6.32169 14.5247C6.74706 14.2404 7.24717 14.0887 7.75876 14.0887C8.44358 14.0923 9.09933 14.3659 9.58362 14.8501C10.0679 15.3343 10.3416 15.99 10.3453 16.6748Z" fill="#0066BE" fill-opacity="0.6"/>
                            <path d="M23.2359 4.21556C22.342 4.07493 21.7134 3.24806 21.8137 2.37149C21.8267 2.25267 21.8536 2.13578 21.8938 2.02321C21.997 1.72556 21.891 1.38196 21.6356 1.16634C21.095 0.699697 20.4819 0.324305 19.8206 0.054932C19.676 -0.00599894 19.5151 -0.0168111 19.3637 0.0242164C19.2122 0.0652438 19.0788 0.155753 18.9848 0.281338C18.8594 0.447005 18.702 0.585873 18.5221 0.689747C18.3421 0.79362 18.1432 0.860394 17.937 0.886129C17.7308 0.911863 17.5216 0.896037 17.3216 0.839583C17.1217 0.783128 16.935 0.687191 16.7727 0.557432C16.6732 0.476726 16.5841 0.383987 16.5074 0.281338C16.4131 0.156469 16.2798 0.0666288 16.1287 0.0260444C15.9776 -0.0145399 15.8172 -0.0035494 15.6731 0.0572757C15.0634 0.305393 14.4945 0.643873 13.9856 1.06134C13.7174 1.27931 13.6049 1.63649 13.7141 1.94399C14.0188 2.75165 13.6077 3.69899 12.772 4.04446C12.6229 4.10617 12.4659 4.14657 12.3056 4.16446C12.1427 4.18361 11.9896 4.25232 11.867 4.36131C11.7444 4.4703 11.6583 4.6143 11.6202 4.77384C11.467 5.45306 11.4533 6.15634 11.5799 6.84103C11.6131 7.00603 11.6976 7.1563 11.8213 7.27032C11.9451 7.38434 12.1018 7.45624 12.269 7.47571C13.1629 7.56946 13.8281 8.36071 13.769 9.24056C13.758 9.41811 13.7168 9.59249 13.6471 9.75618C13.5149 10.0618 13.6176 10.4321 13.8909 10.6576C14.4277 11.116 15.0344 11.4855 15.6881 11.7521C15.7693 11.7832 15.8552 11.8008 15.9421 11.8042C16.0599 11.8063 16.1762 11.7786 16.2805 11.7238C16.3847 11.669 16.4734 11.5888 16.5384 11.4906C16.6775 11.2815 16.8653 11.1093 17.0856 10.9888C17.3059 10.8683 17.5522 10.8031 17.8033 10.7988C18.0544 10.7945 18.3028 10.8512 18.5271 10.9641C18.7515 11.0771 18.945 11.2427 19.0912 11.447C19.1855 11.5801 19.3232 11.6763 19.4806 11.719C19.638 11.7618 19.8055 11.7485 19.9541 11.6813C20.5527 11.4165 21.1094 11.066 21.607 10.6407C21.8671 10.4209 21.9721 10.0688 21.8615 9.76743C21.5474 8.96446 21.9477 8.01337 22.7798 7.65806C22.9206 7.59815 23.0688 7.55732 23.2204 7.53665C23.3814 7.51313 23.5314 7.44087 23.6501 7.32958C23.7689 7.2183 23.8507 7.07332 23.8846 6.91415C23.9563 6.57999 23.9951 6.23962 24.0004 5.8979C24 5.53841 23.9623 5.17993 23.8879 4.82821C23.8534 4.67271 23.7726 4.53129 23.6563 4.42254C23.5399 4.31378 23.3933 4.24277 23.2359 4.21884V4.21556ZM19.8313 5.8979C19.8313 6.31018 19.7091 6.71321 19.48 7.056C19.251 7.3988 18.9254 7.66598 18.5445 7.82376C18.1636 7.98153 17.7445 8.02281 17.3401 7.94238C16.9358 7.86195 16.5643 7.66341 16.2728 7.37189C15.9813 7.08036 15.7828 6.70893 15.7023 6.30457C15.6219 5.90021 15.6632 5.48108 15.8209 5.10019C15.9787 4.71929 16.2459 4.39373 16.5887 4.16468C16.9315 3.93562 17.3345 3.81337 17.7468 3.81337C18.2988 3.8162 18.8273 4.03673 19.2177 4.42704C19.608 4.81736 19.8285 5.34592 19.8313 5.8979Z" fill="#0066BE" fill-opacity="0.6"/>
                            <path d="M23.8151 17.4798C23.599 17.2946 23.462 17.0336 23.4324 16.7505C23.4028 16.4675 23.4827 16.1838 23.6557 15.9578C23.7043 15.8961 23.7598 15.8401 23.8212 15.7909C23.9004 15.7222 23.9571 15.6312 23.984 15.5298C24.0109 15.4285 24.0068 15.3213 23.9721 15.2223C23.8308 14.7749 23.6175 14.3534 23.3407 13.9745C23.281 13.8908 23.195 13.8293 23.0965 13.7998C22.9979 13.7704 22.8924 13.7746 22.7965 13.8119C22.6692 13.8614 22.5332 13.8849 22.3967 13.8809C22.2601 13.877 22.1258 13.8457 22.0015 13.7889C21.8773 13.732 21.7658 13.6509 21.6735 13.5501C21.5812 13.4494 21.5101 13.3312 21.4643 13.2025C21.4361 13.123 21.4179 13.0404 21.4104 12.9564C21.4007 12.854 21.3571 12.7577 21.2865 12.6829C21.216 12.608 21.1225 12.5588 21.0209 12.543C20.594 12.4714 20.1589 12.4643 19.7299 12.5219C19.6221 12.534 19.5205 12.5788 19.439 12.6504C19.3574 12.722 19.2998 12.8168 19.2738 12.9222C19.1655 13.4791 18.6087 13.8672 18.0218 13.7716C17.9171 13.7551 17.8155 13.7235 17.7199 13.6778C17.6219 13.6323 17.5122 13.6181 17.4058 13.637C17.2994 13.656 17.2014 13.7072 17.1251 13.7837C16.8052 14.1109 16.555 14.4995 16.3896 14.9261C16.3509 15.0297 16.3461 15.143 16.376 15.2495C16.4059 15.356 16.469 15.4503 16.556 15.5186C16.7799 15.6922 16.9288 15.945 16.9717 16.2251C17.0147 16.5051 16.9487 16.791 16.7871 17.0237C16.7199 17.1189 16.6368 17.2019 16.5415 17.2689C16.4527 17.3354 16.3877 17.4288 16.3562 17.5352C16.3247 17.6416 16.3283 17.7554 16.3666 17.8595C16.509 18.3012 16.721 18.7172 16.9948 19.0919C17.0293 19.1373 17.0711 19.1767 17.1185 19.2086C17.1836 19.2504 17.2582 19.2752 17.3354 19.2805C17.4126 19.2858 17.4899 19.2716 17.5601 19.2391C17.71 19.1702 17.8745 19.1387 18.0393 19.1474C18.2041 19.156 18.3644 19.2045 18.5063 19.2888C18.6482 19.373 18.7676 19.4904 18.8542 19.6309C18.9408 19.7714 18.9919 19.9308 19.0034 20.0955C19.0098 20.2025 19.0534 20.3039 19.1267 20.3822C19.1999 20.4605 19.2982 20.5108 19.4046 20.5244C19.8306 20.5828 20.2627 20.5788 20.6876 20.5126C20.7938 20.4987 20.8933 20.4527 20.9727 20.3806C21.052 20.3086 21.1074 20.214 21.1315 20.1095C21.2327 19.5522 21.7849 19.158 22.3723 19.2475C22.4718 19.2623 22.5688 19.2906 22.6605 19.3319C22.7588 19.3743 22.8677 19.3856 22.9725 19.3642C23.0774 19.3429 23.1732 19.2898 23.2469 19.2123C23.4023 19.0504 23.5414 18.8736 23.6623 18.6845C23.7864 18.4833 23.8891 18.2696 23.9688 18.047C24.0036 17.948 24.0075 17.8408 23.9801 17.7395C23.9526 17.6383 23.8951 17.5477 23.8151 17.4798ZM21.3307 17.2455C21.1884 17.4761 20.981 17.6594 20.7345 17.7722C20.4881 17.8849 20.2138 17.922 19.9462 17.8789C19.6787 17.8357 19.4299 17.7141 19.2315 17.5296C19.033 17.3451 18.8937 17.1058 18.8313 16.8421C18.7688 16.5784 18.7859 16.3021 18.8805 16.0481C18.975 15.7942 19.1428 15.5739 19.3625 15.4153C19.5822 15.2567 19.844 15.1668 20.1149 15.1569C20.3857 15.1471 20.6533 15.2178 20.884 15.3601C21.1919 15.5523 21.4116 15.8582 21.4952 16.2114C21.5788 16.5646 21.5197 16.9365 21.3307 17.2464V17.2455Z" fill="#0066BE" fill-opacity="0.6"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_3798_1080">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>
                            <p>Settings</p>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li
                  className={
                    location.pathname == "/webinar/analytics"
                      ? "active"
                      : "side_li"
                  }
                >
                  <Link to={"/webinar/analytics"}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_3664_570)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.3501 -0.000184536C1.05701 -0.000184536 0.00873796 1.02311 0.00868875 2.28544L-0.00488281 21.7141C-0.00493202 22.9765 1.04337 23.9999 2.33653 23.9999H21.6525C22.9456 23.9999 23.9939 22.9765 23.9939 21.7141V2.27992C23.9939 1.01755 22.9456 -0.00579691 21.6525 -0.00579691L2.3501 -0.000184536ZM17.1602 4.79985H19.3202C19.4157 4.79985 19.5073 4.76193 19.5748 4.69441C19.6423 4.6269 19.6802 4.53533 19.6802 4.43986C19.6802 3.77151 19.4147 3.13054 18.9421 2.65795C18.4695 2.18535 17.8286 1.91985 17.1602 1.91985C17.0648 1.91985 16.9732 1.95778 16.9057 2.0253C16.8382 2.09281 16.8002 2.18438 16.8002 2.27985V4.26345C16.8002 4.63786 16.9622 4.79985 17.1602 4.79985ZM14.1477 7.47537C13.8663 7.19687 13.6592 6.85224 13.5453 6.473C13.4304 6.09522 13.4094 5.6951 13.484 5.30735C13.5587 4.9196 13.7267 4.55592 13.9737 4.24786C14.1991 3.96986 14.4838 3.74583 14.807 3.59218C15.1301 3.43853 15.4836 3.35915 15.8414 3.35986C15.9323 3.35986 16.0194 3.39598 16.0837 3.46028C16.1479 3.52458 16.1841 3.61178 16.1841 3.70272V4.90272C16.1841 5.03911 16.2382 5.16992 16.3346 5.26637C16.431 5.36282 16.5618 5.417 16.6981 5.417H17.8975C17.9884 5.417 18.0756 5.45312 18.1399 5.51742C18.2041 5.58172 18.2402 5.66893 18.2402 5.75986C18.2402 6.39638 17.9875 7.00682 17.5376 7.45691C17.0877 7.907 16.4776 8.15985 15.8414 8.15985C15.6098 8.16011 15.3792 8.12898 15.156 8.06728C14.7757 7.95739 14.429 7.75388 14.1477 7.47537ZM17.1202 11.3477C17.121 10.6478 17.6937 10.0806 18.4002 10.0799C19.1071 10.0799 19.6802 10.6475 19.6802 11.3477C19.6802 12.0479 19.1071 12.6156 18.4002 12.6156C18.1618 12.6148 17.9285 12.5475 17.7271 12.4213L15.404 13.7893C15.4049 13.802 15.4067 13.8145 15.4084 13.827C15.411 13.8456 15.4135 13.8642 15.4135 13.8834C15.4143 14.5292 14.9243 15.072 14.2763 15.1435C13.6284 15.215 13.0298 14.7922 12.887 14.1621L10.7446 13.1111C10.3476 13.4922 9.74541 13.5703 9.2626 13.3036L6.79447 15.1282C6.8501 15.2704 6.87916 15.4213 6.88026 15.5739C6.88026 16.2741 6.30713 16.8418 5.60026 16.8418C4.89338 16.8418 4.32026 16.2741 4.32026 15.5739C4.32026 14.8736 4.89338 14.3061 5.60026 14.3061C5.82588 14.3073 6.04713 14.3683 6.24088 14.4827L8.68463 12.6762C8.48604 12.2022 8.59557 11.6565 8.96213 11.2937C9.32854 10.9309 9.87963 10.8227 10.3581 11.0196C10.8365 11.2166 11.1479 11.6797 11.147 12.1929C11.1449 12.2478 11.1395 12.3026 11.1303 12.3569L13.0142 13.2812C13.2065 12.924 13.5606 12.6804 13.9657 12.6267C14.3707 12.573 14.7771 12.7157 15.0574 13.0102L17.1934 11.7526C17.1466 11.6226 17.122 11.4858 17.1202 11.3477ZM17.547 15.1513H19.2535C19.4892 15.1513 19.6803 15.3406 19.6803 15.5739L19.6802 21.6572C19.6802 21.8906 19.4891 22.0799 19.2535 22.0799H17.5469C17.3113 22.0799 17.1202 21.8906 17.1202 21.6572L17.1203 15.5739C17.1203 15.3406 17.3114 15.1513 17.547 15.1513ZM10.7203 15.9965H9.01357C8.77794 15.9965 8.58701 16.1857 8.58701 16.4191L8.58698 21.6572C8.58698 21.8906 8.77792 22.0798 9.01354 22.0798H10.7203C10.9559 22.0798 11.147 21.8906 11.147 21.6572L11.147 16.4191C11.147 16.1857 10.9559 15.9965 10.7203 15.9965ZM4.32026 19.8C4.32026 19.5666 4.51135 19.3775 4.74698 19.3775H6.45354C6.68916 19.3775 6.88026 19.5666 6.88026 19.8L6.88023 21.6572C6.88023 21.8906 6.68914 22.0798 6.45351 22.0798H4.74695C4.51133 22.0798 4.32023 21.8906 4.32023 21.6572L4.32026 19.8ZM13.2802 17.6869H14.987C15.2226 17.6869 15.4135 17.8762 15.4135 18.1096L15.4135 21.6572C15.4135 21.8906 15.2226 22.0798 14.9869 22.0798H13.2802C13.0446 22.0798 12.8535 21.8906 12.8535 21.6572L12.8535 18.1096C12.8535 17.8762 13.0446 17.6869 13.2802 17.6869ZM4.80023 2.39985C4.53514 2.39985 4.32023 2.61476 4.32023 2.87985C4.32023 3.14495 4.53514 3.35985 4.80023 3.35985H12.0002C12.2653 3.35985 12.4802 3.14495 12.4802 2.87985C12.4802 2.61476 12.2653 2.39985 12.0002 2.39985H4.80023ZM4.32023 5.27986C4.32023 5.01476 4.53514 4.79985 4.80023 4.79985H9.12024C9.38533 4.79985 9.60024 5.01476 9.60024 5.27986C9.60024 5.54495 9.38533 5.75985 9.12024 5.75985H4.80023C4.53514 5.75985 4.32023 5.54495 4.32023 5.27986Z" fill="#0066BE" fill-opacity="0.6"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_3664_570">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                    <p>Analytics</p>
                  </Link>
                </li>
              </ul>
          ) :
          window.location.pathname == "/webinar/invitees" ||
                window.location.pathname == "/webinar/registration" ||
                window.location.pathname == "/webinar/email" ||
                window.location.pathname == "/webinar/live-stream" ||
                window.location.pathname == "/webinar/live-stream/polls-layout" ||  window.location.pathname == "/survey/question-data" || window.location.pathname == "/webinar/live-stream/chat-link" ||
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                        <path d="M14.483 4.36793C15.5927 5.0637 16.3708 6.24109 16.5125 7.60777C16.965 7.81923 17.4673 7.94083 17.9999 7.94083C19.944 7.94083 21.5197 6.36509 21.5197 4.42125C21.5197 2.47711 19.944 0.901367 17.9999 0.901367C16.0743 0.901966 14.5123 2.44955 14.483 4.36793ZM12.177 11.5748C14.1212 11.5748 15.6969 9.99878 15.6969 8.05494C15.6969 6.1111 14.1209 4.53536 12.177 4.53536C10.2332 4.53536 8.65653 6.1114 8.65653 8.05524C8.65653 9.99908 10.2332 11.5748 12.177 11.5748ZM13.6701 11.8147H10.6833C8.19828 11.8147 6.17656 13.8367 6.17656 16.3218V19.9744L6.18585 20.0316L6.43744 20.1104C8.80899 20.8513 10.8693 21.0984 12.5652 21.0984C15.8775 21.0984 17.7974 20.1541 17.9157 20.0939L18.1508 19.975H18.176V16.3218C18.1769 13.8367 16.1551 11.8147 13.6701 11.8147ZM19.4935 8.18104H16.5298C16.4978 9.36681 15.9916 10.4346 15.191 11.2025C17.3999 11.8594 19.0161 13.9077 19.0161 16.3272V17.4528C21.9423 17.3455 23.6286 16.5162 23.7397 16.4605L23.9748 16.3413H24V12.6875C24 10.2028 21.9783 8.18104 19.4935 8.18104ZM6.00075 7.94143C6.68933 7.94143 7.32999 7.74045 7.87271 7.39811C8.04523 6.27284 8.64845 5.28954 9.51015 4.61982C9.51374 4.55393 9.52003 4.48864 9.52003 4.42215C9.52003 2.47801 7.94399 0.902266 6.00075 0.902266C4.05631 0.902266 2.48087 2.47801 2.48087 4.42215C2.48087 6.36539 4.05631 7.94143 6.00075 7.94143ZM9.16181 11.2025C8.36511 10.4385 7.86073 9.3764 7.82389 8.19781C7.71396 8.18972 7.60524 8.18104 7.49322 8.18104H4.50678C2.02171 8.18104 0 10.2028 0 12.6875V16.3407L0.00928491 16.397L0.260876 16.4764C2.16338 17.0703 3.86133 17.344 5.33613 17.4303V16.3272C5.33673 13.9077 6.9523 11.86 9.16181 11.2025Z" fill="#0066BE" fill-opacity="0.6" />
                      </svg>
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M13.3806 5.37989C13.3806 5.86588 12.9866 6.25991 12.5006 6.25991C12.0146 6.25991 11.6204 5.86595 11.6204 5.37997C11.6204 4.89398 12.0146 4.49995 12.5006 4.49995C12.9865 4.49995 13.3806 4.89391 13.3806 5.37989Z" fill="#0066BE" />
                        <path d="M12.1271 6.31989H12.8738C13.4951 6.31989 14.0006 6.82542 14.0004 7.44671V8.36005H13.9941L13.9353 8.38978C13.9057 8.40483 13.4257 8.64093 12.5976 8.64093C12.1736 8.64093 11.6585 8.57915 11.0656 8.3939L11.0027 8.3742L11.0004 8.3599V7.44671C11.0004 6.82542 11.5058 6.31989 12.1271 6.31989Z" fill="#0066BE" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00077 2.28563C3.00082 1.0233 4.06477 0 5.3772 0H19.6236C20.936 0 22 1.02335 22 2.28571V21.7143C22 22.9767 20.936 24 19.6236 24H5.37643C4.06393 24 2.99995 22.9766 3 21.7142L3.00077 2.28563ZM19.477 13.7821C19.3832 13.8759 19.256 13.9286 19.1233 13.9286H6.11544C5.98275 13.9286 5.8555 13.8759 5.76167 13.7821C5.66785 13.6884 5.61514 13.5612 5.61514 13.4286C5.61514 13.296 5.66785 13.1688 5.76167 13.075C5.8555 12.9813 5.98275 12.9286 6.11544 12.9286H19.1233C19.256 12.9286 19.3832 12.9813 19.477 13.075C19.5709 13.1688 19.6236 13.296 19.6236 13.4286C19.6236 13.5612 19.5709 13.6884 19.477 13.7821ZM5.76167 16.7821C5.8555 16.8759 5.98275 16.9286 6.11544 16.9286H19.1233C19.256 16.9286 19.3832 16.8759 19.477 16.7821C19.5709 16.6884 19.6236 16.5612 19.6236 16.4286C19.6236 16.296 19.5709 16.1688 19.477 16.075C19.3832 15.9813 19.256 15.9286 19.1233 15.9286H6.11544C5.98275 15.9286 5.8555 15.9813 5.76167 16.075C5.66785 16.1688 5.61514 16.296 5.61514 16.4286C5.61514 16.5612 5.66785 16.6884 5.76167 16.7821ZM12.5 10C14.433 10 16 8.433 16 6.5C16 4.567 14.433 3 12.5 3C10.567 3 9 4.567 9 6.5C9 8.433 10.567 10 12.5 10ZM10 19C9.44772 19 9 19.4477 9 20C9 20.5523 9.44771 21 10 21H15C15.5523 21 16 20.5523 16 20C16 19.4477 15.5523 19 15 19H10Z" fill="#0066BE" fill-opacity="0.6" />
                      </svg>
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M23.92 5.28516L12.8457 11.868C12.5899 12.0144 12.3004 12.0913 12.0057 12.0913C11.711 12.0913 11.4215 12.0144 11.1657 11.868L0.0799999 5.28516C0.0270091 5.51376 0.000170336 5.74764 0 5.9823V17.1594C0 17.9505 0.314264 18.7092 0.873659 19.2686C1.43305 19.828 2.19175 20.1423 2.98286 20.1423H21.0171C21.8082 20.1423 22.5669 19.828 23.1263 19.2686C23.6857 18.7092 24 17.9505 24 17.1594V5.9823C23.9998 5.74764 23.973 5.51376 23.92 5.28516Z" fill="#0066BE" fill-opacity="0.6" />
                        <path d="M12.2745 10.92L23.4517 4.26857C23.1772 3.87765 22.8128 3.55839 22.3891 3.33763C21.9655 3.11687 21.4951 3.00108 21.0174 3H2.98311C2.50543 3.00108 2.03499 3.11687 1.61138 3.33763C1.18776 3.55839 0.823359 3.87765 0.548828 4.26857L11.7374 10.92C11.8198 10.965 11.9121 10.9886 12.006 10.9886C12.0998 10.9886 12.1922 10.965 12.2745 10.92Z" fill="#0066BE" fill-opacity="0.6" />
                      </svg>
                      <p>Email</p>
                    </Link>
                  </li>

                  {/* <li
                    className={
                      location.pathname == "/webinar/live-stream" || location.pathname == "/webinar/polls-layout"
                        ? "active sub-links"
                        : "side_li sub-links"
                    }
                  // className="active sub-links"
                  >
                    <Link to={"/webinar/live-stream"}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_3798_1070)">
                          <path d="M13.0704 6.58856C12.4751 7.18255 11.5103 7.18255 10.9151 6.58856C10.32 5.99456 10.32 5.03143 10.9151 4.43744C11.5103 3.84345 12.4751 3.84345 13.0704 4.43744C13.6655 5.03143 13.6655 5.99456 13.0704 6.58856Z" fill="#0066BE" />
                          <path d="M15.1531 8.89346C14.9675 8.89346 14.7818 8.8226 14.6404 8.68069C14.3577 8.39761 14.3583 7.93894 14.6413 7.6564C15.215 7.08384 15.5309 6.32267 15.5309 5.51316C15.5309 4.70365 15.215 3.94249 14.6413 3.36992C14.3583 3.0872 14.3577 2.62871 14.6404 2.34544C14.923 2.06236 15.3816 2.06181 15.6647 2.34453C16.5127 3.19084 16.9796 4.31602 16.9796 5.51316C16.9796 6.71012 16.5127 7.83548 15.6647 8.68179C15.5234 8.82297 15.3382 8.89346 15.1531 8.89346Z" fill="#0066BE" fill-opacity="0.6" />
                          <path d="M16.7908 11.0259C16.6051 11.0259 16.4195 10.955 16.2781 10.8133C15.9954 10.5301 15.996 10.0716 16.279 9.78884C17.4234 8.64663 18.0539 7.12814 18.0539 5.51297C18.0539 3.8978 17.4234 2.37931 16.279 1.2371C15.996 0.95439 15.9954 0.495895 16.2781 0.212631C16.5608 -0.0704493 17.0193 -0.0709986 17.3024 0.211716C18.7211 1.62767 19.5026 3.51035 19.5024 5.51297C19.5024 7.51559 18.7211 9.39846 17.3024 10.8144C17.1611 10.9554 16.9759 11.0259 16.7908 11.0259Z" fill="#0066BE" fill-opacity="0.6" />
                          <path d="M8.82959 8.89329C8.64447 8.89329 8.45935 8.82279 8.31781 8.68162C7.46985 7.83531 7.00293 6.70994 7.00293 5.51299C7.00293 4.31584 7.46985 3.19066 8.31781 2.34435C8.60089 2.06164 9.05957 2.062 9.3421 2.34527C9.62481 2.62835 9.62426 3.08703 9.34118 3.36974C8.76751 3.94231 8.45166 4.70348 8.45166 5.51299C8.45166 6.32249 8.76751 7.08366 9.34118 7.65623C9.62426 7.93876 9.62481 8.39744 9.3421 8.68052C9.20074 8.82224 9.01507 8.89329 8.82959 8.89329Z" fill="#0066BE" fill-opacity="0.6" />
                          <path d="M7.19128 11.026C7.00598 11.026 6.82086 10.9555 6.6795 10.8143C5.2608 9.39837 4.47949 7.51569 4.47949 5.51306C4.47949 3.51026 5.2608 1.62758 6.6795 0.211624C6.96258 -0.0709071 7.42126 -0.0705408 7.70379 0.212723C7.9865 0.495803 7.98595 0.954298 7.70287 1.23701C6.55847 2.37922 5.92804 3.89771 5.92804 5.51288C5.92804 7.12805 6.55847 8.64673 7.70287 9.78893C7.98595 10.0716 7.9865 10.5301 7.70379 10.8134C7.56243 10.9551 7.37676 11.026 7.19128 11.026Z" fill="#0066BE" fill-opacity="0.6" />
                          <path d="M21.5381 12.2783H2.44445C1.5086 12.2783 0.75 13.0369 0.75 13.9726V22.3055C0.75 23.2414 1.5086 24 2.44445 24H21.5379C22.4738 24 23.2324 23.2414 23.2324 22.3055V13.9726C23.2324 13.0369 22.4738 12.2783 21.5381 12.2783ZM6.32207 21.826H3.65331C3.25341 21.826 2.92913 21.5017 2.92913 21.1016V15.1767C2.92913 14.7768 3.25341 14.4523 3.65331 14.4523C4.0534 14.4523 4.37768 14.7766 4.37768 15.1767V20.3772H6.32207C6.72215 20.3772 7.04643 20.7015 7.04643 21.1016C7.04643 21.5017 6.72215 21.826 6.32207 21.826ZM9.29057 21.1016C9.29057 21.5017 8.96629 21.826 8.56621 21.826C8.16612 21.826 7.84184 21.5017 7.84184 21.1016V15.1767C7.84184 14.7768 8.16612 14.4523 8.56621 14.4523C8.96629 14.4523 9.29057 14.7766 9.29057 15.1767V21.1016ZM15.385 15.3862L13.5963 21.3109C13.5961 21.3114 13.5959 21.312 13.5957 21.3125C13.4015 21.9756 12.411 21.9593 12.21 21.3125C12.2098 21.312 12.2096 21.3114 12.2094 21.3109L10.4207 15.3862C10.3052 15.0031 10.5218 14.599 10.9048 14.4833C11.2875 14.3677 11.692 14.5843 11.8075 14.9674L12.9029 18.5953L13.9982 14.9674C14.1139 14.5843 14.518 14.3675 14.9011 14.4833C15.284 14.599 15.5008 15.0031 15.385 15.3862ZM19.8413 17.0418C20.2414 17.0418 20.5656 17.3661 20.5656 17.7662C20.5656 18.1661 20.2414 18.4905 19.8413 18.4905H17.7857V20.3772H20.2315C20.6315 20.3772 20.9558 20.7015 20.9558 21.1016C20.9558 21.5017 20.6315 21.826 20.2315 21.826H17.0614C16.6613 21.826 16.337 21.5017 16.337 21.1016V15.1767C16.337 14.7768 16.6613 14.4523 17.0614 14.4523H20.3291C20.729 14.4523 21.0534 14.7766 21.0534 15.1767C21.0534 15.5768 20.729 15.9011 20.3291 15.9011H17.7855V17.0418H19.8413Z" fill="#0066BE" fill-opacity="0.6" />
                        </g>
                        <defs>
                          <clipPath id="clip0_3798_1070">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p>Live Stream</p>
                    </Link>
                    <div className="left-sidebar-secondary">
                      <div className="sidebar-menu-secondary">
                        <ul>
                          <li className="side_li">
                            <a href="/webinar/live-stream">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clip-path="url(#clip0_3798_1070)">
                                  <path d="M13.0704 6.58856C12.4751 7.18255 11.5103 7.18255 10.9151 6.58856C10.32 5.99456 10.32 5.03143 10.9151 4.43744C11.5103 3.84345 12.4751 3.84345 13.0704 4.43744C13.6655 5.03143 13.6655 5.99456 13.0704 6.58856Z" fill="#0066BE" />
                                  <path d="M15.1531 8.89346C14.9675 8.89346 14.7818 8.8226 14.6404 8.68069C14.3577 8.39761 14.3583 7.93894 14.6413 7.6564C15.215 7.08384 15.5309 6.32267 15.5309 5.51316C15.5309 4.70365 15.215 3.94249 14.6413 3.36992C14.3583 3.0872 14.3577 2.62871 14.6404 2.34544C14.923 2.06236 15.3816 2.06181 15.6647 2.34453C16.5127 3.19084 16.9796 4.31602 16.9796 5.51316C16.9796 6.71012 16.5127 7.83548 15.6647 8.68179C15.5234 8.82297 15.3382 8.89346 15.1531 8.89346Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path d="M16.7908 11.0259C16.6051 11.0259 16.4195 10.955 16.2781 10.8133C15.9954 10.5301 15.996 10.0716 16.279 9.78884C17.4234 8.64663 18.0539 7.12814 18.0539 5.51297C18.0539 3.8978 17.4234 2.37931 16.279 1.2371C15.996 0.95439 15.9954 0.495895 16.2781 0.212631C16.5608 -0.0704493 17.0193 -0.0709986 17.3024 0.211716C18.7211 1.62767 19.5026 3.51035 19.5024 5.51297C19.5024 7.51559 18.7211 9.39846 17.3024 10.8144C17.1611 10.9554 16.9759 11.0259 16.7908 11.0259Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path d="M8.82959 8.89329C8.64447 8.89329 8.45935 8.82279 8.31781 8.68162C7.46985 7.83531 7.00293 6.70994 7.00293 5.51299C7.00293 4.31584 7.46985 3.19066 8.31781 2.34435C8.60089 2.06164 9.05957 2.062 9.3421 2.34527C9.62481 2.62835 9.62426 3.08703 9.34118 3.36974C8.76751 3.94231 8.45166 4.70348 8.45166 5.51299C8.45166 6.32249 8.76751 7.08366 9.34118 7.65623C9.62426 7.93876 9.62481 8.39744 9.3421 8.68052C9.20074 8.82224 9.01507 8.89329 8.82959 8.89329Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path d="M7.19128 11.026C7.00598 11.026 6.82086 10.9555 6.6795 10.8143C5.2608 9.39837 4.47949 7.51569 4.47949 5.51306C4.47949 3.51026 5.2608 1.62758 6.6795 0.211624C6.96258 -0.0709071 7.42126 -0.0705408 7.70379 0.212723C7.9865 0.495803 7.98595 0.954298 7.70287 1.23701C6.55847 2.37922 5.92804 3.89771 5.92804 5.51288C5.92804 7.12805 6.55847 8.64673 7.70287 9.78893C7.98595 10.0716 7.9865 10.5301 7.70379 10.8134C7.56243 10.9551 7.37676 11.026 7.19128 11.026Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path d="M21.5381 12.2783H2.44445C1.5086 12.2783 0.75 13.0369 0.75 13.9726V22.3055C0.75 23.2414 1.5086 24 2.44445 24H21.5379C22.4738 24 23.2324 23.2414 23.2324 22.3055V13.9726C23.2324 13.0369 22.4738 12.2783 21.5381 12.2783ZM6.32207 21.826H3.65331C3.25341 21.826 2.92913 21.5017 2.92913 21.1016V15.1767C2.92913 14.7768 3.25341 14.4523 3.65331 14.4523C4.0534 14.4523 4.37768 14.7766 4.37768 15.1767V20.3772H6.32207C6.72215 20.3772 7.04643 20.7015 7.04643 21.1016C7.04643 21.5017 6.72215 21.826 6.32207 21.826ZM9.29057 21.1016C9.29057 21.5017 8.96629 21.826 8.56621 21.826C8.16612 21.826 7.84184 21.5017 7.84184 21.1016V15.1767C7.84184 14.7768 8.16612 14.4523 8.56621 14.4523C8.96629 14.4523 9.29057 14.7766 9.29057 15.1767V21.1016ZM15.385 15.3862L13.5963 21.3109C13.5961 21.3114 13.5959 21.312 13.5957 21.3125C13.4015 21.9756 12.411 21.9593 12.21 21.3125C12.2098 21.312 12.2096 21.3114 12.2094 21.3109L10.4207 15.3862C10.3052 15.0031 10.5218 14.599 10.9048 14.4833C11.2875 14.3677 11.692 14.5843 11.8075 14.9674L12.9029 18.5953L13.9982 14.9674C14.1139 14.5843 14.518 14.3675 14.9011 14.4833C15.284 14.599 15.5008 15.0031 15.385 15.3862ZM19.8413 17.0418C20.2414 17.0418 20.5656 17.3661 20.5656 17.7662C20.5656 18.1661 20.2414 18.4905 19.8413 18.4905H17.7857V20.3772H20.2315C20.6315 20.3772 20.9558 20.7015 20.9558 21.1016C20.9558 21.5017 20.6315 21.826 20.2315 21.826H17.0614C16.6613 21.826 16.337 21.5017 16.337 21.1016V15.1767C16.337 14.7768 16.6613 14.4523 17.0614 14.4523H20.3291C20.729 14.4523 21.0534 14.7766 21.0534 15.1767C21.0534 15.5768 20.729 15.9011 20.3291 15.9011H17.7855V17.0418H19.8413Z" fill="#0066BE" fill-opacity="0.6" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3798_1070">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                              <p>Live Stream</p>
                            </a>
                          </li>
                          <li className="side_li">
                            <a href="/webinar/live-stream">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clip-path="url(#clip0_3765_722)">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7219 5.36932C23.0133 7.3423 23.6998 9.65809 23.695 12.0253L23.6973 24H11.6777C9.34088 23.9661 7.06621 23.2328 5.13982 21.8926C3.21344 20.5524 1.72141 18.6649 0.851458 16.4679C-0.0184992 14.2708 -0.22752 11.8621 0.250693 9.54499C0.728906 7.22785 1.87299 5.10574 3.539 3.44564C5.20501 1.78553 7.31853 0.661605 9.61363 0.215259C11.9087 -0.231086 14.2829 0.0200908 16.4374 0.937188C18.5919 1.85429 20.4305 3.39633 21.7219 5.36932ZM6.55671 3.89894C8.1393 2.82781 9.99993 2.2561 11.9033 2.2561C14.4556 2.2561 16.9035 3.28312 18.7082 5.11123C20.513 6.93933 21.5269 9.41877 21.5269 12.0041C21.5269 13.9321 20.9625 15.8167 19.905 17.4198C18.8476 19.0228 17.3446 20.2723 15.5861 21.0101C13.8276 21.7479 11.8926 21.9409 10.0258 21.5648C8.15903 21.1887 6.44427 20.2603 5.09838 18.897C3.75249 17.5337 2.83593 15.7968 2.4646 13.9058C2.09327 12.0149 2.28385 10.0549 3.01224 8.2737C3.74063 6.49249 4.97411 4.97006 6.55671 3.89894ZM17.6328 17.4189C16.2937 18.8781 14.4602 19.7718 12.4988 19.9213C12.3399 19.932 12.1806 19.9072 12.0323 19.8486C11.8839 19.7899 11.7501 19.6989 11.6404 19.5819C11.1222 19.0334 10.7939 18.3292 10.705 17.5753C10.6161 16.8214 10.7713 16.0587 11.1473 15.4019L12.2895 16.1889L11.552 12.5531L8.21623 13.4391L9.32351 14.146C8.729 15.1445 8.45585 16.3056 8.5419 17.4683C8.59063 18.1308 8.75691 18.779 9.03273 19.3817C8.05419 18.9893 7.16368 18.4014 6.41433 17.6529C5.66498 16.9044 5.07213 16.0107 4.67115 15.0251C4.27017 14.0395 4.06928 12.9822 4.08045 11.9162C4.09163 10.8503 4.31464 9.7975 4.73619 8.82074C4.82188 8.62645 4.95025 8.45455 5.11151 8.31816C5.27277 8.18177 5.46266 8.08449 5.66668 8.03374C6.39415 7.85313 7.15983 7.91624 7.8489 8.21362C8.53797 8.51099 9.11332 9.0266 9.48868 9.68315L8.24414 10.2911L11.7102 11.4692L12.6175 8.09736L11.4543 8.71235C11.0075 7.89252 10.3642 7.19974 9.58369 6.6978C8.80319 6.19585 7.91055 5.90088 6.98798 5.84003C7.82448 5.15808 8.7906 4.65781 9.8262 4.37034C10.8618 4.08287 11.9447 4.01437 13.0076 4.16908C14.0704 4.3238 15.0905 4.69843 16.0043 5.26965C16.918 5.84088 17.706 6.59648 18.319 7.48944C18.4273 7.64535 18.4993 7.82411 18.5295 8.01226C18.5597 8.20041 18.5474 8.39305 18.4935 8.57569C18.2799 9.30248 17.8412 9.94042 17.2422 10.3953C16.6432 10.8501 15.9156 11.0978 15.167 11.1016L15.2694 9.70435L12.5314 12.1525L14.96 14.6337L15.0158 13.3048C15.924 13.324 16.8228 13.1158 17.6324 12.6986C18.442 12.2814 19.1373 11.6681 19.6566 10.9131C19.7076 11.2816 19.7325 11.6533 19.7311 12.0253C19.7356 14.0309 18.9872 15.9632 17.6375 17.4306L17.6328 17.4189Z" fill="#0066BE" fill-opacity="0.6" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3765_722">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                              <p>Speaker Zone</p>
                            </a>
                          </li>
                          <li  className={isActivePolls ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <a href="/webinar/polls-layout">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clip-path="url(#clip0_3761_88)">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.499864 0L1 3.9837e-06H1.50015C1.7763 3.9837e-06 2 0.223861 2 0.500003V0.999988H16.3937C16.7272 0.999988 17 1.24225 17 1.53835V4.46163C17 4.76311 16.7272 4.99999 16.3937 4.99999H2V9.99999H14.3207C14.7011 9.99999 15 10.2369 15 10.5383V13.4616C15 13.7577 14.7011 14 14.3207 14H2V19H11.273C11.6728 19 12 19.2419 12 19.5376V22.4624C12 22.7581 11.6728 23 11.273 23H2V23.5C2 23.7761 1.7763 24 1.50015 24H1H0.499847C0.223704 24 0 23.7761 0 23.5V0.500006C0 0.223857 0.223715 -4.27361e-06 0.499864 0Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path d="M21.3807 2.79292C22.152 2.79292 22.7772 2.16763 22.7772 1.3964C22.7772 0.625179 22.1519 0 21.3807 0C20.6095 0 19.9839 0.625297 19.9839 1.39652C19.9839 2.16775 20.6095 2.79292 21.3807 2.79292ZM21.9731 2.88811H20.7881C19.8021 2.88811 19 3.69035 19 4.6763L19.01 5.55402L19.0137 5.57672L19.1135 5.60797C20.0544 5.90196 20.8719 6 21.5447 6C22.8589 6 23.6206 5.62532 23.6675 5.60144L23.7608 5.55426H23.7708L23.7608 4.6763C23.7611 3.69035 22.959 2.88811 21.9731 2.88811Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path d="M21.3807 11.7929C22.152 11.7929 22.7772 11.1676 22.7772 10.3964C22.7772 9.62518 22.1519 9 21.3807 9C20.6095 9 19.9839 9.6253 19.9839 10.3965C19.9839 11.1677 20.6095 11.7929 21.3807 11.7929ZM21.9731 11.8881H20.7881C19.8021 11.8881 19 12.6903 19 13.6763L19.01 14.554L19.0137 14.5767L19.1135 14.608C20.0544 14.902 20.8719 15 21.5447 15C22.8589 15 23.6206 14.6253 23.6675 14.6014L23.7608 14.5543H23.7708L23.7608 13.6763C23.7611 12.6903 22.959 11.8881 21.9731 11.8881Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path d="M21.3807 19.7929C22.152 19.7929 22.7772 19.1676 22.7772 18.3964C22.7772 17.6252 22.1519 17 21.3807 17C20.6095 17 19.9839 17.6253 19.9839 18.3965C19.9839 19.1677 20.6095 19.7929 21.3807 19.7929ZM21.9731 19.8881H20.7881C19.8021 19.8881 19 20.6903 19 21.6763L19.01 22.554L19.0137 22.5767L19.1135 22.608C20.0544 22.902 20.8719 23 21.5447 23C22.8589 23 23.6206 22.6253 23.6675 22.6014L23.7608 22.5543H23.7708L23.7608 21.6763C23.7611 20.6903 22.959 19.8881 21.9731 19.8881Z" fill="#0066BE" fill-opacity="0.6" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3761_88">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                              <p>Polls</p>
                            </a>
                          </li>
                          <li className={isActiveContact ? 'active' : 'side_li'}
                          // className="side_li"
                          >
                            <a href="/webinar/contact-dm">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clip-path="url(#clip0_3761_84)">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 11C8.53757 11 11 8.53757 11 5.5C11 2.46243 8.53757 0 5.5 0C2.46243 0 0 2.46243 0 5.5C0 8.53757 2.46243 11 5.5 11ZM6.80506 3.72185C6.80506 4.39667 6.25803 4.9438 5.5831 4.9438C4.90828 4.9438 4.36094 4.39677 4.36094 3.72195C4.36094 3.04713 4.90828 2.5 5.5831 2.5C6.25792 2.5 6.80506 3.04703 6.80506 3.72185ZM5.06456 5.02709H6.10143C6.96414 5.02709 7.666 5.72905 7.66568 6.59175V7.85998H7.65695L7.57533 7.90126C7.53426 7.92216 6.86775 8.25 5.71786 8.25C5.12913 8.25 4.41387 8.16422 3.59057 7.90698L3.50322 7.87963L3.5 7.85977V6.59175C3.5 5.72905 4.20185 5.02709 5.06456 5.02709Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path d="M13 2.5C13 2.22386 13.2239 2 13.5 2H18.5C18.7761 2 19 2.22386 19 2.5C19 2.77614 18.7761 3 18.5 3H13.5C13.2239 3 13 2.77614 13 2.5Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path d="M13.5 5C13.2239 5 13 5.22386 13 5.5C13 5.77614 13.2239 6 13.5 6H23.5C23.7761 6 24 5.77614 24 5.5C24 5.22386 23.7761 5 23.5 5H13.5Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path d="M13 8.5C13 8.22386 13.2239 8 13.5 8H23.5C23.7761 8 24 8.22386 24 8.5C24 8.77614 23.7761 9 23.5 9H13.5C13.2239 9 13 8.77614 13 8.5Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 24C8.53757 24 11 21.5376 11 18.5C11 15.4624 8.53757 13 5.5 13C2.46243 13 0 15.4624 0 18.5C0 21.5376 2.46243 24 5.5 24ZM6.80506 16.7218C6.80506 17.3967 6.25803 17.9438 5.5831 17.9438C4.90828 17.9438 4.36094 17.3968 4.36094 16.722C4.36094 16.0471 4.90828 15.5 5.5831 15.5C6.25792 15.5 6.80506 16.047 6.80506 16.7218ZM5.06456 18.0271H6.10143C6.96414 18.0271 7.666 18.729 7.66568 19.5918V20.86H7.65695L7.57533 20.9013C7.53426 20.9222 6.86775 21.25 5.71786 21.25C5.12913 21.25 4.41387 21.1642 3.59057 20.907L3.50322 20.8796L3.5 20.8598V19.5918C3.5 18.729 4.20185 18.0271 5.06456 18.0271Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path d="M13 15.5C13 15.2239 13.2239 15 13.5 15H18.5C18.7761 15 19 15.2239 19 15.5C19 15.7761 18.7761 16 18.5 16H13.5C13.2239 16 13 15.7761 13 15.5Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path d="M13.5 18C13.2239 18 13 18.2239 13 18.5C13 18.7761 13.2239 19 13.5 19H23.5C23.7761 19 24 18.7761 24 18.5C24 18.2239 23.7761 18 23.5 18H13.5Z" fill="#0066BE" fill-opacity="0.6" />
                                  <path d="M13 21.5C13 21.2239 13.2239 21 13.5 21H23.5C23.7761 21 24 21.2239 24 21.5C24 21.7761 23.7761 22 23.5 22H13.5C13.2239 22 13 21.7761 13 21.5Z" fill="#0066BE" fill-opacity="0.6" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3761_84">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                              <p>Contact DM</p>
                            </a>
                          </li>
                          <li className="side_li">
                            <a href="/webinar/live-stream">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M23.92 5.28516L12.8457 11.868C12.5899 12.0144 12.3004 12.0913 12.0057 12.0913C11.711 12.0913 11.4215 12.0144 11.1657 11.868L0.0799999 5.28516C0.0270091 5.51376 0.000170336 5.74764 0 5.9823V17.1594C0 17.9505 0.314264 18.7092 0.873659 19.2686C1.43305 19.828 2.19175 20.1423 2.98286 20.1423H21.0171C21.8082 20.1423 22.5669 19.828 23.1263 19.2686C23.6857 18.7092 24 17.9505 24 17.1594V5.9823C23.9998 5.74764 23.973 5.51376 23.92 5.28516Z" fill="#0066BE" fill-opacity="0.6"></path><path d="M12.2745 10.92L23.4517 4.26857C23.1772 3.87765 22.8128 3.55839 22.3891 3.33763C21.9655 3.11687 21.4951 3.00108 21.0174 3H2.98311C2.50543 3.00108 2.03499 3.11687 1.61138 3.33763C1.18776 3.55839 0.823359 3.87765 0.548828 4.26857L11.7374 10.92C11.8198 10.965 11.9121 10.9886 12.006 10.9886C12.0998 10.9886 12.1922 10.965 12.2745 10.92Z" fill="#0066BE" fill-opacity="0.6"></path></svg>
                              <p>Settings</p>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>  */}

                  <li
                    className={
                      location.pathname == "/analytics"
                        ? "active"
                        : "side_li"
                    }
                  >
                    <Link to={"/analytics"}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_3664_570)">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.3501 -0.000184536C1.05701 -0.000184536 0.00873796 1.02311 0.00868875 2.28544L-0.00488281 21.7141C-0.00493202 22.9765 1.04337 23.9999 2.33653 23.9999H21.6525C22.9456 23.9999 23.9939 22.9765 23.9939 21.7141V2.27992C23.9939 1.01755 22.9456 -0.00579691 21.6525 -0.00579691L2.3501 -0.000184536ZM17.1602 4.79985H19.3202C19.4157 4.79985 19.5073 4.76193 19.5748 4.69441C19.6423 4.6269 19.6802 4.53533 19.6802 4.43986C19.6802 3.77151 19.4147 3.13054 18.9421 2.65795C18.4695 2.18535 17.8286 1.91985 17.1602 1.91985C17.0648 1.91985 16.9732 1.95778 16.9057 2.0253C16.8382 2.09281 16.8002 2.18438 16.8002 2.27985V4.26345C16.8002 4.63786 16.9622 4.79985 17.1602 4.79985ZM14.1477 7.47537C13.8663 7.19687 13.6592 6.85224 13.5453 6.473C13.4304 6.09522 13.4094 5.6951 13.484 5.30735C13.5587 4.9196 13.7267 4.55592 13.9737 4.24786C14.1991 3.96986 14.4838 3.74583 14.807 3.59218C15.1301 3.43853 15.4836 3.35915 15.8414 3.35986C15.9323 3.35986 16.0194 3.39598 16.0837 3.46028C16.1479 3.52458 16.1841 3.61178 16.1841 3.70272V4.90272C16.1841 5.03911 16.2382 5.16992 16.3346 5.26637C16.431 5.36282 16.5618 5.417 16.6981 5.417H17.8975C17.9884 5.417 18.0756 5.45312 18.1399 5.51742C18.2041 5.58172 18.2402 5.66893 18.2402 5.75986C18.2402 6.39638 17.9875 7.00682 17.5376 7.45691C17.0877 7.907 16.4776 8.15985 15.8414 8.15985C15.6098 8.16011 15.3792 8.12898 15.156 8.06728C14.7757 7.95739 14.429 7.75388 14.1477 7.47537ZM17.1202 11.3477C17.121 10.6478 17.6937 10.0806 18.4002 10.0799C19.1071 10.0799 19.6802 10.6475 19.6802 11.3477C19.6802 12.0479 19.1071 12.6156 18.4002 12.6156C18.1618 12.6148 17.9285 12.5475 17.7271 12.4213L15.404 13.7893C15.4049 13.802 15.4067 13.8145 15.4084 13.827C15.411 13.8456 15.4135 13.8642 15.4135 13.8834C15.4143 14.5292 14.9243 15.072 14.2763 15.1435C13.6284 15.215 13.0298 14.7922 12.887 14.1621L10.7446 13.1111C10.3476 13.4922 9.74541 13.5703 9.2626 13.3036L6.79447 15.1282C6.8501 15.2704 6.87916 15.4213 6.88026 15.5739C6.88026 16.2741 6.30713 16.8418 5.60026 16.8418C4.89338 16.8418 4.32026 16.2741 4.32026 15.5739C4.32026 14.8736 4.89338 14.3061 5.60026 14.3061C5.82588 14.3073 6.04713 14.3683 6.24088 14.4827L8.68463 12.6762C8.48604 12.2022 8.59557 11.6565 8.96213 11.2937C9.32854 10.9309 9.87963 10.8227 10.3581 11.0196C10.8365 11.2166 11.1479 11.6797 11.147 12.1929C11.1449 12.2478 11.1395 12.3026 11.1303 12.3569L13.0142 13.2812C13.2065 12.924 13.5606 12.6804 13.9657 12.6267C14.3707 12.573 14.7771 12.7157 15.0574 13.0102L17.1934 11.7526C17.1466 11.6226 17.122 11.4858 17.1202 11.3477ZM17.547 15.1513H19.2535C19.4892 15.1513 19.6803 15.3406 19.6803 15.5739L19.6802 21.6572C19.6802 21.8906 19.4891 22.0799 19.2535 22.0799H17.5469C17.3113 22.0799 17.1202 21.8906 17.1202 21.6572L17.1203 15.5739C17.1203 15.3406 17.3114 15.1513 17.547 15.1513ZM10.7203 15.9965H9.01357C8.77794 15.9965 8.58701 16.1857 8.58701 16.4191L8.58698 21.6572C8.58698 21.8906 8.77792 22.0798 9.01354 22.0798H10.7203C10.9559 22.0798 11.147 21.8906 11.147 21.6572L11.147 16.4191C11.147 16.1857 10.9559 15.9965 10.7203 15.9965ZM4.32026 19.8C4.32026 19.5666 4.51135 19.3775 4.74698 19.3775H6.45354C6.68916 19.3775 6.88026 19.5666 6.88026 19.8L6.88023 21.6572C6.88023 21.8906 6.68914 22.0798 6.45351 22.0798H4.74695C4.51133 22.0798 4.32023 21.8906 4.32023 21.6572L4.32026 19.8ZM13.2802 17.6869H14.987C15.2226 17.6869 15.4135 17.8762 15.4135 18.1096L15.4135 21.6572C15.4135 21.8906 15.2226 22.0798 14.9869 22.0798H13.2802C13.0446 22.0798 12.8535 21.8906 12.8535 21.6572L12.8535 18.1096C12.8535 17.8762 13.0446 17.6869 13.2802 17.6869ZM4.80023 2.39985C4.53514 2.39985 4.32023 2.61476 4.32023 2.87985C4.32023 3.14495 4.53514 3.35985 4.80023 3.35985H12.0002C12.2653 3.35985 12.4802 3.14495 12.4802 2.87985C12.4802 2.61476 12.2653 2.39985 12.0002 2.39985H4.80023ZM4.32023 5.27986C4.32023 5.01476 4.53514 4.79985 4.80023 4.79985H9.12024C9.38533 4.79985 9.60024 5.01476 9.60024 5.27986C9.60024 5.54495 9.38533 5.75985 9.12024 5.75985H4.80023C4.53514 5.75985 4.32023 5.54495 4.32023 5.27986Z" fill="#0066BE" fill-opacity="0.6" />
                        </g>
                        <defs>
                          <clipPath id="clip0_3664_570">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p>Analytics</p>
                    </Link>
                  </li>
                </ul>
              ) :
              window.location.pathname == "/webinar/invitees" ||
                window.location.pathname == "/webinar/registration" ||
                window.location.pathname == "/webinar/email" ||
                window.location.pathname == "/webinar/live-stream" ||
                window.location.pathname == "/webinar/live-stream/polls-layout" ||  window.location.pathname == "/survey/question-data" ||   window.location.pathname == "/webinar/live-stream/chat-link" ||
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                          <path d="M14.483 4.36793C15.5927 5.0637 16.3708 6.24109 16.5125 7.60777C16.965 7.81923 17.4673 7.94083 17.9999 7.94083C19.944 7.94083 21.5197 6.36509 21.5197 4.42125C21.5197 2.47711 19.944 0.901367 17.9999 0.901367C16.0743 0.901966 14.5123 2.44955 14.483 4.36793ZM12.177 11.5748C14.1212 11.5748 15.6969 9.99878 15.6969 8.05494C15.6969 6.1111 14.1209 4.53536 12.177 4.53536C10.2332 4.53536 8.65653 6.1114 8.65653 8.05524C8.65653 9.99908 10.2332 11.5748 12.177 11.5748ZM13.6701 11.8147H10.6833C8.19828 11.8147 6.17656 13.8367 6.17656 16.3218V19.9744L6.18585 20.0316L6.43744 20.1104C8.80899 20.8513 10.8693 21.0984 12.5652 21.0984C15.8775 21.0984 17.7974 20.1541 17.9157 20.0939L18.1508 19.975H18.176V16.3218C18.1769 13.8367 16.1551 11.8147 13.6701 11.8147ZM19.4935 8.18104H16.5298C16.4978 9.36681 15.9916 10.4346 15.191 11.2025C17.3999 11.8594 19.0161 13.9077 19.0161 16.3272V17.4528C21.9423 17.3455 23.6286 16.5162 23.7397 16.4605L23.9748 16.3413H24V12.6875C24 10.2028 21.9783 8.18104 19.4935 8.18104ZM6.00075 7.94143C6.68933 7.94143 7.32999 7.74045 7.87271 7.39811C8.04523 6.27284 8.64845 5.28954 9.51015 4.61982C9.51374 4.55393 9.52003 4.48864 9.52003 4.42215C9.52003 2.47801 7.94399 0.902266 6.00075 0.902266C4.05631 0.902266 2.48087 2.47801 2.48087 4.42215C2.48087 6.36539 4.05631 7.94143 6.00075 7.94143ZM9.16181 11.2025C8.36511 10.4385 7.86073 9.3764 7.82389 8.19781C7.71396 8.18972 7.60524 8.18104 7.49322 8.18104H4.50678C2.02171 8.18104 0 10.2028 0 12.6875V16.3407L0.00928491 16.397L0.260876 16.4764C2.16338 17.0703 3.86133 17.344 5.33613 17.4303V16.3272C5.33673 13.9077 6.9523 11.86 9.16181 11.2025Z" fill="#0066BE" fill-opacity="0.6" />
                        </svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M13.3806 5.37989C13.3806 5.86588 12.9866 6.25991 12.5006 6.25991C12.0146 6.25991 11.6204 5.86595 11.6204 5.37997C11.6204 4.89398 12.0146 4.49995 12.5006 4.49995C12.9865 4.49995 13.3806 4.89391 13.3806 5.37989Z" fill="#0066BE" />
                          <path d="M12.1271 6.31989H12.8738C13.4951 6.31989 14.0006 6.82542 14.0004 7.44671V8.36005H13.9941L13.9353 8.38978C13.9057 8.40483 13.4257 8.64093 12.5976 8.64093C12.1736 8.64093 11.6585 8.57915 11.0656 8.3939L11.0027 8.3742L11.0004 8.3599V7.44671C11.0004 6.82542 11.5058 6.31989 12.1271 6.31989Z" fill="#0066BE" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00077 2.28563C3.00082 1.0233 4.06477 0 5.3772 0H19.6236C20.936 0 22 1.02335 22 2.28571V21.7143C22 22.9767 20.936 24 19.6236 24H5.37643C4.06393 24 2.99995 22.9766 3 21.7142L3.00077 2.28563ZM19.477 13.7821C19.3832 13.8759 19.256 13.9286 19.1233 13.9286H6.11544C5.98275 13.9286 5.8555 13.8759 5.76167 13.7821C5.66785 13.6884 5.61514 13.5612 5.61514 13.4286C5.61514 13.296 5.66785 13.1688 5.76167 13.075C5.8555 12.9813 5.98275 12.9286 6.11544 12.9286H19.1233C19.256 12.9286 19.3832 12.9813 19.477 13.075C19.5709 13.1688 19.6236 13.296 19.6236 13.4286C19.6236 13.5612 19.5709 13.6884 19.477 13.7821ZM5.76167 16.7821C5.8555 16.8759 5.98275 16.9286 6.11544 16.9286H19.1233C19.256 16.9286 19.3832 16.8759 19.477 16.7821C19.5709 16.6884 19.6236 16.5612 19.6236 16.4286C19.6236 16.296 19.5709 16.1688 19.477 16.075C19.3832 15.9813 19.256 15.9286 19.1233 15.9286H6.11544C5.98275 15.9286 5.8555 15.9813 5.76167 16.075C5.66785 16.1688 5.61514 16.296 5.61514 16.4286C5.61514 16.5612 5.66785 16.6884 5.76167 16.7821ZM12.5 10C14.433 10 16 8.433 16 6.5C16 4.567 14.433 3 12.5 3C10.567 3 9 4.567 9 6.5C9 8.433 10.567 10 12.5 10ZM10 19C9.44772 19 9 19.4477 9 20C9 20.5523 9.44771 21 10 21H15C15.5523 21 16 20.5523 16 20C16 19.4477 15.5523 19 15 19H10Z" fill="#0066BE" fill-opacity="0.6" />
                        </svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M23.92 5.28516L12.8457 11.868C12.5899 12.0144 12.3004 12.0913 12.0057 12.0913C11.711 12.0913 11.4215 12.0144 11.1657 11.868L0.0799999 5.28516C0.0270091 5.51376 0.000170336 5.74764 0 5.9823V17.1594C0 17.9505 0.314264 18.7092 0.873659 19.2686C1.43305 19.828 2.19175 20.1423 2.98286 20.1423H21.0171C21.8082 20.1423 22.5669 19.828 23.1263 19.2686C23.6857 18.7092 24 17.9505 24 17.1594V5.9823C23.9998 5.74764 23.973 5.51376 23.92 5.28516Z" fill="#0066BE" fill-opacity="0.6" />
                          <path d="M12.2745 10.92L23.4517 4.26857C23.1772 3.87765 22.8128 3.55839 22.3891 3.33763C21.9655 3.11687 21.4951 3.00108 21.0174 3H2.98311C2.50543 3.00108 2.03499 3.11687 1.61138 3.33763C1.18776 3.55839 0.823359 3.87765 0.548828 4.26857L11.7374 10.92C11.8198 10.965 11.9121 10.9886 12.006 10.9886C12.0998 10.9886 12.1922 10.965 12.2745 10.92Z" fill="#0066BE" fill-opacity="0.6" />
                        </svg>
                        <p>Email</p>
                      </Link>
                    </li>

                 {/* <li
                      className={
                        location.pathname == "/webinar/live-stream" || location.pathname == "/webinar/polls-layout"
                          ? "active sub-links"
                          : "side_li sub-links"
                      }
                    // className="active sub-links"
                    >
                      <Link to={"/webinar/live-stream"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="480" viewBox="0 0 512 480">
                          <path id="Color_Fill_1" data-name="Color Fill 1" class="cls-1" d="M150,16h30V46H512V166H180v30H332V316H180v30H452V466H180v30H150V16ZM52,46l21,1v1h4v1l6,1v1l6,2v1h2v1l3,1,1,2h2l6,7,5,4v2l2,1v2l2,1q1,3,2,6h1v2h1q0.5,3,1,6c1.535,4.144,5.108,17.823,3,25h-1v5h-1v4h-1v3h-1v3h-1v2h-1q-1,3-2,6l-2,1v2l-2,1v2l-8,7-3,4H95l-1,2H92l-1,2-6,2v1H83v1H80v1H77v1H73v1H68v1c-6.371,1.825-24.041-1.434-28-3v-1H37v-1H35v-1l-6-2-1-2H26l-1-2H23l-7-8-4-3v-2l-2-1v-2l-2-1-2-6H5v-2H4L2,119c-1.21-3.727-3.795-14.844-2-21H1V93H2V89H3V86H4V83H5V81H6l2-6,2-1V72l2-1V69l4-3,7-8h2l1-2h2l1-2h2V53h2V52h2V51Zm3,30-9,3v1H44l-1,2H41l-1,2-4,3v2l-2,1-1,4H32v3H31v4H30c-2.018,6.879,2.1,15.6,4,19v2l2,1v2l2,1,3,4h2l1,2h2v1h2v1h3c2.813,1.058,8.9,3.558,14,2,10.324-3.156,18.958-8.669,23-18l1-7h1c1.506-5.133-.906-11.157-2-14V94c-4.089-9.243-12.632-14.951-23-18H55Zm125,0v60H482V76H180ZM52,196l21,1v1h4v1l6,1v1l6,2v1h2v1l3,1,1,2h2l6,7,5,4v2l2,1v2l2,1q1,3,2,6h1v2h1q0.5,3,1,6c1.535,4.144,5.108,17.823,3,25h-1v5h-1v4h-1v3h-1v3h-1v2h-1l-2,6-2,1v2l-2,1v2l-8,7-3,4H95l-1,2H92l-1,2-6,2v1H83v1H80v1H77v1H73v1H68v1c-6.371,1.825-24.041-1.434-28-3v-1H37v-1H35v-1l-6-2-1-2H26l-1-2H23l-7-8-4-3v-2l-2-1v-2l-2-1-2-6H5v-2H4L2,269c-1.21-3.727-3.795-14.844-2-21H1v-5H2v-4H3v-3H4v-3H5v-2H6l2-6,2-1v-2l2-1v-2l4-3,7-8h2l1-2h2l1-2h2v-1h2v-1h2v-1Zm3,30-9,3v1H44l-1,2H41l-1,2-4,3v2l-2,1-1,4H32v3H31v4H30c-2.018,6.879,2.1,15.6,4,19v2l2,1v2l2,1,3,4h2l1,2h2v1h2v1h3c2.813,1.058,8.9,3.558,14,2,10.324-3.156,18.958-8.669,23-18l1-7h1c1.506-5.133-.906-11.157-2-14v-3c-4.089-9.243-12.632-14.951-23-18H55Zm125,0v60H302V226H180ZM52,346l21,1v1h4v1l6,1v1l6,2v1h2v1l3,1,1,2h2l6,7,5,4v2l2,1v2l2,1,2,6h1v2h1q0.5,3,1,6c1.535,4.144,5.108,17.823,3,25h-1v5h-1v4h-1v3h-1v3h-1v2h-1l-2,6-2,1v2l-2,1v2l-8,7-3,4H95l-1,2H92l-1,2-6,2v1H83v1H80v1H77v1H73v1H68v1c-6.371,1.825-24.041-1.434-28-3v-1H37v-1H35v-1l-6-2-1-2H26l-1-2H23l-7-8-4-3v-2l-2-1v-2l-2-1-2-6H5v-2H4L2,419c-1.21-3.727-3.795-14.844-2-21H1v-5H2v-4H3v-3H4v-3H5v-2H6l2-6,2-1v-2l2-1v-2l4-3,7-8h2l1-2h2l1-2h2v-1h2v-1h2v-1Zm3,30-9,3v1H44l-1,2H41l-1,2-4,3v2l-2,1-1,4H32v3H31v4H30c-2.018,6.879,2.1,15.6,4,19v2l2,1v2l2,1,3,4h2l1,2h2v1h2v1h3c2.813,1.058,8.9,3.558,14,2,10.324-3.156,18.958-8.669,23-18l1-7h1c1.506-5.133-.906-11.157-2-14v-3c-4.089-9.243-12.632-14.951-23-18H55Zm125,0v60H422V376H180Z" transform="translate(0 -16)" fill="#0066be" fill-opacity="0.6" />
                        </svg>
                        <p>Live Stream</p>
                      </Link>
                      <div className="left-sidebar-secondary">
                        <div className="sidebar-menu-secondary">
                          <ul>
                            <li className="side_li">
                              <a href="/webinar/live-stream">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M23.92 5.28516L12.8457 11.868C12.5899 12.0144 12.3004 12.0913 12.0057 12.0913C11.711 12.0913 11.4215 12.0144 11.1657 11.868L0.0799999 5.28516C0.0270091 5.51376 0.000170336 5.74764 0 5.9823V17.1594C0 17.9505 0.314264 18.7092 0.873659 19.2686C1.43305 19.828 2.19175 20.1423 2.98286 20.1423H21.0171C21.8082 20.1423 22.5669 19.828 23.1263 19.2686C23.6857 18.7092 24 17.9505 24 17.1594V5.9823C23.9998 5.74764 23.973 5.51376 23.92 5.28516Z" fill="#0066BE" fill-opacity="0.6"></path><path d="M12.2745 10.92L23.4517 4.26857C23.1772 3.87765 22.8128 3.55839 22.3891 3.33763C21.9655 3.11687 21.4951 3.00108 21.0174 3H2.98311C2.50543 3.00108 2.03499 3.11687 1.61138 3.33763C1.18776 3.55839 0.823359 3.87765 0.548828 4.26857L11.7374 10.92C11.8198 10.965 11.9121 10.9886 12.006 10.9886C12.0998 10.9886 12.1922 10.965 12.2745 10.92Z" fill="#0066BE" fill-opacity="0.6"></path></svg>
                                <p>Live Stream</p>
                              </a>
                            </li>
                            <li className="side_li">
                              <a href="/webinar/live-stream">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <g clip-path="url(#clip0_3765_722)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7219 5.36932C23.0133 7.3423 23.6998 9.65809 23.695 12.0253L23.6973 24H11.6777C9.34088 23.9661 7.06621 23.2328 5.13982 21.8926C3.21344 20.5524 1.72141 18.6649 0.851458 16.4679C-0.0184992 14.2708 -0.22752 11.8621 0.250693 9.54499C0.728906 7.22785 1.87299 5.10574 3.539 3.44564C5.20501 1.78553 7.31853 0.661605 9.61363 0.215259C11.9087 -0.231086 14.2829 0.0200908 16.4374 0.937188C18.5919 1.85429 20.4305 3.39633 21.7219 5.36932ZM6.55671 3.89894C8.1393 2.82781 9.99993 2.2561 11.9033 2.2561C14.4556 2.2561 16.9035 3.28312 18.7082 5.11123C20.513 6.93933 21.5269 9.41877 21.5269 12.0041C21.5269 13.9321 20.9625 15.8167 19.905 17.4198C18.8476 19.0228 17.3446 20.2723 15.5861 21.0101C13.8276 21.7479 11.8926 21.9409 10.0258 21.5648C8.15903 21.1887 6.44427 20.2603 5.09838 18.897C3.75249 17.5337 2.83593 15.7968 2.4646 13.9058C2.09327 12.0149 2.28385 10.0549 3.01224 8.2737C3.74063 6.49249 4.97411 4.97006 6.55671 3.89894ZM17.6328 17.4189C16.2937 18.8781 14.4602 19.7718 12.4988 19.9213C12.3399 19.932 12.1806 19.9072 12.0323 19.8486C11.8839 19.7899 11.7501 19.6989 11.6404 19.5819C11.1222 19.0334 10.7939 18.3292 10.705 17.5753C10.6161 16.8214 10.7713 16.0587 11.1473 15.4019L12.2895 16.1889L11.552 12.5531L8.21623 13.4391L9.32351 14.146C8.729 15.1445 8.45585 16.3056 8.5419 17.4683C8.59063 18.1308 8.75691 18.779 9.03273 19.3817C8.05419 18.9893 7.16368 18.4014 6.41433 17.6529C5.66498 16.9044 5.07213 16.0107 4.67115 15.0251C4.27017 14.0395 4.06928 12.9822 4.08045 11.9162C4.09163 10.8503 4.31464 9.7975 4.73619 8.82074C4.82188 8.62645 4.95025 8.45455 5.11151 8.31816C5.27277 8.18177 5.46266 8.08449 5.66668 8.03374C6.39415 7.85313 7.15983 7.91624 7.8489 8.21362C8.53797 8.51099 9.11332 9.0266 9.48868 9.68315L8.24414 10.2911L11.7102 11.4692L12.6175 8.09736L11.4543 8.71235C11.0075 7.89252 10.3642 7.19974 9.58369 6.6978C8.80319 6.19585 7.91055 5.90088 6.98798 5.84003C7.82448 5.15808 8.7906 4.65781 9.8262 4.37034C10.8618 4.08287 11.9447 4.01437 13.0076 4.16908C14.0704 4.3238 15.0905 4.69843 16.0043 5.26965C16.918 5.84088 17.706 6.59648 18.319 7.48944C18.4273 7.64535 18.4993 7.82411 18.5295 8.01226C18.5597 8.20041 18.5474 8.39305 18.4935 8.57569C18.2799 9.30248 17.8412 9.94042 17.2422 10.3953C16.6432 10.8501 15.9156 11.0978 15.167 11.1016L15.2694 9.70435L12.5314 12.1525L14.96 14.6337L15.0158 13.3048C15.924 13.324 16.8228 13.1158 17.6324 12.6986C18.442 12.2814 19.1373 11.6681 19.6566 10.9131C19.7076 11.2816 19.7325 11.6533 19.7311 12.0253C19.7356 14.0309 18.9872 15.9632 17.6375 17.4306L17.6328 17.4189Z" fill="#0066BE" fill-opacity="0.6" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3765_722">
                                      <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <p>Speaker Zone</p>
                              </a>
                            </li>
                            <li className={isActivePolls ? 'active' : 'side_li'}
                            // className="side_li"
                            >
                              <a href="/webinar/polls-layout">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <g clip-path="url(#clip0_3761_88)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.499864 0L1 3.9837e-06H1.50015C1.7763 3.9837e-06 2 0.223861 2 0.500003V0.999988H16.3937C16.7272 0.999988 17 1.24225 17 1.53835V4.46163C17 4.76311 16.7272 4.99999 16.3937 4.99999H2V9.99999H14.3207C14.7011 9.99999 15 10.2369 15 10.5383V13.4616C15 13.7577 14.7011 14 14.3207 14H2V19H11.273C11.6728 19 12 19.2419 12 19.5376V22.4624C12 22.7581 11.6728 23 11.273 23H2V23.5C2 23.7761 1.7763 24 1.50015 24H1H0.499847C0.223704 24 0 23.7761 0 23.5V0.500006C0 0.223857 0.223715 -4.27361e-06 0.499864 0Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M21.3807 2.79292C22.152 2.79292 22.7772 2.16763 22.7772 1.3964C22.7772 0.625179 22.1519 0 21.3807 0C20.6095 0 19.9839 0.625297 19.9839 1.39652C19.9839 2.16775 20.6095 2.79292 21.3807 2.79292ZM21.9731 2.88811H20.7881C19.8021 2.88811 19 3.69035 19 4.6763L19.01 5.55402L19.0137 5.57672L19.1135 5.60797C20.0544 5.90196 20.8719 6 21.5447 6C22.8589 6 23.6206 5.62532 23.6675 5.60144L23.7608 5.55426H23.7708L23.7608 4.6763C23.7611 3.69035 22.959 2.88811 21.9731 2.88811Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M21.3807 11.7929C22.152 11.7929 22.7772 11.1676 22.7772 10.3964C22.7772 9.62518 22.1519 9 21.3807 9C20.6095 9 19.9839 9.6253 19.9839 10.3965C19.9839 11.1677 20.6095 11.7929 21.3807 11.7929ZM21.9731 11.8881H20.7881C19.8021 11.8881 19 12.6903 19 13.6763L19.01 14.554L19.0137 14.5767L19.1135 14.608C20.0544 14.902 20.8719 15 21.5447 15C22.8589 15 23.6206 14.6253 23.6675 14.6014L23.7608 14.5543H23.7708L23.7608 13.6763C23.7611 12.6903 22.959 11.8881 21.9731 11.8881Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M21.3807 19.7929C22.152 19.7929 22.7772 19.1676 22.7772 18.3964C22.7772 17.6252 22.1519 17 21.3807 17C20.6095 17 19.9839 17.6253 19.9839 18.3965C19.9839 19.1677 20.6095 19.7929 21.3807 19.7929ZM21.9731 19.8881H20.7881C19.8021 19.8881 19 20.6903 19 21.6763L19.01 22.554L19.0137 22.5767L19.1135 22.608C20.0544 22.902 20.8719 23 21.5447 23C22.8589 23 23.6206 22.6253 23.6675 22.6014L23.7608 22.5543H23.7708L23.7608 21.6763C23.7611 20.6903 22.959 19.8881 21.9731 19.8881Z" fill="#0066BE" fill-opacity="0.6" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3761_88">
                                      <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <p>Polls</p>
                              </a>
                            </li>
                            <li className={isActiveContact ? 'active' : 'side_li'}
                            // className="side_li"
                            >
                              <a href="/webinar/contact-dm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <g clip-path="url(#clip0_3761_84)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 11C8.53757 11 11 8.53757 11 5.5C11 2.46243 8.53757 0 5.5 0C2.46243 0 0 2.46243 0 5.5C0 8.53757 2.46243 11 5.5 11ZM6.80506 3.72185C6.80506 4.39667 6.25803 4.9438 5.5831 4.9438C4.90828 4.9438 4.36094 4.39677 4.36094 3.72195C4.36094 3.04713 4.90828 2.5 5.5831 2.5C6.25792 2.5 6.80506 3.04703 6.80506 3.72185ZM5.06456 5.02709H6.10143C6.96414 5.02709 7.666 5.72905 7.66568 6.59175V7.85998H7.65695L7.57533 7.90126C7.53426 7.92216 6.86775 8.25 5.71786 8.25C5.12913 8.25 4.41387 8.16422 3.59057 7.90698L3.50322 7.87963L3.5 7.85977V6.59175C3.5 5.72905 4.20185 5.02709 5.06456 5.02709Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M13 2.5C13 2.22386 13.2239 2 13.5 2H18.5C18.7761 2 19 2.22386 19 2.5C19 2.77614 18.7761 3 18.5 3H13.5C13.2239 3 13 2.77614 13 2.5Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M13.5 5C13.2239 5 13 5.22386 13 5.5C13 5.77614 13.2239 6 13.5 6H23.5C23.7761 6 24 5.77614 24 5.5C24 5.22386 23.7761 5 23.5 5H13.5Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M13 8.5C13 8.22386 13.2239 8 13.5 8H23.5C23.7761 8 24 8.22386 24 8.5C24 8.77614 23.7761 9 23.5 9H13.5C13.2239 9 13 8.77614 13 8.5Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 24C8.53757 24 11 21.5376 11 18.5C11 15.4624 8.53757 13 5.5 13C2.46243 13 0 15.4624 0 18.5C0 21.5376 2.46243 24 5.5 24ZM6.80506 16.7218C6.80506 17.3967 6.25803 17.9438 5.5831 17.9438C4.90828 17.9438 4.36094 17.3968 4.36094 16.722C4.36094 16.0471 4.90828 15.5 5.5831 15.5C6.25792 15.5 6.80506 16.047 6.80506 16.7218ZM5.06456 18.0271H6.10143C6.96414 18.0271 7.666 18.729 7.66568 19.5918V20.86H7.65695L7.57533 20.9013C7.53426 20.9222 6.86775 21.25 5.71786 21.25C5.12913 21.25 4.41387 21.1642 3.59057 20.907L3.50322 20.8796L3.5 20.8598V19.5918C3.5 18.729 4.20185 18.0271 5.06456 18.0271Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M13 15.5C13 15.2239 13.2239 15 13.5 15H18.5C18.7761 15 19 15.2239 19 15.5C19 15.7761 18.7761 16 18.5 16H13.5C13.2239 16 13 15.7761 13 15.5Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M13.5 18C13.2239 18 13 18.2239 13 18.5C13 18.7761 13.2239 19 13.5 19H23.5C23.7761 19 24 18.7761 24 18.5C24 18.2239 23.7761 18 23.5 18H13.5Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M13 21.5C13 21.2239 13.2239 21 13.5 21H23.5C23.7761 21 24 21.2239 24 21.5C24 21.7761 23.7761 22 23.5 22H13.5C13.2239 22 13 21.7761 13 21.5Z" fill="#0066BE" fill-opacity="0.6" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3761_84">
                                      <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <p>Contact DM</p>
                              </a>
                            </li>
                            <li className="side_li">
                              <a href="/webinar/live-stream">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M23.92 5.28516L12.8457 11.868C12.5899 12.0144 12.3004 12.0913 12.0057 12.0913C11.711 12.0913 11.4215 12.0144 11.1657 11.868L0.0799999 5.28516C0.0270091 5.51376 0.000170336 5.74764 0 5.9823V17.1594C0 17.9505 0.314264 18.7092 0.873659 19.2686C1.43305 19.828 2.19175 20.1423 2.98286 20.1423H21.0171C21.8082 20.1423 22.5669 19.828 23.1263 19.2686C23.6857 18.7092 24 17.9505 24 17.1594V5.9823C23.9998 5.74764 23.973 5.51376 23.92 5.28516Z" fill="#0066BE" fill-opacity="0.6"></path><path d="M12.2745 10.92L23.4517 4.26857C23.1772 3.87765 22.8128 3.55839 22.3891 3.33763C21.9655 3.11687 21.4951 3.00108 21.0174 3H2.98311C2.50543 3.00108 2.03499 3.11687 1.61138 3.33763C1.18776 3.55839 0.823359 3.87765 0.548828 4.26857L11.7374 10.92C11.8198 10.965 11.9121 10.9886 12.006 10.9886C12.0998 10.9886 12.1922 10.965 12.2745 10.92Z" fill="#0066BE" fill-opacity="0.6"></path></svg>
                                <p>Settings</p>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li> 

                     <li
                      className={
                        location.pathname == "/webinar/polls-layout"
                          ? "active sub-links"
                          : "side_li sub-links"
                      }
                    // className="active sub-links"
                    >
                      <Link to={"/webinar/polls-layout"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="480" viewBox="0 0 512 480">
                          <path id="Color_Fill_1" data-name="Color Fill 1" class="cls-1" d="M150,16h30V46H512V166H180v30H332V316H180v30H452V466H180v30H150V16ZM52,46l21,1v1h4v1l6,1v1l6,2v1h2v1l3,1,1,2h2l6,7,5,4v2l2,1v2l2,1q1,3,2,6h1v2h1q0.5,3,1,6c1.535,4.144,5.108,17.823,3,25h-1v5h-1v4h-1v3h-1v3h-1v2h-1q-1,3-2,6l-2,1v2l-2,1v2l-8,7-3,4H95l-1,2H92l-1,2-6,2v1H83v1H80v1H77v1H73v1H68v1c-6.371,1.825-24.041-1.434-28-3v-1H37v-1H35v-1l-6-2-1-2H26l-1-2H23l-7-8-4-3v-2l-2-1v-2l-2-1-2-6H5v-2H4L2,119c-1.21-3.727-3.795-14.844-2-21H1V93H2V89H3V86H4V83H5V81H6l2-6,2-1V72l2-1V69l4-3,7-8h2l1-2h2l1-2h2V53h2V52h2V51Zm3,30-9,3v1H44l-1,2H41l-1,2-4,3v2l-2,1-1,4H32v3H31v4H30c-2.018,6.879,2.1,15.6,4,19v2l2,1v2l2,1,3,4h2l1,2h2v1h2v1h3c2.813,1.058,8.9,3.558,14,2,10.324-3.156,18.958-8.669,23-18l1-7h1c1.506-5.133-.906-11.157-2-14V94c-4.089-9.243-12.632-14.951-23-18H55Zm125,0v60H482V76H180ZM52,196l21,1v1h4v1l6,1v1l6,2v1h2v1l3,1,1,2h2l6,7,5,4v2l2,1v2l2,1q1,3,2,6h1v2h1q0.5,3,1,6c1.535,4.144,5.108,17.823,3,25h-1v5h-1v4h-1v3h-1v3h-1v2h-1l-2,6-2,1v2l-2,1v2l-8,7-3,4H95l-1,2H92l-1,2-6,2v1H83v1H80v1H77v1H73v1H68v1c-6.371,1.825-24.041-1.434-28-3v-1H37v-1H35v-1l-6-2-1-2H26l-1-2H23l-7-8-4-3v-2l-2-1v-2l-2-1-2-6H5v-2H4L2,269c-1.21-3.727-3.795-14.844-2-21H1v-5H2v-4H3v-3H4v-3H5v-2H6l2-6,2-1v-2l2-1v-2l4-3,7-8h2l1-2h2l1-2h2v-1h2v-1h2v-1Zm3,30-9,3v1H44l-1,2H41l-1,2-4,3v2l-2,1-1,4H32v3H31v4H30c-2.018,6.879,2.1,15.6,4,19v2l2,1v2l2,1,3,4h2l1,2h2v1h2v1h3c2.813,1.058,8.9,3.558,14,2,10.324-3.156,18.958-8.669,23-18l1-7h1c1.506-5.133-.906-11.157-2-14v-3c-4.089-9.243-12.632-14.951-23-18H55Zm125,0v60H302V226H180ZM52,346l21,1v1h4v1l6,1v1l6,2v1h2v1l3,1,1,2h2l6,7,5,4v2l2,1v2l2,1,2,6h1v2h1q0.5,3,1,6c1.535,4.144,5.108,17.823,3,25h-1v5h-1v4h-1v3h-1v3h-1v2h-1l-2,6-2,1v2l-2,1v2l-8,7-3,4H95l-1,2H92l-1,2-6,2v1H83v1H80v1H77v1H73v1H68v1c-6.371,1.825-24.041-1.434-28-3v-1H37v-1H35v-1l-6-2-1-2H26l-1-2H23l-7-8-4-3v-2l-2-1v-2l-2-1-2-6H5v-2H4L2,419c-1.21-3.727-3.795-14.844-2-21H1v-5H2v-4H3v-3H4v-3H5v-2H6l2-6,2-1v-2l2-1v-2l4-3,7-8h2l1-2h2l1-2h2v-1h2v-1h2v-1Zm3,30-9,3v1H44l-1,2H41l-1,2-4,3v2l-2,1-1,4H32v3H31v4H30c-2.018,6.879,2.1,15.6,4,19v2l2,1v2l2,1,3,4h2l1,2h2v1h2v1h3c2.813,1.058,8.9,3.558,14,2,10.324-3.156,18.958-8.669,23-18l1-7h1c1.506-5.133-.906-11.157-2-14v-3c-4.089-9.243-12.632-14.951-23-18H55Zm125,0v60H422V376H180Z" transform="translate(0 -16)" fill="#0066be" fill-opacity="0.6" />
                        </svg>
                        <p>Live Stream</p>
                      </Link>
                      <div className="left-sidebar-secondary">
                        <div className="sidebar-menu-secondary">
                          <ul>
                            <li className="side_li">
                              <a href="/webinar/polls-layout">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M23.92 5.28516L12.8457 11.868C12.5899 12.0144 12.3004 12.0913 12.0057 12.0913C11.711 12.0913 11.4215 12.0144 11.1657 11.868L0.0799999 5.28516C0.0270091 5.51376 0.000170336 5.74764 0 5.9823V17.1594C0 17.9505 0.314264 18.7092 0.873659 19.2686C1.43305 19.828 2.19175 20.1423 2.98286 20.1423H21.0171C21.8082 20.1423 22.5669 19.828 23.1263 19.2686C23.6857 18.7092 24 17.9505 24 17.1594V5.9823C23.9998 5.74764 23.973 5.51376 23.92 5.28516Z" fill="#0066BE" fill-opacity="0.6"></path><path d="M12.2745 10.92L23.4517 4.26857C23.1772 3.87765 22.8128 3.55839 22.3891 3.33763C21.9655 3.11687 21.4951 3.00108 21.0174 3H2.98311C2.50543 3.00108 2.03499 3.11687 1.61138 3.33763C1.18776 3.55839 0.823359 3.87765 0.548828 4.26857L11.7374 10.92C11.8198 10.965 11.9121 10.9886 12.006 10.9886C12.0998 10.9886 12.1922 10.965 12.2745 10.92Z" fill="#0066BE" fill-opacity="0.6"></path></svg>
                                <p>Live Stream</p>
                              </a>
                            </li>
                            <li className="side_li">
                              <a href="/webinar/polls-layout">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <g clip-path="url(#clip0_3765_722)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7219 5.36932C23.0133 7.3423 23.6998 9.65809 23.695 12.0253L23.6973 24H11.6777C9.34088 23.9661 7.06621 23.2328 5.13982 21.8926C3.21344 20.5524 1.72141 18.6649 0.851458 16.4679C-0.0184992 14.2708 -0.22752 11.8621 0.250693 9.54499C0.728906 7.22785 1.87299 5.10574 3.539 3.44564C5.20501 1.78553 7.31853 0.661605 9.61363 0.215259C11.9087 -0.231086 14.2829 0.0200908 16.4374 0.937188C18.5919 1.85429 20.4305 3.39633 21.7219 5.36932ZM6.55671 3.89894C8.1393 2.82781 9.99993 2.2561 11.9033 2.2561C14.4556 2.2561 16.9035 3.28312 18.7082 5.11123C20.513 6.93933 21.5269 9.41877 21.5269 12.0041C21.5269 13.9321 20.9625 15.8167 19.905 17.4198C18.8476 19.0228 17.3446 20.2723 15.5861 21.0101C13.8276 21.7479 11.8926 21.9409 10.0258 21.5648C8.15903 21.1887 6.44427 20.2603 5.09838 18.897C3.75249 17.5337 2.83593 15.7968 2.4646 13.9058C2.09327 12.0149 2.28385 10.0549 3.01224 8.2737C3.74063 6.49249 4.97411 4.97006 6.55671 3.89894ZM17.6328 17.4189C16.2937 18.8781 14.4602 19.7718 12.4988 19.9213C12.3399 19.932 12.1806 19.9072 12.0323 19.8486C11.8839 19.7899 11.7501 19.6989 11.6404 19.5819C11.1222 19.0334 10.7939 18.3292 10.705 17.5753C10.6161 16.8214 10.7713 16.0587 11.1473 15.4019L12.2895 16.1889L11.552 12.5531L8.21623 13.4391L9.32351 14.146C8.729 15.1445 8.45585 16.3056 8.5419 17.4683C8.59063 18.1308 8.75691 18.779 9.03273 19.3817C8.05419 18.9893 7.16368 18.4014 6.41433 17.6529C5.66498 16.9044 5.07213 16.0107 4.67115 15.0251C4.27017 14.0395 4.06928 12.9822 4.08045 11.9162C4.09163 10.8503 4.31464 9.7975 4.73619 8.82074C4.82188 8.62645 4.95025 8.45455 5.11151 8.31816C5.27277 8.18177 5.46266 8.08449 5.66668 8.03374C6.39415 7.85313 7.15983 7.91624 7.8489 8.21362C8.53797 8.51099 9.11332 9.0266 9.48868 9.68315L8.24414 10.2911L11.7102 11.4692L12.6175 8.09736L11.4543 8.71235C11.0075 7.89252 10.3642 7.19974 9.58369 6.6978C8.80319 6.19585 7.91055 5.90088 6.98798 5.84003C7.82448 5.15808 8.7906 4.65781 9.8262 4.37034C10.8618 4.08287 11.9447 4.01437 13.0076 4.16908C14.0704 4.3238 15.0905 4.69843 16.0043 5.26965C16.918 5.84088 17.706 6.59648 18.319 7.48944C18.4273 7.64535 18.4993 7.82411 18.5295 8.01226C18.5597 8.20041 18.5474 8.39305 18.4935 8.57569C18.2799 9.30248 17.8412 9.94042 17.2422 10.3953C16.6432 10.8501 15.9156 11.0978 15.167 11.1016L15.2694 9.70435L12.5314 12.1525L14.96 14.6337L15.0158 13.3048C15.924 13.324 16.8228 13.1158 17.6324 12.6986C18.442 12.2814 19.1373 11.6681 19.6566 10.9131C19.7076 11.2816 19.7325 11.6533 19.7311 12.0253C19.7356 14.0309 18.9872 15.9632 17.6375 17.4306L17.6328 17.4189Z" fill="#0066BE" fill-opacity="0.6" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3765_722">
                                      <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <p>Speaker Zone</p>
                              </a>
                            </li>
                            <li className={isActivePolls ? 'active' : 'side_li'}
                            // className="side_li"
                            >
                              <a href="/webinar/polls-layout">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <g clip-path="url(#clip0_3761_88)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.499864 0L1 3.9837e-06H1.50015C1.7763 3.9837e-06 2 0.223861 2 0.500003V0.999988H16.3937C16.7272 0.999988 17 1.24225 17 1.53835V4.46163C17 4.76311 16.7272 4.99999 16.3937 4.99999H2V9.99999H14.3207C14.7011 9.99999 15 10.2369 15 10.5383V13.4616C15 13.7577 14.7011 14 14.3207 14H2V19H11.273C11.6728 19 12 19.2419 12 19.5376V22.4624C12 22.7581 11.6728 23 11.273 23H2V23.5C2 23.7761 1.7763 24 1.50015 24H1H0.499847C0.223704 24 0 23.7761 0 23.5V0.500006C0 0.223857 0.223715 -4.27361e-06 0.499864 0Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M21.3807 2.79292C22.152 2.79292 22.7772 2.16763 22.7772 1.3964C22.7772 0.625179 22.1519 0 21.3807 0C20.6095 0 19.9839 0.625297 19.9839 1.39652C19.9839 2.16775 20.6095 2.79292 21.3807 2.79292ZM21.9731 2.88811H20.7881C19.8021 2.88811 19 3.69035 19 4.6763L19.01 5.55402L19.0137 5.57672L19.1135 5.60797C20.0544 5.90196 20.8719 6 21.5447 6C22.8589 6 23.6206 5.62532 23.6675 5.60144L23.7608 5.55426H23.7708L23.7608 4.6763C23.7611 3.69035 22.959 2.88811 21.9731 2.88811Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M21.3807 11.7929C22.152 11.7929 22.7772 11.1676 22.7772 10.3964C22.7772 9.62518 22.1519 9 21.3807 9C20.6095 9 19.9839 9.6253 19.9839 10.3965C19.9839 11.1677 20.6095 11.7929 21.3807 11.7929ZM21.9731 11.8881H20.7881C19.8021 11.8881 19 12.6903 19 13.6763L19.01 14.554L19.0137 14.5767L19.1135 14.608C20.0544 14.902 20.8719 15 21.5447 15C22.8589 15 23.6206 14.6253 23.6675 14.6014L23.7608 14.5543H23.7708L23.7608 13.6763C23.7611 12.6903 22.959 11.8881 21.9731 11.8881Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M21.3807 19.7929C22.152 19.7929 22.7772 19.1676 22.7772 18.3964C22.7772 17.6252 22.1519 17 21.3807 17C20.6095 17 19.9839 17.6253 19.9839 18.3965C19.9839 19.1677 20.6095 19.7929 21.3807 19.7929ZM21.9731 19.8881H20.7881C19.8021 19.8881 19 20.6903 19 21.6763L19.01 22.554L19.0137 22.5767L19.1135 22.608C20.0544 22.902 20.8719 23 21.5447 23C22.8589 23 23.6206 22.6253 23.6675 22.6014L23.7608 22.5543H23.7708L23.7608 21.6763C23.7611 20.6903 22.959 19.8881 21.9731 19.8881Z" fill="#0066BE" fill-opacity="0.6" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3761_88">
                                      <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <p>Polls</p>
                              </a>
                            </li>
                            <li className={isActiveContact ? 'active' : 'side_li'}
                            // className="side_li"
                            >
                              <a href="/webinar/contact-dm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <g clip-path="url(#clip0_3761_84)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 11C8.53757 11 11 8.53757 11 5.5C11 2.46243 8.53757 0 5.5 0C2.46243 0 0 2.46243 0 5.5C0 8.53757 2.46243 11 5.5 11ZM6.80506 3.72185C6.80506 4.39667 6.25803 4.9438 5.5831 4.9438C4.90828 4.9438 4.36094 4.39677 4.36094 3.72195C4.36094 3.04713 4.90828 2.5 5.5831 2.5C6.25792 2.5 6.80506 3.04703 6.80506 3.72185ZM5.06456 5.02709H6.10143C6.96414 5.02709 7.666 5.72905 7.66568 6.59175V7.85998H7.65695L7.57533 7.90126C7.53426 7.92216 6.86775 8.25 5.71786 8.25C5.12913 8.25 4.41387 8.16422 3.59057 7.90698L3.50322 7.87963L3.5 7.85977V6.59175C3.5 5.72905 4.20185 5.02709 5.06456 5.02709Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M13 2.5C13 2.22386 13.2239 2 13.5 2H18.5C18.7761 2 19 2.22386 19 2.5C19 2.77614 18.7761 3 18.5 3H13.5C13.2239 3 13 2.77614 13 2.5Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M13.5 5C13.2239 5 13 5.22386 13 5.5C13 5.77614 13.2239 6 13.5 6H23.5C23.7761 6 24 5.77614 24 5.5C24 5.22386 23.7761 5 23.5 5H13.5Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M13 8.5C13 8.22386 13.2239 8 13.5 8H23.5C23.7761 8 24 8.22386 24 8.5C24 8.77614 23.7761 9 23.5 9H13.5C13.2239 9 13 8.77614 13 8.5Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 24C8.53757 24 11 21.5376 11 18.5C11 15.4624 8.53757 13 5.5 13C2.46243 13 0 15.4624 0 18.5C0 21.5376 2.46243 24 5.5 24ZM6.80506 16.7218C6.80506 17.3967 6.25803 17.9438 5.5831 17.9438C4.90828 17.9438 4.36094 17.3968 4.36094 16.722C4.36094 16.0471 4.90828 15.5 5.5831 15.5C6.25792 15.5 6.80506 16.047 6.80506 16.7218ZM5.06456 18.0271H6.10143C6.96414 18.0271 7.666 18.729 7.66568 19.5918V20.86H7.65695L7.57533 20.9013C7.53426 20.9222 6.86775 21.25 5.71786 21.25C5.12913 21.25 4.41387 21.1642 3.59057 20.907L3.50322 20.8796L3.5 20.8598V19.5918C3.5 18.729 4.20185 18.0271 5.06456 18.0271Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M13 15.5C13 15.2239 13.2239 15 13.5 15H18.5C18.7761 15 19 15.2239 19 15.5C19 15.7761 18.7761 16 18.5 16H13.5C13.2239 16 13 15.7761 13 15.5Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M13.5 18C13.2239 18 13 18.2239 13 18.5C13 18.7761 13.2239 19 13.5 19H23.5C23.7761 19 24 18.7761 24 18.5C24 18.2239 23.7761 18 23.5 18H13.5Z" fill="#0066BE" fill-opacity="0.6" />
                                    <path d="M13 21.5C13 21.2239 13.2239 21 13.5 21H23.5C23.7761 21 24 21.2239 24 21.5C24 21.7761 23.7761 22 23.5 22H13.5C13.2239 22 13 21.7761 13 21.5Z" fill="#0066BE" fill-opacity="0.6" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3761_84">
                                      <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <p>Contact DM</p>
                              </a>
                            </li>
                            <li className="side_li">
                              <a href="/webinar/polls-layout">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M23.92 5.28516L12.8457 11.868C12.5899 12.0144 12.3004 12.0913 12.0057 12.0913C11.711 12.0913 11.4215 12.0144 11.1657 11.868L0.0799999 5.28516C0.0270091 5.51376 0.000170336 5.74764 0 5.9823V17.1594C0 17.9505 0.314264 18.7092 0.873659 19.2686C1.43305 19.828 2.19175 20.1423 2.98286 20.1423H21.0171C21.8082 20.1423 22.5669 19.828 23.1263 19.2686C23.6857 18.7092 24 17.9505 24 17.1594V5.9823C23.9998 5.74764 23.973 5.51376 23.92 5.28516Z" fill="#0066BE" fill-opacity="0.6"></path><path d="M12.2745 10.92L23.4517 4.26857C23.1772 3.87765 22.8128 3.55839 22.3891 3.33763C21.9655 3.11687 21.4951 3.00108 21.0174 3H2.98311C2.50543 3.00108 2.03499 3.11687 1.61138 3.33763C1.18776 3.55839 0.823359 3.87765 0.548828 4.26857L11.7374 10.92C11.8198 10.965 11.9121 10.9886 12.006 10.9886C12.0998 10.9886 12.1922 10.965 12.2745 10.92Z" fill="#0066BE" fill-opacity="0.6"></path></svg>
                                <p>Settings</p>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>  */}

                    <li
                      className={
                        location.pathname == "/analytics"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to={"/analytics"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <g clip-path="url(#clip0_3664_570)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.3501 -0.000184536C1.05701 -0.000184536 0.00873796 1.02311 0.00868875 2.28544L-0.00488281 21.7141C-0.00493202 22.9765 1.04337 23.9999 2.33653 23.9999H21.6525C22.9456 23.9999 23.9939 22.9765 23.9939 21.7141V2.27992C23.9939 1.01755 22.9456 -0.00579691 21.6525 -0.00579691L2.3501 -0.000184536ZM17.1602 4.79985H19.3202C19.4157 4.79985 19.5073 4.76193 19.5748 4.69441C19.6423 4.6269 19.6802 4.53533 19.6802 4.43986C19.6802 3.77151 19.4147 3.13054 18.9421 2.65795C18.4695 2.18535 17.8286 1.91985 17.1602 1.91985C17.0648 1.91985 16.9732 1.95778 16.9057 2.0253C16.8382 2.09281 16.8002 2.18438 16.8002 2.27985V4.26345C16.8002 4.63786 16.9622 4.79985 17.1602 4.79985ZM14.1477 7.47537C13.8663 7.19687 13.6592 6.85224 13.5453 6.473C13.4304 6.09522 13.4094 5.6951 13.484 5.30735C13.5587 4.9196 13.7267 4.55592 13.9737 4.24786C14.1991 3.96986 14.4838 3.74583 14.807 3.59218C15.1301 3.43853 15.4836 3.35915 15.8414 3.35986C15.9323 3.35986 16.0194 3.39598 16.0837 3.46028C16.1479 3.52458 16.1841 3.61178 16.1841 3.70272V4.90272C16.1841 5.03911 16.2382 5.16992 16.3346 5.26637C16.431 5.36282 16.5618 5.417 16.6981 5.417H17.8975C17.9884 5.417 18.0756 5.45312 18.1399 5.51742C18.2041 5.58172 18.2402 5.66893 18.2402 5.75986C18.2402 6.39638 17.9875 7.00682 17.5376 7.45691C17.0877 7.907 16.4776 8.15985 15.8414 8.15985C15.6098 8.16011 15.3792 8.12898 15.156 8.06728C14.7757 7.95739 14.429 7.75388 14.1477 7.47537ZM17.1202 11.3477C17.121 10.6478 17.6937 10.0806 18.4002 10.0799C19.1071 10.0799 19.6802 10.6475 19.6802 11.3477C19.6802 12.0479 19.1071 12.6156 18.4002 12.6156C18.1618 12.6148 17.9285 12.5475 17.7271 12.4213L15.404 13.7893C15.4049 13.802 15.4067 13.8145 15.4084 13.827C15.411 13.8456 15.4135 13.8642 15.4135 13.8834C15.4143 14.5292 14.9243 15.072 14.2763 15.1435C13.6284 15.215 13.0298 14.7922 12.887 14.1621L10.7446 13.1111C10.3476 13.4922 9.74541 13.5703 9.2626 13.3036L6.79447 15.1282C6.8501 15.2704 6.87916 15.4213 6.88026 15.5739C6.88026 16.2741 6.30713 16.8418 5.60026 16.8418C4.89338 16.8418 4.32026 16.2741 4.32026 15.5739C4.32026 14.8736 4.89338 14.3061 5.60026 14.3061C5.82588 14.3073 6.04713 14.3683 6.24088 14.4827L8.68463 12.6762C8.48604 12.2022 8.59557 11.6565 8.96213 11.2937C9.32854 10.9309 9.87963 10.8227 10.3581 11.0196C10.8365 11.2166 11.1479 11.6797 11.147 12.1929C11.1449 12.2478 11.1395 12.3026 11.1303 12.3569L13.0142 13.2812C13.2065 12.924 13.5606 12.6804 13.9657 12.6267C14.3707 12.573 14.7771 12.7157 15.0574 13.0102L17.1934 11.7526C17.1466 11.6226 17.122 11.4858 17.1202 11.3477ZM17.547 15.1513H19.2535C19.4892 15.1513 19.6803 15.3406 19.6803 15.5739L19.6802 21.6572C19.6802 21.8906 19.4891 22.0799 19.2535 22.0799H17.5469C17.3113 22.0799 17.1202 21.8906 17.1202 21.6572L17.1203 15.5739C17.1203 15.3406 17.3114 15.1513 17.547 15.1513ZM10.7203 15.9965H9.01357C8.77794 15.9965 8.58701 16.1857 8.58701 16.4191L8.58698 21.6572C8.58698 21.8906 8.77792 22.0798 9.01354 22.0798H10.7203C10.9559 22.0798 11.147 21.8906 11.147 21.6572L11.147 16.4191C11.147 16.1857 10.9559 15.9965 10.7203 15.9965ZM4.32026 19.8C4.32026 19.5666 4.51135 19.3775 4.74698 19.3775H6.45354C6.68916 19.3775 6.88026 19.5666 6.88026 19.8L6.88023 21.6572C6.88023 21.8906 6.68914 22.0798 6.45351 22.0798H4.74695C4.51133 22.0798 4.32023 21.8906 4.32023 21.6572L4.32026 19.8ZM13.2802 17.6869H14.987C15.2226 17.6869 15.4135 17.8762 15.4135 18.1096L15.4135 21.6572C15.4135 21.8906 15.2226 22.0798 14.9869 22.0798H13.2802C13.0446 22.0798 12.8535 21.8906 12.8535 21.6572L12.8535 18.1096C12.8535 17.8762 13.0446 17.6869 13.2802 17.6869ZM4.80023 2.39985C4.53514 2.39985 4.32023 2.61476 4.32023 2.87985C4.32023 3.14495 4.53514 3.35985 4.80023 3.35985H12.0002C12.2653 3.35985 12.4802 3.14495 12.4802 2.87985C12.4802 2.61476 12.2653 2.39985 12.0002 2.39985H4.80023ZM4.32023 5.27986C4.32023 5.01476 4.53514 4.79985 4.80023 4.79985H9.12024C9.38533 4.79985 9.60024 5.01476 9.60024 5.27986C9.60024 5.54495 9.38533 5.75985 9.12024 5.75985H4.80023C4.53514 5.75985 4.32023 5.54495 4.32023 5.27986Z" fill="#0066BE" fill-opacity="0.6" />
                          </g>
                          <defs>
                            <clipPath id="clip0_3664_570">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p>Analytics</p>
                      </Link>
                    </li>
                  </ul>
                ) :
                window.location.pathname == "/webinar/event-listing" ||
                  window.location.pathname == "/webinar/registration" ||
                  window.location.pathname == "/poll-listing"
                  ? (
                    // <ul>
                    //   <li
                    //     className={
                    //       location.pathname == "/webinar/event-listing"
                    //         ? "active"
                    //         : "side_li"
                    //     }
                    //   >
                    //     <Link to={"/webinar/event-listing"}>
                    //     <svg xmlns="http://www.w3.org/2000/svg" width="480" height="384" viewBox="0 0 480 384">
                    //       <path id="Color_Fill_1" data-name="Color Fill 1" class="cls-1" d="M19,0H437c10.7,0,25.5-1.258,32,3l4,5,3,2c4.531,6.471,4,16.846,4,28V345c0,8.509,1.008,20.361-2,26l-2,1v2l-7,6v1h-2v1h-3v1l-13,1H37c-10.882,0-20.7.419-27-4l-2-3-4-3v-2l-2-1c-3.242-6.114-2-19.83-2-29V39c0-8.516-1.006-20.352,2-26l2-1V10L6,9l4-5h2l1-2,6-1V0ZM16,80H464c0.084-18.769,2.022-44.325-1-61-1.8-.945-1.574-1.385-4-2-2.66-2.309-22.461-1-28-1H58c-12.7,0-27.947-.979-39,1-0.945,1.8-1.385,1.575-2,4-2.232,2.535-1,11.6-1,16V80ZM371,24c9.081-.165,11.534,1.637,18,3l5,6,2,1v2l2,1v3h1v3h1c3.339,10.7-6.994,24.447-13,26-1.667,1.726-11.269,4.543-16,3V71l-6-1-1-2h-2l-1-2-5-4V60l-2-1q-0.5-3-1-6c-0.559-1.593-2.006-6.917-1-10h1q0.5-3,1-6l2-1V34l2-1,4-5h2l1-2,6-1V24Zm56,0c9.081-.165,11.534,1.637,18,3l5,6,2,1v2l2,1v3h1v3h1c3.339,10.7-6.994,24.447-13,26-1.667,1.726-11.269,4.543-16,3V71l-6-1-1-2h-2l-1-2-5-4V60l-2-1q-0.5-3-1-6c-0.559-1.593-2.006-6.917-1-10h1q0.5-3,1-6l2-1V34l2-1,4-5h2l1-2,6-1V24ZM101,40H274c8.977,0,19.577-.328,27,1,0.945,1.8,1.385,1.575,2,4h1c1.672,3.059-2.05,9.367-3,10h-2v1H154c-17.687,0-39.083,1.953-55-1-0.945-1.8-1.385-1.575-2-4C92.6,46.389,99.38,41.874,101,40Zm272,0c-1.916,2.293-3,1.275-4,5-4.478,4.468,3.307,13.683,10,11V55h2c1.292-.875,4.381-6.542,3-10h-1V43h-1l-1-2h-2V40h-6Zm56,0c-1.916,2.293-3,1.275-4,5-4.478,4.468,3.307,13.683,10,11V55h2c1.292-.875,4.381-6.542,3-10h-1V43h-1l-1-2h-2V40h-6ZM16,96V332c0,10.833-.649,23.773,1,33,1.8,0.945,1.575,1.385,4,2,2.66,2.309,22.461,1,28,1H422c12.7,0,27.948.979,39-1,0.945-1.8,1.385-1.574,2-4,2.436-2.808,1-13.228,1-18V96H16Zm139,28c0.723,2.591,1.562,3.243,3,5h1v2l2,1v2l2,1q0.5,2.5,1,5h1v2h1q0.5,4,1,8h1v7c0.028,11.16-2.111,17.1-6,24v2c-0.328.518-1.37,0.842-2,2,25,2.062,40.347,19.427,47,40v6h1v12c0,15.248-2.883,23.847-12,30l-1,2-4,1v1h-4v1h-3v1h-4v1h-4v1h-5c-26.929,8.4-75.06,8.345-102,0H64v-1H60v-1l-11-2v-1l-4-1-1-2H42v-1l-3-2v-2l-2-1v-2H36l-1-4H34v-3H33v-4H32c-1.193-4.026.021-26.028,1-29h1v-3h1v-3h1v-3h1l1-4h1v-2l2-1v-2l4-3v-2l4-3v-1h2l3-4h2l1-2,6-2v-1h2v-1h3v-1h4v-1c3.772-1.2,5.425.474,8-2-3.475-2.236-3.339-5.791-5-10H74v-3H73v-5H72c-2.349-8.218,2.568-27.062,5-31h1l1-3,2-1v-2l4-3,1-3h2l3-4h2l1-2,4-1v-1l4-1v-1h3v-1c6.905-2.683,23.1-2.726,30,0v1h3v1l4,1v1l4,1q0.5,1,1,2h2C151.59,120.828,150.655,122.766,155,124Zm81-12h40v1l5,1c2,3.377,5.681,5.95,7,10v40h-1q-0.5,2.5-1,5c-3.574,2.172-5.335,5.517-10,7H261c-14.363,0-32.015,2.426-35-9-2.656-2.634-2-8.728-2-14V124h1q0.5-2.5,1-5l5-4v-1l5-1v-1Zm65,0h94c16.153,0,35.572-1.587,50,1,0.945,1.8,1.385,1.574,2,4h1c1.7,3.091-1.154,7-2,8-4.45,5.229-20.714,3-30,3H340c-13.293,0-29.384,1.187-41-1-0.945-1.8-1.385-1.574-2-4C292.6,118.389,299.379,113.874,301,112ZM114,126l-9,3q-0.5,1-1,2h-2q-0.5,1-1,2H99l-3,4H95v2l-2,1v2l-2,1v3H90v2H89v4H88l1,16h1l2,6h1v2l3,2v2l2,1v1h2l2,3,9,3c2.815,1.058,8.9,3.556,14,2v-1h4v-1h3v-1l4-1v-1h2l2-3h2q0.5-1,1-2h1v-2l3-2q1-3,2-6h1v-2h1q0.5-7.5,1-15h-1v-5h-1v-2h-1v-3l-2-1v-2l-2-1v-2l-4-3v-1h-2q-0.5-1-1-2l-3-1v-1C130.283,126.125,121.7,125.86,114,126Zm126,2v32h32V128H240Zm61,8h94c16.153,0,35.572-1.587,50,1,0.945,1.8,1.385,1.574,2,4h1c1.7,3.091-1.154,7-2,8-4.45,5.229-20.714,3-30,3H340c-13.293,0-29.384,1.187-41-1-0.945-1.8-1.385-1.574-2-4C292.6,142.389,299.379,137.874,301,136Zm0,24h94c16.153,0,35.572-1.587,50,1,0.945,1.8,1.385,1.574,2,4h1c1.7,3.091-1.154,7-2,8-4.45,5.229-20.714,3-30,3H340c-13.293,0-29.384,1.187-41-1-0.945-1.8-1.385-1.574-2-4C292.6,166.389,299.379,161.874,301,160ZM87,199c-2.275,1.964-5.83.865-9,2v1l-6,1v1l-4,1v1H66l-1,2H63l-1,2H60l-1,2-4,3v2l-2,1-1,3H51v3H50v2H49l-1,15v12h1l1,5,3,2v1h2v1h4c5.665,1.871,13.331,3.32,19,5h6c20.893,6.065,51.131,6.257,72,0h6l25-6v-1c1.826-1.5,2.242-1.2,3-4,4.662-4.706,1.434-30.481-1-35h-1q-0.5-1.5-1-3l-2-1v-2l-2-1-3-4h-2q-0.5-1-1-2h-2q-0.5-1-1-2l-4-1v-1h-2v-1l-6-1v-1h-4c-2.37-.768-9.768-3.533-14-2v1l-6,2v1h-3v1h-4v1h-8v1h-7v-1l-11-1v-1h-3v-1l-6-2v-1H87Zm149,1h40v1l5,1c2,3.377,5.681,5.95,7,10v40h-1q-0.5,2.5-1,5c-3.574,2.172-5.335,5.517-10,7H261c-14.363,0-32.015,2.426-35-9-2.656-2.634-2-8.728-2-14V212h1q0.5-2.5,1-5l5-4v-1l5-1v-1Zm65,0h94c16.153,0,35.572-1.587,50,1,0.945,1.8,1.385,1.574,2,4h1c1.7,3.091-1.154,7-2,8-4.45,5.229-20.714,3-30,3H340c-13.293,0-29.384,1.187-41-1-0.945-1.8-1.385-1.574-2-4C292.6,206.389,299.379,201.874,301,200Zm-61,16v32h32V216H240Zm61,8h94c16.153,0,35.572-1.587,50,1,0.945,1.8,1.385,1.574,2,4h1c1.7,3.091-1.154,7-2,8-4.45,5.229-20.714,3-30,3H340c-13.293,0-29.384,1.187-41-1-0.945-1.8-1.385-1.574-2-4C292.6,230.389,299.379,225.874,301,224Zm0,24h94c16.153,0,35.572-1.587,50,1,0.945,1.8,1.385,1.574,2,4h1c1.7,3.091-1.154,7-2,8-4.45,5.229-20.714,3-30,3H340c-13.293,0-29.384,1.187-41-1-0.945-1.8-1.385-1.574-2-4C292.6,254.389,299.379,249.874,301,248Zm-65,40h40v1l5,1c2,3.377,5.681,5.95,7,10v40h-1l-1,5c-3.574,2.172-5.335,5.517-10,7H261c-14.363,0-32.015,2.426-35-9-2.656-2.634-2-8.728-2-14V300h1q0.5-2.5,1-5l5-4v-1l5-1v-1Zm65,0h94c16.153,0,35.572-1.587,50,1,0.945,1.8,1.385,1.574,2,4h1c1.7,3.091-1.154,7-2,8-4.45,5.229-20.714,3-30,3H340c-13.293,0-29.384,1.187-41-1-0.945-1.8-1.385-1.574-2-4C292.6,294.389,299.379,289.874,301,288ZM44,304h99c19.1,0,42.073-1.129,58,2,2,3.37,5.684,5.952,7,10v24h-1q-0.5,2.5-1,5c-3.6,2.132-5.306,5.5-10,7H76c-15.648,0-38.642,3.494-42-9H33v-3H32V316h1l1-5,5-4v-1l5-1v-1Zm196,0v32h32V304H240Zm61,8h94c16.153,0,35.572-1.587,50,1,0.945,1.8,1.385,1.574,2,4h1c1.7,3.091-1.154,7-2,8-4.45,5.229-20.714,3-30,3H340c-13.293,0-29.384,1.187-41-1-0.945-1.8-1.385-1.574-2-4C292.6,318.389,299.379,313.874,301,312ZM48,320v16H192V320H48Zm253,16h94c16.153,0,35.572-1.587,50,1,0.945,1.8,1.385,1.574,2,4h1c1.7,3.091-1.154,7-2,8-4.45,5.229-20.714,3-30,3H340c-13.293,0-29.384,1.187-41-1-0.945-1.8-1.385-1.574-2-4C292.6,342.389,299.379,337.874,301,336Z" fill-opacity="0.6" fill= "#0066be" />
                    //     </svg>
                    //       <p>Events</p>
                    //     </Link>
                    //   </li>
                    //   <li
                    //     className={
                    //       location.pathname == "/webinar-registration"
                    //         ? "active"
                    //         : "side_li"
                    //     }
                    //   >
                    //     <Link to={"/webinar-registration"}>
                    //       <svg xmlns="http://www.w3.org/2000/svg" width="414.938" height="488.406" viewBox="0 0 414.938 488.406">
                    //         <path id="Color_Fill_1" data-name="Color Fill 1" class="cls-1" d="M361,61c21.578,0.283,39.624,17.236,48,31l3,10h1v3h1c0.932,2.805,2.146,22.1,1,26h-1v5h-1q-0.5,3-1,6h-1v2h-1q-0.5,2.5-1,5l-2,1-1,4-3,2v2l-7,6-3,4h-2l-2,3-4,1-1,2h-2a44,44,0,0,1-21,6V460h-1v4h-1v3h-1l-1,4h-1v2l-3,2v2l-4,3v1h-2l-2,3-4,1v1h-2v1l-6,1v1H29c-8.872-2.677-18.521-8.927-23-16-5.8-9.167-5-21.957-5-37V51C1,42.876-.565,31.45,2,25H3V23H4l2-6,2-1V14l5-4,1-2h2l1-2,6-2V3h2V2C31.015-.378,41.381,1,49,1H333V2l6,1V4l4,1V6h2l2,3h2l3,4h1v2l3,2v2h1q0.5,2,1,4h1v3h1v4h1V61ZM350,180c-10.129-.065-17.773-4.045-24-8l-4-1-2-3h-2l-6-7-4-3v-2l-3-2-1-4-2-1-3-10h-1v-3h-1v-4h-1V121c-0.209-1.4-1.014.414-1-1h1V109l6-17,2-1q0.5-2,1-4l3-2V83l6-5,4-5h2l1-2h2l1-2,6-2V66a53.851,53.851,0,0,1,20-5c0.094-13.485,1.493-29.844-4-38l-4-3-3-4c-6.43-4.316-16.161-4-27-4H52c-7.486,0-17.042-1.171-23,1v1H26l-1,2H23l-1,2H20l-1,2H18v2l-2,1v2l-2,1c-3.161,5.983-2,19.027-2,28V434c0,9.376-1.319,23.742,2,30l2,1v2l2,1v2l2,1v1h2l1,2h2l1,2c4.423,2.321,14.153,2,21,2H313c10.536,0,19.756.2,26-4l1-2,6-5,2-6h1q0.5-10.5,1-21V180ZM212,39c-14.416,2.61-33.856,1-50,1s-35.579,1.6-50-1V38h-1V35h-1c-0.04-.375.895-2.247,1-4l2-1c3.758-3.736,16.9-2,24-2h49c9.159,0,19.687-.565,26,2a19.17,19.17,0,0,1,1,7C211.861,38.139,212.6,37,212,39Zm25-11c5.707-.132,9.4.5,13,2a19.17,19.17,0,0,1,1,7,21.5,21.5,0,0,0-3,3H235a7.739,7.739,0,0,0-3-2q-0.5-2.5-1-5h1C233.185,28.489,234.557,30.464,237,28ZM176,81c8.039-.146,11.828.84,17,3h3v1l3,1,1,2h2l1,2,4,3v2l2,1v2l2,1v3h1v2h1v4h1c1.647,5.572-.8,12.867-2,16v3h-1q-0.5,2-1,4h-1v2l-4,3q-0.5,1.5-1,3h-2l-2,3h-2q-0.5,1-1,2c-1.982,1.058-5.64,1.156-8,2v1H173v-1l-6-1-12-9v-2l-2-1v-2l-2-1v-2h-1q-0.5-3.5-1-7c-0.744-2.382-2.259-10.118-1-14h1q0.5-3,1-6h1q0.5-2,1-4l2-1V94l6-5,1-2h2l1-2Zm199,19v1h-3c-1.526,2.679-3.924,3.923-6,6q-6,6-12,12c-2.6,2.6-3.84,5.893-8,7-1.145-2.081-6.869-8.2-9-9h-4a21.9,21.9,0,0,1-4,5,10.6,10.6,0,0,1,1,4l16,15c2.01-.574.865,0.12,2-1,5.307-1.122,6.839-4.839,10-8q6.5-6.5,13-13l9-8c1.05-1.652,1-5.177,1-8C378.787,101.808,378.012,100.67,375,100ZM175,154c21.528-.165,35.077,6.669,44,19l5,4v2l2,1q0.5,2,1,4l2,1v2h1q0.5,2,1,4h1v3h1v2h1v3c3.036,7.687,5.654,20.789,4,30-7.376,3.778-23.312,2-34,2H126a13.3,13.3,0,0,0-3-4c-0.24-29.472,14.223-54.775,32-66h2v-1l6-2v-1l6-1v-1h6v-1ZM73,267H279c6.484,0,10.089-.827,13,3h1v6a18.978,18.978,0,0,0-3,3H72a21.92,21.92,0,0,0-4-5c0.574-2.01-.12-0.865,1-2C69.851,268.685,71.263,269.1,73,267Zm0,53H279c6.484,0,10.089-.827,13,3h1v6a13.3,13.3,0,0,0-4,3H72a21.92,21.92,0,0,0-4-5c0.574-2.01-.12-0.865,1-2C69.851,321.685,71.263,322.1,73,320Zm53,53h71c13.014,0,28.645-1.041,40,1a13.3,13.3,0,0,0,3,4c-0.574,2.01.12,0.865-1,2-0.684,2.927-1.113,3.274-4,4-2.618,2.3-22.492,1-28,1H155c-10.2,0-22.392.58-31-1l-1-3C119.867,377.6,124.434,374.847,126,373Zm54,51c7.548,1.117,16.318,4.239,18,11,2.214,1.88.943,2.092,2,5,3.186,8.764-2.338,16.845-7,21l-3,1v1h-2v1c-4.607.351-6.108,1.335-10,0h-4v-1a11.146,11.146,0,0,1-5-2v-1h-2l-1-2h-1v-2l-2-1q-0.5-2.5-1-5h-1c-1.848-5.869,1.174-12.19,2-16,3.5-2.058,4.64-5.821,9-7,2.746-2.623,5.7-.62,8-2v-1Z" transform="translate(-0.531 -0.594)" fill-opacity="0.6" fill= "#0066be" />
                    //       </svg>
                    //       <p>Registration Page</p>
                    //     </Link>
                    //   </li>
                    //   <li
                    //     className={
                    //       location.pathname == "/poll-listing"
                    //         ? "active"
                    //         : "side_li"
                    //     }
                    //   >
                    //     <Link to={"/poll-listing"}>
                    //     <svg xmlns="http://www.w3.org/2000/svg" width="512" height="480" viewBox="0 0 512 480">
                    //         <path id="Color_Fill_1" data-name="Color Fill 1" class="cls-1" d="M150,16h30V46H512V166H180v30H332V316H180v30H452V466H180v30H150V16ZM52,46l21,1v1h4v1l6,1v1l6,2v1h2v1l3,1,1,2h2l6,7,5,4v2l2,1v2l2,1q1,3,2,6h1v2h1q0.5,3,1,6c1.535,4.144,5.108,17.823,3,25h-1v5h-1v4h-1v3h-1v3h-1v2h-1q-1,3-2,6l-2,1v2l-2,1v2l-8,7-3,4H95l-1,2H92l-1,2-6,2v1H83v1H80v1H77v1H73v1H68v1c-6.371,1.825-24.041-1.434-28-3v-1H37v-1H35v-1l-6-2-1-2H26l-1-2H23l-7-8-4-3v-2l-2-1v-2l-2-1-2-6H5v-2H4L2,119c-1.21-3.727-3.795-14.844-2-21H1V93H2V89H3V86H4V83H5V81H6l2-6,2-1V72l2-1V69l4-3,7-8h2l1-2h2l1-2h2V53h2V52h2V51Zm3,30-9,3v1H44l-1,2H41l-1,2-4,3v2l-2,1-1,4H32v3H31v4H30c-2.018,6.879,2.1,15.6,4,19v2l2,1v2l2,1,3,4h2l1,2h2v1h2v1h3c2.813,1.058,8.9,3.558,14,2,10.324-3.156,18.958-8.669,23-18l1-7h1c1.506-5.133-.906-11.157-2-14V94c-4.089-9.243-12.632-14.951-23-18H55Zm125,0v60H482V76H180ZM52,196l21,1v1h4v1l6,1v1l6,2v1h2v1l3,1,1,2h2l6,7,5,4v2l2,1v2l2,1q1,3,2,6h1v2h1q0.5,3,1,6c1.535,4.144,5.108,17.823,3,25h-1v5h-1v4h-1v3h-1v3h-1v2h-1l-2,6-2,1v2l-2,1v2l-8,7-3,4H95l-1,2H92l-1,2-6,2v1H83v1H80v1H77v1H73v1H68v1c-6.371,1.825-24.041-1.434-28-3v-1H37v-1H35v-1l-6-2-1-2H26l-1-2H23l-7-8-4-3v-2l-2-1v-2l-2-1-2-6H5v-2H4L2,269c-1.21-3.727-3.795-14.844-2-21H1v-5H2v-4H3v-3H4v-3H5v-2H6l2-6,2-1v-2l2-1v-2l4-3,7-8h2l1-2h2l1-2h2v-1h2v-1h2v-1Zm3,30-9,3v1H44l-1,2H41l-1,2-4,3v2l-2,1-1,4H32v3H31v4H30c-2.018,6.879,2.1,15.6,4,19v2l2,1v2l2,1,3,4h2l1,2h2v1h2v1h3c2.813,1.058,8.9,3.558,14,2,10.324-3.156,18.958-8.669,23-18l1-7h1c1.506-5.133-.906-11.157-2-14v-3c-4.089-9.243-12.632-14.951-23-18H55Zm125,0v60H302V226H180ZM52,346l21,1v1h4v1l6,1v1l6,2v1h2v1l3,1,1,2h2l6,7,5,4v2l2,1v2l2,1,2,6h1v2h1q0.5,3,1,6c1.535,4.144,5.108,17.823,3,25h-1v5h-1v4h-1v3h-1v3h-1v2h-1l-2,6-2,1v2l-2,1v2l-8,7-3,4H95l-1,2H92l-1,2-6,2v1H83v1H80v1H77v1H73v1H68v1c-6.371,1.825-24.041-1.434-28-3v-1H37v-1H35v-1l-6-2-1-2H26l-1-2H23l-7-8-4-3v-2l-2-1v-2l-2-1-2-6H5v-2H4L2,419c-1.21-3.727-3.795-14.844-2-21H1v-5H2v-4H3v-3H4v-3H5v-2H6l2-6,2-1v-2l2-1v-2l4-3,7-8h2l1-2h2l1-2h2v-1h2v-1h2v-1Zm3,30-9,3v1H44l-1,2H41l-1,2-4,3v2l-2,1-1,4H32v3H31v4H30c-2.018,6.879,2.1,15.6,4,19v2l2,1v2l2,1,3,4h2l1,2h2v1h2v1h3c2.813,1.058,8.9,3.558,14,2,10.324-3.156,18.958-8.669,23-18l1-7h1c1.506-5.133-.906-11.157-2-14v-3c-4.089-9.243-12.632-14.951-23-18H55Zm125,0v60H422V376H180Z" transform="translate(0 -16)" fill= "#0066be" fill-opacity="0.6" />
                    //     </svg>
                    //       <p>Polls</p>
                    //     </Link>
                    //   </li>
                    // </ul>
                    ''
                  ) : localStorage.getItem("group_id") == 2 ? (
                    window.location.pathname == "/LEX-210-analytics" ||
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
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M2.74061 0C1.44752 0 0.399245 1.0233 0.399196 2.28563L0.398438 21.7142C0.398388 22.9766 1.44669 24 2.73985 24H17.2586C18.5517 24 19.6 22.9767 19.6 21.7143V2.28571C19.6 1.02335 18.5517 0 17.2586 0H2.74061ZM15.1584 4.8H17.3184C17.4139 4.8 17.5055 4.76207 17.573 4.69456C17.6405 4.62704 17.6784 4.53548 17.6784 4.44C17.6784 3.77165 17.4129 3.13068 16.9403 2.65809C16.4678 2.1855 15.8268 1.92 15.1584 1.92C15.063 1.92 14.9714 1.95793 14.9039 2.02544C14.8364 2.09295 14.7984 2.18452 14.7984 2.28V4.2636C14.7984 4.638 14.9604 4.8 15.1584 4.8ZM12.1459 7.47552C11.8645 7.19701 11.6574 6.85238 11.5435 6.47314C11.4286 6.09536 11.4076 5.69525 11.4822 5.3075C11.5569 4.91974 11.7249 4.55607 11.9719 4.248C12.1973 3.97001 12.482 3.74598 12.8052 3.59233C13.1283 3.43868 13.4818 3.3593 13.8396 3.36C13.9304 3.36 14.0176 3.39613 14.0819 3.46043C14.1462 3.52472 14.1823 3.61193 14.1823 3.70286V4.90286C14.1823 5.03926 14.2364 5.17007 14.3328 5.26651C14.4292 5.36296 14.56 5.41714 14.6963 5.41714H15.8957C15.9866 5.41714 16.0738 5.45327 16.1381 5.51757C16.2023 5.58186 16.2384 5.66907 16.2384 5.76C16.2384 6.39652 15.9857 7.00697 15.5358 7.45706C15.0859 7.90714 14.4758 8.16 13.8396 8.16C13.608 8.16026 13.3774 8.12912 13.1542 8.06743C12.7739 7.95753 12.4272 7.75403 12.1459 7.47552ZM15.1184 11.3478C15.1192 10.648 15.6919 10.0808 16.3984 10.08C17.1053 10.08 17.6784 10.6477 17.6784 11.3478C17.6784 12.048 17.1053 12.6157 16.3984 12.6157C16.16 12.6149 15.9267 12.5476 15.7253 12.4215L13.4022 13.7894C13.4031 13.8022 13.4049 13.8147 13.4066 13.8272C13.4092 13.8457 13.4117 13.8643 13.4117 13.8835C13.4125 14.5294 12.9225 15.0722 12.2745 15.1437C11.6266 15.2152 11.028 14.7923 10.8852 14.1623L8.74283 13.1113C8.3458 13.4923 7.74361 13.5705 7.2608 13.3038L4.79268 15.1283C4.8483 15.2706 4.87736 15.4215 4.87846 15.5741C4.87846 16.2742 4.30533 16.8419 3.59846 16.8419C2.89159 16.8419 2.31846 16.2742 2.31846 15.5741C2.31846 14.8737 2.89159 14.3062 3.59846 14.3062C3.82409 14.3075 4.04534 14.3684 4.23908 14.4828L6.68283 12.6764C6.48424 12.2023 6.59377 11.6566 6.96033 11.2938C7.32674 10.9311 7.87783 10.8229 8.35627 11.0197C8.8347 11.2168 9.14611 11.6798 9.14517 12.193C9.14314 12.248 9.13767 12.3028 9.12845 12.3571L11.0124 13.2814C11.2047 12.9241 11.5588 12.6805 11.9639 12.6268C12.3689 12.5731 12.7753 12.7158 13.0556 13.0104L15.1916 11.7527C15.1448 11.6227 15.1202 11.4859 15.1184 11.3478ZM15.5452 15.1514H17.2517C17.4874 15.1514 17.6785 15.3407 17.6785 15.5741L17.6784 21.6573C17.6784 21.8907 17.4873 22.08 17.2517 22.08H15.5452C15.3095 22.08 15.1184 21.8907 15.1184 21.6573L15.1185 15.5741C15.1185 15.3407 15.3096 15.1514 15.5452 15.1514ZM8.71848 15.9966H7.01177C6.77614 15.9966 6.58521 16.1859 6.58521 16.4193L6.58518 21.6573C6.58518 21.8907 6.77612 22.08 7.01174 22.08H8.71846C8.95408 22.08 9.14518 21.8907 9.14518 21.6573L9.1452 16.4193C9.1452 16.1859 8.95411 15.9966 8.71848 15.9966ZM2.31846 19.8001C2.31846 19.5668 2.50956 19.3776 2.74518 19.3776H4.45174C4.68737 19.3776 4.87846 19.5668 4.87846 19.8001L4.87843 21.6573C4.87843 21.8907 4.68734 22.08 4.45171 22.08H2.74516C2.50953 22.08 2.31844 21.8907 2.31844 21.6573L2.31846 19.8001ZM11.2784 17.6871H12.9852C13.2208 17.6871 13.4117 17.8764 13.4117 18.1098L13.4117 21.6573C13.4117 21.8907 13.2208 22.08 12.9851 22.08H11.2784C11.0428 22.08 10.8517 21.8907 10.8517 21.6573L10.8517 18.1098C10.8517 17.8764 11.0428 17.6871 11.2784 17.6871ZM2.79844 2.4C2.53334 2.4 2.31844 2.6149 2.31844 2.88C2.31844 3.1451 2.53334 3.36 2.79844 3.36H9.99844C10.2635 3.36 10.4784 3.1451 10.4784 2.88C10.4784 2.6149 10.2635 2.4 9.99844 2.4H2.79844ZM2.31844 5.28C2.31844 5.0149 2.53334 4.8 2.79844 4.8H7.11844C7.38353 4.8 7.59844 5.0149 7.59844 5.28C7.59844 5.5451 7.38353 5.76 7.11844 5.76H2.79844C2.53334 5.76 2.31844 5.5451 2.31844 5.28Z"
                                  fill="#0066BE"
                                  fill-opacity="0.6"
                                />
                              </svg>
                              <p>Content Analytics</p>
                            </Link>
                          </li>
                          {localStorage.getItem("user_id") ==
                            "56Ek4feL/1A8mZgIKQWEqg==" ? null : localStorage.getItem(
                              "group_id"
                            ) == 2 ? null : (
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
                                  <g clip-path="url(#clip0_605_8499)">
                                    <path
                                      d="M13.8744 18.375H12.5563L7.69967 12.2224C7.8317 12.0112 7.88983 11.7622 7.8649 11.5144C7.83997 11.2667 7.7334 11.0342 7.56196 10.8536C7.39051 10.673 7.1639 10.5545 6.91777 10.5167C6.67163 10.479 6.41992 10.5241 6.20221 10.645C5.9845 10.7658 5.81313 10.9557 5.71506 11.1845C5.61699 11.4134 5.59776 11.6684 5.66042 11.9094C5.72307 12.1505 5.86404 12.3638 6.06117 12.516C6.2583 12.6681 6.5004 12.7504 6.74942 12.75C6.8723 12.7487 6.99409 12.7269 7.1098 12.6855L7.58755 13.2907C7.32902 13.4268 7.04154 13.4986 6.74942 13.5C6.34949 13.5065 5.95765 13.387 5.62939 13.1584C5.30113 12.9299 5.05309 12.6039 4.92038 12.2265C4.78767 11.8492 4.77702 11.4397 4.88995 11.056C5.00287 10.6723 5.23364 10.3338 5.54958 10.0885C5.86552 9.84322 6.25062 9.70353 6.65035 9.68922C7.05008 9.67491 7.44418 9.78672 7.77685 10.0088C8.10952 10.2309 8.3639 10.552 8.50396 10.9266C8.64403 11.3013 8.66269 11.7105 8.55729 12.0964L9.37442 13.1321V8.25L11.0244 12.2119C11.1122 12.4267 11.2817 12.598 11.4957 12.6878C11.7097 12.7777 11.9507 12.7789 12.1655 12.6911C12.3804 12.6034 12.5516 12.4338 12.6415 12.2198C12.7314 12.0058 12.7326 11.7649 12.6448 11.55L10.6903 6.6645C10.5233 6.24695 10.235 5.88902 9.86264 5.63689C9.49026 5.38476 9.05088 5.25 8.60117 5.25H4.52267C4.07296 5.25 3.63358 5.38476 3.2612 5.63689C2.88882 5.88902 2.60054 6.24695 2.43355 6.6645L0.479046 11.55C0.391275 11.7649 0.392459 12.0058 0.482336 12.2198C0.572213 12.4338 0.74342 12.6034 0.958295 12.6911C1.17317 12.7789 1.41411 12.7777 1.62811 12.6878C1.84212 12.598 2.01165 12.4267 2.09942 12.2119L3.74942 8.25V22.4876C3.75051 22.7864 3.86913 23.0728 4.07964 23.2848C4.29015 23.4968 4.57564 23.6175 4.87441 23.6208C5.17318 23.624 5.46123 23.5096 5.6763 23.3022C5.89138 23.0948 6.0162 22.8111 6.0238 22.5124L6.18692 15H6.93692L7.10005 22.5124C7.10764 22.8111 7.23246 23.0948 7.44754 23.3022C7.66261 23.5096 7.95066 23.624 8.24943 23.6208C8.5482 23.6175 8.83369 23.4968 9.0442 23.2848C9.25471 23.0728 9.37333 22.7864 9.37442 22.4876V15.5546L12.08 18.9821C12.1151 19.0266 12.1598 19.0626 12.2108 19.0874C12.2618 19.1121 12.3177 19.125 12.3744 19.125H13.8744V18.375Z"
                                      fill="#0066BE"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M15.1875 5.0625H17.0625V7.875H15.1875V5.0625Z"
                                      fill="#0066BE"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M18.1875 3.09375H20.0625V7.875H18.1875V3.09375Z"
                                      fill="#0066BE"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M21.1875 1.125H23.0625V7.875H21.1875V1.125Z"
                                      fill="#0066BE"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M14.625 8.625H23.625V9.375H14.625V8.625Z"
                                      fill="#0066BE"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M18.6041 16.9519C18.394 16.8233 18.1608 16.7374 17.9176 16.699C17.6743 16.6606 17.4259 16.6704 17.1865 16.728C16.9471 16.7856 16.7214 16.8898 16.5223 17.0346C16.3231 17.1795 16.1545 17.3621 16.0259 17.5721L14.0681 20.7705C13.809 21.1947 13.7288 21.7043 13.845 22.1875C13.9612 22.6708 14.2643 23.0882 14.6879 23.3482C14.898 23.4768 15.1313 23.5627 15.3745 23.6011C15.6177 23.6395 15.8661 23.6295 16.1055 23.5719C16.3449 23.5143 16.5706 23.4101 16.7698 23.2652C16.9689 23.1203 17.1375 22.9377 17.2661 22.7276L19.2243 19.5296C19.4832 19.1054 19.5633 18.5958 19.4471 18.1125C19.3308 17.6293 19.0276 17.2119 18.6041 16.9519ZM18.5846 19.1385L17.8008 20.4187L15.8816 19.2442L16.6657 17.9625C16.7425 17.8358 16.8436 17.7256 16.9631 17.6381C17.0827 17.5506 17.2183 17.4876 17.3622 17.4527C17.5062 17.4177 17.6556 17.4116 17.802 17.4345C17.9483 17.4575 18.0887 17.5092 18.215 17.5865C18.3413 17.6639 18.4511 17.7654 18.5381 17.8853C18.6251 18.0052 18.6876 18.1411 18.7219 18.2852C18.7563 18.4293 18.7618 18.5787 18.7382 18.725C18.7147 18.8712 18.6624 19.0114 18.5846 19.1374V19.1385Z"
                                      fill="#0066BE"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M18.2852 22.5C18.5659 22.8519 18.9224 23.136 19.3281 23.3309C19.7339 23.5259 20.1784 23.6269 20.6286 23.6262C21.0787 23.6255 21.5229 23.5232 21.9281 23.327C22.3332 23.1308 22.6889 22.8456 22.9685 22.4929L19.5602 20.4172L18.2852 22.5Z"
                                      fill="#0066BE"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M20.6259 17.625C20.4487 17.6258 20.2719 17.6424 20.0976 17.6745C20.2184 18.0155 20.2673 18.3779 20.2411 18.7388C20.2149 19.0996 20.1142 19.4511 19.9453 19.7711L23.3608 21.8513C23.5669 21.3948 23.6551 20.8939 23.6175 20.3945C23.5799 19.8951 23.4176 19.413 23.1455 18.9926C22.8734 18.5721 22.5002 18.2266 22.06 17.9877C21.6198 17.7488 21.1268 17.6241 20.6259 17.625Z"
                                      fill="#0066BE"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M6.5625 4.875C7.80514 4.875 8.8125 3.86764 8.8125 2.625C8.8125 1.38236 7.80514 0.375 6.5625 0.375C5.31986 0.375 4.3125 1.38236 4.3125 2.625C4.3125 3.86764 5.31986 4.875 6.5625 4.875Z"
                                      fill="#0066BE"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M12.9437 2.25H14.3196C14.408 2.50021 14.5821 2.71109 14.811 2.84536C15.0399 2.97964 15.3089 3.02868 15.5705 2.9838C15.832 2.93892 16.0693 2.80303 16.2404 2.60012C16.4114 2.39722 16.5052 2.14039 16.5052 1.875C16.5052 1.60962 16.4114 1.35278 16.2404 1.14988C16.0693 0.946979 15.832 0.811081 15.5705 0.766204C15.3089 0.721327 15.0399 0.770362 14.811 0.904641C14.5821 1.03892 14.408 1.2498 14.3196 1.5H12.7506C12.6908 1.5 12.632 1.51425 12.5789 1.54158C12.5258 1.56891 12.48 1.60853 12.4453 1.65713L10.5703 4.28213L11.1808 4.71788L12.9437 2.25Z"
                                      fill="#0066BE"
                                      fill-opacity="0.6"
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
                                  fill-opacity="0.6"
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
                                      fill-opacity="0.6"
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
                                      fill-opacity="0.6"
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
                                  fill-opacity="0.6"
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
                                  fill-opacity="0.6"
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
                                  fill-opacity="0.6"
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
                      localStorage.getItem("user_id") == "qDgwPdToP05Kgzc g2VjIQ==" ? (
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
                                  fill-opacity="0.6"
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
                                  fill-opacity="0.6"
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
                                  fill-opacity="0.6"
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
                                  fill-opacity="0.6"
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
                                  fill-opacity="0.6"
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
                                  fill-opacity="0.6"
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
                    ) : localStorage.getItem("user_id") ==
                      "iSnEsKu5gB/DRlycxB6G4g==" ? (
                      window.location.pathname == "/octalatch-totalhcp" ||
                        window.location.pathname == "/octa-country" ||
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
                                  fill-opacity="0.6"
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
                                  fill-opacity="0.6"
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
                                  fill-opacity="0.6"
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
                                  fill-opacity="0.6"
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
                                  fill-opacity="0.6"
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
                        </ul>
                      ) : null
                    ) : localStorage.getItem("user_id") ==
                      "56Ek4feL/1A8mZgIKQWEqg==" ? (
                      window.location.pathname == "/content-analytics" ||
                        window.location.pathname == "/feedback" ||
                        window.location.pathname == "/LEX-210-analytics" ? (
                        <ul>
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
                                <g clip-path="url(#clip0_605_8499)">
                                  <path
                                    d="M13.8744 18.375H12.5563L7.69967 12.2224C7.8317 12.0112 7.88983 11.7622 7.8649 11.5144C7.83997 11.2667 7.7334 11.0342 7.56196 10.8536C7.39051 10.673 7.1639 10.5545 6.91777 10.5167C6.67163 10.479 6.41992 10.5241 6.20221 10.645C5.9845 10.7658 5.81313 10.9557 5.71506 11.1845C5.61699 11.4134 5.59776 11.6684 5.66042 11.9094C5.72307 12.1505 5.86404 12.3638 6.06117 12.516C6.2583 12.6681 6.5004 12.7504 6.74942 12.75C6.8723 12.7487 6.99409 12.7269 7.1098 12.6855L7.58755 13.2907C7.32902 13.4268 7.04154 13.4986 6.74942 13.5C6.34949 13.5065 5.95765 13.387 5.62939 13.1584C5.30113 12.9299 5.05309 12.6039 4.92038 12.2265C4.78767 11.8492 4.77702 11.4397 4.88995 11.056C5.00287 10.6723 5.23364 10.3338 5.54958 10.0885C5.86552 9.84322 6.25062 9.70353 6.65035 9.68922C7.05008 9.67491 7.44418 9.78672 7.77685 10.0088C8.10952 10.2309 8.3639 10.552 8.50396 10.9266C8.64403 11.3013 8.66269 11.7105 8.55729 12.0964L9.37442 13.1321V8.25L11.0244 12.2119C11.1122 12.4267 11.2817 12.598 11.4957 12.6878C11.7097 12.7777 11.9507 12.7789 12.1655 12.6911C12.3804 12.6034 12.5516 12.4338 12.6415 12.2198C12.7314 12.0058 12.7326 11.7649 12.6448 11.55L10.6903 6.6645C10.5233 6.24695 10.235 5.88902 9.86264 5.63689C9.49026 5.38476 9.05088 5.25 8.60117 5.25H4.52267C4.07296 5.25 3.63358 5.38476 3.2612 5.63689C2.88882 5.88902 2.60054 6.24695 2.43355 6.6645L0.479046 11.55C0.391275 11.7649 0.392459 12.0058 0.482336 12.2198C0.572213 12.4338 0.74342 12.6034 0.958295 12.6911C1.17317 12.7789 1.41411 12.7777 1.62811 12.6878C1.84212 12.598 2.01165 12.4267 2.09942 12.2119L3.74942 8.25V22.4876C3.75051 22.7864 3.86913 23.0728 4.07964 23.2848C4.29015 23.4968 4.57564 23.6175 4.87441 23.6208C5.17318 23.624 5.46123 23.5096 5.6763 23.3022C5.89138 23.0948 6.0162 22.8111 6.0238 22.5124L6.18692 15H6.93692L7.10005 22.5124C7.10764 22.8111 7.23246 23.0948 7.44754 23.3022C7.66261 23.5096 7.95066 23.624 8.24943 23.6208C8.5482 23.6175 8.83369 23.4968 9.0442 23.2848C9.25471 23.0728 9.37333 22.7864 9.37442 22.4876V15.5546L12.08 18.9821C12.1151 19.0266 12.1598 19.0626 12.2108 19.0874C12.2618 19.1121 12.3177 19.125 12.3744 19.125H13.8744V18.375Z"
                                    fill="#0066BE"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M15.1875 5.0625H17.0625V7.875H15.1875V5.0625Z"
                                    fill="#0066BE"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M18.1875 3.09375H20.0625V7.875H18.1875V3.09375Z"
                                    fill="#0066BE"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M21.1875 1.125H23.0625V7.875H21.1875V1.125Z"
                                    fill="#0066BE"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M14.625 8.625H23.625V9.375H14.625V8.625Z"
                                    fill="#0066BE"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M18.6041 16.9519C18.394 16.8233 18.1608 16.7374 17.9176 16.699C17.6743 16.6606 17.4259 16.6704 17.1865 16.728C16.9471 16.7856 16.7214 16.8898 16.5223 17.0346C16.3231 17.1795 16.1545 17.3621 16.0259 17.5721L14.0681 20.7705C13.809 21.1947 13.7288 21.7043 13.845 22.1875C13.9612 22.6708 14.2643 23.0882 14.6879 23.3482C14.898 23.4768 15.1313 23.5627 15.3745 23.6011C15.6177 23.6395 15.8661 23.6295 16.1055 23.5719C16.3449 23.5143 16.5706 23.4101 16.7698 23.2652C16.9689 23.1203 17.1375 22.9377 17.2661 22.7276L19.2243 19.5296C19.4832 19.1054 19.5633 18.5958 19.4471 18.1125C19.3308 17.6293 19.0276 17.2119 18.6041 16.9519ZM18.5846 19.1385L17.8008 20.4187L15.8816 19.2442L16.6657 17.9625C16.7425 17.8358 16.8436 17.7256 16.9631 17.6381C17.0827 17.5506 17.2183 17.4876 17.3622 17.4527C17.5062 17.4177 17.6556 17.4116 17.802 17.4345C17.9483 17.4575 18.0887 17.5092 18.215 17.5865C18.3413 17.6639 18.4511 17.7654 18.5381 17.8853C18.6251 18.0052 18.6876 18.1411 18.7219 18.2852C18.7563 18.4293 18.7618 18.5787 18.7382 18.725C18.7147 18.8712 18.6624 19.0114 18.5846 19.1374V19.1385Z"
                                    fill="#0066BE"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M18.2852 22.5C18.5659 22.8519 18.9224 23.136 19.3281 23.3309C19.7339 23.5259 20.1784 23.6269 20.6286 23.6262C21.0787 23.6255 21.5229 23.5232 21.9281 23.327C22.3332 23.1308 22.6889 22.8456 22.9685 22.4929L19.5602 20.4172L18.2852 22.5Z"
                                    fill="#0066BE"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M20.6259 17.625C20.4487 17.6258 20.2719 17.6424 20.0976 17.6745C20.2184 18.0155 20.2673 18.3779 20.2411 18.7388C20.2149 19.0996 20.1142 19.4511 19.9453 19.7711L23.3608 21.8513C23.5669 21.3948 23.6551 20.8939 23.6175 20.3945C23.5799 19.8951 23.4176 19.413 23.1455 18.9926C22.8734 18.5721 22.5002 18.2266 22.06 17.9877C21.6198 17.7488 21.1268 17.6241 20.6259 17.625Z"
                                    fill="#0066BE"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M6.5625 4.875C7.80514 4.875 8.8125 3.86764 8.8125 2.625C8.8125 1.38236 7.80514 0.375 6.5625 0.375C5.31986 0.375 4.3125 1.38236 4.3125 2.625C4.3125 3.86764 5.31986 4.875 6.5625 4.875Z"
                                    fill="#0066BE"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M12.9437 2.25H14.3196C14.408 2.50021 14.5821 2.71109 14.811 2.84536C15.0399 2.97964 15.3089 3.02868 15.5705 2.9838C15.832 2.93892 16.0693 2.80303 16.2404 2.60012C16.4114 2.39722 16.5052 2.14039 16.5052 1.875C16.5052 1.60962 16.4114 1.35278 16.2404 1.14988C16.0693 0.946979 15.832 0.811081 15.5705 0.766204C15.3089 0.721327 15.0399 0.770362 14.811 0.904641C14.5821 1.03892 14.408 1.2498 14.3196 1.5H12.7506C12.6908 1.5 12.632 1.51425 12.5789 1.54158C12.5258 1.56891 12.48 1.60853 12.4453 1.65713L10.5703 4.28213L11.1808 4.71788L12.9437 2.25Z"
                                    fill="#0066BE"
                                    fill-opacity="0.6"
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
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M2.74061 0C1.44752 0 0.399245 1.0233 0.399196 2.28563L0.398438 21.7142C0.398388 22.9766 1.44669 24 2.73985 24H17.2586C18.5517 24 19.6 22.9767 19.6 21.7143V2.28571C19.6 1.02335 18.5517 0 17.2586 0H2.74061ZM15.1584 4.8H17.3184C17.4139 4.8 17.5055 4.76207 17.573 4.69456C17.6405 4.62704 17.6784 4.53548 17.6784 4.44C17.6784 3.77165 17.4129 3.13068 16.9403 2.65809C16.4678 2.1855 15.8268 1.92 15.1584 1.92C15.063 1.92 14.9714 1.95793 14.9039 2.02544C14.8364 2.09295 14.7984 2.18452 14.7984 2.28V4.2636C14.7984 4.638 14.9604 4.8 15.1584 4.8ZM12.1459 7.47552C11.8645 7.19701 11.6574 6.85238 11.5435 6.47314C11.4286 6.09536 11.4076 5.69525 11.4822 5.3075C11.5569 4.91974 11.7249 4.55607 11.9719 4.248C12.1973 3.97001 12.482 3.74598 12.8052 3.59233C13.1283 3.43868 13.4818 3.3593 13.8396 3.36C13.9304 3.36 14.0176 3.39613 14.0819 3.46043C14.1462 3.52472 14.1823 3.61193 14.1823 3.70286V4.90286C14.1823 5.03926 14.2364 5.17007 14.3328 5.26651C14.4292 5.36296 14.56 5.41714 14.6963 5.41714H15.8957C15.9866 5.41714 16.0738 5.45327 16.1381 5.51757C16.2023 5.58186 16.2384 5.66907 16.2384 5.76C16.2384 6.39652 15.9857 7.00697 15.5358 7.45706C15.0859 7.90714 14.4758 8.16 13.8396 8.16C13.608 8.16026 13.3774 8.12912 13.1542 8.06743C12.7739 7.95753 12.4272 7.75403 12.1459 7.47552ZM15.1184 11.3478C15.1192 10.648 15.6919 10.0808 16.3984 10.08C17.1053 10.08 17.6784 10.6477 17.6784 11.3478C17.6784 12.048 17.1053 12.6157 16.3984 12.6157C16.16 12.6149 15.9267 12.5476 15.7253 12.4215L13.4022 13.7894C13.4031 13.8022 13.4049 13.8147 13.4066 13.8272C13.4092 13.8457 13.4117 13.8643 13.4117 13.8835C13.4125 14.5294 12.9225 15.0722 12.2745 15.1437C11.6266 15.2152 11.028 14.7923 10.8852 14.1623L8.74283 13.1113C8.3458 13.4923 7.74361 13.5705 7.2608 13.3038L4.79268 15.1283C4.8483 15.2706 4.87736 15.4215 4.87846 15.5741C4.87846 16.2742 4.30533 16.8419 3.59846 16.8419C2.89159 16.8419 2.31846 16.2742 2.31846 15.5741C2.31846 14.8737 2.89159 14.3062 3.59846 14.3062C3.82409 14.3075 4.04534 14.3684 4.23908 14.4828L6.68283 12.6764C6.48424 12.2023 6.59377 11.6566 6.96033 11.2938C7.32674 10.9311 7.87783 10.8229 8.35627 11.0197C8.8347 11.2168 9.14611 11.6798 9.14517 12.193C9.14314 12.248 9.13767 12.3028 9.12845 12.3571L11.0124 13.2814C11.2047 12.9241 11.5588 12.6805 11.9639 12.6268C12.3689 12.5731 12.7753 12.7158 13.0556 13.0104L15.1916 11.7527C15.1448 11.6227 15.1202 11.4859 15.1184 11.3478ZM15.5452 15.1514H17.2517C17.4874 15.1514 17.6785 15.3407 17.6785 15.5741L17.6784 21.6573C17.6784 21.8907 17.4873 22.08 17.2517 22.08H15.5452C15.3095 22.08 15.1184 21.8907 15.1184 21.6573L15.1185 15.5741C15.1185 15.3407 15.3096 15.1514 15.5452 15.1514ZM8.71848 15.9966H7.01177C6.77614 15.9966 6.58521 16.1859 6.58521 16.4193L6.58518 21.6573C6.58518 21.8907 6.77612 22.08 7.01174 22.08H8.71846C8.95408 22.08 9.14518 21.8907 9.14518 21.6573L9.1452 16.4193C9.1452 16.1859 8.95411 15.9966 8.71848 15.9966ZM2.31846 19.8001C2.31846 19.5668 2.50956 19.3776 2.74518 19.3776H4.45174C4.68737 19.3776 4.87846 19.5668 4.87846 19.8001L4.87843 21.6573C4.87843 21.8907 4.68734 22.08 4.45171 22.08H2.74516C2.50953 22.08 2.31844 21.8907 2.31844 21.6573L2.31846 19.8001ZM11.2784 17.6871H12.9852C13.2208 17.6871 13.4117 17.8764 13.4117 18.1098L13.4117 21.6573C13.4117 21.8907 13.2208 22.08 12.9851 22.08H11.2784C11.0428 22.08 10.8517 21.8907 10.8517 21.6573L10.8517 18.1098C10.8517 17.8764 11.0428 17.6871 11.2784 17.6871ZM2.79844 2.4C2.53334 2.4 2.31844 2.6149 2.31844 2.88C2.31844 3.1451 2.53334 3.36 2.79844 3.36H9.99844C10.2635 3.36 10.4784 3.1451 10.4784 2.88C10.4784 2.6149 10.2635 2.4 9.99844 2.4H2.79844ZM2.31844 5.28C2.31844 5.0149 2.53334 4.8 2.79844 4.8H7.11844C7.38353 4.8 7.59844 5.0149 7.59844 5.28C7.59844 5.5451 7.38353 5.76 7.11844 5.76H2.79844C2.53334 5.76 2.31844 5.5451 2.31844 5.28Z"
                                  fill="#0066BE"
                                  fill-opacity="0.6"
                                />
                              </svg>
                              <p>Content Analytics</p>
                            </Link>
                          </li>
                          <li
                            className={
                              location.pathname == "/feedback"
                                ? "active"
                                : "side_li"
                            }
                          >
                            <Link to={"/feedback"}>
                              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 118.1 122.88"><g><path d="M69.41,20.71c10.95,0,14.33,0.09,25.28,0.09c1.25,0,2.45,0.11,3.61,0.33c1.15,0.22,2.26,0.54,3.29,0.98 c1.04,0.44,2.05,0.99,3.02,1.64c0.96,0.65,1.87,1.41,2.73,2.26c0.86,0.86,1.62,1.78,2.26,2.73c0.66,0.97,1.21,1.98,1.64,3.02 c0.43,1.04,0.76,2.14,0.98,3.29c0.22,1.16,0.33,2.36,0.33,3.61v36.24c0,1.25-0.11,2.45-0.33,3.61c-0.22,1.16-0.55,2.26-0.98,3.29 c-0.44,1.05-0.99,2.06-1.64,3.02c-0.65,0.96-1.41,1.87-2.26,2.73l-0.01,0.01c-0.89,0.87-1.82,1.63-2.78,2.27 c-0.96,0.65-1.97,1.19-3.01,1.63c-1.04,0.43-2.13,0.76-3.28,0.98c-1.14,0.22-2.34,0.33-3.58,0.33H81c-0.43,0-0.85,0.1-1.24,0.29 c-0.36,0.18-0.69,0.44-0.94,0.78l-0.02,0.02c-1.08,1.43-2.21,2.82-3.4,4.16c-1.19,1.33-2.43,2.62-3.76,3.84 c-1.29,1.2-2.65,2.35-4.06,3.46c-1.41,1.11-2.87,2.15-4.36,3.13c-1.43,0.94-2.94,1.84-4.51,2.69c-1.55,0.84-3.14,1.62-4.76,2.34 c-0.18,0.08-0.38,0.07-0.56-0.03c-0.3-0.17-0.41-0.56-0.24-0.86c0.29-0.51,0.57-1.02,0.85-1.56c0.27-0.5,0.51-1.01,0.75-1.55l0,0 c0.46-1.03,0.9-2.08,1.32-3.16c0.43-1.09,0.83-2.18,1.22-3.31c0.37-1.05,0.71-2.14,1.04-3.24c0.33-1.1,0.64-2.21,0.94-3.32 c0.08-0.33,0.16-0.66,0.16-1c0-0.74-0.3-1.43-0.79-1.92l-0.03-0.03c-0.5-0.5-1.2-0.82-1.95-0.82H40.76c-1.25,0-2.44-0.11-3.58-0.33 c-1.13-0.22-2.21-0.54-3.24-0.97l-0.02-0.01c-1.02-0.4-2.01-0.94-2.96-1.58c-0.98-0.66-1.93-1.45-2.84-2.33l-0.01-0.01 c-0.86-0.86-1.62-1.77-2.27-2.73c-0.66-0.97-1.2-1.97-1.64-3.02c-0.43-1.04-0.76-2.14-0.98-3.29c-0.22-1.16-0.33-2.36-0.33-3.61 v-7.37c0-3.7-4.79-3.73-5.59-1.09v8.41c0,1.58,0.15,3.12,0.43,4.6c0.29,1.51,0.72,2.97,1.29,4.39c0.56,1.37,1.27,2.69,2.13,3.96 c0.86,1.26,1.86,2.47,3,3.61c1.13,1.14,2.34,2.14,3.61,3c1.25,0.85,2.57,1.56,3.94,2.12l0.02,0.01c1.41,0.57,2.88,1,4.38,1.29 c1.48,0.28,3.02,0.43,4.6,0.43l11.43,0c0.07,0,0.15,0.01,0.22,0.03c0.33,0.11,0.51,0.46,0.41,0.79l-0.01,0.02 c-0.22,0.7-0.44,1.4-0.69,2.15l-0.01,0.04c-0.35,1.01-0.74,2.04-1.15,3.07c-0.39,0.97-0.79,1.93-1.21,2.85 c-0.01,0.05-0.02,0.09-0.04,0.14c-0.41,0.93-0.88,1.85-1.43,2.76c-0.54,0.91-1.15,1.8-1.81,2.68c-0.68,0.88-1.44,1.77-2.28,2.67 l-0.03,0.04c-0.85,0.9-1.77,1.79-2.76,2.65c-0.57,0.51-0.88,1.21-0.92,1.91c-0.04,0.7,0.19,1.42,0.7,1.99 c0.36,0.4,0.8,0.67,1.28,0.81c0.48,0.14,1,0.16,1.49,0.02c2.08-0.56,4.12-1.17,6.1-1.85c1.98-0.68,3.9-1.42,5.74-2.22 c1.86-0.8,3.68-1.68,5.44-2.63c1.75-0.94,3.45-1.96,5.09-3.04l0,0c1.63-1.06,3.21-2.19,4.74-3.39c1.53-1.2,3-2.46,4.41-3.77 l0.03-0.03c1.19-1.12,2.34-2.3,3.46-3.52c1.13-1.24,2.22-2.52,3.24-3.82c0.11-0.17,0.31-0.29,0.53-0.29h12.02 c1.61,0,3.15-0.15,4.64-0.43c1.5-0.29,2.94-0.72,4.32-1.28l0.02-0.01c1.39-0.59,2.71-1.31,3.98-2.16c1.26-0.85,2.46-1.83,3.6-2.97 c1.14-1.14,2.14-2.35,3-3.61c0.85-1.26,1.57-2.59,2.13-3.96c0.57-1.39,1-2.84,1.29-4.35c0.28-1.48,0.43-3.03,0.43-4.64l0-36.24 c0-1.61-0.15-3.16-0.43-4.64c-0.29-1.51-0.72-2.96-1.29-4.34c-0.56-1.37-1.28-2.7-2.13-3.96c-0.86-1.27-1.86-2.48-2.99-3.61 c-1.14-1.14-2.34-2.14-3.61-3c-1.25-0.85-2.57-1.56-3.94-2.12l-0.02-0.01c-1.42-0.57-2.88-1-4.39-1.29 c-1.48-0.28-3.02-0.43-4.6-0.43c-11.38,0-15.19-0.05-26.57-0.05C65.42,15.91,65.24,20.71,69.41,20.71L69.41,20.71z M47.02,76.55 c-1.45,0.02-2.63-1.14-2.65-2.59c-0.02-1.45,1.14-2.63,2.59-2.65l27.78-0.42l5.32-0.34c1.45-0.09,2.69,1.01,2.78,2.45 c0.09,1.45-1.01,2.69-2.45,2.78l-5.32,0.34C75.07,76.12,49.36,76.51,47.02,76.55L47.02,76.55z M55.34,60.09 c-1.45,0-2.63-1.18-2.63-2.63c0-1.45,1.18-2.63,2.63-2.63h37.52c1.45,0,2.63,1.18,2.63,2.63c0,1.45-1.18,2.63-2.63,2.63H55.34 L55.34,60.09z M67.02,44.39c-1.45,0-2.63-1.18-2.63-2.63c0-1.45,1.18-2.63,2.63-2.63h25.84c1.45,0,2.63,1.18,2.63,2.63 c0,1.45-1.18,2.63-2.63,2.63H67.02L67.02,44.39z M28.3,0.52l7.15,17.46l18.82,1.4c0.46,0.03,0.81,0.43,0.78,0.9 c-0.02,0.24-0.14,0.45-0.31,0.6L40.35,33.06l4.48,18.34c0.11,0.45-0.17,0.9-0.62,1.01c-0.24,0.06-0.47,0.01-0.66-0.12l-16.03-9.92 l-16.05,9.93c-0.39,0.24-0.91,0.12-1.15-0.27c-0.12-0.2-0.15-0.43-0.1-0.64l4.48-18.34L0.3,20.87c-0.35-0.3-0.4-0.83-0.1-1.18 c0.15-0.18,0.36-0.28,0.58-0.3l18.82-1.4l7.15-17.46c0.17-0.43,0.66-0.63,1.09-0.46C28.06,0.15,28.22,0.32,28.3,0.52L28.3,0.52z" fill="#0066be" fill-opacity="0.6" /></g></svg>
                              <p>Feedback</p>
                            </Link>
                          </li>
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
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M2.74061 0C1.44752 0 0.399245 1.0233 0.399196 2.28563L0.398438 21.7142C0.398388 22.9766 1.44669 24 2.73985 24H17.2586C18.5517 24 19.6 22.9767 19.6 21.7143V2.28571C19.6 1.02335 18.5517 0 17.2586 0H2.74061ZM15.1584 4.8H17.3184C17.4139 4.8 17.5055 4.76207 17.573 4.69456C17.6405 4.62704 17.6784 4.53548 17.6784 4.44C17.6784 3.77165 17.4129 3.13068 16.9403 2.65809C16.4678 2.1855 15.8268 1.92 15.1584 1.92C15.063 1.92 14.9714 1.95793 14.9039 2.02544C14.8364 2.09295 14.7984 2.18452 14.7984 2.28V4.2636C14.7984 4.638 14.9604 4.8 15.1584 4.8ZM12.1459 7.47552C11.8645 7.19701 11.6574 6.85238 11.5435 6.47314C11.4286 6.09536 11.4076 5.69525 11.4822 5.3075C11.5569 4.91974 11.7249 4.55607 11.9719 4.248C12.1973 3.97001 12.482 3.74598 12.8052 3.59233C13.1283 3.43868 13.4818 3.3593 13.8396 3.36C13.9304 3.36 14.0176 3.39613 14.0819 3.46043C14.1462 3.52472 14.1823 3.61193 14.1823 3.70286V4.90286C14.1823 5.03926 14.2364 5.17007 14.3328 5.26651C14.4292 5.36296 14.56 5.41714 14.6963 5.41714H15.8957C15.9866 5.41714 16.0738 5.45327 16.1381 5.51757C16.2023 5.58186 16.2384 5.66907 16.2384 5.76C16.2384 6.39652 15.9857 7.00697 15.5358 7.45706C15.0859 7.90714 14.4758 8.16 13.8396 8.16C13.608 8.16026 13.3774 8.12912 13.1542 8.06743C12.7739 7.95753 12.4272 7.75403 12.1459 7.47552ZM15.1184 11.3478C15.1192 10.648 15.6919 10.0808 16.3984 10.08C17.1053 10.08 17.6784 10.6477 17.6784 11.3478C17.6784 12.048 17.1053 12.6157 16.3984 12.6157C16.16 12.6149 15.9267 12.5476 15.7253 12.4215L13.4022 13.7894C13.4031 13.8022 13.4049 13.8147 13.4066 13.8272C13.4092 13.8457 13.4117 13.8643 13.4117 13.8835C13.4125 14.5294 12.9225 15.0722 12.2745 15.1437C11.6266 15.2152 11.028 14.7923 10.8852 14.1623L8.74283 13.1113C8.3458 13.4923 7.74361 13.5705 7.2608 13.3038L4.79268 15.1283C4.8483 15.2706 4.87736 15.4215 4.87846 15.5741C4.87846 16.2742 4.30533 16.8419 3.59846 16.8419C2.89159 16.8419 2.31846 16.2742 2.31846 15.5741C2.31846 14.8737 2.89159 14.3062 3.59846 14.3062C3.82409 14.3075 4.04534 14.3684 4.23908 14.4828L6.68283 12.6764C6.48424 12.2023 6.59377 11.6566 6.96033 11.2938C7.32674 10.9311 7.87783 10.8229 8.35627 11.0197C8.8347 11.2168 9.14611 11.6798 9.14517 12.193C9.14314 12.248 9.13767 12.3028 9.12845 12.3571L11.0124 13.2814C11.2047 12.9241 11.5588 12.6805 11.9639 12.6268C12.3689 12.5731 12.7753 12.7158 13.0556 13.0104L15.1916 11.7527C15.1448 11.6227 15.1202 11.4859 15.1184 11.3478ZM15.5452 15.1514H17.2517C17.4874 15.1514 17.6785 15.3407 17.6785 15.5741L17.6784 21.6573C17.6784 21.8907 17.4873 22.08 17.2517 22.08H15.5452C15.3095 22.08 15.1184 21.8907 15.1184 21.6573L15.1185 15.5741C15.1185 15.3407 15.3096 15.1514 15.5452 15.1514ZM8.71848 15.9966H7.01177C6.77614 15.9966 6.58521 16.1859 6.58521 16.4193L6.58518 21.6573C6.58518 21.8907 6.77612 22.08 7.01174 22.08H8.71846C8.95408 22.08 9.14518 21.8907 9.14518 21.6573L9.1452 16.4193C9.1452 16.1859 8.95411 15.9966 8.71848 15.9966ZM2.31846 19.8001C2.31846 19.5668 2.50956 19.3776 2.74518 19.3776H4.45174C4.68737 19.3776 4.87846 19.5668 4.87846 19.8001L4.87843 21.6573C4.87843 21.8907 4.68734 22.08 4.45171 22.08H2.74516C2.50953 22.08 2.31844 21.8907 2.31844 21.6573L2.31846 19.8001ZM11.2784 17.6871H12.9852C13.2208 17.6871 13.4117 17.8764 13.4117 18.1098L13.4117 21.6573C13.4117 21.8907 13.2208 22.08 12.9851 22.08H11.2784C11.0428 22.08 10.8517 21.8907 10.8517 21.6573L10.8517 18.1098C10.8517 17.8764 11.0428 17.6871 11.2784 17.6871ZM2.79844 2.4C2.53334 2.4 2.31844 2.6149 2.31844 2.88C2.31844 3.1451 2.53334 3.36 2.79844 3.36H9.99844C10.2635 3.36 10.4784 3.1451 10.4784 2.88C10.4784 2.6149 10.2635 2.4 9.99844 2.4H2.79844ZM2.31844 5.28C2.31844 5.0149 2.53334 4.8 2.79844 4.8H7.11844C7.38353 4.8 7.59844 5.0149 7.59844 5.28C7.59844 5.5451 7.38353 5.76 7.11844 5.76H2.79844C2.53334 5.76 2.31844 5.5451 2.31844 5.28Z"
                                fill="#0066BE"
                                fill-opacity="0.6"
                              />
                            </svg>
                            <p>Content Analytics</p>
                          </Link>
                        </li>
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
        {/*Help pages for page1 end*/}

        {/*Help Pages for page2 start*/}
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
        {/*Help Pages for page2 end*/}

        {/*Help Pages for page3 start*/}
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
        {/*Help Pages for page3 end*/}

        {/*Help Pages for page4 start*/}
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
        {/*Help Pages for page5 end*/}

        {/*Help Pages for page6 start*/}
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

                    {/*<div className="help-popup-content-library-inside">
                        <p>
                          Demo list is the people you frequently email samples to
                          for review and approval.
                        </p>
                      </div>*/}

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
                      {/* <div className="help-popup-content-video">
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
                      </div> */}
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
                      {/* <div className="help-popup-content-video">
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
                    </div> */}
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
        {/*Help Pages for filter segment end*/}
        {/*Help Pages for filter segment start*/}
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
                      {/* <div className="help-popup-content-video">
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
                      </div> */}
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
        {/*Help Pages for filter segment end*/}

        {/*Help Pages for filter segment start*/}
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
                      {/* <div className="help-popup-content-video">
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
                    </div> */}
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
        {/*Help Pages for filter segment end*/}
        {/*Help Pages for filter segment start*/}
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
                    {/* <div className="help-popup-content-video">
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
                    </div> */}

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
        {/*Help Pages for filter segment end*/}
        {/*Help Pages for filter segment start*/}
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
                    {/* <div className="help-popup-content-video">
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
                    </div> */}
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
                    {/* <div className="help-popup-content-video">
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
                    </div> */}
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

        {/*Help Pages for filter segment start*/}
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
                    {/* <div className="help-popup-content-video">
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
                    </div> */}
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
        {/*Help Pages for filter segment end*/}

        {/*Help Pages for filter segment start*/}
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
                  {/* <div className="help-popup-content-video">
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
                      </div> */}
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
        {/*Help Pages for filter segment end*/}

        {/*Help Pages for filter segment start*/}
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
                      {/* <div className="help-popup-content-video">
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
                    </div> */}
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
        {/*Help Pages for filter segment end*/}

        {/*Help Pages for filter segment start*/}
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
                    {/* <div className="help-popup-content-video">
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
                    </div> */}
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
        {/*Help Pages for filter segment end*/}
        {/*Help Pages for filter segment start*/}
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
                      {/* <div className="help-popup-content-video">
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
                        </div> */}
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
        {/*Help Pages for filter segment end*/}

        {/*Help Pages for filter segment start*/}
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
                      {/* <div className="help-popup-content-video">
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
                        </div> */}
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
        {/*Help Pages for filter segment end*/}
        {/*Help Pages for filter segment start*/}
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
                    {/* <div className="help-popup-content-video">
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
                    </div> */}
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
        {/*Help Pages for filter segment end*/}
        {/*Help Pages for filter segment start*/}
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
        {/*Help Pages for filter segment end*/}

        {/*
          (location.pathname == "/EmailArticleSelect"  || location.pathname == "/CreateEmail") && (
            <>
            <div className="help-popup">
            <div className="help-popup-view" onClick={() => setHideShowSideContent((getHideShowSideContent) => !getHideShowSideContent)}>
              <svg width="16" height="38" viewBox="0 0 16 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z" fill="#0066BE" fillOpacity="0.6"/>
              </svg>
            </div>
            <div className= {getHideShowSideContent ? "help-popup-content show" : "help-popup-content"}>
            <div className="help-popup-content-inner">

              <div className="help-popup-content-library">
              <div className="help-popup-content-video">
                <h6>{title}</h6>
                <div className="help-content-popup" onClick={() => setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)}>
                  <a href="javascript:;">
                    <img src= {path_image + "video-popup.svg"} alt="" />
                  </a>
                </div>
              </div>
                <div className="help-popup-content-library-inside">
                  <img src= {path_image + "content-select.svg"} alt="" />
                  <p>At the top you can see the steps that you will go through to make an email. First step is to select the content.</p>
                </div>
                <div className="help-popup-content-list">
                  <p className="help-popup-title">All the content from your library is here and you can see:</p>
                  <ul>
                    <li>Content title</li>
                    <li>Subtitle</li>
                    <li>Tags</li>
                    <li>Uploaded date</li>
                    <li>Language</li>
                    <li>SPC</li>
                    <li>Previous emails the content has been sent to</li>
                  </ul>
                </div>
                <div className="help-popup-content-preview">
                  <div className="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Preview</a>
                  </div>
                  <p>You can preview the content to be sure it’s the right content that you want to send.</p>
                </div>
                <div className="help-popup-find-content">
                  <img src= {path_image + "search-img.svg"} alt="" />
                  <p className="help-popup-title">You can also find the right content: </p>
                  <ul>
                    <li>search for the content </li>
                    <li>Use the filter</li>
                  </ul>
                </div>
                <div className="help-popup-next">
                  <div className="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Next</a>
                    </div>
                  <p>After selecting you click next to go to start writing the email.</p>
                </div>

              </div>
              <div className="help-popup-close" onClick={() => setHideShowSideContent((getHideShowSideContent) => !getHideShowSideContent)}>
                  <a href="javascript:;">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="2.72751" height="19.7402" rx="1.36376" transform="matrix(0.702046 0.712132 -0.702046 0.712132 14.0859 0.000976562)" fill="#8A4E9C"/>
                      <rect width="2.72751" height="19.7402" rx="1.36376" transform="matrix(0.702046 -0.712132 0.702046 0.712132 0 1.94238)" fill="#8A4E9C"/>
                    </svg>
                  </a>
              </div>
            </div>
            </div>
          </div>
            </>
          )*/}

        {/*Start Video Modal Functionality*/}
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
        {/*End Video Modal Functionality*/}
      </div>
    </>
  );
};

export default Sidebar;
