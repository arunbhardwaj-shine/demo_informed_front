import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button, Modal } from "react-bootstrap";


const Sidebar = () => {
    return (
      <>
      <div className="sidebar">
        <a className="active" href="#home">Email</a>
        <a href="#news">Smart List</a>
        <a href="#contact">Email Analytics</a>
      </div>
      </>
    );
};

export default Sidebar;
