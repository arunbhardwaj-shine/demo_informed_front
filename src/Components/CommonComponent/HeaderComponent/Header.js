import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Dropdown, Modal } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import queryString from "query-string";

const Header = () => {
  const queryParams = queryString.parse(window.location.search);
  const [getUserName, setUserName] = useState("");
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

  useEffect(() => {
    if (queryParams?.id && queryParams?.id != "") {
      let user_id = localStorage.getItem("user_id");
      if (user_id) {
        if (user_id != queryParams.id) {
          localStorage.setItem("user_id", queryParams.id);
        }
      } else {
        localStorage.setItem("user_id", queryParams.id);
      }
    } else {
      let user_id = localStorage.getItem("user_id");
      if (user_id) {
      } else {
        //localStorage.setItem("user_id", "rjiGlqA9DXJVH7bDDTX0Lg==");
        localStorage.setItem("user_id", "");
      }
    }
    if (queryParams?.decrypted_token && queryParams?.decrypted_token != "") {
      let decrypted_token = localStorage.getItem("decrypted_token");
      if (decrypted_token) {
        if (decrypted_token != queryParams.id) {
          localStorage.setItem("decrypted_token", queryParams.decrypted_token);
        }
      } else {
        localStorage.setItem("decrypted_token", queryParams.decrypted_token);
      }
    } else {
      let decrypted_token = localStorage.getItem("decrypted_token");
      if (decrypted_token) {
      } else {
        //localStorage.setItem("decrypted_token", "rjiGlqA9DXJVH7bDDTX0Lg==");
        localStorage.setItem("decrypted_token", "");
      }
    }

    if (queryParams?.name && queryParams?.name != "") {
      setUserName(queryParams.name);
    }
  }, []);

  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
      <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
      <header>
        <nav className="navbar navbar-expand-sm navbar-light">
          <div className="container-fluid">
            <a
              className="navbar-brand"
              href="https://informed.pro/Libraries/home"
            >
              <img src={path + "inforMed_Logo_Blue_1.svg"} alt="" />
            </a>
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
                <li className="nav-item active">
                  <a
                    className="nav-link"
                    href="/library-content"
                  >
                    LIBRARY
                  </a>
                </li>
                <li className={
                    window.location.pathname == "/cis_stats" ||
                    window.location.pathname == "/country_stats" ||
                    window.location.pathname == "/campaign_stats" ||
                    window.location.pathname == "/shared_via_stats" ||
                    window.location.pathname == "/trending_topics" ||
                    window.location.pathname == "/trending_article" ||
                    window.location.pathname == "/article_type_registration"
                    ? "nav-item active active-main"
                      : "nav-item"
                  }
                  >
                  <Link className="nav-link">ANALYTICS</Link>
                </li>
                <li
                  className={
                    window.location.pathname == "/SmartList" ||
                    window.location.pathname == "/EditList" ||
                    window.location.pathname == "/CreateSmartList" ||
                    window.location.pathname == "/SmartListFilter" ||
                    window.location.pathname == "/SelectSmartList" ||
                    window.location.pathname == "/EmailList" ||
                    window.location.pathname == "/EmailList" ||
                    window.location.pathname == "/TemplateBuilder" ||
                    window.location.pathname == "/AutoEmail" ||
                    window.location.pathname == "/EmailArticleSelect" ||
                    window.location.pathname == "/CreateEmail" ||
                    window.location.pathname == "/FilterSegment" ||
                    window.location.pathname == "/SelectHCP" ||
                    window.location.pathname == "/VerifyHCP" ||
                    window.location.pathname == "/VerifyMAIL" ||
                    window.location.pathname == "/VerifyHcpMAIL" ||
                    window.location.pathname == "/VerifyHCP" ||
                    window.location.pathname == "/SelectSmartListUsers" ||
                    window.location.pathname == "/VerifySmartList" ||
                    window.location.pathname == "/ViewSmartList" ||
                    window.location.pathname == "/UploadExcel" ||
                    window.location.pathname == "/UpdatedTable" ||
                    window.location.pathname == "/ViewTable" ||
                    window.location.pathname == "/EmailStatss" ||
                    window.location.pathname == "/get-details"
                      ? "nav-item active active-main"
                      : "nav-item"
                  }
                >
                  <a className="nav-link">EMAIL</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://informed.pro/Analytics">
                    ANALYTICS
                  </a>
                </li>
                <li className="nav-item active active-main">
                  <a
                    className="nav-link"
                    href="https://informed.pro/Distributes/MailEngine"
                  >
                    EMAIL
                  </a>
                </li>

                {queryParams?.webinar_flag && queryParams.webinar_flag == 1 ? (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="https://informed.pro/Webinar/readers_webinar"
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
                      href="https://informed.pro/webinar/qa_survey?cmid=2147501188"
                    >
                      Q&A/SURVEY
                    </a>
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
                    href="https://informed.pro/Pages/change_password/"
                    className="dropdown-item"
                  >
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://support.informed.pro/authenticate?token=" +
                          localStorage.getItem("decrypted_token"),
                        "_blank"
                      )
                    }
                  >
                    Raise a ticket
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="https://informed.pro/Users/logout/"
                    className="dropdown-item"
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
