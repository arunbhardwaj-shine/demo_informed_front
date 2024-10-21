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
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Tooltip from "react-bootstrap/Tooltip";
import { popup_alert } from "../../../popup_alert";
import moment from "moment";
import { loader } from "../../../loader";
import { ENDPOINT } from "../../../axios/apiConfig";
import { postData, getData } from "../../../axios/apiHelper";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import SubLinkListing from "./SubLinkListing";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const SunShineTimeline = () => {
  const rdLikeArray = [
    "56Ek4feL/1A8mZgIKQWEqg==",
    "sNl1hra39QmFk9HwvXETJA==",
    "MXl8m36VZFYXpgFVz3Pg0g==",
  ];
  const isLikeRdAccount = rdLikeArray.includes(localStorage.getItem("user_id"));
  const { state } = useLocation();
  const [allContents, setallContents] = useState([]);
  const [allCodes, setAllCodes] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState();
  const [articleData, setArticleData] = useState();
  const [libraryData, setLibraryData] = useState([]);
  const [reRenderFlag, setreRenderFlag] = useState(0);
  const [changeConsent, setchangeConsent] = useState([]);
  const [flag, setFlag] = useState(0);
  const [opening_details, setOpeningDetails] = useState([]);
  const [userId, setUserId] = useState();
  const [update, setUpdate] = useState(0);
  const [consentValue, setConsentValue] = useState("");
  const location = useLocation();
  const [types, setTypes] = useState([
    { value: "Online ", label: "Online Offer" },
  ]);
  const [activeTab, setActiveTab] = useState("docintel-link");
  const navigate = useNavigate();
  const [accountTimelineData, setAccountTimelineData] = useState({});
  const [page, setPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false);
  const isUSAPharmaAccount =
    localStorage?.getItem("account_type") === "USA_PHARMA" ? 1 : 0;
  const [consentType, setConsetnType] = useState([
    { value: "Sunshine USA", label: "Sunshine USA" },
  ]);
  const [passshow, setPassShow] = useState(false);
  useEffect(() => {
    if (!isLikeRdAccount) {
      let linktype = types;
      linktype.push(
        { value: "Offline Offer", label: "Offline Offer" },
        { value: "Sunshine", label: "Sunshine" }
      );
      setTypes(linktype);
    }
    getLibraryData();
    getAccountTimelineData();
  }, []);

  useEffect(() => {
    getArticleData();
  }, [selectedArticle]);

  const getLibraryData = async () => {
    try {
      loader("show");
      let selectedValue = [];
      let data = {
        user_id: localStorage.getItem("user_id"),
        page: 1,
        search: "",
        license: 0,
        type: "All",
        order: "true",
        selectValue: JSON.stringify(selectedValue),
      };

      let body = data;
      const res = await postData(ENDPOINT.LIBRARY, body);
      let arr = [];
      let codearr = [];
      Object.entries(res?.data?.data?.library).map(([index, item]) => {
        arr.push({
          value: item.id,
          label: item.title.replace(/(<([^>]+)>)/gi, ""),
        });
        codearr.push({
          value: item.id,
          label: item.code,
        });
        setallContents(arr);
      });
      codearr.sort((a, b) => {
        let x = a.label.toLowerCase();
        let y = b.label.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      setAllCodes(codearr);
      setLibraryData((oldArray) => [...oldArray, ...res?.data?.data?.library]);

      if (typeof selectedArticle === "undefined") {
        if (state?.pdfid) {
          setSelectedArticle(state.pdfid);
        }
      }
    } catch (err) {
      console.log("err");
    } finally {
      loader("hide");
    }
  };

  const onArticleChange = async (event) => {
    setSelectedArticle(event.value);
  };

  const getArticleData = () => {
    setchangeConsent([]);
    setConsentValue("");
    const getSearchData = libraryData.find((el) => el.id === selectedArticle);
    setArticleData(getSearchData);
    setreRenderFlag(reRenderFlag + 1);
    setActiveTab("docintel-link");
  };

  const tabClicked = async (event, id) => {
    setActiveTab(event);
    setFlag(0);

    let normal_data = opening_details;
    setUserId(id);

    let contains_already;

    if (event == "data-tab") {
      normal_data?.filter((data) => {
        if (data?.pdf_id == id) {
          contains_already = true;
          setFlag(1);
        }
      });

      setOpeningDetails(normal_data);

      if (contains_already != true) {
        try {
          let body = {
            pdfId: [id],
          };
          const res = await postData(ENDPOINT.LIBRARYSTATS, body);

          const status = normal_data?.map((datas) => {
            if (datas?.pdf_id == id) {
              return "true";
            } else {
              return "false";
            }
          });
          if (status?.every((ele) => ele == "false")) {
            normal_data?.push({
              pdf_id: id,
              uniqueReader: res?.data?.data[0]?.unique,
              opening: res?.data?.data[0]?.opening,
              registeredReader: res?.data?.data[0]?.reader,
              limit: res?.data?.data[0]?.limit,
              print: res?.data?.data[0]?.print,
              download: res?.data?.data[0]?.download,
              subLink: res?.data?.data[0]?.subLink,
            });
          }

          setOpeningDetails(normal_data);
          setFlag(1);

          setUpdate(update + 1);
        } catch (err) {
          console.log("err");
        } finally {
          loader("hide");
        }
      }
    }
  };

  const onConsentChange = (e, i) => {
    setConsentValue(e);
    let consetValue = e.value;
    let consent = {
      index: i,
      value: consetValue,
    };

    const found = changeConsent.some((el) => el.index === i);
    if (!found) {
      setchangeConsent((oldarray) => [...oldarray, consent]);
    } else {
      const index = changeConsent.findIndex((el) => el.index === i);
      changeConsent[index].value = consetValue;
    }
  };

  const updateConset = async (pdf_id) => {
    try {
      loader("show");
      const index = changeConsent.findIndex((el) => el.index === pdf_id);
      let consent_value = changeConsent[index].value;

      let body = {
        pdfId: pdf_id,
        consentType: consent_value,
      };
      const lib_data_index = libraryData.findIndex((el) => el.id === pdf_id);
      libraryData[lib_data_index].linkType = consent_value;
      const new_data = libraryData;
      setLibraryData(new_data);
      articleData.linkType = consent_value;
      setreRenderFlag(reRenderFlag + 1);
      loader("hide");
      popup_alert({
        visible: "show",
        message: "Your content has been update <br />successfully !",
        type: "success",
        redirect: "",
      });
    } catch (err) {
      console.log("err", err);
      loader("hide");
    }
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
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success("content copied to the clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
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
      data = data.trim().slice(0, -1);
    } else {
      data = "N/A";
    }
    return data;
  };

  const getAccountTimelineData = async (pageNo = 1) => {
    try {
      loader("show");
  
      const response = await getData(
        `${ENDPOINT.GET_ARTICLE_TIMELINE_DATA}?page=${pageNo}`
      );
      
      if (response?.data) {
        setAccountTimelineData((prev) => {
          const newData = response?.data?.data || {};
          const mergedData = { ...prev };
  
          Object.keys(newData).forEach((date) => {
            if (mergedData[date]) {
              mergedData[date] = [...mergedData[date], ...newData[date]];
            } else {
              mergedData[date] = newData[date];
            }
          });
  
          return mergedData;
        });
        setShowPagination(response?.data?.showPagination);
      }
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };
  
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    getAccountTimelineData(page + 1);
  };
  

  const printPage = () => {
    window.print();
  };
  const toggleState = () => {
    setPassShow(!passshow);
  };

  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPass: false,
    newPass: false,
  });

  const togglePassword = (key) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title d-flex">
                <h2>Sunshine Details</h2>
              </div>
              {/* <div className="header-btn">
                <Button
                  className="btn-bordered cancel"
                  onClick={() => navigate("/library-create")}
                >
                  Close
                </Button>
              </div> */}
            </div>
            <div className="create-change-content spc-content sunshine">
              <div className="form_action">
                <div className="row">
                  <Col className="sublink_left">
                    <h5>
                      Please find the content you'd like to see it's timeline:
                    </h5>
                    <div className="product-unit d-flex justify-content-between align-items-center">
                      <div className="form-group">
                        <label htmlFor="">Content</label>
                        <Select
                          options={allContents}
                          placeholder="Select content to create a sublink "
                          onChange={(event) => onArticleChange(event)}
                          value={
                            selectedArticle != ""
                              ? allContents[
                                  allContents.findIndex(
                                    (el) => el.value === selectedArticle
                                  )
                                ]
                              : ""
                          }
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                      </div>
                      <div className="form-group blank">
                        <span>OR</span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="">URL</label>
                        <Select
                          options={allCodes}
                          placeholder="Select content URL"
                          onChange={(event) => onArticleChange(event)}
                          value={
                            selectedArticle != ""
                              ? allCodes[
                                  allCodes.findIndex(
                                    (el) => el.value === selectedArticle
                                  )
                                ]
                              : ""
                          }
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                      </div>
                    </div>
                    <div className="no_content_selected">
                      <>
                        {typeof articleData !== "undefined" && reRenderFlag ? (
                          <>
                            <div className="library-content-box-layuot">
                              <div className="doc-content-main-box col">
                                <div className="doc-content-header">
                                  <div className="doc-content">
                                    <h5
                                      dangerouslySetInnerHTML={{
                                        __html: articleData?.title,
                                      }}
                                    ></h5>
                                    <h6>{articleData?.pdf_sub_title}</h6>
                                    <p>{articleData?.key_author}</p>
                                    <div className="select-tags">
                                      {articleData?.tags?.length
                                        ? JSON.parse(articleData.tags)?.map(
                                            (data) => {
                                              return <div>{data}</div>;
                                            }
                                          )
                                        : ""}
                                    </div>
                                  </div>
                                </div>
                                <div className="tabs-data">
                                  <Tabs
                                    onSelect={(key) =>
                                      tabClicked(key, articleData?.id)
                                    }
                                    activeKey={activeTab}
                                    fill
                                  >
                                    <Tab
                                      eventKey="docintel-link"
                                      title="Docintel Link"
                                      className="flex-column justify-content-between"
                                    >
                                      <div className="tab-panel d-flex flex-column justify-content-between">
                                        <div className="tab-content-links">
                                          <a
                                            href={articleData?.docintelLink}
                                            className="doc-link"
                                            target="_blank"
                                          >
                                            {articleData?.docintelLink}
                                          </a>
                                          <span
                                            className="copy-content"
                                            onClick={() => {
                                              copyToClipboard(
                                                articleData?.docintelLink
                                              );
                                            }}
                                          >
                                            <img
                                              src={
                                                path_image + "copy-content.svg"
                                              }
                                              alt="Copy"
                                            />
                                          </span>
                                        </div>
                                        <ul className="tab-mail-list">
                                          <li>
                                            <h6 className="tab-content-title">
                                              Upload date
                                            </h6>
                                            <h6>
                                              {moment(
                                                articleData?.created
                                              ).format("DD MMM, YYYY")}
                                            </h6>
                                          </li>
                                          <li>
                                            <h6 className="tab-content-title">
                                              inforMedGO code
                                            </h6>
                                            <h6>
                                              {articleData?.rep_code}
                                              <span
                                                className="copy-content"
                                                onClick={() => {
                                                  copyToClipboard(
                                                    articleData?.rep_code
                                                  );
                                                }}
                                              >
                                                <img
                                                  src={
                                                    path_image +
                                                    "copy-content.svg"
                                                  }
                                                  alt="Copy"
                                                />
                                              </span>
                                            </h6>
                                          </li>
                                          <li>
                                            <h6 className="tab-content-title">
                                              Docintel code
                                            </h6>
                                            <h6>
                                              {articleData.docintel_code}
                                              {
                                                <span
                                                  className="copy-content"
                                                  onClick={() => {
                                                    copyToClipboard(
                                                      articleData?.docintel_code
                                                    );
                                                  }}
                                                >
                                                  <img
                                                    src={
                                                      path_image +
                                                      "copy-content.svg"
                                                    }
                                                    alt="Copy"
                                                  />
                                                </span>
                                              }
                                            </h6>
                                          </li>
                                          {/* <li>
                                              <h6 className="tab-content-title">
                                                SPC included
                                              </h6>
                                              <h6>
                                                {articleData?.spc_included == 0 ? "No" : "Yes"}
                                              </h6>
                                            </li> */}
                                          <li>
                                            <h6 className="tab-content-title">
                                              Language
                                            </h6>
                                            <h6>
                                              {articleData?.popup_email_content_language
                                                ? articleData?.popup_email_content_language
                                                : "No"}
                                            </h6>
                                          </li>
                                          {!isLikeRdAccount ? (
                                            <>
                                              <li>
                                                <h6 className="tab-content-title">
                                                  Link type
                                                </h6>
                                                <h6>{articleData?.linkType}</h6>
                                              </li>
                                              <li>
                                                <h6 className="tab-content-title">
                                                  Enhanced
                                                </h6>
                                                <div className="include-links">
                                                  {articleData?.spc_included ? (
                                                    <img
                                                      src={
                                                        path_image +
                                                        "spc-img.png"
                                                      }
                                                      alt=""
                                                    />
                                                  ) : (
                                                    ""
                                                  )}

                                                  {articleData?.linkRelations ? (
                                                    <img
                                                      src={
                                                        path_image +
                                                        "video-img.png"
                                                      }
                                                      alt=""
                                                    />
                                                  ) : (
                                                    ""
                                                  )}
                                                  {articleData?.pdfLinks ? (
                                                    <img
                                                      src={
                                                        path_image +
                                                        "link-img.png"
                                                      }
                                                      alt=""
                                                    />
                                                  ) : (
                                                    ""
                                                  )}

                                                  {articleData.spc_included ==
                                                    0 &&
                                                    articleData.linkRelations ==
                                                      0 &&
                                                    articleData.pdfLinks ==
                                                      0 && <h6>N/A</h6>}
                                                </div>
                                              </li>
                                            </>
                                          ) : null}
                                        </ul>
                                      </div>
                                    </Tab>

                                    <Tab
                                      eventKey="data-tab"
                                      title="Data"
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
                                            {flag == 0 &&
                                            userId == articleData?.id ? (
                                              <div className="data-progress limited">
                                                <ProgressBar
                                                  variant="default"
                                                  now={100}
                                                  label={"loading"}
                                                />
                                              </div>
                                            ) : (
                                              opening_details?.map(
                                                (details) => {
                                                  if (
                                                    details?.pdf_id ==
                                                    articleData?.id
                                                  ) {
                                                    return (
                                                      <>
                                                        <div className="data-progress success-progress">
                                                          <ProgressBar
                                                            variant={
                                                              details.opening ==
                                                              0
                                                                ? "default"
                                                                : "success"
                                                            }
                                                            now={
                                                              details.opening ==
                                                              0
                                                                ? 0
                                                                : 100
                                                            }
                                                            label={
                                                              details?.opening
                                                            }
                                                          />
                                                        </div>
                                                      </>
                                                    );
                                                  }
                                                }
                                              )
                                            )}
                                          </li>
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

                                            {flag == 0 &&
                                            userId == articleData?.id ? (
                                              <div className="data-progress limited">
                                                <ProgressBar
                                                  variant="default"
                                                  now={100}
                                                  label={"Loading"}
                                                />
                                              </div>
                                            ) : (
                                              opening_details?.map(
                                                (details) => {
                                                  if (
                                                    details?.pdf_id ==
                                                    articleData?.id
                                                  ) {
                                                    return (
                                                      <>
                                                        <div className="data-progress limited">
                                                          <ProgressBar
                                                            variant={
                                                              details.uniqueReader ==
                                                              0
                                                                ? "default"
                                                                : "warning"
                                                            }
                                                            now={
                                                              details?.limit ==
                                                              0
                                                                ? (details?.uniqueReader /
                                                                    1000) *
                                                                  100
                                                                : (details?.uniqueReader /
                                                                    details?.limit) *
                                                                  100
                                                            }
                                                            label={
                                                              details?.uniqueReader
                                                            }
                                                          />
                                                          <span>
                                                            Agreed Limit :&nbsp;
                                                            <strong>
                                                              {details?.limit ==
                                                              0
                                                                ? "unlimited"
                                                                : details?.limit ==
                                                                  1000
                                                                ? "unlimited"
                                                                : details?.limit}
                                                            </strong>
                                                          </span>
                                                        </div>
                                                        <span className="total-left">
                                                          {details?.limit ==
                                                            0 ||
                                                          details?.limit ==
                                                            1000 ? (
                                                            ""
                                                          ) : (
                                                            <>
                                                              {details?.limit ==
                                                              0
                                                                ? 1000 -
                                                                  details?.uniqueReader
                                                                : details?.limit -
                                                                  details?.uniqueReader}
                                                              <small>
                                                                Left
                                                              </small>
                                                            </>
                                                          )}
                                                        </span>
                                                      </>
                                                    );
                                                  }
                                                }
                                              )
                                            )}
                                          </li>
                                          {articleData?.linkType !==
                                          "Online" ? (
                                            <li>
                                              <h6 className="tab-content-title">
                                                Registered readers{" "}
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
                                              {flag == 0 &&
                                              userId == articleData.id ? (
                                                <div className="data-progress limited">
                                                  <ProgressBar
                                                    variant="default"
                                                    now={100}
                                                    label={"loading"}
                                                  />
                                                </div>
                                              ) : (
                                                opening_details.map(
                                                  (details) => {
                                                    if (
                                                      details.pdf_id ==
                                                      articleData.id
                                                    ) {
                                                      return (
                                                        <>
                                                          <div className="data-progress">
                                                            {/* <span>{details.registeredReader}</span> */}
                                                            <ProgressBar
                                                              variant={
                                                                details.registeredReader ==
                                                                0
                                                                  ? "default"
                                                                  : "danger"
                                                              }
                                                              now={
                                                                details.limit ==
                                                                0
                                                                  ? (details.registeredReader /
                                                                      1000) *
                                                                    100
                                                                  : (details.registeredReader /
                                                                      details.limit) *
                                                                    100
                                                              }
                                                              label={
                                                                details.registeredReader
                                                              }
                                                            />
                                                          </div>
                                                        </>
                                                      );
                                                    }
                                                  }
                                                )
                                              )}
                                            </li>
                                          ) : null}
                                          {articleData?.subLinkAdded ? (
                                            <li>
                                              <h6 className="tab-content-title">
                                                SubLink
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
                                              {flag == 0 &&
                                              userId == articleData?.id ? (
                                                <div className="data-progress limited">
                                                  <ProgressBar
                                                    variant="default"
                                                    now={100}
                                                    label={"Loading"}
                                                  />
                                                </div>
                                              ) : (
                                                opening_details?.map(
                                                  (details) => {
                                                    if (
                                                      details?.pdf_id ==
                                                      articleData?.id
                                                    ) {
                                                      return (
                                                        <>
                                                          <div className="data-progress">
                                                            <ProgressBar
                                                              variant={
                                                                details?.subLink >
                                                                0
                                                                  ? "subLink"
                                                                  : "default"
                                                              }
                                                              now={
                                                                details.limit ==
                                                                0
                                                                  ? (details.subLink /
                                                                      1000) *
                                                                    100
                                                                  : (details.subLink /
                                                                      details.limit) *
                                                                    100
                                                              }
                                                              label={
                                                                details?.subLink
                                                                  ? details?.subLink
                                                                  : "Loading"
                                                              }
                                                            />
                                                          </div>
                                                        </>
                                                      );
                                                    }
                                                  }
                                                )
                                              )}
                                            </li>
                                          ) : null}
                                          {articleData?.allow_print ? (
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
                                              {flag == 0 &&
                                              userId == articleData?.id ? (
                                                <div className="data-progress limited">
                                                  <ProgressBar
                                                    variant="default"
                                                    now={100}
                                                    label={"Loading"}
                                                  />
                                                </div>
                                              ) : (
                                                opening_details?.map(
                                                  (details) => {
                                                    if (
                                                      details?.pdf_id ==
                                                      articleData?.id
                                                    ) {
                                                      return (
                                                        <>
                                                          <div className="data-progress">
                                                            <ProgressBar
                                                              variant={
                                                                details?.print >
                                                                0
                                                                  ? "print"
                                                                  : "default"
                                                              }
                                                              now={
                                                                details.limit ==
                                                                0
                                                                  ? (details.print /
                                                                      1000) *
                                                                    100
                                                                  : (details.print /
                                                                      details.limit) *
                                                                    100
                                                              }
                                                              label={
                                                                details?.print
                                                              }
                                                            />
                                                          </div>
                                                        </>
                                                      );
                                                    }
                                                  }
                                                )
                                              )}
                                            </li>
                                          ) : null}
                                          {articleData?.allow_download ? (
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
                                              {flag == 0 &&
                                              userId == articleData?.id ? (
                                                <div className="data-progress limited">
                                                  <ProgressBar
                                                    variant="default"
                                                    now={100}
                                                    label={"Loading"}
                                                  />
                                                </div>
                                              ) : (
                                                opening_details?.map(
                                                  (details) => {
                                                    if (
                                                      details?.pdf_id ==
                                                      articleData?.id
                                                    ) {
                                                      return (
                                                        <>
                                                          <div className="data-progress">
                                                            <ProgressBar
                                                              variant={
                                                                details?.download >
                                                                0
                                                                  ? "download"
                                                                  : "default"
                                                              }
                                                              now={
                                                                details.limit ==
                                                                0
                                                                  ? (details.download /
                                                                      1000) *
                                                                    100
                                                                  : (details.download /
                                                                      details.limit) *
                                                                    100
                                                              }
                                                              label={
                                                                details?.download
                                                              }
                                                            />
                                                          </div>
                                                        </>
                                                      );
                                                    }
                                                  }
                                                )
                                              )}
                                            </li>
                                          ) : null}
                                        </ul>
                                      </div>
                                    </Tab>

                                    <Tab
                                      className="change-tab flex-column justify-content-between"
                                      eventKey="change-tab"
                                      title="Change"
                                    >
                                      <div className="data-main-box change-tab-main-box tab-panel">
                                        <ul className="tab-mail-list data change">
                                          <div className="form-group d-flex align-items-center">
                                            <label htmlFor="">
                                              Consent type
                                            </label>
                                            {isUSAPharmaAccount &&
                                            articleData.articleOwner == 1 ? (
                                              <Select
                                                options={consentType}
                                                defaultValue={
                                                  articleData.linkType ==
                                                  "Sunshine USA"
                                                    ? consentType?.[0]
                                                    : "Select"
                                                }
                                                onChange={(event) =>
                                                  onConsentChange(
                                                    event,
                                                    articleData.id
                                                  )
                                                }
                                                id={
                                                  "consent_dropdown_" +
                                                  articleData.id
                                                }
                                                className="dropdown-basic-button split-button-dropup"
                                                isClearable
                                              />
                                            ) : (
                                              <Select
                                                options={types}
                                                // value={consentValue}
                                                defaultValue={
                                                  articleData.linkType ==
                                                  "Online"
                                                    ? types[0]
                                                    : articleData.linkType ==
                                                      "Offline"
                                                    ? types[1]
                                                    : articleData.linkType ==
                                                      "Sunshine"
                                                    ? types[2]
                                                    : "Select"
                                                }
                                                onChange={(event) =>
                                                  onConsentChange(
                                                    event,
                                                    articleData.id
                                                  )
                                                }
                                                id={
                                                  "consent_dropdown_" +
                                                  articleData.id
                                                }
                                                className="dropdown-basic-button split-button-dropup"
                                                isClearable
                                              />
                                            )}
                                            <Button
                                              onClick={(e) =>
                                                updateConset(articleData.id)
                                              }
                                            >
                                              Update
                                            </Button>
                                          </div>
                                        </ul>
                                      </div>
                                    </Tab>

                                    <Tab
                                      eventKey="sales"
                                      title={
                                        localStorage.getItem("group_id") == "3"
                                          ? "About"
                                          : "Sales"
                                      }
                                      className="flex-column justify-content-between"
                                    >
                                      <div className="tab-panel">
                                        <ul className="tab-mail-list">
                                          {localStorage.getItem("group_id") ==
                                            2 && (
                                            <>
                                              <li>
                                                <h6 className="tab-content-title">
                                                  Production person
                                                </h6>
                                                <h6>
                                                  {articleData?.productName
                                                    ? articleData.productName
                                                    : "N/A"}
                                                </h6>
                                              </li>
                                              <li>
                                                <h6 className="tab-content-title">
                                                  Publisher
                                                </h6>
                                                <h6>
                                                  {articleData?.publisherName
                                                    ? articleData.publisherName
                                                    : "N/A"}
                                                </h6>
                                              </li>
                                              <li>
                                                <h6 className="tab-content-title">
                                                  Country
                                                </h6>
                                                <h6>
                                                  {articleData?.country
                                                    ? articleData.country
                                                    : "N/A"}
                                                </h6>
                                              </li>
                                              <li>
                                                <h6 className="tab-content-title">
                                                  Cost Center
                                                </h6>
                                                <h6>
                                                  {articleData?.cost_center &&
                                                  articleData?.cost_center != 0
                                                    ? articleData.cost_center
                                                    : "N/A"}
                                                </h6>
                                              </li>
                                            </>
                                          )}

                                          {isLikeRdAccount &&
                                          localStorage.getItem("group_id") ==
                                            "3" ? (
                                            <>
                                              <li>
                                                <h6 className="tab-content-title">
                                                  Mandatory
                                                </h6>
                                                <h6>
                                                  {articleData?.reader_mandatory
                                                    ? "Yes"
                                                    : "No"}
                                                </h6>
                                              </li>
                                              <li>
                                                <h6 className="tab-content-title">
                                                  Roles
                                                </h6>
                                                <h6>
                                                  {articleData?.trail_user_type
                                                    ? typeof articleData?.trail_user_type ==
                                                        "string" &&
                                                      articleData?.trail_user_type !=
                                                        ""
                                                      ? JSON.parse(
                                                          articleData?.trail_user_type
                                                        ).join()
                                                      : "N/A"
                                                    : "N/A"}
                                                </h6>
                                              </li>
                                            </>
                                          ) : null}

                                          {!isLikeRdAccount ? (
                                            <>
                                              <li>
                                                <h6 className="tab-content-title">
                                                  Usage limit
                                                </h6>
                                                <h6>
                                                  {articleData?.limit > 0
                                                    ? articleData?.limit
                                                    : "Unlimited"}
                                                </h6>
                                              </li>
                                              <li>
                                                <h6 className="tab-content-title">
                                                  Allowed
                                                </h6>
                                                <h6>
                                                  {changeFormatForPrint(
                                                    articleData
                                                  )}
                                                </h6>
                                              </li>
                                              <li>
                                                <h6 className="tab-content-title">
                                                  Link type
                                                </h6>
                                                <h6>{articleData?.linkType}</h6>
                                              </li>
                                            </>
                                          ) : null}
                                          <li>
                                            <h6 className="tab-content-title">
                                              Upload date
                                            </h6>
                                            <h6>{articleData?.uploadedDate}</h6>
                                          </li>

                                          {localStorage.getItem("group_id") ==
                                          "2" ? (
                                            <li>
                                              <h6 className="tab-content-title">
                                                Expiration date
                                              </h6>
                                              <h6>
                                                {articleData?.expireDate
                                                  ? articleData.expireDate
                                                  : "N/A"}
                                              </h6>
                                            </li>
                                          ) : null}
                                        </ul>
                                      </div>
                                    </Tab>
                                  </Tabs>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <h3>No content selected yet!</h3>
                        )}
                      </>
                    </div>
                  </Col>
                  <Col className="sublink_right d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>Timeline:</h5>
                      <div className="header-btn d-flex justify-content-end">
                        <button
                          className="btn print"
                          onClick={(e) => printPage()}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <mask
                              id="mask0_1144_989"
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="24"
                              height="24"
                            >
                              <path
                                d="M0 1.90735e-06H24V24H0V1.90735e-06Z"
                                fill="white"
                              />
                            </mask>
                            <g mask="url(#mask0_1144_989)">
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M3.51562 17.4023C2.29226 17.4023 1.30078 16.4109 1.30078 15.1875V9.5625C1.30078 8.33914 2.29226 7.34766 3.51562 7.34766H20.4844C21.7077 7.34766 22.6992 8.33914 22.6992 9.5625V15.1875C22.6992 16.4109 21.7077 17.4023 20.4844 17.4023H19.125C18.7949 17.4023 18.5273 17.6699 18.5273 18C18.5273 18.3301 18.7949 18.5977 19.125 18.5977H20.4844C22.3679 18.5977 23.8945 17.071 23.8945 15.1875V9.5625C23.8945 7.67899 22.3679 6.15234 20.4844 6.15234H3.51562C1.63211 6.15234 0.105469 7.67899 0.105469 9.5625V15.1875C0.105469 17.071 1.63211 18.5977 3.51562 18.5977H4.875C5.20508 18.5977 5.47266 18.3301 5.47266 18C5.47266 17.6699 5.20508 17.4023 4.875 17.4023H3.51562Z"
                                fill="#0066BE"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M3.15234 14.25C3.15234 14.5801 3.41992 14.8477 3.75 14.8477H20.25C20.5801 14.8477 20.8477 14.5801 20.8477 14.25C20.8477 13.9199 20.5801 13.6523 20.25 13.6523H3.75C3.41992 13.6523 3.15234 13.9199 3.15234 14.25Z"
                                fill="#0066BE"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M6.28125 22.6992C5.8347 22.6992 5.47266 22.3372 5.47266 21.8906V14.8477H18.5273V21.8906C18.5273 22.3372 18.1653 22.6992 17.7187 22.6992H6.28125ZM4.27734 21.8906C4.27734 22.9973 5.17455 23.8945 6.28125 23.8945H17.7187C18.8254 23.8945 19.7227 22.9973 19.7227 21.8906V14.25C19.7227 13.9199 19.4551 13.6523 19.125 13.6523H4.875C4.54492 13.6523 4.27734 13.9199 4.27734 14.25V21.8906Z"
                                fill="#0066BE"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.52734 17.25C9.52734 17.5801 9.79492 17.8477 10.125 17.8477H13.875C14.2051 17.8477 14.4727 17.5801 14.4727 17.25C14.4727 16.9199 14.2051 16.6523 13.875 16.6523H10.125C9.79492 16.6523 9.52734 16.9199 9.52734 17.25Z"
                                fill="#0066BE"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.52734 20.25C9.52734 20.5801 9.79492 20.8477 10.125 20.8477H13.875C14.2051 20.8477 14.4727 20.5801 14.4727 20.25C14.4727 19.9199 14.2051 19.6523 13.875 19.6523H10.125C9.79492 19.6523 9.52734 19.9199 9.52734 20.25Z"
                                fill="#0066BE"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M3.15234 9.75C3.15234 10.0801 3.42029 10.3477 3.75081 10.3477H4.23543C4.56595 10.3477 4.8339 10.0801 4.8339 9.75C4.8339 9.41992 4.56595 9.15234 4.23543 9.15234H3.75081C3.42029 9.15234 3.15234 9.41992 3.15234 9.75Z"
                                fill="#0066BE"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.27734 6.75C4.27734 7.08008 4.54492 7.34766 4.875 7.34766H19.125C19.4551 7.34766 19.7227 7.08008 19.7227 6.75V3.51562C19.7227 1.63225 18.1959 0.105469 16.3125 0.105469H7.6875C5.80413 0.105469 4.27734 1.63225 4.27734 3.51562V6.75ZM5.47266 6.15234V3.51562C5.47266 2.2924 6.46428 1.30078 7.6875 1.30078H16.3125C17.5357 1.30078 18.5273 2.2924 18.5273 3.51562V6.15234H5.47266Z"
                                fill="#0066BE"
                              />
                            </g>
                          </svg>
                        </button>
                      </div>
                    </div>
                    {Object.keys(accountTimelineData)?.length > 0 ||
                    accountTimelineData ? (
                      <>
                        <div className="timeline-layout crm-timeline">
                          <div className="timeline-layout-inset">
                            <div className="timeline-right-list">
                              <div className="timeline-right-header">
                                <div className="timeline-indicator">
                                  <img
                                    src={
                                      path_image + "informed-circle-icon.svg"
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="timeline-date"></div>
                              </div>

                              <div className="timeline-box">
                                {/* Sorting the dates in descending order */}
                                {Object.keys(accountTimelineData)
                                  .sort(
                                    (a, b) =>
                                      moment(b, "DD MMM YYYY").toDate() -
                                      moment(a, "DD MMM YYYY").toDate()
                                  )
                                  .map((date) => (
                                    <React.Fragment key={date}>
                                      <div className="timeline-sticky">
                                        <div className="timeline-indicator">
                                          <span>&nbsp;</span>
                                        </div>
                                        <div className="timeline-date">
                                          <p>
                                            {date ===
                                            moment("1970-01-01").format(
                                              "MMMM. DD. YYYY"
                                            )
                                              ? "N/A"
                                              : moment(
                                                  date,
                                                  "DD MMM YYYY"
                                                ).format("MMMM. DD. YYYY")}
                                          </p>
                                        </div>
                                      </div>

                                      {accountTimelineData?.[date].map(
                                        (details, index) => (
                                          <div
                                            className="timeline-box-inset"
                                            key={index}
                                          >
                                            {details?.action ===
                                            "Account Password Changed" ? (
                                              <div className="timeline-block">
                                                <div className="timeline-status">
                                                  <p>{details?.action}</p>
                                                  <span>{details?.time}</span>
                                                  <div className="timeline-indicator">
                                                    <div className="indicator-box">
                                                      <img
                                                        src={
                                                          path_image +
                                                          "account-password-change.svg"
                                                        }
                                                        alt=""
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="timeline-details">
                                                  <div className="details-box">
                                                    <p className="timeline-details-heading">
                                                      IP
                                                    </p>
                                                    <p>
                                                      {details?.ipAddress?.replace(
                                                        "::ffff:",
                                                        ""
                                                      )}
                                                    </p>
                                                  </div>

                                                  <div className="details-box">
                                                    <p className="timeline-details-heading">
                                                      Password
                                                    </p>
                                                    <div className="bg-add">
                                                    <p>
                                                      <span>Old |</span>{" "}
                                                      {passwordVisibility.oldPass ? details?.rawData?.oldPass : "•".repeat(details?.rawData?.oldPass.length)}
                                                      <img
                                                        src={passwordVisibility.oldPass ? path_image + "show_p.svg" : path_image + "hide.svg"}
                                                        onClick={() => togglePassword('oldPass')}
                                                        alt=""
                                                      />
                                                    </p>
                                                    <span>.</span>
                                                    <p>
                                                      <span>New |</span>{" "}
                                                      {passwordVisibility.newPass ? details?.rawData?.newpassword : "•".repeat(details?.rawData?.newpassword.length)}
                                                      <img
                                                        src={passwordVisibility.newPass ? path_image + "show_p.svg" : path_image + "hide.svg"}
                                                        onClick={() => togglePassword('newPass')}
                                                        alt=""
                                                      />
                                                    </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ) : details?.action ===
                                              "Account Credential Reset" ? (
                                              <div className="timeline-block">
                                                <div className="timeline-status">
                                                  <p>{details?.action}</p>
                                                  <span>{details?.time}</span>
                                                  <div className="timeline-indicator">
                                                    <div className="indicator-box">
                                                      <img
                                                        src={
                                                          path_image +
                                                          "account-credential-reset.svg"
                                                        }
                                                        alt=""
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="timeline-details">
                                                  <div className="details-box">
                                                    <p className="timeline-details-heading">
                                                      IP
                                                    </p>
                                                    <p>
                                                      {details?.ipAddress?.replace(
                                                        "::ffff:",
                                                        ""
                                                      )}
                                                    </p>
                                                  </div>

                                                  <div className="details-box bg-add">
                                                    <p className="timeline-details-heading">
                                                      Credentials
                                                    </p>
                                                    <div className="bg-add">
                                                      <p>
                                                        <span>Name |</span>{" "}
                                                        {details?.rawData?.name}
                                                      </p>
                                                      <span>.</span>
                                                      <p>
                                                        <span>Email |</span>{" "}
                                                        {
                                                          details?.rawData
                                                            ?.email
                                                        }
                                                      </p>
                                                      <span>.</span>
                                                      <p>
                                                        <span>Password |</span>{" "}
                                                        {
                                                          details?.rawData
                                                            ?.password
                                                        }
                                                        <img
                                                          src={
                                                            path_image +
                                                            "hide.svg"
                                                          }
                                                          alt=""
                                                        />
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ) : details?.action ===
                                              "Account Login" ? (
                                              <div className="timeline-block">
                                                <div className="timeline-status">
                                                  <p>{details?.action}</p>
                                                  <span>{details?.time}</span>
                                                  <div className="timeline-indicator">
                                                    <div className="indicator-box">
                                                      <img
                                                        src={
                                                          path_image +
                                                          "account-login.svg"
                                                        }
                                                        alt=""
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="timeline-details">
                                                  <div className="details-box">
                                                    <p className="timeline-details-heading">
                                                      IP
                                                    </p>
                                                    <p>
                                                      {details?.ipAddress?.replace(
                                                        "::ffff:",
                                                        ""
                                                      )}
                                                    </p>
                                                  </div>

                                                  <div className="details-box bg-add">
                                                    <p className="timeline-details-heading">
                                                      Password
                                                    </p>
                                                    <div className="bg-add">
                                                      <p>
                                                        <span>Password |</span>{" "}
                                                        {
                                                          details?.rawData
                                                            ?.password
                                                        }
                                                        <img
                                                          src={
                                                            path_image +
                                                            "hide.svg"
                                                          }
                                                          alt=""
                                                        />
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ) : details?.action ===
                                              "Account Set-up" ? (
                                              <div className="timeline-block">
                                                <div className="timeline-status">
                                                  <p>{details?.action}</p>
                                                  <span>{details?.time}</span>
                                                  <div className="timeline-indicator">
                                                    <div className="indicator-box">
                                                      <img
                                                        src={
                                                          path_image +
                                                          "account-setup.svg"
                                                        }
                                                        alt=""
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="timeline-details">
                                                  <div className="details-box">
                                                    <p className="timeline-details-heading">
                                                      IP
                                                    </p>
                                                    <p>
                                                      {details?.ipAddress?.replace(
                                                        "::ffff:",
                                                        ""
                                                      )}
                                                    </p>
                                                  </div>

                                                  <div className="details-box bg-add">
                                                    <p className="timeline-details-heading">
                                                      Credentials
                                                    </p>
                                                    <div className="bg-add">
                                                      <p>
                                                        <span>Name |</span>{" "}
                                                        {details?.rawData?.name}
                                                      </p>
                                                      <span>.</span>
                                                      <p>
                                                        <span>Email |</span>{" "}
                                                        {
                                                          details?.rawData
                                                            ?.email
                                                        }
                                                      </p>
                                                      <span>.</span>
                                                      <p>
                                                        <span>Password |</span>{" "}
                                                        {
                                                          details?.rawData
                                                            ?.password
                                                        }
                                                        <img
                                                          src={
                                                            path_image +
                                                            "hide.svg"
                                                          }
                                                          alt=""
                                                        />
                                                      </p>
                                                      <span>.</span>
                                                      <p>
                                                        <span>Country |</span>{" "}
                                                        {
                                                          details?.rawData
                                                            ?.country
                                                        }
                                                      </p>
                                                      <span>.</span>
                                                      <p>
                                                        <span>Company |</span>{" "}
                                                        {
                                                          details?.rawData
                                                            ?.company
                                                        }
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ) : details?.action ===
                                              "Registration Pop-up Update" ? (
                                              <div className="timeline-block">
                                                <div className="timeline-status">
                                                  <p>{details?.action}</p>
                                                  <span>{details?.time}</span>
                                                  <div className="timeline-indicator">
                                                    <div className="indicator-box">
                                                      <img
                                                        src={
                                                          path_image +
                                                          "registration-popup-update.svg"
                                                        }
                                                        alt=""
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="timeline-details">
                                                  <div className="details-box">
                                                    <p className="timeline-details-heading">
                                                      Article
                                                    </p>
                                                    <p>{
                                                          details?.rawData
                                                            ?.title
                                                        }</p>
                                                  </div>

                                                  <div className="details-box">
                                                    <p className="timeline-details-heading">
                                                      IP
                                                    </p>
                                                    <p>
                                                      {details?.ipAddress?.replace(
                                                        "::ffff:",
                                                        ""
                                                      )}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="timeline-block">
                                                <div className="timeline-status">
                                                  <p>{details?.action}</p>
                                                  <span>{details?.time}</span>
                                                  <div className="timeline-indicator">
                                                    <div className="indicator-box">
                                                      <img
                                                        src={
                                                          path_image +
                                                          "irt-invited-training.svg"
                                                        }
                                                        alt=""
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="timeline-details">
                                                  <div className="details-box">
                                                    <p className="timeline-details-heading">
                                                      IP
                                                    </p>
                                                    <p>
                                                      {details?.ipAddress?.replace(
                                                        "::ffff:",
                                                        ""
                                                      )}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        )
                                      )}
                                    </React.Fragment>
                                  ))}
                              </div>
                            </div>
                            {showPagination && (
                              <div className="text-center load_more">
                                <button
                                  className="btn btn-primary"
                                  onClick={handleLoadMore}
                                >
                                  Load More
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="no_found">
                        <p>No Data Found</p>
                      </div>
                    )}
                  </Col>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default SunShineTimeline;
