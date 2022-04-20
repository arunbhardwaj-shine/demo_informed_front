import React, { useEffect, useState } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button, Dropdown, Modal } from "react-bootstrap";
import '../../assets/css/style.css';
import '../../assets/css/custom.css';
import Login from "../../../Auth/Login";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ExportApi from "../../../Api/ExportApi";

const Header = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [smShowLogin, setSmShowLogin] = useState(false);
	const [smShow, setSmShow] = useState(false);
	const [token, setToken] = useState(localStorage.getItem("Token"));
	const [usernameget, setUsernameget] = useState(
	  localStorage.getItem("username")
	);
	let navigate=useNavigate()
	const hengleLonginPage = (data) => {
	  setSmShowLogin(data);
	  setDropdownOpen(data);
	};
	
	// 

	useEffect(() => {
		setToken(localStorage.getItem("Token"));
		setUsernameget(localStorage.getItem("username"));
	  }, [localStorage.getItem("Token"), token]);

	    
const Logout=()=>{
	ExportApi.UserLogout()
	.then((resp) => {
	  if (resp.data) {
		  console.log(resp)
		  if (resp.data.code == 200) {
			localStorage.removeItem("Token")
			navigate("/")
		} ;
	  }
	})
	.catch((err) => console.log(err));
}
	let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    return (
      <>
     	<header>
			<nav className="navbar navbar-expand-sm navbar-light">
			  <div className="container-fluid">
				<a className="navbar-brand" ><img src={path+"inforMed_Logo_Blue_1.png"} /></a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
				  <span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="collapsibleNavbar">
				  <ul className="navbar-nav">
					<li className="nav-item active">
						<a className="nav-link" >Library</a>
					  </li>
					  <li className="nav-item">
						<a className="nav-link" >Readers</a>
					  </li>
					  <li className="nav-item">
						<a className="nav-link" >Analytics</a>
					  </li>
					  <li className="nav-item">
						<a className="nav-link" >Distrubute</a>
					  </li>
					  <div className="container">
          <Link
            to={
              localStorage.getItem("Token") ? "/webinar/dashboard" : "/webinar"
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
				{token?(
         <Dropdown>
         <Dropdown.Toggle variant="success" id="dropdown-basic">
          {usernameget?usernameget:"WelCome"}
         </Dropdown.Toggle>
       
         <Dropdown.Menu>
         <Dropdown.Item >Setting
             </Dropdown.Item>
         <Dropdown.Item onClick={()=>{Logout()}}>Logout</Dropdown.Item>
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

		</header>
      </>
    );
};

export default Header;
