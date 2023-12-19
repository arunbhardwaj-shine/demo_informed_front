import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button, Accordion } from "react-bootstrap";
import { loader } from "../../../../../loader";
import CommonAddEventModel from "./CommonAddEventModel";
import CommonConfirmModel from "../../../../../Model/CommonConfirmModel";
import { popup_alert } from "../../../../../popup_alert";
import { getData, deleteData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import moment from "moment";
import { Spinner } from "react-activity";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const NewEventCreate = () => {
  let params = useParams();
  let navigate = useNavigate();
  const [isData, setIsData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [apiStatus, setApiStatus] = useState(false);
  const [webinarDetail, setWebinarDetail] = useState({});
  const [editEvent, setEditEvent] = useState(false);
  const [eventData, setEventData] = useState("");
  const [eventId, setEventId] = useState();
  const [search, setSearch] = useState("");
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [pageAll, setPageAll] = useState(false);
  const [isEditData, setIsEditData] = useState();
  const [isActive, setIsActive] = useState("");
  const [sortDirection, setSortDirection] = useState(0);
  const [totalEvents, setTotalEvents] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDataLength, setIsDataLength] = useState(0);
  const [deletestatus, setDeleteStatus] = useState(false);
  const [editstatus, setEditStatus] = useState(false);
  const [resetDataId, setResetDataId] = useState();
  const [rawDescription, setRawDescription] = useState();

  const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => { });
  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });
  const [showfilter, setShowFilter] = useState(false);
  const [filterdata, setFilterData] = useState({
    "Sort By Event": ["Asc", "Desc"],
    "Sort By Created": ["Asc", "Desc"],
  });
  const [otherFilter, setOtherFilter] = useState({});
  const [sortingCount, setSortingCount] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [sortingCreateCount, setSortingCreateCount] = useState(0);
  const [sortingCreate, setSortingCreate] = useState(0);
  useEffect(() => {
    setApiStatus(false);
    getWebinarFilterData();
    getDataFromApi(page);
  }, []);
  const getWebinarFilterData = async () => {
    try {
      loader("show");
      const response = await getData(ENDPOINT.WEBINAR_DETAIL);

      setWebinarDetail(response?.data?.data);
    } catch (err) {
      console.log("--err", err);
    }
  };
  const getDataFromApi = async (page, load = 0) => {
    try {
      loader("show");
      setIsLoaded(false);
      if (load) {
        setPageAll(true);
      }

      const response = await getData(
        `${ENDPOINT.WEBINAR_GET_EVENT_LISTING}?page=${page}`
      );

      if (page == 1) {
        setTotalEvents(response?.data?.data?.totalPage);
        let raw_description = response?.data?.data?.data.map((d) => d?.raw_description ? JSON.parse(d?.raw_description) : {})
        //  console.log(raw_description,"raw_descriptionraw_description");
        setRawDescription(raw_description)
        setIsData(response?.data?.data?.data);
        setApiData(response?.data?.data?.data);
        if (
          response?.data?.data?.totalPage > response?.data?.data?.data?.length
        ) {
          setIsLoaded(true);
        } else {
          setIsLoaded(false);
        }
      } else {
        let newDataLength = isData?.length + response?.data?.data?.data?.length;
        let raw_description = response?.data?.data?.data.map((d) => d?.raw_description ? JSON.parse(d?.raw_description) : {})
        setRawDescription(raw_description)
        setIsData([...isData, ...response?.data?.data?.data]);
        setApiData([...apiData, ...response?.data?.data?.data]);
        if (totalEvents > newDataLength) {
          setIsLoaded(true);
        } else {
          setIsLoaded(false);
        }
      }
      setApiStatus(true);
    } catch (err) {
      console.log("--err", err);
      setApiStatus(true);
    } finally {
      setPageAll(false);
      loader("hide");
    }
  };
  const loadMoreClicked = () => {
    loader("show");
    let sp = page + 1;
    setPage(sp);
    getDataFromApi(sp, 1);
    loader("hide");
  };

  const searchChange = (e) => {
    setSearch(e?.target?.value?.trim());
    if (e?.target?.value === "") {
      setIsData(apiData);
      if (totalEvents > apiData?.length) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }
    }
  };
  const submitSearchHandler = (event) => {
    event.preventDefault();

    const filteredData = apiData?.filter((item) =>
      item?.title?.toLowerCase().includes(search?.toLowerCase())
    );

    setIsData(filteredData);
    setIsLoaded(false);
    setApiStatus(true);
  };
  const handleAddEventClick = (e, item) => {
    if (item) {
      setEventData(item);
    } else {
      setEventData("");
      setIsEditData("");
    }
    setEditEvent(true);
  };

  const webinarRegistrationForm = (e, item) => {
    navigate("/webinar-registration", {
      state: item,
    });
  };
  const webinarPollingForm = (e, item) => {
    navigate("/poll-listing", {
      state: { event_id: item?.id },
    });
  };

  const handleAddModalSubmit = (e) => {
    loader("show");
    getDataFromApi(1);
    setEventId("");
    setEditEvent(false);
    handleCommonEventModalClose();
    loader("hide");
  };

  const handleCommonEventModalClose = () => {
    setEventId("");
    setEditEvent(false);
  };
  const handleCommonConfirmModal = () => {
    setEventId("");
    setConfirmationPopup(false);
  };
  const eventDateSort = () => {
    const sortedIsData = [...isData].sort((a, b) => {
      const siteNumberA = a?.dateEnd;
      const siteNumberB = b?.dateEnd;
      if (sortDirection === 0) {
        if (siteNumberA < siteNumberB) return -1;
        if (siteNumberA > siteNumberB) return 1;
        return 0;
      } else {
        if (siteNumberA > siteNumberB) return -1;
        if (siteNumberA < siteNumberB) return 1;
        return 0;
      }
    });

    setIsData(sortedIsData);
    setSortDirection(sortDirection === 0 ? 1 : 0); // Toggle the sort direction
    if (isActive == "asc") {
      setIsActive("dec");
    } else {
      setIsActive("asc");
    }

    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  };

  const createDateSort = () => {
    const sortedIsData = [...isData].sort((a, b) => {
      const siteNumberA = a?.event_create_date;
      const siteNumberB = b?.event_create_date;
      if (sortDirection === 0) {
        if (siteNumberA < siteNumberB) return -1;
        if (siteNumberA > siteNumberB) return 1;
        return 0;
      } else {
        if (siteNumberA > siteNumberB) return -1;
        if (siteNumberA < siteNumberB) return 1;
        return 0;
      }
    });

    setIsData(sortedIsData);
    setSortDirection(sortDirection === 0 ? 1 : 0); // Toggle the sort direction
    if (isActive == "asc") {
      setIsActive("dec");
    } else {
      setIsActive("asc");
    }

    setSortingCreate(1 - sortingCreate);
    setSortingCreateCount(sortingCreateCount + 1);
  };

  const showDeleteButtons = () => {
    if (deletestatus) {
      setDeleteStatus(false);
    } else {
      setEditStatus(false);
      setDeleteStatus(true);
    }
  };
  const showEditButtons = () => {
    if (editstatus) {
      setEditStatus(false);
    } else {
      setDeleteStatus(false);
      setEditStatus(true);
      
    }
  };

  const showConfirmationPopup = (stateMsg, e, id) => {
    if (stateMsg == "delete") {
      setResetDataId(id);
      setCommonConfirmModelFun(() => deleteEvent);
      setPopupMessage({
        message1:
          "You are about to remove this content from any reader and every device forever.",
        message2: "Are you sure you want to do this?",
        footerButton: "Yes please!",
      });
      if (confirmationpopup) {
        setConfirmationPopup(false);
      } else {
        setConfirmationPopup(true);
      }
    }
  };

  const deleteEvent = async (id) => {
    loader("show");
    try {
      await deleteData(ENDPOINT.WEBINAR_DELETE_EVENT, id);
      loader("hide");
      popup_alert({
        visible: "show",
        message: "Event has been deleted <br />successfully !",
        type: "success",
        redirect: "",
      });

      const updatedevent = isData.filter((item) => item.id !== id);
      setIsData(updatedevent);

      const eventList = apiData.filter((item) => item.id !== id);
      setApiData(eventList);

      loader("hide");
    } catch (err) {
      loader("hide");
    }
    hideConfirmationModal();
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };

  const handleOnFilterChange = (e, item, index, key, data = []) => {
    console.log("HERE");
  };

  const formatDate = (eventDate) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateStart = new Date(eventDate);

    const month = months[dateStart.getMonth()];
    const day = dateStart.getDate();
    const year = dateStart.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
  };

  const differenceDays = (eventDate) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    const todayDate = `${year}-${month}-${day}`;
    const date1 = new Date(todayDate);
    const date2 = new Date(eventDate);

    const timeDifference = date2.getTime() - date1.getTime(); // Get the time difference in milliseconds
    const dayDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
    // console.log(dayDifference); // Output: 4
    return dayDifference;
  };

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header sticky">
              <div className="top-right-action full">
                <div className="search-bar">
                  <form
                    className="d-flex"
                    onSubmit={(e) => submitSearchHandler(e)}
                  >
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Search by title"
                      aria-label="Search"
                      id="email_search"
                      onChange={(e) => searchChange(e)}
                    />
                    <button className="btn-outline-success" type="submit">
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

                {/* <div
                  className="filter-by nav-item dropdown"
                >
                  <button
                    className="btn btn-secondary dropdown"
                    type="button"
                    id="dropdownMenuButton2"
                    onClick={() => setShowFilter((showfilter) => !showfilter)}
                  >
                    Filter By
                      {
                        showfilter ? (
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
                        )
                      }
                  </button>
                    {
                      showfilter && (
                        <div
                          className="dropdown-menu filter-options"
                          aria-labelledby="dropdownMenuButton2"
                        >
                          <h4>Filter By</h4>
                          <Accordion defaultActiveKey="0" flush>
                          {Object.keys(filterdata)?.map(function (key, index) {
                            return (
                              <>
                                {filterdata[key]?.length ? (
                                  <Accordion.Item
                                    className={
                                      key == "Role" ? "card upper" : "card"
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
                                                <li>
                                                  {item != "" ? (
                                                    <label className="select-multiple-option">
                                                      <input
                                                        type={
                                                          key == "draft" ||
                                                          key == "ibu" ||
                                                          key ==
                                                            "Selected By Articles" ||
                                                          key ==
                                                            "SPC Included" ||
                                                          key == "Blinded" ||
                                                          key == "Mandatory" ||
                                                          key == "List" ||
                                                          key == "language" ||
                                                          key ==
                                                            "IRT mandatory training" ||
                                                          key ==
                                                            "Business Unit" ||
                                                          key ==
                                                            "Content Owners" ||
                                                          key == "Platform"
                                                            ? "radio"
                                                            : "checkbox"
                                                        }
                                                        id={`custom-checkbox-tags-${index}`}
                                                        value={item}
                                                        name={key}
                                                        checked={
                                                          otherFilter[
                                                            key
                                                          ]?.includes(item)
                                                            ? true
                                                            : false
                                                        }
                                                        onChange={(e) =>
                                                          handleOnFilterChange(
                                                            e,
                                                            item,
                                                            index,
                                                            key,
                                                            [...filterdata[key]]
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
                            >
                              Clear
                            </button>
                            <button
                              className="btn btn-primary btn-filled"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      ) 
                    }  
                </div> */}

                {isData != "undefined" && isData?.length > 0 ? (
                  <>
                    <div className="hcp-sort">
                      {sortingCreateCount == 0 ? (
                        <>
                          <button
                            className="btn btn-outline-primary"
                            onClick={createDateSort}
                          >
                            Sort Date{" "}
                            <img src={path_image + "sort.svg"} alt="Shorting" />
                          </button>
                        </>
                      ) : sortingCreate == 0 ? (
                        <>
                          <button
                            className="btn btn-outline-primary desc"
                            onClick={createDateSort}
                          >
                            Sort Date
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
                            onClick={createDateSort}
                          >
                            Sort Date
                            <img
                              src={path_image + "sort-assending.svg"}
                              alt="Shorting"
                            />
                          </button>
                        </>
                      )}
                      {sortingCount == 0 ? (
                        <>
                          <button
                            className="btn btn-outline-primary"
                            onClick={eventDateSort}
                          >
                            Sort Event{" "}
                            <img src={path_image + "sort.svg"} alt="Shorting" />
                          </button>
                        </>
                      ) : sorting == 0 ? (
                        <>
                          <button
                            className="btn btn-outline-primary desc"
                            onClick={eventDateSort}
                          >
                            Sort Event
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
                            onClick={eventDateSort}
                          >
                            Sort Event
                            <img
                              src={path_image + "sort-assending.svg"}
                              alt="Shorting"
                            />
                          </button>
                        </>
                      )}
                    </div>
                    <div className="clear-search">
                      {editstatus ? (
                        <button
                          className="btn btn-outline-primary cancel"
                          title="Cancel delete"
                          onClick={(e) => showEditButtons()}
                        >
                          Cancel
                        </button>
                      ) : (

                        <button
                          // className="btn-edit"
                          className="btn btn-outline-primary"
                          onClick={(e) => {
                            showEditButtons();
                          }}
                        >
                          <img
                            title="Edit"
                            src={path_image + "edit-button.svg"}
                            alt="Delete Row"
                          />
                        </button>
                      )}
                    </div>

                    <div className="clear-search">
                      {deletestatus ? (
                        <button
                          className="btn btn-outline-primary cancel"
                          title="Cancel delete"
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
                  </>
                ) : null}

                {/* <button
                            className={`event_sort_btn ${
                              isActive == "dec"
                                ? "svg_active"
                                : isActive == "asc"
                                ? "svg_asc"
                                : ""
                            }`}
                            onClick={eventDateSort}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                id="asc"
                                d="M18.9224 12.744C18.7661 12.5878 18.5542 12.5 18.3332 12.5C18.1122 12.5 17.9003 12.5878 17.744 12.744L14.9999 15.4882V2.49984C14.9999 2.27882 14.9121 2.06686 14.7558 1.91058C14.5995 1.7543 14.3875 1.6665 14.1665 1.6665C13.9455 1.6665 13.7335 1.7543 13.5773 1.91058C13.421 2.06686 13.3332 2.27882 13.3332 2.49984V15.4882L10.589 12.744C10.4318 12.5922 10.2213 12.5082 10.0029 12.5101C9.78435 12.512 9.57534 12.5997 9.42084 12.7542C9.26633 12.9087 9.17869 13.1177 9.17679 13.3362C9.17489 13.5547 9.25889 13.7652 9.41068 13.9223L13.5774 18.089C13.6548 18.1666 13.7467 18.2282 13.848 18.2702C13.9492 18.3122 14.0577 18.3338 14.1674 18.3338C14.277 18.3338 14.3855 18.3122 14.4867 18.2702C14.588 18.2282 14.6799 18.1666 14.7574 18.089L18.924 13.9223C19.08 13.7658 19.1675 13.5538 19.1672 13.3328C19.1669 13.1119 19.0788 12.9001 18.9224 12.744Z"
                                fill="#97B6CF"
                              />
                              <path
                                id="dsc"
                                d="M10.5892 6.0772L6.42251 1.91054C6.34489 1.83277 6.25253 1.77129 6.15084 1.7297C5.94698 1.64544 5.71803 1.64544 5.51417 1.7297C5.41248 1.77129 5.32011 1.83277 5.2425 1.91054L1.07583 6.0772C0.919572 6.23368 0.831875 6.44582 0.832031 6.66695C0.832188 6.88809 0.920184 7.10011 1.07666 7.25636C1.23314 7.41262 1.44528 7.50032 1.66642 7.50016C1.88756 7.5 2.09957 7.41201 2.25583 7.25553L5 4.51137V17.4997C5 17.7207 5.0878 17.9327 5.24408 18.0889C5.40036 18.2452 5.61232 18.333 5.83334 18.333C6.05435 18.333 6.26631 18.2452 6.4226 18.0889C6.57888 17.9327 6.66667 17.7207 6.66667 17.4997V4.51137L9.41085 7.25553C9.56801 7.40733 9.77852 7.49132 9.99701 7.48943C10.2155 7.48753 10.4245 7.39989 10.579 7.24538C10.7335 7.09087 10.8212 6.88186 10.8231 6.66337C10.825 6.44487 10.741 6.23437 10.5892 6.0772Z"
                                fill="#97B6CF"
                              />
                            </svg>
                          </button> */}
              </div>
            </div>
            <section className="search-hcp smart-list-view event_listing">
              <div className="col email-result-block">
                <div
                  className="email_box_block add-webinar"
                  onClick={(e) => handleAddEventClick(e)}
                >
                  <div className="email-block-add">
                    <img src={path_image + "add-button.svg"} alt="" />
                    <p>Create New Webinar/Event</p>
                  </div>
                </div>
                {isData != "undefined" && isData?.length > 0 ? (
                  <>
                    {isData?.map((item, index) => {
                      return (
                        <div className="email_box_block">
                          <div className="email_box">
                            <div className="mail-box-content">
                              <div className="action_btn text-end">
                                {differenceDays(item?.dateStart) == 0
                                  ? "Event Live"
                                  : differenceDays(item?.dateStart) > 0
                                    ? "Coming Soon"
                                    : "Has Ended"}
                                {/* <button
                                  className="btn-edit"
                                  onClick={(e) => {
                                    handleAddEventClick(e, item);
                                  }}
                                >
                                  <img
                                    title="Edit"
                                    src={path_image + "edit-button.svg"}
                                    alt="Delete Row"
                                  />
                                </button> */}
                                <button
                                  className="btn-webinar"
                                  onClick={(e) => {
                                    webinarRegistrationForm(e, item);
                                  }}
                                >
                                  <img
                                    title="Registration"
                                    src={path_image + "webinar-icon.svg"}
                                    alt="Registration"
                                  />
                                </button>
                                <button
                                  className="btn-webinar"
                                  onClick={(e) => {
                                    webinarPollingForm(e, item);
                                  }}
                                >
                                  <img
                                    title="Polls"
                                    src={path_image + "polling-icon.svg"}
                                    alt="Polls"
                                  />
                                </button>
                              </div>
                              <div className="event-title">{item?.title}</div>
                              <div className="speaker-name">Speaker: {rawDescription[index]?.speaker_name ? rawDescription[index]?.speaker_name : "N/A"}</div>
                              <div className="event-details d-flex justify-content-between">
                                <div className="time-left">
                                  {differenceDays(item?.dateStart) == 0
                                    ? "Event Live"
                                    : differenceDays(item?.dateStart) > 0
                                      ? differenceDays(item?.dateStart) +
                                      " Days Left"
                                      : ""}
                                </div>
                                <div className="event-date">
                                  {formatDate(item?.dateStart)} |{" "}
                                  {`${item?.dateStartHour}:${item?.dateStartMin.length == 1
                                    ? "0" + item?.dateStartMin
                                    : item?.dateStartMin
                                    } ${item?.dateStartHour < 12 ? "AM" : "PM"}`}
                                </div>
                                <div className="country-timezone event-date">{item?.country_timezone}</div>
                              </div>

                              {editstatus ? (<div className="dlt_btn">
                                <button
                                  className="btn-edit"
                                  onClick={(e) => {
                                    handleAddEventClick(e, item);
                                  }}
                                >
                                  <img
                                    title="Edit"
                                    src={path_image + "edit-button.svg"}
                                    alt="Delete Row"
                                  />
                                </button>
                              </div>)
                                : deletestatus ? (
                                  <div className="dlt_btn">
                                    <button
                                      onClick={(e) =>
                                        showConfirmationPopup(
                                          "delete",
                                          e,
                                          item?.id
                                        )
                                      }
                                    >
                                      <img
                                        src={path_image + "delete.svg"}
                                        alt="Delete Row"
                                      />
                                    </button>
                                  </div>
                                ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : apiStatus ? (
                  <div class="email_box_block no_found">
                    <p>No Data Found</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* <div className="result-hcp-table">
              <div className="event-create selected-hcp-list">
                {isData != "undefined" && isData?.length > 0 ? (
                  <Table id="table-to-xls">
                    <thead className="sticky-header">
                      <tr>
                        <th>
                          Event Date
                          <button
                            className={`event_sort_btn ${
                              isActive == "dec"
                                ? "svg_active"
                                : isActive == "asc"
                                ? "svg_asc"
                                : ""
                            }`}
                            onClick={eventDateSort}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                id="asc"
                                d="M18.9224 12.744C18.7661 12.5878 18.5542 12.5 18.3332 12.5C18.1122 12.5 17.9003 12.5878 17.744 12.744L14.9999 15.4882V2.49984C14.9999 2.27882 14.9121 2.06686 14.7558 1.91058C14.5995 1.7543 14.3875 1.6665 14.1665 1.6665C13.9455 1.6665 13.7335 1.7543 13.5773 1.91058C13.421 2.06686 13.3332 2.27882 13.3332 2.49984V15.4882L10.589 12.744C10.4318 12.5922 10.2213 12.5082 10.0029 12.5101C9.78435 12.512 9.57534 12.5997 9.42084 12.7542C9.26633 12.9087 9.17869 13.1177 9.17679 13.3362C9.17489 13.5547 9.25889 13.7652 9.41068 13.9223L13.5774 18.089C13.6548 18.1666 13.7467 18.2282 13.848 18.2702C13.9492 18.3122 14.0577 18.3338 14.1674 18.3338C14.277 18.3338 14.3855 18.3122 14.4867 18.2702C14.588 18.2282 14.6799 18.1666 14.7574 18.089L18.924 13.9223C19.08 13.7658 19.1675 13.5538 19.1672 13.3328C19.1669 13.1119 19.0788 12.9001 18.9224 12.744Z"
                                fill="#97B6CF"
                              />
                              <path
                                id="dsc"
                                d="M10.5892 6.0772L6.42251 1.91054C6.34489 1.83277 6.25253 1.77129 6.15084 1.7297C5.94698 1.64544 5.71803 1.64544 5.51417 1.7297C5.41248 1.77129 5.32011 1.83277 5.2425 1.91054L1.07583 6.0772C0.919572 6.23368 0.831875 6.44582 0.832031 6.66695C0.832188 6.88809 0.920184 7.10011 1.07666 7.25636C1.23314 7.41262 1.44528 7.50032 1.66642 7.50016C1.88756 7.5 2.09957 7.41201 2.25583 7.25553L5 4.51137V17.4997C5 17.7207 5.0878 17.9327 5.24408 18.0889C5.40036 18.2452 5.61232 18.333 5.83334 18.333C6.05435 18.333 6.26631 18.2452 6.4226 18.0889C6.57888 17.9327 6.66667 17.7207 6.66667 17.4997V4.51137L9.41085 7.25553C9.56801 7.40733 9.77852 7.49132 9.99701 7.48943C10.2155 7.48753 10.4245 7.39989 10.579 7.24538C10.7335 7.09087 10.8212 6.88186 10.8231 6.66337C10.825 6.44487 10.741 6.23437 10.5892 6.0772Z"
                                fill="#97B6CF"
                              />
                            </svg>
                          </button>
                        </th>
                        <th>Title</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {isData?.map((item, index) => {
                        return (
                          <tr>
                            <td>
                                  {moment(
                                    new Date(item?.dateStart),
                                    "MM/DD/YYYY"
                                  ).format("MM/DD/YYYY")} | {`${item?.dateStartHour}:${
                                    item?.dateStartMin
                                  } ${item?.dateStartHour < 12 ? "AM" : "PM"}`}
                            </td>
                            <td>{item?.title}</td>
                            <td className="action_btn">
                              <button
                                className="btn-edit"
                                onClick={(e) => {
                                  handleAddEventClick(e, item);
                                }}
                              >
                                <img
                                  title="Edit"
                                  src={path_image + "edit-button.svg"}
                                  alt="Delete Row"
                                />
                              </button>
                              <button
                                className="btn-webinar"
                                onClick={(e) => {
                                  webinarRegistrationForm(e, item);
                                }}
                              >
                                <img
                                  title="Webinar"
                                  src={path_image + "webinar-icon.svg"}
                                  alt="Webinar"
                                />
                              </button> 
                               <button
                                className="btn-webinar"
                                onClick={(e) => {
                                  webinarPollingForm(e, item);
                                }}
                              >
                                <img
                                  title="Webinar"
                                  src={path_image + "polling-icon.svg"}
                                  alt="Webinar"
                                />
                              </button>
                              <button
                                className="dlt_btn_event"
                                onClick={(e) => {
                                  setConfirmationPopup(true);

                                  setEventId(item?.id);
                                }}
                              >
                                <img
                                  title="Delete"
                                  src={path_image + "delete-icon.svg"}
                                  alt="Delete Row"
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <>
                    {apiStatus ? (
                      <h4 className="not-found" style={{ color: "#004A89" }}>
                        No Data Found
                      </h4>
                    ) : null}
                  </>
                )}
              </div>
            </div> */}
              <div className="load_more">
                {isLoaded == true ? (
                  <Button
                    className="btn btn-primary btn-filled"
                    onClick={loadMoreClicked}
                  >
                    Load More
                  </Button>
                ) : null}
              </div>
              {pageAll == true ? (
                <div
                  className="load_more"
                  style={{
                    margin: "0 auto",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Spinner
                    color="#53aff4"
                    size={32}
                    speed={1}
                    animating={true}
                  />
                </div>
              ) : null}
            </section>
          </Row>
        </div>
      </Col>
      <CommonAddEventModel
        show={editEvent}
        onClose={handleCommonEventModalClose}
        eventId={eventId}
        webinarDetail={webinarDetail ? webinarDetail : ""}
        data={eventData}
        apiData={isEditData}
        handleSubmit={handleAddModalSubmit}
      />
      <CommonConfirmModel
        show={confirmationpopup}
        onClose={handleCommonConfirmModal}
        fun={deleteEvent}
        resetDataId={resetDataId}
        popupMessage={{
          message1: "You are about to remove this event forever.",
          message2: "Are you sure you want to do this?",
          footerButton: " Yes please!",
        }}
        path_image={path_image}
      />
    </>
  );
};
export default NewEventCreate;
