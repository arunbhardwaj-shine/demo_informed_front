import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AliceCarousel from "react-alice-carousel";
import { Link, useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { loader } from "../../../loader";
import React, { useEffect, useState, useRef } from "react";
import { postData, postFormData } from "../../../axios/apiHelper";
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
//pdf id  3846
//ebook 3899
const PreviewContent = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [articleId, setArticleId] = useState(
    typeof state?.pdfId !== "undefined" ? state?.pdfId : ""
  );
  const [pdfData, setPdfData] = useState([]);
  const [editTitle, setEditTitle] = useState(false);
  const [publishStatus, setPublishStatus] = useState(false);
  const [titleChange, setTitleChange] = useState("");
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  const [templateId, setTemplateId] = useState();
  const [newTemplateClicked, setNewTemplateClicked] = useState(false);
  const [templateClickedd, setTemplateClicked] = useState(false);
  const [pdfFileId, setPdfFileId] = useState();
  const [templatePdf, setTemplatePdf] = useState();
  const [nextFlag, setNextFlag] = useState(0);
  const [templateName, setTemplateName] = useState("");
  const [userInputs, setUserInputs] = useState({});
  const [updateFlag, setUpdateFlag] = useState(0);
  const [apiCallBackFlag, setApiCallBackFlag] = useState(0);
  const BrokenImage =
    "https://docintel.s3-eu-west-1.amazonaws.com/cover/default/default.png";

  useEffect(() => {
    getArticleData();
  }, []);

  const getArticleData = async () => {
    loader("show");
    try {
      if (typeof articleId === "undefined") {
        if (state?.pdfId) {
          setArticleId(state?.pdfId);
        }
      }

      let body = {
        pdfId: typeof state?.pdfId !== "undefined" ? state?.pdfId : articleId,
      };
      const res = await postData(ENDPOINT.LIBRARYGETARTICLE, body);
      setPdfData(res?.data?.data);
      setApiCallBackFlag(apiCallBackFlag + 1);

      if (res?.data?.data?.file_type && res?.data?.data?.file_type == "pdf") {
        setNewTemplateClicked(true);
      }
      loader("hide");
    } catch (err) {
      loader("hide");
    }
  };

  const updateArticleTitle = (title) => {
    // if(pdfData?.file_type && pdfData.file_type == "ebook") {
    // 	let pdfIndex = pdfData.ebookData.findIndex(el => el.id === pdfFileId);
    // 	pdfData.ebookData[pdfIndex].title = title;
    // 	setPdfData(pdfData);
    // 	setTemplateName(title);
    // }else{
    pdfData.title = title;
    // }
  };

  const templateClicked = (template, e) => {
    const div = document.querySelector("img.select_mm");
    setNewTemplateClicked(true);
    if (div) {
      div.classList.remove("select_mm");
    }

    if (pdfData?.file_type && pdfData.file_type == "ebook") {
      let pdfIndex = pdfData.ebookData.findIndex((el) => el.id === template.id);
      let nextItem = pdfData.ebookData[pdfIndex + 1];
      if (typeof nextItem !== "undefined") {
        setNextFlag(1);
      } else {
        setNextFlag(0);
      }
    } else {
      setNextFlag(0);
    }

    setTemplatePdf(template?.file_name);
    setTemplateName(template?.title);
    setTemplateClicked(true);
    setPdfFileId(template.id);
    setEditTitle(false);
    e.target.classList.toggle("select_mm");
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    if (pdfData?.file_type && pdfData.file_type == "ebook") {
      if (typeof pdfFileId === "undefined") {
        toast.warning("Please select the Ebook chapter.");
      } else {
        setShow(true);
      }
    } else {
      setShow(true);
    }
  };

  const handleChange = (e, isSelectedName) => {
    setUpdateFlag(1);
    if (e?.target?.files?.length < 1) {
      return;
    }
    setUserInputs({
      ...userInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e?.target?.value
        : e?.target?.value,
    });
  };

  const uploadPdf = async (e) => {
    e.preventDefault();
    loader("show");
    try {
      let formData = new FormData();
      formData.append("pdfId", articleId);
      formData.append("type", pdfData.file_type);
      formData.append("userId", 18207);
      formData.append("file", userInputs?.uploadFile?.[0]);

      if (pdfData?.file_type && pdfData.file_type == "ebook") {
        formData.append("title", userInputs?.title);
        formData.append("fileId", pdfFileId);
      }
      await postFormData(ENDPOINT.UPDATE_PDF_FILE, formData, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      });
      getArticleData();
    } catch (err) {
      loader("hide");
    }
    handleClose();
    setUpdateFlag(0);
    setNewTemplateClicked(false);
  };

  const imageOnError = (event) => {
    event.currentTarget.src = BrokenImage;
    event.currentTarget.className = "error";
  };

  const handleNext = async (obj) => {
    loader("show");
    obj.append("pdfId", articleId);
    obj.append("userId", 18207);
    obj.append("type", pdfData?.file_type);
    if (pdfData.file_type == "ebook") {
      obj.append("pdfFileId", pdfFileId);
    }
    try {
      const res = await postFormData(ENDPOINT.ADD_PDF_WORD, obj, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (pdfData?.file_type && pdfData.file_type == "ebook") {
        let pdfIndex = pdfData.ebookData.findIndex((el) => el.id === pdfFileId);
        pdfData.ebookData[pdfIndex].processed = 1;
        pdfData.ebookData[pdfIndex].image = res?.data?.data?.image?.file;

        let nextItem = pdfData.ebookData[pdfIndex + 1];
        if (typeof nextItem !== "undefined") {
          pdfData.ebookData[pdfIndex + 1].processed = 1;
          let get_next_id = nextItem.id;
          var link = document.getElementById("template_dyn" + get_next_id);
          link.click();
        } else {
          setPublishStatus(true);
          navigate("/content-detail", {
            state: { pdfId: articleId },
          });
        }
        setPdfData(pdfData);
      } else {
        setPublishStatus(true);
        navigate("/content-detail", {
          state: { pdfId: articleId },
        });
      }
      setApiCallBackFlag(apiCallBackFlag + 1);
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log(err);
    }
  };

  return (
    <Col className="right-sidebar">
      <div className="custom-container">
        <Row>
          <div className="page-top-nav">
            <div className="row justify-content-end align-items-center">
              <div className="col-12 col-md-1">
                <div className="header-btn-left">
                  <Link
                    className="btn btn-primary btn-bordered back"
                    to="/set-popup"
                    state={{ pdfId: state?.pdfId }}
                  >
                    Back
                  </Link>
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
                  <Link
                    className="btn btn-primary btn-bordered move-draft"
                    to="/library-create"
                  >
                    Cancel
                  </Link>

                  <Link
                    to="/content-detail"
                    state={{ pdfId: articleId }}
                    className={
                      publishStatus
                        ? "btn btn-primary btn-filled next"
                        : "btn btn-primary btn-filled next btn-disabled"
                    }
                  >
                    Publish
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {apiCallBackFlag
            ? pdfData?.file_type &&
              pdfData.file_type == "ebook" && (
                <section className="select-mail-template library-cosent prev_content">
                  <div className="custom-container">
                    <div className="page-title">
                      <h4>Select chapter to preview it</h4>
                    </div>
                    <AliceCarousel
                      mouseTracking
                      disableDotsControls
                      activeIndex={activeIndex}
                      responsive={responsive}
                      onSlideChanged={syncActiveIndex}
                    >
                      {pdfData?.ebookData.map((template, index) => {
                        return (
                          <>
                            <div
                              className={
                                index === 0 || template.processed == 1
                                  ? "item"
                                  : template.id == pdfFileId
                                  ? "item"
                                  : " item disable-link"
                              }
                              onClick={(e) => templateClicked(template, e)}
                              id={"click" + template.id}
                            >
                              <img
                                id={"template_dyn" + template.id}
                                src={template.image}
                                onError={imageOnError}
                                alt=""
                                className={
                                  typeof templateId !== "undefined" &&
                                  templateId == template.id
                                    ? "select_mm"
                                    : ""
                                }
                              />
                              <p>{template.title}</p>
                            </div>
                          </>
                        );
                      })}
                    </AliceCarousel>
                  </div>
                </section>
              )
            : null}
          <div className="create-change-content spc-content">
            <div className="form_action">
              <div className="row">
                <Col className="sublink_right preview-content d-flex flex-column">
                  <>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="edit_pdf_title">
                        <h4 className="edit_content_title">
                          {editTitle ? (
                            <input
                              type="text"
                              className="form-control"
                              id="new-tag"
                              value={titleChange}
                              onChange={(e) => setTitleChange(e.target.value)}
                            />
                          ) : (
                            pdfData?.title
                          )}

                          {editTitle ? (
                            <>
                              <button
                                className="btn btn-filled"
                                onClick={(e) => {
                                  setEditTitle(false);
                                  updateArticleTitle(titleChange);
                                }}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-bordered"
                                onClick={(e) => {
                                  setEditTitle(false);
                                  setTitleChange(pdfData?.title);
                                }}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn btn-edit"
                              onClick={(e) => {
                                setEditTitle(true);
                                setTitleChange(pdfData?.title);
                              }}
                            >
                              <img
                                src={path_image + "edit-button.svg"}
                                alt="Edit"
                              />
                            </button>
                          )}
                        </h4>
                      </div>
                      <div className="blink_text">
                        <h4>
                          Please verify every page is correct and press
                          'Publish' at the bottom when you're sure.
                        </h4>
                      </div>
                      <Button className="btn btn-bordered" onClick={handleShow}>
                        Change content file
                      </Button>
                    </div>
                    {newTemplateClicked ? (
                      pdfData?.file_type && pdfData.file_type == "ebook" ? (
                        <RenderPdf
                          next={nextFlag}
                          url={templatePdf}
                          handleNext={handleNext}
                          hidePopup="0"
                        />
                      ) : (
                        <RenderPdf
                          next={nextFlag}
                          url={pdfData?.file_name}
                          handleNext={handleNext}
                          hidePopup="0"
                        />
                      )
                    ) : null}
                  </>
                </Col>
              </div>
            </div>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            className="send-confirm preview-content"
            id="download-qr"
          >
            <Modal.Header>
              <h5 className="modal-title" id="staticBackdropLabel">
                Change file
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleClose}
              ></button>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {pdfData?.file_type && pdfData.file_type == "ebook" ? (
                  <div className="form-group">
                    <label htmlFor="">Chapter title </label>
                    <input
                      type="text"
                      placeholder="Type chapter title"
                      name="chapter_title"
                      className="form-control"
                      value={templateName}
                      onChange={(e) => {
                        setTemplateName(e.target.value);
                        handleChange(e, "title");
                      }}
                    />
                  </div>
                ) : null}
                <div className="form-group">
                  <div className="upload-file-box">
                    <div className="box">
                      <input
                        type="file"
                        name="file-5[]"
                        id="file-5"
                        className="inputfile inputfile-5"
                        accept="application/pdf"
                        onChange={(e) => handleChange(e, "uploadFile")}
                      />
                      <label htmlFor="file-5">
                        <span>Choose Your File</span>
                      </label>
                      {userInputs?.uploadFile?.[0]?.name ? (
                        <p>{userInputs?.uploadFile?.[0].name}</p>
                      ) : (
                        <p>Upload your PDF</p>
                      )}
                    </div>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <div className="modal-footer">
              <button
                type="button"
                className={
                  updateFlag == 0
                    ? "btn btn-primary save btn-filled move-draft btn-disabled"
                    : "btn btn-primary save btn-filled move-draft"
                }
                onClick={uploadPdf}
              >
                Upload
              </button>
            </div>
          </Modal>
        </Row>
      </div>
    </Col>
  );
};

export default PreviewContent;
