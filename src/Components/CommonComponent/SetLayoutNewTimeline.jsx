import moment from 'moment';
import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "react-activity";
import { Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navigate, useNavigate } from "react-router-dom";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import Header from "./HeaderComponent/Header";

let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
let loadData = 0;

const SetLayoutNewTimeline = () => {
  const rdLikeArray=["56Ek4feL/1A8mZgIKQWEqg==","bWmUjqX7J011   WUTYn9g==","MXl8m36VZFYXpgFVz3Pg0g=="]
  const isLikeRdAccount= rdLikeArray.includes(localStorage.getItem("user_id"))
  let dummyData = [
    {
      image: `${path_image}library-icon.svg`,
      title: "Library",
      subtitle: "Create and edit content, see all of your content here",
    },
    {
      image: `${path_image}crm-icon.svg`,
      title: "CRM",
      subtitle: "See who read what, their RTR-activity and their habits",
    },
 
    {
      image: `${path_image}analytics-icon.svg`,
      title: "Analytics",
      subtitle: "Check the engagement rates, dig into readers and content",
    },
    {
      image: `${path_image}email-icon1.svg`,
      title: "Email",
      subtitle: "Send and resend an email, and work with your lists",
    },
  ];
  const [data, setData] = useState([]);
  const [timelineData, setTimelineData] = useState([])
  const [apiStatus, setApiStatus] = useState(false)
  const [sectionLoader, setSectionLoader] = useState(false);
  const [loadMore, setLoadMore] = useState(
    {
      isLoadMore: false,
      showLoader: false,
      page: 1,
      nextDate: null,
      lastUpdate: null
    })

  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateInputs, setDateInputs] = useState(
    {
      toDate: "",
      fromDate: ""
    }
  )
  const [error, setError] = useState({})
  const [showfilter, setShowFilter] = useState(false);
  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  const scrollableDivRef = useRef(null);
  const [filterObject, setFilterObject] = useState({});
  const [filterApplyflag, setFilterApplyflag] = useState(0);
  useEffect(() => {
    let newdata = [...dummyData];
    if (localStorage.getItem("group_id") == 2) {
      newdata.push({
        image: `${path_image}license-icon.svg`,
        title: "Licensed",
        subtitle: "All your licensed content in one place",
      });
    }

    if (
      typeof localStorage.getItem("webinar_flag") !== "undefined" &&
      localStorage.getItem("webinar_flag") == 1 || localStorage.getItem("user_id") === "IJype v19WASFcSlrfRENQ=="

    ) {
      newdata.push({
        image: `${path_image}webinar-icon.svg`,
        title: "Webinar",
        subtitle: "See Webinar Event users",
      });
    }

    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ){
      newdata.push({
        image: `${path_image}Survey_home_icon.svg`,
        title: "Survey",
        subtitle: "Make surveys to hear what they think",
      });
    }

    setData(newdata);
    getTimeLineData()

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

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const navigate = useNavigate();
  let [active, setActive] = useState();
  const handleChange = (title) => {
    setActive(title);
    if (title == "Library") {
      navigate("/library-content");
    } else if (title == "CRM") {
      (isLikeRdAccount)
        ? navigate("/IRT-Mandatory")
        :
        navigate("/readers-view");
      // navigate("/readers-view");
    } else if (title == "Analytics") {
      localStorage.getItem("group_id") == 2
        ? navigate("/content-analytics")
        : localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ=="
          ? navigate("/totalhcp")
          : localStorage.getItem("user_id") == "iSnEsKu5gB/DRlycxB6G4g=="
            ? navigate("/octalatch-totalhcp")
            : (isLikeRdAccount)
              ? navigate("/LEX-210-analytics")
              : localStorage.getItem("user_id") == "wW0geGtDPvig5gF 6KbJrg=="
                ? navigate("/totalhcp")
                : localStorage.getItem("user_id") == "UbCJcnLM9fe HsRMgX8c1A=="
                  ? navigate("/totalhcp")
                  : localStorage.getItem("user_id") == "z2TunmZQf3QwCsICFTLGGQ=="
                    ? navigate("/totalhcp")
                    : localStorage.getItem("user_id") == "qDgwPdToP05Kgzc g2VjIQ=="
                      ? navigate("/totalhcp")
                      : navigate("/content-analytics");
    } else if (title == "Email") {
     
      navigate("/EmailList");
    } else if (title == "Webinar") {
      if (
        typeof localStorage.getItem("webinar_flag") !== "undefined" &&
        localStorage.getItem("webinar_flag") == 1
        ||
        localStorage.getItem("user_id") === "IJype v19WASFcSlrfRENQ=="
    
      ) {
        navigate("/webinar/event-listing")
        
      }
    } else if (title == "Licensed") {
      
      navigate("/license-content");
    } else if (title == "Survey") {
      navigate("/survey/survey-list");
    } else if (title == "Q&A/SURVEY") {
      if (isLikeRdAccount) {
        window.open(
          "https://webinar.informed.pro/webinar/qa_survey?rdylr=" +
          localStorage.getItem("user_id"),
          "_blank"
        );
      }
    }
  };

  const isAuthenticated = localStorage.getItem("user_id") !== null;

  const getTimeLineData = async (date, page = 1, loaderFlag = 0) => {
    try {
      if (loaderFlag == 0) {
        setSectionLoader(true);
      }
      let body = { date, page }
      const response = await postData(ENDPOINT.RD_LANDING_TIMELINE, body)
      let updatedTimeLineData = response?.data?.data?.data?.timelineData
      setTimelineData(prevData => ([...prevData, ...updatedTimeLineData]))
      setLoadMore(prevState => ({
        ...prevState,
        isLoadMore: response?.data?.data?.data?.hasMore ? true : false,
        nextDate: response?.data?.data?.data?.nextDate,
        lastUpdate: response?.data?.data?.data?.lastUpdate
      }));
    } catch (err) {
      console.log("--err", err)
    } finally {
      loadData = 0;
      setError({})
      setApiStatus(true)
      setSectionLoader(false)
      setLoadMore(prevState => ({
        ...prevState,
        showLoader: false,
      }));
    }
  }

  function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(hours, minutes);
    let hours12 = date.getHours() == 12 ? 12 : date.getHours() % 12 || "00";
    let minutesFormatted = date.getMinutes().toString().padStart(2, '0');
    let ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours12}:${minutesFormatted} ${ampm}`;
  }

  const handleLoadMore = async () => {
    let newPage = loadMore?.page + 1
    let dateRange = {
      toDate: loadMore?.nextDate ? loadMore?.nextDate : "",
      fromDate: dateInputs?.fromDate ? dateInputs?.fromDate : ""
    }
    setLoadMore(prevState => ({
      ...prevState,
      showLoader: true,
      page: newPage
    }));
    getTimeLineData(dateRange, newPage, 1)
  }

  const handleDateChange = async (e, isSelectedName) => {
    // Combine the selected date with the current time
    const dateWithCurrentTime = new Date(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds()
    );
    setDateInputs({ ...dateInputs, [isSelectedName]: dateWithCurrentTime })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = {}
    if (dateInputs?.fromDate == "" || dateInputs?.toDate == "") {
      error.fromDate = "Please select the date"
      setError(error)
      return
    }
    else {
      setTimelineData([])
      setApiStatus(false)
      setFilterApplyflag(1);
      setFilterObject({ Date: `${moment(dateInputs?.fromDate).format('DD.MM.YYYY')} - ${moment(dateInputs?.toDate).format('DD.MM.YYYY')}` })
      setShowFilter(false);
      setLoadMore({
        isLoadMore: false,
        showLoader: false,
        page: 1,
        nextDate: null,
        lastUpdate: null
      })
      getTimeLineData(dateInputs)
    }
  }

  const clearDateFilter = async (e) => {
    e.preventDefault();
    if (Object.keys(filterObject)?.length) {

      setTimelineData([])
      setApiStatus(false)
      setFilterObject({})
      setLoadMore({
        isLoadMore: false,
        showLoader: false,
        page: 1,
        nextDate: null,
        lastUpdate: null
      })

      getTimeLineData()
    }
    setDateInputs({ toDate: "", fromDate: "" })
    setShowFilter(false);
  }

  const userRoles = (pdf_id) => {
    const role  = {
      "3968":"Site User-Blinded",
      "3970":"Site unblinded pharmacist",
      "4521":"Investigator-Blinded",
      };
      return role?.[pdf_id] || 'N/A';
  }

  useEffect(() => {
    const currentDiv = scrollableDivRef.current;

    if (currentDiv) {
      currentDiv.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentDiv) {
        currentDiv.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loadMore?.nextDate]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollableDivRef.current;
    if ((scrollHeight - scrollTop <= clientHeight + 1) && loadData == 0 && loadMore?.isLoadMore && loadMore?.nextDate != null) {
      loadData = 1;
      handleLoadMore();
     
    }
  };


  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      {isAuthenticated ? (
        <>
          <Header />

          <div className="default-layout d-flex latest-home">
            <div className="library_create home-layout  d-flex">
              <Row>
                {data.map((item, index) => (
                  <div
                    className={
                      active == index
                        ? "col library_create-box active"
                        : "col library_create-box"
                    }
                    key={index}
                    onClick={() => handleChange(item?.title)}
                  >
                    <div className="create-library-img">
                      <img src={item.image} alt="Content msg Library" />
                    </div>
                    <div className="create-library-content">
                      <h3>{item?.title}</h3>
                      <h5>{item?.subtitle}</h5>
                    </div>
                  </div>
                ))}
              </Row>
            </div>
            <div className="timeline-layout">
              <div className="timeline-layout-inset" ref={scrollableDivRef}>
                <div className="timeline-right-list">
                  <div className="timeline-right-header">
                    <div className="timeline-indicator">
                      <img src={path_image + "informed-circle-icon.svg"} alt="" />
                    </div>
                    <div className="timeline-date">
                      <h3>LEX-210 Trial</h3>
                     
                      {apiStatus?<p>
                        {loadMore?.lastUpdate ? moment(loadMore?.lastUpdate).utc().format('MMMM. DD. YYYY') : "N/A"}
                        
                        <sub> last update</sub>
                      </p>:""}
                    </div>
                    <div className="timeline-picker">
                      <div
                        className={
                          showfilter
                            ? "filter-by nav-item dropdown highlight"
                            : "filter-by nav-item dropdown"
                        }
                      >
                        <button
                          ref={buttonRef}
                          className={
                            Object.keys(filterObject).length > 0
                              ? "btn btn-secondary dropdown filter_applied"
                              : "btn btn-secondary dropdown"
                          }
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
                            className="dropdown-menu filter-options"
                            aria-labelledby="dropdownMenuButton2"
                          >
                            <h4>Filter By</h4>
                            <h6>Date</h6>
                            <Form>

                              <div className="form-group">
                                <DatePicker
                                  selected={
                                    dateInputs?.fromDate
                                      ? new Date(dateInputs?.fromDate)
                                      : ""
                                  }
                                  name="fromDate"
                                  onChange={(e) => handleDateChange(e, "fromDate")}
                                  dateFormat="dd/MM/yyyy"
                                  className="form-control"
                                  maxDate={dateInputs?.toDate ? new Date(dateInputs?.toDate) : currentDate}
                                  placeholderText="From"
                                  onClick={stopPropagation}
                                />

                              </div>
                              -
                              <div className="form-group">

                                <DatePicker
                                  selected={
                                    dateInputs?.toDate
                                      ? new Date(dateInputs?.toDate)
                                      : ""
                                  }
                                  name="toDate"
                                  onChange={(e) => handleDateChange(e, "toDate")}
                                  dateFormat="dd/MM/yyyy"
                                  className="form-control"
                                  minDate={dateInputs?.fromDate ? new Date(dateInputs?.fromDate) : currentDate}
                                  maxDate={currentDate}
                                  placeholderText="To"
                                  onClick={stopPropagation}
                                />

                              </div>
                            </Form>


                            <div className="filter-footer">
                              <button
                                className="btn btn-primary btn-bordered"
                                onClick={(e) => {
                                  clearDateFilter(e);
                                }}
                              >
                                Clear
                              </button>
                              <button
                                className="btn btn-primary btn-filled"
                                onClick={(e) => {
                                  handleSubmit(e);
                                }}
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                  <div className={timelineData?.length ? "timeline-box" : "timeline-box hide"} >
                    {Object.keys(filterObject)?.length !== 0 ? (
                      <div className="apply-filter">
                        <div className="filter-block">
                          <div className="filter-block-left full">
                            {Object.keys(filterObject)?.map((key, index) => {
                              return (
                                <>
                                  {filterObject[key]?.length ? (
                                    <div className="filter-div">
                                      <div className="filter-div-title">
                                        <span>{key} |</span>
                                      </div>

                                      <div className="filter-div-list">

                                        <div
                                          className={"filter-result"}
                                        >
                                          {filterObject[key]}
                                          <img
                                            src={path_image + "filter-close.svg"}
                                            onClick={(e) => {
                                              clearDateFilter(e);
                                            }}
                                            alt="Close-filter"
                                          />
                                        </div>

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
                              onClick={(e) => {
                                clearDateFilter(e);
                              }}
                            >
                              Remove All
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {!apiStatus ?
                      (
                        <div className="accordion-loader">
                          <div
                            className={
                              "loader tab-inside " +
                              (sectionLoader ? "show" : "")
                            }
                            id="custom_loader"
                          >
                            <div className="loader_show">
                              <span className="loader-view"> </span>
                            </div>
                          </div>
                        </div>
                      ) :
                      timelineData?.length ?
                        (<>
                          <div className="timeline-listed">
                            {timelineData?.map((data, index) => {
                              return (<React.Fragment key={index}>
                                <div className="timeline-sticky">

                                  <div className="timeline-indicator">
                                    <span>&nbsp;</span>
                                  </div>
                                  <div className="timeline-date">
                                    <p>{moment(data?.date).format('MMM. DD. YYYY')}</p>
                                  </div>
                                </div>
                                {data?.IrtData?.map((item, i) => {
                                  return (<React.Fragment key={i}>
                                    {(item?.auto_mail == 1 || item?.auto_mail == 2)
                                      ?
                                      <div className="timeline-box-inset" key={i}>
                                        <div className="timeline-indicator">
                                          <div className="indicator-box">
                                            <img src={path_image + "automail.svg"} alt="" />
                                          </div>
                                        </div>
                                        <div className="timeline-block">
                                          <div className="timeline-status">
                                            <p>Auto Email sent</p>
                                            <span>{formatTime(item?.time)} </span>
                                          </div>
                                          <div className="timeline-details">
                                            <div className="details-box">
                                              <p className="timeline-details-heading">Type</p>
                                              <p>{item?.auto_mail == 1 ? "Open email reminder" : "Training completion reminder"}</p>
                                            </div>
                                            <div className="details-box">
                                              <p className="timeline-details-heading">Title</p>
                                              <p>{item?.pdfTitle}</p>
                                            </div>
                                            <div className="details-box">
                                              <p className="timeline-details-heading">To</p>
                                              <div className="d-flex flex-wrap timeline-activity">
                                                {item?.users_data?.length ? item?.users_data?.map((userId, index) => {
                                                  const userProfile = data?.userProfile?.find(profile => profile?.user_id == userId)
                                                  return userProfile ? (
                                                    <div key={index} className="timeline-activity-detail">
                                                      <p>{
                                                        userProfile?.first_name != '' ?
                                                          userProfile?.first_name + " " + userProfile?.last_name
                                                          : userProfile?.name
                                                      }
                                                      </p>
                                                      <p>{userProfile?.user_type!=0?userProfile?.user_type:"N/A"}</p>
                                                      <span>{userProfile?.site_number != 0 ? userProfile?.site_number : "N/A"}</span>
                                                    </div>
                                                  ) : null
                                                }) : ""}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      : item?.action == "IRT Started Training"
                                        ?
                                        <div className="timeline-box-inset" key={i}>
                                          <div className="timeline-indicator">
                                            <div className="indicator-box">
                                              <img src={path_image + "irt-training-start.svg"} alt="" />
                                            </div>
                                          </div>
                                          <div className="timeline-block">
                                            <div className="timeline-status start">
                                              <p>IRT Started Training</p>
                                              <span>{formatTime(item?.time)} </span>
                                            </div>
                                            <div className="timeline-details">
                                              <div className="details-box">
                                                <p className="timeline-details-heading">What</p>
                                                <p>IRT has started the training but is not finished yet</p>
                                              </div>
                                              <div className="details-box">
                                                <p className="timeline-details-heading">Title</p>
                                                <div className="d-flex justify-content-between">
                                                  <p>{item?.pdfTitle}</p>
                                                </div>
                                              </div>
                                              <div className="details-box">
                                                <p className="timeline-details-heading">Who</p>
                                                <div className="d-flex flex-wrap timeline-activity">
                                                  {item?.users_data?.length ? item?.users_data?.map((userId, index) => {
                                                    const userProfile = data?.userProfile?.find(profile => profile?.user_id == userId)
                                                    return userProfile ? (
                                                      <div key={index} className="timeline-activity-detail">
                                                        <p>{
                                                          userProfile?.first_name != '' ?
                                                            userProfile?.first_name + " " + userProfile?.last_name
                                                            : userProfile?.name
                                                        }
                                                        </p>
                                                        <p>{userProfile?.user_type!=0?userProfile?.user_type:"N/A"}</p>
                                                        <span>{userProfile?.site_number != 0 ? userProfile?.site_number : "N/A"}</span>
                                                      </div>
                                                    ) : null
                                                  }) : ""}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        : (item?.action?.includes('Article opened') || item?.action?.includes('Article browsed'))
                                          ?
                                          <div className="timeline-box-inset" key={i}>
                                            <div className="timeline-indicator">
                                              <div className="indicator-box">
                                                <img src={path_image + "content-open.svg"} alt="" />
                                              </div>
                                            </div>
                                            <div className="timeline-block">
                                              <div className="timeline-status">
                                                <p>Content Opened</p>
                                                <span>{formatTime(item?.time)} </span>
                                              </div>
                                              <div className="timeline-details">
                                                <div className="timeline-article d-flex">
                                                  <div className="timeline-article-image">
                                                    {/* <img src={path_image + "article-open-cover.png"} alt="" /> */}
                                                    {item?.file_type ===
                                                      "video" ? <img
                                                      src={
                                                        path_image +
                                                        "lex-video-cover.png"
                                                      }
                                                      alt=""
                                                    /> : item?.file_type == "ebook" ?
                                                      <img
                                                        src={
                                                          path_image +
                                                          "lex-book-cover.png"
                                                        }
                                                        alt=""
                                                      />
                                                      : <img
                                                        src={
                                                          path_image +
                                                          "article-open-cover.png"
                                                        }
                                                        alt=""
                                                      />}
                                                  </div>
                                                  <div className="timeline-article-detail">
                                                    <div className="timeline-title">
                                                      <p>{item?.pdfTitle} ({item?.reader_mandatory==1?"Mandatory Content":"Non-Mandatory Content"})</p>
                                                    </div>
                                                    <div className="timeline-subtitle">
                                                      <p>{item?.subTitle ? item?.subTitle : "N/A"}</p>
                                                      {item?.allow_video == 1 ?
                                                        <div className="d-flex align-items-center include-links">
                                                          <img src={path_image + "video-img.png"} alt="" />
                                                          <p>Include videos </p>
                                                        </div>
                                                        : ""}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="details-box">
                                                  <p className="timeline-details-heading">Who</p>
                                                  <div className="d-flex flex-wrap timeline-activity">
                                                    {item?.users_data?.length ?
                                                      item?.users_data?.map((userId, index) => {
                                                      const userProfile = data?.userProfile?.find(profile => profile?.user_id == userId)
                                                      return userProfile ? (
                                                        <div key={index} className="timeline-activity-detail">
                                                          <p>{
                                                        userProfile?.first_name != '' ?
                                                          userProfile?.first_name + " " + userProfile?.last_name
                                                          : userProfile?.name
                                                      }
                                                      </p>
                                                          <span>{userProfile?.site_number != 0 ? userProfile?.site_number : "N/A"}</span>
                                                        </div>
                                                      ) : null
                                                      // <div className="timeline-activity-detail">
                                                      //       <span>N/A</span>
                                                      //     </div>
                                                    }) : null}


                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          : (item?.action?.includes('Registered') && item?.app_used == "LEX-Registration-Page")
                                            ?
                                            <div className="timeline-box-inset" key={i}>
                                              <div className="timeline-indicator">
                                                <div className="indicator-box">
                                                  <img src={path_image + "new-hcp.svg"} alt="" />
                                                </div>
                                              </div>
                                              <div className="timeline-block">
                                                <div className="timeline-status">
                                                  <p>New HCP Registered</p>
                                                  <span>{formatTime(item?.time)} </span>
                                                </div>
                                                <div className="timeline-details">
                                                  <div className="details-box">
                                                    <p className="timeline-details-heading">What</p>
                                                    <p>A new HCP register to LEX-210 library</p>
                                                  </div>
                                                  <div className="details-box">
                                                    <p className="timeline-details-heading">Who</p>
                                                    <div className="d-flex flex-wrap timeline-activity">
                                                      {item?.users_data?.length ? item?.users_data?.map((userId, index) => {
                                                        const userProfile = data?.userProfile?.find(profile => profile?.user_id == userId)
                                                        return userProfile ? (
                                                          <div key={index} className="timeline-activity-detail">
                                                            <p>{
                                                              userProfile?.first_name != '' ?
                                                                userProfile?.first_name + " " + userProfile?.last_name
                                                                : userProfile?.name
                                                            }
                                                            </p>
                                                            <p>{userProfile?.user_type != 0 ? userProfile?.user_type : "N/A"}</p>
                                                            <span>{userProfile?.site_number != 0 ? userProfile?.site_number : "N/A"}</span>
                                                          </div>
                                                        ) : null
                                                      }) : ""}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                            </div>

                                            : (item?.action?.includes('User email has been updated'))
                                            ?
                                            <div className="timeline-box-inset" key={i}>
                                              <div className="timeline-indicator">
                                                <div className="indicator-box">
                                                  <img src={path_image + "new-hcp.svg"} alt="" />
                                                </div>
                                              </div>
                                              <div className="timeline-block">
                                                <div className="timeline-status">
                                                  <p>Email has been updated</p>
                                                  <span>{formatTime(item?.time)} </span>
                                                </div>
                                                <div className="timeline-details">
                                                  <div className="details-box">
                                                    <p className="timeline-details-heading">What</p>
                                                    <p>{item?.action}</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            : (item?.action?.includes('Certificate of training issued for IRT Role'))
                                              ?
                                              <div className="timeline-box-inset" key={i}>
                                                <div className="timeline-indicator">
                                                  <div className="indicator-box">
                                                    <img src={path_image + "irt-traning-complete.svg"} alt="" />
                                                  </div>
                                                </div>
                                                <div className="timeline-block">
                                                  <div className="timeline-status complete">
                                                    <p>IRT Completed Training</p>
                                                    <span>{formatTime(item?.time)} </span>
                                                  </div>
                                                  <div className="timeline-details">
                                                    <div className="details-box">
                                                      <p className="timeline-details-heading">What</p>
                                                      <div className="d-flex justify-content-between">
                                                        <p>IRT has completed the training and received the certificate</p>

                                                        <img src={path_image + "certificate.png"} alt="" />
                                                      </div>
                                                    </div>
                                                    {/* <div className="details-box">
                                                      <p className="timeline-details-heading">Title</p>
                                                      <div className="d-flex justify-content-between">
                                                        <p>{item?.pdfTitle}</p>
                                                      </div>
                                                    </div> */}
                                                    <div className="details-box">
                                                      <p className="timeline-details-heading">Who</p>
                                                      <div className="d-flex flex-wrap timeline-activity">
                                                        {item?.users_data?.length ? item?.users_data?.map((userId, index) => {
                                                          const userProfile = data?.userProfile?.find(profile => profile?.user_id == userId)
                                                          return userProfile ? (
                                                            <div key={index} className="timeline-activity-detail">
                                                              <p>{
                                                                userProfile?.first_name != '' ?
                                                                  userProfile?.first_name + " " + userProfile?.last_name
                                                                  : userProfile?.name
                                                              }
                                                              </p>
                                                              {/* <p>{userProfile?.user_type!=0?userProfile?.user_type:"N/A"}</p> */}
                                                              <p>{userRoles(item?.pdf_id)}</p>
                                                              <span>{userProfile?.site_number != 0 ? userProfile?.site_number : "N/A"}</span>
                                                            </div>
                                                          ) : null
                                                        }) : ""}

                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              : (item?.action?.includes('Article is shared'))
                                                ?
                                                <div className="timeline-box-inset" key={i}>
                                                  <div className="timeline-indicator">
                                                    <div className="indicator-box">
                                                      <img src={path_image + "share-materials-icon.svg"} alt="" />
                                                    </div>
                                                  </div>
                                                  <div className="timeline-block">
                                                    <div className="timeline-status">
                                                      <p>Content Shared</p>
                                                      <span>{formatTime(item?.time)} </span>
                                                    </div>
                                                    <div className="timeline-details">
                                                      <div className="timeline-article d-flex">
                                                        <div className="timeline-article-image">
                                                          <img src={path_image + "article-open-cover.png"} alt="" />
                                                        </div>
                                                        <div className="timeline-article-detail">
                                                          <div className="timeline-title">
                                                            <p>{item?.pdfTitle} </p>
                                                          </div>
                                                          <div className="timeline-subtitle">
                                                            <p>{item?.subTitle?item?.subTitle:"N/A"} </p>
                                                            {item?.allow_video == 1 ?
                                                              <div className="d-flex align-items-center include-links">
                                                                <img src={path_image + "video-img.png"} alt="" />
                                                                <p>Include videos </p>
                                                              </div>
                                                              : ""}
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="details-box">
                                                        <p className="timeline-details-heading">Who</p>
                                                        <div className="d-flex flex-wrap timeline-activity">
                                                          {item?.users_data?.length ? item?.users_data?.map((userId, index) => {
                                                            const userProfile = data?.userProfile?.find(profile => profile?.user_id == userId)
                                                            return userProfile ? (
                                                              <div key={index} className="timeline-activity-detail">
                                                                <p>{
                                                                  userProfile?.first_name != '' ?
                                                                    userProfile?.first_name + " " + userProfile?.last_name
                                                                    : userProfile?.name
                                                                }
                                                                </p>
                                                                <span>{userProfile?.site_number != 0 ? userProfile?.site_number : "N/A"}</span>
                                                              </div>
                                                            ) : null
                                                          }) : ""}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                : (item?.action?.includes('IRT Ignored Training'))
                                                  ?
                                                  <div className="timeline-box-inset" key={i}>
                                                    <div className="timeline-indicator">
                                                      <div className="indicator-box">
                                                        <img src={path_image + "irt-ignored-training.svg"} alt="" />
                                                      </div>
                                                    </div>
                                                    <div className="timeline-block">
                                                      <div className="timeline-status ignored">
                                                        <p>IRT Ignored Training</p>
                                                        <span>{formatTime(item?.time)} </span>
                                                      </div>
                                                      <div className="timeline-details">
                                                        <div className="details-box">
                                                          <p className="timeline-details-heading">What</p>
                                                          <p>IRT ignored the training</p>
                                                        </div>
                                                        <div className="details-box">
                                                          <p className="timeline-details-heading">Title</p>
                                                          <div className="d-flex justify-content-between">
                                                            <p>{item?.pdfTitle}</p>
                                                          </div>
                                                        </div>
                                                        <div className="details-box">
                                                          <p className="timeline-details-heading">Who</p>
                                                          <div className="d-flex flex-wrap timeline-activity">
                                                            {item?.users_data?.length ? item?.users_data?.map((userId, index) => {
                                                              const userProfile = data?.userProfile?.find(profile => profile?.user_id == userId)
                                                              return userProfile ? (
                                                                <div key={index} className="timeline-activity-detail">
                                                                  <p>{
                                                                    userProfile?.first_name != '' ?
                                                                      userProfile?.first_name + " " + userProfile?.last_name
                                                                      : userProfile?.name
                                                                  }
                                                                  </p>
                                                                  <p>{userProfile?.user_type!=0?userProfile?.user_type:"N/A"}</p>
                                                                  <span>{userProfile?.site_number != 0 ? userProfile?.site_number : "N/A"}</span>
                                                                </div>
                                                              ) : null
                                                            }) : ""}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  : (item?.action?.includes('IRT Not Completed Training'))
                                                    ?
                                                    <div className="timeline-box-inset" key={i}>
                                                      <div className="timeline-indicator">
                                                        <div className="indicator-box">
                                                          <img src={path_image + "irt-traning-notcomplete.svg"} alt="" />
                                                        </div>
                                                      </div>
                                                      <div className="timeline-block">
                                                        <div className="timeline-status not-complete">
                                                          <p>IRT Not Completed Training</p>
                                                          <span>{formatTime(item?.time)} </span>
                                                        </div>
                                                        <div className="timeline-details">
                                                          <div className="details-box">
                                                            <p className="timeline-details-heading">What</p>
                                                            <p>IRT started the training and didn't complete it even after all the email reminders</p>
                                                          </div>
                                                          <div className="details-box">
                                                            <p className="timeline-details-heading">Title</p>
                                                            <div className="d-flex justify-content-between">
                                                              <p>{item?.pdfTitle}</p>
                                                            </div>
                                                          </div>
                                                          <div className="details-box">
                                                            <p className="timeline-details-heading">Who</p>
                                                            <div className="d-flex flex-wrap timeline-activity">
                                                              {item?.users_data?.length ? item?.users_data?.map((userId, index) => {
                                                                const userProfile = data?.userProfile?.find(profile => profile?.user_id == userId)
                                                                return userProfile ? (
                                                                  <div key={index} className="timeline-activity-detail">
                                                                    <p>{
                                                                      userProfile?.first_name != '' ?
                                                                        userProfile?.first_name + " " + userProfile?.last_name
                                                                        : userProfile?.name
                                                                    }
                                                                    </p>
                                                                    <p>{userProfile?.user_type!=0?userProfile?.user_type:"N/A"}</p>
                                                                    <span>{userProfile?.site_number != 0 ? userProfile?.site_number : "N/A"}</span>
                                                                  </div>
                                                                ) : null
                                                              }) : ""}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    : (item?.auto_mail == 4)
                                                      ?
                                                      <div className="timeline-box-inset" key={i}>
                                                        <div className="timeline-indicator">
                                                          <div className="indicator-box">
                                                            <img src={path_image + "irt-invited-training.svg"} alt="" />
                                                          </div>
                                                        </div>
                                                        <div className="timeline-block">
                                                          <div className="timeline-status">
                                                            <p>IRT Unblocked</p>
                                                            <span>{formatTime(item?.time)} </span>
                                                          </div>
                                                          <div className="timeline-details">
                                                            <div className="details-box">
                                                              <p className="timeline-details-heading">What</p>
                                                              <p>IRT has been unblocked from participating in training</p>
                                                            </div>
                                                            <div className="details-box">
                                                              <p className="timeline-details-heading">Who</p>
                                                              <div className="d-flex flex-wrap timeline-activity">
                                                                {item?.users_data?.length ? item?.users_data?.map((userId, index) => {
                                                                  const userProfile = data?.userProfile?.find(profile => profile?.user_id == userId)
                                                                  return userProfile ? (
                                                                    <div key={index} className="timeline-activity-detail">
                                                                      <p>{
                                                                        userProfile?.first_name != '' ?
                                                                          userProfile?.first_name + " " + userProfile?.last_name
                                                                          : userProfile?.name
                                                                      }
                                                                      </p>
                                                                      <p>{userProfile?.user_type!=0?userProfile?.user_type:"N/A"}</p>
                                                                      <span>{userProfile?.site_number != 0 ? userProfile?.site_number : "N/A"}</span>
                                                                    </div>
                                                                  ) : null
                                                                }) : ""}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      : (item?.action?.includes("Blocked mandatory training reminder") && item?.auto_mail == 3)
                                                        ?
                                                        <div className="timeline-box-inset" key={i}>
                                                          <div className="timeline-indicator">
                                                            <div className="indicator-box">
                                                              <img src={path_image + "irt-blocked.svg"} alt="" />
                                                            </div>
                                                          </div>
                                                          <div className="timeline-block">
                                                            <div className="timeline-status blocked">
                                                              <p>IRT Blocked</p>
                                                              <span>{formatTime(item?.time)} </span>
                                                            </div>
                                                            <div className="timeline-details">
                                                              <div className="details-box">
                                                                <p className="timeline-details-heading">What</p>
                                                                <p>IRT has been blocked from participating in training</p>
                                                              </div>
                                                              <div className="details-box">
                                                                <p className="timeline-details-heading">Who</p>
                                                                <div className="d-flex flex-wrap timeline-activity">
                                                                  {item?.users_data?.length ? item?.users_data?.map((userId, index) => {
                                                                    const userProfile = data?.userProfile?.find(profile => profile?.user_id == userId)
                                                                    return userProfile ? (
                                                                      <div key={index} className="timeline-activity-detail">

                                                                        <p>
                                                                          {
                                                                            userProfile?.first_name != '' ?
                                                                              userProfile?.first_name + " " + userProfile?.last_name
                                                                              : userProfile?.name
                                                                          }
                                                                        </p>
                                                                        <p>{userProfile?.user_type!=0?userProfile?.user_type:"N/A"}</p>
                                                                        <span>{userProfile?.site_number != 0 ? userProfile?.site_number : "N/A"}</span>
                                                                      </div>
                                                                    ) : null
                                                                  }) : ""}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        : (item?.auto_mail == 5)
                                                          ?
                                                          <div className="timeline-box-inset" key={i}>
                                                            <div className="timeline-indicator">
                                                              <div className="indicator-box">
                                                                <img src={path_image + "irt-changed-role.svg"} alt="" />
                                                              </div>
                                                            </div>
                                                            <div className="timeline-block">
                                                              <div className="timeline-status">
                                                                <p>IRT Changed Role</p>
                                                                <span>{formatTime(item?.time)} </span>
                                                              </div>
                                                              <div className="timeline-details">
                                                                <div className="details-box">
                                                                  <p className="timeline-details-heading">What</p>
                                                                  <p>IRT has changed his role</p>
                                                                </div>
                                                                {item?.previous_role && item?.user_role ?
                                                                  <div className="details-box">
                                                                    <p className="timeline-details-heading">Role</p>
                                                                    <div className="d-flex flex-wrap timeline-activity">
                                                                      <div className="timeline-activity-detail role">
                                                                        <span>Old |</span>
                                                                        {item?.previous_role} <span className="timeline-activity-arrow">&gt;</span>
                                                                        <span>New |</span>
                                                                        {item?.user_role}
                                                                      </div>
                                                                    </div>
                                                                  </div> :
                                                                  <div className="details-box">
                                                                    <p className="timeline-details-heading">Type</p>
                                                                    <div className="d-flex justify-content-between">
                                                                      <p>{item?.action}</p>
                                                                    </div>
                                                                  </div>}
                                                                <div className="details-box">
                                                                  <p className="timeline-details-heading">Who</p>
                                                                  <div className="d-flex flex-wrap timeline-activity">

                                                                    {item?.users_data?.length ? item?.users_data?.map((userId, index) => {
                                                                      const userProfile = data?.userProfile?.find(profile => profile?.user_id == userId)
                                                                      return userProfile ? (
                                                                        <div key={index} className="timeline-activity-detail">

                                                                          <p>{
                                                                            userProfile?.first_name != '' ?
                                                                              userProfile?.first_name + " " + userProfile?.last_name
                                                                              : userProfile?.name
                                                                          }
                                                                          </p>
                                                                          <p>{userProfile?.user_type!=0?userProfile?.user_type:"N/A"}</p>
                                                                          <span>{userProfile?.site_number != 0 ? userProfile?.site_number : "N/A"}</span>
                                                                        </div>
                                                                      ) : null
                                                                    }) : ""}
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          : (item?.auto_mail == 0 && item?.action?.includes('Webinar New mail received') && item?.logger_id != 0 && item?.event_id != 0)
                                                            ?
                                                            <div className="timeline-box-inset" key={i}>
                                                              <div className="timeline-indicator">
                                                                <div className="indicator-box">

                                                                  <svg
                                                                    width="24"
                                                                    height="18"
                                                                    viewBox="0 0 24 18"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                  >
                                                                    <path
                                                                      d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z"
                                                                      fill="rgba(0, 102, 190, 1)"
                                                                    ></path>
                                                                    <path
                                                                      d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7. 98861 12.1922 7.96501 12.2745 7.92Z"
                                                                      fill="rgba(0, 102, 190, 1)"
                                                                    ></path>
                                                                  </svg>
                                                                </div>
                                                              </div>
                                                              <div className="timeline-block">
                                                                <div className="timeline-status">
                                                                  <p>Webinar Email Sent</p>
                                                                  <span>{formatTime(item?.time)} </span>
                                                                </div>
                                                                <div className="timeline-details">
                                                                  <div className="details-box">
                                                                    <p className="timeline-details-heading">Title</p>
                                                                    <p>{item?.title}</p>
                                                                  </div>
                                                                  <div className="details-box">
                                                                    <p className="timeline-details-heading">Who</p>
                                                                    <div className="d-flex flex-wrap timeline-activity">

                                                                      {item?.users_data?.length ? item?.users_data?.map((userId, index) => {
                                                                        const userProfile = data?.userProfile?.find(profile => profile?.user_id == userId)
                                                                        return userProfile ? (
                                                                          <div key={index} className="timeline-activity-detail">

                                                                            <p>{
                                                                              userProfile?.first_name != '' ?
                                                                                userProfile?.first_name + " " + userProfile?.last_name
                                                                                : userProfile?.name
                                                                            }
                                                                            </p>
                                                                            <p>{userProfile?.user_type != 0 ? userProfile?.user_type : ""}</p>
                                                                            <span>{userProfile?.site_number != 0 ? userProfile?.site_number : ""}</span>
                                                                          </div>
                                                                        ) : null
                                                                      }) : ""}
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            : (item?.auto_mail == 0 && item?.action?.includes('New mail received') && item?.logger_id == 0 && item?.event_id == 0)
                                                              ?
                                                              <div className="timeline-box-inset" key={i}>
                                                                <div className="timeline-indicator">
                                                                  <div className="indicator-box">
                                                                    {item?.reader_mandatory == 1 ? <img src={path_image + "irt-invited-training.svg"} alt="" />
                                                                      : <svg
                                                                        width="24"
                                                                        height="18"
                                                                        viewBox="0 0 24 18"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                      >
                                                                        <path
                                                                          d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z"
                                                                          fill="rgba(0, 102, 190, 1)"
                                                                        ></path>
                                                                        <path
                                                                          d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7. 98861 12.1922 7.96501 12.2745 7.92Z"
                                                                          fill="rgba(0, 102, 190, 1)"
                                                                        ></path>
                                                                      </svg>
                                                                    }

                                                                  </div>
                                                                </div>
                                                                <div className="timeline-block">
                                                                  <div className="timeline-status ">
                                                                    <p>{item?.reader_mandatory == 1 ? "IRT Invited to the Training" : "Email sent"}</p>
                                                                    <span>{formatTime(item?.time)} </span>
                                                                  </div>
                                                                  <div className="timeline-details">
                                                                    <div className="details-box">
                                                                      <p className="timeline-details-heading">What</p>
                                                                      <p>{item?.reader_mandatory == 1 ? "IRT has received the training email" : "New mail received"}</p>
                                                                    </div>
                                                                    <div className="details-box">
                                                                      <p className="timeline-details-heading">Title</p>
                                                                      <div className="d-flex justify-content-between">
                                                                        <p>{item?.pdfTitle}</p>
                                                                      </div>
                                                                    </div>
                                                                    <div className="details-box">
                                                                      <p className="timeline-details-heading">Who</p>
                                                                      <div className="d-flex flex-wrap timeline-activity">
                                                                        {item?.users_data?.length ? item?.users_data?.map((userId, index) => {
                                                                          const userProfile = data?.userProfile?.find(profile => profile?.user_id == userId)
                                                                          return userProfile ? (
                                                                            <div key={index} className="timeline-activity-detail">

                                                                              <p>{
                                                                                userProfile?.first_name != '' ?
                                                                                  userProfile?.first_name + " " + userProfile?.last_name
                                                                                  : userProfile?.name
                                                                              }
                                                                              </p>
                                                                              <p>{userProfile?.user_type!=0?userProfile?.user_type:"N/A"}</p>
                                                                              <span>{userProfile?.site_number != 0 ? userProfile?.site_number : "N/A"}</span>
                                                                            </div>
                                                                          ) : <div className="timeline-activity-detail">
                                                                              <p>N/A</p>
                                                                          </div>
                                                                        }) : ""}
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              : ""
                                    }
                                  </React.Fragment>)
                                })}
                              </React.Fragment>)
                            })
                            }
                          </div>
                        

                          {loadMore?.showLoader == true ? (
                            <div
                              className="load_more"
                              style={{
                                margin: "10 auto",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              <Spinner color="#53aff4" size={32} speed={1} animating={true} />
                            </div>
                          ) : null}
                        </>)
                        :
                        <div className="no_found">
                          <p>No Data Found</p>
                        </div>}
                  </div>

                </div>

              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default SetLayoutNewTimeline
