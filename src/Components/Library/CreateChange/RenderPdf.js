import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Col,
  Dropdown,
  Modal,
  DropdownButton,
  Form,
  Row,
  // ProgressBar,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ENDPOINT } from "../../../axios/apiConfig";
import {postFormData} from "../../../axios/apiHelper";
import MessageModel from "../../../Model/MessageModel";
import { toast } from "react-toastify";
import QRCode from "qrcode.react";
import { usePdf } from '@mikecousins/react-pdf';
import PDF from "react-pdf-js";
import packageJson from '../../../../package.json';
// import  Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import  Viewer from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { RotateEvent, PageChangeEvent, DocumentLoadEvent, RenderPageProps,ProgressBar} from '@react-pdf-viewer/core';
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const RenderPdf = ({
  next,
  url,
  handleNext,
  hidePopup,
  trigger,
  updatePublish,
  previewArticle,
  editStatus
}) => {
  const [page, setPage]   = useState(1);
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [commanShow, setCommanShow] = useState(false);
  const [wordData, setWordData] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [modalBtn, setModalBtn] = useState('');
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [startXCordinate, setStartXCordinate] = useState(0);
  const [startYCordinate, setStartYCordinate] = useState(0);
  const [endXCordinate, setEndXCordinate] = useState(0);
  const [endYCordinate, setEndYCordinate] = useState(0);
  const [highlighted, setHighlighted] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(false);
  const [showAddLink, setShowAddLink] = useState(false);
  const parentRef=useRef(null);
  // const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];
  let total_pages = 1000;
  // let url = "https://docintel.s3-eu-west-1.amazonaws.com/ebook/arunp/1679390009620.pdf";

  useEffect(() => {
     if (trigger) {
       publishClicked();
     }
  }, [trigger]);

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    // console.log("Asda");
    total_pages = e.doc.numPages;
    setNumPages(e.doc.numPages);
    setModalMessage("");
    setModalBtn('');
    // setCommanShow(true);
  };

  const handlePageChange = (e: PageChangeEvent) => {
    setPage(e.currentPage);
  	var mainDiv = document.getElementsByClassName('viewer-layout-main')[0];
  	let chd = mainDiv.getElementsByClassName("viewer-text-layer");
  	setTimeout(function(){
  		let node = chd[e.currentPage];
  		if(typeof node !== "undefined"){
        let string_val = node.textContent;
        let words = string_val.split(' ').length;

        let wordsInfo = {
          "page" : e.currentPage + 1,
          "total" : words,
        };

        wordData.push(wordsInfo);
        // setWordData(...wordData,wordsInfo);
  		}
  	}, 300);
    // console.log(e.currentPage);

    if(total_pages == '1000'){
      // console.log('1000',total_pages,e.currentPage,numPages);
        if(e.currentPage === (numPages -1)){
            setModalMessage("");
            let btn_val = "";
            if (typeof next !=="undefined")
            {
              btn_val = next == 1 ? "Next" :
              editStatus == 1 ? "Save" : "Publish";
            }
            setModalBtn(btn_val);
            if(hidePopup == 0){
              setCommanShow(true);
            }
          }
    }
    // else{
    //   if(total_pages === 1){
    //     setModalMessage("");
    //     let btn_val = "";
    //     if (typeof next !=="undefined")
    //     {
    //       btn_val = next == 1 ? "Next" : "Publish";
    //     }
    //     setModalBtn(btn_val);
    //     if(hidePopup == 0){
    //       setCommanShow(true);
    //     }
    //   }
    // }
  };

    // const get_text = (el) => {
		// console.log(el.childNodes)
	// 	let ret = "";
	// 	var length = el.childNodes.length;
	// 	for(var i = 0; i < length; i++) {
	// 		var node = el.childNodes[i];
	// 		if(node.nodeType != 8) {
	// 			ret += node.nodeType != 1 ? node.nodeValue : get_text(node);
	// 		}
	// 	}
	// 	return ret;
	// }

	const publishClicked = async() => {
		var mainDiv = document.getElementsByClassName('viewer-layout-main')[0];
		let chd = mainDiv.getElementsByClassName("viewer-text-layer");
		var canvas_layer = mainDiv.getElementsByClassName("viewer-canvas-layer")[0];
    var canvas = canvas_layer.querySelector('canvas');
		if (canvas == null) {
      setModalMessage("All pages of this pdf have not loaded,Please reload to this pdf");
      setModalBtn('');
      setCommanShow(true);
		}else{
      var dataURL = canvas.toDataURL("image/png");
      var file = dataURLtoBlob(dataURL);
      var fd = new FormData();
      fd.append("file", file);
      fd.append("data", JSON.stringify(wordData));
      // console.log(file);
      // console.log(wordData);
      // await postFormData(ENDPOINT.ADD_PDF_WORD,fd,{
      //   header:{
      //     "Content-Type": "multipart/form-data",
      //   }
      // });
      handleNext(fd);
      setWordData([]);
    }
 }

const dataURLtoBlob = (dataURL) => {
      var binary = atob(dataURL.split(',')[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: 'image/png'});
}

const modalClose = (value) => {
    setCommanShow(false);
    updatePublish();
}

const scrollEve = (event) => {
  const target = event.target;
  if(target.scrollHeight - target.scrollTop === target.clientHeight)
   {
     if(numPages == 1){
       optimizeSinglePagePdf();
     }
   }
}

const optimizeSinglePagePdf = () => {
  // setPage(1);
  var mainDiv = document.getElementsByClassName('viewer-layout-main')[0];
  if(typeof mainDiv !== "undefined"){
      let chd = mainDiv.getElementsByClassName("viewer-text-layer");
      setTimeout(function(){
        let node = chd[0];
        if(typeof node !== "undefined"){
          let string_val = node.textContent;
          let words = string_val.split(' ').length;

          let wordsInfo = {
            "page" : 1,
            "total" : words,
          };
          wordData.push(wordsInfo);
        }
      }, 300);

      setModalMessage("");
      let btn_val = "";
      if (typeof next !=="undefined")
      {
        btn_val = next == 1 ? "Next" : editStatus == 1 ? "Save" : "Publish";
      }
      setModalBtn(btn_val);
      if(hidePopup == 0){
        setCommanShow(true);
      }
  }
}



useEffect(() => {
  parentRef.current.addEventListener("mousedown", handleMouseDown);
  parentRef.current.addEventListener("mousemove", handleMouseMove);
  parentRef.current.addEventListener("mouseup", handleMouseUp);

  return () => {
    parentRef.current.removeEventListener("mousedown", handleMouseDown);
    parentRef.current.removeEventListener("mousemove", handleMouseMove);
    parentRef.current.removeEventListener("mouseup", handleMouseUp);
  };
}, [dragging, startX, startY, endX, endY]);

const handleMouseDown = (e) => {
  if (e.target.name === "url") return;
  if (e.target.name === "addurl") return;
  if(e.target.className === "viewer-text-layer"){
    console.log(e.clientX,"Mouse down first event");
	  setHighlighted(false)
	  setShowAddLink(true);
	  const viewerRect = parentRef.current.getBoundingClientRect();
	  const textLayer = parentRef.current.querySelector(".viewer-text-layer");
	  // console.log(textLayer,"textLayer");
	  const pageHeight = textLayer.getBoundingClientRect().height;
	   // console.log(pageHeight,"pageHeight");
	  const scrollLayer = document.querySelector(".viewer-layout-main");
	  const scrollTop = scrollLayer.scrollTop;

	  // Calculate the coordinates relative to the viewer
	  const x = e.clientX - viewerRect.left;
	  const y = e.clientY - viewerRect.top + scrollTop;

	  // Calculate the page number
	  const newPage = Math.floor((y - textLayer.offsetTop) / pageHeight);
	  setPage(newPage);
	  setStartXCordinate(e.clientX);
	  setStartYCordinate(y-(newPage * pageHeight));
	  setEndXCordinate(x);
	  setEndYCordinate(y-(newPage * pageHeight));
	  // Calculate the coordinates relative to the text layer
	  const xInPage = x - textLayer.offsetLeft + 26;
	  const yInPage = y - textLayer.offsetTop-scrollTop + 26;
	  // console.log("Box1",x ,y,scrollTop,xInPage,yInPage)
	  setDragging(true);
	  setStartX(xInPage);
	  setStartY(yInPage);
	  setEndX(xInPage);
	  setEndY(yInPage);


      let top_height =  document.getElementsByClassName("viewer-text-layer").offsetTop;
      console.log(top_height,e.clientY);
      let top_height_main =   e.clientY-top_height;
      top_height_main =  top_height_main/3.8;
      console.log(top_height_main,"top_height_main");

  }else{
	  console.log("AM not here");
	  setShowAddLink(false);
	  return;
  }
};

const handleMouseMove = (e) => {
  if (e.target.name === "url") return;
  if (e.target.name === "addurl") return;
  window.getSelection().removeAllRanges();
  if (!dragging) return;

  const viewerRect = parentRef.current.getBoundingClientRect();
  const scrollLayer = document.querySelector(".viewer-layout-main");
  const scrollTop = scrollLayer.scrollTop;
  const textLayer = parentRef.current.querySelector(".viewer-text-layer");
  const pageHeight = textLayer.getBoundingClientRect().height;

  // Calculate the coordinates relative to the viewer
  const x = e.clientX - viewerRect.left;
  const y = e.clientY - viewerRect.top + scrollTop;
  setEndXCordinate(x);
  setEndYCordinate(y-(page * pageHeight));


  // Calculate the coordinates relative to the text layer
  const xInPage = x - textLayer.offsetLeft;
  const yInPage = y - textLayer.offsetTop  - scrollTop;

  setEndX(xInPage);
  setEndY(yInPage);
};

const handleMouseUp = (e) => {
  if (e.target.name === "url") return;
  if (e.target.name === "addurl") return;
  const textLayer = parentRef.current.querySelector(".viewer-text-layer");
  const pageHeight = textLayer.getBoundingClientRect().height;
//  console.log("Box2",startX ,startY,startXCordinate,startYCordinate)

  window.getSelection().removeAllRanges();
  // console.log(startXCordinate,startYCordinate,endXCordinate,endYCordinate)
  setDragging(false);
  if(showAddLink){
	setHighlighted(true);
  }
};


const handleAddUrl = (e) => {
	e.preventDefault();
	let embed_url = inputUrl.trim();
	if(embed_url.length > 0 && isValidUrl(embed_url)){
		setError(false);
	}else{
		setError(true);
	}

  let layout_container = document.querySelector(".sublink_right_block");
  let winow_width = layout_container.getBoundingClientRect().width;
  let page_layer = parentRef.current.querySelector(".viewer-text-layer");
  let document_width   = page_layer.getBoundingClientRect().width;
  let main_width = winow_width - document_width;
  let left_porion = main_width/2;
  // let left_porion = main_width;
  let box =  parentRef.current.querySelector(".highlight_box");
  let box_height = box.getBoundingClientRect().height;
  let box_width  = box.getBoundingClientRect().width;
  let new_width  = startXCordinate-left_porion-box_width;
  let x_cord     = new_width/3.9;


  // var element1 = document.getElementsByClassName('sublink_right_block');
  // var element2 = document.getElementsByClassName('viewer-text-layer');
  var elements1 = document.getElementsByClassName('sublink_right_block'); // First elements
  var elements2 = document.getElementsByClassName('viewer-text-layer'); // Second element

  var element1 = elements1[0]; // First element
  var element2 = elements2[0]; // Second element

  console.log(element1.offsetTop,element2.offsetTop,element1.offsetHeight);
  var margin = element2.offsetTop - element1.offsetTop - element1.offsetHeight;
  console.log(margin,"margin");

  // console.log(startX,left_porion,"Left Portion");
  // console.log(box_width,box_height,"box_height");
  console.log(x_cord,"x coordinates");
  console.log(box_width/3.7,"box_accurate_width");
  console.log(box_height/3.7,"box_accurate_height");
  console.log(endY,"endY");
  console.log(window.devicePixelRatio);
  // console.log("startXCordinate",startXCordinate);
	// console.log("HandleAddUrlFunction");
	// console.log(startXCordinate,startYCordinate,endXCordinate,endYCordinate);
  //
	// console.log("Add link to pdf");
  //
	// console.log(Math.abs(endXCordinate - startXCordinate),Math.abs(endYCordinate - startYCordinate));
  //
	// console.log("Add box link to pdf");
  //
	// console.log(startXCordinate-7,startYCordinate-53,Math.abs(endXCordinate - startXCordinate),Math.abs(endYCordinate - startYCordinate));

	  // setDragging(false);
	  // setHighlighted(false);
};

const closePopup = () => {
	setDragging(false);
	setHighlighted(false);
}

const isValidUrl = (urlString) => {
	 var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}


    return (
      <div className="sublink_right_block">
      {
        typeof url !== "undefined" && (
          <>
              {
                typeof url !== "undefined" && (
                  <>

                    <MessageModel
                      show={commanShow}
                      onClose={modalClose}
                      heading={""}
                      data={modalMessage}
                      footerButton={modalBtn}
                      handleSubmit={publishClicked}
                    />

                    {
                      /*<Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}></Worker>*/
                    }

                        <div style={{ height: '750px' }} id="pdf_view_box">
                          <div onScroll={scrollEve} className={previewArticle?"scroll_pdf":"scroll_pdf"} ref={parentRef}>
                          <Viewer
                            onPageChange={handlePageChange}
                            onDocumentLoad={handleDocumentLoad}
                            renderMode = "canvas"
                            fileUrl={url}
                          />

                          <div
                            className = "highlight_box"
                            style={{
                              position: "absolute",
                              border: "2px dashed rgb(204, 204, 204)",
                              backgroundColor: "rgba(255, 0, 0, 0)",
                              display: highlighted || dragging ? "block" : "none",
                              pointerEvents: "none",
                              left: `${Math.min(startX, endX)}px`,
                              top: `${Math.min(startY, endY)}px`,
                              width: `${Math.abs(startX - endX)}px`,
                              height: `${Math.abs(startY - endY)}px`,
                            }}
                          />
                          </div>


                          {highlighted && (
                            <div
                              className="link_popup"
                            >
                              <form action="#" id="addLinkForm">
                                <button type="button" className="close" id="closeLinkPopup" onClick={() => closePopup()}>
                                  <span aria-hidden="true">×</span>
                                </button>
                                <label for="targetURL">Add Link:</label>
                                <input placeholder="https://example.com"
                                  id="targetURL"
                                  className="form-control input-xs"
                                  type="text"
                                  onChange={(e)=>setInputUrl(e.target.value)}
                                 />

								 {
									 error ?
									 <p className="err_class">
										Please enter a valid link
									 </p> : null
								 }


                                <input type="submit" value="Add Link" id="addLinkToPdfButton" onClick={(e) => handleAddUrl(e)} />
                              </form>
                            </div>
                          )}

                        </div>
                  </>
                )
              }
          </>
        )
      }
      </div>
    )
}

export default RenderPdf;
