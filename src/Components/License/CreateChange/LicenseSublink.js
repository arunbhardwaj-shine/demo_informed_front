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
import { loader } from "../../../loader";
import { ENDPOINT } from "../../../axios/apiConfig";
import { postData, getData } from "../../../axios/apiHelper";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import SubLinkListing from "./SubLinkListing";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const LicenseSublink = () => {
  const { state } = useLocation();
  const [allContents, setallContents] = useState([]);
  const [allCodes, setAllCodes] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState();
  const [articleData, setArticleData] = useState();
  const [libraryData, setLibraryData] = useState([]);
  const [createNewLink, setCreateNewLink] = useState(false);
  const [reRenderFlag, setreRenderFlag] = useState(0);
  const [showSubLinkList, setshowSubLinkList] = useState(false);
  const [linkRenderCount, setLinkRenderCount] = useState(0);
  const [changeConsent, setchangeConsent] = useState([]);
  const [flag, setFlag] = useState(0);
  const [opening_details, setOpeningDetails] = useState([]);
  const [userId, setUserId] = useState();
  const [update, setUpdate] = useState(0);
  const [consentValue, setConsentValue] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [newLink, setLink] = useState({
    delivery: "",
  });

  const [types, setTypes] = useState([
    { value: "Online", label: "Online Offer" },
    { value: "Offline", label: "Offline Offer" },
    { value: "Sunshine", label: "Sunshine" },
  ]);
  const [activeTab, setActiveTab] = useState("docintel-link");

  useEffect(() => {
    getLibraryData();
  }, []);

  useEffect(() => {
    getArticleData();
  }, [selectedArticle]);

  const getLibraryData = async () => {
    loader("show");
    try {
      let selectedValue = [];
      let data = {
        user_id: localStorage.getItem("user_id"),
        page: 1,
        search: "",
        type: "All",
        license: 1,
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
          label: item.title.replace(/(<([^>]+)>)/gi, ''),
        });
        codearr.push({
          value: item.id,
          label: item.code,
        });

        setallContents(arr);
        // setAllCodes(codearr);
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
      loader("hide");
    } catch (err) {
      console.log("err");
      loader("hide");
    }
  };

  const onArticleChange = async (event) => {
    setSelectedArticle(event.value);
  };

  const createNewLinkClicked = () => {
    setCreateNewLink(true);
  };
  const handleChange = (name, e) => {
    setLink({ ...newLink, [name]: e });
  };

  const handleSubmit = async () => {
    loader("show");
    try {
      let body = {
        pdfId: selectedArticle,
        campaignId: newLink.delivery,
        name: identifier,
      };
      const res = await postData(ENDPOINT.LIBRARYREADDSUBLINK, body);
      setLink({
        ...newLink,
        delivery: "",
      });

      setshowSubLinkList(true);
      setLinkRenderCount(linkRenderCount + 1);
      loader("hide");
    } catch (err) {
      console.log("err", err);
      loader("hide");
    }
    setCreateNewLink(false);

    // console.log(newLink.delivery);
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

          loader("hide");
        } catch (err) {
          console.log("err");
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
    loader("show");
    try {
      const index = changeConsent.findIndex((el) => el.index === pdf_id);
      let consent_value = changeConsent[index].value;

      let body = {
        pdfId: pdf_id,
        consentType: consent_value,
      };

      // const res = await updateConsent(ENDPOINT.LIBRARYCHANGECONSENT, body);
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

  const onIdentifierChange = (event) => {
    setIdentifier(event.target.value);
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
      data = data.trim().slice(0, -1);
    } else {
      data = "N/A";
    }
    return data;
  };

  const navigate = useNavigate();
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
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
                <h2>New SubLink</h2>
              </div>
              {/* <div className="header-btn">
                <Button
                  className="btn-bordered cancel"
                  onClick={() => navigate("/license-create")}
                >
                  Close
                </Button>
              </div> */}
            </div>
            <div className="create-change-content spc-content">
              <div className="form_action">
                <div className="row">
                  <Col className="sublink_left">
                    <h5>
                      Please find the content you'd like a new subLink for
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
                                  <div className="doc-content-header-logo">
                                    <a href="#">
                                      <img
                                        alt="doc-logo"
                                        src={articleData?.coverImage}
                                        style={{ width: "67px" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="doc-content">
                                    <h5
                                      dangerouslySetInnerHTML={{
                                        __html: articleData?.title,
                                      }}
                                    >
                                      {/* {articleData?.title} */}
                                    </h5>
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
                                    // defaultActiveKey="docintel-link"
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
                                              toast.success(
                                                "content copied to the clipboard!"
                                              );
                                              window.navigator.clipboard.writeText(
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
                                              <strong>Upload date</strong>
                                            </h6>
                                            <h6>{articleData?.uploadedDate}</h6>
                                          </li>
                                          <li>
                                            <h6 className="tab-content-title">
                                              <strong>inforMedGO code</strong>
                                            </h6>
                                            <h6>
                                              {articleData?.code}
                                              <span
                                                className="copy-content"
                                                onClick={() => {
                                                  toast.success(
                                                    "content copied to the clipboard!"
                                                  );
                                                  navigator.clipboard.writeText(
                                                    articleData?.code
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
                                              <strong>Docintel code</strong>
                                            </h6>
                                            <h6>
                                              {articleData?.docintel_code}
                                              <span
                                                className="copy-content"
                                                onClick={() => {
                                                  toast.success(
                                                    "content copied to the clipboard!"
                                                  );
                                                  navigator.clipboard.writeText(
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
                                            </h6>
                                          </li>
                                          <li>
                                            <h6 className="tab-content-title">
                                              <strong>SPC included</strong>
                                            </h6>
                                            <h6>
                                              {articleData?.spc_included == 0
                                                ? "No"
                                                : "Yes"}
                                            </h6>
                                          </li>
                                          <li>
                                            <h6 className="tab-content-title">
                                              <strong>Language</strong>
                                            </h6>
                                            <h6>No</h6>
                                          </li>
                                          <li>
                                            <h6 className="tab-content-title">
                                              <strong>Link type</strong>
                                            </h6>
                                            <h6>{articleData?.linkType}</h6>
                                          </li>
                                          <li>
                                            <h6 className="tab-content-title">
                                              <strong>Enhanced</strong>
                                            </h6>
                                            <div className="include-links">
                                              {articleData?.spc_included ? (
                                                <img
                                                  src={
                                                    path_image + "spc-img.png"
                                                  }
                                                  alt=""
                                                />
                                              ) : (
                                                ""
                                              )}

                                              {articleData?.linkRelations ? (
                                                <img
                                                  src={
                                                    path_image + "video-img.png"
                                                  }
                                                  alt=""
                                                />
                                              ) : (
                                                ""
                                              )}
                                              {articleData?.pdfLinks ? (
                                                <img
                                                  src={
                                                    path_image + "link-img.png"
                                                  }
                                                  alt=""
                                                />
                                              ) : (
                                                ""
                                              )}

                                              {articleData?.linkRelations ? (
                                                <img
                                                  src={
                                                    path_image + "video-img.png"
                                                  }
                                                  alt=""
                                                />
                                              ) : (
                                                ""
                                              )}
                                              {articleData?.pdfLinks ? (
                                                <img
                                                  src={
                                                    path_image + "link-img.png"
                                                  }
                                                  alt=""
                                                />
                                              ) : (
                                                ""
                                              )}

                                              {articleData.spc_included == 0 &&
                                                articleData.linkRelations ==
                                                  0 &&
                                                articleData.pdfLinks == 0 && (
                                                  <h6>No</h6>
                                                )}
                                            </div>
                                          </li>
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
                                              Unique Reader (total)
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
                                                              details?.uniqueReader ==
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
                                                                ? "Unlimited"
                                                                : details?.limit ==
                                                                  1000
                                                                ? "Unlimited"
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
                                            <Select
                                              options={types}
                                              value={consentValue}
                                              defaultValue={
                                                articleData.linkType == "Online"
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
                                      title="Sales"
                                      className="flex-column justify-content-between"
                                    >
                                      <div className="tab-panel">
                                        <ul className="tab-mail-list">
                                          {localStorage.getItem("group_id") ==
                                            2 && (
                                            <>
                                              <li>
                                                <h6 className="tab-content-title">
                                                  Sales person
                                                </h6>
                                                <h6>
                                                  {articleData?.saleName
                                                    ? articleData.saleName
                                                    : "N/A"}
                                                </h6>
                                              </li>
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
                                                  Client product
                                                </h6>
                                                <h6>
                                                  {articleData?.product
                                                    ? articleData.product
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

                                              <li>
                                                <h6 className="tab-content-title">
                                                  Client name
                                                </h6>
                                                <h6>
                                                  {articleData?.company +
                                                    " " +
                                                    articleData?.product +
                                                    " " +
                                                    articleData?.country}
                                                </h6>
                                              </li>
                                            </>
                                          )}
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

                                          <li>
                                            <h6 className="tab-content-title">
                                              Upload date
                                            </h6>
                                            <h6>{articleData?.uploadedDate}</h6>
                                          </li>
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
                      <h5>SubLinks:</h5>
                      <Button
                        className={
                          !selectedArticle
                            ? "btn-filled btn-disabled"
                            : "btn-filled"
                        }
                        onClick={createNewLinkClicked}
                      >
                        Create New Link +
                      </Button>
                    </div>
                    <SubLinkListing
                      pdfid={selectedArticle}
                      render={showSubLinkList}
                      count={linkRenderCount}
                    />
                    {
                      // <div className="sublink_right_block"></div>
                    }
                  </Col>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>

      <Modal show={createNewLink} className="send-confirm" id="download-qr">
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            Create New Link
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              setCreateNewLink(false);
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="">Delivery</label>
            <DropdownButton
              className={
                "dropdown-basic-button split-button-dropup " +
                (newLink?.delivery ? "addval" : "")
              }
              title={
                newLink?.delivery ? newLink?.delivery : "Select delivery type"
              }
              name="delivery"
              onSelect={(e) => handleChange("delivery", e)}
            >
              <div className="scroll_div">
                <Dropdown.Item
                  eventKey="Email"
                  className={newLink?.delivery == "Email" ? "active" : ""}
                >
                  Email
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="InforMedGO"
                  className={newLink?.delivery == "InforMedGO" ? "active" : ""}
                >
                  InforMedGO
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Social"
                  className={newLink?.delivery == "Social" ? "active" : ""}
                >
                  Social
                </Dropdown.Item>

                <Dropdown.Item
                  eventKey="Website"
                  className={newLink?.delivery == "Website" ? "active" : ""}
                >
                  Website
                </Dropdown.Item>
              </div>
            </DropdownButton>
          </div>

          <div className="form-group">
            <label htmlFor="">Identifier</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              onChange={(event) => onIdentifierChange(event)}
            />
          </div>
        </Modal.Body>

        <div className="modal-footer">
          <button
            type="button"
            className={
              !(newLink?.delivery && identifier.trim().length > 0)
                ? "btn btn-primary save btn-filled btn-disabled"
                : "btn btn-primary save btn-filled"
            }
            onClick={() => handleSubmit()}
          >
            Apply
          </button>
        </div>
      </Modal>
    </>
  );
};

export default LicenseSublink;
