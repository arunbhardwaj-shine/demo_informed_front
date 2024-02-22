import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  postData,

} from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import Select from "react-select";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {
  Col,
  Row,

  Tab,
  Tabs,
  ProgressBar,
} from "react-bootstrap";

import "react-toastify/dist/ReactToastify.css";
import "react-activity/dist/library.css";

import { loader } from "../../../loader";

// import QRCode from "react-qr-code";
import QRCode from "qrcode.react";
import moment from "moment";
import DatePicker from "react-datepicker";

const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const LicenseRenew = () => {
  const limit = 24;
  const [flag, setFlag] = useState(0);
  const [types, setTypes] = useState([
    { value: "Online Offer", label: "Online Offer" },
    { value: "Offline Offer", label: "Offline Offer" },
    { value: "Sunshine", label: "Sunshine" },
  ]);

  const location = useLocation();
  const [apiCallStatus, setApiCallStatus] = useState(false);
  const [opening_details, setOpeningDetails] = useState([]);
  

  const navigate = useNavigate();
  const [filterObject, setFilterObject] = useState({});


  const [deletestatus, setDeleteStatus] = useState(false);
  const [page, setPage] = useState(1);

  const [data, setLibraryData] = useState([{
    "id": 4920,
    "title": "sadasd",
    "chapterCount": 2,
    "ibu": "",
    "first_popup": 0,
    "only_first_popup": 0,
    "trail_user_type": "",
    "reader_mandatory": 0,
    "blindType": "undefined",
    "trial_name": "LEXx210",
    "docintelLink": "https://docintel.app/arunp/xBkvCtdW",
    "pdf_sub_title": "",
    "folder_name": "arunp",
    "file_type": "ebook",
    "draft": 0,
    "licensed": 1,
    "allow_download": 0,
    "allow_print": 0,
    "chat_box": 0,
    "allow_share": 0,
    "pdf_thumb": "",
    "country": "",
    "format": "Article",
    "category": "Article",
    "is_global": 0,
    "production_id": 0,
    "sales_id": 0,
    "key_author": "",
    "special_requirment": "New value",
    "lastRomanNumber": -1,
    "cost_center": "",
    "multiple_publisher": "[]",
    "medical": "0",
    "publisherName": "Arun bhardwaj",
    "tags": "",
    "code": "xBkvCtdW",
    "sold_unsold": "",
    "rep_code": "72794389",
    "limit": 1300,
    "docintel_code": "387491344",
    "subLinkAdded": 0,
    "popup_email_content_language": "English",
    "spcFile": "",
    "created": "2024-02-19T05:53:51.000Z",
    "saleName": "",
    "productName": "",
    "productData": "",
    "uploadedDate": "19 February 2024",
    "expireDate": "21 February 2025",
    "linkType": "Online",
    "company": "",
    "production_notes": "",
    "product": "",
    "pdfLinks": 1,
    "linkRelations": 0,
    "previewArticle": "https://docintel.app/arunp/xBkvCtdW_JUFCJTEzJUNEWSVBNCVEOCVEREQ=",
    "coverImage": "https://docintel.s3-eu-west-1.amazonaws.com/cover/default/docintel_new_ebook.png",
    "spc_included": 0
}]);

  const [updateflag, setupdateFlag] = useState(0);
  const [qrState, setQr] = useState({
    value: "",
  });
  const [qrSize, setQrSize] = useState(290);



  const [loadData, setLoadData] = useState({ limit: 24, nextLimit: 0 });
  const BrokenImage =
    "https://docintel.s3-eu-west-1.amazonaws.com/cover/default/default.png";


   
  useEffect(() => {
tabClicked('data-tab',4920)

    getLibraryData(page, filterObject, "");

    if(localStorage.getItem('user_id') == 'b3APser7L8OELDIG8ee2HQ=='){
      const newObj = {value: "Sunshine USA", label: "Sunshine USA"};
      const updatedArray = [...types, newObj];
      setTypes(updatedArray);
    }


  }, []);

  

  const tabClicked = async (event, id) => {
    setFlag(0);
    console.log(event);

    if (event == "data-tab") {
      // setOpeningDetails(normal_data);

        let normal_data = opening_details;
        try {
          let body = {
            pdfId: [id],
          };
          const res = await postData(ENDPOINT.LIBRARYSTATS, body);
          if (res?.data?.data?.[0]) {
            let new_data = res?.data?.data?.[0];
            normal_data.push(new_data);
            setOpeningDetails(normal_data);
            setFlag(flag + 1);
          }
        } catch (err) {
          console.log(err);
        }
      
    }
  };
  const getLibraryData = async (page, obj, search="", load = 0) => {
    try {
      if (load == 0) {
        loader("show");
      } else {
      }
      setApiCallStatus(false);
      let data = {
        user_id: localStorage.getItem("user_id"),
        page: page,
        search: search,
        type: "",
        limit: limit,
        license: 1,
      };

      let body = { ...data, ...obj };

      const res = await postData(ENDPOINT.LIBRARY, body);

      let apiData = [];
      if (res?.data?.data?.library?.length) {
        const totalData =
          res.data?.data?.library?.length >= 24
            ? 24
            : res.data.data.library?.length;
        apiData = res?.data?.data?.library?.slice(0, totalData);

        if (res?.data?.data?.library?.length > 24) {
          setLoadData({ ...loadData, nextLimit: 24 });
        }
      }
      setApiCallStatus(true);
      loader("hide");

    } catch (err) {
      console.log("err");
      loader("hide");
    }
  };


 

  function LinkWithTooltip({ id, children, href, tooltip }) {
    return (
      <OverlayTrigger
        overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
        placement="top"
        delayShow={300}
        delayHide={150}
      >
        <a href={href}>{children}</a>
      </OverlayTrigger>
    );
  }

 





  const imageOnError = (event) => {
    event.currentTarget.src = BrokenImage;
    event.currentTarget.className = "error";
  };



  const changeFormatForPrint = (value) => {
    let data = "";
    if (value?.allow_print) {
      data += "Print | ";
    }
    if (value?.allow_download) {
      data += "Download | ";
    }
    if (value?.allow_share) {
      data += "Share | ";
    }
    if (value?.chat_box) {
      data += "Request | ";
    }
    if (data) {
      // data = data.replace(/^,|,$/g, "");
      data = data.trim().slice(0, -1);
    } else {
      data = "N/A";
    }

    return data;
  };
  const [userInputs, setCreateLibraryInputs] = useState({
    expDatetime: new Date(
      moment(new Date(), "MM/DD/YYYY").add("years", 1).format("MM/DD/YYYY")
      
    ),
    limit: "",
  });
  const handleChange = (e, isSelectedName) => {
    setCreateLibraryInputs({
      ...userInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e
        : e?.target?.value,
    });
  };
  const limitFieldRef = useRef(null);
  const [error, setError] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const renewButtonClicked = async (e) => {
    loader("show");
  
    let err = {};
    const { limit, expDatetime, specialRequirement } = userInputs;
  
    try {
      if (!limit) {
        err.limit = "Limit is required";
      } else if (limit < 0) {
        err.limit = "Limit must be greater than or equal to 0";
      }
  
      setError(err);
  
      if (Object.keys(err).length) {
        return;
      }
  
      const formattedExpDatetime = expDatetime
        ? moment(expDatetime).format("YYYY/MM/DD")
        : "";
  
      const payload = {
        pdfId: 5444,
        limit,
        expDatetime: formattedExpDatetime,
        specialRequirement,
      };
  
      const res = await postData(ENDPOINT.RENEWLICENSE, {
        user_id: localStorage.getItem("user_id"),
        ...payload,
      });
  
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      loader("hide"); 
    }
  };
  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header sticky">
              <div className="page-title d-flex">
                <Link
                  className="btn btn-primary btn-bordered back-btn"
                  to="/license-create"
                >
                  <svg
                    width="14"
                    height="24"
                    viewBox="0 0 14 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z"
                      fill="#97B6CF"
                    />
                  </svg>
                </Link>
                <h2>Renew</h2>
              </div>
          
            </div>
            <QRCode
              style={{ display: "none" }}
              id="qr-gen"
              value={qrState?.value}
              size={qrSize}
              level={qrState?.level}
              includeMargin={true}
            />


            <div className="library-content-box-layuot">
              <>
               
                      <>
                        <div className="doc-content-main-box col">
                          <div className="doc-content-header">
                            <div className="doc-content-header-logo">
                              <a href="#">
                                <img
                                  alt="doc-logo"
                                  src={data?.coverImage}
                                  onError={imageOnError}
                                  style={{ width: "67px" }}
                                />
                              </a>
                            </div>
                            <div className="doc-content">
                              <h5>{data?.title}</h5>
                              <h6>
                                {data?.pdf_sub_title
                                  ? data.pdf_sub_title
                                  : data?.folder_name}
                              </h6>
                              <p>{data?.key_author}</p>
                              <div className="select-tags">
                                {data?.tags?.length
                                  ? JSON.parse(data.tags)?.map((data) => {
                                      return <div>{data}</div>;
                                    })
                                  : ""}
                              </div>
                            </div>
                            <div className="tabs-data">
                          
                          
                          <div
                 
                            className="flex-column justify-content-between"
                          >
                            <div className="data-main-box tab-panel d-flex flex-column justify-content-between">
                              <ul className="tab-mail-list data">
                                <li>
                                  <h6 className="tab-content-title">
                                    Openings (total){" "}
                                    <LinkWithTooltip tooltip="Number of opening counts for specific article.">
                                      <img
                                        src={
                                          path_image +
                                          "info_circle_icon.svg"
                                        }
                                        alt="refresh-btn"
                                      />
                                    </LinkWithTooltip>
                                  </h6>
                                  <div className="data-progress limited">
                                    <ProgressBar
                                      variant={
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        ) !== -1
                                          ? opening_details[
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              )
                                            ].opening
                                            ? "success"
                                            : "default"
                                          : "default"
                                      }
                                      now={
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        ) !== -1
                                          ? opening_details[
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              )
                                            ].opening
                                          : "100"
                                      }
                                      label={
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        ) !== -1
                                          ? opening_details[
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              )
                                            ].opening
                                          : "Loading"
                                      }
                                    />
                                  </div>
                                </li>
                                
                                {
                                  data?.lastRomanNumber == 2 || data?.lastRomanNumber == 3  ?
                                  (
                                    <>
                                    <li className="d-flex align-center">
                                      <h6 className="tab-content-title">
                                        Unique reader (total)
                                        <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on IP address, device &amp; browser).">
                                          <img
                                            src={
                                              path_image +
                                              "info_circle_icon.svg"
                                            }
                                            alt="refresh-btn"
                                          />
                                        </LinkWithTooltip>
                                      </h6>
                                      <div className="data-progress send">
                                        <ProgressBar
                                          variant={
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) => el.pdfId == data?.id
                                                  )
                                                ]?.unique > 0
                                                ? "warning"
                                                : "default"
                                              : "default"
                                          }
                                          now={
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? (opening_details[
                                                  opening_details.findIndex(
                                                    (el) => el.pdfId == data?.id
                                                  )
                                                ]?.unique) 
                                              : "100"
                                          }
                                          label={
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) => el.pdfId == data?.id
                                                  )
                                                ]?.unique
                                              : "Loading"
                                          }
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Article Usage
                                        <LinkWithTooltip tooltip="Number of usage on the content.">
                                          <img
                                            src={
                                              path_image +
                                              "info_circle_icon.svg"
                                            }
                                            alt="refresh-btn"
                                          />
                                        </LinkWithTooltip>
                                      </h6>
                                      <div className="data-progress">
                                        <ProgressBar
                                          variant={
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ]?.pinReaders
                                                ? "pin_usage"
                                                : "default"
                                              : "default"
                                          }
                                          now={
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? (opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ]?.pinReaders /
                                                  opening_details[
                                                    opening_details.findIndex(
                                                      (el) =>
                                                        el.pdfId == data?.id
                                                    )
                                                  ]?.limit) *
                                                100
                                              : "100"
                                          }
                                          label={
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ].pinReaders
                                              : "Loading"
                                          }
                                        />
                                        <span>
                                          Agreed Limit :&nbsp;
                                          <strong>
                                            {opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) => el.pdfId == data?.id
                                                  )
                                                ]?.limit == 1000
                                                ? "Unlimited"
                                                : opening_details[
                                                    opening_details.findIndex(
                                                      (el) =>
                                                        el.pdfId == data?.id
                                                    )
                                                  ]?.limit
                                              : "Unlimited"}
                                          </strong>
                                        </span>
                                      </div>
                                      <span className="total-left">
                                          {opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          ) !== -1
                                            ? opening_details[
                                                opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                )
                                              ]?.limit == 1000
                                              ? null
                                              : opening_details[
                                                  opening_details.findIndex(
                                                    (el) => el.pdfId == data?.id
                                                  )
                                                ]?.limit -
                                                opening_details[
                                                  opening_details.findIndex(
                                                    (el) => el.pdfId == data?.id
                                                  )
                                                ]?.pinReaders
                                            : null}

                                          {opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          ) !== -1 ? (
                                            opening_details[
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              )
                                            ]?.limit != 1000 ? (
                                              <small>Left</small>
                                            ) : null
                                          ) : null}
                                        </span>
                                    </li>
                                    </>
                                  )
                                   : 
                                    <li className="d-flex align-center">
                                      <h6 className="tab-content-title">
                                        Unique reader (total)
                                        <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on IP address, device &amp; browser).">
                                          <img
                                            src={
                                              path_image +
                                              "info_circle_icon.svg"
                                            }
                                            alt="refresh-btn"
                                          />
                                        </LinkWithTooltip>
                                      </h6>
                                      <div className="data-progress send">
                                        <ProgressBar
                                          variant={
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) => el.pdfId == data?.id
                                                  )
                                                ]?.unique
                                                ? "warning"
                                                : "default"
                                              : "default"
                                          }
                                          now={
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? (opening_details[
                                                  opening_details.findIndex(
                                                    (el) => el.pdfId == data?.id
                                                  )
                                                ]?.unique /
                                                  opening_details[
                                                    opening_details.findIndex(
                                                      (el) =>
                                                        el.pdfId == data?.id
                                                    )
                                                  ]?.limit) *
                                                100
                                              : "100"
                                          }
                                          label={
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) => el.pdfId == data?.id
                                                  )
                                                ]?.unique
                                              : "Loading"
                                          }
                                        />
                                        <span>
                                          Agreed Limit :&nbsp;
                                          <strong>
                                            {" "}
                                            {opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) => el.pdfId == data?.id
                                                  )
                                                ]?.limit == 1000
                                                ? "unlimited"
                                                : opening_details[
                                                    opening_details.findIndex(
                                                      (el) =>
                                                        el.pdfId == data?.id
                                                    )
                                                  ]?.limit
                                              : "unlimited"}
                                          </strong>
                                        </span>
                                      </div>
                                      <span className="total-left">
                                        {opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        ) !== -1
                                          ? opening_details[
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              )
                                            ]?.limit == 1000
                                            ? null
                                            : opening_details[
                                                opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                )
                                              ]?.limit -
                                              opening_details[
                                                opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                )
                                              ]?.unique
                                          : null}

                                        {opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        ) !== -1 ? (
                                          opening_details[
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            )
                                          ]?.limit != 1000 ? (
                                            <small>Left</small>
                                          ) : null
                                        ) : null}
                                      </span>
                                    </li>
                                }

                                <li>
                                  <h6 className="tab-content-title">
                                    Registered readers
                                    <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content.">
                                      <img
                                        src={
                                          path_image +
                                          "info_circle_icon.svg"
                                        }
                                        alt="refresh-btn"
                                      />
                                    </LinkWithTooltip>
                                  </h6>
                                  <div className="data-progress">
                                    <ProgressBar
                                      variant={
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        ) !== -1
                                          ? opening_details[
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              )
                                            ]?.reader
                                            ? "danger"
                                            : "default"
                                          : "default"
                                      }
                                      now={
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        ) !== -1
                                          ? (opening_details[
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              )
                                            ]?.reader /
                                              opening_details[
                                                opening_details.findIndex(
                                                  (el) =>
                                                    el.pdfId == data?.id
                                                )
                                              ]?.limit) *
                                            100
                                          : "100"
                                      }
                                      label={
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        ) !== -1
                                          ? opening_details[
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              )
                                            ].reader
                                          : "Loading"
                                      }
                                    />
                                  </div>
                                </li>

                                <li>
                                  <h6 className="tab-content-title">
                                    SubLinks
                                    <LinkWithTooltip tooltip="Number of sublinks with content.">
                                      <img
                                        src={
                                          path_image +
                                          "info_circle_icon.svg"
                                        }
                                        alt="refresh-btn"
                                      />
                                    </LinkWithTooltip>
                                  </h6>
                                  <div className="data-progress">
                                    <ProgressBar
                                      variant={
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        ) !== -1
                                          ? opening_details[
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              )
                                            ]?.subLink
                                            ? "sublink"
                                            : "default"
                                          : "default"
                                      }
                                      now={
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        ) !== -1
                                          ? (opening_details[
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              )
                                            ]?.subLink /
                                              opening_details[
                                                opening_details.findIndex(
                                                  (el) =>
                                                    el.pdfId == data?.id
                                                )
                                              ]?.limit) *
                                            100
                                          : "100"
                                      }
                                      label={
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        ) !== -1
                                          ? opening_details[
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              )
                                            ].subLink
                                          : "Loading"
                                      }
                                    />
                                  </div>
                                </li>

                                {data?.allow_print ? (
                                  <li>
                                    <h6 className="tab-content-title">
                                      Printed
                                      <LinkWithTooltip tooltip="Number of HCPs who have print the content.">
                                        <img
                                          src={
                                            path_image +
                                            "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h6>
                                    <div className="data-progress">
                                      <ProgressBar
                                        variant={
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          ) !== -1
                                            ? opening_details[
                                                opening_details.findIndex(
                                                  (el) =>
                                                    el.pdfId == data?.id
                                                )
                                              ]?.print
                                              ? "print"
                                              : "default"
                                            : "default"
                                        }
                                        now={
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          ) !== -1
                                            ? (opening_details[
                                                opening_details.findIndex(
                                                  (el) =>
                                                    el.pdfId == data?.id
                                                )
                                              ]?.print /
                                                opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ]?.limit) *
                                              100
                                            : "100"
                                        }
                                        label={
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          ) !== -1
                                            ? opening_details[
                                                opening_details.findIndex(
                                                  (el) =>
                                                    el.pdfId == data?.id
                                                )
                                              ].print
                                            : "Loading"
                                        }
                                      />
                                    </div>
                                  </li>
                                ) : null}

                                {data?.allow_download ? (
                                  <li>
                                    <h6 className="tab-content-title">
                                      Downloaded
                                      <LinkWithTooltip tooltip="Number of HCPs who have download the content.">
                                        <img
                                          src={
                                            path_image +
                                            "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h6>
                                    <div className="data-progress">
                                      <ProgressBar
                                        variant={
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          ) !== -1
                                            ? opening_details[
                                                opening_details.findIndex(
                                                  (el) =>
                                                    el.pdfId == data?.id
                                                )
                                              ]?.download
                                              ? "download"
                                              : "default"
                                            : "default"
                                        }
                                        now={
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          ) !== -1
                                            ? (opening_details[
                                                opening_details.findIndex(
                                                  (el) =>
                                                    el.pdfId == data?.id
                                                )
                                              ]?.download /
                                                opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ]?.limit) *
                                              100
                                            : "100"
                                        }
                                        label={
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          ) !== -1
                                            ? opening_details[
                                                opening_details.findIndex(
                                                  (el) =>
                                                    el.pdfId == data?.id
                                                )
                                              ].download
                                            : "Loading"
                                        }
                                      />
                                    </div>
                                  </li>
                                ) : null}
                              </ul>
                            </div>
                          </div>
                 
                       
                            <div className="tab-panel">
                              <ul className="tab-mail-list">
                                {localStorage.getItem("group_id") == 2 && (
                                  <>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Sales person
                                      </h6>
                                      <h6>
                                        {data?.saleName
                                          ? data.saleName
                                          : "N/A"}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Production person
                                      </h6>
                                      <h6>
                                        {data?.productName
                                          ? data.productName
                                          : "N/A"}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Client product
                                      </h6>
                                      <h6>
                                        {data?.product
                                          ? data.product
                                          : "N/A"}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Country
                                      </h6>
                                      <h6>
                                        {data?.country
                                          ? data.country
                                          : "N/A"}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Cost Center
                                      </h6>
                                      <h6>
                                        {data?.cost_center &&
                                        data?.cost_center != 0
                                          ? data.cost_center
                                          : "N/A"}
                                      </h6>
                                    </li>

                                    <li>
                                      <h6 className="tab-content-title">
                                        Client name
                                      </h6>
                                      <h6>
                                        {data?.company +
                                          " " +
                                          data?.product +
                                          " " +
                                          data?.country}
                                      </h6>
                                    </li>
                                  </>
                                )}
                                <li>
                                  <h6 className="tab-content-title">
                                    Usage limit
                                  </h6>
                                  <h6>
                                    {data?.limit > 0
                                      ? data?.limit
                                      : "Unlimited"}
                                  </h6>
                                </li>

                                <li>
                                  <h6 className="tab-content-title">
                                    Allow
                                  </h6>
                                  <h6>{changeFormatForPrint(data)}</h6>
                                </li>
                                <li>
                                  <h6 className="tab-content-title">
                                    Link type
                                  </h6>
                                  <h6>{data?.linkType}</h6>
                                </li>
                          
                                <li>
                                  <h6 className="tab-content-title">
                                    Upload date
                                  </h6>
                                  <h6>{data?.uploadedDate}</h6>
                                </li>
                                <li>
                                  <h6 className="tab-content-title">
                                    Expiration date
                                  </h6>
                                  <h6>
                                    {data?.expireDate
                                      ? data.expireDate
                                      : "N/A"}
                                  </h6>
                                </li>
                              </ul>
                            </div>
                       
                     
                      </div>
                          </div>
                         
                        </div>
                      </>
              
                
              </>
              <div id="renewModal" >
        <div>
          <h5 className="modal-title" id="staticBackdropLabel">
          License Renewal
          </h5>

        </div>
        <div>
          <div className="create-change-content">
            <div className="form_action">
              <div className="form-group">
                <label htmlFor="">
                  Set limit of usage <span>*</span>
                </label>
                <input
                  type="number"
                  name="limit"
                  min="0"
                  ref={limitFieldRef}
                  className={
                    error?.limit ? "form-control error" : "form-control"
                  }
                  placeholder="“0” value means unlimited limit"
                  onChange={handleChange}
                />
                {error?.limit ? (
                  <div className="login-validation">{error?.limit}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="">Expiration date</label>
                <DatePicker
                  selected={
                    userInputs?.expDatetime
                      ? new Date(userInputs?.expDatetime)
                      : new Date(
                          moment(new Date(), "MM/DD/YYYY")
                            .add("years", 1)
                            .format("MM/DD/YYYY")
                        )
                  }
                  name="expDatetime"
                  onChange={(e) => handleChange(e, "expDatetime")}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  minDate={currentDate}
                />
              </div>
                <div className="form-group">
                  <label htmlFor="">Invoice notes</label>
                  <textarea
                    className="form-control"
                    id="formControlTextarea"
                    onChange={(e) =>
                      handleChange(e?.target.value, "specialRequirement")
                    }
                    rows="5"
                    placeholder="Please type your notes here..."
                  ></textarea>
                </div>
              <button
                className="btn btn-primary btn-filled next"
                onClick={renewButtonClicked}
              >
                Renew License
              </button>
            </div>
          </div>
        </div>
      </div>
            </div>

          </Row>
        </div>
      </Col>

    </>
  );
};

export default LicenseRenew;
