import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Modal,
  DropdownButton,
  Form,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { loader } from "../../loader";
import SurveySublinkListing from "./SurveySublinkListing";
import { surveyAxiosInstance } from "./CommonFunctions/CommonFunction";
import { surveyEndpoints } from "./SurveyEndpoints/SurveyEndpoints";
import { format } from "date-fns";
let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;

const SurveySublink = () => {
  const {
    FETCH_ALL_SURVEY_TITLE,
    INSERT_SUBLINK_INFORMATION,
    FETCH_SURVEY_DATA,
  } = surveyEndpoints;
  const { state } = useLocation();
  const [allContents, setallContents] = useState([]);
  const [allCodes, setAllCodes] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState();
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
  const [data, setIsData] = useState([]);

  const [newLink, setLink] = useState({
    delivery: "",
  });

  const [types, setTypes] = useState([
    { value: "Online ", label: "Online Offer" },
  ]);
  const [activeTab, setActiveTab] = useState("docintel-link");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg==") {
      let linktype = types;
      linktype.push(
        { value: "Offline Offer", label: "Offline Offer" },
        { value: "Sunshine", label: "Sunshine" }
      );
      setTypes(linktype);
    }
   
       getSurveyData();
    
   
  }, []);

  useEffect(() => {
    if(selectedSurveyId){
      getArticleData();
    }
  }, [selectedSurveyId]);

  const getSurveyData = async () => {
    try {
      loader("show");

      // const res = await surveyAxiosInstance.post(FETCH_ALL_SURVEY_TITLE, {
      //   admin_id: 18207,
      // });
      const res = await surveyAxiosInstance.post(FETCH_ALL_SURVEY_TITLE);

      let arr = [];
      let codearr = [];
      Object.entries(res?.data?.data).map(([index, item]) => {
        arr.push({
          value: item.id,
          label: item.survey_title.replace(/(<([^>]+)>)/gi, ""),
        });
        codearr.push({
          value: item.id,
          label: item.unique_code,
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
      setLibraryData((oldArray) => [...oldArray, ...res?.data?.data]);

      if (typeof selectedSurveyId === "undefined") {
        if (state?.survey_id) {
          setSelectedSurveyId(state.survey_id);
        }
      }

      loader("hide");
    } catch (err) {
      console.log("err");
      toast.error("Something went wrong");
    } finally {
      loader("hide");
    }
  };

  const onArticleChange = async (event) => {
    setSelectedSurveyId(event.value);
  };

  const createNewLinkClicked = () => {
    setCreateNewLink(true);
  };
  const handleChange = (name, e) => {
    setLink({ ...newLink, [name]: e });
  };

  const handleSubmit = async () => {
    try {
      loader("show");
      let body = {
        survey_id: selectedSurveyId,
        delivery: newLink.delivery,
        identifier: identifier,
      };
      const res = await surveyAxiosInstance.post(
        INSERT_SUBLINK_INFORMATION,
        body
      );
      setLink((prevLink) => ({
        ...prevLink,
        delivery: "", // Clear the delivery field
      }));
      setshowSubLinkList(true);
      setLinkRenderCount((prevCount) => prevCount + 1); // Increment render count
    } catch (err) {
      console.log("err", err);
      toast.error("Something went wrong");
    } finally {
      loader("hide");
    }
    setCreateNewLink(false);
  };

  const getArticleData = async () => {
    try {
      loader("show");

      setIsData([]);

      // let res = await surveyAxiosInstance.post(FETCH_SURVEY_DATA, {
      //   admin_id: 18207,
      //   survey_id: selectedSurveyId,
      // });
      let res = await surveyAxiosInstance.post(FETCH_SURVEY_DATA, {
        survey_id: selectedSurveyId,
      });

      const survey_data = res?.data?.data;

      if (survey_data.length > 0) {
        setIsData(survey_data[0]);
      }

      loader("hide");
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };

  const onIdentifierChange = (event) => {
    setIdentifier(event.target.value);
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title d-flex">
                <h2>SubLinks</h2>
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
            <div className="create-change-content survey-sublink">
              <div className="form_action">
                <div className="row">
                  <Col className="sublink_left">
                    <h5>Please find the survey you'd like a new subLink for</h5>
                    <div className="product-unit d-flex justify-content-between align-items-center">
                      <div className="form-group">
                        <label htmlFor="">Survey</label>
                        <Select
                          options={allContents}
                          placeholder="Select survey to create a sublink "
                          onChange={(event) => onArticleChange(event)}
                          value={
                            selectedSurveyId != ""
                              ? allContents[
                                  allContents.findIndex(
                                    (el) => el.value === selectedSurveyId
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
                          placeholder="Select survey URL"
                          onChange={(event) => onArticleChange(event)}
                          value={
                            selectedSurveyId != ""
                              ? allCodes[
                                  allCodes.findIndex(
                                    (el) => el.value === selectedSurveyId
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
                        {data?.length != "0" && selectedSurveyId ? (
                          <>
                            <div className="survey-builder">
                              <div className="survey-listing">
                                <div className="library-content-box-layuot">
                                  <div className="email_box_block">
                                    <div
                                      className={
                                        data?.is_draft != null &&
                                        data?.is_draft == "0"
                                          ? "email_box email-draft"
                                          : "email_box approved"
                                      }
                                    >
                                      {data?.is_draft != null &&
                                        data?.is_draft == "0" && (
                                          <div className="mail-top-title">
                                            <span>Draft</span>
                                          </div>
                                        )}

                                      <div className="mail-box-content">
                                        <div className="mail-box-content-top">
                                          <div className="mail-box-content-top-view">
                                            {data?.is_draft == "1" && (
                                              <div className="survey_status">
                                                <span>Live</span>
                                              </div>
                                            )}
                                            {data?.is_draft == "2" && (
                                              <div className="survey_status completed">
                                                <span>Completed</span>
                                              </div>
                                            )}

                                            <h5>{data?.survey_title}</h5>
                                            <p>{data?.subtitle}</p>
                                          </div>
                                        </div>
                                        <div className="tabs-data">
                                          <Tabs defaultActiveKey="link">
                                            <Tab eventKey="link" title="Link">
                                              <div className="survey_tabs_data">
                                                <div className="tab-panel">
                                                  <div className="tab-content-links">
                                                    <a>
                                                      https://survey.docintel.app/survey?Utmde=
                                                      {data.unique_code}
                                                    </a>
                                                    {data?.is_draft ? (
                                                      <span
                                                        className="copy-content"
                                                        // onClick={() =>
                                                        //   copyHandler(data.unique_code)
                                                        // }
                                                      >
                                                        <img
                                                          src={
                                                            path_image +
                                                            "copy-content.svg"
                                                          }
                                                          alt="Copy"
                                                        />
                                                      </span>
                                                    ) : (
                                                      <span  className="copy-content">
                                                        <img
                                                          src={
                                                            path_image +
                                                            "copy-content-disabled.svg"
                                                          }
                                                          alt="Copy"
                                                        />
                                                      </span>
                                                    )}
                                                    {data?.is_draft ? (
                                                      <div className="tab-content-qr">
                                                        <img
                                                          src={
                                                            path_image +
                                                            "qr-code-icon.svg"
                                                          }
                                                          alt="QR"
                                                        />
                                                        <img
                                                          src={
                                                            path_image +
                                                            "download-icon.svg"
                                                          }
                                                          alt="Download"
                                                        />
                                                      </div>
                                                    ) : (
                                                      <div className="tab-content-qr">
                                                        <img
                                                          src={
                                                            path_image +
                                                            "qr-code-icon-disabled.svg"
                                                          }
                                                          alt="QR"
                                                        />
                                                        <img
                                                          src={
                                                            path_image +
                                                            "download-icon-disabled.svg"
                                                          }
                                                          alt="Download"
                                                        />
                                                      </div>
                                                    )}
                                                  </div>
                                                  <ul className="survey-consent">
                                                    <li className="d-flex align-items-center">
                                                      <h6 className="tab-content-title">
                                                        Consent
                                                      </h6>
                                                      {data?.survey_consent !=
                                                      "" ? (
                                                        data.survey_consent ===
                                                        "Mandatory consent" ? (
                                                          <h6>Mandatory</h6>
                                                        ) : data.survey_consent ===
                                                          "Optional consent" ? (
                                                          <h6>Optional</h6>
                                                        ) : (
                                                          <h6>Anonymous</h6>
                                                        )
                                                      ) : (
                                                        <h6>N/A</h6>
                                                      )}
                                                    </li>
                                                    <li className="d-flex align-items-center">
                                                      <h6 className="tab-content-title">
                                                        Creator
                                                      </h6>
                                                      <h6>
                                                        {data?.creator_name}
                                                      </h6>
                                                    </li>
                                                  </ul>
                                                  <div  className="mailbox-tags">
                                                    <ul>
                                                      {JSON?.parse(data?.tags)
                                                        ?.length > 0 ? (
                                                        JSON?.parse(
                                                          data?.tags
                                                        ).map((tag, index) => (
                                                          <li key={index}>
                                                            {tag}
                                                          </li>
                                                        ))
                                                      ) : (
                                                        <li>N/A</li>
                                                      )}
                                                    </ul>
                                                  </div>
                                                  <div  className="mail-time">
                                                    <span>
                                                      {format(
                                                        new Date(data?.date),
                                                        "MMMM d, yyyy '|' h:mm a"
                                                      )}
                                                    </span>
                                                  </div>
                                                  {data?.is_draft != null &&
                                                  data?.is_draft == "0" ? (
                                                    <div  className="mail-stats">
                                                      <ul>
                                                        <li>
                                                          <div
                                                             className="mail-status irts"
                                                            title="Sublinks"
                                                          >
                                                            <svg
                                                              width="16"
                                                              height="16"
                                                              viewBox="0 0 16 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M9.59862 1.09837L6.34653 4.35044C6.34025 4.35669 6.33634 4.36428 6.33009 4.37059C7.13125 4.25391 7.95428 4.33391 8.71722 4.63141L10.9244 2.42422C11.6556 1.693 12.8448 1.693 13.5761 2.42422C14.3073 3.15537 14.3073 4.34466 13.5761 5.07581C13.4514 5.20056 10.136 8.51597 10.324 8.32787C9.587 9.06494 8.37787 9.03341 7.67234 8.32787C7.30694 7.96247 6.712 7.96247 6.34653 8.32787L5.77734 8.89706C5.93522 9.16531 6.11622 9.42344 6.34653 9.65375C7.73528 11.0425 10.1257 11.1534 11.6297 9.67019C11.636 9.66394 11.6435 9.66 11.6498 9.65375L14.9019 6.40169C16.3663 4.93719 16.3663 2.56287 14.9019 1.09837C13.4374 -0.366125 11.0631 -0.366125 9.59862 1.09837Z"
                                                                fill="#97B6CF"
                                                                fill-opacity="0.6"
                                                              />
                                                              <path
                                                                d="M7.29013 11.3608L5.07582 13.5751C4.34466 14.3063 3.15538 14.3063 2.42423 13.5751C1.69301 12.8439 1.69301 11.6546 2.42423 10.9234C2.54891 10.7987 5.87141 7.47623 5.68338 7.66426C6.42038 6.92726 7.62951 6.95873 8.33504 7.66426C8.70044 8.02973 9.29541 8.02973 9.66085 7.66426L10.23 7.09507C10.0722 6.82682 9.89116 6.56869 9.66085 6.33844C8.27476 4.95229 5.88607 4.83435 4.3777 6.32198C4.37141 6.32823 4.36385 6.33216 4.35754 6.33844L1.09835 9.59763C-0.366086 11.0621 -0.366148 13.4364 1.09835 14.9009C2.56285 16.3654 4.93723 16.3654 6.40166 14.9009L9.66082 11.6417C9.6671 11.6355 9.67101 11.6279 9.67726 11.6216C8.8761 11.7383 8.0531 11.6583 7.29013 11.3608Z"
                                                                fill="#97B6CF"
                                                                fill-opacity="0.6"
                                                              />
                                                            </svg>
                                                          </div>
                                                          <span>0</span>
                                                        </li>
                                                        <li>
                                                          <div
                                                             className="mail-status mail-hit"
                                                            title="Link opening"
                                                          >
                                                            <svg
                                                              width="14"
                                                              height="16"
                                                              viewBox="0 0 14 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z"
                                                                fill="#C8D1D9"
                                                              ></path>
                                                              <path
                                                                d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z"
                                                                fill="#C8D1D9"
                                                              ></path>
                                                            </svg>
                                                          </div>
                                                          <span>0</span>
                                                        </li>
                                                        <li>
                                                          <div
                                                             className="mail-status mail_view"
                                                            title="Started"
                                                          >
                                                            <svg
                                                              width="17"
                                                              height="16"
                                                              viewBox="0 0 17 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M6.46443 6.80015C8.34247 6.80015 9.86464 5.27769 9.86464 3.39993C9.86464 1.52217 8.34218 0 6.46443 0C4.58667 0 3.06363 1.52246 3.06363 3.40022C3.06363 5.27797 4.58667 6.80015 6.46443 6.80015Z"
                                                                fill="#97B6CF"
                                                                fill-opacity="0.6"
                                                              />
                                                              <path
                                                                d="M7.90674 7.0319H5.02153C2.62095 7.0319 0.667969 8.98517 0.667969 11.3858V14.9141L0.676938 14.9694L0.919976 15.0455C3.2109 15.7613 5.20121 16 6.8394 16C8.20976 16 9.3334 15.8327 10.1793 15.6368C9.44888 14.8611 9.0013 13.8162 9.0013 12.6667C9.0013 10.9692 9.97731 9.4997 11.3988 8.78873C10.6046 7.7232 9.33488 7.0319 7.90674 7.0319Z"
                                                                fill="#97B6CF"
                                                                fill-opacity="0.6"
                                                              />
                                                              <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M13.3346 9.33333C11.4938 9.33333 10.0013 10.8258 10.0013 12.6667C10.0013 14.5076 11.4938 16 13.3346 16C15.1755 16 16.668 14.5076 16.668 12.6667C16.668 10.8258 15.1755 9.33333 13.3346 9.33333ZM11.8679 12.2998C11.5918 12.2998 11.3679 12.5237 11.3679 12.7998C11.3679 13.0759 11.5918 13.2998 11.8679 13.2998H14.8679C15.1441 13.2998 15.3679 13.0759 15.3679 12.7998C15.3679 12.5237 15.1441 12.2998 14.8679 12.2998H11.8679Z"
                                                                fill="#97B6CF"
                                                                fill-opacity="0.6"
                                                              />
                                                            </svg>
                                                          </div>
                                                          <span>0 </span>
                                                        </li>
                                                        <li>
                                                          <div
                                                             className="mail-status mail_click"
                                                            title="Completed"
                                                          >
                                                            <svg
                                                              width="16"
                                                              height="16"
                                                              viewBox="0 0 16 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M5.79646 6.80015C7.6745 6.80015 9.19667 5.27769 9.19667 3.39993C9.19667 1.52217 7.67421 0 5.79646 0C3.9187 0 2.39566 1.52246 2.39566 3.40022C2.39566 5.27797 3.9187 6.80015 5.79646 6.80015Z"
                                                                fill="#97B6CF"
                                                                fill-opacity="0.6"
                                                              />
                                                              <path
                                                                d="M7.23877 7.0319H4.35356C1.95298 7.0319 0 8.98517 0 11.3858V14.9141L0.00896932 14.9694L0.252007 15.0455C2.54293 15.7613 4.53324 16 6.17143 16C7.54179 16 8.66543 15.8327 9.5113 15.6368C8.78091 14.8611 8.33333 13.8162 8.33333 12.6667C8.33333 10.9692 9.30935 9.4997 10.7308 8.78873C9.93663 7.7232 8.66691 7.0319 7.23877 7.0319Z"
                                                                fill="#97B6CF"
                                                                fill-opacity="0.6"
                                                              />
                                                              <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M9.33333 12.6667C9.33333 10.8258 10.8258 9.33333 12.6667 9.33333C14.5076 9.33333 16 10.8258 16 12.6667C16 14.5076 14.5076 16 12.6667 16C10.8258 16 9.33333 14.5076 9.33333 12.6667ZM12.4583 14.0404L14.5652 11.9336C14.6073 11.8915 14.6407 11.8416 14.6634 11.7866C14.6862 11.7316 14.6979 11.6727 14.6979 11.6132C14.6979 11.5537 14.6862 11.4948 14.6634 11.4399C14.6406 11.3849 14.6072 11.335 14.5652 11.2929C14.5231 11.2508 14.4732 11.2175 14.4182 11.1947C14.3632 11.172 14.3043 11.1602 14.2448 11.1602C14.1853 11.1603 14.1264 11.172 14.0714 11.1947C14.0165 11.2175 13.9665 11.2509 13.9245 11.293L12.1379 13.0793L11.4087 12.3501C11.3669 12.3071 11.3169 12.2728 11.2617 12.2493C11.2064 12.2257 11.1471 12.2134 11.0871 12.213C11.027 12.2126 10.9675 12.2241 10.912 12.2469C10.8564 12.2697 10.806 12.3033 10.7635 12.3457C10.7211 12.3882 10.6875 12.4386 10.6647 12.4941C10.6419 12.5497 10.6304 12.6092 10.6308 12.6692C10.6312 12.7292 10.6436 12.7886 10.6671 12.8438C10.6907 12.899 10.7249 12.949 10.768 12.9909L11.8176 14.0404C11.8596 14.0824 11.9096 14.1158 11.9646 14.1386C12.0195 14.1614 12.0785 14.1731 12.138 14.1731C12.1975 14.1731 12.2564 14.1614 12.3114 14.1386C12.3663 14.1158 12.4163 14.0824 12.4583 14.0404Z"
                                                                fill="#97B6CF"
                                                                fill-opacity="0.6"
                                                              />
                                                            </svg>
                                                          </div>
                                                          <span>0 </span>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  ) : (
                                                    <div  className="mail-stats">
                                                      <ul>
                                                        <li>
                                                          <div
                                                             className="mail-status mail_send"
                                                            title="Sublinks"
                                                          >
                                                            <svg
                                                              width="16"
                                                              height="16"
                                                              viewBox="0 0 16 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M9.59862 1.09837L6.34653 4.35044C6.34025 4.35669 6.33634 4.36428 6.33009 4.37059C7.13125 4.25391 7.95428 4.33391 8.71722 4.63141L10.9244 2.42422C11.6556 1.693 12.8448 1.693 13.5761 2.42422C14.3073 3.15537 14.3073 4.34466 13.5761 5.07581C13.4514 5.20056 10.136 8.51597 10.324 8.32787C9.587 9.06494 8.37787 9.03341 7.67234 8.32787C7.30694 7.96247 6.712 7.96247 6.34653 8.32787L5.77734 8.89706C5.93522 9.16531 6.11622 9.42344 6.34653 9.65375C7.73528 11.0425 10.1257 11.1534 11.6297 9.67019C11.636 9.66394 11.6435 9.66 11.6498 9.65375L14.9019 6.40169C16.3663 4.93719 16.3663 2.56287 14.9019 1.09837C13.4374 -0.366125 11.0631 -0.366125 9.59862 1.09837Z"
                                                                fill="#97B6CF"
                                                                fill-opacity="1"
                                                              ></path>
                                                              <path
                                                                d="M7.29013 11.3608L5.07582 13.5751C4.34466 14.3063 3.15538 14.3063 2.42423 13.5751C1.69301 12.8439 1.69301 11.6546 2.42423 10.9234C2.54891 10.7987 5.87141 7.47623 5.68338 7.66426C6.42038 6.92726 7.62951 6.95873 8.33504 7.66426C8.70044 8.02973 9.29541 8.02973 9.66085 7.66426L10.23 7.09507C10.0722 6.82682 9.89116 6.56869 9.66085 6.33844C8.27476 4.95229 5.88607 4.83435 4.3777 6.32198C4.37141 6.32823 4.36385 6.33216 4.35754 6.33844L1.09835 9.59763C-0.366086 11.0621 -0.366148 13.4364 1.09835 14.9009C2.56285 16.3654 4.93723 16.3654 6.40166 14.9009L9.66082 11.6417C9.6671 11.6355 9.67101 11.6279 9.67726 11.6216C8.8761 11.7383 8.0531 11.6583 7.29013 11.3608Z"
                                                                fill="#97B6CF"
                                                                fill-opacity="1"
                                                              ></path>
                                                            </svg>
                                                          </div>
                                                          <span>
                                                            {
                                                              data.total_sublinks
                                                            }
                                                          </span>
                                                        </li>
                                                        <li>
                                                          <div
                                                             className="mail-status mail-hit"
                                                            title="Link opening"
                                                          >
                                                            <svg
                                                              width="14"
                                                              height="16"
                                                              viewBox="0 0 14 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z"
                                                                fill="#0066BE"
                                                              ></path>
                                                              <path
                                                                d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z"
                                                                fill="#0066BE"
                                                              ></path>
                                                            </svg>
                                                          </div>
                                                          <span>
                                                            {data.user_opening}
                                                          </span>
                                                        </li>
                                                        <li>
                                                          <div
                                                             className="mail-status mail_view"
                                                            title="Started"
                                                          >
                                                            <svg
                                                              width="17"
                                                              height="16"
                                                              viewBox="0 0 17 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M6.46443 6.80015C8.34247 6.80015 9.86464 5.27769 9.86464 3.39993C9.86464 1.52217 8.34218 0 6.46443 0C4.58667 0 3.06363 1.52246 3.06363 3.40022C3.06363 5.27797 4.58667 6.80015 6.46443 6.80015Z"
                                                                fill="#FAC755"
                                                                fill-opacity="1"
                                                              ></path>
                                                              <path
                                                                d="M7.90674 7.0319H5.02153C2.62095 7.0319 0.667969 8.98517 0.667969 11.3858V14.9141L0.676938 14.9694L0.919976 15.0455C3.2109 15.7613 5.20121 16 6.8394 16C8.20976 16 9.3334 15.8327 10.1793 15.6368C9.44888 14.8611 9.0013 13.8162 9.0013 12.6667C9.0013 10.9692 9.97731 9.4997 11.3988 8.78873C10.6046 7.7232 9.33488 7.0319 7.90674 7.0319Z"
                                                                fill="#FAC755"
                                                                fill-opacity="1"
                                                              ></path>
                                                              <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M13.3346 9.33333C11.4938 9.33333 10.0013 10.8258 10.0013 12.6667C10.0013 14.5076 11.4938 16 13.3346 16C15.1755 16 16.668 14.5076 16.668 12.6667C16.668 10.8258 15.1755 9.33333 13.3346 9.33333ZM11.8679 12.2998C11.5918 12.2998 11.3679 12.5237 11.3679 12.7998C11.3679 13.0759 11.5918 13.2998 11.8679 13.2998H14.8679C15.1441 13.2998 15.3679 13.0759 15.3679 12.7998C15.3679 12.5237 15.1441 12.2998 14.8679 12.2998H11.8679Z"
                                                                fill="#FAC755"
                                                                fill-opacity="1"
                                                              ></path>
                                                            </svg>
                                                          </div>
                                                          <span>
                                                            {data.Dropoff}
                                                          </span>
                                                        </li>
                                                        <li>
                                                          <div
                                                             className="mail-status mail_click"
                                                            title="Completed"
                                                          >
                                                            <svg
                                                              width="16"
                                                              height="16"
                                                              viewBox="0 0 16 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M5.79646 6.80015C7.6745 6.80015 9.19667 5.27769 9.19667 3.39993C9.19667 1.52217 7.67421 0 5.79646 0C3.9187 0 2.39566 1.52246 2.39566 3.40022C2.39566 5.27797 3.9187 6.80015 5.79646 6.80015Z"
                                                                fill="#39CABC"
                                                              />
                                                              <path
                                                                d="M7.23877 7.0319H4.35356C1.95298 7.0319 0 8.98517 0 11.3858V14.9141L0.00896932 14.9694L0.252007 15.0455C2.54293 15.7613 4.53324 16 6.17143 16C7.54179 16 8.66543 15.8327 9.5113 15.6368C8.78091 14.8611 8.33333 13.8162 8.33333 12.6667C8.33333 10.9692 9.30935 9.4997 10.7308 8.78873C9.93663 7.7232 8.66691 7.0319 7.23877 7.0319Z"
                                                                fill="#39CABC"
                                                              />
                                                              <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M9.33333 12.6667C9.33333 10.8258 10.8258 9.33333 12.6667 9.33333C14.5076 9.33333 16 10.8258 16 12.6667C16 14.5076 14.5076 16 12.6667 16C10.8258 16 9.33333 14.5076 9.33333 12.6667ZM12.4583 14.0404L14.5652 11.9336C14.6073 11.8915 14.6407 11.8416 14.6634 11.7866C14.6862 11.7316 14.6979 11.6727 14.6979 11.6132C14.6979 11.5537 14.6862 11.4948 14.6634 11.4399C14.6406 11.3849 14.6072 11.335 14.5652 11.2929C14.5231 11.2508 14.4732 11.2175 14.4182 11.1947C14.3632 11.172 14.3043 11.1602 14.2448 11.1602C14.1853 11.1603 14.1264 11.172 14.0714 11.1947C14.0165 11.2175 13.9665 11.2509 13.9245 11.293L12.1379 13.0793L11.4087 12.3501C11.3669 12.3071 11.3169 12.2728 11.2617 12.2493C11.2064 12.2257 11.1471 12.2134 11.0871 12.213C11.027 12.2126 10.9675 12.2241 10.912 12.2469C10.8564 12.2697 10.806 12.3033 10.7635 12.3457C10.7211 12.3882 10.6875 12.4386 10.6647 12.4941C10.6419 12.5497 10.6304 12.6092 10.6308 12.6692C10.6312 12.7292 10.6436 12.7886 10.6671 12.8438C10.6907 12.899 10.7249 12.949 10.768 12.9909L11.8176 14.0404C11.8596 14.0824 11.9096 14.1158 11.9646 14.1386C12.0195 14.1614 12.0785 14.1731 12.138 14.1731C12.1975 14.1731 12.2564 14.1614 12.3114 14.1386C12.3663 14.1158 12.4163 14.0824 12.4583 14.0404Z"
                                                                fill="#39CABC"
                                                              />
                                                            </svg>
                                                          </div>
                                                          <span>
                                                            {data.percentage}%
                                                          </span>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  )}
                                                </div>
                                                <div  className="mailbox-buttons">
                                                  <div className="send_new">
                                                    <Button className="btn-bordered send-new disabled">
                                                      Analytics
                                                    </Button>
                                                  </div>
                                                  <div  className="mailbox-buttons-list">
                                                    <Button
                                                      className="send btn-bordered"
                                                      // onClick={(e) =>
                                                      //   editHandler(
                                                      //     e,
                                                      //     data?.current_route,
                                                      //     data
                                                      //   )
                                                      // }
                                                    >
                                                      Edit
                                                    </Button>
                                                    <Button className="edit btn-filled">
                                                      Preview
                                                    </Button>
                                                  </div>
                                                </div>
                                              </div>
                                            </Tab>
                                            <Tab
                                              eventKey="sublinks"
                                              title="Sublinks"
                                              className="change-tab flex-column justify-content-between"
                                            >
                                              <div className="survey_tabs_data">
                                                <div className="data-main-box change-tab-main-box tab-panel">
                                                  <ul className="tab-mail-list data change">
                                                    <li>
                                                      <h6 className="tab-content-title">
                                                        SubLinks
                                                      </h6>
                                                      <div className="select-dropdown-wrapper">
                                                        <div className="select">
                                                          <Select
                                                            aria-label="SSelect Sublink"
                                                            className="dropdown-basic-button split-button-dropup"
                                                            name="surveyCreator"
                                                            placeholder="Select Sublink"
                                                            // options={selectOptions}
                                                          />
                                                          <Button>Copy</Button>
                                                        </div>
                                                      </div>
                                                    </li>
                                                    <li>
                                                      <h6 className="tab-content-title">
                                                        QR Codes
                                                      </h6>
                                                      <div className="select-dropdown-wrapper">
                                                        <div className="select">
                                                          <Select
                                                            aria-label="Select Sublink"
                                                            className="dropdown-basic-button split-button-dropup"
                                                            name="surveyCreator"
                                                            placeholder="Select Sublink"
                                                            // options={selectOptions}
                                                          />
                                                          <Button>
                                                            Download
                                                          </Button>
                                                        </div>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </div>

                                                <div  className="mailbox-buttons justify-content-end">
                                                  <div className="send_new">
                                                    <Button className="btn-bordered send-new">
                                                      New Sublink
                                                    </Button>
                                                  </div>
                                                </div>
                                              </div>
                                            </Tab>
                                            <Tab
                                              eventKey="setting"
                                              title="Setting"
                                            >
                                              <div className="survey_tabs_data survey-setting">
                                                <div  className="d-flex align-items-center justify-content-start">
                                                  {data?.is_draft ? (
                                                    <>
                                                      {" "}
                                                      <p  className="option-heading">
                                                        Status:{" "}
                                                        <img
                                                          src={
                                                            path_image +
                                                            "info_circle_icon.svg"
                                                          }
                                                          alt=""
                                                        />
                                                      </p>
                                                      <div  className="form-switch">
                                                        {/* <input type="checkbox" id="custom-switch"  className="form-check-input"/> */}
                                                        <span>Completed</span>
                                                        <Form.Check
                                                          inline
                                                          label="Live"
                                                          name="group1"
                                                          type="checkbox"
                                                          checked={
                                                            data.is_draft == 1
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                      </div>
                                                    </>
                                                  ) : (
                                                    ""
                                                  )}
                                                </div>
                                                <div  className="mailbox-buttons justify-content-end">
                                                  <div className="send_new">
                                                    <Button className="btn-bordered send-new">
                                                      Duplicate Survey
                                                    </Button>
                                                  </div>
                                                </div>
                                              </div>
                                            </Tab>
                                          </Tabs>
                                        </div>
                                        {/* {deletestatus && (
                                  <div className="dlt_btn">
                                    <button
                                      onClick={(e) =>
                                        showConfirmationPopup(data.survey_id)
                                      }
                                    >
                                      <img
                                        src={path + "delete.svg"}
                                        alt="Delete Row"
                                      />
                                    </button>
                                  </div>
                                )} */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <h3>No survey selected yet!</h3>
                        )}
                      </>
                    </div>
                  </Col>
                  <Col className="sublink_right d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>SubLinks:</h5>
                      <Button
                        className={
                          !selectedSurveyId
                            ? "btn-filled btn-disabled"
                            : "btn-filled"
                        }
                        onClick={createNewLinkClicked}
                      >
                        Create New Link +
                      </Button>
                    </div>

                    <SurveySublinkListing
                      survey_id={selectedSurveyId}
                      render={showSubLinkList}
                      count={linkRenderCount}
                    />
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
              <div className="scroll_div delivery_popup">
                <div className="scroll_div_inset">
                  <Dropdown.Item
                    eventKey="Email"
                    className={newLink?.delivery == "Email" ? "active" : ""}
                  >
                    Email
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="InforMedGO"
                    className={
                      newLink?.delivery == "InforMedGO" ? "active" : ""
                    }
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

export default SurveySublink;
