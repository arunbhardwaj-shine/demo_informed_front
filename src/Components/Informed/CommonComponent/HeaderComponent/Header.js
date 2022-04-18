import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button, Modal } from "react-bootstrap";
import '../../assets/css/custom.css';

const Header = () => {
    return (
      <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a href="#" className="navbar-brand">
                <img src="https://informed.pro/css/newtemplate/images/inforMed_Logo_Blue.png" height="28" alt="CoolBrand" />
            </a>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav">
                    <a href="#" className="nav-item nav-link active">Library</a>
                    <a href="#" className="nav-item nav-link">Readers</a>
                    <a href="#" className="nav-item nav-link">Analytics</a>
                    <a href="#" className="nav-item nav-link">Distribute</a>
                    <a href="#" className="nav-item nav-link disabled" tabIndex="-1">Webinar</a>
                </div>
                <div className="navbar-nav ms-auto">
                    <a href="#" className="nav-item nav-link">Login</a>
                </div>
            </div>
        </div>
    </nav>
      </>
    );
};

export default Header;
