import React, { useEffect, useState } from "react";
import { Col, Row, Table, Modal, Button } from "react-bootstrap";
import { loader } from "../../loader";
import { getData, postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
const AllEvents = () => {
  const [data, setData] = useState([]);
  const [addCommentPopup, setAddCommentPopup] = useState(false)
  const [eventId, setEventId] = useState()
  const [eventIndex, setEventIndex] = useState()
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [totalEventData, setTotalEventData] = useState([])
  const [isActive, setIsActive] = useState({});
  const [sorting, setSorting] = useState(0);
  const [sortNameDirection, setSortNameDirection] = useState(0);
  const [sortingCount, setSortingCount] = useState(0);
  const [apiStatus,setApiStatus]=useState(false);

  useEffect(() => {
    getAllEventList();
  }, []);

  const getAllEventList = async () => {
    try {
      loader("show");
      setApiStatus(false)   
      const response = await getData(ENDPOINT.GET_ALL_EVENT_LIST);
      let data = response?.data?.data || [];
      data = data?.map((item, element) => {
        let status = differenceDays(item?.eventStartDateTime, item?.eventEndtDateTime, item?.timezone, "")
        return {
          ...item,
          eventStatus: status,
        };
      });
      setData(data);
      setTotalEventData(data)

    } catch (err) {
      console.log("--err", err);
    } finally {      
      setApiStatus(true)
      loader("hide");
    }
  };

  const addComment = async (e, id, comment,index) => {
    setError("")
    setEventIndex(index)
    setEventId(id)
    setComment(comment)
    setAddCommentPopup(true)

  }

  const handleChange = (e) => {
    setError("")
    setComment(e?.target?.value)
  }

  const handleSaveComment = async (e) => {
    try {
      loader("show")
      if (comment?.trim() == "" || comment == "undefined") {
        setError("Please enter your comment")
        loader("hide")
        return
      } else {
        let body = {
          event_id: eventId,
          comment: comment
        }
        const response = await postData(ENDPOINT.ADD_COMMENT_TO_EVENT, body)
        if(response){
          let updatedData=[...data]
          updatedData[eventIndex].comment=comment
          setData(updatedData)
          
        }
        setComment("")
        setEventIndex()
        setEventId()
        setAddCommentPopup(false)
      }

    } catch (error) {
      console.log("error--", error)
    }finally{
      loader("hide")
    }
  }

  const searchChange = (e) => {
    setSearch(e?.target?.value)
    if (e?.target?.value == "") {
      setData(totalEventData)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const newData = totalEventData?.filter((item, index) => item?.title?.toLowerCase().includes(search.toLowerCase()))
    if (newData?.length > 0) {
      setData(newData)
    } else {
      setData([])
    }
  }


  const differenceDays = (eventStartDateTime, eventEndtDateTime, timezone, flag = 0) => {

    const time = getEventTime(timezone)

    const currentTime = new Date(time);
    const startTime = new Date(eventStartDateTime);
    const endTime = new Date(eventEndtDateTime);

    if (currentTime < startTime) {
      const timeDifference = startTime.getTime() - currentTime.getTime(); // Get the time difference in milliseconds
      const dayDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
      if (flag == 1) {
        const days = Math.floor(timeDifference / (1000 * 3600 * 24));
        const remainingTimeAfterDays = timeDifference % (1000 * 3600 * 24);
        const hours = Math.floor(remainingTimeAfterDays / (1000 * 3600));
        const remainingTimeAfterHours = remainingTimeAfterDays % (1000 * 3600);
        const minutes = Math.floor(remainingTimeAfterHours / (1000 * 60));
        // return `${days} days, ${hours} hours, ${minutes} minutes`
        // return (days ? days + " days " : "") + (hours ? hours + " hours " : "") + (minutes ? minutes + " minutes" : "");
        return (days ? days + " Days " : hours ? hours + " Hr" : minutes ? minutes + " Min" : "");
      } else {
        return dayDifference;
      }

    } else if (currentTime > endTime) {
      return -1;
    } else {
      return 0;
    }
  };

  const getEventTime = (timeZone) => {
    const utcDateTime = new Date().toISOString();
    try {
      if (timeZone !== null) {
        const options = {
          timeZone: timeZone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };

        const localDateTime = new Intl.DateTimeFormat('en-US', options).format(
          new Date(utcDateTime)
        );

        const adjustedLocalDateTime = localDateTime.replace(
          /(\d{2}:\d{2}:\d{2})/,
          (_, time) => {
            let [hours, minutes, seconds] = time.split(':');
            hours = hours === '24' ? '00' : hours; // Replace 24 with 00
            const adjustedHours = hours;
            return `${adjustedHours}:${minutes}:${seconds}`;
          }
        );
        return adjustedLocalDateTime.replace(/, /, ' ');
      }
    } catch (error) {
      console.error('Invalid time zone specified:', timeZone);
    }

    const londonOptions = {
      timeZone: 'Europe/London',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    const localDateTime = new Intl.DateTimeFormat('en-US', londonOptions).format(
      new Date(utcDateTime)
    );

    const adjustedLocalDateTime = localDateTime.replace(
      /(\d{2}:\d{2}:\d{2})/,
      (_, time) => {
        let [hours, minutes, seconds] = time.split(':');
        hours = hours === '24' ? '00' : hours; // Replace 24 with 00
        const adjustedHours = hours;
        return `${adjustedHours}:${minutes}:${seconds}`;
      }
    );
    return adjustedLocalDateTime.replace(/, /, ' ');
  }

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

  const userSort = (e, key) => {
    const direction = sortNameDirection === 0 ? 'asc' : 'dec';
    const sortedUserData = [...data].sort(dynamicSort(key, direction));
    setData(sortedUserData);
    setSortNameDirection(sortNameDirection === 0 ? 1 : 0); 
    setIsActive({ [key]: direction === 'asc' ? 'dec' : 'asc' });
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  };

  const dynamicSort = (key, direction) => (a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (direction === 'asc') {
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    } else {
      if (valueA > valueB) return -1;
      if (valueA < valueB) return 1;
      return 0;
    }
  };


  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header regi-web sticky">
              <div className="page-title">
                <h2>All Events</h2>
              </div>
              <div className="top-right-action">
                <div className="search-bar">
                  <form className="d-flex"
                    onSubmit={(e) => submitHandler(e)}
                  >
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search by event title"
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
              </div>
            </div>

            <div className="all-events">
              {data?.length > 0 ? (
                <>
                  <div className="all-events_details">
                    <div className="survey_data_accordion_heading">
                      <Table className="fold-table" id="individual_completion">
                        <thead className="sticky-header">
                          <tr>
                            <th className="sort_option">
                              <span> Event</span>
                            </th>

                            {/* <th className="sort_option">
                              <span>Date</span> */}
                               <th scope="col" className="sort_option">
                              <span  onClick={(e) => userSort(e, "dateStart")}>Date</span>
                              <button
                                className={`event_sort_btn ${isActive?.dateStart == "dec"
                                  ? "svg_active"
                                  : isActive?.dateStart == "asc"
                                    ? "svg_asc"
                                    : ""
                                  }`}
                                onClick={(e) => userSort(e, "dateStart")}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </th>

                            <th className="sort_option">
                              <span>Timezon</span>
                            </th>
                            <th className="sort_option">
                              <span>Account</span>
                            </th>
                            <th className="sort_option">
                              <span>Status</span>
                            </th>
                            <th className="sort_option comment-events">
                              <span>Comment</span>
                            </th>
                            <th className="sort_option">
                              &nbsp;
                            </th>

                          </tr>
                        </thead>
                        <tbody className="form-group">
                          {data?.map((item, index) => {
                            return (
                              <>
                                <tr>
                                  <td>{item?.title}</td>
                                  <td className="registered"> <span>{formatDate(item?.dateStart)}</span> |{" "}
                                    <span>{`${item?.dateStartHour > 12 ? parseInt(item?.dateStartHour) - 12 : item?.dateStartHour}:${item?.dateStartMin.length == 1
                                      ? "0" + item?.dateStartMin
                                      : item?.dateStartMin
                                      } ${item?.dateStartHour < 12 ? "AM" : "PM"}`}</span></td>
                                       <td>{item?.timezone}</td>
                                  <td>{item?.username}</td>
                                  <td className={item?.eventStatus == 0 ? "live" : item?.eventStatus > 0 ? "comingsoon" : "has-ended"}>
                                    {item?.eventStatus == 0 ? "Live" : item?.eventStatus > 0 ? "Coming soon" : "Has ended"}</td>
                                  <td className="comment-events-data"><p>{item?.comment ? item?.comment : "N/A"}</p></td>
                                  <td><Button onClick={(e) => addComment(e, item?.id, item?.comment,index)}>Edit </Button></td>

                                </tr>                              
                                <tr className="blank">
                                  <td colspan="8" style={{ height: "10px;" }}>
                                    &nbsp;
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </>
              ) : apiStatus?(
                <div className="email_box_block no_found">
                  <p align="center">No Data Found</p>
                </div>
              ):""}
            </div>
            {/* </Col> */}
          </Row>
        </div>

      </Col>
      <Modal

        show={addCommentPopup}
        onHide={() => setAddCommentPopup(false)}
        className="send-confirm add-cmd"
        id="add_hcp"
        backdrop="static"
      >

        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            Edit Comment
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            // onClick={() => onClose(false)}
            onClick={() => setAddCommentPopup(false)}
          ></button>
        </Modal.Header>

        <Modal.Body>
          <div className="form-group">
            {/* <label htmlFor="">{item?.label}</label> */}
            <div className="modal-form-group">
              <textarea

                // name={item?.name ? item?.name : item?.label}
                placeholder="Enter your comment"
                className="form-control"
                // onChange={handleModelChange}
                value={comment ? comment : ""}

                onChange={handleChange}
              />
              {error ? (
                <div className="login-validation">
                  {error}
                </div>
              ) : (
                ""
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary save btn-filled"
                  onClick={(e) => handleSaveComment(e)}
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default AllEvents;
