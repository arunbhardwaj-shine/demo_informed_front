import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button, Modal } from "react-bootstrap";
import '../../assets/css/style.css';
import '../../assets/css/custom.css';

const Header = () => {
	let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    return (
      <>
     	<header>
			<nav className="navbar navbar-expand-sm navbar-light">
			  <div className="container-fluid">
				<a className="navbar-brand" href="#"><img src={path+"inforMed_Logo_Blue_1.png"} /></a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
				  <span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="collapsibleNavbar">
				  <ul className="navbar-nav">
					<li className="nav-item active">
						<a className="nav-link" href="#">Library</a>
					  </li>
					  <li className="nav-item">
						<a className="nav-link" href="#">Readers</a>
					  </li>
					  <li className="nav-item">
						<a className="nav-link" href="#">Analytics</a>
					  </li>
					  <li className="nav-item">
						<a className="nav-link" href="#">Distrubute</a>
					  </li>
					  <li className="nav-item">
						<a className="nav-link" href="#">Webinar</a>
					  </li>
				</ul>
				</div>
				<div className="user-login">
				<ul>
					<li className="nav-item dropdown">
					  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"><span>Hi,</span>Jacob Flindt</a>
					  <ul className="dropdown-menu">
						<li><a className="dropdown-item" href="#">Link</a></li>
						<li><a className="dropdown-item" href="#">Another link</a></li>
						<li><a className="dropdown-item" href="#">A third link</a></li>
					  </ul>
					</li>
				  </ul>
				</div>
			  </div>
			</nav>

		</header>
      </>
    );
};

export default Header;
