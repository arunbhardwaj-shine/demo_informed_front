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
import {postData, getData} from "../../../axios/apiHelper";
import { toast } from "react-toastify";
import QRCode from "qrcode.react";
import { usePdf } from '@mikecousins/react-pdf';
import PDF from "react-pdf-js";
import packageJson from '../../../../package.json';
import  Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { RotateEvent, PageChangeEvent, DocumentLoadEvent, RenderPageProps  } from '@react-pdf-viewer/core';
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const RenderPdf = () => {
  const [page, setPage]   = useState(1);
  const [pages, setPages] = useState(null);
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];
  let url = "https://docintel.s3-eu-west-1.amazonaws.com/ebook/arunp/1679390009620.pdf";

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    console.log(e.doc.numPages);
    setPages(e.doc.numPages);
  };

  const handlePageChange = (e: PageChangeEvent) => {
    // console.log(e.currentPage);
    // console.log(e.doc);
	
    setPage(e.currentPage);
	var mainDiv = document.getElementsByClassName('viewer-layout-main')[0];
	// console.log(e.currentPage);
	let chd = mainDiv.getElementsByClassName("viewer-text-layer");
	setTimeout(function(){
		let node = chd[e.currentPage];
		if(typeof node !== "undefined"){		
			var words = get_text(node);
			var count = words.split(' ').length;
			console.log(e.currentPage);
			console.log(node.textContent);
			// console.log(mainDiv.getElementsByTagName('div')[0]);
			// let childDiv = mainDiv.getElementsByClassName('viewer-text-layer')[0];
			// console.log(childDiv);
		}
	}, 500);
	
	
  };
  
  
    const get_text = (el) => {
		// console.log(el.childNodes)
		let ret = "";
		var length = el.childNodes.length;
		for(var i = 0; i < length; i++) {
			var node = el.childNodes[i];
			if(node.nodeType != 8) {
				ret += node.nodeType != 1 ? node.nodeValue : get_text(node);
			}
		}
		return ret;
	}
	
	const nextButtonClicked = (e) => {
		var mainDiv = document.getElementsByClassName('viewer-layout-main')[0];
		let chd = mainDiv.getElementsByClassName("viewer-text-layer");
		var canvas = mainDiv.getElementsByClassName("viewer-text-layer")[0];
		
		if (canvas == null) {
			alert('All pages of this pdf have not loaded,Please reload to this pdf');
			
		}
		
		var dataURL = canvas.toDataURL("image/png");
		var file = dataURLtoBlob(dataURL);
		// chd[0];
		console.log(file);
	}
	
	const dataURLtoBlob = (dataURL) => {
        // Decode the dataURL
        var binary = atob(dataURL.split(',')[1]);
        // Create 8-bit unsigned array
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        // Return our Blob object
        return new Blob([new Uint8Array(array)], {type: 'image/png'});
    }


    return (
      <div className="sublink_right_block">
      {
        typeof url !== "undefined" && (
          <>
              {
                typeof url !== "undefined" && (
                  <>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                        <div style={{ height: '750px' }}>
                          <Viewer
                            onPageChange={handlePageChange}
                            onDocumentLoad={handleDocumentLoad}
                            fileUrl={url}
                          />;
                        </div>
                      </Worker>
                  </>
                )
              }
			  {
				<button onClick={nextButtonClicked}>Upload</button>  
			  }
          </>
        )
      }
      </div>
    )
}

export default RenderPdf;
