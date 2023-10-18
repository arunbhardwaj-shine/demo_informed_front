import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { loader } from "../../../../../loader";
import CommonAddEventModel from "./CommonAddEventModel";
import CommonConfirmModel from "../../../../../Model/CommonConfirmModel";
import { popup_alert } from "../../../../../popup_alert";
import { getData, deleteData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import moment from "moment";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const NewEventCreate = () => {
  const [isData, setIsData] = useState();
  const [apiData, setApiData] = useState();
  const [apiStatus, setApiStatus] = useState(true);
  const [webinarDetail, setWebinarDetail] = useState({});
  const [editEvent, setEditEvent] = useState(false);
  const [eventData, setEventData] = useState("");
  const [eventId, setEventId] = useState();
  const [search, setSearch] = useState("");
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [isEditData, setIsEditData] = useState();
  const [isActive, setIsActive] = useState("");
  const [sortDirection, setSortDirection] = useState(0);

  useEffect(() => {
    setApiStatus(false);
    getWebinarFilterData();
    getDataFromApi(page, search);
  }, []);
  const getWebinarFilterData = async () => {
    try {
      loader("show");
      const response = await getData(ENDPOINT.WEBINAR_DETAIL);

      setWebinarDetail(response?.data?.data);
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };
  const getDataFromApi = async (page, search) => {
    try {
      loader("show");
      const response = await getData(ENDPOINT.WEBINAR_GET_EVENT_LISTING);
      setIsData(response?.data?.data);
      setApiData(response?.data?.data);
      setApiStatus(true);
    } catch (err) {
      console.log("--err", err);
      setApiStatus(true);
    } finally {
      loader("hide");
    }
  };

  const searchChange = (e) => {
    setSearch(e?.target?.value?.trim());
    if (e?.target?.value === "") {
      setIsData(apiData);
    }
  };
  const submitSearchHandler = (event) => {
    event.preventDefault();

    const filteredData = apiData?.filter((item) =>
      item?.title?.toLowerCase().includes(search?.toLowerCase())
    );

    setIsData(filteredData);
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

  const handleAddModalSubmit = (e) => {
    getDataFromApi();
    setEventId("");
    setEditEvent(false);
  };

  const handleConfirmModalFun = async (id) => {
    setConfirmationPopup(false);

    try {
      loader("show");
      await deleteData(ENDPOINT.WEBINAR_DELETE_EVENT, id);

      getDataFromApi();
      setEventId("");
      loader("hide");
      popup_alert({
        visible: "show",
        message: "Your event has been deleted <br />successfully !",
        type: "success",
        redirect: "",
      });
    } catch (err) {
      console.log("--err", err);
      loader("hide");
    }
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
      const siteNumberA = a?.title?.toLowerCase();
      const siteNumberB = b?.title?.toLowerCase();
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
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-sticky">
              <div className="top-header">
                <div className="page-title">
                  <h2>Create Event</h2>
                </div>
                <div className="top-right-action">
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
                  <div className="header-btn">
                    <button
                      className="btn btn-primary btn-filled"
                      onClick={(e) => handleAddEventClick(e)}
                    >
                      Add Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="high_charts">
              <div className="highcharts-data-table event-create">
                {isData != "undefined" && isData?.length > 0 ? (
                  <Table>
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
                              <tr>
                                <td>
                                  {moment(
                                    new Date(item?.dateStart),
                                    "MM/DD/YYYY"
                                  ).format("MM/DD/YYYY")}
                                </td>
                                <td>
                                  {`${item?.dateStartHour}:${
                                    item?.dateStartMin
                                  } ${item?.dateStartHour < 12 ? "AM" : "PM"}`}
                                </td>
                              </tr>
                            </td>
                            <td>{item?.title}</td>
                            <td>
                              <button
                                className="btn-edit btn-voilet"
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
                                className="dlt_btn_event btn-voilet"
                                onClick={() => {
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
            </div>
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
        fun={handleConfirmModalFun}
        resetDataId={eventId}
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
