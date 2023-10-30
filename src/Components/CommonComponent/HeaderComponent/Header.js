import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Dropdown, Modal } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import queryString from "query-string";

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
    // }
    let name = localStorage.getItem("name");
    if (name && name != "") {
      setUserName(name);
    }
  }, []);

  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  return (
    <>
      <div className="loader" id="custom_loader">
        <div className="loader_show">
          <span className="loader-view"> </span>
        </div>
      </div>
      <header
        className={`sticky ${
          scrollDirection === "down" ? "-top-24" : "top-0"
        } h-24 bg-blue-200 transition-all duration-500`}
      >
        <nav className="navbar navbar-expand-sm navbar-light">
          <div className="container-fluid">
            <Link
              className="navbar-brand"
              // to={"/library-content"}
              to={"/home"}
            >
              <img src={path + "inforMed_Logo_Blue_1.svg"} alt="" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
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
                  }
                >
                  <Link className="nav-link" to={"/library-content"}>
                    LIBRARY
                  </Link>
                </li>
                <li
                  className={
                    window.location.pathname == "/readers-view" ||
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
                  }
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
                  }
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
                  }
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
                      window.location.pathname == "/license-add-link"
                        ? "nav-item active active-main"
                        : "nav-item"
                    }
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
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      target="_blank"
                      href={
                        "https://webinar.informed.pro/Webinar/readers_webinar?rdylr=" +
                        localStorage.getItem("user_id")
                      }
                    >
                      WEBINAR
                    </a>
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
                              onClick={(e) =>
                                window.open(
                                  "https://webinar.informed.pro/Webinar/readers_webinar?rdylr=" +
                                    item?.value,
                                  "_blank",
                                  "noreferrer"
                                )
                              }
                              className="dropdown-item"
                            >
                              {item.label}
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
            </div>
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
          </div>
        </nav>
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
    </>
  );
};

export default Header;
