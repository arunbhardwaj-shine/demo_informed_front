import React, { useEffect, useState, useRef } from "react";
import MessageModel from "../../../Model/MessageModel";
import {
  PageChangeEvent,
  DocumentLoadEvent,
  Viewer
} from "@react-pdf-viewer/core";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

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
  customKey
}) => {
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [commanShow, setCommanShow] = useState(false);
  const [wordData, setWordData] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [imgCanvasUrl, setImgCanvasUrl] = useState("");
  const [modalBtn, setModalBtn] = useState("");
  let total_pages = 1000;
 
  useEffect(() => {
    if (trigger) {
      publishClicked();
    }
  }, [trigger]);

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
    renderToolbar: (Toolbar) => {
      return (
          <Toolbar>
              {({ CurrentPageInput, NumberOfPages }) => (
                  <div
                      style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          padding: '4px',
                      }}
                  >
                      <CurrentPageInput
                          style={{
                              width: '50px',
                              textAlign: 'center',
                              marginRight: '4px',
                              padding: '4px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                          }}
                      />
                      <span style={{ margin: '0 4px' }}>/</span>
                      <NumberOfPages />
                  </div>
              )}
          </Toolbar>
      );
  },
  });
  const pageNavigationPluginInstance = pageNavigationPlugin();

  const handleDocumentLoad = (e) => {
    total_pages = e.doc.numPages;
    setNumPages(e.doc.numPages);
    setModalMessage("");
    setModalBtn("");
    if (total_pages == 1) {
      const mainDiv = document.getElementsByClassName("rpv-core__inner-pages")[0];
      const viewerInnerPage = mainDiv.querySelector(".rpv-core__inner-page");
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
    if(e.currentPage === 1){
      var mainDiv = document.getElementsByClassName("rpv-core__inner-pages")[0];
      let chd = mainDiv.getElementsByClassName("rpv-core__text-layer");
      var canvas_layer = mainDiv.getElementsByClassName("rpv-core__canvas-layer")[0];
      var canvas = canvas_layer.querySelector("canvas");
      var dataURL = canvas.toDataURL("image/png");
      setImgCanvasUrl(dataURL)
    }
    setPage(e.currentPage);
    var mainDiv = document.getElementsByClassName("rpv-core__inner-pages")[0];
    let chd = mainDiv.getElementsByClassName("rpv-core__text-layer");
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
    var dataURL = '';
    if (numPages == 1) {
      var mainDiv = document.getElementsByClassName("rpv-core__inner-pages")[0];
      let chd = mainDiv.getElementsByClassName("rpv-core__text-layer");
      var canvas_layer = mainDiv.getElementsByClassName("rpv-core__canvas-layer")[0];
      var canvas = canvas_layer.querySelector("canvas");
      dataURL = canvas.toDataURL("image/png");
    }else{
      dataURL = imgCanvasUrl;
    }

    if (dataURL && dataURL.startsWith('data:image/png;base64,')) {
      var file = dataURLtoBlob(dataURL);
      var fd = new FormData();
      fd.append("file", file);
      fd.append("data", JSON.stringify(wordData));
      handleNext(fd);
      setWordData([]);
    } else {
      setModalMessage(
        "All pages of this pdf have not loaded,Please reload to this pdf"
      );
      setModalBtn("");
      setCommanShow(true);
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
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 70) {
      if (numPages == 1) {
        optimizeSinglePagePdf();
      }
    }
  };

  const optimizeSinglePagePdf = () => {
    var mainDiv = document.getElementsByClassName("rpv-core__inner-pages")[0];
    if (typeof mainDiv !== "undefined") {
      let chd = mainDiv.getElementsByClassName("rpv-core__text-layer");
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
                    plugins={[defaultLayoutPluginInstance,pageNavigationPluginInstance]}
                    key={customKey}
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
