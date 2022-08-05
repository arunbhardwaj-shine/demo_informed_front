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
  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
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
  const removed_pop =()=>{
		var element = document.getElementById("resend-confirm");
   		 element.classList.remove("custom_model_show");
		var redirect_info = document.getElementById("modeltoreplace").getAttribute("redirecto");
		if(redirect_info){
			navigate(redirect_info);
		}
  }
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
    ExportApi.UserLogout().then((resp) => {
        if (resp.data) {
          if (resp.data.code == 200) {
            localStorage.removeItem("EventIdHeader")
            localStorage.removeItem("Token");
            navigate("/webinar");
          }
        }
      })
       .catch((err) => console.log(err))
  }
  const handleGetEventlist = () => {
    if(localStorage.getItem("Token")){
      ExportApi.GetEventList().then((resp) => {
        if (resp.ok) {
          setEvent(resp.data.data);
          // localStorage.setItem("EventIdHeader",resp.data.data[0].id)
         
          if (resp.data.code == 404) {
            // console.log(resp.data.code)
          }else{
            if(eventId==null||eventId==undefined){
              if(localStorage.getItem("EventIdHeader")){
                console.log("EventIdHeader",localStorage.getItem("EventIdHeader"))
                setEventId(resp.data.data[0].id)
              }else{
              localStorage.removeItem("EventIdHeader")  
              setEventId(resp.data.data[0].id)
         }
        } 
      }
        }
      });
    }else{
      console.log("Please Login")
    }
  };
  const handleGetEventlistChange = () => {
      ExportApi.GetEventList().then((resp) => {
        if (resp.ok) {
          setEvent(resp.data.data);
          let id=document.getElementById("event").value
         
           localStorage.setItem("EventIdHeader",id)
          // console.log(resp.data.code
        }
      });
    
  };
  useEffect(() => {
    window.addEventListener("EventLength", () => handleGetEventlistChange());
    if(localStorage.getItem("EventIdHeader")){
      // return null
      console.log("first")
    }else{
      window.addEventListener('EventData',()=> handleGetEventlist())
      handleGetEventlist()
    }
  }, []);
  useEffect(() => {
    if(localStorage.getItem("EventIdHeader")){
      // return null
      console.log("first")
    }else{
    window.addEventListener('EventData',()=> handleGetEventlist())
    handleGetEventlist()
    handleGetEventlist()}
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
                 id="event"
                 value={localStorage.getItem("EventIdHeader")}
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
                  <Modal
                    size="sm"
                    show={smShowLogin}
                    onHide={() => setSmShowLogin(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                  >
                    <Modal.Header closeButton onClick={() => setSmShowLogin(false)}>
                    {" "}
                   <h4>Login</h4>
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
      <div className="modal send-confirm" id="resend-confirm" aria-modal="true" role="dialog" >
				  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div className="modal-content">


					  <div className="modal-header">
						{/* <button type="button" className="btn-close" data-bs-dismiss="modal"></button> */}
					  </div>


					  <div className="modal-body">
              <div>
                <center>

              <svg id="img-replaced" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 0C31.0457 0 40 8.95433 40 20C40 31.0457 31.0457 40 20 40C8.95433 40 0 31.0457 0 20C0 8.95433 8.95433 0 20 0ZM10.6383 21.1874L16.3343 26.4183C17.1652 27.183 18.4513 27.1423 19.2326 26.3363L29.3941 16.6073C30.2206 15.8122 30.2461 14.4976 29.451 13.6712C28.6559 12.8447 27.3414 12.8192 26.5149 13.6142L17.7128 22.0417L13.4525 18.1292C12.608 17.3521 11.2934 17.4067 10.5163 18.2512C9.73925 19.0958 9.79383 20.4103 10.6383 21.1874V21.1874Z" fill="#39CABC"/>
 </svg>
                </center>
              </div>
	{/*<img id="img-replaced" src={path_image+"webinar/success.svg"} alt="" /> */}
						<h4 id="message_change">This email will be sent to everybody who has not opened the email  </h4>

						<div className="modal-buttons">
							<button type="button" href="javascript:;"  id="modeltoreplace" className="btn btn-primary btn-bordered light" data-bs-dismiss="modal" onClick={removed_pop}>Close</button>
						</div>
					  </div>

					</div>
				  </div>
				</div>
    </>
  );
};

export default Header;