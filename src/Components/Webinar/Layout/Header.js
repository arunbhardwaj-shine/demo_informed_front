import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import Login from "../../../Auth/Login";
import { toast, ToastContainer } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ForgotPassword from "../../../Auth/ForgotPassword";
import ExportApi from "../../../Api/ExportApi";
import { handleGetRehearsalListData } from "../Rehearsal/RehearsalList";
export let EventId;
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [smShowLogin, setSmShowLogin] = useState(false);
  const [smShowForgot, setSmShowForgot] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [eventId, setEventId] = useState();
  const [event, setEvent] = useState([]);
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
          if (resp.data.code == 200) {
            localStorage.removeItem("Token");
            navigate("/webinar");
          }
        }
      })
      .catch((err) => console.log(err));
  };
  const handleGetEventlist = () => {
    if(localStorage.getItem("Token")){
      ExportApi.GetEventList().then((resp) => {
        if (resp.ok) {
          setEvent(resp.data.data);
          // console.log(resp.data.code)
  
          if (resp.data.code == 404) {
            localStorage.removeItem("EventIdHeader")
         
        }else{
          if(eventId==null||eventId==undefined){
            setEventId(resp.data.data[0].id)
            localStorage.setItem("EventIdHeader",resp.data.data[0].id)
         }
        } 
        }
      });
    }else{
      console.log("Please Login")
    }
  };
  useEffect(() => {
    window.addEventListener('EventData',()=> handleGetEventlist())
    handleGetEventlist()
  }, []);
  useEffect(() => {
    window.addEventListener('EventData',()=> handleGetEventlist())
    handleGetEventlist()
    handleGetEventlist()
  }, [token]);
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      handleGetEventlist()
    } else{
      localStorage.removeItem("EventIdHeader")
    }
  }, [localStorage.getItem("Token"),token]);

  const location = useLocation();
  return (
    <>
    {location.pathname.includes("/webinar/register")||location.pathname.includes("/webinar/editor")?null:<header>
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
            <a className="nav-link" >Webinar</a>
            </li>
                {/* <div className="container">
                  <Link
                    to={
                      localStorage.getItem("Token")
                        ? "/webinar/dashboard"
                        : "/webinar"
                    }
                  >
                    Webinar
                  </Link>
                </div> */}
              </ul>
            </div>

            {token? (
              <Form.Select
                 value={eventId}
                onChange={(e) => {
                  localStorage.setItem("EventIdHeader",e.target.value)
                  setEventId(e.target.value);
                  window.dispatchEvent(new Event("EventId"));
                }}
              >
                {event?.map((val, i) => (
                  <React.Fragment key={i}>
                    <option value={val.id}>{val.title}</option>
                  </React.Fragment>
                ))}
              </Form.Select>
            ):null}
            <div className="user-login">
              {token ? (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
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
                  <Modal id="login_popup"
                    size="sm"
                    show={smShowLogin}
                    onHide={() => setSmShowLogin(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                  >
                    <Modal.Header closeButton onClick={() => setSmShowLogin(false)}>
                    {" "}
                   <h3>Login</h3>
                    </Modal.Header>
                    <Modal.Body>
                      <Login active={hengleLonginPage} />
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
