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
           <Row className="justify-content-end align-items-center">
              <Col sm={12}>
                 <div className="header-btn-left page-title d-flex">
                   <Link className="btn btn-primary btn-bordered back-btn" to="/spc-view">
                    <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z" fill="#97B6CF"/>
                    </svg>
                  </Link>
                  <h2>
                    {
                      state?.title && typeof state?.title !== "undefined"
                      ?  state?.title
                      : null
                    }
                  </h2>
                </div>
              </Col>
           </Row>
        </div>
      <div className="create-change-content spc-content">
        <div className="form_action">
          <Row>
            <Col className="sublink_right preview-content d-flex flex-column">
                {
                  state?.file && typeof state?.file !== "undefined"
                  ?
                  <RenderPdf
                    next = "0"
                    url= {state?.file}
                    handleNext ={handleNext}
                    hidePopup = "1"
                  />
                  : null
                }
            </Col>
          </Row>
        </div>
      </div>
    </Row>
  </div>
  </Col>
    </>
  )}

export default SpcRender
