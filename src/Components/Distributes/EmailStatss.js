import React, { useEffect, useState ,useRef} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useCallback } from "react";
import { loader } from "../../loader";
import Accordion from "react-bootstrap/Accordion";

import {
  getDraftData,
  getEmailData,
  getSelectedSmartListData,
} from "../../actions";
import { popup_alert } from "../../popup_alert";

const EmailStats = (props) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [sortingCount, setSortingCount] = useState(0);
  const [totalCount, setTotalCount] = useState([]);
  const [update, setUpdate] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [sorting, setSorting] = useState(0);
  const [sortDatee, setSortDate] = useState(0);
  const [campaignData, setData] = useState([]);
  const [showLessInfo, setShowLessInfo] = useState(true);
  const [getloadmore, setloadmore] = useState(0);
  const [lastPage, setLastPage] = useState();
  const [campaignDataLength, setCampaignDataLength] = useState();
  const [updatedData, setUpdatedData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchStarted, setSearchStarted] = useState(0);
  const [searchData, setSearchData] = useState([]);
  const [sortingCountDate, setSortingCountDate] = useState(0);
  const [loadmore, setLoadMore] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoader, setShowLoader] = useState(0);
  const [sortTitleStarted, setSortTitleStarted] = useState(0);

  const [perPageData, setPerPageData] = useState();

  const rdLikeArray=["56Ek4feL/1A8mZgIKQWEqg==","sNl1hra39QmFk9HwvXETJA==","MXl8m36VZFYXpgFVz3Pg0g=="]
  const isLikeRdAccount= rdLikeArray.includes(localStorage.getItem("user_id"))

  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  const [showfilter, setShowFilter] = useState(false);
  const [filterdata, setFilterData] = useState([]);
  const [filtersites, setFilterSites] = useState([]);
  const [filterroles, setFilterRole] = useState([]);
  const [filter, setFilter] = useState({});
  const [updateflag, setUpdateFlag] = useState([]);
  const [filterapplied, setFilterApply] = useState(false);

  const roles = [
    "Site User-Blinded",
    "Investigator-Blinded",
    "Site unblinded pharmacist",]

  useEffect(() => {
    getCampaignList(1, "");
  }, []);

  const getCampaignList = async (page, search,filter) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      page: page,
      search: search,
      ...(isLikeRdAccount && { filter: filter }),
    };
    loader("show");
    await axios
      .post(`distributes/get_send_campaign_list_new`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          // console.log(res);
          setShowLoader(1);

          setData((oldArray) => [...oldArray, ...res.data.response.data]);
          setCurrentPage(res.data.response.pegination.currentPage);
          setTotalCount(res.data.response.pegination.totalCount);
          setLastPage(res.data.response.pegination.lastPage);
          setPerPageData(res.data.response.pegination.perPage);
        } else {
          setShowLoader(0);
          // toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const getDetails = (id) => {
    navigate("/get-details", {
      state: { distribute_id: id },
    });
  };

  const sendCampaign = (dist_id, type) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    const body = {
      user_id: localStorage.getItem("user_id"),
      distribute_id: dist_id,
      send_status: type,
    };

    axios
      .post(`distributes/resend_campaign_with_all_pending_readers`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          draftNavigate(res.data.response.data.campaign_id, res?.data?.response?.data?.user_data);
        } else {
          toast.warning(res.data.message);
          loader("hide");
        }
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });
  };

  const draftNavigate = async (campaign_id,readerData) => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      campaign_id: campaign_id,
    };
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/get_campaign_details`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          let campaign_data = res.data.response.data;
          campaign_data.campaign_data.selectedHcp =  readerData;
          let route = res.data.response.data.route_location;
          props.getDraftData(campaign_data);
          if (campaign_data?.smart_list_data) {
            if (
              typeof campaign_data.smart_list_data != "undefined" &&
              campaign_data.smart_list_data != ""
            ) {
              props.getSelectedSmartListData(campaign_data.smart_list_data);
            }
          }
          navigate("/" + route);
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });
  };

  const sortTitle = () => {
    // setSortTitleStarted(1);
    let normalArr = [];
    normalArr = campaignData;
    if (sorting === 0) {
      normalArr.sort((a, b) =>
        a.pdf_title.toLowerCase() > b.pdf_title.toLowerCase()
          ? 1
          : b.pdf_title.toLowerCase() > a.pdf_title.toLowerCase()
          ? -1
          : 0
      );
    } else {
      normalArr.sort((a, b) =>
        a.pdf_title.toLowerCase() < b.pdf_title.toLowerCase()
          ? 1
          : b.pdf_title.toLowerCase() < a.pdf_title.toLowerCase()
          ? -1
          : 0
      );
    }
    setSortingCountDate(0);
    setData(normalArr);
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  };

  const sortDate = () => {
    let normalArr = [];
    normalArr = campaignData;
    let sortedData;
    if (sortDatee == 0) {
      sortedData = normalArr.sort(function (a, b) {
        var aa = a.sent_data.split("/").reverse().join(),
          bb = b.sent_data.split("/").reverse().join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      });
    } else {
      sortedData = normalArr.sort(function (a, b) {
        var aa = a.sent_data.split("/").reverse().join(),
          bb = b.sent_data.split("/").reverse().join();
        return aa > bb ? -1 : aa < bb ? 1 : 0;
      });
    }

    setSortingCount(0);
    setData(sortedData);
    setSortDate(1 - sortDatee);
    setSortingCountDate(sortingCountDate + 1);
  };

  const searchChange = (e) => {
    setSearch(e.target.value.trim());

    if (e.target.value === "") {
      setData([]);
      setSearch("");
      getCampaignList(1, "",isLikeRdAccount ? filter : undefined);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setData([]);
    getCampaignList(1, search,isLikeRdAccount ? filter : undefined);
  };

  const load_more = () => {
    setSorting(0);
    setSortDate(0);
    setSortingCountDate(0);
    setSortingCount(0);
    getCampaignList(currentPage + 1, search,isLikeRdAccount ? filter : undefined);
  };

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

  const getCampaignFiltereData = async () => {
    try {
      loader('show');
      const body = {
        user_id: localStorage.getItem("user_id"),
      };
      await axios
        .post(`emailapi/get_campaign_list_filter`, body)
        .then((res) => {
          setFilterData(res?.data?.response?.filter ? res?.data?.response?.filter : {});

          // getData("initial");
        })
        .catch((err) => {
          loader("hide");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      loader('hide');
    }
  }

  useEffect(() => {
    if (isLikeRdAccount) {
      getCampaignFiltereData();
    }
  }, [isLikeRdAccount]);

  const handleOnFilterSites = (fsite) => {
    let tag_index = filtersites.indexOf(fsite);
    if (tag_index !== -1) {
      filtersites.splice(tag_index, 1);
      setFilterSites(filtersites);
    } else {
      filtersites.push(fsite);
      setFilterSites(filtersites);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("sites")) {
      getfilter.sites = filtersites;
    } else {
      getfilter = Object.assign({ site: filtersites }, filter);
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnFilterRole = (frole) => {
    let tag_index = filterroles.indexOf(frole);
    if (tag_index !== -1) {
      filterroles.splice(tag_index, 1);
      setFilterRole(filterroles);
    } else {
      filterroles.push(frole);
      setFilterRole(filterroles);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("role")) {
      getfilter.role = filterroles;
    } else {
      getfilter = Object.assign({ role: filterroles }, filter);
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const clearFilter = () => {
    setFilterSites([]); 
    setFilterRole([]); 
    setSearch("");
    setFilter([])
    setShowFilter(false); 
    let up = updateflag + 1; 
    setUpdateFlag(up);
    getCampaignList(1, "", []); 
    setData([]); 
};


  const applyFilter = () => {
    setFilterApply(true);
    setData([]);
    getCampaignList(1, search,filter);
    setShowFilter(false);
  };

  const removeindividualfilter = (src, item) => {
    loader("show");
    if (src == "site") {
      handleOnFilterSites(item);
    }
    if (src == "role") {
      handleOnFilterRole(item);
    }
    if (filterapplied) {
    setData([]);
    getCampaignList(1, search,filter);
    } 
    else {
      loader("hide");
    }
    setShowFilter(false);
  };

  return (
    <>
      <div className="right-sidebar">
        <section className="search-hcp smart-list-view">
        <div className="top-right-action flex-wrap justify-content-end mb-2">
        <div className="search-bar">
                      <form
                        className="d-flex"
                        onSubmit={(e) => submitHandler(e)}
                      >
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search Campaign"
                          aria-label="Search"
                          onChange={(e) => searchChange(e)}
                        />
                        {!search ? (
                          <button
                            className="btn btn-outline-success"
                            type="submit"
                          >
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
                              ></path>
                            </svg>
                          </button>
                        ) : null}
                      </form>
              </div>

             {isLikeRdAccount? <div
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
                  {showfilter && (
                    <div
                      ref={filterRef}
                      className="dropdown-menu filter-options filter-drop"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <h4>Filter By</h4>
                      <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item className="card" eventKey="1">
                                  <Accordion.Header className="card-header">
                                    Sites
                                  </Accordion.Header>
                                  <Accordion.Body className="card-body">
                                    <ul>
                                      {Object.entries(filterdata.sites).map(
                                        ([index, item]) => (
                                          
                                          <li>
                                            <label className="select-multiple-option">
                                              <input
                                                type="checkbox"
                                                id={`custom-checkbox-sites-${index}`}
                                                name="sites[]"
                                                value={item}
                                                checked={
                                                  updateflag > 0 &&
                                                  typeof filtersites !==
                                                  "undefined" &&
                                                  filtersites.indexOf(item) !== -1
                                                }
                                                onChange={() =>
                                                  handleOnFilterSites(item)
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
                        
                                <Accordion.Item className="card" eventKey="2">
                                <Accordion.Header className="card-header">
                                  IRT Role
                                </Accordion.Header>
                                <Accordion.Body className="card-body">
                                  <ul>
                                    {roles.map((role, index) => (
                                      <li key={index}>
                                        <label className="select-multiple-option">
                                          <input
                                            type="checkbox"
                                            id={`custom-checkbox-role-${index}`}
                                            name="roles[]"
                                            value={role}
                                            checked={
                                              updateflag > 0 &&
                                              typeof filterroles !== "undefined" &&
                                              filterroles.indexOf(role) !== -1
                                            }
                                            onChange={() => handleOnFilterRole(role)}
                                          />
                                          {role}
                                          <span className="checkmark"></span>
                                        </label>
                                      </li>
                                    ))}
                                  </ul>
                                </Accordion.Body>
                              </Accordion.Item>

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
              </div> : null}
        </div>
          <div className="result-hcp-table">
            <div className="table-title">
              <h4>
                Total Result <span>| {totalCount}</span>
              </h4>
              
            </div>

            {updateflag > 0 &&
              (filtersites.length > 0 || filterroles.length > 0) && (
                <div className="apply-filter">
                  <h6>Applied filters</h6>
                  <div className="filter-block">
                    <div className="filter-block-left full">
                      {filtersites.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Sites |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(filtersites).map(([index, item]) => (
                              <div
                                className="filter-result"
                                onClick={(event) =>
                                  removeindividualfilter("site", item)
                                }
                              >
                                {item}
                                <img
                                  src={path_image + "filter-close.svg"}
                                  alt="Close-filter"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                        {filterroles.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>IRT Role |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(filterroles).map(([index, item]) => (
                              <div
                                className="filter-result"
                                onClick={(event) =>
                                  removeindividualfilter("role", item)
                                }
                              >
                                {item}
                                <img
                                  src={path_image + "filter-close.svg"}
                                  alt="Close-filter"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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
              )}

            <div
              // className="selected-hcp-list search_view email_stats email-resultss"
              className={`selected-hcp-list search_view email_stats email-resultss ${isLikeRdAccount ? "rd-account" : ""}`}
              id="analytics-hcp-table"
            >
              <div className="email_stats_title_heading">
                <table>
                  <thead>
                    <tr>
                   {isLikeRdAccount ?<th>
                      Site No.
                      </th> : null}
                      <th>
                      Subject
                      </th>
                      <th>
                      Description
                      </th>
                      <th>
                      Campaign       
                      </th>
                      <th>
                      Creator
                      </th>
                      <th>
                      Date
                      </th>
                    </tr>
                  </thead>
                </table>
                </div>
              {/* <div className="table_xls search_view">
                <div className="smart-list-btns">
                  <div className="top-right-action">

                  </div>
                </div>
              </div> */}
              <Accordion defaultActiveKey="0">
                {
                  typeof campaignData !== "undefined" && campaignData.length > 0 ?
                  campaignData.map((campaignItem, index) => {
                    return(
                      <>
                          <Accordion.Item eventKey={index}>
                            <Accordion.Header>
                                <table>
                                  <tbody>
                                    <tr>
                                      {/* {isLikeRdAccount ?<td>{campaignItem?.unique_site_numbers && campaignItem?.unique_site_numbers?.length > 0 ? campaignItem?.unique_site_numbers.join(', ') : 'N/A'}</td> : null} */}
                                            {isLikeRdAccount ? (
                                            <td>
                                              {campaignItem?.unique_site_numbers && campaignItem?.unique_site_numbers.length > 0
                                                  ? campaignItem?.unique_site_numbers.every(site => site === null || site === undefined || site === "")
                                                      ? 'N/A'
                                                      : campaignItem?.unique_site_numbers
                                                          .filter(site => !(site === null || site === undefined || site === "" || site === "0" || site === 0))
                                                          .join(', ')
                                                  : 'N/A'}
                                            </td>
                                          ) : null}


                                      <td>
                                      {campaignItem?.subject}
                                      </td>
                                      <td>
                                      {campaignItem?.description}
                                      </td>
                                      <td>
                                      {campaignItem?.title}
                                      </td>
                                      <td>
                                      {campaignItem?.creator}
                                      </td>
                                      <td>
                                      <div className="last-activity">
                                        <span className="last-activity-date ">{campaignItem?.lastactivity}</span>
                                          {
                                          campaignItem?.campaignSend && campaignItem?.campaignSend.length > 1 ?
                                            <div className="mail-resend" title="Resend Emails">
                                              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g id="Glyph"><g data-name="Glyph" id="Glyph-2"><path d="M49,35a8,8,0,0,0-3.17.66l.12-.34a1,1,0,1,0-1.9-.64l-1,3a1,1,0,0,0,.58,1.25l2.5,1a1,1,0,0,0,.74-1.86l-.76-.3A6,6,0,1,1,43,43a1,1,0,0,0-2,0,8,8,0,1,0,8-8Z" fill="#0066be" /><path d="M56,32.06V16.23A8.24,8.24,0,0,0,47.77,8H10.23A8.24,8.24,0,0,0,2,16.23V37.77A8.24,8.24,0,0,0,10.23,46H36.36A13,13,0,1,0,56,32.06ZM34.19,27.64a8.11,8.11,0,0,1-10.37,0L6.63,42.86A6.38,6.38,0,0,1,5.2,41.45l17.09-15.1L5.52,12.15a6.56,6.56,0,0,1,1.57-1.3L25,26a6.14,6.14,0,0,0,8,0L50.91,10.85a6.56,6.56,0,0,1,1.57,1.3L35.74,26.33l6.51,5.56a12.46,12.46,0,0,0-1.67,1.21ZM49,54A11,11,0,1,1,60,43,11,11,0,0,1,49,54Z" fill="#0066be" /></g></g></svg>
                                              <span>{campaignItem?.campaignSend.length - 1}</span>
                                            </div>
                                            : null
                                          }
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                
                                
                            </Accordion.Header>
                            <Accordion.Body className="card-body">
                              <>
                              <div className="table_xls">
                                <table className="table">
                                  <thead>
                                    <tr>
                                    {isLikeRdAccount ?<th scope="col">Site No.</th> : null}
                                      <th scope="col">Campaign ID</th>
                                      <th scope="col">
                                        Date{" "}
                                        {/* <div className="hcp-sort">
                                          {sortingCountDate == 0 ? (
                                            <>
                                              <button
                                                className="btn btn-outline-primary"
                                                onClick={sortDate}
                                              >
                                                <img
                                                  src={path_image + "sort.svg"}
                                                  alt="Shorting"
                                                />
                                              </button>
                                            </>
                                          ) : sortDatee == 0 ? (
                                            <>
                                              <button
                                                className="btn btn-outline-primary desc"
                                                onClick={sortDate}
                                              >
                                                <img
                                                  src={path_image + "sort-decending.svg"}
                                                  alt="Shorting"
                                                />
                                              </button>
                                            </>
                                          ) : (
                                            <>
                                              <button
                                                className="btn btn-outline-primary asc"
                                                onClick={sortDate}
                                              >
                                                <img
                                                  src={path_image + "sort-assending.svg"}
                                                  alt="Shorting"
                                                />
                                              </button>
                                            </>
                                          )}
                                        </div> */}
                                      </th>
                                      <th scope="col">Subject</th>
                                    { !isLikeRdAccount ? <th scope="col">
                                        Article title{" "}
                                        <div className="hcp-sort">
                                          {/* {sortingCount == 0 ? (
                                            <>
                                              <button
                                                className="btn btn-outline-primary"
                                                onClick={sortTitle}
                                              >
                                                <img
                                                  src={path_image + "sort.svg"}
                                                  alt="Shorting"
                                                />
                                              </button>
                                            </>
                                          ) : sorting == 0 ? (
                                            <>
                                              <button
                                                className="btn btn-outline-primary desc"
                                                onClick={sortTitle}
                                              >
                                                <img
                                                  src={path_image + "sort-decending.svg"}
                                                  alt="Shorting"
                                                />
                                              </button>
                                            </>
                                          ) : (
                                            <>
                                              <button
                                                className="btn btn-outline-primary asc"
                                                onClick={sortTitle}
                                              >
                                                <img
                                                  src={path_image + "sort-assending.svg"}
                                                  alt="Shorting"
                                                />
                                              </button>
                                            </>
                                          )} */}
                                        </div>
                                      </th> : null}

                                      <th className="smartlistth" scope="col">
                                        Smart list
                                      </th>
                                     
                                      <th scope="col">Total mail sent</th>
                                      <th scope="col">Email read</th>
                                      <th scope="col">Pending read email</th>

                                      <th scope="col">Bounce count</th>
                                      <th scope="col">Details</th>
                                      <th scope="col">Sent to pending</th>
                                      <th scope="col">Sent to all</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {typeof campaignItem?.campaignSend !== "undefined" &&
                                    campaignItem?.campaignSend.length > 0 ? (
                                      campaignItem?.campaignSend.map((item, index) => (
                                        <>
                                          <tr className={item?.campaign_status == 5 ? "queue_row" : "campaign_row"} key={index}>
                                          {isLikeRdAccount ? (
                                            <td>
                                              {item.sites && item.sites.length > 0
                                                  ? item.sites.every(site => site === null || site === undefined || site === "")
                                                      ? 'N/A'
                                                      : item.sites
                                                          .filter(site => !(site === null || site === undefined || site === "" || site === "0" || site === 0))
                                                          .join(', ')
                                                  : 'N/A'}
                                            </td>
                                          ) : null}


                                            <td> {item.c_id}</td>
                                            <td> {item.sent_data}</td>
                                            <td className="smartlistth"> {item.subject}</td>
                                           {!isLikeRdAccount? <td className="smartlistth"> {item.pdf_title}</td> : null}
                                            <td className="smartlistth"> {item.list}</td>
                                           
                                            <td> {item.total_sent_count}</td>
                                            <td> {item.total_read_count}</td>
                                            <td> {item.total_pending_count}</td>

                                            <td> {item.total_bouns_count}</td>
                                            <td>
                                              <button
                                                type="button"
                                                className={item?.campaign_status == 5 ? "btn btn-primary btn-bordered disabled" : "btn btn-primary btn-bordered" }
                                                onClick={(e) => getDetails(item.distribute_id)}
                                              >
                                                Details
                                              </button>
                                            </td>
                                            <td>
                                              <button
                                                type="button"
                                                className={item?.campaign_status == 5 ? "btn btn-primary btn-bordered disabled" : "btn btn-primary btn-bordered" }
                                                onClick={(e) =>
                                                  sendCampaign(item.distribute_id, 2)
                                                }
                                              >
                                                Send pending
                                              </button>
                                            </td>
                                            <td>
                                              <button
                                                type="button"
                                                className={item?.campaign_status == 5 ? "btn btn-primary btn-bordered disabled" : "btn btn-primary btn-bordered" }
                                                onClick={(e) =>
                                                  sendCampaign(item.distribute_id, 1)
                                                }
                                              >
                                                Send all
                                              </button>
                                            </td>
                                          </tr>
                                        </>
                                      ))
                                    ) : (
                                      <tr className="data-not-found">
                                        <td colspan="12">
                                          <h4>No Data Found</h4>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              </>
                            </Accordion.Body>
                          </Accordion.Item>
                      </>
                    )
                  })
                  : <div className="no_found"><p>No Data Found</p></div>
                }
              </Accordion>
              
              {typeof campaignData !== "undefined" &&
              currentPage !== lastPage && campaignData.length > 12 && filterroles  &&
              showLoader ? (
                <div className="load_more">
                  <button
                    className="btn btn-primary btn-filled"
                    onClick={load_more}
                  >
                    Load More
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  getDraftData: getDraftData,
  getSelectedSmartListData: getSelectedSmartListData,
  getEmailData: getEmailData,
})(EmailStats);
