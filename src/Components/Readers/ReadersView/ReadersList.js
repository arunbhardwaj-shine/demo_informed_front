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
import { postData, getData,postFormData } from "../../../axios/apiHelper";
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
  const [updateflag, setupdateFlag] = useState(0);
  const [types, setTypes] = useState([
    { value: "0", label: "HCP" },
    { value: "1", label: "Staff User" },
    { value: "3", label: "Test User" },
    { value: "4", label: "Competitor" },
  ]);

  const userTypeValues = {
    0: "Hcp",
    1: "Staff User",
    3: "Test User",
    4: "Competitor",
  };
  const [changeCountry, setChangeCountry] = useState([]);
  const [changeUserType, setChangeUserType] = useState([]);
  const [showfilter, setShowFilter] = useState(false);
  const [emailStats, setEmailStats] = useState([]);
  const [statsFlag, setStatsFlag] = useState(0);

  useEffect(() => {
    getFilters();
    getReaderListData(page, filterObject, search);
  }, []);

  useEffect(() => {
    if (page == 2) {
      getReaderListData(page, filterObject, search);
    }
  }, [page]);

  const getFilters = async () => {
    try {
      loader("show");
      const res = await getData(ENDPOINT.READERSFILTER);
      setFilterData(res?.data?.data);
      loader("hide");

    } catch (err) {
      loader("hide");

    }
  };

  const getReaderListData = async (page, obj, search) => {
    try {
      loader("show");
      let data = {
        user_id: localStorage.getItem("user_id"),
        userType: 5,
        search: search,
        type: "",
        page: page,
      };

      let payload = { ...data, ...obj };
      if (pageAllClicked == true) {
        setPageAll(true);
      } else {
        loader("show");
      }
      const res = await postData(ENDPOINT.READER_LIST_DATA, payload);

      let body = {
        "user_id": localStorage.getItem("user_id")
      };
      const res_data = await postData(ENDPOINT.SPC_HELPER_LISTING, body);
      let countries = [];
      Object.entries(res_data?.data?.data?.country).map(([index, item]) => {
        countries.push({
          value: item,
          label: item == "B&H" ? "Bosnia and Herzegovina" : item,
        });
        setCountryAll(countries);
      });

      if(page == 2){
        setReaderDataList((oldArray) => [...oldArray, ...res?.data?.data]);
      }else{
        setReaderDataList(res?.data?.data);
      }
      setPageAll(false);
      setPageAllClicked(false);
      setIsLoaded(true);
      loader("hide");
    } catch (err) {
      console.log(err);
      loader("hide");
    }
  };
  const getDownloadData = async (page, obj, search) => {
    try {
      loader("show");
      let data = {
        user_id: localStorage.getItem("user_id"),
        userType: 5,
        search: search,
        type: "",
        page: page,
      };

      let payload = { ...data, ...filterObject };
      const res = await postFormData(ENDPOINT.READER_DOWNLOAD,payload,{
        responseType: 'blob'
      });
      const link = document.createElement('a');
      const url = URL.createObjectURL(res?.data);
      console.log(url);
      link.href = url;
      link.download = 'readers.xlsx';
      link.click();
      loader("hide");
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

  const searchChange = (e) => {
    setSearch(e?.target?.value);
    if (e?.target?.value === "") {
      setReaderDataList([]);
      setPageAllClicked(false);

      getReaderListData(page, filterObject, "");
    }
  };

  const submitHandler = (event) => {
    setReaderDataList([]);
    getReaderListData(page, filterObject, search);
    event.preventDefault();
    return false;
  };

  const handleOnFilterChange = (e, item, index, key) => {
    if (!filterObject[key]) {
      filterObject[key] = [];
    }

    if (e?.target?.checked == true) {
      if(key == "status" || key == "contactType"){
        filterObject[key] = [];
      }
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


  const updateReaderDetails = async (reader_id, index) => {
    try {
      const index = changeCountry.findIndex((el) => el.index === reader_id);
      let country = "";
      if (index !== -1) {
        country = changeCountry[index].value;
      }

      const tindex = changeUserType.findIndex((el) => el.index === reader_id);
      let type = "";
      if (tindex !== -1) {
        type = changeUserType[tindex].value;
      }

      if (country != "" || type != "") {
        loader("show");
        let body = {
          userId: 18207,
          readerId: reader_id,
          userStatus: type,
          country: country,
        };

        const res = await postData(ENDPOINT.READERSTATUSUPDATE, body);
        const lib_data_index = readerDataList.findIndex(
          (el) => el.id === reader_id
        );
        if (country != "") {
          readerDataList[lib_data_index].country = country;
        }
        if (type != "") {
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
      } else {
        toast.warning("Nothing for update.");
      }
    } catch (err) {
      console.log("err", err);
      loader("hide");
    }
  };

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
  };

  const applyFilter = (e) => {
    e.preventDefault();
    setFilterApplyflag(1);
    setReaderDataList([]);
    setFilterObject(filterObject);
    getReaderListData(page, filterObject, search);
    setShowFilter(false);
  };

  const removeindividualfilter = (key, item) => {
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

  const tabClicked = async(key,userId) => {
      if(key == "usage"){
        let index = emailStats.findIndex((el) => el.userId == userId);
        if(index === -1){
            let normal_data = emailStats;
          try{
            let body = {
              "readerId" : userId
            };
            const res = await postData(ENDPOINT.READERACTIVITY, body);
            if(res?.data?.data){
              let new_data = res?.data?.data;
              normal_data.push(new_data);
              setEmailStats(normal_data);
              setStatsFlag(statsFlag + 1);
            }
          }catch(err){
            console.log(err);
          }
        }
      }
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
                  <div className="header-btn">
                    <button className="btn print"
                      onClick={()=>{
                        getDownloadData(page, obj, search)
                      }}
                      >
                    
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <mask id="mask0_1144_989" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                          <path d="M0 1.90735e-06H24V24H0V1.90735e-06Z" fill="white"/>
                          </mask>
                          <g mask="url(#mask0_1144_989)">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.51562 17.4023C2.29226 17.4023 1.30078 16.4109 1.30078 15.1875V9.5625C1.30078 8.33914 2.29226 7.34766 3.51562 7.34766H20.4844C21.7077 7.34766 22.6992 8.33914 22.6992 9.5625V15.1875C22.6992 16.4109 21.7077 17.4023 20.4844 17.4023H19.125C18.7949 17.4023 18.5273 17.6699 18.5273 18C18.5273 18.3301 18.7949 18.5977 19.125 18.5977H20.4844C22.3679 18.5977 23.8945 17.071 23.8945 15.1875V9.5625C23.8945 7.67899 22.3679 6.15234 20.4844 6.15234H3.51562C1.63211 6.15234 0.105469 7.67899 0.105469 9.5625V15.1875C0.105469 17.071 1.63211 18.5977 3.51562 18.5977H4.875C5.20508 18.5977 5.47266 18.3301 5.47266 18C5.47266 17.6699 5.20508 17.4023 4.875 17.4023H3.51562Z" fill="#0066BE"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.15234 14.25C3.15234 14.5801 3.41992 14.8477 3.75 14.8477H20.25C20.5801 14.8477 20.8477 14.5801 20.8477 14.25C20.8477 13.9199 20.5801 13.6523 20.25 13.6523H3.75C3.41992 13.6523 3.15234 13.9199 3.15234 14.25Z" fill="#0066BE"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.28125 22.6992C5.8347 22.6992 5.47266 22.3372 5.47266 21.8906V14.8477H18.5273V21.8906C18.5273 22.3372 18.1653 22.6992 17.7187 22.6992H6.28125ZM4.27734 21.8906C4.27734 22.9973 5.17455 23.8945 6.28125 23.8945H17.7187C18.8254 23.8945 19.7227 22.9973 19.7227 21.8906V14.25C19.7227 13.9199 19.4551 13.6523 19.125 13.6523H4.875C4.54492 13.6523 4.27734 13.9199 4.27734 14.25V21.8906Z" fill="#0066BE"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.52734 17.25C9.52734 17.5801 9.79492 17.8477 10.125 17.8477H13.875C14.2051 17.8477 14.4727 17.5801 14.4727 17.25C14.4727 16.9199 14.2051 16.6523 13.875 16.6523H10.125C9.79492 16.6523 9.52734 16.9199 9.52734 17.25Z" fill="#0066BE"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.52734 20.25C9.52734 20.5801 9.79492 20.8477 10.125 20.8477H13.875C14.2051 20.8477 14.4727 20.5801 14.4727 20.25C14.4727 19.9199 14.2051 19.6523 13.875 19.6523H10.125C9.79492 19.6523 9.52734 19.9199 9.52734 20.25Z" fill="#0066BE"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.15234 9.75C3.15234 10.0801 3.42029 10.3477 3.75081 10.3477H4.23543C4.56595 10.3477 4.8339 10.0801 4.8339 9.75C4.8339 9.41992 4.56595 9.15234 4.23543 9.15234H3.75081C3.42029 9.15234 3.15234 9.41992 3.15234 9.75Z" fill="#0066BE"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.27734 6.75C4.27734 7.08008 4.54492 7.34766 4.875 7.34766H19.125C19.4551 7.34766 19.7227 7.08008 19.7227 6.75V3.51562C19.7227 1.63225 18.1959 0.105469 16.3125 0.105469H7.6875C5.80413 0.105469 4.27734 1.63225 4.27734 3.51562V6.75ZM5.47266 6.15234V3.51562C5.47266 2.2924 6.46428 1.30078 7.6875 1.30078H16.3125C17.5357 1.30078 18.5273 2.2924 18.5273 3.51562V6.15234H5.47266Z" fill="#0066BE"/>
                          </g>
                        </svg>
                    </button>
                </div>
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
                                              <li key={index}>
                                                {item != "" ? (
                                                  <label className="select-multiple-option">
                                                    <input
                                                      type={key == "status" || key == "contactType"  ? "radio" : "checkbox" }
                                                      id={`custom-checkbox-tags-${index}`}
                                                      value={item}
                                                      name={key}
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
                            <Tabs
                            onSelect={(key) => tabClicked(key, data?.id)}
                            defaultActiveKey="personal-details" fill>
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
                                        {data?.country
                                          ? data?.country == "B&H"
                                            ? "Bosnia and Herzegovina"
                                            : data?.country
                                          : "N/A"}
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
                                          now={100}
                                          label={
                                            emailStats.findIndex((el) => el.userId == data?.id) !== -1
                                            ?
                                            emailStats[emailStats.findIndex((el) => el.userId == data?.id)]?.emailSent
                                              :
                                              "Loading"
                                          }
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
                                          label={
                                            emailStats.findIndex((el) => el.userId == data?.id) !== -1
                                            ?
                                            emailStats[emailStats.findIndex((el) => el.userId == data?.id)]?.emailOpen
                                              :
                                              "Loading"
                                          }
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
                                          label={
                                            emailStats.findIndex((el) => el.userId == data?.id) !== -1
                                            ?
                                            emailStats[emailStats.findIndex((el) => el.userId == data?.id)]?.contentDeliverd
                                              :
                                              "Loading"
                                          }
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
                                          label={
                                            emailStats.findIndex((el) => el.userId == data?.id) !== -1
                                            ?
                                            emailStats[emailStats.findIndex((el) => el.userId == data?.id)]?.rtr
                                              :
                                              "Loading"
                                          }
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
                                          label={
                                            emailStats.findIndex((el) => el.userId == data?.id) !== -1
                                            ?
                                            emailStats[emailStats.findIndex((el) => el.userId == data?.id)]?.qr
                                              :
                                              "Loading"
                                          }
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
                                          label={
                                            emailStats.findIndex((el) => el.userId == data?.id) !== -1
                                            ?
                                            emailStats[emailStats.findIndex((el) => el.userId == data?.id)]?.go
                                              :
                                              "Loading"
                                          }
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
                                          label={
                                            emailStats.findIndex((el) => el.userId == data?.id) !== -1
                                            ?
                                            emailStats[emailStats.findIndex((el) => el.userId == data?.id)]?.contentOpening
                                              :
                                              "Loading"
                                          }
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
                                              types[
                                                types.findIndex(
                                                  (el) =>
                                                    el.value ==
                                                    data?.user_status
                                                )
                                              ]
                                            }
                                            onChange={(event) =>
                                              onUserChange(event, data.id)
                                            }
                                            id={"user_type_" + data?.id}
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
                                              countryAll[
                                                countryAll.findIndex(
                                                  (el) =>
                                                    el.value == data?.country
                                                )
                                              ]
                                            }
                                            onChange={(event) =>
                                              onCountryChange(event, data.id)
                                            }
                                            id={"country_" + data?.id}
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
            {page == 1 && isLoaded == true ? (
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
