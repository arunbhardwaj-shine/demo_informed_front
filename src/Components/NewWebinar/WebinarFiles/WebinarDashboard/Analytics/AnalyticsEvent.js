import React, { useEffect, useRef, useState } from "react";
import { Accordion, Button, Carousel, Col, Row, Table } from 'react-bootstrap';
import { loader } from "../../../../../loader";
import { postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { useNavigate } from "react-router-dom";

const AnalyticsEvent = () => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const { selectedItem, eventIdContext, handleEventId } = useSidebar();
    let navigate = useNavigate();
    const [search, setSearch] = useState("")
    const buttonRef = useRef(null);
    const filterRef = useRef(null);
    const [apifilterObject, setApifilterObject] = useState({});
    const [showFilter, setShowFilter] = useState(false);
    const [filterdata, setFilterData] = useState({});
    const [appliedFilter, setAppliedFilter] = useState({});
    const [filterObject, setFilterObject] = useState({})
    const [eventListData, setEventListData] = useState([])
    const [eventListDataOriginal, setEventListDataOriginal] = useState([])
    const [totalEmailListData, setTotalEmailListData] = useState([])
    const [apiStatus, setApiStatus] = useState(false);
    useEffect(() => {
        const fetchAnalyticsData = async () => {
          try {
            loader("show");
            // const body = { eventId };
            const response = await postData("/webinarEmail/get-analytics-event",{});
            const result = response?.data?.data;
            setEventListData(result);
            setEventListDataOriginal(result);
    
            loader("hide");
          } catch (error) {
            loader("hide");
            console.error("Error fetching analytics data:", error);
          } finally {
            setApiStatus(true)
          }
        };
    
        fetchAnalyticsData();
      }, []);
    const clearFilter = () => {
        setAppliedFilter({});
        setApifilterObject({});
        setFilterObject({});
        // setEmailListData([]);
        // setTotalEmailListData([])
        // getWebinarCompaignList()
        setShowFilter(false);
    };
    const applyFilter = (e) => {
        e.preventDefault();
        // setEmailListData([]);
        setFilterObject(appliedFilter);
        // getWebinarCompaignList(appliedFilter);
        setShowFilter(false);
    };
    const handleOnFilterChange = (e, item, index, key, data = []) => {
        let newObj = JSON.parse(JSON.stringify(appliedFilter));
        if (!newObj[key]) {
            newObj[key] = [];
        }
        if (!apifilterObject[key]) {
            apifilterObject[key] = [];
        }

        if (e?.target?.checked == true) {
            newObj[key]?.push(item);
            apifilterObject[key]?.push(e?.target?.value);
        } else {
            const index = newObj[key]?.indexOf(item);
            if (index > -1) {
                newObj[key]?.splice(index, 1);
                if (newObj[key]?.length == 0) {
                    delete newObj[key];
                }
            }
            const index2 = apifilterObject[key]?.indexOf(e.target.value);
            if (index2 > -1) {
                apifilterObject[key]?.splice(index2, 1);
                if (apifilterObject[key]?.length == 0) {
                    delete apifilterObject[key];
                }
            }
        }
        setAppliedFilter(newObj);
        setApifilterObject(apifilterObject);
    }
    const searchChange = (e) => {
        setSearch(e?.target?.value);

        if (e?.target?.value === "") {
            setEventListData(eventListDataOriginal)
        }
    };

    const submitSearchHandler = (event) => {
        event.preventDefault();
        let searchData = eventListDataOriginal?.filter((item) =>
          item?.title?.toLowerCase().includes(search.toLowerCase()) 
        // || 
        //   item?.email?.toLowerCase().includes(search.toLowerCase()) || 
        //   item?.country?.toLowerCase().includes(search.toLowerCase()) ||
        //   item?.region?.toLowerCase().includes(search.toLowerCase()) 
        );
      
        setEventListData(searchData);
      };
    const surveyQuestionFormDetail = (e, item) => {
        loader("show");
        handleEventId({ eventId: item?.id, companyId: item?.user_id, eventCode: item?.event_code, eventTitle: item?.title,eventStatus:item?.eventStatus })
        localStorage.setItem("EventIdContext", JSON.stringify({ eventId: item?.id, companyId: item?.user_id, eventCode: item?.event_code, eventTitle: item?.title }))
        navigate("/webinar/analytics", {
          state: { event_id: item?.id, companyId: item?.user_id },
        });
      }
    return (
        <>
            <Col className="right-sidebar">
                <div className="custom-container">
                    <Row>
                        <div className="top-header">
                            <div className="page-title d-flex flex-column align-items-start">
                                <h2>Events</h2>
                            </div>
                            <div className="top-right-action">
                                <div className="search-bar">
                                    <form className="d-flex" onSubmit={(e) => submitSearchHandler(e)}>
                                        <input
                                            className="form-control me-2"
                                            type="search"
                                            placeholder="Search"
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
                                {/* <div className="filter-by nav-item dropdown">
                                    <button
                                        ref={buttonRef}
                                        className={
                                            Object.keys(apifilterObject)?.length
                                                ? "btn btn-secondary dropdown filter_applied"
                                                : "btn btn-secondary dropdown"
                                        }
                                        type="button"
                                        id="dropdownMenuButton2"
                                        onClick={() => setShowFilter((showFilter) => !showFilter)}
                                    >
                                        Filter By
                                        {showFilter ? (
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
                                    {showFilter && (
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
                                                                <Accordion.Item
                                                                    className={
                                                                        key == "role" ? "card upper" : "card"
                                                                    }
                                                                    eventKey={index}
                                                                >
                                                                    <Accordion.Header className="card-header">
                                                                        {key}
                                                                    </Accordion.Header>
                                                                    <Accordion.Body className="card-body">
                                                                        <ul>
                                                                            {filterdata[key]?.length
                                                                                ? filterdata[key]?.map(
                                                                                    (item, index) => (
                                                                                        <li key={index}>
                                                                                            {item != "" ? (
                                                                                                <label className="select-multiple-option">
                                                                                                    <input
                                                                                                        type={"checkbox"}
                                                                                                        id={`custom-checkbox-tags-${index}`}
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
                                                <Button
                                                    className="btn btn-primary btn-bordered"
                                                    onClick={clearFilter}
                                                >
                                                    Clear
                                                </Button>
                                                <Button
                                                    className="btn btn-primary btn-filled"
                                                    onClick={applyFilter}
                                                >
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div> */}
                            </div>
                        </div>
                        <div className="analytics-events">
                           
                            <div className="analytics-events-box">
                    {     eventListData?.map(event=>   <div className="analytics-events-inset d-flex flex-column w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5>{event?.title}</h5>
                                        <div className="d-flex align-items-center event-date">
                                            <p>{event?.formattedEventStartDateTime}</p>
                                            <Button className="shortcut_btn" onClick={(e)=>surveyQuestionFormDetail(e,event)}>
                                                <img src={path_image + "shortcut-btn.svg"} alt="" />
                                            </Button>
                                        </div>  
                                    </div>
                                    <div className="d-flex align-items-end flex-wrap analytics-outer-box w-100">
                                    <div className="analytics-events-boxes">
                                        <p>Registration</p>
                                            <div className="d-flex events-boxes-shadow registration-list">
                                                <div className="box">
                                                    <p>Total registered HCPs</p>
                                                    <div class="email_stats_list d-flex">
                                                        <div class="d-flex align-items-center">
                                                            <img src={path_image + "registered-hcp.svg"} alt="Export"/>
                                                            <p>{event?.registration?.totalRegistration ||0} <span>Reached by email |  <b>{event?.registration?.reachedByEmail ||0}</b></span></p>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="box">
                                                    <p>By Email</p>
                                                    <div class="email_stats_list d-flex">
                                                        <div class="d-flex align-items-center">
                                                            <img src={path_image + "by-mail.svg"} alt="Export" />
                                                            <p>{event?.registration?.byEmailCount ||0}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="box">
                                                    <p>By other channel</p>
                                                    <div class="email_stats_list d-flex">
                                                        <div class="d-flex align-items-center">
                                                            <img src={path_image + "by-channel.svg"} alt="Export" />
                                                            <p>{event?.registration?.byOtherChannel ||0}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="analytics-events-boxes">
                                        <p>Live Stream</p>
                                        <div className="d-flex events-boxes-shadow live-streaming-box">
                                            <div className="box">
                                                <p>Attendees</p>
                                                <div class="email_stats_list d-flex">
                                                    <div class="d-flex align-items-center">
                                                        <img src={path_image + "attendees.svg"} alt="Export" />
                                                        <p>{event?.liveStream?.totalUsers ||0}  ({((event?.liveStream?.totalUsers/(event?.registration?.totalRegistration||1))*100).toFixed(2)}%)</p>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box">
                                                <p>AVG HCPs online</p>
                                                <div class="email_stats_list d-flex">
                                                    <div class="d-flex align-items-center">
                                                        <img src={path_image + "avg-hcp.svg"} alt="Export" />
                                                        <p>{event?.liveStream?.averageHcpsOnline ||0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box">
                                                <p>AVG spent time</p>
                                                <div class="email_stats_list d-flex">
                                                    <div class="d-flex align-items-center">
                                                        <img src={path_image + "avg-spend.svg"} alt="Export" />
                                                        <p>{event?.liveStream?.averageTime ||0} min <span>Live stream <b>{event?.liveStream?.livesStreamTime ||0}:00</b> min</span></p>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="analytics-events-boxes">
                                        <p>Q & Poll</p>
                                        <div className="d-flex events-boxes-shadow qa-poll-box">
                                            <div className="box">
                                                <p>Poll Questions</p>
                                                <div class="email_stats_list d-flex">
                                                    <div class="d-flex align-items-center">
                                                        <img src={path_image + "poll-question.svg"} alt="Export" />
                                                        <p>{event?.pollQuestion?.pollQuestion ||0}</p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box">
                                                <p>AVG HCPs answered</p>
                                                <div class="email_stats_list d-flex">
                                                    <div class="d-flex align-items-center">
                                                        <img src={path_image + "avg-answer.svg"} alt="Export" />
                                                        <p>{event?.pollQuestion?.averageHcpsOnAnswered ||0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box">
                                                <p>Questions asked</p>
                                                <div class="email_stats_list d-flex">
                                                    <div class="d-flex align-items-center">
                                                        <img src={path_image + "question-asked.svg"} alt="Export" />
                                                        <p>{event?.pollQuestion?.questionAsked ||0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="analytics-events-boxes">
                                        <p>&nbsp;</p>
                                        <div className="d-flex events-boxes-shadow avg-post">
                                            <div className="box">
                                                <p>AVG post Survey</p>
                                                <div class="email_stats_list d-flex">
                                                    <div class="d-flex align-items-center">
                                                        <img src={path_image + "post-survey.svg"} alt="Export" />
                                                        <p>{event?.surveyData?.overall_rating||0} <img src={path_image + "survey-star.svg"} alt="Export" /></p>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="analytics-events-boxes">
                                        <p>&nbsp;</p>
                                            <div className="d-flex events-boxes-shadow post-event-view">
                                            <div className="box">
                                                <p>Post-event views</p>
                                                <div class="email_stats_list d-flex">
                                                    <div class="d-flex align-items-center">
                                                        <img src={path_image + "post-event.svg"} alt="Export" />
                                                        <p>{event?.postEventViews}</p>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>)    }
                              
                            </div>
                        </div>
                    </Row>
                </div>
            </Col>

        </>
    )
}

export default AnalyticsEvent