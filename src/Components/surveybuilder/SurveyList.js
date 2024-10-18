import React, { useEffect, useRef, useState } from "react";

import {
  Accordion,
  Button,
  Col,
  Row,
  Tab,
  Tabs,
  Form,
  Modal,
} from "react-bootstrap";

// import { Link, useLocation } from "react-router-dom";
import { analyticButtonClicked } from "./CommonFunctions/CommonFunction";
import { SublinkHandler } from "./CommonFunctions/CommonFunction";
import Select from "react-select";
import { format } from "date-fns";
import { connect } from "react-redux";
import { getSurveyData } from "../../actions";
import { SurveyLiveButton } from "./CommonFunctions/CommonFunction";
import { loader } from "../../loader";
import { useFetchers, useNavigate } from "react-router-dom";
import { surveyAxiosInstance } from "./CommonFunctions/CommonFunction";
import { toast } from "react-toastify";
import { emptySurveyReduxStates } from "../../actions/surveyActions";
import { useDispatch } from "react-redux";
import { popup_alert } from "../../popup_alert";
import { updateLiveFlag } from "./CommonFunctions/CommonFunction";
import QRCode from "qrcode.react";
import { Spinner } from "react-activity";

const SurveyList = (props) => {
  const rdLikeArray = [
    "56Ek4feL/1A8mZgIKQWEqg==",
    "sNl1hra39QmFk9HwvXETJA==",
    "MXl8m36VZFYXpgFVz3Pg0g==",
  ];
  const isLikeRdAccount = rdLikeArray.includes(localStorage.getItem("user_id"));
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  // const filterdata = [];
  const [showfilter, setShowFilter] = useState(false);
  const [deletestatus, setDeleteStatus] = useState(false);
  const [filtercampaign, setFilterCampaigns] = useState([]);
  const [filterrole, setFilterRole] = useState([]);
  const [filtertags, setFilterTags] = useState([]);
  const [filtercreator, setFilterCreators] = useState([]);
  const [filterdate, setFilterDate] = useState([]);
  const [updateflag, setUpdateFlag] = useState([]);
  const [filterapplied, setFilterApply] = useState(false);
  const [search, setSearch] = useState("");
  const [submiHandle, setSubmiHandle] = useState("");
  const [SendListData, setSendListData] = useState([]);
  const [filter, setFilter] = useState({});
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [deletecardid, setDeleteCardId] = useState();
  const [getoriginalSurveylistdata, setOriginalSurveyData] = useState([]);
  const [isData, setIsData] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const dispatch = useDispatch();
  const [qrState, setQr] = useState({ value: "" });
  const [duplicateCounter, setDuplicateCounter] = useState(0);
  const [apiStatus, setApiStatus] = useState(false);
  const [sectionLoaderIndex, setSectionLoaderIndex] = useState();

  const [filterdata, setFilterData] = useState({
    'Survey': ['Live', 'Draft', 'Completed']
  });
  const [filterApplyflag, setFilterApplyflag] = useState(0);
  const [filterObject, setFilterObject] = useState({});
  const [appliedFilter, setAppliedFilter] = useState({})
  const [otherFilter, setOtherFilter] = useState({});

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    setShowFilter(false);
    // getFilterAppliedData();
    applyFilter()
    setSubmiHandle(1);

    return false;
  };

  const fetchSurveyListing = async () => {
    try {
      loader("show");
      let res = await surveyAxiosInstance.post("/survey/fetch-survey-data", {
        admin_id: "18207",
        survey_id: 0,
      });
      const survey_data = res?.data?.data;

      // if(survey_data.length<1){
      //   showDeleteButtons()
      // }

      if (res) {
        setOriginalSurveyData(survey_data);
        setIsData(survey_data);
      }
      loader("hide");
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    props.getSurveyData(null);
    dispatch(emptySurveyReduxStates());
    fetchSurveyListing();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [getoriginalSurveylistdata]);

  useEffect(() => {
    if (search === "") {
      applyFilter();
    }
  }, [search]);

  const searchChange = (e) => {
    setSearch(e.target.value);   
  };

  const showDeleteButtons = () => {
    setDeleteStatus(!deletestatus);
  };

  const getFilterAppliedData = async () => {
    if (filter?.Survey?.length > 0) {

      let filteredData = getoriginalSurveylistdata.filter((item) => {
        return filter.Survey.includes(parseInt(item.is_draft));
      });
      // Further filter based on search if there is any search text
      if (search.trim().length > 0) {
        filteredData = filteredData.filter((item) => {
          return item.survey_title.toLowerCase().includes(search.toLowerCase());
        });
      }
      // Set the final filtered data
      setIsData(filteredData);
    } else if (search.trim().length > 0) {
      const filteredData = getoriginalSurveylistdata.filter((item) => {
        return item.survey_title.toLowerCase().includes(search.toLowerCase());
      });
      setIsData(filteredData);
    } else {
      setFilterApply(false);
      setIsData(getoriginalSurveylistdata);
    }
  };


  const createNewEmail = () => {
    navigate("/survey/survey-setup");
  };

  const [allCodes, setAllCodes] = useState([]);
  const [subLinkData, setSubLinkData] = useState({});

  const handleClick = async (e, survey_id) => {
    if (e === "sublinks") {
      await fetchSublinks(survey_id);
    }
  };

  const handleDuplicateSurvey = async (e, survey_id) => {
    e.preventDefault();
    try {
      loader("show");
      const body = {
        survey_id: survey_id,
        is_draft: 0,
      };
      const response = await surveyAxiosInstance.post(
        "/survey/duplicate-survey",
        body
      );

      if (response) {
        window.location.reload();
      }
      loader("hide");
    } catch (error) {
      loader("hide");
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  const fetchSublinks = async (survey_id) => {
    if (typeof survey_id !== "undefined") {
      try {
        // loader("show"); // Assuming `loader` is a function to show/hide a loading spinner
        setApiStatus(true);
        setSectionLoaderIndex(survey_id);
        const res = await surveyAxiosInstance.post(
          "/survey/fetch-survey-sublink",
          { survey_id }
        );

        let codearr = [];
        res?.data?.data.forEach((item) => {
          codearr.push({
            value: item.sublink_id,
            label: item.unique_code,
          });
        });
        codearr.sort((a, b) =>
          a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        );

        // setAllCodes(codearr);
        setSubLinkData((prev) => {
          return {
            ...prev,
            [survey_id]: codearr,
          };
        });

        // loader("hide");
        setApiStatus(false);
      } catch (err) {
        console.log("--err", err);
        toast.error("Something went wrong");
        // loader("hide");
        setApiStatus(false);
      }
    }
  };

  const handleCopy = (survey_id, selectedSublinkId) => {
    const selectedSublink = subLinkData?.[survey_id]?.find(
      (option) => option.value === selectedSublinkId
    );
    if (selectedSublink) {
      navigator.clipboard
        .writeText(
          `https://survey.docintel.app/survey?Utmde=${selectedSublink.label}`
        )
        .then(() => {
          toast.success("Sublink copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy sublink: ", err);
        });
    } else {
      toast.error("No sublink selected to copy.");
    }
  };

  const setDownloadLink = (survey_id, selectedSublinkId) => {
    const selectedSublink = subLinkData?.[survey_id]?.find(
      (option) => option.value === selectedSublinkId
    );
    if (selectedSublink) {
      loader("show");
      setQr({
        ...qrState,
        value: `https://survey.docintel.app/survey?Utmde=${selectedSublink.label}&dl=QR`,
      });
      setTimeout(function () {
        downloadQRCode();
      }, 500);
    } else {
      toast.error("No sublink Qrcode selected to download.");
    }
    loader("hide");
  };

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
  };

  const [selectedSublinkId, setSelectedSublinkId] = useState();

  const onSublinkChange = (selectedOption) => {
    setSelectedSublinkId(selectedOption ? selectedOption.value : null);
  };



  const handleLiveToogle = async (e, survey_id) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    let status = isChecked ? 2 : 1;
    await updateLiveFlag(survey_id, status);
    await fetchSurveyListing();
  };

  const showConfirmationPopup = (id) => {
    if (confirmationpopup) {
      setConfirmationPopup(false);
    } else {
      setConfirmationPopup(true);
    }
    setDeleteCardId(id);
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };



  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setShowFilter(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);


  const copyHandler = (surveyLink) => {
    navigator.clipboard
      .writeText(surveyLink)
      .then(() => {
        toast.success("Survey Link Copied");
      })
      .catch((err) => {
        toast.error("Failed to copy Survey Link");
      });
  };

  const deleteSurvey = async () => {
    hideConfirmationModal();
    const body = {
      survey_id: deletecardid,
      is_delete: 1,
    };

    try {
      loader("show");
      const res = await surveyAxiosInstance.post(
        `/survey/delete-all-details`,
        body
      );

      if (res) {
        hideConfirmationModal();
        const surveyAfterDeleted = getoriginalSurveylistdata.filter((item) => {
          return item.survey_id != deletecardid;
        });

        setOriginalSurveyData([...surveyAfterDeleted]);
        popup_alert({
          visible: "show",
          message: "The Survey record has been deleted <br />successfully !",
          type: "success",
          redirect: "",
        });
      } else {
        toast.warning(res.data.message);
      }
      loader("hide");
    } catch (error) {
      loader("hide");
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  const editHandler = async (e, path, data) => {
    e.preventDefault();
    let surveyConfigData;
    let thanksPageData;

    if (data.is_draft == "0" || data.is_draft == "1" || data.is_draft == "2") {
      const parsedCustomHtml = JSON.parse(data?.custom_html);

      const tags = JSON.parse(data?.tags);

      const setUpData = {
        survey_title: data.survey_title,
        subtitle: data?.subtitle,
        survey_live_flag: data.survey_live_flag,
        survey_type: data?.survey_type,
        creator_id: data.creator_id,
        admin_id: "18207",
        tags: tags,
      };

      const formBuilderData = {
        account_id: "18207",
        template_id: data.template_html,
        custom_html: parsedCustomHtml,
      };

      if (
        path === "/survey/survey-configure" ||
        path === "/survey/form-builder" ||
        path === "/survey/thank-you" ||
        path === "/survey/survey-preview"
      ) {
        surveyConfigData = {
          survey_consent: data.survey_consent,
          survey_thumbnail: data.survey_thumbnail,
          survey_link_description: data.survey_link_description,
          survey_link_title: data.survey_link_title,
          informedEmail: data.informed_email,
          informedGo: data.informed_go,
        };
      }

      if (path === "/survey/thank-you" || path === "/survey/survey-preview") {
        thanksPageData = {
          thanku_image_path: data.thanku_image_path,
          thanku_image_width: data.thanku_image_width,
          thanku_image_headline: data.thanku_image_headline,
          thanku_body_text: data.thanku_body_text,
        };
      }

      await props.getSurveyData({
        survey_id: data.survey_id,
        unique_code: data.unique_code,
        creator_name: data.creator_name,
        setUpData,
        formBuilderData,
        surveyConfigData: surveyConfigData || "", // Use logical OR for default value
        thanksPageData,
      });
    }
    navigate(path);
  };

  const clearFilter = () => {
    // loader("show")
    document.querySelectorAll("input")?.forEach((checkbox) => {
      checkbox.checked = false;
    });
    
    setAppliedFilter({});
    setOtherFilter({});
    setFilterObject({});
   
    setIsData(getoriginalSurveylistdata)
    setShowFilter(false);
  };


  const applyFilter = (flag="") => {
    setFilterApplyflag(1);
    setIsData([])
    setFilterObject(appliedFilter);
  
    const hasAllNonEmptyValues = Object.keys(otherFilter).every(key => {
      const value = filter[key];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== null && value !== undefined && value !== '';
    });
    if (!hasAllNonEmptyValues) {
      let data = getoriginalSurveylistdata?.filter(item => {
        const matchesFilters = Object.keys(otherFilter).every(key => {
          if (Array.isArray(otherFilter[key])) {
            return otherFilter[key].some(value => {
              if (typeof value === 'string') {
                if (key == "Survey") {
                  let filterValue = value == "Draft" ? 0 : value == "Live" ? 1 : value == "Completed" ? 2 : 0
                  return item["is_draft"] == filterValue
                } else {
                  return item[key] && item[key].includes(value);
                }
              } else if (typeof value === 'number') {
                return item[key] === value;
              }
              return false;
            });
          }
          return true;
        });
        return matchesFilters;
      });
      if (search?.trim()?.length > 0) {
        data = data?.filter((item) => {
          return item?.survey_title?.toLowerCase()?.includes(search?.toLowerCase())
        })
      }
      setIsData(data)
    }
    else if (search?.trim()?.length > 0) {
      const data = getoriginalSurveylistdata?.filter((item) => {
        return item?.survey_title?.toLowerCase()?.includes(search?.toLowerCase())
      })
      setIsData(data)
    } else {
      setIsData(getoriginalSurveylistdata)
    }
    setShowFilter(false);
  };

  const removeindividualfilter = (key, item) => {
    let old_object = filterObject;
    let otherFilterObj = otherFilter;
    const index = old_object[key]?.indexOf(item);
    if (index > -1) {
      // if (old_object[key].includes("All")) {
      //   const allIndex = old_object[key]?.indexOf("All");
      //   old_object[key]?.splice(allIndex, 1);
      //   delete otherFilterObj[key];
      // }
      old_object[key]?.splice(index, 1);
      otherFilterObj[key]?.splice(index, 1);

      if (old_object[key]?.length == 0) {
        delete old_object[key];
        delete otherFilterObj[key];
      }
    }
    setAppliedFilter(old_object);
    setOtherFilter(otherFilterObj);
    setFilterObject(old_object);
    applyFilter()

  };
  const handleOnFilterChange = (e, item, index, key, data = []) => {
    let newObj = JSON.parse(JSON.stringify(appliedFilter));
    let otherObj = JSON.parse(JSON.stringify(otherFilter));
    if (!newObj[key]) {
      newObj[key] = [];
    }
    if (!otherObj[key]) {
      otherObj[key] = [];
    }

    if (e?.target?.checked == true) {
      if (
        // key == "training_status_code" ||
        // key == "user_type" ||
        // key == "site_number"
        key == "Radio"

      ) {
        newObj[key] = [];
        newObj[key]?.push(item);
        otherObj[key] = [];
        otherObj[key]?.push(item);
      }
      else {
        if (item == "All") {
          newObj[key] = ["All"];
          otherObj[key] = data;
        } else {
          newObj[key]?.push(item);
          otherObj[key]?.push(item);

          // if (data?.length - 1 == newObj[key]?.length) {
          //   newObj[key]?.push("All");
          //   otherObj[key]?.push(item);
          // }
        }
      }
    } else {
      if (item == "All") {
        newObj[key] = [];
        otherObj[key] = [];
      } else {
        if (newObj[key].includes("All")) {
          newObj[key] = newObj[key].filter((item) => item != "All");
          otherObj[key] = otherObj[key].filter((item) => item != "All");
        }
        const index = newObj[key]?.indexOf(item);
        if (index > -1) {
          newObj[key]?.splice(index, 1);
          if (newObj[key]?.length == 0) {
            delete otherObj[key];
            delete newObj[key];
          }
        }
      }

      const otherIndex = otherObj[key]?.indexOf(item);
      if (otherIndex > -1) {
        otherObj[key]?.splice(otherIndex, 1);
        if (otherObj[key]?.length == 0) {
          delete otherObj[key];
        }
        newObj[key] = otherObj[key];
      }
    }
    setOtherFilter(otherObj);
    setAppliedFilter(newObj);
  };

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Col className="right-sidebar custom-change survey-builder">
        <div className="custom-container">
          <Row>
            <div className="top-header sticky">
              <div className="page-title">
                {" "}
                <h2>Surveys</h2>
              </div>
              <div className="top-right-action">
                <div className="search-bar">
                  <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search by survey title"
                      aria-label="Search"
                      id="email_search"
                      onChange={(e) => searchChange(e)}
                    />
                    <button className="btn btn-outline-success" type="submit">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z"
                          fill="#97B6CF"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
                <div
                  className={
                    showfilter
                      ? "filter-by nav-item dropdown highlight"
                      : "filter-by nav-item dropdown"
                  }
                >
                  <button
                    ref={buttonRef}
                    className="btn btn-secondary dropdown"
                    type="button"
                    id="dropdownMenuButton2"
                    onClick={() => setShowFilter((showfilter) => !showfilter)}
                  >
                    Filter By
                    {showfilter ? (
                      <svg
                        className="close-arrow"
                        width="13"
                        height="12"
                        viewBox="0 0 13 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.09896"
                          height="15.1911"
                          rx="1.04948"
                          transform="matrix(0.720074 0.693897 -0.720074 0.693897 11.0977 0)"
                          fill="#0066BE"
                        />
                        <rect
                          width="2.09896"
                          height="15.1911"
                          rx="1.04948"
                          transform="matrix(0.720074 -0.693897 0.720074 0.693897 0 1.45898)"
                          fill="#0066BE"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="filter-arrow"
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                          fill="#97B6CF"
                        />
                        <path
                          d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                          fill="#97B6CF"
                        />
                        <path
                          d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                          fill="#97B6CF"
                        />
                      </svg>
                    )}
                  </button>
                  {/*Code for show filters*/}
                  {/* {showfilter && (
                    <div
                      ref={filterRef}
                      className="dropdown-menu filter-options"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <h4>Filter By</h4>
                      <Accordion defaultActiveKey="0" flush>
                        {filterdata.hasOwnProperty("tags") &&
                          filterdata.tags.length > 0 && (
                            <Accordion.Item className="card" eventKey="0">
                              <Accordion.Header className="card-header">
                                Tags
                              </Accordion.Header>
                              <Accordion.Body className="card-body">
                                <ul>
                                  {Object.entries(filterdata.tags).map(
                                    ([index, item]) => (
                                      <li>
                                        {item != "" ? (
                                          <label className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-tags-${index}`}
                                              name="tags[]"
                                              value={item}
                                              checked={
                                                updateflag > 0 &&
                                                typeof filtertags !==
                                                  "undefined" &&
                                                filtertags.indexOf(item) !== -1
                                              }
                                              onChange={() =>
                                                handleOnFilterTags(item)
                                              }
                                            />
                                            {item}
                                            <span className="checkmark"></span>
                                          </label>
                                        ) : null}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Accordion.Body>
                            </Accordion.Item>
                          )}

                        {filterdata.hasOwnProperty("creators") &&
                          filterdata.creators.length > 0 && (
                            <Accordion.Item className="card" eventKey="1">
                              <Accordion.Header className="card-header">
                                Creator
                              </Accordion.Header>
                              <Accordion.Body className="card-body">
                                <ul>
                                  {Object.entries(filterdata.creators).map(
                                    ([index, item]) => (
                                      <li>
                                        <label className="select-multiple-option">
                                          <input
                                            type="checkbox"
                                            id={`custom-checkbox-creator-${index}`}
                                            name="creator[]"
                                            value={item}
                                            checked={
                                              updateflag > 0 &&
                                              typeof filtercreator !==
                                                "undefined" &&
                                              filtercreator.indexOf(item) !== -1
                                            }
                                            onChange={() =>
                                              handleOnFilterCreator(item)
                                            }
                                          />
                                          {item}
                                          <span className="checkmark"></span>
                                        </label>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Accordion.Body>
                            </Accordion.Item>
                          )}
                        {filterdata.hasOwnProperty("created") &&
                          filterdata.created.length > 0 && (
                            <Accordion.Item className="card" eventKey="2">
                              <Accordion.Header className="card-header">
                                Date
                              </Accordion.Header>
                              <Accordion.Body className="card-body">
                                <ul>
                                  {Object.entries(filterdata.created).map(
                                    ([index, item]) => (
                                      <li>
                                        <label className="select-multiple-option">
                                          <input
                                            type="checkbox"
                                            id={`custom-checkbox-date-${index}`}
                                            name="date[]"
                                            value={item}
                                            checked={
                                              updateflag > 0 &&
                                              typeof filterdate !==
                                                "undefined" &&
                                              filterdate.indexOf(item) !== -1
                                            }
                                            onChange={() =>
                                              handleOnFilterDate(item)
                                            }
                                          />
                                          {item}
                                          <span className="checkmark"></span>
                                        </label>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Accordion.Body>
                            </Accordion.Item>
                          )}
                        {!isLikeRdAccount ? (
                          <Accordion.Item className="card" eventKey="3">
                            <Accordion.Header className="card-header">
                              Survey
                            </Accordion.Header>
                            <Accordion.Body className="card-body">
                              <ul>
                                <li>
                                  <label className="select-multiple-option">
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-Survey-0`}
                                      name="Survey[]"
                                      value="Sent"
                                      checked={
                                        updateflag > 0 &&
                                        typeof filtercampaign !== "undefined" &&
                                        filtercampaign.indexOf(1) !== -1
                                      }
                                      onChange={() => handleOnFilterCampaign(1)}
                                    />
                                    Live
                                    <span className="checkmark"></span>
                                  </label>
                                </li>
                                <li>
                                  <label className="select-multiple-option">
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-Survey-1`}
                                      name="Survey[]"
                                      value="Draft"
                                      checked={
                                        updateflag > 0 &&
                                        typeof filtercampaign !== "undefined" &&
                                        filtercampaign.indexOf(0) !== -1
                                      }
                                      onChange={() => handleOnFilterCampaign(0)}
                                    />
                                    Draft
                                    <span className="checkmark"></span>
                                  </label>
                                </li>
                                <li>
                                  <label className="select-multiple-option">
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-Survey-2`}
                                      name="Survey[]"
                                      value="draft-approved"
                                      checked={
                                        updateflag > 0 &&
                                        typeof filtercampaign !== "undefined" &&
                                        filtercampaign.indexOf(2) !== -1
                                      }
                                      onChange={() => handleOnFilterCampaign(2)}
                                    />
                                    Completed
                                    <span className="checkmark"></span>
                                  </label>
                                </li>
                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                        ) : (
                          filterdata.hasOwnProperty("IRT_roles") &&
                          filterdata.IRT_roles.length > 0 && (
                            <Accordion.Item className="card" eventKey="3">
                              <Accordion.Header className="card-header">
                                IRT Roles
                              </Accordion.Header>
                              <Accordion.Body className="card-body">
                                <ul>
                                  {Object.entries(filterdata.IRT_roles).map(
                                    ([index, item]) => (
                                      <li>
                                        <label className="select-multiple-option">
                                          <input
                                            type="checkbox"
                                            id={`custom-checkbox-IRT_roles-${index}`}
                                            name="IRT_roles[]"
                                            value={item}
                                            checked={
                                              updateflag > 0 &&
                                              typeof filterrole !==
                                                "undefined" &&
                                              filterrole.indexOf(item) !== -1
                                            }
                                            onChange={() =>
                                              handleOnFilterRole(item)
                                            }
                                          />
                                          {item}
                                          <span className="checkmark"></span>
                                        </label>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Accordion.Body>
                            </Accordion.Item>
                          )
                        )}
                      </Accordion>

                      <div className="filter-footer">
                        <button
                          className="btn btn-primary btn-bordered"
                          onClick={clearFilter}
                        >
                          Clear
                        </button>
                        <button
                          className="btn btn-primary btn-filled"
                          onClick={applyFilter}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )} */}

                  {showfilter && (
                    <div
                      ref={filterRef}
                      className="dropdown-menu filter-options"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <h4>Filter By</h4>
                      <Accordion defaultActiveKey="0" flush>
                        {Object.keys(filterdata)?.map(function (key, index) {
                          return (
                            <>
                              {filterdata[key]?.length > 0 ? (
                                <Accordion.Item key={index}
                                  className={
                                    key == "role" ? "card upper" : "card"
                                  }
                                  eventKey={index}
                                >
                                  <Accordion.Header className="card-header">
                                    {key == "training_status_code" ? "Status" : key == "user_type" ? "Role" : key == "site_number" ? "Site" : key}
                                  </Accordion.Header>
                                  <Accordion.Body className="card-body">
                                    <ul>
                                      {filterdata[key]?.length
                                        ? filterdata[key]
                                          ?.map(
                                            (item, index) => (
                                              <li key={index}>
                                                {item != "" ? (
                                                  <label className="select-multiple-option">
                                                    <input
                                                      type="checkbox"
                                                      id={`custom-checkbox-${item}-${index}`}
                                                      value={
                                                        typeof item ==
                                                          "object"
                                                          ? item?.title
                                                          : item
                                                      }
                                                      name={key}
                                                      checked={
                                                        typeof item ==
                                                          "object"
                                                          ? appliedFilter[
                                                            key
                                                          ]?.includes(        
                                                            item.id
                                                          )
                                                            ? true
                                                            : false
                                                          : appliedFilter[
                                                            key
                                                          ]?.includes(item)
                                                            ? true
                                                            : false
                                                      }
                                                      onChange={(e) =>
                                                        handleOnFilterChange(
                                                          e,
                                                          typeof item ==
                                                            "object"
                                                            ? item.id
                                                            : item,
                                                          index,
                                                          key,
                                                          [...filterdata[key]]
                                                        )
                                                      }
                                                    />
                                                    {typeof item == "object"
                                                      ? item?.title
                                                      : item}
                                                    <span className="checkmark"></span>
                                                  </label>
                                                ) : null}
                                              </li>
                                            )
                                          )
                                        : null}
                                    </ul>
                                  </Accordion.Body>
                                </Accordion.Item>
                              ) : null}
                            </>
                          );
                        })}
                      </Accordion>

                      <div className="filter-footer">
                        <button
                          className="btn btn-primary btn-bordered"
                          onClick={clearFilter}
                        >
                          Clear
                        </button>
                        <button
                          className="btn btn-primary btn-filled"
                          onClick={applyFilter}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="clear-search">
                  {deletestatus ? (
                    <button
                      className="btn btn-outline-primary cancel"
                      onClick={(e) => showDeleteButtons()}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-primary"
                      onClick={(e) => showDeleteButtons()}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                          fill="#0066BE"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {Object.keys(filterObject)?.length !== 0 &&
              filterApplyflag > 0 ? (
              <div className="apply-filter">
                <div className="filter-block">
                  <div className="filter-block-left full">
                    {Object.keys(filterObject)?.map((key, index) => {
                      return (
                        <>
                          {filterObject[key]?.length ? (
                            <div key={index} className="filter-div">
                              <div className="filter-div-title">
                                <span>{key == "training_status_code" ? "Status" : key == "user_type" ? "Role" : key == "site_number" ? "Site" : key} |</span>
                              </div>

                              <div className="filter-div-list">
                                {filterObject[key]?.map((item, index) => (
                                  <div key={index}
                                    className={
                                      key == "Role"
                                        ? "filter-result upper"
                                        : "filter-result"
                                    }
                                  >
                                    {item}
                                    <img
                                      src={path_image + "filter-close.svg"}
                                      onClick={() =>
                                        removeindividualfilter(key, item)
                                      }
                                      alt="Close-filter"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </>
                      );
                    })}
                  </div>
                  <div className="clear-filter">
                    <button
                      className="btn btn-outline-primary btn-bordered"
                      onClick={clearFilter}
                    >
                      Remove All
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="email-result survey-listing">
              <div className="col email-result-block library-content-box-layout">
                {!deletestatus && filterApplyflag > 0 && (
                  <div className="email_box_block">
                    <div className="email-block-add">
                      <button onClick={createNewEmail}>
                        <img src={path_image + "add-button.svg"} alt="" />
                      </button>
                      <p>Create New Survey</p>
                    </div>
                  </div>
                )}
                {isData.length < 1 && (
                  <div className="mail_trigger_right_dummy">
                    <div className="mail_trigger_dummy_content d-flex justify-content-center">
                      <h3>
                        Create your first survey by clicking on{" "}
                        <img src={path_image + "add_smartlist.svg"} alt="" />
                      </h3>
                    </div>
                  </div>
                )}
                {isData?.length || updateflag
                  ? isData?.map((data, index) => {
                    const sublinkoptions =
                      subLinkData?.[data.survey_id] || [];
                    return (
                      <>
                        <div className="email_box_block" key={index}>
                          <div
                            className={
                              data?.is_draft != null && data?.is_draft == "0"
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
                                  <h5>{data.survey_title}</h5>
                                  <p>{data.subtitle}</p>
                                </div>
                              </div>
                              <div className="tabs-data">
                                <Tabs
                                  defaultActiveKey="link"
                                  onSelect={(e) =>
                                    handleClick(e, data.survey_id)
                                  }
                                >
                                  <Tab eventKey="link" title="Link">
                                    <div className="survey_tabs_data">
                                      <div className="tab-panel">
                                        <div className="tab-content-links">
                                          <a
                                            href={`https://survey.docintel.app/survey?Utmde=${data.unique_code}`}
                                            className={
                                              data?.is_draft != null &&
                                                data?.is_draft == "0"
                                                ? "doc-link no-click"
                                                : "doc-link "
                                            }
                                            target="_blank"
                                          >
                                            https://survey.docintel.app/survey?Utmde=
                                            {data.unique_code}
                                          </a>
                                          {data.is_draft ? (
                                            <span
                                              className="copy-content"
                                              onClick={() =>
                                                copyHandler(
                                                  `https://survey.docintel.app/survey?Utmde=${data.unique_code}`
                                                )
                                              }
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
                                            <span className="copy-content">
                                              <img
                                                src={
                                                  path_image +
                                                  "copy-content-disabled.svg"
                                                }
                                                alt="Copy"
                                              />
                                            </span>
                                          )}
                                          {data.is_draft ? (
                                            <div
                                              className="tab-content-qr"
                                              onClick={() => {
                                                setQr({
                                                  ...qrState,
                                                  value: `https://survey.docintel.app/survey?Utmde=${data.unique_code}&dl=QR`,
                                                });
                                                setTimeout(function () {
                                                  downloadQRCode();
                                                }, 500);
                                              }}
                                            >
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
                                            {data.survey_consent != "" ? (
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
                                            <h6>{data.creator_name}</h6>
                                          </li>
                                        </ul>
                                        <div className="mailbox-tags">
                                          <ul>
                                            {JSON.parse(data?.tags)?.length >
                                              0 ? (
                                              JSON.parse(data.tags).map(
                                                (tag, index) => (
                                                  <li key={index}>{tag}</li>
                                                )
                                              )
                                            ) : (
                                              <li>N/A</li>
                                            )}
                                          </ul>
                                        </div>
                                        <div className="mail-time">
                                          <span>
                                            {format(
                                              new Date(data.date),
                                              "MMMM d, yyyy '|' h:mm a"
                                            )}
                                          </span>
                                        </div>

                                        {data?.is_draft != null &&
                                          data?.is_draft == "0" ? (
                                          <div className="mail-stats">
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
                                                      fillOpacity="0.6"
                                                    />
                                                    <path
                                                      d="M7.29013 11.3608L5.07582 13.5751C4.34466 14.3063 3.15538 14.3063 2.42423 13.5751C1.69301 12.8439 1.69301 11.6546 2.42423 10.9234C2.54891 10.7987 5.87141 7.47623 5.68338 7.66426C6.42038 6.92726 7.62951 6.95873 8.33504 7.66426C8.70044 8.02973 9.29541 8.02973 9.66085 7.66426L10.23 7.09507C10.0722 6.82682 9.89116 6.56869 9.66085 6.33844C8.27476 4.95229 5.88607 4.83435 4.3777 6.32198C4.37141 6.32823 4.36385 6.33216 4.35754 6.33844L1.09835 9.59763C-0.366086 11.0621 -0.366148 13.4364 1.09835 14.9009C2.56285 16.3654 4.93723 16.3654 6.40166 14.9009L9.66082 11.6417C9.6671 11.6355 9.67101 11.6279 9.67726 11.6216C8.8761 11.7383 8.0531 11.6583 7.29013 11.3608Z"
                                                      fill="#97B6CF"
                                                      fillOpacity="0.6"
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
                                                      fillOpacity="0.6"
                                                    />
                                                    <path
                                                      d="M7.90674 7.0319H5.02153C2.62095 7.0319 0.667969 8.98517 0.667969 11.3858V14.9141L0.676938 14.9694L0.919976 15.0455C3.2109 15.7613 5.20121 16 6.8394 16C8.20976 16 9.3334 15.8327 10.1793 15.6368C9.44888 14.8611 9.0013 13.8162 9.0013 12.6667C9.0013 10.9692 9.97731 9.4997 11.3988 8.78873C10.6046 7.7232 9.33488 7.0319 7.90674 7.0319Z"
                                                      fill="#97B6CF"
                                                      fillOpacity="0.6"
                                                    />
                                                    <path
                                                      fillRule="evenodd"
                                                      clipRule="evenodd"
                                                      d="M13.3346 9.33333C11.4938 9.33333 10.0013 10.8258 10.0013 12.6667C10.0013 14.5076 11.4938 16 13.3346 16C15.1755 16 16.668 14.5076 16.668 12.6667C16.668 10.8258 15.1755 9.33333 13.3346 9.33333ZM11.8679 12.2998C11.5918 12.2998 11.3679 12.5237 11.3679 12.7998C11.3679 13.0759 11.5918 13.2998 11.8679 13.2998H14.8679C15.1441 13.2998 15.3679 13.0759 15.3679 12.7998C15.3679 12.5237 15.1441 12.2998 14.8679 12.2998H11.8679Z"
                                                      fill="#97B6CF"
                                                      fillOpacity="0.6"
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
                                                      fillOpacity="0.6"
                                                    />
                                                    <path
                                                      d="M7.23877 7.0319H4.35356C1.95298 7.0319 0 8.98517 0 11.3858V14.9141L0.00896932 14.9694L0.252007 15.0455C2.54293 15.7613 4.53324 16 6.17143 16C7.54179 16 8.66543 15.8327 9.5113 15.6368C8.78091 14.8611 8.33333 13.8162 8.33333 12.6667C8.33333 10.9692 9.30935 9.4997 10.7308 8.78873C9.93663 7.7232 8.66691 7.0319 7.23877 7.0319Z"
                                                      fill="#97B6CF"
                                                      fillOpacity="0.6"
                                                    />
                                                    <path
                                                      fillRule="evenodd"
                                                      clipRule="evenodd"
                                                      d="M9.33333 12.6667C9.33333 10.8258 10.8258 9.33333 12.6667 9.33333C14.5076 9.33333 16 10.8258 16 12.6667C16 14.5076 14.5076 16 12.6667 16C10.8258 16 9.33333 14.5076 9.33333 12.6667ZM12.4583 14.0404L14.5652 11.9336C14.6073 11.8915 14.6407 11.8416 14.6634 11.7866C14.6862 11.7316 14.6979 11.6727 14.6979 11.6132C14.6979 11.5537 14.6862 11.4948 14.6634 11.4399C14.6406 11.3849 14.6072 11.335 14.5652 11.2929C14.5231 11.2508 14.4732 11.2175 14.4182 11.1947C14.3632 11.172 14.3043 11.1602 14.2448 11.1602C14.1853 11.1603 14.1264 11.172 14.0714 11.1947C14.0165 11.2175 13.9665 11.2509 13.9245 11.293L12.1379 13.0793L11.4087 12.3501C11.3669 12.3071 11.3169 12.2728 11.2617 12.2493C11.2064 12.2257 11.1471 12.2134 11.0871 12.213C11.027 12.2126 10.9675 12.2241 10.912 12.2469C10.8564 12.2697 10.806 12.3033 10.7635 12.3457C10.7211 12.3882 10.6875 12.4386 10.6647 12.4941C10.6419 12.5497 10.6304 12.6092 10.6308 12.6692C10.6312 12.7292 10.6436 12.7886 10.6671 12.8438C10.6907 12.899 10.7249 12.949 10.768 12.9909L11.8176 14.0404C11.8596 14.0824 11.9096 14.1158 11.9646 14.1386C12.0195 14.1614 12.0785 14.1731 12.138 14.1731C12.1975 14.1731 12.2564 14.1614 12.3114 14.1386C12.3663 14.1158 12.4163 14.0824 12.4583 14.0404Z"
                                                      fill="#97B6CF"
                                                      fillOpacity="0.6"
                                                    />
                                                  </svg>
                                                </div>
                                                <span>0 </span>
                                              </li>
                                            </ul>
                                          </div>
                                        ) : (
                                          <div className="mail-stats">
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
                                                      fillOpacity="1"
                                                    ></path>
                                                    <path
                                                      d="M7.29013 11.3608L5.07582 13.5751C4.34466 14.3063 3.15538 14.3063 2.42423 13.5751C1.69301 12.8439 1.69301 11.6546 2.42423 10.9234C2.54891 10.7987 5.87141 7.47623 5.68338 7.66426C6.42038 6.92726 7.62951 6.95873 8.33504 7.66426C8.70044 8.02973 9.29541 8.02973 9.66085 7.66426L10.23 7.09507C10.0722 6.82682 9.89116 6.56869 9.66085 6.33844C8.27476 4.95229 5.88607 4.83435 4.3777 6.32198C4.37141 6.32823 4.36385 6.33216 4.35754 6.33844L1.09835 9.59763C-0.366086 11.0621 -0.366148 13.4364 1.09835 14.9009C2.56285 16.3654 4.93723 16.3654 6.40166 14.9009L9.66082 11.6417C9.6671 11.6355 9.67101 11.6279 9.67726 11.6216C8.8761 11.7383 8.0531 11.6583 7.29013 11.3608Z"
                                                      fill="#97B6CF"
                                                      fillOpacity="1"
                                                    ></path>
                                                  </svg>
                                                </div>
                                                <span>
                                                  {data.total_sublinks}
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
                                                      fillOpacity="1"
                                                    ></path>
                                                    <path
                                                      d="M7.90674 7.0319H5.02153C2.62095 7.0319 0.667969 8.98517 0.667969 11.3858V14.9141L0.676938 14.9694L0.919976 15.0455C3.2109 15.7613 5.20121 16 6.8394 16C8.20976 16 9.3334 15.8327 10.1793 15.6368C9.44888 14.8611 9.0013 13.8162 9.0013 12.6667C9.0013 10.9692 9.97731 9.4997 11.3988 8.78873C10.6046 7.7232 9.33488 7.0319 7.90674 7.0319Z"
                                                      fill="#FAC755"
                                                      fillOpacity="1"
                                                    ></path>
                                                    <path
                                                      fillRule="evenodd"
                                                      clipRule="evenodd"
                                                      d="M13.3346 9.33333C11.4938 9.33333 10.0013 10.8258 10.0013 12.6667C10.0013 14.5076 11.4938 16 13.3346 16C15.1755 16 16.668 14.5076 16.668 12.6667C16.668 10.8258 15.1755 9.33333 13.3346 9.33333ZM11.8679 12.2998C11.5918 12.2998 11.3679 12.5237 11.3679 12.7998C11.3679 13.0759 11.5918 13.2998 11.8679 13.2998H14.8679C15.1441 13.2998 15.3679 13.0759 15.3679 12.7998C15.3679 12.5237 15.1441 12.2998 14.8679 12.2998H11.8679Z"
                                                      fill="#FAC755"
                                                      fillOpacity="1"
                                                    ></path>
                                                  </svg>
                                                </div>
                                                <span>{data.Dropoff}</span>
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
                                                      fillRule="evenodd"
                                                      clipRule="evenodd"
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
                                      <div className="mailbox-buttons">
                                        <div className="send_new">
                                          {data?.is_draft == 0 ? (
                                            <Button
                                              className={
                                                "btn-bordered send-new disabled"
                                              }
                                            >
                                              Analytics
                                            </Button>
                                          ) : (
                                            <Button
                                              className={
                                                "btn-bordered send-new"
                                              }
                                              onClick={() =>
                                                analyticButtonClicked(data,navigate)
                                              }
                                            >
                                              Analytics
                                            </Button>
                                          )}
                                        </div>
                                        <div className="mailbox-buttons-list">
                                          <Button
                                            className="send btn-bordered"
                                            onClick={(e) =>
                                              editHandler(
                                                e,
                                                data?.current_route,
                                                data
                                              )
                                            }
                                          >
                                            Edit
                                          </Button>
                                          <Button
                                            className={
                                              data?.is_draft
                                                ? "edit btn-filled"
                                                : "edit btn-filled disabled"
                                            }
                                            onClick={(e) => {
                                              window.open(
                                                `https://survey.docintel.app/survey?Utmde=${data.unique_code}`,
                                                "_blank"
                                              );
                                            }}
                                          >
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
                                      {apiStatus &&
                                        sectionLoaderIndex ==
                                        data?.survey_id ? (
                                        <div
                                          className="load_more"
                                          style={{
                                            margin: "10 auto",
                                            justifyContent: "center",
                                            display: "flex",
                                            height: 148,
                                          }}
                                        >
                                          <Spinner
                                            color="#53aff4"
                                            size={32}
                                            speed={1}
                                            animating={true}
                                          />
                                        </div>
                                      ) : (
                                        <>
                                          <SublinkHandler
                                            handleCopy={handleCopy}
                                            setDownloadLink={setDownloadLink}
                                            sublinkoptions={sublinkoptions}
                                            survey_id={data.survey_id}
                                          />

                                          <div className="mailbox-buttons justify-content-end">
                                            <div className="send_new">
                                              <Button
                                                className="btn-bordered send-new"
                                                onClick={() => {
                                                  navigate(
                                                    "/survey/survey-sublink",
                                                    {
                                                      state: {
                                                        survey_id:
                                                          data.survey_id,
                                                      },
                                                    }
                                                  );
                                                }}
                                              >
                                                New Sublink
                                              </Button>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </Tab>
                                  <Tab eventKey="setting" title="Setting">
                                    <div className="survey_tabs_data survey-setting">
                                      <div className="d-flex align-items-center justify-content-start">
                                        {data.is_draft ? (
                                          // <>
                                          <SurveyLiveButton
                                            key={data.survey_id}
                                            survey_id={data.survey_id}
                                            updateLiveFlag={updateLiveFlag}
                                            fetchSurveyListing={
                                              fetchSurveyListing
                                            }
                                            liveFlagValue={data.is_draft}
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <div className="mailbox-buttons justify-content-end">
                                        <div className="send_new">
                                          <Button
                                            className="btn-bordered send-new"
                                            onClick={(e) => {
                                              handleDuplicateSurvey(
                                                e,
                                                data.survey_id
                                              );
                                            }}
                                          >
                                            Duplicate Survey
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </Tab>
                                </Tabs>
                              </div>
                              {deletestatus && (
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
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                  : null}

                <div className="delete">
                  <Modal
                    className="modal send-confirm"
                    id="delete-confirm"
                    show={confirmationpopup}
                  >
                    <Modal.Header>
                      {/* <Modal.Title>Heading Text</Modal.Title>*/}
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        onClick={(e) => hideConfirmationModal()}
                      ></button>
                    </Modal.Header>

                    <Modal.Body>
                      <img src={path + "alert.png"} alt="" />
                      <h4>
                        This survey will be deleted.
                        <br />
                        Are you sure you wish to go ahead?
                      </h4>
                      <div className="modal-buttons">
                        <button
                          type="button"
                          className="btn btn-primary btn-filled"
                          onClick={(e) => deleteSurvey()}
                        >
                          Yes Please!
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary btn-bordered light"
                          onClick={(e) => hideConfirmationModal()}
                        >
                          Cancel
                        </button>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>

      <QRCode
        style={{ display: "none" }}
        id="qr-gen"
        value={qrState?.value}
        size={290}
        level={"H"}
        includeMargin={true}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { getSurveyData: getSurveyData })(
  SurveyList
);
