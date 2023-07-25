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
import CommonConfirmModel from "../../../Model/CommonConfirmModel";
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
import CommonModel from "../../../Model/CommonModel";
import ConfirmationModal from "../../../Model/ConfirmationModel";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const LicenseLinkToPdf = () => {
  const { state } = useLocation();
  const [articleId, setArticleId] = useState(
    typeof state?.pdfId !== "undefined" ? state?.pdfId : ""
  );
  const [isEdit, setIsEdit] = useState(
    typeof state?.isEdit !== "undefined" ? state?.isEdit : 0
  );
  const [allowStateVideo, setAllowStateVideo] = useState(
    typeof state?.allowVideo !== "undefined"
      ? state?.allowVideo
        ? true
        : false
      : false
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
  const [selectedError, setSelectedError] = useState({});

  const [initFunData, setInitFunData] = useState({});
  const [videoListingData, setVideoListingData] = useState([]);
  const [videoSelect, setVideoSelect] = useState("");
  const [ebookData, setEbookData] = useState();
  const [chapterOption, setChapterOption] = useState([]);
  const [ebookSelectedId, setEbookSelectedId] = useState(0);
  const [uploadNewVideo, setUploadNewVideo] = useState(false);
  const [videoTitle, setVideoTitle] = useState();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [forceRender, setForceRender] = useState(false);
  const [confirmationModel, setConfirmationModel] = useState(false);
  const [viewerscroll, setViewerscroll] = useState(0);
  const [selectedUrl, setSelectedUrl] = useState("");

  const [pageNo, setPageNo] = useState(0);

  const [newObj, setNewObj] = useState({});
  const navigate = useNavigate();

  const [commanShow, setCommanShow] = useState(false);
  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });
  const [newLink, setNewLink] = useState({});
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [hoveredLinkPosition, setHoveredLinkPosition] = useState({
    x: 0,
    y: 0,
  });
  // let url =
  //   "https://docintel.s3.eu-west-1.amazonaws.com/pdf/arunp/pdflink_1689849787.pdf";
  const defaultScale = 1.3347;
  const parentRef = useRef(null);
  const popupRef = useRef(null);
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

    const divElement = document.querySelector(".modal-body-content");
    const viewPageLayers = divElement?.querySelectorAll(".viewer-inner-page");

    if (viewPageLayers) {
      setTimeout(() => {
        let viewPageLayer = viewPageLayers[e.currentPage];
        const viewAnnotationLayers = viewPageLayer.querySelectorAll(
          ".viewer-annotation-link"
        );
        // ".viewer-annotation-layer"

        if (viewAnnotationLayers.length > 0) {
          viewAnnotationLayers.forEach((viewAnnotationLayer, index) => {
            const element = document.getElementById(
              `link-popup-inner-${e.currentPage}-${index}`
            );
            if (element) {
              return;
            }
            let baseStrig = "https://docintel.app/Clicklinks/video_player";
            let baseStrigwithoutsecure =
              "http://docintel.app/Clicklinks/video_player";

            const anchorTag = viewAnnotationLayer.querySelector("a");
            if (anchorTag) {
              let getVideoUrl = anchorTag?.href;
              if (
                getVideoUrl?.includes(baseStrig) ||
                getVideoUrl?.includes(baseStrigwithoutsecure)
              ) {
                const anchorRect = anchorTag.getBoundingClientRect();
                // console.log("-test",anchorRect)
                const parentDiv = document.querySelector("#parent_div");
                const parentRect = viewPageLayer.getBoundingClientRect();

                const topPosition = anchorRect.top - parentRect.top; // Adding 10 to the top position
                const leftPosition = anchorRect.left - parentRect.left + 20; // Adding 10 to the left position

                const popup = document.createElement("div");
                popup.className = "link-popup-inner";
                popup.id = `link-popup-inner-${e.currentPage}-${index}`;
                popup.style.position = "absolute";
                popup.style.top = `-${50}px`;
                // popup.style.left = `${leftPosition}px`;
                popup.innerHTML = `<div
                  class="link-popup visible"
                  
                >
                  <div id="link-popup" class="link-popup-inner">
                   
                    <div class="link-popup-buttons">
                      <button id=${"view-" + index + "-" + e.currentPage}>
                        View
                      </button>
  
                      <button id=${"change-" + index + "-" + e.currentPage}
                      >
                        Change
                      </button>
  
                      <button id=${"delete-" + index + "-" + e.currentPage}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>`;

                // viewAnnotationLayer.parentNode.insertBefore(popup, anchorTag);
                viewAnnotationLayer.appendChild(popup);
                document
                  .getElementById("view-" + index + "-" + e.currentPage)
                  .addEventListener("click", () => {
                    handleViewClick(anchorTag.href);
                  });
                document
                  .getElementById("change-" + index + "-" + e.currentPage)
                  .addEventListener("click", () => {
                    setPageNo(e.currentPage);
                    setCommanShow(true);
                  });
                // selectedUrl,
                document
                  .getElementById("delete-" + index + "-" + e.currentPage)
                  .addEventListener("click", () => {
                    setPageNo(e.currentPage);
                    setSelectedUrl(anchorTag.href);
                    showConfirmationPopup();
                  });
              }
            }
          });
        }
      }, 1000);
    }
  };

  useEffect(() => {
    console.log("state-->", state);
    initFun();
    videoFun();
  }, []);

  const initFun = async () => {
    try {
      loader("show");
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
      console.log("res-->", res?.data?.data);
      if (res?.data?.data?.file_type == "ebook") {
        if (res?.data?.data?.ebookData?.length) {
          const newData = res?.data?.data?.ebookData?.map((item, index) => {
            return {
              label: item?.title,
              value: item?.title,
              index: index,
            };
          });
          setChapterOption(newData);
          setFile(res?.data?.data?.ebookData[0]?.file_name);
          setEbookSelectedId(res?.data?.data?.ebookData[0]?.id);

          setEbookData(res?.data?.data?.ebookData);
        }
      } else if (res?.data?.data?.file_type == "pdf") {
        setFile(res?.data?.data?.file_name);
      }
    } catch (err) {
      loader("hide");
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };
  const onChapterSelect = (e) => {
    setEbookSelectedId(ebookData[e?.index]?.id);
    setFile(ebookData[e?.index]?.file_name);
  };

  const videoFun = async () => {
    try {
      loader("show");
      const res = await getData(ENDPOINT.LIBRARY_VIDEO_LISTING);
      let obj = {};
      if (res?.data?.data?.length) {
        let newVideo = res?.data?.data?.map((item, index) => {
          obj[`${item?.videoLink}`] = item?.title;
          return {
            label: item?.title,
            value: item?.title,
            key: item?.title,
            index: index,
            link: item?.videoLink,
          };
        });
        setNewObj(obj);
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
    setVideoSelect(e?.value);
    setInputUrl(e?.link);
  };

  const handleChange = (e) => {
    setInputUrl(e.target.value);
  };

  const onVideoModelClose = () => {
    setVideoTitle();
    setSelectedVideo(null);
    setError({});
    setUploadNewVideo(false);
  };
  const onVideoTitleChange = (e) => {
    const { value } = e.target;
    setVideoTitle(value);
  };
  const handleOnVideoChange = (event) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      setSelectedVideo(file);
      return;
    }
    setSelectedVideo(null);
  };
  const uploadClinkLinkModelVideo = async (e) => {
    e.preventDefault();
    let err = {};
    if (!videoTitle) {
      err.videoTitle = "Please enter title name";
      toast.error(err);
      setError(err);
      return;
    } else {
      try {
        loader("show");
        if (selectedVideo) {
          const formData = new FormData();
          formData.append("file", selectedVideo);
          formData.append("title", videoTitle);
          const res = await postData(ENDPOINT.LIBRARY_UPLOAD_VIDEO, formData);
        }
        uploadNewVideoClose();
      } catch (err) {
        console.log("--err", err);
      } finally {
        loader("hide");
      }
    }
  };
  const uploadNewVideoClose = () => {
    setVideoTitle();
    setSelectedVideo(null);
    setError({});
    setUploadNewVideo(false);
    videoFun();
    setForceRender(!forceRender);
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
  }, [dragging, startX, startY, endX, endY, file]);

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

      const xInPage = x - textLayer.offsetLeft;
      const yInPage = y - textLayer.offsetTop - scrollTop;

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

          if (newObj[`${linkText?.split("?")[0]}`] != videoSelect) {
            setVideoSelect(newObj[`${linkText?.split("?")[0]}`]);
          } else {
            if (!videoSelect) {
              setVideoSelect("");
            }
          }
        } else {
          setHoverUrl("");
          setVideoSelect("");
        }

        setHoveredLink(linkText);
        setHoveredLinkPosition({ x, y });
        // setIsPopupOpen(true);

        const scrollfrominner = document.querySelector(
          ".viewer-layout-main"
        ).scrollTop;
        setViewerscroll(scrollfrominner);
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

      if (
        (xInPage < startX && yInPage < startY) ||
        startY > yInPage ||
        startX > xInPage
      ) {
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
    let actual_width = xcoordinates - 5 - box_width;
    let x_cord = actual_width / 3.8;
    let actual_height = mousefirstdown + 21 - ycoordinates;
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
    try {
      if (!embed_url) {
        setSelectedError({
          fileError: true,
        });
        return;
      } else {
        setSelectedError({});
      }
      loader("show");
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      const findIndex = file.lastIndexOf("/");
      const res = await axios.post(`libraries/addLinkToPdf`, {
        link: embed_url,
        file: file,
        cordinates: cordinates,
        page_no: page_no,
        filename: initFunData?.file_type,
        folder_name: initFunData?.folder_name,
        pdf_file: file.slice(findIndex + 1, file.length),
        pdf_id: initFunData?.id,
        file_id: ebookSelectedId,
      });
      if (initFunData?.file_type == "ebook") {
        setEbookData(res?.data?.data?.ebookData);
        let newEbookData = [...ebookData];
        const hasFound = ebookData.findIndex(
          (item) => item.id == ebookSelectedId
        );
        if (hasFound > -1) {
          newEbookData[
            ebookData.findIndex((item) => item.id == ebookSelectedId)
          ].file_name = res?.data?.data;
          setEbookData(newEbookData);
        }
      }
      setFile(res?.data?.data);

      setDragging(false);
      setHighlighted(false);
      loader("hide");
    } catch (err) {
      loader("hide");
      // console.log("-err", err?);
      if (err?.response?.data?.message.includes("compression")) {
        showConfirmationModel();
      }
    }
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

  const handleViewClick = (data) => {
    if (data) {
      window.open(data, "_blank");
      setHighlighted(false);
    }
  };

  const showConfirmationPopup = () => {
    setPopupMessage({
      message1: "",
      // "You are about to remove this content from any reader and every device forever.",
      message2: "Are you sure you want to delete this link?",
      footerButton: "Yes please!",
    });
    if (confirmationpopup) {
      setConfirmationPopup(false);
    } else {
      setConfirmationPopup(true);
    }
  };

  const downloadQRData = [
    {
      label: "Video",
      type: "dropdown",
      dropdown: videoListingData,
    },
  ];

  const handleSubmitModelFun = async (e) => {
    try {
      loader("show");
      const findIndex = file.lastIndexOf("/");
      let body = {
        file: file,
        new_link: newLink?.link,
        prev_link: hoverUrl,
        filename: initFunData?.file_type,
        folder_name: initFunData?.folder_name,
        pdf_file: file.slice(findIndex + 1, file.length),
        pdf_id: initFunData?.id,
        file_id: ebookSelectedId,
        page_no: pageNo + 1,
      };

      const res = await axios.post(`libraries/changePdfLink`, body);
      setPageNo(0);

      if (initFunData?.file_type == "ebook") {
        let newEbookData = [...ebookData];
        const hasFound = ebookData.findIndex(
          (item) => item.id == ebookSelectedId
        );
        if (hasFound > -1) {
          newEbookData[
            ebookData.findIndex((item) => item.id == ebookSelectedId)
          ].file_name = res?.data?.data;
          setEbookData(newEbookData);
        }
      }
      setFile(res?.data?.data);
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("--err", err);
    }
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };

  const commonConfirmModelFun = async () => {
    try {
      loader("show");
      const findIndex = file.lastIndexOf("/");
      let body = {
        file: file,
        prev_link: selectedUrl,
        filename: initFunData?.file_type,
        folder_name: initFunData?.folder_name,
        pdf_file: file.slice(findIndex + 1, file.length),
        pdf_id: initFunData?.id,
        file_id: ebookSelectedId,
      };
      const res = await axios.post(`libraries/deletePdfLink`, body);
      setSelectedUrl("");
      if (initFunData?.file_type == "ebook") {
        let newEbookData = [...ebookData];
        const hasFound = ebookData.findIndex(
          (item) => item.id == ebookSelectedId
        );
        if (hasFound > -1) {
          newEbookData[
            ebookData.findIndex((item) => item.id == ebookSelectedId)
          ].file_name = res?.data?.data;
          setEbookData(newEbookData);
        }
      }
      setFile(res?.data?.data);
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("--err", err);
    }
    setConfirmationPopup(false);
  };

  const handleFun = (e) => {
    const videoData =
      videoListingData[videoListingData.findIndex((value) => value.key == e)];
    setNewLink({
      link: videoData?.link,
      name: videoData?.key,
    });
  };
  const showConfirmationModel = () => {
    setPopupMessage({
      message1: "Pdf file is not supported",
      // message2: "Are you sure you want to do this?",
      footerButton: "Close",
    });
    if (confirmationModel) {
      setConfirmationModel(false);
    } else {
      setConfirmationModel(true);
    }
  };

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav sticky">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    <Link
                      className="btn btn-bordered btn btn-primary"
                      to="/license-create"
                    >
                      Back
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    {
                      <>
                        <li className="">
                          <a href="">Create Your Content</a>
                        </li>
                        {localStorage.getItem("user_id") ==
                        "rjiGlqA9DXJVH7bDDTX0Lg==" ? (
                          <li className="active active-main">
                            <a href="">[Embedding Video]</a>
                          </li>
                        ) : null}

                        <li
                          className={
                            localStorage.getItem("user_id") !=
                            "rjiGlqA9DXJVH7bDDTX0Lg=="
                              ? "active active-main"
                              : ""
                          }
                        >
                          <a href="">Edit Consent Option</a>
                        </li>

                        <li className="">
                          <a href="">Preview Your Content &amp; Publish</a>
                        </li>
                      </>
                    }
                  </ul>
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <Button
                      className="btn btn-primary btn-filled next "
                      onClick={() =>
                        navigate("/license-set-popup", {
                          state: {
                            pdfId: initFunData?.id,
                            fileType: initFunData?.file_type,
                            isEdit: isEdit,
                            allowVideo: allowStateVideo,
                          },
                        })
                      }
                    >
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
                                defaultValue={chapterOption?.[0]}
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
                            <Button
                              className="btn-bordered btn-voilet"
                              onClick={() => setUploadNewVideo(true)}
                            >
                              Upload new Video +
                            </Button>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    {file ? (
                      <>
                        <div
                          id="parent_div"
                          className="add_link_to_pdf"
                          ref={parentRef}
                        >
                          <div
                            className={
                              highlighted
                                ? "modal-body-content no_scroll"
                                : "modal-body-content"
                            }
                          >
                            {/* {isPopupOpen ? (
                              <>
                                <div
                                  ref={popupRef}
                                  className={`link-popup ${
                                    isPopupOpen ? "visible" : ""
                                  }`}
                                  style={{
                                    top:
                                      hoveredLinkPosition.y - viewerscroll - 20,
                                    left: hoveredLinkPosition.x,
                                  }}
                                >
                                  <div
                                    id="link-popup"
                                    className="link-popup-inner"
                                  >
                                    <div className="video-title">
                                      {videoSelect ? videoSelect : "No title"}{" "}
                                    </div>

                                    <div className="link-popup-buttons">
                                      <button onClick={handleViewClick}>
                                        View
                                      </button>

                                      <button
                                        onClick={() => setCommanShow(true)}
                                      >
                                        Change
                                      </button>

                                      <button
                                        onClick={() => showConfirmationPopup()}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              ""
                            )} */}
                            <Viewer
                              id="container"
                              renderPage={renderPage}
                              defaultScale={defaultScale}
                              // onDocumentLoad={handleDocumentLoad}
                              onPageChange={handleDocumentLoad}
                              renderMode="canvas"
                              fileUrl={file}
                              // fileUrl={"https://docintel.s3-eu-west-1.amazonaws.com/pdf/arunp/pdflink_1690198693.pdf"}
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
                                    onClick={() => {
                                      closePopup();
                                    }}
                                  >
                                    <span aria-hidden="true">×</span>
                                  </button>
                                  <label htmlFor="targetURL">Add Link:</label>

                                  <input
                                    placeholder="https://example.com"
                                    id="targetURL"
                                    className="form-control input-xs"
                                    type="text"
                                    value={inputUrl}
                                    readOnly
                                    onChange={handleChange}
                                    // onChange={(e) =>
                                    //   setInputUrl(e.target.value)
                                    // }
                                  />
                                  {selectedError?.fileError ? (
                                    <p className="err_class">
                                      Please select a video link
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
      <CommonModel
        show={commanShow}
        onClose={setCommanShow}
        heading={"Change Embedded Video"}
        data={downloadQRData}
        footerButton={"Apply"}
        handleSubmit={handleSubmitModelFun}
        handleQR={handleFun}
      />
      <ConfirmationModal
        show={confirmationModel}
        path_image={path_image}
        popupMessage={popupMessage}
        onClose={setConfirmationModel}
      />
      <CommonConfirmModel
        show={confirmationpopup}
        onClose={hideConfirmationModal}
        fun={commonConfirmModelFun}
        popupMessage={popupMessage}
        path_image={path_image}
      />

      <Modal
        show={uploadNewVideo}
        className="send-confirm upload-file"
        id="download-qr"
        onHide={onVideoModelClose}
      >
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            Upload File
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              onVideoModelClose();
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <div className="ebook-format">
              <label htmlFor="">
                Video title <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => onVideoTitleChange(e)}
                value={videoTitle}
              />
              {error?.videoTitle ? (
                <div className="login-validation-upload-error">
                  {error?.videoTitle}
                </div>
              ) : null}
              <div className="upload-file-box">
                <div className="box">
                  <input
                    type="file"
                    name="videoFile"
                    id="videoInput"
                    className="inputfile inputfile-6"
                    accept="video/*"
                    onChange={handleOnVideoChange}
                  />
                  <label htmlFor="videoInput">
                    <span>Choose Your File</span>
                  </label>

                  <p>
                    {selectedVideo === null ? (
                      "Upload your new list file"
                    ) : (
                      <p className="uploaded-file">{selectedVideo?.name}</p>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <div className="modal-footer">
          <button
            type="button"
            disabled={selectedVideo === null ? true : false}
            className="btn btn-primary save btn-filled"
            onClick={(e) => {
              uploadClinkLinkModelVideo(e);
            }}
          >
            Upload
          </button>
        </div>
      </Modal>
    </>
  );
};

export default LicenseLinkToPdf;
