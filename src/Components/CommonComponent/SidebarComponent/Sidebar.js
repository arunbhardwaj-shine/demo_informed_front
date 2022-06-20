import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useLocation } from 'react-router-dom';
import { Modal, ModalDialog } from "react-bootstrap";
import { Player, BigPlayButton } from 'video-react';
let title = "";
const Sidebar = () => {

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
    title = "Create your Campaign";
  }else if(location.pathname == "/EmailArticleSelect"){
    title = "Selecting content for your email";
  }else if(location.pathname == "/CreateEmail"){
    title = "Campaign Information";
  }else if(location.pathname == "/SelectHCP"){
    title = "Selecting type of hcp";
  }else if(location.pathname == "/VerifyHCP"){
    title = "Selecting verify Hcp";
  }else if(location.pathname == "/verifyMAIL"){
    title = "Verify Email";
  }else if(location.pathname == "/SelectSmartListUsers"){
    title = "Verify your list";
  }else if(location.pathname == "/SelectSmartList"){
    title = "Select Smart list";
  }else if(location.pathname == "/SmartList"){
    title = "Creating your Smart list";
  }else if(location.pathname == "/CreateSmartList"){
    title = "Smart list information";
  }else if(location.pathname =="/ViewSmartList"){
    title = "View smart list readers";
  }else if(location.pathname == "/EditList"){
    title = "Edit smart list";
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
            <li className={(location.pathname == "/EmailList" || location.pathname === "/EmailArticleSelect" || location.pathname === "/CreateEmail" || location.pathname === "/SelectHCP" || location.pathname === "/CreateEmail" || location.pathname === "/VerifyHCP" || location.pathname === "/VerifyMAIL" || location.pathname === "/verifyMAIL" || location.pathname ==="/SelectSmartListUsers" || location.pathname ==="/SelectSmartList") ? "active" : "side_li"} >
              <Link to={"/EmailList"} >
                  <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z" fill="rgba(0, 102, 190, 0.6)"/>
                  <path d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7.98861 12.1922 7.96501 12.2745 7.92Z" fill="rgba(0, 102, 190, 0.6)"/>
                  </svg>
                   <p>Email</p>
              </Link>
            </li>
            <li className={(location.pathname == "/SmartList" || location.pathname == "/EditList" || location.pathname == "/CreateSmartList" || location.pathname =="/SmartListFilter" ||  location.pathname =="/UploadExcel"||  location.pathname =="/ViewSmartList" ||   location.pathname=="/VerifySmartList") ? "active" : "side_li"} >

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
                <p>Emails Analaytics</p>
              </a>
            </li>
          </ul>
        </div>

        <div className="help-popup">
        <div className="help-popup-view" onClick={() => setHideShowSideContent((getHideShowSideContent) => !getHideShowSideContent)}>
          <svg width="16" height="38" viewBox="0 0 16 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.42188 23.0469H5.4375C5.44792 22.1094 5.52083 21.3021 5.65625 20.625C5.80208 19.9375 6.04688 19.3177 6.39062 18.7656C6.74479 18.2135 7.21354 17.6667 7.79688 17.125C8.28646 16.6875 8.71354 16.2708 9.07812 15.875C9.44271 15.4792 9.72917 15.0729 9.9375 14.6562C10.1458 14.2292 10.25 13.7552 10.25 13.2344C10.25 12.6302 10.1562 12.1302 9.96875 11.7344C9.79167 11.3281 9.52083 11.0208 9.15625 10.8125C8.80208 10.6042 8.35417 10.5 7.8125 10.5C7.36458 10.5 6.94792 10.599 6.5625 10.7969C6.17708 10.9844 5.85938 11.276 5.60938 11.6719C5.36979 12.0677 5.24479 12.5885 5.23438 13.2344H0.703125C0.734375 11.8073 1.0625 10.6302 1.6875 9.70312C2.32292 8.76562 3.17188 8.07292 4.23438 7.625C5.29688 7.16667 6.48958 6.9375 7.8125 6.9375C9.27083 6.9375 10.5208 7.17708 11.5625 7.65625C12.6042 8.125 13.401 8.81771 13.9531 9.73438C14.5052 10.6406 14.7812 11.7448 14.7812 13.0469C14.7812 13.9531 14.6042 14.7604 14.25 15.4688C13.8958 16.1667 13.4323 16.8177 12.8594 17.4219C12.2865 18.026 11.6562 18.651 10.9688 19.2969C10.375 19.8281 9.96875 20.3854 9.75 20.9688C9.54167 21.5521 9.43229 22.2448 9.42188 23.0469ZM4.96875 27.875C4.96875 27.2083 5.19792 26.6562 5.65625 26.2188C6.11458 25.7708 6.72917 25.5469 7.5 25.5469C8.26042 25.5469 8.86979 25.7708 9.32812 26.2188C9.79688 26.6562 10.0312 27.2083 10.0312 27.875C10.0312 28.5208 9.79688 29.0677 9.32812 29.5156C8.86979 29.9635 8.26042 30.1875 7.5 30.1875C6.72917 30.1875 6.11458 29.9635 5.65625 29.5156C5.19792 29.0677 4.96875 28.5208 4.96875 27.875Z" fill="#0066BE" fill-opacity="0.6"/>
          </svg>
        </div>
        <div className= {getHideShowSideContent ? "help-popup-content show" : "help-popup-content"}>
        <div className="help-popup-content-inner">
          <div className="help-popup-content-video">
            <h6>{title}</h6>
            <div className="help-content-popup" onClick={() => setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)}>
              <a href="javascript:;">
                <img src= {path_image + "video-popup.svg"} alt="" />
              </a>
            </div>
          </div>
          <div className="help-popup-content-library">
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
              <form>
                <button className="btn btn-primary btn-filled">Preview</button>
              </form>
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
              <form>
                <button className="btn btn-primary btn-filled">Next</button>
              </form>
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
        <Player playsInline src="https://docintel.s3-eu-west-1.amazonaws.com/video/video/ESC_HF_Sayi-01.mp4">
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
