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
import { postData, postFormData, getData } from "../../../axios/apiHelper";
import MessageModel from "../../../Model/MessageModel";
import { toast } from "react-toastify";
import QRCode from "qrcode.react";
import { usePdf } from "@mikecousins/react-pdf";
import PDF from "react-pdf-js";
import packageJson from "../../../../package.json";
import Viewer from "@phuocng/react-pdf-viewer";
import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";
import Select from "react-select";
import axios from "axios";
import {
  RotateEvent,
  PageChangeEvent,
  DocumentLoadEvent,
  RenderPageProps,
  ProgressBar,
} from "@react-pdf-viewer/core";
import { loader } from "../../../loader";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const AddLinkToPdf = () => {
  const { state } = useLocation();
  const [articleId, setArticleId] = useState(
    typeof state?.pdfId !== "undefined" ? state?.pdfId : ""
  );
  const [isEdit, setIsEdit] = useState(
    typeof state?.isEdit !== "undefined" ? state?.isEdit : 0
  );
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [file, setFile] = useState();
  const [startXCordinate, setStartXCordinate] = useState(0);
  const [startYCordinate, setStartYCordinate] = useState(0);
  const [endXCordinate, setEndXCordinate] = useState(0);
  const [endYCordinate, setEndYCordinate] = useState(0);
  const [mousefirstdown, setMousefirstdown] = useState(0);
  const [highlighted, setHighlighted] = useState(false);
  const [showAddLink, setShowAddLink] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hoverUrl, setHoverUrl] = useState("");
  const [linkonpage, setLinkonpage] = useState(0);
  const [xcoordinates, setXcoordinates] = useState(0);
  const [ycoordinates, setYcoordinates] = useState(0);
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState({});
  const [initFunData, setInitFunData] = useState();
  const [videoListingData, setVideoListingData] = useState([]);
  const [videoSelect, setVideoSelect] = useState("");
  const [ebookData, setEbookData] = useState();
  const [chapterOption, setChapterOption] = useState([]);

  const [hoveredLinkPosition, setHoveredLinkPosition] = useState({
    x: 0,
    y: 0,
  });
  let url =
    "https://docintel.s3.eu-west-1.amazonaws.com/pdf/arunp/pdflink_1689849787.pdf";
  const defaultScale = 1.3347;
  const parentRef = useRef(null);

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
  useEffect(() => {
    initFun();
    videoFun();
  }, []);

  const initFun = async () => {
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
      setInitFunData(res?.data?.data);
      if (res?.data?.data?.file_type == "pdf") {
        setFile(res?.data?.data?.file_name);
      }

      if (res?.data?.data?.file_type == "ebook") {
        if (res?.data?.data?.ebookData?.length) {
          const newData = ebookData?.map((item, index) => {
            return {
              label: item?.title,
              value: item?.title,
              index: index,
            };
          });
          setChapterOption(newData);
          setFile(res?.data?.data?.ebookData[0]);
          setEbookData(res?.data?.data?.ebookData);
        }
      }

      console.log("res--->", res?.data?.data?.ebookData[0]);
    } catch (err) {
      loader("hide");
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };
  const onChapterSelect = (e) => {
    setFile(ebookData[e?.index]);
  };

  const videoFun = async () => {
    try {
      loader("show");
      const res = await getData(ENDPOINT.LIBRARY_VIDEO_LISTING);
      if (res?.data?.data?.length) {
        let newVideo = res?.data?.data?.map((item, index) => {
          return {
            label: item?.title,
            value: item?.title,
            key: item?.title,
            index: index,
            link: item?.videoLink,
          };
        });
        setVideoListingData(newVideo);
      }
    } catch (err) {
      loader("hide");
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };
  const onVideoSelect = (e) => {
    var textField = document.createElement("textarea");
    textField.innerText = e?.link;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setVideoSelect(e);
  };

  useEffect(() => {
    parentRef?.current?.addEventListener("mousedown", handleMouseDown);
    parentRef?.current?.addEventListener("mousemove", handleMouseMove);
    parentRef?.current?.addEventListener("mouseup", handleMouseUp);

    return () => {
      parentRef?.current?.removeEventListener("mousedown", handleMouseDown);
      parentRef?.current?.removeEventListener("mousemove", handleMouseMove);
      parentRef?.current?.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, startX, startY, endX, endY]);

  const handleMouseDown = (event) => {
    if (event.target.className === "viewer-text-layer") {
      setMousefirstdown(event.clientY);
      setHighlighted(false);
      setShowAddLink(true);
      const viewerRect = parentRef.current.getBoundingClientRect();
      const textLayer = parentRef.current.querySelector(".viewer-text-layer");
      const scrollLayer = document.querySelector(".modal-body-content");
      const scrollTop = scrollLayer.scrollTop;

      const x = event.clientX - viewerRect.left;
      const y = event.clientY - viewerRect.top;

      const xInPage = x - textLayer.offsetLeft + 26;
      const yInPage = y - textLayer.offsetTop - scrollTop + 26;

      setDragging(true);
      setStartX(xInPage);
      setStartY(yInPage);
      setEndX(xInPage);
    }
  };

  const handleMouseMove = (event) => {
    const targetLink = event.target.closest(".viewer-annotation-link");

    if (targetLink) {
      const anchorTag = targetLink.querySelector("a");
      if (anchorTag) {
        const linkText = anchorTag.getAttribute("href");
        // console.log("=====-----=-=-->>",linkText)

        const rect = targetLink.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const top = rect.top;
        const left = rect.left;
        const x2 = left + width;
        const y2 = top + height;

        const textLayer = parentRef.current.querySelector(".viewer-text-layer");
        const scrollTop = document.querySelector(
          ".modal-body-content"
        ).scrollTop;
        const x = event.clientX - textLayer.getBoundingClientRect().left;
        const y =
          event.clientY -
          textLayer.getBoundingClientRect().top -
          scrollTop -
          20;

        if (hoverUrl != linkText) {
          setHoverUrl(linkText);
        }
        setHoveredLink(linkText);
        setHoveredLinkPosition({ x, y });
        setIsPopupOpen(true);
      }
    } else {
      const targetLinkPop = event.target.closest(".link-popup");
      if (!targetLinkPop) {
        setIsPopupOpen(false);
      }
    }

    if (event.target.closest(".viewer-page-layer")) {
      window.getSelection().removeAllRanges();
      if (!dragging) return;

      const viewerRect = parentRef.current.getBoundingClientRect();
      const scrollLayer = document.querySelector(".modal-body-content");
      const scrollTop = scrollLayer.scrollTop;
      const textLayer = parentRef.current.querySelector(".viewer-text-layer");
      const pageHeight = textLayer.getBoundingClientRect().height;

      getMousePosition(parentRef.current, event, scrollTop);

      // Calculate the coordinates relative to the viewer
      const x = event.clientX - viewerRect.left;
      const y = event.clientY - viewerRect.top;
      setEndXCordinate(x);
      // setEndYCordinate(y-(page * pageHeight));

      // Calculate the coordinates relative to the text layer
      const xInPage = x - textLayer.offsetLeft;
      const yInPage = y - textLayer.offsetTop - scrollTop;

      if (xInPage < startX && yInPage < startX) {
        setEndX(startX);
        setEndY(startY);
      } else {
        setEndX(xInPage);
        setEndY(yInPage);
      }
    }
  };

  const handleMouseUp = (event) => {
    if (event.target.closest(".viewer-page-layer")) {
      if (event.target.name === "url") return;
      if (event.target.name === "addurl") return;
      const textLayer = parentRef.current.querySelector(".viewer-text-layer");
      const pageHeight = textLayer.getBoundingClientRect().height;

      window.getSelection().removeAllRanges();
      setDragging(false);
      if (showAddLink) {
        setHighlighted(true);
      }
    }
  };

  const getMousePosition = (canvas, event, scrollTop) => {
    const closestElement = event.target.closest(".pdf_page_class");
    if (closestElement) {
      const closestElementId = closestElement.id;
      const pageNumber = parseInt(closestElementId.slice(5));
      setLinkonpage(pageNumber);
      const viewerTextLayer = document.querySelector(
        `#${closestElementId} .viewer-text-layer`
      );
      const rect = viewerTextLayer.getBoundingClientRect();
      const x = event.clientX - 16 - rect.left;
      const y = event.clientY - rect.top - scrollTop;
      // console.log('Coordinate of eveny x: ' + (event.clientX - 16), 'Coordinate of eveny y: ' + event.clientY);
      // console.log(event.clientY,"clientY");
      // console.log(rect.top,"TOp");
      // console.log(scrollTop," - scrollTop");
      // console.log('Coordinate of rect x: ' + rect.left, 'Coordinate of rect y: ' + rect.top - scrollTop);
      // console.log('Coordinate of difference x: ' + x, 'Coordinate of difference y: ' + y);
      // const updatedTop = rect.top  - scrollTop;
      setXcoordinates(x);
      setYcoordinates(rect.top);
    }
  };

  const handleAddUrl = (e, file) => {
    e.preventDefault();
    let embed_url = inputUrl.trim();
    if (embed_url.length > 0 && isValidUrl(embed_url)) {
      setError(false);
    } else {
      setError(true);
    }

    // start from new view
    let difference_width = xcoordinates;
    let difference_height = ycoordinates;
    let box = parentRef.current.querySelector(".highlight_box");
    let box_width = box.getBoundingClientRect().width;
    let box_height = box.getBoundingClientRect().height;
    let actual_width = xcoordinates - 11 - box_width;
    let x_cord = actual_width / 3.8;
    let actual_height = mousefirstdown + 11 - ycoordinates;
    let y_cord = actual_height / 3.8;
    let page_no = linkonpage + 1;
    let box_width_x = box_width / 3.7;
    let box_width_y = box_height / 3.7;
    let cordinates =
      x_cord + "," + parseInt(y_cord) + "," + box_width_x + "," + box_width_y;
    addLinkToPdf(cordinates, page_no, embed_url, file);
    // console.log(x_cord,"x coordinates");
    // console.log(y_cord,"Y coordinates");
    // console.log(,"box_accurate_width");
    // console.log(box_height/3.7,"box_accurate_height");
    // console.log("page",page_no);
  };

  const addLinkToPdf = async (cordinates, page_no, embed_url, file) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      file: file,
      link: embed_url,
      page_no: page_no,
      file_type: "pdf",
      chapter: 0,
      cordinates: cordinates,
    };
    // axios
    //   .post(`libraries/addTempLinkToPdf`, body)
    //   .then((res) => {
    //     setFile(res?.data?.data);
    //     setForceRender((forceRender) => !forceRender);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setDragging(false);
    setHighlighted(false);
  };

  const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  const closePopup = () => {
    setDragging(false);
    setHighlighted(false);
  };

  return (
    <Col className="right-sidebar custom-change">
      <div className="custom-container">
        <Row>
          <div className="page-top-nav sticky">
            <div className="row justify-content-end align-items-center">
              <div className="col-12 col-md-1">
                <div className="header-btn-left">
                  {localStorage.getItem("user_id") ==
                  "56Ek4feL/1A8mZgIKQWEqg==" ? (
                    <Link
                      className="btn btn-bordered btn btn-primary"
                      to="/library-create"
                    >
                      Back
                    </Link>
                  ) : (
                    <Link
                      className="btn btn-bordered btn btn-primary"
                      to="/library-create"
                    >
                      Back
                    </Link>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-9">
                <ul className="tabnav-link">
                  {
                    <>
                      <li className="">
                        <a href="">Create Your Content</a>
                      </li>
                      {localStorage.getItem("user_id") !=
                      "56Ek4feL/1A8mZgIKQWEqg==" ? (
                        <li className="active active-main">
                          <a href="">Edit Consent Option</a>
                        </li>
                      ) : null}
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
                    {initFunData?.file_type == "ebook" ? (
                      <>
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
                              onChange={onChapterSelect}
                              defaultValue={chapterOption[0]}
                            />
                          </Form.Group>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    <div className="side-step-text second-step">
                      {initFunData?.file_type == "ebook" ? (
                        <div className="embedded-video-step">
                          <h2>Step2</h2>
                        </div>
                      ) : (
                        ""
                      )}
                      <p>
                        Select the video and highlight the area you want to
                        embed the video in{" "}
                      </p>
                      <Form.Group className="formgroup">
                        <Form.Label>
                          Videos <span>*</span>
                        </Form.Label>
                        <Select
                          className="dropdown-basic-button split-button-dropup "
                          options={videoListingData}
                          onChange={onVideoSelect}
                        />

                        <div className="upload-file-box">
                          <Button className="btn-bordered btn-voilet">
                            Upload new Video +
                          </Button>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  {file ? (
                    <>
                      <div id="parent_div" ref={parentRef}>
                        <div class="modal-body-content">
                          <Viewer
                            id="container"
                            renderPage={renderPage}
                            defaultScale={defaultScale}
                            onDocumentLoad={handleDocumentLoad}
                            renderMode="canvas"
                            fileUrl={file}
                          />
                          <div
                            className="highlight_box"
                            style={{
                              position: "absolute",
                              border: "2px dashed rgb(204, 204, 204)",
                              backgroundColor: "rgba(255, 0, 0, 0)",
                              display:
                                highlighted || dragging ? "block" : "none",
                              pointerEvents: "none",
                              left: `${Math.min(startX, endX)}px`,
                              top: `${Math.min(startY, endY)}px`,
                              width: `${Math.abs(startX - endX)}px`,
                              height: `${Math.abs(startY - endY)}px`,
                            }}
                          />
                          {highlighted && (
                            <div className="link_popup">
                              <form action="#" id="addLinkForm">
                                <button
                                  type="button"
                                  className="close"
                                  id="closeLinkPopup"
                                  onClick={() => closePopup()}
                                >
                                  <span aria-hidden="true">×</span>
                                </button>
                                <label for="targetURL">Add Link:</label>
                                <input
                                  placeholder="https://example.com"
                                  id="targetURL"
                                  className="form-control input-xs"
                                  type="text"
                                  onChange={(e) => setInputUrl(e.target.value)}
                                />
                                {error ? (
                                  <p className="err_class">
                                    Please enter a valid link
                                  </p>
                                ) : null}
                                <input
                                  type="submit"
                                  value="Add Link"
                                  id="addLinkToPdfButton"
                                  onClick={(e) => handleAddUrl(e, file)}
                                />
                              </form>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </Col>
              </div>
            </div>
          </div>
        </Row>
      </div>
    </Col>
  );
};

export default AddLinkToPdf;
