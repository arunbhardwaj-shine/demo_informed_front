import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { loader } from "../../loader";
import { surveyAxiosInstance } from "./CommonFunctions/CommonFunction";
import moment from "moment";
import { surveyEndpoints } from "./SurveyEndpoints/SurveyEndpoints";

const SurveyAnalytics = () => {
  const { SURVEY_ANALYTIC_DETAILS } = surveyEndpoints;
  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
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
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [apiStatus, setApiStatus] = useState(false);
  const [sortBy, setSortBy] = useState("name"); // Initial sort key
  const [sortOrder, setSortOrder] = useState("asc");
  const buttonRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    //props.getEmailData(null);
    // props.getDraftData(null);
    //props.getSelectedSmartListData(null);
    getSurveyAnalyticsDetail();

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

  const getSurveyAnalyticsDetail = async () => {
    try {
      loader("show");
      setApiStatus(true);
      // const res=await surveyAxiosInstance.post(SURVEY_ANALYTIC_DETAILS, {
      //   admin_id: "18207"
      // });
      const res = await surveyAxiosInstance.post(SURVEY_ANALYTIC_DETAILS);
      const data = res?.data?.data?.allDetails;
      setData(data);
      setTotalData(data);
    } catch (err) {
      console.log("--err", err);
    } finally {
      setApiStatus(false);
      loader("hide");
    }
  };

  const searchChange = (e) => {
    setSearch(e?.target?.value);
    if (e?.target?.value === "") {
      setData(totalData);
    }
  };

  const submitSearchHandler = (event) => {
    event.preventDefault();
    let searchData = totalData?.filter((item) => item?.Title?.includes(search));
    setData(searchData);
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

  const handleSort = (key) => {
    setSortBy(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const sortData = (data, key, order) => {
    return data.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      // Handle different data types (numbers, strings)
      if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "asc" ? valueA - valueB : valueB - valueA;
      } else {
        return order === "asc"
          ? valueA?.localeCompare(valueB) // Handle string sorting with locale awareness
          : valueB?.localeCompare(valueA);
      }
    });
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
                <div className={`search-bar ${totalData.length < 1 ? "disabled" : ""}`}>
                  <form
                    className="d-flex"
                    onSubmit={(e) => submitSearchHandler(e)}
                  >
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search by survey title"
                      aria-label="Search"
                      id="email_search"
                      onChange={(e) => searchChange(e)}
                    />
                    <button className="btn btn-outline" type="submit">
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
              </div>
            </div>
            <div className="survey-data survey-analytics">
              <div className="survey_data_details">
                <div className="survey_data_accordion_heading">
                  {data?.length > 0 ? (
                    <Table className="fold-table" id="survey-analytics">
                      <thead className="sticky-header">
                        <tr>
                          <th className="sort_option">
                            <span onClick={() => handleSort("Status")}>
                              Status
                              <button
                                // className="event_sort_btn"
                                className={`event_sort_btn ${
                                  sortBy == "Status"
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                }`}
                                onClick={() => handleSort("Status")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_3722_6611)">
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
                            <span onClick={() => handleSort("Title")}>
                              Title & Subtitle
                              <button
                                // className="event_sort_btn"
                                className={`event_sort_btn ${
                                  sortBy == "Title"
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                }`}
                                onClick={() => handleSort("Title")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_3722_6611)">
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
                            <span onClick={() => handleSort("Consent")}>
                              Consent
                              <button
                                // className="event_sort_btn"
                                className={`event_sort_btn ${
                                  sortBy == "Consent"
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                }`}
                                onClick={() => handleSort("Consent")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_3722_6611)">
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
                            <span onClick={() => handleSort("Creator")}>
                              Creator
                              <button
                                // className="event_sort_btn"
                                className={`event_sort_btn ${
                                  sortBy == "Creator"
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                }`}
                                onClick={() => handleSort("Creator")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_3722_6611)">
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
                            <span onClick={() => handleSort("CreatedDate")}>
                              Created Date
                              <button
                                // className="event_sort_btn"
                                className={`event_sort_btn ${
                                  sortBy == "CreatedDate"
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                }`}
                                onClick={() => handleSort("CreatedDate")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_3722_6611)">
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
                            <span onClick={() => handleSort("Completed")}>
                              Completed
                              <button
                                // className="event_sort_btn"
                                className={`event_sort_btn ${
                                  sortBy == "Completed"
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                }`}
                                onClick={() => handleSort("Completed")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_3722_6611)">
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
                            <span onClick={() => handleSort("Dropoff")}>
                              Drop-off
                              <button
                                // className="event_sort_btn"
                                className={`event_sort_btn ${
                                  sortBy == "Dropoff"
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                }`}
                                onClick={() => handleSort("Dropoff")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_3722_6611)">
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
                            <span
                              onClick={() =>
                                handleSort("averageCompletionTime")
                              }
                            >
                              AVG Completion Time
                              <button
                                // className="event_sort_btn"
                                className={`event_sort_btn ${
                                  sortBy == "averageCompletionTime"
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleSort("averageCompletionTime")
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_3722_6611)">
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
                            <span onClick={() => handleSort("questionCount")}>
                              Questions
                              <button
                                // className="event_sort_btn"
                                className={`event_sort_btn ${
                                  sortBy == "questionCount"
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                }`}
                                onClick={() => handleSort("questionCount")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_3722_6611)">
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
                        {data?.length > 0 ? (
                          <>
                            {sortData(data, sortBy, sortOrder)?.map(
                              (item, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    <tr className="view">
                                      <td
                                        className={`status ${
                                          item?.Status == 0
                                            ? "draft"
                                            : item?.Status == 1
                                            ? "live"
                                            : item?.Status == 2
                                            ? "completed"
                                            : ""
                                        }`}
                                      >
                                        <div>
                                          {item?.Status == 0
                                            ? "Draft"
                                            : item?.Status == 1
                                            ? "Live"
                                            : item?.Status == 2
                                            ? "Completed"
                                            : ""}
                                        </div>
                                      </td>
                                      <td className="blue">
                                        <div className="title-heading">
                                          <p>{item?.Title} </p>
                                        </div>
                                        <div className="title-subheading">
                                          <p>{item?.Subtitle}</p>
                                        </div>
                                        
                                      </td>
                                      <td>{item?.Consent}</td>
                                      <td>{item?.Creator}</td>
                                      {/* <td className="blue">{moment(item?.CreatedDate).utc()?.format('MMM DD.YYYY | h:mm A')}  </td> */}
                                      <td className="blue">
                                        {moment(item?.CreatedDate)
                                          .utc()
                                          ?.format("MMM DD.YYYY")}
                                        <span>
                                          {moment(item?.CreatedDate)
                                            .utc()
                                            ?.format("h:mm A")}
                                        </span>{" "}
                                      </td>
                                      <td>
                                        <img
                                          src={
                                            path_image + "completed-icon.svg"
                                          }
                                          alt=""
                                        />{" "}
                                        {item?.Completed ? item?.Completed : 0}
                                      </td>
                                      <td>
                                        <img
                                          src={path_image + "drop-off-icon.svg"}
                                          alt=""
                                        />{" "}
                                        {item?.Dropoff ? item?.Dropoff : 0}
                                      </td>
                                      <td>
                                        <img
                                          src={path_image + "avg-time-icon.svg"}
                                          alt=""
                                        />{" "}
                                        {item?.averageCompletionTime
                                          ? item?.averageCompletionTime
                                          : 0}{" "}
                                        min
                                      </td>
                                      <td>
                                        <img
                                          src={path_image + "question-icon.svg"}
                                          alt=""
                                        />{" "}
                                        {item?.questionCount
                                          ? item?.questionCount
                                          : 0}
                                      </td>
                                      <td>
                                        <Link
                                          to={"/survey/survey-analytics-detail"}
                                          state={{ item }}
                                        >
                                          <img
                                            src={
                                              path_image + "accordian_arrow.svg"
                                            }
                                            alt=""
                                          />
                                        </Link>
                                      </td>
                                    </tr>
                                    <tr className="blank">
                                      <td
                                        colSpan="10"
                                        style={{ height: "10px" }}
                                      >
                                        &nbsp;
                                      </td>
                                    </tr>
                                  </React.Fragment>
                                );
                              }
                            )}
                          </>
                        ) : !apiStatus ? (
                          <div className="no_found">
                            <p>No Data Found</p>
                          </div>
                        ) : (
                          ""
                        )}
                      </tbody>
                    </Table>
                  ) : !apiStatus ? (
                    <div className="no_found">
                      <p>No Data Found</p>
                    </div>
                  ) : (
                    ""
                  )}
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
