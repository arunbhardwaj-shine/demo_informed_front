import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { surveyAxiosInstance } from "./CommonFunctions/CommonFunction";
import { toast } from "react-toastify";
import {QRCodeCanvas} from "qrcode.react";
import { analyticButtonClicked } from "./CommonFunctions/CommonFunction";
import { surveyEndpoints } from "./SurveyEndpoints/SurveyEndpoints";
 

const SurveySublinkListing = ({ survey_id, render, count }) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const {FETCH_SURVEY_SUBLINK}=surveyEndpoints
const navigate=useNavigate();
  const [sectionLoader, setSectionLoader] = useState(false);
  const [subLinkData, setSubLinkData] = useState([]);
  const [qrState, setQr] = useState({ value: "" });

  useEffect(() => {
    getSubLinkListingData(survey_id);
  }, [survey_id, count, render, count]);

  const getSubLinkListingData = async (survey_id) => {
    if (typeof survey_id !== "undefined") {
      setSubLinkData([]);
      try {
        // setSectionLoader(true);
        // loader('show');
        const res = await surveyAxiosInstance.post(
          FETCH_SURVEY_SUBLINK,
          { survey_id }
        );

        if (res.status === 200) {
          setSubLinkData(res?.data?.data);
        }

        // setSectionLoader(false);
        // loader('hide')
      } catch (err) {
        console.log("--err", err);
        // setSectionLoader(false);
         
      }
    }
   
  };

  const setDownloadLink = (link, title = null) => {
    // setSectionLoader(true);
    setQr({ ...qrState, value: link });
    setTimeout(function () {
      downloadQRCode(title);
    }, 500);
  };

  const downloadQRCode = (title = null) => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = title ? title+".png" : `QR-code.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setSectionLoader(false);
  };

 

  return (
    <>
      <div className="sublink_right_block">
        {sectionLoader ? (
          <div
            className={"loader " + (sectionLoader ? "show" : "")}
            id="custom_loader"
          >
            <div className="loader_show">
              <span className="loader-view"> </span>
            </div>
          </div>
        ) : (
          ""
        )}
        {typeof subLinkData === "undefined" || subLinkData.length == 0 ? (
          <div className="no-sublink">
            <img src={path_image + "dummy-sublink.png"} alt="" />
          </div>
        ) : (
          <>
            {subLinkData?.map((data, index) => {
              return (
                <>
                  <div className="sublink-list">
                    <div className="sublink-listed-view d-flex align-items-center">
                      <div className="sublink-listed-view-block">
                        <h5>{data?.identifier}</h5>
                        <h6>{data?.delivery}</h6>
                        <div className="sublink-list-link">
                          <a
                            href={`https://survey.docintel.app/survey_demo?Utmde=${data.unique_code}`}
                            target="_blank" // Optional: Opens the link in a new tab
                            rel="noopener noreferrer" // Optional: Recommended for security reasons
                          >
                            https://survey.docintel.app/survey_demo?Utmde=
                            {data.unique_code}
                          </a>
                          <span
                            className="copy-content"
                            onClick={() => {
                              toast.success("content copied to the clipboard!");
                              window.navigator.clipboard.writeText(
                                `https://survey.docintel.app/survey_demo?Utmde=${data.unique_code}`
                              );
                            }}
                          >
                            <img
                              src={path_image + "copy-content.svg"}
                              alt="Copy"
                            />
                          </span>
                        </div>
                      </div>
                      <div
                        className="sublink-qr"
                        onClick={(e) =>
                          setDownloadLink(
                            `https://survey.docintel.app/survey_demo?Utmde=${data.unique_code}&dl=QR`,
                            data?.identifier
                          )
                        }
                      >
                        <div className="sublink-qr-download">
                          <img src={path_image + "qr-code-img.png"} alt="" />
                          <div className="sublink-download">
                            <img src={path_image + "download.svg"} alt="" />
                          </div>
                        </div>
                      </div>
                      <Button
                        className={"btn-bordered send-new"}
                        onClick={() => analyticButtonClicked(data,navigate,"true")}
                      >
                        Analytics
                      </Button>

                       
                    </div>
                  </div>
                  <QRCodeCanvas
                    style={{ display: "none" }}
                    id="qr-gen"
                    value={qrState?.value}
                    size={290}
                    level={"H"}
                    includeMargin={true}
                  />
                </>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default SurveySublinkListing;
