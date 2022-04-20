import React, { useEffect, useState } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button, Dropdown, Modal } from "react-bootstrap";
import '../../assets/css/style.css';
import '../../assets/css/custom.css';

const Header = () => {

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
       
					  <li className="nav-item">
						<a to="/webinar"  >Webinar</a>
					  </li>
        </div>
				</ul>
				</div>
			  </div>
			</nav>

		</header>
      </>
    );
};

export default Header;
