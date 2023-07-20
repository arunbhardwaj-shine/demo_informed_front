import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Col,
  Dropdown,
  Modal,
  DropdownButton,
  Form,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ENDPOINT } from "../../../axios/apiConfig";
import {postFormData} from "../../../axios/apiHelper";
import MessageModel from "../../../Model/MessageModel";
import { toast } from "react-toastify";
import QRCode from "qrcode.react";
import { usePdf } from '@mikecousins/react-pdf';
import PDF from "react-pdf-js";
import packageJson from '../../../../package.json';
import  Viewer from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import Select from "react-select";
import { RotateEvent, PageChangeEvent, DocumentLoadEvent, RenderPageProps,ProgressBar} from '@react-pdf-viewer/core';
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const AddLinkToPdf = () => {

  let url = "https://docintel.s3.eu-west-1.amazonaws.com/pdf/arunp/pdflink_1689849787.pdf";
  const defaultScale = 1.3347;
  const [chapterOption,setchapterOption] = useState([
    {"label":"Test","value":"value"}
  ]);

  const renderPage = (props: RenderPageProps) => {
    return (
      <>
        <div id={"canvas_page_" + props.pageIndex}>
          {props.canvasLayer.children}
        </div>
        <div
          style={{ userSelect: "none" }}
          id={"page_" + props.pageIndex}
          className="pdf_page_class"
        >
          {props.textLayer.children}
        </div>
        {props.annotationLayer.children}
      </>
    );
  };

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    const toolbar = document.querySelector(".viewer-layout-toolbar");
    const sidebar = document.querySelector(".viewer-layout-sidebar");
    if (toolbar) {
      toolbar.remove();
    }

    if (sidebar) {
      sidebar.remove();
    }
  };

    return (
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav sticky">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    {
                      localStorage.getItem('user_id') == "56Ek4feL/1A8mZgIKQWEqg=="
                      ?
                          <Link
                            className="btn btn-bordered btn btn-primary"
                            to="/library-create"
                          >
                            Back
                          </Link>
                      :
                      <Link
                        className="btn btn-bordered btn btn-primary"
                        to="/library-create"
                      >
                        Back
                      </Link>
                    }
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    {
                      <>
                        <li className="">
                          <a href="">Create Your Content</a>
                        </li>
                        {
                          localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg==" ?
                          <li className="active active-main">
                          <a href="">Edit Consent Option</a>
                          </li> : null
                        }
                        <li className="">
                          <a href="">Preview Your Content &amp; Publish</a>
                        </li>
                      </>
                    }
                  </ul>
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <Button className="btn btn-primary btn-filled next send_btn">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-change-content spc-content">
              <div className="form_action">
                <div className="row">
                  <Col className="sublink_right preview-content d-flex flex-column">
                  <div className="form_action embedding-video">
                      <div className="side-step-text first-step">
                        <div className="embedded-video-step">
                          <h2>Step1</h2>
                        </div>
                        <p>Select the Chapter</p>
                        <Form.Group className="formgroup">
                          <Form.Label>Chapter</Form.Label>
                          <Select
                            className="dropdown-basic-button split-button-dropup "
                            options={chapterOption}

                          />
                        </Form.Group>
                      </div>

                    <div className="side-step-text second-step">

                        <div className="embedded-video-step">
                          <h2>Step2</h2>
                        </div>
                      <p>
                        Select the video and highlight the area you want to embed the
                        video in{" "}
                      </p>
                      <Form.Group className="formgroup">
                        <Form.Label>
                          Videos <span>*</span>
                        </Form.Label>
                        <Select
                          className="dropdown-basic-button split-button-dropup "

                        />

                        <div className="upload-file-box">
                          <Button
                            className="btn-bordered btn-voilet"

                          >
                            Upload new Video +
                          </Button>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                      <Viewer
                        id="container"
                        renderPage={renderPage}
                        defaultScale={defaultScale}
                        onDocumentLoad={handleDocumentLoad}
                        renderMode="canvas"
                        fileUrl={url}
                      />
                  </Col>
                </div>
              </div>
            </div>

          </Row>
        </div>
      </Col>
    )
}

export default AddLinkToPdf;
