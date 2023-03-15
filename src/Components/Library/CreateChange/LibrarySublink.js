import React, { useEffect, useState } from "react";
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
import { useLocation, Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Tooltip from "react-bootstrap/Tooltip";
import { loader } from "../../../loader";
import { ENDPOINT } from "../../../axios/apiConfig";
import {postData} from "../../../axios/apiHelper";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const LibrarySublink = () => {
  const { state } = useLocation();
  const [allContents, setallContents] = useState([]);
  const [allCodes, setAllCodes] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(state?.pdfid);
  const [libraryData, setLibraryData] = useState([]);
  const [createNewLink, setCreateNewLink] = useState(false);
  const [newLink, setLink] = useState({
    delivery: "",
    identifier: "",
    isCheckBoth: false,
  });

  useEffect(() => {
    getLibraryData();
  }, []);

  const getLibraryData = async () => {
    loader("show");
    try {
      let selectedValue = ['id','title','code'];
      let data = {
        id: 18207,
        page: 1,
        search: '',
        type:'All',
        selectValue:JSON.stringify(selectedValue)
      };

      let body = data;
      const res = await postData(ENDPOINT.LIBRARY, body);
      let arr = [];
      let codearr = [];
      Object.entries(res?.data?.data?.library).map(([index, item]) => {
        arr.push({
          value: item.id,
          label: item.title,
        });
        codearr.push({
          value: item.id,
          label: item.code,
        });
        setallContents(arr);
        setAllCodes(codearr);
      });
      setLibraryData((oldArray) => [...oldArray, ...res?.data?.data?.library]);
      loader("hide");

    } catch (err) {
      console.log("err");
      loader("hide");
    }
  };

  const onArticleChange = (event) => {
    setSelectedArticle(event.value);
  };

  const createNewLinkClicked = () => {
    setCreateNewLink(true);
  };
  const handleChange = (name, e) => {
    setLink({ ...newLink, [name]: e });
  };

  const handleSubmit = () => {
    setLink({
      ...newLink,
      isCheckBoth: newLink?.delivery && newLink?.identifier,
    });
    setCreateNewLink(false);
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
                        <label htmlFor="">Content</label>
                        <Select
                          options={allContents}
                          placeholder="Select business unit"
                          onChange={(event) => onArticleChange(event)}
                          value={
                            selectedArticle != ""
                            ?
                            allContents[allContents.findIndex(el => el.value === selectedArticle)]
                            :''
                          }
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                      </div>
                      <div className="form-group blank">
                        <span>OR</span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="">URL</label>
                        <Select
                          options={allCodes}
                          placeholder="Select business unit"
                          onChange={(event) => onArticleChange(event)}
                          value={
                            selectedArticle != ""
                            ?
                            allCodes[allCodes.findIndex(el => el.value === selectedArticle)]
                            :''
                          }
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
                        disabled={!selectedArticle}
                      >
                        Create New Link +
                      </Button>
                    </div>
                    <div className="sublink_right_block">
                      {!newLink?.isCheckBoth ? (
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
            <label htmlFor="">Delivery</label>
            <DropdownButton
              className="dropdown-basic-button split-button-dropup "
              title={
                newLink?.delivery ? newLink?.delivery : "Select delivery Change"
              }
              name="delivery"
              onSelect={(e) => handleChange("delivery", e)}
            >
              <div className="scroll_div">
                <Dropdown.Item
                  eventKey="Social Media"
                  className={
                    newLink?.delivery == "Social Media" ? "active" : ""
                  }
                >
                  Social Media
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Article"
                  className={newLink?.delivery == "Article" ? "active" : ""}
                >
                  Article
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Large Print"
                  className={newLink?.delivery == "Large Print" ? "active" : ""}
                >
                  Large Print
                </Dropdown.Item>
              </div>
            </DropdownButton>
          </div>

          <div className="form-group">
            <label htmlFor="">Identifier</label>
            <DropdownButton
              className="dropdown-basic-button split-button-dropup "
              name="identifier"
              title={
                newLink?.identifier
                  ? newLink?.identifier
                  : "Select identifier Change"
              }
              onSelect={(e) => handleChange("identifier", e)}
            >
              <div className="scroll_div">
                <Dropdown.Item
                  eventKey="Social Media"
                  className={
                    newLink?.identifier == "Social Media" ? "active" : ""
                  }
                >
                  Social Media
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Article"
                  className={newLink?.identifier == "Article" ? "active" : ""}
                >
                  Article
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Large Print"
                  className={
                    newLink?.identifier == "Large Print" ? "active" : ""
                  }
                >
                  Large Print
                </Dropdown.Item>
              </div>
            </DropdownButton>
          </div>
        </Modal.Body>

        <div className="modal-footer">
          <button
            type="button"
            disabled={!(newLink?.delivery && newLink?.identifier)}
            className="btn btn-primary save btn-filled"
            onClick={() => handleSubmit()}
          >
            Apply
          </button>
        </div>
      </Modal>
    </>
  );
};

export default LibrarySublink;
