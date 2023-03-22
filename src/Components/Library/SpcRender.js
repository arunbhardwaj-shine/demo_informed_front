import {ENDPOINT} from "../../axios/apiConfig";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {postData, deleteData} from "../../axios/apiHelper";
import RenderPdf from "./CreateChange/RenderPdf";
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

const SpcRender = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleNext =(obj) => {
    console.log(obj);
  }
  return (
    <>
    <Col className="right-sidebar">
      <div className="custom-container">
      <Row>
        <div className="page-top-nav">
           <div className="row justify-content-end align-items-center">
              <div className="col-12 col-md-1">
                 <div className="header-btn-left">
                 <button className="btn btn-primary btn-bordered back"
                   onClick={(e) => navigate("/spc-view")}
                   >
                   Back
                 </button>
                  </div>
              </div>
           </div>
        </div>
      <div className="create-change-content spc-content">
        <div className="form_action">
          <div className="row">
            <Col className="sublink_right preview-content d-flex flex-column">
                {
                  state?.file && typeof state?.file !== "undefined"
                  ?
                  <RenderPdf
                    url= {state?.file}
                    handleNext ={handleNext}
                  />
                  : null
                }
            </Col>
          </div>
        </div>
      </div>
    </Row>
  </div>
  </Col>
    </>
  )}

export default SpcRender
