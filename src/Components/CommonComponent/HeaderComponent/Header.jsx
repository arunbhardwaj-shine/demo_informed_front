import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { Dropdown, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
  const rdLikeArray = ["56Ek4feL/1A8mZgIKQWEqg==", "bWmUjqX7J011   WUTYn9g==", "MXl8m36VZFYXpgFVz3Pg0g==","HPW6EwQy6v8VrfnMsjz8tg=="]
  const isLikeRdAccount = rdLikeArray.includes(localStorage.getItem("user_id"))
  const queryParams = queryString.parse(window.location.search);
  const scrollDirection = useScrollDirection();
  const [getUserName, setUserName] = useState("");
 
  const navigate = useNavigate();
 
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
    let navigateRoute = "/";
    if (typeof localStorage.getItem('account_type') != 'undefined' && localStorage.getItem('account_type') == 'USA_PHARMA') {
      // let userToken = localStorage.getItem('user_id')?.replace(/ /g, '+')
      // userToken  = userToken?.replace(/\//g, '---');
      let userToken = localStorage.getItem('logs_token');
      navigateRoute = "/account/" + userToken;
    }
    const keysToKeep = ['uname', 'pass', 'acceptedCookies'];
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    }
    navigate(navigateRoute);
  };
  const location = useLocation();
  useEffect(() => {
    const currentLocation = window.location.pathname;
    const divElement = document.querySelector('body');
    if (
      currentLocation === '/survey/404'
    ) {
      divElement?.classList.add('hideheader');
    } else {
      divElement?.classList.remove('hideheader');
    }
  }, [location?.pathname]);
 
  useEffect(() => {
    let name = localStorage.getItem("name");
    if (name && name != "") {
      setUserName(name);
    }
   
   
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
 
  const homeClicked = (e) => {
    e.preventDefault();
    localStorage.removeItem("switch_account_detail")
    if (localStorage.getItem('user_id') === "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem('user_id') == "HPW6EwQy6v8VrfnMsjz8tg==" || localStorage.getItem('user_id') === "bWmUjqX7J011   WUTYn9g==") {
      navigate("/home-timeline")
    } else {
      navigate("/home")
    }
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
 
        <Navbar inverse="true" collapseOnSelect className="navbar navbar-expand-sm navbar-light">
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
           
              onClick={(e) => homeClicked(e)}
            >
              {
                window.location.pathname === "/spc-render" || window.location.pathname === "/timeline-detail" ? "" :
                  <img src={path + "inforMed_Logo_Blue_1.svg"} alt="" />
              }
            </Link>
           
            <>
           
              <Navbar.Toggle id="collapsibleIcon" />
            </>
            <Navbar.Collapse id="collapsibleNavbar">
              <div></div>
             
              <ul className="navbar-nav">
                <li
                  className={
                    window.location.pathname == "/readers-view" || window.location.pathname == "/new-readers-reviews" || window.location.pathname == "/IRT-Mandatory" ||
                      window.location.pathname == "/readers-list" ||
                      window.location.pathname == "/reader-add" ||
                      window.location.pathname == "/reader-edit" ||
                      window.location.pathname == "/smart-list-add" ||
                      window.location.pathname == "/reader-review" ||
                      window.location.pathname == "/timeline-detail" ||
                      window.location.pathname == "/add-site" ||
                      window.location.pathname == "/site-listing" ||
                      window.location.pathname == "/countries-regions" ||
                      window.location.pathname == "/edit-site" ||
                      window.location.pathname == "/site" ||
                      window.location.pathname == "/reader-profile" ||
                      window.location.pathname == "/article_type_registration"
                      ? "nav-item active active-main"
                      : "nav-item"
                  } onClick={handleMenuItemClick}
                >
                  <Link className="nav-link"
                    to={isLikeRdAccount
                      ? "/new-readers-reviews" : "/readers-view"}
       
                  >
                    TRIAL
                  </Link>
                </li>
                <li
                  className={
                    window.location.pathname == "/library-create-pharma" ||
                      window.location.pathname == "/library-delete" ||
                      window.location.pathname == "/library-campaign" ||
                      window.location.pathname == "/library-content" ||
                      window.location.pathname == "/library-mandatory" ||
                      window.location.pathname == "/compliance-contents" ||
                      window.location.pathname == "/study-documentation" ||
                      window.location.pathname == "/library-popup" ||
                      window.location.pathname == "/library-mandatory-content" ||
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
                      window.location.pathname == "/all-events" ||
                      window.location.pathname == "/spc-create" ||
                      window.location.pathname == "/spc-edit" ||
                      window.location.pathname == "/spc-view" ||
                      window.location.pathname == "/spc-render" ||
                      window.location.pathname == "/spc-delete" ||
                      window.location.pathname == "/products" ||
                       window.location.pathname == "/sunshine-timeline"
                      ? "nav-item active active-main"
                      : "nav-item"
                  } onClick={handleMenuItemClick}
                >
                  <Link className="nav-link"
                    to={"/library-content"}
                  >
                    LIBRARY
                  </Link>
                </li>
 
                <li
                  className={
                    window.location.pathname == "/training-compliances"
                      ? "nav-item active active-main"
                      : "nav-item"
                  } onClick={handleMenuItemClick}
                >
                  <Link className="nav-link"
                    to="/training-compliances"
                  >
                    TRAINING & Compliances
                  </Link>
                </li>
 
                <li
                  className={
                    window.location.pathname == "/EmailArticleSelect" ||
                      window.location.pathname == "/EmailList" ||
                      window.location.pathname == "/RD-EmailList" ||
                      window.location.pathname == "/VerifyHCP" ||
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
                      window.location.pathname == "/EmailsDBAnalytics" ||
                      window.location.pathname == "/ViewSmartList" ||
                      window.location.pathname == "/EditList" ||
                      window.location.pathname == "/EmailStatss" ||
                      window.location.pathname == "/blocked-users" ||
                      window.location.pathname == "/bounced-email" ||
                      window.location.pathname == "/get-details" ||
                      window.location.pathname == "/create-sunshine-email" ||
                      window.location.pathname == "/Emaillist-publisher" ||
                      window.location.pathname == "/Verify-sunshine-mail" ||
                      window.location.pathname == "/IRTRole"
                      ? "nav-item active active-main"
                      : "nav-item"
                  } onClick={handleMenuItemClick}
                >
                  {
                    localStorage.getItem('group_id') == 2
                    ?
                      <Link className="nav-link"
                        to={"/Emaillist-publisher"}
                      >
                        EMAILS & Notifications
                      </Link>
                    :
                      <Link className="nav-link"
                        to={"/EmailStatss"}
                      >
                        EMAILS & Notifications
                      </Link>
                  }
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
                        window.location.pathname == "/license-popup" ||
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
                    <Link className="nav-link" to={"/license-content"} >
                      LICENSED
                    </Link>
                  </li>
                ) : null}
 
                {typeof localStorage.getItem("webinar_flag") !== "undefined" &&
                  localStorage.getItem("webinar_flag") == 1
                  ||
                  localStorage.getItem("user_id") === "IJype v19WASFcSlrfRENQ=="
 
                  ? (
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
                        window.location.pathname == "/webinar/analytics/analytics-attendees" ||
                        window.location.pathname == "/webinar/analytics/analytics-questions" ||
                        window.location.pathname == "/webinar/analytics/analytics-poll" ||
                        window.location.pathname == "/webinar/analytics/analytics-emails" ||
                        window.location.pathname == "/webinar/analytics/analytics-regions" ||
                        window.location.pathname == "/webinar/analytics/question-data" ||
                        window.location.pathname == "/webinar/email/smartlist/uploadsmartlist" ||
                        window.location.pathname == "/webinar/email/smartlist/viewlist"
                        ? "nav-item active active-main"
                        : "nav-item"
                    }>
                      <Link className="nav-link" to={"/webinar/event-listing"} onClick={handleMenuItemClick}>
                        WEBINARS/MEETINGS
                      </Link>
                       
                    </li>
 
                  ) : (
                    ""
                  )}
                {(localStorage.getItem("user_id") == "rjiGlqA9DXJVH7bDDTX0Lg==" || localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "HPW6EwQy6v8VrfnMsjz8tg==" || localStorage.getItem("user_id") == "bWmUjqX7J011   WUTYn9g==" || localStorage.getItem("user_id") == "MXl8m36VZFYXpgFVz3Pg0g==" || localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ==" || localStorage.getItem("user_id") == "iSnEsKu5gB/DRlycxB6G4g==")
                 && (<li className={window.location.pathname == "/survey/survey-list" || window.location.pathname == "/survey/survey-sublink" || window.location.pathname == "/survey/survey-analytics" || window.location.pathname == "/survey/survey-analytics-detail" || window.location.pathname == "/survey/survey-setup" || window.location.pathname == "/survey/survey-builder" || window.location.pathname == "/survey/survey-configure" || window.location.pathname == "/survey/form-builder" || window.location.pathname == "/survey/thank-you" || window.location.pathname == "/survey/survey-preview" || window.location.pathname == "/survey/email" ||
                  window.location.pathname == "/survey/email/selectsurvey" ||
                  window.location.pathname == "/survey/survey-sublink-new" ||
                  window.location.pathname == "/survey/email/create-email" ||
                  window.location.pathname == "/survey/auto-email" ||
                  window.location.pathname == "/survey/smartlist" ||
                  window.location.pathname == "/survey/smartlist/createlist" ||
                  window.location.pathname == "/survey/smartlist/UploadExcel" ||
                  window.location.pathname == "/survey/ViewSmartList" ||
                  window.location.pathname == "/survey/EditList" ||
                  window.location.pathname == "/survey/AutoEmail" ||
                  window.location.pathname == "/survey/topics" ||
                  window.location.pathname == "/survey/email/select-hcp" ||
                  window.location.pathname == "/survey/email/smart-list" ||
                  window.location.pathname == "/survey/email/select-smartlist-users" ||
                  window.location.pathname == "/survey/email/verify-hcp" ||
                  window.location.pathname == "/survey/email/verify-mail" ||
                  window.location.pathname == "/survey/email/verify-hcp-mail" ||
                  window.location.pathname == "/survey/email/analytics" ||
                  window.location.pathname == "/survey/email/get-details" ||
                  window.location.pathname == "/survey/smart-list-filter" ||
                  window.location.pathname == "/survey/EditList" ||
                  window.location.pathname == "/survey/TemplateBuilder"
                  ? "nav-item active active-main"
                  : "nav-item"
                } onClick={handleMenuItemClick}>
                  <Link className="nav-link" to={"/survey/survey-list"}>SURVEY
                  </Link>
                </li>)}
 
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
                    window.location.pathname == "/sunshine-trending-content" ||
                    window.location.pathname == "/octa-trending-content" ||
                    window.location.pathname == "/content-type" ||
                    window.location.pathname == "/octalatch-totalhcp" ||
                    window.location.pathname == "/analytic-trending-topics" ||
                    window.location.pathname == "/analytic-delivery-registration" ||
                    window.location.pathname == "/analytic-delivery-trends" ||
                    window.location.pathname == "/analytic-trending-content" ||
                    window.location.pathname == "/analytic-content-type" ||
                    window.location.pathname == "/octa-country" ||
                    window.location.pathname == "/analytics-events" ||
                    window.location.pathname == "/octalatch-deliveryregistration" ||
                    window.location.pathname == "/Trial-analytics" ||
                    window.location.pathname == "/trial-analytics" ||
                    window.location.pathname == "/feedback" ||
                    window.location.pathname == "/content-analytics" ||
                    window.location.pathname == "/survey/survey-data"
                      ? "nav-item active active-main"
                      : "nav-item"
                  }
                  onClick={handleMenuItemClick}
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
                          (localStorage.getItem("user_id") ==
                            "qDgwPdToP05Kgzc g2VjIQ==" ||
                            localStorage.getItem("account_type") ==
                              "USA_PHARMA")
                        ? "/totalhcp"
                        : localStorage.getItem("user_id") ==
                          "iSnEsKu5gB/DRlycxB6G4g=="
                        ? "/octalatch-totalhcp"
                        : localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" ||
                          localStorage.getItem("user_id") ==
                            "HPW6EwQy6v8VrfnMsjz8tg=="
                        ? "/Trial-analytics"
                        : localStorage.getItem("user_id") ==
                          "MXl8m36VZFYXpgFVz3Pg0g=="
                        ? "/trial-analytics"
                        : localStorage.getItem("user_id") ==
                          "bWmUjqX7J011   WUTYn9g=="
                        ? "/trial-analytics"
                        : "/content-analytics"
                    }
                  >
                    ANALYTICS
                  </Link>
                </li>
 
             
              </ul>
           
 
              <div className="user-login">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <span>Hi,</span>
                    {getUserName}
                  </Dropdown.Toggle>
 
                  <Dropdown.Menu>
                    <Dropdown.Item
                     
                      onClick={() => navigate("/change-password")}
                      className="dropdown-item"
                    >
                      Change Password
                    </Dropdown.Item>
                   
                    <Dropdown.Item
                      className="dropdown-item"
                      onClick={() => logout()}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                 
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
 
    </>
  );
};
 
export default Header;