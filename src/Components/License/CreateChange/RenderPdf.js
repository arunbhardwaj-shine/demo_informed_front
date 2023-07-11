import React, { useEffect, useState, useRef } from "react";
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
import { RotateEvent, PageChangeEvent, DocumentLoadEvent, RenderPageProps  } from '@react-pdf-viewer/core';
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const RenderPdf = ({
  next,
  url,
  handleNext,
  hidePopup,
  trigger,
  updatePublish,
  editStatus
}) => {
  const [page, setPage]   = useState(1);
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [commanShow, setCommanShow] = useState(false);
  const [wordData, setWordData] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [modalBtn, setModalBtn] = useState('');
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
        console.log(wordData);
        // setWordData(...wordData,wordsInfo);
        // console.log(words);
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
    // console.log("Hello am done");
    setCommanShow(false);
    updatePublish();
}

const scrollEve = (event) => {
  const target = event.target;
  if(target.scrollHeight - target.scrollTop - 400  >= target.clientHeight)
   {
     // console.log(numPages);
     // console.log(typeof numPages);
     if(numPages == 1){
       optimizeSinglePagePdf();
     }
   }
  // console.log("HEIRE");
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
          console.log(wordData);
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
                          <div onScroll={scrollEve} className="scroll_pdf">
                          <Viewer
                            onPageChange={handlePageChange}
                            onDocumentLoad={handleDocumentLoad}
                            renderMode = "canvas"
                            fileUrl={url}
                          />
                          </div>
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
