import React, { useEffect, useState } from "react";
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
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const SubLinkListing = ({
  pdfid,render,count
}) => {
  const [sectionLoader, setSectionLoader] = useState(false);
  const [subLinkData, setSubLinkData] = useState([]);
  const [qrState, setQr] = useState({value: ""});

  useEffect(() => {
    getSubLinkListingData();
  }, [pdfid,render,count]);

  const getSubLinkListingData = async () => {
    if(typeof pdfid !== 'undefined'){
      setSectionLoader(true);
      const res = await getData(ENDPOINT.LIBRARYRESUBLINKLISTING+"/"+pdfid);
      setSubLinkData(res?.data?.data);
      setSectionLoader(false);
    }
  }

  const setDownloadLink = (link) => {
    setSectionLoader(true);
    setQr({ ...qrState, value: link });
    setTimeout(function () {
      downloadQRCode();
    }, 500);
  }

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `QR-code.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setSectionLoader(false);
  };

  return (
    <>
      <div class="sublink_right_block">

        {
          sectionLoader ?
          <div className={"loader "+ (sectionLoader ? 'show' : '')} id="custom_loader">
            <div className="loader_show"><span className="loader-view"> </span></div>
          </div>
          : ''
        }
      {typeof subLinkData === 'undefined' || subLinkData.length == 0 ? (
        <div className="no-sublink">
          <img src={path_image + "dummy-sublink.png"} alt="" />
        </div>
      ) : (
        <>
        {
            subLinkData?.map((data, index) => {
              return (
                <>
                <div className="sublink-list">
                  <div className="sublink-listed-view d-flex align-items-center">
                    <div className="sublink-listed-view-block">
                      <h5>{data?.name}</h5>
                      <h6>{data?.campaignId}</h6>
                      <div className="sublink-list-link">
                        <Link to={data?.link}>
                          {data?.link}
                        </Link>
                        <span
                          className="copy-content"
                          onClick={() => {
                            toast.success(
                              "content copied to the clipboard!"
                            );
                            window.navigator.clipboard.writeText(
                              data?.link
                            );
                          }}
                        >
                          <img src={path_image + "copy-content.svg"}
                            alt="Copy"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="sublink-qr">
                      <div className="sublink-qr-download">
                        <img
                          src={path_image + "qr-code-img.png"}
                          alt=""
                        />
                        <div className="sublink-download" onClick={(e) => setDownloadLink(data?.link)}>
                          <img
                          src={path_image + "download.svg"}
                          alt=""
                        />
                        </div>
                      </div>
                    </div>
                      {/*<Button className="btn-bordered">Analytics</Button>*/}
                    <Link className="btn-bordered" to="/content-analytics" state={{ pdfId: pdfid }}>
                      Analytics
                    </Link>
                  </div>
                </div>
                <QRCode
                  style={{ display: "none" }}
                  id="qr-gen"
                  value={qrState?.value}
                  size={290}
                  level={'H'}
                  includeMargin={true}
                />
                </>
              )
            })
        }
        </>
      )}
      </div>
    </>
  )
};

export default SubLinkListing;
