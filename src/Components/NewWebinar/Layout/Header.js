import React from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Form, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";

export const WebinarHeader = () => {
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
                <li className="nav-item active">
                  <a className="nav-link">Library</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Readers</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Analytics</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Distrubute</a>
                </li>
                <li className="nav-item active active-main">
                  <a className="nav-link">Webinar</a>
                </li>
              </ul>
            </div>

            {/* <Form.Select
                 id="event"
                 value={localStorage.getItem("EventIdHeader")}>
                
              </Form.Select> */}

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
export default WebinarHeader;
