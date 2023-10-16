import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { loader } from "../../../../../loader";
import CommonAddEventModel from "./CommonAddEventModel";
import CommonConfirmModel from "../../../../../Model/CommonConfirmModel";
import { popup_alert } from "../../../../../popup_alert";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const NewEventCreate = () => {
  const [isData, setIsData] = useState();
  const [editEvent, setEditEvent] = useState(false);
  const [eventData, setEventData] = useState("");
  const [eventId, setEventId] = useState();
  const [search, setSearch] = useState("");
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [isEditData, setIsEditData] = useState();
  const [isActive, setIsActive] = useState("");
  const [sortDirection, setSortDirection] = useState(0);

  let apiData = [
    ["27-06-2023 13:15 PM", "Nuwiq Symposium ISTH 2023", 384],
    ["26-06-2023 13:15 PM", "Wilate Symposium ISTH 2023", 383],
    [
      "12-07-2022 13:15 PM",
      "ISTH symposium - Focus on Females: Patient experiences &Novel treatment strategies in bleeding disorders",
      356,
    ],
    [
      "09-07-2022 11:30 AM",
      "ISTH symposium - A Key Factor: Aiming for All-Round Bleed Protection in Haemophilia A",
      355,
    ],
    [
      "23-07-2021 18:30 PM",
      "ISTH 2021, Octapharma symposium: \u201cFrom Clinical Insights to Patient Experience: Suzanne\u2019s Journey with von Willebrand Disease\u201d",
      336,
    ],
    [
      "20-07-2021 18:30 PM",
      "ISTH 2021, Octapharma symposium: \u201cFactor in the Future: Informed Treatment Decisions for Haemostasis and Beyond\u201d",
      337,
    ],
    ["27-06-2021 13:15 PM", "ISTH2023-VWD", 385],
    ["27-06-2021 13:15 PM", "ISTH2023-Haemophilia A", 386],
  ];
  let apiEditData = {
    id: "355",
    event_code: "event-nuwiq-2022",
    pdf_id: null,
    user_id: "2147484787",
    title:
      "ISTH symposium - A Key Factor: Aiming for All-Round Bleed Protection in Haemophilia A",
    allday: null,
    dateStart: "09-07-2022",
    dateStartHour: "11",
    dateStartMin: "30",
    dateEnd: "09-07-2022",
    dateEndHour: "12",
    description: " \tYour direct link to join the symposium is",
    location: null,
    inputUrl: null,
    created_at: "2021-05-26 12:14:05",
    updated_at: null,
    timezone: "BST",
    country_timezone: "Europe/London",
    show_poll: "0",
    tag: null,
    type: "Hematology",
    dateEndMin: "45",
    custom_start_time: "2022-07-09 14:15:00",
    custom_end_time: "2022-07-09 15:45:00",
    recorded_video_link: null,
    send_calander_attachment: "1",
    is_client_stream: "1",
    client_stream_url: "https://webstreamlive.com/octapharma/090722/?userId=",
    is_live_webinar: "1",
    is_deleted: "0",
  };

  useEffect(() => {
    getDataFromApi(page, search);
  }, []);
  const getDataFromApi = async (page, search) => {
    try {
      loader("show");
      setIsData(apiData);
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  const searchChange = (e) => {
    setSearch(e?.target?.value);
    if (e?.target?.value === "") {
      getDataFromApi(page, "");
    }
  };
  const submitSearchHandler = (event) => {
    event.preventDefault();

    setPage(1);
    getDataFromApi(1, search);
    return false;
  };
  const handleAddEventClick = (e, item) => {
    if (item) {
      setEventData(item);
      setIsEditData(apiEditData);
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
    console.log("delete id--->", id);
    setEventId("");
    setConfirmationPopup(false);

    try {
      loader("show");
      //   await deleteMethod(`${ENDPOINT}${id}`);
      loader("hide");

      //  getDataFromApi();
      popup_alert({
        visible: "show",
        message: "Your product has been deleted <br />successfully !",
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
      const siteNumberA = a[0].toLowerCase();
      const siteNumberB = b[0].toLowerCase();
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
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
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
                              className="dlt_btn"
                              onClick={() => {
                                setConfirmationPopup(true);
                                setEventId(item[2]);
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
              </div>
            </div>
          </Row>
        </div>
      </Col>
      <CommonAddEventModel
        show={editEvent}
        onClose={handleCommonEventModalClose}
        eventId={eventId}
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
          message1: "You are about to remove this product forever.",
          message2: "Are you sure you want to do this?",
          footerButton: " Yes please!",
        }}
        path_image={path_image}
      />
    </>
  );
};
export default NewEventCreate;
