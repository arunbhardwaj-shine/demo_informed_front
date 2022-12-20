import React from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Form, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";

export const ReaderHeader = () => {
  const navigate = useNavigate();

  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
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
  return (
    <>
      {/* {console.log("- ium here")} */}
      <header>
        <nav className="navbar navbar-expand-sm navbar-light">
          <div className="container-fluid">
            <a className="navbar-brand">
              <img
                src="https://informed.pro/css/newtemplate/images/inforMed_Logo_Blue.png"
                width={230}
              />
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
                <li className="nav-item">
                  <a className="nav-link">Library</a>
                </li>
                <li className="nav-item active active-main">
                  <a className="nav-link">Readers</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Analytics</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Distrubute</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Webinar</a>
                </li>
              </ul>
            </div>

            <div className="user-login">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">WelCome</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Setting</Dropdown.Item>
                  <Dropdown.Item>Reset Password</Dropdown.Item>
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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

    </>
  );
};
export default ReaderHeader;
