import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useLocation } from 'react-router-dom';
import { Modal, ModalDialog } from "react-bootstrap";
import { Player, BigPlayButton } from 'video-react';
let title = "";
let video_url = "";
let video_poster = "";
const Sidebar = () => {
  let c_id = 0;
  const location = useLocation();
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [getHideShowSideContent, setHideShowSideContent] = useState(false);
  const [getOpenVideoPopup, setOpenVideoPopup] = useState(false);

  const toggleClassToBody = () => {
    document.body.classList.toggle('toggle_sidebar');
  }

  if(location.pathname != "/EmailList" && location.pathname != "/SmartList" ){
      document.body.classList.add('toggle_sidebar');
  }else{
      document.body.classList.remove('toggle_sidebar');
  }

  if(location.pathname == "/EmailList"){
    title = "Email overview";
    video_url = "https://informed.pro/react_help/videos/email_page_1.mp4";
    video_poster = "https://informed.pro/react_help/poster/email_page_1.png";
  }else if(location.pathname == "/EmailArticleSelect"){
    title = "Selecting content for your email";
    video_url = "https://informed.pro/react_help/videos/email_page_2.mp4";
    video_poster = "https://informed.pro/react_help/poster/email_page_2.png";
  }else if(location.pathname == "/CreateEmail"){
    title = "Writing your email";
    video_url = "https://informed.pro/react_help/videos/email_page_3.mp4";
    video_poster = "https://informed.pro/react_help/poster/email_page_3.png";
  }else if(location.pathname == "/SelectHCP"){
    title = "Select HCPs to mail";
    video_url = "https://informed.pro/react_help/videos/email_page_4.mp4";
    video_poster = "https://informed.pro/react_help/poster/email_page_4.png";
  }else if(location.pathname == "/VerifyHCP"){
    title = "Select HCPs to mail";
    video_url = "https://informed.pro/react_help/videos/email_page_5.mp4";
    video_poster = "https://informed.pro/react_help/poster/email_page_5.png";
  }else if(location.pathname == "/verifyMAIL"){
    title = "Verify your email";
    video_url = "https://informed.pro/react_help/videos/email_page_8.mp4";
    video_poster = "https://informed.pro/react_help/poster/email_page_8.png";
  }else if(location.pathname == "/SelectSmartListUsers"){
    title = "Verify your list";
    video_url = "https://informed.pro/react_help/videos/email_page_6.mp4";
    video_poster = "https://informed.pro/react_help/poster/email_page_6.png";
  }else if(location.pathname == "/SelectSmartList"){
    title = "Select Smartlist";
    video_url = "";
    video_poster = "";
  }else if(location.pathname == "/SmartList"){
    localStorage.removeItem("sd_i");
    title = "Creating new SmartList";

  }else if(location.pathname == "/CreateSmartList"){
    title = "Creating new SmartList";
    video_url = "https://informed.pro/react_help/videos/smart_list_uploading_excel.mp4";
    video_poster = "https://informed.pro/react_help/poster/smart_list_uploading_excel.png";
    if(localStorage.getItem("sd_i")){
      c_id = localStorage.getItem("sd_i");
    }
  }else if(location.pathname =="/ViewSmartList"){
    title = "View smart list readers";
    video_url = "";
  }else if(location.pathname == "/EditList"){
    title = "Edit smart list";
    video_url = "";
  }else if(location.pathname == "/SmartListFilter"){
    title = "Creating new SmartList";
    video_url = "https://informed.pro/react_help/videos/smart_list_sagment.mp4";
    video_poster = "https://informed.pro/react_help/poster/smart_list_sagment.png";
    if(localStorage.getItem("sd_i")){
      c_id = localStorage.getItem("sd_i");
    }
  }else if(location.pathname == "/UploadExcel"){
    title = "Verify Readers list.";
    video_url = "";
    if(localStorage.getItem("sd_i")){
      c_id = localStorage.getItem("sd_i");
    }
  }

  return (
    <>
      <div className="left-sidebar">
        <div className="sidebar-menu">
          <button className="toggle_btn" onClick={() =>
            toggleClassToBody()
          }>
            <img
              src={path_image + "arrow-left.svg"}
              alt="toggle-sidebar"
            />
          </button>
          <ul>
            <li className={(location.pathname == "/EmailList" || location.pathname === "/EmailArticleSelect" || location.pathname === "/CreateEmail" ||
                            location.pathname === "/SelectHCP" || location.pathname === "/CreateEmail" || location.pathname === "/VerifyHCP" ||
                            location.pathname === "/VerifyMAIL" || location.pathname === "/verifyMAIL" || location.pathname ==="/SelectSmartListUsers" ||
                            location.pathname ==="/SelectSmartList" || location.pathname === "/VerifyHcpMAIL" ||
                            ((location.pathname == "/CreateSmartList" || location.pathname == "/SmartListFilter" || location.pathname == "/UploadExcel")
                             && (c_id != 0)) ) ? "active" : "side_li"} >
              <Link to={"/EmailList"} >
                  <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z" fill="rgba(0, 102, 190, 0.6)"/>
                  <path d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7.98861 12.1922 7.96501 12.2745 7.92Z" fill="rgba(0, 102, 190, 0.6)"/>
                  </svg>
                   <p>Email</p>
              </Link>
            </li>
            <li>
              <a href="javascript:void();">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.2385 4.16635L11.1144 10.2818C11.0398 10.3232 10.9561 10.3449 10.8711 10.3449C10.7861 10.3449 10.7024 10.3232 10.6278 10.2818L0.493317 4.16635C0.741985 3.80693 1.07206 3.51339 1.45576 3.31042C1.83947 3.10745 2.26559 3.00099 2.69827 3H19.0336C19.4663 3.00099 19.8924 3.10745 20.2761 3.31042C20.6598 3.51339 20.9899 3.80693 21.2385 4.16635Z" fill="#0066BE" fill-opacity="0.6"/>
                  <path d="M21.6665 5.10146L11.6355 11.1539C11.4039 11.2884 11.1416 11.3592 10.8747 11.3592C10.6078 11.3592 10.3455 11.2884 10.1138 11.1539L0.0724633 5.10146C0.0244647 5.31164 0.000154289 5.52667 0 5.74242V16.0189C0 16.7462 0.284658 17.4438 0.791353 17.9581C1.29805 18.4724 1.98527 18.7614 2.70185 18.7614H13.6715C13.5318 18.2602 13.457 17.7314 13.457 17.1848C13.457 13.9932 16.006 11.4058 19.1504 11.4058C20.0826 11.4058 20.9624 11.6332 21.739 12.0363V5.74242C21.7388 5.52667 21.7145 5.31164 21.6665 5.10146Z" fill="#0066BE" fill-opacity="0.6"/>
                  <path d="M23.2371 19.3041C23.4753 19.3041 23.6684 19.1081 23.6684 18.8663C23.6684 18.6245 23.4753 18.4285 23.2371 18.4285C22.9989 18.4285 22.8058 18.6245 22.8058 18.8663C22.8058 19.1081 22.9989 19.3041 23.2371 19.3041Z" fill="#0066BE" fill-opacity="0.6"/>
                  <path d="M22.7303 20.2761C22.7303 20.5179 22.5372 20.714 22.299 20.714C22.0608 20.714 21.8677 20.5179 21.8677 20.2761C21.8677 20.0344 22.0608 19.8383 22.299 19.8383C22.5372 19.8383 22.7303 20.0344 22.7303 20.2761Z" fill="#0066BE" fill-opacity="0.6"/>
                  <path d="M23.5687 17.6233C23.8069 17.6233 24 17.4273 24 17.1855C24 16.9437 23.8069 16.7477 23.5687 16.7477C23.3305 16.7477 23.1374 16.9437 23.1374 17.1855C23.1374 17.4273 23.3305 17.6233 23.5687 17.6233Z" fill="#0066BE" fill-opacity="0.6"/>
                  <path d="M21.3312 21.2325C21.3312 21.4743 21.1381 21.6703 20.8999 21.6703C20.6617 21.6703 20.4686 21.4743 20.4686 21.2325C20.4686 20.9907 20.6617 20.7947 20.8999 20.7947C21.1381 20.7947 21.3312 20.9907 21.3312 21.2325Z" fill="#0066BE" fill-opacity="0.6"/>
                  <path d="M19.2532 21.1244C18.632 21.1252 18.0196 20.9746 17.4677 20.6853C16.9157 20.396 16.4401 19.9765 16.081 19.462C15.7219 18.9474 15.4897 18.353 15.4039 17.7284C15.3181 17.1039 15.3812 16.4676 15.5879 15.873C15.7946 15.2784 16.1389 14.7428 16.5919 14.3112C17.0448 13.8797 17.5932 13.5648 18.1909 13.393C18.7886 13.2212 19.4182 13.1975 20.0268 13.3239C20.6354 13.4504 21.2052 13.7232 21.6884 14.1195H20.9784C20.8641 14.1195 20.7543 14.1657 20.6735 14.2478C20.5926 14.3299 20.5471 14.4412 20.5471 14.5573C20.5471 14.6734 20.5926 14.7848 20.6735 14.8669C20.7543 14.949 20.8641 14.9951 20.9784 14.9951H22.7037C22.8181 14.9951 22.9278 14.949 23.0087 14.8669C23.0896 14.7848 23.135 14.6734 23.135 14.5573V12.8061C23.135 12.69 23.0896 12.5787 23.0087 12.4965C22.9278 12.4144 22.8181 12.3683 22.7037 12.3683C22.5893 12.3683 22.4796 12.4144 22.3987 12.4965C22.3178 12.5787 22.2724 12.69 22.2724 12.8061V13.4764C21.6859 12.9842 20.9912 12.6425 20.2472 12.4802C19.5032 12.3179 18.7316 12.3397 17.9976 12.5438C17.2637 12.7479 16.5889 13.1283 16.0302 13.6529C15.4716 14.1774 15.0455 14.8308 14.7881 15.5577C14.5306 16.2846 14.4492 17.0637 14.5509 17.8293C14.6525 18.5948 14.9342 19.3243 15.3721 19.9561C15.8099 20.5879 16.3912 21.1034 17.0667 21.4592C17.7422 21.8149 18.4922 22.0004 19.2532 22C19.3676 22 19.4773 21.9539 19.5582 21.8718C19.6391 21.7897 19.6845 21.6783 19.6845 21.5622C19.6845 21.4461 19.6391 21.3347 19.5582 21.2526C19.4773 21.1705 19.3676 21.1244 19.2532 21.1244Z" fill="#0066BE" fill-opacity="0.6"/>
                  <path d="M20.9753 18.4969C20.9753 18.613 20.9299 18.7243 20.849 18.8064C20.7681 18.8885 20.6585 18.9346 20.5441 18.9346C20.4297 18.9346 20.32 18.8885 20.2391 18.8064L18.9452 17.493C18.8643 17.4109 18.8188 17.2996 18.8188 17.1835V14.5567C18.8188 14.4405 18.8643 14.3292 18.9452 14.2471C19.026 14.165 19.1357 14.1188 19.2501 14.1188C19.3645 14.1188 19.4742 14.165 19.5551 14.2471C19.636 14.3292 19.6815 14.4405 19.6815 14.5567V17.0022L20.849 18.1874C20.9299 18.2695 20.9753 18.3808 20.9753 18.4969Z" fill="#0066BE" fill-opacity="0.6"/>
                  </svg>
                <p>Auto Email</p>
              </a>
            </li>
            <li>
              <a href="javascript:void();">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2612_34718)">
                <path d="M14.7656 12.7676H19.0834V15.5121H14.7656V12.7676Z" fill="#0066BE" fill-opacity="0.6"/>
                <path d="M14.6797 18.3516L19.11 18.3518V21.2443H14.6842L14.6797 18.3516Z" fill="#0066BE" fill-opacity="0.6"/>
                <path d="M5 12.8048L12 12.8047V21L5 21.0001V12.8048Z" fill="#0066BE" fill-opacity="0.6"/>
                <path d="M3.45312 1.82092e-05C2.34855 1.92626e-05 1.45312 0.895449 1.45312 2.00002V2.8594H22.5469V2C22.5469 0.895431 21.6514 8.5395e-07 20.5469 1.90735e-06L3.45312 1.82092e-05Z" fill="#0066BE" fill-opacity="0.6"/>
                <path d="M5 7H19V10H5V7Z" fill="#0066BE" fill-opacity="0.6"/>
                <path d="M1.4533 21.9998C1.45321 23.1045 2.34866 24 3.4533 24H20.5486C21.6532 24 22.5486 23.1046 22.5486 22V4.26562H1.45489L1.4533 21.9998ZM19.7361 21.1406C19.7361 21.5292 19.4216 21.8438 19.033 21.8438H14.8143C14.4257 21.8438 14.1111 21.5292 14.1111 21.1406V18.3281C14.1111 17.9396 14.4257 17.625 14.8143 17.625H19.033C19.4216 17.625 19.7361 17.9396 19.7361 18.3281V21.1406ZM19.7361 15.5156C19.7361 15.9042 19.4216 16.2188 19.033 16.2188H14.8143C14.4257 16.2188 14.1111 15.9042 14.1111 15.5156V12.7031C14.1111 12.3146 14.4257 12 14.8143 12H19.033C19.4216 12 19.7361 12.3146 19.7361 12.7031V15.5156ZM4.26739 7.07812C4.26739 6.68958 4.58196 6.375 4.97051 6.375H19.033C19.4216 6.375 19.7361 6.68958 19.7361 7.07812V9.89062C19.7361 10.2792 19.4216 10.5938 19.033 10.5938H4.97051C4.58196 10.5938 4.26739 10.2792 4.26739 9.89062V7.07812ZM4.26739 12.7031C4.26739 12.3146 4.58196 12 4.97051 12H12.0018C12.3903 12 12.7049 12.3146 12.7049 12.7031V21.1406C12.7049 21.5292 12.3903 21.8438 12.0018 21.8438H4.97051C4.58196 21.8438 4.26739 21.5292 4.26739 21.1406V12.7031Z" fill="#0066BE" fill-opacity="0.6"/>
                </g>
                <defs>
                <clipPath id="clip0_2612_34718">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                <p>Template Builder</p>
              </a>
            </li>
            <li className={((location.pathname ==  "/SmartList" || location.pathname == "/EditList" || location.pathname == "/CreateSmartList" || location.pathname =="/SmartListFilter" ||  location.pathname =="/UploadExcel"||  location.pathname =="/ViewSmartList" ||   location.pathname=="/VerifySmartList") && (c_id == 0)) ? "active" : "side_li"} >

              <Link to={"/SmartList"} >

                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.483 4.36793C15.5927 5.0637 16.3708 6.24109 16.5125 7.60777C16.965 7.81923 17.4673 7.94083 17.9999 7.94083C19.944 7.94083 21.5197 6.36509 21.5197 4.42125C21.5197 2.47711 19.944 0.901367 17.9999 0.901367C16.0743 0.901966 14.5123 2.44955 14.483 4.36793ZM12.177 11.5748C14.1212 11.5748 15.6969 9.99878 15.6969 8.05494C15.6969 6.1111 14.1209 4.53536 12.177 4.53536C10.2332 4.53536 8.65653 6.1114 8.65653 8.05524C8.65653 9.99908 10.2332 11.5748 12.177 11.5748ZM13.6701 11.8147H10.6833C8.19828 11.8147 6.17656 13.8367 6.17656 16.3218V19.9744L6.18585 20.0316L6.43744 20.1104C8.80899 20.8513 10.8693 21.0984 12.5652 21.0984C15.8775 21.0984 17.7974 20.1541 17.9157 20.0939L18.1508 19.975H18.176V16.3218C18.1769 13.8367 16.1551 11.8147 13.6701 11.8147ZM19.4935 8.18104H16.5298C16.4978 9.36681 15.9916 10.4346 15.191 11.2025C17.3999 11.8594 19.0161 13.9077 19.0161 16.3272V17.4528C21.9423 17.3455 23.6286 16.5162 23.7397 16.4605L23.9748 16.3413H24V12.6875C24 10.2028 21.9783 8.18104 19.4935 8.18104ZM6.00075 7.94143C6.68933 7.94143 7.32999 7.74045 7.87271 7.39811C8.04523 6.27284 8.64845 5.28954 9.51015 4.61982C9.51374 4.55393 9.52003 4.48864 9.52003 4.42215C9.52003 2.47801 7.94399 0.902266 6.00075 0.902266C4.05631 0.902266 2.48087 2.47801 2.48087 4.42215C2.48087 6.36539 4.05631 7.94143 6.00075 7.94143ZM9.16181 11.2025C8.36511 10.4385 7.86073 9.3764 7.82389 8.19781C7.71397 8.18972 7.60524 8.18104 7.49322 8.18104H4.50678C2.02171 8.18104 0 10.2028 0 12.6875V16.3407L0.00928491 16.397L0.260876 16.4764C2.16338 17.0703 3.86133 17.344 5.33613 17.4303V16.3272C5.33673 13.9077 6.9523 11.86 9.16181 11.2025Z" fill="rgba(0, 102, 190, 0.6)"/>
                </svg>
                  <p>Smart list</p>
              </Link>
            </li>
            <li>
              <a href="javascript:void();">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.7924 9.57792L21.2929 7.56503V0.547555C21.2929 0.243409 21.0496 9.2425e-05 20.7454 9.2425e-05H20.7399H3.26534C2.9612 -0.0054375 2.71788 0.237879 2.71235 0.542025V0.547555V7.56503L0.218353 9.57239H0.212823C0.0801045 9.67746 0.00268555 9.8323 0.00268555 10.0037V21.2405C0.00821547 22.7668 1.24692 24 2.77318 24H21.2265C22.7528 24 23.9915 22.7668 23.997 21.2405V10.0037C24.0026 9.83783 23.9252 9.67746 23.7924 9.57792ZM21.2929 8.98622L22.515 9.97055L21.2929 10.8111V8.98622ZM3.81834 1.10608H20.1869V11.5742L12.9427 16.5567C12.3731 16.9438 11.6321 16.9438 11.0625 16.5567L3.81834 11.5742V1.10608ZM2.71235 8.98622V10.8111L1.49024 9.97055L2.71235 8.98622ZM22.8966 21.2405C22.8911 22.1585 22.1445 22.894 21.2321 22.894H2.77318C1.85521 22.894 1.1142 22.1585 1.10867 21.2405V11.0599L10.4321 17.4691C11.3777 18.1161 12.622 18.1161 13.5731 17.4691L22.8966 11.0599V21.2405Z" fill="#0066BE" fill-opacity="0.6"/>
              <path d="M22.8966 21.2405C22.8911 22.1585 22.1445 22.894 21.2321 22.894H2.77318C1.85521 22.894 1.1142 22.1585 1.10867 21.2405V11.0599L10.4321 17.4691C11.3777 18.1161 12.622 18.1161 13.5731 17.4691L22.8966 11.0599V21.2405Z" fill="#0066BE" fill-opacity="0.6"/>
              <path d="M12.7861 5.53076H11C10.7816 5.53076 10.603 5.77961 10.603 6.08376V11.4478C10.603 11.7519 10.7816 12.0008 11 12.0008H12.7861C13.0044 12.0008 13.183 11.7519 13.183 11.4478V6.08376C13.183 5.77961 13.0044 5.53076 12.7861 5.53076Z" fill="#0066BE" fill-opacity="0.6"/>
              <path d="M15.7896 12H17.5757C17.794 12 17.9727 11.7512 17.9727 11.447V3.2627C17.9727 2.95855 17.794 2.70971 17.5757 2.70971H15.7896C15.5713 2.70971 15.3927 2.95855 15.3927 3.2627V11.447C15.3927 11.7512 15.5713 12 15.7896 12Z" fill="#0066BE" fill-opacity="0.6"/>
              <path d="M8.00049 7.52221L6.52809 7.521C6.22394 7.521 5.9751 7.76984 5.9751 8.07399V11.4473C5.9751 11.7514 6.22394 12.0003 6.52809 12.0003L8.00049 12.0015C8.30463 12.0015 8.55348 11.7526 8.55348 11.4485V8.0752C8.55348 7.77106 8.30463 7.52221 8.00049 7.52221Z" fill="#0066BE" fill-opacity="0.6"/>
              </svg>
                <p>Email Analytics</p>
              </a>
            </li>
          </ul>
        </div>

        {/*Help pages for page1 start*/}
        {
          location.pathname == "/EmailList" && (
            <>
            <div className="help-popup">
              <div className="help-popup-view" onClick={() => setHideShowSideContent((getHideShowSideContent) => !getHideShowSideContent)}>
                <svg width="16" height="38" viewBox="0 0 16 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z" fill="#0066BE" fill-opacity="0.6"/>
                </svg>
              </div>
              <div className= {getHideShowSideContent ? "help-popup-content show" : "help-popup-content"}>
              <div className="help-popup-content-inner">

                <div className="help-popup-content-library">
                <div className="help-popup-content-video">
                  <h6>Email overview</h6>
                  <div className="help-content-popup" onClick={() => setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)}>
                    <a href="javascript:;">
                      <img src= {video_poster} alt="" />
                    </a>
                  </div>
                </div>
                  <div className="help-popup-content-list">
                    <p className="help-popup-title">The navigation bar links to:</p>
                    <ul>
                      <li>Email</li>
                      <li>Auto Email</li>
                      <li>Template Builder</li>
                      <li>Smart List</li>
                      <li>Email Analytics </li>
                    </ul>
                  </div>
                  <div className="help-popup-content-library-inside">
                    <p>This page contains all the emails you draft and send.</p>
                  </div>

                  <div className="help-popup-content-library-inside">
                    <p>You can create a new email by clicking the Create Email box.</p>
                  </div>

                  <div className="help-popup-find-content">
                    <p className="help-popup-title">There are three types of emails: </p>
                    <ul>
                      <li>Draft (yellow bar)</li>
                      <li>Approved Draft (Green bar)</li>
                      <li>Send (no colour)</li>
                    </ul>
                  </div>

                  <div className="help-popup-content-library-inside">
                    <p>Use the Search box quickly identify the right email.</p>
                  </div>

                  <div className="help-popup-content-library-inside">
                    <p>The Filter By icon narrows down your search by selecting criteria.</p>
                  </div>

                  <div className="help-popup-content-library-inside">
                    <p>Click the trashcan to delete any draft or email you no longer want.</p>
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
          )
        }
        {/*Help pages for page1 end*/}


        {/*Help Pages for page2 start*/}
        {
          location.pathname == "/EmailArticleSelect" && (
            <>
            <div className="help-popup">
            <div className="help-popup-view" onClick={() => setHideShowSideContent((getHideShowSideContent) => !getHideShowSideContent)}>
              <svg width="16" height="38" viewBox="0 0 16 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z" fill="#0066BE" fill-opacity="0.6"/>
              </svg>
            </div>
            <div className= {getHideShowSideContent ? "help-popup-content show" : "help-popup-content"}>
            <div className="help-popup-content-inner">

              <div className="help-popup-content-library">
              <div className="help-popup-content-video">
                <h6>{title}</h6>
                <div className="help-content-popup" onClick={() => setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)}>
                  <a href="javascript:;">
                    <img src= {video_poster} alt="" />
                  </a>
                </div>
              </div>
                <div className="help-popup-content-library-inside">
                  <p>This page let you pick the correct content to email. As you go to the next page the email will be saved as a draft on the email page (previous page).</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <img src= {path_image + "content-select.svg"} alt="" />
                  <p>You can track your progress and navigate back when needed.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>This page shows all the content from your Library.</p>
                </div>

                <div className="help-popup-find-content">
                  <img src= {path_image + "search-img.svg"} alt="" />
                  <p className="help-popup-title">You can also use the search bar or filter box to find your content.</p>
                </div>

                <div className="help-popup-find-content">
                  <img src= {path_image + "help/placeholder_content.png"} alt="" />
                  <p className="help-popup-title">Click "Placeholder" box if your content is not ready yet. </p>
                </div>

                <div className="help-popup-find-content">
                  <img src= {path_image + "help/pure_content.png"} alt="" />
                  <p className="help-popup-title">Click "Pure text" you don’t want to include any content in your email.</p>
                </div>

                <div className="help-popup-find-content">
                  <img src= {path_image + "help/sample_content.png"} alt="" />
                  <p className="help-popup-title">Each "Content box" will include the title of the content, subtitle, tag, upload date, language, if a SPC is included, and the date of the last email the content was included in.</p>
                </div>

                <div className="help-popup-content-preview">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Preview</a>
                  </div>
                  <p>The "Preview" button will open the Docintel link in a new tab. Please check that you are selecting the correct content.</p>
                </div>

                <div className="help-popup-next" id="selected_center_img">
                  <img src= {path_image + "help/selected_btn.png"} alt="" />
                  <p className="help-popup-title">Click the checkmark to select the content you want to email and click on the next button to move to the next step.</p>
                </div>

                <div className="help-popup-next">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Cancel</a>
                    </div>
                  <p>Click "Cancel" to stop the content selection process. At this stage no Draft will be saved.</p>
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
          )
        }
        {/*Help Pages for page2 end*/}


        {/*Help Pages for page3 start*/}
        {
          location.pathname == "/CreateEmail" && (
            <>
            <div className="help-popup">
            <div className="help-popup-view" onClick={() => setHideShowSideContent((getHideShowSideContent) => !getHideShowSideContent)}>
              <svg width="16" height="38" viewBox="0 0 16 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z" fill="#0066BE" fill-opacity="0.6"/>
              </svg>
            </div>
            <div className= {getHideShowSideContent ? "help-popup-content show" : "help-popup-content"}>
            <div className="help-popup-content-inner">

              <div className="help-popup-content-library">
              <div className="help-popup-content-video">
                <h6>{title}</h6>
                <div className="help-content-popup" onClick={() => setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)}>
                  <a href="javascript:;">
                    <img src= {video_poster} alt="" />
                  </a>
                </div>
              </div>
                <div className="help-popup-content-library-inside">
                  <p>This page let you pick your template, craft your email, and correct drafts.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <img src= {path_image + "help/selected_template.png"} alt="" />
                  <p>Select the template that you want to use as your email.</p>
                </div>

                  {/*Adding ul li*/}
                  <div className="help-popup-content-list">
                    <img src= {path_image + "help/creating_email.png"} alt="" />
                    <p className="help-popup-title">To manage your campaigns and emails we ask that you enter the following information:</p>
                    <ul>
                      <li>Email description (what is this email about)</li>
                      <li>Email campaign (Is it part of a campaign of many emails? For instance ISTH2022)</li>
                      <li>Email creator (autofills with your login name, but you can change it)</li>
                    </ul>
                  </div>

                <div className="help-popup-content-preview">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">+ Add Tag</a>
                  </div>
                  <p>We use #tags for both analytics and to sort and find emails.Click the "+Add Tags" button to select, remove or add new tags.</p>
                </div>

                <div className="help-popup-find-content">
                  <img src= {path_image + "help/subject.png"} alt="" />
                  <p className="help-popup-title">Enter the email subject line (this is a draft and you can change it as many times as needed).</p>
                </div>

                <div className="help-popup-content-preview">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Save as Template</a>
                  </div>
                  <p>"Save as Template" updates the current template or saves as a new template. </p>
                </div>

                <div className="help-popup-content-preview">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Save as new Template</a>
                  </div>
                  <p>Save as a new template you need to enter a new name for the template that will appear in the template section at the top.</p>
                </div>

                <div className="help-popup-content-preview">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Send a Sample</a>
                  </div>
                  <p>"Send a Sample" lets you email your sample for feedback/approval from peers.</p>
                </div>

                <div className="help-popup-find-content">
                  <img src= {path_image + "help/search_hcp.png"} alt="" />
                  <p>You can search for people by their name or email or both. You can also add a person to your CRM.</p>
                </div>

                <div className="help-popup-next">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Save As Draft</a>
                    </div>
                  <p>While you wait for approval you can save your template by clicking the "Save As Draft" button.
                    This action will take you to the main page where you can see your draft email.</p>
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
          )
        }
        {/*Help Pages for page3 end*/}


        {/*Help Pages for page4 start*/}
        {
          location.pathname == "/SelectHCP" && (
            <>
            <div className="help-popup">
            <div className="help-popup-view" onClick={() => setHideShowSideContent((getHideShowSideContent) => !getHideShowSideContent)}>
              <svg width="16" height="38" viewBox="0 0 16 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z" fill="#0066BE" fill-opacity="0.6"/>
              </svg>
            </div>
            <div className= {getHideShowSideContent ? "help-popup-content show" : "help-popup-content"}>
            <div className="help-popup-content-inner">

              <div className="help-popup-content-library">
              <div className="help-popup-content-video">
                <h6>{title}</h6>
                <div className="help-content-popup" onClick={() => setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)}>
                  <a href="javascript:;">
                    <img src= {video_poster} alt="" />
                  </a>
                </div>
              </div>
                <div className="help-popup-content-library-inside">
                  <p>This page lets you choose to send to one HCP or a segment of your contacts.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <img src= {path_image + "help/selected_hcp.png"} alt="" />
                  <p>Select a group or a single HCP to include in your campaign email.</p>
                </div>


                <div className="help-popup-next">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Save As Draft</a>
                    </div>
                  <p>At this stage you can also save you email as a draft by selecting the "Save As Draft" button in the top right-hand corner.</p>
                </div>

                <div className="help-popup-next">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Back</a>
                    </div>
                  <p>By selecting the "Back" button you can go back to the previous step to amend your email template.</p>
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
          )
        }
        {/*Help Pages for page4 end*/}



        {/*Help Pages for page5 start*/}
        {
          location.pathname == "/SelectSmartList" && (
            <>
            <div className="help-popup">
            <div className="help-popup-view" onClick={() => setHideShowSideContent((getHideShowSideContent) => !getHideShowSideContent)}>
              <svg width="16" height="38" viewBox="0 0 16 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z" fill="#0066BE" fill-opacity="0.6"/>
              </svg>
            </div>
            <div className= {getHideShowSideContent ? "help-popup-content show" : "help-popup-content"}>
            <div className="help-popup-content-inner">

              <div className="help-popup-content-library">
              {
                /*
                <div className="help-popup-content-video">
                  <h6>{title}</h6>
                  <div className="help-content-popup" onClick={() => setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)}>
                    <a href="javascript:;">
                      <img src= {video_poster} alt="" />
                    </a>
                  </div>
                </div>
                */
              }

                <div className="help-popup-content-library-inside">
                  <p>At the bottom of the page you can see all your smart lists.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <img src= {path_image + "help/smart_list.png"} alt="" />
                  <p>Each smart list will contain key data held on your HCPs.
                    You can also see date and time when the smart list was created, and the number of people included in the list. </p>
                </div>


                <div className="help-popup-next">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">View</a>
                    </div>
                  <p>The "View" button opens a window with information about people on your smart list.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <img src= {path_image + "help/more_info.png"} alt="" />
                  <p>By clicking "Show more information" you see further information about your contacts. </p>
                </div>

                <div className="help-popup-content-library-inside">
                  <img src= {path_image + "help/create_upload.png"} alt="" />
                  <p>If you don’t have a smart list in your account select the "Create New Smart List" or "Upload Excel File" buttons to create a new smart list.</p>
                </div>

                <div className="help-popup-next">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Upload Excel File</a>
                    </div>
                  <p>The "Upload Excel File" button opens a new window where you enter the name of your smart list, the name of the list creator and you can upload or download your excel file to the list.</p>
                </div>

                <div className="help-popup-next">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Create New Smart List</a>
                    </div>
                  <p>Create New Smart List enter the name of the list and who created it. At this point you can make your list a demo list. </p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>You can create a new smart list from (???)</p>
                </div>

                <div className="help-popup-next">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Download</a>
                    </div>
                  <p>You can download sample Excel file to upload new HPC by clicking on the "Download" button at the bottom of the page.</p>
                </div>



                <div className="help-popup-next">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Cancel</a>
                    </div>
                  <p>If you decide not to create a list click the "Cancel" button and go back to the main page.</p>
                </div>


                <div className="help-popup-next">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Save As Draft</a>
                    </div>
                  <p>After selecting the smart list that you want, you can save the email as a draft by clicking on "Save As Draft". </p>
                </div>

                <div className="help-popup-next">
                  <div class="btn-form">
                    <a href="javascript:;" className="btn btn-primary btn-filled">Next</a>
                    </div>
                  <p>The "Next" button takes you to the next stage of the process. </p>
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
          )
        }
        {/*Help Pages for page5 end*/}



        {/*Help Pages for page6 start*/}
        {
          location.pathname == "/SelectSmartListUsers" && (
            <>
            <div className="help-popup">
            <div className="help-popup-view" onClick={() => setHideShowSideContent((getHideShowSideContent) => !getHideShowSideContent)}>
              <svg width="16" height="38" viewBox="0 0 16 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z" fill="#0066BE" fill-opacity="0.6"/>
              </svg>
            </div>
            <div className= {getHideShowSideContent ? "help-popup-content show" : "help-popup-content"}>
            <div className="help-popup-content-inner">

              <div className="help-popup-content-library">
              <div className="help-popup-content-video">
                <h6>{title}</h6>
                <div className="help-content-popup" onClick={() => setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)}>
                  <a href="javascript:;">
                    <img src= {video_poster} alt="" />
                  </a>
                </div>
              </div>
                <div className="help-popup-content-library-inside">
                  <p>At the bottom at this page you can see all the people that you have selected.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>You can scroll down to see all the people.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>By clicking "Show more information" button you can see more information about your contacts. </p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>The "Add" button allows you to add more people at this stage too. A box "Add New HCP" will pop up and you need to fill out your contact’s first and last name, email, contact type and country. You can add two people at the time by clicking "Add HCP" button on the right-hand side. When you finish click on "Save" button. </p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>You can delete a person from your list by clicking the "Delete" button or by clicking the “Add” button on the side for your contact to re-join the list. </p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>The "Edit" button allows you to amend information about your contacts. </p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>Click on "Save" button to keep your changes. </p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>Click on "Close" if you don’t want to save your amendments. </p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>By clicking the "Sort by" button you can see your contacts in alphabetical order. </p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>The "Next" button in the top right-hand corner takes you to the next step. </p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>If you are not yet ready to continue to the next step click on the "Save As Draft" button. </p>
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
          )
        }
        {/*Help Pages for page6 end*/}

        {/*Help Pages for page8 start*/}
        {
          location.pathname == "/verifyMAIL" && (
            <>
            <div className="help-popup">
            <div className="help-popup-view" onClick={() => setHideShowSideContent((getHideShowSideContent) => !getHideShowSideContent)}>
              <svg width="16" height="38" viewBox="0 0 16 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z" fill="#0066BE" fill-opacity="0.6"/>
              </svg>
            </div>
            <div className= {getHideShowSideContent ? "help-popup-content show" : "help-popup-content"}>
            <div className="help-popup-content-inner">

              <div className="help-popup-content-library">
              <div className="help-popup-content-video">
                <h6>{title}</h6>
                <div className="help-content-popup" onClick={() => setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)}>
                  <a href="javascript:;">
                    <img src= {video_poster} alt="" />
                  </a>
                </div>
              </div>
                <div className="help-popup-content-library-inside">
                  <p>On this page you can see all the information about the email that you want to send.</p>
                </div>

                <div className="help-popup-content-list">
                  <p className="help-popup-title">At the top you can see:</p>
                  <ul>
                    <li>Campaign title</li>
                    <li>Creator</li>
                    <li>Tags</li>
                  </ul>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>You can also preview the content that you want to send.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>The recipients of your email can be seen at the bottom of the page. By clicking the "View" button you can see the list of people that you want to email. </p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>On the right-hand side of the screen you see the actual email that will be send.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>You can approve your draft by clicking on the "Approve" button if you haven’t done it in the previous step.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>You can still save your email as draft by clicking on the "Save As Draft" button in the top right-hand corner.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>Click the "Send" button if your email is ready for distribution.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>In the main distribution page you can see that your email has been sent.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>In the box there are three buttons: view, resend and send new.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>By clicking the "View" button you can see your tracking information. At the bottom you can see the actual email.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>The "Resend" button will send the email to all the people that haven’t opened the email yet. </p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>The "Send New" button will send the same email to different people. This action will take you to the selection of HCPs that you want to send your email to.</p>
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
          )
        }
        {/*Help Pages for page8 end*/}


        {/*Help Pages for Smart list upload Excel start*/}
        {
          location.pathname == "/CreateSmartList" && (
            <>
            <div className="help-popup">
            <div className="help-popup-view" onClick={() => setHideShowSideContent((getHideShowSideContent) => !getHideShowSideContent)}>
              <svg width="16" height="38" viewBox="0 0 16 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z" fill="#0066BE" fill-opacity="0.6"/>
              </svg>
            </div>
            <div className= {getHideShowSideContent ? "help-popup-content show" : "help-popup-content"}>
            <div className="help-popup-content-inner">

              <div className="help-popup-content-library">
              <div className="help-popup-content-video">
                <h6>{title}</h6>
                <div className="help-content-popup" onClick={() => setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)}>
                  <a href="javascript:;">
                    <img src= {video_poster} alt="" />
                  </a>
                </div>
              </div>

                <div className="help-popup-content-library-inside">
                  <p>Enter SmartList name in the box so you can find it again.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <img src= {path_image + "help/creator_name.png"} alt="" />
                  <p>Creator name is automatically what is account name, but you can change it if needed.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>Demo list is the people you frequently email samples to for review and approval.</p>
                </div>

                <div className="help-popup-content-list">
                  <p className="help-popup-title">Two ways to create a new list:</p>
                  <ul>
                    <li>Segment from existing Readers (see further after clicking it).</li>
                    <li>Upload new list of HCPs (continue to read below)</li>
                  </ul>
                </div>

                <div className="help-popup-content-library-inside">
                  <img src= {path_image + "help/download_file.png"} alt="" />
                  <p>To upload a new list, please download the template first.This ensure the data is uploaded correctly and seamlessly match into the system.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>When your list is ready click the big button and select your file.</p>
                </div>

                <div className="help-popup-content-preview">
                  <div class="btn-form">
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
          )
        }
        {/*Help Pages for Smart list upload Excel end*/}


        {/*Help Pages for filter segment start*/}
        {
          location.pathname == "/SmartListFilter" && (
            <>
            <div className="help-popup">
            <div className="help-popup-view" onClick={() => setHideShowSideContent((getHideShowSideContent) => !getHideShowSideContent)}>
              <svg width="16" height="38" viewBox="0 0 16 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z" fill="#0066BE" fill-opacity="0.6"/>
              </svg>
            </div>
            <div className= {getHideShowSideContent ? "help-popup-content show" : "help-popup-content"}>
            <div className="help-popup-content-inner">

              <div className="help-popup-content-library">
              <div className="help-popup-content-video">
                <h6>{title}</h6>
                <div className="help-content-popup" onClick={() => setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)}>
                  <a href="javascript:;">
                    <img src= {video_poster} alt="" />
                  </a>
                </div>
              </div>

                <div className="help-popup-content-library-inside">
                  <p>Select the people that you want to email.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>A list of people will appear at the bottom of the screen based on your selected criteria. You can go back and edit your criteria to select more people for your list.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>You can download an Excel file with your selected contacts.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>You can add a new person to your smart list or remove them easily.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>The edit button allows you to scrutinize your list of contacts and further amend if necessary.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>By clicking on the sort by button you will be able to see contacts in alphabetic order.</p>
                </div>

                <div className="help-popup-content-library-inside">
                  <p>When you are done creating your list click the create or cancel icon in the top right-hand corner if you do not want to go ahead.</p>
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
          )
        }
        {/*Help Pages for filter segment end*/}



        {/*
          (location.pathname == "/EmailArticleSelect"  || location.pathname == "/CreateEmail") && (
            <>
            <div className="help-popup">
            <div className="help-popup-view" onClick={() => setHideShowSideContent((getHideShowSideContent) => !getHideShowSideContent)}>
              <svg width="16" height="38" viewBox="0 0 16 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z" fill="#0066BE" fill-opacity="0.6"/>
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
                  <div class="btn-form">
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
                  <div class="btn-form">
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
          )*/
        }


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
              onClick={() => setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)}
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
