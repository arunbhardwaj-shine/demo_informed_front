import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Dropdown, Modal, Navbar } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import queryString from "query-string";
import CommonConfirmModel from "../../../Model/CommonConfirmModel";
import { postData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { loader } from "../../../loader";

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = React.useState(null);


  React.useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
}

const Header = () => {
  const queryParams = queryString.parse(window.location.search);
  const scrollDirection = useScrollDirection();
  const [getUserName, setUserName] = useState("");
  const [congressOptions, setCongressOptions] = useState([
    { value: "I3yCIhnPAd0Ma6sNY4augA==", label: "THSNA" },
    { value: "5EdDBhVCQm08iLJwBENCWw==", label: "WFH" },
    { value: "Y/I8/x8K0syk/ulWyKwKhg==", label: "ISTH" },
    { value: "MpEPwXLqTPveAfumxT/KXw==", label: "EAHAD" },
  ]);
  const navigate = useNavigate();

  const [newAccountDetails, setNewAccountDetails] = useState({});
  const [confirmationpopup, setConfirmationPopup] = useState(false);

  const handleMenuItemClick = () => {
    const navbarCollapse = document.getElementById('collapsibleNavbar');
    navbarCollapse.classList.toggle('show');

    const iconCollapse = document.getElementById('collapsibleIcon');
    iconCollapse.classList.toggle('collapsed');
  };

  const removed_pop = () => {
    var element = document.getElementById("resend-confirm");
    element.classList.remove("custom_model_show");
    var redirect_info = document
      .getElementById("modeltoreplace")
      .getAttribute("redirecto");
    if (redirect_info) {
      navigate(redirect_info);
    }
  };

  const logout = () => {
    // localStorage.clear();
    const keysToKeep = ['uname', 'pass', 'acceptedCookies'];
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    }
    navigate("/");
  };

  useEffect(() => {
    let name = localStorage.getItem("name");
    if (name && name != "") {
      setUserName(name);
    }
    // if (queryParams?.id && queryParams?.id != "") {
    //   let user_id = localStorage.getItem("user_id");
    //   if (user_id) {
    //     if (user_id != queryParams.id) {
    //       localStorage.setItem("user_id", queryParams.id);
    //       localStorage.setItem("group_id", queryParams?.group_id ? queryParams.group_id : 2);
    //       localStorage.setItem("webinar_flag", queryParams?.webinar_flag ? queryParams.webinar_flag : 0);
    //     }
    //   } else {
    //     localStorage.setItem("user_id", queryParams.id);
    //     localStorage.setItem("group_id", queryParams?.group_id ? queryParams.group_id : 2);
    //     localStorage.setItem("webinar_flag", queryParams?.webinar_flag ? queryParams.webinar_flag : 0);
    //   }
    // } else {
    //   let user_id = localStorage.getItem("user_id");
    //   if (user_id) {
    //   } else {
    //     localStorage.setItem("user_id", "");
    //     localStorage.setItem("group_id", "");
    //   }
    // }
    // if (queryParams?.decrypted_token && queryParams?.decrypted_token != "") {
    //   let decrypted_token = localStorage.getItem("decrypted_token");
    //   if (decrypted_token) {
    //     if (decrypted_token != queryParams.id) {
    //       localStorage.setItem("decrypted_token", queryParams.decrypted_token);
    //     }
    //   } else {
    //     localStorage.setItem("decrypted_token", queryParams.decrypted_token);
    //   }
    // } else {
    //   let decrypted_token = localStorage.getItem("decrypted_token");
    //   if (decrypted_token) {
    //   } else {
    //     localStorage.setItem("decrypted_token", "");
    //   }
    // }
    //
    // if (queryParams?.name && queryParams?.name != "") {
    //   setUserName(queryParams.name);
    const handleOutsideClick = (event) => {
      let sideBar = document.getElementById("left-sidebar");
      let button = document.querySelector("#root > header > nav > div > div.mob-sidenav > button")
      if (sideBar && !sideBar.contains(event.target) && !button.contains(event.target)) {
        sideBar.classList.remove("active");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
    // }  
  }, []);

  const clearLocalStorageExcept = () => {
    const keysToKeep = ['uname', 'pass', 'acceptedCookies'];
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    }
  }

  const switchToNewAccount = async (userId) => {
    try {
      loader("show")
      setConfirmationPopup(false);
      let body = {
        token: userId
      }
      const res = await postData(ENDPOINT.WEBINAR_SWITCH_USER, body)
      if (res?.data?.status == 200) {
        // clearLocalStorageExcept();
        // localStorage.setItem("user_id", res?.data?.data?.userToken);
        // localStorage.setItem("group_id", res?.data?.data?.groupId);
        // localStorage.setItem("webinar_flag", res?.data?.data?.webinar_flag);
        // localStorage.setItem("name", res?.data?.data?.name);
        // localStorage.setItem("decrypted_token", res?.data?.data?.jwtToken);
        // setUserName(res?.data?.data?.name)
        localStorage.setItem("switch_account_detail", JSON.stringify({
          user_id: res?.data?.data?.userToken,
          group_id: res?.data?.data?.groupId,
          webinar_flag: res?.data?.data?.webinar_flag,
          name: res?.data?.data?.name,
          decrypted_token: res?.data?.data?.jwtToken
        }))
        navigate("/webinar/event-listing", { state: { switchAccount: true } })
      }
      loader("hide")
    } catch (err) {
      console.log("err--", err)
      loader("hide")
    }
  }

  const handleCommonConfirmModal = () => {
    setConfirmationPopup(false);
  };
  const homeClicked = (e) => {
    e.preventDefault();
    localStorage.removeItem("switch_account_detail")
    navigate("/home")
  }
  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  return (
    <>
      <div className="loader" id="custom_loader">
        <div className="loader_show">
          <span className="loader-view"> </span>
        </div>
      </div>
      <header
        className={`sticky ${scrollDirection === "down" ? "-top-24" : "top-0"
          } h-24 bg-blue-200 transition-all duration-500`}
      >

        <Navbar inverse collapseOnSelect className="navbar navbar-expand-sm navbar-light">
          <div className="container-fluid">
            <div className="mob-sidenav" style={{ display: "none" }}>
              <button className="sidebar-toggler"
                onClick={() => {
                  let sideBar = document.getElementById("left-sidebar");
                  if (sideBar) {
                    let classN = sideBar.classList.contains("active");
                    if (classN) {
                      sideBar.classList.remove("active");

                    }
                    else {

                      sideBar.classList.add("active");
                    }

                  }
                }}>
                <svg fill="#0066be" height="800px" width="800px" viewBox="0 0 32 32">
                  <g>
                    <path d="M16,10c1.7,0,3-1.3,3-3s-1.3-3-3-3s-3,1.3-3,3S14.3,10,16,10z" />
                    <path d="M16,13c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S17.7,13,16,13z" />
                    <path d="M16,22c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S17.7,22,16,22z" />
                  </g>
                </svg>
              </button>
            </div>
            <Link
              className="navbar-brand"
              // to={"/library-content"}
              // to={"/home"}
              onClick={(e) => homeClicked(e)}
            >
              {
                window.location.pathname === "/spc-render" || window.location.pathname === "/timeline-detail" ? "" :
                  <img src={path + "inforMed_Logo_Blue_1.svg"} alt="" />
              }
            </Link>
            {/* <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button> */}
            <>
              {/* <Navbar.Toggle onClick={handleMenuItemClick}/> */}
              <Navbar.Toggle id="collapsibleIcon" />
            </>
            <Navbar.Collapse id="collapsibleNavbar">
              <div></div>
              {/* <div className="collapse navbar-collapse" id="collapsibleNavbar"> */}
              <ul className="navbar-nav">
                <li
                  className={
                    window.location.pathname == "/library-create-pharma" ||
                      window.location.pathname == "/library-delete" ||
                      window.location.pathname == "/library-campaign" ||
                      window.location.pathname == "/library-content" ||
                      window.location.pathname == "/library-create" ||
                      window.location.pathname == "/library-edit" ||
                      window.location.pathname == "/library-sublink" ||
                      window.location.pathname == "/library-topics" ||
                      window.location.pathname == "/set-popup" ||
                      window.location.pathname == "/preview-content" ||
                      window.location.pathname == "/library-create-user" ||
                      window.location.pathname == "/library-add-link" ||
                      window.location.pathname == "/edit-Consent-Options" ||
                      window.location.pathname == "/auto_popup" ||
                      window.location.pathname == "/create-docintel-link" ||
                      window.location.pathname == "/content-detail" ||
                      window.location.pathname == "/library-edit-listing" ||
                      window.location.pathname == "/library-create" ||
                      window.location.pathname == "/spc" ||
                      window.location.pathname == "/spc-create" ||
                      window.location.pathname == "/spc-edit" ||
                      window.location.pathname == "/spc-view" ||
                      window.location.pathname == "/spc-render" ||
                      window.location.pathname == "/spc-delete" ||
                      window.location.pathname == "/products"
                      ? "nav-item active active-main"
                      : "nav-item"
                  } onClick={handleMenuItemClick}
                >
                  <Link className="nav-link" to={"/library-content"}>
                    LIBRARY
                  </Link>
                </li>
                <li
                  className={
                    window.location.pathname == "/readers-view" || window.location.pathname == "/new-readers-reviews" ||
                      window.location.pathname == "/readers-list" ||
                      window.location.pathname == "/reader-add" ||
                      window.location.pathname == "/reader-edit" ||
                      window.location.pathname == "/smart-list-add" ||
                      window.location.pathname == "/reader-review" ||
                      window.location.pathname == "/timeline-detail" ||
                      window.location.pathname == "/add-site" ||
                      window.location.pathname == "/site-listing" ||
                      window.location.pathname == "/edit-site" ||
                      window.location.pathname == "/site" ||
                      window.location.pathname == "/article_type_registration"
                      ? "nav-item active active-main"
                      : "nav-item"
                  } onClick={handleMenuItemClick}
                >
                  <Link className="nav-link" to={"/readers-view"}>
                    CRM
                  </Link>
                </li>
                <li
                  className={
                    window.location.pathname == "/registration-type" ||
                      window.location.pathname == "/octa-country-registration" ||
                      window.location.pathname == "/top-sales" ||
                      window.location.pathname == "/top-reseller" ||
                      window.location.pathname == "/top-clients" ||
                      window.location.pathname == "/sales-by-country" ||
                      window.location.pathname == "/openings-by-country" ||
                      window.location.pathname == "/totalhcp" ||
                      window.location.pathname == "/country-registration" ||
                      window.location.pathname == "/delivery-stats" ||
                      window.location.pathname == "/trending-topics" ||
                      window.location.pathname == "/campaign-stats" ||
                      window.location.pathname == "/trending-content" ||
                      window.location.pathname == "/octa-trending-content" ||
                      window.location.pathname == "/content-type" ||
                      window.location.pathname == "/octalatch-totalhcp" ||
                      window.location.pathname == "/analytic-trending-topics" ||
                      window.location.pathname ==
                      "/analytic-delivery-registration" ||
                      window.location.pathname == "/analytic-delivery-trends" ||
                      window.location.pathname == "/analytic-trending-content" ||
                      window.location.pathname == "/analytic-content-type" ||
                      window.location.pathname == "/octa-country" ||
                      window.location.pathname ==
                      "/octalatch-deliveryregistration" ||
                      window.location.pathname == "/LEX-210-analytics" ||
                      window.location.pathname == "/feedback" ||
                      window.location.pathname == "/content-analytics"
                      ? "nav-item active active-main"
                      : "nav-item"
                  } onClick={handleMenuItemClick}
                >
                  <Link
                    className="nav-link"
                    to={
                      localStorage.getItem("group_id") == 2
                        ? "/content-analytics"
                        : localStorage.getItem("user_id") ==
                          "B7SHpAc XDXSH NXkN0rdQ==" ||
                          localStorage.getItem("user_id") ==
                          "UbCJcnLM9fe HsRMgX8c1A==" ||
                          localStorage.getItem("user_id") ==
                          "wW0geGtDPvig5gF 6KbJrg==" ||
                          localStorage.getItem("user_id") ==
                          "z2TunmZQf3QwCsICFTLGGQ==" ||
                          localStorage.getItem("user_id") ==
                          "qDgwPdToP05Kgzc g2VjIQ=="
                          ? "/totalhcp"
                          : localStorage.getItem("user_id") ==
                            "iSnEsKu5gB/DRlycxB6G4g=="
                            ? "/octalatch-totalhcp"
                            : localStorage.getItem("user_id") ==
                              "56Ek4feL/1A8mZgIKQWEqg=="
                              ? "/LEX-210-analytics"
                              : "/content-analytics"
                    }
                  >
                    ANALYTICS
                  </Link>
                </li>
                <li
                  className={
                    window.location.pathname == "/EmailArticleSelect" ||
                      window.location.pathname == "/EmailList" ||
                      window.location.pathname == "/CreateEmail" ||
                      window.location.pathname == "/SelectHCP" ||
                      window.location.pathname == "/SelectSmartList" ||
                      window.location.pathname == "/SelectSmartListUsers" ||
                      window.location.pathname == "/VerifyMAIL" ||
                      window.location.pathname == "/verifyMAIL" ||
                      window.location.pathname == "/VerifyHcpMAIL" ||
                      window.location.pathname == "/CreateSmartList" ||
                      window.location.pathname == "/SmartListFilter" ||
                      window.location.pathname == "/AutoEmail" ||
                      window.location.pathname == "/TemplateBuilder" ||
                      window.location.pathname == "/SmartList" ||
                      window.location.pathname == "/ViewSmartList" ||
                      window.location.pathname == "/EditList" ||
                      window.location.pathname == "/EmailStatss" ||
                      window.location.pathname == "/bounced-email" ||
                      window.location.pathname == "/get-details"
                      ? "nav-item active active-main"
                      : "nav-item"
                  } onClick={handleMenuItemClick}
                >
                  <Link className="nav-link" to={"/EmailList"}>
                    EMAIL
                  </Link>
                </li>

                {localStorage.getItem("group_id") == 2 ? (
                  <li
                    className={
                      window.location.pathname == "/license-create-pharma" ||
                        window.location.pathname == "/license-delete" ||
                        window.location.pathname == "/license-campaign" ||
                        window.location.pathname == "/license-content" ||
                        window.location.pathname == "/license-create" ||
                        window.location.pathname == "/license-edit" ||
                        window.location.pathname == "/license-sublink" ||
                        window.location.pathname == "/license-topics" ||
                        window.location.pathname == "/license-set-popup" ||
                        window.location.pathname == "/license-preview-content" ||
                        window.location.pathname == "/license-create-user" ||
                        window.location.pathname == "/license-content-detail" ||
                        window.location.pathname == "/license-edit-listing" ||
                        window.location.pathname == "/license-create" ||
                        window.location.pathname == "/license-add-link" ||
                        window.location.pathname == "/license/renew-listing" ||
                        window.location.pathname == "/license/renew"
                        ? "nav-item active active-main"
                        : "nav-item"
                    } onClick={handleMenuItemClick}
                  >
                    <Link className="nav-link" to={"/license-content"}>
                      LICENSED
                    </Link>
                  </li>
                ) : null}

                {typeof localStorage.getItem("webinar_flag") !== "undefined" &&
                  localStorage.getItem("webinar_flag") == 1 &&
                  localStorage.getItem("user_id") !=
                  "56Ek4feL/1A8mZgIKQWEqg==" ? (
                  <li className={
                    window.location.pathname == "/webinar/live-stream/settings" ||
                      window.location.pathname == "/webinar/invitees" ||
                      window.location.pathname == "/webinar/registration" ||
                      window.location.pathname == "/webinar/email" ||
                      window.location.pathname == "/webinar/live-stream" ||
                      window.location.pathname == "/webinar/live-stream/polls-layout" ||
                      window.location.pathname == "/webinar/live-stream/contact-dm" ||
                      window.location.pathname == "/webinar/live-stream/speaker-zone" ||
                      window.location.pathname == "/webinar/live-stream/settings" ||
                      window.location.pathname == "/webinar/live-stream/chat-link" || window.location.pathname == "/webinar/live-stream/survey/question-data" ||
                      window.location.pathname == "/webinar/analytics" ||
                      window.location.pathname == "/webinar/event-listing" ||
                      window.location.pathname == "/webinar/email/auto-emails" ||
                      window.location.pathname == "/webinar/email/smartlist" ||
                      window.location.pathname == "/webinar/email/create-new-email" ||
                      window.location.pathname == "/webinar/email/selectHCP" ||
                      window.location.pathname == "/webinar/email/verifyHCP" ||
                      window.location.pathname == "/webinar/email/selectSmartList" ||
                      window.location.pathname == "/webinar/email/selectSmartListUsers" ||
                      window.location.pathname == "/webinar/email/verifyMAIL" ||
                      window.location.pathname == "/webinar/email/verifyHcpMAIL" ||
                      window.location.pathname == "/webinar/email/smartlist/editlist" ||
                      window.location.pathname == "/webinar/email/smartlist/createsmartlist" ||
                      window.location.pathname == "/webinar/email/smartlist/smartlistfilter" ||
                      window.location.pathname == "/webinar/email/smartlist/uploadsmartlist"
                      ? "nav-item active active-main"
                      : "nav-item"
                  }>
                    <Link className="nav-link" to={"/webinar/event-listing"} onClick={handleMenuItemClick}>
                      WEBINAR
                    </Link>
                    {/* <a
                      className="nav-link"
                      target="_blank"
                      href={
                        "https://webinar.informed.pro/Webinar/readers_webinar?rdylr=" +
                        // localStorage.getItem("user_id")
                      }
                    >
                      WEBINAR
                    </a> */}
                  </li>
                ) : (
                  ""
                )}

                {localStorage.getItem("user_id") ==
                  "56Ek4feL/1A8mZgIKQWEqg==" ? (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      target="_blank"
                      href={
                        "https://webinar.informed.pro/webinar/qa_survey?rdylr=" +
                        localStorage.getItem("user_id")
                      }
                    >
                      Q & POLL
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {localStorage.getItem("user_id") ==
                  "iSnEsKu5gB/DRlycxB6G4g==" ? (
                  <li className="nav-item user-login">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        <span>CONGRESS</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {congressOptions.map((item) => {
                          return (
                            <Dropdown.Item
                            key={item?.value}
                              onClick={(e) =>
                              // window.open(
                              //   "https://webinar.informed.pro/Webinar/readers_webinar?rdylr=" +
                              //     item?.value,
                              //   "_blank",
                              //   "noreferrer"
                              // )
                              
                              {
                                setNewAccountDetails({ userId: item?.value, accountName: item?.label });
                                setConfirmationPopup(true);
                              }
                              }
                              // className="dropdown-item"
                              className={item?.value === newAccountDetails?.userId ? "dropdown-item selected" : "dropdown-item"}      
                            >
                              {item?.label}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                ) : (
                  ""
                )}
              </ul>
              {/* </div> */}

              <div className="user-login">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <span>Hi,</span>
                    {getUserName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      // href="https://webinar.informed.pro/Pages/change_password/"
                      onClick={() => navigate("/change-password")}
                      className="dropdown-item"
                    >
                      Change Password
                    </Dropdown.Item>
                    {/* <Dropdown.Item
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://support.informed.pro/authenticate?token=" +
                          localStorage.getItem("decrypted_token"),
                        "_blank")
                    }
                  >
                    Raise a ticket
                  </Dropdown.Item> */}
                    <Dropdown.Item
                      className="dropdown-item"
                      onClick={() => logout()}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/*
								<ul className="dropdown-menu">
									<li><a className="dropdown-item" href="#">Change Password</a></li>
									<li><a className="dropdown-item" href="#">Logout</a></li>
							  </ul>
								*/}
              </div>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </header>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div
        className="modal send-confirm"
        id="resend-confirm"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              {/* <button type="button" className="btn-close" data-bs-dismiss="modal"></button> */}
            </div>

            <div className="modal-body">
              <img id="img-replaced" src={path + "success.svg"} alt="" />
              <h4 id="message_change">
                This email will be sent to everybody who has not opened the
                email{" "}
              </h4>

              <div className="modal-buttons">
                <button
                  type="button"
                  href="javascript:;"
                  id="modeltoreplace"
                  className="btn btn-primary btn-bordered light"
                  data-bs-dismiss="modal"
                  onClick={removed_pop}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonConfirmModel
        show={confirmationpopup}
        onClose={handleCommonConfirmModal}
        onCloseCross={handleCommonConfirmModal}
        fun={switchToNewAccount}
        resetDataId={newAccountDetails?.userId}
        popupMessage={{
          message1: `You are about to move to ${newAccountDetails?.accountName} account.`,
          message2: "Are you sure you want to do this?",
          footerButton: " Yes please!",
        }}
        path_image={path}
      />
    </>
  );
};

export default Header;
