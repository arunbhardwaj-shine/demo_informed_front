import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Row,
  Tab,
  Tabs,
  Form,
  Table,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { loader } from "../../loader";
import { surveyAxiosInstance } from "./CommonFunctions/CommonFunction";
import moment from "moment";

const SurveyAnalytics = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const { state } = useLocation();
  const [filterdata, setFilterData] = useState([]);
  const [showfilter, setShowFilter] = useState(false);
  const [deletestatus, setDeleteStatus] = useState(false);
  const [filtercampaign, setFilterCampaigns] = useState([]);
  const [filterrole, setFilterRole] = useState([]);
  const [deletecardid, setDeleteCardId] = useState();
  const [filtertags, setFilterTags] = useState([]);
  const [filtercreator, setFilterCreators] = useState([]);
  const [filterdate, setFilterDate] = useState([]);
  const [updateflag, setUpdateFlag] = useState([]);
  const [removeFlag, setRemoveFlag] = useState(false);
  const [filterapplied, setFilterApply] = useState(false);
  const [search, setSearch] = useState("");
  const [submiHandle, setSubmiHandle] = useState("");
  const [SendListData, setSendListData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [getoriginalsendlistdata, setOriginalSendListData] = useState([]);
  const [data,setData]=useState([])
  const [apiStatus,setApiStatus]=useState(false)
  

  useEffect(() => {
    //props.getEmailData(null);
    // props.getDraftData(null);
    //props.getSelectedSmartListData(null);
    getSurveyAnalyticsDetail()

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

const getSurveyAnalyticsDetail=async()=>{
  try{
    loader("show")
    setApiStatus(true)
    const res=await surveyAxiosInstance.post("/survey/survey-analytic-details", {
      admin_id: "18207"
    });
    console.log("res-->",res?.data?.data)
    setData(res?.data?.data?.allDetails)

  }catch(err){
    console.log("--err",err)
  }finally{
    setApiStatus(false)
    loader("hide")
    
  }
}

  const submitHandler = (event) => {
    setShowFilter(false);
    //getData("progress");
    setSubmiHandle(1);
    event.preventDefault();
    return false;
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSendListData(getoriginalsendlistdata);
    }
  };
  const showDeleteButtons = () => {
    if (deletestatus) {
      setDeleteStatus(false);
    } else {
      setDeleteStatus(true);
    }
  };
  const clearFilter = () => {
    document.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });
    document.getElementById("email_search").value = "";
    setSearch("");
    setFilterTags([]);
    setFilterCreators([]);
    setFilterDate([]);
    setFilterRole([]);
    setFilterCampaigns([]);
    setFilter([]);
    let up = updateflag + 1;
    setUpdateFlag(up);
    if (filterapplied) {
      setSendListData(getoriginalsendlistdata);
    }
    setShowFilter(false);
  };

  const applyFilter = () => {
    setFilterApply(true);
    //getData("progress");
    setShowFilter(false);
  };
  const selectOptions = [
    { value: 1, label: "Sublink1" },
    { value: 2, label: "Sublink2" },
    { value: 3, label: "Sublink3" },
    { value: 4, label: "Sublink4" },
  ];
  const handleOnFilterRole = (role) => {
    let tag_index = filterrole.indexOf(role);
    if (role == "No IRT") {
      if (tag_index !== -1) {
        filterrole.splice(tag_index, 1);
        setFilterRole(filterrole);
      } else {
        filterrole.length = 0;
        filterrole.push(role);
        setFilterRole(filterrole);
      }
    } else {
      //TO REMOVE THE NO IRT OPTION
      const index = filterrole.indexOf("No IRT");
      if (index !== -1) {
        filterrole.splice(index, 1);
      }

      if (tag_index !== -1) {
        filterrole.splice(tag_index, 1);
        setFilterRole(filterrole);
      } else {
        filterrole.push(role);
        setFilterRole(filterrole);
      }
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("role")) {
      getfilter.role = filterrole;
    } else {
      getfilter = Object.assign({ role: filterrole }, filter);
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnFilterTags = (ftag) => {
    let tag_index = filtertags.indexOf(ftag);
    if (tag_index !== -1) {
      filtertags.splice(tag_index, 1);
      setFilterTags(filtertags);
    } else {
      filtertags.push(ftag);
      setFilterTags(filtertags);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("tags")) {
      getfilter.tags = filtertags;
    } else {
      getfilter = Object.assign({ tags: filtertags }, filter);
    }
    setFilter(getfilter);

    let up = updateflag + 1;
    setUpdateFlag(up);
  };
  const handleOnFilterCampaign = (fcampaign) => {
    let tag_index = filtercampaign.indexOf(fcampaign);
    if (tag_index !== -1) {
      filtercampaign.splice(tag_index, 1);
      setFilterCampaigns(filtercampaign);
    } else {
      filtercampaign.push(fcampaign);
      setFilterCampaigns(filtercampaign);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("campaign")) {
      getfilter.campaign = filtercampaign;
    } else {
      getfilter = Object.assign({ campaign: filtercampaign }, filter);
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };
  const handleOnFilterCreator = (fcreator) => {
    let tag_index = filtercreator.indexOf(fcreator);
    if (tag_index !== -1) {
      filtercreator.splice(tag_index, 1);
      setFilterCreators(filtercreator);
    } else {
      filtercreator.push(fcreator);
      setFilterCreators(filtercreator);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("creator")) {
      getfilter.creator = filtercreator;
    } else {
      getfilter = Object.assign({ creator: filtercreator }, filter);
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };
  // const [irtRoleObj, setIRTRoleObj] = useState(
  //     typeof state?.IrtObj !== "undefined" && location?.pathname == '/RD-EmailList' ? state?.IrtObj : {}
  // );
  const buttonRef = useRef(null);
  const filterRef = useRef(null);


  const handleOnFilterDate = (fdate) => {
    let tag_index = filterdate.indexOf(fdate);
    if (tag_index !== -1) {
      filterdate.splice(tag_index, 1);
      setFilterDate(filterdate);
    } else {
      filterdate.push(fdate);
      setFilterDate(filterdate);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("date")) {
      getfilter.date = filterdate;
    } else {
      getfilter = Object.assign({ date: filterdate }, filter);
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header sticky">
              <div className="page-title">
                {" "}
                <h2>Analytics</h2>
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
                    <button className="btn" type="submit">
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
                  {showfilter && (
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
                        {localStorage.getItem("user_id") !=
                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                          <Accordion.Item className="card" eventKey="3">
                            <Accordion.Header className="card-header">
                              Campaign
                            </Accordion.Header>
                            <Accordion.Body className="card-body">
                              <ul>
                                <li>
                                  <label className="select-multiple-option">
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-campaign-0`}
                                      name="campaign[]"
                                      value="Sent"
                                      checked={
                                        updateflag > 0 &&
                                        typeof filtercampaign !== "undefined" &&
                                        filtercampaign.indexOf(1) !== -1
                                      }
                                      onChange={() => handleOnFilterCampaign(1)}
                                    />
                                    Sent
                                    <span className="checkmark"></span>
                                  </label>
                                </li>
                                <li>
                                  <label className="select-multiple-option">
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-campaign-1`}
                                      name="campaign[]"
                                      value="Draft"
                                      checked={
                                        updateflag > 0 &&
                                        typeof filtercampaign !== "undefined" &&
                                        filtercampaign.indexOf(2) !== -1
                                      }
                                      onChange={() => handleOnFilterCampaign(2)}
                                    />
                                    Draft
                                    <span className="checkmark"></span>
                                  </label>
                                </li>
                                <li>
                                  <label className="select-multiple-option">
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-campaign-2`}
                                      name="campaign[]"
                                      value="draft-approved"
                                      checked={
                                        updateflag > 0 &&
                                        typeof filtercampaign !== "undefined" &&
                                        filtercampaign.indexOf(3) !== -1
                                      }
                                      onChange={() => handleOnFilterCampaign(3)}
                                    />
                                    Draft Approved
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
                  )}
                </div>
              </div>
            </div>
            <div className="survey-data survey-analytics">
              <div className="survey_data_details">
                <div className="survey_data_accordion_heading">
                  <Table className="fold-table" id="survey-analytics">
                    <thead className="sticky-header">
                      <tr>
                        <th className="sort_option">
                          <span>
                            Status
                            <button className="event_sort_btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>
                        </th>

                        <th className="sort_option">
                          <span>
                            Title & Subtitle
                            <button className="event_sort_btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>
                        </th>

                        <th className="sort_option">
                          <span>
                            Consent
                            <button className="event_sort_btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>
                        </th>

                        <th className="sort_option">
                          <span>
                            Creator
                            <button className="event_sort_btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>
                        </th>

                        <th className="sort_option">
                          <span>
                            Created Date
                            <button className="event_sort_btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>
                        </th>

                        <th className="sort_option">
                          <span>
                            Completed
                            <button className="event_sort_btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>
                        </th>

                        <th className="sort_option">
                          <span>
                            Drop-off
                            <button className="event_sort_btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>
                        </th>

                        <th className="sort_option">
                          <span>
                            AVG Completion Time
                            <button className="event_sort_btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>
                        </th>
                        <th className="sort_option">
                          <span>
                            Questions
                            <button className="event_sort_btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>
                        </th>
                        <th className="sort_option">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="view">
                        <td className="status completed">
                          <div>Completed</div>
                        </td>
                        <td className="blue">
                          <table>
                            <tr className="title-heading">
                              <td>
                                Headline Lorem ipsum pretium id libero dolorsit
                                amet consectetur Orci{" "}
                              </td>
                            </tr>
                            <tr className="title-subheading">
                              <td>
                                Subtitle klacerat proin aenean pretium id libero
                                nulla
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td>Mandatory</td>
                        <td>Meznah Alkhames</td>
                        <td className="blue">May 18.2024 | 9:00 AM</td>
                        <td>
                          <img src={path_image + "completed-icon.svg"} alt="" />{" "}
                          90%
                        </td>
                        <td>
                          <img src={path_image + "drop-off-icon.svg"} alt="" />{" "}
                          500
                        </td>
                        <td>
                          <img src={path_image + "avg-time-icon.svg"} alt="" />{" "}
                          1.5 min
                        </td>
                        <td>
                          <img src={path_image + "question-icon.svg"} alt="" />{" "}
                          10
                        </td>
                        <td>
                          <img
                            src={path_image + "accordian_arrow.svg"}
                            alt=""
                          />
                        </td>
                      </tr>
                      <tr className="blank">
                        <td colspan="10" style={{ height: "10px;" }}>
                          &nbsp;
                        </td>
                      </tr>
                      <tr className="view">
                        <td className="status completed">
                          <div>Completed</div>
                        </td>
                        <td className="blue">
                          <table>
                            <tr className="title-heading">
                              <td>
                                Headline Lorem ipsum pretium id libero dolorsit
                                amet consectetur Orci{" "}
                              </td>
                            </tr>
                            <tr className="title-subheading">
                              <td>
                                Subtitle klacerat proin aenean pretium id libero
                                nulla
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td>Mandatory</td>
                        <td>Meznah Alkhames</td>
                        <td className="blue">May 18.2024 | 9:00 AM</td>
                        <td>
                          <img src={path_image + "completed-icon.svg"} alt="" />{" "}
                          90%
                        </td>
                        <td>
                          <img src={path_image + "drop-off-icon.svg"} alt="" />{" "}
                          500
                        </td>
                        <td>
                          <img src={path_image + "avg-time-icon.svg"} alt="" />{" "}
                          1.5 min
                        </td>
                        <td>
                          <img src={path_image + "question-icon.svg"} alt="" />{" "}
                          10
                        </td>
                        <td>
                          <Link to={"/survey/survey-analytics-detail"}>
                            <img
                              src={path_image + "accordian_arrow.svg"}
                              alt=""
                            />
                          </Link>
                        </td>
                      </tr>
                      <tr className="blank">
                        <td colspan="10" style={{ height: "10px;" }}>
                          &nbsp;
                        </td>
                      </tr>
                      <tr className="view">
                        <td className="status live">
                          <div>Live</div>
                        </td>
                        <td className="blue">
                          <table>
                            <tr className="title-heading">
                              <td>
                                Headline Lorem ipsum pretium id libero dolorsit
                                amet consectetur Orci{" "}
                              </td>
                            </tr>
                            <tr className="title-subheading">
                              <td>
                                Subtitle klacerat proin aenean pretium id libero
                                nulla
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td>Mandatory</td>
                        <td>Meznah Alkhames</td>
                        <td className="blue">May 18.2024 | 9:00 AM</td>
                        <td>
                          <img src={path_image + "completed-icon.svg"} alt="" />{" "}
                          90%
                        </td>
                        <td>
                          <img src={path_image + "drop-off-icon.svg"} alt="" />{" "}
                          500
                        </td>
                        <td>
                          <img src={path_image + "avg-time-icon.svg"} alt="" />{" "}
                          1.5 min
                        </td>
                        <td>
                          <img src={path_image + "question-icon.svg"} alt="" />{" "}
                          10
                        </td>
                        <td>
                          <img
                            src={path_image + "accordian_arrow.svg"}
                            alt=""
                          />
                        </td>
                      </tr>

                      {data?.length?data?.map((item,index)=>{
                        return(<>
                         <tr className="view">
                        <td className="status completed">
                          <div>Completed</div>
                        </td>
                        <td className="blue">
                          <table>
                            <tr className="title-heading">
                              <td>
                                {item?.Title}{" "}
                              </td>
                            </tr>
                            <tr className="title-subheading">
                              <td>
                                {item?.Subtitle}
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td>{item?.Consent}</td>
                        <td>{item?.Creator}</td>
                        <td className="blue">{moment(item?.CreatedDate).utc()?.format('MMM DD.YYYY | h:mm A')}  </td>
                        <td>
                          <img src={path_image + "completed-icon.svg"} alt="" />{" "}
                          90%
                        </td>
                        <td>
                          <img src={path_image + "drop-off-icon.svg"} alt="" />{" "}
                          500
                        </td>
                        <td>
                          <img src={path_image + "avg-time-icon.svg"} alt="" />{" "}
                          1.5 min
                        </td>
                        <td>
                          <img src={path_image + "question-icon.svg"} alt="" />{" "}
                          10
                        </td>
                        <td>
                          <img
                            src={path_image + "accordian_arrow.svg"}
                            alt=""
                          />
                        </td>
                      </tr>
                      <tr className="blank">
                        <td colspan="10" style={{ height: "10px;" }}>
                          &nbsp;
                        </td>
                      </tr>
                        </>)
                      }):!apiStatus?<div className="no_found"><p>No Data Found</p></div>:""}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};
export default SurveyAnalytics;
