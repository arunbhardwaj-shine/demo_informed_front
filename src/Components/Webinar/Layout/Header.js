import React, { useEffect, useState } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button, Dropdown, Modal } from "react-bootstrap";
import "../../assets/css/style.css";
import "../../assets/css/custom.css";
import Login from "../../../Auth/Login";
import { toast, ToastContainer } from "react-toastify";
import ExportApi from "../../../Api/ExportApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ForgotPassword from "../../../Auth/ForgotPassword";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [smShowLogin, setSmShowLogin] = useState(false);
  const [smShowForgot, setSmShowForgot] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [usernameget, setUsernameget] = useState(
    localStorage.getItem("username")
  );
  const hengleLonginPage = (data,message) => {
    setSmShowLogin(data);
    setDropdownOpen(data);
  
  };
  const hengleForgotPage = (data) => {
    setSmShowForgot(data);
  };

  let navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("Token"));
    setUsernameget(localStorage.getItem("username"));
  }, [localStorage.getItem("Token"), token]);

  const Logout = () => {
    ExportApi.UserLogout()
      .then((resp) => {
        if (resp.data) {
          console.log(resp);
          if (resp.data.code == 200) {
            localStorage.removeItem("Token");
            navigate("/webinar");
          }
        }
      })
      .catch((err) => console.log(err));
  };
  const location = useLocation();
  return (
    <>
    {location.pathname.includes("/webinar/register")?null:<header>
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
                <div className="container">
                  <Link
                    to={
                      localStorage.getItem("Token")
                        ? "/webinar/dashboard"
                        : "/webinar"
                    }
                  >
                    Webinar
                  </Link>
                </div>
                {/* <li className="nav-item">
						<Link to="/webinar"  >Webinar</Link>
					  </li> */}
              </ul>
            </div>
            <div className="user-login">
              {token ? (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {usernameget ? usernameget : "WelCome"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Setting</Dropdown.Item>
                    <Dropdown.Item><Link to="/webinar/resetpassword"> Reset Password</Link></Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        Logout();
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div
                  className={
                    dropdownOpen
                      ? "container__new new js-new open"
                      : "container__new new js-new"
                  }
                >
                  <Button
                    onClick={() => {
                      setSmShowLogin(true);
                      setDropdownOpen(!dropdownOpen);
                    }}
                  >
                    Login
                  </Button>
                  <Modal
                    size="sm"
                    show={smShowLogin}
                    onHide={() => setSmShowLogin(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                  >
                    <Modal.Body>
                      <Login active={hengleLonginPage} />
                      <h5
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => {
                          setSmShowForgot(true);
                          setSmShowLogin(false);
                        }}
                      >
                        Forgot Password ?
                      </h5>
                    </Modal.Body>
                  </Modal>
                  <div
                    className="new__backdrop backdrop js-new-backdrop"
                    onClick={() => {
                      setSmShowLogin(false);
                      setDropdownOpen(false);
                    }}
                  ></div>
                </div>
              )}
              <Modal
                size="md"
                show={smShowForgot}
                onHide={() => setSmShowForgot(false)}
                aria-labelledby="example-modal-sizes-title-sm"
              >
                <Modal.Header
                  closeButton
                  onClick={() => setSmShowForgot(false)}
                >
                  Forgot Password
                </Modal.Header>
                <Modal.Body>
                  <ForgotPassword  active={hengleForgotPage}  />
                </Modal.Body>
              </Modal>
              {/* <ul>
					<li className="nav-item dropdown">
					  <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown"><span>Hi,</span>Jacob Flindt</a>
					  <ul className="dropdown-menu">
						<li><a className="dropdown-item" href="#">Link</a></li>
						<li><a className="dropdown-item" href="#">Another link</a></li>
						<li><a className="dropdown-item" href="#">A third link</a></li>
					  </ul>
					</li>
				  </ul> */}
            </div>
          </div>
        </nav>
     
      </header>}
    </>
  );
};

export default Header;
