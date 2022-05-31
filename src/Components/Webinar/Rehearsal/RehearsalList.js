import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ExportApi from '../../../Api/ExportApi';
import { loader } from '../../../loader';
let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const RehearsalList = () => {
    const [event, setEvent] = useState([]);
    const [eventid, setEventId] = useState();
    const [RehearsaltData, setRehearsalData] = useState();
    const handleGetEventlist = () => {
        ExportApi.GetEventList().then((resp) => {
          if (resp.ok) {
            loader("hide")
            setEvent(resp.data.data);
            setEventId(resp.data.data[0].id)
            handleGetRehearsalListData(resp.data.data[0].id)
          }
        });
      };
    const handleGetRehearsalListData = (id) => {
        loader("show");
        ExportApi.RehearsalListData(id).then((resp) => {
          if (resp.ok) {
              console.log(resp.data.data)
            loader("hide")
            setRehearsalData(resp.data.data);
          }
        });
      };
    const handleRehearsaDelete = (id) => {
        loader("show");
        ExportApi.RehearsalDelete(id).then((resp) => {
          if (resp.ok) {
            loader("hide")
            handleGetRehearsalListData(eventid)
          }
        });
      };
      useEffect(() => {
        loader("show");
        handleGetEventlist();
      }, []);
  return (
    <div>
         <Row>
          <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Col md={{ span: 6, offset: 3 }}>
      <Link  to="/webinar/rehearsal"><Button>Back</Button></Link>
        <div style={{marginTop:"40px"}}>
        {event ? (
                    <Form.Group
                      className="mb-3"
                      as={Row}
                    >
                      <Form.Label column sm={2}>
                        Event{" "}
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Select
                          name="event_id"
                          onChange={(e) =>{ handleGetRehearsalListData(e.target.value);setEventId(e.target.value)}}
                           value={eventid}
                        >
                          <option value=""> Select Event</option>
                          {event?.map((val, i) => (
                            <React.Fragment key={i}>
                              <option value={val.id}>{val.title}</option>
                            </React.Fragment>
                          ))}
                        </Form.Select>
                      </Col>
                    </Form.Group>
                  ) : (
                    <h4>
                      <Link to="/webinar/event/add" style={{ color: "red" }}>
                        Please create event{" "}
                      </Link>
                    </h4>
                  )}
                  <br />
        </div>
        {RehearsaltData ? (
           <div className="border p-2">
                {RehearsaltData?.map((val, i) => (
            <div key={i}>
                 <button
                      type="button"
                      onClick={() => {
                        handleRehearsaDelete(val.id);
                      }}
                      className="float-end"
                    >
                                <img
                                  src={path_image + "delete1.svg"}
                                  alt="Delete Row"
                                />
                            
                    </button>
            <fieldset>
            <h4 style={{fontWeight:"bold"}}>The rehearsal information :</h4>
                <Row>
                    <Col>
                    <p>Date | {val.date}</p>
                    <p>Timezone | {val.timezone}</p>
                    </Col>
                    <Col>
                    <p>Start Time | {val.start_time}</p>
                    <p>End Time | {val.end_time}</p>
                    </Col>
                </Row>
            </fieldset>
            {val.speaker?.map((item, i) => (
                <fieldset className="border p-2">
                <div >
                <h4>speaker’s information's : </h4>
                <p> Name | {item.name}</p>
                <p> Email | {item.email}</p>
                </div>
                </fieldset>
            ))}
            
            </div>
            ))}
          </div>
        ) : (<h4>No Data Found</h4>
          )
          
          }
        </Col>
        </Row>
    </div>
  )
}

export default RehearsalList