import React, { useEffect, useState } from "react";
import {
  Accordion,
  Col,
  OverlayTrigger,
  ProgressBar,
  Row,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import { postData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { loader } from "../../../loader";
import { toast } from "react-toastify";
import { Spinner } from "react-activity";
import { popup_alert } from "../../../popup_alert";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const NewReaders = () => {
  let obj = {};
  const [search, setSearch] = useState("");
  const [readerDataList, setReaderDataList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [filterApplyflag, setFilterApplyflag] = useState(0);
  const [pageAll, setPageAll] = useState(false);
  const [pageAllClicked, setPageAllClicked] = useState(false);
  const [type, setType] = useState("");
  const [countryAll, setCountryAll] = useState([]);
  const [filterdata, setFilterData] = useState({
    Status: ["Registered", "Unregistered"],
  });
  const [filterObject, setFilterObject] = useState({});
  const [eventSelected, setEventSelected] = useState("Webinar registered");
  const [articleSelected, setArticleSelected] = useState("Select Tags");
  const [actionSelected, setActionSelected] = useState("Select Title");
  const [sortSelected, setSortSelected] = useState("User Action");
  const [sortUser, setSortUserd] = useState("Select User");
  const [updateflag, setupdateFlag] = useState(0);
  const [types, setTypes] = useState([
    { value: "0", label: "HCP" },
    { value: "1", label: "Staff User" },
    { value: "3", label: "Test User" },
    { value: "4", label: "Competitor" },
  ]);
  const searchChange = (e) => {setSearch(e.target.value);};
  const userTypeValues = {
    "0" : "Hcp",
    "1" : "Staff User",
    "3" :"Test User",
    "4" :"Competitor",
  };
  const [changeCountry, setChangeCountry] = useState([]);
  const [changeUserType, setChangeUserType] = useState([]);
  const [showfilter, setShowFilter] = useState(false);

  useEffect(() => {
    getReaderListData(page, filterObject, search);
  }, []);

  useEffect(() => {
    if(page == 2){
      getReaderListData(page, filterObject, search);
    }
  }, [page]);

  const getReaderListData = async (page, obj, search) => {
    try {
      loader("show");
      let data = {
        user_id: localStorage.getItem("user_id"),
        userType: 5,
        type: Object.keys(obj).length > 0 ? obj?.Status[0] : 'Unregistered',
        page: page,
      };
      if (pageAllClicked == true) {
        setPageAll(true);
      } else {
        loader("show");
      }
      const res = await postData(ENDPOINT.READER_LIST_DATA, data);

      let body = {
        "user_id": localStorage.getItem("user_id")
      };
      const res_data = await postData(ENDPOINT.SPC_HELPER_LISTING,body);
      let countries = []
      Object.entries(res_data?.data?.data?.country).map(([index, item]) => {
        countries.push({
          value: item,
          label: item  == "B&H" ? "Bosnia and Herzegovina" : item,
        });
        setCountryAll(countries);
      });

      // setLibraryData((oldArray) => [...oldArray, ...res?.data?.data?.library]);
      setReaderDataList((oldArray) => [...oldArray, ...res?.data?.data]);
      loader("hide");
      setPageAll(false);
      setPageAllClicked(false);
    } catch (err) {
      console.log(err);
      loader("hide");
    }
  };
  const loadMoreClicked = () => {
    setPageAllClicked(true);
    setPage(2);
    setType("rest");
  };
  const eventDropDownClicked = (e) => {
    setEventSelected(e);
  };
  const articleDropDownClicked = (e) => {
    setArticleSelected(e);
  };
  const actionDropDownClicked = (e) => {
    setActionSelected(e);
  };
  const sortDropDownClicked = (e) => {
    setSortSelected(e);
  };
  const userDropDownClicked = (e) => {
    setSortUserd(e);
  };

  const handleOnFilterChange = (e, item, index, key) => {
    if (!filterObject[key]) {
      filterObject[key] = [];
    }

    if (e?.target?.checked == true) {
      filterObject[key]  = [];
      filterObject[key]?.push(item);
      // filterObject[key] = item;
    } else {
      const index = filterObject[key]?.indexOf(item);
      if (index > -1) {
        filterObject[key]?.splice(index, 1);
        if (filterObject[key]?.length == 0) {
          delete filterObject[key];
        }
      }
    }

    setFilterObject(filterObject);
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
  let [active, setActive] = useState();
  const handleChange = (value) => {
    setActive(value);
  };


  const onCountryChange = (e, i) => {
    let consetValue = e.value;
    let consent = {
      index: i,
      value: consetValue,
    };

    const found = changeCountry.some((el) => el.index === i);
    if (!found) {
      setChangeCountry((oldarray) => [...oldarray, consent]);
    } else {
      const index = changeCountry.findIndex((el) => el.index === i);
      changeCountry[index].value = consetValue;
    }
  };

  const onUserChange = (e, i) => {
    let consetValue = e.value;
    let consent = {
      index: i,
      value: consetValue,
    };
    const found = changeUserType.some((el) => el.index === i);
    if (!found) {
      setChangeUserType((oldarray) => [...oldarray, consent]);
    } else {
      const index = changeUserType.findIndex((el) => el.index === i);
      changeUserType[index].value = consetValue;
    }
  };

  const updateReaderDetails = async(reader_id, index) => {
      try {
        const index = changeCountry.findIndex((el) => el.index === reader_id);
        let country = "";
        if(index !== -1){
          country = changeCountry[index].value;
        }

        const tindex = changeUserType.findIndex((el) => el.index === reader_id);
        let type = "";
        if(tindex !== -1){
          type = changeUserType[tindex].value;
        }

        if(country != "" || type != ""){
          loader("show");
          let body = {
            user_id: localStorage.getItem("user_id"),
            readerId: reader_id,
            userStatus:type,
            country:country
          };

          const res = await postData(ENDPOINT.READERSTATUSUPDATE, body);
          const lib_data_index = readerDataList.findIndex((el) => el.id === reader_id);
          if(country != ""){
            readerDataList[lib_data_index].country = country;
          }
          if(type != ""){
            readerDataList[lib_data_index].user_status = type;
          }
          const new_data = readerDataList;
          setReaderDataList(new_data);
          setupdateFlag(updateflag + 1);
          loader("hide");
          popup_alert({
              visible: "show",
              message: "Your Profile has been update <br />successfully !",
              type: "success",
              redirect: "",
            });
        }else{
          toast.warning("Nothing for update.");
        }
      } catch (err) {
        console.log("err", err);
        loader("hide");
      }
  }

  const clearFilter = () => {
    document.querySelectorAll("input")?.forEach((checkbox) => {
      checkbox.checked = false;
    });
    obj = {};

    if (filterApplyflag > 0) {
      setFilterObject({});
      setReaderDataList([]);

      getReaderListData(page, {}, search);
      setSearch("");
    }
    setShowFilter(false);
  }

  const applyFilter = (e) => {
    e.preventDefault();
    setFilterApplyflag(1);
    setReaderDataList([]);
    setFilterObject(filterObject);
    getReaderListData(page, filterObject, search);
    setShowFilter(false);
  }

  const removeindividualfilter = (key, item) => {
    // console.log(key,item);
    let old_object = filterObject;
    const index = old_object[key]?.indexOf(item);
    if (index > -1) {
      old_object[key]?.splice(index, 1);
      if (old_object[key]?.length == 0) {
        delete old_object[key];
      }
    }

    setFilterObject(old_object);
    setReaderDataList([]);
    getReaderListData(page, old_object);
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header reader_list">
              <div className="page-title">
                <h2>Readers</h2>
              </div>
              <div className="top-right-action library_content_view">
                <div className="search-bar">
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      id="email_search"
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
                <div className="filter-by nav-item dropdown">
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
                      ></path>
                      <path
                        d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                        fill="#97B6CF"
                      ></path>
                      <path
                        d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                        fill="#97B6CF"
                      ></path>
                    </svg>
                    )}
                  </button>

                  {showfilter && (
                    <div
                      className="dropdown-menu filter-options"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <h4>Filter By</h4>
                      <Accordion defaultActiveKey="0" flush>
                        {Object.keys(filterdata)?.map(function (key, index) {
                          return (
                            <>
                              {filterdata[key]?.length > 0 ? (
                                <Accordion.Item
                                  className="card"
                                  eventKey={index}
                                >
                                  <Accordion.Header className="card-header">
                                    {key}
                                  </Accordion.Header>

                                  <Accordion.Body className="card-body">
                                    <ul>
                                      {filterdata[key]?.length > 0
                                        ? filterdata[key]?.map(
                                            (item, index) => (
                                              <li>
                                                {item != "" ? (
                                                  <label className="select-multiple-option">
                                                    <input
                                                      type="radio"
                                                      id={`custom-checkbox-tags-${index}`}
                                                      value={item}
                                                      defaultChecked={
                                                        filterObject?.hasOwnProperty(
                                                          key
                                                        )
                                                          ? filterObject[
                                                              key
                                                            ]?.indexOf(item) !==
                                                            -1
                                                          : false
                                                      }
                                                      name="tags[]"
                                                      onChange={(e) =>
                                                        handleOnFilterChange(
                                                          e,
                                                          item,
                                                          index,
                                                          key
                                                        )
                                                      }
                                                    />

                                                    {key == "draft" &&
                                                    item == "0"
                                                      ? "live"
                                                      : key == "draft" &&
                                                        item == "1"
                                                      ? "draft"
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
              </div>
            </div>

            {Object.keys(filterObject)?.length !== 0 && filterApplyflag > 0 ? (
              <div className="apply-filter">
                <h6>Applied filters</h6>
                <div className="filter-block">
                  <div className="filter-block-left full">
                    {Object.keys(filterObject)?.map((key, index) => {
                      return (
                        <>
                          {filterObject[key]?.length > 0 ? (
                            <div className="filter-div">
                              <div className="filter-div-title">
                                <span>{key} |</span>
                              </div>
                              <div className="filter-div-list">
                                {filterObject[key]?.map((item, index) => (
                                  <div
                                    className="filter-result"
                                    onClick={(event) =>
                                      removeindividualfilter(key, item)
                                    }
                                  >
                                    {key == "draft" && item == "0"
                                      ? "live"
                                      : key == "draft" && item == "1"
                                      ? "draft"
                                      : item}
                                    <img
                                      src={path_image + "filter-close.svg"}
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

          </Row>
          <Row>
            <div className="library-content-box-layuot readerlist d-flex">
              <h4>
                <span>Total HCP</span> | {readerDataList?.length}
              </h4>
              {readerDataList?.length || updateflag
                ? readerDataList.map((data, index) => {
                    return (
                      <>
                        <div className="doc-content-main-box col" key={index}>
                          <div className="doc-content-header">
                            <div className="doc-content">
                              <h4>{data?.name}</h4>
                            </div>
                          </div>
                          <div className="tabs-data">
                            <Tabs defaultActiveKey="personal-details" fill>
                              <Tab
                                eventKey="personal-details"
                                title="Personal Details"
                                className="flex-column justify-content-between"
                              >
                                <div className="tab-panel d-flex flex-column justify-content-between">
                                  <ul className="tab-mail-list">
                                    <li>
                                      <h6 className="tab-content-title">
                                        Email
                                      </h6>
                                      <h6>
                                        {data?.email ? data?.email : "N/A"}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Country
                                      </h6>
                                      <h6>
                                        {
                                          data?.country ?
                                          data?.country == "B&H" ? "Bosnia and Herzegovina" : data?.country : "N/A"
                                        }
                                      </h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        User Status
                                      </h6>
                                      <h6>
                                        {userTypeValues[data?.user_status]}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Interests
                                      </h6>
                                      <h6>
                                        {data?.interests
                                          ? data?.interests
                                          : "N/A"}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Last Email
                                      </h6>
                                      <h6>
                                        {data?.last_email
                                          ? data?.last_email
                                          : "N/A"}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Last Activity
                                      </h6>
                                      <h6>
                                        {data?.last_activity
                                          ? data?.last_activity
                                          : "N/A"}
                                      </h6>
                                    </li>
                                  </ul>
                                </div>
                                <div className="data-main-footer-sec">
                                  <div className="data-main-footer-sec-inner">
                                    <div className="footer-btn d-flex justify-content-end">
                                      <Link
                                        to="/reader-edit"
                                        className="btn btn-primary btn-filled"
                                        state={{ id: data.id }}
                                      >
                                        Edit
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </Tab>
                              <Tab
                                eventKey="usage"
                                title="Usage"
                                className="flex-column justify-content-between"
                              >
                                <div className="data-main-box tab-panel d-flex flex-column justify-content-between">
                                  <ul className="tab-mail-list data">
                                    <li>
                                      <h6 className="tab-content-title">
                                        Emails Sent
                                        <LinkWithTooltip
                                          tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)."
                                          href="#"
                                        >
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
                                          variant="default"
                                          now={20}
                                          label={"20"}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Emails Opened
                                        <LinkWithTooltip
                                          tooltip="Number of opening counts for specific article."
                                          href="#"
                                        >
                                          <img
                                            src={
                                              path_image +
                                              "info_circle_icon.svg"
                                            }
                                            alt="refresh-btn"
                                          />
                                        </LinkWithTooltip>
                                      </h6>
                                      <div className="data-progress open">
                                        <ProgressBar
                                          variant="default"
                                          now={15}
                                          label={"2"}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Content Delivered
                                        <LinkWithTooltip
                                          tooltip="Number of HCPs who have register for or activated the content."
                                          href="#"
                                        >
                                          <img
                                            src={
                                              path_image +
                                              "info_circle_icon.svg"
                                            }
                                            alt="refresh-btn"
                                          />
                                        </LinkWithTooltip>
                                      </h6>
                                      <div className="data-progress delivered">
                                        <ProgressBar
                                          variant="default"
                                          now={2}
                                          label={"2"}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Content with RTR
                                        <LinkWithTooltip
                                          tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)."
                                          href="#"
                                        >
                                          <img
                                            src={
                                              path_image +
                                              "info_circle_icon.svg"
                                            }
                                            alt="refresh-btn"
                                          />
                                        </LinkWithTooltip>
                                      </h6>
                                      <div className="data-progress rtr">
                                        <ProgressBar
                                          variant="default"
                                          now={5}
                                          label={"5"}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        QR Openings
                                        <LinkWithTooltip
                                          tooltip="Number of opening counts for specific article."
                                          href="#"
                                        >
                                          <img
                                            src={
                                              path_image +
                                              "info_circle_icon.svg"
                                            }
                                            alt="refresh-btn"
                                          />
                                        </LinkWithTooltip>
                                      </h6>
                                      <div className="data-progress qr-opening">
                                        <ProgressBar
                                          variant="default"
                                          now={11}
                                          label={"11"}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        GO Openings
                                        <LinkWithTooltip
                                          tooltip="Number of HCPs who have register for or activated the content."
                                          href="#"
                                        >
                                          <img
                                            src={
                                              path_image +
                                              "info_circle_icon.svg"
                                            }
                                            alt="refresh-btn"
                                          />
                                        </LinkWithTooltip>
                                      </h6>
                                      <div className="data-progress go-opening">
                                        <ProgressBar
                                          variant="default"
                                          now={25}
                                          label={"25"}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Content Openings
                                        <LinkWithTooltip
                                          tooltip="Number of HCPs who have register for or activated the content."
                                          href="#"
                                        >
                                          <img
                                            src={
                                              path_image +
                                              "info_circle_icon.svg"
                                            }
                                            alt="refresh-btn"
                                          />
                                        </LinkWithTooltip>
                                      </h6>
                                      <div className="data-progress content-opening">
                                        <ProgressBar
                                          variant="default"
                                          now={19}
                                          label={"19"}
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="data-main-footer-sec">
                                  <div className="data-main-footer-sec-inner">
                                    <div className="footer-btn d-flex justify-content-end">
                                      <Link
                                        className="btn btn-primary btn-bordered"
                                        to="/timeline-detail"
                                        state={{ readerId: data?.id }}
                                      >
                                        See time line
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </Tab>
                              <Tab eventKey="change-tab" title="Change">
                                <div className="data-main-box change-tab-main-box">
                                  <ul className="tab-mail-list data change">
                                    <li>
                                      <h6 className="tab-content-title">
                                        User Status
                                      </h6>
                                      <div className="select-dropdown-wrapper">
                                        <div className="select">
                                          <Select
                                            options={types}
                                            defaultValue={
                                              types[types.findIndex(el => el.value == data?.user_status)]
                                            }
                                            onChange={(event) =>
                                              onUserChange(event, data.id)
                                            }
                                            id={"user_type_"+data?.id}
                                            className="dropdown-basic-button split-button-dropup"
                                            isClearable
                                          />
                                        </div>
                                      </div>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        User Country
                                      </h6>
                                      <div className="select-dropdown-wrapper">
                                        <div className="select">
                                          <Select
                                            options={countryAll}
                                            defaultValue={
                                              countryAll[countryAll.findIndex(el => el.value == data?.country)]
                                            }
                                            onChange={(event) =>
                                              onCountryChange(event, data.id)
                                            }
                                            id={"country_"+data?.id}
                                            className="dropdown-basic-button split-button-dropup"
                                            isClearable
                                          />
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                  <div className="data-main-footer-sec">
                                    <div className="footer-btn d-flex justify-content-end">
                                      <button
                                        className="btn btn-primary btn-filled update"
                                        onClick={(e) =>
                                          updateReaderDetails(data?.id, index)
                                        }
                                        id={data?.id}
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Tab>
                            </Tabs>
                          </div>
                        </div>
                      </>
                    );
                  })
                : null}
            </div>
            {page == 1 ? (
              <div className="load_more">
                <button
                  className="btn btn-primary btn-filled"
                  onClick={loadMoreClicked}
                >
                  Load More
                </button>
              </div>
            ) : null}

            {pageAll == true ? (
              <div
                className="load_more"
                style={{
                  margin: "0 auto",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Spinner color="#53aff4" size={32} speed={1} animating={true} />
              </div>
            ) : null}
          </Row>
        </div>
      </Col>
    </>
  );
};

export default NewReaders;
