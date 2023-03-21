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
const RenderPdf = ({
  url
}) => {
  const [page, setPage]   = useState(1);
  const [pages, setPages] = useState(null);
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    console.log(e.doc.numPages);
    setPages(e.doc.numPages);
  };

  const handlePageChange = (e: PageChangeEvent) => {
    console.log(e.currentPage);
    console.log(e.doc);
    setPage(e.currentPage);
  };


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
          </>
        )
      }
      </div>
    )
}

export default RenderPdf;
