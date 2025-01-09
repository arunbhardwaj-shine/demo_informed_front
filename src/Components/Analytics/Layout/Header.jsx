import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";


export const AnalyticsHeader = () => {
 
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
                <li className="nav-item">
                  <Link className="nav-link" to="/">Library</Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Readers</Link>
                </li>
                <li className="nav-item active-main">
                  <Link className="nav-link" to="/">Analytics</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Distrubute</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Webinar</Link>
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
export default AnalyticsHeader;
