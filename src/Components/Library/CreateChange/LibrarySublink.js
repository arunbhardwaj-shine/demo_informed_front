import React, { useState } from "react";
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
  const [createNewLink, setCreateNewLink] = useState(false);
  const [deliveryChange, setDeliveryChange] = useState("");
  const onBusinessUnitChange = (event) => {
    setBusinessUnit(event.value);
  };

  const createNewLinkClicked = () => {
    setCreateNewLink(true);
  };

  const onDeliveryChange = (event) => {
    // console.log("d", event);
    setDeliveryChange(event);
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
                      <Button
                        className="btn-filled"
                        onClick={createNewLinkClicked}
                      >
                        Create New Link +
                      </Button>
                    </div>
                    <div className="sublink_right_block">
                      {deliveryChange == "" ? (
                        <div className="no-sublink">
                          <img src={path_image + "dummy-sublink.png"} alt="" />
                        </div>
                      ) : (
                        <div className="sublink-list">
                          <div className="sublink-listed-view d-flex align-items-center">
                            <div className="sublink-listed-view-block">
                              <h5>Identifier text ipsum quamodio</h5>
                              <h6>Social media</h6>
                              <div className="sublink-list-link">
                                <Link to="https://docintel.app/Critical_Care_CEE_CIS/YJPbRILv_JUFCJTEzJUNEWSVBNCVEOCVEREQ">
                                  https://docintel.app/Critical_Care_CEE_CIS/YJPbRILv_JUFCJTEzJUNEWSVBNCVEOCVEREQ
                                </Link>
                                <span
                                  className="copy-content"
                                  onClick={() => {
                                    toast.success(
                                      "content copied to the clipboard!"
                                    );
                                    window.navigator.clipboard.writeText(
                                      "https://docintel.app/Critical_Care_CEE_CIS/YJPbRILv_JUFCJTEzJUNEWSVBNCVEOCVEREQ"
                                    );
                                  }}
                                >
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
                                  <img
                                    src={path_image + "download.svg"}
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <Button className="btn-bordered">Analytics</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>

      <Modal show={createNewLink} className="send-confirm" id="download-qr">
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            Create New Link
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              setCreateNewLink(false);
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label for="">Delivery</label>
            <DropdownButton
              className="dropdown-basic-button split-button-dropup "
              title={
                deliveryChange != "" ? deliveryChange : "Select delivery Change"
              }
              onSelect={(event) => onDeliveryChange(event)}
            >
              <div className="scroll_div">
                <Dropdown.Item
                  eventKey="Social Media"
                  className={deliveryChange == "Social Media" ? "active" : ""}
                >
                  Social Media
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Article"
                  className={deliveryChange == "Article" ? "active" : ""}
                >
                  Article
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Large Print"
                  className={deliveryChange == "Large Print" ? "active" : ""}
                >
                  Large Print
                </Dropdown.Item>
              </div>
            </DropdownButton>
            {/* <label for="">Identifier</label>
            <DropdownButton
              className="dropdown-basic-button split-button-dropup "
              // title={size != "" ? size : "Select Size"}
              // onSelect={(event) => onSizeChange(event)}
            >
              <div className="scroll_div">
                <Dropdown.Item eventKey="Tiny" className={"active"}>
                  Tiny
                </Dropdown.Item>
                <Dropdown.Item eventKey="Article" className={"active"}>
                  Article
                </Dropdown.Item>
                <Dropdown.Item eventKey="Large Print" className={"active"}>
                  Large Print
                </Dropdown.Item>
              </div>
            </DropdownButton> */}
          </div>
        </Modal.Body>
        <div className="modal-footer">
          <button
            type="button"
            disabled={deliveryChange == "" ? true : false}
            className="btn btn-primary save btn-filled"
            onClick={() => setCreateNewLink(false)}
          >
            Apply
          </button>
        </div>
      </Modal>
    </>
  );
};

export default LibrarySublink;
