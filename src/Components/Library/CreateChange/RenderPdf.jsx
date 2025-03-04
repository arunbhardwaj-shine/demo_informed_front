import React, { useEffect, useState, useRef } from "react";
import MessageModel from "../../../Model/MessageModel";
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Spinner } from "react-activity";
import optimizeImage from "../../../Utils/optimizeImage";
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
  const [visiblePages, setVisiblePages] = useState(new Set([1]));
  const scrollContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerWidth = useRef(window.innerWidth);
  const [loadPdf, setLoadPdf] = useState(false);
  const loadElement = <Spinner color="#53aff4" size={32} speed={1} animating={true} />;
  useEffect(() => {
    if (trigger) {
      publishClicked();
    }
  }, [trigger]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0; // Reset scroll to top
    }
  }, [url]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [visiblePages]);

  const handleLoadError = (error) => {
    setIsLoading(false);
    setError(true);
  };

  const handleResize = () => {
    containerWidth.current = scrollContainerRef.current.offsetWidth || window.innerWidth;
  };

  /*Code start for new editor */
  const onDocumentLoadSuccess = ({ numPages }) => {
    setVisiblePages(new Set([1]));
    setNumPages(numPages);
    setModalMessage("");
    setModalBtn("");
    setIsLoading(false);
    setError(false);
  };

  const countWordsOnPage = (textContent) => {
    const words = textContent.split(/\s+/).filter((word) => word.length > 0);
    return words.length;
  };

  const onPageRenderSuccess = (page, pageNumber) => {
    if(pageNumber === 1){
      const element = document.querySelector('[data-page-number="1"]');
      if(element){
        var canvas = element.querySelector("canvas");
        var dataURL = canvas.toDataURL("image/png");
        setImgCanvasUrl(dataURL)
      }
    }
    setPage(pageNumber);
    setLoadPdf(true);
    page.getTextContent().then((textContent) => {
      const wordCount = countWordsOnPage(textContent.items.map(item => item.str).join(' '));
      setWordData((prevWordCounts) => [
        ...prevWordCounts.filter((entry) => entry.page !== pageNumber),
        { page: pageNumber, wordCount }
      ]);
    });

    if (numPages != 1) {
      if (pageNumber === numPages) {
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

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    /* GET PAGE NO ON SCROLL START */
    let visiblePageNumber = null;
    const pageLayers = scrollContainerRef.current.querySelectorAll('.viewer-page-layer');
    pageLayers.forEach((page) => {
      const rect = page.getBoundingClientRect();
      // Check if the element is in the viewport
      if (rect.top >= 0 && rect.top <= window.innerHeight) {
        visiblePageNumber = page.getAttribute('data-page-number');
      }
    });
    if (visiblePageNumber != null && visiblePageNumber !== page) {
        setPage(visiblePageNumber)
    }
    /* GET PAGE NO ON SCROLL END */

    const pageElements = Array.from(
      container.querySelectorAll('.viewer-inner-page')
    );
    const newVisiblePages = new Set([...visiblePages]); // Clone current visible pages

    pageElements.forEach((page, index) => {
      const rect = page.getBoundingClientRect();
      const isVisible =
        rect.top < container.offsetHeight && rect.bottom > 0; // Check if visible in the container

      if (isVisible) {
        newVisiblePages.add(index + 1); // Mark page as visible
      }
    });

    // Ensure the first page remains visible if no other pages are detected as visible
    if (newVisiblePages.size === 0 && numPages > 0) {
      newVisiblePages.add(1);
    }

    // Only update state if there are changes to avoid re-render loops
    if (
      newVisiblePages.size !== visiblePages.size ||
      [...newVisiblePages].some((page) => !visiblePages.has(page))
    ) {
      setVisiblePages(newVisiblePages);
    }
};

  /*Code end for new editor*/

  const publishClicked = async () => {
    var dataURL = '';
    if (numPages == 1) {
      const element = document.querySelector('[data-page-number="1"]');
      if(element){
        var canvas = element.querySelector("canvas");
        dataURL = canvas.toDataURL("image/png");
      }
    }else{
      dataURL = imgCanvasUrl;
    }

    if (dataURL && dataURL.startsWith('data:image/png;base64,')) {
      var file = dataURLtoBlob(dataURL);
      file = await optimizeImage(file, { width: 225 });
      var fd = new FormData();
      fd.append("file", file);
      fd.append("data", JSON.stringify(wordData));
      handleNext(fd);
      setWordData([]);
      setLoadPdf(false);
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
    if (target.scrollHeight - target.scrollTop <= target.clientHeight) {
      // console.log(numPages,loadPdf,'LOADPDF TESTING FUNCTIONALITY')
      if (numPages == 1 && loadPdf) {
        optimizeSinglePagePdf();
      }
    }
  };

  const optimizeSinglePagePdf = () => {
    setModalMessage("");
    let btn_val = "";
    if (typeof next !== "undefined") {
      btn_val = next == 1 ? "Next" : editStatus == 1 ? "Save" : "Publish";
    }
    setModalBtn(btn_val);
    if (hidePopup == 0) {
      setCommanShow(true);
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
                <div className={previewArticle ? "scroll_pdf" : "scroll_pdf"}>
                  {/* {isLoading && !error && (
                    <div
                      className="pdf_loader"
                      style={{
                        margin: "0 auto",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <Spinner color="#53aff4" size={32} speed={1} animating={true} />
                    </div>
                  )} */}

                  {error && (
                    <div>
                      <p>Failed to load the PDF. Please try again later.</p>
                    </div>
                  )}

                  <div
                    className='viewer-layout-container'
                    onScroll={scrollEve}
                    ref={scrollContainerRef}
                    style={{
                      height: '65vh',
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                      border: '1px solid #97b6cf',
                      padding: '0px',
                    }}
                  >
                    <div className="viewer-layout-toolbar">
                      <div className="viewer-toolbar">
                        <div className="viewer-toolbar-left">
                          <div className="viewer-toolbar-item">
                            <input
                              className="viewer-toolbar-current-page-input"
                              type="text"
                              value={page + ""}
                              readOnly
                            />{' '}
                            / {numPages}
                          </div>
                        </div>
                        <div className="viewer-toolbar-center"></div>
                        <div className="viewer-toolbar-right"></div>
                      </div>
                    </div>

                    <Document
                      file={url}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={handleLoadError}
                      loading={loadElement}
                      className="viewer-layout-main"
                    >
                      {Array.from({ length: numPages || 0 }, (_, index) => (
                        <div
                          key={`page_${index + 1}`}
                          className="viewer-inner-page"
                          style={{
                            marginBottom: '20px',
                            padding: '10px',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <div>
                            {visiblePages.has(index + 1) && (
                              <Page
                                className="viewer-page-layer"
                                pageNumber={index + 1}
                                width={containerWidth.current - 20}
                                loading={loadElement}
                                onRenderSuccess={(page) => onPageRenderSuccess(page, index + 1)} // Track word count on render success
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </Document>
                  </div>
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