import React, { useEffect, useState } from "react";
import { Col, Row, Table, Modal, Button } from "react-bootstrap";
import { loader } from "../../loader";
import { getData, postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import CommonModel from "../../Model/CommonModel";


const AllEvents = () => {
  const [data, setData] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const [addCommentPopup, setAddCommentPopup] = useState(false)
  const [eventId, setEventId] = useState()
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")

  const toggleDetails = (index) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    getAllEventList();
  }, []);

  const getAllEventList = async (flag=0) => {
    try {
      if(flag==0){
        loader("show");
      }
     
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
    
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  const addComment = async (e, id,comment) => {
    setEventId(id)
    setComment(comment)
    setAddCommentPopup(true)

  }

  const handleChange = (e) => {
    setError("")
    setComment(e?.target?.value)
  }

  const handleSaveComment=async(e)=>{
    try{
      loader("show")
      if(comment?.trim()==""||comment=="undefined" ){
        setError("Please enter your comment")
        return
      }else{
        let body={
          event_id:eventId,
          comment:comment
        }
        const response=await postData(ENDPOINT.ADD_COMMENT_TO_EVENT,body)
        setEventId()
        setAddCommentPopup(false)
        setData()
        getAllEventList(1)
        setComment("")
      }
     
    }catch(error){
      console.log("error--",error)
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

    // return utcDateTime.replace(/T/, ' ').replace(/\..+/, '');
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

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header regi-web sticky">
              <div className="page-title">
                <h2>All Events</h2>
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

                          <th className="sort_option">
                            <span>Date</span>
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
                              <tr
                              // className={
                              //   showDetails[index] ? "view show" : "view"
                              // }
                              // onClick={() => toggleDetails(index)}
                              >
                                {console.log("item comment after update-->",item?.comment)}
                                <td>{item?.title}</td>
                                <td className="registered"> {formatDate(item?.dateStart)} |{" "}
                                  {`${item?.dateStartHour > 12 ? parseInt(item?.dateStartHour) - 12 : item?.dateStartHour}:${item?.dateStartMin.length == 1
                                    ? "0" + item?.dateStartMin
                                    : item?.dateStartMin
                                    } ${item?.dateStartHour < 12 ? "AM" : "PM"}`}</td>
                                <td>{item?.username}</td>
                                <td className={item?.eventStatus == 0 ? "Live" : item?.eventStatus > 0 ? "Coming soon" : "Has ended"}>
                                  {item?.eventStatus == 0 ? "Live" : item?.eventStatus > 0 ? "Coming soon" : "Has ended"}</td>
                                <td className="comment-events-data"><p>{item?.comment?item?.comment:"N/A"}</p></td>
                                <td><Button onClick={(e) => addComment(e, item?.id,item?.comment)}>Add </Button></td>

                              </tr>
                              {showDetails[index] && (
                                <tr className="fold">
                                  <td colspan="8">
                                    <div className="survey-data">
                                      <p>Upcoming event</p>
                                    </div>
                                  </td>
                                </tr>
                              )}
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
              ) : (
                <div className="no_found">
                  <p align="center">No Data Found</p>
                </div>
              )}
            </div>
            {/* </Col> */}
          </Row>
        </div>

      </Col>
      <Modal

        show={addCommentPopup}
        onHide={() => setAddCommentPopup(false)}
        className="send-confirm add-cmd"
        id="download-qr">

        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            Add Comment
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
                placeholder="enter your comment"
                className="form-control"
                // onChange={handleModelChange}
                value={comment?comment: ""}

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
