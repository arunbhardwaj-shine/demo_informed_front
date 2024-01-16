import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { getData, postData } from "../../../../../axios/apiHelper";
import { toast } from "react-toastify";
import { loader } from "../../../../../loader";

const Settings = () => {
  const localStorageEvent=JSON.parse(localStorage.getItem("EventIdContext"))
  const { eventIdContext,handleEventId } = useSidebar();
  const [liveStatus, setLiveStatus] = useState(0);
  const [askQuestion, setAskQuestion] = useState(0);
  const [streamUrl, setStreamUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [eventId,setEventId]=useState(eventIdContext?.eventId?eventIdContext?.eventId:localStorageEvent?.eventId)

  useEffect(() => {
   
    // if(!eventIdContext){
    //   handleEventId(localStorageEvent)
    // }
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      loader("show");
      const response = await getData(
        `${ENDPOINT.WEBINAR_SETTINGS_GET}/${eventId}`
      );
      const { live_status, ask_question, poster_url, stream_url } =
        response?.data?.data;
      setLiveStatus(live_status);
      setAskQuestion(ask_question);
      setPosterUrl(poster_url);
      setStreamUrl(stream_url);
      // console.log(response?.data?.data, "===>response");
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      loader("hide");
    }
  };

  const handleSave = async () => {
    try {
      loader("show");

      if (liveStatus === 2 && !streamUrl.trim()) {
        toast.error("Please filled stream url first", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      if (liveStatus === 3 && !posterUrl.trim()) {
        toast.error("Please filled poster url first", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      if (liveStatus === 2 && !streamUrl.startsWith("https")) {
        toast.error("Stream URL should start with 'https'", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      if (liveStatus === 3 && !posterUrl.startsWith("https")) {
        toast.error("Poster URL should start with 'https'", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const payload = {
        eventId: eventId,
        live_status: liveStatus,
        ask_question: askQuestion,
        stream_url: liveStatus === 2 ? streamUrl : "",
        poster_url: liveStatus === 3 ? posterUrl : "",
      };
      // console.log("====>payload", payload);

      const response = await postData(
        ENDPOINT.WEBINAR_SETTINGS_UPDATE,
        payload
      );
      toast.success("Data Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error updating settings:", error);
    } finally {
      loader("hide");
    }
  };
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web sticky">
              <div className="page-title">
                <h2>Settings</h2>
              </div>
              <Button className="save-btn" onClick={handleSave}>Save</Button>
            </div>
          </div>
          <div className="page-title event-heading">
            <h4>Event Status:</h4>
          </div>

          <div className="settings-card">
            <div className="settings-status">
              <Form.Check
                inline
                type="radio"
                checked={liveStatus === 0}
                // onChange={() => setLiveStatus(0)}
                onChange={() => {
                  setLiveStatus(0);
                  setStreamUrl("");
                  setPosterUrl("");
                }}
              />
               <div className="event-status-img">
                <img src={path_image + "offline-status.png"} alt=""/> 
              </div>
              <div className="event-status-msg">
                <p className="event-status-set">Offline</p>
                <p>Not live yet. A video or image is shown while offline.</p>
              </div>
             
            </div>
            <div className="settings-status">
              <Form.Check
                inline
                type="radio"
                checked={liveStatus === 1}
                onChange={() => {
                  setLiveStatus(1);
                  setStreamUrl("");
                  setPosterUrl("");
                }}
              />
               <div className="event-status-img">
                <img src={path_image + "start-time.png"} alt=""/> 
              </div> 
             <div className="event-status-msg">
                <p className="event-status-set">Start Timer</p>
                <p>Activate a timer to count down to the live stream starts.</p>
              </div>
            </div>
            <div className="settings-status">
              <Form.Check
                inline
                type="radio"
                checked={liveStatus === 2}
                onChange={() => {
                  setLiveStatus(2);
                  setPosterUrl("");
                }}
              />
               <div className="event-status-img">
                <img src={path_image + "live-status.png"} alt=""/> 
              </div>
              
              <div className="event-status-msg">
                <p className="event-status-set">Start Live Streaming</p>
                <p>Click here to start the streaming.</p>
              </div>
            </div>
            <div className="settings-status">
              <Form.Check
                inline
                type="radio"
                checked={liveStatus === 3}
                onChange={() => {
                  setLiveStatus(3);
                  setStreamUrl("");
                }}
              />
              <div className="event-status-img">
                <img src={path_image + "message-to attendeed.png"} alt=""/> 
              </div>
              <div className="event-status-msg">
                <p className="event-status-set">End Live Streaming</p>
                <p>Stop the live stream and place an image message.</p>
              </div>
              
            </div>
          </div>

          <div className="ask-questions">
            <h5>Ask live questions: </h5>
            <div className="yes">
            <Form.Check
              inline
              type="radio"
              checked={askQuestion === 1}
              onChange={() => setAskQuestion(1)}
            />
            Yes
            </div>
             <div className="no">
            <Form.Check
              inline
              type="radio"
              checked={askQuestion === 0}
              onChange={() => setAskQuestion(0)}
            />
            No
          </div>
          </div>

          {liveStatus === 2 && (
            <div className="stream-url">
            <Form.Group>
              <Form.Label>Stream URL:</Form.Label>
              <Form.Control
                type="text"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
              />
            </Form.Group>
            </div>
          )}

          {liveStatus === 3 && (
            <div className="poster-url">
            <Form.Group>
              <Form.Label>Poster URL:</Form.Label>
              <Form.Control
                type="text"
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
              />
            </Form.Group>
            </div>
          )}
        </div>
      </Col>
    </>
  );
};

export default Settings;
