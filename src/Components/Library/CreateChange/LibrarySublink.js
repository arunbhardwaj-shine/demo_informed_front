import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  ProgressBar,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Tooltip from "react-bootstrap/Tooltip";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const LibrarySublink = () => {
  const [BusinessUnitAll, setBusinessUnitAll] = useState([
    { value: "Critical", label: "Critical Care" },
    { value: "Haematology", label: "Haematology" },
    { value: "Immunotherapy", label: "Immunotherapy" },
  ]);
  const [BusinessUnit, setBusinessUnit] = useState("");
  const onBusinessUnitChange = (event) => {
    setBusinessUnit(event.value);
  };

  const navigate = useNavigate();
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title">
                <h2>New SubLink</h2>
              </div>
              <div className="header-btn">
                <Button
                  className="btn-bordered cancel"
                  onClick={() => navigate("/library-create")}
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="create-change-content spc-content">
              <div className="form_action">
                <div className="row">
                  <Col className="sublink_left">
                    <h5>
                      Please find the content you'd like a new subLink for
                    </h5>
                    <div className="product-unit d-flex justify-content-between align-items-center">
                      <div className="form-group">
                        <label for="">Content</label>
                        <Select
                          options={BusinessUnitAll}
                          placeholder="Select business unit"
                          onChange={(event) => onBusinessUnitChange(event)}
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                      </div>
                      <div className="form-group blank">
                        <span>OR</span>
                      </div>
                      <div className="form-group">
                        <label for="">URL</label>
                        <Select
                          options={BusinessUnitAll}
                          placeholder="Select business unit"
                          onChange={(event) => onBusinessUnitChange(event)}
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                      </div>
                    </div>
                    <div className="no_content_selected">
                      <h3>No content selected yet!</h3>
                    </div>
                  </Col>
                  <Col className="sublink_right d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>SubLinks:</h5>
                      <Button className="btn-filled">Create New Link +</Button>
                    </div>
                    <div className="sublink_right_block">
                      <div className="no-sublink">
                        <img src={path_image + "dummy-sublink.png"} alt="" />
                      </div>
                      <div className="sublink-list">
                        <div className="sublink-listed-view d-flex align-items-center">
                          <div className="sublink-listed-view-block">
                            <h5>Identifier text ipsum quamodio</h5>
                            <h6>Social media</h6>
                            <div className="sublink-list-link">
                              <Link to="https://docintel.app/Critical_Care_CEE_CIS/YJPbRILv_JUFCJTEzJUNEWSVBNCVEOCVEREQ">
                                https://docintel.app/Critical_Care_CEE_CIS/YJPbRILv_JUFCJTEzJUNEWSVBNCVEOCVEREQ
                              </Link>
                              <span className="copy-content">
                                <img
                                  src={path_image + "copy-content.svg"}
                                  alt="Copy"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="sublink-qr">
                            <div className="sublink-qr-download">
                              <img
                                src={path_image + "qr-code-img.png"}
                                alt=""
                              />
                              <Link>
                                <img src={path_image + "download.svg"} alt="" />
                              </Link>
                            </div>
                          </div>
                          <Button className="btn-bordered">Analytics</Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default LibrarySublink;
