import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AliceCarousel from "react-alice-carousel";
import { Link, useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { loader } from "../../../loader";
import React, { useEffect, useState, useRef } from "react";
import {postData} from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import SimpleReactValidator from "simple-react-validator";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import RenderPdf from "./RenderPdf";
import Tooltip from "react-bootstrap/Tooltip";
import {
  Button,
  Col,
  Dropdown,
  Modal,
  DropdownButton,
  Form,
  Row,
  ProgressBar,
  Tab,
  Tabs,
} from "react-bootstrap";
import Select from "react-select";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const PreviewContent = (props) => {
    const navigate = useNavigate();
    return(
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    <button className="btn btn-primary btn-bordered back"
                    onClick={(e) => navigate("/set-popup")}
                    >
                      Back
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    <li className="">
                      <a href="">Create Your Content</a>
                    </li>
                    <li className="">
                      <a href="">Edit Consent Option</a>
                    </li>
                    <li className="active active-main">
                      <a href="">Preview Your Content &amp; Publish</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <button className="btn btn-primary btn-bordered move-draft">
                      Cancel
                    </button>
                    <button className="btn btn-primary btn-filled next">
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-change-content spc-content">
              <div className="form_action">
                <div className="row">
                  <Col className="sublink_right d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="edit_content_title">Title <img src={path_image + "edit-button.svg"} alt="Edit" /></h5>
                      <Button className="btn-filled">Change content file</Button>
                    </div>

                    <RenderPdf/>
                    
                  </Col>
                </div>
              </div>
            </div>
      </Row>
    </div>
  </Col>
  )
}

export default PreviewContent;
