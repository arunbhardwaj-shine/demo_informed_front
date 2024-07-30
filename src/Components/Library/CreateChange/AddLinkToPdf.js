import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Modal, Form, Row } from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import CommonConfirmModel from "../../../Model/CommonConfirmModel";
import { ENDPOINT } from "../../../axios/apiConfig";
import { postData, getData } from "../../../axios/apiHelper";
import { toast } from "react-toastify";
import Viewer from "@phuocng/react-pdf-viewer";
import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";
import Select from "react-select";
import axios from "axios";
import { DocumentLoadEvent, RenderPageProps, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { loader } from "../../../loader";
import CommonModel from "../../../Model/CommonModel";
import ConfirmationModal from "../../../Model/ConfirmationModel";
import { popup_alert } from "../../../popup_alert";

const AddLinkToPdf = () => {
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
  const [articleType, setArticleType] = useState('');
  const [fileVersion, setFileVersion] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
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
  const [defaultScale, setDefaultScale] = useState(1.3347);
  const [count, setCount] = useState(0);
  const [multiplyfactor, setMultiplyfactor] = useState(0.26);
  const [initialscale, setInitialscale] = useState(0);
  const [dynamicScale, setDynamicScale] = useState(0);
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
  const [screenSize, setScreenSize] = useState(window.innerWidth)
  const location = useLocation();
  // console.log(location,'draftttt')

  let multiply_factor = 0;

  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  //const defaultScale = 1.3347;
  const [mouseLastup, setMouseLastup] = useState(0);


  const fitToWidth = () => {
    // Calculate the scale factor based on the width of the viewport and the PDF page
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    const sublink_wid = document.querySelector('.sublink_right').clientWidth;
    const pageWidth = document.querySelector('.viewer-page-layer').clientWidth;
    const pageHeight = document.querySelector('.viewer-page-layer').clientHeight;

    const scale = viewportWidth / pageWidth;
    console.log("page width-->", pageWidth);

    if (initialscale === 0) {
      setInitialscale(pageWidth);
      multiply_factor = 1 / scale;
      setMultiplyfactor(multiply_factor);
    }
    console.log(scale);
    console.log("initial scale-->", initialscale);
    console.log("window width-->", screenSize);



    // if(scale < 1.3347){
    if (scale < 1.30) {
      setDefaultScale(scale)
      console.log(file);
      setFile(file)
      var file_tem = file;
      setFile((prevst) => file_tem + '?v=1')

      setTimeout(() => { setFile((prevst) => file_tem) }, 10)
      //setFile((prevst)=>file_tem)
    }
    // https://docintel.s3-eu-west-1.amazonaws.com/pdf/arunp/pdflink_1711002590.pdf
    // Update the state to reflect the new scale
    // You might also need to adjust the page number if you want to maintain the current page
    // For simplicity, this example resets to the first page

    // Apply the scale using CSS
    //  document.querySelector('.react-pdf__Page').style.transform = `scale(${scale})`;
  }



  const parentRef = useRef(null);
  const popupRef = useRef(null);
  const renderPage = (props: RenderPageProps) => {
    // console.log(props.scale,"pure scale");
    setDynamicScale(props.scale);
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

  const handleCompleteDocumentLoad = (e: DocumentLoadEvent) => {
    setTimeout(function () {
      const divElement = document.querySelector(".viewer-layout-container");
      if (divElement) {
        const height = divElement.clientHeight;

        setDocumentHeight(height);
      } else {
        console.error('Element with class "modal-body-content" not found.');
      }
    }, 2000);
  };

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    try {
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

                  const parentDiv = document.querySelector("#parent_div");
                  const parentRect = viewPageLayer.getBoundingClientRect();

                  const topPosition = anchorRect.top - parentRect.top; // Adding 10 to the top position
                  const leftPosition = anchorRect.left - parentRect.left + 20; // Adding 10 to the left position

                  const popup = document.createElement("div");
                  popup.className = "link-popup-inner";
                  popup.id = `link-popup-inner-${e.currentPage}-${index}`;
                  popup.style.position = "absolute";
                  popup.style.top = `-${45}px`;
                  popup.style.left = `-${50}px`;
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
                      closePopup();
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

          fitToWidth()
        }, 1000);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    initFun();
    videoFun();
    // console.log("changed");
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
      setArticleType(res?.data?.data?.file_type);
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
          setFileVersion(res?.data?.data?.ebookData[0]?.ie_allversion);
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
    closePopup();
    setEbookSelectedId(ebookData[e?.index]?.id);
    setFile(ebookData[e?.index]?.file_name);
    setFileVersion(ebookData[e?.index]?.ie_allversion);
    setDefaultScale(1.3347);
    setInitialscale(0);
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

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleGlobalMouseUp = (event) => {
      // console.log("Global");
      // Check if the mouseup event target is not inside the parentRef
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        handleMouseUp(event);
      }
    };

    parentRef?.current?.addEventListener("mousedown", handleMouseDown);
    parentRef?.current?.addEventListener("mousemove", handleMouseMove);
    parentRef?.current?.addEventListener("mouseup", handleMouseUp);
    if (parentRef.current) {
      parentRef?.current?.setAttribute("draggable", "false"); // Disable dragging
      parentRef?.current?.addEventListener("dragstart", handleDragStart); // Attach the event listener
    }

    // Add global mouseup event listener
    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      parentRef?.current?.removeEventListener("mousedown", handleMouseDown);
      parentRef?.current?.removeEventListener("mousemove", handleMouseMove);
      parentRef?.current?.removeEventListener("mouseup", handleMouseUp);
      if (parentRef?.current) {
        parentRef?.current.removeEventListener("dragstart", handleDragStart);
      }

      // Remove global mouseup event listener
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [dragging, startX, startY, endX, endY, file]);

  const handleMouseDown = (event) => {
    if (event.target.className === "viewer-text-layer") {

      if (fileVersion == 1) {
        popup_alert({
          visible: "show",
          message: "This is Video embedded Pdf file, Add link facility is not available",
          type: "error",
        });
        return;
      }
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

      setMouseLastup(event.clientX);
      window.getSelection().removeAllRanges();
      setDragging(false);
      if (showAddLink) {
        setHighlighted(true);
      }
    } else {
      if (dragging) {
        if (event.target.name === "url") return;
        if (event.target.name === "addurl") return;
        window.getSelection().removeAllRanges();
        setDragging(false);
        if (showAddLink) {
          setHighlighted(true);
        }
        console.log("Outside function");
      }
    }
  };

  const getMousePosition = (canvas, event, scrollTop) => {
    // console.log(event.clientX,"event.clientX");
    const closestElement = event.target.closest(".pdf_page_class");
    if (closestElement) {
      const closestElementId = closestElement.id;
      const pageNumber = parseInt(closestElementId.slice(5));
      setLinkonpage(pageNumber);
      const viewerTextLayer = document.querySelector(
        `#${closestElementId} .viewer-text-layer`
      );

      const viewerTextLayer2 = document.querySelector(
        `.create-change-content`
      );
      const rect2 = viewerTextLayer2.getBoundingClientRect();
      const rect = viewerTextLayer.getBoundingClientRect();
      // console.log("client x--->",event.clientX,"rect left-->",rect.left,"rect top-->",rect.top)
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top - scrollTop;
      // const y = event.clientY - rect.top 
      // console.log("y -->",y );
      // console.log("rect.left-->",rect.left);
      // console.log("rect.top-->",rect.top);
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
    let actual_width = xcoordinates - 20 - box_width;
    let x_cord = actual_width > 0 ? actual_width : xcoordinates - box_width;

    let actual_height = mousefirstdown - 15 - ycoordinates;
    let y_cord = actual_height;
    let page_no = linkonpage + 1;
    let box_width_x = box_width;
    let box_width_y = box_height;

    console.log("x_cord--->", x_cord)
    console.log("y_cord--->", y_cord)

    // if(initialscale>600 && initialscale<800){
    //   console.log("i am inside 800")
    //   box_width_y =box_width_y/3.38;
    //    box_width_x = box_width_x/3.48;
    //    y_cord = y_cord/3.38;
    //    x_cord = x_cord/3.48;
    // }
    // Gagan 
    if (initialscale > 400 && initialscale < 600) {

      box_width_y = box_width_y / 3.50;
      box_width_x = box_width_x / 3.65;
      y_cord = y_cord <= 0 ? 1 : y_cord < 100 ? 3.35 : (y_cord >= 100 && y_cord < 200) ? y_cord / 3.40 : (y_cord >= 200 && y_cord < 350) ? y_cord / 3.55 : (y_cord >= 350 && y_cord < 500) ? y_cord / 3.65 : (y_cord >= 500 && y_cord < 800) ? y_cord / 3.7
        : y_cord >= 800 ? y_cord / 3.75 : y_cord / 3.8;
      x_cord = x_cord < 100 ? x_cord / 2.3 : (x_cord >= 100 && x_cord < 200) ? x_cord / 3.3 : (x_cord >= 200 && x_cord < 300) ? x_cord / 3.5 : x_cord / 3.65;
    }
    //Gagan
    else if (initialscale >= 600 && initialscale < 800) {

      box_width_y = box_width_y / 3.30;
      box_width_x = box_width_x / 3.5;
      y_cord = y_cord <= 0 ? 1 : y_cord < 100 ? 3.35 : (y_cord >= 100 && y_cord < 200) ? y_cord / 3.40 : (y_cord >= 200 && y_cord < 350) ? y_cord / 3.55 : (y_cord >= 350 && y_cord < 500) ? y_cord / 3.65 : (y_cord >= 500 && y_cord < 800) ? y_cord / 3.7
        : y_cord >= 800 ? y_cord / 3.75 : y_cord / 3.77;
      x_cord = x_cord < 100 ? x_cord / 3.2 : (x_cord >= 100 && x_cord < 500) ? x_cord / 3.6 : x_cord / 3.7;
    }
    else if (initialscale >= 800 && initialscale < 1000) {

      box_width_y = box_width_y / 3.58;
      box_width_x = box_width_x / 3.68;
      //  y_cord =y_cord<=0?1: y_cord/3.58;
      //  x_cord = x_cord/3.68;

      y_cord = y_cord <= 0 ? 1 : (y_cord < 100 && y_cord >= 1) ? y_cord / 3.35 : (y_cord >= 100 && y_cord < 200) ? y_cord / 3.40 : (y_cord >= 200 && y_cord < 350) ? y_cord / 3.55
        : (y_cord >= 350 && y_cord < 500) ? y_cord / 3.65 : (y_cord >= 500 && y_cord < 800) ? y_cord / 3.7 : y_cord >= 800 ? y_cord / 3.73 : y_cord / 3.75;

      x_cord = x_cord < 100 ? x_cord / 3.2 : (x_cord >= 100 && x_cord < 500) ? x_cord / 3.6 : x_cord / 3.7;
    }
    // else if(initialscale>1000 && initialscale<1200){     
    //    box_width_y =box_width_y/3.58;
    //    box_width_x = box_width_x/3.68;    
    //    y_cord = y_cord/3.58;
    //    x_cord = x_cord/3.68;
    // }
    // else if(initialscale>1200 && initialscale<3000){
    //   console.log("am inside med");
    //   box_width_y =box_width_y/2;
    //   box_width_x = box_width_x/2;
    //   y_cord = y_cord/2;
    //   x_cord = x_cord/2;
    // }

    //Arun sir code
    else if (initialscale >= 1000 && initialscale < 1100) {
      console.log("inside 1170")

      box_width_y = box_width_y / 1.8;
      box_width_x = box_width_x / 1.8;
      y_cord = y_cord <= 0 ? 1 : y_cord / 3.58;
      x_cord = x_cord / 3.68;

      // y_cord = y_cord<=0?1:(y_cord<100&&y_cord>=1)?y_cord/2:(y_cord>=100&&y_cord<200)?y_cord/1.4:(y_cord>=200&&y_cord<350)?y_cord/3.55
      //       :(y_cord>=350&&y_cord<500)?y_cord/3.65:(y_cord>=500&&y_cord<800)?y_cord/3.7 :y_cord>=800?y_cord/3.73:y_cord/3.75;

      // x_cord = x_cord<100?x_cord/2:(x_cord>=100&&x_cord<200)?x_cord/1.5:(x_cord>=200&&x_cord<400)?x_cord/1.35:x_cord/1.6;
    } else if (initialscale >= 1100 && initialscale < 1200) {
      // console.log("i am inside 1100")
      //Aamir
      if(screenSize>=1600){

        if (document.documentElement.scrollTop >= 700) {
          box_width_y = box_width_y / 3.75;
          box_width_x = box_width_x / 3.68;
          y_cord = y_cord <= 0 ? 1 : y_cord / 3.75;
          x_cord = x_cord / 3.68;
        } else {
          box_width_y = box_width_y / 3.58;
          box_width_x = box_width_x / 3.68;
          y_cord = y_cord <= 0 ? 1 : y_cord / 3.58;
          x_cord = x_cord / 3.68;
        }
      }else{
        
          box_width_y = box_width_y / 3;
          box_width_x = box_width_x / 3.5;
          y_cord = y_cord <= 0 ? 1 : y_cord < 200 ? y_cord / 3.4 : (y_cord >= 200 && y_cord < 300) ? y_cord / 3.5 : (y_cord >= 300 && y_cord < 600) ? y_cord / 3.55
          : (y_cord >= 600 && y_cord < 800) ? y_cord / 3.7 : (y_cord >= 800 && y_cord < 900) ? y_cord / 3.75 : y_cord / 3.8;
        
          x_cord = x_cord < 100 ? x_cord / 2.6 : (x_cord >= 100 && x_cord < 300) ? x_cord / 3.25 : (x_cord >= 300 && x_cord < 550) ? x_cord / 3.5
          : (x_cord >= 550 && x_cord < 900) ? x_cord /3.5 : (x_cord >= 900 && x_cord < 1200) ? x_cord / 3.55 : x_cord / 3.6;


      }
    } else if (initialscale >= 1200 && initialscale < 1300) {
      //1281 specical susheel sir case
      // console.log("1281");
      if(screenSize>=1600){

        box_width_y = box_width_y / 3.52;
        box_width_x = box_width_x / 3.62;
        y_cord = y_cord <= 0 ? 1 : y_cord / 3.55;
        x_cord = x_cord / 3.78;
      }else{
        console.log("in else  1200-1300")
        box_width_y = box_width_y / 2.5;
        box_width_x = box_width_x / 2.8;
        y_cord = y_cord <= 0 ? 1 : y_cord < 200 ? y_cord / 3 :(y_cord >= 200 && y_cord < 300) ? y_cord / 3 : (y_cord >= 300 && y_cord < 500) ? y_cord / 3.1 : (y_cord >= 500 && y_cord < 600) ? y_cord / 3.15
        : (y_cord >= 600 && y_cord < 800) ? y_cord / 3.2 : (y_cord >= 800 && y_cord < 900) ? y_cord / 3.25 : y_cord / 3.3;
      
        x_cord = x_cord < 50 ? x_cord / 1.5 : x_cord>=50 && x_cord < 100 ? x_cord / 2.4 : (x_cord >= 100 && x_cord < 550) ? x_cord / 3 
        : (x_cord >= 550 && x_cord < 1100) ? x_cord /3.15 : (x_cord >= 1100 && x_cord < 1200) ? x_cord / 3.2 : x_cord / 3.25;
      }
    }
    else if (initialscale >= 1300 && initialscale < 1600) {
      //1907 specical susheel sir case

      if(screenSize>=1600){

        box_width_y = box_width_y / 3.6;
        box_width_x = box_width_x / 3.55;
        y_cord = y_cord <= 0 ? 1 : y_cord < 200 ? y_cord / 3.25 : (y_cord >= 200 && y_cord < 300) ? y_cord / 3.3 : (y_cord >= 300 && y_cord < 500) ? y_cord / 3.42
          : (y_cord >= 500 && y_cord < 600) ? y_cord / 3.45 : (y_cord >= 600 && y_cord < 700) ? y_cord / 3.48 : y_cord / 3.5;
        x_cord = x_cord < 100 ? x_cord / 3 : (x_cord >= 100 && x_cord < 300) ? x_cord / 3.25 : (x_cord >= 300 && x_cord < 550) ? x_cord / 3.4
          : (x_cord >= 550 && x_cord < 700) ? x_cord / 3.47 : (x_cord >= 700 && x_cord < 1200) ? x_cord / 3.5 : x_cord / 3.55;
      }else{
        console.log("inside 1600 scale");
        box_width_y = box_width_y / 2.8;
        box_width_x = box_width_x / 3;
        y_cord = y_cord <= 0 ? 1 : y_cord < 200 ? y_cord / 2.35 : (y_cord >= 200 && y_cord < 300) ? y_cord / 2.5 : (y_cord >= 300 && y_cord < 600) ? y_cord / 2.55
        : (y_cord >= 600 && y_cord < 800) ? y_cord / 2.7 : (y_cord >= 800 && y_cord < 900) ? y_cord / 2.75 : y_cord / 2.8;
      
        x_cord = x_cord < 100 ? x_cord / 2 : (x_cord >= 100 && x_cord < 300) ? x_cord / 2.45 : (x_cord >= 300 && x_cord < 550) ? x_cord / 2.55
        : (x_cord >= 550 && x_cord < 900) ? x_cord /2.6 : (x_cord >= 900 && x_cord < 1200) ? x_cord / 2.63 : x_cord / 2.66;
      }


    }
    else if (initialscale >= 1600 && initialscale < 2200) {
      //1907 specical susheel sir case
      if(screenSize>=1600){

        box_width_y = box_width_y / 3;
        box_width_x = box_width_x / 2.8;
        y_cord = y_cord <= 0 ? 1 : y_cord < 200 ? y_cord / 2.5 : (y_cord >= 200 && y_cord < 300) ? y_cord / 2.6 : (y_cord >= 300 && y_cord < 600) ? y_cord / 2.75
          : (y_cord >= 600 && y_cord < 800) ? y_cord / 2.8 : (y_cord >= 800 && y_cord < 900) ? y_cord / 2.85 : y_cord / 2.9;
        x_cord = x_cord < 100 ? x_cord / 2.2 : (x_cord >= 100 && x_cord < 300) ? x_cord / 2.6 : (x_cord >= 300 && x_cord < 550) ? x_cord / 2.7
          : (x_cord >= 550 && x_cord < 900) ? x_cord / 2.75 : (x_cord >= 900 && x_cord < 1200) ? x_cord / 2.8 : x_cord / 2.85;
      }else{
        box_width_y = box_width_y / 2;
        box_width_x = box_width_x / 2.1;
        y_cord = y_cord <= 0 ? 1 : y_cord < 200 ? y_cord / 2 : (y_cord >= 200 && y_cord < 300) ? y_cord / 2.05 : (y_cord >= 300 && y_cord < 600) ? y_cord / 2.1
        : (y_cord >= 600 && y_cord < 800) ? y_cord / 2.15 : (y_cord >= 800 && y_cord < 900) ? y_cord / 2.2 : y_cord / 2.25;
      
        x_cord = x_cord < 100 ? x_cord / 1.8 : (x_cord >= 100 && x_cord < 300) ? x_cord / 1.95 : (x_cord >= 300 && x_cord < 550) ? x_cord / 2
        : (x_cord >= 550 && x_cord < 900) ? x_cord /2.1 : (x_cord >= 900 && x_cord < 1200) ? x_cord / 2.15 : x_cord / 2.17;
      }
    }
    // else if(initialscale>2000 && initialscale<3000){
    //   console.log("am inside med",initialscale);
    //   box_width_y =box_width_y/2;
    //   box_width_x = box_width_x/2;
    //   y_cord = y_cord/2;
    //   x_cord = x_cord/2;
    // }

    //Gagan C-600--->2270
    else if (initialscale >= 2200 && initialscale < 2400) {
      if(screenSize>=1600){

        box_width_y = box_width_y / 2.35
        box_width_x = box_width_x / 2.35
        y_cord = y_cord <= 0 ? 1 : y_cord < 200 ? y_cord / 2.2 : (y_cord >= 200 && y_cord < 400) ? y_cord / 2.25 : (y_cord >= 400 && y_cord < 700) ? y_cord / 2.3
          : (y_cord >= 700 && y_cord < 800) ? y_cord / 2.32 : y_cord / 2.35;
        x_cord = x_cord < 100 ? x_cord / 2 : (x_cord >= 100 && x_cord < 400) ? x_cord / 2.20 : (x_cord >= 400 && x_cord < 650) ? x_cord / 2.25
          : (x_cord >= 650 && x_cord < 1000) ? x_cord / 2.28 : x_cord / 2.32;
      }else{
        console.log("inside else 2400");
        box_width_y = box_width_y / 1.85;
        box_width_x = box_width_x / 1.8;
        y_cord = y_cord <= 0 ? 1 : y_cord < 100 ? y_cord / 1.55 : (y_cord >= 100 && y_cord < 200) ? y_cord / 1.62 
        :(y_cord >= 200 && y_cord < 300) ? y_cord / 1.7 : (y_cord >= 300 && y_cord < 600) ? y_cord / 1.72
        : (y_cord >= 600 && y_cord < 800) ? y_cord / 1.75 : (y_cord >= 800 && y_cord < 900) ? y_cord / 1.8 : y_cord / 1.9;
      
        x_cord = x_cord < 100 ? x_cord / 1.35 : (x_cord >= 100 && x_cord < 300) ? x_cord / 1.6 : (x_cord >= 300 && x_cord < 550) ? x_cord / 1.72
        : (x_cord >= 550 && x_cord < 900) ? x_cord /1.75 : (x_cord >= 900 && x_cord < 1200) ? x_cord / 1.77 : x_cord / 1.8;
      }
    }
    //Gagan c-700--->2648
    else if (initialscale >= 2400 && initialscale < 2700) {
      if (screenSize >= 1600) {
        box_width_y = box_width_y / 2.1
        box_width_x = box_width_x / 2
        y_cord = y_cord <= 0 ? 1 : y_cord < 200 ? y_cord / 1.82 : (y_cord >= 200 && y_cord < 300) ? y_cord / 1.95 : (y_cord >= 300 && y_cord < 500) ? y_cord / 2
          : (y_cord >= 500 && y_cord < 800) ? y_cord / 2.05 : y_cord / 2.1;
        
          x_cord = x_cord < 100 ? x_cord / 1.7 : (x_cord >= 100 && x_cord < 200) ? x_cord / 1.8 : (x_cord >= 200 && x_cord < 350) ? x_cord / 1.95
          : (x_cord >= 350 && x_cord < 500) ? x_cord / 2.05 : (x_cord >= 500 && x_cord < 750) ? x_cord / 2.05 : x_cord / 2.08;
      } else {
        box_width_y = box_width_y / 1.6
        box_width_x = box_width_x / 1.5

          y_cord = y_cord<=0?1:(y_cord<100&&y_cord>=1)?y_cord/1.3:(y_cord>=100&&y_cord<200)?y_cord/1.35:(y_cord>=200&&y_cord<300)?y_cord/1.45
                  :(y_cord>=300&&y_cord<450)?y_cord/1.5:(y_cord>=450&&y_cord<800)?y_cord/1.6 :y_cord/1.6;

          x_cord = x_cord<100?x_cord/1.15:(x_cord>=100&&x_cord<200)?x_cord/1.4:(x_cord>=200&&x_cord<300)?x_cord/1.45
                    :(x_cord>=300&&x_cord<500)?x_cord/1.53:(x_cord>=500&&x_cord<800)?x_cord/1.55:x_cord/1.55;
      }
    }
    //Gagan c-800--->3027
    else if (initialscale >= 2700 && initialscale < 3100) {
      if(screenSize>=1600){

        box_width_y = box_width_y / 1.8
        box_width_x = box_width_x / 1.8
  
        y_cord = y_cord <= 0 ? 1 : y_cord < 100 ? y_cord / 1.5 : (y_cord >= 100 && y_cord < 200) ? y_cord / 1.6 : (y_cord >= 200 && y_cord < 300) ? y_cord / 1.65
          : (y_cord >= 300 && y_cord < 400) ? y_cord / 1.7 : (y_cord >= 400 && y_cord < 550) ? y_cord / 1.75 : y_cord / 1.75;
  
        x_cord = x_cord < 100 ? x_cord / 1.5 : (x_cord >= 100 && x_cord < 200) ? x_cord / 1.6 : (x_cord >= 200 && x_cord < 600) ? x_cord / 1.72
          : (x_cord >= 600 && x_cord < 800) ? x_cord / 1.75 : (x_cord >= 800 && x_cord < 900) ? x_cord / 1.8 : x_cord / 1.85;
      }else{
        console.log("inside 3100 else ");
        box_width_y = box_width_y / 1.4
        box_width_x = box_width_x / 1.3

          y_cord = y_cord<=0?1:(y_cord<100&&y_cord>=1)?y_cord/1.15:(y_cord>=100&&y_cord<200)?y_cord/1.22:(y_cord>=200&&y_cord<300)?y_cord/1.25
                  :(y_cord>=300&&y_cord<500)?y_cord/1.3:(y_cord>=500&&y_cord<800)?y_cord/1.32 :y_cord/1.35;

          x_cord = x_cord<100?x_cord/1.05:(x_cord>=100&&x_cord<200)?x_cord/1.2:(x_cord>=200&&x_cord<300)?x_cord/1.25
                    :(x_cord>=300&&x_cord<600)?x_cord/1.3:(x_cord>=600&&x_cord<1000)?x_cord/1.32:x_cord/1.35;
      }
    }
    else if (initialscale >= 3100 && initialscale < 3300) {
      // 3405 900

      if(screenSize>=1600){

        box_width_y = box_width_y / 1.6;
        box_width_x = box_width_x / 1.65;
  
        y_cord = y_cord <= 0 ? 1 : y_cord < 100 ? y_cord / 1.5 : (y_cord >= 100 && y_cord < 200) ? y_cord / 1.55 
        : (y_cord >= 200 && y_cord < 300) ? y_cord / 1.6: (y_cord >= 300 && y_cord < 400) ? y_cord / 1.62 
        : (y_cord >= 400 && y_cord < 550) ? y_cord / 1.64 : (y_cord >= 550 && y_cord < 800) ? y_cord / 1.68 : y_cord / 1.7;
  
        x_cord = x_cord < 100 ? x_cord / 1.40 : (x_cord >= 100 && x_cord < 200) ? x_cord / 1.55 : (x_cord >= 200 && x_cord < 400) ? x_cord / 1.64
          : (x_cord >= 400 && x_cord < 600) ? x_cord / 1.66 : (x_cord >= 600 && x_cord < 1200) ? x_cord / 1.70 
          : (x_cord > 1200 && x_cord < 1300) ? x_cord / 1.72 : x_cord / 1.74;
      } else{
        console.log("inside 3200 else ");
        box_width_y = box_width_y / 1.2
        box_width_x = box_width_x / 1.2

          y_cord = y_cord<=0?1:(y_cord<50&&y_cord>=1)?y_cord/0.9:(y_cord<100&&y_cord>=50)?y_cord/1.1:(y_cord>=100&&y_cord<200)?y_cord/1.2
          :(y_cord>=200&&y_cord<300)?y_cord/1.22:(y_cord>=300&&y_cord<500)?y_cord/1.25:(y_cord>=500&&y_cord<800)?y_cord/1.3 :y_cord/1.35;

          x_cord = x_cord<100?x_cord/0.9:(x_cord>=100&&x_cord<300)?x_cord/1.2:(x_cord>=300&&x_cord<400)?x_cord/1.22
                    :(x_cord>=400&&x_cord<700)?x_cord/1.25:(x_cord>=700&&x_cord<900)?x_cord/1.3:x_cord/1.32;
      }
      }

    else if (initialscale >= 3300 && initialscale < 3500) {
      // 3405 900

      if(screenSize>=1600){

        box_width_y = box_width_y / 1.6;
        box_width_x = box_width_x / 1.65;
  
        y_cord = y_cord <= 0 ? 1 : y_cord < 100 ? y_cord / 1.4 : (y_cord >= 100 && y_cord < 200) ? y_cord / 1.45 
        : (y_cord >= 200 && y_cord < 300) ? y_cord / 1.50: (y_cord >= 300 && y_cord < 500) ? y_cord / 1.53 
        : (y_cord >= 500 && y_cord < 550) ? y_cord / 1.55 : (y_cord >= 550 && y_cord < 800) ? y_cord / 1.58 : y_cord / 1.62;
  
        x_cord = x_cord < 100 ? x_cord / 1.35 : (x_cord >= 100 && x_cord < 200) ? x_cord / 1.45 : (x_cord >= 200 && x_cord < 400) ? x_cord / 1.50
          : (x_cord >= 400 && x_cord < 700) ? x_cord / 1.53 : (x_cord >= 700 && x_cord < 900) ? x_cord / 1.56 
          : (x_cord > 900 && x_cord < 1300) ? x_cord / 1.55 : x_cord / 1.60;
      } else{
        console.log("inside 3500 else ");
        box_width_y = box_width_y / 1.2
        box_width_x = box_width_x / 1.2

          y_cord = y_cord<=0?1:(y_cord<100&&y_cord>=1)?y_cord/0.85:(y_cord>=100&&y_cord<200)?y_cord/1.08:(y_cord>=200&&y_cord<300)?y_cord/1.12
                  :(y_cord>=300&&y_cord<500)?y_cord/1.15:(y_cord>=500&&y_cord<800)?y_cord/1.2 :y_cord/1.25;

          x_cord = x_cord<100?x_cord/0.9:(x_cord>=100&&x_cord<300)?x_cord/1.05:(x_cord>=300&&x_cord<400)?x_cord/1.1
                    :(x_cord>=400&&x_cord<600)?x_cord/1.12:(x_cord>=600&&x_cord<700)?x_cord/1.15:(x_cord>=700&&x_cord<900)?x_cord/1.17:x_cord/1.18;
      }
      }
    else if (initialscale >= 3500 && initialscale < 3800) {
      // 3783 1000
      if(screenSize>=1600){

        box_width_y = box_width_y / 1.38;
        box_width_x = box_width_x / 1.45;
        y_cord = y_cord <= 0 ? 1 : y_cord / 1.37;
        x_cord = x_cord / 1.375;
      }
      else{
        console.log("inside 3800 else ");
        box_width_y = box_width_y / 1.1
        box_width_x = box_width_x / 1.1 

          y_cord = y_cord<=0?1:(y_cord<100&&y_cord>=1)?y_cord/0.9:(y_cord>=100&&y_cord<200)?y_cord/0.96:(y_cord>=200&&y_cord<300)?y_cord/1.02
                  :(y_cord>=300&&y_cord<600)?y_cord/1.05:(y_cord>=600&&y_cord<800)?y_cord/1.08 :y_cord/1.1;

          x_cord = x_cord<100?x_cord/0.85:(x_cord>=100&&x_cord<200)?x_cord/0.92:(x_cord>=200&&x_cord<300)?x_cord/0.98
                    :(x_cord>=300&&x_cord<600)?x_cord/1.03:(x_cord>=600&&x_cord<900)?x_cord/1.05:(x_cord>=900&&x_cord<1200)?x_cord/1.07:x_cord/1.1;
      }
    }
    else if (initialscale >= 3800 && initialscale < 4200) {
      // 4162 1100

      if(screenSize>=1600){

        
              box_width_y = box_width_y / 1.22;
              box_width_x = box_width_x / 1.25;
              y_cord = y_cord <= 0 ? 1 : y_cord < 200 ? y_cord / 1.22 : (y_cord >= 200 && y_cord < 500) ? y_cord / 1.25 : y_cord / 1.28;
              x_cord = x_cord < 200 ? x_cord / 1.15 : x_cord < 300 && x_cord >= 200 ? x_cord / 1.2 : x_cord < 650 && x_cord >= 300 ? x_cord / 1.25
                : x_cord < 1200 && x_cord >= 650 ? x_cord / 1.27 : x_cord / 1.29;
      }else{

        console.log("inside 4200 else ");
        box_width_y = box_width_y / 0.98
        box_width_x = box_width_x / 0.98

          y_cord = y_cord<=0?1:(y_cord<100&&y_cord>=1)?y_cord/0.8:(y_cord>=100&&y_cord<200)?y_cord/0.88:(y_cord>=200&&y_cord<300)?y_cord/0.93
                  :(y_cord>=300&&y_cord<600)?y_cord/0.95:(y_cord>=600&&y_cord<800)?y_cord/0.98 :y_cord/1.02;

          x_cord = x_cord<100?x_cord/0.75:(x_cord>=100&&x_cord<200)?x_cord/0.85:(x_cord>=200&&x_cord<300)?x_cord/0.9
                    :(x_cord>=300&&x_cord<450)?x_cord/0.92:(x_cord>=450&&x_cord<800)?x_cord/0.95
                    :(x_cord>=800&&x_cord<1000)?x_cord/0.96:(x_cord>=1000&&x_cord<1200)?x_cord/0.98:x_cord/1.01;

      }
    } else if (initialscale >= 4200 && initialscale < 4600) {
      //4540 1200

      if(screenSize>=1600){

        box_width_y = box_width_y / 1.03;
        box_width_x = box_width_x / 1.16;
        y_cord = y_cord <= 0 ? 1 : y_cord / 1.13;
        x_cord = x_cord / 1.16;
      }else{
        console.log("inside 4600 else ");
        box_width_y = box_width_y / 0.9
        box_width_x = box_width_x / 0.9

          y_cord = y_cord<=0?1:(y_cord<100&&y_cord>=1)?y_cord/0.8:(y_cord>=100&&y_cord<200)?y_cord/0.82:(y_cord>=200&&y_cord<350)?y_cord/0.85
                  :(y_cord>=350&&y_cord<600)?y_cord/0.87:(y_cord>=600&&y_cord<800)?y_cord/0.9 :y_cord/0.92;

          x_cord = x_cord<100?x_cord/0.7:(x_cord>=100&&x_cord<200)?x_cord/0.8:(x_cord>=200&&x_cord<300)?x_cord/0.82
                    :(x_cord>=300&&x_cord<450)?x_cord/0.85:(x_cord>=450&&x_cord<800)?x_cord/0.87
                    :(x_cord>=800&&x_cord<1000)?x_cord/0.88:(x_cord>=1000&&x_cord<1200)?x_cord/0.89:x_cord/0.91;

      }

    } else if (initialscale >= 4600 && initialscale < 5000) {
      // 4918 1300

      if(screenSize>=1600){

        box_width_y = box_width_y / 1.04;
        box_width_x = box_width_x / 1.06;
        y_cord = y_cord <= 0 ? 1 : y_cord / 1.05;
        x_cord = x_cord / 1.05;
      }else{
        console.log("inside 5000 else ");
        box_width_y = box_width_y / 0.8
        box_width_x = box_width_x / 0.8

          y_cord = y_cord<=0?1:(y_cord<100&&y_cord>=1)?y_cord/0.67:(y_cord>=100&&y_cord<200)?y_cord/0.75:(y_cord>=200&&y_cord<300)?y_cord/0.78
                  :(y_cord>=300&&y_cord<600)?y_cord/0.8:(y_cord>=600&&y_cord<800)?y_cord/0.80 :y_cord/0.82;

          x_cord = x_cord<100?x_cord/0.65:(x_cord>=100&&x_cord<150)?x_cord/0.66:(x_cord>=150&&x_cord<250)?x_cord/0.75
                    :(x_cord>=250&&x_cord<450)?x_cord/0.78:(x_cord>=450&&x_cord<750)?x_cord/0.80
                    :(x_cord>=750&&x_cord<850)?x_cord/0.81:(x_cord>=850&&x_cord<1000)?x_cord/0.82:(x_cord>=1000&&x_cord<1200)?x_cord/0.85:x_cord/0.88;
      }
    }
    else if (initialscale >= 5000 && initialscale < 5300) {
      // 5297 1400

      box_width_y = box_width_y / 1.002;
      box_width_x = box_width_x / 0.99;
      y_cord = y_cord <= 0 ? 1 : y_cord / 0.96;
      x_cord = x_cord / 0.99;
    }

    //Gagan c-1500--->5675
    else if (initialscale >= 5300 && initialscale < 5700) {
      box_width_y = box_width_y / 1.10
      box_width_x = box_width_x / 0.97
      y_cord = y_cord <= 0 ? 1 : y_cord <= 200 ? y_cord / 0.82 : (y_cord < 400 && y_cord > 200) ? y_cord / 0.90 : y_cord / 0.92;

      x_cord = x_cord < 300 ? x_cord / 0.78 : (x_cord < 600 && x_cord >= 300) ? x_cord / 0.90 : (x_cord < 800 && x_cord >= 600) ? x_cord / 0.92
        : x_cord >= 800 ? x_cord / 0.94 : x_cord / 0.96

    }
    else if (initialscale >= 5700 && initialscale < 6100) {
      box_width_y = box_width_y / 0.9
      box_width_x = box_width_x / 0.9
      y_cord = y_cord <= 0 ? 1 : y_cord <= 100 ? y_cord / 0.80 : (y_cord < 300 && y_cord >= 100) ? y_cord / 0.82 : (y_cord < 500 && y_cord >= 300) ? y_cord / 0.86 : y_cord / 0.88;
      x_cord = x_cord < 150 ? x_cord / 0.75 : (x_cord < 200 && x_cord >= 150) ? x_cord / 0.80 : (x_cord < 350 && x_cord >= 200) ? x_cord / 0.83
        : (x_cord < 550 && x_cord >= 350) ? x_cord / 0.85 : (x_cord < 800 && x_cord >= 550) ? x_cord / 0.87 : x_cord / 0.88

    }
    else if (initialscale >= 6100 && initialscale < 6500) {
      box_width_y = box_width_y / 0.88
      box_width_x = box_width_x / 0.88
      y_cord = y_cord <= 0 ? 1 : y_cord <= 100 ? y_cord / 0.75 : (y_cord < 300 && y_cord > 100) ? y_cord / 0.77 : (y_cord < 400 && y_cord >= 300) ? y_cord / 0.80
        : (y_cord < 600 && y_cord >= 400) ? y_cord / 0.82 : (y_cord < 700 && y_cord >= 600) ? y_cord / 0.84 : y_cord / 0.86;

      x_cord = x_cord < 100 ? x_cord / 0.70 : (x_cord < 150 && x_cord >= 100) ? x_cord / 0.72 : (x_cord < 250 && x_cord >= 150) ? x_cord / 0.75
        : (x_cord < 550 && x_cord >= 250) ? x_cord / 0.80 : (x_cord < 1100 && x_cord >= 550) ? x_cord / 0.82 : x_cord / 0.83
    }
    else if (initialscale >= 6500 && initialscale < 7100) {
      box_width_y = box_width_y / 0.8
      box_width_x = box_width_x / 0.8
      y_cord = y_cord <= 0 ? 1 : y_cord <= 100 ? y_cord / 0.65 : (y_cord < 200 && y_cord > 100) ? y_cord / 0.72 : (y_cord < 300 && y_cord >= 200) ? y_cord / 0.74
        : (y_cord < 450 && y_cord >= 300) ? y_cord / 0.76 : (y_cord < 800 && y_cord >= 450) ? y_cord / 0.78 : y_cord / 0.80;

      x_cord = x_cord < 100 ? x_cord / 0.65 : (x_cord < 200 && x_cord >= 100) ? x_cord / 0.68 : (x_cord < 300 && x_cord >= 200) ? x_cord / 0.73
        : (x_cord < 450 && x_cord >= 300) ? x_cord / 0.75 : (x_cord < 900 && x_cord >= 450) ? x_cord / 0.77 : x_cord / 0.78
    }
    else if (initialscale >= 7100 && initialscale < 7500) {
      box_width_y = box_width_y / 0.75
      box_width_x = box_width_x / 0.75
      y_cord = y_cord <= 0 ? 1 : y_cord <= 100 ? y_cord / 0.60 : (y_cord < 200 && y_cord > 100) ? y_cord / 0.68 : (y_cord < 350 && y_cord >= 200) ? y_cord / 0.71
        : (y_cord < 700 && y_cord >= 350) ? y_cord / 0.73 : (y_cord < 800 && y_cord >= 700) ? y_cord / 0.75 : y_cord / 0.78;

      x_cord = x_cord < 100 ? x_cord / 0.60 : (x_cord < 200 && x_cord >= 100) ? x_cord / 0.65 : (x_cord < 450 && x_cord >= 200) ? x_cord / 0.71
        : (x_cord < 550 && x_cord >= 450) ? x_cord / 0.72 : (x_cord < 1000 && x_cord >= 550) ? x_cord / 0.73 : x_cord / 0.74
    }
    else if (initialscale >= 7500 && initialscale < 8000) {
      box_width_y = box_width_y / 0.72
      box_width_x = box_width_x / 0.72
      y_cord = y_cord <= 0 ? 1 : y_cord <= 100 ? y_cord / 0.60 : (y_cord < 300 && y_cord > 100) ? y_cord / 0.66 : (y_cord < 600 && y_cord >= 300) ? y_cord / 0.68
        : (y_cord < 700 && y_cord >= 600) ? y_cord / 0.70 : (y_cord < 800 && y_cord >= 700) ? y_cord / 0.75 : y_cord / 0.78;

      x_cord = x_cord < 100 ? x_cord / 0.59 : (x_cord < 200 && x_cord >= 100) ? x_cord / 0.62 : (x_cord < 300 && x_cord >= 200) ? x_cord / 0.65
        : (x_cord < 600 && x_cord >= 300) ? x_cord / 0.68 : (x_cord < 1000 && x_cord >= 600) ? x_cord / 0.70 : x_cord / 0.70
    }
    else {
      console.log("i am inside else")
      box_width_y = box_width_y;
      box_width_x = box_width_x;
      y_cord = y_cord <= 0 ? 1 : y_cord;
      x_cord = x_cord;
    }
    let cordinates =
      x_cord + "," + parseInt(y_cord) + "," + box_width_x + "," + box_width_y;
    console.log("x_cord--->", x_cord, "y_cord-->", y_cord, "box width x-->", box_width_x, "box width y-->", box_width_y);
    addLinkToPdf(cordinates, page_no, embed_url, file);
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
        setDragging(false);
        setHighlighted(false);
        setPopupMessage({
          message1: "Pdf file is not supported",
          footerButton: "Close",
        });
        showConfirmationModel();
      } else if (err?.response?.data?.message.includes("encrypted")) {
        setDragging(false);
        setHighlighted(false);
        setPopupMessage({
          message1: "PDF document is encrypted and cannot be processed",
          footerButton: "Close",
        });
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
    closePopup();
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
    if (confirmationModel) {
      setConfirmationModel(false);
    } else {
      setConfirmationModel(true);
    }
  };

  const nextButtonClicked = async () => {
    try{
      if(localStorage.getItem('user_id') == '56Ek4feL/1A8mZgIKQWEqg==' || localStorage.getItem("user_id") ==="sNl1hra39QmFk9HwvXETJA=="){
        navigate("/preview-content", {
          state: {
          pdfId: initFunData?.id,
          isEdit: isEdit,
          allowVideo: allowStateVideo,
          flag : localStorage.getItem("user_id") ==="56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") ==="sNl1hra39QmFk9HwvXETJA=="  ?(location?.state?.flag === "mandatory"
            ? "mandatory"
            : location?.state?.flag === "Non-mandatory"
            ? "Non-mandatory" : '') :'',
            title: localStorage.getItem("user_id") ==="56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") ==="sNl1hra39QmFk9HwvXETJA=="
            ? (location?.state?.title)
            : ''
          },
        });
      }else{
        navigate("/set-popup", {
          state: {
            pdfId: initFunData?.id,
            fileType: initFunData?.file_type,
            isEdit: isEdit,
            allowVideo: allowStateVideo,
          },
        })
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <Col className="right-sidebar custom-change full-screen">
        <div className="page-top-nav sticky">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                {localStorage.getItem("user_id") ==
                  "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? (
                  <Link
                    className="btn btn-bordered btn btn-primary"
                    // to="/library-create"
                    to={
                      location?.state?.flag === "mandatory"
                        ? "/library-mandatory-content"
                        : location?.state?.flag === "Non-mandatory"
                        ? "/library-content"
                        : "/library-create"
                    }
                    state={{ 
                      flag : localStorage.getItem("user_id") ==="56Ek4feL/1A8mZgIKQWEqg==" ||  localStorage.getItem("user_id") ==="sNl1hra39QmFk9HwvXETJA==" ?(location?.state?.flag === "mandatory"
                        ? "mandatory"
                        : location?.state?.flag === "Non-mandatory"
                        ? "Non-mandatory" : '') :'',
                        title: localStorage.getItem("user_id") ==="56Ek4feL/1A8mZgIKQWEqg==" ||  localStorage.getItem("user_id") ==="sNl1hra39QmFk9HwvXETJA=="
                        ? (location?.state?.title)
                        : ''
                    
                    }}
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
            <div className="col-12 col-md-10">
              <ul className="tabnav-link">
                {
                  <>
                    <li className="active active-main">
                      <a href="">Create Your Content</a>
                    </li>
                    {localStorage.getItem("user_id") ==
                      "rjiGlqA9DXJVH7bDDTX0Lg==" || localStorage.getItem("user_id") ==
                      "iSnEsKu5gB/DRlycxB6G4g==" ? (
                      <li className="active active-main">
                        <a href="">[Embedding Video]</a>
                      </li>
                    ) : null}
                    {localStorage.getItem("user_id") !=
                      "56Ek4feL/1A8mZgIKQWEqg==" && localStorage.getItem("user_id") != "sNl1hra39QmFk9HwvXETJA==" ? (
                      <li
                        className={
                          localStorage.getItem("user_id") !=
                            "rjiGlqA9DXJVH7bDDTX0Lg=="
                            ? ""
                            : ""
                        }
                      >
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
            <div className="col-12 col-md-1">
              <div className="header-btn">
                <Button
                  className="btn btn-primary btn-filled next "
                  onClick={nextButtonClicked}
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
                        {/* <Button
                              className="btn-bordered btn-voilet"
                              onClick={() => fitToWidth(true)}
                            >
                             Calculate
                            </Button> */}
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
                          count={count}
                          onPageChange={handleDocumentLoad}
                          onDocumentLoad={handleCompleteDocumentLoad}
                          renderMode="canvas"
                          fileUrl={articleType == 'ebook' && fileVersion == 1 ? path_image + "videotypeebook.pdf" : file}
                        // fileUrl={"https://docintel.s3-eu-west-1.amazonaws.com/ebook/arunp/pdflink_1690265146.pdf"}
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
                          <div className="link_popup" style={{
                            left: `${Math.min(startX, endX)}px`,
                            top: `${Math.min(startY, endY) < 145 ?
                                Math.min(startY, endY) + 151
                                :
                                (documentHeight) - (Math.min(startY, endY) + Math.abs(startY - endY)) > 145 ?
                                  Math.min(startY, endY) + Math.abs(startY - endY) + 10 :
                                  Math.min(startY, endY) - 151}px`,
                          }}>
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
                Video title <span style={{ "color": "#d61975" }}>*</span>
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

export default AddLinkToPdf;
