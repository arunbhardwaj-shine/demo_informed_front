import React, { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import axios from "axios";
import { postData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";

import {
  Accordion,
  Col,
  Dropdown,
  DropdownButton,
  Nav,
  NavDropdown,
  NavItem,
  Row,
  Tab,
  Tabs,ProgressBar
} from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { loader } from "../../../loader";
  import { toast } from "react-toastify";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const LibraryContent = () => {
    const [SendListData, setSendListData] = useState([]);
      const [UserData, setUserData] = useState([]);
      const [getoriginalsendlistdata, setOriginalSendListData] = useState([]);
  const [articleSelected, setArticleSelected] = useState("Select By Article");
  const [actionSelected, setActionSelected] = useState("0");
  const [sortSelected, setSortSelected] = useState("Select By");
  const [renderAfterValidation, setRenderAfterValidation] = useState(0);
  const [sorting, setSorting] = useState(0);
    const [filter, setFilter] = useState("");
      const [submiHandle, setSubmiHandle] = useState("");
   const [filterdata, setFilterData] = useState([]);
     const [filtertags, setFilterTags] = useState([]);
  const [filtercreator, setFilterCreators] = useState([]);
  const [filterdate, setFilterDate] = useState([]);
  const [filtercampaign, setFilterCampaigns] = useState([]);
    const [filterapplied, setFilterApply] = useState(false);
  const [updateflag, setUpdateFlag] = useState([]);
  const [validator] = React.useState(new SimpleReactValidator());
  const [page, setPage] = useState(1);
   const [showfilter, setShowFilter] = useState(false);

  const [libraryData, setLibraryData] = useState([]);

  const loadMoreClicked = () => {
    setPage(page + 1);
  };

  // useEffect(() => {
  //   getTags();
  // }, []);

  const getTags = async () => {
    try {
      let body = {
        id: 18207,
      };
      loader("show");
      const res = await postData(ENDPOINT.TAGS, body);
      console.log(res);

      loader("hide");
      console.log(res);
    } catch (err) {
      console.log("err");
    }
  };
    const submitHandler = (event) => {
    setShowFilter(false);
    getData("progress");
    setSubmiHandle(1);
    event.preventDefault();
    return false;
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

  const clearFilter = () => {
    document.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });
    document.getElementById("email_search").value = "";
    setSearch('');
    setFilterTags([]);
    setFilterCreators([]);
    setFilterDate([]);
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
    getData("progress");
    setShowFilter(false);
  };

  const removeindividualfilter = (src, item) => {
    // setRemoveFlag(true);
    loader("show");
    if (src == "tag") {
      handleOnFilterTags(item);
    } else if (src == "campaign") {
      handleOnFilterCampaign(item);
    } else if (src == "date") {
      handleOnFilterDate(item);
    } else if (src == "creator") {
      handleOnFilterCreator(item);
    }
    if (filterapplied) {
      getData("progress");
    } else {
      loader("hide");
    }
    setShowFilter(false);
  };
    const getData = (stage) => {
    loader("show");
    const body = {
      user_id: localStorage.getItem("user_id"),
      search: search,
      filter: filter,
    };
    axios
      .post(`emailapi/getlist`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          setSendListData(res.data.response.data.emails);
          if (stage == "initial") {
            setOriginalSendListData(res.data.response.data.emails);

            setFilterData(res.data.response.data.filter);
            console.log(res.data.response.data.filter);
          }
          setUserData(res.data.response.data.user);
        } else if (res.data.status_code == 201) {
          setSendListData([]);
        } else {
          setSendListData([]);
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });
  };
  // useEffect(() => {
  //   getLibraryData(page, articleSelected, actionSelected);
  // }, [page, articleSelected, actionSelected]);

  const getLibraryData = async (page, expire_data, actionSelected) => {
    try {
      let body = {
        id: 18207,
        page: page,
        expire: expire_data,
        draft: actionSelected,
      };
      loader("show");
      const res = await postData(ENDPOINT.LIBRARY, body);
      setLibraryData((oldArray) => [...oldArray, ...res.data.data]);

      loader("hide");
      console.log(res);
    } catch (err) {
      console.log("err");
    }
  };

  const [search, setSearch] = useState("");
  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  const [eventSelected, setEventSelected] = useState("All Tags");

  const eventDropDownClicked = (e) => {
    console.log(e);
    setEventSelected(e);
  };
  const articleDropDownClicked = (e) => {
    console.log(e);
    setLibraryData([]);
    setPage(1);
    setArticleSelected(e);
    // getLibraryData(1, e);
  };
  const actionDropDownClicked = (e) => {
    setLibraryData([]);
    setPage(1);
    if (e == "Draft") {
      setActionSelected("0");
    } else {
      setActionSelected("1");
    }
  };
  const sortDropDownClicked = (e) => {
    setSortSelected(e);
    console.log("hi");
    //console.log(readers);
    let normalArr = [];
    normalArr = libraryData;
    if (e == "Ascending") {
      normalArr.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase()
          ? 1
          : b.title.toLowerCase() > a.title.toLowerCase()
          ? -1
          : 0
      );
    } else {
      normalArr.sort((a, b) =>
        a.title.toLowerCase() < b.title.toLowerCase()
          ? 1
          : b.title.toLowerCase() < a.title.toLowerCase()
          ? -1
          : 0
      );
    }
    setLibraryData(normalArr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      console.log("All Valid");
    } else {
      validator.showMessages();
      setRenderAfterValidation(renderAfterValidation + 1);
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
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div class="top-header">
                <div class="page-title">
                    <h2>Content</h2>
                </div>
                <div class="top-right-action">
                    <div className="search-bar">
              <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Search"
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
                    <div className={showfilter ? "filter-by nav-item dropdown highlight" : "filter-by nav-item dropdown"}>
              <button
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
                                            typeof filtertags !== "undefined" &&
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
                                          typeof filterdate !== "undefined" &&
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

              {/*
                 <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                     <li><a className="dropdown-item" href="#">Filter1 <img src={path + "filter-close.svg"} alt="Close-filter" /></a></li>
                     <li><a className="dropdown-item" href="#">Filter2 <img src={path + "filter-close.svg"} alt="Close-filter" /></a></li>
                     <li><a className="dropdown-item" href="#">Filter3 <img src={path + "filter-close.svg"} alt="Close-filter" /></a></li>
                 </ul>
                 */}
            </div>
                </div>
            </div>
            {/* <div className="search_view readers">
              <div className="smart-list-btns">
                <div className="top-right-action library_content_view">
                  <div className="col">
                    <label>Select Tags</label>
                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                      title={eventSelected}
                      // onSelect={(event) => eventDropDownClicked(event)}
                    >
                      <Dropdown.Item eventKey="All Tags">
                        All Tags
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Tags 1">Tags 1</Dropdown.Item>
                      <Dropdown.Item eventKey="Tags 2">Tags 2</Dropdown.Item>
                      <Dropdown.Item eventKey="Tags 3">Tags 3</Dropdown.Item>
                      <Dropdown.Item eventKey="Tags 4">Tags 4</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col">
                    <label>Select By Article</label>

                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                      title={articleSelected}
                      // onSelect={(event) => articleDropDownClicked(event)}
                    >
                      <Dropdown.Item eventKey=" Select By Article">
                        Select By Article
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="expire">Expired</Dropdown.Item>
                      <Dropdown.Item eventKey="unexpire">
                        Non-Expired
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col">
                    <label>Select Action</label>
                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                      title={actionSelected == "0" ? "draft" : "link"}
                    //  onSelect={(event) => actionDropDownClicked(event)}
                    >
                      <Dropdown.Item eventKey=" Select Action">
                        Select Action
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Draft">Draft</Dropdown.Item>
                      <Dropdown.Item eventKey="Live">Live</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col">
                    <label>Sort By</label>
                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                       title={sortSelected}
                    //  onSelect={(event) => sortDropDownClicked(event)}
                    >
                      <Dropdown.Item eventKey="Desending">
                        Desending
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Ascending">
                        Ascending
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </div>
            </div> */}
          </Row>
          <Row>
            <div className="library-content-box-layuot d-flex">       
                      <>
                        <div className="doc-content-main-box col">
                          <div className="doc-content-header">
                            <div className="doc-content-header-logo">
                              <a href="#">
                                <img
                                  alt="doc-logo"
                                  src={path_image + "dummy-img1.png"}
                                  style={{ width: "67px" }}
                                />
                              </a>
                            </div>
                            <div className="doc-content">
                              <h5>Single pdf</h5>
                              <h6>Sub-Title: arunp</h6>
                              <p>Author</p>
                              <div className="select-tags">
                                  <div>Topic1</div><div>Topic2</div><div>Topic3</div><div>Topic4</div>
                              </div>
                            </div>
                            {/* <div className="refresh-btn">
                              <img
                                src={path_image + "refresh1.png"}
                                alt="refresh-btn"
                                style={{ width: "20px" }}
                              />
                            </div> */}
                          </div>
                          <Tabs
                            defaultActiveKey="docintel-link" className="mb-3" fill
                            
                          >
                            <Tab eventKey="docintel-link" title="Docintel Link">
                              <div className="tab-panel">
                                <div className="tab-content-links">
                                  <a href="#" className="doc-link">
                                    https://docintel.app/arunp/WLMflJzX 
                                  </a>
                                  <span className="copy-content">
                                    <img src={path_image + "copy-content.svg"} alt="Copy"/>
                                  </span>
                                </div>
                                  <ul className="tab-mail-list">
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Upload date</strong>
                                      </h6>
                                      <h6>4 August 2022</h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>inforMedGo code</strong>
                                      </h6>
                                      <h6>cmlm1918717  <span className="copy-content">
                                        <img src={path_image + "copy-content.svg"} alt="Copy"/>
                                      </span></h6>
                                     
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Docintel code</strong>
                                      </h6>
                                      <h6>032884387  <span className="copy-content">
                                        <img src={path_image + "copy-content.svg"} alt="Copy"/>
                                      </span></h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>SPC included</strong>
                                      </h6>
                                      <h6>
                                        032884387
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
                                      <h6>Sunshine</h6>
                                    </li>
                                  </ul>
                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    <a href="#" className="footer-btn">
                                      Preview Aritcle
                                    </a>
                                    <a href="#" className="footer-btn">
                                      Download QR
                                    </a>
                                    <a href="#" className="footer-btn">
                                      Send in Email
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Tab>
                            <Tab eventKey="data-tab" title="Data">
                              <div className="data-main-box">
                                <ul className="tab-mail-list data">
                                  <li>
                                    <h6 className="tab-content-title">
                                      Unique Reader (total)
                                      <LinkWithTooltip
                                        tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h6>
                                    <div className="">
                                     <ProgressBar variant="warning" now={105} label={105} />
                                     <span>Agreed Limit | 300</span>
                                    </div>
                                    <span><large>195</large>Left</span>

                                  </li>
                                  <li>
                                    <h6 className="tab-content-title">
                                      Openings (total){" "}
                                      <LinkWithTooltip
                                        tooltip="Number of opening counts for specific article."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h6>
                                     <ProgressBar variant="success" now={43} label={43} />
                                  </li>
                                  <li>
                                    <h6 className="tab-content-title">
                                      Registered readers{" "}
                                      <LinkWithTooltip
                                        tooltip="Number of HCPs who have register for or activated the content."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h6>
                                      <ProgressBar variant="danger" now={3} label={3} />
                                  </li>
                                </ul>
                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    <a href="#" className="footer-btn">
                                      Analytics
                                    </a>
                                    <a href="#" className="footer-btn reset">
                                      Reset the collected data
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Tab>
                            <Tab eventKey="change-tab" title="Change">
                              <div className="data-main-box change-tab-main-box">
                                <ul className="tab-mail-list data change">
                                  <li>
                                    <h5 className="tab-content-title">
                                      <strong>Upload date</strong>
                                    </h5>
                                    <div className="select-dropdown-wrapper">
                                      <div className="select">
                                        <select>
                                          <option value="1">Sunshine</option>
                                          <option value="2">
                                            Offline Offer
                                          </option>
                                          <option value="3">Online Only</option>
                                        </select>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    <a href="#" className="footer-btn">
                                      Edit Docintel Link
                                    </a>
                                    <a href="#" className="footer-btn">
                                      Add / Remove Tags
                                    </a>
                                    <a href="#" className="footer-btn">
                                      New Sublink
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Tab>
                            <Tab eventKey="sales" title="Sales">
                              <div className="tab-panel">
                                  <ul className="tab-mail-list">
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Sales person</strong>
                                      </h6>
                                      <h6>Sales person name</h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Production person</strong>
                                      </h6>
                                      <h6>Production person name</h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Client name</strong>
                                      </h6>
                                      <h6>Jacob Flindt</h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Client product</strong>
                                      </h6>
                                      <h6>
                                        Product name
                                      </h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Client country</strong>
                                      </h6>
                                      <h6>United Kingdom</h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Opening limit</strong>
                                      </h6>
                                      <h6>300</h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Link type</strong>
                                      </h6>
                                      <h6>Sunshine</h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Print</strong>
                                      </h6>
                                      <h6>No</h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Download</strong>
                                      </h6>
                                      <h6>Yes</h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Uploade date</strong>
                                      </h6>
                                      <h6>4 August 2022</h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Expiration date</strong>
                                      </h6>
                                      <h6>1 August 2023</h6>
                                    </li>
                                  </ul>
                              </div>
                            </Tab>
                          </Tabs>
                        </div>
                         <div className="doc-content-main-box col">
                          <div className="doc-content-header">
                            <div className="doc-content-header-logo">
                              <a href="#">
                                <img
                                  alt="doc-logo"
                                  src={path_image + "dummy-img1.png"}
                                  style={{ width:"67px" }}
                                />
                              </a>
                            </div>
                            <div className="doc-content">
                              <h5>Single pdf</h5>
                              <h6>Sub-Title: arunp</h6>
                              <p>Author</p>
                              <div className="select-tags">
                                  <div>Topic1</div><div>Topic2</div><div>Topic3</div><div>Topic4</div>
                              </div>
                            </div>
                          </div>
                          <Tabs
                            defaultActiveKey="docintel-link"
                            className="mb-3"
                            fill
                          >
                            <Tab eventKey="docintel-link" title="Docintel Link">
                              <div className="tab-panel">
                                <div className="tab-content-links">
                                  <a href="#" className="doc-link">
                                    https://docintel.app/arunp/WLMflJzX 
                                  </a>
                                  <span className="copy-content">
                                    <img src={path_image + "copy-content.svg"} alt="Copy"/>
                                  </span>
                                </div>
                                  <ul className="tab-mail-list">
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Upload date</strong>
                                      </h6>
                                      <h6>4 August 2022</h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>inforMedGo code</strong>
                                      </h6>
                                      <h6>cmlm1918717  <span className="copy-content">
                                        <img src={path_image + "copy-content.svg"} alt="Copy"/>
                                      </span></h6>
                                     
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Docintel code</strong>
                                      </h6>
                                      <h6>032884387  <span className="copy-content">
                                        <img src={path_image + "copy-content.svg"} alt="Copy"/>
                                      </span></h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>SPC included</strong>
                                      </h6>
                                      <h6>
                                        032884387
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
                                      <h6>Sunshine</h6>
                                    </li>
                                  </ul>
                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    <a href="#" className="footer-btn">
                                      Preview Aritcle
                                    </a>
                                    <a href="#" className="footer-btn">
                                      Download QR
                                    </a>
                                    <a href="#" className="footer-btn">
                                      Send in Email
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Tab>
                            <Tab eventKey="data-tab" title="Data">
                              <div className="data-main-box">
                                <ul className="tab-mail-list data">
                                  <li>
                                    <h5>
                                      Unique Reader (total):
                                      <LinkWithTooltip
                                        tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h5>
                                    <p className="data_box">6</p>
                                  </li>
                                  <li>
                                    <h5>
                                      Openings (total):{" "}
                                      <LinkWithTooltip
                                        tooltip="Number of opening counts for specific article."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h5>
                                    <p className="data_box">32</p>
                                  </li>
                                  <li>
                                    <h5>
                                      Registered Readers:{" "}
                                      <LinkWithTooltip
                                        tooltip="Number of HCPs who have register for or activated the content."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h5>
                                    <p className="data_box">23</p>
                                  </li>
                                </ul>
                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    <a href="#" className="footer-btn">
                                      Analytics
                                    </a>
                                  </div>
                                  <ul className="tab-mail-list tag">
                                    <li>
                                      <b>Tags:</b>
                                      <a href="#">N/A </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </Tab>
                            <Tab eventKey="change-tab" title="Change">
                              <div className="data-main-box change-tab-main-box">
                                <ul className="tab-mail-list data change">
                                  <li>
                                    <h5 className="tab-content-title">
                                      <strong>Article Type:</strong>
                                    </h5>
                                    <div className="select-dropdown-wrapper">
                                      <div className="select">
                                        <select>
                                          <option value="1">Sunshine</option>
                                          <option value="2">
                                            Offline Offer
                                          </option>
                                          <option value="3">Online Only</option>
                                        </select>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <b>Tags:</b>
                                    <a href="#" className="tags">
                                      N/A{" "}
                                    </a>
                                  </li>
                                </ul>
                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    <a href="#" className="footer-btn">
                                      Edit Docintel Link
                                    </a>
                                    <a href="#" className="footer-btn">
                                      Add / Remove Tags
                                    </a>
                                    <a href="#" className="footer-btn">
                                      New Sublink
                                    </a>
                                  </div>
                                  <div className="footer-btn">
                                    <button
                                      className="btn btn-primary btn-filled"
                                      type="submit"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Tab>
                          </Tabs>
                        </div>
                         <div className="doc-content-main-box col">
                          <div className="doc-content-header">
                            <div className="doc-content-header-logo">
                              <a href="#">
                                <img
                                  alt="doc-logo"
                                  src={path_image + "dummy-img1.png"}
                                  style={{ width:"67px"}}
                                />
                              </a>
                            </div>
                            <div className="doc-content">
                              <h5>Single pdf</h5>
                              <h6>Sub-Title: arunp</h6>
                              <p>Author</p>
                              <div className="select-tags">
                                  <div>Topic1</div><div>Topic2</div><div>Topic3</div><div>Topic4</div>
                              </div>
                            </div>
                          </div>
                          <Tabs
                            defaultActiveKey="docintel-link"
                            className="mb-3"
                            fill
                          >
                            <Tab eventKey="docintel-link" title="Docintel Link">
                              <div className="tab-panel">
                                <div className="tab-content-links">
                                  <a href="#" className="doc-link">
                                    https://docintel.app/arunp/WLMflJzX 
                                  </a>
                                  <span className="copy-content">
                                    <img src={path_image + "copy-content.svg"} alt="Copy"/>
                                  </span>
                                </div>
                                  <ul className="tab-mail-list">
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Upload date</strong>
                                      </h6>
                                      <h6>4 August 2022</h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>inforMedGo code</strong>
                                      </h6>
                                      <h6>cmlm1918717  <span className="copy-content">
                                        <img src={path_image + "copy-content.svg"} alt="Copy"/>
                                      </span></h6>
                                     
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Docintel code</strong>
                                      </h6>
                                      <h6>032884387  <span className="copy-content">
                                        <img src={path_image + "copy-content.svg"} alt="Copy"/>
                                      </span></h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>SPC included</strong>
                                      </h6>
                                      <h6>
                                        032884387
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
                                      <h6>Sunshine</h6>
                                    </li>
                                  </ul>
                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    <a href="#" className="footer-btn">
                                      Preview Aritcle
                                    </a>
                                    <a href="#" className="footer-btn">
                                      Download QR
                                    </a>
                                    <a href="#" className="footer-btn">
                                      Send in Email
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Tab>
                            <Tab eventKey="data-tab" title="Data">
                              <div className="data-main-box">
                                <ul className="tab-mail-list data">
                                  <li>
                                    <h5>
                                      Unique Reader (total):
                                      <LinkWithTooltip
                                        tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h5>
                                    <p className="data_box">6</p>
                                  </li>
                                  <li>
                                    <h5>
                                      Openings (total):{" "}
                                      <LinkWithTooltip
                                        tooltip="Number of opening counts for specific article."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h5>
                                    <p className="data_box">32</p>
                                  </li>
                                  <li>
                                    <h5>
                                      Registered Readers:{" "}
                                      <LinkWithTooltip
                                        tooltip="Number of HCPs who have register for or activated the content."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h5>
                                    <p className="data_box">23</p>
                                  </li>
                                </ul>
                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    <a href="#" className="footer-btn">
                                      Analytics
                                    </a>
                                  </div>
                                  <ul className="tab-mail-list tag">
                                    <li>
                                      <b>Tags:</b>
                                      <a href="#">N/A </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </Tab>
                            <Tab eventKey="change-tab" title="Change">
                              <div className="data-main-box change-tab-main-box">
                                <ul className="tab-mail-list data change">
                                  <li>
                                    <h5 className="tab-content-title">
                                      <strong>Article Type:</strong>
                                    </h5>
                                    <div className="select-dropdown-wrapper">
                                      <div className="select">
                                        <select>
                                          <option value="1">Sunshine</option>
                                          <option value="2">
                                            Offline Offer
                                          </option>
                                          <option value="3">Online Only</option>
                                        </select>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <b>Tags:</b>
                                    <a href="#" className="tags">
                                      N/A{" "}
                                    </a>
                                  </li>
                                </ul>
                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    <a href="#" className="footer-btn">
                                      Edit Docintel Link
                                    </a>
                                    <a href="#" className="footer-btn">
                                      Add / Remove Tags
                                    </a>
                                    <a href="#" className="footer-btn">
                                      New Sublink
                                    </a>
                                  </div>
                                  <div className="footer-btn">
                                    <button
                                      className="btn btn-primary btn-filled"
                                      type="submit"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Tab>
                          </Tabs>
                        </div>

                         <div className="doc-content-main-box col">
                          <div className="doc-content-header">
                            <div className="doc-content-header-logo">
                              <a href="#">
                                <img
                                  alt="doc-logo"
                                  src={path_image + "dummy-img1.png"}
                                  style={{ width:"67px" }}
                                />
                              </a>
                            </div>
                            <div className="doc-content">
                              <h5>Single pdf</h5>
                              <h6>Sub-Title: arunp</h6>
                              <p>Author</p>
                              <div className="select-tags">
                                  <div>Topic1</div><div>Topic2</div><div>Topic3</div><div>Topic4</div>
                              </div>
                            </div>
                          </div>
                          <Tabs
                            defaultActiveKey="docintel-link"
                            className="mb-3"
                            fill
                          >
                            <Tab eventKey="docintel-link" title="Docintel Link">
                             <div className="tab-panel">
                                <div className="tab-content-links">
                                  <a href="#" className="doc-link">
                                    https://docintel.app/arunp/WLMflJzX 
                                  </a>
                                  <span className="copy-content">
                                    <img src={path_image + "copy-content.svg"} alt="Copy"/>
                                  </span>
                                </div>
                                  <ul className="tab-mail-list">
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Upload date</strong>
                                      </h6>
                                      <h6>4 August 2022</h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>inforMedGo code</strong>
                                      </h6>
                                      <h6>cmlm1918717  <span className="copy-content">
                                        <img src={path_image + "copy-content.svg"} alt="Copy"/>
                                      </span></h6>
                                     
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>Docintel code</strong>
                                      </h6>
                                      <h6>032884387  <span className="copy-content">
                                        <img src={path_image + "copy-content.svg"} alt="Copy"/>
                                      </span></h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        <strong>SPC included</strong>
                                      </h6>
                                      <h6>
                                        032884387
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
                                      <h6>Sunshine</h6>
                                    </li>
                                  </ul>
                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    <a href="#" className="footer-btn">
                                      Preview Aritcle
                                    </a>
                                    <a href="#" className="footer-btn">
                                      Download QR
                                    </a>
                                    <a href="#" className="footer-btn">
                                      Send in Email
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Tab>
                            <Tab eventKey="data-tab" title="Data">
                              <div className="data-main-box">
                                <ul className="tab-mail-list data">
                                  <li>
                                    <h5>
                                      Unique Reader (total):
                                      <LinkWithTooltip
                                        tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h5>
                                    <p className="data_box">6</p>
                                  </li>
                                  <li>
                                    <h5>
                                      Openings (total):{" "}
                                      <LinkWithTooltip
                                        tooltip="Number of opening counts for specific article."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h5>
                                    <p className="data_box">32</p>
                                  </li>
                                  <li>
                                    <h5>
                                      Registered Readers:{" "}
                                      <LinkWithTooltip
                                        tooltip="Number of HCPs who have register for or activated the content."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h5>
                                    <p className="data_box">23</p>
                                  </li>
                                </ul>
                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    <a href="#" className="footer-btn">
                                      Analytics
                                    </a>
                                  </div>
                                  <ul className="tab-mail-list tag">
                                    <li>
                                      <b>Tags:</b>
                                      <a href="#">N/A </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </Tab>
                            <Tab eventKey="change-tab" title="Change">
                              <div className="data-main-box change-tab-main-box">
                                <ul className="tab-mail-list data change">
                                  <li>
                                    <h5 className="tab-content-title">
                                      <strong>Article Type:</strong>
                                    </h5>
                                    <div className="select-dropdown-wrapper">
                                      <div className="select">
                                        <select>
                                          <option value="1">Sunshine</option>
                                          <option value="2">
                                            Offline Offer
                                          </option>
                                          <option value="3">Online Only</option>
                                        </select>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <b>Tags:</b>
                                    <a href="#" className="tags">
                                      N/A{" "}
                                    </a>
                                  </li>
                                </ul>
                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    <a href="#" className="footer-btn">
                                      Edit Docintel Link
                                    </a>
                                    <a href="#" className="footer-btn">
                                      Add / Remove Tags
                                    </a>
                                    <a href="#" className="footer-btn">
                                      New Sublink
                                    </a>
                                  </div>
                                  <div className="footer-btn">
                                    <button
                                      className="btn btn-primary btn-filled"
                                      type="submit"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Tab>
                          </Tabs>
                        </div>
                      </>
                   
            </div>                            
            {/* <div className="load_more">
              <button
                className="btn btn-primary btn-filled"
                onClick={loadMoreClicked}
              >
                Load More
              </button>
            </div> */}
          </Row>
        </div>
      </Col>
    </>
  );
};

export default LibraryContent;
