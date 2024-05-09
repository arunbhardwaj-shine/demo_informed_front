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
import { postFormData } from "../../../axios/apiHelper";
import MessageModel from "../../../Model/MessageModel";
import { toast } from "react-toastify";
import QRCode from "qrcode.react";
import { usePdf } from "@mikecousins/react-pdf";
import PDF from "react-pdf-js";
import packageJson from "../../../../package.json";
import Viewer from "@phuocng/react-pdf-viewer";
import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";
import {
  RotateEvent,
  PageChangeEvent,
  DocumentLoadEvent,
  RenderPageProps,
  ProgressBar,
} from "@react-pdf-viewer/core";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const RenderPdf = ({
  next,
  url,
  handleNext,
  hidePopup,
  trigger,
  updatePublish,
  previewArticle,
  editStatus,
}) => {
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [commanShow, setCommanShow] = useState(false);
  const [wordData, setWordData] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [modalBtn, setModalBtn] = useState("");
  let total_pages = 1000;

  useEffect(() => {
    if (trigger) {
      publishClicked();
    }
  }, [trigger]);

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    total_pages = e.doc.numPages;
    setNumPages(e.doc.numPages);
    setModalMessage("");
    setModalBtn("");

    if (total_pages == 1) {
      const mainDiv = document.getElementsByClassName("viewer-layout-main")[0];
      const viewerInnerPage = mainDiv.querySelector(".viewer-inner-page");

      if (viewerInnerPage) {
        const viewerInnerPageHeight = viewerInnerPage.clientHeight;
        const scrollPdfHeight = document.querySelector('.scroll_pdf').clientHeight;
        if (viewerInnerPageHeight < scrollPdfHeight) {
          optimizeSinglePagePdf();
        }
      }
    }
  };

  const handlePageChange = (e: PageChangeEvent) => {
    setPage(e.currentPage);
    var mainDiv = document.getElementsByClassName("viewer-layout-main")[0];
    let chd = mainDiv.getElementsByClassName("viewer-text-layer");
    setTimeout(function () {
      let node = chd[e.currentPage];
      if (typeof node !== "undefined") {
        let string_val = node.textContent;
        let words = string_val.split(" ").length;

        let wordsInfo = {
          page: e.currentPage + 1,
          total: words,
        };

        wordData.push(wordsInfo);
      }
    }, 300);

    if (total_pages == "1000") {
      if (e.currentPage === numPages - 1) {
        setModalMessage("");
        let btn_val = "";
        if (typeof next !== "undefined") {
          btn_val = next == 1 ? "Next" : editStatus == 1 ? "Save" : "Publish";
        }
        setModalBtn(btn_val);
        if (hidePopup == 0) {
          setCommanShow(true);
        }
      }
    }
  };

  const publishClicked = async () => {
    var mainDiv = document.getElementsByClassName("viewer-layout-main")[0];
    let chd = mainDiv.getElementsByClassName("viewer-text-layer");
    var canvas_layer = mainDiv.getElementsByClassName("viewer-canvas-layer")[0];
    var canvas = canvas_layer.querySelector("canvas");
    if (canvas == null) {
      setModalMessage(
        "All pages of this pdf have not loaded,Please reload to this pdf"
      );
      setModalBtn("");
      setCommanShow(true);
    } else {
      var dataURL = canvas.toDataURL("image/png");
      var file = dataURLtoBlob(dataURL);
      var fd = new FormData();
      fd.append("file", file);
      fd.append("data", JSON.stringify(wordData));
      handleNext(fd);
      setWordData([]);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    var binary = atob(dataURL.split(",")[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/png" });
  };

  const modalClose = (value) => {
    setCommanShow(false);
    updatePublish();
  };

  const scrollEve = (event) => {
    const target = event.target;
    // if (target.scrollHeight - target.scrollTop  === target.clientHeight) {
    if (target.scrollHeight - target.scrollTop  <= target.clientHeight + 70) {
      if (numPages == 1) {
        optimizeSinglePagePdf();
      }
    }
  };

  const optimizeSinglePagePdf = () => {
    var mainDiv = document.getElementsByClassName("viewer-layout-main")[0];
    if (typeof mainDiv !== "undefined") {
      let chd = mainDiv.getElementsByClassName("viewer-text-layer");
      setTimeout(function () {
        let node = chd[0];
        if (typeof node !== "undefined") {
          let string_val = node.textContent;
          let words = string_val.split(" ").length;

          let wordsInfo = {
            page: 1,
            total: words,
          };
          wordData.push(wordsInfo);
        }
      }, 300);

      setModalMessage("");
      let btn_val = "";
      if (typeof next !== "undefined") {
        btn_val = next == 1 ? "Next" : editStatus == 1 ? "Save" : "Publish";
      }
      setModalBtn(btn_val);
      if (hidePopup == 0) {
        setCommanShow(true);
      }
    }
  };

  return (
    <div className="sublink_right_block">
      {typeof url !== "undefined" && (
        <>
          {typeof url !== "undefined" && (
            <>
              <MessageModel
                show={commanShow}
                onClose={modalClose}
                heading={""}
                data={modalMessage}
                footerButton={modalBtn}
                handleSubmit={publishClicked}
              />

              <div id="pdf_view_box">
                <div
                  onScroll={scrollEve}
                  className={previewArticle ? "scroll_pdf" : "scroll_pdf"}
                >
                  <Viewer
                    onPageChange={handlePageChange}
                    onDocumentLoad={handleDocumentLoad}
                    renderMode="canvas"
                    fileUrl={url}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RenderPdf;
