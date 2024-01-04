import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { getData, postData } from "../../../../../axios/apiHelper";
import { toast } from "react-toastify";
import { loader } from "../../../../../loader";

const Settings = () => {
  const { eventIdContext } = useSidebar();
  const [liveStatus, setLiveStatus] = useState(0);
  const [askQuestion, setAskQuestion] = useState(0);
  const [streamUrl, setStreamUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      loader("show");
      const response = await getData(
        `${ENDPOINT.WEBINAR_SETTINGS_GET}/${eventIdContext?.eventId}`
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
        eventId: eventIdContext?.eventId,
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

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web sticky">
              <div className="page-title">
                <h2>Settings</h2>
              </div>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
          <div className="page-title event-heading">
            <h4>Event Status:</h4>
          </div>

          <div className="settings-card">
            <div className="offline">
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
              Offline
            </div>
            <div className="start-timer">
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
              Start Timer
            </div>
            <div className="stream-live">
              <Form.Check
                inline
                type="radio"
                checked={liveStatus === 2}
                onChange={() => {
                  setLiveStatus(2);
                  setPosterUrl("");
                }}
              />
              Set Stream Live
            </div>
            <div className="set-poster">
              <Form.Check
                inline
                type="radio"
                checked={liveStatus === 3}
                onChange={() => {
                  setLiveStatus(3);
                  setStreamUrl("");
                }}
              />
              Set Poster
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
            <Form.Check
              inline
              type="radio"
              checked={askQuestion === 0}
              onChange={() => setAskQuestion(0)}
            />
            No
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
