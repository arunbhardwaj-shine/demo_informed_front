import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  postData,
  resetStats,
} from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import Select from "react-select";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Col, Row, ProgressBar, Form } from "react-bootstrap";

import "react-toastify/dist/ReactToastify.css";
import "react-activity/dist/library.css";

import { loader } from "../../../loader";
import { toast } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";
import { popup_alert } from "../../../popup_alert";
import CommonConfirmModel from "../../../Model/CommonConfirmModel";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const LicenseRenew = () => {  
  const navigate = useNavigate();
  const [flag, setFlag] = useState(0);
  const location = useLocation();
  const [openingDetails, setOpeningDetails] = useState([]);
  // const [oldOpeningDetails, setOldOpeningDetails] = useState([]);
  const [data, setData] = useState(location?.state?.data);
  const BrokenImage =
    "https://docintel.s3-eu-west-1.amazonaws.com/cover/default/default.png";
  const dropdownData = [
    { value: "reset", label: "Reset usage data and set a new limit" },
    { value: "update", label: "Add more quantity to existing usage." },
    { value: "add", label: "Add higher quantity to previous limit of use" },
  ];
  const [selectedValue, setSelectedValue] = useState("");
  const limitFieldRef = useRef(null);
  const [error, setError] = useState({});
  const currentDate = new Date();
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [resetDataId, setResetDataId] = useState("");
  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });
  const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => {});

  const [userInputs, setCreateLibraryInputs] = useState({
    expDatetime: new Date(
      moment(new Date(), "MM/DD/YYYY").add("years", 1).format("MM/DD/YYYY")
    ),
    limit: "",
    specialRequirement: "",
  });
  useEffect(() => {
    if (!data) {
      navigate("/license/renew-listing");
    } else {
      getLibraryStats("data-tab", data?.id);
    }
  }, []);

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

  const handleChange = (e, isSelectedName) => {
    const updatedInputs = { ...userInputs };
    if (isSelectedName === "expDatetime") {
      updatedInputs.expDatetime = e;
    } else {
      updatedInputs[isSelectedName] = e?.target?.value;
    }
    setCreateLibraryInputs(updatedInputs);
  };

  const copyToClipboard = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      toast.success("content copied to the clipboard!");
    } else {
      unsecuredCopyToClipboard(content);
    }
  };
  const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    // textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success("content copied to the clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  };
  const getLibraryStats = async (event, id) => {
    setFlag(0);

    // let normal_data = openingDetails;

    let body = {
      pdfId: [id],
    };
    const res = await postData(ENDPOINT.LIBRARYSTATS, body);
    if (res?.data?.data?.[0]) {
      let newData = res?.data?.data?.[0];
      // normal_data.push(newData);
      // setOldOpeningDetails(openingDetails?.length ? openingDetails : [newData]);
      setOpeningDetails([newData]);
      setFlag(flag + 1);
    }
  };

  const renewButtonClicked = async () => {
    try {
      hideConfirmationModal();

      let { limit, expDatetime, specialRequirement } = userInputs;
      limit = parseInt(limit);

      const formattedExpDatetime = expDatetime
        ? moment(expDatetime).format("YYYY/MM/DD")
        : "";

      loader("show");

      if (selectedValue === "update") {
        limit += openingDetails[0]?.unique;
      } else if (selectedValue === "add") {
        limit += openingDetails[0]?.limit;
      }

      const payload = {
        pdfId: data?.id,
        limit,
        expDatetime: formattedExpDatetime,
        specialRequirement: specialRequirement,
      };

   await postData(ENDPOINT.RENEWLICENSE, {
        user_id: localStorage.getItem("user_id"),
        ...payload,
      });



      await getLibraryStats("data-tab", data?.id);
      resetCreateLibraryInputs()
      popup_alert({
        visible: "show",
        message: "Article renewed successfully!",
        type: "success",
        redirect: "/license/renew-listing",
      });
      
    } catch (error) {
      console.error("An error occurred:", error);
      return; // Exit the function on error
    } finally {
      loader("hide");
    }
  };
  const resetCreateLibraryInputs =()=>{
    setCreateLibraryInputs({
      expDatetime: new Date(
        moment(new Date(), "MM/DD/YYYY").add("years", 1).format("MM/DD/YYYY")
      ),
      limit: "",
      specialRequirement: "",

    });
  }
  const showConfirmationPopup = (stateMsg, id) => {
    const { limit } = userInputs;
    const parsedLimit = parseInt(limit);
    const err = {};
    if (parsedLimit ===undefined || isNaN(parsedLimit) ) {
      err.limit = "Limit is required";
    } else if (parsedLimit < 0) {
      err.limit = "Limit must be greater than or equal to 0";
    }
    setError(err);

    if (Object.keys(err).length) {
      return;
    }

    const resetDataId = id;
    let setCommonConfirmModelFunArg, popupMessage;

    if (stateMsg === "reset") {
      setCommonConfirmModelFunArg = resetCollection;
      popupMessage = {
        message1: " You are about to reset the collected data.",
        message2: "Are you sure you want to do this?",
        footerButton: "Delete all collected data",
      };
    } else {
      setCommonConfirmModelFunArg = renewButtonClicked;
      popupMessage = {
        message1: "You are about to change the limit.",
        message2: "Are you sure you want to do this?",
        footerButton: "Yes, please proceed.",
      };
    }

    setResetDataId(resetDataId);
    setCommonConfirmModelFun(() => setCommonConfirmModelFunArg);
    setPopupMessage(popupMessage);
    setConfirmationPopup(!confirmationPopup);
  };

  const resetCollection = async (pdfId) => {
    try {
      loader("show");
      hideConfirmationModal();

      const userId = localStorage.getItem("user_id");
      await resetStats(ENDPOINT.LIBRARYRESETSTATS, { user_id: userId, pdfId });

      const libDataIndex = openingDetails.findIndex((el) => el.pdfId === pdfId);
      if (libDataIndex !== -1) {
        await renewButtonClicked();
      } else {
        loader("hide");
        popup_alert({
          visible: "show",
          message: "Something went wrong, Please try again.",
          type: "error",
          redirect: "",
        });
      }
    } catch (error) {
      console.log("Error:", error);
      loader("hide");
    }
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };
  const downloadOldCollectedData = async () => {
    try {
      loader("show");
      let durl =
        "https://webinar.informed.pro/Analytics/download_excel_new/" +
        data?.id;
      const response = await axios.get(durl, { responseType: "blob" });
      // .then((response) => {
      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);
      // Create a link and click it to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data?.title}_collected_data.xlsx`;
      link.click();
      // Clean up the temporary URL
      window.URL.revokeObjectURL(url);
      // })
      // .catch((error) => {
      //   console.error('Error downloading the Excel file:', error);
      // });
      loader("hide");
    } catch (err) {
      console.log(err);
      loader("hide");
    }
  };

  return (
    <>
      <Col className="right-sidebar custom-change licence-renew">
        <div className="custom-container">
          <Row>
            <div className="top-header sticky">
              <div className="page-title d-flex justify-content-between">
                <h2>Renew</h2>
                <div className="clear-search d-flex align-items-center">
                  <button
                    className="btn print"
                    title="Download data"
                    onClick={() => {
                      downloadOldCollectedData();
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z"
                        fill="#0066BE"
                      />
                      <path
                        d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                        fill="#0066BE"
                      />
                    </svg>
                  </button>
                  <Link
                    to="/license/renew-listing"
                    //   state={{ pdfid: data.id }}
                    state={{ data: "renew" }}
                    className="footer-btn"
                  >
                    <button className="btn btn-primary btn-bordered next">
                      Close
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="library-content-box-layuot d-flex">
              <div className="renew-left-block data-collected d-flex">
                <div className="doc-content-main-box col">
                  <div className="doc-content-header">
                    <div className="doc-content-header-logo">
                      {/* <a href="#"> */}
                        <img
                          alt="doc-logo"
                          src={data?.coverImage}
                          onError={imageOnError}
                          style={{ width: "67px" }}
                        />
                      {/* </a> */}
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
                  </div>
                  <div className="tabs-data">
                    {/* <div className="flex-column justify-content-between"> */}

                    {/* </div> */}

                    <div className="tab-panel d-flex flex-column justify-content-between">
                      <div className="tab-content-links">
                        <a
                          href={data?.docintelLink}
                          className="doc-link"
                          target="_blank"
                        >
                          {data?.docintelLink}
                        </a>
                        <span
                          className="copy-content"
                          onClick={() => {
                            copyToClipboard(data?.docintelLink);
                          }}
                        >
                          <img
                            src={path_image + "copy-content.svg"}
                            alt="Copy"
                          />
                        </span>
                      </div>
                      <ul className="tab-mail-list">
                        {localStorage.getItem("group_id") == 2 && (
                          <>
                            <li>
                              <h6 className="tab-content-title">
                                Sales person
                              </h6>
                              <h6>{data?.saleName ? data.saleName : "N/A"}</h6>
                            </li>
                            <li>
                              <h6 className="tab-content-title">
                                Production person
                              </h6>
                              <h6>
                                {data?.productName ? data?.productName : "N/A"}
                              </h6>
                            </li>
                            <li>
                              <h6 className="tab-content-title">Company</h6>
                              <h6>{data?.company ? data?.company : "N/A"}</h6>
                            </li>

                            <li>
                              <h6 className="tab-content-title">
                                Client product
                              </h6>
                              <h6>{data?.product ? data?.product : "N/A"}</h6>
                            </li>
                            <li>
                              <h6 className="tab-content-title">Country</h6>
                              <h6>{data?.country ? data?.country : "N/A"}</h6>
                            </li>
                            <li>
                              <h6 className="tab-content-title">Reseller</h6>
                              <h6>{data?.reseller ? data?.reseller : "N/A"}</h6>
                            </li>
                            <li>
                              <h6 className="tab-content-title">Cost Center</h6>
                              <h6>
                                {data?.cost_center && data?.cost_center != 0
                                  ? data.cost_center
                                  : "N/A"}
                              </h6>
                            </li>

                            {/* <li>
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
                                  </li> */}
                          </>
                        )}

                        <li>
                          <h6 className="tab-content-title">Enable</h6>
                          <h6>{data?.enable ? data?.enable : "N/A"}</h6>
                        </li>
                        <li>
                          <h6 className="tab-content-title">Expiration date</h6>
                          <h6>{data?.expireDate ? data?.expireDate : "N/A"}</h6>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="data-main-box d-flex flex-column">
                  <h6>Collected Data</h6>
                  <ul className="tab-mail-list data">
                    {data?.lastRomanNumber == 2 ||
                    data?.lastRomanNumber == 3 ? (
                      <>
                        <li className="d-flex align-center">
                          <h6 className="tab-content-title">
                            Unique reader (total)
                            <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on IP address, device &amp; browser).">
                              <img
                                src={path_image + "info_circle_icon.svg"}
                                alt="refresh-btn"
                              />
                            </LinkWithTooltip>
                          </h6>
                          <div className="data-progress send">
                            <ProgressBar
                              variant={
                                openingDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? openingDetails[
                                      openingDetails.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.unique > 0
                                    ? "warning"
                                    : "default"
                                  : "default"
                              }
                              now={
                                openingDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? openingDetails[
                                      openingDetails.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.unique
                                  : "100"
                              }
                              label={
                                openingDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? openingDetails[
                                      openingDetails.findIndex(
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
                                src={path_image + "info_circle_icon.svg"}
                                alt="refresh-btn"
                              />
                            </LinkWithTooltip>
                          </h6>
                          <div className="data-progress">
                            <ProgressBar
                              variant={
                                openingDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? openingDetails[
                                      openingDetails.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.pinReaders
                                    ? "pin_usage"
                                    : "default"
                                  : "default"
                              }
                              now={
                                openingDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? (openingDetails[
                                      openingDetails.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.pinReaders /
                                      openingDetails[
                                        openingDetails.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.limit) *
                                    100
                                  : "100"
                              }
                              label={
                                openingDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? openingDetails[
                                      openingDetails.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ].pinReaders
                                  : "Loading"
                              }
                            />
                            <span>
                              Agreed Limit :&nbsp;
                              <strong>
                                {openingDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? openingDetails[
                                      openingDetails.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.limit == 1000
                                    ? "Unlimited"
                                    : openingDetails[
                                        openingDetails.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.limit
                                  : "Unlimited"}
                              </strong>
                            </span>
                          </div>
                          <span className="total-left">
                            {openingDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? openingDetails[
                                  openingDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.limit == 1000
                                ? null
                                : openingDetails[
                                    openingDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.limit -
                                  openingDetails[
                                    openingDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.pinReaders
                              : null}

                            {openingDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1 ? (
                              openingDetails[
                                openingDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                )
                              ]?.limit != 1000 ? (
                                <small>Left</small>
                              ) : null
                            ) : null}
                          </span>
                        </li>
                      </>
                    ) : (
                      <li className="d-flex align-center">
                        <h6 className="tab-content-title">
                          Unique reader (total)
                          <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on IP address, device &amp; browser).">
                            <img
                              src={path_image + "info_circle_icon.svg"}
                              alt="refresh-btn"
                            />
                          </LinkWithTooltip>
                        </h6>
                        <div className="data-progress send">
                          <ProgressBar
                            variant={
                              openingDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? openingDetails[
                                    openingDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.unique
                                  ? "warning"
                                  : "default"
                                : "default"
                            }
                            now={
                              openingDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? (openingDetails[
                                    openingDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.unique /
                                    openingDetails[
                                      openingDetails.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.limit) *
                                  100
                                : "100"
                            }
                            label={
                              openingDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? openingDetails[
                                    openingDetails.findIndex(
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
                              {openingDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? openingDetails[
                                    openingDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.limit == 1000
                                  ? "unlimited"
                                  : openingDetails[
                                      openingDetails.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.limit
                                : "unlimited"}
                            </strong>
                          </span>
                        </div>
                        <span className="total-left">
                          {openingDetails.findIndex(
                            (el) => el.pdfId == data?.id
                          ) !== -1
                            ? openingDetails[
                                openingDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                )
                              ]?.limit == 1000
                              ? null
                              : openingDetails[
                                  openingDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.limit -
                                openingDetails[
                                  openingDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.unique
                            : null}

                          {openingDetails.findIndex(
                            (el) => el.pdfId == data?.id
                          ) !== -1 ? (
                            openingDetails[
                              openingDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              )
                            ]?.limit != 1000 ? (
                              <small>Left</small>
                            ) : null
                          ) : null}
                        </span>
                      </li>
                    )}
                    <li>
                      <h6 className="tab-content-title">
                        Openings (total){" "}
                        <LinkWithTooltip tooltip="Number of opening counts for specific article.">
                          <img
                            src={path_image + "info_circle_icon.svg"}
                            alt="refresh-btn"
                          />
                        </LinkWithTooltip>
                      </h6>
                      <div className="data-progress limited">
                        <ProgressBar
                          variant={
                            openingDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? openingDetails[
                                  openingDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ].opening
                                ? "success"
                                : "default"
                              : "default"
                          }
                          now={
                            openingDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? openingDetails[
                                  openingDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ].opening
                              : "100"
                          }
                          label={
                            openingDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? openingDetails[
                                  openingDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ].opening
                              : "Loading"
                          }
                        />
                      </div>
                    </li>

                    <li>
                      <h6 className="tab-content-title">
                        Registered readers
                        <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content.">
                          <img
                            src={path_image + "info_circle_icon.svg"}
                            alt="refresh-btn"
                          />
                        </LinkWithTooltip>
                      </h6>
                      <div className="data-progress">
                        <ProgressBar
                          variant={
                            openingDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? openingDetails[
                                  openingDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.reader
                                ? "danger"
                                : "default"
                              : "default"
                          }
                          now={
                            openingDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? (openingDetails[
                                  openingDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.reader /
                                  openingDetails[
                                    openingDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.limit) *
                                100
                              : "100"
                          }
                          label={
                            openingDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? openingDetails[
                                  openingDetails.findIndex(
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
                            src={path_image + "info_circle_icon.svg"}
                            alt="refresh-btn"
                          />
                        </LinkWithTooltip>
                      </h6>
                      <div className="data-progress">
                        <ProgressBar
                          variant={
                            openingDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? openingDetails[
                                  openingDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.subLink
                                ? "sublink"
                                : "default"
                              : "default"
                          }
                          now={
                            openingDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? (openingDetails[
                                  openingDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.subLink /
                                  openingDetails[
                                    openingDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.limit) *
                                100
                              : "100"
                          }
                          label={
                            openingDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? openingDetails[
                                  openingDetails.findIndex(
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
                              src={path_image + "info_circle_icon.svg"}
                              alt="refresh-btn"
                            />
                          </LinkWithTooltip>
                        </h6>
                        <div className="data-progress">
                          <ProgressBar
                            variant={
                              openingDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? openingDetails[
                                    openingDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.print
                                  ? "print"
                                  : "default"
                                : "default"
                            }
                            now={
                              openingDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? (openingDetails[
                                    openingDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.print /
                                    openingDetails[
                                      openingDetails.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.limit) *
                                  100
                                : "100"
                            }
                            label={
                              openingDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? openingDetails[
                                    openingDetails.findIndex(
                                      (el) => el.pdfId == data?.id
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
                              src={path_image + "info_circle_icon.svg"}
                              alt="refresh-btn"
                            />
                          </LinkWithTooltip>
                        </h6>
                        <div className="data-progress">
                          <ProgressBar
                            variant={
                              openingDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? openingDetails[
                                    openingDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.download
                                  ? "download"
                                  : "default"
                                : "default"
                            }
                            now={
                              openingDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? (openingDetails[
                                    openingDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.download /
                                    openingDetails[
                                      openingDetails.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.limit) *
                                  100
                                : "100"
                            }
                            label={
                              openingDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? openingDetails[
                                    openingDetails.findIndex(
                                      (el) => el.pdfId == data?.id
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
              <div id="renewModal" class="create-change-content">
                <div className="form_action">
                  <Form className="product-unit d-flex justify-content-between align-items-center">
                    <div className="form-label">
                      <h5 className="modal-title" id="staticBackdropLabel">
                        Please select what the new limits will be
                      </h5>
                      <Select
                        options={dropdownData}
                        placeholder="Select here"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        onChange={(value) => {
                          resetCreateLibraryInputs()
                          setSelectedValue(value?.value);
                        }}
                      />
                    </div>
                    {selectedValue && (
                      <>
                        <div className="renew-license-block">
                          <div className="form-group label">
                            <label>
                             {selectedValue=="update"?"Add more Unique Readers on top of the those that have already read, while keeping the old usage in analytics.":selectedValue=="add"?"Sets a higher limit of usage (Unique Readers) on top of the previous limit while keeping all old usage analytics." :"Deleting all the current data and setting a new fresh limit with zero Unique Readers, openings or other data."}
                            </label>
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Set new expiration date</label>
                            <DatePicker
                              selected={
                                userInputs.expDatetime
                                  ? new Date(userInputs.expDatetime)
                                  : new Date(
                                      moment(new Date())
                                        .add(1, "years")
                                        .format("MM/DD/YYYY")
                                    )
                              }
                              name="expDatetime"
                              onChange={(date) =>
                                handleChange(date, "expDatetime")
                              }
                              dateFormat="dd/MM/yyyy"
                              className="form-control"
                              minDate={currentDate}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Set new limit of Unique Readers</label>
                            <input
                              type="number"
                              name="limit"
                              min="0"
                              ref={limitFieldRef}
                              className={
                                error.limit
                                  ? "form-control error"
                                  : "form-control"
                              }
                              placeholder="“0” value means changing to unlimited limit"
                              value={userInputs?.limit}
                              onChange={(e) => handleChange(e, "limit")}
                            />
                            {error.limit && (
                              <div className="login-validation">
                                {error.limit}
                              </div>
                            )}
                          </div>

                          <div className="form-group full">
                            <label htmlFor="">Invoice Notes</label>
                            <textarea
                              className="form-control"
                              id="formControlTextarea"
                              onChange={(e) =>
                                handleChange(e, "specialRequirement")
                              }
                              rows="3"
                              placeholder="Please type your notes here"
                              name="specialRequirement"
                              value={userInputs?.specialRequirement || ""}
                            ></textarea>
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary btn-filled next"
                            onClick={() => {
                              showConfirmationPopup(selectedValue, data?.id);
                            }}
                          >
                            Renew License
                          </button>
                        </div>
                      </>
                    )}
                  </Form>
                </div>
              </div>
            </div>
            {/* <div className="old-collected library-content-box-layuot">
              <h3>Old Collected Data</h3>
              {oldOpeningDetails?.length > 0 ?
              <div className="clear-search d-flex align-items-center">
                <button
                  className="btn print"
                  title="Download data"
                  onClick={() => {
                    downloadOldCollectedData();
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z"
                      fill="#0066BE"
                    />
                    <path
                      d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                      fill="#0066BE"
                    />
                  </svg>
                </button>
              </div>
               : ""}  
              <div className="old-collected-data data-collected">
                <div className="data-main-box old-data">
                  <div className="old-data-detail">
                    <div className="old-data-from d-flex align-items-center">
                        <h6>Start date</h6>
                        <p>4 August 2022</p>
                    </div>
                    <div className="old-data-to d-flex align-items-center">
                      <h6>End date</h6>
                      <p>4 August 2023</p>
                    </div>
                  </div>
                  <ul className="tab-mail-list data">
                    {data?.lastRomanNumber == 2 ||
                      data?.lastRomanNumber == 3 ? (
                      <>
                        <li className="d-flex align-center">
                          <h6 className="tab-content-title">
                            Unique reader (total)
                            <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on IP address, device &amp; browser).">
                              <img
                                src={path_image + "info_circle_icon.svg"}
                                alt="refresh-btn"
                              />
                            </LinkWithTooltip>
                          </h6>
                          <div className="data-progress send">
                            <ProgressBar
                              variant={
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? oldOpeningDetails[
                                    oldOpeningDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.unique > 0
                                    ? "warning"
                                    : "default"
                                  : "default"
                              }
                              now={
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? oldOpeningDetails[
                                    oldOpeningDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.unique
                                  : "100"
                              }
                              label={
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? oldOpeningDetails[
                                    oldOpeningDetails.findIndex(
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
                                src={path_image + "info_circle_icon.svg"}
                                alt="refresh-btn"
                              />
                            </LinkWithTooltip>
                          </h6>
                          <div className="data-progress">
                            <ProgressBar
                              variant={
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? oldOpeningDetails[
                                    oldOpeningDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.pinReaders
                                    ? "pin_usage"
                                    : "default"
                                  : "default"
                              }
                              now={
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? (oldOpeningDetails[
                                    oldOpeningDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.pinReaders /
                                  oldOpeningDetails[
                                    oldOpeningDetails.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.limit) *
                                  100
                                  : "100"
                              }
                              label={
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? oldOpeningDetails[
                                    oldOpeningDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ].pinReaders
                                  : "Loading"
                              }
                            />
                            <span>
                              Agreed Limit :&nbsp;
                              <strong>
                                {oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? oldOpeningDetails[
                                    oldOpeningDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.limit == 1000
                                    ? "Unlimited"
                                    : oldOpeningDetails[
                                      oldOpeningDetails.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.limit
                                  : "Unlimited"}
                              </strong>
                            </span>
                          </div>
                          <span className="total-left">
                            {oldOpeningDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? oldOpeningDetails[
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                )
                              ]?.limit == 1000
                                ? null
                                : oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.limit -
                                oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.pinReaders
                              : null}

                            {oldOpeningDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1 ? (
                              oldOpeningDetails[
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                )
                              ]?.limit != 1000 ? (
                                <small>Left</small>
                              ) : null
                            ) : null}
                          </span>
                        </li>
                      </>
                    ) : (
                      <li className="d-flex align-center">
                        <h6 className="tab-content-title">
                          Unique reader (total)
                          <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on IP address, device &amp; browser).">
                            <img
                              src={path_image + "info_circle_icon.svg"}
                              alt="refresh-btn"
                            />
                          </LinkWithTooltip>
                        </h6>
                        <div className="data-progress send">
                          <ProgressBar
                            variant={
                              oldOpeningDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.unique
                                  ? "warning"
                                  : "default"
                                : "default"
                            }
                            now={
                              oldOpeningDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? (oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.unique /
                                oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.limit) *
                                100
                                : "100"
                            }
                            label={
                              oldOpeningDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
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
                              {oldOpeningDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.limit == 1000
                                  ? "unlimited"
                                  : oldOpeningDetails[
                                    oldOpeningDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.limit
                                : "unlimited"}
                            </strong>
                          </span>
                        </div>
                        <span className="total-left">
                          {oldOpeningDetails.findIndex(
                            (el) => el.pdfId == data?.id
                          ) !== -1
                            ? oldOpeningDetails[
                              oldOpeningDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              )
                            ]?.limit == 1000
                              ? null
                              : oldOpeningDetails[
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                )
                              ]?.limit -
                              oldOpeningDetails[
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                )
                              ]?.unique
                            : null}

                          {oldOpeningDetails.findIndex(
                            (el) => el.pdfId == data?.id
                          ) !== -1 ? (
                            oldOpeningDetails[
                              oldOpeningDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              )
                            ]?.limit != 1000 ? (
                              <small>Left</small>
                            ) : null
                          ) : null}
                        </span>
                      </li>
                    )}
                    <li>
                      <h6 className="tab-content-title">
                        Openings (total){" "}
                        <LinkWithTooltip tooltip="Number of opening counts for specific article.">
                          <img
                            src={path_image + "info_circle_icon.svg"}
                            alt="refresh-btn"
                          />
                        </LinkWithTooltip>
                      </h6>
                      <div className="data-progress limited">
                        <ProgressBar
                          variant={
                            oldOpeningDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? oldOpeningDetails[
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                )
                              ].opening
                                ? "success"
                                : "default"
                              : "default"
                          }
                          now={
                            oldOpeningDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? oldOpeningDetails[
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                )
                              ].opening
                              : "100"
                          }
                          label={
                            oldOpeningDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? oldOpeningDetails[
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                )
                              ].opening
                              : "Loading"
                          }
                        />
                      </div>
                    </li>



                    <li>
                      <h6 className="tab-content-title">
                        Registered readers
                        <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content.">
                          <img
                            src={path_image + "info_circle_icon.svg"}
                            alt="refresh-btn"
                          />
                        </LinkWithTooltip>
                      </h6>
                      <div className="data-progress">
                        <ProgressBar
                          variant={
                            oldOpeningDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? oldOpeningDetails[
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                )
                              ]?.reader
                                ? "danger"
                                : "default"
                              : "default"
                          }
                          now={
                            oldOpeningDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? (oldOpeningDetails[
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                )
                              ]?.reader /
                              oldOpeningDetails[
                                oldOpeningDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.limit) *
                              100
                              : "100"
                          }
                          label={
                            oldOpeningDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? oldOpeningDetails[
                                oldOpeningDetails.findIndex(
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
                            src={path_image + "info_circle_icon.svg"}
                            alt="refresh-btn"
                          />
                        </LinkWithTooltip>
                      </h6>
                      <div className="data-progress">
                        <ProgressBar
                          variant={
                            oldOpeningDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? oldOpeningDetails[
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                )
                              ]?.subLink
                                ? "sublink"
                                : "default"
                              : "default"
                          }
                          now={
                            oldOpeningDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? (oldOpeningDetails[
                                oldOpeningDetails.findIndex(
                                  (el) => el.pdfId == data?.id
                                )
                              ]?.subLink /
                              oldOpeningDetails[
                                oldOpeningDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.limit) *
                              100
                              : "100"
                          }
                          label={
                            oldOpeningDetails.findIndex(
                              (el) => el.pdfId == data?.id
                            ) !== -1
                              ? oldOpeningDetails[
                                oldOpeningDetails.findIndex(
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
                              src={path_image + "info_circle_icon.svg"}
                              alt="refresh-btn"
                            />
                          </LinkWithTooltip>
                        </h6>
                        <div className="data-progress">
                          <ProgressBar
                            variant={
                              oldOpeningDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.print
                                  ? "print"
                                  : "default"
                                : "default"
                            }
                            now={
                              oldOpeningDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? (oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.print /
                                oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.limit) *
                                100
                                : "100"
                            }
                            label={
                              oldOpeningDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                    (el) => el.pdfId == data?.id
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
                              src={path_image + "info_circle_icon.svg"}
                              alt="refresh-btn"
                            />
                          </LinkWithTooltip>
                        </h6>
                        <div className="data-progress">
                          <ProgressBar
                            variant={
                              oldOpeningDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.download
                                  ? "download"
                                  : "default"
                                : "default"
                            }
                            now={
                              oldOpeningDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? (oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.download /
                                oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.limit) *
                                100
                                : "100"
                            }
                            label={
                              oldOpeningDetails.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? oldOpeningDetails[
                                  oldOpeningDetails.findIndex(
                                    (el) => el.pdfId == data?.id
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
            </div> */}
          </Row>
        </div>
      </Col>
      <CommonConfirmModel
        show={confirmationPopup}
        onClose={hideConfirmationModal}
        fun={commonConfirmModelFun}
        popupMessage={popupMessage}
        path_image={path_image}
        resetDataId={resetDataId}
      />
    </>
  );
};

export default LicenseRenew;
